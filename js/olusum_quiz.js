/**
 * 🧬 OLUŞUM TÜRÜ ALIŞTIRMASI
 *
 * "Hangi göl karstik, hangisi tektonik?" — "Hangi dağ volkanik?" gibi
 * SINIFLANDIRMA sorularını üretir. Üç soru biçimi döner:
 *
 *   1) TÜR SOR      : "Van Gölü hangi oluşum türündedir?"      (şıklar = tür adları)
 *   2) ÖRNEK SOR    : "Aşağıdakilerden hangisi KARSTİK göldür?" (şıklar = yer adları)
 *   3) FARKLI OLAN  : "Hangisi diğerlerinden farklı oluşumludur?"
 *
 * Sınıflandırma item.type metninden TÜRETİLİR, veriye elle yazılmaz.
 * Bir öğenin türü birden fazla sınıfa uyuyorsa (ör. "Karma Oluşumlu
 * (Tektonik - Karstik)") soru üretiminden ÇIKARILIR; aksi halde tek doğru
 * cevabı olmayan sorular oluşurdu.
 *
 * MutlakKonumGameBase'i genişletir: HUD, klavye kısayolları, harita pinleri,
 * şık sayısı ve zorluk ayarları hazır gelir.
 */

const OLUSUM_TAKSONOMISI = {
  daglar: {
    label: 'Dağ',
    soruAdi: 'dağ',
    cogulIn: 'dağların', cogulDan: 'dağlardan',
    siniflar: [
      { key: 'volkanik', label: 'Volkanik Dağ',        icon: '🌋', test: t => t.includes('volkanik') || t.includes('batolit') },
      { key: 'kivrim',   label: 'Kıvrım Dağı',          icon: '⛰️', test: t => t.includes('kivrim') || t.includes('masif') },
      { key: 'kirik',    label: 'Kırık Dağ (Horst)',    icon: '⚡', test: t => t.includes('kirik') || t.includes('horst') }
    ]
  },
  ovalar: {
    label: 'Ova',
    soruAdi: 'ova',
    cogulIn: 'ovaların', cogulDan: 'ovalardan',
    siniflar: [
      { key: 'delta',    label: 'Delta Ovası',          icon: '🏖️', test: t => t.includes('delta') },
      { key: 'karstik',  label: 'Karstik Ova (Polye)',  icon: '💧', test: t => t.includes('karstik') || t.includes('polye') },
      { key: 'tektonik', label: 'Tektonik Ova',         icon: '💥', test: t => t.includes('tektonik') || t.includes('graben') },
      { key: 'volkanik', label: 'Volkanik Ova',         icon: '🌋', test: t => t.includes('volkanik') || t.includes('lav') }
    ]
  },
  platolar: {
    label: 'Plato',
    soruAdi: 'plato',
    cogulIn: 'platoların', cogulDan: 'platolardan',
    siniflar: [
      { key: 'tabaka',   label: 'Tabaka Düzlüğü Platosu', icon: '🥞', test: t => t.includes('tabaka') || t.includes('duzlugu') },
      { key: 'volkanik', label: 'Volkanik (Lav) Platosu', icon: '🌋', test: t => t.includes('volkanik') || t.includes('lav') },
      { key: 'karstik',  label: 'Karstik Plato',          icon: '💧', test: t => t.includes('karstik') },
      { key: 'asinim',   label: 'Aşınım (Peneplen) Platosu', icon: '📉', test: t => t.includes('asinim') || t.includes('peneplen') }
    ]
  },
  goller: {
    label: 'Göl',
    soruAdi: 'göl',
    cogulIn: 'göllerin', cogulDan: 'göllerden',
    kaynak: 'su_kaynaklari',
    // Yalnızca göller; akarsular bu alıştırmanın dışında
    onFiltre: it => (it.shapeType || 'point') === 'point',
    siniflar: [
      { key: 'buzul',        label: 'Buzul (Sirk) Gölü',   icon: '❄️', test: t => t.includes('buzul') || t.includes('sirk') },
      { key: 'heyelan',      label: 'Heyelan Set Gölü',    icon: '⛰️', test: t => t.includes('heyelan') },
      { key: 'aluvyal',      label: 'Alüvyal Set Gölü',    icon: '🏞️', test: t => t.includes('aluvyal') },
      { key: 'kiyi',         label: 'Kıyı Set Gölü (Lagün)', icon: '🏖️', test: t => t.includes('kiyi set') || t.includes('lagun') },
      { key: 'karstik',      label: 'Karstik Göl',         icon: '💧', test: t => t.includes('karstik') || t.includes('obruk') },
      { key: 'krater',       label: 'Volkanik Krater / Maar Gölü', icon: '🌋', test: t => t.includes('maar') || t.includes('krater') || t.includes('kaldera') },
      { key: 'volkanik_set', label: 'Volkanik Set Gölü',   icon: '🔥', test: t => t.includes('volkanik set') },
      { key: 'tektonik',     label: 'Tektonik Göl',        icon: '💥', test: t => t.includes('tektonik') }
    ]
  }
};

