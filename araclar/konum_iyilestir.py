"""
Konum iyileştirici (2. tur)
---------------------------
konum_bul.py'nin bulamadığı ya da yalnızca sokak/mahalle düzeyinde bulduğu eserleri
OpenStreetMap'teki cami, türbe, medrese, han, kilise... kayıtlarıyla ADINDAN eşleştirir.

Her ilçe için OpenStreetMap'ten (Overpass) çevredeki adı olan tarihi yapıları bir kez çeker,
sonra eser adlarıyla benzerlik puanı hesaplar. Emin olduğu eşleşmeleri veri.js'e yazar,
emin olmadıklarını araclar/konum_kontrol.csv dosyasına "kontrol et" diye bırakır.

Kullanım (vakfiye-app klasöründeyken):
  python3 araclar/konum_iyilestir.py
"""
import csv
import difflib
import json
import math
import os
import re
import subprocess
import time
import urllib.parse

VERI = "veri.js"
KAYIT = "araclar/konumlar.json"
KONTROL = "araclar/konum_kontrol.csv"
OVERPASS = "https://overpass-api.de/api/interpreter"
MERKEZ_ILCELER = {"Karatay", "Meram", "Selçuklu", "Osmangazi", "Yıldırım", "Nilüfer", "Antakya", "Defne"}

GENEL = {"camii", "cami", "camisi", "mescidi", "mescit", "mescid", "türbesi", "türbe", "kümbeti", "kümbet",
         "külliyesi", "külliye", "ve", "haziresi", "hazire", "medresesi", "medrese", "hamamı", "hamam", "han",
         "hanı", "çeşmesi", "çeşme", "kilisesi", "kilise", "zaviyesi", "zaviye", "tekkesi", "tekke",
         "mosque", "masjid", "tomb", "church", "the", "of", "and", "müze", "müzesi", "darülhadis", "darülhuffaz",
         "kervansarayı", "kervansaray", "makamı", "minaresi", "köyü", "mahallesi", "sarnıcı", "bedesteni"}
TUR_KELIME = {
    "cami": {"cami", "camii", "camisi", "mosque", "mescit", "mescidi"}, "mescit": {"mescit", "mescidi", "mescid", "cami", "camii", "masjid"},
    "turbe": {"türbe", "türbesi", "kümbet", "kümbeti", "tomb", "makamı"}, "medrese": {"medrese", "medresesi", "darülhadis", "darülhuffaz"},
    "han": {"han", "hanı", "kervansaray", "kervansarayı", "bedesten", "bedesteni"}, "hamam": {"hamam", "hamamı"},
    "cesme": {"çeşme", "çeşmesi", "sebil", "sarnıç", "sarnıcı"}, "kilise": {"kilise", "kilisesi", "church"},
}


def kucult(s):
    s = s.replace("I", "ı").replace("İ", "i").lower()
    for a, b in (("â", "a"), ("î", "i"), ("û", "u"), ("’", ""), ("'", "")):
        s = s.replace(a, b)
    return re.sub(r"[^\wçğıöşü ]+", " ", s)


def ad_adaylari(ad):
    """'Sultan Alâeddin (Ulu) Camii' → ['sultan alaeddin camii', 'ulu camii']"""
    adaylar = [re.sub(r"\s*\(.*?\)", "", ad)]
    for ic in re.findall(r"\((.*?)\)", ad):
        son = ad.split(")")[-1].strip()
        for parca in re.split(r"[-–/]", ic):
            adaylar.append(parca.strip() + " " + son)
    return [kucult(a).strip() for a in adaylar if a.strip()]


def cekirdek(s):
    return " ".join(k for k in s.split() if k not in GENEL)


ZAYIF = {"ulu", "yeni", "eski", "orta", "büyük", "küçük", "çarşı", "kale", "pazar", "merkez", "köy", "cuma", "yukarı", "aşağı"}


