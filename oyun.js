/* =====================================================================
   VAKFİYE · OYUN MODÜLÜ  ("Vakfını kur")
   Bu dosyayı oyun ekibi geliştirir. Uygulamayla anlaşma (sözleşme):

   1. Dışarıya TEK bir şey açılır: window.VakfiyeOyun
   2. Uygulama, Oyun sekmesi her açıldığında şunu çağırır:
        VakfiyeOyun.baslat(alan, araclar)
      alan    → oyunun çizileceği <main> kutusu (içini istediğin gibi doldur)
      araclar → uygulamanın oyuna verdiği yardımcılar:
                araclar.bildir("metin")   alttaki bildirimi gösterir
                araclar.pullar()           alınan pulların listesi (rozet kilidi için)
                araclar.kaydet(anahtar, deger) / araclar.oku(anahtar, varsayilan)
                                           oyunun kaydı (otomatik "vakfiye:oyun:" önekiyle)
   3. Oyun sekmesinden çıkılınca uygulama VakfiyeOyun.durdur() çağırır
      (zamanlayıcı, ses vb. varsa burada kapat).
   4. CSS sınıflarının hepsi "oyun-" ile başlar (uygulamanın stilleriyle çakışmasın).
      Renkler için uygulamanın değişkenlerini kullan: var(--ana-lacivert), var(--turkuaz) ...
   ===================================================================== */

(function () {
  let alan = null;
  let araclar = null;

  function baslat(gelenAlan, gelenAraclar) {
    alan = gelenAlan;
    araclar = gelenAraclar;
    ciz();
  }

  function durdur() {
    // Zamanlayıcı ya da animasyon varsa burada temizle.
  }

  // ---- Buradan aşağısı örnek; oyun ekibi kendi oyunuyla değiştirecek ----
  let sayac = 0;

  function ciz() {
    sayac = araclar.oku("deneme", 0);
    alan.innerHTML = `
      <div class="oyun-kart">
        <span class="oyun-baslik">VAKFINI KUR</span>
        <p>Oyun modülü bağlandı. Bu kutu oyun ekibinin örnek ekranı.</p>
        <p>Alınan pul sayısı: <b>${araclar.pullar().length}</b></p>
        <button class="oyun-dugme" id="oyun-dene">Deneme düğmesi (${sayac})</button>
      </div>`;

    document.getElementById("oyun-dene").addEventListener("click", () => {
      sayac++;
      araclar.kaydet("deneme", sayac);
      araclar.bildir("Oyun çalışıyor: " + sayac);
      ciz();
    });
  }

  window.VakfiyeOyun = { baslat, durdur };
})();