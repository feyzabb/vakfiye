/* ================= TANITIM ================= */

// Damga çizimi (tanıtımın 3. sayfasında)
function damga() {
  return `
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <g fill="none" stroke="currentColor">
        <circle cx="60" cy="60" r="56" stroke-width="3"/>
        <circle cx="60" cy="60" r="50" stroke-width="1"/>
        <circle cx="60" cy="60" r="30" stroke-width="1.5"/>
      </g>
      <path id="yay-ust" d="M18 60a42 42 0 0 1 84 0" fill="none"/>
      <path id="yay-alt" d="M14 60a46 46 0 0 0 92 0" fill="none"/>
      <text font-size="11" font-weight="700" fill="currentColor" letter-spacing="1">
        <textPath href="#yay-ust" startOffset="50%" text-anchor="middle">VELED-İ YANİÇ</textPath>
      </text>
      <text font-size="9" font-weight="700" fill="currentColor" letter-spacing="1">
        <textPath href="#yay-alt" startOffset="50%" text-anchor="middle">BURSA · 1440</textPath>
      </text>
      <path d="M60 46l4 10 11 .5-8.5 7 3 10.5-9.5-6-9.5 6 3-10.5-8.5-7 11-.5z" fill="currentColor"/>
    </svg>`;
}

const sayfalar = [
  {
    gorsel: `
      <div class="haplar"><span class="hap">Han</span><span class="hap">Hamam</span><span class="hap">Dükkân</span></div>
      <span class="ok">↓</span>
      <span class="sandik">Vakıf sandığı</span>
      <span class="ok">↓</span>
      <div class="haplar"><span class="hap hizmet">Aşevi</span><span class="hap hizmet">Medrese</span><span class="hap hizmet">Çeşme</span></div>`,
    baslik: "Bir iyilik yüzyıllarca sürebilir",
    metin: "Han ve dükkânların kirası aşevini, medreseyi, çeşmeyi yaşattı. Vakfiye, Bursa, Konya ve Hatay'daki vakıf eserlerinde bu iyiliğin izini sürer."
  },
  {
    gorsel: `
      <div class="balon soru">Minaresi neden ilginç?</div>
      <div class="balon cevap">
        Minare, çeşmenin üzerinde dört ayağa oturan köşk-minare düzenlemesindedir ve Bursa'da bu tarzda yapılmış tek örnektir.<br>
        <span class="etiket">Kaynaklı</span><span class="sayfa-no">envanter s. 468</span>
      </div>
      <div class="balon soru">İmamının adı neydi?</div>
      <div class="balon yok">Kaynaklarımızda bu bilgi yok.</div>`,
    baslik: "Her bilgi kaynağıyla",
    metin: "Eserlerle ilgili her bilgi Vakıf Katılım envanter kitabından, sayfa numarasıyla gelir. Bilmediğimizi uydurmayız."
  },
  {
    gorsel: `
      <div class="ikili">
        <div class="kagit">${damga()}</div>
        <div class="telefon">
          <b>Bursa rotası</b>
          <span>1 / 6</span>
          <div class="pullar">${damga()}<span class="bos-pul"></span></div>
        </div>
      </div>`,
    baslik: "Gez, damgalat, rozet kazan",
    metin: "Ziyaret ettiğin eserin damgası kâğıt pasaportuna basılır; aynı pul telefonunda belirir."
  }
];

let sira = 0;

function tanitimiGoster() {
  document.getElementById("tanitim-gorsel").innerHTML = sayfalar[sira].gorsel;
  document.getElementById("tanitim-baslik").textContent = sayfalar[sira].baslik;
  document.getElementById("tanitim-metin").textContent = sayfalar[sira].metin;

  document.querySelectorAll("#noktalar i").forEach((nokta, i) => {
    nokta.classList.toggle("aktif", i === sira);
  });

  document.getElementById("ileri").textContent =
    sira === sayfalar.length - 1 ? "Başlayalım" : "İleri";
}

document.getElementById("basla").addEventListener("click", () => {
  document.getElementById("acilis").hidden = true;
  document.getElementById("tanitim").hidden = false;
  tanitimiGoster();
});

document.getElementById("ileri").addEventListener("click", () => {
  if (sira < sayfalar.length - 1) {
    sira++;
    tanitimiGoster();
  } else {
    document.getElementById("tanitim").hidden = true;
    document.getElementById("ana").hidden = false;
    anaEkraniKur();
  }
});


/* ================= ANA EKRAN ================= */
// ESERLER listesi veri.js dosyasından geliyor.

// Fotoğrafı olmayan eserlerde görünecek çizimler
const CIZIMLER = {
  cami: `<svg viewBox="0 0 48 48"><path d="M8 40V27h22v13M8 27a11 9 0 0 1 22 0M19 18v-3M36 40V16l2-4 2 4v24M4 40h40"/></svg>`,
  mescit: `<svg viewBox="0 0 48 48"><path d="M10 40V24h20v16M10 24l10-8 10 8M17 40v-7a3 3 0 0 1 6 0v7M35 40V18l1.5-3 1.5 3v22M6 40h36"/></svg>`,
  kulliye: `<svg viewBox="0 0 48 48"><path d="M4 40V30h16v10M4 30a8 6.5 0 0 1 16 0M24 40v-8h16v8M26 32a3 3 0 0 1 6 0M33 32a3 3 0 0 1 6 0M43 40V18l1.5-3 1.5 3v22M2 40h44"/></svg>`,
  diger: `<svg viewBox="0 0 48 48"><path d="M10 40V22h28v18M7 22l17-10 17 10M20 40v-8h8v8M5 40h38"/></svg>`
};

// Kutucuğun içi: önce çizim, üstüne fotoğraf.
// Fotoğraf dosyası yoksa resim kendini siler, çizim görünür.
function eserGorseli(eser) {
  const cizim = CIZIMLER[eser.turId] || CIZIMLER.diger;
  return `${cizim}<img src="foto/${eser.id}/kucuk.jpg" alt="" loading="lazy" onerror="this.remove()">`;
}

let secilenTur = "Tümü";

// Türkçe arama: büyük/küçük harf ve ş-s, ı-i, ğ-g farkı önemli olmasın
function sadele(yazi) {
  return yazi.toLocaleLowerCase("tr")
    .replace(/ç/g, "c").replace(/ş/g, "s").replace(/ğ/g, "g")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ü/g, "u")
    .replace(/â/g, "a").replace(/î/g, "i");
}

function anaEkraniKur() {
  const turler = ["Tümü"];
  ESERLER.forEach((eser) => {
    if (!turler.includes(eser.tur)) turler.push(eser.tur);
  });
  document.getElementById("cipler").innerHTML = turler
    .map((tur) => `<button class="cip" data-tur="${tur}">${tur}</button>`)
    .join("");

  listeyiCiz();
}

function listeyiCiz() {
  const aranan = sadele(document.getElementById("ara").value.trim());

  // 1) Filtrele
  const sonuc = ESERLER.filter((eser) => {
    if (typeof secilenSehir !== "undefined" && secilenSehir !== TUM_SEHIRLER && (eser.il || "Bursa") !== secilenSehir) return false;
    if (secilenTur !== "Tümü" && eser.tur !== secilenTur) return false;
    const metin = sadele(eser.ad + " " + eser.ilce + " " + eser.banisi);
    return metin.includes(aranan);
  });

  // Alfabetik sıra (Türkçe harflere göre: Ç, Ğ, İ, Ö, Ş, Ü doğru yerde)
  const siraAdi = (e) => e.ad.replace(/^\s*\([^)]*\)\s*/, "");   // "(Başarakavak) Zahide…" Z harfinde
  sonuc.sort((a, b) => siraAdi(a).localeCompare(siraAdi(b), "tr"));

  // 2) Sayacı yaz
  document.getElementById("sayac").textContent = `${sonuc.length} / ${ESERLER.filter((e) => secilenSehir === TUM_SEHIRLER || (e.il || "Bursa") === secilenSehir).length} eser`;
  // 3) Satırları oluştur
  document.getElementById("liste").innerHTML = sonuc.length === 0
    ? `<p style="padding:12px 14px;margin:0">Aramana uyan eser yok.</p>`
    : sonuc.map((eser) => `
        <button class="satir" data-id="${eser.id}">
          <span class="simge ${["cami", "mescit", "kulliye"].includes(eser.turId) ? eser.turId : "diger"}">${eserGorseli(eser)}</span>
          <span>
            <b>${eser.ad}</b>
            <small>${eser.tur} · ${secilenSehir === TUM_SEHIRLER ? (eser.il || "Bursa") + " · " : ""}${eser.ilce}${eser.donem ? " · " + eser.donem : ""}</small>
          </span>
        </button>`).join("");

  // 4) Seçili çipi boya
  document.querySelectorAll(".cip").forEach((cip) => {
    cip.classList.toggle("secili", cip.dataset.tur === secilenTur);
  });
}

document.getElementById("ara").addEventListener("input", listeyiCiz);

document.getElementById("cipler").addEventListener("click", (olay) => {
  const cip = olay.target.closest(".cip");
  if (!cip) return;
  secilenTur = cip.dataset.tur;
  listeyiCiz();
});

// Esere tıklama: eser kartını bir sonraki adımda yapacağız
document.getElementById("liste").addEventListener("click", (olay) => {
  const satir = olay.target.closest(".satir");
  if (!satir) return;
  console.log("Tıklanan eser:", satir.dataset.id);
});


/* ================= ESER KARTI ================= */

const KATEGORI_ADI = {
  tarihce: "Tarihçe",
  vakif: "Vakıf",
  mimari: "Mimari",
  onarim: "Onarım",
  gunumuz: "Günümüz"
};

function eserKartiniAc(eserId) {
  const eser = ESERLER.find((e) => e.id === eserId);

  // Fotoğraflar: 01'den 12'ye kadar dene; olmayan dosya kendini siler.
  let fotolar = "";
  for (let i = 1; i <= 12; i++) {
    const no = String(i).padStart(2, "0");
    fotolar += `<img src="foto/${eser.id}/${no}.jpg" alt="" onerror="this.remove()">`;
  }

  // Bilgileri kategoriye göre grupla
  let bilgiler = "";
  Object.keys(KATEGORI_ADI).forEach((kategori) => {
    const olgular = eser.olgular.filter((o) => o.kategori === kategori);
    if (olgular.length === 0) return;
    bilgiler += `<div class="kategori">${KATEGORI_ADI[kategori]}</div>`;
    olgular.forEach((o) => {
      bilgiler += `
        <div class="olgu">
          ${o.metin}
          <div class="kaynak-satiri">
            <span class="etiket">Kaynaklı</span>
            <span class="sayfa-no">envanter s. ${o.sayfa}</span>
          </div>
        </div>`;
    });
  });
  if (bilgiler === "") {
    bilgiler = `<div class="olgu">Bu eser için envanterden bilgi henüz aktarılmadı.</div>`;
  }

  const kart = document.getElementById("eser-karti");
  kart.innerHTML = `
    <button class="geri" id="geri">← Geri</button>
    <div class="galeri">${fotolar}</div>
    <span class="foto-atif">Fotoğraflar: Vakıf Katılım · yana kaydır</span>
    <h2 class="eser-baslik">${eser.ad}</h2>
    <div class="rozetler">
      <span class="rozet">${eser.tur}</span>
      <span class="rozet">${eser.ilce}</span>
      ${eser.donem ? `<span class="rozet">${eser.donem}</span>` : ""}
    </div>
    ${eser.banisi ? `
      <div class="kart">
        <span class="kart-baslik">BANİSİ</span>
        <span>${eser.banisi}</span>
      </div>` : ""}
    <div class="kart">
      <span class="kart-baslik">BİLGİLER VE KAYNAKLARI</span>
      ${bilgiler}
    </div>`;

  // Liste gizlensin, kart görünsün, en üstten başlasın
  document.getElementById("ara").closest("main").hidden = true;
  kart.hidden = false;
  kart.scrollTop = 0;

  document.getElementById("geri").addEventListener("click", eserKartiniKapat);
}

function eserKartiniKapat() {
  document.getElementById("eser-karti").hidden = true;
  document.getElementById("ara").closest("main").hidden = false;
}

// Listedeki bir esere tıklayınca kartını aç
document.getElementById("liste").addEventListener("click", (olay) => {
  const satir = olay.target.closest(".satir");
  if (!satir) return;
  eserKartiniAc(satir.dataset.id);
});



/* ================= BU ESERE SOR ================= */
// Cevaplar web asistanından gelir (aşağıdaki "WEB ASİSTANI" bölümü).

let acikEser = null;

function sorBolumunuEkle(eserId) {
  acikEser = ESERLER.find((e) => e.id === eserId);
  const oneriler = ["Kim yaptırdı?", "Ne zaman yapıldı?", "Vakfına ne bağışlandı?", "Hiç onarıldı mı?"];

  document.getElementById("eser-karti").insertAdjacentHTML("beforeend", `
    <div class="kart">
      <span class="kart-baslik">BU ESERE SOR</span>
      <div class="sohbet" id="sohbet"></div>
      <form class="sor-form" id="sor-form">
        <input id="soru" placeholder="Bir soru yaz…" autocomplete="off">
        <button type="submit">Sor</button>
      </form>
      <div class="cipler" id="oneriler">
        ${oneriler.map((s) => `<button type="button" class="cip" data-soru="${s}">${s}</button>`).join("")}
      </div>
      <span class="sor-notu">Cevaplar yalnızca bu eserin envanter kayıtlarından seçilir.</span>
    </div>`);

  document.getElementById("sor-form").addEventListener("submit", (olay) => {
    olay.preventDefault();          // sayfa yenilenmesin
    const kutu = document.getElementById("soru");
    if (kutu.value.trim() !== "") sor(kutu.value.trim());
    kutu.value = "";
  });

  document.getElementById("oneriler").addEventListener("click", (olay) => {
    const cip = olay.target.closest(".cip");
    if (cip) sor(cip.dataset.soru);
  });
}

function sor() { }   // web asistanı bunu aşağıda yeniden tanımlıyor

// Eser kartı açıldıktan hemen sonra "Bu esere sor" bölümünü ekle
document.getElementById("liste").addEventListener("click", (olay) => {
  const satir = olay.target.closest(".satir");
  if (!satir) return;
  sorBolumunuEkle(satir.dataset.id);
});


/* ================= ALT MENÜ ================= */
// Menüdeki 5 düğmeye sırayla sekme adı veriyoruz
const SEKMELER = ["kesfet", "harita", "tara", "pasaport", "oyun"];

document.querySelectorAll(".menu button").forEach((dugme, i) => {
  dugme.dataset.sekme = SEKMELER[i];
  dugme.addEventListener("click", () => sekmeyeGec(SEKMELER[i]));
});

function sekmeyeGec(sekme) {
  // Önce ana ekrandaki bütün içerik alanlarını gizle
  document.querySelectorAll(".ana main").forEach((alan) => { alan.hidden = true; });

  // Sonra seçilen sekmenin alanını göster
  if (sekme === "kesfet") {
    document.getElementById("ara").closest("main").hidden = false;
  } else {
    document.getElementById("sekme-" + sekme).hidden = false;
  }

  // Menüde seçili düğmeyi işaretle
  document.querySelectorAll(".menu button").forEach((dugme) => {
    dugme.classList.toggle("aktif", dugme.dataset.sekme === sekme);
  });

  if (sekme === "harita") haritayiGoster();
}
/* ================= HARİTA ================= */
// Leaflet kütüphanesi index.html'de yükleniyor (internet gerekir).
// Harita görüntüsü Esri'den: Google Maps'e benzeyen sokak haritası + uydu görüntüsü (anahtar gerekmez).

let harita = null;
let haritaKatmani = null;
let sokakKatmani = null;
let uyduKatmani = null;
let konumIsareti = null;

const TUR_RENGI = { cami: "#17488F", mescit: "#0077B6", kulliye: "#123D3A" };

// Damla biçimli işaret: içi türün rengi, yaklaşık konumlarda içi boş ve kesik çizgili
function isaretYap(eser) {
  const renk = TUR_RENGI[eser.turId] || "#56637A";
  return L.divIcon({
    className: "",
    iconSize: [30, 38],
    iconAnchor: [15, 36],
    html: `<div class="pin${eser.yaklasik ? " yaklasik" : ""}" style="--renk:${renk}"><span>${eser.tur[0]}</span></div>`
  });
}

function haritayiGoster() {
  if (!window.L) {
    document.getElementById("harita").innerHTML =
      `<p style="padding:16px">Harita yüklenemedi. İnternet bağlantını kontrol edip sayfayı yenile.</p>`;
    return;
  }
  if (harita) { setTimeout(() => harita.invalidateSize(), 50); return; }

  harita = L.map("harita", { zoomControl: false });
  L.control.zoom({ position: "bottomright" }).addTo(harita);

  // 1) Sokak haritası (Google Maps görünümüne yakın)
  sokakKatmani = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 19, attribution: "Harita © Esri, HERE, OpenStreetMap" }
  ).addTo(harita);

  // 2) Uydu görüntüsü + üstünde yer adları
  uyduKatmani = L.layerGroup([
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, attribution: "Uydu © Esri, Maxar" }),
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19 })
  ]);

  // Birbirine çok yakın işaretler tek bir sayılı daireye toplanır; yakınlaşınca ayrılır
  haritaKatmani = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 40,
    iconCreateFunction: (grup) => L.divIcon({
      className: "",
      iconSize: [38, 38],
      html: `<div class="kume">${grup.getChildCount()}</div>`
    })
  }).addTo(harita);
  ESERLER.forEach((eser) => {
    L.marker([eser.enlem, eser.boylam], { icon: isaretYap(eser), title: eser.ad })
      .addTo(haritaKatmani)
      .on("click", () => haritadaSec(eser));
  });

  setTimeout(() => { harita.invalidateSize(); gorunumSec("merkez"); }, 50);
}

// Merkez: tarihî çarşı ve çevresi · Tüm Bursa: Gemlik ve Gürsu dahil hepsi
function gorunumSec(gorunum) {
  const secilenler = gorunum === "merkez"
    ? ESERLER.filter((e) => e.enlem > 40.17 && e.enlem < 40.20 && e.boylam > 29.04 && e.boylam < 29.09)
    : ESERLER;
  const sinirlar = L.latLngBounds(secilenler.map((e) => [e.enlem, e.boylam]));
  harita.fitBounds(sinirlar, { paddingTopLeft: [24, 44], paddingBottomRight: [24, 16] });

  document.querySelectorAll("[data-gorunum]").forEach((d) => {
    d.classList.toggle("secili", d.dataset.gorunum === gorunum);
  });
}

// Harita ↔ Uydu
function katmanSec(katman) {
  if (katman === "uydu") { harita.removeLayer(sokakKatmani); uyduKatmani.addTo(harita); }
  else { harita.removeLayer(uyduKatmani); sokakKatmani.addTo(harita); }
  document.querySelectorAll("[data-katman]").forEach((d) => {
    d.classList.toggle("secili", d.dataset.katman === katman);
  });
}

