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

  // Uygulama Durumu
  let currentMode = 'quiz'; // 'quiz', 'explore', 'drawing'
  let activeCategory = 'daglar';
  let activeDrawShape = 'point';
  let pendingDrawingData = null;

  // ⚡ Şimşek Turu Durum Değişkenleri
  let isSpeedrunActive = false;
  let speedrunInterval = null;
  let speedrunSeconds = 60;
  let speedrunScore = 0;
  let speedrunStats = { correct: 0, wrong: 0, bestStreak: 0, currentStreak: 0 };

  const subCategoriesBar = document.getElementById('sub-categories-bar');

  // --- KATEGORİ VE ALT OLUŞUM MENÜSÜ ---
  function renderCategories() {
    categoriesContainer.innerHTML = '';

    const allCategories = [
      ...CATEGORIES,
      {
        id: 'ozel_cizimler',
        title: `Çizimlerim (${customDrawManager.drawings.length})`,
        icon: '🎨',
        color: '#8b5cf6',
        isCustom: true
      }
    ];

    allCategories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `category-btn ${cat.isCustom ? 'custom-category-btn' : ''} ${cat.id === activeCategory ? 'active' : ''}`;
      btn.dataset.category = cat.id;
      btn.innerHTML = `<span>${cat.icon}</span> <span>${cat.title}</span>`;
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
  function toggleMode() {
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
    exploreBanner.style.display = 'none';
    document.querySelector('.question-header').style.display = 'flex';
    optionsGrid.style.display = 'flex';
    kpssInfoCard.style.display = 'none';
    nextBtn.style.display = 'none';

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

    questionBadge.textContent = `${catIcon} ${catName} - [${qData.questionTypeTitle}]`;
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
    if (qData.options.length > 8 || geoQuiz.getOptionCount() === 'all') {
      optionsGrid.classList.add('celal-all-grid');
    } else {
      optionsGrid.classList.remove('celal-all-grid');
    }
    const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

    if (qData.actualFormat === 'find_on_map') {
      // YENİ ÖSYM HARİTADA BUL MODU (I-VIII çoklu harita pini)
      geoMap.showMultipleChoiceLocations(qData.options, (selectedId) => {
        handleAnswer(selectedId);
      });

      qData.options.forEach((opt, index) => {
        const optBtn = document.createElement('button');
        optBtn.className = 'option-btn';
        optBtn.dataset.id = opt.id;
        optBtn.dataset.index = index;

        const letter = optionLetters[index] || `${index + 1}`;
        const roman = romanNumerals[index] || `${index + 1}`;

        optBtn.innerHTML = `
          <span class="option-key">${letter}</span>
          <span class="option-name"><strong>${roman}. Konum</strong> (${letter} Pini)</span>
        `;
        optBtn.addEventListener('click', () => handleAnswer(opt.id));
        optionsGrid.appendChild(optBtn);
      });
    } else {
      // KLASİK MOD (Haritada tek konum parlar, isim seçilir)
      geoMap.highlightQuestionShape(qData.question);

      qData.options.forEach((opt, index) => {
        const optBtn = document.createElement('button');
        optBtn.className = 'option-btn';
        optBtn.dataset.id = opt.id;
        optBtn.dataset.index = index;

        const keyLabel = optionLetters[index] || (index + 1);

        // Celal Şengör seviyesinde tür bilgisini de şıkta göster
        const typeInfo = (qData.difficultyLevel === 6 && opt.type) 
          ? `<span style="font-size:0.75rem; color:#94a3b8; margin-left:4px;">(${opt.type})</span>` 
          : '';

        optBtn.innerHTML = `
          <span class="option-key">${keyLabel}</span>
          <span class="option-name">${opt.name}${typeInfo}</span>
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

    // Harita üzerindeki çoklu pinleri renklendir
    if (result.actualFormat === 'find_on_map') {
      geoMap.highlightMultiChoiceAnswer(result.correctId, result.selectedId);
    }

    // Şimşek Turu (Speedrun) Aktifse
    if (isSpeedrunActive) {
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
      nextBtn.focus();
    }

    updateStatsUI();
  }

  // --- ⚡ ŞİMŞEK TURU (SPEEDRUN) MOTORU ---
  function startSpeedrun() {
    if (currentMode === 'drawing') closeDrawingToolbar();
    if (currentMode === 'explore') setMode('quiz');

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

  function endSpeedrun() {
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

    speedrunModal.style.display = 'flex';
  }

  speedrunBtn.addEventListener('click', () => {
    if (isSpeedrunActive) {
      endSpeedrun();
    } else {
      startSpeedrun();
    }
  });

  speedrunAbortBtn.addEventListener('click', endSpeedrun);
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

  // --- SORU FORMATI YÖNETİMİ (KLASİK / HARİTADA BUL / KARIŞIK) ---
  formatToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = formatDropdown.style.display === 'flex';
    formatDropdown.style.display = isVisible ? 'none' : 'flex';
  });

  formatOptionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const format = btn.dataset.format;
      geoQuiz.setQuizFormat(format);

      formatOptionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (format === 'find_on_map') {
        formatLabel.textContent = 'Haritada Bul (I-V)';
      } else if (format === 'identify') {
        formatLabel.textContent = 'Konumdan İsim Bul';
      } else {
        formatLabel.textContent = 'Karışık Sürpriz Modu';
      }

      formatDropdown.style.display = 'none';

      if (currentMode === 'quiz') {
        loadNextQuestion();
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!formatDropdown.contains(e.target) && e.target !== formatToggleBtn) {
      formatDropdown.style.display = 'none';
    }
  });

  const initialFormat = geoQuiz.getQuizFormat();
  formatOptionBtns.forEach(b => {
    b.classList.toggle('active', b.dataset.format === initialFormat);
  });
  if (initialFormat === 'find_on_map') formatLabel.textContent = 'Haritada Bul (I-V)';
  else if (initialFormat === 'identify') formatLabel.textContent = 'Konumdan İsim Bul';
  else formatLabel.textContent = 'Karışık Sürpriz Modu';

  // --- DİNAMİK ŞIK SAYISI YÖNETİMİ ---
  optCountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      optCountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const countVal = btn.dataset.count === 'all' ? 'all' : parseInt(btn.dataset.count, 10);
      geoQuiz.setOptionCount(countVal);
      
      if (currentMode === 'quiz') {
        loadNextQuestion();
      }
    });
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
  nextBtn.addEventListener('click', loadNextQuestion);

  resetViewBtn.addEventListener('click', () => {
    geoMap.resetView();
  });

  // --- KLAVYE KISAYOLLARI (1-5 VE A-E SEÇİMİ, ENTER/SPACE İLE GEÇİŞ) ---
  document.addEventListener('keydown', (e) => {
    if (drawModal.style.display === 'flex' || drawManageModal.style.display === 'flex') return;
    if (currentMode !== 'quiz') return;

    const key = e.key.toUpperCase();
    const numKeys = ['1', '2', '3', '4', '5'];
    const letterKeys = ['A', 'B', 'C', 'D', 'E'];

    let selectedIndex = -1;

    if (numKeys.includes(key)) {
      selectedIndex = parseInt(key, 10) - 1;
    } else if (letterKeys.includes(key)) {
      selectedIndex = letterKeys.indexOf(key);
    }

    if (selectedIndex >= 0 && selectedIndex < geoQuiz.getOptionCount() && !geoQuiz.isAnswered) {
      const optionButtons = optionsGrid.querySelectorAll('.option-btn');
      if (optionButtons[selectedIndex]) {
        optionButtons[selectedIndex].click();
      }
    }

    if ((e.key === ' ' || e.key === 'Enter') && geoQuiz.isAnswered) {
      e.preventDefault();
      loadNextQuestion();
    }
  });

  // Başlangıç Yüklemesi
  renderCategories();
  loadNextQuestion();
  updateStatsUI();
});
