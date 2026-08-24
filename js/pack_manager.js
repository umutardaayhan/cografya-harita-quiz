/**
 * 📦 PAKET YÖNETİCİSİ (DLC Motoru)
 *
 * TEMEL FİKİR: `COGRAFYA_DATA` artık bir VERİ KAYNAĞI değil, TÜRETİLMİŞ BİR
 * GÖRÜNÜMDÜR. Gerçek kaynak `data/packs/pack.*.js` dosyalarıdır; bu sınıf
 * kullanıcının kurduğu paketlerden çalışma zamanı kaplarını yeniden inşa eder.
 *
 * Kaplar YERİNDE mutasyona uğratıldığı için quiz.js, map.js, study_plan.js ve
 * tüm oyun motorları tek satır bile değişmeden çalışmaya devam eder — sadece
 * gördükleri havuz, kullanıcının indirdiği kadardır.
 *
 *   catalog.js (manifest)  ──┐
 *   pack.tr.daglar.js  ─────┼──► PackManager.rebuild() ──► COGRAFYA_DATA
 *   pack.tr.sular.js   ─────┘                              CATEGORIES
 *                                                          SUB_TYPES
 *
 * KADEME (tier): her kayıt 1-3 arası bir detay kademesi taşır.
 *   1 = Az (çekirdek / sınav rekorları)   2 = Orta   3 = Tam (hepsi)
 * Kurulum kademesi bir EŞİKTİR: `item.tier <= kurulanKademe` olanlar görünür.
 *
 * Paket dosyaları `.js`'tir ve kendilerini `GeoPacks.register()` ile kaydeder;
 * `fetch()` yerine `<script>` kullanıldığı için uygulama `file://` altında da
 * (yerel sunucusuz) çalışır.
 */

/** Paket dosyalarının kendilerini bıraktığı ham kayıt defteri */
const GeoPacks = {
  _payloads: {},
  register(id, payload) { this._payloads[id] = payload; },
  get(id) { return this._payloads[id] || null; },
  has(id) { return !!this._payloads[id]; }
};

/** Kurulum durumunun saklandığı anahtar */
const PACKS_STORAGE_KEY = 'geo_packs_v1';

/** Bir günlük çalışma paketinin hedef soru sayısı (aşılırsa satırlar orantılı küçülür) */
const PLAN_DAILY_BUDGET = 120;

/** Orantılı küçültmede bir konunun düşebileceği en küçük soru sayısı */
const PLAN_MIN_ROW = 4;

/** Kademe etiketleri (arayüzde sözlükten okunur; buradakiler yedek) */
const PACK_TIERS = [
  { tier: 1, key: 'tier.az',   fallback: 'Az',   icon: '🌱' },
  { tier: 2, key: 'tier.orta', fallback: 'Orta', icon: '🌿' },
  { tier: 3, key: 'tier.tam',  fallback: 'Tam',  icon: '🌳' }
];

class PackManager {
  /**
   * @param {object} catalog  `data/packs/catalog.js` manifesti
   * @param {PackEditStore} edits  Kullanıcı düzenleme katmanı (bkz. js/pack_edits.js).
   *   Kaynak paket dosyaları ASLA değişmez; silme/düzenleme/ekleme bu katmanda
   *   tutulur ve `rebuild()` sırasında kaynağın üstüne uygulanır.
   */
  constructor(catalog, edits = null) {
    this.catalog = catalog;
    this.edits = edits;
    this.state = this._load();
    this._loading = {};        // url -> Promise (aynı dosya iki kez indirilmesin)
    this.unlockedModes = new Set();
  }