// Kullanıcının kendi konumu (tarayıcı izin ister)
function konumumuGoster() {
  if (!navigator.geolocation) { bildir("Bu tarayıcı konum vermiyor."); return; }
  bildir("Konum alınıyor…");
  navigator.geolocation.getCurrentPosition(
    (konum) => {
      const yer = [konum.coords.latitude, konum.coords.longitude];
      if (konumIsareti) harita.removeLayer(konumIsareti);
      konumIsareti = L.circleMarker(yer, {
        radius: 9, color: "#fff", weight: 3, fillColor: "#1A73E8", fillOpacity: 1
      }).addTo(harita);
      harita.setView(yer, 16);
    },
    () => bildir("Konum alınamadı. Tarayıcıda konum iznini kontrol et."),
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

// İşarete basınca haritanın altında eserin satırı ve yol tarifi düğmesi çıkar
function haritadaSec(eser) {
  harita.panTo([eser.enlem, eser.boylam]);
  const yolTarifi = `https://www.google.com/maps/dir/?api=1&destination=${eser.enlem},${eser.boylam}`;
  document.getElementById("harita-secim").innerHTML = `
    <div class="liste">
      <button class="satir" data-harita-eser="${eser.id}">
        <span class="simge ${["cami", "mescit", "kulliye"].includes(eser.turId) ? eser.turId : "diger"}">${eserGorseli(eser)}</span>
        <span>
          <b>${eser.ad}</b>
          <small>${eser.tur} · ${eser.ilce}${eser.yaklasik ? " · yaklaşık konum" : ""}</small>
        </span>
        <span class="ok-isareti">›</span>
      </button>
      <a class="yol-tarifi" href="${yolTarifi}" target="_blank" rel="noopener">Google Maps'te yol tarifi al ↗</a>
    </div>`;
}

document.getElementById("sekme-harita").addEventListener("click", (olay) => {
  const gorunum = olay.target.closest("[data-gorunum]");
  if (gorunum) { gorunumSec(gorunum.dataset.gorunum); return; }

  const katman = olay.target.closest("[data-katman]");
  if (katman) { katmanSec(katman.dataset.katman); return; }

  if (olay.target.closest("[data-konumum]")) { konumumuGoster(); return; }

  const dugme = olay.target.closest("[data-harita-eser]");
  if (!dugme) return;
  const id = dugme.dataset.haritaEser;
  sekmeyeGec("kesfet");
  eserKartiniAc(id);
  sorBolumunuEkle(id);
});
/* ================= PASAPORT VE TARA ================= */

// Bursa rotası: kâğıt pasaporttaki 6 durak, damga yazılarıyla
const ROTA = [
  { id: "veled-i-yanic-camii",              ust: "VELED-İ YANİÇ",   alt: "BURSA · 1440" },
  { id: "selcuk-hatun-camii",               ust: "SELÇUK HATUN",    alt: "BURSA · 1450" },
  { id: "sehadet-kale-saray-camii",         ust: "ŞEHADET CAMİİ",   alt: "BURSA · 1366" },
  { id: "uc-kuzular-kozlar-camii-ve-kabri", ust: "ÜÇ KUZULAR",      alt: "BURSA" },
  { id: "seyh-pasa-dibekli-camii",          ust: "DİBEKLİ CAMİİ",   alt: "BURSA · 1439" },
  { id: "nakkas-ali-mescidi",               ust: "NAKKAŞ ALİ",      alt: "BURSA · 15. YY" }
];
const PASAPORT_NO = "VK-2026-0001";

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


// Tarayıcıya kayıt: sayfa kapanıp açılınca pullar kaybolmasın.
// (Gizli pencerede kayıt yapılamayabilir; o yüzden try/catch.)
function kayitOku(anahtar, varsayilan) {
  try {
    const deger = localStorage.getItem("vakfiye:" + anahtar);
    return deger === null ? varsayilan : JSON.parse(deger);
  } catch (hata) {
    return varsayilan;
  }
}
function kayitYaz(anahtar, deger) {
  try { localStorage.setItem("vakfiye:" + anahtar, JSON.stringify(deger)); } catch (hata) { }
}

let pullar = kayitOku("pullar", []);          // alınan pulların eser id'leri
let kagitBagli = kayitOku("kagitBagli", false);
let yeniPul = null;                            // az önce alınan pul (animasyon için)

// Damga çizimi: her damganın yazısı farklı olduğu için id'ler de farklı olmalı
function pulCiz(durak) {
  const u = "u-" + durak.id, a = "a-" + durak.id;
  return `
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <g fill="none" stroke="currentColor">
        <circle cx="60" cy="60" r="56" stroke-width="3"/>
        <circle cx="60" cy="60" r="50" stroke-width="1"/>
        <circle cx="60" cy="60" r="30" stroke-width="1.5"/>
      </g>
      <path id="${u}" d="M18 60a42 42 0 0 1 84 0" fill="none"/>
      <path id="${a}" d="M14 60a46 46 0 0 0 92 0" fill="none"/>
      <text font-size="10.5" font-weight="700" fill="currentColor" letter-spacing="1">
        <textPath href="#${u}" startOffset="50%" text-anchor="middle">${durak.ust}</textPath>
      </text>
      <text font-size="9" font-weight="700" fill="currentColor" letter-spacing="1">
        <textPath href="#${a}" startOffset="50%" text-anchor="middle">${durak.alt}</textPath>
      </text>
      <path d="M60 46l4 10 11 .5-8.5 7 3 10.5-9.5-6-9.5 6 3-10.5-8.5-7 11-.5z" fill="currentColor"/>
    </svg>`;
}

function eserAdi(id) {
  return ESERLER.find((e) => e.id === id).ad;
}

let bildirimZamani = null;
function bildir(metin) {
  let kutu = document.getElementById("bildirim");
  if (!kutu) {
    kutu = document.createElement("div");
    kutu.id = "bildirim";
    kutu.className = "bildirim";
    document.body.appendChild(kutu);
  }
  kutu.textContent = metin;
  kutu.hidden = false;
  clearTimeout(bildirimZamani);
  bildirimZamani = setTimeout(() => { kutu.hidden = true; }, 2600);
}

/* ---------- Tara sekmesi ---------- */
function tarayiCiz() {
  document.getElementById("sekme-tara").innerHTML = `
    <div class="kamera" id="kamera-alani">
      <div id="okuyucu"></div>
      <button class="kamera-dugme" id="kamera-ac">Kamerayı aç</button>
    </div>
    <span class="sade-not" id="kamera-notu">Eserdeki ya da pasaportundaki QR kodu kameraya göster.</span>
    <span class="sade-not">Kamera yoksa okutulacak kodu listeden seç:</span>
    <div class="liste">
      <button class="satir tara-satir" data-kagit>
        <span class="simge" style="background:var(--metin)">${CIZIMLER.diger}</span>
        <span><b>Kâğıt pasaport · ${PASAPORT_NO}</b>
          <small>${kagitBagli ? "Bağlı" : "Kimlik sayfasındaki kod"}</small></span>
      </button>
      ${ROTA.map((durak) => `
        <button class="satir tara-satir" data-pul="${durak.id}">
          <span class="simge cami">${eserGorseli(ESERLER.find((e) => e.id === durak.id))}</span>
          <span><b>${eserAdi(durak.id)}</b>
            <small>${rotaAdi()}${pullar.includes(durak.id) ? " · pul alındı ✓" : ""}</small></span>
        </button>`).join("")}
    </div>`;
}

document.getElementById("sekme-tara").addEventListener("click", (olay) => {
  const pulDugmesi = olay.target.closest("[data-pul]");
  const kagitDugmesi = olay.target.closest("[data-kagit]");
  if (pulDugmesi) pulAl(pulDugmesi.dataset.pul);
  if (kagitDugmesi) kagidiBagla();
});

function pulAl(id) {
  if (!pullar.includes(id)) {
    pullar.push(id);
    kayitYaz("pullar", pullar);
  }
  yeniPul = id;
  if (rotaBul(id) && rotaBul(id) !== rotaSehri) rotayiSec(rotaBul(id));
  const rotada = rotadakiPulSayisi();

  if (rotada === ROTA.length) bildir("🏅 Rozet kazandın: " + rotaAdi() + " tamam!");
  else if (rotada === 3) bildir("🏅 Rozet kazandın: Yarı yol!");
  else bildir("Pul alındı: " + eserAdi(id));

  sekmeyeGec("pasaport");
  pasaportuCiz();
}

function kagidiBagla() {
  kagitBagli = true;
  kayitYaz("kagitBagli", true);
  bildir("Kâğıt pasaportun bağlandı: " + PASAPORT_NO);
  sekmeyeGec("pasaport");
  pasaportuCiz();
}

/* ---------- Pasaport sekmesi ---------- */
function pasaportuCiz() {
  const sayi = rotadakiPulSayisi();
  const rozetler = [
    { simge: "", ad: "İlk adım", aciklama: "İlk pulunu al", gereken: 1 },
    { simge: "3", ad: "Yarı yol", aciklama: "Rotada 3 pul topla", gereken: 3 },
    { simge: "6", ad: rotaAdi() + " tamam", aciklama: "6 pulun hepsini topla", gereken: 6 }
  ];

  document.getElementById("sekme-pasaport").innerHTML = `
    ${kagitBagli ? `
      <div class="kart bagli">
        <span class="kart-baslik">KÂĞIT PASAPORT</span>
        <div><span class="pasaport-no">${PASAPORT_NO}</span> <span class="bagli-etiket">Bağlı</span></div>
        <span class="sade-not">Kâğıtta ${sayi} damga · uygulamada ${sayi} pul</span>
      </div>` : `
      <div class="kart">
        <span class="kart-baslik">KÂĞIT PASAPORT</span>
        <span>Ziyaretçi masasında kâğıda basılan her damga burada da pul olarak görünür. Kâğıt kaybolsa da pulların uygulamada kalır.</span>
        <button class="kucuk-dugme" data-kagit-bagla>Kâğıt pasaportu bağla</button>
      </div>`}

    <div class="rota-secici" role="tablist">
      ${Object.keys(ROTALAR).map((s) => `<button class="${s === rotaSehri ? "secili" : ""}" data-rota="${s}">${s}</button>`).join("")}
    </div>
    <div class="kart">
      <div class="pul-sayac">
        <span class="kart-baslik">${rotaAdi().toLocaleUpperCase("tr")}</span>
        <b>${sayi} / ${ROTA.length}</b>
      </div>
      <div class="ilerleme"><i style="width:${sayi / ROTA.length * 100}%"></i></div>
      <div class="pullar-izgara">
        ${ROTA.map((durak) => pullar.includes(durak.id)
          ? `<div class="pul alindi${yeniPul === durak.id ? " yeni" : ""}" title="${eserAdi(durak.id)}">${pulCiz(durak)}</div>`
          : `<div class="pul">${eserAdi(durak.id)}</div>`).join("")}
      </div>
    </div>

    <div class="kart">
      <span class="kart-baslik">ROZETLER</span>
      ${rozetler.map((r) => `
        <div class="rozet-satir${sayi >= r.gereken ? " kazanildi" : ""}">
          <span class="rozet-simge">${r.simge}</span>
          <span><b>${r.ad}</b><br><small>${r.aciklama}</small></span>
        </div>`).join("")}
    </div>

    <button class="kucuk-dugme ikincil" data-sifirla>Pulları sıfırla (demo için)</button>`;

  yeniPul = null;   // animasyon yalnızca bir kez oynasın
}

document.getElementById("sekme-pasaport").addEventListener("click", (olay) => {
  if (olay.target.closest("[data-kagit-bagla]")) kagidiBagla();
  if (olay.target.closest("[data-sifirla]")) {
    pullar = [];
    kagitBagli = false;
    kayitYaz("pullar", pullar);
    kayitYaz("kagitBagli", false);
    pasaportuCiz();
  }
});

// Menüden Tara ya da Pasaport'a geçilince içeriklerini çiz
document.querySelectorAll(".menu button").forEach((dugme) => {
  dugme.addEventListener("click", () => {
    if (dugme.dataset.sekme === "tara") tarayiCiz();
    if (dugme.dataset.sekme === "pasaport") pasaportuCiz();
  });
});


/* ================= OYUN BAĞLANTISI ================= */
// Oyun ayrı dosyada (oyun.js) geliştiriliyor. Uygulama yalnızca şu kadarını bilir:
// Oyun sekmesi açılınca VakfiyeOyun.baslat(), başka sekmeye geçince VakfiyeOyun.durdur().

const oyunAraclari = {
  bildir: (metin) => bildir(metin),
  pullar: () => pullar.slice(),                       // kopya veriyoruz, oyun asıl listeyi bozamasın
  kaydet: (anahtar, deger) => kayitYaz("oyun:" + anahtar, deger),
  oku: (anahtar, varsayilan) => kayitOku("oyun:" + anahtar, varsayilan)
};

let oyunAcik = false;

document.querySelectorAll(".menu button").forEach((dugme) => {
  dugme.addEventListener("click", () => {
    const oyunSekmesi = dugme.dataset.sekme === "oyun";

    if (oyunAcik && !oyunSekmesi && window.VakfiyeOyun) VakfiyeOyun.durdur();

    if (oyunSekmesi) {
      if (window.VakfiyeOyun) {
        VakfiyeOyun.baslat(document.getElementById("sekme-oyun"), oyunAraclari);
      }
      // oyun.js henüz yoksa sekmedeki "sonraki adımlarda gelecek" kutusu görünmeye devam eder
    }
    oyunAcik = oyunSekmesi;
  });
});


/* ================= KAMERAYLA QR OKUTMA ================= */
// html5-qrcode kütüphanesi index.html'de yükleniyor.
// Telefonlar kamerayı yalnızca https:// adreslerde (GitHub Pages gibi) ve izin verilince açar.
// Kodlar kâğıt pasaporttaki biçimde:
//   VAKFIYE:VK-2026-0001        → kâğıt pasaport (kimlik sayfası)
//   VAKFIYE:ESER:<eser-id>       → rotadaki bir eserin durak kodu

let okuyucu = null;

function kameraAc() {
  if (!window.Html5Qrcode) { bildir("Kamera kütüphanesi yüklenemedi. İnterneti kontrol et."); return; }

  document.getElementById("kamera-ac").hidden = true;
  okuyucu = new Html5Qrcode("okuyucu");
  okuyucu.start(
    { facingMode: "environment" },              // arka kamera
    { fps: 10, qrbox: { width: 200, height: 200 } },
    (metin) => kodOkundu(metin),
    () => {}                                    // her karede "kod yok" hatası gelir, görmezden gel
  ).catch(() => {
    document.getElementById("kamera-ac").hidden = false;
    document.getElementById("kamera-notu").textContent =
      "Kamera açılamadı. Tarayıcıda kamera iznini ver ya da kodu listeden seç.";
    okuyucu = null;
  });
}

function kameraKapat() {
  if (!okuyucu) return;
  const eski = okuyucu;
  okuyucu = null;
  eski.stop().then(() => eski.clear()).catch(() => {});
}

function kodOkundu(metin) {
  if (!okuyucu) return;          // aynı kod art arda okunmasın
  kameraKapat();

  if (metin === "VAKFIYE:" + PASAPORT_NO) {
    kagidiBagla();
    return;
  }
  if (metin.startsWith("VAKFIYE:ESER:")) {
    const id = metin.slice("VAKFIYE:ESER:".length);
    if (rotaBul(id)) { pulAl(id); return; }
    if (ESERLER.some((e) => e.id === id)) {
      // Rotada olmayan bir eser: pul yok ama kartını açalım
      sekmeyeGec("kesfet"); eserKartiniAc(id); sorBolumunuEkle(id);
      return;
    }
  }
  bildir("Bu kod Vakfiye'ye ait değil.");
  tarayiCiz();
}

document.getElementById("sekme-tara").addEventListener("click", (olay) => {
  if (olay.target.closest("#kamera-ac")) kameraAc();
});

// Başka sekmeye geçince kamerayı kapat
document.querySelectorAll(".menu button").forEach((dugme) => {
  dugme.addEventListener("click", () => {
    if (dugme.dataset.sekme !== "tara") kameraKapat();
  });
});


/* ================= ŞEHİRLER ================= */
// Vakıf Katılım Vakıf Eserleri Envanter Projesi'nin şehirleri: Hatay (2022), Konya, Bursa.
// Yeni bir şehir eklemek için:
//   1) Veri setine o şehrin eserlerini ekle ve araclar/veri_hazirla.py'yi çalıştır.
//   2) Aşağıdaki listeye şehrin adını ve harita merkezini yaz.
// Verisi olan şehir listede kendiliğinden açılır; verisi olmayan "Yakında" görünür.

const SEHIRLER = [
  { ad: "Bursa", merkez: [40.1835, 29.0610] },
  { ad: "Konya", merkez: [37.8714, 32.4930] },
  { ad: "Hatay", merkez: [36.2025, 36.1605] }
];
let secilenSehir = "Tüm şehirler";   // açılışta bütün şehirler
const TUM_SEHIRLER = "Tüm şehirler";

function eserSehri(eser) {
  return eser.il || "Bursa";
}

function sehrinEserleri() {
  return ESERLER.filter((e) => secilenSehir === TUM_SEHIRLER || eserSehri(e) === secilenSehir);
}

function sehirPaneliniAc() {
  let satirlar = SEHIRLER.map((sehir) => {
    const sayi = ESERLER.filter((e) => eserSehri(e) === sehir.ad).length;
    const acik = sayi > 0;
    return `
      <button class="sehir-satir${sehir.ad === secilenSehir ? " secili" : ""}" ${acik ? `data-sehir="${sehir.ad}"` : "disabled"}>
        <b>${sehir.ad}</b>
        <small>${acik ? sayi + " eser" : "Yakında"}</small>
      </button>`;
  }).join("");
  satirlar = `
      <button class="sehir-satir${secilenSehir === TUM_SEHIRLER ? " secili" : ""}" data-sehir="${TUM_SEHIRLER}">
        <b>${TUM_SEHIRLER}</b>
        <small>${ESERLER.length} eser</small>
      </button>` + satirlar;

  document.body.insertAdjacentHTML("beforeend", `
    <div class="perde" id="sehir-perdesi">
      <div class="alt-panel">
        <span class="kart-baslik">ŞEHİR SEÇ</span>
        ${satirlar}
        <span class="sade-not">Vakıf Katılım Vakıf Eserleri Envanter Projesi şehirleri</span>
        <button class="kucuk-dugme ikincil" data-perde-kapat>Kapat</button>
      </div>
    </div>`);
}

function sehirPaneliniKapat() {
  const perde = document.getElementById("sehir-perdesi");
  if (perde) perde.remove();
}

function sehirSec(ad) {
  secilenSehir = ad;
  document.querySelector(".sehir").textContent = ad;
  const tumuDugmesi = document.querySelector('[data-gorunum="tumu"]');
  if (tumuDugmesi) tumuDugmesi.textContent = ad === TUM_SEHIRLER ? "Tümünü gör" : "Tüm " + ad;
  listeyiCiz();
  if (harita) gorunumSec("merkez");
}

document.addEventListener("click", (olay) => {
  if (olay.target.closest(".sehir")) { sehirPaneliniAc(); return; }

  const perde = document.getElementById("sehir-perdesi");
  if (!perde) return;
  const secim = olay.target.closest("[data-sehir]");
  if (secim) { sehirSec(secim.dataset.sehir); sehirPaneliniKapat(); return; }
  // Kapat düğmesi ya da panelin dışındaki karanlık alan
  if (olay.target.closest("[data-perde-kapat]") || olay.target === perde) sehirPaneliniKapat();
});

// Harita: yalnızca seçili şehrin eserlerini göster, şehrin merkezine git
function haritaIsaretleriniYenile() {
  haritaKatmani.clearLayers();
  sehrinEserleri().forEach((eser) => {
    L.marker([eser.enlem, eser.boylam], { icon: isaretYap(eser), title: eser.ad })
      .addTo(haritaKatmani)
      .on("click", () => haritadaSec(eser));
  });
}

gorunumSec = function (gorunum) {
  haritaIsaretleriniYenile();
  const sehir = SEHIRLER.find((s) => s.ad === secilenSehir);
  const eserler = sehrinEserleri();
  if (gorunum === "merkez" || eserler.length === 0) {
    if (sehir) harita.setView(sehir.merkez, 15);
    else harita.fitBounds(L.latLngBounds(eserler.map((e) => [e.enlem, e.boylam])), { padding: [24, 24] });
  } else {
    harita.fitBounds(L.latLngBounds(eserler.map((e) => [e.enlem, e.boylam])),
      { paddingTopLeft: [24, 44], paddingBottomRight: [24, 16] });
  }
  document.querySelectorAll("[data-gorunum]").forEach((d) => {
    d.classList.toggle("secili", d.dataset.gorunum === gorunum);
  });
};


/* ================= YOL TARİFİ VE "HARİTADA GÖR" ================= */

function yolTarifiAdresleri(eser) {
  const hedef = `${eser.enlem},${eser.boylam}`;
  return {
    google: `https://www.google.com/maps/dir/?api=1&destination=${hedef}&travelmode=walking`,
    apple: `https://maps.apple.com/?daddr=${hedef}&dirflg=w`
  };
}

function eylemDugmeleri(eser) {
  const adres = yolTarifiAdresleri(eser);
  return `
    <div class="eylemler">
      <a class="eylem birincil" href="${adres.google}" target="_blank" rel="noopener">Yol tarifi</a>
      <button class="eylem" data-haritada-gor="${eser.id}">Haritada gör</button>
    </div>
    <a class="apple-link" href="${adres.apple}" target="_blank" rel="noopener">iPhone'da Apple Haritalar ile aç</a>`;
}

// Eser kartı açılınca başlığın altına eylem düğmelerini ekle
const eskiEserKartiniAc = eserKartiniAc;
eserKartiniAc = function (eserId) {
  eskiEserKartiniAc(eserId);
  const eser = ESERLER.find((e) => e.id === eserId);
  document.querySelector("#eser-karti .rozetler").insertAdjacentHTML("afterend", eylemDugmeleri(eser));
};

// Haritada bir esere basınca: alttaki satırı büyük yol tarifi düğmeleriyle göster ve görünür yap
const eskiHaritadaSec = haritadaSec;
haritadaSec = function (eser) {
  eskiHaritadaSec(eser);
  const alan = document.getElementById("harita-secim");
  const eskiLink = alan.querySelector(".yol-tarifi");
  if (eskiLink) eskiLink.remove();
  alan.querySelector(".liste").insertAdjacentHTML("beforeend",
    `<div style="padding: 0 14px 12px">${eylemDugmeleri(eser).replace(/<button class="eylem"[^]*?<\/button>/, "")}</div>`);
  alan.scrollIntoView({ behavior: "smooth", block: "end" });
};

// "Haritada gör": harita sekmesine geç, esere yakınlaş
document.addEventListener("click", (olay) => {
  const dugme = olay.target.closest("[data-haritada-gor]");
  if (!dugme) return;
  const eser = ESERLER.find((e) => e.id === dugme.dataset.haritadaGor);
  sekmeyeGec("harita");
  setTimeout(() => {
    if (!harita) return;
    harita.setView([eser.enlem, eser.boylam], 18);
    haritadaSec(eser);
  }, 300);
});

// İngilizce karşılıklar (dil.js yüklendikten sonra eklenir)
document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "ŞEHİR SEÇ": "CHOOSE CITY", "Yakında": "Coming soon", "Kapat": "Close",
    "Vakıf Katılım Vakıf Eserleri Envanter Projesi şehirleri": "Cities of Vakıf Katılım's Endowed Monuments Inventory Project",
    "Yol tarifi": "Directions", "Haritada gör": "Show on map",
    "iPhone'da Apple Haritalar ile aç": "Open in Apple Maps on iPhone"
  });
  KALIPLAR.push([/^(\d+) eser$/, (m) => `${m[1]} monuments`]);
  KALIPLAR.push([/^Tüm (.+)$/, (m) => `All of ${m[1]}`]);
});
/* ================= KONYA İÇİN YENİ TÜRLERİN İNGİLİZCESİ ================= */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, { "Türbe": "Tomb", "Diğer": "Other" });
});

/* ================= ERİŞİLEBİLİRLİK ================= */
// Görme engelliler için: sesli dinleme, büyük yazı, yüksek kontrast.
// İşitme engelliler için: uygulamadaki her bilgi zaten yazılı; sesli içerik yalnızca isteğe bağlı.

const erisim = { buyuk: false, kontrast: false };
try { Object.assign(erisim, JSON.parse(localStorage.getItem("vakfiye:erisim") || "{}")); } catch (hata) { }

function erisimUygula() {
  document.body.classList.toggle("buyuk-yazi", erisim.buyuk);
  document.body.classList.toggle("kontrast", erisim.kontrast);
  try { localStorage.setItem("vakfiye:erisim", JSON.stringify(erisim)); } catch (hata) { }
}
erisimUygula();

// Üst çubuğa "Aa" düğmesi
document.querySelector(".ana .ust").insertAdjacentHTML("beforeend",
  `<button class="erisim-dugme" id="erisim-dugme" aria-label="Erişilebilirlik">Aa</button>`);

