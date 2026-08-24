/**
 * ✏️ PAKET DÜZENLEME KATMANI (Overlay / Referans Modeli)
 *
 * TEMEL KURAL: `data/packs/pack.*.js` dosyaları KAYNAKTIR ve ASLA değişmez.
 * Kullanıcının bir paket kaydını silmesi, düzenlemesi ya da pakete yeni kayıt
 * eklemesi buradaki AYRI bir katmanda saklanır. `PackManager.rebuild()` kaynağı
 * okur, üstüne bu katmanı uygular ve sonucu `COGRAFYA_DATA`'ya yazar.
 *
 *   pack.tr.daglar.js  (dokunulmaz kaynak)
 *          │
 *          ├─ PackManager.project()      ← düz (legacy) biçime çevirir
 *          ▼
 *   PackEditStore.applyTo()              ← silinen / değişen / eklenen
 *          ▼
 *   COGRAFYA_DATA                        ← quiz, harita, oyun modları bunu görür
 *
 * Bu yüzden quiz.js, map.js ve oyun motorları tek satır değişmeden düzenlenmiş
 * veriyi görür.
 *
 * PAKET KALDIRILINCA o paketin katmanı da düşer (`dropPack`). Kullanıcı paketi
 * yeniden kurduğunda fabrika hâli geri gelir — istenen davranış budur. Kademe
 * değiştirmek (Az ↔ Tam) düzenlemeleri SİLMEZ.
 */

const PACK_EDITS_STORAGE_KEY = 'geo_pack_edits_v1';

/**
 * Katmanda saklanmasına izin verilen alanlar. Beyaz liste bilinçlidir: kaynak
 * paketin sürümü yükseldiğinde eski yamanın yeni kayda temiz oturması gerekir,
 * bu yüzden `packId` / `_packId` gibi türetilmiş alanlar yamaya asla yazılmaz.
 */
const PACK_EDIT_FIELDS = [
  'name', 'shortName', 'type', 'category', 'region', 'city', 'kpssNot',
  'lat', 'lng', 'shapeType', 'coordinates', 'tier', 'color',
  'areaKm2', 'olusumKey', 'sub', 'groupId'
];

/** Kullanıcının eklediği kayıtlarda ayrıca bulunması gereken alanlar */
const PACK_ADDED_REQUIRED = ['id', 'name', 'category', 'shapeType'];

class PackEditStore {
  constructor() {
    this.data = this._load();
  }

