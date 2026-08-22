/**
 * 🧩 Şekil Yapbozu / Eşleştir & Yok Et (Match & Blast) Oyun Motoru
 */

class MatchGame {
  constructor(mapInstance) {
    this.geoMap = mapInstance;
    this.isActive = false;
    this.score = 0;
    this.combo = 1;
    this.timeLeft = 60;
    this.timerInterval = null;
    this.pairs = [];
    this.selectedLeft = null;
    this.selectedRight = null;
  }

  start() {
    this.isActive = true;
    this.score = 0;
    this.combo = 1;
    this.timeLeft = 60;
    this.selectedLeft = null;
    this.selectedRight = null;
    this.geoMap.clearAll();
    this.geoMap.resetView();

    this.generateBoard();
    this.startTimer();
    return this.getBoardState();
  }

  generateBoard() {
    const rawPairs = (COGRAFYA_DATA && COGRAFYA_DATA.iliskili_cografya) ? COGRAFYA_DATA.iliskili_cografya.slice(0) : [];
    rawPairs.sort(() => 0.5 - Math.random());
    const selected = rawPairs.slice(0, 6);

    this.leftCards = selected.map(p => ({
      id: p.id,
      text: p.matchSource || p.name,
      type: 'source',
      lat: p.lat,
      lng: p.lng
    })).sort(() => 0.5 - Math.random());

    this.rightCards = selected.map(p => ({
      id: p.id,
      text: p.name,
      type: 'target',
      kpssNot: p.kpssNot
    })).sort(() => 0.5 - Math.random());
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.isActive) {
        clearInterval(this.timerInterval);
        return;
      }
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.finish();
      }
      if (this.onTick) this.onTick(this.timeLeft);
    }, 1000);
  }

  selectCard(cardId, type) {
    if (!this.isActive) return null;

    if (type === 'source') {
      this.selectedLeft = cardId;
      const card = this.leftCards.find(c => c.id === cardId);
      if (card && card.lat && card.lng) {
        this.geoMap.highlightQuestionShape(card);
      }
    } else {
      this.selectedRight = cardId;
    }

    if (this.selectedLeft && this.selectedRight) {
      const isMatch = this.selectedLeft === this.selectedRight;
      if (isMatch) {
        const points = 100 * this.combo;
        this.score += points;
        this.combo++;
        this.timeLeft += 4;
        const matchedId = this.selectedLeft;

        this.leftCards = this.leftCards.filter(c => c.id !== matchedId);
        this.rightCards = this.rightCards.filter(c => c.id !== matchedId);
        this.selectedLeft = null;
        this.selectedRight = null;

        const isCleared = this.leftCards.length === 0;
        if (isCleared) {
          this.score += 500;
          this.generateBoard();
        }

        return {
          status: 'match',
          matchedId: matchedId,
          points: points,
          combo: this.combo,
          isCleared: isCleared,
          boardState: this.getBoardState()
        };
      } else {
        this.combo = 1;
        const failedLeft = this.selectedLeft;
        const failedRight = this.selectedRight;
        this.selectedLeft = null;
        this.selectedRight = null;

        return {
          status: 'mismatch',
          failedLeft: failedLeft,
          failedRight: failedRight,
          boardState: this.getBoardState()
        };
      }
    }

    return { status: 'selected', boardState: this.getBoardState() };
  }

  getBoardState() {
    return {
      score: this.score,
      combo: this.combo,
      timeLeft: this.timeLeft,
      leftCards: this.leftCards,
      rightCards: this.rightCards,
      selectedLeft: this.selectedLeft,
      selectedRight: this.selectedRight
    };
  }

  finish() {
    this.isActive = false;
    clearInterval(this.timerInterval);
    if (this.onFinish) {
      this.onFinish({
        score: this.score,
        timeSpent: 60 - Math.max(0, this.timeLeft)
      });
    }
  }

  exit() {
    this.isActive = false;
    clearInterval(this.timerInterval);
    this.geoMap.clearAll();
  }
}
