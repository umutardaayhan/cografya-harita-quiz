/**
 * 📅 BUGÜNÜN PLANI — Çalışma Oturumu & Aralıklı Tekrar Motoru
 *
 * Uygulama açılınca harita yerine doğrudan bir çalışma paketi sunar.
 * Paket üç fazdan oluşur:
 *
 *   🆕 YENİ      → hiç sorulmamış yer şekilleri
 *   🔁 TEKRAR    → daha önce doğru bilinmiş ama tekrar zamanı gelmiş olanlar
 *   🔴 YANLIŞLAR → yanlış yapılmış ve henüz oturmamış olanlar
 *
 * Tekrar zamanlaması Leitner benzeri bir aralıkla belirlenir: bir soruyu üst
 * üste ne kadar çok doğru bilirseniz o kadar seyrek karşınıza çıkar.
 *
 * Not: Analitik verisi quiz motorunun localStorage'daki kaydından okunur
 * (kpss_cografya_question_analytics), yani geçmiş TÜM testler plana dahildir.
 */

const PLAN_STORAGE_KEY = 'kpss_gunun_plani_v1';

/** streak (üst üste doğru sayısı) -> bir sonraki tekrara kaç gün kalsın */
const REVIEW_INTERVALS_DAYS = { 0: 0, 1: 1, 2: 3, 3: 7, 4: 14 };
const REVIEW_INTERVAL_MAX_DAYS = 30;

/**
 * Günlük paket tarifi ARTIK SABİT DEĞİL: kurulu paketlerden türetilir.
 *
 * Her paket manifesti kendi `planRows` satırlarını taşır (bkz. data/packs/catalog.js);
 * kullanıcı bir paketi kaldırdığında o konu plandan da kendiliğinden düşer.
 * Yeni konu eklemek = yeni paket yayınlamak; bu dosyada değişiklik gerekmez.
 */
function dailyPlanSpec() {
  if (typeof window !== 'undefined' && window.geoPackManager) {
    return window.geoPackManager.planSpec();
  }
  return [];
}

const PHASES = [
  { key: 'yeni',    label: 'Yeni',      icon: '🆕', color: '#38bdf8' },
  { key: 'tekrar',  label: 'Tekrar',    icon: '🔁', color: '#a78bfa' },
  { key: 'yanlis',  label: 'Yanlışlar', icon: '🔴', color: '#f87171' }
];

class StudyPlanManager {
  constructor(quiz, customDrawManager = null) {
    this.quiz = quiz;
    this.customDrawManager = customDrawManager;
    this.plan = null;
    this.itemIndex = new Map(); // id -> item (tüm kategoriler)
    this.buildItemIndex();
  }

  // ---------------------------------------------------------------
  // VERİ ERİŞİMİ
  // ---------------------------------------------------------------
  buildItemIndex() {
    this.itemIndex.clear();
    Object.keys(COGRAFYA_DATA).forEach(cat => {
      (COGRAFYA_DATA[cat] || []).forEach(item => {
        this.itemIndex.set(item.id, Object.assign({ category: cat }, item));
      });
    });
    if (this.customDrawManager && this.customDrawManager.drawings) {
      this.customDrawManager.drawings.forEach(item => {
        this.itemIndex.set(item.id, item);
      });
    }
  }

  getItem(id) {
    return this.itemIndex.get(id) || null;
  }

  /** Bir plan satırının çekeceği ham havuz */
  poolFor(spec) {
    let pool = (COGRAFYA_DATA[spec.key] || []).slice();
    if (this.customDrawManager && typeof this.customDrawManager.getDrawingsByCategory === 'function') {
      pool = pool.concat(this.customDrawManager.getDrawingsByCategory(spec.key) || []);
    }
    if (typeof spec.filter === 'function') pool = pool.filter(spec.filter);
    return pool;
  }

  analyticsOf(id) {
    const a = this.quiz.analytics[id];
    return a || null;
  }

