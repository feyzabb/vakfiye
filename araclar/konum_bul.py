"""
Konum bulucu
------------
veri.js'teki yaklaşık konumlu eserlerin (şimdilik ilçe merkezinde duranlar) gerçek
yerini OpenStreetMap'te arar ve veri.js'i günceller.

Sırayla dener:
  1) Eserin adı + ilçe          → bulursa eserin kendi noktası
  2) Kitaptaki adresin sokağı  → sokak üzerinde
  3) Kitaptaki adresin mahallesi → mahalle merkezi
Bulunanlar araclar/konumlar.json'a da yazılır; komutu yarıda kesersen kaldığı yerden devam eder.

Kullanım (vakfiye-app klasöründeyken):
  python3 araclar/konum_bul.py
"""
import json
import math
import os
import re
import subprocess
import time
import urllib.parse

VERI = "veri.js"
KAYIT = "araclar/konumlar.json"
ARALIK = 1.1   # OpenStreetMap kuralı: saniyede en fazla 1 istek


def ara(sorgu, merkez, yaricap):
    """Nominatim'de ara; yalnızca ilçe merkezine yakın sonuçları kabul et."""
    enlem, boylam = merkez
    kutu = f"{boylam - yaricap},{enlem + yaricap},{boylam + yaricap},{enlem - yaricap}"
    adres = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({
        "q": sorgu, "format": "json", "limit": 3, "countrycodes": "tr",
        "viewbox": kutu, "bounded": 1, "accept-language": "tr"})
    time.sleep(ARALIK)
    cikti = subprocess.run(["curl", "-s", "-m", "20", "-A", "Vakfiye-hackathon/1.0", adres],
                           capture_output=True, text=True).stdout
    try:
        return json.loads(cikti)
    except ValueError:
        return []


def adres_parcalari(eser):
    """Kitaptaki adres cümlesinden mahalle ve sokak/cadde adını çıkar."""
    cumle = next((o["metin"] for o in eser["olgular"] if "yer al" in o["metin"] or "bulunmaktadır" in o["metin"]), "")
    mahalle = re.search(r"([A-ZÇĞİÖŞÜ][\wçğıöşüâîû]+(?: [A-ZÇĞİÖŞÜ][\wçğıöşüâîû]+)*) Mahalle", cumle)
    sokak = re.search(r"([A-ZÇĞİÖŞÜ0-9][\wçğıöşüâîû.]*(?: [A-ZÇĞİÖŞÜ0-9][\wçğıöşüâîû.]*)* (?:Sokak|Sokağı|Caddesi|Cadde|Bulvarı))", cumle)
    koy = re.search(r"([A-ZÇĞİÖŞÜ][\wçğıöşüâîû]+) (?:Köyü|Kasabası|Beldesi)", cumle)
    if mahalle:
        yer = mahalle.group(1) + " Mahallesi"
    elif koy:
        yer = koy.group(0).split("’")[0]
    else:
        yer = None
    return yer, (sokak.group(1) if sokak else None)


def mesafe_km(a, b):
    return math.dist(a, b) * 111


def main():
    metin = open(VERI, encoding="utf-8").read()
    bas = metin.index("[")
    son = metin.rindex("]") + 1
    eserler = json.loads(metin[bas:son])
    bulunan = json.load(open(KAYIT, encoding="utf-8")) if os.path.exists(KAYIT) else {}

    bekleyen = [e for e in eserler if e["yaklasik"] and e["id"] not in bulunan]
    print(f"{len(bekleyen)} eserin konumu aranacak (yaklaşık {len(bekleyen) * 3 // 60 + 1} dakika)…")

    for sira, eser in enumerate(bekleyen, 1):
        merkez = (eser["enlem"], eser["boylam"])
        yaricap = 0.12 if eser["ilce"] in ("Karatay", "Meram", "Selçuklu") else 0.35
        yer = f"{eser['ilce']}, {eser['il']}"
        ad = re.sub(r"\s*\(.*?\)", "", eser["ad"])
        mahalle, sokak = adres_parcalari(eser)

        denemeler = [(f"{ad}, {yer}", "eser")]
        if sokak:
            denemeler.append((f"{sokak}, {mahalle + ', ' if mahalle else ''}{yer}", "sokak"))
        if mahalle:
            denemeler.append((f"{mahalle}, {yer}", "mahalle"))

        sonuc = None
        for sorgu, hassasiyet in denemeler:
            for s in ara(sorgu, merkez, yaricap):
                nokta = (float(s["lat"]), float(s["lon"]))
                # ad aramasında gelen sonuç gerçekten bir yapı/eser olsun (aynı adlı mahalle değil)
                if hassasiyet == "eser" and s.get("class") not in ("amenity", "historic", "tourism", "building", "religion"):
                    continue
                sonuc = {"enlem": round(nokta[0], 6), "boylam": round(nokta[1], 6), "hassasiyet": hassasiyet,
                         "osm": s.get("display_name", "")[:120]}
                break
            if sonuc:
                break

        if sonuc:
            bulunan[eser["id"]] = sonuc
            print(f"[{sira}/{len(bekleyen)}] ✓ {eser['ad']} → {sonuc['hassasiyet']} ({mesafe_km(merkez, (sonuc['enlem'], sonuc['boylam'])):.1f} km)")
        else:
            bulunan[eser["id"]] = None
            print(f"[{sira}/{len(bekleyen)}] – {eser['ad']}: bulunamadı, ilçe merkezinde kalacak")
        json.dump(bulunan, open(KAYIT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    # veri.js'i güncelle
    for eser in eserler:
        s = bulunan.get(eser["id"])
        if s:
            eser["enlem"], eser["boylam"] = s["enlem"], s["boylam"]
            eser["yaklasik"] = s["hassasiyet"] != "eser"
    yeni = metin[:bas] + "[\n" + ",\n".join("  " + json.dumps(e, ensure_ascii=False) for e in eserler) + "\n]" + metin[son:]
    open(VERI, "w", encoding="utf-8").write(yeni)

    sayac = {}
    for s in bulunan.values():
        anahtar = s["hassasiyet"] if s else "bulunamadı"
        sayac[anahtar] = sayac.get(anahtar, 0) + 1
    print("Bitti. veri.js güncellendi:", sayac)


if __name__ == "__main__":
    main()