  // =========================================================================
  // DEPOLAMA
  // =========================================================================
  _load() {
    try {
      const raw = localStorage.getItem(PACK_EDITS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.warn('Paket düzenlemeleri okunamadı, sıfırdan başlanıyor', e);
    }
    return {};
  }

  _save() {
    try {
      localStorage.setItem(PACK_EDITS_STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('Paket düzenlemeleri kaydedilemedi', e);
    }
  }

  /** Bir paketin katman kaydını getirir; `olustur` true ise yoksa açar */
  _pack(packId, olustur = false) {
    if (!packId) return null;
    if (!this.data[packId]) {
      if (!olustur) return null;
      this.data[packId] = { removed: {}, patched: {}, added: [] };
    }
    const p = this.data[packId];
    if (!p.removed) p.removed = {};
    if (!p.patched) p.patched = {};
    if (!Array.isArray(p.added)) p.added = [];
    return p;
  }

  /** Boşalan katmanı diskte tutmanın anlamı yok; kaydı düşür */
  _budaVeKaydet(packId) {
    const p = this.data[packId];
    if (p &&
        Object.keys(p.removed).length === 0 &&
        Object.keys(p.patched).length === 0 &&
        p.added.length === 0) {
      delete this.data[packId];
    }
    this._save();
  }

  // =========================================================================
  // TEMİZLEME
  // =========================================================================
  /**
   * Dışarıdan gelen alan sözlüğünü beyaz listeye indirger ve tiplerini
   * doğrular. Bozuk bir koordinat Leaflet'te istisna fırlatıp tüm soruyu
   * çökertebildiği için sayısal alanlar burada elenir.
   */
  static sanitize(fields) {
    const out = {};
    if (!fields || typeof fields !== 'object') return out;

    PACK_EDIT_FIELDS.forEach(key => {
      if (!(key in fields)) return;
      const v = fields[key];
      if (v === undefined) return;

      if (key === 'lat' || key === 'lng' || key === 'areaKm2') {
        const n = Number(v);
        if (!Number.isFinite(n)) return;
        if (key === 'lat' && (n < -90 || n > 90)) return;
        if (key === 'lng' && (n < -180 || n > 180)) return;
        out[key] = n;
      } else if (key === 'tier') {
        const n = parseInt(v, 10);
        if (!Number.isFinite(n)) return;
        out[key] = Math.max(1, Math.min(3, n));
      } else if (key === 'coordinates') {
        if (Array.isArray(v) && v.length) out[key] = v;
      } else if (key === 'sub') {
        if (Array.isArray(v)) out[key] = v.filter(s => typeof s === 'string');
      } else {
        out[key] = String(v);
      }
    });

    return out;
  }

  // =========================================================================
  // SORGULAR
  // =========================================================================
  hasEdits(packId) {
    return !!this._pack(packId);
  }

  /** Kart rozetleri ve "varsayılana dön" uyarıları için özet */
  stats(packId) {
    const p = this._pack(packId);
    if (!p) return { silinen: 0, degisen: 0, eklenen: 0, toplam: 0 };
    const s = {
      silinen: Object.keys(p.removed).length,
      degisen: Object.keys(p.patched).length,
      eklenen: p.added.length
    };
    s.toplam = s.silinen + s.degisen + s.eklenen;
    return s;
  }

  /** Düzenlemesi olan tüm paketlerin id listesi */
  editedPackIds() {
    return Object.keys(this.data);
  }

  isRemoved(packId, itemId) {
    const p = this._pack(packId);
    return !!(p && p.removed[itemId]);
  }

  patchOf(packId, itemId) {
    const p = this._pack(packId);
    return (p && p.patched[itemId]) ? p.patched[itemId] : null;
  }

  /** Kullanıcının bu pakete eklediği kayıt mı? */
  addedItem(packId, itemId) {
    const p = this._pack(packId);
    if (!p) return null;
    return p.added.find(it => it.id === itemId) || null;
  }

  // =========================================================================
  // UYGULAMA (PackManager.rebuild() buradan geçer)
  // =========================================================================
  /**
   * Kaynaktan gelen (projeksiyonu yapılmış) kaydın üstüne katmanı uygular.
   * @returns {object|null} düzenlenmiş kayıt, kullanıcı sildiyse `null`
   */
  applyTo(packId, item) {
    const p = this._pack(packId);
    if (!p) return item;
    if (p.removed[item.id]) return null;

    const yama = p.patched[item.id];
    if (!yama) return item;

    const out = Object.assign({}, item, yama);
    out.isPackEdited = true;
    // Şekil türü noktaya çevrilmiş ama yeni koordinat verilmemişse kaynağın
    // eski çizgi/alan dizisi kayıtta kalır ve harita onu yine çizgi sanardı.
    if (yama.shapeType === 'point' && !yama.coordinates) delete out.coordinates;
    return out;
  }

  /** Kullanıcının bu pakete eklediği kayıtların çalışma zamanı kopyaları */
  addedFor(packId) {
    const p = this._pack(packId);
    if (!p) return [];
    return p.added.map(it => Object.assign({}, it, {
      packId: packId,
      isPackEdited: true,
      isUserAdded: true
    }));
  }

  // =========================================================================
  // DÜZENLEME İŞLEMLERİ
  // =========================================================================
  /**
   * Kaydı gizler (kaynak kayıt) ya da tamamen siler (kullanıcı eklemesi).
   * @returns {object|null} geri alma jetonu — `undoRemove()` ile kullanılır
   */
  removeItem(packId, itemId) {
    const p = this._pack(packId, true);

    const idx = p.added.findIndex(it => it.id === itemId);
    if (idx !== -1) {
      const [kayit] = p.added.splice(idx, 1);
      this._budaVeKaydet(packId);
      return { packId, tur: 'added', kayit, sira: idx };
    }

    if (p.removed[itemId]) return null;   // zaten gizli
    p.removed[itemId] = true;
    this._save();
    return { packId, tur: 'source', itemId };
  }

  /** `removeItem` jetonunu geri alır */
  undoRemove(jeton) {
    if (!jeton) return false;
    const p = this._pack(jeton.packId, true);

    if (jeton.tur === 'added') {
      const yer = Math.min(Math.max(0, jeton.sira || 0), p.added.length);
      p.added.splice(yer, 0, jeton.kayit);
      this._save();
      return true;
    }

    delete p.removed[jeton.itemId];
    this._budaVeKaydet(jeton.packId);
    return true;
  }

  /**
   * Kaynak kaydı yamalar ya da kullanıcı eklemesini günceller.
   * Yamada YALNIZCA değişen alanlar tutulur; böylece kaynak paket sürümü
   * yükseldiğinde dokunulmamış alanlar yeni sürümden gelmeye devam eder.
   *
   * @param {object} kaynak  kaydın YAMASIZ hâli (kaynaktan gelen projeksiyon).
   *                         Verilirse kaynakla aynı olan alanlar yamaya yazılmaz.
   * @param {string[]} temizle  yamadan TAMAMEN silinecek alanlar. Örn. bir alan
   *   kaydı noktaya çevrildiğinde eski `coordinates` dizisi yamada kalırsa kayıt
   *   "nokta ama poligon koordinatlı" tutarsız bir hâlde donar.
   */
  patchItem(packId, itemId, fields, kaynak = null, temizle = []) {
    const temiz = PackEditStore.sanitize(fields);
    if (!Object.keys(temiz).length && !temizle.length) return false;

    const p = this._pack(packId, true);

    // Kullanıcı eklemesi: yama tutulmaz, kaydın kendisi güncellenir
    const eklenen = p.added.find(it => it.id === itemId);
    if (eklenen) {
      Object.assign(eklenen, temiz);
      temizle.forEach(k => { delete eklenen[k]; });
      this._save();
      return true;
    }

    const yama = Object.assign({}, p.patched[itemId] || {});
    temizle.forEach(k => { delete yama[k]; });
    Object.keys(temiz).forEach(k => {
      if (kaynak && PackEditStore._ayni(kaynak[k], temiz[k])) {
        // Kullanıcı alanı eski hâline döndürdü: yamayı taşımaya gerek yok
        delete yama[k];
      } else {
        yama[k] = temiz[k];
      }
    });

    if (Object.keys(yama).length) p.patched[itemId] = yama;
    else delete p.patched[itemId];

    this._budaVeKaydet(packId);
    return true;
  }

  static _ayni(a, b) {
    if (a === b) return true;
    if (typeof a === 'number' || typeof b === 'number') return Number(a) === Number(b);
    if (Array.isArray(a) && Array.isArray(b)) return JSON.stringify(a) === JSON.stringify(b);
    return false;
  }

  /**
   * Pakete yeni kayıt ekler.
   * @returns {object|null} eklenen kaydın kopyası
   */
  addItem(packId, fields) {
    const temiz = PackEditStore.sanitize(fields);
    if (!temiz.name || !temiz.category) return null;

    const kayit = Object.assign({
      shapeType: 'point',
      type: '',
      region: '',
      kpssNot: '',
      // Kullanıcı eklemeleri her kademede görünür: kendi eklediği kaydın
      // "Az" kurulumda kaybolması beklenmedik bir davranış olurdu.
      tier: 1
    }, temiz);

    kayit.id = 'usr_' + packId.replace(/[^a-z0-9]+/gi, '_') + '_' +
               Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    kayit.isUserAdded = true;

    // Çizgi/alan kayıtlarında merkez noktası zorunlu: harita odaklaması ve
    // "yakın çeldirici" seçimi lat/lng üzerinden çalışır.
    if (kayit.shapeType !== 'point' && Array.isArray(kayit.coordinates)) {
      if (!Number.isFinite(kayit.lat) || !Number.isFinite(kayit.lng)) {
        const m = PackEditStore.merkez(kayit.coordinates);
        kayit.lat = m[0];
        kayit.lng = m[1];
      }
    }
    if (!Number.isFinite(kayit.lat) || !Number.isFinite(kayit.lng)) return null;

    if (!PACK_ADDED_REQUIRED.every(k => kayit[k] !== undefined && kayit[k] !== '')) return null;

    const p = this._pack(packId, true);
    p.added.unshift(kayit);
    this._save();
    return Object.assign({}, kayit);
  }

  /** Çokgen / çizgi koordinatlarının geometrik merkezi */
  static merkez(coords) {
    if (!Array.isArray(coords) || !coords.length) return [39.0, 35.0];
    if (!Array.isArray(coords[0])) return coords;
    let la = 0, ln = 0;
    coords.forEach(pt => { la += pt[0]; ln += pt[1]; });
    return [
      Number((la / coords.length).toFixed(5)),
      Number((ln / coords.length).toFixed(5))
    ];
  }

  // =========================================================================
  // SIFIRLAMA
  // =========================================================================
  /** Tek bir kaydı fabrika hâline döndürür (kullanıcı eklemesiyse siler) */
  resetItem(packId, itemId) {
    const p = this._pack(packId);
    if (!p) return false;

    const idx = p.added.findIndex(it => it.id === itemId);
    if (idx !== -1) p.added.splice(idx, 1);

    delete p.patched[itemId];
    delete p.removed[itemId];
    this._budaVeKaydet(packId);
    return true;
  }

  /** Paketin TÜM düzenlemelerini siler — kaynak dosya zaten hiç değişmemişti */
  resetPack(packId) {
    if (!this.data[packId]) return false;
    delete this.data[packId];
    this._save();
    return true;
  }

  /** Paket kaldırılırken çağrılır: katman da düşer, yeniden kurulum fabrika hâlidir */
  dropPack(packId) {
    return this.resetPack(packId);
  }

  dropAll() {
    const sayi = Object.keys(this.data).length;
    this.data = {};
    this._save();
    return sayi;
  }

  // =========================================================================
  // YEDEKLEME
  // =========================================================================
  /** Düzenlemeleri dışa aktarılabilir düz nesne olarak verir */
  export() {
    return JSON.parse(JSON.stringify(this.data));
  }

  /** Dışarıdan gelen düzenleme paketini içe alır (mevcutların üstüne yazar) */
  import(gelen, birlestir = true) {
    if (!gelen || typeof gelen !== 'object') return false;
    if (!birlestir) this.data = {};
    Object.keys(gelen).forEach(packId => {
      const g = gelen[packId] || {};
      const p = this._pack(packId, true);
      Object.keys(g.removed || {}).forEach(id => { p.removed[id] = true; });
      Object.keys(g.patched || {}).forEach(id => {
        p.patched[id] = PackEditStore.sanitize(g.patched[id]);
      });
      (g.added || []).forEach(it => {
        const temiz = PackEditStore.sanitize(it);
        if (it.id && temiz.name) p.added.push(Object.assign(temiz, { id: it.id, isUserAdded: true }));
      });
      this._budaVeKaydet(packId);
    });
    return true;
  }
}
