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
    this.elapsedSeconds = 0;
    this.timerInterval = null;
    this.leftCards = [];
    this.rightCards = [];
    this.lastBoardIds = [];
    this.selectedLeft = null;
    this.selectedRight = null;
  }

  start() {
    this.isActive = true;
    this.score = 0;
    this.combo = 1;
    this.timeLeft = 60;
    this.elapsedSeconds = 0;
    this.lastBoardIds = [];
    this.selectedLeft = null;
    this.selectedRight = null;
    this.geoMap.clearAll();
    this.geoMap.resetView();

    this.generateBoard();
    this.startTimer();
    return this.getBoardState();
  }

  generateBoard() {
    const all = (COGRAFYA_DATA && COGRAFYA_DATA.iliskili_cografya) ? COGRAFYA_DATA.iliskili_cografya.slice(0) : [];

    // Yeni tahtada bir önceki turun kartlarını tekrar etme (havuz yetiyorsa)
    let pool = all.filter(p => !this.lastBoardIds.includes(p.id));
    if (pool.length < 6) pool = all;

    pool.sort(() => 0.5 - Math.random());
    const selected = pool.slice(0, 6);
    this.lastBoardIds = selected.map(p => p.id);

    this.leftCards = selected.map(p => ({
      id: p.id,
      text: p.matchSource || p.name,
      type: 'source',
      category: p.category,
      itemType: p.type,
      shapeType: p.shapeType,
      coordinates: p.coordinates,
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
      this.elapsedSeconds++;

      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        if (this.onTick) this.onTick(0);
        this.finish();
        return;
      }

      if (this.onTick) this.onTick(this.timeLeft);
    }, 1000);
  }

  selectCard(cardId, type) {
    if (!this.isActive) return null;

    if (type === 'source') {
      this.selectedLeft = cardId;
      const card = this.leftCards.find(c => c.id === cardId);
      if (card && typeof card.lat === 'number' && typeof card.lng === 'number') {
        this.geoMap.highlightQuestionShape({
          name: card.text,
          category: card.category,
          type: card.itemType,
          shapeType: card.shapeType,
          coordinates: card.coordinates,
          lat: card.lat,
          lng: card.lng
        });
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
      }

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
    if (!this.isActive) return;
    this.isActive = false;
    clearInterval(this.timerInterval);
    this.timerInterval = null;

    if (this.onFinish) {
      this.onFinish({
        score: this.score,
        // Kazanılan +4sn bonuslar dahil, sahada gerçekten geçirilen süre
        timeSpent: this.elapsedSeconds
      });
    }
  }

  exit() {
    this.isActive = false;
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.selectedLeft = null;
    this.selectedRight = null;
    this.geoMap.clearAll();
  }
}
