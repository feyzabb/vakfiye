"""
Konumu elle gir: Google Haritalar'dan kopyalanan koordinatı esere yazar.
Google Haritalar'da (bilgisayarda) yapının üstüne SAĞ tıkla → en üstteki sayılara tıkla (kopyalanır) → buraya yapıştır.
Boş bırakıp Enter'a basarsan o eser atlanır.
Kullanım: python3 araclar/konum_gir.py
"""
import json, math

VERI, KAYIT = "veri.js", "araclar/konumlar.json"
SIRA = [
    ("sultan-alaeddin-ulu-camii-konya", "Alaeddin Camii, Konya"),
    ("ince-minareli-medrese-sahip-ata-darulhadis-konya", "İnce Minareli Medrese, Konya"),
    ("habib-i-neccar-camii-ve-kulliyesi-hatay", "Habib-i Neccar Camii, Antakya"),
    ("sarimiye-camii-hatay", "Sarımiye Camii, Antakya"),
    ("kanuni-sultan-suleyman-kervansarayi-hatay", "Kanuni Sultan Süleyman Kervansarayı, Belen"),
]

metin = open(VERI, encoding="utf-8").read()
bas, son = metin.index("["), metin.rindex("]") + 1
eserler = json.loads(metin[bas:son])
yer = {e["id"]: e for e in eserler}
bulunan = json.load(open(KAYIT, encoding="utf-8"))

for kimlik, arama in SIRA:
    e = yer[kimlik]
    if e["yaklasik"] is False:
        print(f"✓ {e['ad']} zaten tam yerinde, atlandı")
        continue
    while True:
        giris = input(f"\n{e['ad']}\n  Google Haritalar'da ara: {arama}\n  Koordinatı yapıştır (ör. 37.8729, 32.4925): ").strip()
        if giris == "":
            print("  atlandı")
            break
        try:
            enlem, boylam = [float(x) for x in giris.replace(";", ",").split(",")[:2]]
        except ValueError:
            print("  Anlaşılamadı. İki sayı arasında virgül olmalı: 37.8729, 32.4925")
            continue
        if math.dist((e["enlem"], e["boylam"]), (enlem, boylam)) * 111 > 40:
            print("  Bu nokta eserin ilçesine çok uzak görünüyor, tekrar kontrol et.")
            continue
        bulunan[kimlik] = {"enlem": round(enlem, 6), "boylam": round(boylam, 6), "hassasiyet": "eser", "kaynak": "elle-giris"}
        e["enlem"], e["boylam"], e["yaklasik"] = round(enlem, 6), round(boylam, 6), False
        print("  ✓ kaydedildi")
        break

json.dump(bulunan, open(KAYIT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
open(VERI, "w", encoding="utf-8").write(metin[:bas] + "[\n" + ",\n".join("  " + json.dumps(x, ensure_ascii=False) for x in eserler) + "\n]" + metin[son:])
print("\nBitti. Yaklaşık kalan:", sum(1 for x in eserler if x["yaklasik"]))
