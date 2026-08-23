/**
 * Ana Uygulama Yöneticisi (App Controller)
 * - Coğrafi Mesafe Tabanlı 5 Kademeli Zorluk Sistemi
 * - Ustalık Düzeyi & İyi Bilinen Soruları Seyreltme (Mastery Decay)
 * - Çift Yönlü Soru Modları (İsimden Haritada Bul I-V vs Konumdan İsim Bul)
 * - Çizim Editörü, Doğrudan JSON Yapıştırma, Çoklu Harita Katmanları & Auto-Zoom
 */

document.addEventListener('DOMContentLoaded', () => {
  // Yöneticileri başlat
  const customDrawManager = new CustomDrawManager();
  const geoMap = new GeographyMap('map');
  const geoQuiz = new GeographyQuiz('daglar', customDrawManager);

  // DOM Elemanları - Navigasyon & Genel
  const categoriesContainer = document.getElementById('categories-container');
  const drawModeBtn = document.getElementById('draw-mode-btn');
  const modeToggleBtn = document.getElementById('mode-toggle-btn');
  const resetViewBtn = document.getElementById('reset-view-btn');

  // Soru Formatı Seçici Elemanları
  const formatToggleBtn = document.getElementById('format-toggle-btn');
  const formatLabel = document.getElementById('format-label');
  const formatDropdown = document.getElementById('format-dropdown');
  const formatOptionBtns = document.querySelectorAll('.format-option-btn');

  // Zorluk Seviyesi Butonları (1-5 Kademe)
  const diffBtns = document.querySelectorAll('.diff-btn');

  // Harita Katmanları & Auto-Zoom
  const mapLayerBtn = document.getElementById('map-layer-btn');
  const mapLayerLabel = document.getElementById('map-layer-label');
  const layerDropdown = document.getElementById('layer-dropdown');
  const layerOptionBtns = document.querySelectorAll('.layer-option-btn');
  const autoZoomBtn = document.getElementById('auto-zoom-btn');
  const autoZoomLabel = document.getElementById('auto-zoom-label');

  // Çizim Araç Çubuğu Elemanları
  const drawingToolbar = document.getElementById('drawing-toolbar');
  const drawPointBtn = document.getElementById('draw-point-btn');
  const drawLineBtn = document.getElementById('draw-line-btn');
  const drawPolyBtn = document.getElementById('draw-poly-btn');
  const drawUndoBtn = document.getElementById('draw-undo-btn');
  const drawFinishBtn = document.getElementById('draw-finish-btn');
  const drawManageBtn = document.getElementById('draw-manage-btn');
  const drawExitBtn = document.getElementById('draw-exit-btn');
  const drawingHint = document.getElementById('drawing-hint');
  const customDrawCountBadge = document.getElementById('custom-draw-count');

  // Çizim Kaydetme Modalı
  const drawModal = document.getElementById('draw-modal');
  const drawSaveForm = document.getElementById('draw-save-form');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const shapeNameInput = document.getElementById('shape-name');
  const shapeCategoryInput = document.getElementById('shape-category');
  const shapeTypeInput = document.getElementById('shape-type');
  const shapeRegionInput = document.getElementById('shape-region');
  const shapeNoteInput = document.getElementById('shape-note');

  // Çizim Yönetim & JSON Yapıştırma Modalı
  const drawManageModal = document.getElementById('draw-manage-modal');
  const manageModalCloseBtn = document.getElementById('manage-modal-close-btn');
  const pasteJsonTextarea = document.getElementById('paste-json-textarea');
  const importPastedJsonBtn = document.getElementById('import-pasted-json-btn');
  const exportJsonBtn = document.getElementById('export-json-btn');
  const importJsonInput = document.getElementById('import-json-input');
  const clearDrawingsBtn = document.getElementById('clear-drawings-btn');
  const drawingsListContainer = document.getElementById('drawings-list-container');

  // Şık Sayısı Butonları
  const optCountBtns = document.querySelectorAll('.opt-count-btn');

  // Quiz Paneli Elemanları
  const quizPanel = document.getElementById('quiz-panel');
  const exploreBanner = document.getElementById('explore-banner');
  const questionBadge = document.getElementById('question-badge');
  const questionDifficultyBadge = document.getElementById('question-difficulty-badge');
  const questionAdaptiveBadge = document.getElementById('question-adaptive-badge');
  const questionMasteredBadge = document.getElementById('question-mastered-badge');
  const questionTitle = document.getElementById('question-title');
  const optionsGrid = document.getElementById('options-grid');
  const kpssInfoCard = document.getElementById('kpss-info-card');
  const kpssInfoTitle = document.getElementById('kpss-info-title');
  const kpssInfoType = document.getElementById('kpss-info-type');
  const kpssInfoText = document.getElementById('kpss-info-text');
  const nextBtn = document.getElementById('next-btn');

  // İstatistik Elemanları
  const statCorrect = document.getElementById('stat-correct');
  const statWrong = document.getElementById('stat-wrong');
  const statStreak = document.getElementById('stat-streak');
  const statRate = document.getElementById('stat-rate');

  // 🎮 Yeni Oyun Modları Motorları
  const geoGuessrGame = new GeoGuessrGame(geoMap);
  const conquerorGame = new ConquerorGame(geoMap);
  const matchGame = new MatchGame(geoMap);

  // 📐 Mutlak (Matematiksel) Konum Motorları - hepsi aynı HUD'u paylaşır
  const mkGames = {
    sun:      new SunShadowGame(geoMap),
    temp:     new TempDetectiveGame(geoMap),
    daynight: new DayNightOrderGame(geoMap),
    coord:    new CoordinateHunterGame(geoMap),
    duel:     new CityDuelGame(geoMap)
  };

  // 🎮 Oyun Modları Menüsü DOM Elemanları
  const gamesMenuBtn = document.getElementById('games-menu-btn');
  const gamesDropdown = document.getElementById('games-dropdown');
  const btnGeoguessrMode = document.getElementById('btn-geoguessr-mode');
  const btnConquerorMode = document.getElementById('btn-conqueror-mode');
  const btnMatchMode = document.getElementById('btn-match-mode');

  // 🎯 Kör Atış (GeoGuessr) DOM Elemanları
  const geoguessrHud = document.getElementById('geoguessr-hud');
  const geoguessrRoundIdx = document.getElementById('geoguessr-round-idx');
  const geoguessrScoreVal = document.getElementById('geoguessr-score-val');
  const geoguessrTargetName = document.getElementById('geoguessr-target-name');
  const geoguessrFeedbackBox = document.getElementById('geoguessr-feedback-box');
  const geoguessrDistBadge = document.getElementById('geoguessr-dist-badge');
  const geoguessrPtsBadge = document.getElementById('geoguessr-pts-badge');
  const geoguessrNextBtn = document.getElementById('geoguessr-next-btn');
  const geoguessrAbortBtn = document.getElementById('geoguessr-abort-btn');
  const geoguessrModal = document.getElementById('geoguessr-modal');
  const geoguessrResBadge = document.getElementById('geoguessr-res-badge');
  const geoguessrResTitle = document.getElementById('geoguessr-res-title');
  const geoguessrResScore = document.getElementById('geoguessr-res-score');
  const geoguessrResAvgkm = document.getElementById('geoguessr-res-avgkm');
  const geoguessrRoundList = document.getElementById('geoguessr-round-list');
  const geoguessrCloseBtn = document.getElementById('geoguessr-close-btn');
  const geoguessrRestartBtn = document.getElementById('geoguessr-restart-btn');

  // ⚔️ Harita Fatihi DOM Elemanları
  const conquerorHud = document.getElementById('conqueror-hud');
  const conquerorPercentVal = document.getElementById('conqueror-percent-val');
  const conquerorCountVal = document.getElementById('conqueror-count-val');
  const conquerorRegionsGrid = document.getElementById('conqueror-regions-grid');
  const conquerorAbortBtn = document.getElementById('conqueror-abort-btn');
  const conquerorModal = document.getElementById('conqueror-modal');
  const conquerorResPercent = document.getElementById('conqueror-res-percent');
  const conquerorResCount = document.getElementById('conqueror-res-count');
  const conquerorCloseBtn = document.getElementById('conqueror-close-btn');
  const conquerorRestartBtn = document.getElementById('conqueror-restart-btn');

  // 🧩 Şekil Yapbozu (Match) DOM Elemanları
  const matchHud = document.getElementById('match-hud');
  const matchTimerVal = document.getElementById('match-timer-val');
  const matchScoreVal = document.getElementById('match-score-val');
  const matchComboVal = document.getElementById('match-combo-val');
  const matchLeftCards = document.getElementById('match-left-cards');
  const matchRightCards = document.getElementById('match-right-cards');
  const matchAbortBtn = document.getElementById('match-abort-btn');
  const matchModal = document.getElementById('match-modal');
  const matchResScore = document.getElementById('match-res-score');
  const matchResTime = document.getElementById('match-res-time');
  const matchCloseBtn = document.getElementById('match-close-btn');
  const matchRestartBtn = document.getElementById('match-restart-btn');

  const quizDefaultStatsBar = document.getElementById('quiz-default-stats-bar');
  const standardQuizBody = document.getElementById('standard-quiz-body');

  // ⚡ Şimşek Turu (Speedrun) DOM Elemanları
  const speedrunBtn = document.getElementById('speedrun-btn');
  const speedrunStatsBlock = document.getElementById('speedrun-stats-block');
  const normalStatsBlock = document.getElementById('normal-stats-block');
  const speedrunTimeLeft = document.getElementById('speedrun-time-left');
  const speedrunScoreText = document.getElementById('speedrun-score');
  const speedrunAbortBtn = document.getElementById('speedrun-abort-btn');
  const speedrunModal = document.getElementById('speedrun-modal');
  const speedrunResCorrect = document.getElementById('speedrun-res-correct');
  const speedrunResWrong = document.getElementById('speedrun-res-wrong');
  const speedrunResStreak = document.getElementById('speedrun-res-streak');
  const speedrunResBest = document.getElementById('speedrun-res-best');
  const speedrunRestartBtn = document.getElementById('speedrun-restart-btn');
  const speedrunCloseModalBtn = document.getElementById('speedrun-close-modal-btn');

  // 📝 Genel Deneme Sınavı (18 Soru) DOM Elemanları
  const examModeBtn = document.getElementById('exam-mode-btn');
  const examStatsBlock = document.getElementById('exam-stats-block');
  const examQIndex = document.getElementById('exam-q-index');
  const examTimeText = document.getElementById('exam-time');
  const examCorrectText = document.getElementById('exam-correct');
  const examWrongText = document.getElementById('exam-wrong');
  const examAbortBtn = document.getElementById('exam-abort-btn');
  const examModal = document.getElementById('exam-modal');
  const examResCorrect = document.getElementById('exam-res-correct');
  const examResWrong = document.getElementById('exam-res-wrong');
  const examResNet = document.getElementById('exam-res-net');
  const examResTime = document.getElementById('exam-res-time');
  const examRestartBtn = document.getElementById('exam-restart-btn');
  const examCloseModalBtn = document.getElementById('exam-close-modal-btn');

  // Uygulama Durumu
  let currentMode = 'quiz'; // 'quiz', 'explore', 'drawing', 'geoguessr', 'conqueror', 'match'
  let matchBoardLocked = false; // Eşleşme/hata animasyonu oynarken tıklamaları kilitler
  let activeMkKey = null;       // Aktif mutlak konum modu ('sun','temp','daynight','coord','duel')

  // 📅 Bugünün Planı
  const studyPlan = new StudyPlanManager(geoQuiz, customDrawManager);
  let planSessionActive = false;   // Plan oturumu sürüyor mu?
  let mistakesLayerVisible = false;
  const mistakesLayerGroup = L.layerGroup().addTo(geoMap.map);
  let activeCategory = 'daglar';
  let activeDrawShape = 'point';
  let pendingDrawingData = null;

  // ⚡ Şimşek Turu Durum Değişkenleri
  let isSpeedrunActive = false;
  let speedrunInterval = null;
  let speedrunSeconds = 60;
  let speedrunScore = 0;
  let speedrunStats = { correct: 0, wrong: 0, bestStreak: 0, currentStreak: 0 };

  // 📝 Genel Deneme Sınavı Durum Değişkenleri
  let isExamActive = false;
  let examInterval = null;
  let examSeconds = 0;
  let examCurrentIndex = 0;
  let examQuestions = [];
  let examStats = { correct: 0, wrong: 0 };

  const subCategoriesBar = document.getElementById('sub-categories-bar');

  // --- KATEGORİ VE ALT OLUŞUM MENÜSÜ ---
  function renderCategories() {
    categoriesContainer.innerHTML = '';

    const allCategories = [
      ...CATEGORIES,
      {
        id: 'ozel_cizimler',
        title: `Çizimlerim (${customDrawManager.drawings.length})`,
        short: `Çizim (${customDrawManager.drawings.length})`,
        icon: '🎨',
        color: '#8b5cf6',
        isCustom: true
      }
    ];

    allCategories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `category-btn ${cat.isCustom ? 'custom-category-btn' : ''} ${cat.id === activeCategory ? 'active' : ''}`;
      btn.dataset.category = cat.id;
      // Sekmede kısa ad; tam ad tooltip'te (üst çubuk çok doluydu)
      btn.title = cat.title;
      btn.innerHTML = `<span>${cat.icon}</span> <span>${cat.short || cat.title}</span>`;
      btn.addEventListener('click', () => switchCategory(cat.id));
      categoriesContainer.appendChild(btn);
    });

    customDrawCountBadge.textContent = customDrawManager.drawings.length;
    renderSubCategories();
  }

  function renderSubCategories() {
    subCategoriesBar.innerHTML = '';
    const subTypes = (typeof SUB_TYPES !== 'undefined' && SUB_TYPES[activeCategory]) ? SUB_TYPES[activeCategory] : [];

    if (!subTypes || subTypes.length <= 1) {
      subCategoriesBar.style.display = 'none';
      return;
    }

    subCategoriesBar.style.display = 'flex';
    const activeSubId = geoQuiz.getSubType();

    // Toplam elemanları saymak için kategori ham veri seti
    let baseItems = [];
    if (activeCategory === 'ozel_cizimler') {
      baseItems = customDrawManager.getQuizItems();
    } else {
      baseItems = COGRAFYA_DATA[activeCategory] || [];
    }

    subTypes.forEach(sub => {
      let count = baseItems.length;
      if (sub.id !== 'all' && typeof sub.filter === 'function') {
        count = baseItems.filter(sub.filter).length;
      }

      const pillBtn = document.createElement('button');
      pillBtn.className = `sub-type-btn ${sub.id === activeSubId ? 'active' : ''}`;
      pillBtn.dataset.sub = sub.id;
      pillBtn.innerHTML = `<span>${sub.icon || '📍'}</span> <span>${sub.label} (${count})</span>`;

      pillBtn.addEventListener('click', () => {
        switchSubType(sub.id);
      });

      subCategoriesBar.appendChild(pillBtn);
    });
  }

  function switchSubType(subTypeId) {
    if (isGameModeActive()) return; // Oyun modunda alt tür değişimi devre dışı
    geoQuiz.setSubType(subTypeId);

    document.querySelectorAll('.sub-type-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.sub === subTypeId);
    });

    if (currentMode === 'quiz') {
      loadNextQuestion();
    } else {
      loadExploreMode();
    }
  }

  function switchCategory(categoryKey) {
    // Oyun modunda kategori değişimi, oyunu sessizce Keşif Moduna düşürüyordu
    if (isGameModeActive()) return;
    stopPlanSession();   // Plan oturumundan cikilir; ilerleme kayitli kalir

    if (categoryKey === 'ozel_cizimler' && customDrawManager.drawings.length === 0) {
      if (confirm('Henüz kayıtlı özel bir çiziminiz yok! Harita editöründen yeni şekil eklemek veya NotebookLM çıktısını yapıştırmak ister misiniz?')) {
        openManageModal();
      }
      return;
    }

    activeCategory = categoryKey;
    geoQuiz.setCategory(categoryKey);

    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === categoryKey);
    });

    renderSubCategories();

    if (currentMode === 'drawing') {
      closeDrawingToolbar();
    }

    if (currentMode === 'quiz') {
      loadNextQuestion();
    } else {
      loadExploreMode();
    }
  }

  // --- MOD GEÇİŞLERİ ---
  // Test <-> Keşif modu arasında doğrudan geçiş (eskiden çağrılan ama hiç
  // tanımlanmamış olan setMode bu fonksiyondu; ReferenceError atıyordu).
  function setMode(targetMode) {
    if (currentMode === targetMode) return;
    if (currentMode === 'drawing') closeDrawingToolbar();

    if (targetMode === 'explore') {
      currentMode = 'explore';
      modeToggleBtn.innerHTML = `<span>🎯</span> <span>Test Moduna Geç</span>`;
      loadExploreMode();
    } else {
      currentMode = 'quiz';
      modeToggleBtn.innerHTML = `<span>🧭</span> <span>Keşif Modu</span>`;
      loadNextQuestion();
    }
  }

  function toggleMode() {
    if (isGameModeActive()) return; // Oyun modundayken Keşif Moduna geçilemez
    stopPlanSession();

    if (currentMode === 'drawing') {
      closeDrawingToolbar();
    }

    if (currentMode === 'quiz') {
      currentMode = 'explore';
      modeToggleBtn.innerHTML = `<span>🎯</span> <span>Test Moduna Geç</span>`;
      loadExploreMode();
    } else {
      currentMode = 'quiz';
      modeToggleBtn.innerHTML = `<span>🧭</span> <span>Keşif Modu</span>`;
      loadNextQuestion();
    }
  }

  // --- KEŞİF MODU ---
  function loadExploreMode() {
    // geoQuiz.items zaten seçili alt oluşum türüne göre filtrelenmiştir!
    const items = geoQuiz.items;
    let catTitle = '';
    let catColor = '#3b82f6';

    if (activeCategory === 'ozel_cizimler') {
      catTitle = 'Özel Çizimlerim';
      catColor = '#8b5cf6';
    } else {
      const catObj = CATEGORIES.find(c => c.id === activeCategory);
      catTitle = catObj ? catObj.title : '';
      catColor = catObj ? catObj.color : '#3b82f6';
    }

    const subTypes = SUB_TYPES[activeCategory] || [];
    const activeSubObj = subTypes.find(s => s.id === geoQuiz.getSubType());
    const subTitle = activeSubObj && activeSubObj.id !== 'all' ? ` > ${activeSubObj.label}` : '';

    geoMap.showAllPoints(items, catColor);

    // Paneli Keşif görünümüne uyarla
    document.querySelector('.question-header').style.display = 'none';
    optionsGrid.style.display = 'none';
    kpssInfoCard.style.display = 'none';
    nextBtn.style.display = 'none';
    exploreBanner.style.display = 'block';
    exploreBanner.innerHTML = `
      <strong>🧭 Keşif Modu Aktif [${catTitle}${subTitle}]:</strong><br>
      Harita üzerinde seçili türe ait <strong>${items.length} adet</strong> yer şekli gösteriliyor. Şekillere tıklayarak KPSS hap bilgilerini inceleyebilirsiniz.
    `;
  }

  // --- QUIZ & ADAPTİF SORU MODU ---
  function loadNextQuestion() {
    const qData = geoQuiz.nextQuestion();
    if (!qData) {
      if (activeCategory === 'ozel_cizimler' && customDrawManager.drawings.length === 0) {
        questionTitle.textContent = 'Özel çizim bulunamadı. Lütfen Harita Editörü veya JSON Yapıştırma ile yeni şekiller ekleyin.';
        optionsGrid.innerHTML = '';
        return;
      }
      return;
    }

    let catName = 'ÖZEL ÇİZİMLERİM';
    let catIcon = '🎨';
    if (activeCategory !== 'ozel_cizimler') {
      const catObj = CATEGORIES.find(c => c.id === activeCategory);
      catName = catObj ? catObj.title : 'SORU';
      catIcon = catObj ? catObj.icon : '📍';
    }

    if (currentMode === 'conqueror') {
      // Fetih modunda sorular global havuzdan gelir, tek kategori rozeti yanıltıcı olur
      qData.categoryBadgeText = `⚔️ TÜRKİYE FATİHİ - [${qData.questionTypeTitle}]`;
    } else {
      qData.categoryBadgeText = `${catIcon} ${catName} - [${qData.questionTypeTitle}]`;
    }
    renderQuestion(qData);
  }

  function renderQuestion(qData) {
    if (exploreBanner) exploreBanner.style.display = 'none';
    if (kpssInfoCard) kpssInfoCard.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    document.querySelector('.question-header').style.display = 'flex';
    optionsGrid.style.display = 'grid';

    questionBadge.textContent = qData.categoryBadgeText || `📍 ${qData.questionTypeTitle || 'SORU'}`;
    questionTitle.innerHTML = qData.questionText;

    // Zorluk rozeti
    const diffNames = { 
      1: '1 (Kolay)', 
      2: '2 (Orta-Kolay)', 
      3: '3 (Orta)', 
      4: '4 (Zor)', 
      5: '5 (Uzman / Yakın)' 
    };
    questionDifficultyBadge.textContent = `⚡ Seviye ${diffNames[qData.difficultyLevel] || qData.difficultyLevel}`;

    // Adaptif hata ve ustalık rozetleri
    if (qData.isProblematic) {
      questionAdaptiveBadge.style.display = 'inline-block';
      questionAdaptiveBadge.textContent = `⚠️ Sık Yanıldığın Soru (${qData.wrongCount} Yanlış)`;
      questionMasteredBadge.style.display = 'none';
    } else if (qData.isMastered) {
      questionMasteredBadge.style.display = 'inline-block';
      questionMasteredBadge.textContent = `🎓 Ustalaşılan Soru (${qData.streak} Seri Doğru)`;
      questionAdaptiveBadge.style.display = 'none';
    } else {
      questionAdaptiveBadge.style.display = 'none';
      questionMasteredBadge.style.display = 'none';
    }

    // Şıkları render et ve harita işaretçilerini kur
    optionsGrid.innerHTML = '';
    const isCelalAll = geoQuiz.getOptionCount() === 'all';

    if (qData.actualFormat === 'find_on_map') {
      // YENİ ÖSYM HARİTADA BUL MODU (I-VIII çoklu harita pini veya Celal Şengör tüm harita noktaları)
      geoMap.showMultipleChoiceLocations(qData.options, (selectedId) => {
        handleAnswer(selectedId);
      });

      if (isCelalAll) {
        // 🌋 CELAL ŞENGÖR HARİTADA BUL: Panelde şık butonu kalabalığı YOK, doğrudan harita üzerinden tıklanır!
        optionsGrid.innerHTML = `
          <div style="grid-column: 1/-1; padding: 12px 14px; background: rgba(239, 68, 68, 0.12); border: 1.5px dashed rgba(239, 68, 68, 0.4); border-radius: 8px; font-size: 0.86rem; color: #fca5a5; text-align: center; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <span>🌋</span>
            <span><strong>Celal Şengör Modu:</strong> Harita üzerindeki noktalardan doğru olanı seçin!</span>
          </div>
        `;
      } else {
        const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

        qData.options.forEach((opt, index) => {
          const optBtn = document.createElement('button');
          optBtn.className = 'option-btn';
          optBtn.dataset.id = opt.id;
          optBtn.dataset.index = index;

          const letter = optionLetters[index] || `${index + 1}`;
          const roman = romanNumerals[index] || `${index + 1}`;
          const cityLabel = opt.city ? `📍 ${opt.city}` : `${roman}. Konum`;

          optBtn.innerHTML = `
            <span class="option-key">${letter}</span>
            <span class="option-name"><strong>${cityLabel}</strong> <span style="font-size:0.74rem; color:var(--text-muted); margin-left:3px;">(${roman} / ${letter} Pini)</span></span>
          `;
          optBtn.addEventListener('click', () => handleAnswer(opt.id));
          optionsGrid.appendChild(optBtn);
        });
      }
    } else {
      // KONUMDAN İSİM BUL MODU (Haritada tek konum parlar, 10 şık / seçili şıklar listelenir)
      geoMap.highlightQuestionShape(qData.question);

      if (qData.options.length > 5 || isCelalAll) {
        optionsGrid.classList.add('celal-all-grid');
      } else {
        optionsGrid.classList.remove('celal-all-grid');
      }

      const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

      qData.options.forEach((opt, index) => {
        const optBtn = document.createElement('button');
        optBtn.className = 'option-btn';
        optBtn.dataset.id = opt.id;
        optBtn.dataset.index = index;

        const keyLabel = optionLetters[index] || (index + 1);

        optBtn.innerHTML = `
          <span class="option-key">${keyLabel}</span>
          <span class="option-name">${opt.name}</span>
        `;
        optBtn.addEventListener('click', () => handleAnswer(opt.id));
        optionsGrid.appendChild(optBtn);
      });
    }

    updateStatsUI();
  }

  // Cevap Verildiğinde
  function handleAnswer(selectedId) {
    if (geoQuiz.isAnswered) return;

    const result = geoQuiz.checkAnswer(selectedId);
    if (!result) return;

    // Şık butonlarını renklendir
    const optionButtons = optionsGrid.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.id === result.correctId) {
        btn.classList.add('correct');
      } else if (btn.dataset.id === result.selectedId && !result.isCorrect) {
        btn.classList.add('wrong');
      }
    });

    // ⚔️ Harita Fatihi Modu Kontrolü
    if (result.isCorrect && conquerorGame.isActive) {
      const conqStatus = conquerorGame.recordConquest(result.currentQuestion);
      updateConquerorUI(conqStatus);

      // Sonraki sorulari hedefi dolmamis bolgelere odakla (aktif soru korunur)
      if (conqStatus && !conqStatus.isVictory) {
        geoQuiz.setCustomPool(conquerorGame.getPendingPool(), true);
      }
    }

    // Harita üzerindeki çoklu pinleri renklendir
    if (result.actualFormat === 'find_on_map') {
      geoMap.highlightMultiChoiceAnswer(result.correctId, result.selectedId);
    }

    // 📅 Plan Oturumu Aktifse: sonucu kaydet, HUD'u tazele
    if (planSessionActive) {
      studyPlan.recordAnswer(result.isCorrect, result.correctId);
      updatePlanHud();

      kpssInfoCard.style.display = 'block';
      kpssInfoTitle.textContent = result.name;
      kpssInfoType.textContent = `${result.type} (${result.region || ''})`;
      kpssInfoText.textContent = result.kpssNot || 'Bu soru için ek not girilmemiştir.';

      nextBtn.style.display = 'block';
      const kalan = studyPlan.progress();
      nextBtn.textContent = (kalan.done + 1 >= kalan.total) ? '🏁 Oturumu Bitir' : 'Sonraki Soru ➡️';
      nextBtn.focus();

      updateStatsUI();
      return;
    }

    // Genel Deneme Sınavı Aktifse
    if (isExamActive) {
      if (result.isCorrect) {
        examStats.correct++;
        examCorrectText.textContent = examStats.correct;

        // Doğru cevap verildiğinde akıcı şekilde sonraki soruya geç
        setTimeout(() => {
          if (isExamActive && geoQuiz.isAnswered) {
            examCurrentIndex++;
            loadExamQuestion();
          }
        }, 800);
      } else {
        examStats.wrong++;
        examWrongText.textContent = examStats.wrong;

        // Yanlış cevapta hap bilgisini göster ve butonu aç
        kpssInfoCard.style.display = 'block';
        kpssInfoTitle.textContent = result.name;
        kpssInfoType.textContent = `${result.type} (${result.region || ''})`;
        kpssInfoText.textContent = result.kpssNot || 'Bu soru için ek not girilmemiştir.';

        nextBtn.style.display = 'block';
        nextBtn.textContent = (examCurrentIndex === 17) ? '🎯 Denemeyi Bitir' : 'Sonraki Soru ➡️';
        nextBtn.focus();
      }
    } else if (isSpeedrunActive) {
      // Şimşek Turu (Speedrun) Aktifse
      if (result.isCorrect) {
        speedrunStats.correct++;
        speedrunStats.currentStreak++;
        if (speedrunStats.currentStreak > speedrunStats.bestStreak) {
          speedrunStats.bestStreak = speedrunStats.currentStreak;
        }
        speedrunScore += 100 + (speedrunStats.currentStreak * 15);
      } else {
        speedrunStats.wrong++;
        speedrunStats.currentStreak = 0;
      }
      speedrunScoreText.textContent = speedrunScore;

      // 400ms sonra bekletmeden anında sonraki soruya geç
      setTimeout(() => {
        if (isSpeedrunActive) {
          loadNextQuestion();
        }
      }, 450);
    } else {
      // Normal Mod: KPSS Hap Bilgisini Göster
      kpssInfoCard.style.display = 'block';
      kpssInfoTitle.textContent = result.name;
      kpssInfoType.textContent = `${result.type} (${result.region || ''})`;
      kpssInfoText.textContent = result.kpssNot || 'Bu soru için ek not girilmemiştir.';

      // Sonraki Soru butonunu aç
      nextBtn.style.display = 'block';
      nextBtn.textContent = 'Sonraki Soru ➡️';
      nextBtn.focus();
    }

    updateStatsUI();
  }

  // --- 📝 GENEL DENEME SINAVI (18 SORU & KRONOMETRE) MOTORU ---
  function startExam() {
    closeGamesDropdown();
    exitAllGameModes();
    if (currentMode === 'drawing') closeDrawingToolbar();
    if (currentMode === 'explore') setMode('quiz');

    // Oyun modundan geliniyorsa standart test arayüzünü geri getir
    currentMode = 'quiz';
    syncModeToggleLabel();
    document.body.classList.remove('game-mode-active');
    hideAllGameHuds();
    renderSubCategories();

    isExamActive = true;
    examSeconds = 0;
    examCurrentIndex = 0;
    examStats = { correct: 0, wrong: 0 };

    examModeBtn.classList.add('active');

    // Stats barını Deneme moduna geçir
    if (normalStatsBlock) normalStatsBlock.style.display = 'none';
    if (speedrunStatsBlock) speedrunStatsBlock.style.display = 'none';
    if (examStatsBlock) examStatsBlock.style.display = 'flex';

    examQIndex.textContent = '1';
    examTimeText.textContent = '00:00';
    examCorrectText.textContent = '0';
    examWrongText.textContent = '0';

    // Tüm kategorilerden (Dağ, Ova, Plato, Su Kaynakları, Geçitler) rastgele 18 adet soru topla
    const allGlobal = [];
    Object.keys(COGRAFYA_DATA).forEach(cat => {
      allGlobal.push(...COGRAFYA_DATA[cat]);
    });
    if (customDrawManager && customDrawManager.drawings) {
      allGlobal.push(...customDrawManager.drawings);
    }

    // Karıştır ve 18 soru seç
    examQuestions = [...allGlobal].sort(() => 0.5 - Math.random()).slice(0, 18);

    if (examInterval) clearInterval(examInterval);
    examInterval = setInterval(() => {
      examSeconds++;
      const mins = Math.floor(examSeconds / 60).toString().padStart(2, '0');
      const secs = (examSeconds % 60).toString().padStart(2, '0');
      examTimeText.textContent = `${mins}:${secs}`;
    }, 1000);

    loadExamQuestion();
  }

  function loadExamQuestion() {
    if (examCurrentIndex >= examQuestions.length) {
      endExam();
      return;
    }

    examQIndex.textContent = (examCurrentIndex + 1).toString();
    const qItem = examQuestions[examCurrentIndex];
    geoQuiz.currentQuestion = qItem;
    geoQuiz.isAnswered = false;

    // Seçili şık sayısı kadar şık üret
    const allGlobal = [];
    Object.keys(COGRAFYA_DATA).forEach(cat => {
      allGlobal.push(...COGRAFYA_DATA[cat]);
    });
    if (customDrawManager && customDrawManager.drawings) {
      allGlobal.push(...customDrawManager.drawings);
    }
    const candidatePool = allGlobal.filter(i => i.id !== qItem.id);

    const currentOptCount = geoQuiz.getOptionCount();
    let options = [];

    if (currentOptCount === 'all') {
      options = [qItem, ...candidatePool].sort(() => 0.5 - Math.random());
    } else {
      const targetDistractors = Math.max(1, parseInt(currentOptCount, 10) - 1);
      const distractors = geoQuiz.selectDistractorsByProximity(qItem, candidatePool, targetDistractors);
      options = [qItem, ...distractors].sort(() => 0.5 - Math.random());
    }
    geoQuiz.currentOptions = options;

    renderQuestion({
      question: qItem,
      options: options,
      questionText: `📍 <span style="color: #c084fc; font-weight:800;">${qItem.name}</span> <span style="font-size: 0.85rem; color: #94a3b8; font-weight:600;">(${qItem.type})</span>`,
      questionTypeTitle: `DENEME [${examCurrentIndex + 1}/18]`,
      actualFormat: 'find_on_map',
      isProblematic: false,
      isMastered: false,
      wrongCount: 0,
      correctCount: 0,
      streak: 0,
      difficultyLevel: geoQuiz.getDifficultyLevel()
    });

    nextBtn.textContent = (examCurrentIndex === 17) ? '🎯 Denemeyi Bitir' : 'Sonraki Soru ➡️';
  }

  function endExam(showModal = true) {
    if (!isExamActive && !examInterval) return;
    if (examInterval) clearInterval(examInterval);
    examInterval = null;
    isExamActive = false;

    examModeBtn.classList.remove('active');

    // Stats barını normale döndür
    if (examStatsBlock) examStatsBlock.style.display = 'none';
    if (normalStatsBlock) normalStatsBlock.style.display = 'flex';

    // Net Hesabı (Doğru - Yanlış / 4)
    const rawNet = examStats.correct - (examStats.wrong / 4);
    const netFormatted = Math.max(0, rawNet).toFixed(2);
    const mins = Math.floor(examSeconds / 60).toString().padStart(2, '0');
    const secs = (examSeconds % 60).toString().padStart(2, '0');

    examResCorrect.textContent = examStats.correct;
    examResWrong.textContent = examStats.wrong;
    examResNet.textContent = netFormatted;
    examResTime.textContent = `${mins}:${secs}`;

    // Oyun modu geçişinde sessizce kapatılırken sonuç modalı açılmamalı
    if (showModal) examModal.style.display = 'flex';
  }

  examModeBtn.addEventListener('click', () => {
    if (isExamActive) {
      closeGamesDropdown();
      endExam();
    } else {
      startExam();
    }
  });

  examAbortBtn.addEventListener('click', () => endExam());
  examRestartBtn.addEventListener('click', () => {
    examModal.style.display = 'none';
    startExam();
  });
  examCloseModalBtn.addEventListener('click', () => {
    examModal.style.display = 'none';
    loadNextQuestion();
  });

  // --- ⚡ ŞİMŞEK TURU (SPEEDRUN) MOTORU ---
  function startSpeedrun() {
    closeGamesDropdown();
    exitAllGameModes();
    if (currentMode === 'drawing') closeDrawingToolbar();
    if (currentMode === 'explore') setMode('quiz');

    // Oyun modundan geliniyorsa standart test arayüzünü geri getir
    currentMode = 'quiz';
    syncModeToggleLabel();
    document.body.classList.remove('game-mode-active');
    hideAllGameHuds();
    renderSubCategories();

    isSpeedrunActive = true;
    speedrunSeconds = 60;
    speedrunScore = 0;
    speedrunStats = { correct: 0, wrong: 0, bestStreak: 0, currentStreak: 0 };

    speedrunBtn.classList.add('active');
    
    // Stats barını Şimşek Turu moduna geçir
    if (normalStatsBlock) normalStatsBlock.style.display = 'none';
    if (speedrunStatsBlock) speedrunStatsBlock.style.display = 'flex';

    speedrunTimeLeft.textContent = speedrunSeconds;
    speedrunScoreText.textContent = speedrunScore;

    const timerChip = speedrunStatsBlock ? speedrunStatsBlock.querySelector('.speedrun-stat-chip.timer') : null;
    if (timerChip) timerChip.classList.remove('critical');

    // Şıkları 4 şıkka sabitle
    geoQuiz.setOptionCount(4);
    optCountBtns.forEach(b => b.classList.toggle('active', b.dataset.count === '4'));

    if (speedrunInterval) clearInterval(speedrunInterval);
    speedrunInterval = setInterval(() => {
      speedrunSeconds--;
      speedrunTimeLeft.textContent = speedrunSeconds;

      if (speedrunSeconds <= 10) {
        if (timerChip) timerChip.classList.add('critical');
      } else {
        if (timerChip) timerChip.classList.remove('critical');
      }

      if (speedrunSeconds <= 0) {
        endSpeedrun();
      }
    }, 1000);

    loadNextQuestion();
  }

  function endSpeedrun(showModal = true) {
    if (!isSpeedrunActive && !speedrunInterval) return;
    if (speedrunInterval) clearInterval(speedrunInterval);
    speedrunInterval = null;
    isSpeedrunActive = false;

    speedrunBtn.classList.remove('active');

    // Stats barını normal çalışma moduna geri al
    if (speedrunStatsBlock) speedrunStatsBlock.style.display = 'none';
    if (normalStatsBlock) normalStatsBlock.style.display = 'flex';

    // Rekor Skor Kontrolü
    const savedBest = parseInt(localStorage.getItem('kpss_speedrun_best_score') || '0', 10);
    const newBest = Math.max(savedBest, speedrunScore);
    localStorage.setItem('kpss_speedrun_best_score', newBest.toString());

    // Sonuç modalını doldur ve aç
    speedrunResCorrect.textContent = speedrunStats.correct;
    speedrunResWrong.textContent = speedrunStats.wrong;
    speedrunResStreak.textContent = speedrunStats.bestStreak;
    speedrunResBest.textContent = newBest;

    // Oyun modu geçişinde sessizce kapatılırken sonuç modalı açılmamalı
    if (showModal) speedrunModal.style.display = 'flex';
  }

  speedrunBtn.addEventListener('click', () => {
    if (isSpeedrunActive) {
      closeGamesDropdown();
      endSpeedrun();
    } else {
      startSpeedrun();
    }
  });

  speedrunAbortBtn.addEventListener('click', () => endSpeedrun());
  speedrunRestartBtn.addEventListener('click', () => {
    speedrunModal.style.display = 'none';
    startSpeedrun();
  });
  speedrunCloseModalBtn.addEventListener('click', () => {
    speedrunModal.style.display = 'none';
    loadNextQuestion();
  });

  function updateStatsUI() {
    statCorrect.textContent = geoQuiz.stats.correct;
    statWrong.textContent = geoQuiz.stats.wrong;
    statStreak.textContent = geoQuiz.stats.streak > 0 ? `🔥 ${geoQuiz.stats.streak}` : '0';
    statRate.textContent = `%${geoQuiz.getSuccessRate()}`;
  }

  // İstatistik Sıfırlama Butonu
  const resetStatsBtn = document.getElementById('reset-stats-btn');
  if (resetStatsBtn) {
    resetStatsBtn.addEventListener('click', () => {
      if (confirm('📊 Çalışma istatistiklerinizi ve başarı yüzdenizi sıfırlamak istediğinize emin misiniz?')) {
        geoQuiz.resetStats();
        updateStatsUI();
      }
    });
  }

  // --- ZORLUK SEVİYESİ YÖNETİMİ (1-5 KADEME) ---
  diffBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      diffBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const level = parseInt(btn.dataset.level, 10);
      geoQuiz.setDifficultyLevel(level);

      // Mutlak konum modlari zorlugu siklarin cografi yakinligi olarak kullanir
      if (mkRefreshRound()) return;

      if (currentMode === 'quiz') {
        loadNextQuestion();
      }
    });
  });

  // Başlangıç zorluk butonunu aktif et
  const initialDiff = geoQuiz.getDifficultyLevel();
  diffBtns.forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.level, 10) === initialDiff);
  });

  // ============================================================
  // 🎮 YENİ EĞLENCELİ OYUN MODLARI MANTIĞI
  // ============================================================

  // Oyun Menüsü Açılır/Kapanır
  if (gamesMenuBtn && gamesDropdown) {
    gamesMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVis = gamesDropdown.style.display === 'flex';
      gamesDropdown.style.display = isVis ? 'none' : 'flex';
      closeToolsDropdown();
    });

    document.addEventListener('click', (e) => {
      if (!gamesDropdown.contains(e.target) && e.target !== gamesMenuBtn) {
        gamesDropdown.style.display = 'none';
      }
    });
  }

  function hideAllGameHuds() {
    if (quizPanel) quizPanel.classList.remove('minimized');
    const inner = document.getElementById('quiz-panel-inner');
    // Sabit 'flex' atamasi stylesheet'teki dikey akisi eziyordu; CSS'e birakiyoruz.
    if (inner) inner.style.display = '';
    const collBar = document.getElementById('quiz-collapsed-bar');
    if (collBar) collBar.style.display = 'none';

    if (geoguessrHud) geoguessrHud.style.display = 'none';
    if (conquerorHud) conquerorHud.style.display = 'none';
    if (matchHud) matchHud.style.display = 'none';
    const mkHudEl = document.getElementById('mk-hud');
    if (mkHudEl) mkHudEl.style.display = 'none';
    if (speedrunStatsBlock) speedrunStatsBlock.style.display = 'none';
    if (examStatsBlock) examStatsBlock.style.display = 'none';
    if (normalStatsBlock) normalStatsBlock.style.display = 'flex';
    if (quizDefaultStatsBar) quizDefaultStatsBar.style.display = '';
    if (standardQuizBody) standardQuizBody.style.display = '';
    if (exploreBanner) exploreBanner.style.display = 'none';
  }

  function closeGamesDropdown() {
    if (gamesDropdown) gamesDropdown.style.display = 'none';
  }

  // ⚙️ Araçlar menüsü (soru formatı + odak modu + harita editörü)
  const toolsMenuBtn = document.getElementById('tools-menu-btn');
  const toolsDropdown = document.getElementById('tools-dropdown');

  function closeToolsDropdown() {
    if (toolsDropdown) toolsDropdown.style.display = 'none';
  }

  if (toolsMenuBtn && toolsDropdown) {
    toolsMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const acik = toolsDropdown.style.display === 'flex';
      toolsDropdown.style.display = acik ? 'none' : 'flex';
      closeGamesDropdown();
    });
    document.addEventListener('click', (e) => {
      if (!toolsDropdown.contains(e.target) && !toolsMenuBtn.contains(e.target)) {
        closeToolsDropdown();
      }
    });
  }

  // Kesif modundayken oyuna girilip cikilinca buton "Test Moduna Gec" yazili kaliyordu
  function syncModeToggleLabel() {
    if (!modeToggleBtn) return;
    modeToggleBtn.innerHTML = (currentMode === 'explore')
      ? `<span>🎯</span> <span>Test Moduna Geç</span>`
      : `<span>🧭</span> <span>Keşif Modu</span>`;
  }

  function isGameModeActive() {
    return currentMode === 'geoguessr' || currentMode === 'conqueror' ||
           currentMode === 'match' || currentMode.indexOf('mk_') === 0;
  }

  function hideGameModals() {
    [geoguessrModal, conquerorModal, matchModal, document.getElementById('mk-modal')].forEach(m => {
      if (m) m.style.display = 'none';
    });
  }

  // Fetih modu tum Turkiye'yi kapsar: sorular tek kategoriden degil global havuzdan gelir.
  function buildGlobalQuizPool() {
    const pool = [];
    Object.keys(COGRAFYA_DATA).forEach(cat => {
      // Iliskili eslestirme kartlarinin kendi soru formati var, fetihte kullanilmaz
      if (cat === 'iliskili_cografya') return;
      pool.push(...COGRAFYA_DATA[cat]);
    });
    if (customDrawManager && customDrawManager.drawings) {
      pool.push(...customDrawManager.drawings);
    }
    return pool.filter(i => i && typeof i.lat === 'number' && typeof i.lng === 'number');
  }

  // Calisan HER oyun motorunu ve zamanlayiciyi kapatan tek giris noktasi.
  // Eskiden modlar arasi geciste eski motorun timer'i ve harita tiklama
  // dinleyicisi arkada calismaya devam ediyordu.
  function exitAllGameModes() {
    let labelsRestored = geoGuessrGame.exit();
    conquerorGame.exit();
    matchGame.exit();

    // Mutlak konum motorlari (koordinat avcisi dilsiz harita override'i yapar)
    Object.keys(mkGames).forEach(key => {
      if (mkGames[key].exit() === true) labelsRestored = true;
    });
    activeMkKey = null;

    matchBoardLocked = false;
    stopPlanSession();
    hideMistakesLayer();
    geoQuiz.clearCustomPool();

    endSpeedrun(false);
    endExam(false);

    hideGameModals();
    if (labelsRestored) updateLabelsBtnUI();
  }

  // Oyun modundan normal test moduna donus
  function returnToQuizMode() {
    exitAllGameModes();
    currentMode = 'quiz';
    syncModeToggleLabel();
    document.body.classList.remove('game-mode-active');
    hideAllGameHuds();
    renderSubCategories();
    loadNextQuestion();
  }

  // Bir oyun modu baslatilmadan onceki ortak hazirlik
  function prepareGameMode(modeName) {
    closeGamesDropdown();
    exitAllGameModes();
    if (currentMode === 'drawing') closeDrawingToolbar();
    currentMode = modeName;
    document.body.classList.add('game-mode-active');
    hideAllGameHuds();
  }

  // --- 🎯 1. KÖR ATIŞ (GEOGUESSR) MODU ---
  function startGeoGuessrMode() {
    prepareGameMode('geoguessr');

    // Standart test arayüzünü ve çubuklarını tamamen kapat
    if (quizDefaultStatsBar) quizDefaultStatsBar.style.display = 'none';
    if (standardQuizBody) standardQuizBody.style.display = 'none';
    if (subCategoriesBar) subCategoriesBar.style.display = 'none';

    if (geoguessrHud) geoguessrHud.style.display = 'flex';
    if (geoguessrFeedbackBox) geoguessrFeedbackBox.style.display = 'none';

    const roundData = geoGuessrGame.start();
    updateLabelsBtnUI(); // Oyun dilsiz haritayi zorluyor, buton durumu senkron kalsin
    updateGeoGuessrUI(roundData);
  }

  function updateGeoGuessrUI(roundData) {
    if (!roundData) return;
    if (geoguessrRoundIdx) geoguessrRoundIdx.textContent = roundData.round;
    if (geoguessrScoreVal) geoguessrScoreVal.textContent = roundData.totalScore;
    if (geoguessrTargetName) {
      const typeText = roundData.target.type ? ` (${roundData.target.type})` : '';
      geoguessrTargetName.textContent = `📍 ${roundData.target.name}${typeText}`;
    }
    if (geoguessrFeedbackBox) geoguessrFeedbackBox.style.display = 'none';
  }

  if (btnGeoguessrMode) btnGeoguessrMode.addEventListener('click', startGeoGuessrMode);

  if (geoguessrNextBtn) {
    geoguessrNextBtn.addEventListener('click', () => {
      const step = geoGuessrGame.proceedToNext();
      if (step.isFinished) {
        showGeoGuessrResults(step.summary);
      } else {
        updateGeoGuessrUI(step.roundData);
      }
    });
  }

  if (geoguessrAbortBtn) {
    geoguessrAbortBtn.addEventListener('click', returnToQuizMode);
  }

  function showGeoGuessrResults(summary) {
    if (!summary) return;
    if (geoguessrResBadge) geoguessrResBadge.textContent = summary.badge;
    if (geoguessrResTitle) geoguessrResTitle.textContent = summary.title;
    if (geoguessrResScore) geoguessrResScore.textContent = summary.totalScore;
    if (geoguessrResAvgkm) geoguessrResAvgkm.textContent = `${summary.avgDistanceKm} km`;

    if (geoguessrRoundList) {
      geoguessrRoundList.innerHTML = summary.roundResults.map(r => `
        <div class="geoguessr-round-row">
          <span>${r.round}. ${r.target.name}</span>
          <span style="color: ${r.distanceKm <= 50 ? '#4ade80' : r.distanceKm <= 150 ? '#fbbf24' : '#f87171'}; font-weight: 800;">
            ${r.distanceKm} km (+${r.score} Puan)
          </span>
        </div>
      `).join('');
    }

    if (geoguessrModal) geoguessrModal.style.display = 'flex';
  }

  if (geoguessrCloseBtn) {
    geoguessrCloseBtn.addEventListener('click', () => {
      if (geoguessrModal) geoguessrModal.style.display = 'none';
      returnToQuizMode();
    });
  }

  if (geoguessrRestartBtn) {
    geoguessrRestartBtn.addEventListener('click', () => {
      if (geoguessrModal) geoguessrModal.style.display = 'none';
      startGeoGuessrMode();
    });
  }

  // --- ⚔️ 2. HARİTA FATİHİ (CONQUEROR) MODU ---
  function startConquerorMode() {
    prepareGameMode('conqueror');

    if (quizDefaultStatsBar) quizDefaultStatsBar.style.display = 'none';
    if (conquerorHud) conquerorHud.style.display = 'flex';
    if (standardQuizBody) standardQuizBody.style.display = '';
    if (subCategoriesBar) subCategoriesBar.style.display = 'none';

    // Havuzu hem quiz motoruna hem de fetih motoruna ver:
    // hedefler bu havuza gore kuruldugu icin %100 daima ulasilabilir olur.
    const pool = buildGlobalQuizPool();
    geoQuiz.setCustomPool(pool);

    const status = conquerorGame.start(pool);
    updateConquerorUI(status);
    loadNextQuestion();
  }

  function updateConquerorUI(status) {
    if (!status) return;
    if (conquerorPercentVal) conquerorPercentVal.textContent = `%${status.overallPercent}`;
    if (conquerorCountVal) conquerorCountVal.textContent = status.totalConquered;

    if (conquerorRegionsGrid) {
      conquerorRegionsGrid.innerHTML = status.regionStats.map(reg => `
        <div class="conqueror-region-item ${reg.isCompleted ? 'completed' : ''}">
          <div class="conqueror-region-header">
            <span>${reg.name}</span>
            <span>${reg.current}/${reg.goal} (%${reg.percent})</span>
          </div>
          <div class="conqueror-bar-track">
            <div class="conqueror-bar-fill" style="width: ${reg.percent}%;"></div>
          </div>
        </div>
      `).join('');
    }

    // Sadece zafere ilk ulasildiginda ac; "Haritayi Incele" ile kapatilinca
    // her dogru cevapta tekrar acilmasin.
    if (status.isNewVictory && conquerorModal) {
      if (conquerorResPercent) conquerorResPercent.textContent = `%${status.overallPercent}`;
      if (conquerorResCount) conquerorResCount.textContent = status.totalConquered;
      conquerorModal.style.display = 'flex';
    }
  }

  if (btnConquerorMode) btnConquerorMode.addEventListener('click', startConquerorMode);

  if (conquerorAbortBtn) {
    conquerorAbortBtn.addEventListener('click', returnToQuizMode);
  }

  if (conquerorCloseBtn) {
    conquerorCloseBtn.addEventListener('click', () => {
      if (conquerorModal) conquerorModal.style.display = 'none';
    });
  }

  if (conquerorRestartBtn) {
    conquerorRestartBtn.addEventListener('click', () => {
      if (conquerorModal) conquerorModal.style.display = 'none';
      startConquerorMode();
    });
  }

  // --- 🧩 3. ŞEKİL YAPBOZU (MATCH & BLAST) MODU ---
  function startMatchMode() {
    prepareGameMode('match');

    // Standart test arayüzünü ve çubuklarını tamamen kapat
    if (quizDefaultStatsBar) quizDefaultStatsBar.style.display = 'none';
    if (standardQuizBody) standardQuizBody.style.display = 'none';
    if (subCategoriesBar) subCategoriesBar.style.display = 'none';

    if (matchHud) matchHud.style.display = 'flex';

    matchBoardLocked = false;

    matchGame.onTick = (timeLeft) => {
      if (matchTimerVal) matchTimerVal.textContent = timeLeft;
    };

    matchGame.onFinish = (result) => {
      matchBoardLocked = false;
      if (matchResScore) matchResScore.textContent = result.score;
      if (matchResTime) matchResTime.textContent = `${result.timeSpent}s`;
      if (matchModal) matchModal.style.display = 'flex';
    };

    const boardState = matchGame.start();
    renderMatchBoard(boardState);
  }

  function renderMatchBoard(boardState) {
    if (!boardState) return;
    if (matchTimerVal) matchTimerVal.textContent = boardState.timeLeft;
    if (matchScoreVal) matchScoreVal.textContent = boardState.score;
    if (matchComboVal) matchComboVal.textContent = boardState.combo;

    const buildCard = (card, side, icon, isSelected) => {
      const btn = document.createElement('button');
      btn.className = `match-card ${isSelected ? 'selected' : ''}`;
      btn.dataset.id = card.id;
      btn.textContent = `${icon} ${card.text}`;
      btn.addEventListener('click', () => {
        if (matchBoardLocked) return; // Animasyon oynarken tiklamalari yut
        const res = matchGame.selectCard(card.id, side);
        handleMatchInteraction(res);
      });
      return btn;
    };

    if (matchLeftCards) {
      matchLeftCards.innerHTML = '';
      boardState.leftCards.forEach(card => {
        matchLeftCards.appendChild(
          buildCard(card, 'source', '📍', boardState.selectedLeft === card.id)
        );
      });
    }

    if (matchRightCards) {
      matchRightCards.innerHTML = '';
      boardState.rightCards.forEach(card => {
        matchRightCards.appendChild(
          buildCard(card, 'target', '🎯', boardState.selectedRight === card.id)
        );
      });
    }
  }

  // Ekranda duran kartlara gecici bir sinif basar (.matched / .error).
  // CSS'te bu animasyonlar tanimliydi ama hicbir yerden uygulanmiyordu.
  function flashMatchCards(leftId, rightId, cls, durationMs, done) {
    const nodes = [];
    if (leftId && matchLeftCards) {
      const n = matchLeftCards.querySelector(`.match-card[data-id="${leftId}"]`);
      if (n) nodes.push(n);
    }
    if (rightId && matchRightCards) {
      const n = matchRightCards.querySelector(`.match-card[data-id="${rightId}"]`);
      if (n) nodes.push(n);
    }

    if (nodes.length === 0) {
      done();
      return;
    }

    matchBoardLocked = true;
    nodes.forEach(n => {
      n.classList.remove('selected');
      n.classList.add(cls);
    });

    setTimeout(() => {
      matchBoardLocked = false;
      done();
    }, durationMs);
  }

  function handleMatchInteraction(res) {
    if (!res) return;

    // Skor / kombo / sure her durumda aninda guncellensin
    if (matchScoreVal) matchScoreVal.textContent = res.boardState.score;
    if (matchComboVal) matchComboVal.textContent = res.boardState.combo;
    if (matchTimerVal) matchTimerVal.textContent = res.boardState.timeLeft;

    if (res.status === 'match') {
      flashMatchCards(res.matchedId, res.matchedId, 'matched', 300, () => {
        if (matchGame.isActive) renderMatchBoard(matchGame.getBoardState());
      });
      return;
    }

    if (res.status === 'mismatch') {
      flashMatchCards(res.failedLeft, res.failedRight, 'error', 350, () => {
        if (matchGame.isActive) renderMatchBoard(matchGame.getBoardState());
      });
      return;
    }

    renderMatchBoard(res.boardState);
  }

  if (btnMatchMode) btnMatchMode.addEventListener('click', startMatchMode);

  if (matchAbortBtn) {
    matchAbortBtn.addEventListener('click', returnToQuizMode);
  }

  if (matchCloseBtn) {
    matchCloseBtn.addEventListener('click', () => {
      if (matchModal) matchModal.style.display = 'none';
      returnToQuizMode();
    });
  }

  if (matchRestartBtn) {
    matchRestartBtn.addEventListener('click', () => {
      if (matchModal) matchModal.style.display = 'none';
      startMatchMode();
    });
  }

  // ============================================================
  // 📐 MUTLAK (MATEMATİKSEL) KONUM MODLARI - ORTAK DENETLEYİCİ
  // 5 motor da aynı "view" nesnesini döndürür, tek render burada.
  // ============================================================
  const mkHud = document.getElementById('mk-hud');
  const mkModeTitle = document.getElementById('mk-mode-title');
  const mkRoundEl = document.getElementById('mk-round');
  const mkMaxRoundEl = document.getElementById('mk-maxround');
  const mkScoreEl = document.getElementById('mk-score');
  const mkSettingsChip = document.getElementById('mk-settings-chip');
  const mkStreakChip = document.getElementById('mk-streak-chip');
  const mkStreakEl = document.getElementById('mk-streak');
  const mkTimerChip = document.getElementById('mk-timer-chip');
  const mkTimerEl = document.getElementById('mk-timer');
  const mkBadgeEl = document.getElementById('mk-badge');
  const mkPromptEl = document.getElementById('mk-prompt');
  const mkHintEl = document.getElementById('mk-hint');
  const mkOptionsEl = document.getElementById('mk-options');
  const mkFeedbackEl = document.getElementById('mk-feedback');
  const mkFeedbackTitle = document.getElementById('mk-feedback-title');
  const mkFeedbackRows = document.getElementById('mk-feedback-rows');
  const mkFeedbackNote = document.getElementById('mk-feedback-note');
  const mkNextBtn = document.getElementById('mk-next-btn');
  const mkAbortBtn = document.getElementById('mk-abort-btn');
  const mkModal = document.getElementById('mk-modal');
  const mkResBadge = document.getElementById('mk-res-badge');
  const mkResTitle = document.getElementById('mk-res-title');
  const mkResSubtitle = document.getElementById('mk-res-subtitle');
  const mkResStats = document.getElementById('mk-res-stats');
  const mkResRounds = document.getElementById('mk-res-rounds');
  const mkCloseBtn = document.getElementById('mk-close-btn');
  const mkRestartBtn = document.getElementById('mk-restart-btn');

  const MK_OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  function mkActiveGame() {
    return activeMkKey ? mkGames[activeMkKey] : null;
  }

  function mkIsFeedbackOpen() {
    return !!mkFeedbackEl && mkFeedbackEl.style.display === 'block';
  }

  function mkUpdateTimer(seconds) {
    if (mkTimerEl) mkTimerEl.textContent = seconds;
    if (mkTimerChip) mkTimerChip.classList.toggle('critical', seconds <= 2);
  }

  function startMutlakKonumMode(key) {
    if (!mkGames[key]) return;

    prepareGameMode('mk_' + key);
    activeMkKey = key;

    // Standart test arayüzünü tamamen kapat
    if (quizDefaultStatsBar) quizDefaultStatsBar.style.display = 'none';
    if (standardQuizBody) standardQuizBody.style.display = 'none';
    if (subCategoriesBar) subCategoriesBar.style.display = 'none';
    if (mkHud) mkHud.style.display = 'flex';

    const game = mkGames[key];
    // Sol alt paneldeki Zorluk ve Sik ayarlari her turda buradan okunur
    game.getSettings = () => ({
      optionCount: geoQuiz.getOptionCount(),
      difficulty: geoQuiz.getDifficultyLevel()
    });
    // Haritadaki sik pinine tiklamak da cevap verir (standart testteki gibi)
    game.onPinSelect = (cityId) => mkSelect(cityId);
    game.onTick = (secondsLeft) => mkUpdateTimer(secondsLeft);
    game.onTimeout = (view) => mkRender(view);

    mkRender(game.start());

    // Koordinat avcısı dilsiz haritayı zorluyor, buton durumu senkron kalsın
    if (key === 'coord') updateLabelsBtnUI();
  }

  function mkRender(view) {
    if (!view) return;

    if (view.finished) {
      mkShowResults(view.summary);
      return;
    }

    if (mkModeTitle) mkModeTitle.textContent = view.title;
    if (mkRoundEl) mkRoundEl.textContent = view.round;
    if (mkMaxRoundEl) mkMaxRoundEl.textContent = view.maxRounds;
    if (mkScoreEl) mkScoreEl.textContent = view.score;
    if (mkSettingsChip) mkSettingsChip.textContent = view.settings || '';

    if (mkStreakChip) {
      const hasStreak = typeof view.streak === 'number';
      mkStreakChip.style.display = hasStreak ? 'inline-flex' : 'none';
      if (hasStreak && mkStreakEl) mkStreakEl.textContent = view.streak;
    }

    if (mkTimerChip) {
      const hasTimer = typeof view.timer === 'number';
      mkTimerChip.style.display = hasTimer ? 'inline-flex' : 'none';
      if (hasTimer) mkUpdateTimer(view.timer);
    }

    if (mkBadgeEl) mkBadgeEl.textContent = view.badge || '';
    if (mkPromptEl) mkPromptEl.innerHTML = view.prompt || '';
    if (mkHintEl) mkHintEl.innerHTML = view.hint || '';

    // Seçenek kartları (koordinat avcısında yoktur, harita tıklanır)
    // Ayni durumlar harita pinlerine de yansitilir; panel ve harita ayrisamaz.
    const pinStates = {};
    (view.options || []).forEach(opt => {
      pinStates[opt.id] = { state: opt.state || '', order: opt.order || null };
    });
    if (view.options && view.options.length) geoMap.applyChoicePinStates(pinStates);

    if (mkOptionsEl) {
      mkOptionsEl.innerHTML = '';
      const locked = !!view.feedback;
      (view.options || []).forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'mk-option-btn' + (opt.state ? ' ' + opt.state : '');
        btn.dataset.id = opt.id;
        // Siralama modunda secilmis kart tekrar tiklanamasin (sessizce yok sayiliyordu)
        btn.disabled = locked || opt.state === 'picked';

        const keyLabel = opt.order ? opt.order : (MK_OPTION_LETTERS[index] || (index + 1));
        btn.innerHTML = `
          <span class="mk-option-key">${keyLabel}</span>
          <span class="mk-option-body">
            <span class="mk-option-name">${opt.label}</span>
            <span class="mk-option-sub">${opt.sub || ''}</span>
          </span>
        `;
        btn.addEventListener('click', () => mkSelect(opt.id));
        mkOptionsEl.appendChild(btn);
      });
    }

    // Geri bildirim paneli
    if (mkFeedbackEl) {
      if (view.feedback) {
        const fb = view.feedback;
        mkFeedbackEl.style.display = 'block';
        mkFeedbackEl.className = 'mk-feedback ' + (fb.ok ? 'ok' : 'bad');
        if (mkFeedbackTitle) mkFeedbackTitle.textContent = fb.title || '';
        if (mkFeedbackRows) {
          mkFeedbackRows.innerHTML = (fb.rows || []).map(r => `
            <div class="mk-feedback-row ${r.highlight ? 'highlight' : ''}">
              <span>${r.label}</span>
              <span class="mk-row-val">${r.value}</span>
            </div>
          `).join('');
        }
        if (mkFeedbackNote) mkFeedbackNote.textContent = fb.note || '';
        if (mkNextBtn) {
          mkNextBtn.textContent = (view.round >= view.maxRounds)
            ? 'Sonuçları Gör → (Boşluk)'
            : 'Sonraki Tur → (Boşluk)';
        }
      } else {
        mkFeedbackEl.style.display = 'none';
      }
    }
  }

  function mkSelect(optionId) {
    const game = mkActiveGame();
    if (!game || typeof game.select !== 'function') return;
    mkRender(game.select(optionId));
  }

  function mkNext() {
    const game = mkActiveGame();
    if (!game) return;
    mkRender(game.next());
  }

  /** Zorluk / sik sayisi oyun ortasinda degisirse turu yeni ayarlarla yeniden kurar */
  function mkRefreshRound() {
    const game = mkActiveGame();
    if (!game || !game.isActive) return false;
    mkRender(game.refreshRound());
    return true;
  }

  function mkShowResults(summary) {
    if (!summary || !mkModal) return;

    if (mkResBadge) mkResBadge.textContent = summary.badge;
    if (mkResTitle) mkResTitle.textContent = summary.title;
    if (mkResSubtitle) mkResSubtitle.textContent = summary.subtitle;

    if (mkResStats) {
      mkResStats.innerHTML = summary.stats.map(st => `
        <div class="speedrun-stat-box ${st.cls === 'record' ? 'best' : ''}">
          <span class="speedrun-stat-val ${st.cls}">${st.val}</span>
          <span class="speedrun-stat-lbl">${st.label}</span>
        </div>
      `).join('');
    }

    if (mkResRounds) {
      mkResRounds.innerHTML = (summary.rows || []).map(r => `
        <div class="geoguessr-round-row">
          <span>${r.left}</span>
          <span style="color: ${r.ok ? '#4ade80' : '#f87171'}; font-weight: 800;">
            ${r.ok ? '✓' : '✗'} ${r.right}
          </span>
        </div>
      `).join('');
    }

    mkModal.style.display = 'flex';
  }

  if (mkNextBtn) mkNextBtn.addEventListener('click', mkNext);
  if (mkAbortBtn) mkAbortBtn.addEventListener('click', returnToQuizMode);

  if (mkCloseBtn) {
    mkCloseBtn.addEventListener('click', () => {
      if (mkModal) mkModal.style.display = 'none';
      returnToQuizMode();
    });
  }

  if (mkRestartBtn) {
    mkRestartBtn.addEventListener('click', () => {
      const key = activeMkKey; // startMutlakKonumMode içindeki temizlik bunu sıfırlar
      if (mkModal) mkModal.style.display = 'none';
      if (key) startMutlakKonumMode(key);
    });
  }

  Object.entries({
    'btn-mk-sun': 'sun',
    'btn-mk-temp': 'temp',
    'btn-mk-daynight': 'daynight',
    'btn-mk-coord': 'coord',
    'btn-mk-duel': 'duel'
  }).forEach(([btnId, key]) => {
    const btn = document.getElementById(btnId);
    if (btn) btn.addEventListener('click', () => startMutlakKonumMode(key));
  });
  // Soru formatı artık Araçlar menüsünün içinde; ayrı bir açılır düğmesi yok.
  // Eski elemanlara yapılan atıflar null olabilir, bu yüzden hepsi korumalı.
  if (formatToggleBtn && formatDropdown) {
    formatToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = formatDropdown.style.display === 'flex';
      formatDropdown.style.display = isVisible ? 'none' : 'flex';
    });
  }

  formatOptionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const format = btn.dataset.format;
      geoQuiz.setQuizFormat(format);

      formatOptionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (formatLabel) {
        formatLabel.textContent = format === 'find_on_map' ? 'Haritada Bul (I-V)'
          : format === 'identify' ? 'Konumdan İsim Bul' : 'Karışık Sürpriz Modu';
      }

      if (formatDropdown) formatDropdown.style.display = 'none';
      closeToolsDropdown();

      if (currentMode === 'quiz') {
        loadNextQuestion();
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (formatDropdown && !formatDropdown.contains(e.target) && e.target !== formatToggleBtn) {
      formatDropdown.style.display = 'none';
    }
  });

  const initialFormat = geoQuiz.getQuizFormat();
  formatOptionBtns.forEach(b => {
    b.classList.toggle('active', b.dataset.format === initialFormat);
  });
  if (formatLabel) {
    formatLabel.textContent = initialFormat === 'find_on_map' ? 'Haritada Bul (I-V)'
      : initialFormat === 'identify' ? 'Konumdan İsim Bul' : 'Karışık Sürpriz Modu';
  }

  // --- DİNAMİK ŞIK SAYISI YÖNETİMİ ---
  optCountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      optCountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const countVal = btn.dataset.count === 'all' ? 'all' : parseInt(btn.dataset.count, 10);
      geoQuiz.setOptionCount(countVal);

      // Mutlak konum modlarinda sik sayisi secenek/kart adedini belirler
      if (mkRefreshRound()) return;

      if (isExamActive) {
        loadExamQuestion();
      } else if (currentMode === 'quiz') {
        loadNextQuestion();
      }
    });
  });

  // Başlangıç kayıtlı şık sayısını butonlarda aktif et
  const initialOptCount = geoQuiz.getOptionCount().toString();
  optCountBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.count === initialOptCount);
  });

  // --- HARİTA KATMANLARI VE AUTO-ZOOM YÖNETİMİ ---
  mapLayerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = layerDropdown.style.display === 'flex';
    layerDropdown.style.display = isVisible ? 'none' : 'flex';
  });

  layerOptionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const layerKey = btn.dataset.layer;
      const layerName = geoMap.setLayer(layerKey);

      layerOptionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      mapLayerLabel.textContent = layerName;
      layerDropdown.style.display = 'none';
    });
  });

  document.addEventListener('click', (e) => {
    if (!layerDropdown.contains(e.target) && e.target !== mapLayerBtn) {
      layerDropdown.style.display = 'none';
    }
  });

  function updateAutoZoomUI() {
    if (geoMap.autoZoomEnabled) {
      autoZoomBtn.classList.add('active');
      autoZoomLabel.textContent = 'Otomatik Odak: Açık';
    } else {
      autoZoomBtn.classList.remove('active');
      autoZoomLabel.textContent = 'Otomatik Odak: Kapalı';
    }
  }

  autoZoomBtn.addEventListener('click', () => {
    geoMap.toggleAutoZoom();
    updateAutoZoomUI();
  });

  updateAutoZoomUI();

  // --- ÇİZİM EDİTÖRÜ MODU VE ARAÇ ÇUBUĞU ---
  function openDrawingToolbar() {
    currentMode = 'drawing';
    drawingToolbar.style.display = 'flex';
    drawModeBtn.classList.add('active');
    geoMap.clearAll();
    setDrawShape(activeDrawShape);
  }

  function closeDrawingToolbar() {
    drawingToolbar.style.display = 'none';
    drawModeBtn.classList.remove('active');
    geoMap.cancelDrawing();
    currentMode = 'quiz';
    loadNextQuestion();
  }

  function setDrawShape(shapeType) {
    activeDrawShape = shapeType;
    [drawPointBtn, drawLineBtn, drawPolyBtn].forEach(btn => {
      btn.classList.toggle('active', btn.dataset.shape === shapeType);
    });

    if (shapeType === 'point') {
      drawingHint.textContent = '💡 Haritada istediğiniz bir noktaya tek tıklayın.';
    } else if (shapeType === 'polyline') {
      drawingHint.textContent = '💡 Haritaya tıklayarak hat/çizgi noktaları ekleyin. Bitirmek için çift tıklayın veya "✅ Tamamla"ya basın.';
    } else if (shapeType === 'polygon') {
      drawingHint.textContent = '💡 Haritaya tıklayarak alanın köşelerini belirleyin. Kapatmak için çift tıklayın veya "✅ Tamamla"ya basın.';
    }

    geoMap.startDrawing(shapeType, (result) => {
      pendingDrawingData = result;
      openSaveModal();
    });
  }

  drawModeBtn.addEventListener('click', () => {
    closeToolsDropdown();
    if (drawingToolbar.style.display === 'none') {
      openDrawingToolbar();
    } else {
      closeDrawingToolbar();
    }
  });

  drawPointBtn.addEventListener('click', () => setDrawShape('point'));
  drawLineBtn.addEventListener('click', () => setDrawShape('polyline'));
  drawPolyBtn.addEventListener('click', () => setDrawShape('polygon'));

  drawUndoBtn.addEventListener('click', () => geoMap.undoLastVertex());
  drawFinishBtn.addEventListener('click', () => geoMap.finishDrawing());
  drawExitBtn.addEventListener('click', closeDrawingToolbar);

  // --- ÇİZİM KAYDETME MODALI ---
  function openSaveModal() {
    drawModal.style.display = 'flex';
    drawSaveForm.reset();
    
    // Varsayılan olarak o anki aktif kategoriyi seç
    shapeCategoryInput.value = activeCategory || 'daglar';

    if (pendingDrawingData.shapeType === 'polyline') {
      shapeTypeInput.value = 'Akarsu / Vadi / Hat';
    } else if (pendingDrawingData.shapeType === 'polygon') {
      shapeTypeInput.value = 'Plato / Havza / Bölge';
    } else {
      if (activeCategory === 'daglar') shapeTypeInput.value = 'Volkanik Dağ / Sıra Dağ';
      else if (activeCategory === 'ovalar') shapeTypeInput.value = 'Tektonik Ova / Delta';
      else if (activeCategory === 'platolar') shapeTypeInput.value = 'Tabaka Düzlüğü Platosu';
      else if (activeCategory === 'gecitler') shapeTypeInput.value = 'Dağ Geçidi';
      else shapeTypeInput.value = 'Özel Yer Şekli';
    }

    shapeNameInput.focus();
  }

  function closeSaveModal() {
    drawModal.style.display = 'none';
    pendingDrawingData = null;
    if (currentMode === 'drawing') {
      setDrawShape(activeDrawShape);
    }
  }

  modalCloseBtn.addEventListener('click', closeSaveModal);
  modalCancelBtn.addEventListener('click', closeSaveModal);

  drawSaveForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!pendingDrawingData) return;

    const selectedColorInput = document.querySelector('input[name="shape-color"]:checked');
    const color = selectedColorInput ? selectedColorInput.value : '#8b5cf6';
    const targetCat = shapeCategoryInput.value || 'ozel_cizimler';

    const newItem = {
      name: shapeNameInput.value,
      category: targetCat,
      shapeType: pendingDrawingData.shapeType,
      coordinates: pendingDrawingData.coordinates,
      type: shapeTypeInput.value || 'Özel Konum',
      region: shapeRegionInput.value || 'Türkiye',
      kpssNot: shapeNoteInput.value || 'Özel eklenen yer şekli.',
      color: color
    };

    customDrawManager.addDrawing(newItem);
    geoQuiz.reloadCategoryItems();
    renderCategories();
    closeSaveModal();

    const catObj = CATEGORIES.find(c => c.id === targetCat) || { title: 'Özel Çizimlerim' };
    alert(`🎉 "${newItem.name}" başarıyla kaydedildi ve "${catObj.title}" konusuna eklendi!`);
  });

  // --- ÇİZİMLERİ YÖNETME & JSON İÇE/DIŞA AKTARMA MODALI ---
  function openManageModal() {
    drawManageModal.style.display = 'flex';
    renderDrawingsList();
  }

  function closeManageModal() {
    drawManageModal.style.display = 'none';
  }

  function renderDrawingsList() {
    drawingsListContainer.innerHTML = '';
    const drawings = customDrawManager.drawings;

    if (drawings.length === 0) {
      drawingsListContainer.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 20px 10px;">
          Henüz kayıtlı özel çizim bulunmuyor. Yukarıdaki kutucuğa JSON yapıştırabilir veya haritadan çizebilirsiniz.
        </div>
      `;
      return;
    }

    const catLabels = {
      daglar: '🏔️ Dağlar',
      ovalar: '🌾 Ovalar',
      platolar: '⛰️ Platolar',
      su_kaynaklari: '🌊 Akarsu/Göl',
      gecitler: '🚪 Geçitler',
      ozel_cizimler: '🎨 Özel'
    };

    drawings.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'drawing-list-item';

      let shapeIcon = '📍';
      if (item.shapeType === 'polyline') shapeIcon = '📏';
      if (item.shapeType === 'polygon') shapeIcon = '📐';

      const catBadge = catLabels[item.category] || '🎨 Özel';

      itemEl.innerHTML = `
        <div class="drawing-item-info">
          <div class="drawing-item-title">
            ${shapeIcon} ${item.name} 
            <span style="font-size: 0.72rem; background: rgba(139, 92, 246, 0.25); color: #c084fc; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">${catBadge}</span>
          </div>
          <div class="drawing-item-sub">${item.type} | ${item.region || ''}</div>
        </div>
        <button class="drawing-item-delete" data-id="${item.id}" title="Çizimi Sil">Sil</button>
      `;

      itemEl.querySelector('.drawing-item-delete').addEventListener('click', () => {
        if (confirm(`"${item.name}" çizimini silmek istediğinize emin misiniz?`)) {
          customDrawManager.deleteDrawing(item.id);
          geoQuiz.reloadCategoryItems();
          renderDrawingsList();
          renderCategories();
        }
      });

      drawingsListContainer.appendChild(itemEl);
    });
  }

  drawManageBtn.addEventListener('click', openManageModal);
  manageModalCloseBtn.addEventListener('click', closeManageModal);

  // Doğrudan JSON Yapıştırarak İçe Aktar
  importPastedJsonBtn.addEventListener('click', () => {
    const rawText = pasteJsonTextarea.value.trim();
    if (!rawText) {
      alert('Lütfen kutucuğa bir JSON metni yapıştırın!');
      return;
    }

    const result = customDrawManager.importJSON(rawText);
    if (result.success) {
      alert(`🎉 Tebrikler! ${result.count} adet yer şekli ve soru başarıyla içe aktarıldı!`);
      pasteJsonTextarea.value = '';
      renderDrawingsList();
      renderCategories();
      switchCategory('ozel_cizimler');
      closeManageModal();
    } else {
      alert(`❌ Geçersiz JSON Formatı! Lütfen NotebookLM prompt çıktısını eksiksiz kopyaladığınızdan emin olun.\nHata: ${result.error}`);
    }
  });

  // JSON Dışa Aktar (Dosya İndir)
  exportJsonBtn.addEventListener('click', () => {
    customDrawManager.exportJSON();
  });

  // JSON Dosyadan İçe Aktar
  importJsonInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = customDrawManager.importJSON(event.target.result);
      if (result.success) {
        alert(`✅ ${result.count} adet çizim başarıyla içe aktarıldı!`);
        renderDrawingsList();
        renderCategories();
        switchCategory('ozel_cizimler');
        closeManageModal();
      } else {
        alert(`❌ Hata: ${result.error}`);
      }
    };
    reader.readAsText(file);
    importJsonInput.value = '';
  });

  // Tümünü Temizle
  clearDrawingsBtn.addEventListener('click', () => {
    if (confirm('Tüm özel çizimlerinizi silmek istediğinize emin misiniz? Bu işlem geri alınamaz!')) {
      customDrawManager.clearAll();
      renderDrawingsList();
      renderCategories();
    }
  });

  // --- GENEL HARİTA BUTONLARI ---
  modeToggleBtn.addEventListener('click', toggleMode);
  nextBtn.addEventListener('click', () => {
    if (planSessionActive) {
      advancePlanSession();
    } else if (isExamActive) {
      examCurrentIndex++;
      loadExamQuestion();
    } else {
      loadNextQuestion();
    }
  });

  // --- DİLSİZ HARİTA (YAZISIZ MOD) BUTONU ---
  const toggleLabelsBtn = document.getElementById('toggle-labels-btn');
  const labelsBtnLabel = document.getElementById('labels-btn-label');

  function updateLabelsBtnUI() {
    if (!toggleLabelsBtn) return;
    const isLabelsOff = !geoMap.labelsEnabled;
    if (isLabelsOff) {
      toggleLabelsBtn.classList.add('active');
      toggleLabelsBtn.title = "Harita Dilsiz (Yazısız) Modda. Yazıları açmak için tıklayın.";
      if (labelsBtnLabel) labelsBtnLabel.textContent = "Dilsiz (Açık)";
    } else {
      toggleLabelsBtn.classList.remove('active');
      toggleLabelsBtn.title = "Haritadaki tüm şehir ve yer isimlerini gizlemek için tıklayın.";
      if (labelsBtnLabel) labelsBtnLabel.textContent = "Dilsiz Harita";
    }
  }

  if (toggleLabelsBtn) {
    updateLabelsBtnUI();
    toggleLabelsBtn.addEventListener('click', () => {
      geoMap.toggleLabels();
      updateLabelsBtnUI();
    });
  }

  resetViewBtn.addEventListener('click', () => {
    geoMap.resetView();
  });

  // --- 🎯 ODAK MODU (FOCUS / ZEN MODE) & PANEL KÜÇÜLTME ---
  const focusModeBtn = document.getElementById('focus-mode-btn');
  const focusExitBtn = document.getElementById('focus-exit-btn');
  const quizMinimizeBtn = document.getElementById('quiz-minimize-btn');
  const controlsToggleBtn = document.getElementById('controls-toggle-btn');
  const mapControlsLeft = document.getElementById('map-controls-left');

  let isFocusMode = false;

  function toggleFocusMode(enable) {
    isFocusMode = typeof enable === 'boolean' ? enable : !isFocusMode;
    if (isFocusMode) {
      document.body.classList.add('focus-mode');
      focusModeBtn.classList.add('active');
    } else {
      document.body.classList.remove('focus-mode');
      focusModeBtn.classList.remove('active');
    }
  }

  if (focusModeBtn) focusModeBtn.addEventListener('click', () => { closeToolsDropdown(); toggleFocusMode(); });
  if (focusExitBtn) focusExitBtn.addEventListener('click', () => toggleFocusMode(false));

  const quizExpandBtn = document.getElementById('quiz-expand-btn');

  if (quizMinimizeBtn) {
    quizMinimizeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      quizPanel.classList.add('minimized');
    });
  }

  if (quizExpandBtn) {
    quizExpandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      quizPanel.classList.remove('minimized');
    });
  }

  quizPanel.addEventListener('click', (e) => {
    if (quizPanel.classList.contains('minimized')) {
      quizPanel.classList.remove('minimized');
    }
  });

  if (controlsToggleBtn && mapControlsLeft) {
    controlsToggleBtn.addEventListener('click', () => {
      mapControlsLeft.classList.toggle('minimized');
      controlsToggleBtn.querySelector('span').textContent = mapControlsLeft.classList.contains('minimized') ? '▶' : '◀';
    });
  }

  // Harita Tıklama Dinleyicisi (Kör Atış / GeoGuessr Modu İçin)
  geoMap.map.on('click', (e) => {
    // 🎯 Koordinat Avcısı: paralel-meridyen ızgarasında hedefi tıklama
    if (activeMkKey === 'coord' && mkGames.coord.isActive) {
      mkRender(mkGames.coord.handleMapClick(e.latlng.lat, e.latlng.lng));
      return;
    }

    if (geoGuessrGame.isActive) {
      const res = geoGuessrGame.handleMapClick(e.latlng.lat, e.latlng.lng);
      if (res) {
        if (geoguessrDistBadge) geoguessrDistBadge.textContent = `${res.distanceKm} km sapma`;
        if (geoguessrPtsBadge) geoguessrPtsBadge.textContent = `+${res.score} Puan`;
        if (geoguessrScoreVal) geoguessrScoreVal.textContent = geoGuessrGame.totalScore;
        if (geoguessrFeedbackBox) geoguessrFeedbackBox.style.display = 'block';
      }
    }
  });

  // --- KLAVYE KISAYOLLARI (1-5 VE A-E SEÇİMİ, ENTER/SPACE İLE GEÇİŞ, ESC İLE ODAKTAN ÇIKIŞ) ---
  document.addEventListener('keydown', (e) => {
    // Herhangi bir modal aciksa tuslar arkadaki siklara gitmemeli.
    // (Eskiden conqueror ve speedrun modallari bu listede yoktu.)
    const anyModalOpen = Array.from(document.querySelectorAll('.modal-overlay'))
      .some(m => m.style.display === 'flex');
    if (anyModalOpen) return;

    if (e.key === 'Escape' && isFocusMode) {
      toggleFocusMode(false);
      return;
    }

    // Kör Atış modunda Space / Enter ile sonraki tur
    if ((e.key === ' ' || e.key === 'Enter') && geoGuessrGame.isActive && geoGuessrGame.hasGuessedThisRound) {
      e.preventDefault();
      if (geoguessrNextBtn) geoguessrNextBtn.click();
      return;
    }

    // 📐 Mutlak Konum modları: Boşluk/Enter ile ilerle, A-F veya 1-6 ile şık seç
    if (activeMkKey) {
      if (e.key === ' ' || e.key === 'Enter') {
        if (mkIsFeedbackOpen()) {
          e.preventDefault();
          mkNext();
        }
        return;
      }
      if (!mkIsFeedbackOpen() && mkOptionsEl) {
        const pressed = e.key.toUpperCase();
        let idx = -1;
        if (/^[1-6]$/.test(pressed)) idx = parseInt(pressed, 10) - 1;
        else if (MK_OPTION_LETTERS.indexOf(pressed) >= 0) idx = MK_OPTION_LETTERS.indexOf(pressed);

        const buttons = mkOptionsEl.querySelectorAll('.mk-option-btn');
        if (idx >= 0 && idx < buttons.length) {
          e.preventDefault();
          buttons[idx].click();
        }
      }
      return;
    }

    if (currentMode !== 'quiz' && currentMode !== 'conqueror') return;

    const key = e.key.toUpperCase();
    const numKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const letterKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    let selectedIndex = -1;

    if (key === '0') {
      selectedIndex = 9;
    } else if (numKeys.includes(key)) {
      selectedIndex = parseInt(key, 10) - 1;
    } else if (letterKeys.includes(key)) {
      selectedIndex = letterKeys.indexOf(key);
    }

    const optionButtons = optionsGrid.querySelectorAll('.option-btn');
    if (selectedIndex >= 0 && selectedIndex < optionButtons.length && !geoQuiz.isAnswered) {
      if (optionButtons[selectedIndex]) {
        optionButtons[selectedIndex].click();
      }
    }

    if ((e.key === ' ' || e.key === 'Enter') && geoQuiz.isAnswered) {
      e.preventDefault();
      if (planSessionActive) {
        advancePlanSession();
      } else if (isExamActive) {
        examCurrentIndex++;
        loadExamQuestion();
      } else {
        loadNextQuestion();
      }
    }
  });


  // ============================================================
  // 📅 BUGÜNÜN PLANI — EKRAN, OTURUM VE YANLIŞLAR HARİTASI
  // ============================================================
  const planScreen = document.getElementById('plan-screen');
  const planDateEl = document.getElementById('plan-date');
  const planTotalBadge = document.getElementById('plan-total-badge');
  const planPhasesEl = document.getElementById('plan-phases');
  const planRowsEl = document.getElementById('plan-rows');
  const planMissingEl = document.getElementById('plan-missing');
  const planResumeBar = document.getElementById('plan-resume-bar');
  const planResumeText = document.getElementById('plan-resume-text');
  const planMistakesCount = document.getElementById('plan-mistakes-count');

  const planHud = document.getElementById('plan-hud');
  const planHudPhase = document.getElementById('plan-hud-phase');
  const planHudTopic = document.getElementById('plan-hud-topic');
  const planHudCount = document.getElementById('plan-hud-count');
  const planHudScore = document.getElementById('plan-hud-score');
  const planHudFill = document.getElementById('plan-hud-fill');

  const mistakesPanel = document.getElementById('mistakes-panel');
  const mistakesSummaryEl = document.getElementById('mistakes-summary');
  const mistakesListEl = document.getElementById('mistakes-list');

  const planResultModal = document.getElementById('plan-result-modal');

  const PHASE_META = {
    yeni:   { icon: '🆕', label: 'Yeni' },
    tekrar: { icon: '🔁', label: 'Tekrar' },
    yanlis: { icon: '🔴', label: 'Yanlışlar' }
  };

  // ---------- Plan ekranı ----------
  function openPlanScreen(regenerate = false, includeWaiting = false) {
    exitAllGameModes();
    stopPlanSession();
    hideMistakesLayer();

    studyPlan.buildItemIndex();
    const plan = studyPlan.generate(regenerate || includeWaiting, includeWaiting);
    renderPlanScreen(plan);
    if (planScreen) planScreen.classList.remove('hidden');
  }

  function closePlanScreen() {
    if (planScreen) planScreen.classList.add('hidden');
  }

  function renderPlanScreen(plan) {
    const d = new Date();
    const aylar = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
    const gunler = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
    if (planDateEl) planDateEl.textContent = `${d.getDate()} ${aylar[d.getMonth()]} ${gunler[d.getDay()]}`;

    const toplam = plan.queue.length;
    if (planTotalBadge) planTotalBadge.textContent = `${toplam} soru`;

    // Faz kartları
    const fazSayilari = { yeni: 0, tekrar: 0, yanlis: 0 };
    plan.queue.forEach(q => { fazSayilari[q.phase] = (fazSayilari[q.phase] || 0) + 1; });
    if (planPhasesEl) {
      planPhasesEl.innerHTML = ['yeni', 'tekrar', 'yanlis'].map(k => `
        <div class="plan-phase ${k}">
          <span class="pp-icon">${PHASE_META[k].icon}</span>
          <span class="pp-val">${fazSayilari[k] || 0}</span>
          <span class="pp-lbl">${PHASE_META[k].label}</span>
        </div>
      `).join('');
    }

    // Konu satırları
    if (planRowsEl) {
      planRowsEl.innerHTML = plan.rows.map(row => {
        if (!row.hasData) {
          return `
            <div class="plan-row empty">
              <span class="plan-row-icon">${row.icon}</span>
              <span class="plan-row-label">${row.label}</span>
              <span class="plan-row-note">veri yok — bu konu pakete eklenemedi</span>
              <span class="plan-row-count">0</span>
            </div>`;
        }
        const t = Math.max(1, row.planned);
        const seg = (k) => `<i class="${k}" style="width:${(row.counts[k] / t) * 100}%"></i>`;

        // Kota dolmadiysa sebebini yaz: havuz mu kucuk, yoksa tekrar sirasi mi gelmemis?
        let not = '';
        if (row.planned < row.quota) {
          if (row.waiting > 0) {
            not = `<span class="plan-row-note">${row.waiting} tanesi tekrar sırasını bekliyor</span>`;
          } else if (row.available < row.quota) {
            not = `<span class="plan-row-note">havuzda ${row.available} var</span>`;
          }
        }
        return `
          <div class="plan-row${row.planned === 0 ? ' empty' : ''}">
            <span class="plan-row-icon">${row.icon}</span>
            <span class="plan-row-label">${row.label}</span>
            <span class="plan-row-bar">${seg('yeni')}${seg('tekrar')}${seg('yanlis')}</span>
            ${not}
            <span class="plan-row-count">${row.planned}</span>
          </div>`;
      }).join('');
    }

    // Bilgi kutusu: verisi olmayan konular + bekleyenler
    const eksikler = plan.rows.filter(r => !r.hasData).map(r => r.label);
    const bekleyen = plan.rows.reduce((t, r) => t + (r.waiting || 0), 0);
    const notlar = [];
    if (eksikler.length) {
      notlar.push(`⚠️ <strong>${eksikler.join(', ')}</strong> konuları için veri setinde henüz kayıt yok, bu yüzden pakete giremediler. Veri eklenince plan bu satırları kendiliğinden doldurur.`);
    }
    if (bekleyen > 0 && !plan.includeWaiting) {
      notlar.push(`⏳ <strong>${bekleyen} yer şekli</strong> tekrar sırasını bekliyor — yakın zamanda doğru bildiğin için bugün getirilmedi. <button id="plan-force-waiting" class="plan-btn ghost small" style="margin-left:6px;">Yine de ekle</button>`);
    }
    if (planMissingEl) {
      planMissingEl.style.display = notlar.length ? 'block' : 'none';
      planMissingEl.innerHTML = notlar.join('<br><br>');
      const forceBtn = document.getElementById('plan-force-waiting');
      if (forceBtn) forceBtn.addEventListener('click', () => openPlanScreen(true, true));
    }

    // Paket bosalirsa kullanici cikmaza dusmesin
    const startBtn = document.getElementById('plan-start-btn');
    if (startBtn) {
      startBtn.disabled = plan.queue.length === 0;
      startBtn.textContent = plan.queue.length === 0 ? '✅ Bugün için her şey güncel' : '▶ Çalışmaya Başla';
      startBtn.style.opacity = plan.queue.length === 0 ? '0.6' : '';
    }

    // Yarım kalan oturum
    const durum = studyPlan.status();
    if (planResumeBar) {
      if (durum === 'devam') {
        const pr = studyPlan.progress();
        planResumeBar.style.display = 'flex';
        planResumeText.textContent = `Yarım kalan oturum: ${pr.done}/${pr.total} soru bitti (%${pr.percent}).`;
      } else if (durum === 'bitti') {
        planResumeBar.style.display = 'flex';
        planResumeText.textContent = `Bugünkü paketi tamamladın 🎉 (✓ ${plan.correct} · ✗ ${plan.wrong})`;
      } else {
        planResumeBar.style.display = 'none';
      }
    }

    const ozet = studyPlan.mistakeSummary();
    if (planMistakesCount) planMistakesCount.textContent = ozet.total;
  }

  // ---------- Oturum akışı ----------
  function startPlanSession(resume = false) {
    exitAllGameModes();
    closePlanScreen();
    hideMistakesLayer();

    if (!resume) {
      studyPlan.plan.index = 0;
      studyPlan.plan.correct = 0;
      studyPlan.plan.wrong = 0;
      studyPlan.plan.sessionWrongIds = [];
      studyPlan.plan.finished = false;
      studyPlan.save();
    }

    studyPlan.skipMissing();
    if (!studyPlan.current()) { finishPlanSession(); return; }

    planSessionActive = true;
    currentMode = 'quiz';
    syncModeToggleLabel();
    document.body.classList.remove('game-mode-active');
    hideAllGameHuds();
    if (planHud) planHud.style.display = 'flex';
    if (quizPanel) quizPanel.classList.remove('minimized');

    loadPlanQuestion();
  }

  function stopPlanSession() {
    planSessionActive = false;
    if (planHud) planHud.style.display = 'none';
  }

  /** Plandaki SIRADAKİ soruyu yükler (deneme modundaki akışın aynısı) */
  function loadPlanQuestion() {
    const entry = studyPlan.current();
    if (!entry) { finishPlanSession(); return; }

    const qItem = entry.item;
    geoQuiz.currentQuestion = qItem;
    geoQuiz.isAnswered = false;

    // Çeldiriciler: mümkünse aynı konudan, yetmezse tüm havuzdan
    const sameCat = (COGRAFYA_DATA[qItem.category] || []).filter(i => i.id !== qItem.id);
    let candidatePool = sameCat;
    const wanted = geoQuiz.getOptionCount();
    const need = wanted === 'all' ? 9 : Math.max(1, parseInt(wanted, 10) - 1);
    if (candidatePool.length < need) {
      const global = [];
      Object.keys(COGRAFYA_DATA).forEach(c => global.push(...COGRAFYA_DATA[c]));
      candidatePool = candidatePool.concat(
        global.filter(i => i.id !== qItem.id && !candidatePool.some(c => c.id === i.id))
      );
    }

    let options;
    if (wanted === 'all') {
      options = [qItem, ...candidatePool].sort(() => 0.5 - Math.random());
    } else {
      const distractors = geoQuiz.selectDistractorsByProximity(qItem, candidatePool, need);
      options = [qItem, ...distractors].sort(() => 0.5 - Math.random());
    }
    geoQuiz.currentOptions = options;

    const fmt = geoQuiz.getQuizFormat();
    const actualFormat = fmt === 'mixed' ? (Math.random() > 0.5 ? 'find_on_map' : 'identify') : fmt;
    geoQuiz.currentActualFormat = actualFormat;

    let questionText;
    if (actualFormat === 'find_on_map') {
      questionText = `📍 <span style="color: #7dd3fc; font-weight:800;">${qItem.name}</span> <span style="font-size: 0.85rem; color: #94a3b8; font-weight:600;">(${qItem.type})</span>`;
    } else if (qItem.shapeType === 'polyline') {
      questionText = 'İşaretli Akarsu / Hat Nedir?';
    } else if (qItem.shapeType === 'polygon') {
      questionText = 'İşaretli Alan / Plato Nedir?';
    } else {
      questionText = 'İşaretli Yer Şekli Nedir?';
    }

    const a = geoQuiz.analytics[qItem.id] || { wrongCount: 0, correctCount: 0, streak: 0 };
    renderQuestion({
      question: qItem,
      options,
      questionText,
      questionTypeTitle: `${PHASE_META[entry.phase].label.toUpperCase()}`,
      categoryBadgeText: `${entry.icon} ${entry.topic} — ${PHASE_META[entry.phase].icon} ${PHASE_META[entry.phase].label}`,
      actualFormat,
      isProblematic: a.wrongCount >= 2 && a.wrongCount > a.correctCount,
      isMastered: (a.streak || 0) >= 3,
      wrongCount: a.wrongCount || 0,
      correctCount: a.correctCount || 0,
      streak: a.streak || 0,
      difficultyLevel: geoQuiz.getDifficultyLevel()
    });

    updatePlanHud();
  }

  function advancePlanSession() {
    const next = studyPlan.advance();
    if (!next) { finishPlanSession(); return; }
    loadPlanQuestion();
  }

  function updatePlanHud() {
    if (!studyPlan.plan) return;
    const pr = studyPlan.progress();
    const entry = studyPlan.current();
    const phase = entry ? entry.phase : 'yanlis';

    if (planHudPhase) {
      planHudPhase.className = `plan-phase-chip ${phase}`;
      planHudPhase.textContent = `${PHASE_META[phase].icon} ${PHASE_META[phase].label}`;
    }
    if (planHudTopic) planHudTopic.textContent = entry ? `${entry.icon} ${entry.topic}` : '';
    if (planHudCount) planHudCount.textContent = `${Math.min(pr.done + 1, pr.total)} / ${pr.total}`;
    if (planHudScore) planHudScore.textContent = `✓ ${studyPlan.plan.correct} · ✗ ${studyPlan.plan.wrong}`;
    if (planHudFill) planHudFill.style.width = `${pr.percent}%`;
  }

  function finishPlanSession() {
    const plan = studyPlan.plan;
    stopPlanSession();
    if (!plan) { openPlanScreen(); return; }

    plan.finished = true;
    studyPlan.save();

    const toplam = plan.correct + plan.wrong;
    const oran = toplam ? Math.round((plan.correct / toplam) * 100) : 0;

    document.getElementById('plan-res-correct').textContent = plan.correct;
    document.getElementById('plan-res-wrong').textContent = plan.wrong;
    document.getElementById('plan-res-rate').textContent = `%${oran}`;
    document.getElementById('plan-res-title').textContent =
      plan.adHoc ? `${plan.adHocLabel} Tamamlandı!` : 'Bugünkü Paket Tamamlandı!';
    document.getElementById('plan-res-badge').textContent = oran >= 85 ? '🏆' : oran >= 60 ? '🎉' : '💪';
    document.getElementById('plan-res-sub').textContent =
      plan.adHoc ? 'Sonuçların analitiğe işlendi.' : 'Yeni → Tekrar → Yanlışlar zinciri tamamlandı.';

    // Zincir: bu oturumun yanlışları + geçmiş yanlışlar
    const zincirBtn = document.getElementById('plan-res-mistakes-btn');
    const zincir = studyPlan.buildMistakeQueue();
    const buOturum = plan.sessionWrongIds.length;
    const chainEl = document.getElementById('plan-res-chain');
    if (chainEl) {
      chainEl.innerHTML = zincir.length
        ? `🔴 <strong>Yanlışlar Testi</strong> hazır: bu oturumda yanlış yaptığın <strong>${buOturum}</strong> soru ile geçmiş testlerden biriken hatalar birleştirildi — toplam <strong>${zincir.length}</strong> soru.`
        : '✨ Bekleyen yanlışın yok. Temiz sayfa!';
    }
    if (zincirBtn) zincirBtn.style.display = zincir.length ? 'inline-flex' : 'none';

    if (planResultModal) planResultModal.style.display = 'flex';
  }

  // ---------- 🔴 Yanlışlarım ----------
  function severityLabel(sev) {
    return { kritik: 'Kritik', orta: 'Orta', hafif: 'Hafif', iyilesen: 'Düzeliyor' }[sev] || sev;
  }

  function showMistakesLayer() {
    exitAllGameModes();
    stopPlanSession();
    closePlanScreen();

    mistakesLayerVisible = true;
    currentMode = 'quiz';
    document.body.classList.remove('game-mode-active');
    hideAllGameHuds();

    geoMap.clearAll();
    mistakesLayerGroup.clearLayers();
    if (!geoMap.map.hasLayer(mistakesLayerGroup)) mistakesLayerGroup.addTo(geoMap.map);

    const sessionWrong = (studyPlan.plan && studyPlan.plan.sessionWrongIds) || [];
    const list = studyPlan.mistakes(sessionWrong);
    const ozet = studyPlan.mistakeSummary(sessionWrong);

    // Harita pinleri
    const coords = [];
    list.forEach(m => {
      const it = m.item;
      if (typeof it.lat !== 'number' || typeof it.lng !== 'number') return;
      coords.push([it.lat, it.lng]);

      const boyut = m.severity === 'kritik' ? 20 : m.severity === 'orta' ? 17 : 14;
      const marker = L.marker([it.lat, it.lng], {
        icon: L.divIcon({
          className: 'mistake-pin',
          html: `<div class="mp-dot ${m.severity}"></div>`,
          iconSize: [boyut, boyut],
          iconAnchor: [boyut / 2, boyut / 2]
        })
      });
      marker.bindTooltip(
        `${m.severity === 'iyilesen' ? '🟢' : m.severity === 'kritik' ? '🔴' : m.severity === 'orta' ? '🟠' : '🟡'} <strong>${it.name}</strong><br>${m.wrongCount} yanlış · ${m.correctCount} doğru`,
        { direction: 'top' }
      );
      marker.bindPopup(`
        <div class="popup-title">${it.name}</div>
        <div class="popup-type">${it.type || ''} (${it.region || ''})</div>
        <div class="popup-text">${it.kpssNot || ''}</div>
      `, { maxWidth: 280 });

      // Çizgisel şekillerde hattı da göster
      if (it.shapeType === 'polyline' && Array.isArray(it.coordinates) && Array.isArray(it.coordinates[0])) {
        mistakesLayerGroup.addLayer(L.polyline(it.coordinates, {
          color: m.severity === 'kritik' ? '#ef4444' : m.severity === 'orta' ? '#f97316' : '#facc15',
          weight: 4, opacity: 0.75, dashArray: '6, 6'
        }));
        it.coordinates.forEach(c => coords.push(c));
      }
      mistakesLayerGroup.addLayer(marker);
    });

    if (coords.length) geoMap.flyToBoundsSafely(L.latLngBounds(coords).pad(0.25));
    else geoMap.resetView();

    // Panel
    if (mistakesSummaryEl) {
      mistakesSummaryEl.innerHTML = `
        <span>Toplam ${ozet.total}</span>
        <span style="color:#fca5a5">🔴 ${ozet.kritik}</span>
        <span style="color:#fdba74">🟠 ${ozet.orta}</span>
        <span style="color:#fde047">🟡 ${ozet.hafif}</span>
        <span style="color:#86efac">🟢 ${ozet.iyilesen}</span>`;
    }

    if (mistakesListEl) {
      mistakesListEl.innerHTML = '';
      if (!list.length) {
        mistakesListEl.innerHTML = '<div class="mistakes-empty">Henüz yanlışın yok 🎉<br>Test çözdükçe buraya birikir.</div>';
      } else {
        list.forEach(m => {
          const btn = document.createElement('button');
          btn.className = `mistake-item ${m.severity}`;
          btn.innerHTML = `
            <span class="mistake-name">${m.item.name}</span>
            <span class="mistake-meta">${m.wrongCount}✗ / ${m.correctCount}✓</span>`;
          btn.title = `${severityLabel(m.severity)} · ${m.item.type || ''}`;
          btn.addEventListener('click', () => {
            if (typeof m.item.lat === 'number') {
              geoMap.flySafely([m.item.lat, m.item.lng], Math.max(geoMap.map.getZoom(), 8));
            }
          });
          mistakesListEl.appendChild(btn);
        });
      }
    }

    const testBtn = document.getElementById('mistakes-test-btn');
    if (testBtn) testBtn.style.display = list.length ? 'inline-flex' : 'none';

    if (mistakesPanel) mistakesPanel.style.display = 'flex';
  }

  function hideMistakesLayer() {
    mistakesLayerVisible = false;
    mistakesLayerGroup.clearLayers();
    if (mistakesPanel) mistakesPanel.style.display = 'none';
  }

  // ---------- Ad-hoc oturumlar ----------
  function startMistakeTest() {
    const queue = studyPlan.buildMistakeQueue();
    if (!queue.length) {
      alert('Tekrar edilecek yanlışın yok 🎉');
      return;
    }
    hideMistakesLayer();
    if (planResultModal) planResultModal.style.display = 'none';
    studyPlan.startAdHocSession(queue, 'Yanlışlar Testi');
    startPlanSession(true);
  }

  function startGeneralReview() {
    const queue = studyPlan.buildGeneralReviewQueue();
    if (!queue.length) {
      alert('Genel tekrar için önce biraz soru çözmelisin.');
      return;
    }
    studyPlan.startAdHocSession(queue, 'Genel Tekrar');
    startPlanSession(true);
  }

  // ---------- Olay bağlantıları ----------
  const bind = (id, fn, evt = 'click') => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(evt, fn);
  };

  bind('plan-start-btn', () => {
    if (studyPlan.status() === 'devam') startPlanSession(true);
    else startPlanSession(false);
  });
  bind('plan-resume-btn', () => startPlanSession(true));
  bind('plan-regen-btn', () => openPlanScreen(true));
  bind('plan-mistakes-btn', showMistakesLayer);
  bind('plan-review-btn', startGeneralReview);
  bind('plan-free-btn', () => { closePlanScreen(); stopPlanSession(); loadNextQuestion(); });
  bind('back-to-plan-btn', () => openPlanScreen(false));
  bind('plan-hud-exit', () => openPlanScreen(false));
  bind('mistakes-close-btn', hideMistakesLayer);
  bind('mistakes-test-btn', startMistakeTest);
  bind('mistakes-clear-btn', () => {
    if (!confirm('Tüm hata geçmişin silinecek. Bu, aralıklı tekrar sıralamanı da sıfırlar. Emin misin?')) return;
    geoQuiz.analytics = {};
    geoQuiz.saveAnalytics();
    showMistakesLayer();
  });
  bind('plan-res-close-btn', () => {
    if (planResultModal) planResultModal.style.display = 'none';
    openPlanScreen(false);
  });
  bind('plan-res-mistakes-btn', () => {
    if (planResultModal) planResultModal.style.display = 'none';
    startMistakeTest();
  });

  // Başlangıç Yüklemesi
  renderCategories();
  loadNextQuestion();
  updateStatsUI();
  openPlanScreen();   // Uygulama doğrudan "Bugünün Planı" ile açılır
});