/** Zorluk arttıkça çeldirici sınıflar birbirine daha çok karışanlardan seçilir */
const KARISAN_SINIFLAR = [
  ['tektonik', 'karstik'],
  ['volkanik_set', 'heyelan', 'aluvyal'],
  ['krater', 'volkanik_set'],
  ['kiyi', 'aluvyal'],
  ['kivrim', 'kirik'],
  ['tabaka', 'asinim']
];

class FormationTypeGame extends MutlakKonumGameBase {
  constructor(mapInstance) {
    super(mapInstance);
    this.modeKey = 'olusum';
    this.modeTitle = 'Oluşum Türü Alıştırması';
    this.maxRounds = 12;
    this.pointsPerRound = 100;
    this.minOptionCount = 2;
    this.maxOptionCount = 8;
    this.havuz = null;
  }

  // ---------------------------------------------------------------
  // SINIFLANDIRMA
  // ---------------------------------------------------------------
  /**
   * Bir öğeyi tek bir oluşum sınıfına oturtur.
   * Birden fazla sınıfa uyuyorsa null döner (belirsiz öğe soruya girmez).
   */
  static siniflandir(item, grup) {
    // Veride olusumKey varsa o kazanir. "Karma olusumlu" ogeler (Van, Beysehir,
    // Egirdir gibi) otomatik siniflandirmada birden fazla sinifa uydugu icin
    // soru disi kalir; bir ogeyi yine de sormak istersen ilgili kayda
    // olusumKey: 'volkanik_set' gibi bir alan eklemek yeterli.
    if (item.olusumKey) {
      const elle = grup.siniflar.find(s => s.key === item.olusumKey);
      if (elle) return elle;
    }
    const t = trLower(item.type);
    const uyanlar = grup.siniflar.filter(s => s.test(t));
    return uyanlar.length === 1 ? uyanlar[0] : null;
  }

  /** Tüm kategoriler için { grupKey: { sinifKey: [item...] } } tablosu kurar */
  buildPool() {
    const havuz = {};
    const hedefler = Object.keys(OLUSUM_TAKSONOMISI).filter(grupKey => {
      if (!this.categoryFilter) return true;
      const grup = OLUSUM_TAKSONOMISI[grupKey];
      return grupKey === this.categoryFilter || (grup.kaynak && grup.kaynak === this.categoryFilter);
    });

    // Eğer filtreye uygun grup bulunamadıysa tüm kurulu taksonomiye dön
    const aktifGruplar = hedefler.length > 0 ? hedefler : Object.keys(OLUSUM_TAKSONOMISI);

    aktifGruplar.forEach(grupKey => {
      const grup = OLUSUM_TAKSONOMISI[grupKey];
      const kaynak = grup.kaynak || grupKey;
      let items = (COGRAFYA_DATA[kaynak] || []).slice();
      if (typeof grup.onFiltre === 'function') items = items.filter(grup.onFiltre);

      const siniflar = {};
      items.forEach(it => {
        const s = FormationTypeGame.siniflandir(it, grup);
        if (!s) return;                      // belirsiz -> atla
        (siniflar[s.key] || (siniflar[s.key] = [])).push(it);
      });

      // En az 2 örneği olan sınıflar kullanılabilir (biri soru, biri çeldirici)
      const kullanilabilir = {};
      Object.keys(siniflar).forEach(k => {
        if (siniflar[k].length >= 1) kullanilabilir[k] = siniflar[k];
      });

      if (Object.keys(kullanilabilir).length >= 2) havuz[grupKey] = kullanilabilir;
    });
    this.havuz = havuz;
    return havuz;
  }