function erisimPaneliniAc() {
  const satir = (anahtar, baslik, aciklama) => `
    <button class="sehir-satir erisim-satir${erisim[anahtar] ? " secili" : ""}" data-erisim="${anahtar}" aria-pressed="${erisim[anahtar]}">
      <b>${baslik}</b>
      <small>${aciklama}</small>
      <span class="anahtar" aria-hidden="true"></span>
    </button>`;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="perde" id="erisim-perdesi">
      <div class="alt-panel" role="dialog" aria-label="Erişilebilirlik">
        <span class="kart-baslik">ERİŞİLEBİLİRLİK</span>
        ${satir("buyuk", "Büyük yazı", "Listeyi ve eser bilgilerini büyütür")}
        ${satir("kontrast", "Yüksek kontrast", "Siyah-beyaz, daha net yazılar")}
        <span class="sade-not">Eser kartındaki Sesli dinle düğmesi bilgileri seçili dilde okur.</span>
        <button class="kucuk-dugme ikincil" data-perde-kapat>Kapat</button>
      </div>
    </div>`);
}

document.addEventListener("click", (olay) => {
  if (olay.target.closest("#erisim-dugme")) { erisimPaneliniAc(); return; }
  const perde = document.getElementById("erisim-perdesi");
  if (!perde) return;
  const secim = olay.target.closest("[data-erisim]");
  if (secim) {
    const anahtar = secim.dataset.erisim;
    erisim[anahtar] = !erisim[anahtar];
    secim.classList.toggle("secili", erisim[anahtar]);
    secim.setAttribute("aria-pressed", erisim[anahtar]);
    erisimUygula();
    return;
  }
  if (olay.target.closest("[data-perde-kapat]") || olay.target === perde) perde.remove();
});

// Sesli dinleme: eser kartındaki ad ve bilgiler, seçili dilde
function sesliOku(metin) {
  if (!("speechSynthesis" in window)) return false;
  speechSynthesis.cancel();
  const konusma = new SpeechSynthesisUtterance(metin);
  konusma.lang = (typeof dil !== "undefined" && dil === "en") ? "en-US" : "tr-TR";
  konusma.rate = 0.95;
  konusma.onend = () => dinleDugmesiniYaz(false);
  speechSynthesis.speak(konusma);
  return true;
}

function dinleDugmesiniYaz(caliyor) {
  const dugme = document.getElementById("dinle-dugme");
  if (dugme) dugme.textContent = caliyor ? "Durdur" : "Sesli dinle";
}

function karttakiMetin() {
  const kart = document.getElementById("eser-karti");
  const parcalar = [kart.querySelector(".eser-baslik").innerText];
  kart.querySelectorAll(".kategori, .olgu").forEach((el) => {
    const kopya = el.cloneNode(true);
    kopya.querySelectorAll(".kaynak-satiri").forEach((k) => k.remove());
    parcalar.push(kopya.innerText.trim());
  });
  return parcalar.map((p) => p.replace(/[.\s]+$/, "")).join(". ") + ".";
}

const eserKartiniAcErisimsiz = eserKartiniAc;
eserKartiniAc = function (eserId) {
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  eserKartiniAcErisimsiz(eserId);
  const eser = ESERLER.find((e) => e.id === eserId);
  // Fotoğraflara ekran okuyucular için açıklama
  document.querySelectorAll("#eser-karti .galeri img").forEach((img, i) => { img.alt = `${eser.ad}, fotoğraf ${i + 1}`; });
  if ("speechSynthesis" in window) {
    document.querySelector("#eser-karti .eser-baslik").insertAdjacentHTML("afterend",
      `<button class="dinle-dugme" id="dinle-dugme">Sesli dinle</button>`);
  }
};

document.addEventListener("click", (olay) => {
  if (!olay.target.closest("#dinle-dugme")) return;
  if (speechSynthesis.speaking) { speechSynthesis.cancel(); dinleDugmesiniYaz(false); return; }
  if (sesliOku(karttakiMetin())) dinleDugmesiniYaz(true);
});
document.addEventListener("click", (olay) => {
  if (olay.target.closest("#geri") && "speechSynthesis" in window) speechSynthesis.cancel();
}, true);

// İngilizce karşılıklar
document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "Erişilebilirlik": "Accessibility", "ERİŞİLEBİLİRLİK": "ACCESSIBILITY",
    "Büyük yazı": "Large text", "Listeyi ve eser bilgilerini büyütür": "Enlarges the list and monument details",
    "Yüksek kontrast": "High contrast", "Siyah-beyaz, daha net yazılar": "Black and white, sharper text",
    "Eser kartındaki Sesli dinle düğmesi bilgileri seçili dilde okur.": "The Listen button on a monument card reads its details aloud in the selected language.",
    "Sesli dinle": "Listen", "Durdur": "Stop"
  });
});


/* ================= TÜM ŞEHİRLER: İNGİLİZCESİ ================= */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, { "Tüm şehirler": "All cities", "Tümünü gör": "Show all" });
});


/* ================= ÜYELİK VE AYARLAR ================= */
// Hackathon sürümü: hesaplar bu cihazda saklanır (sunucu yok). Şifre açık hâliyle değil, özetiyle tutulur.
// Gerçek yayında bu kısım bir sunucuya (ör. Vakıf Katılım hesabı) bağlanır.

function hesapOku(anahtar, varsayilan) {
  try { return JSON.parse(localStorage.getItem(anahtar)) || varsayilan; } catch (hata) { return varsayilan; }
}
function hesapYaz(anahtar, deger) {
  try { localStorage.setItem(anahtar, JSON.stringify(deger)); } catch (hata) { }
}
let oturum = hesapOku("vakfiye:oturum", null);   // { ad, eposta } ya da { misafir: true }

async function sifreOzeti(sifre) {
  const veri = new TextEncoder().encode("vakfiye:" + sifre);
  if (window.crypto && crypto.subtle) {
    const ozet = await crypto.subtle.digest("SHA-256", veri);
    return [...new Uint8Array(ozet)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  let h = 0;
  veri.forEach((b) => { h = (h * 31 + b) >>> 0; });
  return "basit-" + h.toString(16);
}

// Giriş ekranı (tanıtımdan sonra, ana ekrandan önce)
document.querySelector(".kabuk").insertAdjacentHTML("beforeend", `
  <div class="giris" id="giris" hidden>
    <div class="giris-ust">
      <span class="logo">Vakfiye</span>
      <h2 id="giris-baslik">Gezini kaydet</h2>
      <p class="giris-alt">Üye olursan pasaport pulların ve tercihlerin adınla saklanır.</p>
    </div>
    <div class="giris-sekmeler" role="tablist">
      <button class="secili" data-giris-sekme="uye" role="tab">Üye ol</button>
      <button data-giris-sekme="gir" role="tab">Giriş yap</button>
    </div>
    <form class="giris-form" id="giris-form" novalidate>
      <label data-sadece="uye">Ad Soyad<input id="g-ad" autocomplete="name" placeholder="Adın ve soyadın"></label>
      <label>E-posta<input id="g-eposta" type="email" autocomplete="email" placeholder="ornek@eposta.com"></label>
      <label>Şifre<input id="g-sifre" type="password" autocomplete="current-password" placeholder="En az 6 karakter"></label>
      <span class="giris-hata" id="giris-hata" role="alert"></span>
      <button class="dugme-ana" type="submit" id="giris-gonder">Üye ol</button>
    </form>
    <div class="giris-veya"><span>veya</span></div>
    <button class="giris-misafir" id="giris-misafir">Üye olmadan devam et</button>
    <span class="sade-not giris-not">Bu sürümde hesabın yalnızca bu cihazda tutulur.</span>
  </div>`);

let girisSekmesi = "uye";
function girisSekmesiSec(sekme) {
  girisSekmesi = sekme;
  document.querySelectorAll("[data-giris-sekme]").forEach((d) => d.classList.toggle("secili", d.dataset.girisSekme === sekme));
  document.querySelector('[data-sadece="uye"]').hidden = sekme !== "uye";
  document.getElementById("giris-gonder").textContent = sekme === "uye" ? "Üye ol" : "Giriş yap";
  document.getElementById("g-sifre").autocomplete = sekme === "uye" ? "new-password" : "current-password";
  document.getElementById("giris-hata").textContent = "";
}

function girisEkraniniAc(sekme) {
  document.querySelectorAll(".kabuk > div").forEach((ekran) => { if (ekran.id !== "giris") ekran.hidden = true; });
  document.getElementById("giris").hidden = false;
  girisSekmesiSec(sekme || "uye");
}

function anaEkranaGec() {
  document.getElementById("giris").hidden = true;
  document.getElementById("ana").hidden = false;
  if (!document.getElementById("liste").children.length) anaEkraniKur();
  profilYaz();
}

// Tanıtımın son sayfasında "Başlayalım" → henüz seçim yapılmadıysa giriş ekranı
document.addEventListener("click", (olay) => {
  if (olay.target.closest("#ileri") && sira === sayfalar.length - 1 && (oturum === null || oturum.misafir)) {
    olay.stopImmediatePropagation();
    document.getElementById("tanitim").hidden = true;
    girisEkraniniAc("uye");
  }
}, true);

document.addEventListener("click", (olay) => {
  const sekme = olay.target.closest("[data-giris-sekme]");
  if (sekme) { girisSekmesiSec(sekme.dataset.girisSekme); return; }
  if (olay.target.closest("#giris-misafir")) {
    oturum = { misafir: true };
    hesapYaz("vakfiye:oturum", oturum);
    anaEkranaGec();
  }
});

document.getElementById("giris-form").addEventListener("submit", async (olay) => {
  olay.preventDefault();
  const ad = document.getElementById("g-ad").value.trim();
  const eposta = document.getElementById("g-eposta").value.trim().toLowerCase();
  const sifre = document.getElementById("g-sifre").value;
  const hata = document.getElementById("giris-hata");
  const kullanicilar = hesapOku("vakfiye:kullanicilar", []);

  if (girisSekmesi === "uye" && ad.length < 2) { hata.textContent = "Adını yaz."; return; }
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(eposta) === false) { hata.textContent = "Geçerli bir e-posta yaz."; return; }
  if (sifre.length < 6) { hata.textContent = "Şifre en az 6 karakter olmalı."; return; }

  const ozet = await sifreOzeti(sifre);
  const kayitli = kullanicilar.find((k) => k.eposta === eposta);
  if (girisSekmesi === "uye") {
    if (kayitli) { hata.textContent = "Bu e-postayla zaten üye olunmuş. Giriş yap'ı dene."; return; }
    kullanicilar.push({ ad, eposta, sifreOzeti: ozet });
    hesapYaz("vakfiye:kullanicilar", kullanicilar);
    oturum = { ad, eposta };
  } else {
    if (kayitli === undefined || kayitli.sifreOzeti !== ozet) { hata.textContent = "E-posta ya da şifre hatalı."; return; }
    oturum = { ad: kayitli.ad, eposta };
  }
  hesapYaz("vakfiye:oturum", oturum);
  document.getElementById("g-sifre").value = "";
  anaEkranaGec();
  if (typeof bildir === "function") bildir(`Hoş geldin, ${oturum.ad.split(" ")[0]}`);
});

// Üst çubuğa ayarlar düğmesi
document.querySelector(".ana .ust").insertAdjacentHTML("beforeend",
  `<button class="ayar-dugme" id="ayar-dugme" aria-label="Ayarlar">⚙</button>`);

function profilYaz() {
  const dugme = document.getElementById("ayar-dugme");
  if (dugme) dugme.title = oturum && oturum.ad ? oturum.ad : "Ayarlar";
}

function ayarlariAc() {
  const anahtar = (ad, baslik, acik) => `
    <button class="sehir-satir erisim-satir${acik ? " secili" : ""}" data-ayar-anahtar="${ad}" aria-pressed="${acik}">
      <b>${baslik}</b><span class="anahtar" aria-hidden="true"></span>
    </button>`;
  const uye = oturum && oturum.ad;
  const dilSimdi = typeof dil !== "undefined" ? dil : "tr";
  document.body.insertAdjacentHTML("beforeend", `
    <div class="perde" id="ayar-perdesi">
      <div class="alt-panel ayarlar" role="dialog" aria-label="Ayarlar">
        <span class="kart-baslik">AYARLAR</span>

        <div class="ayar-grup">
          <span class="ayar-etiket">Hesap</span>
          ${uye ? `
            <div class="profil">
              <span class="profil-harf" aria-hidden="true">${oturum.ad.charAt(0).toLocaleUpperCase("tr")}</span>
              <span><b>${oturum.ad}</b><small>${oturum.eposta}</small></span>
            </div>
            <button class="kucuk-dugme ikincil" data-ayar="cikis">Çıkış yap</button>` : `
            <span class="sade-not">Misafir olarak geziyorsun. Pulların bu cihazda saklanıyor.</span>
            <button class="kucuk-dugme" data-ayar="uye-ol">Üye ol / Giriş yap</button>`}
        </div>

        <div class="ayar-grup">
          <span class="ayar-etiket">Dil</span>
          <div class="ayar-ikili">
            <button class="${dilSimdi === "tr" ? "secili" : ""}" data-ayar="dil-tr">Türkçe</button>
            <button class="${dilSimdi === "en" ? "secili" : ""}" data-ayar="dil-en">English</button>
          </div>
        </div>

        <div class="ayar-grup">
          <span class="ayar-etiket">Erişilebilirlik</span>
          ${anahtar("buyuk", "Büyük yazı", erisim.buyuk)}
          ${anahtar("kontrast", "Yüksek kontrast", erisim.kontrast)}
        </div>

        <div class="ayar-grup">
          <span class="ayar-etiket">Hakkında</span>
          <span class="sade-not">Veriler: Vakıf Katılım Vakıf Eserleri Envanteri — Bursa (2025), Konya (2024), Hatay (2022). Fotoğraflar: Vakıf Katılım.</span>
        </div>

        <button class="kucuk-dugme ikincil" data-perde-kapat>Kapat</button>
      </div>
    </div>`);
}

function ayarlariKapat() {
  const perde = document.getElementById("ayar-perdesi");
  if (perde) perde.remove();
}

document.addEventListener("click", (olay) => {
  if (olay.target.closest("#ayar-dugme")) { ayarlariAc(); return; }
  const perde = document.getElementById("ayar-perdesi");
  if (perde === null) return;

  const anahtar = olay.target.closest("[data-ayar-anahtar]");
  if (anahtar) {
    const ad = anahtar.dataset.ayarAnahtar;
    erisim[ad] = erisim[ad] === false;
    anahtar.classList.toggle("secili", erisim[ad]);
    anahtar.setAttribute("aria-pressed", erisim[ad]);
    erisimUygula();
    return;
  }
  const secim = olay.target.closest("[data-ayar]");
  if (secim) {
    const is = secim.dataset.ayar;
    if (is === "dil-tr" || is === "dil-en") {
      if (typeof dilSec === "function") dilSec(is === "dil-tr" ? "tr" : "en");
      perde.querySelectorAll(".ayar-ikili button").forEach((d) => d.classList.toggle("secili", d === secim));
      return;
    }
    if (is === "cikis") {
      oturum = null;
      try { localStorage.removeItem("vakfiye:oturum"); } catch (hata) { }
      ayarlariKapat();
      girisEkraniniAc("gir");
      return;
    }
    if (is === "uye-ol") { ayarlariKapat(); girisEkraniniAc("uye"); return; }
  }
  if (olay.target.closest("[data-perde-kapat]") || olay.target === perde) ayarlariKapat();
});

// Pasaport sekmesinin başında kimin pasaportu olduğu
const pasaportuCizHesapsiz = pasaportuCiz;
pasaportuCiz = function () {
  pasaportuCizHesapsiz();
  const alan = document.getElementById("sekme-pasaport");
  if (alan === null) return;
  alan.insertAdjacentHTML("afterbegin", oturum && oturum.ad
    ? `<div class="kart pasaport-sahibi"><span class="kart-baslik">PASAPORT SAHİBİ</span><b>${oturum.ad}</b></div>`
    : `<div class="kart pasaport-sahibi"><span class="kart-baslik">MİSAFİR PASAPORTU</span>
         <span class="sade-not">Pullarını kaybetmemek için üye ol.</span>
         <button class="kucuk-dugme" data-uye-ol>Üye ol</button></div>`);
};
document.addEventListener("click", (olay) => {
  if (olay.target.closest("[data-uye-ol]")) girisEkraniniAc("uye");
});

profilYaz();

// İngilizce karşılıklar
document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "Gezini kaydet": "Save your journey",
    "Üye olursan pasaport pulların ve tercihlerin adınla saklanır.": "Sign up to keep your passport stamps and preferences under your name.",
    "Üye ol": "Sign up", "Giriş yap": "Log in", "Ad Soyad": "Full name", "E-posta": "Email", "Şifre": "Password",
    "Adın ve soyadın": "Your full name", "En az 6 karakter": "At least 6 characters", "veya": "or",
    "Üye olmadan devam et": "Continue without signing up",
    "Bu sürümde hesabın yalnızca bu cihazda tutulur.": "In this version your account is stored only on this device.",
    "Adını yaz.": "Enter your name.", "Geçerli bir e-posta yaz.": "Enter a valid email.",
    "Şifre en az 6 karakter olmalı.": "Password must be at least 6 characters.",
    "Bu e-postayla zaten üye olunmuş. Giriş yap'ı dene.": "This email is already registered. Try Log in.",
    "E-posta ya da şifre hatalı.": "Wrong email or password.",
    "AYARLAR": "SETTINGS", "Ayarlar": "Settings", "Hesap": "Account", "Dil": "Language", "Hakkında": "About",
    "Çıkış yap": "Log out", "Üye ol / Giriş yap": "Sign up / Log in",
    "Misafir olarak geziyorsun. Pulların bu cihazda saklanıyor.": "You're exploring as a guest. Your stamps are saved on this device.",
    "Veriler: Vakıf Katılım Vakıf Eserleri Envanteri — Bursa (2025), Konya (2024), Hatay (2022). Fotoğraflar: Vakıf Katılım.": "Data: Vakıf Katılım Endowed Monuments Inventory — Bursa (2025), Konya (2024), Hatay (2022). Photos: Vakıf Katılım.",
    "PASAPORT SAHİBİ": "PASSPORT HOLDER", "MİSAFİR PASAPORTU": "GUEST PASSPORT",
    "Pullarını kaybetmemek için üye ol.": "Sign up so you don't lose your stamps."
  });
  KALIPLAR.push([/^Hoş geldin, (.+)$/, (m) => `Welcome, ${m[1]}`]);
});


/* ================= BULUT HESABI (SUPABASE) ================= */
// Üyelik ve pasaport pulları Supabase veri tabanında saklanır; aynı hesapla her cihazdan girilebilir.
// Bu anahtar herkese açık (publishable) anahtardır; verileri veri tabanındaki satır güvenliği kuralları korur.
const BULUT = {
  adres: "https://ijldursdsnfknfnecvrt.supabase.co",
  anahtar: "sb_publishable_Yv1lh8vXP6141eu4m5fTwQ_swDxdYIq"
};

async function bulutIstek(yol, ayar = {}) {
  const basliklar = { apikey: BULUT.anahtar, "Content-Type": "application/json" };
  if (ayar.token) basliklar.Authorization = "Bearer " + ayar.token;
  if (ayar.tercih) basliklar.Prefer = ayar.tercih;
  const yanit = await fetch(BULUT.adres + yol, {
    method: ayar.yontem || "GET",
    headers: basliklar,
    body: ayar.govde === undefined ? undefined : JSON.stringify(ayar.govde)
  });
  const metin = await yanit.text();
  let veri = null;
  try { veri = metin ? JSON.parse(metin) : null; } catch (hata) { veri = { msg: metin }; }
  if (yanit.ok === false) {
    const hata = new Error((veri && (veri.msg || veri.error_description || veri.message)) || ("HTTP " + yanit.status));
    hata.kod = veri && (veri.error_code || veri.code || veri.error);
    hata.durum = yanit.status;
    throw hata;
  }
  return veri;
}

function oturumuKaydet(yanit, ad) {
  oturum = {
    id: yanit.user.id,
    eposta: yanit.user.email,
    ad: ad || (yanit.user.user_metadata && yanit.user.user_metadata.ad) || yanit.user.email.split("@")[0],
    erisim: yanit.access_token,
    yenile: yanit.refresh_token,
    bitis: Date.now() + (yanit.expires_in || 3600) * 1000
  };
  hesapYaz("vakfiye:oturum", oturum);
}

/* ================= OTURUM SÜRESİ VE ÇIKIŞ DÜZELTMESİ ================= */
// 1) Yenileme jetonu geçersizse oturum temizlenir ve yeniden giriş istenir (yerel pullar silinmez;
//    giriş yapınca pullariEsitle() onları hesaba gönderir).
// 2) Aynı anda gelen birkaç yenileme isteği tek isteğe indirilir (jeton tek kullanımlık).
let yenilemeSozu = null;

function oturumSuresiDoldu() {
  if (oturum === null || oturum.id === undefined) return;
  oturum = null;
  try { localStorage.removeItem("vakfiye:oturum"); sessionStorage.removeItem("vakfiye:oturum"); } catch (hata) { }
  if (typeof bildir === "function") bildir("Oturumun sona erdi, tekrar giriş yap");
  setTimeout(() => girisEkraniniAc("gir"), 0);
}

async function gecerliToken() {
  if (oturum === null || oturum.yenile === undefined) return null;
  if (Date.now() < oturum.bitis - 60000) return oturum.erisim;
  if (yenilemeSozu === null) {
    const ad = oturum.ad;
    yenilemeSozu = bulutIstek("/auth/v1/token?grant_type=refresh_token", { yontem: "POST", govde: { refresh_token: oturum.yenile } })
      .then((yanit) => { oturumuKaydet(yanit, ad); return oturum.erisim; })
      .catch((hata) => {
        if (hata && (hata.durum === 400 || hata.durum === 401 || hata.durum === 403)) oturumSuresiDoldu();
        throw hata;
      })
      .finally(() => { yenilemeSozu = null; });
  }
  return yenilemeSozu;
}

// Pulları eşitle: telefondakiler ile hesaptakileri birleştir
async function pullariEsitle() {
  const token = await gecerliToken();
  if (token === null) return;
  const bulutta = (await bulutIstek("/rest/v1/pullar?select=eser_id", { token })).map((p) => p.eser_id);
  const eksikler = pullar.filter((id) => bulutta.includes(id) === false);
  if (eksikler.length) {
    await bulutIstek("/rest/v1/pullar", {
      yontem: "POST", token, tercih: "resolution=ignore-duplicates,return=minimal",
      govde: eksikler.map((id) => ({ kullanici: oturum.id, eser_id: id }))
    });
  }
  let degisti = false;
  bulutta.forEach((id) => { if (pullar.includes(id) === false && rotaBul(id)) { pullar.push(id); degisti = true; } });
  if (degisti) {
    kayitYaz("pullar", pullar);
    if (document.getElementById("sekme-pasaport") && document.getElementById("sekme-pasaport").hidden === false) pasaportuCiz();
  }
}

function hataMesaji(hata) {
  if (hata instanceof TypeError) return "Sunucuya bağlanılamadı. İnternet bağlantını kontrol et ya da üye olmadan devam et.";
  const k = String(hata.kod || "") + " " + hata.message;
  if (/already|exists/i.test(k)) return "Bu e-postayla zaten üye olunmuş. Giriş yap'ı dene.";
  if (/invalid_credentials|Invalid login/i.test(k)) return "E-posta ya da şifre hatalı.";
  if (/weak_password/i.test(k)) return "Şifre çok zayıf. Daha uzun bir şifre dene.";
  if (/email_address_invalid|invalid.*email/i.test(k)) return "Geçerli bir e-posta yaz.";
  if (/rate|429/i.test(k) || hata.durum === 429) return "Çok fazla deneme yapıldı. Biraz bekleyip tekrar dene.";
  if (/not_confirmed/i.test(k)) return "E-postanı onaylaman gerekiyor.";
  return "Bir sorun oluştu: " + hata.message;
}

// Üye ol / Giriş yap formu artık bulut hesabıyla çalışır
document.addEventListener("submit", async (olay) => {
  if (olay.target.id !== "giris-form") return;
  olay.preventDefault();
  olay.stopImmediatePropagation();
  const ad = document.getElementById("g-ad").value.trim();
  const eposta = document.getElementById("g-eposta").value.trim().toLowerCase();
  const sifre = document.getElementById("g-sifre").value;
  const hataAlani = document.getElementById("giris-hata");
  const dugme = document.getElementById("giris-gonder");

  if (girisSekmesi === "uye" && ad.length < 2) { hataAlani.textContent = "Adını yaz."; return; }
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(eposta) === false) { hataAlani.textContent = "Geçerli bir e-posta yaz."; return; }
  if (sifre.length < 6) { hataAlani.textContent = "Şifre en az 6 karakter olmalı."; return; }

  const eskiYazi = dugme.textContent;
  dugme.disabled = true;
  dugme.textContent = "Bekleyin…";
  hataAlani.textContent = "";
  try {
    if (girisSekmesi === "uye") {
      const yanit = await bulutIstek("/auth/v1/signup", { yontem: "POST", govde: { email: eposta, password: sifre, data: { ad } } });
      if (yanit.access_token === undefined) {
        hataAlani.textContent = "Üyelik oluşturuldu. E-postana gelen onay linkine tıklayıp giriş yap.";
        girisSekmesiSec("gir");
        return;
      }
      oturumuKaydet(yanit, ad);
      await bulutIstek("/rest/v1/profiller", {
        yontem: "POST", token: oturum.erisim, tercih: "resolution=merge-duplicates,return=minimal",
        govde: { id: oturum.id, ad }
      });
    } else {
      const yanit = await bulutIstek("/auth/v1/token?grant_type=password", { yontem: "POST", govde: { email: eposta, password: sifre } });
      oturumuKaydet(yanit);
      try {
        const profil = await bulutIstek(`/rest/v1/profiller?id=eq.${oturum.id}&select=ad`, { token: oturum.erisim });
        if (profil && profil[0]) { oturum.ad = profil[0].ad; hesapYaz("vakfiye:oturum", oturum); }
      } catch (hata) { }
    }
    document.getElementById("g-sifre").value = "";
    anaEkranaGec();
    bildir(`Hoş geldin, ${oturum.ad.split(" ")[0]}`);
    pullariEsitle().catch((h) => console.warn("Pul eşitlenemedi", h));
  } catch (hata) {
    hataAlani.textContent = hataMesaji(hata);
  } finally {
    dugme.disabled = false;
    dugme.textContent = girisSekmesi === "uye" ? "Üye ol" : "Giriş yap";
  }
}, true);

// Yeni pul alınınca hesaba da yaz
const pulAlBulutsuz = pulAl;
pulAl = function (id) {
  pulAlBulutsuz(id);
  if (oturum && oturum.id) pullariEsitle().catch((h) => console.warn("Pul eşitlenemedi", h));
};

// Çıkış yaparken sunucudaki oturumu da kapat
document.addEventListener("click", (olay) => {
  if (olay.target.closest('[data-ayar="cikis"]') && oturum && oturum.erisim) {
    bulutIstek("/auth/v1/logout?scope=local", { yontem: "POST", token: oturum.erisim }).catch(() => {});
  }
}, true);

// Eski (yalnızca cihazda tutulan) oturum varsa yeniden giriş istensin
if (oturum && oturum.ad && oturum.id === undefined) {
  oturum = null;
  try { localStorage.removeItem("vakfiye:oturum"); } catch (hata) { }
}
// Uygulama açılınca pulları eşitle
if (oturum && oturum.id) pullariEsitle().catch((h) => console.warn("Pul eşitlenemedi", h));

// Giriş ekranındaki not
const girisNotu = document.querySelector(".giris-not");
if (girisNotu) girisNotu.textContent = "Hesabın Vakfiye sunucusunda güvenle saklanır; her cihazdan giriş yapabilirsin.";

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "Bekleyin…": "Please wait…",
    "Hesabın Vakfiye sunucusunda güvenle saklanır; her cihazdan giriş yapabilirsin.": "Your account is stored securely on the Vakfiye server; you can log in from any device.",
    "Sunucuya bağlanılamadı. İnternet bağlantını kontrol et ya da üye olmadan devam et.": "Couldn't reach the server. Check your connection or continue without signing up.",
    "Şifre çok zayıf. Daha uzun bir şifre dene.": "Password is too weak. Try a longer one.",
    "Çok fazla deneme yapıldı. Biraz bekleyip tekrar dene.": "Too many attempts. Please wait and try again.",
    "E-postanı onaylaman gerekiyor.": "You need to confirm your email.",
    "Üyelik oluşturuldu. E-postana gelen onay linkine tıklayıp giriş yap.": "Account created. Click the link in your email, then log in."
  });
});


/* ================= BENİ HATIRLA · AYARLAR KALDIRILDI ================= */
// "Beni hatırla" işaretliyse oturum tarayıcıda kalır (uygulama her açıldığında giriş istenmez).
// İşaretli değilse oturum yalnızca tarayıcı kapanana kadar sürer.
let beniHatirla = hesapOku("vakfiye:hatirla", true);

document.getElementById("giris-gonder").insertAdjacentHTML("beforebegin", `
  <label class="hatirla"><input type="checkbox" id="g-hatirla" ${beniHatirla ? "checked" : ""}> Beni hatırla</label>`);
document.getElementById("g-hatirla").addEventListener("change", (olay) => {
  beniHatirla = olay.target.checked;
  try { localStorage.setItem("vakfiye:hatirla", JSON.stringify(beniHatirla)); } catch (hata) { }
});

const hesapYazHatirlamasiz = hesapYaz;
hesapYaz = function (anahtar, deger) {
  if (anahtar === "vakfiye:oturum" && deger && deger.id && beniHatirla === false) {
    try { sessionStorage.setItem(anahtar, JSON.stringify(deger)); localStorage.removeItem(anahtar); } catch (hata) { }
    return;
  }
  hesapYazHatirlamasiz(anahtar, deger);
};

// Hatırlanmayan oturum: aynı tarayıcı oturumunda sayfa yenilenince devam etsin
if (oturum === null) {
  try {
    const kisa = sessionStorage.getItem("vakfiye:oturum");
    if (kisa) { oturum = JSON.parse(kisa); pullariEsitle().catch((h) => console.warn("Pul eşitlenemedi", h)); }
  } catch (hata) { }
}

function oturumuKapat() {
  oturum = null;
  try { localStorage.removeItem("vakfiye:oturum"); sessionStorage.removeItem("vakfiye:oturum"); } catch (hata) { }
  girisEkraniniAc("gir");
}

// "Başla" her zaman tanıtımı açar; tanıtımı geçmek isteyen sağ üstteki "Atla"ya basar.

// Ayarlar düğmesini kaldır (dil: EN düğmesi, erişilebilirlik: Aa düğmesi zaten var)
const ayarDugmesi = document.getElementById("ayar-dugme");
if (ayarDugmesi) ayarDugmesi.remove();

// Çıkış artık pasaport sekmesindeki "Pasaport sahibi" kartında
const pasaportuCizCikissiz = pasaportuCiz;
pasaportuCiz = function () {
  pasaportuCizCikissiz();
  const kart = document.querySelector("#sekme-pasaport .pasaport-sahibi");
  if (kart && oturum && oturum.id) {
    kart.insertAdjacentHTML("beforeend", `
      <span class="sade-not">${oturum.eposta}</span>
      <button class="kucuk-dugme ikincil" data-ayar="cikis" data-cikis>Çıkış yap</button>`);
  }
};
document.addEventListener("click", (olay) => {
  if (olay.target.closest("[data-cikis]")) oturumuKapat();
});

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, { "Beni hatırla": "Remember me" });
});


/* ================= PROFİL VE AYARLAR MENÜSÜ (☰) ================= */
// Üst çubukta tek bir ☰ düğmesi: profil, dil, erişilebilirlik, şehir, hakkında ve çıkış burada.

const ustCubugu = document.querySelector(".ana .ust");
["erisim-dugme", "dil-dugme"].forEach((id) => { const d = document.getElementById(id); if (d) d.remove(); });
ustCubugu.insertAdjacentHTML("beforeend", `
  <button class="menu-dugme" id="menu-dugme" aria-label="Profil ve ayarlar" aria-expanded="false">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
  </button>`);

function menuyuCiz() {
  const uye = oturum && oturum.id;
  const dilSimdi = typeof dil !== "undefined" ? dil : "tr";
  const anahtar = (ad, baslik, acik) => `
    <button class="cekmece-satir" data-menu-anahtar="${ad}" aria-pressed="${acik}">
      <span>${baslik}</span><span class="anahtar${acik ? " acik" : ""}" aria-hidden="true"></span>
    </button>`;
  return `
    <div class="cekmece-ust">
      <span class="kart-baslik">PROFİL</span>
      <button class="cekmece-kapat" data-menu-kapat aria-label="Kapat">✕</button>
    </div>
    <div class="cekmece-profil">
      <span class="profil-harf" aria-hidden="true">${uye ? oturum.ad.charAt(0).toLocaleUpperCase("tr") : PROFIL_SIMGESI}</span>
      <span class="profil-yazi">
        <b>${uye ? oturum.ad : "Misafir"}</b>
        <small>${uye ? oturum.eposta : "Üye ol, pulların kaybolmasın"}</small>
      </span>
    </div>
    ${uye ? "" : `<button class="dugme-ana cekmece-uye" data-menu-is="uye-ol">Üye ol / Giriş yap</button>`}

    <span class="cekmece-baslik">Gezi</span>
    <button class="cekmece-satir" data-menu-is="pasaport"><span>Pasaportum</span><span class="cekmece-deger">${pullar.length} pul</span></button>
    <button class="cekmece-satir" data-menu-is="sehir"><span>Şehir</span><span class="cekmece-deger">${secilenSehir}</span></button>

    <span class="cekmece-baslik">Ayarlar</span>
    <div class="cekmece-dil" role="group" aria-label="Dil">
      <button class="${dilSimdi === "tr" ? "secili" : ""}" data-menu-is="dil-tr">Türkçe</button>
      <button class="${dilSimdi === "en" ? "secili" : ""}" data-menu-is="dil-en">English</button>
    </div>
    ${anahtar("buyuk", "Büyük yazı", erisim.buyuk)}
    ${anahtar("kontrast", "Yüksek kontrast", erisim.kontrast)}
    <span class="sade-not">Eser kartındaki Sesli dinle düğmesi bilgileri seçili dilde okur.</span>

    <span class="cekmece-baslik">Hakkında</span>
    <span class="sade-not">Veriler: Vakıf Katılım Vakıf Eserleri Envanteri — Bursa (2025), Konya (2024), Hatay (2022). Fotoğraflar: Vakıf Katılım.</span>

    ${uye ? `<button class="cekmece-cikis" data-menu-is="cikis">Çıkış yap</button>` : ""}`;
}

function menuyuAc() {
  menuyuKapat();
  document.body.insertAdjacentHTML("beforeend", `
    <div class="cekmece-perde" id="cekmece-perde">
      <aside class="cekmece" id="cekmece" role="dialog" aria-label="Profil ve ayarlar">${menuyuCiz()}</aside>
    </div>`);
  document.getElementById("menu-dugme").setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => document.getElementById("cekmece-perde").classList.add("acik"));
  document.querySelector("#cekmece [data-menu-kapat]").focus();
}

function menuyuKapat() {
  const perde = document.getElementById("cekmece-perde");
  if (perde) perde.remove();
  const dugme = document.getElementById("menu-dugme");
  if (dugme) dugme.setAttribute("aria-expanded", "false");
}

function menuyuYenile() {
  const cekmece = document.getElementById("cekmece");
  if (cekmece) cekmece.innerHTML = menuyuCiz();
}

document.addEventListener("click", (olay) => {
  if (olay.target.closest("#menu-dugme")) { menuyuAc(); return; }
  const perde = document.getElementById("cekmece-perde");
  if (perde === null) return;
  if (olay.target === perde || olay.target.closest("[data-menu-kapat]")) { menuyuKapat(); return; }

  const anahtar = olay.target.closest("[data-menu-anahtar]");
  if (anahtar) {
    const ad = anahtar.dataset.menuAnahtar;
    erisim[ad] = erisim[ad] === false;
    erisimUygula();
    menuyuYenile();
    return;
  }
  const is = olay.target.closest("[data-menu-is]");
  if (is === null) return;
  const ne = is.dataset.menuIs;
  if (ne === "dil-tr" || ne === "dil-en") { dilSec(ne === "dil-tr" ? "tr" : "en"); menuyuYenile(); return; }
  menuyuKapat();
  if (ne === "pasaport") document.querySelector('.menu [data-sekme="pasaport"]').click();
  if (ne === "sehir") sehirPaneliniAc();
  if (ne === "uye-ol") girisEkraniniAc("uye");
  if (ne === "cikis") {
    if (oturum && oturum.erisim) bulutIstek("/auth/v1/logout?scope=local", { yontem: "POST", token: oturum.erisim }).catch(() => {});
    oturumuKapat();
  }
});
document.addEventListener("keydown", (olay) => { if (olay.key === "Escape") menuyuKapat(); });

// Giriş ya da misafir seçiminden sonra her zaman Keşfet sekmesiyle başla (eski kullanıcının pasaportu ekranda kalmasın)
const anaEkranaGecMenusuz = anaEkranaGec;
anaEkranaGec = function () {
  anaEkranaGecMenusuz();
  menuyuKapat();
  if (document.getElementById("eser-karti").hidden === false) eserKartiniKapat();
  sekmeyeGec("kesfet");
};

document.addEventListener("DOMContentLoaded", () => {
  const dilDugmesi = document.getElementById("dil-dugme");   // dil.js sonradan ekliyor
  if (dilDugmesi) dilDugmesi.remove();
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "PROFİL": "PROFILE", "Misafir": "Guest", "Üye ol, pulların kaybolmasın": "Sign up to keep your stamps",
    "Gezi": "Trip", "Pasaportum": "My passport", "Şehir": "City", "Profil ve ayarlar": "Profile and settings",
    "Ayarlar": "Settings", "Hakkında": "About", "Kapat": "Close"
  });
  KALIPLAR.push([/^(\d+) pul$/, (m) => `${m[1]} stamps`]);
});


/* ================= SERGİLER ================= */
// Vakıf Eserleri Envanter Projesi kapsamında açılan sergiler (basın haberlerinden derlendi).
// Yeni sergi eklemek için bu listeye bir satır eklemek yeterli. bitis: null → bitiş tarihi açıklanmadı.
const SERGILER = [
  {
    ad: "Bursa Vakıf Eserleri Fotoğraf Sergisi", sehir: "Bursa",
    yer: "Tophane Meydanı; yıl boyunca Orhangazi, Çarşıbaşı, Emir Sultan ve UNESCO meydanları ile Cumhuriyet Caddesi",
    harita: "Tophane Meydanı, Osmangazi, Bursa",
    baslangic: "2026-04-07", bitis: "2026-12-31", tarihYazi: "2026 boyunca",
    aciklama: "Bursa'nın fethinin 700. yılı için Bursa Valiliği ile birlikte. Envanter kitabından seçilmiş 276 fotoğraf açık havada.",
    kaynak: "https://www.yenisafak.com/hayat/vakif-eserleri-sergilendi-4812779"
  },
  {
    ad: "Bir Rüyanın İzinde", sehir: "Bursa",
    yer: "Tayyare Kültür Merkezi", harita: "Tayyare Kültür Merkezi, Bursa",
    baslangic: "2026-09-17", bitis: null, tarihYazi: "Eylül 2026'da açıldı",
    aciklama: "Bursa Vakıf Eserleri kitabından seçilen 320 eserin fotoğraflarıyla fotoğraf ve deneyim sergisi.",
    kaynak: "https://www.ekonomigazetesi.com/sehirler/vakif-katilim-bursanin-vakif-mirasini-gelecege-tasiyor-87828"
  },
  {
    ad: "İstanbul'u Gören Rüya: Bursa", sehir: "İstanbul",
    yer: "Üsküdar Mimar Sinan Sanat Galerisi", harita: "Mimar Sinan Sanat Galerisi, Üsküdar, İstanbul",
    baslangic: "2026-09-04", bitis: "2026-09-30", tarihYazi: "4 – 30 Eylül 2026",
    aciklama: "Bursa'daki 385 vakıf eserini belgeleyen yaklaşık 35 bin kareden seçilen 87 fotoğraf.",
    kaynak: "https://www.dha.com.tr/video/vakif-eserleri-bursanin-tarihi-mirasini-fotograflarla-istanbula-tasidi-video-2939085"
  },
  {
    ad: "AYNA – Anadolu Göğünün İpek Mahyası", sehir: "Konya",
    yer: "Depo No:4", harita: "Depo No 4, Konya",
    baslangic: "2025-09-19", bitis: "2026-06-30", tarihYazi: "19 Eylül 2025 – 30 Haziran 2026",
    aciklama: "Konya vakıf eserleri fotoğraf ve deneyim sergisi; Konya Büyükşehir Belediyesi tarafından Vakıf Eserleri Envanter Projesi kapsamında hazırlandı.",
    kaynak: "https://www.gazetebirlik.com/kultur-sanat/konyanin-bin-yillik-hafizasi-gun-yuzune-cikiyor-ayna-vakif-eserleri-sergisi-ziyarete-acildi/905178"
  },
  {
    ad: "Konya Vakıf Eserleri Fotoğraf Sergisi", sehir: "İstanbul",
    yer: "Üsküdar Mimar Sinan Galerisi", harita: "Mimar Sinan Sanat Galerisi, Üsküdar, İstanbul",
    baslangic: "2025-01-24", bitis: "2025-03-10", tarihYazi: "24 Ocak – 10 Mart 2025",
    aciklama: "İki ciltlik Konya Vakıf Eserleri Envanteri'nden seçilen 546 fotoğraf.",
    kaynak: "https://www.turkgun.com/kultur-sanat/vakif-katilimin-konya-vakif-eserleri-fotograf-sergisi-mimar-sinan-galerisinde-sanatseverlerle-bulustu/263268"
  }
];

function sergiDurumu(sergi) {
  const bugun = new Date().toISOString().slice(0, 10);
  if (bugun < sergi.baslangic) return "yakinda";
  if (sergi.bitis && bugun > sergi.bitis) return "bitti";
  return "acik";
}
const DURUM_YAZI = { acik: "Şimdi açık", yakinda: "Yakında", bitti: "Sona erdi" };

function sergileriAc() {
  const sira = { acik: 0, yakinda: 1, bitti: 2 };
  const liste = [...SERGILER].sort((a, b) =>
    sira[sergiDurumu(a)] - sira[sergiDurumu(b)] || b.baslangic.localeCompare(a.baslangic));
  const kartlar = liste.map((s) => {
    const durum = sergiDurumu(s);
    const yol = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(s.harita);
    return `
      <article class="sergi-kart ${durum}">
        <div class="sergi-ust"><span class="sergi-durum ${durum}">${DURUM_YAZI[durum]}</span><span class="sergi-sehir">${s.sehir}</span></div>
        <b class="sergi-ad">${s.ad}</b>
        <span class="sergi-satir">${s.yer}</span>
        <span class="sergi-satir"><span>${s.tarihYazi}</span></span>
        <p class="sergi-aciklama">${s.aciklama}</p>
        <div class="sergi-eylem">
          ${durum === "bitti" ? "" : `<a class="kucuk-dugme yol" href="${yol}" target="_blank" rel="noopener">Yol tarifi</a>`}
          <a class="kucuk-dugme ikincil" href="${s.kaynak}" target="_blank" rel="noopener">Haberi oku</a>
        </div>
      </article>`;
  }).join("");
  document.body.insertAdjacentHTML("beforeend", `
    <div class="perde" id="sergi-perdesi">
      <div class="alt-panel sergi-panel" role="dialog" aria-label="Sergiler">
        <span class="kart-baslik">SERGİLER</span>
        <span class="sade-not">Vakıf Eserleri Envanter Projesi'nin fotoğraf sergileri. Tarih ve saatleri gitmeden önce kurumdan teyit edin.</span>
        ${kartlar}
        <button class="kucuk-dugme ikincil" data-perde-kapat>Kapat</button>
      </div>
    </div>`);
}

document.addEventListener("click", (olay) => {
  if (olay.target.closest("[data-sergiler]")) {
    if (typeof menuyuKapat === "function") menuyuKapat();
    sergileriAc();
    return;
  }
  const perde = document.getElementById("sergi-perdesi");
  if (perde && (olay.target === perde || olay.target.closest("#sergi-perdesi [data-perde-kapat]"))) perde.remove();
});

// ☰ menüsüne "Sergiler"
const menuyuCizSergisiz = menuyuCiz;
menuyuCiz = function () {
  const acik = SERGILER.filter((s) => sergiDurumu(s) === "acik").length;
  return menuyuCizSergisiz().replace('<span class="cekmece-baslik">Ayarlar</span>',
    `<button class="cekmece-satir" data-sergiler><span>Sergiler</span><span class="cekmece-deger">${acik ? acik + " açık" : ""}</span></button>
    <span class="cekmece-baslik">Ayarlar</span>`);
};

// Keşfet listesinin üstünde: seçili şehirde şu an açık bir sergi varsa duyur
function sergiDuyurusu() {
  const eski = document.getElementById("sergi-duyuru");
  if (eski) eski.remove();
  const sehirde = SERGILER.filter((s) => sergiDurumu(s) === "acik" &&
    (typeof secilenSehir === "undefined" || secilenSehir === "Tüm şehirler" || s.sehir === secilenSehir));
  if (sehirde.length === 0) return;
  document.getElementById("sayac").insertAdjacentHTML("beforebegin", `
    <button class="sergi-duyuru" id="sergi-duyuru" data-sergiler>
      <span class="sergi-duyuru-simge" aria-hidden="true"></span>
      <span><small>ŞİMDİ AÇIK SERGİ</small><b>${sehirde[0].ad}</b></span>
      <span aria-hidden="true">›</span>
    </button>`);
}
const sehirSecSergisiz = sehirSec;
sehirSec = function (ad) { sehirSecSergisiz(ad); sergiDuyurusu(); };
const anaEkraniKurSergisiz = anaEkraniKur;
anaEkraniKur = function () { anaEkraniKurSergisiz(); sergiDuyurusu(); };
if (document.getElementById("liste").children.length) sergiDuyurusu();

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "SERGİLER": "EXHIBITIONS", "Sergiler": "Exhibitions", "Sergiler": "Exhibitions",
    "ŞİMDİ AÇIK SERGİ": "OPEN NOW", "Şimdi açık": "Open now", "Yakında": "Coming soon", "Sona erdi": "Ended",
    "Haberi oku": "Read the news", "İstanbul": "Istanbul",
    "Vakıf Eserleri Envanter Projesi'nin fotoğraf sergileri. Tarih ve saatleri gitmeden önce kurumdan teyit edin.":
      "Photo exhibitions of the Endowed Monuments Inventory Project. Please confirm dates and hours before visiting.",
    "2026 boyunca": "Throughout 2026", "Eylül 2026'da açıldı": "Opened in September 2026",
    "4 – 30 Eylül 2026": "4 – 30 September 2026", "19 Eylül 2025 – 30 Haziran 2026": "19 September 2025 – 30 June 2026",
    "24 Ocak – 10 Mart 2025": "24 January – 10 March 2025",
    "Bursa Vakıf Eserleri Fotoğraf Sergisi": "Bursa Endowed Monuments Photo Exhibition",
    "Bir Rüyanın İzinde": "In the Footsteps of a Dream",
    "İstanbul'u Gören Rüya: Bursa": "The Dream That Saw Istanbul: Bursa",
    "Konya Vakıf Eserleri Fotoğraf Sergisi": "Konya Endowed Monuments Photo Exhibition",
    "Bursa'nın fethinin 700. yılı için Bursa Valiliği ile birlikte. Envanter kitabından seçilmiş 276 fotoğraf açık havada.":
      "With the Governorship of Bursa for the 700th anniversary of Bursa's conquest. 276 photos from the inventory book, outdoors.",
    "Bursa Vakıf Eserleri kitabından seçilen 320 eserin fotoğraflarıyla fotoğraf ve deneyim sergisi.":
      "A photo and experience exhibition featuring 320 monuments from the Bursa inventory book.",
    "Bursa'daki 385 vakıf eserini belgeleyen yaklaşık 35 bin kareden seçilen 87 fotoğraf.":
      "87 photos selected from about 35,000 frames documenting 385 endowed monuments in Bursa.",
    "Konya vakıf eserleri fotoğraf ve deneyim sergisi; Konya Büyükşehir Belediyesi tarafından Vakıf Eserleri Envanter Projesi kapsamında hazırlandı.":
      "A photo and experience exhibition of Konya's endowed monuments, prepared by Konya Metropolitan Municipality within the inventory project.",
    "İki ciltlik Konya Vakıf Eserleri Envanteri'nden seçilen 546 fotoğraf.": "546 photos selected from the two-volume Konya inventory."
  });
  KALIPLAR.push([/^(\d+) açık$/, (m) => `${m[1]} open`]);
});

// Açılış ve tanıtım yazıları için İngilizce (artık üç şehir)
document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "Veriler: Vakıf Katılım Vakıf Eserleri Envanteri": "Data: Vakıf Katılım Endowed Monuments Inventory",
    "Han ve dükkânların kirası aşevini, medreseyi, çeşmeyi yaşattı. Vakfiye, Bursa, Konya ve Hatay'daki vakıf eserlerinde bu iyiliğin izini sürer.":
      "Rent from inns and shops kept soup kitchens, madrasas and fountains alive. Vakfiye follows that good deed through the endowed monuments of Bursa, Konya and Hatay."
  });
});


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


/* ================= GİRİŞ AKIŞI ================= */
// Başla → tanıtım (Atla ile geçilebilir) → üye değilse Üye ol / Giriş yap ekranı (Üye olmadan devam et ile geçilebilir)
document.getElementById("tanitim-atla").addEventListener("click", () => {
  sira = sayfalar.length - 1;
  document.getElementById("ileri").click();
});
document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK !== "undefined") Object.assign(SOZLUK, { "Atla": "Skip" });
});


/* ================= HATAY DEPREM NOTU ================= */
// Hatay envanteri 2022'de yayımlandı; 6 Şubat 2023 depremlerinden önceki durumu anlatır.
const DEPREM_NOTU = "Bu bilgiler 2022'de yayımlanan Hatay envanterine aittir. 6 Şubat 2023 depremlerinde Hatay'daki birçok vakıf eseri hasar gördü ya da yıkıldı; eserin bugünkü durumu farklı olabilir. Ziyaret etmeden önce kontrol edin.";

const eserKartiniAcDepremsiz = eserKartiniAc;
eserKartiniAc = function (eserId) {
  eserKartiniAcDepremsiz(eserId);
  const eser = ESERLER.find((e) => e.id === eserId);
  if (eser && eser.il === "Hatay") {
    document.querySelector("#eser-karti .rozetler").insertAdjacentHTML("afterend",
      `<div class="deprem-notu" role="note"><span class="uyari-isaret" aria-hidden="true">!</span><span>${DEPREM_NOTU}</span></div>`);
  }
};

function depremBandi() {
  const eski = document.getElementById("deprem-bandi");
  if (eski) eski.remove();
  if (typeof secilenSehir === "undefined" || secilenSehir !== "Hatay") return;
  document.getElementById("sayac").insertAdjacentHTML("beforebegin", `
    <div class="deprem-notu" id="deprem-bandi" role="note"><span class="uyari-isaret" aria-hidden="true">!</span>
      <span>Hatay envanteri 2023 depremlerinden önce hazırlandı. Eserlerin bugünkü durumu farklı olabilir.</span></div>`);
}
const sehirSecDepremsiz = sehirSec;
sehirSec = function (ad) { sehirSecDepremsiz(ad); depremBandi(); };

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    [DEPREM_NOTU]: "This information comes from the Hatay inventory published in 2022. Many endowed monuments in Hatay were damaged or destroyed in the earthquakes of 6 February 2023; the monument's current condition may differ. Please check before visiting.",
    "Hatay envanteri 2023 depremlerinden önce hazırlandı. Eserlerin bugünkü durumu farklı olabilir.":
      "The Hatay inventory was prepared before the 2023 earthquakes. The monuments' current condition may differ."
  });
});


/* ================= ANA EKRANA EKLE ================= */
// Uygulama telefona ikonla eklenip tam ekran açılabilir (manifest.json). Önbellek (service worker) kullanılmaz.
let yuklemeIstegi = null;
window.addEventListener("beforeinstallprompt", (olay) => { olay.preventDefault(); yuklemeIstegi = olay; });
const uygulamaModunda = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

function yuklemeYardiminiAc() {
  const iphone = /iphone|ipad|ipod/i.test(navigator.userAgent);
  document.body.insertAdjacentHTML("beforeend", `
    <div class="perde" id="yukle-perdesi">
      <div class="alt-panel" role="dialog" aria-label="Ana ekrana ekle">
        <span class="kart-baslik">ANA EKRANA EKLE</span>
        <div class="yukle-ust"><img src="ikon/ikon-192.png" alt="" width="56" height="56"><span><b>Vakfiye</b><small>Uygulama gibi, tam ekran açılır</small></span></div>
        ${iphone ? `
          <ol class="yukle-adim">
            <li>Safari'nin altındaki <b>Paylaş</b> düğmesine bas <span aria-hidden="true">(□↑)</span>.</li>
            <li>Listeden <b>Ana Ekrana Ekle</b>'yi seç.</li>
            <li>Sağ üstteki Ekle'ye bas.</li>
          </ol>` : `
          <ol class="yukle-adim">
            <li>Chrome'un sağ üstündeki <b>⋮</b> menüsünü aç.</li>
            <li><b>Uygulamayı yükle</b> ya da <b>Ana ekrana ekle</b>'yi seç.</li>
            <li>Açılan pencerede Yükle'ye bas.</li>
          </ol>`}
        <button class="kucuk-dugme ikincil" data-perde-kapat>Kapat</button>
      </div>
    </div>`);
}

document.addEventListener("click", async (olay) => {
  if (olay.target.closest("[data-yukle]")) {
    if (typeof menuyuKapat === "function") menuyuKapat();
    if (yuklemeIstegi) {
      yuklemeIstegi.prompt();
      yuklemeIstegi = null;
    } else {
      yuklemeYardiminiAc();
    }
    return;
  }
  const perde = document.getElementById("yukle-perdesi");
  if (perde && (olay.target === perde || olay.target.closest("#yukle-perdesi [data-perde-kapat]"))) perde.remove();
});

// ☰ menüsüne "Ana ekrana ekle" (uygulama zaten ana ekrandan açıldıysa gösterme)
const menuyuCizYuklemesiz = menuyuCiz;
menuyuCiz = function () {
  const html = menuyuCizYuklemesiz();
  if (uygulamaModunda) return html;
  return html.replace('<span class="cekmece-baslik">Ayarlar</span>',
    `<button class="cekmece-satir" data-yukle><span>Ana ekrana ekle</span><span class="cekmece-deger">›</span></button>
    <span class="cekmece-baslik">Ayarlar</span>`);
};

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "Ana ekrana ekle": "Add to home screen", "ANA EKRANA EKLE": "ADD TO HOME SCREEN",
    "Ana ekrana ekle": "Add to home screen", "Uygulama gibi, tam ekran açılır": "Opens full screen, like an app",
    "Safari'nin altındaki": "Tap the", "düğmesine bas": "button at the bottom of Safari",
    "Listeden": "Choose", "'yi seç.": ".", "Sağ üstteki Ekle'ye bas.": "Tap Add in the top right.", "Açılan pencerede Yükle'ye bas.": "Tap Install in the dialog that opens.",
    "Chrome'un sağ üstündeki": "Open Chrome's", "menüsünü aç.": "menu in the top right.",
    "Uygulamayı yükle": "Install app", "ya da": "or", "Ana Ekrana Ekle": "Add to Home Screen",
    "Paylaş": "Share"
  });
});


/* ================= ŞİFREMİ UNUTTUM ================= */
// 1) Giriş yap ekranında "Şifremi unuttum" → Supabase e-postaya sıfırlama bağlantısı gönderir.
// 2) Bağlantı uygulamayı #...type=recovery ile açar → "Yeni şifre belirle" penceresi.
const SITE_ADRESI = "https://feyzabb.github.io/vakfiye/";

document.getElementById("g-sifre").closest("label").insertAdjacentHTML("afterend",
  `<button type="button" class="sifre-unuttum" id="sifre-unuttum" hidden>Şifremi unuttum</button>`);

const girisSekmesiSecSifresiz = girisSekmesiSec;
girisSekmesiSec = function (sekme) {
  girisSekmesiSecSifresiz(sekme);
  document.getElementById("sifre-unuttum").hidden = sekme !== "gir";
};

document.getElementById("sifre-unuttum").addEventListener("click", async () => {
  const eposta = document.getElementById("g-eposta").value.trim().toLowerCase();
  const alan = document.getElementById("giris-hata");
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(eposta) === false) { alan.textContent = "Önce e-posta adresini yaz, sonra Şifremi unuttum'a bas."; return; }
  const donus = location.protocol.startsWith("http") ? location.origin + location.pathname : SITE_ADRESI;
  try {
    await bulutIstek("/auth/v1/recover?redirect_to=" + encodeURIComponent(donus), { yontem: "POST", govde: { email: eposta } });
    alan.classList.add("basarili");
    alan.textContent = "Şifre sıfırlama bağlantısı e-postana gönderildi. Gelen kutunu (ve gereksiz klasörünü) kontrol et.";
  } catch (hata) {
    alan.classList.remove("basarili");
    alan.textContent = hataMesaji(hata);
  }
});
document.getElementById("giris-form").addEventListener("input", () => document.getElementById("giris-hata").classList.remove("basarili"));

// E-postadaki bağlantıyla açıldıysa
function yeniSifrePenceresi(parca) {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="perde" id="sifre-perdesi">
      <form class="alt-panel giris-form" id="yeni-sifre-form" novalidate>
        <span class="kart-baslik">YENİ ŞİFRE BELİRLE</span>
        <label>Yeni şifre<input id="ys-1" type="password" autocomplete="new-password" placeholder="En az 6 karakter"></label>
        <label>Yeni şifre (tekrar)<input id="ys-2" type="password" autocomplete="new-password"></label>
        <span class="giris-hata" id="ys-hata" role="alert"></span>
        <button class="dugme-ana" type="submit">Şifreyi kaydet</button>
      </form>
    </div>`);
  document.getElementById("yeni-sifre-form").addEventListener("submit", async (olay) => {
    olay.preventDefault();
    const s1 = document.getElementById("ys-1").value, s2 = document.getElementById("ys-2").value;
    const hataAlani = document.getElementById("ys-hata");
    if (s1.length < 6) { hataAlani.textContent = "Şifre en az 6 karakter olmalı."; return; }
    if (s1 !== s2) { hataAlani.textContent = "İki şifre aynı değil."; return; }
    try {
      const kullanici = await bulutIstek("/auth/v1/user", { yontem: "PUT", token: parca.get("access_token"), govde: { password: s1 } });
      oturumuKaydet({
        access_token: parca.get("access_token"), refresh_token: parca.get("refresh_token"),
        expires_in: Number(parca.get("expires_in")) || 3600, user: kullanici
      });
      try {
        const profil = await bulutIstek(`/rest/v1/profiller?id=eq.${oturum.id}&select=ad`, { token: oturum.erisim });
        if (profil && profil[0]) { oturum.ad = profil[0].ad; hesapYaz("vakfiye:oturum", oturum); }
      } catch (hata) { }
      document.getElementById("sifre-perdesi").remove();
      document.getElementById("acilis").hidden = true;
      document.getElementById("tanitim").hidden = true;
      anaEkranaGec();
      bildir("Şifren güncellendi. Hoş geldin, " + oturum.ad.split(" ")[0]);
      pullariEsitle().catch((h) => console.warn("Pul eşitlenemedi", h));
    } catch (hata) {
      hataAlani.textContent = hataMesaji(hata);
    }
  });
}

