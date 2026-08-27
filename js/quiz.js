/**
 * KPSS Coğrafya Quiz ve Adaptif Soru Motoru
 * - Coğrafi Mesafe (Haversine km) Tabanlı 5 Kademeli Dinamik Zorluk Sistemi
 * - Ustalık Düzeyi & İyi Bilinen Soruları Seyreltme (Mastery Decay / Spaced Repetition)
 * - Çift Yönlü Test Modları ('find_on_map', 'identify', 'mixed')
 * - Dinamik Şık Sayısı (2, 3, 4, 5 Şık)
 * - Net, Doğrudan ve Sade Soru Metinleri
 */

/**
 * 🗣️ SORU KALIPLARI
 *
 * "Konumdan isim bul" sorusunun başlığı eskiden üç kalıptan ibaretti ve
 * noktasal her kayıt — bir liman, bir sınır kapısı, bir UNESCO mirası, bir
 * maden havzası — hepsi aynı "Haritada işaretli coğrafi konum / merkez
 * hangisidir?" cümlesiyle soruluyordu. Turizm ve ulaşım gibi çok çeşitli
 * kayıt barındıran haritalarda bu, soruyu anlamsızlaştırıyordu.
 *
 * `group` kademesi ise haritada TEK bir şeklin değil, bağlı bir grubun tüm
 * üyelerinin birden parladığı durumu karşılar.
 */
