/* =====================================================================
   VAKFİYE · İNGİLİZCE DİL DESTEĞİ
   Uygulamanın kodu Türkçe yazmaya devam eder. Bu dosya, dil English
   seçiliyse ekrana gelen her Türkçe yazıyı sözlükten bulup İngilizcesiyle
   değiştirir. Yeni bir yazı eklersen İngilizcesini SOZLUK'e eklemen yeterli.
   Eser adları ve envanter bilgileri veri-en.js dosyasındaki VERI_CEVIRI'den gelir.
   ===================================================================== */

const SOZLUK = {
  // Açılış ve tanıtım
  "BURSA · VAKIF ESERLERİ": "BURSA · ENDOWED MONUMENTS",
  "Vakıf eserlerinin hikâyesi,": "The story of endowed monuments,",
  "kaynağıyla.": "with its sources.",
  "Başla": "Start",
  "Veriler: Vakıf Katılım, Bursa Vakıf Eserleri envanteri": "Data: Vakıf Katılım, Bursa Foundation Monuments inventory",
  "İleri": "Next",
  "Başlayalım": "Let's go",
  "Bir iyilik yüzyıllarca sürebilir": "One good deed can last for centuries",
  "Han ve dükkânların kirası aşevini, medreseyi, çeşmeyi yaşattı. Vakfiye, Bursa'daki vakıf eserlerinde bu iyiliğin izini sürer.":
    "Rents from inns and shops kept soup kitchens, madrasas and fountains alive. Vakfiye follows that trail through Bursa's endowed monuments.",
  "Her bilgi kaynağıyla": "Every fact with its source",
  "Eserlerle ilgili her bilgi Vakıf Katılım envanter kitabından, sayfa numarasıyla gelir. Bilmediğimizi uydurmayız.":
    "Every fact comes from the Vakıf Katılım inventory book, with its page number. We never make things up.",
  "Gez, damgalat, rozet kazan": "Visit, get stamped, earn badges",
  "Ziyaret ettiğin eserin damgası kâğıt pasaportuna basılır; aynı pul telefonunda belirir.":
    "The monument's stamp goes into your paper passport; the same stamp appears on your phone.",
  "Han": "Inn", "Hamam": "Bath", "Dükkân": "Shop", "Vakıf sandığı": "Endowment chest",
  "Aşevi": "Soup kitchen", "Medrese": "Madrasa", "Çeşme": "Fountain",
  "Minaresi neden ilginç?": "Why is its minaret special?",
  "İmamının adı neydi?": "What was the imam's name?",

  // Ana ekran ve liste
  "Keşfet": "Explore", "Harita": "Map", "Tara": "Scan", "Pasaport": "Passport", "Oyun": "Game",
  "Eser, ilçe ya da banisi ara": "Search monument, district or founder",
  "Tümü": "All", "Cami": "Mosque", "Mescit": "Masjid", "Külliye": "Complex", "Zaviye / Tekke": "Dervish lodge",
  "Aramana uyan eser yok.": "No monument matches your search.",

  // Eser kartı
  "← Geri": "← Back",
  "Fotoğraflar: Vakıf Katılım · yana kaydır": "Photos: Vakıf Katılım · swipe sideways",
  "BANİSİ": "FOUNDER",
  "BİLGİLER VE KAYNAKLARI": "FACTS AND SOURCES",
  "Tarihçe": "History", "Vakıf": "Endowment", "Mimari": "Architecture", "Onarım": "Repair", "Günümüz": "Today",
  "Kaynaklı": "Sourced",
  "Bu eser için envanterden bilgi henüz aktarılmadı.": "Facts for this monument have not been imported from the inventory yet.",

  // Bu esere sor
  "BU ESERE SOR": "ASK ABOUT THIS MONUMENT",
  "Bir soru yaz…": "Type a question…",
  "Sor": "Ask",
  "Kim yaptırdı?": "Who built it?",
  "Ne zaman yapıldı?": "When was it built?",
  "Vakfına ne bağışlandı?": "What was endowed?",
  "Hiç onarıldı mı?": "Was it ever repaired?",
  "Cevaplar yalnızca bu eserin envanter kayıtlarından seçilir.": "Answers are picked only from this monument's inventory records.",
  "Kaynaklarımızda bu bilgi yok.": "Our sources do not contain this information.",

  // Harita
  "Harita © Esri, HERE, OpenStreetMap": "Map © Esri, HERE, OpenStreetMap",
  "Merkez": "Centre", "Tüm Bursa": "All of Bursa", "Uydu": "Satellite", "Konumum": "My location",
  "Yaklaşık konum": "Approximate location", "yaklaşık konum": "approximate location",
  "Google Maps'te yol tarifi al ↗": "Get directions in Google Maps ↗",
  "Konum alınıyor…": "Getting your location…",
  "Konum alınamadı. Tarayıcıda konum iznini kontrol et.": "Could not get your location. Check the browser's location permission.",
  "Bu tarayıcı konum vermiyor.": "This browser does not provide location.",
  "Harita yüklenemedi. İnternet bağlantını kontrol edip sayfayı yenile.": "The map could not load. Check your internet connection and reload.",

  // Tara
  "📷 Kamerayı aç": "📷 Open camera",
  "Eserdeki ya da pasaportundaki QR kodu kameraya göster.": "Show the QR code on the monument or in your passport to the camera.",
  "Kamera yoksa okutulacak kodu listeden seç:": "No camera? Pick the code from the list:",
  "Kamera açılamadı. Tarayıcıda kamera iznini ver ya da kodu listeden seç.": "The camera could not open. Allow camera access or pick the code from the list.",
  "Kamera kütüphanesi yüklenemedi. İnterneti kontrol et.": "The camera library could not load. Check your internet connection.",
  "Bu kod Vakfiye'ye ait değil.": "This code does not belong to Vakfiye.",
  "Kâğıt pasaport": "Paper passport",
  "Kimlik sayfasındaki kod": "Code on the ID page",
  "Bağlı": "Linked",
  "Bursa rotası": "Bursa route",
  "pul alındı ✓": "stamped ✓",

  // Pasaport
  "KÂĞIT PASAPORT": "PAPER PASSPORT",
  "Ziyaretçi masasında kâğıda basılan her damga burada da pul olarak görünür. Kâğıt kaybolsa da pulların uygulamada kalır.":
    "Every stamp pressed into your paper passport at the visitor desk also appears here. If you lose the paper, your stamps stay in the app.",
  "Kâğıt pasaportu bağla": "Link paper passport",
  "BURSA ROTASI": "BURSA ROUTE",
  "ROZETLER": "BADGES",
  "İlk adım": "First step", "İlk pulunu al": "Collect your first stamp",
  "Yarı yol": "Halfway", "Rotada 3 pul topla": "Collect 3 stamps on the route",
  "Bursa rotası tamam": "Bursa route complete", "6 pulun hepsini topla": "Collect all 6 stamps",
  "Pulları sıfırla (demo için)": "Reset stamps (for the demo)",
  "🏅 Rozet kazandın: Yarı yol!": "🏅 Badge earned: Halfway!",
  "🏅 Rozet kazandın: Bursa rotası tamam!": "🏅 Badge earned: Bursa route complete!",

  // Oyun sekmesi (oyun modülü gelene kadar)
  "OYUN": "GAME", "TARA": "SCAN", "PASAPORT": "PASSPORT",
  "\"Vakfını kur\" oyunu sonraki adımlarda gelecek.": "The \"Found your waqf\" game is coming soon."
};

