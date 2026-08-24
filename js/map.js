/**
 * Leaflet Harita Yönetimi ve Geometrik Çizim Motoru
 * Desteklenen geometriler: Nokta (Point), Çizgi/Hat (Polyline), Alan/Çokgen (Polygon)
 * Desteklenen Quiz Modları: Tek Konum Vurgulama & Çoklu Seçenek (I, II, III, IV, V / A, B, C, D, E) Harita İşaretçileri
 */

/**
 * 🎨 KONU KATEGORİSİ GÖRSEL SÖZLÜĞÜ
 *
 * Dağ / ova / plato / geçit için elle modellenmiş 3B ikonlar var; geri kalan
 * tüm konu kategorileri buradaki emoji rozetini ve rengi kullanır.
 * Yeni bir paket kategorisi eklendiğinde tek yapılacak buraya bir satır yazmaktır.
 */
const TOPIC_CATEGORY_ICON = {
  tarim: '🚜', hayvancilik: '🐑', sanayi: '🏭', iklim: '🌡️', orman: '🌲',
  toprak: '🟫', afet: '⚠️', fay: '💥', madenler: '⛏️', nufus: '👥',
  bolgeler: '🗺️', kiyilar: '🏖️', dis_kuvvetler: '🌬️', turizm: '🏛️', ulasim: '🚢'
};

/** Kategori rengi: çokgen/çizgi dolgusu ve rozet arka planı bu tablodan gelir */
const TOPIC_CATEGORY_COLOR = {
  tarim: '#84cc16', hayvancilik: '#10b981', sanayi: '#a855f7', iklim: '#06b6d4',
  orman: '#16a34a', toprak: '#a16207', afet: '#dc2626', fay: '#f97316',
  madenler: '#78716c', nufus: '#0ea5e9', bolgeler: '#7c3aed', kiyilar: '#06b6d4',
  dis_kuvvetler: '#14b8a6', turizm: '#eab308', ulasim: '#3b82f6',
  platolar: '#f59e0b', ovalar: '#22c55e', daglar: '#d97706', su_kaynaklari: '#2563eb'
};

/**
 * Alt tür bazında daha isabetli emoji. Anahtarlar paketlerdeki DİLDEN BAĞIMSIZ
 * `sub` kimlikleridir; bu yüzden veri İngilizceye çevrildiğinde de çalışır.
 * Yalnızca TOPIC_CATEGORY_ICON'da yer alan kategoriler için sorgulanır, bu
 * nedenle farklı kategorilerdeki aynı adlı alt türler birbirine karışmaz.
 */
const TOPIC_SUB_ICON = {
  // Doğal afetler
  deprem: '🏚️', kutle: '⛰️', su_afet: '🌊', erozyon: '🕳️', yangin: '🔥', kuraklik: '🏜️',
  // Fay & tektonik
  fay_hatti: '⚡', graben: '🕳️', levha: '🌍', deprem_bolge: '🏚️',
  // Madenler & enerji
  metal: '🔩', enerji_ham: '🛢️', endustriyel: '🧱', enerji_tesis: '⚡',
  // Nüfus & yerleşme
  yogun: '🏙️', seyrek: '🏔️', goc: '🧳', yerlesme: '🏘️',
  // Kıyılar
  yarimada: '🗿', korfez: '🌊', burun: '📌', ada: '🏝️', deniz: '🌐', kiyi_tipi: '〰️',
  // Dış kuvvetler
  karstik_dk: '💧', buzul_dk: '❄️', ruzgar_dk: '🌪️', akarsu_dk: '🏞️', dalga_dk: '🏖️',
  // Turizm
  unesco: '🏅', tarihi: '🏺', kis_tur: '⛷️', termal_tur: '♨️', kiyi_doga: '🌅',
  // Ulaşım
  liman: '⚓', havalimani: '✈️', kopru_tunel: '🌉', boru_hatti: '🛢️',
  kara_demir: '🛣️', su_yolu: '🚢',
  // Toprak
  zonal: '🟫', azonal: '🟤', intrazonal: '🧂',
  // Bölgeler
  ana_bolge: '🗺️', bolum: '📍'
};

/**
 * Bir öğe birden çok alt türe uyabilir (ör. bir UNESCO alanı hem `unesco` hem
 * `tarihi`dir). Bu liste hangisinin rozete çıkacağını belirler; burada yer
 * almayan alt türler kaydın kendi sırasına göre değerlendirilir.
 */
const TOPIC_SUB_ONCELIK = ['unesco', 'deprem_bolge', 'enerji_tesis', 'ana_bolge'];