  sinifBilgisi(grupKey, sinifKey) {
    return OLUSUM_TAKSONOMISI[grupKey].siniflar.find(s => s.key === sinifKey);
  }

  /** Zorluğa göre çeldirici sınıf seçimi: yüksek seviyede karışanlar öncelikli */
  celdiriciSiniflar(grupKey, dogruSinif, adet) {
    const mevcut = Object.keys(this.havuz[grupKey]).filter(k => k !== dogruSinif);
    if (mevcut.length === 0) return [];

    const karisanGrup = KARISAN_SINIFLAR.find(g => g.includes(dogruSinif)) || [];
    const yakin = mevcut.filter(k => karisanGrup.includes(k));
    const uzak = mevcut.filter(k => !karisanGrup.includes(k));

    // Sv.1 uzak sınıflarla başlar, Sv.5 karışanları öne alır
    const yakinOnce = this.difficulty >= 4;
    const sirali = yakinOnce
      ? [...MK.shuffle(yakin), ...MK.shuffle(uzak)]
      : [...MK.shuffle(uzak), ...MK.shuffle(yakin)];
    return sirali.slice(0, adet);
  }

  // ---------------------------------------------------------------
  // OYUN AKIŞI
  // ---------------------------------------------------------------
  start(categoryFilter = null) {
    this.resetProgress();
    this.categoryFilter = categoryFilter;
    this.buildPool();
    this.geoMap.clearAll();
    this.geoMap.resetView();
    return this.nextRound();
  }

  nextRound() {
    this.answered = false;
    this.applySettings();
    if (!this.havuz) this.buildPool();

    const gruplar = Object.keys(this.havuz);
    if (!gruplar.length) {
      return this.baseView({ finished: true, summary: this.buildSummary() });
    }

    const bicimler = ['tur_sor', 'ornek_sor', 'farkli_olan'];
    const bicim = MK.randomOf(bicimler);
    const grupKey = MK.randomOf(gruplar);

    if (bicim === 'tur_sor') return this._turSor(grupKey);
    if (bicim === 'ornek_sor') return this._ornekSor(grupKey);
    return this._farkliOlan(grupKey);
  }

  // --- 1) Yer verilir, türü sorulur ---
  _turSor(grupKey) {
    const grup = OLUSUM_TAKSONOMISI[grupKey];
    const sinifKeys = Object.keys(this.havuz[grupKey]);
    const dogruKey = MK.randomOf(sinifKeys);
    const item = MK.randomOf(this.havuz[grupKey][dogruKey]);

    const celdiriciler = this.celdiriciSiniflar(grupKey, dogruKey, this.optionCount - 1);
    const secenekKeys = MK.shuffle([dogruKey, ...celdiriciler]);

    const secenekler = secenekKeys.map(k => {
      const s = this.sinifBilgisi(grupKey, k);
      return { id: k, label: `${s.icon} ${s.label}`, sub: '' };
    });
    this.current = { bicim: 'tur_sor', grupKey, dogruId: dogruKey, item, secenekler };
    this.geoMap.clearAll();
    this.geoMap.highlightQuestionShape(item);

    return this.baseView({
      badge: `🧬 ${grup.label} · Oluşum Türü`,
      prompt: `<strong>${item.name}</strong> hangi oluşum türündedir?`,
      hint: `Haritada işaretli. ${grup.soruAdi.charAt(0).toUpperCase() + grup.soruAdi.slice(1)}ın oluşum sürecini düşün.`,
      options: secenekler,
      mapPins: null
    });
  }