(function sifreBaglantisiniKontrolEt() {
  if (location.hash.length < 2) return;
  const parca = new URLSearchParams(location.hash.slice(1));
  if (parca.get("type") === "recovery" && parca.get("access_token")) {
    history.replaceState(null, "", location.pathname + location.search);
    yeniSifrePenceresi(parca);
  } else if (parca.get("error_code")) {
    history.replaceState(null, "", location.pathname + location.search);
    setTimeout(() => bildir(parca.get("error_code") === "otp_expired"
      ? "Şifre bağlantısının süresi dolmuş. Yeniden iste."
      : "Şifre bağlantısı geçersiz. Yeniden iste."), 300);
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "Şifremi unuttum": "Forgot password",
    "Önce e-posta adresini yaz, sonra Şifremi unuttum'a bas.": "Enter your email first, then tap Forgot password.",
    "Şifre sıfırlama bağlantısı e-postana gönderildi. Gelen kutunu (ve gereksiz klasörünü) kontrol et.": "A password reset link has been sent to your email. Check your inbox (and spam folder).",
    "YENİ ŞİFRE BELİRLE": "SET A NEW PASSWORD", "Yeni şifre": "New password", "Yeni şifre (tekrar)": "New password (again)",
    "Şifreyi kaydet": "Save password", "İki şifre aynı değil.": "The passwords don't match.",
    "Şifre bağlantısının süresi dolmuş. Yeniden iste.": "The reset link has expired. Request a new one.",
    "Şifre bağlantısı geçersiz. Yeniden iste.": "The reset link is invalid. Request a new one."
  });
  KALIPLAR.push([/^Şifren güncellendi\. Hoş geldin, (.+)$/, (m) => `Password updated. Welcome, ${m[1]}`]);
});


/* ================= DİL: AÇILIŞTA TAM ÇEVİRİ ================= */
// Sonradan eklenen İngilizce karşılıklar (Atla, sergiler, menü...) açılıştaki yazılara da uygulansın.
window.addEventListener("load", () => {
  if (typeof dil !== "undefined" && dil === "en" && typeof dilSec === "function") dilSec("en");
});


/* ================= BU ESERE SOR: WEB ASİSTANI ================= */
// Sorular vakfiye.vercel.app'teki asistana gider; yapay zekâ anahtarı sunucuda durur, uygulamada anahtar YOK.
const ASISTAN_ADRESI = "https://vakfiye.vercel.app/api/sor";
const ASISTAN_ORNEKLERI = ["Kim yaptırdı?", "Neden bu ad verilmiş?", "Ne zaman yapıldı?", "Ne zaman onarıldı?"];
let asistanGecmisi = [];          // son 4 soru-cevap ("peki ne zaman?" gibi devam soruları için)
let asistanEseri = null;
let asistanMesgul = false;

function guvenli(metin) {
  return String(metin == null ? "" : metin).replace(/[&<>"']/g, (h) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[h]));
}

const sorBolumunuEkleYerel = sorBolumunuEkle;
sorBolumunuEkle = function (eserId) {
  sorBolumunuEkleYerel(eserId);
  if (asistanEseri !== eserId) { asistanGecmisi = []; asistanEseri = eserId; }
  const oneriler = document.getElementById("oneriler");
  if (oneriler) {
    oneriler.innerHTML = ASISTAN_ORNEKLERI.map((s) => `<button type="button" class="cip" data-soru="${s}">${s}</button>`).join("");
  }
  const not = document.querySelector("#eser-karti .sor-notu");
  if (not) not.textContent = "Cevaplar bu eserin envanter kayıtlarına dayanır; her cümlenin neye dayandığı yanında yazar.";
  const kutu = document.getElementById("soru");
  if (kutu) kutu.maxLength = 300;
};

function cevapBalonu(veri) {
  const cumleler = Array.isArray(veri && veri.cumleler) ? veri.cumleler.filter((c) => c && c.metin) : [];
  if (!veri || veri.bulundu === false || cumleler.length === 0) {
    return { html: `<div class="balon yok">Kaynaklarımızda bu bilgi yok.</div>`, metin: "Kaynaklarımızda bu bilgi yok." };
  }
  const parcalar = cumleler.map((c) => {
    let etiket = "";
    if (c.durum === "kaynakli") {
      etiket = `<span class="etiket">✓ Kaynaklı</span>${c.sayfa ? `<span class="sayfa-no">s. ${guvenli(c.sayfa)}</span>` : ""}`;
    } else if (c.durum === "ai_yorumu") {
      etiket = `<span class="etiket ai-yorumu">~ AI yorumu</span>`;
    } else if (c.durum === "belirsiz") {
      etiket = `<span class="etiket belirsiz">? Belirsiz</span>`;
    }
    return `<p class="cevap-cumle"><span class="cevap-metin">${guvenli(c.metin)}</span>${etiket ? `<span class="cevap-etiket">${etiket}</span>` : ""}</p>`;
  });
  return { html: `<div class="balon cevap asistan">${parcalar.join("")}</div>`, metin: cumleler.map((c) => c.metin).join(" ") };
}

async function asistanaSor(soru, balon) {
  const kontrol = new AbortController();
  const zaman = setTimeout(() => kontrol.abort(), 25000);
  try {
    const yanit = await fetch(ASISTAN_ADRESI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eser_id: acikEser.id,
        soru: soru,
        dil: (typeof dil !== "undefined" && dil === "en") ? "en" : "tr",
        gecmis: asistanGecmisi.slice(-4)
      }),
      signal: kontrol.signal
    });
    if (yanit.ok === false) throw new Error("HTTP " + yanit.status);
    const sonuc = cevapBalonu(await yanit.json());
    balon.outerHTML = sonuc.html;
    asistanGecmisi.push({ soru: soru, cevap: sonuc.metin });
    asistanGecmisi = asistanGecmisi.slice(-4);
  } catch (hata) {
    balon.outerHTML = `<div class="balon hata">Cevap alınamadı, tekrar dene.
      <button type="button" class="tekrar-dene" data-tekrar="${guvenli(soru)}">Tekrar dene</button></div>`;
  } finally {
    clearTimeout(zaman);
  }
}

sor = async function (soru) {
  soru = String(soru).trim().slice(0, 300);
  if (soru === "" || asistanMesgul || acikEser === null) return;
  asistanMesgul = true;
  const sohbet = document.getElementById("sohbet");
  const dugme = document.querySelector("#sor-form button");
  if (dugme) dugme.disabled = true;
  sohbet.insertAdjacentHTML("beforeend", `<div class="balon soru">${guvenli(soru)}</div>`);
  sohbet.insertAdjacentHTML("beforeend", `<div class="balon bekliyor" role="status">Kayıtlara bakılıyor…</div>`);
  const balon = sohbet.lastElementChild;
  balon.scrollIntoView({ behavior: "smooth", block: "center" });
  await asistanaSor(soru, balon);
  asistanMesgul = false;
  if (dugme) dugme.disabled = false;
  if (sohbet.lastElementChild) sohbet.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
};

document.addEventListener("click", (olay) => {
  const tekrar = olay.target.closest("[data-tekrar]");
  if (tekrar === null || asistanMesgul) return;
  const soru = tekrar.dataset.tekrar;
  const balon = tekrar.closest(".balon");
  const onceki = balon.previousElementSibling;          // aynı soru balonu tekrar eklenmesin
  balon.remove();
  if (onceki && onceki.classList.contains("soru")) onceki.remove();
  sor(soru);
});

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "Neden bu ad verilmiş?": "Why was it given this name?", "Ne zaman onarıldı?": "When was it restored?",
    "Ne zaman yapıldı?": "When was it built?", "Kim yaptırdı?": "Who built it?",
    "Kayıtlara bakılıyor…": "Checking the records…", "Cevap alınamadı, tekrar dene.": "Couldn't get an answer, please try again.",
    "Tekrar dene": "Try again", "✓ Kaynaklı": "✓ Sourced", "~ AI yorumu": "~ AI interpretation", "? Belirsiz": "? Uncertain",
    "Cevaplar bu eserin envanter kayıtlarına dayanır; her cümlenin neye dayandığı yanında yazar.":
      "Answers are based on this monument's inventory records; each sentence shows what it is based on."
  });
  KALIPLAR.push([/^s\. (.+)$/, (m) => `p. ${m[1]}`]);
});


/* ================= BİLGİ ÖNER: TALEP GÖNDER ================= */
// Kullanıcı eser için ek bilgi / fotoğraf önerir. Öneri Supabase'deki "eser_talepleri" tablosuna düşer,
// fotoğraflar "talep-foto" deposuna yüklenir; web sitesindeki yönetim bölümü bu tablodan okur.
const TALEP_FOTO_EN_COK = 3;
const TALEP_BEKLEME_MS = 30000;
let talepSonGonderim = 0;

const sorBolumunuEkleTalepOncesi = sorBolumunuEkle;
sorBolumunuEkle = function (eserId) {
  sorBolumunuEkleTalepOncesi(eserId);
  const kart = document.getElementById("eser-karti");
  if (kart === null || document.getElementById("talep-ac")) return;
  kart.insertAdjacentHTML("beforeend", `
    <div class="kart talep-karti">
      <span class="kart-baslik">BİLGİ ÖNER</span>
      <p class="talep-aciklama">Bu eser hakkında bildiğin ek bir bilgi ya da fotoğrafın mı var? Bize gönder, ekibimiz inceleyip ekleyebilir.</p>
      <button type="button" class="talep-dugme" id="talep-ac">Bilgi / fotoğraf öner</button>
    </div>`);
};

