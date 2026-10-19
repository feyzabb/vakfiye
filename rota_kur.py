import re

ROTA_KODU = '''
// Her şehrin pasaport rotası. ROTA dizisi seçili şehrin rotasını gösterir.
const ROTALAR = {
  Bursa: ROTA.slice(),
  Konya: [
    { id: "mevlana-turbesi-muze-konya",                            ust: "MEVLÂNA",        alt: "KONYA · KARATAY" },
    { id: "sultan-alaeddin-ulu-camii-konya",                       ust: "ALÂEDDİN CAMİİ", alt: "KONYA · SELÇUKLU" },
    { id: "karatay-medresesi-konya",                               ust: "KARATAY",        alt: "KONYA · MEDRESE" },
    { id: "ince-minareli-medrese-sahip-ata-darulhadis-konya",      ust: "İNCE MİNARELİ",  alt: "KONYA · MEDRESE" },
    { id: "sircali-medrese-konya",                                 ust: "SIRÇALI",        alt: "KONYA · 1242" },
    { id: "aziziye-camii-konya",                                   ust: "AZİZİYE",        alt: "KONYA · KARATAY" }
  ],
  Hatay: [
    { id: "habib-i-neccar-camii-ve-kulliyesi-hatay",               ust: "HABİB-İ NECCAR", alt: "HATAY · ANTAKYA" },
    { id: "ulu-camii-ve-kulliyesi-hatay",                          ust: "ULU CAMİ",       alt: "HATAY · ANTAKYA" },
    { id: "sarimiye-camii-hatay",                                  ust: "SARIMİYE",       alt: "HATAY · ANTAKYA" },
    { id: "kursunlu-han-hatay",                                    ust: "KURŞUNLU HAN",   alt: "HATAY · ANTAKYA" },
    { id: "kanuni-sultan-suleyman-kervansarayi-hatay",             ust: "KERVANSARAY",    alt: "HATAY · BELEN" },
    { id: "sokullu-mehmet-pasa-kulliyesi-hatay",                   ust: "SOKULLU",        alt: "HATAY · PAYAS" }
  ]
};
let rotaSehri = "Bursa";
function rotaBul(id) { return Object.keys(ROTALAR).find((s) => ROTALAR[s].some((d) => d.id === id)) || null; }
function rotayiSec(sehir) {
  if (ROTALAR[sehir] === undefined) return;
  rotaSehri = sehir;
  ROTA.length = 0;
  ROTALAR[sehir].forEach((d) => ROTA.push(d));
}
function rotadakiPulSayisi() { return ROTA.filter((d) => pullar.includes(d.id)).length; }
function rotaAdi() { return rotaSehri + " rotası"; }
'''

DEGISIKLIK = [
    ('const PASAPORT_NO = "VK-2026-0001";', 'const PASAPORT_NO = "VK-2026-0001";\n' + ROTA_KODU),
    ('<small>Bursa rotası${pullar.includes(durak.id)', '<small>${rotaAdi()}${pullar.includes(durak.id)'),
    ('''  yeniPul = id;

  if (pullar.length === ROTA.length) bildir("🏅 Rozet kazandın: Bursa rotası tamam!");
  else if (pullar.length === 3) bildir("🏅 Rozet kazandın: Yarı yol!");''',
     '''  yeniPul = id;
  if (rotaBul(id) && rotaBul(id) !== rotaSehri) rotayiSec(rotaBul(id));
  const rotada = rotadakiPulSayisi();

  if (rotada === ROTA.length) bildir("🏅 Rozet kazandın: " + rotaAdi() + " tamam!");
  else if (rotada === 3) bildir("🏅 Rozet kazandın: Yarı yol!");'''),
    ('''function pasaportuCiz() {
  const sayi = pullar.length;''', '''function pasaportuCiz() {
  const sayi = rotadakiPulSayisi();'''),
    ('{ simge: "🏛️", ad: "Bursa rotası tamam", aciklama: "6 pulun hepsini topla", gereken: 6 }',
     '{ simge: "🏛️", ad: rotaAdi() + " tamam", aciklama: "6 pulun hepsini topla", gereken: 6 }'),
    ('''    <div class="kart">
      <div class="pul-sayac">
        <span class="kart-baslik">BURSA ROTASI</span>''',
     '''    <div class="rota-secici" role="tablist">
      ${Object.keys(ROTALAR).map((s) => `<button class="${s === rotaSehri ? "secili" : ""}" data-rota="${s}">${s}</button>`).join("")}
    </div>
    <div class="kart">
      <div class="pul-sayac">
        <span class="kart-baslik">${rotaAdi().toLocaleUpperCase("tr")}</span>'''),
    ('if (ROTA.some((d) => d.id === id)) { pulAl(id); return; }', 'if (rotaBul(id)) { pulAl(id); return; }'),
    ('bulutta.forEach((id) => { if (pullar.includes(id) === false && ROTA.some((d) => d.id === id))',
     'bulutta.forEach((id) => { if (pullar.includes(id) === false && rotaBul(id))'),
]