// Sabit kalıplı yazılar: içindeki sayı ya da ad değişiyor
const KALIPLAR = [
  [/^(\d+) \/ (\d+) eser$/, (m) => `${m[1]} / ${m[2]} monuments`],
  [/^envanter s\. (.+)$/, (m) => `inventory p. ${m[1]}`],
  [/^Pul alındı: (.+)$/, (m) => `Stamped: ${cevir(m[1])}`],
  [/^Kâğıt pasaportun bağlandı: (.+)$/, (m) => `Paper passport linked: ${m[1]}`],
  [/^Kâğıtta (\d+) damga · uygulamada (\d+) pul$/, (m) => `${m[1]} stamps on paper · ${m[2]} in the app`]
];

let dil = "tr";
try { dil = localStorage.getItem("vakfiye:dil") || "tr"; } catch (hata) { }

// Bir Türkçe yazının İngilizcesini bul; bulunamazsa olduğu gibi bırak
function cevir(metin) {
  if (SOZLUK[metin]) return SOZLUK[metin];
  if (typeof VERI_CEVIRI !== "undefined" && VERI_CEVIRI[metin]) return VERI_CEVIRI[metin];
  for (const [kalip, yap] of KALIPLAR) {
    const eslesme = metin.match(kalip);
    if (eslesme) return yap(eslesme);
  }
  // "Cami · Osmangazi · 1440" gibi parçalı yazılar: her parçayı ayrı çevir
  if (metin.includes(" · ")) return metin.split(" · ").map(cevir).join(" · ");
  return metin;
}

