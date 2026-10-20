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
    { simge: "🧭", ad: "İlk adım", aciklama: "İlk pulunu al", gereken: 1 },
    { simge: "🌙", ad: "Yarı yol", aciklama: "Rotada 3 pul topla", gereken: 3 },
    { simge: "🏛️", ad: rotaAdi() + " tamam", aciklama: "6 pulun hepsini topla", gereken: 6 }
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
let secilenSehir = "Bursa";
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
        <span class="sade-not">Eser kartındaki 🔊 Sesli dinle düğmesi bilgileri seçili dilde okur.</span>
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
  if (dugme) dugme.textContent = caliyor ? "⏹ Durdur" : "🔊 Sesli dinle";
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
      `<button class="dinle-dugme" id="dinle-dugme">🔊 Sesli dinle</button>`);
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
    "Eser kartındaki 🔊 Sesli dinle düğmesi bilgileri seçili dilde okur.": "The 🔊 Listen button on a monument card reads its details aloud in the selected language.",
    "🔊 Sesli dinle": "🔊 Listen", "⏹ Durdur": "⏹ Stop"
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

// Erişim anahtarı süresi dolduysa yenile
async function gecerliToken() {
  if (oturum === null || oturum.yenile === undefined) return null;
  if (Date.now() < oturum.bitis - 60000) return oturum.erisim;
  const yanit = await bulutIstek("/auth/v1/token?grant_type=refresh_token", { yontem: "POST", govde: { refresh_token: oturum.yenile } });
  oturumuKaydet(yanit, oturum.ad);
  return oturum.erisim;
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
    pullariEsitle().catch(() => {});
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
  if (oturum && oturum.id) pullariEsitle().catch(() => {});
};

// Çıkış yaparken sunucudaki oturumu da kapat
document.addEventListener("click", (olay) => {
  if (olay.target.closest('[data-ayar="cikis"]') && oturum && oturum.erisim) {
    bulutIstek("/auth/v1/logout", { yontem: "POST", token: oturum.erisim }).catch(() => {});
  }
}, true);

// Eski (yalnızca cihazda tutulan) oturum varsa yeniden giriş istensin
if (oturum && oturum.ad && oturum.id === undefined) {
  oturum = null;
  try { localStorage.removeItem("vakfiye:oturum"); } catch (hata) { }
}
// Uygulama açılınca pulları eşitle
if (oturum && oturum.id) pullariEsitle().catch(() => {});

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
    if (kisa) { oturum = JSON.parse(kisa); pullariEsitle().catch(() => {}); }
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
      <span class="profil-harf" aria-hidden="true">${uye ? oturum.ad.charAt(0).toLocaleUpperCase("tr") : "👤"}</span>
      <span class="profil-yazi">
        <b>${uye ? oturum.ad : "Misafir"}</b>
        <small>${uye ? oturum.eposta : "Üye ol, pulların kaybolmasın"}</small>
      </span>
    </div>
    ${uye ? "" : `<button class="dugme-ana cekmece-uye" data-menu-is="uye-ol">Üye ol / Giriş yap</button>`}

    <span class="cekmece-baslik">Gezi</span>
    <button class="cekmece-satir" data-menu-is="pasaport"><span>🛂 Pasaportum</span><span class="cekmece-deger">${pullar.length} pul</span></button>
    <button class="cekmece-satir" data-menu-is="sehir"><span>📍 Şehir</span><span class="cekmece-deger">${secilenSehir}</span></button>

    <span class="cekmece-baslik">Ayarlar</span>
    <div class="cekmece-dil" role="group" aria-label="Dil">
      <button class="${dilSimdi === "tr" ? "secili" : ""}" data-menu-is="dil-tr">Türkçe</button>
      <button class="${dilSimdi === "en" ? "secili" : ""}" data-menu-is="dil-en">English</button>
    </div>
    ${anahtar("buyuk", "Büyük yazı", erisim.buyuk)}
    ${anahtar("kontrast", "Yüksek kontrast", erisim.kontrast)}
    <span class="sade-not">Eser kartındaki 🔊 Sesli dinle düğmesi bilgileri seçili dilde okur.</span>

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
    if (oturum && oturum.erisim) bulutIstek("/auth/v1/logout", { yontem: "POST", token: oturum.erisim }).catch(() => {});
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
    "Gezi": "Trip", "🛂 Pasaportum": "🛂 My passport", "📍 Şehir": "📍 City", "Profil ve ayarlar": "Profile and settings",
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
        <span class="sergi-satir">📍 ${s.yer}</span>
        <span class="sergi-satir">🗓️ <span>${s.tarihYazi}</span></span>
        <p class="sergi-aciklama">${s.aciklama}</p>
        <div class="sergi-eylem">
          ${durum === "bitti" ? "" : `<a class="kucuk-dugme" href="${yol}" target="_blank" rel="noopener">🧭 Yol tarifi</a>`}
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
    `<button class="cekmece-satir" data-sergiler><span>🖼️ Sergiler</span><span class="cekmece-deger">${acik ? acik + " açık" : ""}</span></button>
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
      <span class="sergi-duyuru-simge" aria-hidden="true">🖼️</span>
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
    "SERGİLER": "EXHIBITIONS", "Sergiler": "Exhibitions", "🖼️ Sergiler": "🖼️ Exhibitions",
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
      `<div class="deprem-notu" role="note"><span aria-hidden="true">⚠️</span><span>${DEPREM_NOTU}</span></div>`);
  }
};

function depremBandi() {
  const eski = document.getElementById("deprem-bandi");
  if (eski) eski.remove();
  if (typeof secilenSehir === "undefined" || secilenSehir !== "Hatay") return;
  document.getElementById("sayac").insertAdjacentHTML("beforebegin", `
    <div class="deprem-notu" id="deprem-bandi" role="note"><span aria-hidden="true">⚠️</span>
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
    `<button class="cekmece-satir" data-yukle><span>📲 Ana ekrana ekle</span><span class="cekmece-deger">›</span></button>
    <span class="cekmece-baslik">Ayarlar</span>`);
};

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SOZLUK === "undefined") return;
  Object.assign(SOZLUK, {
    "📲 Ana ekrana ekle": "📲 Add to home screen", "ANA EKRANA EKLE": "ADD TO HOME SCREEN",
    "Ana ekrana ekle": "Add to home screen", "Uygulama gibi, tam ekran açılır": "Opens full screen, like an app",
    "Safari'nin altındaki": "Tap the", "düğmesine bas": "button at the bottom of Safari",
    "Listeden": "Choose", "'yi seç.": ".", "Sağ üstteki Ekle'ye bas.": "Tap Add in the top right.", "Açılan pencerede Yükle'ye bas.": "Tap Install in the dialog that opens.",
    "Chrome'un sağ üstündeki": "Open Chrome's", "menüsünü aç.": "menu in the top right.",
    "Uygulamayı yükle": "Install app", "ya da": "or", "Ana Ekrana Ekle": "Add to Home Screen",
    "Paylaş": "Share"
  });
});
