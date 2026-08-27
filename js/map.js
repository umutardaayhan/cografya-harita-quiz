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

// 🎨 10 Benzersiz Canlı Şık Renk Paleti (A-J / I-X)
const CHOICE_PALETTE = [
  { main: '#3b82f6', glow: 'rgba(59, 130, 246, 0.65)', bg: 'rgba(59, 130, 246, 0.15)', name: 'blue' },
  { main: '#10b981', glow: 'rgba(16, 185, 129, 0.65)', bg: 'rgba(16, 185, 129, 0.15)', name: 'emerald' },
  { main: '#f59e0b', glow: 'rgba(245, 158, 11, 0.65)', bg: 'rgba(245, 158, 11, 0.15)', name: 'amber' },
  { main: '#a855f7', glow: 'rgba(168, 85, 247, 0.65)', bg: 'rgba(168, 85, 247, 0.15)', name: 'purple' },
  { main: '#ec4899', glow: 'rgba(236, 72, 153, 0.65)', bg: 'rgba(236, 72, 153, 0.15)', name: 'pink' },
  { main: '#06b6d4', glow: 'rgba(6, 182, 212, 0.65)', bg: 'rgba(6, 182, 212, 0.15)', name: 'cyan' },
  { main: '#eab308', glow: 'rgba(234, 179, 8, 0.65)', bg: 'rgba(234, 179, 8, 0.15)', name: 'yellow' },
  { main: '#f97316', glow: 'rgba(249, 115, 22, 0.65)', bg: 'rgba(249, 115, 22, 0.15)', name: 'orange' },
  { main: '#6366f1', glow: 'rgba(99, 102, 241, 0.65)', bg: 'rgba(99, 102, 241, 0.15)', name: 'indigo' },
  { main: '#14b8a6', glow: 'rgba(20, 184, 166, 0.65)', bg: 'rgba(20, 184, 166, 0.15)', name: 'teal' }
];

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
  ana_bolge: '🗺️', bolum: '📍',
  // Sanayi & Endüstri (7 Sektör)
  gida: '🍞', tekstil_deri: '👕', metalurji: '🔩', otomotiv_ulasim: '🚗',
  kimya: '🧪', orman: '🪵', tasa_topraga: '🧱'
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
    this.networkLayerGroup = L.layerGroup();
    // Çizim yaparken seçili konunun mevcut şekilleri solgun bir referans olarak
    // haritada kalır; kendi pane'inde ve TIKLANAMAZ durur (bkz. showReferenceLayer)
    this.referenceLayerGroup = L.layerGroup();
    
    // Otomatik Yakınlaştırma (Auto-Zoom) Ayarı (LocalStorage destekli)
    this.autoZoomEnabled = this.loadAutoZoomSetting();

    // Dilsiz Harita (Yazısız / No-Labels Modu) (LocalStorage destekli)
    this.labelsEnabled = this.loadLabelsSetting();

    // Soru İçi Şık Göstergelerini Gizle/Küçült (LocalStorage destekli)
    this.badgesEnabled = this.loadBadgesSetting();

    // Noktasal Konumlar İçin Şehir İsimleri Göstergesi (LocalStorage destekli)
    this.pinCityEnabled = this.loadPinCitySetting();
    this._cityCoordCache = new Map();

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

    // 🔑 CARTO API Anahtarı (https://carto.com/basemaps/apikey)
    this.cartoApiKey = localStorage.getItem('kpss_carto_api_key') || 'cb1_2dv7_1_e5256c007f5a60e7f8035343';

    // Harita Katmanları Tanımları (Yazılı ve Dilsiz/Yazısız URL'leri)
    this.initLayerConfigs();

    this.activeLayerKey = 'voyager';
    this.currentTileLayer = null;
    this.currentReferenceLayer = null;
    this.initMap();
  }

  setCartoApiKey(key) {
    this.cartoApiKey = (key || '').trim();
    if (this.cartoApiKey) {
      localStorage.setItem('kpss_carto_api_key', this.cartoApiKey);
    } else {
      localStorage.removeItem('kpss_carto_api_key');
    }
    this.initLayerConfigs();
    this.updateTileLayer();
  }

  initLayerConfigs() {
    const keyParam = this.cartoApiKey ? `?key=${this.cartoApiKey}` : '';
    this.layerConfigs = {
      voyager: {
        name: 'Sade / Renkli (CARTO)',
        withLabels: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png${keyParam}`,
        noLabels: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png${keyParam}`,
        options: { attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 19, minZoom: 2 }
      },
      topo: {
        name: 'Fiziki / Topografik',
        withLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        noLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
        options: { attribution: '&copy; Esri, CGIAR, USGS, NPS', maxZoom: 19, minZoom: 2 }
      },
      satellite: {
        name: 'Gerçek Uydu',
        withLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        noLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        options: { attribution: '&copy; Esri, Maxar, Earthstar Geographics', maxZoom: 19, minZoom: 2 }
      },
      dark: {
        name: 'Gece / Kontrast (CARTO)',
        withLabels: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png${keyParam}`,
        noLabels: `https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png${keyParam}`,
        options: { attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 19, minZoom: 2 }
      },
      terrain: {
        name: 'Kabartı / Arazi',
        withLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        noLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
        options: { attribution: '&copy; Esri &copy; USGS, NOAA', maxZoom: 19, minZoom: 2 }
      }
    };
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

  loadPinCitySetting() {
    const saved = localStorage.getItem('kpss_cografya_pin_city_enabled');
    return saved !== null ? JSON.parse(saved) : false;
  }

  setPinCityEnabled(enabled, persist = true) {
    this.pinCityEnabled = !!enabled;
    if (persist) {
      localStorage.setItem('kpss_cografya_pin_city_enabled', JSON.stringify(this.pinCityEnabled));
    }
    this.refreshChoicePinLabels();
  }

  togglePinCity() {
    this.setPinCityEnabled(!this.pinCityEnabled);
    return this.pinCityEnabled;
  }

  refreshChoicePinLabels() {
    const pins = document.querySelectorAll('.choice-pin-container.shape-point');
    pins.forEach(pin => {
      const badge = pin.querySelector('.choice-pin-badge');
      const romanEl = pin.querySelector('.choice-pin-roman');
      if (!badge || !romanEl) return;

      const cityName = pin.dataset.city;
      const roman = pin.dataset.roman || 'I';

      if (this.pinCityEnabled && cityName) {
        badge.classList.add('choice-pin-city-badge');
        romanEl.classList.add('choice-pin-city-name');
        romanEl.textContent = cityName;
      } else {
        badge.classList.remove('choice-pin-city-badge');
        romanEl.classList.remove('choice-pin-city-name');
        romanEl.textContent = roman;
      }
    });
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
    this.networkLayerGroup.addTo(this.map);

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
      this.currentTileLayer = null;
    }
    if (this.currentReferenceLayer) {
      this.map.removeLayer(this.currentReferenceLayer);
      this.currentReferenceLayer = null;
    }

    this.currentTileLayer = L.tileLayer(url, config.options).addTo(this.map);
    // Tile layer'ı en alta gönder
    if (this.currentTileLayer.bringToBack) {
      this.currentTileLayer.bringToBack();
    }

    // Ayrı etiket katmanı varsa ve yazılı mod açıksa ekle
    if (this.labelsEnabled && config.referenceUrl) {
      this.currentReferenceLayer = L.tileLayer(config.referenceUrl, Object.assign({}, config.options, {
        pane: 'overlayPane',
        zIndex: 500
      })).addTo(this.map);
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

  // --- 81 İL GEOJSON VE IŞIN KAYDIRMA (RAY-CASTING) İL BULUCU ---
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

  _pointInRing(lng, lat, ring) {
    let inside = false;
    const n = ring.length;
    let j = n - 1;
    for (let i = 0; i < n; i++) {
      const xi = ring[i][0], yi = ring[i][1];
      const xj = ring[j][0], yj = ring[j][1];
      const intersect = ((yi > lat) !== (yj > lat)) &&
        (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
      j = i;
    }
    return inside;
  }

  _pointInPoly(lng, lat, poly) {
    if (!this._pointInRing(lng, lat, poly[0])) return false;
    for (let h = 1; h < poly.length; h++) {
      if (this._pointInRing(lng, lat, poly[h])) return false; // İç delik (hole)
    }
    return true;
  }

  findCityByCoordinate(lat, lng) {
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
    if (this._cityCoordCache && this._cityCoordCache.has(cacheKey)) {
      return this._cityCoordCache.get(cacheKey);
    }

    if (typeof window.TR_CITIES_GEOJSON === 'undefined' || !Array.isArray(window.TR_CITIES_GEOJSON.features)) {
      return null;
    }

    const features = window.TR_CITIES_GEOJSON.features;

    // 1. Ray-casting ile poligon sınırları testi
    for (let f of features) {
      const geom = f.geometry;
      if (!geom) continue;
      const coords = geom.coordinates;
      if (geom.type === 'Polygon') {
        if (this._pointInPoly(lng, lat, coords)) {
          const name = f.properties && f.properties.name;
          if (name) {
            if (this._cityCoordCache) this._cityCoordCache.set(cacheKey, name);
            return name;
          }
        }
      } else if (geom.type === 'MultiPolygon') {
        for (let poly of coords) {
          if (this._pointInPoly(lng, lat, poly)) {
            const name = f.properties && f.properties.name;
            if (name) {
              if (this._cityCoordCache) this._cityCoordCache.set(cacheKey, name);
              return name;
            }
          }
        }
      }
    }

    // 2. Kıyı/sınır kaymalarında en yakın il merkezine (centroid) fallback
    let bestDist = Infinity;
    let bestName = null;
    for (let f of features) {
      const p = f.properties;
      if (!p || !Number.isFinite(p.lat) || !Number.isFinite(p.lng)) continue;
      const d = (p.lat - lat) ** 2 + (p.lng - lng) ** 2;
      if (d < bestDist) {
        bestDist = d;
        bestName = p.name;
      }
    }

    if (bestName && this._cityCoordCache) {
      this._cityCoordCache.set(cacheKey, bestName);
    }
    return bestName;
  }

  findCityName(optOrLatLng) {
    if (!optOrLatLng) return '';
    // Eğer doğrudan şehir nesnesi ise kendi adı şehirdir
    if (optOrLatLng.category === 'sehirler' && optOrLatLng.name) {
      return optOrLatLng.name;
    }

    const lat = typeof optOrLatLng.lat === 'number' ? optOrLatLng.lat : (Array.isArray(optOrLatLng) ? optOrLatLng[0] : null);
    const lng = typeof optOrLatLng.lng === 'number' ? optOrLatLng.lng : (Array.isArray(optOrLatLng) ? optOrLatLng[1] : null);

    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      const detected = this.findCityByCoordinate(lat, lng);
      if (detected) return detected;
    }

    if (optOrLatLng.city && typeof optOrLatLng.city === 'string') {
      return optOrLatLng.city.split(/[\/\-–]/)[0].trim().replace(/\s*\(.*?\)/, '');
    }

    return '';
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

    // Birleşik / Grup Şekiller (Composite Group): Örneklenmiş alt şekilleri parıldat
    if (questionItem.isGroup && Array.isArray(questionItem.groupItems)) {
      const groupLayer = L.featureGroup();
      const polyColor = topicColor(questionItem.category);
      const itemsToRender = (questionItem.displayGroupItems && questionItem.displayGroupItems.length > 0)
        ? questionItem.displayGroupItems
        : questionItem.groupItems;

      itemsToRender.forEach(subItem => {
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

    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const boundsCoords = [];
    const rozetSabit = !!ayarlar.rozetSabit;

    // Aynı koordinata birden fazla kez pin basılmasını kesinlikle engelle
    const placedMarkerCoords = new Set();

    options.forEach((opt, index) => {
      const letter = letters[index] || `${index + 1}`;
      const roman = romanNumerals[index] || `${index + 1}`;
      const choiceColor = CHOICE_PALETTE[index % CHOICE_PALETTE.length];

      // --- GRUP / BİRLEŞİK SEÇENEK DURUMU ---
      // İzmir ve Van gibi birbiriyle teması olmayan ayrık yerleri birleştirdiğimizde
      // Nevşehir'de sahte bir orta nokta pini çıkması TAMAMEN ENGELLENİR.
      // Grubun her bir üyesinin (İzmir'deki dağ ve Van'daki dağ) tam kendi konumunda
      // AYNI şık pini (örn. A Pini) ve kendi geometrisi (poligon/çizgi/nokta) gösterilir.
      if (opt.isGroup && Array.isArray(opt.groupItems) && opt.groupItems.length > 0) {
        const itemsToRender = (opt.displayGroupItems && opt.displayGroupItems.length > 0)
          ? opt.displayGroupItems
          : opt.groupItems;

        // Çoklu üye noktaları arasında şık renginde kesikli bağlantı çizgisi
        const validCoords = itemsToRender
          .filter(it => Number.isFinite(it.lat) && Number.isFinite(it.lng))
          .map(it => [it.lat, it.lng]);

        if (validCoords.length >= 2) {
          const connectorLine = L.polyline(validCoords, {
            color: choiceColor.main,
            weight: 2.5,
            opacity: 0.65,
            dashArray: '5, 5',
            className: 'group-choice-connector'
          }).addTo(this.multiChoiceLayerGroup);
          connectorLine.optionId = opt.id;
          connectorLine.on('click', () => { if (onSelectOption) onSelectOption(opt.id); });
        }

        itemsToRender.forEach(subItem => {
          const subLat = subItem.lat;
          const subLng = subItem.lng;
          if (Number.isFinite(subLat) && Number.isFinite(subLng)) {
            boundsCoords.push([subLat, subLng]);
          }

          let subGeometriVar = false;
          if (subItem.shapeType === 'polygon' && Array.isArray(subItem.coordinates) && Array.isArray(subItem.coordinates[0])) {
            subGeometriVar = true;
            const poly = L.polygon(subItem.coordinates, {
              color: choiceColor.main,
              weight: 2.2,
              fillColor: choiceColor.main,
              fillOpacity: 0.28,
              className: 'polygon-choice-shape'
            }).addTo(this.multiChoiceLayerGroup);
            poly.optionId = opt.id;
            poly.subItemId = subItem.id;
            poly.on('click', () => { if (onSelectOption) onSelectOption(opt.id); });
          } else if (subItem.shapeType === 'polyline' && Array.isArray(subItem.coordinates) && Array.isArray(subItem.coordinates[0])) {
            subGeometriVar = true;
            const line = L.polyline(subItem.coordinates, {
              color: choiceColor.main,
              weight: 4,
              opacity: 0.75,
              dashArray: '4, 4',
              className: 'polyline-choice-shape'
            }).addTo(this.multiChoiceLayerGroup);
            line.optionId = opt.id;
            line.subItemId = subItem.id;
            line.on('click', () => { if (onSelectOption) onSelectOption(opt.id); });
          }

          if (!Number.isFinite(subLat) || !Number.isFinite(subLng)) return;

          // Aynı koordinatta zaten bir şık pini basıldıysa mükerrer basmayı atla
          const coordKey = `${subLat.toFixed(3)},${subLng.toFixed(3)}`;
          if (placedMarkerCoords.has(coordKey)) return;
          placedMarkerCoords.add(coordKey);

          const subIsLinear = subItem.shapeType === 'polyline';
          const subIsArea = subItem.shapeType === 'polygon' || subItem.category === 'sehirler' || subItem.category === 'bolgeler';
          const subIsPoint = !subIsLinear && !subIsArea;
          const subShapeClass = subIsLinear ? 'shape-linear' : (subIsArea ? 'shape-area' : 'shape-point');

          let subExploreIconHtml = '';
          if (subIsPoint && !rozetSabit) {
            const customIcon = this.getCustomCategoryIcon(subItem, { isimsiz: true, notr: true });
            const ikonAyar = (customIcon && customIcon.options) || {};
            const iconHtml = ikonAyar.html || '<div class="pulse-circle"></div>';
            const [ikonG, ikonY] = ikonAyar.iconSize || [0, 0];
            const [ankraX, ankraY] = ikonAyar.iconAnchor || [ikonG / 2, ikonY / 2];
            const dx = (ikonG / 2) - ankraX;
            const dy = (ikonY / 2) - ankraY;
            subExploreIconHtml = `<div class="choice-pin-explore-icon" style="--pin-dx:${dx}px; --pin-dy:${dy}px;">${iconHtml}</div>`;
          }

          const subDurumSiniflari = [
            subShapeClass,
            subGeometriVar ? 'geometri-var' : 'geometri-yok',
            rozetSabit ? 'rozet-sabit' : ''
          ].filter(Boolean).join(' ');

          let subCityName = '';
          if (subIsPoint) {
            subCityName = this.findCityName(subItem);
          }
          const subUseCity = this.pinCityEnabled && subIsPoint && !!subCityName;
          const subLabelDisplay = subUseCity ? subCityName : roman;
          const subCityBadgeClass = subUseCity ? 'choice-pin-city-badge' : '';
          const subCityNameClass = subUseCity ? 'choice-pin-city-name' : '';

          const subBadgeHtml = `
            <div class="choice-pin-container ${subDurumSiniflari}" 
                 data-id="${escAttr(opt.id)}" 
                 data-index="${index}"
                 data-letter="${escAttr(letter)}" 
                 data-roman="${escAttr(roman)}" 
                 data-city="${escAttr(subCityName)}"
                 style="--choice-color: ${choiceColor.main}; --choice-glow: ${choiceColor.glow}; --choice-bg: ${choiceColor.bg};">
              <div class="choice-pin-badge ${subCityBadgeClass}">
                <span class="choice-pin-letter">${letter}</span>
                <span class="choice-pin-roman ${subCityNameClass}">${subLabelDisplay}</span>
              </div>
              <div class="choice-pin-point"></div>
              ${subExploreIconHtml}
            </div>
          `;

          const subChoiceIcon = L.divIcon({
            className: `choice-map-icon ${subDurumSiniflari}`,
            html: subBadgeHtml,
            iconSize: [36, 44],
            iconAnchor: [18, 44]
          });

          const subMarker = L.marker([subLat, subLng], { icon: subChoiceIcon }).addTo(this.multiChoiceLayerGroup);
          subMarker.on('click', () => {
            if (onSelectOption) onSelectOption(opt.id);
          });
        });

        return; // Grup için tüm üye pinleri ve geometrileri çizildi, sahte orta nokta atlandı!
      }

      // --- STANDART TEKİL SEÇENEK DURUMU ---
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

      // Aynı koordinata birden fazla kez pin basılmasını kesinlikle engelle
      const singleCoordKey = `${lat.toFixed(3)},${lng.toFixed(3)}`;
      if (placedMarkerCoords.has(singleCoordKey)) return;
      placedMarkerCoords.add(singleCoordKey);

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
              color: choiceColor.main,
              weight: 2.2,
              fillColor: choiceColor.main,
              fillOpacity: 0.28,
              className: 'city-choice-polygon'
            },
            onEachFeature: (feature, layer) => {
              layer.optionId = opt.id;
              layer.on('click', () => {
                if (onSelectOption) onSelectOption(opt.id);
              });
              layer.on('mouseover', () => {
                if (this._isAnsweredQuestion) return;
                layer.setStyle({
                  weight: 3.2,
                  color: choiceColor.main,
                  fillOpacity: 0.6
                });
              });
              layer.on('mouseout', () => {
                if (this._isAnsweredQuestion) return;
                geoLayer.resetStyle(layer);
              });
            }
          }).addTo(this.multiChoiceLayerGroup);
          geoLayer.optionId = opt.id;
        }
      } else if (shapeType === 'polyline' && opt.coordinates && Array.isArray(opt.coordinates[0])) {
        geometriVar = true;
        const polyline = L.polyline(opt.coordinates, {
          color: choiceColor.main,
          weight: 4,
          opacity: 0.75,
          dashArray: '4, 4',
          className: 'polyline-choice-shape'
        }).addTo(this.multiChoiceLayerGroup);
        polyline.optionId = opt.id;
        
        polyline.on('click', () => {
          if (onSelectOption) onSelectOption(opt.id);
        });
      } else if (shapeType === 'polygon' && opt.coordinates && Array.isArray(opt.coordinates[0])) {
        geometriVar = true;
        const polygon = L.polygon(opt.coordinates, {
          color: choiceColor.main,
          weight: 2.2,
          fillColor: choiceColor.main,
          fillOpacity: 0.25,
          className: 'polygon-choice-shape'
        }).addTo(this.multiChoiceLayerGroup);
        polygon.optionId = opt.id;

        polygon.on('click', () => {
          if (onSelectOption) onSelectOption(opt.id);
        });
      }

      const isLinear = shapeType === 'polyline';
      const isArea = shapeType === 'polygon' || opt.category === 'sehirler' || opt.category === 'bolgeler';
      const isPoint = !isLinear && !isArea;
      const shapeClass = isLinear ? 'shape-linear' : (isArea ? 'shape-area' : 'shape-point');

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

      let cityName = '';
      if (isPoint) {
        cityName = this.findCityName(opt);
      }
      const useCity = this.pinCityEnabled && isPoint && !!cityName;
      const labelDisplay = useCity ? cityName : roman;
      const cityBadgeClass = useCity ? 'choice-pin-city-badge' : '';
      const cityNameClass = useCity ? 'choice-pin-city-name' : '';

      // Harfli ve Roma rakamlı veya şehir isimli şık pini
      const badgeHtml = `
        <div class="choice-pin-container ${durumSiniflari}" 
             data-id="${escAttr(opt.id)}" 
             data-index="${index}"
             data-letter="${escAttr(letter)}" 
             data-roman="${escAttr(roman)}" 
             data-city="${escAttr(cityName)}"
             style="--choice-color: ${choiceColor.main}; --choice-glow: ${choiceColor.glow}; --choice-bg: ${choiceColor.bg};">
          <div class="choice-pin-badge ${cityBadgeClass}">
            <span class="choice-pin-letter">${letter}</span>
            <span class="choice-pin-roman ${cityNameClass}">${labelDisplay}</span>
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

  // Çoklu Seçenek Cevap Renklendirmesi (Pinler ve Şehir/Geometri Poligonları)
  highlightMultiChoiceAnswer(correctId, selectedId) {
    this._isAnsweredQuestion = true;

    // 1. Harita üzerindeki şık rozetleri (pinler)
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

    // 2. Harita üzerindeki şehir poligonları ve çizim şekilleri (Glow Efektleri)
    if (this.multiChoiceLayerGroup) {
      this.multiChoiceLayerGroup.eachLayer(layer => {
        const updateVectorStyle = (l) => {
          const id = l.optionId || (l.feature && l.feature.properties && (l.feature.properties.id || l.feature.properties.name));
          if (!id) return;

          const isCorrect = (id === correctId);
          const isSelectedWrong = (id === selectedId && selectedId !== correctId);

          if (isCorrect) {
            if (typeof l.setStyle === 'function') {
              l.setStyle({
                color: '#10b981',
                weight: 4.5,
                fillColor: '#10b981',
                fillOpacity: 0.72
              });
            }
            if (l._path) {
              l._path.classList.remove('wrong-choice-polygon', 'glow-red-polygon', 'dimmed-choice-polygon', 'city-choice-polygon');
              l._path.classList.add('correct-choice-polygon', 'glow-green-polygon');
            }
            if (l.bringToFront) l.bringToFront();
          } else if (isSelectedWrong) {
            if (typeof l.setStyle === 'function') {
              l.setStyle({
                color: '#ef4444',
                weight: 4.5,
                fillColor: '#ef4444',
                fillOpacity: 0.72
              });
            }
            if (l._path) {
              l._path.classList.remove('correct-choice-polygon', 'glow-green-polygon', 'dimmed-choice-polygon', 'city-choice-polygon');
              l._path.classList.add('wrong-choice-polygon', 'glow-red-polygon');
            }
            if (l.bringToFront) l.bringToFront();
          } else {
            if (typeof l.setStyle === 'function') {
              l.setStyle({
                color: 'rgba(148, 163, 184, 0.25)',
                weight: 1.2,
                fillColor: 'rgba(15, 23, 42, 0.35)',
                fillOpacity: 0.12
              });
            }
            if (l._path) {
              l._path.classList.remove('correct-choice-polygon', 'glow-green-polygon', 'wrong-choice-polygon', 'glow-red-polygon');
              l._path.classList.add('dimmed-choice-polygon');
            }
          }
        };

        if (typeof layer.eachLayer === 'function') {
          layer.eachLayer(updateVectorStyle);
        } else {
          updateVectorStyle(layer);
        }
      });
    }
  }

  // Tekil Konum Sorusu Cevap Renklendirmesi (Konumdan İsim Bul Modu)
  highlightSingleChoiceAnswer(isCorrect) {
    this._isAnsweredQuestion = true;

    if (this.currentShapeLayer) {
      const updateSingleStyle = (l) => {
        if (isCorrect) {
          if (typeof l.setStyle === 'function') {
            l.setStyle({
              color: '#10b981',
              weight: 4.5,
              fillColor: '#10b981',
              fillOpacity: 0.72
            });
          }
          if (l._path) {
            l._path.classList.remove('animated-pulse-polygon', 'glow-red-polygon', 'wrong-choice-polygon');
            l._path.classList.add('correct-choice-polygon', 'glow-green-polygon');
          }
        } else {
          if (typeof l.setStyle === 'function') {
            l.setStyle({
              color: '#ef4444',
              weight: 4.5,
              fillColor: '#ef4444',
              fillOpacity: 0.72
            });
          }
          if (l._path) {
            l._path.classList.remove('animated-pulse-polygon', 'glow-green-polygon', 'correct-choice-polygon');
            l._path.classList.add('wrong-choice-polygon', 'glow-red-polygon');
          }
        }
      };

      if (typeof this.currentShapeLayer.eachLayer === 'function') {
        this.currentShapeLayer.eachLayer(updateSingleStyle);
      } else {
        updateSingleStyle(this.currentShapeLayer);
      }
    }
  }

  /**
   * Sik pinlerini ve poligonlarini panel butonlariyla AYNI duruma getirir.
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

    if (this.multiChoiceLayerGroup) {
      this.multiChoiceLayerGroup.eachLayer(layer => {
        const updateVectorState = (l) => {
          const id = l.optionId || (l.feature && l.feature.properties && (l.feature.properties.id || l.feature.properties.name));
          if (!id || !states[id]) return;
          const st = states[id].state;
          if (st === 'correct') {
            if (typeof l.setStyle === 'function') l.setStyle({ color: '#10b981', weight: 4.5, fillColor: '#10b981', fillOpacity: 0.72 });
            if (l._path) { l._path.classList.remove('glow-red-polygon', 'dimmed-choice-polygon'); l._path.classList.add('glow-green-polygon'); }
            if (l.bringToFront) l.bringToFront();
          } else if (st === 'wrong') {
            if (typeof l.setStyle === 'function') l.setStyle({ color: '#ef4444', weight: 4.5, fillColor: '#ef4444', fillOpacity: 0.72 });
            if (l._path) { l._path.classList.remove('glow-green-polygon', 'dimmed-choice-polygon'); l._path.classList.add('glow-red-polygon'); }
            if (l.bringToFront) l.bringToFront();
          } else if (st === 'dim') {
            if (typeof l.setStyle === 'function') l.setStyle({ color: 'rgba(148, 163, 184, 0.25)', weight: 1.2, fillColor: 'rgba(15, 23, 42, 0.35)', fillOpacity: 0.12 });
            if (l._path) { l._path.classList.remove('glow-green-polygon', 'glow-red-polygon'); l._path.classList.add('dimmed-choice-polygon'); }
          }
        };
        if (typeof layer.eachLayer === 'function') layer.eachLayer(updateVectorState);
        else updateVectorState(layer);
      });
    }
  }

  clearQuestionHighlight() {
    this._isAnsweredQuestion = false;
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
    if (this.networkLayerGroup) {
      this.networkLayerGroup.clearLayers();
    }
  }

  /**
   * Soru cevaplandığında (doğru veya yanlış) o madene/gruba bağlı TÜM noktaları
   * ve bağlantı ağını (network) haritada aydınlatır ve gösterir.
   */
  revealFullGroupNetwork(item, isCorrect = true) {
    if (!item) return;
    const members = (item.isGroup && Array.isArray(item.groupItems) && item.groupItems.length > 0)
      ? item.groupItems
      : null;

    if (!members || members.length <= 1) return;

    if (this.networkLayerGroup) {
      this.networkLayerGroup.clearLayers();
    }

    const points = [];
    const boundsCoords = [];
    const netColor = isCorrect ? '#22c55e' : '#38bdf8';
    const badgeClass = isCorrect ? 'network-correct' : 'network-highlight';

    members.forEach(member => {
      const lat = member.lat;
      const lng = member.lng;
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

      points.push([lat, lng]);
      boundsCoords.push([lat, lng]);

      const customIcon = this.getCustomCategoryIcon(member);
      const origHtml = (customIcon.options && customIcon.options.html) || '<div class="pulse-circle"></div>';
      const memberCity = this.findCityName(member) || member.city || member.region || member.name;

      const revealIcon = L.divIcon({
        className: 'network-reveal-icon',
        html: `
          <div class="network-reveal-wrapper ${badgeClass}">
            <div class="network-pulse-ring"></div>
            ${origHtml}
            <span class="network-item-label">${memberCity}</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker([lat, lng], { icon: revealIcon });
      marker.bindTooltip(`<b>${member.name}</b><br><small style="color:#cbd5e1">${member.city || ''} (${member.region || ''})</small>`, { sticky: true });
      this.networkLayerGroup.addLayer(marker);

      // Ek poligon/çizgisel koordinatı varsa çiz
      if (member.shapeType === 'polygon' && Array.isArray(member.coordinates) && Array.isArray(member.coordinates[0])) {
        L.polygon(member.coordinates, {
          color: netColor,
          weight: 2.5,
          fillColor: netColor,
          fillOpacity: 0.35,
          className: 'animated-pulse-polygon'
        }).addTo(this.networkLayerGroup);
      } else if (member.shapeType === 'polyline' && Array.isArray(member.coordinates) && Array.isArray(member.coordinates[0])) {
        L.polyline(member.coordinates, {
          color: netColor,
          weight: 4.5,
          opacity: 0.85,
          className: 'animated-pulse-polyline'
        }).addTo(this.networkLayerGroup);
      }
    });

    // Noktalar arası bağlantı ağı (TSP döngüsü)
    if (points.length === 2) {
      const line = L.polyline(points, {
        color: netColor,
        weight: 3.5,
        opacity: 0.9,
        dashArray: '6, 6',
        className: 'animated-network-line'
      });
      this.networkLayerGroup.addLayer(line);
    } else if (points.length >= 3) {
      const visited = [0];
      const remaining = [];
      for (let i = 1; i < points.length; i++) remaining.push(i);
      while (remaining.length > 0) {
        const last = visited[visited.length - 1];
        let bestDist = Infinity, bestIdx = 0, bestRemIdx = 0;
        for (let r = 0; r < remaining.length; r++) {
          const cand = remaining[r];
          const d = Math.hypot(points[last][0] - points[cand][0], points[last][1] - points[cand][1]);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = cand;
            bestRemIdx = r;
          }
        }
        visited.push(bestIdx);
        remaining.splice(bestRemIdx, 1);
      }
      visited.push(visited[0]);
      const orderedPoints = visited.map(i => points[i]);
      const line = L.polyline(orderedPoints, {
        color: netColor,
        weight: 3.5,
        opacity: 0.9,
        dashArray: '6, 6',
        className: 'animated-network-line'
      });
      this.networkLayerGroup.addLayer(line);
    }

    if (this.autoZoomEnabled && boundsCoords.length > 0) {
      this.flyToBoundsSafely(L.latLngBounds(boundsCoords).pad(0.35));
    }
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

    const flatItems = [];
    items.forEach(it => {
      if (it.isGroup && Array.isArray(it.groupItems)) {
        it.groupItems.forEach(sub => flatItems.push(sub));
      } else {
        flatItems.push(it);
      }
    });

    const ortak = { pane: 'cizimReferans', interactive: false };
    let cizilen = 0;

    flatItems.forEach(item => {
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

    const groupBtn = item.groupId
      ? `<button type="button" class="popup-act unlink-btn" data-pop-act="unlink"
                data-pop-id="${escAttr(item.id)}" title="Bu elemanın grup bağlantısını koparır">🔗 Bağı Kopar</button>`
      : '';

    return `
      <div class="popup-actions">
        ${rozet}
        ${groupTag}
        ${groupBtn}
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

  /** Keşif modundaki çoklu kayıt balonu (Aynı konumda veya bağlı grupta birden fazla ürün/varlık olduğunda) */
  _multiItemPopupHtml(items, cityName = null) {
    if (!items || items.length === 0) return '';
    if (items.length === 1) return this._popupHtml(items[0]);

    const title = cityName || items[0].city || items[0].region || 'Bu Konumdaki Varlıklar';
    return `
      <div class="multi-popup-header">
        <span class="multi-popup-city-icon">📍</span>
        <span class="multi-popup-city-name">${title}</span>
        <span class="multi-popup-badge">${items.length} Varlık</span>
      </div>
      <div class="multi-item-popup-container">
        ${items.map((it) => `
          <div class="multi-popup-card">
            <div class="popup-title">${it.name}</div>
            <div class="popup-type">${it.type} (${it.region || ''})</div>
            <div class="popup-text">${it.kpssNot || ''}</div>
            ${this._popupActions(it)}
          </div>
        `).join('')}
      </div>
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

    // Helper: Bir elemanın temsilci merkez koordinatını döndür
    const getTargetLatLng = (it) => {
      if (!it) return null;
      if (Number.isFinite(it.lat) && Number.isFinite(it.lng)) return [it.lat, it.lng];
      if (it.geom && Number.isFinite(it.geom.lat) && Number.isFinite(it.geom.lng)) return [it.geom.lat, it.geom.lng];
      const coords = it.coordinates || it.points || (it.geom && it.geom.c);
      if (Array.isArray(coords) && coords.length > 0) {
        let sumLat = 0, sumLng = 0, count = 0;
        coords.forEach(p => {
          if (Array.isArray(p) && p.length >= 2) {
            sumLat += p[0];
            sumLng += p[1];
            count++;
          }
        });
        if (count > 0) return [sumLat / count, sumLng / count];
      }
      return null;
    };

    layer.on('mousedown', (e) => {
      if (e.originalEvent && e.originalEvent.button !== 0) return; // Yalnızca sol tık
      
      const startX = e.originalEvent.clientX;
      const startY = e.originalEvent.clientY;
      const startCoord = getTargetLatLng(item) || (e.latlng ? [e.latlng.lat, e.latlng.lng] : null);
      if (!startCoord) return;

      let isDragging = false;
      let hoveredTarget = null;
      let laserLine = null;

      const onMouseMove = (ev) => {
        const dist = Math.hypot(ev.clientX - startX, ev.clientY - startY);
        if (dist > 8 && !isDragging) {
          isDragging = true;
          this.map.dragging.disable();
          this.map.getContainer().classList.add('linking-drag-mode');
          laserLine = L.polyline([startCoord, this.map.mouseEventToLatLng(ev)], {
            color: '#8b5cf6',
            weight: 3.5,
            dashArray: '6, 6',
            opacity: 0.9,
            className: 'laser-drag-line'
          }).addTo(this.map);
        }

        if (isDragging && laserLine) {
          const currentLatLng = this.map.mouseEventToLatLng(ev);
          laserLine.setLatLngs([startCoord, currentLatLng]);

          // En yakın hedef elemanı bul
          hoveredTarget = null;
          let minPixelDist = 55;
          (allItems || []).forEach(other => {
            if (other.id === item.id) return;
            const otherCoord = getTargetLatLng(other);
            if (!otherCoord) return;

            const otherPt = this.map.latLngToContainerPoint(otherCoord);
            const pDist = Math.hypot(ev.clientX - otherPt.x, ev.clientY - otherPt.y);
            if (pDist < minPixelDist) {
              minPixelDist = pDist;
              hoveredTarget = other;
            }
          });

          if (hoveredTarget) {
            laserLine.setStyle({ color: '#10b981', weight: 4.5, dashArray: null });
          } else {
            laserLine.setStyle({ color: '#8b5cf6', weight: 3.5, dashArray: '6, 6' });
          }
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

    // 0. Kompozit veya birleşik grup nesnelerini tekil alt çizimlere aç (flatten)
    const flatItems = [];
    (items || []).forEach(it => {
      if (it.isGroup && Array.isArray(it.groupItems)) {
        it.groupItems.forEach(sub => flatItems.push(sub));
      } else {
        flatItems.push(it);
      }
    });

    const getCenterLatLng = (it) => {
      if (!it) return null;
      if (Number.isFinite(it.lat) && Number.isFinite(it.lng)) return [it.lat, it.lng];
      if (it.geom && Number.isFinite(it.geom.lat) && Number.isFinite(it.geom.lng)) return [it.geom.lat, it.geom.lng];
      const coords = it.coordinates || it.points || (it.geom && it.geom.c);
      if (Array.isArray(coords) && coords.length > 0) {
        let sumLat = 0, sumLng = 0, count = 0;
        coords.forEach(p => {
          if (Array.isArray(p) && p.length >= 2) {
            sumLat += p[0];
            sumLng += p[1];
            count++;
          }
        });
        if (count > 0) return [sumLat / count, sumLng / count];
      }
      return null;
    };

    // 1. Birleşik / Gruplanmış elemanlar arasında zarif bağlantı çizgileri çiz
    const groupMap = new Map();
    flatItems.forEach(it => {
      if (it.groupId) {
        if (!groupMap.has(it.groupId)) groupMap.set(it.groupId, []);
        groupMap.get(it.groupId).push(it);
      }
    });

    groupMap.forEach((members, gId) => {
      if (members.length >= 2) {
        for (let i = 0; i < members.length; i++) {
          if (members.length === 2 && i === 1) break; // 2 üye için tek çizgi yeterli
          const nextIdx = (i + 1) % members.length;
          const p1 = getCenterLatLng(members[i]);
          const p2 = getCenterLatLng(members[nextIdx]);
          if (p1 && p2 && Number.isFinite(p1[0]) && Number.isFinite(p1[1]) && Number.isFinite(p2[0]) && Number.isFinite(p2[1])) {
            const groupLine = L.polyline([p1, p2], {
              color: '#a855f7',
              weight: 2.8,
              dashArray: '8, 8',
              opacity: 0.85,
              className: 'group-connection-line'
            });
            groupLine.bindTooltip(`🔗 Birleşik Grup (${members.length} Üye): <b>${members[i].name}</b> ↔ <b>${members[nextIdx].name}</b>`, { sticky: true });
            this.exploreLayerGroup.addLayer(groupLine);
          }
        }
      }
    });

    // 2. Noktasal elemanları koordinatlarına göre grupla (Aynı il/konumdaki çoklu varlıklar için)
    const pointCoordMap = new Map();
    const otherItems = [];

    flatItems.forEach(item => {
      if (item.category === 'sehirler') {
        otherItems.push(item);
        return;
      }

      const shapeType = item.shapeType || 'point';
      const isPoint = shapeType === 'point' || !item.coordinates || !Array.isArray(item.coordinates[0]);

      if (isPoint && Number.isFinite(item.lat) && Number.isFinite(item.lng)) {
        const key = `${item.lat.toFixed(3)},${item.lng.toFixed(3)}`;
        if (!pointCoordMap.has(key)) pointCoordMap.set(key, []);
        pointCoordMap.get(key).push(item);
      } else {
        otherItems.push(item);
      }
    });

    // 3. Noktasal elemanları haritaya bas (Tekil veya Çoklu Rozetli)
    pointCoordMap.forEach((groupItems) => {
      const firstItem = groupItems[0];
      const count = groupItems.length;

      if (count === 1) {
        const customIcon = this.getCustomCategoryIcon(firstItem);
        const popupContent = this._popupHtml(firstItem);
        const marker = this.isLakePoint(firstItem)
          ? this.createLakeCircle(firstItem, false)
          : L.marker([firstItem.lat, firstItem.lng], { icon: customIcon });
        marker.bindPopup(popupContent, { maxWidth: 280 });
        this._enableDragLinking(marker, firstItem, flatItems);
        this.exploreLayerGroup.addLayer(marker);
      } else {
        // Çoklu eleman: Üst üste binmeyi önlemek için tekil rozetli marker ve birleşik popup
        const baseIcon = this.getCustomCategoryIcon(firstItem);
        const origHtml = (baseIcon.options && baseIcon.options.html) || '<div class="pulse-circle"></div>';
        const badgeHtml = `<span class="marker-count-badge" title="${count} Varlık / Ürün">${count}</span>`;
        const multiIcon = L.divIcon({
          className: ((baseIcon.options && baseIcon.options.className) || '') + ' multi-item-marker-icon',
          html: `<div class="multi-point-marker-wrapper">${origHtml}${badgeHtml}</div>`,
          iconSize: (baseIcon.options && baseIcon.options.iconSize) || [32, 32],
          iconAnchor: (baseIcon.options && baseIcon.options.iconAnchor) || [16, 32],
          popupAnchor: (baseIcon.options && baseIcon.options.popupAnchor) || [0, -32]
        });

        const cityName = this.findCityName(firstItem) || firstItem.city || firstItem.region;
        const popupContent = this._multiItemPopupHtml(groupItems, cityName);
        const marker = L.marker([firstItem.lat, firstItem.lng], { icon: multiIcon });
        marker.bindPopup(popupContent, { maxWidth: 340, maxHeight: 420, className: 'multi-item-leaflet-popup' });
        this._enableDragLinking(marker, firstItem, flatItems);
        this.exploreLayerGroup.addLayer(marker);
      }
    });

    // 4. Çizgisel, Alansal ve Şehir sınırlarını haritaya bas
    otherItems.forEach(item => {
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
              this._enableDragLinking(layer, item, flatItems);
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

      if (shapeType === 'polyline') {
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
        this._enableDragLinking(line, item, flatItems);
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
        this._enableDragLinking(polygon, item, flatItems);
        this.exploreLayerGroup.addLayer(polygon);

        if (item.lat && item.lng) {
          const centerMarker = L.marker([item.lat, item.lng], { icon: customIcon });
          centerMarker.bindPopup(popupContent, { maxWidth: 280 });
          this._enableDragLinking(centerMarker, item, flatItems);
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