  // ---------------------------------------------------------------
  // FAZ SINIFLANDIRMASI
  // ---------------------------------------------------------------
  /** Bir yer şeklinin bugünkü durumu: 'yeni' | 'tekrar' | 'yanlis' | 'beklemede' */
  phaseOf(id, now = Date.now()) {
    const a = this.analyticsOf(id);
    if (!a || (a.correctCount === 0 && a.wrongCount === 0)) return 'yeni';

    // Yanlış yapılmış ve henüz oturmamış -> her zaman öncelikli
    if (a.wrongCount > 0 && (a.streak || 0) < 2) return 'yanlis';

    const streak = a.streak || 0;
    const days = streak >= 5 ? REVIEW_INTERVAL_MAX_DAYS : REVIEW_INTERVALS_DAYS[streak];
    const dueAt = (a.lastSeen || 0) + days * 24 * 60 * 60 * 1000;
    return now >= dueAt ? 'tekrar' : 'beklemede';
  }

  /** Yanlış şiddeti: haritada renk tonunu belirler */
  severityOf(id) {
    const a = this.analyticsOf(id);
    if (!a || !a.wrongCount) return null;
    if ((a.streak || 0) >= 3) return 'iyilesen';
    if (a.wrongCount >= 3) return 'kritik';
    if (a.wrongCount === 2) return 'orta';
    return 'hafif';
  }

  // ---------------------------------------------------------------
  // PLAN ÜRETİMİ
  // ---------------------------------------------------------------
  todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  /**
   * Bir plan satırı için kota kadar öğe seçer.
   * Öncelik: yanlışlar -> zamanı gelen tekrarlar -> yeniler.
   * Yanlışlar kotanın yarısını geçmez ki paket tamamen hata tekrarına dönüşmesin.
   */
  buildRow(spec, now, includeWaiting = false) {
    const pool = this.poolFor(spec);
    const buckets = { yeni: [], tekrar: [], yanlis: [] };
    const waiting = [];

    pool.forEach(item => {
      const phase = this.phaseOf(item.id, now);
      if (buckets[phase]) buckets[phase].push(item);
      else waiting.push(item);
    });

    // "Bekleyenleri de getir" seçilirse tekrar sırası dolmamışlar da eklenir
    if (includeWaiting) {
      waiting.sort((a, b) => ((this.analyticsOf(a.id) || {}).lastSeen || 0) - ((this.analyticsOf(b.id) || {}).lastSeen || 0));
      buckets.tekrar = buckets.tekrar.concat(waiting);
    }

    Object.keys(buckets).forEach(k => buckets[k].sort(() => 0.5 - Math.random()));

    // En çok yanlış yapılan önce gelsin
    buckets.yanlis.sort((a, b) => {
      const wa = (this.analyticsOf(a.id) || {}).wrongCount || 0;
      const wb = (this.analyticsOf(b.id) || {}).wrongCount || 0;
      return wb - wa;
    });

    const quota = spec.count;
    const picked = [];
    const maxWrong = Math.max(1, Math.ceil(quota * 0.5));

    buckets.yanlis.slice(0, maxWrong).forEach(it => picked.push({ item: it, phase: 'yanlis' }));
    buckets.tekrar.forEach(it => { if (picked.length < quota) picked.push({ item: it, phase: 'tekrar' }); });
    buckets.yeni.forEach(it => { if (picked.length < quota) picked.push({ item: it, phase: 'yeni' }); });

    // Hâlâ boşluk varsa kalan yanlışlarla doldur
    buckets.yanlis.slice(maxWrong).forEach(it => {
      if (picked.length < quota) picked.push({ item: it, phase: 'yanlis' });
    });

    return {
      specKey: spec.key,
      label: spec.label,
      icon: spec.icon,
      quota,
      available: pool.length,
      waiting: waiting.length,
      hasData: pool.length > 0,
      picked,
      counts: {
        yeni: picked.filter(p => p.phase === 'yeni').length,
        tekrar: picked.filter(p => p.phase === 'tekrar').length,
        yanlis: picked.filter(p => p.phase === 'yanlis').length
      }
    };
  }

