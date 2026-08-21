/**
 * KPSS Coğrafya Quiz ve Soru Motoru
 */

class GeographyQuiz {
  constructor(categoryKey = 'daglar') {
    this.categoryKey = categoryKey;
    this.items = COGRAFYA_DATA[categoryKey] || [];
    this.remainingPool = [...this.items];
    this.wrongPool = [];
    
    this.currentQuestion = null;
    this.currentOptions = [];
    this.isAnswered = false;

    // İstatistikler (Local Storage destekli)
    this.stats = this.loadStats();
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
    this.stats = { correct: 0, wrong: 0, streak: 0, bestStreak: 0 };
    this.saveStats();
  }

  setCategory(categoryKey) {
    this.categoryKey = categoryKey;
    this.items = COGRAFYA_DATA[categoryKey] || [];
    this.remainingPool = [...this.items];
    this.wrongPool = [];
    this.currentQuestion = null;
    this.isAnswered = false;
  }

  // Yeni Soru Üret
  nextQuestion() {
    if (this.items.length === 0) return null;

    // Havuz boşaldıysa sıfırla veya yanlış yapılanları öne al
    if (this.remainingPool.length === 0) {
      if (this.wrongPool.length > 0) {
        this.remainingPool = [...this.wrongPool];
        this.wrongPool = [];
      } else {
        this.remainingPool = [...this.items];
      }
    }

    // Rastgele bir soru seç ve havuzdan çıkar
    const randomIndex = Math.floor(Math.random() * this.remainingPool.length);
    this.currentQuestion = this.remainingPool.splice(randomIndex, 1)[0];
    this.isAnswered = false;

    // 3 adet çeldirici seç (Aynı kategoriden, doğru cevap hariç)
    const otherItems = this.items.filter(item => item.id !== this.currentQuestion.id);
    const shuffledOthers = [...otherItems].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, Math.min(3, shuffledOthers.length));

    // Doğru cevapla çeldiricileri harmanla
    this.currentOptions = [this.currentQuestion, ...distractors].sort(() => 0.5 - Math.random());

    return {
      question: this.currentQuestion,
      options: this.currentOptions
    };
  }

  // Cevabı doğrula
  checkAnswer(selectedId) {
    if (this.isAnswered || !this.currentQuestion) return null;
    this.isAnswered = true;

    const isCorrect = selectedId === this.currentQuestion.id;

    if (isCorrect) {
      this.stats.correct++;
      this.stats.streak++;
      if (this.stats.streak > this.stats.bestStreak) {
        this.stats.bestStreak = this.stats.streak;
      }
    } else {
      this.stats.wrong++;
      this.stats.streak = 0;
      // Yanlış havuzuna ekle
      if (!this.wrongPool.some(i => i.id === this.currentQuestion.id)) {
        this.wrongPool.push(this.currentQuestion);
      }
    }

    this.saveStats();

    return {
      isCorrect,
      correctId: this.currentQuestion.id,
      selectedId,
      kpssNot: this.currentQuestion.kpssNot,
      type: this.currentQuestion.type,
      region: this.currentQuestion.region,
      name: this.currentQuestion.name,
      stats: this.stats
    };
  }

  getSuccessRate() {
    const total = this.stats.correct + this.stats.wrong;
    if (total === 0) return 0;
    return Math.round((this.stats.correct / total) * 100);
  }
}
