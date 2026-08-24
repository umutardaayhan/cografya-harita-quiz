/**
 * 🌐 i18n ÇEKİRDEĞİ — Çift Katmanlı Dil Motoru
 *
 * Yol haritasındaki FAZ 1'in temeli. Dil desteği iki BAĞIMSIZ katmanda yaşar:
 *
 *   1) ARAYÜZ DİLİ (UI Strings)
 *      Buton/başlık/uyarı metinleri. `locales/*.js` içinde sözlük olarak durur,
 *      `GeoI18n.t('paket.kur')` ile okunur, DOM'da `data-i18n` ile bağlanır.
 *
 *   2) COĞRAFİ VERİ DİLİ (Data Entity Translation)
 *      Her coğrafi varlık paket dosyasında `i18n: { tr: {...}, en: {...} }`
 *      taşır. `GeoI18n.pick()` aktif dile göre seçer, eksikse yedek zincirine
 *      düşer. Böylece "Ağrı Dağı" ⟷ "Mount Ararat" aynı kaydın iki yüzüdür.
 *
 * Sözlükler `.js` olarak (JSON değil) tutulur: `fetch()` `file://` altında
 * CORS'a takılır, `<script>` takılmaz — uygulama sunucusuz da açılabilsin diye.
 */

const GeoI18n = {
  LANG_KEY: 'geo_lang_v1',

  /** Aktif arayüz + veri dili */
  lang: 'tr',

  /** Yedek zinciri: aktif dil → bu sıra. Çeviri yoksa uygulama boş metin göstermez. */
  fallbacks: ['tr', 'en'],

  /** { lang: { anahtar: metin } } */
  _dicts: {},

  /** Dil değişiminde haberdar edilecek dinleyiciler */
  _listeners: [],

  // -------------------------------------------------------------------------
  // KURULUM
  // -------------------------------------------------------------------------
  /** `locales/tr.js` gibi dosyalar bunu çağırır */
  register(lang, dict) {
    this._dicts[lang] = Object.assign(this._dicts[lang] || {}, dict);
  },

  /** Kayıtlı dillerin listesi */
  available() {
    return Object.keys(this._dicts);
  },

  init() {
    let saved = null;
    try { saved = localStorage.getItem(this.LANG_KEY); } catch (e) { /* yoksay */ }
    if (saved && this._dicts[saved]) {
      this.lang = saved;
    } else {
      // Tarayıcı dilini otomatik algıla; desteklenmiyorsa Türkçe kal
      const nav = (navigator.language || 'tr').slice(0, 2).toLowerCase();
      this.lang = this._dicts[nav] ? nav : 'tr';
    }
    return this.lang;
  },

  setLang(lang) {
    if (!this._dicts[lang] || lang === this.lang) return false;
    this.lang = lang;
    try { localStorage.setItem(this.LANG_KEY, lang); } catch (e) { /* kota */ }
    this._listeners.forEach(fn => { try { fn(lang); } catch (e) { console.error(e); } });
    document.dispatchEvent(new CustomEvent('geo:langchange', { detail: { lang } }));
    return true;
  },

  onChange(fn) {
    if (typeof fn === 'function') this._listeners.push(fn);
  },

  // -------------------------------------------------------------------------
  // KATMAN 1 — ARAYÜZ METİNLERİ
  // -------------------------------------------------------------------------
  /**
   * Sözlükten metin okur. Bulunamazsa yedek dillere, o da yoksa anahtarın
   * kendisine düşer (böylece eksik çeviri boş kutu değil, görünür bir uyarıdır).
   * `vars` ile `{ad}` biçimli yer tutucular doldurulur.
   */
  t(key, vars) {
    let val = (this._dicts[this.lang] || {})[key];
    if (val === undefined) {
      for (const fb of this.fallbacks) {
        if (fb === this.lang) continue;
        val = (this._dicts[fb] || {})[key];
        if (val !== undefined) break;
      }
    }
    if (val === undefined) return key;
    if (!vars) return val;
    return String(val).replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
  },

  /**
   * DOM'daki `data-i18n` (metin), `data-i18n-title` (tooltip) ve
   * `data-i18n-placeholder` bağlarını aktif dile göre tazeler.
   */
  applyDom(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = this.t(el.getAttribute('data-i18n'));
    });
    scope.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = this.t(el.getAttribute('data-i18n-title'));
    });
    scope.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = this.t(el.getAttribute('data-i18n-placeholder'));
    });
  },

  // -------------------------------------------------------------------------
  // KATMAN 2 — VERİ ÇEVİRİSİ
  // -------------------------------------------------------------------------
  /**
   * `{ tr: {...}, en: {...} }` biçimli bir çeviri bloğundan aktif dile en uygun
   * nesneyi döndürür. Kısmi çeviriler desteklenir: yalnızca `name`'i çevrilmiş
   * bir kayıt, kalan alanları yedek dilden alır.
   */
  pick(block) {
    if (!block) return {};
    const chain = [this.lang].concat(this.fallbacks.filter(l => l !== this.lang));
    const merged = {};
    // Zinciri TERSTEN uygula: en zayıf yedek önce, aktif dil en sonda kazanır
    chain.slice().reverse().forEach(l => {
      const part = block[l];
      if (part) Object.keys(part).forEach(k => {
        if (part[k] !== undefined && part[k] !== null && part[k] !== '') merged[k] = part[k];
      });
    });
    return merged;
  },

  /** Kataloğun `i18n` bloklarından tek bir alanı okur (kısayol) */
  field(block, key, fallback) {
    const v = this.pick(block)[key];
    return v === undefined ? (fallback !== undefined ? fallback : '') : v;
  }
};