const QUESTION_STEMS = {
  group: {
    ulasim:           { text: 'Haritada birlikte işaretli duraklar/kesimler hangi ulaşım hattını oluşturur?', title: 'ULAŞIM HATTI' },
    maden_bolgeleri:  { text: 'Haritada birlikte işaretli çıkarım merkezleri hangi madene aittir?',           title: 'MADEN HAVZASI' },
    madenler:         { text: 'Haritada birlikte işaretli çıkarım merkezleri hangi madene aittir?',           title: 'MADEN HAVZASI' },
    enerji_bolgeleri: { text: 'Haritada birlikte işaretli tesisler hangi enerji kaynağına aittir?',           title: 'ENERJİ HAVZASI' },
    sanayi:           { text: 'Haritada birlikte işaretli tesisler hangi sanayi koluna aittir?',              title: 'SANAYİ KOLU' },
    tarim:            { text: 'Haritada işaretli üretim merkezinde öne çıkan ürünler hangileridir?',          title: 'ÜRETİM MERKEZİ' },
    hayvancilik:      { text: 'Haritada işaretli yörede öne çıkan hayvancılık faaliyetleri hangileridir?',    title: 'HAYVANCILIK YÖRESİ' },
    turizm:           { text: 'Haritada birlikte işaretli noktalar hangi turizm/kültür değerini oluşturur?',  title: 'TURİZM DEĞERİ' },
    su_kaynaklari:    { text: 'Haritada birlikte işaretli su kütleleri hangileridir?',                        title: 'SU KÜTLELERİ' },
    _:                { text: 'Haritada birlikte işaretli noktalar hangi grubu oluşturur?',                   title: 'BAĞLI GRUP' }
  },
  // Ulaşım grupları tek kalıba sığmaz; `grupKalibiSec` tür metnine bakar.
  ulasimGroup: {
    hat:     { text: 'Haritada birlikte işaretli duraklar/kesimler hangi ulaşım hattını oluşturur?', title: 'ULAŞIM HATTI' },
    liman:   { text: 'Haritada birlikte işaretli limanlar hangi liman grubunu oluşturur?',           title: 'LİMAN GRUBU' },
    sinir:   { text: 'Haritada birlikte işaretli kapılar hangi sınır kapısı grubunu oluşturur?',     title: 'SINIR KAPILARI' },
    gecit:   { text: 'Haritada birlikte işaretli geçitler hangi geçit grubunu oluşturur?',           title: 'GEÇİT GRUBU' },
    ticaret: { text: 'Haritada birlikte işaretli merkezler hangi ticaret ağını oluşturur?',          title: 'TİCARET AĞI' }
  },
  area: {
    tarim:       { text: 'Haritada işaretli tarım / üretim alanı hangisidir?',        title: 'TARIM ALANI' },
    hayvancilik: { text: 'Haritada işaretli hayvancılık yetiştirme alanı hangisidir?', title: 'HAYVANCILIK ALANI' },
    sanayi:      { text: 'Haritada işaretli sanayi / tesis bölgesi hangisidir?',      title: 'SANAYİ BÖLGESİ' },
    iklim:       { text: 'Haritada işaretli iklim / uç değer sahası hangisidir?',     title: 'İKLİM SAHASI' },
    toprak:      { text: 'Haritada işaretli toprak tipi sahası hangisidir?',           title: 'TOPRAK SAHASI' },
    nufus:       { text: 'Haritada işaretli nüfus / yerleşme sahası hangisidir?',     title: 'NÜFUS SAHASI' },
    afet:        { text: 'Haritada işaretli afet riski sahası hangisidir?',            title: 'AFET SAHASI' },
    fay:         { text: 'Haritada işaretli tektonik yapı / deprem bölgesi hangisidir?', title: 'TEKTONİK YAPI' },
    madenler:    { text: 'Haritada işaretli maden / enerji sahası hangisidir?',        title: 'MADEN SAHASI' },
    kiyilar:     { text: 'Haritada işaretli kıyı şekli / ada hangisidir?',             title: 'KIYI SORUSU' },
    orman:       { text: 'Haritada işaretli bitki örtüsü / orman sahası hangisidir?',  title: 'BİTKİ ÖRTÜSÜ' },
    bolgeler:    { text: 'Haritada işaretli coğrafi bölge / bölüm hangisidir?',       title: 'BÖLGE SORUSU' },
    dis_kuvvetler: { text: 'Haritada işaretli yer şekli hangisidir?',                  title: 'YER ŞEKLİ' },
    sehirler:    { text: 'Haritada işaretli il hangisidir?',                          title: 'İL SORUSU' },
    _:           { text: 'Haritada işaretli alan / plato hangisidir?',                title: 'ALAN SORUSU' }
  },
  // ÇİZGİ (polyline) soruları. Eskiden tek bir "akarsu / hat" cümlesi vardı:
  // Dalmaçya tipi bir KIYI ya da Kuzey Anadolu FAYI da "akarsu" diye soruluyordu.
  line: {
    su_kaynaklari: { text: 'Haritada işaretli akarsu hangisidir?',                     title: 'AKARSU SORUSU' },
    daglar:        { text: 'Haritada işaretli sıradağ / dağ kuşağı hangisidir?',       title: 'SIRADAĞ SORUSU' },
    fay:           { text: 'Haritada işaretli fay hattı / tektonik yapı hangisidir?',    title: 'FAY HATTI' },
    gecitler:      { text: 'Haritada işaretli geçit / boğaz hangisidir?',                title: 'GEÇİT SORUSU' },
    kiyilar:       { text: 'Haritada işaretli kıyı tipi / kıyı hattı hangisidir?',       title: 'KIYI TİPİ' },
    afet:          { text: 'Haritada işaretli afet kuşağı / riskli hat hangisidir?',   title: 'AFET KUŞAĞI' },
    ulasim:        { text: 'Haritada işaretli ulaşım hattı hangisidir?',                title: 'ULAŞIM HATTI' },
    dis_kuvvetler: { text: 'Haritada işaretli yer şekli hangisidir?',                    title: 'YER ŞEKLİ' },
    _:             { text: 'Haritada işaretli akarsu / hat hangisidir?',               title: 'HAT SORUSU' }
  },
  point: {
    ulasim:           { text: 'Haritada işaretli ulaşım / ticaret merkezi hangisidir?', title: 'ULAŞIM NOKTASI' },
    turizm:           { text: 'Haritada işaretli turizm / kültür değeri hangisidir?',   title: 'TURİZM DEĞERİ' },
    madenler:         { text: 'Haritada işaretli maden / enerji sahası hangisidir?',    title: 'MADEN SAHASI' },
    maden_bolgeleri:  { text: 'Haritada işaretli maden sahası hangisidir?',             title: 'MADEN SAHASI' },
    enerji_bolgeleri: { text: 'Haritada işaretli enerji tesisi / sahası hangisidir?',   title: 'ENERJİ SAHASI' },
    sanayi:           { text: 'Haritada işaretli sanayi tesisi hangisidir?',            title: 'SANAYİ TESİSİ' },
    sehirler:         { text: 'Haritada işaretli il hangisidir?',                       title: 'İL SORUSU' },
    nufus:            { text: 'Haritada işaretli nüfus / yerleşme örneği hangisidir?',  title: 'NÜFUS SORUSU' },
    gecitler:         { text: 'Haritada işaretli geçit / boğaz hangisidir?',            title: 'GEÇİT SORUSU' },
    tarim:            { text: 'Haritada işaretli tarım ürünü / üretim merkezi hangisidir?', title: 'TARIM SORUSU' },
    hayvancilik:      { text: 'Haritada işaretli hayvancılık faaliyeti hangisidir?',      title: 'HAYVANCILIK SORUSU' },
    su_kaynaklari:    { text: 'Haritada işaretli göl / su kaynağı hangisidir?',          title: 'SU KAYNAĞI' },
    ovalar:           { text: 'Haritada işaretli ova hangisidir?',                       title: 'OVA SORUSU' },
    platolar:         { text: 'Haritada işaretli plato hangisidir?',                     title: 'PLATO SORUSU' },
    daglar:           { text: 'Haritada işaretli dağ / zirve hangisidir?',               title: 'DAĞ SORUSU' },
    kiyilar:          { text: 'Haritada işaretli kıyı şekli / ada / deniz hangisidir?',   title: 'KIYI SORUSU' },
    dis_kuvvetler:    { text: 'Haritada işaretli yer şekli hangisidir?',                 title: 'YER ŞEKLİ' },
    bolgeler:         { text: 'Haritada işaretli coğrafi bölge / bölüm hangisidir?',      title: 'BÖLGE SORUSU' },
    orman:            { text: 'Haritada işaretli bitki örtüsü / orman sahası hangisidir?', title: 'BİTKİ ÖRTÜSÜ' },
    afet:             { text: 'Haritada işaretli afet riski sahası hangisidir?',         title: 'AFET SAHASI' },
    toprak:           { text: 'Haritada işaretli toprak tipi sahası hangisidir?',        title: 'TOPRAK SAHASI' },
    fay:              { text: 'Haritada işaretli fay / tektonik yapı hangisidir?',        title: 'TEKTONİK YAPI' },
    iklim:            { text: 'Haritada işaretli iklim / uç değer sahası hangisidir?',    title: 'İKLİM SAHASI' },
    _:                { text: 'Haritada işaretli coğrafi konum / merkez hangisidir?',   title: 'KONUM SORUSU' }
  }
};

class GeographyQuiz {
  constructor(categoryKey = 'daglar', customDrawManager = null) {
    this.categoryKey = categoryKey;
    this.customDrawManager = customDrawManager;
    // Alt tür rozeti KATEGORİ BAŞINA hatırlanır: "Dağlar › Volkanik" seçip
    // Sular'a geçip geri dönen kullanıcı rozetini kaybediyordu.
    this.activeSubType = this.loadSubType(categoryKey); // 'all', 'volkanik', 'kirik', vb.
    this.customPool = null; // Oyun modlarının (ör. Harita Fatihi) kategori dışı global havuzu
    this.items = [];
    this.remainingPool = [];
    this.wrongPool = [];
    
    this.currentQuestion = null;
    this.lastQuestionId = null;
    this.recentQuestionIds = []; // Son sorulanların geçmiş hafızası
    this.currentOptions = [];
    this.isAnswered = false;
    this.optionCount = this.loadOptionCount(); // 2, 3, 4, 5, 6, 8, 'all'
    this.difficultyLevel = this.loadDifficultyLevel(); // 1, 2, 3, 4, 5
    this.homogeneityLevel = this.loadHomogeneityLevel(); // 1 (Bilinmeyen/Yanlışlar ön planda) - 5 (Tam homojen / eşit)
    this.dynamicGroupSampling = this.loadDynamicGroupSampling(); // Çok merkezli maden/grup havzalarında dinamik alt küme (true/false)
    this.quizFormat = this.loadQuizFormat(); // 'identify', 'find_on_map', 'mixed'
    this.currentActualFormat = 'identify';

    // Genel Test İstatistikleri
    this.stats = this.loadStats();

    // Soru Bazlı Adaptif Analitik
    this.analytics = this.loadAnalytics();

    this.reloadCategoryItems();
  }

