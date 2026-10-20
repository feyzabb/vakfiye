"""
Konum son dokunuş
-----------------
1) konum_kontrol.csv'deki doğru olduğu görülen 4 eşleşmeyi kabul eder.
2) Rotadaki ünlü eserleri, OpenStreetMap'teki bilinen adlarıyla tek tek arar.

Kullanım (vakfiye-app klasöründeyken):
  python3 araclar/konum_elle.py
"""
import json
import math
import subprocess
import time
import urllib.parse

VERI = "veri.js"
KAYIT = "araclar/konumlar.json"

# Kontrol listesinden elle onaylananlar
KABUL = {
    "garip-nasrullah-camii-konya": (37.885491, 32.527312, "Sedirler Garipnasrullah Cami"),
    "igdeli-sultan-camii-konya": (37.844107, 32.487381, "İğdeli Cami"),
    "topraklik-hasan-efendi-camii-konya": (37.866207, 32.510243, "Topraklık Hacı Hasan Cami"),
    "muallimhane-sofuhane-camii-ve-turbesi-konya": (37.419668, 31.845116, "Muallimhane Cami"),
}

# Rotadaki eserler: OpenStreetMap'te bilinen adlarıyla (sırayla denenir)
ARANACAK = {
    "sultan-alaeddin-ulu-camii-konya": ["Alaeddin Camii, Selçuklu, Konya", "Alâeddin Camii, Konya"],
    "ince-minareli-medrese-sahip-ata-darulhadis-konya": ["İnce Minareli Medrese, Konya", "İnce Minareli Medrese Müzesi, Konya"],
    "habib-i-neccar-camii-ve-kulliyesi-hatay": ["Habib-i Neccar Camii, Antakya", "Habibi Neccar Camii, Antakya", "Habib-i Neccar Camii, Hatay"],
    "ulu-camii-ve-kulliyesi-hatay": ["Ulu Camii, Antakya", "Ulu Cami, Antakya", "Antakya Ulu Camii"],
    "sarimiye-camii-hatay": ["Sarımiye Camii, Antakya", "Sarımiye Cami, Antakya"],
    "kanuni-sultan-suleyman-kervansarayi-hatay": ["Kanuni Sultan Süleyman Kervansarayı, Belen", "Belen Kervansarayı, Hatay", "Kanuni Kervansarayı, Belen"],
}


def ara(sorgu):
    adres = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode(
        {"q": sorgu, "format": "json", "limit": 1, "countrycodes": "tr", "accept-language": "tr"})
    time.sleep(1.1)
    cikti = subprocess.run(["curl", "-s", "-m", "20", "-A", "Vakfiye-hackathon/1.0", adres], capture_output=True, text=True).stdout
    try:
        sonuc = json.loads(cikti)
        return sonuc[0] if sonuc else None
    except ValueError:
        return None


def main():
    metin = open(VERI, encoding="utf-8").read()
    bas, son = metin.index("["), metin.rindex("]") + 1
    eserler = json.loads(metin[bas:son])
    bulunan = json.load(open(KAYIT, encoding="utf-8"))

    for kimlik, (enlem, boylam, ad) in KABUL.items():
        bulunan[kimlik] = {"enlem": enlem, "boylam": boylam, "hassasiyet": "eser", "osm": ad, "kaynak": "elle-onay"}
        print(f"✓ onaylandı: {kimlik} → {ad}")

    yer = {e["id"]: (e["enlem"], e["boylam"]) for e in eserler}
    for kimlik, sorgular in ARANACAK.items():
        sonuc = None
        for sorgu in sorgular:
            aday = ara(sorgu)
            # yanlış şehirden bir sonuç gelmesin: eserin şimdiki (ilçe) noktasına 40 km'den yakın olmalı
            if aday and math.dist(yer[kimlik], (float(aday["lat"]), float(aday["lon"]))) * 111 < 40:
                sonuc = aday
                break
        if sonuc:
            bulunan[kimlik] = {"enlem": round(float(sonuc["lat"]), 6), "boylam": round(float(sonuc["lon"]), 6),
                               "hassasiyet": "eser", "osm": sonuc.get("display_name", "")[:120], "kaynak": "elle-arama"}
            print(f"✓ bulundu: {kimlik} → {sonuc.get('display_name', '')[:80]}")
        else:
            print(f"– bulunamadı: {kimlik}")

    json.dump(bulunan, open(KAYIT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    for e in eserler:
        s = bulunan.get(e["id"])
        if s:
            e["enlem"], e["boylam"] = s["enlem"], s["boylam"]
            e["yaklasik"] = s["hassasiyet"] != "eser"
    open(VERI, "w", encoding="utf-8").write(metin[:bas] + "[\n" + ",\n".join("  " + json.dumps(e, ensure_ascii=False) for e in eserler) + "\n]" + metin[son:])
    print("Bitti. Yaklaşık kalan:", sum(1 for e in eserler if e["yaklasik"]))


if __name__ == "__main__":
    main()