/** Bir öğe için en isabetli emojiyi seç (önce alt tür, sonra kategori) */
function pickTopicEmoji(item) {
  const subs = item.sub || [];
  for (const oncelikli of TOPIC_SUB_ONCELIK) {
    if (subs.includes(oncelikli) && TOPIC_SUB_ICON[oncelikli]) return TOPIC_SUB_ICON[oncelikli];
  }
  for (const s of subs) {
    if (TOPIC_SUB_ICON[s]) return TOPIC_SUB_ICON[s];
  }
  return TOPIC_CATEGORY_ICON[item.category] || '📍';
}

/** Bir öğenin çizgi/alan rengi (kategori tablosundan, yoksa varsayılan kırmızı) */
function topicColor(category, fallback = '#ef4444') {
  return TOPIC_CATEGORY_COLOR[category] || fallback;
}

class GeographyMap {
  constructor(mapContainerId) {
    this.containerId = mapContainerId;
    this.map = null;
    this.currentMarker = null;
    this.currentShapeLayer = null;
    this.multiChoiceLayerGroup = L.layerGroup();
    this.exploreLayerGroup = L.layerGroup();
    this.drawingLayerGroup = L.layerGroup();
    
    // Otomatik Yakınlaştırma (Auto-Zoom) Ayarı (LocalStorage destekli)
    this.autoZoomEnabled = this.loadAutoZoomSetting();

    // Dilsiz Harita (Yazısız / No-Labels Modu) (LocalStorage destekli)
    this.labelsEnabled = this.loadLabelsSetting();

    // Aktif çizim durumu
    this.isDrawing = false;
    this.drawingShapeType = null; // 'point', 'polyline', 'polygon'
    this.drawingCoords = [];
    this.drawingPreviewLayer = null;
    this.drawingVertexMarkers = [];
    this.onDrawingComplete = null;

    // Harita Katmanları Tanımları (Yazılı ve Dilsiz/Yazısız URL'leri)
    this.layerConfigs = {
      voyager: {
        name: 'Sade / Renkli',
        withLabels: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        noLabels: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
        options: { attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 18, minZoom: 2 }
      },
      topo: {
        name: 'Fiziki / Topografik',
        withLabels: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        noLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
        options: { attribution: '&copy; OpenStreetMap &copy; OpenTopoMap / Esri', maxZoom: 17, minZoom: 2 }
      },
      satellite: {
        name: '🛰️ Gerçek Uydu',
        withLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        noLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        options: { attribution: '&copy; Esri &copy; Earthstar Geographics', maxZoom: 18, minZoom: 2 }
      },
      dark: {
        name: '🌙 Gece / Karanlık',
        withLabels: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        noLabels: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
        options: { attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 18, minZoom: 2 }
      },
      terrain: {
        name: '⛰️ Kabartı / Arazi',
        withLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        noLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
        options: { attribution: '&copy; Esri &copy; USGS', maxZoom: 18, minZoom: 2 }
      }
    };

    this.activeLayerKey = 'voyager';
    this.currentTileLayer = null;
    this.initMap();
  }

  loadAutoZoomSetting() {
    const saved = localStorage.getItem('kpss_cografya_auto_zoom');
    return saved !== null ? JSON.parse(saved) : true;
  }

  setAutoZoom(enabled) {
    this.autoZoomEnabled = enabled;
    localStorage.setItem('kpss_cografya_auto_zoom', JSON.stringify(enabled));
  }

  toggleAutoZoom() {
    this.setAutoZoom(!this.autoZoomEnabled);
    return this.autoZoomEnabled;
  }

