/**
 * KPSS Coğrafya Quiz ve Adaptif Soru Motoru
 * - Akıllı Hata Ağırlıklı Soru Seçimi (Smart Repetition)
 * - Dinamik Şık Sayısı (2, 3, 4, 5 Şık)
 * - Çift Yönlü Test Modları:
 *   1. 'identify': Haritada Tek Yer Gösterir -> İsmini Sorar.
 *   2. 'find_on_map': İsmi Söyler -> Haritada I, II, III, IV, V'ten Doğru Olanı İster (ÖSYM Formatı).
 *   3. 'mixed': Karışık Sürpriz Modu.
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
    this.quizFormat = this.loadQuizFormat(); // 'identify', 'find_on_map', 'mixed'
    this.currentActualFormat = 'identify';

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
    return {};
  }

  saveAnalytics() {
    localStorage.setItem('kpss_cografya_question_analytics', JSON.stringify(this.analytics));
  }

  loadQuizFormat() {
    const saved = localStorage.getItem('kpss_cografya_quiz_format');
    return saved || 'find_on_map'; // Varsayılan olarak heyecan verici yeni ÖSYM modunu açalım
  }

  setQuizFormat(format) {
    this.quizFormat = format;
    localStorage.setItem('kpss_cografya_quiz_format', format);
  }

  getQuizFormat() {
    return this.quizFormat;
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
    let weight = 1.0 + (itemAnalytics.wrongCount * 2.5) - (itemAnalytics.streak * 0.6);
    return Math.max(0.3, weight);
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

  // Yeni Soru Üret
  nextQuestion() {
    this.reloadCategoryItems();
    if (this.items.length === 0) return null;

    if (this.remainingPool.length === 0) {
      if (this.wrongPool.length > 0) {
        this.remainingPool = [...this.wrongPool];
        this.wrongPool = [];
      } else {
        this.remainingPool = [...this.items];
      }
    }

    const selectedQuestion = this.getWeightedRandomItem(this.remainingPool);
    this.currentQuestion = selectedQuestion;
    this.remainingPool = this.remainingPool.filter(i => i.id !== selectedQuestion.id);
    this.isAnswered = false;

    // Soru formatını belirle (identify, find_on_map veya mixed)
    if (this.quizFormat === 'mixed') {
      this.currentActualFormat = Math.random() > 0.5 ? 'find_on_map' : 'identify';
    } else {
      this.currentActualFormat = this.quizFormat;
    }

    // Soru analitik durumu
    const itemAnalytics = this.analytics[selectedQuestion.id] || { wrongCount: 0, correctCount: 0 };
    const isProblematic = itemAnalytics.wrongCount >= 2 && itemAnalytics.wrongCount > itemAnalytics.correctCount;

    // Dinamik Çeldiriciler
    const targetDistractorCount = this.optionCount - 1;
    let otherItems = this.items.filter(item => item.id !== this.currentQuestion.id);

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

    // Doğru cevapla çeldiricileri harmanla
    this.currentOptions = [this.currentQuestion, ...distractors].sort(() => 0.5 - Math.random());

    const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
    const letters = ['A', 'B', 'C', 'D', 'E'];

    // Soru formatına göre metin ve başlık oluşturma
    let questionText = '';
    let questionTypeTitle = '';

    if (this.currentActualFormat === 'find_on_map') {
      // YENİ ÖSYM TEST MODELİ (İsim verilir -> Haritada I-V arasından doğru konum istenir)
      let shapeLabel = 'yer şekli';
      if (this.currentQuestion.shapeType === 'polyline') shapeLabel = 'akarsu/hat';
      if (this.currentQuestion.shapeType === 'polygon') shapeLabel = 'alan/bölge';

      questionText = `Haritada numaralandırılmış konumlardan hangisi <strong style="color: #60a5fa; text-decoration: underline;">${this.currentQuestion.name}</strong> (${this.currentQuestion.type}) konumudur?`;
      questionTypeTitle = 'HARİTADA BUL (I-V)';
    } else {
      // KLASİK MOD (Haritada konum gösterilir -> İsmi sorulur)
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
    }

    return {
      question: this.currentQuestion,
      options: this.currentOptions,
      questionText,
      questionTypeTitle,
      actualFormat: this.currentActualFormat,
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
      correctId: this.currentQuestion.id,
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