def benzerlik(eser_adi, osm_adi):
    a, b = kucult(eser_adi), kucult(osm_adi)
    ca, cb = cekirdek(a), cekirdek(b)
    if not ca or not cb:
        return difflib.SequenceMatcher(None, a, b).ratio() * 0.8
    oran = difflib.SequenceMatcher(None, ca, cb).ratio()
    ka, kb = set(ca.split()), set(cb.split())
    ortak = len(ka & kb) / max(len(ka), len(kb))
    if ka <= kb:                                   # eserin adı OSM adının içinde: "Sokullu M. Paşa" ⊂ "Payas Sokullu M. Paşa"
        ortak = max(ortak, 0.95)
    elif kb <= ka and all(len(w) >= 5 and w not in ZAYIF for w in kb):
        ortak = max(ortak, 0.85)                   # OSM sanı atmış: "Alaeddin" ⊂ "Sultan Alaeddin"
    return max(oran, ortak)


def tur_uyumu(tur_id, osm):
    kelimeler = set(kucult(osm["ad"]).split())
    beklenen = TUR_KELIME.get(tur_id)
    if beklenen is None:
        return 0
    if kelimeler & beklenen:
        return 0.08
    baska = set().union(*[v for k, v in TUR_KELIME.items() if k != tur_id]) - beklenen
    if kelimeler & baska:
        return -0.25
    if tur_id in ("cami", "mescit") and osm["etiket"].get("amenity") == "place_of_worship":
        return 0.04
    return 0


def km(a, b):
    return math.dist(a, b) * 111


def overpass(enlem, boylam, yaricap_m):
    sorgu = f"""[out:json][timeout:90];
(
  nwr(around:{yaricap_m},{enlem},{boylam})["name"]["amenity"="place_of_worship"];
  nwr(around:{yaricap_m},{enlem},{boylam})["name"]["historic"];
  nwr(around:{yaricap_m},{enlem},{boylam})["name"]["tourism"~"museum|attraction"];
  nwr(around:{yaricap_m},{enlem},{boylam})["name"]["building"~"mosque|church|religious"];
);
out center tags;"""
    for deneme in range(3):
        cikti = subprocess.run(["curl", "-s", "-m", "120", "-A", "Vakfiye-hackathon/1.0", "--data-urlencode", "data=" + sorgu, OVERPASS],
                               capture_output=True, text=True).stdout
        try:
            return json.loads(cikti).get("elements", [])
        except ValueError:
            time.sleep(10 * (deneme + 1))
    return []


