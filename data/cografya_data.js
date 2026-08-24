/**
 * 🌍 ÇALIŞMA ZAMANI VERİ KAPLARI (Runtime Data Containers)
 *
 * DİKKAT: Bu dosya artık VERİ İÇERMEZ. Coğrafi kayıtların tamamı
 * `data/packs/pack.*.js` paketlerinde yaşar ve `PackManager` tarafından
 * kullanıcının KURDUĞU paketlere göre buraya doldurulur.
 *
 *   Kaynak (authoring)  →  data/cografya_data.legacy.js   (elle düzenlenir)
 *   Derleyici           →  node tools/build_packs.js
 *   Dağıtım (DLC)       →  data/packs/*.js
 *   Çalışma zamanı      →  bu dosyadaki kaplar (PackManager doldurur)
 *
 * Kaplar bilinçli olarak YERİNDE (in-place) mutasyona uğratılır: `const` olsalar
 * da içerikleri değiştirilir, referansları asla yeniden atanmaz. Bu sayede
 * quiz.js / map.js / study_plan.js / oyun motorları bu global'leri eskisi gibi
 * kullanmaya devam eder; paket kurulup kaldırıldığında havuz kendiliğinden
 * güncellenir.
 */

/**
 * Türkçe-güvenli karşılaştırma yardımcısı.
 * JS'in varsayılan toLowerCase'i "İ" harfini "i + U+0307" (birleşik nokta)
 * yapar; bu yüzden ("İhraç").toLowerCase().includes("ihraç") FALSE döner.
 * Bu fonksiyon harfleri ASCII'ye indirger, böylece filtreler sessizce
 * başarısız olmaz.
 */
function trLower(str) {
  return String(str || '')
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .replace(/ı/g, 'i')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

/**
 * Türkçe-güvenli BÜYÜK harf. JS'in toUpperCase'i "i" harfini "I" yapar,
 * oysa Türkçede "İ" olmalıdır ("volkanik" -> "VOLKANİK", "VOLKANIK" değil).
 */
function trUpper(str) {
  return String(str || '').replace(/i/g, 'İ').replace(/ı/g, 'I').toUpperCase();
}

/**
 * Kurulu paketlerden türetilen coğrafi kayıt havuzu.
 * Şekil: { kategoriAnahtari: [ {id, name, category, type, lat, lng, ...}, ... ] }
 * Kurulu paketi olmayan kategoriler bu nesnede HİÇ BULUNMAZ (boş dizi bile
 * değil) — böylece rastgele kategori seçen oyun modları boş havuza düşmez.
 */
const COGRAFYA_DATA = {};

/** Kurulu paketlerden türetilen üst sekme listesi (canlı `count` ile) */
const CATEGORIES = [];

/**
 * Alt tür (oluşum) filtre rozetleri.
 * Filtreler artık DİLDEN BAĞIMSIZ `item.sub` dizisi üzerinden çalışır; eskiden
 * Türkçe `type` metnine bakan `includes()` zincirleri kullanılıyordu ve bu,
 * veri İngilizceye çevrildiğinde sessizce bozulurdu.
 */
const SUB_TYPES = {
  // Kullanıcının kendi çizimleri paket sistemine dahil değildir; her zaman burada.
  ozel_cizimler: [
    { id: 'all', label: 'Tüm Çizimlerim', icon: '🎨' },
    { id: 'point', label: 'Noktalar (Pin)', icon: '📍', filter: (item) => item.shapeType === 'point' || !item.shapeType },
    { id: 'polyline', label: 'Çizgiler / Hatlar', icon: '📏', filter: (item) => item.shapeType === 'polyline' },
    { id: 'polygon', label: 'Alanlar / Çokgenler', icon: '📐', filter: (item) => item.shapeType === 'polygon' }
  ]
};
