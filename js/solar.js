/**
 * ☀️ GÜNEŞ KONUMU & GECE-GÜNDÜZ SINIRI (TERMINATÖR)
 *
 * Bu dosya, "Ultra Gerçekçi Mod"un ASTRONOMİ ÇEKİRDEĞİDİR: güneşin O ANDA
 * nereye dik vurduğunu ve verilen bir noktada ufuk üstü yüksekliğini hesaplar.
 *
 * Gece-gündüz sınırı eskiden burada POLİGON olarak üretiliyordu
 * (`nightPolygon`); artık terminatör piksel başına shader'da çiziliyor
 * (bkz. js/globe_sky.js · GeceKatmani), o yüzden poligon matematiği kaldırıldı.
 * `elevation()` ise kaldı ve işlevi daha da önemli: shader'ın kullandığı
 * `dot(yüzeyNormali, güneşYönü)` ölçütünün BAĞIMSIZ doğrulayıcısıdır
 * (bkz. tools/solar_test.js).
 *
 * NEDEN AYRI DOSYA: `js/mutlak_konum.js` içindeki güneş yardımcıları bilinçli
 * olarak SADELEŞTİRİLMİŞTİR (21 Haziran → 23,45° gibi sabit deklinasyonlar,
 * yalnızca öğle vakti açısı). Müfredat için doğru, gerçek zamanlı bir
 * terminatör için yetersiz: burada tarihe bağlı deklinasyon, ekliptik boylam
 * düzeltmesi ve Greenwich saat açısı gerekiyor. Karıştırmak yerine ayırdım;
 * oradaki öğretici basitlik bozulmadı.
 *
 * DOĞRULUK: Yaklaşık ~0,01° (NOAA'nın "low accuracy" güneş algoritması).
 * Gözle görülen bir terminatör için fazlasıyla yeterli — 0,01° yer yüzünde
 * ~1 km'dir, kürenin tamamı ekranda 300 px iken 0,03 px eder.
 *
 * Hesap zinciri (hepsi derece cinsinden, UTC):
 *   n        : J2000'den (1 Ocak 2000 12:00 UTC) itibaren geçen gün
 *   L        : güneşin ortalama boylamı
 *   g        : ortalama anomali (yörüngenin eliptikliği)
 *   lambda   : gerçek ekliptik boylam (L + merkez denklemi düzeltmesi)
 *   epsilon  : ekliptik eğimi (eksen eğikliği, ~23,44°)
 *   decl     : deklinasyon  = asin(sin ε · sin λ)   → güneşin dik vurduğu ENLEM
 *   alpha    : rektasansiyon = atan2(cos ε · sin λ, cos λ)
 *   GMST     : Greenwich ortalama yıldız zamanı
 *   boylam   : alpha - GMST                          → dik vurduğu BOYLAM
 */
const Solar = {
  RAD: Math.PI / 180,

  _norm360(x) { const v = x % 360; return v < 0 ? v + 360 : v; },
  _norm180(x) { const v = this._norm360(x); return v > 180 ? v - 360 : v; },

  /** J2000'den itibaren gün sayısı (kesirli) */
  _gunJ2000(date) {
    return (date.getTime() / 86400000) + 2440587.5 - 2451545.0;
  },

  /**
   * Güneşin O AN dik vurduğu nokta (subsolar point).
   * @returns {{lat:number, lng:number, decl:number}} derece
   */
  subsolarPoint(date = new Date()) {
    const n = this._gunJ2000(date);
    const R = this.RAD;

    const L = this._norm360(280.460 + 0.9856474 * n);        // ortalama boylam
    const g = this._norm360(357.528 + 0.9856003 * n);        // ortalama anomali
    // Merkez denklemi: yörünge dairesel olmadığı için gerçek boylam sapar
    const lambda = this._norm360(L + 1.915 * Math.sin(g * R) + 0.020 * Math.sin(2 * g * R));
    const epsilon = 23.439 - 0.0000004 * n;                  // eksen eğikliği

    const decl = Math.asin(Math.sin(epsilon * R) * Math.sin(lambda * R)) / R;
    const alpha = Math.atan2(
      Math.cos(epsilon * R) * Math.sin(lambda * R),
      Math.cos(lambda * R)
    ) / R;

    // GMST (saat) → dereceye çevrilir. Saat açısı = GMST - alpha olduğundan
    // güneşin dik vurduğu boylam = alpha - GMST'dir.
    const gmstSaat = (18.697374558 + 24.06570982441908 * n) % 24;
    const gmstDerece = ((gmstSaat < 0 ? gmstSaat + 24 : gmstSaat)) * 15;

    // `gmst` dışa veriliyor: yıldız katmanı göksel çerçeveden Dünya-sabit
    // çerçeveye geçmek için AYNI GMST'yi kullanmak zorunda (λ = ra − GMST).
    // İki ayrı GMST hesabı, güneş ile yıldızların birbirinden kaymasına yol açar.
    return { lat: decl, lng: this._norm180(alpha - gmstDerece), decl, gmst: gmstDerece };
  },

  /**
   * Bir noktada güneşin ufuk üstü yüksekliği (derece).
   * Terminatör hesabının BAĞIMSIZ doğrulayıcısıdır: sınır üzerindeki her
   * noktada bu değer hedef yüksekliğe (0°, -6°, -12°) eşit çıkmalıdır.
   */
  elevation(lat, lng, date = new Date()) {
    const s = this.subsolarPoint(date);
    const R = this.RAD;
    const H = (lng - s.lng) * R;                             // saat açısı
    const sinYuk = Math.sin(lat * R) * Math.sin(s.decl * R) +
                   Math.cos(lat * R) * Math.cos(s.decl * R) * Math.cos(H);
    return Math.asin(Math.max(-1, Math.min(1, sinYuk))) / R;
  }
};

// Node ortamında (testler) de kullanılabilsin
if (typeof module !== 'undefined' && module.exports) module.exports = { Solar };