function talepFormuAc() {
  if (acikEser === null || document.getElementById("talep-katman")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="talep-katman" id="talep-katman" role="dialog" aria-modal="true" aria-labelledby="talep-baslik">
      <form class="talep-kutu" id="talep-form" autocomplete="off">
        <div class="talep-ust">
          <b id="talep-baslik">Bilgi / fotoğraf öner</b>
          <button type="button" class="talep-kapat" id="talep-kapat" aria-label="Kapat">✕</button>
        </div>
        <span class="talep-eser">${guvenli(acikEser.ad)}</span>
        <label for="talep-bilgi">Önerin</label>
        <textarea id="talep-bilgi" maxlength="2000" rows="5" placeholder="Örn: Camiin avlusundaki çeşme 1950'lerde eklendi…"></textarea>
        <span class="talep-sayac" id="talep-sayac">0 / 2000</span>
        <label for="talep-foto">Fotoğraf (en fazla ${TALEP_FOTO_EN_COK})</label>
        <input type="file" id="talep-foto" accept="image/*" multiple>
        <div class="talep-onizleme" id="talep-onizleme"></div>
        <input type="text" id="talep-bal" tabindex="-1" autocomplete="off" aria-hidden="true" class="talep-bal">
        <div class="talep-durum" id="talep-durum" role="status"></div>
        <button type="submit" class="talep-gonder" id="talep-gonder">Gönder</button>
        <small class="talep-not">Önerin yönetim ekibine iletilir; incelenmeden yayınlanmaz.</small>
      </form>
    </div>`);
  document.getElementById("talep-bilgi").focus();
}

function talepFormuKapat() {
  const k = document.getElementById("talep-katman");
  if (k) k.remove();
}

function talepDurum(metin, hata) {
  const d = document.getElementById("talep-durum");
  if (!d) return;
  d.textContent = metin;
  d.className = "talep-durum" + (hata ? " hata" : "");
}

// Fotoğrafı küçült (en uzun kenar 1280 px, JPEG): hem hızlı yüklenir hem depoyu şişirmez
function fotoKucult(dosya) {
  return new Promise((coz, reddet) => {
    const url = URL.createObjectURL(dosya);
    const img = new Image();
    img.onload = () => {
      const oran = Math.min(1, 1280 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * oran);
      c.height = Math.round(img.height * oran);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob((b) => (b ? coz(b) : reddet(new Error("foto"))), "image/jpeg", 0.8);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reddet(new Error("foto")); };
    img.src = url;
  });
}

async function talepGonder(olay) {
  olay.preventDefault();
  if (document.getElementById("talep-bal").value !== "") return;          // bot tuzağı
  const bilgi = document.getElementById("talep-bilgi").value.trim();
  const dosyalar = Array.from(document.getElementById("talep-foto").files).slice(0, TALEP_FOTO_EN_COK);
  if (bilgi.length < 5 && dosyalar.length === 0) { talepDurum("Bir bilgi yaz ya da fotoğraf ekle.", true); return; }
  if (Date.now() - talepSonGonderim < TALEP_BEKLEME_MS) { talepDurum("Biraz bekleyip tekrar dene.", true); return; }

  const dugme = document.getElementById("talep-gonder");
  dugme.disabled = true;
  talepDurum(dosyalar.length ? "Fotoğraflar yükleniyor…" : "Gönderiliyor…", false);
  try {
    const token = (typeof gecerliToken === "function" && oturum && oturum.yenile) ? await gecerliToken().catch(() => null) : null;
    const kimlik = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : ("t" + Date.now() + Math.random().toString(16).slice(2));
    const yollar = [];
    for (let i = 0; i < dosyalar.length; i++) {
      const blob = await fotoKucult(dosyalar[i]);
      const yol = `${kimlik}/${i + 1}.jpg`;
      const yanit = await fetch(`${BULUT.adres}/storage/v1/object/talep-foto/${yol}`, {
        method: "POST",
        headers: { apikey: BULUT.anahtar, Authorization: "Bearer " + (token || BULUT.anahtar), "Content-Type": "image/jpeg" },
        body: blob
      });
      if (yanit.ok === false) throw new Error("Fotoğraf yüklenemedi (" + yanit.status + ")");
      yollar.push(yol);
    }
    talepDurum("Gönderiliyor…", false);
    await bulutIstek("/rest/v1/eser_talepleri", {
      yontem: "POST", token: token || undefined, tercih: "return=minimal",
      govde: {
        id: kimlik, eser_id: acikEser.id, eser_adi: acikEser.ad, bilgi: bilgi,
        kullanici: token && oturum.id ? oturum.id : null,
        gonderen_ad: oturum && oturum.ad ? oturum.ad : null,
        foto_yollari: yollar, kaynak: "uygulama"
      }
    });
    talepSonGonderim = Date.now();
    document.getElementById("talep-form").innerHTML = `
      <div class="talep-tesekkur"><b>Teşekkürler!</b>
      <p>Önerin yönetim ekibine ulaştı. İncelendikten sonra eserin sayfasına eklenebilir.</p>
      <button type="button" class="talep-gonder" id="talep-bitti">Tamam</button></div>`;
  } catch (hata) {
    talepDurum("Gönderilemedi, internetini kontrol edip tekrar dene.", true);
    dugme.disabled = false;
  }
}

document.addEventListener("click", (olay) => {
  if (olay.target.closest("#talep-ac")) return talepFormuAc();
  if (olay.target.closest("#talep-kapat") || olay.target.closest("#talep-bitti")) return talepFormuKapat();
  if (olay.target.id === "talep-katman") return talepFormuKapat();
});
document.addEventListener("submit", (olay) => { if (olay.target.id === "talep-form") talepGonder(olay); });
document.addEventListener("input", (olay) => {
  if (olay.target.id === "talep-bilgi") document.getElementById("talep-sayac").textContent = olay.target.value.length + " / 2000";
});
document.addEventListener("change", (olay) => {
  if (olay.target.id !== "talep-foto") return;
  const dosyalar = Array.from(olay.target.files).slice(0, TALEP_FOTO_EN_COK);
  const alan = document.getElementById("talep-onizleme");
  alan.innerHTML = "";
  dosyalar.forEach((d) => {
    const im = document.createElement("img");
    im.alt = "Seçilen fotoğraf";
    im.src = URL.createObjectURL(d);
    alan.appendChild(im);
  });
  if (olay.target.files.length > TALEP_FOTO_EN_COK) talepDurum(`En fazla ${TALEP_FOTO_EN_COK} fotoğraf gönderilir.`, false);
});
document.addEventListener("keydown", (olay) => { if (olay.key === "Escape") talepFormuKapat(); });

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "BİLGİ ÖNER": "SUGGEST INFO",
    "Bu eser hakkında bildiğin ek bir bilgi ya da fotoğrafın mı var? Bize gönder, ekibimiz inceleyip ekleyebilir.":
      "Do you have extra information or a photo about this monument? Send it to us and our team may add it after review.",
    "Bilgi / fotoğraf öner": "Suggest info / photo",
    "Bilgi / fotoğraf öner": "Suggest info / photo", "Önerin": "Your suggestion", "Gönder": "Send",
    "Önerin yönetim ekibine iletilir; incelenmeden yayınlanmaz.": "Your suggestion goes to the admin team and is not published before review.",
    "Teşekkürler!": "Thank you!", "Tamam": "OK"
  });
});


/* ================= HARİTALAR İLE AÇ: APPLE / GOOGLE SEÇİMİ ================= */
// "Haritalar ile aç" düğmesine basınca alttan Apple Haritalar / Google Haritalar seçeneği çıkar.
function haritaIosMu() {
  const ua = navigator.userAgent || "";
  return /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

function haritaSecenekleriAc(ad, google, apple) {
  haritaSecenekleriKapat();
  const secenekler = [
    { yazi: "Apple Haritalar", ikon: "", adres: apple },
    { yazi: "Google Haritalar", ikon: "", adres: google }
  ];
  if (haritaIosMu() === false) secenekler.reverse();      // telefonda en sık kullanılan başta
  document.body.insertAdjacentHTML("beforeend", `
    <div class="harita-katman" id="harita-katman" role="dialog" aria-modal="true" aria-labelledby="harita-baslik">
      <div class="harita-pencere">
        <b id="harita-baslik">Haritalar ile aç</b>
        <span class="harita-eser">${guvenli(ad)}</span>
        ${secenekler.map((s) => `<a class="harita-secenek" href="${s.adres}" target="_blank" rel="noopener" data-harita-kapat>
          <span class="harita-ikon" aria-hidden="true">${s.ikon}</span>${s.yazi}</a>`).join("")}
        <button type="button" class="harita-vazgec" data-harita-kapat>Vazgeç</button>
      </div>
    </div>`);
}

function haritaSecenekleriKapat() {
  const k = document.getElementById("harita-katman");
  if (k) k.remove();
}

// Eser kartındaki ve harita altındaki düğmeler: iki ayrı bağlantı yerine tek düğme
eylemDugmeleri = function (eser) {
  const adres = yolTarifiAdresleri(eser);
  return `
    <div class="eylemler">
      <button class="eylem birincil" data-harita-ac data-ad="${guvenli(eser.ad)}" data-google="${adres.google}" data-apple="${adres.apple}">Haritalar ile aç</button>
      <button class="eylem" data-haritada-gor="${eser.id}">Haritada gör</button>
    </div>`;
};

document.addEventListener("click", (olay) => {
  const ac = olay.target.closest("[data-harita-ac]");
  if (ac) { olay.preventDefault(); return haritaSecenekleriAc(ac.dataset.ad, ac.dataset.google, ac.dataset.apple); }
  // Sergiler: "Yol tarifi" bağlantısı da aynı seçeneği göstersin
  const sergi = olay.target.closest("a.kucuk-dugme");
  if (sergi && /google\.com\/maps\/search/.test(sergi.href)) {
    olay.preventDefault();
    const sorgu = new URL(sergi.href).searchParams.get("query") || "";
    const kart = sergi.closest(".sergi-kart");
    const ad = kart && kart.querySelector(".sergi-ad") ? kart.querySelector(".sergi-ad").textContent : sorgu;
    return haritaSecenekleriAc(ad, sergi.href, "https://maps.apple.com/?q=" + encodeURIComponent(sorgu));
  }
  if (olay.target.closest("[data-harita-kapat]") || olay.target.id === "harita-katman") haritaSecenekleriKapat();
}, true);
document.addEventListener("keydown", (olay) => { if (olay.key === "Escape") haritaSecenekleriKapat(); });

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "Haritalar ile aç": "Open in Maps", "Haritalar ile aç": "Open in Maps",
    "Apple Haritalar": "Apple Maps", "Google Haritalar": "Google Maps", "Vazgeç": "Cancel"
  });
});


/* ================= SADE GÖRÜNÜM: BUGÜNÜN ESERİ ================= */
// Keşfet'in en üstünde, güne göre değişen büyük bir eser kartı. Arama ya da filtre varken gizlenir.
const PROFIL_SIMGESI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.500-4 4.500-6 8-6s6.500 2 8 6"/></svg>';
let bugunSayac = 0;

function bugununEseri() {
  const sayi = ++bugunSayac;
  const eski = document.getElementById("bugun-eser");
  if (eski) eski.remove();
  const liste = document.getElementById("liste");
  const cipler = document.getElementById("cipler");
  if (!liste || !cipler) return;
  const adaylar = Array.from(liste.querySelectorAll(".satir[data-id]")).map((s) => s.dataset.id);
  if (adaylar.length === 0) return;
  const gun = Math.floor(Date.now() / 86400000);
  let sira = 0;
  const dene = () => {
    if (sayi !== bugunSayac || sira >= 8 || sira >= adaylar.length) return;
    const id = adaylar[(gun + sira) % adaylar.length];
    const eser = (typeof ESERLER !== "undefined") ? ESERLER.find((e) => e.id === id) : null;
    const resim = new Image();
    resim.onload = () => {
      if (sayi !== bugunSayac || !eser || document.getElementById("bugun-eser")) return;
      const d = document.createElement("button");
      d.type = "button"; d.id = "bugun-eser"; d.className = "bugun"; d.dataset.eser = id;
      d.style.backgroundImage = `url("foto/${id}/01.jpg")`;
      d.innerHTML = `<small>BUGÜNÜN ESERİ</small><b>${guvenli(eser.ad)}</b><span>${guvenli([eser.tur, eser.il, eser.ilce].filter(Boolean).join(" · "))}</span>`;
      cipler.before(d);
      bugunGorunurluk();
    };
    resim.onerror = () => { sira++; dene(); };
    resim.src = `foto/${id}/01.jpg`;
  };
  dene();
}

function bugunGorunurluk() {
  const d = document.getElementById("bugun-eser");
  if (!d) return;
  const arama = document.getElementById("ara");
  const secili = document.querySelector("#cipler .cip.secili");
  const filtreli = (arama && arama.value.trim() !== "") || (secili && secili !== document.querySelector("#cipler .cip"));
  d.hidden = Boolean(filtreli);
}

document.addEventListener("click", (olay) => {
  const d = olay.target.closest("#bugun-eser");
  if (d) {
    const satir = document.querySelector(`#liste .satir[data-id="${d.dataset.eser}"]`);
    if (satir) satir.click();
    return;
  }
  if (olay.target.closest("#cipler")) setTimeout(bugunGorunurluk, 0);
});
document.addEventListener("input", (olay) => { if (olay.target.id === "ara") setTimeout(bugunGorunurluk, 0); });

const sehirSecBugunsuz = sehirSec;
sehirSec = function (ad) { sehirSecBugunsuz(ad); bugununEseri(); };
const anaEkraniKurBugunsuz = anaEkraniKur;
anaEkraniKur = function () { anaEkraniKurBugunsuz(); bugununEseri(); };
if (document.getElementById("liste") && document.getElementById("liste").children.length) bugununEseri();

// Telefonun durum çubuğu da lacivert olsun
(function () {
  let m = document.querySelector('meta[name="theme-color"]');
  if (!m) { m = document.createElement("meta"); m.name = "theme-color"; document.head.appendChild(m); }
  m.content = "#16243F";
})();

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, { "BUGÜNÜN ESERİ": "MONUMENT OF THE DAY" });
});


/* ================= TASARIM 2: KEŞFET VİTRİNİ VE SAYFALAR ================= */
// Yalnızca görünüm: veriler, filtreler, pullar ve gezinme mevcut işlevleri kullanır.
const T2_VITRIN_FOTO = "foto/mevlana-turbesi-muze-konya/01.jpg";
const T2_SEHIR_FOTO = {
  Bursa: "foto/molla-fenari-camii/01.jpg",
  Konya: "foto/mevlana-turbesi-muze-konya/03.jpg",
  Hatay: "foto/habib-i-neccar-camii-ve-kulliyesi-hatay/03.jpg"
};
const T2_C = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
const T2_IKON = {
  cami: `<svg viewBox="0 0 24 24" ${T2_C}><path d="M2.5 20.5h19M5 20.5v-5a5 5 0 0110 0v5M10 10.5V8.5M8.5 20.5v-3a1.5 1.5 0 013 0v3M18 20.5V9M20 20.5V9M17.5 9h3M19 9V5.5"/></svg>`,
  mescit: `<svg viewBox="0 0 24 24" ${T2_C}><path d="M3 20.5h18M5 20.5v-7h14v7M7.5 13.5a4.5 4.5 0 019 0M12 9V7M10 20.5v-3.5a2 2 0 014 0v3.5"/></svg>`,
  kulliye: `<svg viewBox="0 0 24 24" ${T2_C}><path d="M2 20.5h20M3 20.5v-4a3 3 0 016 0v4M9 20.5v-6a3 3 0 016 0v6M15 20.5v-4a3 3 0 016 0v4M12 11.5V9"/></svg>`,
  medrese: `<svg viewBox="0 0 24 24" ${T2_C}><path d="M3 20.5V8l9-4.5L21 8v12.5M3 20.5h18M8.5 20.5v-6a3.5 3.5 0 017 0v6M3 8h18"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" ${T2_C}><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
  takvim: `<svg viewBox="0 0 24 24" ${T2_C}><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>`,
  vakif: `<svg viewBox="0 0 24 24" ${T2_C}><path d="M3 20.5h18M4 20.5V10M20 20.5V10M2.5 10L12 4l9.5 6M8 20.5v-7M12 20.5v-7M16 20.5v-7"/></svg>`,
  damga: `<svg viewBox="0 0 24 24" ${T2_C}><circle cx="12" cy="12" r="8.5"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>`,
  tara: `<svg viewBox="0 0 24 24" ${T2_C}><path d="M4 9V5h4M16 5h4v4M20 15v4h-4M8 19H4v-4M7 12h10"/></svg>`,
  ara: `<svg viewBox="0 0 24 24" ${T2_C} stroke-width="2"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>`,
  ok: `<svg viewBox="0 0 24 24" ${T2_C} stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  yildiz: `<svg viewBox="0 0 24 24" ${T2_C} stroke-width="1.3"><path d="M6 6h12v12H6z"/><path d="M12 3.5l8.5 8.5-8.5 8.5L3.5 12z"/><circle cx="12" cy="12" r="1.6"/></svg>`
};
const T2_KATEGORI = [["Cami", "cami"], ["Mescit", "mescit"], ["Külliye", "kulliye"], ["Medrese", "medrese"]];

function t2VitriniKur() {
  const ara = document.getElementById("ara");
  if (!ara || document.getElementById("t2-vitrin")) return;
  const ana = ara.closest("main");
  ana.insertAdjacentHTML("afterbegin", `
    <section id="t2-vitrin">
      <h1 class="t2-vitrin-baslik"><span>Geçmişin izlerini</span> <em>keşfet.</em></h1>
      <p class="t2-vitrin-alt">Vakıf eserleriyle kültür yolculuğuna çık.</p>
      <label class="t2-arama" id="t2-arama">${T2_IKON.ara}</label>
    </section>
    <section id="t2-govde">
      <div class="t2-kategoriler" id="t2-kategoriler" role="group" aria-label="Kategoriler"></div>
      <div class="t2-bolum" id="t2-one-cikan">
        <div class="t2-bolum-ust"><h3>Öne Çıkan Eser</h3><button type="button" class="t2-link" data-t2-tumu><span>Tümünü gör</span>${T2_IKON.ok}</button></div>
        <div id="t2-one-cikan-kart"></div>
      </div>
      <div class="t2-bolum" id="t2-sehirler">
        <div class="t2-bolum-ust"><h3>Şehirleri Keşfet</h3></div>
        <div class="t2-sehir-serit" id="t2-sehir-serit"></div>
      </div>
      <div class="t2-bolum-ust" id="t2-liste-baslik"><h3>Tüm Eserler</h3></div>
    </section>`);
  document.getElementById("t2-arama").appendChild(ara);
  const vitrin = document.getElementById("t2-vitrin");
  const resim = new Image();
  resim.onload = () => vitrin.style.setProperty("--vitrin-foto", `url("${T2_VITRIN_FOTO}")`);
  resim.src = T2_VITRIN_FOTO;
  const eski = document.getElementById("bugun-eser");
  if (eski && eski.classList.contains("bugun")) eski.remove();
}

function t2KategorileriCiz() {
  const alan = document.getElementById("t2-kategoriler");
  if (!alan) return;
  alan.innerHTML = T2_KATEGORI.filter(([tur]) => ESERLER.some((e) => e.tur === tur)).map(([tur, k]) => `
    <button type="button" class="t2-kat${secilenTur === tur ? " secili" : ""}" data-t2-tur="${tur}" aria-pressed="${secilenTur === tur}">
      <span class="t2-kat-ikon">${T2_IKON[k]}</span><span>${tur}</span>
    </button>`).join("");
}

function t2SehirleriCiz() {
  const serit = document.getElementById("t2-sehir-serit");
  if (!serit) return;
  const sehirler = SEHIRLER.map((s) => s.ad).filter((ad) => ESERLER.some((e) => eserSehri(e) === ad));
  serit.innerHTML = sehirler.map((ad) => {
    const sayi = ESERLER.filter((e) => eserSehri(e) === ad).length;
    const foto = T2_SEHIR_FOTO[ad] ? ` style='--foto:url("${T2_SEHIR_FOTO[ad]}")'` : "";
    return `<button type="button" class="t2-sehir${secilenSehir === ad ? " secili" : ""}" data-t2-sehir="${ad}"${foto}>
      <b>${ad}</b><small>${sayi} eser</small><span class="t2-ok">${T2_IKON.ok}</span></button>`;
  }).join("");
}

function t2KisaBilgi(eser) {
  const adaylar = eser.olgular.filter((o) => o.metin.length <= 110);
  const secilen = adaylar.find((o) => o.kategori === "tarihce") || adaylar.find((o) => o.kategori !== "gunumuz") || null;
  return secilen ? secilen.metin : [eser.tur, eser.ilce].filter(Boolean).join(" · ");
}

// 1. aşamadaki "Bugünün eseri" artık "Öne Çıkan Eser" bölümüne çizilir
bugununEseri = function () {
  const sayi = ++bugunSayac;
  const yer = document.getElementById("t2-one-cikan-kart");
  if (!yer) return;
  const adaylar = Array.from(document.querySelectorAll("#liste .satir[data-id]")).map((s) => s.dataset.id);
  if (adaylar.length === 0) { yer.innerHTML = ""; return; }
  const gun = Math.floor(Date.now() / 86400000);
  let sira = 0;
  const dene = () => {
    if (sayi !== bugunSayac || sira >= 10 || sira >= adaylar.length) return;
    const id = adaylar[(gun * 7 + sira) % adaylar.length];
    const eser = ESERLER.find((e) => e.id === id);
    const resim = new Image();
    resim.onload = () => {
      if (sayi !== bugunSayac || !eser) return;
      yer.innerHTML = `
        <button type="button" class="t2-one-kart" id="bugun-eser" data-eser="${id}" style='--foto:url("foto/${id}/01.jpg")'>
          <span class="t2-hap">${guvenli(eserSehri(eser))}</span>
          <b>${guvenli(eser.ad)}</b>
          <span class="t2-one-acik">${guvenli(t2KisaBilgi(eser))}</span>
          <span class="t2-ok-daire">${T2_IKON.ok}</span>
        </button>`;
    };
    resim.onerror = () => { sira++; dene(); };
    resim.src = `foto/${id}/01.jpg`;
  };
  dene();
};

function t2Gorunurluk() {
  const ara = document.getElementById("ara");
  const filtreli = (ara && ara.value.trim() !== "") || (typeof secilenTur !== "undefined" && secilenTur !== "Tümü");
  ["t2-one-cikan", "t2-sehirler"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.hidden = Boolean(filtreli);
  });
}

function t2KesfetiYenile() {
  t2VitriniKur();
  t2KategorileriCiz();
  t2SehirleriCiz();
  t2Gorunurluk();
}

document.addEventListener("click", (olay) => {
  const kat = olay.target.closest("[data-t2-tur]");
  if (kat) {
    secilenTur = secilenTur === kat.dataset.t2Tur ? "Tümü" : kat.dataset.t2Tur;
    listeyiCiz(); t2KategorileriCiz(); t2Gorunurluk();
    return;
  }
  const sehir = olay.target.closest("[data-t2-sehir]");
  if (sehir) {
    sehirSec(secilenSehir === sehir.dataset.t2Sehir ? TUM_SEHIRLER : sehir.dataset.t2Sehir);
    return;
  }
  if (olay.target.closest("[data-t2-tumu]")) {
    const hedef = document.getElementById("t2-liste-baslik");
    if (hedef) hedef.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (olay.target.closest("#cipler")) setTimeout(() => { t2KategorileriCiz(); t2Gorunurluk(); }, 0);
});
document.addEventListener("input", (olay) => { if (olay.target.id === "ara") setTimeout(t2Gorunurluk, 0); });

const t2SehirSecOncesi = sehirSec;
sehirSec = function (ad) { t2SehirSecOncesi(ad); t2SehirleriCiz(); t2Gorunurluk(); };
const t2AnaEkranOncesi = anaEkraniKur;
anaEkraniKur = function () { t2AnaEkranOncesi(); t2KesfetiYenile(); bugununEseri(); };
if (document.getElementById("liste") && document.getElementById("liste").children.length) { t2KesfetiYenile(); bugununEseri(); }

/* ---------- Eser detay: şehir, meta satırı, sekmeler, vakıf bilgisi, pasaport ---------- */
function t2KartiDuzenle(eserId) {
  const kart = document.getElementById("eser-karti");
  const eser = ESERLER.find((e) => e.id === eserId);
  if (!kart || !eser) return;
  kart.classList.add("t2-kart");
  const baslik = kart.querySelector(".eser-baslik");
  if (!baslik || kart.querySelector(".t2-meta")) return;

  baslik.insertAdjacentHTML("beforebegin", `<span class="t2-hap t2-hap-acik">${guvenli(eserSehri(eser))}</span>`);
  const meta = [[T2_IKON.cami, eser.tur], [T2_IKON.pin, eser.ilce], eser.donem ? [T2_IKON.takvim, eser.donem] : null].filter((m) => m && m[1]);
  baslik.insertAdjacentHTML("afterend", `<div class="t2-meta">${meta.map(([i, t]) => `<span>${i}<span>${guvenli(t)}</span></span>`).join("")}</div>`);

  // Bilgiler kartı: kategori sekmeleri (Hakkında = hepsi)
  const bilgiKart = Array.from(kart.querySelectorAll(".kart")).find((k) => k.querySelector(".kategori"));
  if (bilgiKart) {
    const adlar = [];
    let mevcut = -1;
    Array.from(bilgiKart.children).forEach((c) => {
      if (c.classList.contains("kategori")) { mevcut++; adlar.push(c.textContent.trim()); }
      if (mevcut >= 0 && (c.classList.contains("kategori") || c.classList.contains("olgu"))) c.dataset.t2Bolum = mevcut;
    });
    if (adlar.length > 1) {
      bilgiKart.querySelector(".kart-baslik").insertAdjacentHTML("afterend", `
        <div class="t2-sekmeler" role="tablist">
          <button type="button" role="tab" class="secili" aria-selected="true" data-t2-sekme="-1">Hakkında</button>
          ${adlar.map((a, i) => `<button type="button" role="tab" aria-selected="false" data-t2-sekme="${i}">${guvenli(a)}</button>`).join("")}
        </div>`);
    }
    // Vakıf bilgisi: kitaptaki ilk vakıf cümlesi, sade bir kartta
    const vakif = eser.olgular.find((o) => o.kategori === "vakif");
    if (vakif) {
      bilgiKart.insertAdjacentHTML("beforebegin", `
        <div class="kart t2-vakif">
          <span class="t2-vakif-ikon">${T2_IKON.vakif}</span>
          <span><b>Vakıf Bilgisi</b><p>${guvenli(vakif.metin)}</p></span>
        </div>`);
    }
  }

  // Pasaport: rotadaki eserde gerçek akış (pul, eserdeki QR okutularak alınır)
  const rota = rotaBul(eser.id);
  const eylemler = kart.querySelector(".eylemler");
  if (rota && eylemler) {
    eylemler.insertAdjacentHTML("afterend", pullar.includes(eser.id)
      ? `<div class="t2-pul-alindi">${T2_IKON.damga}<span><b>Pasaportunda</b><small><span>${rota}</span> · <span>Pul alındı</span></small></span></div>`
      : `<div><button type="button" class="t2-pul-dugme" data-t2-tara>${T2_IKON.tara}<span>Pasaportuma ekle</span></button>
           <small class="t2-pul-not">Eserdeki QR kodu okutunca pul pasaportuna eklenir.</small></div>`);
  }
}

const t2EserKartiOncesi = eserKartiniAc;
eserKartiniAc = function (eserId) {
  t2EserKartiOncesi(eserId);
  try { t2KartiDuzenle(eserId); } catch (hata) { console.warn("Kart düzeni", hata); }
};

document.addEventListener("click", (olay) => {
  const sekme = olay.target.closest("[data-t2-sekme]");
  if (sekme) {
    const no = sekme.dataset.t2Sekme;
    const kart = sekme.closest(".kart");
    kart.querySelectorAll("[data-t2-sekme]").forEach((b) => {
      b.classList.toggle("secili", b === sekme);
      b.setAttribute("aria-selected", String(b === sekme));
    });
    kart.querySelectorAll("[data-t2-bolum]").forEach((el) => { el.hidden = no !== "-1" && el.dataset.t2Bolum !== no; });
    return;
  }
  if (olay.target.closest("[data-t2-tara]")) {
    const dugme = document.querySelector('.menu [data-sekme="tara"]');
    if (dugme) dugme.click();
  }
});

/* ---------- Harita işaretleri: lacivert ve altın ---------- */
TUR_RENGI.cami = "#0B2540";
TUR_RENGI.mescit = "#B08A3E";
TUR_RENGI.kulliye = "#071B30";
const t2IsaretOncesi = isaretYap;
isaretYap = function (eser) {
  if (!TUR_RENGI[eser.turId]) TUR_RENGI[eser.turId] = "#3D5574";
  return t2IsaretOncesi(eser);
};
document.querySelectorAll(".lejant i:not(.bos)").forEach((i, n) => {
  i.style.background = ["#0B2540", "#B08A3E", "#071B30"][n] || i.style.background;
});

/* ---------- Tara ve Pasaport başlıkları ---------- */
const t2TaraOncesi = tarayiCiz;
tarayiCiz = function () {
  t2TaraOncesi.apply(this, arguments);
  const alan = document.getElementById("sekme-tara");
  if (alan && !alan.querySelector(".t2-sayfa-ust")) {
    alan.insertAdjacentHTML("afterbegin", `<div class="t2-sayfa-ust"><h2>Tara</h2><p>Eserdeki QR kodu çerçevenin içine al.</p></div>`);
  }
};

const t2PasaportOncesi = pasaportuCiz;
pasaportuCiz = function () {
  t2PasaportOncesi.apply(this, arguments);
  const alan = document.getElementById("sekme-pasaport");
  if (!alan || alan.querySelector(".t2-pasaport-kart")) return;
  const toplam = Object.values(ROTALAR).reduce((t, r) => t + r.length, 0);
  const alinan = pullar.filter((id) => rotaBul(id)).length;
  alan.insertAdjacentHTML("afterbegin", `
    <div class="t2-sayfa-ust"><h2>Pasaportum</h2><p>Ziyaret ettiğin eserlerin pullarını biriktir, rotaları tamamla.</p></div>
    <div class="t2-pasaport-kart">
      <div class="t2-pasaport-logo">${T2_IKON.yildiz}<span><b>VAKFİYE</b><small>KÜLTÜR PASAPORTU</small></span></div>
      <div class="t2-pasaport-sayilar">
        <span><b>${alinan}</b><small>Toplanan pul</small></span><i></i>
        <span><b>${toplam}</b><small>Rota durağı</small></span>
      </div>
    </div>`);
};

/* ---------- Şehir paneli: fotoğraflı kartlar ---------- */
const t2SehirPaneliOncesi = sehirPaneliniAc;
sehirPaneliniAc = function () {
  t2SehirPaneliOncesi.apply(this, arguments);
  document.querySelectorAll("#sehir-perdesi .sehir-satir[data-sehir]").forEach((s) => {
    const foto = T2_SEHIR_FOTO[s.dataset.sehir];
    if (foto) { s.classList.add("t2-foto"); s.style.setProperty("--foto", `url("${foto}")`); }
  });
};

(function () {
  const m = document.querySelector('meta[name="theme-color"]');
  if (m) m.content = "#0B2540";
})();

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "Geçmişin izlerini": "Discover the traces", "keşfet.": "of the past.",
    "Vakıf eserleriyle kültür yolculuğuna çık.": "Set out on a cultural journey through endowed monuments.",
    "Öne Çıkan Eser": "Featured Monument", "Tümünü gör": "See all", "Şehirleri Keşfet": "Explore Cities",
    "Tüm Eserler": "All Monuments", "Medrese": "Madrasa", "Hakkında": "About", "Vakıf Bilgisi": "Endowment",
    "Pasaportuma ekle": "Add to my passport", "Eserdeki QR kodu okutunca pul pasaportuna eklenir.": "Scan the QR code at the monument to add the stamp to your passport.",
    "Pasaportunda": "In your passport", "Pul alındı": "Stamp collected", "Tara": "Scan",
    "Eserdeki QR kodu çerçevenin içine al.": "Fit the QR code at the monument inside the frame.",
    "Pasaportum": "My passport", "Ziyaret ettiğin eserlerin pullarını biriktir, rotaları tamamla.": "Collect stamps from the monuments you visit and complete the routes.",
    "KÜLTÜR PASAPORTU": "CULTURE PASSPORT", "Toplanan pul": "Stamps collected", "Rota durağı": "Route stops"
  });
});


/* ================= HARİTA: ZİYARET EDİLEN ESERLER ALTIN ================= */
const ZIYARET_RENGI = "#C9A45C";
// Altın artık "ziyaret edildi" anlamına geliyor: mescit işaretleri karışmasın diye mavi-gri
if (typeof TUR_RENGI !== "undefined") TUR_RENGI.mescit = "#4A6286";
document.querySelectorAll(".lejant span").forEach((s) => {
  const i = s.querySelector("i");
  if (i && /Mescit/.test(s.textContent)) i.style.background = "#4A6286";
});

function ziyaretEdildiMi(eser) {
  return typeof pullar !== "undefined" && Array.isArray(pullar) && pullar.includes(eser.id);
}

const ziyaretsizIsaret = isaretYap;
isaretYap = function (eser) {
  if (!ziyaretEdildiMi(eser)) return ziyaretsizIsaret(eser);
  return L.divIcon({
    className: "",
    iconSize: [34, 42],
    iconAnchor: [17, 40],
    html: `<div class="pin ziyaret" style="--renk:${ZIYARET_RENGI}" title="Ziyaret ettin"><span>✓</span></div>`
  });
};

function haritadakiZiyaretleriGuncelle() {
  if (typeof haritaKatmani === "undefined" || !haritaKatmani || !window.L) return;
  const eserler = new Map(ESERLER.map((e) => [e.ad + "|" + e.enlem + "|" + e.boylam, e]));
  haritaKatmani.eachLayer((isaret) => {
    if (!isaret.getLatLng || !isaret.options) return;
    const yer = isaret.getLatLng();
    const eser = eserler.get(isaret.options.title + "|" + yer.lat + "|" + yer.lng);
    if (!eser) return;
    isaret.options.ziyaret = ziyaretEdildiMi(eser);
    isaret.setIcon(isaretYap(eser));
    isaret.setZIndexOffset(isaret.options.ziyaret ? 1000 : 0);
  });
  // İçinde ziyaret edilmiş eser olan sayılı daireler altın halkalı
  haritaKatmani.options.iconCreateFunction = (grup) => {
    const ziyaretli = grup.getAllChildMarkers().some((m) => m.options.ziyaret);
    return L.divIcon({ className: "", iconSize: [38, 38], html: `<div class="kume${ziyaretli ? " ziyaretli" : ""}">${grup.getChildCount()}</div>` });
  };
  if (haritaKatmani.refreshClusters) haritaKatmani.refreshClusters();
}

const ziyaretsizHaritaGoster = haritayiGoster;
haritayiGoster = function () {
  ziyaretsizHaritaGoster.apply(this, arguments);
  setTimeout(haritadakiZiyaretleriGuncelle, 80);
};

// Lejanta "Ziyaret ettiğin" ekle
(function () {
  const lejant = document.querySelector(".lejant");
  if (lejant && !lejant.querySelector(".lejant-ziyaret")) {
    lejant.insertAdjacentHTML("afterbegin", `<span class="lejant-ziyaret"><i style="background:${ZIYARET_RENGI}"></i>Ziyaret ettiğin</span>`);
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, { "Ziyaret ettiğin": "Visited", "Ziyaret ettin": "You visited" });
});