  // --- 2) Tür verilir, örneği sorulur ---
  _ornekSor(grupKey) {
    const grup = OLUSUM_TAKSONOMISI[grupKey];
    const sinifKeys = Object.keys(this.havuz[grupKey]);
    const dogruKey = MK.randomOf(sinifKeys);
    const dogruSinif = this.sinifBilgisi(grupKey, dogruKey);
    const dogruItem = MK.randomOf(this.havuz[grupKey][dogruKey]);

    // Çeldiriciler: başka sınıflardan gerçek örnekler
    const digerKeys = this.celdiriciSiniflar(grupKey, dogruKey, this.optionCount - 1);
    const celdiriciler = [];
    digerKeys.forEach(k => {
      const aday = MK.shuffle(this.havuz[grupKey][k]).find(x => !celdiriciler.some(c => c.id === x.id));
      if (aday) celdiriciler.push(aday);
    });
    // Sınıf çeşidi yetmezse aynı sınıfın başka örnekleriyle DEĞİL, kalan
    // sınıflardan ikinci örneklerle doldur (yanlış cevap üretmemek için)
    let i = 0;
    while (celdiriciler.length < this.optionCount - 1 && i < digerKeys.length * 3) {
      const k = digerKeys[i % Math.max(1, digerKeys.length)];
      const aday = MK.shuffle(this.havuz[grupKey][k] || []).find(x =>
        x.id !== dogruItem.id && !celdiriciler.some(c => c.id === x.id));
      if (aday) celdiriciler.push(aday); else break;
      i++;
    }

    const secenekler = MK.shuffle([dogruItem, ...celdiriciler]);
    this.current = {
      bicim: 'ornek_sor', grupKey, dogruId: dogruItem.id,
      dogruSinif, secenekler
    };
    this.showPins(secenekler);

    return this.baseView({
      badge: `🧬 ${grup.label} · Örnek Bul`,
      prompt: `Aşağıdakilerden hangisi <strong>${trUpper(dogruSinif.label)}</strong>'dür?`,
      hint: 'Şıklardan seçebilir ya da doğrudan haritadaki pine tıklayabilirsin.',
      options: secenekler.map(it => ({ id: it.id, label: it.name, sub: it.region || '' })),
      mapPins: secenekler
    });
  }

  // --- 3) Farklı oluşumlu olanı bul ---
  _farkliOlan(grupKey) {
    const grup = OLUSUM_TAKSONOMISI[grupKey];
    const sinifKeys = Object.keys(this.havuz[grupKey]);

    // Çoğunluğu oluşturacak sınıfın yeterli örneği olmalı
    const gerekli = this.optionCount - 1;
    const uygunlar = sinifKeys.filter(k => this.havuz[grupKey][k].length >= gerekli);
    if (!uygunlar.length) return this._ornekSor(grupKey);   // yetmiyorsa biçim değiştir

    const cogunlukKey = MK.randomOf(uygunlar);
    const farkliKey = MK.randomOf(this.celdiriciSiniflar(grupKey, cogunlukKey, 3)) ||
                      MK.randomOf(sinifKeys.filter(k => k !== cogunlukKey));
    if (!farkliKey) return this._ornekSor(grupKey);

    const cogunluk = MK.shuffle(this.havuz[grupKey][cogunlukKey]).slice(0, gerekli);
    const farkli = MK.randomOf(this.havuz[grupKey][farkliKey]);
    const secenekler = MK.shuffle([...cogunluk, farkli]);

    this.current = {
      bicim: 'farkli_olan', grupKey, dogruId: farkli.id,
      cogunlukSinif: this.sinifBilgisi(grupKey, cogunlukKey),
      farkliSinif: this.sinifBilgisi(grupKey, farkliKey),
      secenekler
    };
    this.showPins(secenekler);

    return this.baseView({
      badge: `🧬 ${grup.label} · Farklı Olanı Bul`,
      prompt: `Aşağıdaki ${grup.cogulDan} hangisi <strong>diğerlerinden farklı oluşumludur</strong>?`,
      hint: 'Diğerlerinin ortak oluşum türünü bul, dışarıda kalanı işaretle.',
      options: secenekler.map(it => ({ id: it.id, label: it.name, sub: it.region || '' })),
      mapPins: secenekler
    });
  }

