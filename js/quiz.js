/**
 * KPSS Coğrafya Quiz ve Adaptif Soru Motoru
 * - Coğrafi Mesafe (Haversine km) Tabanlı 5 Kademeli Dinamik Zorluk Sistemi
 * - Ustalık Düzeyi & İyi Bilinen Soruları Seyreltme (Mastery Decay / Spaced Repetition)
 * - Çift Yönlü Test Modları ('find_on_map', 'identify', 'mixed')
 * - Dinamik Şık Sayısı (2, 3, 4, 5 Şık)
 * - Net, Doğrudan ve Sade Soru Metinleri
 */

class GeographyQuiz {
  constructor(categoryKey = 'daglar', customDrawManager = null) {
    this.categoryKey = categoryKey;
    this.customDrawManager = customDrawManager;
    this.activeSubType = 'all'; // 'all', 'volkanik', 'kirik', 'delta', vb.
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

  setSubType(subTypeId) {
    this.activeSubType = subTypeId || 'all';
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
    this.activeSubType = 'all';
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

    // SADE, NET VE LAF KALABALIĞINDAN ARINDIRILMIŞ SORU BAŞLIKLARI (Cevap Spoil Önleme Korumalı)
    let questionText = '';
    let questionTypeTitle = '';

    if (this.currentQuestion.questionText) {
      questionText = this.currentQuestion.questionText;
      questionTypeTitle = 'İLİŞKİLİ EŞLEŞTİRME';
    } else if (this.currentActualFormat === 'find_on_map') {
      // Şehir/yöre ipucu içeren parantezleri temizle (ör. "Fındık (Giresun - Ordu)" -> "Fındık")
      const safeName = this.currentQuestion.shortName || this.currentQuestion.name.replace(/\s*\([^)]*\)/g, '').trim();
      questionText = `📍 <span style="color: #60a5fa; font-weight:800; font-size: 1.15rem;">${safeName} ?</span>`;
      questionTypeTitle = 'HARİTADA BUL';
    } else {
      const cat = this.currentQuestion.category;
      if (this.currentQuestion.shapeType === 'polyline') {
        questionText = 'Haritada işaretli akarsu / hat hangisidir?';
        questionTypeTitle = 'HAT SORUSU';
      } else if (this.currentQuestion.shapeType === 'polygon') {
        if (cat === 'tarim') {
          questionText = 'Haritada işaretli tarım / üretim alanı hangisidir?';
          questionTypeTitle = 'TARIM ALANI';
        } else if (cat === 'hayvancilik') {
          questionText = 'Haritada işaretli hayvancılık yetiştirme alanı hangisidir?';
          questionTypeTitle = 'HAYVANCILIK ALANI';
        } else if (cat === 'sanayi') {
          questionText = 'Haritada işaretli sanayi / tesis bölgesi hangisidir?';
          questionTypeTitle = 'SANAYİ BÖLGESİ';
        } else if (cat === 'iklim') {
          questionText = 'Haritada işaretli iklim / uç değer sahası hangisidir?';
          questionTypeTitle = 'İKLİM SAHASI';
        } else {
          questionText = 'Haritada işaretli alan / plato hangisidir?';
          questionTypeTitle = 'ALAN SORUSU';
        }
      } else {
        questionText = 'Haritada işaretli coğrafi konum / merkez hangisidir?';
        questionTypeTitle = 'KONUM SORUSU';
      }
    }

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