  loadStats() {
    const saved = localStorage.getItem('kpss_cografya_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Hata durumunda varsayılan
      }
    }
    return {
      correct: 0,
      wrong: 0,
      streak: 0,
      bestStreak: 0
    };
  }

  saveStats() {
    localStorage.setItem('kpss_cografya_stats', JSON.stringify(this.stats));
  }

  resetStats() {
    this.stats = {
      correct: 0,
      wrong: 0,
      streak: 0,
      bestStreak: 0
    };
    this.saveStats();
  }

  resetAllProgress() {
    this.stats = {
      correct: 0,
      wrong: 0,
      streak: 0,
      bestStreak: 0
    };
    this.saveStats();

    this.analytics = {};
    this.saveAnalytics();

    this.wrongPool = [];
    this.recentQuestionIds = [];

    localStorage.removeItem('kpss_cografya_stats');
    localStorage.removeItem('kpss_cografya_question_analytics');
    localStorage.removeItem('kpss_mistakes_bank');
    localStorage.removeItem('kpss_speedrun_best_score');
    localStorage.removeItem('kpss_gunun_plani_v1');
    localStorage.removeItem('kpss_cografya_conqueror_progress');

    this.reloadCategoryItems();
  }

  loadAnalytics() {
    const saved = localStorage.getItem('kpss_cografya_question_analytics');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Hata durumunda varsayılan
      }
    }
    return {};
  }

  saveAnalytics() {
    localStorage.setItem('kpss_cografya_question_analytics', JSON.stringify(this.analytics));
  }

  loadQuizFormat() {
    const saved = localStorage.getItem('kpss_cografya_quiz_format');
    return saved || 'find_on_map';
  }

  setQuizFormat(format) {
    this.quizFormat = format;
    localStorage.setItem('kpss_cografya_quiz_format', format);
  }

  getQuizFormat() {
    return this.quizFormat;
  }

  loadDifficultyLevel() {
    const saved = localStorage.getItem('kpss_cografya_difficulty');
    return saved ? parseInt(saved, 10) : 5;
  }

  setDifficultyLevel(level) {
    this.difficultyLevel = Math.max(1, Math.min(5, level));
    localStorage.setItem('kpss_cografya_difficulty', this.difficultyLevel.toString());
  }

  getDifficultyLevel() {
    return this.difficultyLevel;
  }

  loadHomogeneityLevel() {
    const saved = localStorage.getItem('kpss_cografya_homogeneity');
    return saved ? parseInt(saved, 10) : 3;
  }

  setHomogeneityLevel(level) {
    this.homogeneityLevel = Math.max(1, Math.min(5, parseInt(level, 10) || 3));
    localStorage.setItem('kpss_cografya_homogeneity', this.homogeneityLevel.toString());
  }

  getHomogeneityLevel() {
    return this.homogeneityLevel;
  }

  loadDynamicGroupSampling() {
    const saved = localStorage.getItem('kpss_dynamic_group_sampling');
    return saved !== null ? (saved === 'true') : true; // Varsayılan: açık (true)
  }

  setDynamicGroupSampling(enabled) {
    this.dynamicGroupSampling = !!enabled;
    localStorage.setItem('kpss_dynamic_group_sampling', this.dynamicGroupSampling.toString());
  }

  getDynamicGroupSampling() {
    return this.dynamicGroupSampling;
  }

  toggleDynamicGroupSampling() {
    this.setDynamicGroupSampling(!this.dynamicGroupSampling);
    return this.dynamicGroupSampling;
  }

  loadOptionCount() {
    const saved = localStorage.getItem('kpss_cografya_option_count');
    if (saved === 'all') return 'all';
    return saved ? parseInt(saved, 10) : 4;
  }

  setOptionCount(count) {
    if (count === 'all' || count === 'celal') {
      this.optionCount = 'all';
    } else {
      const parsed = parseInt(count, 10);
      this.optionCount = isNaN(parsed) ? 4 : Math.max(2, Math.min(8, parsed));
    }
    localStorage.setItem('kpss_cografya_option_count', this.optionCount.toString());
  }

  getOptionCount() {
    return this.optionCount;
  }

  /** Kategori başına kayıtlı alt tür rozetleri */
  loadSubTypeMap() {
    try {
      return JSON.parse(localStorage.getItem('kpss_cografya_sub_types') || '{}') || {};
    } catch (e) { return {}; }
  }

  loadSubType(categoryKey) {
    return this.loadSubTypeMap()[categoryKey] || 'all';
  }

  saveSubType(categoryKey, subTypeId) {
    const harita = this.loadSubTypeMap();
    if (!subTypeId || subTypeId === 'all') delete harita[categoryKey];
    else harita[categoryKey] = subTypeId;
    try { localStorage.setItem('kpss_cografya_sub_types', JSON.stringify(harita)); }
    catch (e) { /* kota dolu: rozet kalıcı olmaz, oyun etkilenmez */ }
  }

  setSubType(subTypeId) {
    this.activeSubType = subTypeId || 'all';
    this.saveSubType(this.categoryKey, this.activeSubType);
    this.reloadCategoryItems();
    this.currentQuestion = null;
    this.recentQuestionIds = [];
    this.isAnswered = false;
  }

  getSubType() {
    return this.activeSubType;
  }

  // Oyun modlari icin kategori/alt tur filtresini by-pass eden global havuz.
  // preserveState=true: ekranda duran soruyu, cevaplanma durumunu ve
  // tekrar-koruma hafizasini bozmadan yalnizca havuzu daraltir.
  setCustomPool(items, preserveState = false) {
    const recent = this.recentQuestionIds.slice();
    const wasAnswered = this.isAnswered;
    const activeQuestion = this.currentQuestion;

    this.customPool = (items && items.length) ? [...items] : null;
    this.reloadCategoryItems();

    if (preserveState) {
      this.recentQuestionIds = recent;
      this.isAnswered = wasAnswered;
      this.currentQuestion = activeQuestion;
    } else {
      this.currentQuestion = null;
      this.recentQuestionIds = [];
      this.isAnswered = false;
    }
  }

  clearCustomPool() {
    if (!this.customPool) return;
    this.setCustomPool(null);
  }

  reloadCategoryItems() {
    if (this.customPool) {
      // Özel havuzlar (fatih, deneme, şimşek, yanlışlarım) da birleştirilir
      this.items = typeof gruplaHavuz === 'function'
        ? gruplaHavuz(this.customPool)
        : [...this.customPool];
      this.remainingPool = [...this.items];
      this.wrongPool = [];
      this.recentQuestionIds = [];
      return;
    }

    let source = [];
    if (this.categoryKey === 'ozel_cizimler') {
      source = this.customDrawManager ? this.customDrawManager.getRawQuizItems() : [];
    } else {
      const defaultItems = COGRAFYA_DATA[this.categoryKey] || [];
      const userAddedItems = this.customDrawManager ? this.customDrawManager.getDrawingsByCategory(this.categoryKey) : [];
      source = [...defaultItems, ...userAddedItems];
    }

    // Alt tür süzgeci BİRLEŞTİRMEDEN ÖNCE uygulanır: aksi halde "Volkanik
    // Dağlar" filtresi, grubun volkanik olmayan üyesini de içeri sokardı.
    if (this.activeSubType && this.activeSubType !== 'all' && typeof SUB_TYPES !== 'undefined' && SUB_TYPES[this.categoryKey]) {
      const subObj = SUB_TYPES[this.categoryKey].find(s => s.id === this.activeSubType);
      if (subObj && typeof subObj.filter === 'function') {
        source = source.filter(subObj.filter);
      }
    }

    // Aynı cevabı temsil eden kayıtlar tek bir ortak cevaba indirgenir
    if (typeof gruplaHavuz === 'function') source = gruplaHavuz(source);

    this.items = source;
    this.remainingPool = [...this.items];
    this.wrongPool = [];
    this.recentQuestionIds = [];
  }

  setCategory(categoryKey) {
    this.categoryKey = categoryKey;
    // Kategorinin en son kullanılan alt tür rozeti geri yüklenir
    this.activeSubType = this.loadSubType(categoryKey);
    this.reloadCategoryItems();
    this.currentQuestion = null;
    this.recentQuestionIds = [];
    this.isAnswered = false;
  }

  // Haversine Mesafe Formülü (KM)
  getDistanceInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }

  // Ustalık Düzeyi & Hata Ağırlığı & Dinamik Homojenlik Enterpolasyonu
  calculateItemWeight(item) {
    // Düzey 5 ise TAM HOMOJEN: tüm sorular geçmişten bağımsız eşit ihtimalle (1.0) gelir.
    if (this.homogeneityLevel === 5) {
      return 1.0;
    }

    const itemAnalytics = this.analytics[item.id] || { wrongCount: 0, correctCount: 0, streak: 0 };
    const correctCount = itemAnalytics.correctCount || 0;
    const wrongCount = itemAnalytics.wrongCount || 0;
    const streak = itemAnalytics.streak || 0;
    const totalCount = correctCount + wrongCount;

    let rawWeight = 1.0;

    // 🎓 5. kez sorulan ve bilinen cevaplar soru havuzunda nadiren çıkar
    if (correctCount >= 5 && streak >= 2) {
      rawWeight = 0.05; // %95 seyreltme (çok nadir)
    } else if (correctCount >= 5) {
      rawWeight = 0.12;
    } else if (streak >= 3) {
      rawWeight = 0.35;
    } else if (streak >= 1) {
      rawWeight = 0.7;
    } else if (totalCount === 0) {
      // ✨ Hiç sorulmamış / bilinmeyen yeni soru ön planda gelsin
      rawWeight = 1.8;
    }

    // ⚠️ Yanlış bilinen soruların ağırlığı katlanarak artar
    if (wrongCount > 0) {
      const wrongBoost = 1.5 + Math.min(3.5, wrongCount * 0.8);
      // Son denemede de hata yapıldıysa önceliği daha da artır
      const freshMistakeBonus = (streak === 0) ? 0.8 : 0.0;
      rawWeight = Math.max(rawWeight, wrongBoost + freshMistakeBonus);
    }

    // Homojenlik Seviyesi Enterpolasyonu:
    // Düzey 1 -> alpha = 1.0 (Tam adaptif / bilinmeyen ve yanlışlar ön planda, 5+ bilinenler nadir)
    // Düzey 5 -> alpha = 0.0 (Tam homojen / eşit ağırlık)
    const alpha = (5 - this.homogeneityLevel) / 4.0;
    const finalWeight = Math.max(0.02, 1.0 + (rawWeight - 1.0) * alpha);

    return finalWeight;
  }

  getWeightedRandomItem(pool) {
    if (pool.length === 0) return null;
    if (pool.length === 1) return pool[0];

    const weights = pool.map(item => this.calculateItemWeight(item));
    const totalWeight = weights.reduce((acc, w) => acc + w, 0);

    let randomVal = Math.random() * totalWeight;
    for (let i = 0; i < pool.length; i++) {
      randomVal -= weights[i];
      if (randomVal <= 0) {
        return pool[i];
      }
    }

    return pool[pool.length - 1];
  }

  // 📍 Coğrafi Konum Çıkarıcı & Merkez Hesaplayıcı
  getItemCoord(item) {
    if (!item) return null;
    if (typeof item.lat === 'number' && typeof item.lng === 'number') {
      return { lat: item.lat, lng: item.lng };
    }
    if (item.geom && typeof item.geom.lat === 'number' && typeof item.geom.lng === 'number') {
      return { lat: item.geom.lat, lng: item.geom.lng };
    }
    const coords = item.coordinates || item.points || (item.geom && item.geom.c);
    if (Array.isArray(coords) && coords.length > 0) {
      let sumLat = 0, sumLng = 0, count = 0;
      coords.forEach(p => {
        if (Array.isArray(p) && p.length >= 2) {
          sumLat += p[0];
          sumLng += p[1];
          count++;
        }
      });
      if (count > 0) {
        return { lat: sumLat / count, lng: sumLng / count };
      }
    }
    return null;
  }

  // 📍 Benzersiz Konum Anahtarı
  getItemLocationKey(item) {
    if (!item) return '';
    if (item.groupId) return `grp:${item.groupId}`;
    const coord = this.getItemCoord(item);
    if (coord) {
      return `loc:${coord.lat.toFixed(2)},${coord.lng.toFixed(2)}`;
    }
    return `id:${item.id}`;
  }

  // 🛡️ Çakışma Kontrolü: İki varlık aynı konumu / şehri mi temsil ediyor?
  areLocationsSame(itemA, itemB) {
    if (!itemA || !itemB) return false;
    if (itemA.id === itemB.id) return true;

    // Ortak bir groupId paylaşımı
    if (itemA.groupId && itemB.groupId && itemA.groupId === itemB.groupId) {
      return true;
    }

    // Grup üyeleri listesi kontrolü (composite grup)
    const membersA = itemA.memberIds || (itemA.groupItems && itemA.groupItems.map(m => m.id)) || [itemA.id];
    const membersB = itemB.memberIds || (itemB.groupItems && itemB.groupItems.map(m => m.id)) || [itemB.id];
    if (membersA.some(id => membersB.includes(id))) {
      return true;
    }

    const coordA = this.getItemCoord(itemA);
    const coordB = this.getItemCoord(itemB);
    if (!coordA || !coordB) return false;

    // Mesafe kontrolü: 30 km altındaki veya aynı koordinattaki tüm noktalar aynı konumu temsil eder
    const distKm = this.getDistanceInKm(coordA.lat, coordA.lng, coordB.lat, coordB.lng);
    if (distKm <= 30) {
      return true;
    }

    const latDiff = Math.abs(coordA.lat - coordB.lat);
    const lngDiff = Math.abs(coordA.lng - coordB.lng);
    if (latDiff < 0.25 && lngDiff < 0.25) {
      return true;
    }

    // Aynı il/şehir ismi taşıyan noktasal varlıklar
    const isPointA = (itemA.shapeType === 'point' || !itemA.coordinates || itemA.coordinates.length <= 1);
    const isPointB = (itemB.shapeType === 'point' || !itemB.coordinates || itemB.coordinates.length <= 1);
    if (isPointA && isPointB && itemA.city && itemB.city) {
      const cityA = itemA.city.toLowerCase().trim();
      const cityB = itemB.city.toLowerCase().trim();
      if (cityA === cityB && cityA.length > 2 && !cityA.includes('-') && !cityA.includes('&')) {
        return true;
      }
    }

    return false;
  }

  // 🎲 Birleşik / Bağlı Grup Elemanları İçin Rastgele Alt Küme Örneklemesi (En az 2, tekli 1)
  sampleGroupItems(item) {
    if (!item) return item;
    if (!item.isGroup || !Array.isArray(item.groupItems) || item.groupItems.length <= 1) {
      if (item.isGroup && Array.isArray(item.groupItems)) {
        item.displayGroupItems = [...item.groupItems];
      }
      return item;
    }
    // Eğer dinamik alt küme örneklemesi kapalıysa tüm elemanları havuza/gösterime dahil et
    if (!this.dynamicGroupSampling) {
      item.displayGroupItems = [...item.groupItems];
      return item;
    }
    const total = item.groupItems.length;
    // 2 ile total arasında rastgele k eleman seç
    const k = Math.floor(Math.random() * (total - 2 + 1)) + 2;
    const shuffled = [...item.groupItems].sort(() => 0.5 - Math.random());
    item.displayGroupItems = shuffled.slice(0, k);
    return item;
  }

  // Zorluğa Göre Çeldirici Seçimi (Çakışan Konum ve Çift Şık Korumalı)
  selectDistractorsByProximity(targetQuestion, candidatePool, count) {
    // 1. targetQuestion ile aynı konumdaki tüm adayları kesinlikle ele
    let validCandidates = candidatePool.filter(item => 
      item.id !== targetQuestion.id && !this.areLocationsSame(item, targetQuestion)
    );

    const tCoord = this.getItemCoord(targetQuestion) || { lat: targetQuestion.lat || 0, lng: targetQuestion.lng || 0 };

    const withDistance = validCandidates.map(item => {
      const coord = this.getItemCoord(item) || { lat: item.lat || 0, lng: item.lng || 0 };
      const dist = this.getDistanceInKm(tCoord.lat, tCoord.lng, coord.lat, coord.lng);
      return { item, distance: dist };
    }).sort((a, b) => a.distance - b.distance);

    const totalCandidates = withDistance.length;
    let poolSlice = [];

    if (this.difficultyLevel === 6 || this.difficultyLevel === 5) {
      const sliceSize = Math.max(count * 3, Math.min(count * 4, totalCandidates));
      poolSlice = withDistance.slice(0, sliceSize).map(d => d.item);
    } 
    else if (this.difficultyLevel === 4) {
      const sliceSize = Math.max(count * 3, Math.ceil(totalCandidates * 0.5));
      poolSlice = withDistance.slice(0, sliceSize).map(d => d.item);
    } 
    else if (this.difficultyLevel === 3) {
      const start = Math.floor(totalCandidates * 0.15);
      const end = Math.ceil(totalCandidates * 0.85);
      poolSlice = withDistance.slice(start, Math.max(start + count * 3, end)).map(d => d.item);
    } 
    else if (this.difficultyLevel === 2) {
      const start = Math.floor(totalCandidates * 0.4);
      poolSlice = withDistance.slice(start).map(d => d.item);
    } 
    else {
      const start = Math.max(0, totalCandidates - count * 4);
      poolSlice = withDistance.slice(start).map(d => d.item);
    }

    poolSlice.sort(() => 0.5 - Math.random());

    // Konum tekilleştirme: Hem targetQuestion hem de daha önce seçilen çeldiricilerle aynı konumda olanları engelle
    const selected = [];
    for (const item of poolSlice) {
      if (selected.length >= count) break;
      const conflictsWithSelected = selected.some(s => this.areLocationsSame(s, item));
      const conflictsWithTarget = this.areLocationsSame(targetQuestion, item);
      if (!conflictsWithSelected && !conflictsWithTarget) {
        selected.push(item);
      }
    }

    // Yeterli çeldirici bulunamadıysa kalan adaylardan konum çakışması yapmayanları ekle
    if (selected.length < count) {
      for (const d of withDistance) {
        if (selected.length >= count) break;
        const item = d.item;
        if (!selected.some(s => s.id === item.id)) {
          const conflictsWithSelected = selected.some(s => this.areLocationsSame(s, item));
          const conflictsWithTarget = this.areLocationsSame(targetQuestion, item);
          if (!conflictsWithSelected && !conflictsWithTarget) {
            selected.push(item);
          }
        }
      }
    }

    // Kategori havuzunda yeterli benzersiz konum yoksa genel veri havuzundan takviye et
    if (selected.length < count && typeof COGRAFYA_DATA !== 'undefined') {
      const allGlobalItems = [];
      Object.keys(COGRAFYA_DATA).forEach(cat => {
        allGlobalItems.push(...COGRAFYA_DATA[cat]);
      });
      allGlobalItems.sort(() => 0.5 - Math.random());

      for (const item of allGlobalItems) {
        if (selected.length >= count) break;
        if (item.id === targetQuestion.id) continue;
        const conflictsWithSelected = selected.some(s => this.areLocationsSame(s, item));
        const conflictsWithTarget = this.areLocationsSame(targetQuestion, item);
        if (!conflictsWithSelected && !conflictsWithTarget) {
          selected.push(item);
        }
      }
    }

    return selected;
  }

  /**
   * 🗣️ SORU BAŞLIĞI ÜRETİCİSİ (tek kaynak)
   *
   * Deneme Sınavı ve Günlük Plan modları eskiden kendi başlıklarını kuruyordu ve
   * buradaki iyileştirmelerin hiçbirini görmüyordu: "📍 Demir (Divriği) (Metalik
   * Maden)" gibi hem cevabın ilini hem türünü söyleyen başlıklar, birleşik bir
   * havza için "İşaretli Yer Şekli Nedir?" gibi kalıplar üretiyorlardı. Artık
   * bütün modlar bu tek üreticiden geçer.
   */
  buildQuestionText(item, actualFormat) {
    if (!item) return { questionText: '', questionTypeTitle: 'SORU' };

    // 1) Veride hazır, tam bir soru cümlesi varsa (ilişkili eşleştirmeler)
    if (item.questionText) {
      return { questionText: item.questionText, questionTypeTitle: 'İLİŞKİLİ EŞLEŞTİRME' };
    }

    // 2) İSİMDEN HARİTADA BUL
    if (actualFormat === 'find_on_map') {
      // Önce veride elle yazılmış KPSS soru kökü denenir: "📍 Yozgat Çamlığı ?"
      // yerine "1958'de ilan edilen İLK MİLLİ PARK haritada neresidir?" sorulur.
      // `guvenliSoruKoku` cevabın ilini söyleyen kökleri eler.
      const kok = (typeof guvenliSoruKoku === 'function')
        ? guvenliSoruKoku(item, 'find_on_map') : null;
      if (kok) {
        return {
          questionText: '<span style="color: #60a5fa; font-weight:700;">📍</span> ' + kok,
          questionTypeTitle: 'HARİTADA BUL'
        };
      }
      // Şehir/yöre ipucu içeren parantezleri temizle (ör. "Fındık (Giresun - Ordu)"
      // -> "Fındık"). Temizlik `shortName` için de geçerlidir; aksi halde
      // "Demir (Divriği)" gibi kısa adlar cevabın ilini başlıkta açık ederdi.
      const safeName = (typeof haritadaBulEtiketi === 'function')
        ? haritadaBulEtiketi(item)
        : (item.shortName || item.name || '').replace(/\s*\([^)]*\)/g, '').trim();
      return {
        questionText: '📍 <span style="color: #60a5fa; font-weight:800; font-size: 1.15rem;">' + safeName + ' ?</span>',
        questionTypeTitle: 'HARİTADA BUL'
      };
    }

    // 3) KONUMDAN İSMİ BUL
    const cat = item.category;
    const cokluMu = !!item.isGroup || item.shapeType === 'composite';

    // Bağlı grupta bir üyenin kökü grubu anlatmaz; grup kalıbı kullanılır.
    if (cokluMu) {
      const grupKalibi = this.grupKalibiSec(cat, item.type);
      return { questionText: grupKalibi.text, questionTypeTitle: grupKalibi.title };
    }

    // Veride yazılı soru kökü, şıkta yazan adı ele vermiyorsa jenerik kalıbın
    // yerine geçer. Rozet başlığı kategori kalıbından alınmaya devam eder.
    const kok = (typeof guvenliSoruKoku === 'function')
      ? guvenliSoruKoku(item, 'identify') : null;

    let kalip;
    if (item.shapeType === 'polyline')      kalip = QUESTION_STEMS.line[cat]  || QUESTION_STEMS.line._;
    else if (item.shapeType === 'polygon')  kalip = QUESTION_STEMS.area[cat]  || QUESTION_STEMS.area._;
    else                                    kalip = QUESTION_STEMS.point[cat] || QUESTION_STEMS.point._;

    return { questionText: kok || kalip.text, questionTypeTitle: kalip.title };
  }

  /**
   * Bağlı grup kalıbını seçer. Ulaşım paketi tek bir kalıba sığmıyor: aynı
   * kategoride hem "İzmir - Aydın hattı" (bir HAT) hem "Kuşadası & Çeşme"
   * (iki LİMAN) hem de "Gürbulak & Kapıköy" (iki SINIR KAPISI) var. Hepsini
   * "hangi ulaşım hattını oluşturur?" diye sormak saçmalıyordu; kalıp grubun
   * kendi tür metninden seçilir.
   */
  grupKalibiSec(cat, type) {
    if (cat === 'ulasim') {
      // DİKKAT: `type` composite'te üyelerin türlerinin birleşimidir; sıra
      // önemlidir. Örnek: TEM'in türü "Otoyol / ... & Otoyol / Bolu Dağı
      // TÜNELİ ..." olduğu için "tünel" araması otoyolu geçit sanıyordu.
      // Aynı şekilde "Demiryolu / Demiryolu Bağlantılı LİMAN" bir hat değil,
      // bir liman grubudur. En belirleyici anahtar önce sınanır.
      const t = (type || '').toLocaleLowerCase('tr-TR');
      const alt = QUESTION_STEMS.ulasimGroup;
      if (t.includes('liman')) return alt.liman;
      if (t.includes('sınır kapısı')) return alt.sinir;
      if (t.includes('otoyol') || t.includes('demiryolu') || t.includes('boru hattı')) return alt.hat;
      if (t.includes('geçit') || t.includes('tünel')) return alt.gecit;
      if (t.includes('serbest bölge') || t.includes('ticaret')) return alt.ticaret;
      return alt.hat;
    }
    return QUESTION_STEMS.group[cat] || QUESTION_STEMS.group._;
  }

  // Yeni Soru Üret (Deste Sistemi & Geçmiş Hafıza Korumalı)
  nextQuestion() {
    if (!this.items || this.items.length === 0) {
      this.reloadCategoryItems();
      if (this.items.length === 0) return null;
    }

    if (this.remainingPool.length === 0) {
      if (this.wrongPool.length > 0) {
        this.remainingPool = [...this.wrongPool];
        this.wrongPool = [];
      } else {
        this.remainingPool = [...this.items];
      }
    }

    // 🛡️ GEÇMİŞ SORU FİLTRESİ: Son sorulan soruların (recentQuestionIds) hemen tekrar gelmesini engelle
    const maxRecentMemory = Math.min(Math.max(1, Math.floor(this.items.length * 0.5)), 8);
    let candidateSelectionPool = this.remainingPool.filter(i => !this.recentQuestionIds.includes(i.id));

    // Eğer kalan havuzdaki tüm elemanlar recentQuestionIds içindeyse, kalan havuzdan seç
    if (candidateSelectionPool.length === 0) {
      candidateSelectionPool = this.remainingPool;
    }

    const selectedQuestion = this.getWeightedRandomItem(candidateSelectionPool);
    this.currentQuestion = selectedQuestion;
    this.lastQuestionId = selectedQuestion.id;

    // Recent listesine ekle ve FIFO sınırla
    this.recentQuestionIds.push(selectedQuestion.id);
    if (this.recentQuestionIds.length > maxRecentMemory) {
      this.recentQuestionIds.shift();
    }

    // Kalan havuzdan çıkar (deste mantığıyla tükenir)
    this.remainingPool = this.remainingPool.filter(i => i.id !== selectedQuestion.id);
    this.isAnswered = false;

    if (this.quizFormat === 'mixed') {
      this.currentActualFormat = Math.random() > 0.5 ? 'find_on_map' : 'identify';
    } else {
      this.currentActualFormat = this.quizFormat;
    }

    const itemAnalytics = this.analytics[selectedQuestion.id] || { wrongCount: 0, correctCount: 0, streak: 0 };
    const correctCount = itemAnalytics.correctCount || 0;
    const wrongCount = itemAnalytics.wrongCount || 0;
    const totalCount = correctCount + wrongCount;
    const isProblematic = wrongCount >= 2 && wrongCount > correctCount;
    const isMastered = itemAnalytics.streak >= 3;
    const isMastered5 = correctCount >= 5;
    const isNew = totalCount === 0;

    if (this.optionCount === 'all') {
      if (this.currentActualFormat === 'find_on_map') {
        // 🌋 CELAL ŞENGÖR HARİTADA BUL: Bu kategorideki TÜM benzersiz konumlar haritada yer alır!
        // Doğru cevabın üstüne binen tüm diğer varlıklar elenir; her benzersiz konumdan sadece 1 temsilci gösterilir.
        const uniqueOptions = [this.currentQuestion];
        const usedLocKeys = new Set();
        usedLocKeys.add(this.getItemLocationKey(this.currentQuestion));

        const shuffledPool = [...this.items].sort(() => 0.5 - Math.random());
        for (const item of shuffledPool) {
          if (item.id === this.currentQuestion.id) continue;
          if (this.areLocationsSame(item, this.currentQuestion)) continue;
          const locKey = this.getItemLocationKey(item);
          if (!usedLocKeys.has(locKey)) {
            usedLocKeys.add(locKey);
            uniqueOptions.push(item);
          }
        }
        this.currentOptions = uniqueOptions.sort(() => 0.5 - Math.random());
      } else {
        // 🌋 CELAL ŞENGÖR KONUMDAN İSİM BUL: Tam 10 adet zorlu şık üretilir!
        let candidatePool = this.items.filter(item => item.id !== this.currentQuestion.id && !this.areLocationsSame(item, this.currentQuestion));
        if (candidatePool.length < 9) {
          const allGlobalItems = [];
          Object.keys(COGRAFYA_DATA).forEach(cat => {
            allGlobalItems.push(...COGRAFYA_DATA[cat]);
          });
          const additionalOthers = allGlobalItems.filter(
            item => item.id !== this.currentQuestion.id && 
                    !this.areLocationsSame(item, this.currentQuestion) && 
                    !candidatePool.some(o => o.id === item.id)
          );
          candidatePool = [...candidatePool, ...additionalOthers];
        }

        const distractors = this.selectDistractorsByProximity(this.currentQuestion, candidatePool, 9);
        this.currentOptions = [this.currentQuestion, ...distractors].sort(() => 0.5 - Math.random());
      }
    } else {
      const targetDistractorCount = parseInt(this.optionCount, 10) - 1;
      let candidatePool = this.items.filter(item => 
        item.id !== this.currentQuestion.id && !this.areLocationsSame(item, this.currentQuestion)
      );

      if (candidatePool.length < targetDistractorCount) {
        const allGlobalItems = [];
        Object.keys(COGRAFYA_DATA).forEach(cat => {
          allGlobalItems.push(...COGRAFYA_DATA[cat]);
        });
        const additionalOthers = allGlobalItems.filter(
          item => item.id !== this.currentQuestion.id && 
                  !this.areLocationsSame(item, this.currentQuestion) && 
                  !candidatePool.some(o => o.id === item.id)
        );
        candidatePool = [...candidatePool, ...additionalOthers];
      }

      const distractors = this.selectDistractorsByProximity(this.currentQuestion, candidatePool, targetDistractorCount);
      this.currentOptions = [this.currentQuestion, ...distractors].sort(() => 0.5 - Math.random());
    }

    // 🎲 Birleşik / Bağlı Grup Elemanları İçin Rastgele Alt Küme Örneklemesi
    this.currentQuestion = this.sampleGroupItems(this.currentQuestion);
    this.currentOptions = (this.currentOptions || []).map(opt => this.sampleGroupItems(opt));

    const { questionText, questionTypeTitle } =
      this.buildQuestionText(this.currentQuestion, this.currentActualFormat);

    return {
      question: this.currentQuestion,
      options: this.currentOptions,
      questionText,
      questionTypeTitle,
      actualFormat: this.currentActualFormat,
      isProblematic,
      isMastered,
      isMastered5,
      isNew,
      wrongCount: itemAnalytics.wrongCount,
      correctCount: itemAnalytics.correctCount,
      streak: itemAnalytics.streak,
      difficultyLevel: this.difficultyLevel,
      homogeneityLevel: this.homogeneityLevel
    };
  }

  // Cevabı doğrula
  checkAnswer(selectedId) {
    if (this.isAnswered || !this.currentQuestion) return null;
    this.isAnswered = true;

    const q = this.currentQuestion;

    // Seçilen elemanı bul (çapraz grup kimliği eşleşmesi için)
    let selectedItem = null;
    if (this.currentOptions) {
      selectedItem = this.currentOptions.find(o => o.id === selectedId);
    }
    if (!selectedItem && typeof COGRAFYA_DATA !== 'undefined') {
      const cats = Object.keys(COGRAFYA_DATA);
      for (let i = 0; i < cats.length; i++) {
        selectedItem = (COGRAFYA_DATA[cats[i]] || []).find(it => it.id === selectedId);
        if (selectedItem) break;
      }
    }

    const isCorrect = (selectedId === q.id) || 
                      (q.isGroup && Array.isArray(q.memberIds) && q.memberIds.includes(selectedId)) ||
                      (q.groupId && (selectedId === q.groupId)) ||
                      (q.groupId && selectedItem && selectedItem.groupId && (q.groupId === selectedItem.groupId)) ||
                      (selectedItem && this.areLocationsSame(selectedItem, q));
    const qId = q.id;

    if (!this.analytics[qId]) {
      this.analytics[qId] = { wrongCount: 0, correctCount: 0, streak: 0, lastSeen: Date.now() };
    }

    if (isCorrect) {
      this.stats.correct++;
      this.stats.streak++;
      if (this.stats.streak > this.stats.bestStreak) {
        this.stats.bestStreak = this.stats.streak;
      }

      this.analytics[qId].correctCount++;
      this.analytics[qId].streak++;
      this.analytics[qId].lastSeen = Date.now();
    } else {
      this.stats.wrong++;
      this.stats.streak = 0;

      this.analytics[qId].wrongCount++;
      this.analytics[qId].streak = 0;
      this.analytics[qId].lastSeen = Date.now();

      if (!this.wrongPool.some(i => i.id === this.currentQuestion.id)) {
        this.wrongPool.push(this.currentQuestion);
      }
    }

    this.saveStats();
    this.saveAnalytics();

    return {
      isCorrect,
      currentQuestion: this.currentQuestion,
      correctId: this.currentQuestion.id,
      memberIds: this.currentQuestion.memberIds || [this.currentQuestion.id],
      isGroup: !!this.currentQuestion.isGroup,
      selectedId,
      kpssNot: this.currentQuestion.kpssNot,
      type: this.currentQuestion.type,
      region: this.currentQuestion.region,
      name: this.currentQuestion.name,
      shapeType: this.currentQuestion.shapeType || 'point',
      actualFormat: this.currentActualFormat,
      stats: this.stats,
      questionAnalytics: this.analytics[qId]
    };
  }

  getSuccessRate() {
    const total = this.stats.correct + this.stats.wrong;
    if (total === 0) return 0;
    return Math.round((this.stats.correct / total) * 100);
  }
}