  // =========================================================================
  // DURUM
  // =========================================================================
  _load() {
    try {
      const raw = localStorage.getItem(PACKS_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* bozuk kayıt: sıfırdan başla */ }
    return null;   // null = HİÇ karar verilmemiş (ilk giriş)
  }

  _save() {
    try { localStorage.setItem(PACKS_STORAGE_KEY, JSON.stringify(this.state || {})); }
    catch (e) { console.warn('Paket durumu kaydedilemedi', e); }
  }

  /** İlk giriş mi? (rehber + mağaza gösterilecek mi?) */
  isFirstRun() {
    return this.state === null;
  }

  /** Kurulu paket yok mu? (ilk girişten farklı: kullanıcı hepsini kaldırmış olabilir) */
  isEmpty() {
    return this.installedIds().length === 0;
  }

  installedIds() {
    return Object.keys(this.state || {});
  }

  isInstalled(packId) {
    return !!(this.state && this.state[packId]);
  }

  tierOf(packId) {
    const rec = (this.state || {})[packId];
    return rec ? rec.tier : 0;
  }

  packDef(packId) {
    return this.catalog.packs.find(p => p.id === packId) || null;
  }

  /**
   * ESKİ KULLANICI GÖÇÜ.
   * Paket sistemi öncesinde çalışmış bir kullanıcının (soru geçmişi var, paket
   * kaydı yok) ilerlemesi sıfırlanmasın diye TÜM paketler tam kademede kurulur.
   * Yalnızca gerçekten yeni gelenler rehber ekranını görür.
   */
  hasLegacyProgress() {
    try {
      const raw = localStorage.getItem('kpss_cografya_question_analytics');
      if (!raw) return false;
      return Object.keys(JSON.parse(raw) || {}).length > 0;
    } catch (e) { return false; }
  }

  // =========================================================================
  // DOSYA YÜKLEME
  // =========================================================================
  _loadScript(url) {
    if (this._loading[url]) return this._loading[url];

    this._loading[url] = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = url;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Paket dosyası yüklenemedi: ' + url));
      document.head.appendChild(s);
    });
    return this._loading[url];
  }

  /** Paketin veri dosyasını (varsa) belleğe alır */
  async fetchPack(packId) {
    const def = this.packDef(packId);
    if (!def) throw new Error('Bilinmeyen paket: ' + packId);
    if (def.virtual || !def.file) return;          // sanal paket: dosya yok
    if (GeoPacks.has(packId)) return;              // zaten bellekte
    // `?v=` önbellek kırıcıdır: paket dosyaları CDN'de bir yıl immutable
    // saklanır, sürüm artınca tarayıcı yeni kopyayı çeker.
    await this._loadScript(def.file + '?v=' + (def.version || 1));
    if (!GeoPacks.has(packId)) {
      throw new Error('Paket dosyası kendini kaydetmedi: ' + packId);
    }
  }

  // =========================================================================
  // KURULUM / KALDIRMA
  // =========================================================================
  async install(packId, tier) {
    const def = this.packDef(packId);
    if (!def) throw new Error('Bilinmeyen paket: ' + packId);
    const t = Math.max(1, Math.min(3, parseInt(tier, 10) || 1));

    await this.fetchPack(packId);

    if (!this.state) this.state = {};
    this.state[packId] = { tier: t, version: def.virtual ? 1 : (GeoPacks.get(packId).version || 1), at: Date.now() };
    this._save();
    this.rebuild();
    return true;
  }

  /** Kademe yükseltme/düşürme — dosya zaten bellekte olduğu için anlıktır */
  async setTier(packId, tier) {
    if (!this.isInstalled(packId)) return this.install(packId, tier);
    return this.install(packId, tier);
  }

  /**
   * Paketi kaldırır. Kullanıcının o pakete yaptığı düzenlemeler DE düşer:
   * paket yeniden kurulduğunda fabrika hâli gelmelidir. Kademe değiştirmek
   * (`setTier`) düzenlemeleri silmez, yalnızca kaldırma siler.
   */
  uninstall(packId) {
    if (!this.state || !this.state[packId]) return false;
    delete this.state[packId];
    if (this.edits) this.edits.dropPack(packId);
    this._save();
    this.rebuild();
    return true;
  }

  /**
   * TÜM paketleri kurar veya kademelerini günceller.
   * @param {number} tier      kurulacak kademe (1: Az, 2: Orta, 3: Tam)
   * @param {function} ilerle  (yapilan, toplam) ile çağrılır
   * @param {boolean} forceAll true ise kurulu paketlerin kademesini de günceller
   */
  async installAll(tier = 2, ilerle = null, forceAll = false) {
    const t = Math.max(1, Math.min(3, parseInt(tier, 10) || 2));
    const hedefler = forceAll
      ? this.catalog.packs
      : this.catalog.packs.filter(p => !this.isInstalled(p.id) || this.installedTier(p.id) !== t);

    for (let i = 0; i < hedefler.length; i++) {
      await this.install(hedefler[i].id, t);
      if (ilerle) ilerle(i + 1, hedefler.length);
    }
    return hedefler.length;
  }

  /** Tüm paketleri kaldırır. Soru geçmişi SİLİNMEZ; id bazlı olduğu için
      paketler geri kurulduğunda ilerleme geri gelir. */
  uninstallAll() {
    const sayi = this.installedIds().length;
    this.state = {};
    if (this.edits) this.edits.dropAll();
    this._save();
    this.rebuild();
    return sayi;
  }

  /** İlk girişte kullanıcı hiçbir paket seçmeden devam ederse: karar kaydedilir */
  markVisited() {
    if (this.state === null) { this.state = {}; this._save(); }
  }

  /**
   * Kayıtlı durumdaki tüm paketlerin dosyalarını yükler ve kapları kurar.
   * Uygulama açılışında bir kez çağrılır.
   */
  async boot() {
    if (this.state === null && this.hasLegacyProgress()) {
      // Eski kullanıcı: her şeyi tam kademede aç
      this.state = {};
      this.catalog.packs.forEach(p => {
        this.state[p.id] = { tier: 3, version: 1, at: Date.now(), migrated: true };
      });
      this._save();
    }

    const ids = this.installedIds();
    const results = await Promise.allSettled(ids.map(id => this.fetchPack(id)));
    let dusen = false;
    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        console.warn('Paket yüklenemedi, kurulu listesinden düşürülüyor:', ids[i], r.reason);
        delete this.state[ids[i]];
        dusen = true;
      }
    });
    // DİKKAT: burada koşulsuz kayıt YAPILMAZ. `state === null` (hiç karar
    // verilmemiş) durumu diske `{}` olarak yazılırsa kullanıcı bir sonraki
    // açılışta rehberi hiç görmeden boş bir haritayla karşılaşırdı.
    if (dusen) this._save();
    this.rebuild();
  }

  // =========================================================================
  // ÇALIŞMA ZAMANI PROJEKSİYONU
  // =========================================================================
  /**
   * Paket şemasındaki kaydı, uygulamanın her yerinde beklenen DÜZ (legacy)
   * biçime çevirir. i18n bloğu aktif dile göre burada çözülür — dil değişince
   * tek yapılması gereken rebuild() çağırmaktır.
   */
  static project(packItem) {
    const tr = GeoI18n.pick(packItem.i18n);
    const geom = packItem.geom || {};

    const out = {
      id: packItem.id,
      name: tr.name || packItem.id,
      category: packItem.cat,
      type: tr.type || '',
      lat: geom.lat,
      lng: geom.lng,
      region: tr.region || '',
      city: tr.city || '',
      kpssNot: tr.note || '',
      shapeType: geom.t || 'point',
      // Dilden bağımsız sınıflandırma anahtarları: filtreler ve oluşum oyunu
      // artık Türkçe metin eşleştirmesi yerine bunları kullanır.
      tier: packItem.tier,
      sub: packItem.sub || [],
      packId: packItem._packId
    };

    if (geom.c) out.coordinates = geom.c;
    if (packItem.formation) out.olusumKey = packItem.formation;
    if (packItem.areaKm2 !== undefined) out.areaKm2 = packItem.areaKm2;
    if (packItem.matchType) out.matchType = packItem.matchType;
    if (tr.shortName) out.shortName = tr.shortName;
    if (tr.matchSource) out.matchSource = tr.matchSource;
    if (tr.questionText) out.questionText = tr.questionText;
    if (tr.promptTitle) out.promptTitle = tr.promptTitle;

    return out;
  }

  /**
   * Kurulu paketlerden COGRAFYA_DATA / CATEGORIES / SUB_TYPES kaplarını
   * YERİNDE yeniden inşa eder ve `packs:changed` olayını yayınlar.
   */
  rebuild() {
    // --- 1. Kapları boşalt (referansları koruyarak) ---
    Object.keys(COGRAFYA_DATA).forEach(k => { delete COGRAFYA_DATA[k]; });
    CATEGORIES.length = 0;
    Object.keys(SUB_TYPES).forEach(k => {
      if (k !== 'ozel_cizimler') delete SUB_TYPES[k];
    });
    this.unlockedModes.clear();

    // --- 2. Kurulu paketlerin kayıtlarını kademeye göre süz ve doldur ---
    this.installedIds().forEach(packId => {
      const def = this.packDef(packId);
      if (!def) return;

      (def.unlocks || []).forEach(m => this.unlockedModes.add(m));

      const payload = GeoPacks.get(packId);
      if (!payload || !Array.isArray(payload.items)) return;

      const esik = this.tierOf(packId);
      payload.items.forEach(raw => {
        if ((raw.tier || 3) > esik) return;
        const kaynak = PackManager.project(Object.assign({ _packId: packId }, raw));

        // DÜZENLEME KATMANI: kaynak kaydın üstüne kullanıcının yaması uygulanır.
        // `null` dönmesi kullanıcının o kaydı gizlediği anlamına gelir.
        const item = this.edits ? this.edits.applyTo(packId, kaynak) : kaynak;
        if (!item) return;

        (COGRAFYA_DATA[item.category] || (COGRAFYA_DATA[item.category] = [])).push(item);
      });

      // Kullanıcının bu pakete EKLEDİĞİ kayıtlar. Kademe eşiğine tabi değildir:
      // kendi eklediğin kaydın "Az" kurulumda kaybolması beklenmedik olurdu.
      if (this.edits) {
        this.edits.addedFor(packId).forEach(item => {
          if (!item.category) return;
          (COGRAFYA_DATA[item.category] || (COGRAFYA_DATA[item.category] = [])).push(item);
        });
      }
    });

    // --- 3. Sekme listesi: katalog sırasına sadık kal, canlı sayaçla ---
    Object.keys(this.catalog.categories).forEach(catId => {
      const items = COGRAFYA_DATA[catId];
      if (!items || !items.length) return;
      const meta = this.catalog.categories[catId];
      const txt = GeoI18n.pick(meta.i18n);
      CATEGORIES.push({
        id: catId,
        title: txt.title || catId,
        short: txt.short || txt.title || catId,
        icon: meta.icon,
        color: meta.color,
        canonical: meta.canonical,
        count: items.length
      });
    });

    // --- 4. Alt tür rozetleri: yalnızca gerçekten karşılığı olanlar ---
    Object.keys(this.catalog.subTypes).forEach(catId => {
      const items = COGRAFYA_DATA[catId];
      if (!items || !items.length) return;

      const defs = this.catalog.subTypes[catId].filter(sub => {
        if (sub.id === 'all') return true;
        return items.some(it => (it.sub || []).includes(sub.id));
      });
      if (defs.length <= 1) return;   // yalnızca "Tümü" kaldıysa bar gösterilmez

      SUB_TYPES[catId] = defs.map(sub => {
        const txt = GeoI18n.pick(sub.i18n);
        const entry = { id: sub.id, label: txt.label || sub.id, icon: sub.icon };
        if (sub.id !== 'all') {
          // DİLDEN BAĞIMSIZ filtre: eskiden Türkçe `type` metnine bakılıyordu
          entry.filter = (item) => (item.sub || []).includes(sub.id);
        }
        return entry;
      });
    });

    document.dispatchEvent(new CustomEvent('packs:changed', {
      detail: { installed: this.installedIds(), total: this.totalItems() }
    }));
  }

  // =========================================================================
  // SORGULAR
  // =========================================================================
  /**
   * Bir kaydın DÜZENLENMEMİŞ kaynak hâlini döndürür.
   * Düzenleme modali hem "yalnızca gerçekten değişen alanı yamala" hem de
   * "bu kaydı varsayılana döndür" için buna ihtiyaç duyar.
   * Kullanıcının kendi eklediği kayıtların kaynağı yoktur -> `null`.
   */
  sourceItem(packId, itemId) {
    const payload = GeoPacks.get(packId);
    if (!payload || !Array.isArray(payload.items)) return null;
    const raw = payload.items.find(it => it.id === itemId);
    if (!raw) return null;
    return PackManager.project(Object.assign({ _packId: packId }, raw));
  }

  /** Kurulu paketlerden bu kategoriye kayıt sağlayanların id listesi */
  packsForCategory(catId) {
    return this.installedIds().filter(packId => {
      const payload = GeoPacks.get(packId);
      if (!payload || !Array.isArray(payload.items)) return false;
      return payload.items.some(it => it.cat === catId);
    });
  }

  totalItems() {
    return Object.keys(COGRAFYA_DATA).reduce((n, k) => n + COGRAFYA_DATA[k].length, 0);
  }

  /** Bir oyun/test modu kurulu paketlerce açılmış mı? */
  isModeAvailable(modeId) {
    return this.unlockedModes.has(modeId);
  }

  /** Kilitli bir mod için "hangi paket gerekli" listesi */
  packsProviding(modeId) {
    return this.catalog.packs.filter(p => (p.unlocks || []).includes(modeId));
  }

  /**
   * Günlük plan satırları artık kurulu paketlerden türer (eski sabit liste yerine).
   *
   * GÜNLÜK BÜTÇE: Paket sayısı arttıkça satırların toplamı bir oturumda
   * bitirilemeyecek boyuta çıkıyordu (18 paket = 250+ soru). Toplam bütçeyi
   * aşarsa satırlar ORANTILI olarak küçültülür; her konu planda kalır ama
   * paket sayısı günlük yükü şişirmez.
   */
  planSpec() {
    const rows = [];
    this.installedIds().forEach(packId => {
      const def = this.packDef(packId);
      if (!def) return;
      (def.planRows || []).forEach(row => {
        const label = GeoI18n.lang === 'tr' ? row.tr : (row[GeoI18n.lang] || row.tr);
        const spec = { key: row.cat, label: label, icon: row.icon, count: row.count };
        if (row.geom === 'polyline') spec.filter = it => it.shapeType === 'polyline';
        else if (row.geom === 'point') spec.filter = it => (it.shapeType || 'point') === 'point';
        rows.push(spec);
      });
    });

    const toplam = rows.reduce((n, r) => n + r.count, 0);
    if (toplam > PLAN_DAILY_BUDGET && rows.length) {
      const oran = PLAN_DAILY_BUDGET / toplam;
      rows.forEach(r => { r.count = Math.max(PLAN_MIN_ROW, Math.round(r.count * oran)); });
    }
    return rows;
  }

  /** Mağaza kartları için özet durum */
  summary() {
    return this.catalog.packs.map(def => ({
      def,
      installed: this.isInstalled(def.id),
      tier: this.tierOf(def.id),
      canUpgrade: this.isInstalled(def.id) && this.tierOf(def.id) < 3
    }));
  }
}
