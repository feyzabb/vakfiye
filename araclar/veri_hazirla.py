"""
Vakfiye veri hazırlayıcı
------------------------
Ekibin veri setindeki eserler.json dosyasından uygulamanın okuduğu iki dosyayı üretir:
  veri.js     → ESERLER listesi (Türkçe, uygulamanın kullandığı alanlar)
  veri-en.js  → VERI_CEVIRI sözlüğü (eser adları, dönemler, bilgilerin İngilizcesi)

Yeni bir şehrin eserleri veri setine eklendiğinde (her kaydın "il" alanıyla)
bu komutu yeniden çalıştırmak yeterli; şehir uygulamada kendiliğinden açılır.

Kullanım (vakfiye-app klasöründeyken):
  python3 araclar/veri_hazirla.py /yol/eserler.json
"""
import json
import sys


def donem_yazisi(donem):
    if not donem:
        return "", ""
    if donem.get("yapim_yili"):
        yil = str(donem["yapim_yili"])
        return yil, yil
    metin = donem.get("metin") or {}
    return metin.get("tr", ""), metin.get("en", "")


def main():
    if len(sys.argv) != 2:
        sys.exit("Kullanım: python3 araclar/veri_hazirla.py /yol/eserler.json")

    with open(sys.argv[1], encoding="utf-8") as dosya:
        veri = json.load(dosya)

    eserler = []
    ceviri = {}
    for eser in veri["eserler"]:
        if eser.get("taslak"):          # doğrulanmamış kayıtlar yayında gösterilmez
            continue
        donem_tr, donem_en = donem_yazisi(eser.get("donem"))
        eserler.append({
            "id": eser["id"],
            "il": eser["il"]["ad"],
            "ad": eser["ad"]["tr"],
            "tur": eser["tur"]["ad"],
            "turId": eser["tur"]["id"],
            "ilce": eser["ilce"]["deger"],
            "donem": donem_tr,
            "banisi": eser["banisi"]["deger"] if eser.get("banisi") else "",
            "enlem": eser["konum"]["enlem"],
            "boylam": eser["konum"]["boylam"],
            "yaklasik": eser["konum"]["hassasiyet"] != "eser",
            "olgular": [
                {"metin": o["metin"]["tr"], "kategori": o["kategori"], "sayfa": o.get("sayfa", "")}
                for o in eser["olgular"]
            ],
        })
        ceviri[eser["ad"]["tr"]] = eser["ad"].get("en", eser["ad"]["tr"])
        if donem_tr and donem_en and donem_tr != donem_en:
            ceviri[donem_tr] = donem_en
        for o in eser["olgular"]:
            if o["metin"].get("en"):
                ceviri[o["metin"]["tr"]] = o["metin"]["en"]

    with open("veri.js", "w", encoding="utf-8") as dosya:
        dosya.write("// Vakfiye veri seti (Vakıf Katılım envanterinden). araclar/veri_hazirla.py ile üretildi.\n")
        dosya.write("// Elle düzenleme; veri seti güncellenince komutu yeniden çalıştır.\n")
        dosya.write("const ESERLER = [\n")
        dosya.write(",\n".join("  " + json.dumps(e, ensure_ascii=False) for e in eserler))
        dosya.write("\n];\n")

    with open("veri-en.js", "w", encoding="utf-8") as dosya:
        dosya.write("// Veri setinin İngilizce karşılıkları. araclar/veri_hazirla.py ile üretildi.\n")
        dosya.write("const VERI_CEVIRI = {\n")
        dosya.write(",\n".join("  " + json.dumps(k, ensure_ascii=False) + ": " + json.dumps(v, ensure_ascii=False)
                               for k, v in ceviri.items()))
        dosya.write("\n};\n")

    sehirler = {}
    for e in eserler:
        sehirler[e["il"]] = sehirler.get(e["il"], 0) + 1
    print(f"{len(eserler)} eser yazıldı → veri.js, {len(ceviri)} çeviri → veri-en.js")
    for il, sayi in sehirler.items():
        print(f"  {il}: {sayi} eser")


if __name__ == "__main__":
    main()
