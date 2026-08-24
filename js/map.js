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

/**
 * Serbest metin bir HTML özniteliğine gömülüyor (özel harita kayıtlarında ad
 * alanı kullanıcı yazımıdır). Tırnak kaçmadığında ikon HTML'i bozuluyordu.
 */
function escAttr(text) {
  return String(text == null ? '' : text)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * `title` özniteliği KEŞİF modunda faydalıdır, SORU sırasında ise kopyadır:
 * fare ikonun üzerinde bir saniye beklediğinde tarayıcı cevabın adını balonda
 * gösteriyordu. Soru bağlamındaki her çağrı `isimsiz: true` geçer.
 */
function iconTitle(item, opts) {
  return (opts && opts.isimsiz) ? '' : ` title="${escAttr(item && item.name)}"`;
}

/**
 * `notr: true` iken alt tür sınıfı (volkanik / karstik / delta ...) yazılmaz.
 * Şık pinlerinde tür sınıfı ikonu renklendirdiği için "hangisi volkanik
 * kökenlidir" tipi sorularda doğru şıkkı tek bakışta ele veriyordu.
 */
function iconTypeClass(typeClass, opts) {
  return (opts && opts.notr) ? '' : typeClass;
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
    // Çizim yaparken seçili konunun mevcut şekilleri solgun bir referans olarak
    // haritada kalır; kendi pane'inde ve TIKLANAMAZ durur (bkz. showReferenceLayer)
    this.referenceLayerGroup = L.layerGroup();
    
    // Otomatik Yakınlaştırma (Auto-Zoom) Ayarı (LocalStorage destekli)
    this.autoZoomEnabled = this.loadAutoZoomSetting();

    // Dilsiz Harita (Yazısız / No-Labels Modu) (LocalStorage destekli)
    this.labelsEnabled = this.loadLabelsSetting();

    // Soru İçi Şık Göstergelerini Gizle/Küçült (LocalStorage destekli)
    this.badgesEnabled = this.loadBadgesSetting();

    // Keşif balonlarındaki "Düzenle / Sil" şeridi (yalnızca Keşif Modunda açılır)
    this.editingEnabled = false;
    this._popupActionsBound = false;

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
        name: 'Gerçek Uydu',
        withLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        noLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        options: { attribution: '&copy; Esri &copy; Earthstar Geographics', maxZoom: 18, minZoom: 2 }
      },
      dark: {
        name: 'Gece / Kontrast',
        withLabels: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        noLabels: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
        options: { attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 18, minZoom: 2 }
      },
      terrain: {
        name: 'Kabartı / Arazi',
        withLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        noLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
        options: { attribution: '&copy; Esri &copy; USGS, NOAA', maxZoom: 13, minZoom: 2 }
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

  loadBadgesSetting() {
    const saved = localStorage.getItem('kpss_cografya_badges_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  }

  setBadgesEnabled(enabled, persist = true) {
    this.badgesEnabled = enabled;
    if (persist) {
      localStorage.setItem('kpss_cografya_badges_enabled', JSON.stringify(enabled));
    }
    if (document.body) {
      document.body.classList.toggle('hide-choice-badges', !enabled);
    }
    const container = document.getElementById(this.containerId);
    if (container) {
      container.classList.toggle('hide-choice-badges', !enabled);
    }
  }

  toggleBadges() {
    this.setBadgesEnabled(!this.badgesEnabled);
    return this.badgesEnabled;
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

    if (!this.badgesEnabled) {
      document.body.classList.add('hide-choice-badges');
      const container = document.getElementById(this.containerId);
      if (container) container.classList.add('hide-choice-badges');
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
    this._ensureReferencePane();
    this.referenceLayerGroup.addTo(this.map);
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
  createMountainPrismIcon(item, opts = {}) {
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
        <div class="mountain-prism ${iconTypeClass(typeClass, opts)}"${iconTitle(item, opts)}>
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
  createPlainIcon(item, opts = {}) {
    let typeClass = '';
    const typeStr = (item.type || '').toLowerCase();
    if (typeStr.includes('delta')) typeClass = 'delta';
    else if (typeStr.includes('tektonik')) typeClass = 'tectonic';
    else if (typeStr.includes('karstik') || typeStr.includes('polye')) typeClass = 'karstic';

    return L.divIcon({
      className: 'plain-3d-icon',
      html: `
        <div class="plain-badge ${iconTypeClass(typeClass, opts)}"${iconTitle(item, opts)}>
          <span>🌾</span>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  }

  // ⛰️ 3D Masa Dağı (Tabaka Düzlüğü / Plato) İkonu
  createPlateauIcon(item, opts = {}) {
    let typeClass = '';
    const typeStr = (item.type || '').toLowerCase();
    if (typeStr.includes('volkanik') || typeStr.includes('lav')) typeClass = 'volcanic';
    else if (typeStr.includes('karstik')) typeClass = 'karstic';
    else if (typeStr.includes('aşınım') || typeStr.includes('peneplen')) typeClass = 'peneplain';

    return L.divIcon({
      className: 'plateau-3d-icon',
      html: `
        <div class="plateau-mesa ${iconTypeClass(typeClass, opts)}"${iconTitle(item, opts)}>
          <div class="mesa-top"></div>
          <div class="mesa-cliff"></div>
        </div>
      `,
      iconSize: [32, 24],
      iconAnchor: [16, 16]
    });
  }

  // 🚪 Dağ Geçidi & 🌉 Deniz Boğazı İkonu
  createPassOrStraitIcon(item, opts = {}) {
    const isStrait = (item.type || '').toLowerCase().includes('deniz boğazı') || (item.type || '').toLowerCase().includes('su yolu');
    if (isStrait) {
      return L.divIcon({
        className: 'strait-3d-icon',
        html: `
          <div class="strait-badge"${iconTitle(item, opts)}>
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
        <div class="pass-badge"${iconTitle(item, opts)}>
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
  createTopicBadgeIcon(item, emoji, cssClass, opts = {}) {
    return L.divIcon({
      className: 'topic-3d-icon',
      html: `<div class="topic-badge ${cssClass}"${iconTitle(item, opts)}><span>${emoji}</span></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  }

  // Öğe kategorisine göre en uygun özel ikonu döndür
  /**
   * @param {object} opts  `isimsiz: true` -> ikona `title` yazılmaz (kopya önleme),
   *                       `notr: true`    -> alt tür sınıfı ve alt tür emojisi kullanılmaz.
   */
  getCustomCategoryIcon(item, opts = {}) {
    const cat = item.category || '';
    const typeStr = (item.type || '').toLowerCase();

    // Elle modellenmiş 3B ikonlar (prizma dağ, ova, plato, geçit)
    if (cat === 'daglar' || typeStr.includes('dağ')) {
      return this.createMountainPrismIcon(item, opts);
    }
    if (cat === 'ovalar' || typeStr.includes('ova') || typeStr.includes('delta')) {
      return this.createPlainIcon(item, opts);
    }
    if (cat === 'platolar' || typeStr.includes('plato')) {
      return this.createPlateauIcon(item, opts);
    }
    if (cat === 'gecitler' || typeStr.includes('geçit') || typeStr.includes('boğaz')) {
      return this.createPassOrStraitIcon(item, opts);
    }

    // Konu kategorileri: önce alt tür, sonra kategori emojisi
    if (TOPIC_CATEGORY_ICON[cat]) {
      // Nötr modda alt tür emojisi de kopyadır: 5 turizm şıkkından yalnız
      // birinin 🏅 (UNESCO) çıkması soruyu cevaplıyordu.
      const emoji = opts.notr ? TOPIC_CATEGORY_ICON[cat] : pickTopicEmoji(item);
      return this.createTopicBadgeIcon(item, emoji, `topic-${cat}`, opts);
    }

    return L.divIcon({
      className: 'pulse-marker-icon',
      html: '<div class="pulse-circle"></div>',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
  }

  // --- 81 İL GEOJSON YARDIMCISI ---
  getCityFeature(itemOrId) {
    if (typeof window.TR_CITIES_GEOJSON === 'undefined' || !window.TR_CITIES_GEOJSON.features) return null;
    const id = typeof itemOrId === 'string' ? itemOrId : (itemOrId && itemOrId.id);
    const name = itemOrId && itemOrId.name;
    const plate = itemOrId && itemOrId.plate;
    return window.TR_CITIES_GEOJSON.features.find(f => {
      const p = f.properties;
      return p.id === id || p.name === name || (plate && p.plate === plate);
    }) || null;
  }

  // --- KLASİK MOD: TEK SORU VURGULAMA MOTORU ---
  highlightQuestionShape(questionItem) {
    this.clearQuestionHighlight();
    if (!questionItem) return;

    // Şehirler kategorisinde gerçek GeoJSON sınırlarını parıldat
    if (questionItem.category === 'sehirler') {
      const feat = this.getCityFeature(questionItem);
      if (feat) {
        this.currentShapeLayer = L.geoJSON(feat, {
          style: {
            color: '#93c5fd',
            weight: 3.5,
            fillColor: '#3b82f6',
            fillOpacity: 0.65,
            className: 'city-polygon-target animated-pulse-polygon'
          }
        }).addTo(this.map);

        if (this.autoZoomEnabled) {
          this.flyToBoundsSafely(this.currentShapeLayer.getBounds().pad(0.45));
        }
        return;
      }
    }

    // Birleşik / Grup Şekiller (Composite Group): Tüm alt şekilleri aynı anda parıldat
    if (questionItem.isGroup && Array.isArray(questionItem.groupItems)) {
      const groupLayer = L.featureGroup();
      const polyColor = topicColor(questionItem.category);

      questionItem.groupItems.forEach(subItem => {
        const sType = subItem.shapeType || 'point';
        if (sType === 'point' || !subItem.coordinates || !Array.isArray(subItem.coordinates[0])) {
          const icon = this.getCustomCategoryIcon(subItem, { isimsiz: true });
          L.marker([subItem.lat, subItem.lng], { icon: icon }).addTo(groupLayer);
        } else if (sType === 'polyline') {
          L.polyline(subItem.coordinates, {
            color: '#f59e0b',
            weight: 7,
            opacity: 0.9,
            className: 'animated-pulse-polyline'
          }).addTo(groupLayer);
        } else if (sType === 'polygon') {
          L.polygon(subItem.coordinates, {
            color: polyColor,
            weight: 3.5,
            fillColor: polyColor,
            fillOpacity: 0.45,
            className: 'animated-pulse-polygon'
          }).addTo(groupLayer);
        }
      });

      this.currentShapeLayer = groupLayer.addTo(this.map);
      if (this.autoZoomEnabled && groupLayer.getLayers().length > 0) {
        this.flyToBoundsSafely(groupLayer.getBounds().pad(0.35));
      }
      return;
    }

    const shapeType = questionItem.shapeType || 'point';
    const isMountain = questionItem.category === 'daglar' || (questionItem.type || '').toLowerCase().includes('dağ');
    const isStrait = (questionItem.type || '').toLowerCase().includes('deniz boğazı');

    if (shapeType === 'point' || !questionItem.coordinates || !Array.isArray(questionItem.coordinates[0])) {
      const lat = questionItem.lat;
      const lng = questionItem.lng;

      if (this.isLakePoint(questionItem)) {
        this.currentMarker = this.createLakeCircle(questionItem, true).addTo(this.map);
      } else {
        // "Haritada işaretli konum hangisidir?" sorusunda işaretçinin üzerinde
        // beklemek cevabın adını tarayıcı balonunda gösteriyordu.
        const icon = this.getCustomCategoryIcon(questionItem, { isimsiz: true });
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
  /**
   * @param {object} ayarlar  `rozetSabit: true` -> harf/roma rozeti "Gösterge
   *   Gizle" açıkken bile gizlenmez. Mutlak Konum oyunlarında pin ile panel
   *   kartını eşleştiren TEK ipucu harftir; gizlenince oyun oynanamaz hale
   *   geliyordu (tüm pinler aynı anonim daireye dönüşüyordu).
   */
  showMultipleChoiceLocations(options, onSelectOption, ayarlar = {}) {
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

      // Rozet ancak haritada GERÇEKTEN çizilmiş bir geometri varsa gizlenebilir.
      // Aksi halde (GeoJSON'u bulunamayan il, koordinat dizisi olmayan bölge)
      // şık ne görünür ne de tıklanabilir kalıyordu.
      let geometriVar = false;

      // Şehirler kategorisi ise resmi GeoJSON sınırlarını çiz
      if (opt.category === 'sehirler') {
        const feat = this.getCityFeature(opt);
        if (feat) {
          geometriVar = true;
          const geoLayer = L.geoJSON(feat, {
            style: {
              color: '#38bdf8',
              weight: 2.2,
              fillColor: '#0284c7',
              fillOpacity: 0.28,
              className: 'city-choice-polygon'
            },
            onEachFeature: (feature, layer) => {
              layer.on('click', () => {
                if (onSelectOption) onSelectOption(opt.id);
              });
              layer.on('mouseover', () => {
                layer.setStyle({
                  weight: 3.2,
                  color: '#60a5fa',
                  fillOpacity: 0.6
                });
              });
              layer.on('mouseout', () => {
                geoLayer.resetStyle(layer);
              });
            }
          }).addTo(this.multiChoiceLayerGroup);
        }
      } else if (opt.isGroup && Array.isArray(opt.groupItems)) {
        geometriVar = true;
        opt.groupItems.forEach(sub => {
          if (Number.isFinite(sub.lat) && Number.isFinite(sub.lng)) {
            boundsCoords.push([sub.lat, sub.lng]);
          }
          if (sub.shapeType === 'polygon' && sub.coordinates && Array.isArray(sub.coordinates[0])) {
            const poly = L.polygon(sub.coordinates, {
              color: '#3b82f6',
              weight: 2,
              fillColor: '#3b82f6',
              fillOpacity: 0.25
            }).addTo(this.multiChoiceLayerGroup);
            poly.on('click', () => { if (onSelectOption) onSelectOption(opt.id); });
          } else if (sub.shapeType === 'polyline' && sub.coordinates && Array.isArray(sub.coordinates[0])) {
            const line = L.polyline(sub.coordinates, {
              color: '#3b82f6',
              weight: 4,
              opacity: 0.7,
              dashArray: '4, 4'
            }).addTo(this.multiChoiceLayerGroup);
            line.on('click', () => { if (onSelectOption) onSelectOption(opt.id); });
          }
        });
      } else if (shapeType === 'polyline' && opt.coordinates && Array.isArray(opt.coordinates[0])) {
        geometriVar = true;
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
        geometriVar = true;
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

      const isLinear = shapeType === 'polyline';
      const isArea = shapeType === 'polygon' || opt.category === 'sehirler' || opt.category === 'bolgeler';
      const isPoint = !isLinear && !isArea;
      const shapeClass = isLinear ? 'shape-linear' : (isArea ? 'shape-area' : 'shape-point');

      const rozetSabit = !!ayarlar.rozetSabit;

      // Noktasal şekiller için keşif modundaki zengin özel ikonun HTML'i
      let exploreIconHtml = '';
      if (isPoint && !rozetSabit) {
        // `isimsiz` + `notr`: ikon ne adı ne de oluşum türünü ele vermeli.
        const customIcon = this.getCustomCategoryIcon(opt, { isimsiz: true, notr: true });
        const ikonAyar = (customIcon && customIcon.options) || {};
        const iconHtml = ikonAyar.html || '<div class="pulse-circle"></div>';

        // Kaynak ikon normalde kendi `iconAnchor`'ıyla hizalanır (dağ prizmasının
        // tabanı 32 px'lik kutunun 26. pikselindedir). Yalnızca HTML'ini kopyalayıp
        // ortalarsak ikon kendi yarıçapı kadar kayar; farkı burada telafi ediyoruz.
        const [ikonG, ikonY] = ikonAyar.iconSize || [0, 0];
        const [ankraX, ankraY] = ikonAyar.iconAnchor || [ikonG / 2, ikonY / 2];
        const dx = (ikonG / 2) - ankraX;
        const dy = (ikonY / 2) - ankraY;

        exploreIconHtml =
          `<div class="choice-pin-explore-icon" style="--pin-dx:${dx}px; --pin-dy:${dy}px;">${iconHtml}</div>`;
      }

      const durumSiniflari = [
        shapeClass,
        geometriVar ? 'geometri-var' : 'geometri-yok',
        rozetSabit ? 'rozet-sabit' : ''
      ].filter(Boolean).join(' ');

      // Harfli ve Roma rakamlı şık pini
      const badgeHtml = `
        <div class="choice-pin-container ${durumSiniflari}" data-id="${escAttr(opt.id)}" data-letter="${escAttr(letter)}">
          <div class="choice-pin-badge">
            <span class="choice-pin-letter">${letter}</span>
            <span class="choice-pin-roman">${roman}</span>
          </div>
          <div class="choice-pin-point"></div>
          ${exploreIconHtml}
        </div>
      `;

      const choiceIcon = L.divIcon({
        // Şekil/geometri sınıfları KÖK öğeye de yazılır. Rozet gizlendiğinde
        // Leaflet işaretçisinin 36x44'lük şeffaf kutusu DOM'da kalıyor ve boş
        // görünen haritaya tıklayan öğrenci farkında olmadan o şıkkı
        // işaretliyordu; CSS bu kutuyu ancak kökten kapatabiliyor.
        className: `choice-map-icon ${durumSiniflari}`,
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

      // Siralama modunda pin uzerinde harf yerine secim sirasi gorunsun.
      // Sira dusunce harf GERI DONMELI; aksi halde pin eski numarada kaliyordu.
      const letterEl = pin.querySelector('.choice-pin-letter');
      if (letterEl) {
        letterEl.textContent = info.order ? info.order : (pin.dataset.letter || letterEl.textContent);
      }
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

  // =========================================================================
  // 🖉 ÇİZİM REFERANS KATMANI
  //
  // Çizim moduna girildiğinde harita eskiden tamamen boşaltılıyordu; kullanıcı
  // yeni şekli hiçbir bağlam olmadan boş zemine çizmek zorunda kalıyordu.
  // Artık seçili konunun mevcut şekilleri SOLGUN bir referans katmanı olarak
  // haritada kalır.
  //
  // Katman KENDİ pane'indedir ve `pointer-events: none` taşır. Bu şart:
  // referans şekiller tıklanabilir olsaydı, üzerlerine tıklamak Leaflet'te
  // katman olayını tetikler, harita tıklamasına DÜŞMEZDİ — yani mevcut bir
  // şeklin üstüne çizim noktası bırakmak imkânsız olurdu.
  // =========================================================================

  /** Referans pane'ini bir kez oluşturur (haritanın altında, tıklanamaz) */
  _ensureReferencePane() {
    if (!this.map || this.map.getPane('cizimReferans')) return;
    const pane = this.map.createPane('cizimReferans');
    pane.style.zIndex = 350;            // overlayPane (400) ve markerPane (600) ALTINDA
    pane.style.pointerEvents = 'none';  // tıklama haritaya geçsin -> çizim noktası bırakılabilsin
  }

  clearReferenceLayer() {
    this.referenceLayerGroup.clearLayers();
  }

  /**
   * Seçili konunun şekillerini solgun/tıklanamaz referans olarak çizer.
   * @returns {number} haritaya çizilen kayıt sayısı
   */
  showReferenceLayer(items, defaultColor = '#3b82f6') {
    this.clearReferenceLayer();
    if (!Array.isArray(items) || !items.length) return 0;
    this._ensureReferencePane();

    const ortak = { pane: 'cizimReferans', interactive: false };
    let cizilen = 0;

    items.forEach(item => {
      const shapeType = item.shapeType || 'point';
      const renk = topicColor(item.category, item.color || defaultColor);

      // 81 il: resmi sınır geometrisi
      if (item.category === 'sehirler') {
        const feat = this.getCityFeature(item);
        if (feat) {
          L.geoJSON(feat, Object.assign({}, ortak, {
            style: {
              color: '#93c5fd', weight: 1.4, fillColor: '#3b82f6',
              fillOpacity: 0.1, className: 'cizim-referans-sekil'
            }
          })).addTo(this.referenceLayerGroup);
          cizilen++;
        }
        return;
      }

      if (shapeType === 'polyline' && Array.isArray(item.coordinates) && Array.isArray(item.coordinates[0])) {
        L.polyline(item.coordinates, Object.assign({}, ortak, {
          color: renk, weight: 3, opacity: 0.55,
          dashArray: '5, 5', className: 'cizim-referans-sekil'
        })).addTo(this.referenceLayerGroup);
        cizilen++;
        return;
      }

      if (shapeType === 'polygon' && Array.isArray(item.coordinates) && Array.isArray(item.coordinates[0])) {
        L.polygon(item.coordinates, Object.assign({}, ortak, {
          color: renk, weight: 1.6, fillColor: renk,
          fillOpacity: 0.12, opacity: 0.5, className: 'cizim-referans-sekil'
        })).addTo(this.referenceLayerGroup);
        cizilen++;
        return;
      }

      // Noktasal kayıtlar: keşif ikonunun solgun kopyası
      if (!Number.isFinite(item.lat) || !Number.isFinite(item.lng)) return;

      if (this.isLakePoint(item)) {
        const daire = this.createLakeCircle(item, false);
        daire.options.pane = 'cizimReferans';
        daire.options.interactive = false;
        daire.options.className = 'lake-circle cizim-referans-sekil';
        daire.addTo(this.referenceLayerGroup);
        cizilen++;
        return;
      }

      // `isimsiz`: referans ikonunun tarayıcı balonunda kaydın adını göstermesi
      // gereksiz; çizim sırasında imleç zaten sürekli şekillerin üzerinden geçer.
      const ikon = this.getCustomCategoryIcon(item, { isimsiz: true });
      const solgunIkon = L.divIcon({
        className: `${ikon.options.className || ''} cizim-referans-ikon`,
        html: ikon.options.html,
        iconSize: ikon.options.iconSize,
        iconAnchor: ikon.options.iconAnchor
      });
      L.marker([item.lat, item.lng], Object.assign({}, ortak, { icon: solgunIkon }))
        .addTo(this.referenceLayerGroup);
      cizilen++;
    });

    return cizilen;
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

  // =========================================================================
  // KEŞİF MODU BALONLARI VE DÜZENLEME EYLEMLERİ
  // =========================================================================
  /**
   * Keşif balonunun alt şeridi. Kaynak paket dosyası ASLA değişmez; bu
   * düğmeler `js/pack_edits.js` katmanına yazan olayları yayınlar.
   * Yalnızca bir pakete ait kayıtlar düzenlenebilir (özel çizimlerin kendi
   * yöneticisi vardır).
   */
  _popupActions(item) {
    if (!this.editingEnabled || !item) return '';
    const isCustom = item.isCustomUserAdded || item.category === 'ozel_cizimler' || !item.packId;
    const targetPackId = isCustom ? 'custom' : item.packId;

    const rozet = isCustom
      ? '<span class="popup-edit-tag added">🎨 özel çizim</span>'
      : (item.isUserAdded
        ? '<span class="popup-edit-tag added">✚ eklediğin kayıt</span>'
        : (item.isPackEdited ? '<span class="popup-edit-tag">✎ düzenlenmiş</span>' : ''));

    const groupTag = item.groupId
      ? `<div class="popup-group-tag" title="Diğer bir elemana sürükleyip bırakarak bağlayabilir veya bağı koparabilirsiniz">🔗 Birleşik Grup Üyesi</div>`
      : '';

    return `
      <div class="popup-actions">
        ${rozet}
        ${groupTag}
        <button type="button" class="popup-act" data-pop-act="edit"
                data-pop-id="${escAttr(item.id)}" data-pop-pack="${escAttr(targetPackId)}">✏️ Düzenle</button>
        <button type="button" class="popup-act danger" data-pop-act="delete"
                data-pop-id="${escAttr(item.id)}" data-pop-pack="${escAttr(targetPackId)}">🗑 Sil</button>
      </div>`;
  }

  /** Keşif modundaki tekil kayıt balonu (başlık + tür + not + eylemler) */
  _popupHtml(item, baslik = null, altBaslik = null, metin = null) {
    return `
      <div class="popup-title">${baslik !== null ? baslik : item.name}</div>
      <div class="popup-type">${altBaslik !== null ? altBaslik : `${item.type} (${item.region || ''})`}</div>
      <div class="popup-text">${metin !== null ? metin : (item.kpssNot || '')}</div>
      ${this._popupActions(item)}
    `;
  }

  /**
   * Balon içindeki düzenle/sil düğmeleri Leaflet tarafından her açılışta
   * yeniden üretilir; tek tek dinleyici bağlamak yerine harita kabında bir
   * kez devredilmiş dinleyici kuruyoruz.
   */
  _bindPopupActions() {
    if (this._popupActionsBound) return;
    const el = this.map && this.map.getContainer();
    if (!el) return;
    this._popupActionsBound = true;

    el.addEventListener('click', (e) => {
      const btn = e.target.closest && e.target.closest('[data-pop-act]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      document.dispatchEvent(new CustomEvent('pack:item-action', {
        detail: {
          action: btn.dataset.popAct,
          itemId: btn.dataset.popId,
          packId: btn.dataset.popPack
        }
      }));
    });
  }

  /** Keşif balonlarındaki düzenle/sil şeridini aç/kapat */
  setEditingEnabled(acik) {
    this.editingEnabled = !!acik;
    this._bindPopupActions();
  }

  /**
   * Keşif Modunda elemanlar arası sürükle-bırak ile birleştirme / ayırma (Link/Unlink) etkileşimi
   */
  _enableDragLinking(layer, item, allItems) {
    if (!layer || !layer.on) return;

    layer.on('mousedown', (e) => {
      if (e.originalEvent && e.originalEvent.button !== 0) return; // Yalnızca sol tık
      
      const startX = e.originalEvent.clientX;
      const startY = e.originalEvent.clientY;
      const startLatLng = e.latlng || [item.lat, item.lng];
      let isDragging = false;
      let hoveredTarget = null;
      let laserLine = null;

      const onMouseMove = (ev) => {
        const dist = Math.hypot(ev.clientX - startX, ev.clientY - startY);
        if (dist > 10 && !isDragging) {
          isDragging = true;
          this.map.dragging.disable();
          this.map.getContainer().classList.add('linking-drag-mode');
          laserLine = L.polyline([startLatLng, this.map.mouseEventToLatLng(ev)], {
            color: '#8b5cf6',
            weight: 3.5,
            dashArray: '6, 6',
            opacity: 0.9,
            className: 'laser-drag-line'
          }).addTo(this.map);
        }

        if (isDragging && laserLine) {
          const currentLatLng = this.map.mouseEventToLatLng(ev);
          laserLine.setLatLngs([startLatLng, currentLatLng]);

          // En yakın hedef elemanı bul
          hoveredTarget = null;
          let minPixelDist = 45;
          allItems.forEach(other => {
            if (other.id === item.id) return;
            const otherPt = this.map.latLngToContainerPoint([other.lat, other.lng]);
            const pDist = Math.hypot(ev.clientX - otherPt.x, ev.clientY - otherPt.y);
            if (pDist < minPixelDist) {
              minPixelDist = pDist;
              hoveredTarget = other;
            }
          });
        }
      };

      const onMouseUp = (ev) => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);

        if (isDragging) {
          this.map.dragging.enable();
          this.map.getContainer().classList.remove('linking-drag-mode');
          if (laserLine) {
            this.map.removeLayer(laserLine);
            laserLine = null;
          }

          if (hoveredTarget && hoveredTarget.id !== item.id) {
            document.dispatchEvent(new CustomEvent('custom-draw:link-toggle', {
              detail: {
                sourceId: item.id,
                targetId: hoveredTarget.id,
                sourceItem: item,
                targetItem: hoveredTarget
              }
            }));
          }
          if (layer.closePopup) setTimeout(() => layer.closePopup(), 10);
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  }

  // --- KEŞİF MODU VE TÜM ÇİZİMLERİ GÖSTERME ---
  showAllPoints(items, defaultColor = '#3b82f6') {
    this.clearAll();
    this._bindPopupActions();

    // 1. Birleşik / Gruplanmış elemanlar arasında zarif bağlantı çizgileri çiz
    const groupMap = new Map();
    items.forEach(it => {
      if (it.groupId) {
        if (!groupMap.has(it.groupId)) groupMap.set(it.groupId, []);
        groupMap.get(it.groupId).push(it);
      }
    });

    groupMap.forEach((members, gId) => {
      if (members.length >= 2) {
        for (let i = 0; i < members.length - 1; i++) {
          const p1 = [members[i].lat, members[i].lng];
          const p2 = [members[i + 1].lat, members[i + 1].lng];
          const groupLine = L.polyline([p1, p2], {
            color: '#a855f7',
            weight: 2.8,
            dashArray: '8, 8',
            opacity: 0.85,
            className: 'group-connection-line'
          });
          groupLine.bindTooltip(`🔗 Birleşik Saha: <b>${members[0].name}</b>`, { sticky: true });
          this.exploreLayerGroup.addLayer(groupLine);
        }
      }
    });

    // 2. Elemanları haritaya çiz ve sürükle-bırak bağlama dinleyicilerini bağla
    items.forEach(item => {
      // 81 İl (Şehirler) için gerçek GeoJSON sınırlarını ve interaktif glow efektini çiz
      if (item.category === 'sehirler') {
        const feat = this.getCityFeature(item);
        if (feat) {
          const p = feat.properties;
          const geoLayer = L.geoJSON(feat, {
            style: {
              color: 'rgba(96, 165, 250, 0.45)',
              weight: 1.5,
              fillColor: '#3b82f6',
              fillOpacity: 0.12,
              className: 'city-polygon'
            },
            onEachFeature: (feature, layer) => {
              const tooltipContent = `📍 <span class="city-tooltip-plate">${p.plateStr}</span> <b>${p.name}</b> <span class="city-tooltip-region">${p.region}</span>`;
              layer.bindTooltip(tooltipContent, {
                sticky: true,
                direction: 'top',
                className: 'city-hover-tooltip',
                offset: [0, -10]
              });

              layer.on('mouseover', () => {
                layer.setStyle({
                  weight: 2.8,
                  color: '#60a5fa',
                  fillColor: '#3b82f6',
                  fillOpacity: 0.55
                });
                if (layer._path) {
                  layer._path.classList.add('city-polygon-glow');
                }
              });

              layer.on('mouseout', () => {
                geoLayer.resetStyle(layer);
                if (layer._path) {
                  layer._path.classList.remove('city-polygon-glow');
                }
              });

              const popupContent = this._popupHtml(
                item,
                `📍 ${p.name} (${p.plateStr})`,
                `${p.region} Bölgesi | Rakım: ~${p.alt}m`,
                p.kpss || item.kpssNot || ''
              );
              layer.bindPopup(popupContent, { maxWidth: 300 });
              this._enableDragLinking(layer, item, items);
            }
          });
          this.exploreLayerGroup.addLayer(geoLayer);
          return;
        }
      }

      const color = item.color || defaultColor;
      const shapeType = item.shapeType || 'point';
      const isMountain = item.category === 'daglar' || (item.type || '').toLowerCase().includes('dağ');
      const isStrait = (item.type || '').toLowerCase().includes('deniz boğazı');

      const customIcon = this.getCustomCategoryIcon(item);

      if (shapeType === 'point' || !item.coordinates || !Array.isArray(item.coordinates[0])) {
        const popupContent = this._popupHtml(item);
        const marker = this.isLakePoint(item)
          ? this.createLakeCircle(item, false)
          : L.marker([item.lat, item.lng], { icon: customIcon });
        marker.bindPopup(popupContent, { maxWidth: 280 });
        this._enableDragLinking(marker, item, items);
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
        const popupContent = this._popupHtml(item, null, `${item.type} (${item.region || 'Hat/Güzergah'})`);
        line.bindPopup(popupContent, { maxWidth: 280 });
        this._enableDragLinking(line, item, items);
        this.exploreLayerGroup.addLayer(line);
      } else if (shapeType === 'polygon') {
        const areaColor = topicColor(item.category, color);
        const polygon = L.polygon(item.coordinates, {
          color: areaColor,
          weight: 2,
          fillColor: areaColor,
          fillOpacity: 0.3
        });
        const popupContent = this._popupHtml(item, null, `${item.type} (${item.region || 'Alan/Bölge'})`);
        polygon.bindPopup(popupContent, { maxWidth: 280 });
        this._enableDragLinking(polygon, item, items);
        this.exploreLayerGroup.addLayer(polygon);

        if (item.lat && item.lng) {
          const centerMarker = L.marker([item.lat, item.lng], { icon: customIcon });
          centerMarker.bindPopup(popupContent, { maxWidth: 280 });
          this._enableDragLinking(centerMarker, item, items);
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
    this.clearReferenceLayer();
  }

  clearAllLayers() {
    this.clearAll();
  }
}
