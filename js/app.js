/**
 * Ana Uygulama Yöneticisi (App Controller)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Harita ve Quiz başlatma
  const geoMap = new GeographyMap('map');
  const geoQuiz = new GeographyQuiz('daglar');

  // DOM Elemanları
  const categoriesContainer = document.getElementById('categories-container');
  const modeToggleBtn = document.getElementById('mode-toggle-btn');
  const mapLayerBtn = document.getElementById('map-layer-btn');
  const resetViewBtn = document.getElementById('reset-view-btn');

  // Quiz Paneli Elemanları
  const quizPanel = document.getElementById('quiz-panel');
  const exploreBanner = document.getElementById('explore-banner');
  const questionBadge = document.getElementById('question-badge');
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

  let currentMode = 'quiz'; // 'quiz' veya 'explore'
  let activeCategory = 'daglar';

  // Kategori Butonlarını Oluştur
  function renderCategories() {
    categoriesContainer.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `category-btn ${cat.id === activeCategory ? 'active' : ''}`;
      btn.dataset.category = cat.id;
      btn.innerHTML = `<span>${cat.icon}</span> <span>${cat.title}</span>`;
      btn.addEventListener('click', () => switchCategory(cat.id));
      categoriesContainer.appendChild(btn);
    });
  }

  // Kategori Değiştir
  function switchCategory(categoryKey) {
    activeCategory = categoryKey;
    geoQuiz.setCategory(categoryKey);

    // Kategori butonlarını güncelle
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === categoryKey);
    });

    if (currentMode === 'quiz') {
      loadNextQuestion();
    } else {
      loadExploreMode();
    }
  }

  // Mod Değiştir (Test / Keşif)
  function toggleMode() {
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

  // Keşif Modunu Yükle
  function loadExploreMode() {
    const items = COGRAFYA_DATA[activeCategory] || [];
    const catObj = CATEGORIES.find(c => c.id === activeCategory);
    geoMap.showAllPoints(items, catObj ? catObj.color : '#3b82f6');

    // Paneli Keşif görünümüne uyarla
    document.querySelector('.question-header').style.display = 'none';
    optionsGrid.style.display = 'none';
    kpssInfoCard.style.display = 'none';
    nextBtn.style.display = 'none';
    exploreBanner.style.display = 'block';
    exploreBanner.innerHTML = `
      <strong>🧭 Keşif Modu Aktif:</strong><br>
      Harita üzerindeki noktalara tıklayarak <strong>${catObj ? catObj.title : ''}</strong> konusundaki tüm yer şekillerini ve KPSS hap bilgilerini inceleyebilirsiniz.
    `;
  }

  // Sonraki Soruyu Yükle (Quiz Modu)
  function loadNextQuestion() {
    exploreBanner.style.display = 'none';
    document.querySelector('.question-header').style.display = 'flex';
    optionsGrid.style.display = 'flex';
    kpssInfoCard.style.display = 'none';
    nextBtn.style.display = 'none';

    const qData = geoQuiz.nextQuestion();
    if (!qData) return;

    const catObj = CATEGORIES.find(c => c.id === activeCategory);
    questionBadge.textContent = `${catObj ? catObj.icon + ' ' + catObj.title : 'SORU'} - [KONUM SORUSU]`;
    questionTitle.textContent = `Haritada işaretli ${catObj ? catObj.title.slice(0, -3).toLowerCase() : 'yer şekli'} hangisidir?`;

    // Haritada konuma odaklan ve işaretle
    geoMap.highlightQuestionLocation(qData.question.lat, qData.question.lng);

    // Şıkları render et
    optionsGrid.innerHTML = '';
    qData.options.forEach((opt, index) => {
      const optBtn = document.createElement('button');
      optBtn.className = 'option-btn';
      optBtn.dataset.id = opt.id;
      optBtn.innerHTML = `
        <span class="option-key">${index + 1}</span>
        <span class="option-name">${opt.name}</span>
      `;
      optBtn.addEventListener('click', () => handleAnswer(opt.id));
      optionsGrid.appendChild(optBtn);
    });

    updateStatsUI();
  }

  // Cevap Verildiğinde
  function handleAnswer(selectedId) {
    if (geoQuiz.isAnswered) return;

    const result = geoQuiz.checkAnswer(selectedId);
    if (!result) return;

    // Şık butonlarını güncelle
    const optionButtons = optionsGrid.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.id === result.correctId) {
        btn.classList.add('correct');
      } else if (btn.dataset.id === result.selectedId && !result.isCorrect) {
        btn.classList.add('wrong');
      }
    });

    // KPSS Hap Bilgisini Göster
    kpssInfoCard.style.display = 'block';
    kpssInfoTitle.textContent = result.name;
    kpssInfoType.textContent = `${result.type} (${result.region || ''})`;
    kpssInfoText.textContent = result.kpssNot;

    // Sonraki Soru butonunu aç
    nextBtn.style.display = 'block';
    nextBtn.focus();

    updateStatsUI();
  }

  // İstatistik Panelini Güncelle
  function updateStatsUI() {
    statCorrect.textContent = geoQuiz.stats.correct;
    statWrong.textContent = geoQuiz.stats.wrong;
    statStreak.textContent = geoQuiz.stats.streak > 0 ? `🔥 ${geoQuiz.stats.streak}` : '0';
    statRate.textContent = `%${geoQuiz.getSuccessRate()}`;
  }

  // Olay Dinleyicileri
  modeToggleBtn.addEventListener('click', toggleMode);
  nextBtn.addEventListener('click', loadNextQuestion);

  mapLayerBtn.addEventListener('click', () => {
    const layerName = geoMap.toggleMapLayer();
    mapLayerBtn.innerHTML = `<span>🗺️</span> <span>${layerName}</span>`;
  });

  resetViewBtn.addEventListener('click', () => {
    geoMap.resetView();
  });

  // Klavye Kısayolları (1, 2, 3, 4 ile şık seçme, Space / Enter ile sonraki soru)
  document.addEventListener('keydown', (e) => {
    if (currentMode !== 'quiz') return;

    const key = e.key;

    // 1-4 arası sayılarla şık seçme
    if (['1', '2', '3', '4'].includes(key) && !geoQuiz.isAnswered) {
      const index = parseInt(key, 10) - 1;
      const optionButtons = optionsGrid.querySelectorAll('.option-btn');
      if (optionButtons[index]) {
        optionButtons[index].click();
      }
    }

    // Space veya Enter ile sonraki soruya geçiş
    if ((key === ' ' || key === 'Enter') && geoQuiz.isAnswered) {
      e.preventDefault();
      loadNextQuestion();
    }
  });

  // Başlangıç Yüklemesi
  renderCategories();
  loadNextQuestion();
  updateStatsUI();
});