EK_JS = '''

/* ================= ŞEHİR ROTALARI ================= */
// Şehir seçilince pasaport ve Tara sekmesi o şehrin rotasını gösterir; pasaportta rota sekmeleri de var.
const sehirSecRotasiz = sehirSec;
sehirSec = function (ad) {
  sehirSecRotasiz(ad);
  if (ROTALAR[ad]) rotayiSec(ad);
  const pasaport = document.getElementById("sekme-pasaport");
  if (pasaport && pasaport.hidden === false) pasaportuCiz();
  const tara = document.getElementById("sekme-tara");
  if (tara && tara.hidden === false) tarayiCiz();
};
document.getElementById("sekme-pasaport").addEventListener("click", (olay) => {
  const sekme = olay.target.closest("[data-rota]");
  if (sekme) { rotayiSec(sekme.dataset.rota); pasaportuCiz(); }
});
if (typeof secilenSehir !== "undefined" && ROTALAR[secilenSehir]) rotayiSec(secilenSehir);

document.addEventListener("DOMContentLoaded", () => {
  if (typeof KALIPLAR === "undefined") return;
  KALIPLAR.push(
    [/^(.+) rotası$/, (m) => `${m[1]} route`],
    [/^(.+) ROTASI$/, (m) => `${m[1]} ROUTE`],
    [/^(.+) rotası tamam$/, (m) => `${m[1]} route complete`],
    [/^🏅 Rozet kazandın: (.+) rotası tamam!$/, (m) => `🏅 Badge earned: ${m[1]} route complete!`]
  );
});
'''

EK_CSS = '''
/* ===== ŞEHİR ROTALARI ===== */
.rota-secici { display: flex; gap: 6px; background: #EAE3D3; border-radius: 12px; padding: 4px; }
.rota-secici button {
  flex: 1; border: none; background: transparent; padding: 9px; border-radius: 9px; cursor: pointer;
  font-family: var(--govde-yazi); font-size: 15px; font-weight: 700; color: var(--metin);
}
.rota-secici button.secili { background: #fff; color: var(--ana-lacivert); box-shadow: 0 1px 3px rgba(0,0,0,.08); }
body.kontrast .rota-secici { background: #fff; border: 1px solid #000; }
'''

u = open("uygulama.js", encoding="utf-8").read()
if "ŞEHİR ROTALARI" in u:
    print("Şehir rotaları zaten eklenmiş")
else:
    eksik = [eski[:60] for eski, _ in DEGISIKLIK if u.count(eski) != 1]
    if eksik:
        print("DEĞİŞTİRİLMEDİ, şu satırlar bulunamadı:", eksik)
    else:
        for eski, yeni in DEGISIKLIK:
            u = u.replace(eski, yeni)
        open("uygulama.js", "w", encoding="utf-8").write(u + EK_JS)
        open("stil.css", "a", encoding="utf-8").write(EK_CSS)
        print("Şehir rotaları eklendi (Bursa, Konya, Hatay)")
h = open("index.html", encoding="utf-8").read()
h = re.sub(r'\?v=\w+"', '?v=15"', h)
open("index.html", "w", encoding="utf-8").write(h)
print("Sürüm etiketi v=15:", h.count("?v=15"))