// Ekrandaki bir kutunun içindeki bütün yazıları çevir
const CEVRILEN_OZELLIKLER = ["placeholder", "title", "aria-label"];
function kutuyuCevir(kok) {
  const yuruyucu = document.createTreeWalker(kok, NodeFilter.SHOW_TEXT);
  let dugum;
  while ((dugum = yuruyucu.nextNode())) {
    if (!dugum.nodeValue.trim() || dugum.parentElement.closest("script, style, svg")) continue;
    if (dugum.turkcesi === undefined) dugum.turkcesi = dugum.nodeValue;   // asıl Türkçeyi sakla
    const turkce = dugum.turkcesi.trim();
    const yeni = dil === "en" ? dugum.turkcesi.replace(turkce, cevir(turkce)) : dugum.turkcesi;
    if (dugum.nodeValue !== yeni) { dugum.bizimYazdigimiz = yeni; dugum.nodeValue = yeni; }
  }
  if (kok.querySelectorAll) {
    kok.querySelectorAll("[placeholder],[title],[aria-label]").forEach((el) => {
      CEVRILEN_OZELLIKLER.forEach((oz) => {
        if (!el.hasAttribute(oz)) return;
        const sakli = "tr" + oz.replace("-", "");
        if (el.dataset[sakli] === undefined) el.dataset[sakli] = el.getAttribute(oz);
        el.setAttribute(oz, dil === "en" ? cevir(el.dataset[sakli]) : el.dataset[sakli]);
      });
    });
  }
}

// Uygulama ekrana yeni bir şey çizdikçe onu da çevir
const gozlemci = new MutationObserver((degisiklikler) => {
  if (dil === "tr") return;
  degisiklikler.forEach((d) => {
    if (d.type === "characterData") {
      if (d.target.nodeValue === d.target.bizimYazdigimiz) return;  // bu değişikliği biz yaptık
      d.target.turkcesi = undefined;                                 // uygulama yazıyı değiştirdi
      if (d.target.parentNode) kutuyuCevir(d.target.parentNode);
      return;
    }
    d.addedNodes.forEach((n) => kutuyuCevir(n.nodeType === 1 ? n : n.parentNode || document.body));
  });
  gozlemci.takeRecords();                                            // kendi değişikliklerimizi yok say
});
gozlemci.observe(document.body, { childList: true, subtree: true, characterData: true });

function dilSec(yeniDil) {
  dil = yeniDil;
  try { localStorage.setItem("vakfiye:dil", dil); } catch (hata) { }
  document.documentElement.lang = dil;
  kutuyuCevir(document.body);
  gozlemci.takeRecords();
  document.querySelectorAll(".dil button").forEach((d, i) => {
    d.classList.toggle("secili", (i === 0 && dil === "tr") || (i === 1 && dil === "en"));
  });
  const ustDugme = document.getElementById("dil-dugme");
  if (ustDugme) ustDugme.textContent = dil === "tr" ? "EN" : "TR";
}

// Açılış ekranındaki Türkçe / English düğmeleri
document.querySelectorAll(".dil button").forEach((dugme, i) => {
  dugme.addEventListener("click", () => dilSec(i === 0 ? "tr" : "en"));
});

// Ana ekranın üst çubuğuna dil düğmesi
const ustCubuk = document.querySelector(".ana .ust");
if (ustCubuk) {
  ustCubuk.insertAdjacentHTML("beforeend", `<button class="dil-dugme" id="dil-dugme">EN</button>`);
  document.getElementById("dil-dugme").addEventListener("click", () => dilSec(dil === "tr" ? "en" : "tr"));
}

// "Bu esere sor": İngilizce sorulan soruyu İngilizce bilgilerle karşılaştır
if (typeof cevapBul === "function") {
  const turkceCevapBul = cevapBul;
  DURAK_KELIMELER.push("there", "this", "that", "with", "have", "does", "what", "when", "where", "which",
    "about", "from", "were", "they", "their", "ever", "into");
  Object.assign(ESANLAMLI, { repai: "onari", resto: "onari", renew: "onari", renov: "onari", built: "yapti", const: "yapti" });
  KATEGORI_IPUCU.tarihce.push("who", "built", "when", "founded");
  KATEGORI_IPUCU.vakif.push("endow", "donat");
  KATEGORI_IPUCU.onarim.push("repair", "restor");

  cevapBul = function (eser, soru) {
    if (dil === "tr" || SOZLUK[soru]) return turkceCevapBul(eser, soru);   // öneri çipleri Türkçe kalır
    const ingilizce = eser.olgular.map((o) => ({ ...o, metin: VERI_CEVIRI[o.metin] || o.metin }));
    const bulunan = turkceCevapBul({ ...eser, olgular: ingilizce }, soru);
    return bulunan ? eser.olgular[ingilizce.indexOf(bulunan)] : null;
  };
}

dilSec(dil);