/* ================= ESER KARTI: CEVİRİ ETİKETİ VE FOTOĞRAF ATFI ================= */
// Kitapta İngilizcesi olmayan bilgiler yapay zekâ çevirisidir: İngilizce görünümde "translation" etiketi taşır
// (doğrulanmamış içerik kesin bilgi gibi sunulmasın). Galerinin altında fotoğrafın kaynağı yazar.
const FOTO_ATIFLARI = ["Vakıf Katılım", "Vakıf Katılım, Bursa Vakıf Eserleri", "Vakıf Katılım, Hatay İli Vakıf Eserleri", "Vakıf Katılım, Konya Vakıf Eserleri Envanteri"];
const ESER_FOTO_ATFI = {"molla-fenari-camii":1,"molla-gurani-mescidi":1,"nakkas-ali-mescidi":1,"nalbantoglu-camii":1,"pasa-camii":1,"ruscuk-camii":1,"sati-fakih-camii":1,"selcuk-hatun-camii":1,"selimiye-camii":1,"simkes-sirmakes-camii":1,"sivasiler-tahtali-camii":1,"sehabettin-pasa-camii":1,"sehadet-kale-saray-camii":1,"sehrekustu-pars-bey-camii":1,"seker-hoca-camii":1,"serafettin-pasa-okcular-camii-ve-haziresi":1,"seyh-hamit-somuncu-baba-ayazma-camii-ve-haziresi":1,"seyh-konevi-camii":1,"seyh-pasa-dibekli-camii":1,"tahtali-hatipzade-mescidi":1,"tavukcu-mescidi":1,"tuzpazari-camii":1,"uc-kuzular-kozlar-camii-ve-kabri":1,"hz-uftade-camii":1,"hz-uftade-tekke-camii":1,"veled-i-enbiya-enbiyaoglu-camii":1,"veled-i-habib-camii":1,"veled-i-sarayi-mescidi":1,"veled-i-yanic-camii":1,"veled-i-veziri-camii":1,"veli-semseddin-camii":1,"veziri-camii":1,"yeni-bezzaz-camii":1,"yeni-kaplica-mescidi":1,"yer-kapi-camii":1,"yigit-kohne-camii":1,"zagferanlik-mescidi":1,"adliye-koyu-camii":1,"balikpazari-camii":1,"kucukkumla-eski-camii":1,"gursu-orta-camii":1,"orhan-gazi-kulliyesi":1,"hudavendigar-kulliyesi":1,"hamzabey-kulliyesi":1,"timurtas-pasa-kulliyesi":1,"yildirim-kulliyesi":1,"emir-sultan-kulliyesi":1,"umurbey-kulliyesi":1,"bursa-ulu-cami":0,"yesil-cami":0,"koza-han":0,"mevlana-turbesi-muze-konya":3,"bulgur-dede-mescidi-konya":3,"sukran-mescidi-konya":3,"gazezler-camii-konya":3,"karakurt-camii-konya":3,"komurculer-camii-konya":3,"furgan-dede-mescidi-konya":3,"anber-reis-feridiye-camii-konya":3,"seyh-ebul-vefa-camii-konya":3,"ayanbey-camii-konya":3,"askan-camii-konya":3,"ekmekkocu-mescidi-konya":3,"buyukkovanagzi-haci-haydar-efendi-camii-konya":3,"yukari-camii-ve-haziresi-saglik-beldesi-konya":3,"karaagac-koyu-camii-konya":3,"dayhane-camii-ve-mustemilati-konya":3,"sadreddin-konevi-camii-konya":3,"karatay-emir-kemalettin-mescidi-konya":3,"hoca-fakih-ahmet-fakih-camii-ve-turbesi-konya":3,"saatci-camii-konya":3,"abdulaziz-camii-konya":3,"tahir-pasa-tursunoglu-dursun-fakih-camii-konya":3,"tahir-ile-zuhre-don-baba-pir-ahi-sultan-mescit-ve-turbesi-konya":3,"hoca-hasan-camii-konya":3,"abdulmumin-yediler-megaribe-mescidi-ve-mezari-konya":3,"gokyurt-koyu-camii-konya":3,"tellioglu-sungurbey-camii-konya":3,"sahip-ata-larende-camii-konya":3,"meram-kapu-kapi-ihyaiyye-camii-konya":3,"haci-hasan-camii-konya":3,"seyh-osman-rumi-camii-konya":3,"ihtiyarettin-mescidi-konya":3,"iplikci-altinapa-camii-konya":3,"tarhana-mescidi-konya":3,"veznedar-huseyin-efendi-asri-camii-konya":3,"kadi-mursel-camii-konya":3,"salih-pasa-dedemoglu-camii-konya":3,"aksinne-kumbetli-gunbentli-mescidi-konya":3,"nasuh-bey-camii-canbazzade-nasuh-bey-darul-huffazi-konya":3,"yolcuoglu-gazioglu-camii-konya":3,"gurb-i-cedidi-kosova-mescidi-konya":3,"kalecik-mescidi-konya":3,"emir-halil-camii-konya":3,"tahtatepen-ubeyt-haci-adil-camii-konya":3,"asagi-mahalle-kiziloren-kandemir-mescidi-konya":3,"fahrunnisa-caybasi-mescit-ve-turbesi-konya":3,"hasbey-darul-huffaz-mescidi-konya":3,"erdemsah-kale-i-cerp-mescidi-konya":3,"kurkcu-mescidi-konya":3,"sultan-selim-selimiye-camii-konya":3,"nuriye-camii-konya":3,"dolap-battal-mescidi-konya":3,"haci-veyis-camii-ve-cesmesi-konya":3,"selahaddin-kececiler-camii-konya":3,"karacihan-camii-konya":3,"garip-nasrullah-camii-konya":3,"haci-omerler-camii-konya":3,"obruk-koyu-camii-konya":3,"civiloglu-camii-konya":3,"burhan-dede-camii-konya":3,"igdeli-sultan-camii-konya":3,"karakayis-sari-camii-konya":3,"tahtali-mescidi-konya":3,"durak-fakih-camii-konya":3,"cukur-camii-konya":3,"toraman-mescidi-konya":3,"sarnic-camii-konya":3,"araplar-ak-camii-konya":3,"bagevliya-cami-ve-cesmesi-konya":3,"muftu-abdullah-mescidi-konya":3,"ovaloglu-celik-mehmet-pasa-camii-konya":3,"kinaci-camii-mescit-konya":3,"meydan-i-ahmet-camii-konya":3,"kadi-izzettin-karpuzoglu-camii-konya":3,"sitte-i-banu-mescidi-konya":3,"hatuniye-guduk-minare-akincilar-mahmut-mescidi-konya":3,"sems-i-tebrizi-camii-ve-turbesi-konya":3,"sircali-demirci-haci-mescidi-konya":3,"cimilli-sari-mescidi-konya":3,"zenburi-mescidi-konya":3,"ickaraarslan-mescidi-konya":3,"sari-yakup-camii-konya":3,"haci-mustafa-aga-koprubasi-mustafa-aga-camii-konya":3,"asmali-hatip-sultan-mescidi-konya":3,"pisili-pir-esat-mescit-ve-turbesi-konya":3,"mengene-camii-konya":3,"alemdar-camii-konya":3,"saksaganlar-camii-konya":3,"dolap-mektep-mescidi-konya":3,"polatlar-haci-cemal-hatip-camii-konya":3,"seyh-ulema-recep-aga-camii-konya":3,"yanik-sedirler-kenan-dede-camii-konya":3,"digin-camii-konya":3,"hamzaoglu-camii-konya":3,"hanedan-camii-konya":3,"cayir-camii-konya":3,"haci-ivaz-camii-konya":3,"sutcu-camii-konya":3,"cataloglu-camii-konya":3,"topraklik-hasan-efendi-camii-konya":3,"cavusoglu-camii-konya":3,"namik-pasa-camii-konya":3,"halkabegus-mescidi-ve-turbesi-konya":3,"tolluoglu-camii-konya":3,"seyh-ulema-yusuf-aga-camii-konya":3,"aziziye-camii-konya":3,"besare-bey-mescidi-konya":3,"ak-sazi-bey-camii-konya":3,"sakahane-hidir-ilyas-davut-aga-mescidi-konya":3,"zevle-sultan-mescidi-konya":3,"basarakavak-zahide-hatun-camii-konya":3,"tatkoy-merkez-camii-konya":3,"beyhekim-mescit-ve-turbesi-konya":3,"sultan-alaeddin-ulu-camii-konya":3,"ihsaniye-ulu-camii-minaresi-konya":3,"kurucay-eski-camii-konya":3,"avdan-beldesi-buyuk-eski-camii-konya":3,"buyuk-camii-konya":3,"altinkalem-cevlek-mescidi-konya":3,"cinaralti-camii-konya":3,"dogrugoz-beldesi-merkez-camii-konya":3,"ferruhsah-seyit-mahmut-hayrani-mescidi-konya":3,"guduk-minare-camii-konya":3,"haci-hamza-hafiz-hatip-ali-mescidi-konya":3,"hidirlik-hizirlik-hidir-dede-mescidi-konya":3,"imaret-hasan-pasa-camii-konya":3,"iplikci-ambardar-kerim-aga-camii-konya":3,"kalayci-mescidi-konya":3,"kizilca-mescit-konya":3,"kileci-mescidi-konya":3,"kucuk-ayasofya-mescidi-konya":3,"ortakoy-beldesi-merkez-camii-konya":3,"tahtakale-mescidi-konya":3,"ulu-sultan-alaattin-camii-konya":3,"ali-pasa-camii-konya":3,"bayindir-koyu-camii-konya":3,"cuma-orta-camii-konya":3,"demirli-mescit-konya":3,"emen-eski-camii-konya":3,"gedik-ahmet-pasa-camii-konya":3,"hamidiye-camii-konya":3,"hizir-ali-pasa-bayafsar-camii-konya":3,"lutfullah-carsi-camii-minaresi-konya":3,"hisarlik-beldesi-asarlik-camii-konya":3,"siristat-buyuk-camii-konya":3,"sogut-buyuk-cami-konya":3,"ucpinar-beldesi-kursunlu-camii-konya":3,"ulu-carsi-merkez-camii-konya":3,"karamanoglu-ibrahim-bey-camii-konya":3,"ciftlikozu-beldesi-camii-konya":3,"baskoy-ulu-camii-konya":3,"karaaga-beldesi-eski-ulu-camii-konya":3,"orta-camii-konya":3,"pazar-carsi-camii-konya":3,"ayaslar-ulu-yukari-camii-konya":3,"ulu-camii-konya":3,"yegin-camii-konya":3,"agalar-boyaci-ali-mescidi-konya":3,"buyukdede-taskilise-camii-konya":3,"kutoren-eski-camii-konya":3,"ulu-kible-camii-konya":3,"zengen-beldesi-eski-camii-konya":3,"cavus-eski-merkez-cami-konya":3,"cukurkent-koyu-camii-konya":3,"beykonak-dedigi-sultan-mescit-ve-tekkesi-konya":3,"behlul-bey-camii-konya":3,"fazil-camii-konya":3,"ibrahim-pasa-camii-argithani-konya":3,"pir-huseyin-ulu-cukur-camii-konya":3,"sihcarullah-zincirli-camii-konya":3,"yukari-cigil-beldesi-merkez-camii-kebir-camii-konya":3,"cavundur-camii-konya":3,"haci-mehmetli-camii-konya":3,"ibrahim-bey-carsi-camii-konya":3,"kabacali-camii-konya":3,"karamanli-haci-mustafa-camii-konya":3,"pinarbasi-camii-konya":3,"cetmi-camii-konya":3,"resadiye-camii-konya":3,"yagmapinar-mescidi-konya":3,"kucuk-alioglu-camii-konya":3,"pir-huseyin-bey-yukari-camii-konya":3,"muallimhane-sofuhane-camii-ve-turbesi-konya":3,"seyyid-harun-veli-camii-konya":3,"uzun-seyh-sih-camii-konya":3,"piribeyli-beldesi-merkez-camii-konya":3,"esrefoglu-suleyman-bey-kulliyesi-konya":3,"sultan-ii-selim-kulliyesi-konya":3,"lala-mustafa-pasa-kulliyesi-konya":3,"sircali-medrese-konya":3,"kemaliye-kucuk-karatay-medresesi-konya":3,"karatay-medresesi-konya":3,"ali-efendi-darulhuffazi-muallimhane-konya":3,"ali-gav-zaviyesi-mahmudiye-medresesi-konya":3,"ince-minareli-medrese-sahip-ata-darulhadis-konya":3,"tas-halkali-sahip-ata-medrese-konya":3,"ismail-aga-medresesi-tas-medrese-konya":3,"cemal-ali-dede-turut-turbesi-konya":3,"atesbaz-veli-kumbeti-ve-zaviyesi-konya":3,"tavus-baba-turbesi-konya":3,"turgutoglu-turbesi-konya":3,"sahip-ata-hanikahi-ve-turbesi-konya":3,"seyh-hasan-i-rumi-turbesi-konya":3,"seyh-osman-rumi-turbesi-konya":3,"emir-nurettin-sephevan-kumbeti-konya":3,"sadr-sedir-sultan-turbesi-konya":3,"seyh-aliman-alaman-isgalaman-yahsi-turbesi-konya":3,"arap-dede-turbesi-konya":3,"seyfettin-kara-sungur-kumbeti-konya":3,"ishak-pasa-turbesi-konya":3,"ic-karaaslan-necmettin-karaarslan-kumbeti-konya":3,"burhaneddin-fakih-dede-turbesi-konya":3,"emir-ebu-ishak-kazeruni-tekkesi-turbesi-konya":3,"sut-tekkesi-ferhuniye-mescidi-ve-keykavus-kizi-turbesi-konya":3,"kalenderhane-kalender-baba-turbesi-konya":3,"ulas-baba-kumbeti-konya":3,"kesikbas-kumbeti-konya":3,"ii-kilicarslan-kumbeti-kumbet-hane-konya":3,"i-izzettin-keykavus-yarim-anonim-kumbeti-konya":3,"tacul-vezir-kumbeti-konya":3,"emirgazi-emrullah-gazi-turbesi-konya":3,"mustafa-turabi-kazan-dede-turbesi-konya":3,"seyit-mahmut-hayrani-turbesi-konya":3,"seyh-eyup-yagli-dede-turbesi-konya":3,"tacettin-dede-turbesi-konya":3,"yarim-anonim-turbe-konya":3,"yazlica-koyu-kuzucu-sultan-kumbeti-konya":3,"halife-sultan-turbesi-konya":3,"seyit-harun-veli-turbesi-konya":3,"sultan-hatun-turbesi-konya":3,"sahip-ata-sultan-hamami-konya":3,"hatipoglu-hasbeyoglu-hamami-konya":3,"mahkeme-yeni-hamami-konya":3,"sifa-hamami-konya":3,"rustem-pasa-sifa-hamami-konya":3,"seyyit-harun-veli-hamami-konya":3,"hoca-fakih-cesmesi-konya":3,"safaci-cesmesi-konya":3,"haci-veyis-cesmesi-konya":3,"bagevliya-camii-cesmesi-konya":3,"karakayis-sari-cami-cesmesi-konya":3,"kucuk-ayasofya-mescidi-cesmesi-konya":3,"hocacihan-sarnici-konya":3,"deli-osman-hani-konya":3,"akyokus-hoca-cihan-hani-konya":3,"kiziloren-kurucesme-hani-konya":3,"emir-kandemir-hani-konya":3,"inlice-han-konya":3,"sukran-mescidi-zemin-kat-dukkan-ve-magaza-konya":3,"vakif-is-hani-vakiflar-bolge-mudurlugu-hizmet-binasi-konya":3,"elikesik-han-konya":3,"dokuzun-derbent-sadiye-igdisleri-hani-konya":3,"zazadin-sadeddin-kopek-hani-konya":3,"horozlu-ruzbe-han-konya":3,"dedeler-hani-konya":3,"zalmanda-hani-konya":3,"zivarik-han-konya":3,"cagalzade-bedesteni-konya":3,"rustem-pasa-kervansarayi-konya":3,"raziye-hatun-sultan-kervansarayi-konya":3,"kazan-hoyugu-koyu-tas-han-konya":3,"yusuf-aga-abit-celebi-kutuphanesi-konya":3,"konut-konya":3,"habib-i-neccar-camii-ve-kulliyesi-hatay":2,"ulu-camii-ve-kulliyesi-hatay":2,"sokullu-mehmet-pasa-kulliyesi-hatay":2,"meydan-camii-ve-kulliyesi-hatay":2,"kanuni-sultan-suleyman-kervansarayi-hatay":2,"seyh-ali-cami-ve-kulliyesi-hatay":2,"mustafa-sevki-pasa-camii-ve-kulliyesi-hatay":2,"ali-cavus-mescidi-hatay":2,"affan-ertugrul-camii-hatay":2,"agca-mescit-hatay":2,"ahmediye-camii-hatay":2,"debruz-mescidi-hatay":2,"deveci-bekiroglu-camii-hatay":2,"emirler-camii-hatay":2,"hedbeli-mescidi-hatay":2,"halil-aga-camii-hatay":2,"hunkar-mescidi-hatay":2,"kiremitli-camii-hatay":2,"karhane-mescidi-hatay":2,"kantara-camii-hatay":2,"kurt-fakih-tufaki-camii-hatay":2,"mahremiye-camii-hatay":2,"nihat-aga-mescidi-hatay":2,"nakip-camii-hatay":2,"osmaniye-camii-hatay":2,"orhanli-camii-hatay":2,"rifataga-civelek-mescidi-hatay":2,"sarimiye-camii-hatay":2,"sofular-camii-hatay":2,"seyh-muhammet-camii-hatay":2,"senkoy-seyh-ahmet-kuseyri-camii-hatay":2,"sekercik-camii-hatay":2,"uctum-mescidi-hatay":2,"zuveroglu-camii-hatay":2,"caferiye-mescid-hatay":2,"degirmenyolu-mescid-okul-hatay":2,"fatikli-camii-hatay":2,"mustafali-camii-hatay":2,"narduzu-camii-hatay":2,"yenisehir-camii-hatay":2,"ebul-futtuh-camii-hatay":2,"kasimbey-camii-hatay":2,"selvili-camii-hatay":2,"semerciler-camii-hatay":2,"terzi-mehmet-camii-hatay":2,"kaptanpasa-camii-minaresi-hatay":2,"seyh-abdurrahman-turbesi-hatay":2,"seyh-hidir-turbesi-hatay":2,"seyh-hizir-turbesi-hatay":2,"seyh-hizir-makami-hatay":2,"el-arabi-turbesi-hatay":2,"seyh-ibrahim-ve-seyh-ali-turbesi-hatay":2,"seyh-hidir-turbesi-hatay-2":2,"seyh-hasan-turbesi-hatay":2,"beyazid-i-bestami-turbesi-hatay":2,"seyh-turhan-reyhani-turbesi-hatay":2,"seyh-kasem-turbesi-hatay":2,"seyh-isa-turbesi-hatay":2,"seyh-hizir-turbesi-hatay-2":2,"koyunoglu-seyh-ali-issuvayre-turbesi-hatay":2,"seyh-hasan-mekzun-el-sincari-makami-hatay":2,"seyh-hasan-gatelli-turbesi-hatay":2,"mizrakli-seyh-hasan-el-hekim-turbesi-hatay":2,"suryani-katolik-kilisesi-hatay":2,"maryo-hanna-kilisesi-hatay":2,"rum-katolik-kilisesi-hatay":2,"rum-ortodoks-kilisesi-hatay":2,"yogunoluk-koyu-ermeni-kilisesi-hatay":2,"butik-otel-hatay":2,"reyhanli-yenisehir-degirmeni-hatay":2,"kurtulus-beyhan-hamami-hatay":2,"kursunlu-han-hatay":2,"kircaoglu-hoyugu-hatay":2,"samandag-vakifli-koyu-konut-hatay":2,"vakif-kultur-konaklari-hatay":2,"4-mintika-78-parsel-eski-ev-hatay":2,"3-mintika-466-parsel-konut-hatay":2};

const cevirisizEserKarti = eserKartiniAc;
eserKartiniAc = function (eserId) {
  cevirisizEserKarti(eserId);
  try {
    const kart = document.getElementById("eser-karti");
    if (!kart) return;
    if (typeof YZ_CEVIRILER !== "undefined") {
      kart.querySelectorAll(".olgu").forEach((olgu) => {
        const ilk = olgu.firstChild;
        const tr = ilk && ilk.nodeType === 3 ? ilk.textContent.trim() : "";
        if (!YZ_CEVIRILER.has(tr) || olgu.querySelector(".ceviri-etiket")) return;
        const satir = olgu.querySelector(".kaynak-satiri") || olgu;
        satir.insertAdjacentHTML("beforeend", `<span class="ceviri-etiket" title="AI translation, not in the printed book">translation</span>`);
      });
    }
    const atif = kart.querySelector(".foto-atif");
    const no = ESER_FOTO_ATFI[eserId];
    if (atif && no !== undefined) {
      atif.innerHTML = `<span>Fotoğraflar:</span> © <span>${FOTO_ATIFLARI[no]}</span> · <span>yana kaydır</span>`;
    }
  } catch (hata) { console.warn("Çeviri etiketi / atıf", hata); }
};

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, { "Fotoğraflar:": "Photos:", "yana kaydır": "swipe" });
});


/* ================= ZİYARET ADABI, MİMARİ SÖZLÜK, PAYLAŞILABİLİR KART ================= */

/* ---------- 1) Ziyaret adabı + namaz vakti ---------- */
const ADAB = {
  ibadet: ["Omuzları ve dizleri örten kıyafet giy; kadınlar başını örtmeli, yanında bir şal bulundur.",
           "Ayakkabılarını girişte çıkar.",
           "Namaz kılanların önünden geçme, sessiz ol.",
           "Fotoğraf çekerken flaş kullanma, ibadet edenleri görüntüleme."],
  turbe:  ["Sessiz ve saygılı ol; sandukalara dokunma, yaslanma.",
           "İçeride halı varsa ayakkabılarını çıkar.",
           "Omuzları ve dizleri örten kıyafet giy."],
  kilise: ["Ayin sırasında sessiz ol ve fotoğraf çekme.",
           "Omuzları ve dizleri örten kıyafet giy."]
};
const ADAB_TURU = { cami: "ibadet", mescit: "ibadet", kulliye: "ibadet", turbe: "turbe", "zaviye-tekke": "turbe", kilise: "kilise" };
const VAKIT_ADI = { Fajr: ["Sabah", "Dawn"], Dhuhr: ["Öğle", "Noon"], Asr: ["İkindi", "Afternoon"], Maghrib: ["Akşam", "Sunset"], Isha: ["Yatsı", "Night"] };
let acikAdabEseri = null;

function bugunTarihi() {
  const s = new Date();
  return `${String(s.getDate()).padStart(2, "0")}-${String(s.getMonth() + 1).padStart(2, "0")}-${s.getFullYear()}`;
}

async function namazVakitleri(eser) {
  const anahtar = `vakfiye:vakit:${bugunTarihi()}:${eser.enlem.toFixed(2)},${eser.boylam.toFixed(2)}`;
  try { const sakli = localStorage.getItem(anahtar); if (sakli) return JSON.parse(sakli); } catch (hata) { }
  const adres = `https://api.aladhan.com/v1/timings/${bugunTarihi()}?latitude=${eser.enlem}&longitude=${eser.boylam}&method=13`;
  const yanit = await fetch(adres);
  if (!yanit.ok) throw new Error("HTTP " + yanit.status);
  const veri = await yanit.json();
  const vakit = {};
  Object.keys(VAKIT_ADI).forEach((k) => {
    const m = String(veri.data.timings[k] || "").match(/(\d{1,2}):(\d{2})/);
    if (m) vakit[k] = m[1].padStart(2, "0") + ":" + m[2];
  });
  try { localStorage.setItem(anahtar, JSON.stringify(vakit)); } catch (hata) { }
  return vakit;
}

function namazUyarisi(vakit) {
  const en = typeof dil !== "undefined" && dil === "en";
  const simdi = new Date();
  const dakika = simdi.getHours() * 60 + simdi.getMinutes();
  const cuma = simdi.getDay() === 5;
  let uyari = null, siradaki = null;
  Object.keys(VAKIT_ADI).forEach((k) => {
    if (!vakit[k]) return;
    const [s, d] = vakit[k].split(":").map(Number);
    const fark = s * 60 + d - dakika;                          // pozitif: vakte kalan dakika
    const ad = VAKIT_ADI[k][en ? 1 : 0];
    const cumaVakti = cuma && k === "Dhuhr";
    const once = cumaVakti ? 45 : 20, sonra = cumaVakti ? 45 : 25;
    if (!uyari && fark > 0 && fark <= once) {
      uyari = cumaVakti
        ? (en ? `Friday prayer at ${vakit[k]} (in ${fark} min). The mosque will be crowded during the sermon and prayer (about 45 min).`
              : `Cuma namazı ${vakit[k]}'de (${fark} dk kaldı). Hutbe ve namaz boyunca (yaklaşık 45 dk) cami kalabalık olur.`)
        : (en ? `${ad} prayer in ${fark} min (${vakit[k]}). Prayer takes about 20 minutes; consider visiting afterwards.`
              : `${ad} namazına ${fark} dk var (${vakit[k]}). Namaz yaklaşık 20 dakika sürer; ziyaretini sonrasına bırakabilirsin.`);
    } else if (!uyari && fark <= 0 && -fark <= sonra) {
      uyari = en ? `${ad} prayer time began at ${vakit[k]}. The congregation may still be praying; wait before going in.`
                 : `${ad} namazı vakti girdi (${vakit[k]}). Cemaat namazı sürüyor olabilir; içeri girmeden önce bekle.`;
    }
    if (siradaki === null && fark > 0) siradaki = `${en ? "Next prayer" : "Sıradaki vakit"}: ${ad} ${vakit[k]}`;
  });
  return { uyari, siradaki };
}

function namazKutusunuCiz() {
  const kutu = document.getElementById("namaz-kutu");
  if (!kutu || !acikAdabEseri) return;
  const en = typeof dil !== "undefined" && dil === "en";
  const vakit = kutu.vakitler;
  if (vakit === undefined) { kutu.innerHTML = `<small class="namaz-not">${en ? "Loading prayer times…" : "Namaz vakitleri yükleniyor…"}</small>`; return; }
  if (vakit === null) { kutu.innerHTML = `<small class="namaz-not">${en ? "Prayer times could not be loaded." : "Namaz vakitleri alınamadı."}</small>`; return; }
  const { uyari, siradaki } = namazUyarisi(vakit);
  kutu.innerHTML = `
    ${uyari ? `<div class="namaz-uyari" role="status"><span class="uyari-isaret" aria-hidden="true">!</span><span>${uyari}</span></div>`
            : `<div class="namaz-siradaki">${siradaki || (en ? "No more prayers today." : "Bugün başka vakit yok.")}</div>`}
    <div class="namaz-vakitler">${Object.keys(VAKIT_ADI).filter((k) => vakit[k]).map((k) =>
      `<span><small>${VAKIT_ADI[k][en ? 1 : 0]}</small><b>${vakit[k]}</b></span>`).join("")}</div>
    <small class="namaz-not">${en ? "Times: Diyanet method, via aladhan.com" : "Vakitler: Diyanet hesabı, aladhan.com"}</small>`;
}

function adabKartiEkle(eser) {
  const kart = document.getElementById("eser-karti");
  const tur = ADAB_TURU[eser.turId];
  if (!kart || !tur || kart.querySelector(".adab-karti")) return;
  acikAdabEseri = eser;
  const html = `
    <div class="kart adab-karti">
      <span class="kart-baslik">ZİYARET ADABI</span>
      ${tur === "ibadet" ? `<div id="namaz-kutu" class="namaz-kutu"></div>` : ""}
      <ul class="adab-liste">${ADAB[tur].map((m) => `<li>${m}</li>`).join("")}</ul>
    </div>`;
  const hedef = Array.from(kart.querySelectorAll(".kart")).find((k) => !k.closest(".eylemler"));
  if (hedef) hedef.insertAdjacentHTML("beforebegin", html); else kart.insertAdjacentHTML("beforeend", html);
  if (tur !== "ibadet") return;
  const kutu = document.getElementById("namaz-kutu");
  namazKutusunuCiz();
  namazVakitleri(eser)
    .then((v) => { if (acikAdabEseri === eser && kutu.isConnected) { kutu.vakitler = v; namazKutusunuCiz(); } })
    .catch(() => { if (kutu.isConnected) { kutu.vakitler = null; namazKutusunuCiz(); } });
}