  generate(force = false, includeWaiting = false) {
    const saved = this.load();
    if (!force && saved && saved.date === this.todayKey()) {
      this.plan = saved;
      return this.plan;
    }

    const now = Date.now();
    const rows = dailyPlanSpec().map(spec => this.buildRow(spec, now, includeWaiting));

    // Oturum sırası: önce tüm YENİ, sonra TEKRAR, en son YANLIŞLAR
    const queue = [];
    PHASES.forEach(ph => {
      rows.forEach(row => {
        row.picked
          .filter(p => p.phase === ph.key)
          .forEach(p => queue.push({ id: p.item.id, phase: ph.key, topic: row.label, icon: row.icon }));
      });
    });

    this.plan = {
      date: this.todayKey(),
      createdAt: now,
      includeWaiting,
      rows: rows.map(r => ({
        label: r.label, icon: r.icon, quota: r.quota,
        available: r.available, waiting: r.waiting, hasData: r.hasData,
        planned: r.picked.length, counts: r.counts
      })),
      queue,
      index: 0,
      correct: 0,
      wrong: 0,
      sessionWrongIds: [],
      finished: false
    };
    this.save();
    return this.plan;
  }

  // ---------------------------------------------------------------
  // OTURUM AKIŞI
  // ---------------------------------------------------------------
  current() {
    if (!this.plan || this.plan.index >= this.plan.queue.length) return null;
    const entry = this.plan.queue[this.plan.index];
    const item = this.getItem(entry.id);
    return item ? Object.assign({}, entry, { item }) : null;
  }

  /** Sırada bulunamayan (silinmiş) öğeleri atlar */
  skipMissing() {
    while (this.plan && this.plan.index < this.plan.queue.length) {
      if (this.getItem(this.plan.queue[this.plan.index].id)) return;
      this.plan.index++;
    }
  }

  recordAnswer(isCorrect, itemId) {
    if (!this.plan) return;
    if (isCorrect) this.plan.correct++;
    else {
      this.plan.wrong++;
      if (itemId && !this.plan.sessionWrongIds.includes(itemId)) {
        this.plan.sessionWrongIds.push(itemId);
      }
    }
    this.save();
  }

  advance() {
    if (!this.plan) return null;
    this.plan.index++;
    this.skipMissing();
    if (this.plan.index >= this.plan.queue.length) this.plan.finished = true;
    this.save();
    return this.current();
  }

  progress() {
    if (!this.plan) return { done: 0, total: 0, percent: 0 };
    const total = this.plan.queue.length;
    const done = Math.min(this.plan.index, total);
    return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
  }

  /** Aktif fazın kendi içindeki ilerlemesi */
  phaseProgress() {
    if (!this.plan) return null;
    const entry = this.plan.queue[Math.min(this.plan.index, this.plan.queue.length - 1)];
    if (!entry) return null;
    const same = this.plan.queue.filter(q => q.phase === entry.phase);
    const firstIdx = this.plan.queue.findIndex(q => q.phase === entry.phase);
    return {
      phase: entry.phase,
      done: Math.min(this.plan.index - firstIdx, same.length),
      total: same.length
    };
  }