  // ---------------------------------------------------------------
  // CEVAP
  // ---------------------------------------------------------------
  select(secilenId) {
    if (!this.isActive || this.answered) return null;
    this.answered = true;

    const c = this.current;
    const dogru = secilenId === c.dogruId;
    if (dogru) { this.score += this.pointsPerRound; this.correctCount++; }

    const grup = OLUSUM_TAKSONOMISI[c.grupKey];

    if (c.bicim === 'tur_sor') {
      const dogruSinif = this.sinifBilgisi(c.grupKey, c.dogruId);
      this.history.push({ left: `${this.round}. ${c.item.name}`, right: dogruSinif.label, ok: dogru });

      return this.baseView({
        badge: `🧬 ${grup.label} · Oluşum Türü`,
        prompt: `<strong>${c.item.name}</strong> hangi oluşum türündedir?`,
        options: c.secenekler.map(o => Object.assign({}, o, {
          state: o.id === c.dogruId ? 'correct' : (o.id === secilenId ? 'wrong' : 'dim')
        })),
        feedback: {
          ok: dogru,
          title: dogru ? `✓ Doğru — ${dogruSinif.label}` : `✗ Yanlış — Doğrusu: ${dogruSinif.label}`,
          rows: [
            { label: c.item.name, value: c.item.type, highlight: true },
            { label: 'Oluşum sınıfı', value: `${dogruSinif.icon} ${dogruSinif.label}` },
            { label: 'Bölge', value: c.item.region || '—' }
          ],
          note: c.item.kpssNot || ''
        },
        showNext: true
      });
    }

    // Örnek bul / farklı olan: şıklar yer adları
    const dogruItem = c.secenekler.find(x => x.id === c.dogruId);
    const baslik = dogru ? `✓ Doğru — ${dogruItem.name}` : `✗ Yanlış — Doğrusu: ${dogruItem.name}`;
    const satirlar = c.secenekler.map(it => {
      const s = FormationTypeGame.siniflandir(it, grup);
      return {
        label: it.name,
        value: s ? `${s.icon} ${s.label}` : (it.type || ''),
        highlight: it.id === c.dogruId
      };
    });
    const not = c.bicim === 'farkli_olan'
      ? `Diğer ${c.secenekler.length - 1} ${grup.label.toLowerCase()} ${c.cogunlukSinif.label.toLowerCase()} sınıfındayken ${dogruItem.name} ${c.farkliSinif.label.toLowerCase()} sınıfındadır. ${dogruItem.kpssNot || ''}`
      : (dogruItem.kpssNot || '');

    this.history.push({
      left: `${this.round}. ${c.bicim === 'farkli_olan' ? 'Farklı olan' : c.dogruSinif.label}`,
      right: dogruItem.name,
      ok: dogru
    });

    return this.baseView({
      badge: c.bicim === 'farkli_olan' ? `🧬 ${grup.label} · Farklı Olanı Bul` : `🧬 ${grup.label} · Örnek Bul`,
      prompt: c.bicim === 'farkli_olan'
        ? `Aşağıdaki ${grup.cogulDan} hangisi <strong>diğerlerinden farklı oluşumludur</strong>?`
        : `Aşağıdakilerden hangisi <strong>${trUpper(c.dogruSinif.label)}</strong>'dür?`,
      options: c.secenekler.map(it => ({
        id: it.id,
        label: it.name,
        sub: it.region || '',
        state: it.id === c.dogruId ? 'correct' : (it.id === secilenId ? 'wrong' : 'dim')
      })),
      feedback: { ok: dogru, title: baslik, rows: satirlar, note: not },
      showNext: true
    });
  }
}
