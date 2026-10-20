import re

DEGISIKLIK = [
    ("uygulama.js",
     '''// Giriş yapmış (ya da misafir olmayı seçmiş) kullanıcı "Başla"ya basınca doğrudan ana ekrana geçsin
document.addEventListener("click", (olay) => {
  if (olay.target.closest("#basla") && oturum !== null) {
    olay.stopImmediatePropagation();
    document.getElementById("acilis").hidden = true;
    anaEkranaGec();
  }
}, true);''',
     '''// "Başla" her zaman tanıtımı açar; tanıtımı geçmek isteyen sağ üstteki "Atla"ya basar.'''),
    ("uygulama.js",
     'if (olay.target.closest("#ileri") && sira === sayfalar.length - 1 && oturum === null) {',
     'if (olay.target.closest("#ileri") && sira === sayfalar.length - 1 && (oturum === null || oturum.misafir)) {'),
    ("index.html",
     '''    <div class="tanitim" id="tanitim" hidden>
      <div class="noktalar" id="noktalar">''',
     '''    <div class="tanitim" id="tanitim" hidden>
      <button class="tanitim-atla" id="tanitim-atla">Atla</button>
      <div class="noktalar" id="noktalar">'''),
]

EK_JS = '''

/* ================= GİRİŞ AKIŞI ================= */
// Başla → tanıtım (Atla ile geçilebilir) → üye değilse Üye ol / Giriş yap ekranı (Üye olmadan devam et ile geçilebilir)
document.getElementById("tanitim-atla").addEventListener("click", () => {
  sira = sayfalar.length - 1;
  document.getElementById("ileri").click();
});
document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK !== "undefined") Object.assign(SOZLUK, { "Atla": "Skip" });
});
'''

EK_CSS = '''
/* ===== TANITIMI ATLA ===== */
.tanitim { position: relative; }
.tanitim-atla {
  position: absolute; top: 24px; right: 20px;
  border: none; background: transparent; color: var(--teknoloji);
  font-family: var(--govde-yazi); font-size: 15px; font-weight: 700; padding: 6px 8px; cursor: pointer;
}
'''

u = open("uygulama.js", encoding="utf-8").read()
h = open("index.html", encoding="utf-8").read()
if "GİRİŞ AKIŞI =====" in u:
    print("Giriş akışı zaten güncellenmiş")
else:
    dosyalar = {"uygulama.js": u, "index.html": h}
    eksik = [eski[:60] for d, eski, _ in DEGISIKLIK if dosyalar[d].count(eski) != 1]
    if eksik:
        print("DEĞİŞTİRİLMEDİ, şu satırlar bulunamadı:", eksik)
    else:
        for d, eski, yeni in DEGISIKLIK:
            dosyalar[d] = dosyalar[d].replace(eski, yeni)
        open("uygulama.js", "w", encoding="utf-8").write(dosyalar["uygulama.js"] + EK_JS)
        h = dosyalar["index.html"]
        open("stil.css", "a", encoding="utf-8").write(EK_CSS)
        print("Giriş akışı güncellendi: Başla → tanıtım → üye ol")
h = re.sub(r'\?v=\w+"', '?v=16"', h)
open("index.html", "w", encoding="utf-8").write(h)
print("Sürüm etiketi v=16:", h.count("?v=16"))