  loadLabelsSetting() {
    const saved = localStorage.getItem('kpss_cografya_labels_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  }

  // persist=false: gecici (oyun modu) override -- kullanicinin kayitli tercihi korunur,
  // sekme oyun ortasinda kapansa bile ayar bozulmaz.
  setLabelsEnabled(enabled, persist = true) {
    this.labelsEnabled = enabled;
    if (persist) {
      localStorage.setItem('kpss_cografya_labels_enabled', JSON.stringify(enabled));
    }
    if (this.map) {
      if (!enabled) {
        document.body.classList.add('map-no-labels');
      } else {
        document.body.classList.remove('map-no-labels');
      }
      this.updateTileLayer();
    }
  }

  toggleLabels() {
    this.setLabelsEnabled(!this.labelsEnabled);
    return this.labelsEnabled;
  }

  initMap() {
    // Türkiye merkezli harita başlatma
    // Harita Turkiye'ye kilitli degildir: tum dunya gezilebilir.
    // maxBounds yalnizca kutuplarin otesine surukleyip haritayi kaybetmeyi
    // engelleyen yumusak bir siniridir (viscosity 0 = surukleme sirasinda direnc yok).
    this.map = L.map(this.containerId, {
      center: [39.0, 35.3],
      zoom: 6.4,
      minZoom: 2,
      maxBounds: [
        [-85.0, -240.0],
        [85.0, 240.0]
      ],
      maxBoundsViscosity: 0.0,
      zoomControl: false
    });

    if (!this.labelsEnabled) {
      document.body.classList.add('map-no-labels');
    }

    // İlk katmanı yükle
    this.updateTileLayer();

    this.exploreLayerGroup.addTo(this.map);
    this.multiChoiceLayerGroup.addTo(this.map);

    // Leaflet konteyner boyutunu ÖNBELLEKLER. Harita, kabı henüz ölçülmemişken
    // kurulduğunda bu önbellek 0x0 kalıyor; sonraki `flyToBounds` çağrıları
    // NaN koordinat üretip soru render'ını komple çökertiyordu. Kabı izleyip
    // her boyut değişiminde önbelleği tazeliyoruz.
    this._watchContainerSize();
    this.drawingLayerGroup.addTo(this.map);

    // Zoom kontrolünü sağ üste al
    L.control.zoom({ position: 'topright' }).addTo(this.map);

    // Harita tıklama ve fare hareketi olayları
    this.map.on('click', (e) => this.handleMapClick(e));
    this.map.on('mousemove', (e) => this.handleMouseMove(e));
    this.map.on('dblclick', (e) => {
      if (this.isDrawing && (this.drawingShapeType === 'polyline' || this.drawingShapeType === 'polygon')) {
        L.DomEvent.stopPropagation(e);
        this.finishDrawing();
      }
    });
  }

  updateTileLayer() {
    const config = this.layerConfigs[this.activeLayerKey] || this.layerConfigs.voyager;
    const url = this.labelsEnabled ? config.withLabels : config.noLabels;

    if (this.currentTileLayer) {
      this.map.removeLayer(this.currentTileLayer);
    }

    this.currentTileLayer = L.tileLayer(url, config.options).addTo(this.map);
    // Tile layer'ı en alta gönder
    if (this.currentTileLayer.bringToBack) {
      this.currentTileLayer.bringToBack();
    }
  }

  setLayer(layerKey) {
    if (!this.layerConfigs[layerKey]) return;
    this.activeLayerKey = layerKey;
    this.updateTileLayer();
    return this.layerConfigs[layerKey].name;
  }

  // 3D Üçgen Prizma Dağ Kabartma İkonu Üretici
  createMountainPrismIcon(item) {
    let typeClass = 'folded';
    const typeStr = (item.type || '').toLowerCase();
    if (typeStr.includes('volkanik') || typeStr.includes('yanardağ')) {
      typeClass = 'volcanic';
    } else if (typeStr.includes('kırık') || typeStr.includes('horst')) {
      typeClass = 'horst';
    }

    return L.divIcon({
      className: 'mountain-3d-icon',
      html: `
        <div class="mountain-prism ${typeClass}" title="${item.name}">
          <div class="prism-pyramid">
            <div class="prism-snow-cap"></div>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 26]
    });
  }

  // 🌾 3D Ova & Alüvyal Vadi Kabartma İkonu
  createPlainIcon(item) {
    let typeClass = '';
    const typeStr = (item.type || '').toLowerCase();
    if (typeStr.includes('delta')) typeClass = 'delta';
    else if (typeStr.includes('tektonik')) typeClass = 'tectonic';
    else if (typeStr.includes('karstik') || typeStr.includes('polye')) typeClass = 'karstic';

    return L.divIcon({
      className: 'plain-3d-icon',
      html: `
        <div class="plain-badge ${typeClass}" title="${item.name}">
          <span>🌾</span>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  }

  // ⛰️ 3D Masa Dağı (Tabaka Düzlüğü / Plato) İkonu
  createPlateauIcon(item) {
    let typeClass = '';
    const typeStr = (item.type || '').toLowerCase();
    if (typeStr.includes('volkanik') || typeStr.includes('lav')) typeClass = 'volcanic';
    else if (typeStr.includes('karstik')) typeClass = 'karstic';
    else if (typeStr.includes('aşınım') || typeStr.includes('peneplen')) typeClass = 'peneplain';

    return L.divIcon({
      className: 'plateau-3d-icon',
      html: `
        <div class="plateau-mesa ${typeClass}" title="${item.name}">
          <div class="mesa-top"></div>
          <div class="mesa-cliff"></div>
        </div>
      `,
      iconSize: [32, 24],
      iconAnchor: [16, 16]
    });
  }

  // 🚪 Dağ Geçidi & 🌉 Deniz Boğazı İkonu
  createPassOrStraitIcon(item) {
    const isStrait = (item.type || '').toLowerCase().includes('deniz boğazı') || (item.type || '').toLowerCase().includes('su yolu');
    if (isStrait) {
      return L.divIcon({
        className: 'strait-3d-icon',
        html: `
          <div class="strait-badge" title="${item.name}">
            <span>🌉</span>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
    }

    return L.divIcon({
      className: 'pass-3d-icon',
      html: `
        <div class="pass-badge" title="${item.name}">
          <span>🚪</span>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  }

  // --- 🌊 GÖL DAİRELERİ ---
  // Göller artık sabit boyutlu "pulse-circle" ikonu yerine, gerçek
  // büyüklükleriyle orantılı mavi dairelerle gösterilir. Küçük göllerde
  // iri ikon gölün üzerine oturmuyordu; daire küçüldükçe sorun kalmıyor.
  isLakePoint(item) {
    if (!item) return false;
    const shapeType = item.shapeType || 'point';
    if (shapeType !== 'point') return false;
    const typeStr = (item.type || '').toLocaleLowerCase('tr');
    return item.category === 'su_kaynaklari' || typeStr.includes('göl') || typeStr.includes('lagün');
  }

  /**
   * Alanı bilinen göller logaritmik olarak ölçeklenir (Van 3713 km² -> 17 px,
   * Meke Tuzlası 0,5 km² -> 4,5 px). Alan bilinmiyorsa orta-küçük varsayılan
   * kullanılır. Piksel yarıçapı tercih edildi ki en küçük göller ülke
   * ölçeğinde bile görünür ve tıklanabilir kalsın.
   */
  getLakeRadius(item) {
    const area = typeof item.areaKm2 === 'number' && item.areaKm2 > 0 ? item.areaKm2 : 6;
    const r = 3.4 + 1.7 * Math.log(1 + area);
    // Alt sinir tiklanabilirlik icin; ust sinir dev gollerin ekrani yutmamasi icin
    return Math.max(4, Math.min(18, r));
  }

  createLakeCircle(item, isHighlight = false) {
    return L.circleMarker([item.lat, item.lng], {
      radius: this.getLakeRadius(item),
      className: isHighlight ? 'lake-circle highlight' : 'lake-circle',
      color: isHighlight ? '#e0f2fe' : '#7dd3fc',
      weight: isHighlight ? 3 : 2,
      fillColor: isHighlight ? '#0284c7' : '#0ea5e9',
      fillOpacity: isHighlight ? 0.85 : 0.65
    });
  }

  // 🚜🏭🌡️🌲 Yeni konu kategorileri icin emoji rozeti
  createTopicBadgeIcon(item, emoji, cssClass) {
    return L.divIcon({
      className: 'topic-3d-icon',
      html: `<div class="topic-badge ${cssClass}" title="${item.name}"><span>${emoji}</span></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  }

  // Öğe kategorisine göre en uygun özel ikonu döndür
  getCustomCategoryIcon(item) {
    const cat = item.category || '';
    const typeStr = (item.type || '').toLowerCase();

    // Elle modellenmiş 3B ikonlar (prizma dağ, ova, plato, geçit)
    if (cat === 'daglar' || typeStr.includes('dağ')) {
      return this.createMountainPrismIcon(item);
    }
    if (cat === 'ovalar' || typeStr.includes('ova') || typeStr.includes('delta')) {
      return this.createPlainIcon(item);
    }
    if (cat === 'platolar' || typeStr.includes('plato')) {
      return this.createPlateauIcon(item);
    }
    if (cat === 'gecitler' || typeStr.includes('geçit') || typeStr.includes('boğaz')) {
      return this.createPassOrStraitIcon(item);
    }

    // Konu kategorileri: önce alt tür, sonra kategori emojisi
    if (TOPIC_CATEGORY_ICON[cat]) {
      const emoji = pickTopicEmoji(item);
      return this.createTopicBadgeIcon(item, emoji, `topic-${cat}`);
    }

    return L.divIcon({
      className: 'pulse-marker-icon',
      html: '<div class="pulse-circle"></div>',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
  }

  // --- KLASİK MOD: TEK SORU VURGULAMA MOTORU ---
  highlightQuestionShape(questionItem) {
    this.clearQuestionHighlight();
    if (!questionItem) return;

    const shapeType = questionItem.shapeType || 'point';
    const isMountain = questionItem.category === 'daglar' || (questionItem.type || '').toLowerCase().includes('dağ');
    const isStrait = (questionItem.type || '').toLowerCase().includes('deniz boğazı');

    if (shapeType === 'point' || !questionItem.coordinates || !Array.isArray(questionItem.coordinates[0])) {
      const lat = questionItem.lat;
      const lng = questionItem.lng;

      if (this.isLakePoint(questionItem)) {
        this.currentMarker = this.createLakeCircle(questionItem, true).addTo(this.map);
      } else {
        const icon = this.getCustomCategoryIcon(questionItem);
        this.currentMarker = L.marker([lat, lng], { icon: icon }).addTo(this.map);
      }

      if (this.autoZoomEnabled) {
        this.flySafely([lat, lng], Math.max(this.map.getZoom(), 7.2), { easeLinearity: 0.25 });
      }
    } else if (shapeType === 'polyline') {
      const coords = questionItem.coordinates;
      
      let polyColor = '#ef4444';
      let polyClass = 'animated-pulse-polyline';
      if (isMountain) {
        polyColor = '#f59e0b';
        polyClass = 'mountain-range-polyline';
      } else if (isStrait) {
        polyColor = '#0284c7';
      }

      this.currentShapeLayer = L.polyline(coords, {
        color: polyColor,
        weight: isMountain ? 7 : (isStrait ? 8 : 6),
        opacity: 0.9,
        className: polyClass,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(this.map);

      // Akarsu ve sıra dağlarda merkez noktası YOK: şekli çizginin kendisi temsil eder.

      if (this.autoZoomEnabled) {
        this.flyToBoundsSafely(L.latLngBounds(coords).pad(0.35));
      }
    } else if (shapeType === 'polygon') {
      const coords = questionItem.coordinates;
      // Renk artık kategori tablosundan gelir; yeni bir kategori eklendiğinde
      // burada değişiklik gerekmez (bkz. TOPIC_CATEGORY_COLOR).
      const polyColor = topicColor(questionItem.category);
      const fillCol = polyColor;

      this.currentShapeLayer = L.polygon(coords, {
        color: polyColor,
        weight: 3.5,
        fillColor: fillCol,
        fillOpacity: 0.38,
        className: 'animated-pulse-polygon'
      }).addTo(this.map);

      if (this.autoZoomEnabled) {
        this.flyToBoundsSafely(L.latLngBounds(coords).pad(0.35));
      }
    }
  }

  // --- YENİ MOD: ÇOKLU SEÇENEK (I-V / A-E) HARİTA ROZETLERİ ---
  showMultipleChoiceLocations(options, onSelectOption) {
    this.clearQuestionHighlight();
    if (!options || options.length === 0) return;

    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const boundsCoords = [];

    options.forEach((opt, index) => {
      const letter = letters[index] || `${index + 1}`;
      const roman = romanNumerals[index] || `${index + 1}`;
      const lat = opt.lat;
      const lng = opt.lng;

      // Koordinatı bozuk tek bir kayıt Leaflet'te istisna fırlatıp SORUNUN
      // TAMAMININ çizilmesini durduruyordu (panel boş kalıyordu). Paketler
      // dışarıdan gelebildiği için bozuk kaydı sessizce atlıyoruz.
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        console.warn('Geçersiz koordinat, şık atlandı:', opt && opt.id);
        return;
      }

      boundsCoords.push([lat, lng]);

      const shapeType = opt.shapeType || 'point';

      // Çokgen veya Çizgi ise hafifçe göster
      if (shapeType === 'polyline' && opt.coordinates && Array.isArray(opt.coordinates[0])) {
        const polyline = L.polyline(opt.coordinates, {
          color: '#3b82f6',
          weight: 4,
          opacity: 0.7,
          dashArray: '4, 4'
        }).addTo(this.multiChoiceLayerGroup);
        
        polyline.on('click', () => {
          if (onSelectOption) onSelectOption(opt.id);
        });
      } else if (shapeType === 'polygon' && opt.coordinates && Array.isArray(opt.coordinates[0])) {
        const polygon = L.polygon(opt.coordinates, {
          color: '#3b82f6',
          weight: 2,
          fillColor: '#3b82f6',
          fillOpacity: 0.2
        }).addTo(this.multiChoiceLayerGroup);

        polygon.on('click', () => {
          if (onSelectOption) onSelectOption(opt.id);
        });
      }

      // Harfli ve Roma rakamlı şık pini
      const badgeHtml = `
        <div class="choice-pin-container" data-id="${opt.id}">
          <div class="choice-pin-badge">
            <span class="choice-pin-letter">${letter}</span>
            <span class="choice-pin-roman">${roman}</span>
          </div>
          <div class="choice-pin-point"></div>
        </div>
      `;

      const choiceIcon = L.divIcon({
        className: 'choice-map-icon',
        html: badgeHtml,
        iconSize: [36, 44],
        iconAnchor: [18, 44]
      });

      const marker = L.marker([lat, lng], { icon: choiceIcon }).addTo(this.multiChoiceLayerGroup);
      marker.on('click', () => {
        if (onSelectOption) onSelectOption(opt.id);
      });
    });

    // Haritayı tüm seçenekleri kapsayacak şekilde kadrajla
    if (this.autoZoomEnabled && boundsCoords.length > 0) {
      this.flyToBoundsSafely(L.latLngBounds(boundsCoords).pad(0.35));
    }
  }

  // Çoklu Seçenek Cevap Renklendirmesi
  highlightMultiChoiceAnswer(correctId, selectedId) {
    const pins = document.querySelectorAll('.choice-pin-container');
    pins.forEach(pin => {
      const id = pin.dataset.id;
      pin.classList.remove('correct-pin', 'wrong-pin', 'dimmed-pin');

      if (id === correctId) {
        pin.classList.add('correct-pin');
      } else if (id === selectedId && selectedId !== correctId) {
        pin.classList.add('wrong-pin');
      } else {
        pin.classList.add('dimmed-pin');
      }
    });
  }

  /**
   * Sik pinlerini panel butonlariyla AYNI duruma getirir.
   * states: { <id>: { state: 'correct'|'wrong'|'dim'|'picked'|'', order: <n>|null } }
   * Boylece harita ve panel tek kaynaktan beslenir, ikisi ayrisamaz.
   */
  applyChoicePinStates(states) {
    if (!states) return;
    document.querySelectorAll('.choice-pin-container').forEach(pin => {
      pin.classList.remove('correct-pin', 'wrong-pin', 'dimmed-pin', 'picked-pin');

      const info = states[pin.dataset.id];
      if (!info) return;

      if (info.state === 'correct') pin.classList.add('correct-pin');
      else if (info.state === 'wrong') pin.classList.add('wrong-pin');
      else if (info.state === 'dim') pin.classList.add('dimmed-pin');
      else if (info.state === 'picked') pin.classList.add('picked-pin');

      // Siralama modunda pin uzerinde harf yerine secim sirasi gorunsun
      const letterEl = pin.querySelector('.choice-pin-letter');
      if (letterEl && info.order) letterEl.textContent = info.order;
    });
  }

  clearQuestionHighlight() {
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
      this.currentMarker = null;
    }
    if (this.currentShapeLayer) {
      this.map.removeLayer(this.currentShapeLayer);
      this.currentShapeLayer = null;
    }
    this.multiChoiceLayerGroup.clearLayers();
    this.exploreLayerGroup.clearLayers(); // Keşif modundan test moduna geçince keşif noktalarını temizle
  }

  highlightQuestionLocation(lat, lng) {
    this.highlightQuestionShape({ shapeType: 'point', lat, lng });
  }

  /**
   * Harita artik tum dunyada gezilebiliyor. Kullanici Avustralya'ya gidip
   * yeni bir soru yuklerse, flyTo kitalar arasi 0,8 saniyelik bir savrulma
   * animasyonu oynatir; bu hem yon duygusunu kaybettirir hem de her soruda
   * tekrarlanir. Bu yuzden uzun atlayislarda animasyonu atlayip dogrudan
   * setView/fitBounds ile aninda konumlaniyoruz. Kisa mesafelerde (Turkiye
   * ici tum ucuslar dahil) yumusak animasyon korunur.
   */
  isLongJump(targetCenter, targetZoom) {
    const current = this.map.getCenter();
    const farAway = current.distanceTo(targetCenter) > 1800000; // 1800 km
    const bigZoomJump = Math.abs(this.map.getZoom() - targetZoom) > 4;
    return farAway || bigZoomJump;
  }

  flySafely(latLng, zoom, options = {}) {
    this._ensureSize();
    const target = L.latLng(latLng);
    if (this.isLongJump(target, zoom)) {
      this.map.setView(target, zoom, { animate: false });
      return;
    }
    this.map.flyTo(target, zoom, Object.assign({ duration: 0.8 }, options));
  }

  /** Leaflet'in boyut önbelleğini kabın gerçek ölçüsüyle senkron tutar */
  _watchContainerSize() {
    const el = this.map.getContainer();
    if (!el) return;

    const tazele = () => {
      const boyut = this.map.getSize();
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      if (boyut.x !== Math.round(r.width) || boyut.y !== Math.round(r.height)) {
        this.map.invalidateSize({ animate: false, pan: false });
      }
    };

    if (typeof ResizeObserver !== 'undefined') {
      this._sizeObserver = new ResizeObserver(tazele);
      this._sizeObserver.observe(el);
    }
    // Gözlemci desteklenmese bile ilk karede bir kez düzeltilsin
    requestAnimationFrame(tazele);
  }

  /** Uçuş hesapları kabın ölçüsüne dayanır; ölçü bayatsa önce tazelenir */
  _ensureSize() {
    if (this.map.getSize().x === 0 || this.map.getSize().y === 0) {
      this.map.invalidateSize({ animate: false, pan: false });
    }
  }

  flyToBoundsSafely(bounds, options = {}) {
    this._ensureSize();
    if (this.map.getSize().x === 0) return;   // kap hâlâ ölçüsüz: uçma
    const target = bounds.getCenter();
    const targetZoom = this.map.getBoundsZoom(bounds);
    if (!Number.isFinite(target.lat) || !Number.isFinite(target.lng) || !Number.isFinite(targetZoom)) {
      return;   // bozuk sınır: sessizce vazgeç, soru render'ı bölünmesin
    }
    if (this.isLongJump(target, targetZoom)) {
      this.map.fitBounds(bounds, { animate: false });
      return;
    }
    this.map.flyToBounds(bounds, Object.assign({ duration: 0.8 }, options));
  }

  resetView() {
    this.flySafely([39.0, 35.3], 6.4);
  }

  // --- ÇİZİM MODU (DRAWING ENGINE) ---
  startDrawing(shapeType, onComplete) {
    this.cancelDrawing();
    this.isDrawing = true;
    this.drawingShapeType = shapeType;
    this.drawingCoords = [];
    this.onDrawingComplete = onComplete;

    const mapDiv = document.getElementById(this.containerId);
    if (mapDiv) {
      mapDiv.classList.add('drawing-mode-active');
    }
  }

  handleMapClick(e) {
    if (!this.isDrawing) return;

    const latLng = [Number(e.latlng.lat.toFixed(5)), Number(e.latlng.lng.toFixed(5))];

    if (this.drawingShapeType === 'point') {
      this.addVertexMarker(latLng);
      this.finishDrawing([latLng[0], latLng[1]]);
      return;
    }

    this.drawingCoords.push(latLng);
    this.addVertexMarker(latLng);
    this.updateDrawingPreview();
  }

  handleMouseMove(e) {
    if (!this.isDrawing || this.drawingCoords.length === 0) return;
    if (this.drawingShapeType === 'point') return;

    const currentLatLng = [e.latlng.lat, e.latlng.lng];
    const previewCoords = [...this.drawingCoords, currentLatLng];

    if (this.drawingPreviewLayer) {
      this.drawingLayerGroup.removeLayer(this.drawingPreviewLayer);
    }

    if (this.drawingShapeType === 'polyline') {
      this.drawingPreviewLayer = L.polyline(previewCoords, {
        color: '#f59e0b',
        weight: 3,
        dashArray: '6, 6',
        opacity: 0.8
      }).addTo(this.drawingLayerGroup);
    } else if (this.drawingShapeType === 'polygon') {
      this.drawingPreviewLayer = L.polygon(previewCoords, {
        color: '#f59e0b',
        weight: 2,
        dashArray: '6, 6',
        fillColor: '#f59e0b',
        fillOpacity: 0.15
      }).addTo(this.drawingLayerGroup);
    }
  }

  addVertexMarker(latLng) {
    const vertexIcon = L.divIcon({
      className: 'vertex-marker-icon',
      html: '<div class="vertex-dot"></div>',
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });

    const marker = L.marker(latLng, { icon: vertexIcon }).addTo(this.drawingLayerGroup);
    this.drawingVertexMarkers.push(marker);
  }

  updateDrawingPreview() {
    if (this.drawingPreviewLayer) {
      this.drawingLayerGroup.removeLayer(this.drawingPreviewLayer);
      this.drawingPreviewLayer = null;
    }

    if (this.drawingCoords.length < 2) return;

    if (this.drawingShapeType === 'polyline') {
      this.drawingPreviewLayer = L.polyline(this.drawingCoords, {
        color: '#3b82f6',
        weight: 4,
        opacity: 0.9
      }).addTo(this.drawingLayerGroup);
    } else if (this.drawingShapeType === 'polygon' && this.drawingCoords.length >= 3) {
      this.drawingPreviewLayer = L.polygon(this.drawingCoords, {
        color: '#3b82f6',
        weight: 3,
        fillColor: '#3b82f6',
        fillOpacity: 0.25
      }).addTo(this.drawingLayerGroup);
    }
  }

  undoLastVertex() {
    if (!this.isDrawing || this.drawingCoords.length === 0) return;

    this.drawingCoords.pop();
    const lastMarker = this.drawingVertexMarkers.pop();
    if (lastMarker) {
      this.drawingLayerGroup.removeLayer(lastMarker);
    }
    this.updateDrawingPreview();
  }

  finishDrawing(explicitCoords = null) {
    if (!this.isDrawing) return;

    let finalCoords = explicitCoords || this.drawingCoords;
    const shapeType = this.drawingShapeType;

    if (shapeType === 'polyline' && finalCoords.length < 2) {
      alert('Çizgi oluşturmak için haritada en az 2 noktaya tıklamalısınız!');
      return;
    }
    if (shapeType === 'polygon' && finalCoords.length < 3) {
      alert('Geometrik alan (çokgen) oluşturmak için haritada en az 3 noktaya tıklamalısınız!');
      return;
    }

    const callback = this.onDrawingComplete;
    this.cancelDrawing();

    if (callback) {
      callback({
        shapeType,
        coordinates: finalCoords
      });
    }
  }

  cancelDrawing() {
    this.isDrawing = false;
    this.drawingShapeType = null;
    this.drawingCoords = [];
    this.onDrawingComplete = null;

    if (this.drawingPreviewLayer) {
      this.drawingLayerGroup.removeLayer(this.drawingPreviewLayer);
      this.drawingPreviewLayer = null;
    }

    this.drawingVertexMarkers.forEach(m => this.drawingLayerGroup.removeLayer(m));
    this.drawingVertexMarkers = [];

    const mapDiv = document.getElementById(this.containerId);
    if (mapDiv) {
      mapDiv.classList.remove('drawing-mode-active');
    }
  }

  // --- KEŞİF MODU VE TÜM ÇİZİMLERİ GÖSTERME ---
  showAllPoints(items, defaultColor = '#3b82f6') {
    this.clearAll();

    items.forEach(item => {
      const color = item.color || defaultColor;
      const shapeType = item.shapeType || 'point';
      const isMountain = item.category === 'daglar' || (item.type || '').toLowerCase().includes('dağ');
      const isStrait = (item.type || '').toLowerCase().includes('deniz boğazı');

      const customIcon = this.getCustomCategoryIcon(item);

      if (shapeType === 'point' || !item.coordinates || !Array.isArray(item.coordinates[0])) {
        const popupContent = `
          <div class="popup-title">${item.name}</div>
          <div class="popup-type">${item.type} (${item.region || ''})</div>
          <div class="popup-text">${item.kpssNot || ''}</div>
        `;
        const marker = this.isLakePoint(item)
          ? this.createLakeCircle(item, false)
          : L.marker([item.lat, item.lng], { icon: customIcon });
        marker.bindPopup(popupContent, { maxWidth: 280 });
        this.exploreLayerGroup.addLayer(marker);
      } else if (shapeType === 'polyline') {
        let polyColor = topicColor(item.category, color);
        if (isMountain) polyColor = '#d97706';
        else if (isStrait) polyColor = '#0284c7';

        const line = L.polyline(item.coordinates, {
          color: polyColor,
          weight: isMountain ? 5 : (isStrait ? 6 : 4),
          opacity: 0.9,
          dashArray: isMountain ? '8, 4' : null
        });
        const popupContent = `
          <div class="popup-title">${item.name}</div>
          <div class="popup-type">${item.type} (${item.region || 'Hat/Güzergah'})</div>
          <div class="popup-text">${item.kpssNot || ''}</div>
        `;
        line.bindPopup(popupContent, { maxWidth: 280 });
        this.exploreLayerGroup.addLayer(line);
        // Akarsu ve sıra dağlarda merkez noktası YOK: tıklama hedefi çizginin kendisi.
      } else if (shapeType === 'polygon') {
        const areaColor = topicColor(item.category, color);
        const polygon = L.polygon(item.coordinates, {
          color: areaColor,
          weight: 2,
          fillColor: areaColor,
          fillOpacity: 0.3
        });
        const popupContent = `
          <div class="popup-title">${item.name}</div>
          <div class="popup-type">${item.type} (${item.region || 'Alan/Bölge'})</div>
          <div class="popup-text">${item.kpssNot || ''}</div>
        `;
        polygon.bindPopup(popupContent, { maxWidth: 280 });
        this.exploreLayerGroup.addLayer(polygon);

        if (item.lat && item.lng) {
          const centerMarker = L.marker([item.lat, item.lng], { icon: customIcon });
          centerMarker.bindPopup(popupContent, { maxWidth: 280 });
          this.exploreLayerGroup.addLayer(centerMarker);
        }
      }
    });

    this.resetView();
  }

  clearAll() {
    this.clearQuestionHighlight();
    this.exploreLayerGroup.clearLayers();
    this.drawingLayerGroup.clearLayers();
  }

  clearAllLayers() {
    this.clearAll();
  }
}
