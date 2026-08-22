/**
 * KPSS Coğrafya Quiz ve Adaptif Soru Motoru
 * - Akıllı Hata Ağırlıklı Soru Seçimi (Smart Repetition)
 * - Dinamik Şık Sayısı (2, 3, 4, 5 Şık)
 * - Nokta, Çizgi ve Poligon Çoklu Geometri Desteği
 */

class GeographyQuiz {
  constructor(categoryKey = 'daglar', customDrawManager = null) {
    this.categoryKey = categoryKey;
    this.customDrawManager = customDrawManager;
    this.items = [];
    this.remainingPool = [];
    this.wrongPool = [];
    
    this.currentQuestion = null;
    this.currentOptions = [];
    this.isAnswered = false;
    this.optionCount = 4; // Varsayılan 4 şık (2, 3, 4, 5 seçilebilir)

    // Genel Test İstatistikleri
    this.stats = this.loadStats();

    // Soru Bazlı Adaptif Analitik (Hata Ağırlıkları)
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

  loadAnalytics() {
    const saved = localStorage.getItem('kpss_cografya_question_analytics');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Hata durumunda varsayılan
      }
    }
    return {}; // { [questionId]: { wrongCount: 0, correctCount: 0, streak: 0, lastSeen: timestamp } }
  }

  saveAnalytics() {
    localStorage.setItem('kpss_cografya_question_analytics', JSON.stringify(this.analytics));
  }

  setOptionCount(count) {
    this.optionCount = Math.max(2, Math.min(5, count));
  }

  getOptionCount() {
    return this.optionCount;
  }

  reloadCategoryItems() {
    if (this.categoryKey === 'ozel_cizimler') {
      this.items = this.customDrawManager ? this.customDrawManager.getQuizItems() : [];
    } else {
      this.items = COGRAFYA_DATA[this.categoryKey] || [];
    }
    this.remainingPool = [...this.items];
    this.wrongPool = [];
  }

  setCategory(categoryKey) {
    this.categoryKey = categoryKey;
    this.reloadCategoryItems();
    this.currentQuestion = null;
    this.isAnswered = false;
  }

  // --- ADAPTİF AĞIRLIK HESAPLAMA (SPACED REPETITION) ---
  calculateItemWeight(item) {
    const itemAnalytics = this.analytics[item.id] || { wrongCount: 0, correctCount: 0, streak: 0 };
    
    // Temel taban ağırlık = 1.0
    // Her yanlış cevap ağırlığı 2.5 puan artırır (daha sık gelmesini sağlar)
    // Ardışık doğru cevaplar ağırlığı 0.6 puan düşürür
    let weight = 1.0 + (itemAnalytics.wrongCount * 2.5) - (itemAnalytics.streak * 0.6);
    
    return Math.max(0.3, weight); // Minimum 0.3 ağırlık
  }

  // Rulet Tekerleği Algoritması (Weighted Random Selection)
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

  // Yeni Soru Üret
  nextQuestion() {
    this.reloadCategoryItems();
    if (this.items.length === 0) return null;

    // Havuz boşaldıysa sıfırla
    if (this.remainingPool.length === 0) {
      if (this.wrongPool.length > 0) {
        this.remainingPool = [...this.wrongPool];
        this.wrongPool = [];
      } else {
        this.remainingPool = [...this.items];
      }
    }

    // Adaptif ağırlıklı seçim ile soruyu belirle
    const selectedQuestion = this.getWeightedRandomItem(this.remainingPool);
    this.currentQuestion = selectedQuestion;
    
    // Seçilen soruyu aktif havuzdan çıkar
    this.remainingPool = this.remainingPool.filter(i => i.id !== selectedQuestion.id);
    this.isAnswered = false;

    // Soru analitik durumu (Sık Yanıldığım Rozeti için)
    const itemAnalytics = this.analytics[selectedQuestion.id] || { wrongCount: 0, correctCount: 0 };
    const isProblematic = itemAnalytics.wrongCount >= 2 && itemAnalytics.wrongCount > itemAnalytics.correctCount;

    // Dinamik Şık Üretimi (optionCount kadar)
    const targetDistractorCount = this.optionCount - 1;

    // Çeldiricileri önce aynı kategoriden seç
    let otherItems = this.items.filter(item => item.id !== this.currentQuestion.id);

    // Eğer aynı kategoride yeterli soru yoksa, diğer tüm genel kategorilerden çeldirici takviyesi yap
    if (otherItems.length < targetDistractorCount) {
      const allGlobalItems = [];
      Object.keys(COGRAFYA_DATA).forEach(cat => {
        allGlobalItems.push(...COGRAFYA_DATA[cat]);
      });
      const additionalOthers = allGlobalItems.filter(
        item => item.id !== this.currentQuestion.id && !otherItems.some(o => o.id === item.id)
      );
      otherItems = [...otherItems, ...additionalOthers];
    }

    const shuffledOthers = [...otherItems].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, Math.min(targetDistractorCount, shuffledOthers.length));

    // Doğru cevapla çeldiricileri karıştır
    this.currentOptions = [this.currentQuestion, ...distractors].sort(() => 0.5 - Math.random());

    // Şekil tipine göre dinamik başlık ve soru metni
    let questionText = 'Haritada işaretli konum hangisidir?';
    let questionTypeTitle = 'YER ŞEKLİ';

    if (this.currentQuestion.shapeType === 'polyline') {
      questionText = 'Haritada işaretli hat / akarsu / sıra hangisidir?';
      questionTypeTitle = 'HAT / AKARSU SORUSU';
    } else if (this.currentQuestion.shapeType === 'polygon') {
      questionText = 'Haritada taranmış alan / bölge / plato hangisidir?';
      questionTypeTitle = 'ALAN / BÖLGE SORUSU';
    } else {
      questionText = 'Haritada işaretli yer şekli / nokta hangisidir?';
      questionTypeTitle = 'KONUM SORUSU';
    }

    return {
      question: this.currentQuestion,
      options: this.currentOptions,
      questionText,
      questionTypeTitle,
      isProblematic,
      wrongCount: itemAnalytics.wrongCount,
      correctCount: itemAnalytics.correctCount
    };
  }

  // Cevabı doğrula
  checkAnswer(selectedId) {
    if (this.isAnswered || !this.currentQuestion) return null;
    this.isAnswered = true;

    const isCorrect = selectedId === this.currentQuestion.id;
    const qId = this.currentQuestion.id;

    // Soru bazlı analitik kaydı
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

      // Yanlış havuzuna ekle
      if (!this.wrongPool.some(i => i.id === this.currentQuestion.id)) {
        this.wrongPool.push(this.currentQuestion);
      }
    }

    this.saveStats();
    this.saveAnalytics();

    return {
      isCorrect,
      correctId: this.currentQuestion.id,
      selectedId,
      kpssNot: this.currentQuestion.kpssNot,
      type: this.currentQuestion.type,
      region: this.currentQuestion.region,
      name: this.currentQuestion.name,
      shapeType: this.currentQuestion.shapeType || 'point',
      stats: this.stats,
      questionAnalytics: this.analytics[qId]
    };
  }

  getSuccessRate() {
    const total = this.stats.correct + this.stats.wrong;
    if (total === 0) return 0;
    return Math.round((this.stats.correct / total) * 100);
  }

  // En çok yanlış yapılan soruların özet listesi
  getTopWeakPoints(limit = 5) {
    const entries = Object.entries(this.analytics)
      .map(([id, data]) => ({ id, ...data }))
      .filter(item => item.wrongCount > 0)
      .sort((a, b) => b.wrongCount - a.wrongCount);

    return entries.slice(0, limit);
  }
}
