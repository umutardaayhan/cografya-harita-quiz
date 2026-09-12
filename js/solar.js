/**
 * ☀️ GÜNEŞ KONUMU & GECE-GÜNDÜZ SINIRI (TERMINATÖR)
 *
 * Bu dosya, "Ultra Gerçekçi Mod"un çekirdeğidir: küre üzerinde güneşin O ANDA
 * nereye dik vurduğunu ve gece-gündüz sınırının nereden geçtiğini hesaplar.
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

    return { lat: decl, lng: this._norm180(alpha - gmstDerece), decl };
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
  },

  /**
   * Verilen boylamda, güneş yüksekliğinin `yukseklik` dereceye eşit olduğu ENLEM.
   *
   * Çözüm: sin(φ)·sin(δ) + cos(φ)·cos(δ)·cos(H) = sin(h)
   *   A·sin(φ) + B·cos(φ) = C   →   R·sin(φ + ψ) = C
   * burada R = √(A²+B²), ψ = atan2(B, A). İki kök çıkar; [-90°, 90°]
   * aralığındaki seçilir. |C/R| > 1 ise o boylamda sınır YOKTUR (meridyenin
   * tamamı aydınlık ya da tamamı karanlıktır) — bu durumda hangi kutba
   * kapanacağımıza ekvatordaki yüksekliğe bakarak karar veriyoruz, aksi halde
   * kutup gündüzü/gecesi olan bölgede poligon yırtılırdı.
   */
  terminatorLat(lng, date, yukseklik = 0) {
    const s = this.subsolarPoint(date);
    const R = this.RAD;
    const H = (lng - s.lng) * R;

    const A = Math.sin(s.decl * R);
    const B = Math.cos(s.decl * R) * Math.cos(H);
    const C = Math.sin(yukseklik * R);
    const Rad = Math.hypot(A, B);

    if (Rad < 1e-9) return null;
    const oran = C / Rad;
    if (Math.abs(oran) > 1) {
      // Sınır yok: bu meridyen baştan sona aydınlık ya da karanlık
      return { kutup: this.elevation(0, lng, date) > yukseklik ? null : (s.decl >= 0 ? -90 : 90) };
    }

    const psi = Math.atan2(B, A);
    const k1 = Math.asin(oran) - psi;
    const k2 = Math.PI - Math.asin(oran) - psi;
    const adaylar = [k1, k2].map(v => v / R).filter(v => v >= -90.0001 && v <= 90.0001);
    if (!adaylar.length) return null;
    // İki kök de aralıktaysa karanlık yarımküreye bakan (deklinasyonun
    // tersi işaretli) kök sınırı verir.
    const lat = adaylar.length === 1
      ? adaylar[0]
      : adaylar.reduce((a, b) => (Math.abs(a - (-s.decl)) < Math.abs(b - (-s.decl)) ? a : b));
    return { lat: Math.max(-90, Math.min(90, lat)) };
  },

  /**
   * GECE POLİGONU — GeoJSON `Polygon.coordinates` (tek halka, [lng, lat]).
   *
   * Halka -180°'den +180°'e terminatör enlemlerini izler, sonra KARANLIK
   * kutuptan (kışın hangi kutup geceyse) kapanır. Bu biçim düzlemsel olarak
   * güvenlidir: antimeridyeni kesmez, kutup içermez → MapLibre'nin üçgenleme
   * adımı (earcut) bozulmaz. Küre projeksiyonunda gece yarımküresi olarak
   * görünür.
   *
   * @param {number} yukseklik  0 = geometrik sınır, -6 = sivil, -12 = deniz,
   *                            -18 = astronomik alacakaranlık
   */
  nightPolygon(date = new Date(), yukseklik = 0, adim = 2) {
    const s = this.subsolarPoint(date);
    const karanlikKutup = s.decl >= 0 ? -90 : 90;    // yaz kuzeydeyse güney kutbu karanlık
    const halka = [];

    for (let lng = -180; lng <= 180; lng += adim) {
      const c = this.terminatorLat(lng, date, yukseklik);
      if (!c) { halka.push([lng, karanlikKutup]); continue; }
      if (c.kutup === null) {
        // Meridyenin tamamı aydınlık: sınırı karanlık kutba yapıştır (sıfır alan)
        halka.push([lng, karanlikKutup]);
      } else if (typeof c.kutup === 'number') {
        halka.push([lng, c.kutup]);
      } else {
        halka.push([lng, c.lat]);
      }
    }

    // Karanlık kutup kenarından kapat
    halka.push([180, karanlikKutup]);
    halka.push([-180, karanlikKutup]);
    halka.push(halka[0].slice());
    return [halka];
  }
};

// Node ortamında (testler) de kullanılabilsin
if (typeof module !== 'undefined' && module.exports) module.exports = { Solar };