def main():
    metin = open(VERI, encoding="utf-8").read()
    bas, son = metin.index("["), metin.rindex("]") + 1
    eserler = json.loads(metin[bas:son])
    bulunan = json.load(open(KAYIT, encoding="utf-8")) if os.path.exists(KAYIT) else {}

    hedef = [e for e in eserler if e["yaklasik"] and (bulunan.get(e["id"]) is None or bulunan[e["id"]].get("hassasiyet") != "eser")]
    gruplar = {}
    for e in hedef:
        gruplar.setdefault((e["il"], e["ilce"]), []).append(e)
    print(f"{len(hedef)} eser, {len(gruplar)} ilçe taranacak (ilçe başına ~5-20 sn)…")

    kontrol, yeni = [], 0
    for (il, ilce), grup in gruplar.items():
        # ilçenin ortası: o ilçedeki eserlerin (yaklaşık) noktalarının ortalaması
        merkez = (sum(e["enlem"] for e in grup) / len(grup), sum(e["boylam"] for e in grup) / len(grup))
        yaricap = 9000 if ilce in MERKEZ_ILCELER else 30000
        elemanlar = overpass(merkez[0], merkez[1], yaricap)
        osm = []
        for el in elemanlar:
            nokta = (el.get("lat") or el.get("center", {}).get("lat"), el.get("lon") or el.get("center", {}).get("lon"))
            if nokta[0] is None:
                continue
            et = el.get("tags", {})
            for anahtar in ("name", "name:tr", "alt_name", "old_name", "official_name"):
                if et.get(anahtar):
                    for parca in et[anahtar].split(";"):
                        osm.append({"ad": parca.strip(), "nokta": (float(nokta[0]), float(nokta[1])), "etiket": et})
        print(f"  {il} / {ilce}: OpenStreetMap'te {len(osm)} adlı yapı, {len(grup)} eser")
        time.sleep(2)

        for e in grup:
            en_iyi = []
            adaylar = ad_adaylari(e["ad"])
            ayirt_edici = [x for x in adaylar if not set(cekirdek(x).split()) <= ZAYIF]
            if ayirt_edici:          # "Sultan Alâeddin (Ulu)": sıradan "Ulu" adıyla değil, "Sultan Alâeddin" ile ara
                adaylar = ayirt_edici
            for sira_no, aday in enumerate(adaylar):
                for o in osm:
                    puan = benzerlik(aday, o["ad"]) + tur_uyumu(e["turId"], o) - (0.1 if sira_no else 0)
                    en_iyi.append((round(puan, 3), -km(merkez, o["nokta"]), o, aday))
            en_iyi.sort(key=lambda x: (x[0], x[1]), reverse=True)
            if not en_iyi:
                continue
            puan, _, o, aday = en_iyi[0]
            ikinci = next((p for p, _, x, _a in en_iyi[1:] if x["ad"] != o["ad"] or km(x["nokta"], o["nokta"]) > 0.3), 0)
            zayif = set(cekirdek(aday).split()) <= ZAYIF                  # "Ulu Camii" gibi her yerde olan adlar
            onceki = bulunan.get(e["id"])                                  # sokak/mahalle düzeyinde bulunmuş nokta
            uzak = bool(onceki) and km((onceki["enlem"], onceki["boylam"]), o["nokta"]) > (1.5 if onceki["hassasiyet"] == "sokak" else 3)
            if zayif:      # sıradan ad: ancak çevrede bu adla tek yapı varsa kabul
                emin = puan >= 0.95 and puan - ikinci >= 0.1 and not uzak
            else:          # adı çok iyi uyuşuyorsa önceki sokak/mahalle tahmini yanlış olabilir, onu dikkate alma
                emin = puan >= 0.95 or ((puan >= 0.9 or (puan >= 0.85 and puan - ikinci >= 0.1)) and not uzak)
            satir = {"id": e["id"], "il": il, "ilce": ilce, "eser": e["ad"], "osm_adi": o["ad"], "puan": puan,
                     "enlem": round(o["nokta"][0], 6), "boylam": round(o["nokta"][1], 6),
                     "harita": f"https://www.openstreetmap.org/?mlat={o['nokta'][0]}&mlon={o['nokta'][1]}#map=18/{o['nokta'][0]}/{o['nokta'][1]}"}
            if emin:
                bulunan[e["id"]] = {"enlem": satir["enlem"], "boylam": satir["boylam"], "hassasiyet": "eser",
                                    "osm": o["ad"], "kaynak": "overpass", "puan": puan}
                yeni += 1
                print(f"    ✓ {e['ad']}  →  {o['ad']}  ({puan})")
            elif puan >= 0.7:
                satir["durum"] = "kontrol et"
                kontrol.append(satir)
        json.dump(bulunan, open(KAYIT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    for e in eserler:
        s = bulunan.get(e["id"])
        if s:
            e["enlem"], e["boylam"] = s["enlem"], s["boylam"]
            e["yaklasik"] = s["hassasiyet"] != "eser"
    open(VERI, "w", encoding="utf-8").write(metin[:bas] + "[\n" + ",\n".join("  " + json.dumps(e, ensure_ascii=False) for e in eserler) + "\n]" + metin[son:])

    with open(KONTROL, "w", encoding="utf-8", newline="") as f:
        yaz = csv.DictWriter(f, fieldnames=["durum", "id", "il", "ilce", "eser", "osm_adi", "puan", "enlem", "boylam", "harita"])
        yaz.writeheader()
        yaz.writerows(kontrol)
    kalan = sum(1 for e in eserler if e["yaklasik"])
    print(f"\nBitti. {yeni} eserin tam yeri bulundu. Yaklaşık kalan: {kalan}. "
          f"Emin olunamayan {len(kontrol)} eşleşme {KONTROL} dosyasında.")


if __name__ == "__main__":
    main()
