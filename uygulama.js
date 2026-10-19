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
    metin: "Han ve dükkânların kirası aşevini, medreseyi, çeşmeyi yaşattı. Vakfiye, Bursa'daki vakıf eserlerinde bu iyiliğin izini sürer."
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
    if (typeof secilenSehir !== "undefined" && (eser.il || "Bursa") !== secilenSehir) return false;
    if (secilenTur !== "Tümü" && eser.tur !== secilenTur) return false;
    const metin = sadele(eser.ad + " " + eser.ilce + " " + eser.banisi);
    return metin.includes(aranan);
  });

  // 2) Sayacı yaz
  document.getElementById("sayac").textContent = `${sonuc.length} / ${ESERLER.filter((e) => (e.il || "Bursa") === secilenSehir).length} eser`;
  // 3) Satırları oluştur
  document.getElementById("liste").innerHTML = sonuc.length === 0
    ? `<p style="padding:12px 14px;margin:0">Aramana uyan eser yok.</p>`
    : sonuc.map((eser) => `
        <button class="satir" data-id="${eser.id}">
          <span class="simge ${["cami", "mescit", "kulliye"].includes(eser.turId) ? eser.turId : "diger"}">${eserGorseli(eser)}</span>
          <span>
            <b>${eser.ad}</b>
            <small>${eser.tur} · ${eser.ilce}${eser.donem ? " · " + eser.donem : ""}</small>
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
// Cevap uydurulmaz: sorunun kelimeleri eserin envanter bilgileriyle karşılaştırılır,
// en çok benzeyen bilgi kaynağıyla gösterilir. Hiçbiri benzemezse "bilgi yok" denir.

// Soruda anlam taşımayan kelimeler
const DURAK_KELIMELER = ["neydi", "nedir", "kimdi", "hangi", "nasil", "nereden", "midir",
 "mi", "mu", "var", "ne", "kac", "bu", "bir", "ve", "ile", "icin", "da", "de"];


// Sorudaki bu kelimeler, o kategorideki bilgilere ek puan verir
const KATEGORI_IPUCU = {
  tarihce: ["kim", "yaptir", "kurdu", "insa", "yil", "tarih", "ne zaman"],
  vakif: ["vakif", "vakf", "bagis", "gelir", "para", "akce", "imam"],
  onarim: ["onar", "tamir", "restor", "yikil", "deprem"],
  gunumuz: ["bugun", "gunumuz", "simdi", "nerede", "adres", "konum"],
  mimari: ["mimari", "plan", "olcu", "malzeme", "minare", "kubbe"]
};

// Aynı anlama gelen kökler: "restore edildi" ile "onarıldı" eşleşsin
const ESANLAMLI = { resto: "onari", tamir: "onari", yenil: "onari", yapil: "yapti", insa: "yapti", yaptr: "yapti", nered: "almak", adres: "almak", konum: "almak", bulun: "almak" };

// Kelimelerin ilk 5 harfi: "onarıldı" ile "onarım" aynı köke düşer
function kokler(yazi) {
  return sadele(yazi)
    .replace(/[^a-z0-9 ]/g, " ")
    .split(" ")
    .filter((k) => k.length >= 4 && !DURAK_KELIMELER.includes(k))
    .map((k) => k.slice(0, 5))
    .map((k) => ESANLAMLI[k] || k);
}

function cevapBul(eser, soru) {
  const soruKokleri = kokler(soru);
  const soruSade = sadele(soru);
  let enIyi = null;
  let enYuksekPuan = 0;

  eser.olgular.forEach((olgu) => {
    const olguKokleri = kokler(olgu.metin);
    let puan = 0;
    soruKokleri.forEach((k) => { if (olguKokleri.includes(k)) puan += 2; });
    (KATEGORI_IPUCU[olgu.kategori] || []).forEach((ipucu) => {
      if (soruSade.includes(ipucu)) puan += 1;
    });
    if (puan > enYuksekPuan) { enYuksekPuan = puan; enIyi = olgu; }
  });

  return enYuksekPuan >= 2 ? enIyi : null;
}

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

function sor(soru) {
  const cevap = cevapBul(acikEser, soru);
  const sohbet = document.getElementById("sohbet");

  sohbet.insertAdjacentHTML("beforeend", `<div class="balon soru">${soru}</div>`);
  sohbet.insertAdjacentHTML("beforeend", cevap
    ? `<div class="balon cevap">${cevap.metin}<br>
         <span class="etiket">Kaynaklı</span><span class="sayfa-no">envanter s. ${cevap.sayfa}</span>
       </div>`
    : `<div class="balon yok">Kaynaklarımızda bu bilgi yok.</div>`);

  sohbet.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
}

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
      <button class="kamera-dugme" id="kamera-ac">📷 Kamerayı aç</button>
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
            <small>Bursa rotası${pullar.includes(durak.id) ? " · pul alındı ✓" : ""}</small></span>
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

  if (pullar.length === ROTA.length) bildir("🏅 Rozet kazandın: Bursa rotası tamam!");
  else if (pullar.length === 3) bildir("🏅 Rozet kazandın: Yarı yol!");
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
  const sayi = pullar.length;
  const rozetler = [
    { simge: "🧭", ad: "İlk adım", aciklama: "İlk pulunu al", gereken: 1 },
    { simge: "🌙", ad: "Yarı yol", aciklama: "Rotada 3 pul topla", gereken: 3 },
    { simge: "🏛️", ad: "Bursa rotası tamam", aciklama: "6 pulun hepsini topla", gereken: 6 }
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

    <div class="kart">
      <div class="pul-sayac">
        <span class="kart-baslik">BURSA ROTASI</span>
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
    if (ROTA.some((d) => d.id === id)) { pulAl(id); return; }
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
let secilenSehir = "Bursa";

function eserSehri(eser) {
  return eser.il || "Bursa";
}

function sehrinEserleri() {
  return ESERLER.filter((e) => eserSehri(e) === secilenSehir);
}

function sehirPaneliniAc() {
  const satirlar = SEHIRLER.map((sehir) => {
    const sayi = ESERLER.filter((e) => eserSehri(e) === sehir.ad).length;
    const acik = sayi > 0;
    return `
      <button class="sehir-satir${sehir.ad === secilenSehir ? " secili" : ""}" ${acik ? `data-sehir="${sehir.ad}"` : "disabled"}>
        <b>${sehir.ad}</b>
        <small>${acik ? sayi + " eser" : "Yakında"}</small>
      </button>`;
  }).join("");

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
  if (tumuDugmesi) tumuDugmesi.textContent = "Tüm " + ad;
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
    harita.setView(sehir.merkez, 15);
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
      <a class="eylem birincil" href="${adres.google}" target="_blank" rel="noopener">🧭 Yol tarifi</a>
      <button class="eylem" data-haritada-gor="${eser.id}">🗺️ Haritada gör</button>
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
    "🧭 Yol tarifi": "🧭 Directions", "🗺️ Haritada gör": "🗺️ Show on map",
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