  // ---------------------------------------------------------------
  // 🔴 YANLIŞLARIM
  // ---------------------------------------------------------------
  /**
   * Geçmiş TÜM testlerden biriken yanlışlar.
   * includeIds: bu oturumda yanlış yapılanlar (henüz analitikte 'iyilesen'
   * olsalar bile listeye girsinler diye ayrıca eklenir).
   */
  mistakes(includeIds = []) {
    const seen = new Set();
    const list = [];

    const push = (id) => {
      if (seen.has(id)) return;
      const item = this.getItem(id);
      if (!item) return;
      const a = this.analyticsOf(id) || { wrongCount: 0, correctCount: 0, streak: 0 };
      seen.add(id);
      list.push({
        item,
        wrongCount: a.wrongCount || 0,
        correctCount: a.correctCount || 0,
        streak: a.streak || 0,
        lastSeen: a.lastSeen || 0,
        severity: this.severityOf(id) || 'hafif'
      });
    };

    Object.keys(this.quiz.analytics).forEach(id => {
      const a = this.quiz.analytics[id];
      if (a && a.wrongCount > 0) push(id);
    });
    includeIds.forEach(push);

    const rank = { kritik: 0, orta: 1, hafif: 2, iyilesen: 3 };
    list.sort((a, b) => (rank[a.severity] - rank[b.severity]) || (b.wrongCount - a.wrongCount));
    return list;
  }

  mistakeSummary(includeIds = []) {
    const list = this.mistakes(includeIds);
    return {
      total: list.length,
      kritik: list.filter(m => m.severity === 'kritik').length,
      orta: list.filter(m => m.severity === 'orta').length,
      hafif: list.filter(m => m.severity === 'hafif').length,
      iyilesen: list.filter(m => m.severity === 'iyilesen').length
    };
  }

  /**
   * Yanlışlar tekrar testi kuyruğu:
   * bu oturumun yanlışları + tüm geçmiş yanlışlar, şiddet sırasına göre.
   */
  buildMistakeQueue(limit = 0) {
    const sessionWrong = (this.plan && this.plan.sessionWrongIds) || [];
    let list = this.mistakes(sessionWrong).filter(m => m.severity !== 'iyilesen');
    if (list.length === 0) list = this.mistakes(sessionWrong);
    if (limit > 0) list = list.slice(0, limit);
    return list.map(m => ({
      id: m.item.id,
      phase: 'yanlis',
      topic: 'Yanlış Tekrarı',
      icon: '🔴'
    }));
  }

  /** Genel tekrar: geçmişte görülmüş (doğru-yanlış fark etmez) her şey */
  buildGeneralReviewQueue(limit = 0) {
    const ids = Object.keys(this.quiz.analytics).filter(id => {
      const a = this.quiz.analytics[id];
      return a && (a.correctCount > 0 || a.wrongCount > 0) && this.getItem(id);
    });
    let entries = ids.map(id => ({ id, phase: 'tekrar', topic: 'Genel Tekrar', icon: '🔁' }));
    entries = entries.sort(() => 0.5 - Math.random());
    if (limit > 0) entries = entries.slice(0, limit);
    return entries;
  }

  /** Hazır bir kuyruğu aktif plan olarak yükler (yanlışlar testi / genel tekrar) */
  startAdHocSession(queue, label) {
    this.plan = {
      date: this.todayKey(),
      createdAt: Date.now(),
      adHoc: true,
      adHocLabel: label,
      rows: [],
      queue,
      index: 0,
      correct: 0,
      wrong: 0,
      sessionWrongIds: [],
      finished: queue.length === 0
    };
    this.save();
    return this.plan;
  }

  // ---------------------------------------------------------------
  // KALICILIK
  // ---------------------------------------------------------------
  save() {
    if (!this.plan) return;
    try {
      localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(this.plan));
    } catch (e) {
      // Kota dolduysa sessizce geç; plan bellekte çalışmaya devam eder
    }
  }

  load() {
    try {
      const raw = localStorage.getItem(PLAN_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  clear() {
    this.plan = null;
    localStorage.removeItem(PLAN_STORAGE_KEY);
  }

  /** Bugünün planı bitti mi / devam mı ediyor? */
  status() {
    const saved = this.plan || this.load();
    if (!saved || saved.date !== this.todayKey()) return 'yok';
    if (saved.adHoc) return 'yok';
    if (saved.finished || saved.index >= saved.queue.length) return 'bitti';
    return saved.index > 0 ? 'devam' : 'hazir';
  }
}