/* ---------- 2) Mimari sözlük ---------- */
// [terim, Türkçe kalıp, İngilizce kalıp, Türkçe açıklama, İngilizce açıklama]
const SOZLUK_TERIMLERI = [
  ["Mihrap", "mihra[pb]", "mihrab", "Caminin kıble duvarında, namazın yönünü gösteren niş. İmam namazı burada kıldırır.", "The niche in the qibla wall showing the direction of prayer; the imam leads prayer here."],
  ["Kitabe", "kit[âa]be", "inscription", "Yapının kim tarafından, ne zaman yapıldığını ya da onarıldığını anlatan taş veya mermer yazıt.", "A stone or marble panel recording who built or repaired the building, and when."],
  ["Harim", "harim", "prayer hall", "Caminin namaz kılınan asıl iç mekânı.", "The main interior of a mosque where prayer is performed."],
  ["Minber", "minber", "minbar", "Mihrabın sağında, cuma ve bayram hutbesinin okunduğu merdivenli kürsü.", "The stepped pulpit to the right of the mihrab, used for the Friday and festival sermon."],
  ["Kırma çatı", "kırma çatı", "hipped roof", "Dört yöne eğimli, saçakları her taraftan inen çatı.", "A roof sloping down on all four sides."],
  ["Sahın", "sah(?:ın|n[ıi])", "nave", "Sütun ya da paye dizileriyle ayrılmış, boyuna uzanan iç mekân bölümü.", "A lengthwise section of the interior separated by rows of columns or piers."],
  ["Son cemaat yeri", "son cemaat yer", "narthex|last congregation", "Caminin girişinin önündeki revaklı bölüm; geç kalanlar namazı burada kılardı.", "The porch in front of a mosque's entrance, where latecomers used to pray."],
  ["Mahfil", "mahfil", "gallery", "Cami içinde, genellikle girişin üstünde, ahşap ya da taş yükseltilmiş balkon (kadınlar, müezzin için).", "A raised wooden or stone gallery inside the mosque, often above the entrance (for women or the muezzin)."],
  ["Çini", "çini", "tile", "Sırlı, desenli seramik kaplama. Selçuklu ve Osmanlı yapılarında duvar ve mihrap süslemesinde kullanılır.", "Glazed, patterned ceramic tile used to decorate walls and mihrabs in Seljuk and Ottoman buildings."],
  ["Şerefe", "şerefe", "balcony", "Minarenin etrafını dolanan, ezanın okunduğu balkon.", "The balcony around a minaret from which the call to prayer was made."],
  ["Kesme taş", "kesme taş", "ashlar|cut stone", "Düzgün yüzeyli, köşeli biçimde yontulmuş taş.", "Stone dressed into regular blocks with flat faces."],
  ["Sivri kemer", "sivri kemer", "pointed arch", "Tepesi sivri birleşen kemer; Selçuklu ve Osmanlı mimarisinde yaygındır.", "An arch whose two sides meet at a point; common in Seljuk and Ottoman architecture."],
  ["Basık kemer", "basık kemer", "depressed arch", "Yüksekliği açıklığına göre az olan, yayvan kemer.", "A flattened arch that is low relative to its span."],
  ["Moloz taş", "moloz", "rubble", "Düzgün yontulmamış, kaba taş. Genellikle harçla örülür.", "Rough, undressed stone, usually laid in mortar."],
  ["Sanduka", "sanduka", "cenotaph", "Türbede mezarın üstüne konan, sandık biçimli sembolik mezar.", "A chest-shaped symbolic tomb placed over the grave in a mausoleum."],
  ["Taç kapı", "taç kapı", "portal", "Yapının süslü, anıtsal giriş kapısı.", "The decorated monumental entrance of a building."],
  ["Külah", "külah", "conical (roof|cap)", "Minare ya da kümbetin tepesindeki konik örtü.", "The conical cap on top of a minaret or tomb tower."],
  ["Eyvan", "eyvan", "iwan", "Üç yanı kapalı, bir yanı tamamen açık, tonozlu mekân. Medreselerde yaygındır.", "A vaulted hall walled on three sides and fully open on the fourth; common in madrasas."],
  ["Vakfiye", "vakfiye", "endowment deed|vakfiye", "Vakfı kuran kişinin, vakfettiği malları ve şartlarını yazdığı belge.", "The deed in which a founder lists the endowed property and its conditions."],
  ["Tonoz", "tonoz", "vault", "Kemerin uzayarak oluşturduğu kavisli örtü. Beşik tonoz yarım silindir biçimindedir.", "A curved roof formed by extending an arch; a barrel vault is half a cylinder."],
  ["Sülüs", "s[üu]l[üu]s", "thuluth", "Kitabelerde sık kullanılan, büyük ve gösterişli Arap yazı stili.", "A large, ornate Arabic script often used for inscriptions."],
  ["Lento", "lento", "lintel", "Kapı ya da pencerenin üstündeki yatay taşıyıcı.", "The horizontal beam over a door or window."],
  ["Kavsara", "kavsara", "hood", "Mihrap ya da taç kapı nişinin üstünü örten yarım kubbe veya mukarnaslı başlık.", "The half-dome or muqarnas cap over a mihrab or portal niche."],
  ["Şadırvan", "şadırvan", "ablution fountain|şadırvan", "Abdest almak için cami avlusunda bulunan, musluklu çeşme.", "The fountain with taps in a mosque courtyard used for ritual washing."],
  ["Zaviye", "zaviye", "dervish lodge|zaviye", "Dervişlerin ve yolcuların barındığı küçük tekke.", "A small lodge sheltering dervishes and travellers."],
  ["Mukarnas", "mukarnas", "muqarnas", "Küçük niş dizilerinin kademeli olarak üst üste bindiği, petek görünümlü süsleme.", "Honeycomb-like decoration of small niches stacked in tiers."],
  ["Devşirme malzeme", "devşirme", "spolia|reused", "Eski bir yapıdan alınıp yeni yapıda yeniden kullanılan taş, sütun gibi malzeme.", "Stone, columns and other material taken from an older building and reused."],
  ["Silme", "silme", "moulding", "Cephede ya da kapı çevresinde dolanan, çıkıntılı süs şeridi.", "A projecting decorative band around a façade or doorway."],
  ["Rumi", "r[ûu]mi", "rumi", "Selçuklu'dan gelen, kıvrık yaprak biçimli stilize bitki motifi.", "A stylised, curling leaf motif originating in Seljuk art."],
  ["Alınlık", "alınlı[kğ]", "pediment", "Pencere ya da kapının üstündeki, çoğu zaman kemerli veya üçgen bölüm.", "The often arched or triangular panel above a window or door."],
  ["Sütunce", "sütunce", "colonnette", "Mihrap ya da kapı kenarlarındaki ince, süs amaçlı küçük sütun.", "A slender decorative column at the sides of a mihrab or door."],
  ["Hazire", "hazire", "graveyard|hazire", "Cami ya da türbenin yanındaki, çevresi duvarla çevrili küçük mezarlık.", "A small walled graveyard beside a mosque or tomb."],
  ["Kalem işi", "kalem iş", "hand-painted|kalem işi", "Sıva ya da ahşap üzerine fırçayla yapılan boyalı süsleme.", "Painted decoration applied by brush on plaster or wood."],
  ["Saçak", "saçak", "eaves", "Çatının duvardan dışarı taşan kenarı.", "The edge of a roof projecting beyond the wall."],
  ["Tromp", "tromp", "squinch", "Kare mekândan yuvarlak kubbeye geçişi sağlayan, köşelerdeki yarım koni biçimli öğe.", "A half-cone in the corner that turns a square room into a base for a round dome."],
  ["Kasnak", "kasnak", "drum", "Kubbenin oturduğu silindir ya da çokgen gövde.", "The cylindrical or polygonal base on which a dome rests."],
  ["İmaret", "imaret", "soup kitchen|imaret", "Yoksullara, öğrencilere ve yolculara ücretsiz yemek veren vakıf aşhanesi.", "An endowed kitchen serving free meals to the poor, students and travellers."],
  ["Hatıl", "hatıl", "timber band", "Duvarı sağlamlaştırmak için yatay olarak yerleştirilen ahşap kiriş.", "A horizontal timber beam set in a wall to strengthen it."],
  ["Bedesten", "bedesten", "bedesten", "Değerli malların satıldığı, kapıları kilitlenen kapalı çarşı.", "A lockable covered market for valuable goods."],
  ["Pandantif", "pandantif", "pendentive", "Kare mekândan kubbeye geçişi sağlayan, küresel üçgen biçimli öğe.", "A curved triangle that carries a round dome over a square room."],
  ["Kündekâri", "kündek[âa]ri", "kündekari", "Çivi ve tutkal kullanmadan, geçmeli küçük ahşap parçalarla yapılan geometrik işçilik.", "Geometric woodwork of small interlocking pieces, made without nails or glue."],
  ["Darülhuffaz", "d[âa]r[üu]['’]?l[ -]?huffaz", "darülhuffaz|qur'an school", "Kur'an-ı Kerim'in ezberlendiği okul.", "A school where the Qur'an is memorised."],
  ["Sebil", "sebil", "sebil", "Gelip geçenlere ücretsiz su dağıtılan, pencereli küçük yapı.", "A small windowed kiosk where water was handed out free to passers-by."]
];
const SOZLUK_TR = SOZLUK_TERIMLERI.map((t) => new RegExp(`(?<![\\p{L}])${t[1]}[\\p{L}]*`, "iu"));
const SOZLUK_EN = SOZLUK_TERIMLERI.map((t) => new RegExp(`(?<![\\p{L}])(?:${t[2]})[\\p{L}]*`, "iu"));

function terimleriBagla(kok) {
  const en = typeof dil !== "undefined" && dil === "en";
  const kaliplar = en ? SOZLUK_EN : SOZLUK_TR;
  kok.querySelectorAll(".olgu").forEach((olgu) => {
    if (olgu.dataset.terimli) return;
    const ilk = olgu.firstChild;
    if (!ilk || ilk.nodeType !== 3 || !ilk.nodeValue.trim()) return;
    if (olgu.dataset.tr === undefined) olgu.dataset.tr = (ilk.turkcesi || ilk.nodeValue).trim();
    const kullanilan = new Set();
    let dugum = ilk;
    while (dugum && dugum.nodeType === 3) {
      let enIyi = null;
      kaliplar.forEach((k, i) => {
        if (kullanilan.has(i)) return;
        const m = dugum.nodeValue.match(k);
        if (m && (enIyi === null || m.index < enIyi.m.index)) enIyi = { m, i };
      });
      if (!enIyi) break;
      kullanilan.add(enIyi.i);
      const kalan = dugum.splitText(enIyi.m.index);
      const sonrasi = kalan.splitText(enIyi.m[0].length);
      const dugme = document.createElement("button");
      dugme.type = "button"; dugme.className = "terim"; dugme.dataset.terim = enIyi.i;
      dugme.textContent = kalan.nodeValue;
      kalan.replaceWith(dugme);
      dugum = sonrasi;
    }
    olgu.dataset.terimli = "1";
  });
}

// Dil değişmeden önce bölünmüş yazıları birleştir: çeviri tek parça metin üzerinden yapılır
function terimleriCoz() {
  document.querySelectorAll(".olgu[data-terimli]").forEach((olgu) => {
    const satir = olgu.querySelector(".kaynak-satiri");
    Array.from(olgu.childNodes).forEach((n) => { if (n !== satir) n.remove(); });
    const yazi = document.createTextNode(olgu.dataset.tr);
    yazi.turkcesi = olgu.dataset.tr;
    olgu.insertBefore(yazi, satir);
    delete olgu.dataset.terimli;
  });
}

function terimPenceresi(no) {
  const t = SOZLUK_TERIMLERI[no];
  if (!t) return;
  const en = typeof dil !== "undefined" && dil === "en";
  const eski = document.getElementById("terim-katman");
  if (eski) eski.remove();
  document.body.insertAdjacentHTML("beforeend", `
    <div class="talep-katman" id="terim-katman" role="dialog" aria-modal="true" aria-labelledby="terim-baslik">
      <div class="talep-kutu terim-kutu">
        <div class="talep-ust"><b id="terim-baslik">${t[0]}</b>
          <button type="button" class="talep-kapat" data-terim-kapat aria-label="Kapat">✕</button></div>
        <span class="terim-etiket">${en ? "ARCHITECTURE GLOSSARY" : "MİMARİ SÖZLÜK"}</span>
        <p class="terim-aciklama">${en ? t[4] : t[3]}</p>
      </div>
    </div>`);
}

document.addEventListener("click", (olay) => {
  const terim = olay.target.closest(".terim");
  if (terim) { terimPenceresi(Number(terim.dataset.terim)); return; }
  if (olay.target.closest("[data-terim-kapat]") || olay.target.id === "terim-katman") {
    const k = document.getElementById("terim-katman");
    if (k) k.remove();
  }
});

/* Eser kartına ikisini de ekle */
const ozelliksizEserKarti = eserKartiniAc;
eserKartiniAc = function (eserId) {
  ozelliksizEserKarti(eserId);
  const eser = ESERLER.find((e) => e.id === eserId);
  const kart = document.getElementById("eser-karti");
  if (!eser || !kart) return;
  try { adabKartiEkle(eser); } catch (hata) { console.warn("Ziyaret adabı", hata); }
  // Türkçe yazıyı şimdi sakla, terimleri çeviri bittikten sonra bağla
  kart.querySelectorAll(".olgu").forEach((o) => {
    const ilk = o.firstChild;
    if (ilk && ilk.nodeType === 3 && o.dataset.tr === undefined) o.dataset.tr = ilk.nodeValue.trim();
  });
  setTimeout(() => { try { terimleriBagla(kart); } catch (hata) { console.warn("Sözlük", hata); } }, 0);
};

// dil.js bu dosyadan sonra yüklenir: dil seçimini sayfa hazır olunca sarmala
document.addEventListener("DOMContentLoaded", () => {
  if (typeof dilSec !== "function") return;
  const ozelliksizDilSec = dilSec;
  dilSec = function (yeniDil) {
    terimleriCoz();
    ozelliksizDilSec(yeniDil);
    const kart = document.getElementById("eser-karti");
    setTimeout(() => {
      if (kart && !kart.hidden) terimleriBagla(kart);
      namazKutusunuCiz();
    }, 0);
  };
});

/* ---------- 3) Paylaşılabilir pasaport kartı ---------- */
async function hikayeKartiCiz() {
  const en = typeof dil !== "undefined" && dil === "en";
  const W = 1080, H = 1920;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d");
  const BASLIK = '"Playfair Display", Georgia, serif', GOVDE = '"Inter", system-ui, sans-serif';
  try { await Promise.all([document.fonts.load(`600 80px ${BASLIK}`), document.fonts.load(`600 30px ${GOVDE}`)]); } catch (hata) { }
  const LACIVERT = "#0B2540", ALTIN = "#C9A45C", ACIK = "#E6D2A6";

  const aralikli = (yazi, cx, y, aralik) => {          // harf aralıklı, ortalı yazı (her tarayıcıda çalışır)
    const genislik = Array.from(yazi).reduce((t, h) => t + x.measureText(h).width + aralik, -aralik);
    let px = cx - genislik / 2;
    Array.from(yazi).forEach((h) => { x.fillText(h, px, y); px += x.measureText(h).width + aralik; });
  };

  x.fillStyle = LACIVERT; x.fillRect(0, 0, W, H);
  const g = x.createRadialGradient(W / 2, 520, 50, W / 2, 520, 900);
  g.addColorStop(0, "rgba(201,164,92,.16)"); g.addColorStop(1, "rgba(201,164,92,0)");
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.strokeStyle = "rgba(201,164,92,.55)"; x.lineWidth = 2;
  x.strokeRect(54, 54, W - 108, H - 108);
  x.strokeStyle = "rgba(201,164,92,.25)"; x.strokeRect(68, 68, W - 136, H - 136);

  // Amblem: sekiz köşeli yıldız
  x.save(); x.translate(W / 2, 250); x.strokeStyle = ALTIN; x.lineWidth = 4;
  x.strokeRect(-46, -46, 92, 92); x.rotate(Math.PI / 4); x.strokeRect(-46, -46, 92, 92);
  x.restore(); x.beginPath(); x.arc(W / 2, 250, 10, 0, Math.PI * 2); x.fillStyle = ALTIN; x.fill();

  x.textBaseline = "alphabetic"; x.fillStyle = ALTIN; x.font = `600 76px ${BASLIK}`;
  aralikli("VAKFİYE", W / 2, 420, 16);
  x.fillStyle = ACIK; x.font = `500 26px ${GOVDE}`;
  aralikli(en ? "CULTURE PASSPORT" : "KÜLTÜR PASAPORTU", W / 2, 470, 10);

  x.textAlign = "center"; x.fillStyle = "#fff"; x.font = `600 104px ${BASLIK}`;
  x.fillText(rotaSehri, W / 2, 630);
  x.fillStyle = ALTIN; x.font = `italic 500 58px ${BASLIK}`;
  x.fillText(en ? "route completed" : "rotasını tamamladım", W / 2, 710);

  // Damgalar: 2 sütun × 3 satır
  const R = 135, sutun = [W / 2 - 190, W / 2 + 190];
  ROTA.forEach((durak, i) => {
    const cx = sutun[i % 2], cy = 920 + Math.floor(i / 2) * 300;
    x.save(); x.translate(cx, cy); x.rotate((i % 2 ? 6 : -8) * Math.PI / 180);
    x.strokeStyle = ALTIN; x.fillStyle = ALTIN;
    x.lineWidth = 6; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.stroke();
    x.lineWidth = 2; x.beginPath(); x.arc(0, 0, R - 16, 0, Math.PI * 2); x.stroke();
    x.beginPath();
    for (let k = 0; k < 10; k++) {                                          // küçük yıldız
      const r = k % 2 ? 9 : 22, a = -Math.PI / 2 + k * Math.PI / 5;
      x.lineTo(Math.cos(a) * r, -48 + Math.sin(a) * r);
    }
    x.closePath(); x.fill();
    x.textAlign = "center";
    let boyut = 30;
    x.font = `700 ${boyut}px ${GOVDE}`;
    while (x.measureText(durak.ust).width > R * 1.6 && boyut > 18) { boyut -= 2; x.font = `700 ${boyut}px ${GOVDE}`; }
    x.fillText(durak.ust, 0, 12);
    x.font = `600 20px ${GOVDE}`; x.fillStyle = ACIK;
    x.fillText(durak.alt, 0, 52);
    x.restore();
  });

  const tarih = new Date().toLocaleDateString(en ? "en-GB" : "tr-TR", { day: "numeric", month: "long", year: "numeric" });
  const ad = (typeof oturum !== "undefined" && oturum && oturum.ad) ? oturum.ad : "";
  x.textAlign = "center"; x.fillStyle = "#fff"; x.font = `600 40px ${BASLIK}`;
  if (ad) x.fillText(ad, W / 2, 1720);
  x.fillStyle = ACIK; x.font = `500 28px ${GOVDE}`;
  x.fillText(`${ROTA.length} ${en ? "stamps" : "pul"} · ${tarih}`, W / 2, ad ? 1770 : 1730);
  x.fillStyle = ALTIN; x.font = `600 26px ${GOVDE}`;
  x.fillText("feyzabb.github.io/vakfiye", W / 2, 1830);

  return new Promise((coz) => c.toBlob(coz, "image/png"));
}

async function hikayeKartiniGoster() {
  const en = typeof dil !== "undefined" && dil === "en";
  const blob = await hikayeKartiCiz();
  if (!blob) return;
  const dosya = new File([blob], `vakfiye-${rotaSehri.toLocaleLowerCase("tr")}-rotasi.png`, { type: "image/png" });
  const url = URL.createObjectURL(blob);
  const paylasilir = navigator.canShare && navigator.canShare({ files: [dosya] });
  const eski = document.getElementById("hikaye-katman");
  if (eski) eski.remove();
  document.body.insertAdjacentHTML("beforeend", `
    <div class="talep-katman" id="hikaye-katman" role="dialog" aria-modal="true" aria-label="${en ? "Story card" : "Hikâye kartı"}">
      <div class="talep-kutu hikaye-kutu">
        <div class="talep-ust"><b>${en ? "Your story card" : "Hikâye kartın"}</b>
          <button type="button" class="talep-kapat" data-hikaye-kapat aria-label="Kapat">✕</button></div>
        <img class="hikaye-onizleme" src="${url}" alt="${en ? "Route completion card" : "Rota tamamlama kartı"}">
        ${paylasilir ? `<button type="button" class="talep-gonder" data-hikaye-paylas>${en ? "Share" : "Paylaş"}</button>` : ""}
        <a class="kaynak-link hikaye-indir" href="${url}" download="${dosya.name}">${en ? "Download" : "İndir"}</a>
      </div>
    </div>`);
  document.getElementById("hikaye-katman").hikayeDosyasi = dosya;
}

document.addEventListener("click", async (olay) => {
  if (olay.target.closest("[data-hikaye-olustur]")) { hikayeKartiniGoster(); return; }
  if (olay.target.closest("[data-hikaye-paylas]")) {
    const k = document.getElementById("hikaye-katman");
    try { await navigator.share({ files: [k.hikayeDosyasi], title: "Vakfiye", text: `${rotaSehri} · Vakfiye` }); } catch (hata) { }
    return;
  }
  if (olay.target.closest("[data-hikaye-kapat]") || olay.target.id === "hikaye-katman") {
    const k = document.getElementById("hikaye-katman");
    if (k) k.remove();
  }
});

const paylasimsizPasaport = pasaportuCiz;
pasaportuCiz = function () {
  paylasimsizPasaport.apply(this, arguments);
  const alan = document.getElementById("sekme-pasaport");
  if (!alan || alan.querySelector(".paylas-karti") || ROTA.length === 0 || rotadakiPulSayisi() < ROTA.length) return;
  const izgara = alan.querySelector(".pullar-izgara");
  const hedef = izgara ? izgara.closest(".kart") : null;
  const html = `
    <div class="kart paylas-karti">
      <span class="kart-baslik">ROTA TAMAMLANDI</span>
      <b class="paylas-baslik">Tebrikler! ${rotaSehri} rotasının ${ROTA.length} durağını da gezdin.</b>
      <button type="button" class="t2-pul-dugme" data-hikaye-olustur>Hikâye kartı oluştur</button>
      <small class="t2-pul-not">Instagram hikâyesi boyutunda bir görsel hazırlanır.</small>
    </div>`;
  if (hedef) hedef.insertAdjacentHTML("afterend", html); else alan.insertAdjacentHTML("beforeend", html);
};

/* ---------- İngilizce karşılıklar ---------- */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "ZİYARET ADABI": "VISITING ETIQUETTE",
    "Omuzları ve dizleri örten kıyafet giy; kadınlar başını örtmeli, yanında bir şal bulundur.": "Wear clothes covering shoulders and knees; women should cover their hair, so bring a scarf.",
    "Ayakkabılarını girişte çıkar.": "Take off your shoes at the entrance.",
    "Namaz kılanların önünden geçme, sessiz ol.": "Do not walk in front of people praying; keep quiet.",
    "Fotoğraf çekerken flaş kullanma, ibadet edenleri görüntüleme.": "Do not use flash, and do not photograph people at prayer.",
    "Sessiz ve saygılı ol; sandukalara dokunma, yaslanma.": "Be quiet and respectful; do not touch or lean on the cenotaphs.",
    "İçeride halı varsa ayakkabılarını çıkar.": "If there is carpet inside, take off your shoes.",
    "Omuzları ve dizleri örten kıyafet giy.": "Wear clothes covering shoulders and knees.",
    "Ayin sırasında sessiz ol ve fotoğraf çekme.": "Keep quiet and do not take photos during services.",
    "ROTA TAMAMLANDI": "ROUTE COMPLETED", "Hikâye kartı oluştur": "Create story card",
    "Instagram hikâyesi boyutunda bir görsel hazırlanır.": "An image sized for Instagram stories is created."
  });
  if (typeof KALIPLAR !== "undefined") {
    KALIPLAR.push([/^Tebrikler! (.+) rotasının (\d+) durağını da gezdin\.$/, (m) => `Congratulations! You visited all ${m[2]} stops of the ${m[1]} route.`]);
  }
});


