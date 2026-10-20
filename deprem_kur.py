import re
JS='\n\n/* ================= HATAY DEPREM NOTU ================= */\n// Hatay envanteri 2022\'de yayımlandı; 6 Şubat 2023 depremlerinden önceki durumu anlatır.\nconst DEPREM_NOTU = "Bu bilgiler 2022\'de yayımlanan Hatay envanterine aittir. 6 Şubat 2023 depremlerinde Hatay\'daki birçok vakıf eseri hasar gördü ya da yıkıldı; eserin bugünkü durumu farklı olabilir. Ziyaret etmeden önce kontrol edin.";\n\nconst eserKartiniAcDepremsiz = eserKartiniAc;\neserKartiniAc = function (eserId) {\n  eserKartiniAcDepremsiz(eserId);\n  const eser = ESERLER.find((e) => e.id === eserId);\n  if (eser && eser.il === "Hatay") {\n    document.querySelector("#eser-karti .rozetler").insertAdjacentHTML("afterend",\n      `<div class="deprem-notu" role="note"><span aria-hidden="true">⚠️</span><span>${DEPREM_NOTU}</span></div>`);\n  }\n};\n\nfunction depremBandi() {\n  const eski = document.getElementById("deprem-bandi");\n  if (eski) eski.remove();\n  if (typeof secilenSehir === "undefined" || secilenSehir !== "Hatay") return;\n  document.getElementById("sayac").insertAdjacentHTML("beforebegin", `\n    <div class="deprem-notu" id="deprem-bandi" role="note"><span aria-hidden="true">⚠️</span>\n      <span>Hatay envanteri 2023 depremlerinden önce hazırlandı. Eserlerin bugünkü durumu farklı olabilir.</span></div>`);\n}\nconst sehirSecDepremsiz = sehirSec;\nsehirSec = function (ad) { sehirSecDepremsiz(ad); depremBandi(); };\n\ndocument.addEventListener("DOMContentLoaded", () => {\n  if (typeof SOZLUK === "undefined") return;\n  Object.assign(SOZLUK, {\n    [DEPREM_NOTU]: "This information comes from the Hatay inventory published in 2022. Many endowed monuments in Hatay were damaged or destroyed in the earthquakes of 6 February 2023; the monument\'s current condition may differ. Please check before visiting.",\n    "Hatay envanteri 2023 depremlerinden önce hazırlandı. Eserlerin bugünkü durumu farklı olabilir.":\n      "The Hatay inventory was prepared before the 2023 earthquakes. The monuments\' current condition may differ."\n  });\n});\n'
CSS='\n/* ===== HATAY DEPREM NOTU ===== */\n.deprem-notu {\n  display: flex; gap: 10px; align-items: flex-start;\n  background: #FFF4D6; border: 1px solid #F0D58A; color: #5C4500;\n  border-radius: 14px; padding: 12px 14px; font-size: 14px; line-height: 1.45;\n}\n.deprem-notu > span:first-child { font-size: 18px; line-height: 1.2; }\n#eser-karti .deprem-notu { margin: 4px 0 12px; }\nbody.kontrast .deprem-notu { background: #fff; border: 2px solid #000; color: #000; }\n'
u=open("uygulama.js",encoding="utf-8").read()
if "HATAY DEPREM NOTU" in u:
    print("Deprem notu zaten eklenmiş")
elif "SERGİLER =====" not in u:
    print("Önce sergi_kur.py çalıştırılmalı; ekleme yapılmadı")
else:
    open("uygulama.js","a",encoding="utf-8").write(JS)
    open("stil.css","a",encoding="utf-8").write(CSS)
    print("Hatay deprem notu eklendi")
h=open("index.html",encoding="utf-8").read()
h=re.sub(r'\?v=\w+"','?v=17"',h)
open("index.html","w",encoding="utf-8").write(h)
print("Sürüm etiketi v=17:", h.count("?v=17"))