/* ================= ESER KARTI: KAYNAKLAR ================= */
// Her eserin bilgileri hangi envanter kitabından, hangi sayfalardan geldi. Kitapların doğrudan PDF
// adresleri bilinmediği için "Yayını aç" Vakıf Katılım'ın yayınlar sayfasına gider.
const KAYNAK_KITAPLARI = [{"baslik": "Bursa Vakıf Eserleri, I. ve II. Cilt (Osmangazi, Yıldırım)", "yayinci": "Vakıf Katılım", "yil": 2025}, {"baslik": "Bursa Vakıf Eserleri, III. Cilt (Diğer İlçeler)", "yayinci": "Vakıf Katılım", "yil": 2025}, {"baslik": "Konya Vakıf Eserleri Envanteri, I. Cilt", "yayinci": "Vakıf Katılım", "yil": 2024}, {"baslik": "Konya Vakıf Eserleri Envanteri, II. Cilt", "yayinci": "Vakıf Katılım", "yil": 2024}, {"baslik": "Hatay İli Vakıf Eserleri", "yayinci": "Vakıf Katılım", "yil": 2022}];
const ESER_KAYNAKLARI = {"molla-fenari-camii":[[0,"394–397"]],"molla-gurani-mescidi":[[0,"398"]],"nakkas-ali-mescidi":[[0,"399–401"]],"nalbantoglu-camii":[[0,"403–405"]],"pasa-camii":[[0,"406"]],"ruscuk-camii":[[0,"407"]],"sati-fakih-camii":[[0,"408–409"]],"selcuk-hatun-camii":[[0,"410–412"]],"selimiye-camii":[[0,"413–414"]],"simkes-sirmakes-camii":[[0,"415"]],"sivasiler-tahtali-camii":[[0,"416"]],"sehabettin-pasa-camii":[[0,"417–420"]],"sehadet-kale-saray-camii":[[0,"421–426"]],"sehrekustu-pars-bey-camii":[[0,"427–429"]],"seker-hoca-camii":[[0,"430"]],"serafettin-pasa-okcular-camii-ve-haziresi":[[0,"431–432"]],"seyh-hamit-somuncu-baba-ayazma-camii-ve-haziresi":[[0,"433–434"]],"seyh-konevi-camii":[[0,"435–436"]],"seyh-pasa-dibekli-camii":[[0,"437–439"]],"tahtali-hatipzade-mescidi":[[0,"440"]],"tavukcu-mescidi":[[0,"441"]],"tuzpazari-camii":[[0,"442–444"]],"uc-kuzular-kozlar-camii-ve-kabri":[[0,"445–448"]],"hz-uftade-camii":[[0,"449–456"]],"hz-uftade-tekke-camii":[[0,"457–459"]],"veled-i-enbiya-enbiyaoglu-camii":[[0,"460–461"]],"veled-i-habib-camii":[[0,"462–464"]],"veled-i-sarayi-mescidi":[[0,"465"]],"veled-i-yanic-camii":[[0,"466–469"]],"veled-i-veziri-camii":[[0,"470–471"]],"veli-semseddin-camii":[[0,"472–473"]],"veziri-camii":[[0,"474–475"]],"yeni-bezzaz-camii":[[0,"476–478"]],"yeni-kaplica-mescidi":[[0,"479"]],"yer-kapi-camii":[[0,"480–482"]],"yigit-kohne-camii":[[0,"483–487"]],"zagferanlik-mescidi":[[0,"488–489"]],"adliye-koyu-camii":[[1,"325–326"]],"balikpazari-camii":[[1,"327–328"]],"kucukkumla-eski-camii":[[1,"329–331"]],"gursu-orta-camii":[[1,"335–337"]],"orhan-gazi-kulliyesi":[[0,""]],"hudavendigar-kulliyesi":[[0,""]],"hamzabey-kulliyesi":[[0,""]],"timurtas-pasa-kulliyesi":[[0,""]],"yildirim-kulliyesi":[[0,""]],"emir-sultan-kulliyesi":[[0,""]],"umurbey-kulliyesi":[[0,""]],"mevlana-turbesi-muze-konya":[[2,"29–66"]],"bulgur-dede-mescidi-konya":[[2,"75–78"]],"sukran-mescidi-konya":[[2,"79–80"]],"gazezler-camii-konya":[[2,"81"]],"karakurt-camii-konya":[[2,"82"]],"komurculer-camii-konya":[[2,"83"]],"furgan-dede-mescidi-konya":[[2,"84"]],"anber-reis-feridiye-camii-konya":[[2,"85–88"]],"seyh-ebul-vefa-camii-konya":[[2,"89"]],"ayanbey-camii-konya":[[2,"90"]],"askan-camii-konya":[[2,"91"]],"ekmekkocu-mescidi-konya":[[2,"92"]],"buyukkovanagzi-haci-haydar-efendi-camii-konya":[[2,"93–94"]],"yukari-camii-ve-haziresi-saglik-beldesi-konya":[[2,"95–96"]],"karaagac-koyu-camii-konya":[[2,"97"]],"dayhane-camii-ve-mustemilati-konya":[[2,"98"]],"sadreddin-konevi-camii-konya":[[2,"99–104"]],"karatay-emir-kemalettin-mescidi-konya":[[2,"105–106"]],"hoca-fakih-ahmet-fakih-camii-ve-turbesi-konya":[[2,"107–108"]],"saatci-camii-konya":[[2,"109"]],"abdulaziz-camii-konya":[[2,"110"]],"tahir-pasa-tursunoglu-dursun-fakih-camii-konya":[[2,"111–113"]],"tahir-ile-zuhre-don-baba-pir-ahi-sultan-mescit-ve-turbesi-konya":[[2,"114–116"]],"hoca-hasan-camii-konya":[[2,"117–118"]],"abdulmumin-yediler-megaribe-mescidi-ve-mezari-konya":[[2,"119–121"]],"gokyurt-koyu-camii-konya":[[2,"122"]],"tellioglu-sungurbey-camii-konya":[[2,"123"]],"sahip-ata-larende-camii-konya":[[2,"124–128"]],"meram-kapu-kapi-ihyaiyye-camii-konya":[[2,"129–136"]],"haci-hasan-camii-konya":[[2,"139–140"]],"seyh-osman-rumi-camii-konya":[[2,"141"]],"ihtiyarettin-mescidi-konya":[[2,"142"]],"iplikci-altinapa-camii-konya":[[2,"143–145"]],"tarhana-mescidi-konya":[[2,"146"]],"veznedar-huseyin-efendi-asri-camii-konya":[[2,"147"]],"kadi-mursel-camii-konya":[[2,"148"]],"salih-pasa-dedemoglu-camii-konya":[[2,"149"]],"aksinne-kumbetli-gunbentli-mescidi-konya":[[2,"150–151"]],"nasuh-bey-camii-canbazzade-nasuh-bey-darul-huffazi-konya":[[2,"152–153"]],"yolcuoglu-gazioglu-camii-konya":[[2,"154"]],"gurb-i-cedidi-kosova-mescidi-konya":[[2,"155"]],"kalecik-mescidi-konya":[[2,"156"]],"emir-halil-camii-konya":[[2,"157"]],"tahtatepen-ubeyt-haci-adil-camii-konya":[[2,"158"]],"asagi-mahalle-kiziloren-kandemir-mescidi-konya":[[2,"159"]],"fahrunnisa-caybasi-mescit-ve-turbesi-konya":[[2,"160–163"]],"hasbey-darul-huffaz-mescidi-konya":[[2,"164–166"]],"erdemsah-kale-i-cerp-mescidi-konya":[[2,"167–168"]],"kurkcu-mescidi-konya":[[2,"169–170"]],"sultan-selim-selimiye-camii-konya":[[2,"174–183"]],"nuriye-camii-konya":[[2,"185"]],"dolap-battal-mescidi-konya":[[2,"186"]],"haci-veyis-camii-ve-cesmesi-konya":[[2,"187–190"]],"selahaddin-kececiler-camii-konya":[[2,"191–192"]],"karacihan-camii-konya":[[2,"193"]],"garip-nasrullah-camii-konya":[[2,"194"]],"haci-omerler-camii-konya":[[2,"195"]],"obruk-koyu-camii-konya":[[2,"196"]],"civiloglu-camii-konya":[[2,"197–198"]],"burhan-dede-camii-konya":[[2,"199"]],"igdeli-sultan-camii-konya":[[2,"200"]],"karakayis-sari-camii-konya":[[2,"201–202"]],"tahtali-mescidi-konya":[[2,"203"]],"durak-fakih-camii-konya":[[2,"204"]],"cukur-camii-konya":[[2,"205"]],"toraman-mescidi-konya":[[2,"206"]],"sarnic-camii-konya":[[2,"207"]],"araplar-ak-camii-konya":[[2,"208"]],"bagevliya-cami-ve-cesmesi-konya":[[2,"209–210"]],"muftu-abdullah-mescidi-konya":[[2,"211–212"]],"ovaloglu-celik-mehmet-pasa-camii-konya":[[2,"213–214"]],"kinaci-camii-mescit-konya":[[2,"215"]],"meydan-i-ahmet-camii-konya":[[2,"216"]],"kadi-izzettin-karpuzoglu-camii-konya":[[2,"217–218"]],"sitte-i-banu-mescidi-konya":[[2,"219"]],"hatuniye-guduk-minare-akincilar-mahmut-mescidi-konya":[[2,"220–222"]],"sems-i-tebrizi-camii-ve-turbesi-konya":[[2,"223–231"]],"sircali-demirci-haci-mescidi-konya":[[2,"235–237"]],"cimilli-sari-mescidi-konya":[[2,"239"]],"zenburi-mescidi-konya":[[2,"240–241"]],"ickaraarslan-mescidi-konya":[[2,"242"]],"sari-yakup-camii-konya":[[2,"245–248"]],"haci-mustafa-aga-koprubasi-mustafa-aga-camii-konya":[[2,"249"]],"asmali-hatip-sultan-mescidi-konya":[[2,"250"]],"pisili-pir-esat-mescit-ve-turbesi-konya":[[2,"251–254"]],"mengene-camii-konya":[[2,"257"]],"alemdar-camii-konya":[[2,"258"]],"saksaganlar-camii-konya":[[2,"259–261"]],"dolap-mektep-mescidi-konya":[[2,"261"]],"polatlar-haci-cemal-hatip-camii-konya":[[2,"262–263"]],"seyh-ulema-recep-aga-camii-konya":[[2,"264"]],"yanik-sedirler-kenan-dede-camii-konya":[[2,"265"]],"digin-camii-konya":[[2,"266"]],"hamzaoglu-camii-konya":[[2,"267"]],"hanedan-camii-konya":[[2,"268"]],"cayir-camii-konya":[[2,"269"]],"haci-ivaz-camii-konya":[[2,"270"]],"sutcu-camii-konya":[[2,"271"]],"cataloglu-camii-konya":[[2,"272"]],"topraklik-hasan-efendi-camii-konya":[[2,"273"]],"cavusoglu-camii-konya":[[2,"275"]],"namik-pasa-camii-konya":[[2,"276–277"]],"halkabegus-mescidi-ve-turbesi-konya":[[2,"278"]],"tolluoglu-camii-konya":[[2,"279"]],"seyh-ulema-yusuf-aga-camii-konya":[[2,"280"]],"aziziye-camii-konya":[[2,"281–287"]],"besare-bey-mescidi-konya":[[2,"292–294"]],"ak-sazi-bey-camii-konya":[[2,"295"]],"sakahane-hidir-ilyas-davut-aga-mescidi-konya":[[2,"296"]],"zevle-sultan-mescidi-konya":[[2,"297"]],"basarakavak-zahide-hatun-camii-konya":[[2,"298"]],"tatkoy-merkez-camii-konya":[[2,"299–300"]],"beyhekim-mescit-ve-turbesi-konya":[[2,"301–302"]],"sultan-alaeddin-ulu-camii-konya":[[2,"303–318"]],"ihsaniye-ulu-camii-minaresi-konya":[[2,"319"]],"kurucay-eski-camii-konya":[[2,"320"]],"avdan-beldesi-buyuk-eski-camii-konya":[[2,"321"]],"buyuk-camii-konya":[[2,"322–323"]],"altinkalem-cevlek-mescidi-konya":[[2,"324–325"]],"cinaralti-camii-konya":[[2,"327"]],"dogrugoz-beldesi-merkez-camii-konya":[[2,"328"]],"ferruhsah-seyit-mahmut-hayrani-mescidi-konya":[[2,"329–330"]],"guduk-minare-camii-konya":[[2,"331–332"]],"haci-hamza-hafiz-hatip-ali-mescidi-konya":[[2,"333"]],"hidirlik-hizirlik-hidir-dede-mescidi-konya":[[2,"334"]],"imaret-hasan-pasa-camii-konya":[[2,"335–340"]],"iplikci-ambardar-kerim-aga-camii-konya":[[2,"343–352"]],"kalayci-mescidi-konya":[[2,"353"]],"kizilca-mescit-konya":[[2,"354"]],"kileci-mescidi-konya":[[2,"355–356"]],"kucuk-ayasofya-mescidi-konya":[[2,"357–358"]],"ortakoy-beldesi-merkez-camii-konya":[[2,"361"]],"tahtakale-mescidi-konya":[[2,"363–366"]],"ulu-sultan-alaattin-camii-konya":[[2,"367–372"]],"ali-pasa-camii-konya":[[2,"375–376"]],"bayindir-koyu-camii-konya":[[2,"379–382"]],"cuma-orta-camii-konya":[[2,"383"]],"demirli-mescit-konya":[[2,"384"]],"emen-eski-camii-konya":[[2,"385"]],"gedik-ahmet-pasa-camii-konya":[[2,"386"]],"hamidiye-camii-konya":[[2,"387"]],"hizir-ali-pasa-bayafsar-camii-konya":[[2,"388–389"]],"lutfullah-carsi-camii-minaresi-konya":[[2,"390"]],"hisarlik-beldesi-asarlik-camii-konya":[[2,"391–392"]],"siristat-buyuk-camii-konya":[[2,"393"]],"sogut-buyuk-cami-konya":[[2,"394–397"]],"ucpinar-beldesi-kursunlu-camii-konya":[[2,"397–400"]],"ulu-carsi-merkez-camii-konya":[[2,"401–403"]],"karamanoglu-ibrahim-bey-camii-konya":[[2,"405–407"]],"ciftlikozu-beldesi-camii-konya":[[2,"408"]],"baskoy-ulu-camii-konya":[[2,"409–411"]],"karaaga-beldesi-eski-ulu-camii-konya":[[2,"412"]],"orta-camii-konya":[[2,"413"]],"pazar-carsi-camii-konya":[[2,"414"]],"ayaslar-ulu-yukari-camii-konya":[[2,"415"]],"ulu-camii-konya":[[2,"417–424"]],"yegin-camii-konya":[[2,"425–426"]],"agalar-boyaci-ali-mescidi-konya":[[2,"427"]],"buyukdede-taskilise-camii-konya":[[2,"428–429"]],"kutoren-eski-camii-konya":[[2,"431"]],"ulu-kible-camii-konya":[[2,"432–433"]],"zengen-beldesi-eski-camii-konya":[[2,"433–435"]],"cavus-eski-merkez-cami-konya":[[2,"437–438"]],"cukurkent-koyu-camii-konya":[[2,"439–440"]],"beykonak-dedigi-sultan-mescit-ve-tekkesi-konya":[[2,"442–446"]],"behlul-bey-camii-konya":[[2,"446"]],"fazil-camii-konya":[[2,"447"]],"ibrahim-pasa-camii-argithani-konya":[[2,"448"]],"pir-huseyin-ulu-cukur-camii-konya":[[2,"449–450"]],"sihcarullah-zincirli-camii-konya":[[2,"451"]],"yukari-cigil-beldesi-merkez-camii-kebir-camii-konya":[[2,"452–453"]],"cavundur-camii-konya":[[2,"455–456"]],"haci-mehmetli-camii-konya":[[2,"457–458"]],"ibrahim-bey-carsi-camii-konya":[[2,"459–460"]],"kabacali-camii-konya":[[2,"461"]],"karamanli-haci-mustafa-camii-konya":[[2,"462"]],"pinarbasi-camii-konya":[[2,"463"]],"cetmi-camii-konya":[[2,"464"]],"resadiye-camii-konya":[[2,"465"]],"yagmapinar-mescidi-konya":[[2,"466–467"]],"kucuk-alioglu-camii-konya":[[2,"468"]],"pir-huseyin-bey-yukari-camii-konya":[[2,"470–471"]],"muallimhane-sofuhane-camii-ve-turbesi-konya":[[2,"473–474"]],"seyyid-harun-veli-camii-konya":[[2,"475–478"]],"uzun-seyh-sih-camii-konya":[[2,"479–482"]],"piribeyli-beldesi-merkez-camii-konya":[[2,"485"]],"esrefoglu-suleyman-bey-kulliyesi-konya":[[3,"11–32"]],"sultan-ii-selim-kulliyesi-konya":[[3,"33–49"]],"lala-mustafa-pasa-kulliyesi-konya":[[3,"53–70"]],"sircali-medrese-konya":[[3,"75–81"]],"kemaliye-kucuk-karatay-medresesi-konya":[[3,"83–84"]],"karatay-medresesi-konya":[[3,"87–90"]],"ali-efendi-darulhuffazi-muallimhane-konya":[[3,"93–96"]],"ali-gav-zaviyesi-mahmudiye-medresesi-konya":[[3,"97–100"]],"ince-minareli-medrese-sahip-ata-darulhadis-konya":[[3,"101–106"]],"tas-halkali-sahip-ata-medrese-konya":[[3,"109–110"]],"ismail-aga-medresesi-tas-medrese-konya":[[3,"113–116"]],"cemal-ali-dede-turut-turbesi-konya":[[3,"119–124"]],"atesbaz-veli-kumbeti-ve-zaviyesi-konya":[[3,"125–128"]],"tavus-baba-turbesi-konya":[[3,"129–130"]],"turgutoglu-turbesi-konya":[[3,"131–134"]],"sahip-ata-hanikahi-ve-turbesi-konya":[[3,"135–143"]],"seyh-hasan-i-rumi-turbesi-konya":[[3,"145"]],"seyh-osman-rumi-turbesi-konya":[[3,"146"]],"emir-nurettin-sephevan-kumbeti-konya":[[3,"147"]],"sadr-sedir-sultan-turbesi-konya":[[3,"149"]],"seyh-aliman-alaman-isgalaman-yahsi-turbesi-konya":[[3,"150–152"]],"arap-dede-turbesi-konya":[[3,"153–154"]],"seyfettin-kara-sungur-kumbeti-konya":[[3,"154–155"]],"ishak-pasa-turbesi-konya":[[3,"156"]],"ic-karaaslan-necmettin-karaarslan-kumbeti-konya":[[3,"157–158"]],"burhaneddin-fakih-dede-turbesi-konya":[[3,"159–160"]],"emir-ebu-ishak-kazeruni-tekkesi-turbesi-konya":[[3,"161–162"]],"sut-tekkesi-ferhuniye-mescidi-ve-keykavus-kizi-turbesi-konya":[[3,"163"]],"kalenderhane-kalender-baba-turbesi-konya":[[3,"164–166"]],"ulas-baba-kumbeti-konya":[[3,"167–170"]],"kesikbas-kumbeti-konya":[[3,"173–174"]],"ii-kilicarslan-kumbeti-kumbet-hane-konya":[[3,"175–182"]],"i-izzettin-keykavus-yarim-anonim-kumbeti-konya":[[3,"183–184"]],"tacul-vezir-kumbeti-konya":[[3,"185"]],"emirgazi-emrullah-gazi-turbesi-konya":[[3,"187"]],"mustafa-turabi-kazan-dede-turbesi-konya":[[3,"188–189"]],"seyit-mahmut-hayrani-turbesi-konya":[[3,"190–195"]],"seyh-eyup-yagli-dede-turbesi-konya":[[3,"197–198"]],"tacettin-dede-turbesi-konya":[[3,"199–200"]],"yarim-anonim-turbe-konya":[[3,"201–202"]],"yazlica-koyu-kuzucu-sultan-kumbeti-konya":[[3,"203"]],"halife-sultan-turbesi-konya":[[3,"204–205"]],"seyit-harun-veli-turbesi-konya":[[3,"206–207"]],"sultan-hatun-turbesi-konya":[[3,"209–210"]],"sahip-ata-sultan-hamami-konya":[[3,"213–214"]],"hatipoglu-hasbeyoglu-hamami-konya":[[3,"215–217"]],"mahkeme-yeni-hamami-konya":[[3,"218–220"]],"sifa-hamami-konya":[[3,"221–223"]],"rustem-pasa-sifa-hamami-konya":[[3,"224–226"]],"seyyit-harun-veli-hamami-konya":[[3,"228–231"]],"hoca-fakih-cesmesi-konya":[[3,"232"]],"safaci-cesmesi-konya":[[3,"233"]],"haci-veyis-cesmesi-konya":[[3,"234"]],"bagevliya-camii-cesmesi-konya":[[3,"235"]],"karakayis-sari-cami-cesmesi-konya":[[3,"237"]],"kucuk-ayasofya-mescidi-cesmesi-konya":[[3,"238"]],"hocacihan-sarnici-konya":[[3,"239"]],"deli-osman-hani-konya":[[3,"243–244"]],"akyokus-hoca-cihan-hani-konya":[[3,"245–246"]],"kiziloren-kurucesme-hani-konya":[[3,"248–250"]],"emir-kandemir-hani-konya":[[3,"252–254"]],"inlice-han-konya":[[3,"255"]],"sukran-mescidi-zemin-kat-dukkan-ve-magaza-konya":[[3,"256–257"]],"vakif-is-hani-vakiflar-bolge-mudurlugu-hizmet-binasi-konya":[[3,"257–258"]],"elikesik-han-konya":[[3,"259–260"]],"dokuzun-derbent-sadiye-igdisleri-hani-konya":[[3,"261–262"]],"zazadin-sadeddin-kopek-hani-konya":[[3,"263–266"]],"horozlu-ruzbe-han-konya":[[3,"269–270"]],"dedeler-hani-konya":[[3,"271"]],"zalmanda-hani-konya":[[3,"272"]],"zivarik-han-konya":[[3,"274–275"]],"cagalzade-bedesteni-konya":[[3,"277–278"]],"rustem-pasa-kervansarayi-konya":[[3,"279–280"]],"raziye-hatun-sultan-kervansarayi-konya":[[3,"283–284"]],"kazan-hoyugu-koyu-tas-han-konya":[[3,"286"]],"yusuf-aga-abit-celebi-kutuphanesi-konya":[[3,"289–291"]],"konut-konya":[[3,"292–298"]],"habib-i-neccar-camii-ve-kulliyesi-hatay":[[4,"55–72"]],"ulu-camii-ve-kulliyesi-hatay":[[4,"73–94"]],"sokullu-mehmet-pasa-kulliyesi-hatay":[[4,"95–120"]],"meydan-camii-ve-kulliyesi-hatay":[[4,"121–138"]],"kanuni-sultan-suleyman-kervansarayi-hatay":[[4,"139–158"]],"seyh-ali-cami-ve-kulliyesi-hatay":[[4,"159–176"]],"mustafa-sevki-pasa-camii-ve-kulliyesi-hatay":[[4,"177–192"]],"ali-cavus-mescidi-hatay":[[4,"194–197"]],"affan-ertugrul-camii-hatay":[[4,"198–205"]],"agca-mescit-hatay":[[4,"206–211"]],"ahmediye-camii-hatay":[[4,"212–217"]],"debruz-mescidi-hatay":[[4,"218–221"]],"deveci-bekiroglu-camii-hatay":[[4,"222–225"]],"emirler-camii-hatay":[[4,"226–231"]],"hedbeli-mescidi-hatay":[[4,"232–237"]],"halil-aga-camii-hatay":[[4,"238–243"]],"hunkar-mescidi-hatay":[[4,"244–249"]],"kiremitli-camii-hatay":[[4,"250–257"]],"karhane-mescidi-hatay":[[4,"258–263"]],"kantara-camii-hatay":[[4,"264–271"]],"kurt-fakih-tufaki-camii-hatay":[[4,"272–277"]],"mahremiye-camii-hatay":[[4,"278–283"]],"nihat-aga-mescidi-hatay":[[4,"284–287"]],"nakip-camii-hatay":[[4,"288–297"]],"osmaniye-camii-hatay":[[4,"298–301"]],"orhanli-camii-hatay":[[4,"302–305"]],"rifataga-civelek-mescidi-hatay":[[4,"306–309"]],"sarimiye-camii-hatay":[[4,"310–315"]],"sofular-camii-hatay":[[4,"316–321"]],"seyh-muhammet-camii-hatay":[[4,"322–325"]],"senkoy-seyh-ahmet-kuseyri-camii-hatay":[[4,"326–333"]],"sekercik-camii-hatay":[[4,"334–337"]],"uctum-mescidi-hatay":[[4,"338–341"]],"zuveroglu-camii-hatay":[[4,"342–345"]],"caferiye-mescid-hatay":[[4,"346–349"]],"degirmenyolu-mescid-okul-hatay":[[4,"350–353"]],"fatikli-camii-hatay":[[4,"354–359"]],"mustafali-camii-hatay":[[4,"360–363"]],"narduzu-camii-hatay":[[4,"364–367"]],"yenisehir-camii-hatay":[[4,"368–373"]],"ebul-futtuh-camii-hatay":[[4,"374–377"]],"kasimbey-camii-hatay":[[4,"378–381"]],"selvili-camii-hatay":[[4,"382–385"]],"semerciler-camii-hatay":[[4,"386–389"]],"terzi-mehmet-camii-hatay":[[4,"390–393"]],"kaptanpasa-camii-minaresi-hatay":[[4,"394–402"]],"seyh-abdurrahman-turbesi-hatay":[[4,"404–405"]],"seyh-hidir-turbesi-hatay":[[4,"406–407"]],"seyh-hizir-turbesi-hatay":[[4,"408–409"]],"seyh-hizir-makami-hatay":[[4,"410–411"]],"el-arabi-turbesi-hatay":[[4,"412–413"]],"seyh-ibrahim-ve-seyh-ali-turbesi-hatay":[[4,"414–415"]],"seyh-hidir-turbesi-hatay-2":[[4,"416–417"]],"seyh-hasan-turbesi-hatay":[[4,"418–419"]],"beyazid-i-bestami-turbesi-hatay":[[4,"420–423"]],"seyh-turhan-reyhani-turbesi-hatay":[[4,"424–425"]],"seyh-kasem-turbesi-hatay":[[4,"426–427"]],"seyh-isa-turbesi-hatay":[[4,"428–429"]],"seyh-hizir-turbesi-hatay-2":[[4,"430–431"]],"koyunoglu-seyh-ali-issuvayre-turbesi-hatay":[[4,"432–433"]],"seyh-hasan-mekzun-el-sincari-makami-hatay":[[4,"434–435"]],"seyh-hasan-gatelli-turbesi-hatay":[[4,"436–437"]],"mizrakli-seyh-hasan-el-hekim-turbesi-hatay":[[4,"438–442"]],"suryani-katolik-kilisesi-hatay":[[4,"444–445"]],"maryo-hanna-kilisesi-hatay":[[4,"446–447"]],"rum-katolik-kilisesi-hatay":[[4,"448–449"]],"rum-ortodoks-kilisesi-hatay":[[4,"450–451"]],"yogunoluk-koyu-ermeni-kilisesi-hatay":[[4,"452–456"]],"butik-otel-hatay":[[4,"462–463"]],"reyhanli-yenisehir-degirmeni-hatay":[[4,"464–465"]],"kurtulus-beyhan-hamami-hatay":[[4,"466–467"]],"kursunlu-han-hatay":[[4,"468–473"]],"kircaoglu-hoyugu-hatay":[[4,"474–478"]],"samandag-vakifli-koyu-konut-hatay":[[4,"480–481"]],"vakif-kultur-konaklari-hatay":[[4,"482–483"]],"4-mintika-78-parsel-eski-ev-hatay":[[4,"484–485"]],"3-mintika-466-parsel-konut-hatay":[[4,"486–489"]]};
const YAYINLAR_ADRESI = "https://www.vakifkatilim.com.tr/tr/hakkimizda/medya-merkezi/yayinlarimiz";
const KAYNAK_IKON = {
  kitap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z"/></svg>`,
  dis: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>`
};

function kaynakKartiEkle(eserId) {
  const kart = document.getElementById("eser-karti");
  const kayitlar = ESER_KAYNAKLARI[eserId];
  if (!kart || !kayitlar || kart.querySelector(".kaynak-kart")) return;
  const bilgiKartlari = Array.from(kart.querySelectorAll(".kart")).filter((k) => k.querySelector(".olgu"));
  const yer = bilgiKartlari[bilgiKartlari.length - 1];
  if (!yer) return;
  const satirlar = kayitlar.map(([no, aralik]) => {
    const kitap = KAYNAK_KITAPLARI[no];
    return `<div class="kaynak-satir">
        <span class="kaynak-ikon">${KAYNAK_IKON.kitap}</span>
        <span class="kaynak-yazi"><b>${guvenli(kitap.baslik)}</b>
          <small><span>${guvenli(kitap.yayinci)}</span> · <span>${kitap.yil}</span>${aralik ? ` · <span>s. ${aralik}</span>` : ""}</small></span>
      </div>`;
  }).join("");
  yer.insertAdjacentHTML("afterend", `
    <div class="kart kaynak-kart">
      <span class="kart-baslik">KAYNAKLAR</span>
      ${satirlar}
      <a class="kaynak-ac" href="${YAYINLAR_ADRESI}" target="_blank" rel="noopener"><span>Yayını aç</span>${KAYNAK_IKON.dis}</a>
      <small class="kaynak-not">Bilgilerin yanındaki sayfa numaraları bu kitaba aittir.</small>
    </div>`);
}

const kaynaksizEserKarti = eserKartiniAc;
eserKartiniAc = function (eserId) {
  kaynaksizEserKarti(eserId);
  try { kaynakKartiEkle(eserId); } catch (hata) { console.warn("Kaynaklar kartı", hata); }
};

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {"KAYNAKLAR": "SOURCES", "Yayını aç": "Open publication", "Bilgilerin yanındaki sayfa numaraları bu kitaba aittir.": "Page numbers next to the facts refer to this book.", "Bursa Vakıf Eserleri, I. ve II. Cilt (Osmangazi, Yıldırım)": "Bursa Endowed Monuments, Volumes I and II (Osmangazi, Yıldırım)", "Bursa Vakıf Eserleri, III. Cilt (Diğer İlçeler)": "Bursa Endowed Monuments, Volume III (Other Districts)", "Konya Vakıf Eserleri Envanteri, I. Cilt": "Konya Endowed Monuments Inventory, Volume I", "Konya Vakıf Eserleri Envanteri, II. Cilt": "Konya Endowed Monuments Inventory, Volume II", "Hatay İli Vakıf Eserleri": "Endowed Monuments of Hatay Province"});
  if (typeof KALIPLAR !== "undefined") KALIPLAR.push([/^s\. (\d+(?:–\d+)?)$/, (m) => `p. ${m[1]}`]);
});


/* ================= OYUN: GERÇEK OYUN PAKETİ ================= */
// oyun.js artık Rabia'nın "Vakfını kur" oyununun derlenmiş paketi (rabialtndl/vakfiye, npm run build:gomulu).
// Oyun kendi stilleriyle Shadow DOM içinde çalışır; görselleri oyun.js'in yanındaki binalar/, insanlar/,
// harita.webp ve vakfiye-parsomen.webp dosyalarından okur. Burada oyuna sözleşmedeki ek araçları veriyoruz.

// Bina panelindeki "Gerçek örnekler": oyunun istediği türdeki eserler (hamam, han, medrese, çeşme...)
oyunAraclari.eserler = (turler) => Promise.resolve(
  ESERLER.filter((e) => turler.includes(e.turId)).map((e) => ({
    id: e.id, ad: e.ad, il: e.il.toLocaleLowerCase("tr"), tur: e.turId, ilce: e.ilce,
    gorsel: `foto/${e.id}/01.jpg`,
    // Oyun binayı en iyi gösteren fotoğrafı seçer; olmayan numaraya düşerse 01'e döner
    gorseller: ["01", "02", "03", "04", "05"].map((n) => `foto/${e.id}/${n}.jpg`)
  }))
);

// Oyunda bir esere dokununca Keşfet'e geçip o eserin kartını aç
oyunAraclari.eserAc = (id) => {
  if (window.VakfiyeOyun) VakfiyeOyun.durdur();
  oyunAcik = false;
  sekmeyeGec("kesfet");
  eserKartiniAc(id);
};

// Oyun, uygulamanın o anki dilinde açılır (oyuncu oyunun içinden yine değiştirebilir)
Object.defineProperty(oyunAraclari, "dil", {
  enumerable: true,
  get: () => (document.documentElement.lang === "en" ? "en" : "tr")
});

// Pullar sonradan gelirse (girişte hesapla eşitlenince) oyun yeniden okusun
const eskiPullariEsitleOyun = typeof pullariEsitle === "function" ? pullariEsitle : null;
if (eskiPullariEsitleOyun) {
  pullariEsitle = async function (...args) {
    const sonuc = await eskiPullariEsitleOyun.apply(this, args);
    window.dispatchEvent(new Event("vakfiye:pullar"));
    return sonuc;
  };
}

// Arkadaştan gelen meydan okuma bağlantısı (?meydan=...): uygulama açılınca doğrudan Oyun sekmesine geç
if (new URLSearchParams(location.search).has("meydan")) {
  const oyunaGec = () => {
    const ana = document.getElementById("ana");
    if (ana && ana.hidden) return setTimeout(oyunaGec, 400);   // tanıtım bitene kadar bekle
    document.querySelector('.menu button[data-sekme="oyun"]')?.click();
  };
  if (document.readyState === "complete") oyunaGec();
  else window.addEventListener("load", oyunaGec);
}


/* ================= OYUN: YATAY EKRAN ================= */
// Oyun telefonda yatay ekranda oynanır. Oyun sekmesi açıkken body'ye "oyun-acik" sınıfı eklenir:
// dikeyde "telefonunu yatay çevir" uyarısı çıkar, yatayda oyun bütün ekranı kaplar (stil.css aynı başlık).

const eskiSekmeyeGecYatay = sekmeyeGec;
sekmeyeGec = function (sekme) {
  eskiSekmeyeGecYatay(sekme);
  document.body.classList.toggle("oyun-acik", sekme === "oyun");
  // Uyarı alt menüyü örtmesin: kullanıcı başka sekmeye geçebilsin
  const menu = document.querySelector(".menu"), uyari = document.querySelector(".oyun-yatay-uyari");
  if (menu && uyari) uyari.style.bottom = menu.offsetHeight + "px";
  if (sekme !== "oyun" && document.fullscreenElement) document.exitFullscreen().catch(() => { });
};

(function yatayUyarisiKur() {
  const uyari = document.createElement("div");
  uyari.className = "oyun-yatay-uyari";
  uyari.innerHTML = `
    <div class="oyun-yatay-kart">
      <svg class="oyun-yatay-ikon" viewBox="0 0 64 64" aria-hidden="true">
        <rect x="22" y="8" width="20" height="34" rx="3"/>
        <rect x="14" y="38" width="36" height="18" rx="3" class="oyun-yatay-yeni"/>
        <path d="M50 18a14 14 0 0 1 4 12"/><path d="M51 31l3 -1 1 3"/>
      </svg>
      <strong>Telefonunu yatay çevir</strong>
      <p>Oyun yatay ekranda tam boyutta açılır.</p>
      <p class="oyun-yatay-not">Çevirince dönmüyorsa telefonun ekran döndürme kilidini kapat.</p>
      <button type="button" class="oyun-yatay-tam" hidden>Tam ekran aç</button>
      <button type="button" class="oyun-yatay-gec">Dikey oynamaya devam et</button>
    </div>`;
  document.getElementById("ana").appendChild(uyari);

  // Android'de tam ekrana geçip yönü yataya kilitleyebiliriz (iPhone desteklemez, düğme gizli kalır)
  const tam = uyari.querySelector(".oyun-yatay-tam");
  if (document.fullscreenEnabled && screen.orientation && screen.orientation.lock) tam.hidden = false;
  tam.addEventListener("click", async () => {
    try {
      await document.documentElement.requestFullscreen();
      await screen.orientation.lock("landscape");
    } catch (hata) { }
  });

  uyari.querySelector(".oyun-yatay-gec").addEventListener("click", () => {
    document.body.classList.add("oyun-dikey-tamam");
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "Telefonunu yatay çevir": "Turn your phone sideways",
    "Oyun yatay ekranda tam boyutta açılır.": "The game opens full size in landscape.",
    "Çevirince dönmüyorsa telefonun ekran döndürme kilidini kapat.": "If the screen doesn't rotate, turn off your phone's rotation lock.",
    "Tam ekran aç": "Open full screen",
    "Dikey oynamaya devam et": "Keep playing in portrait"
  });
});
