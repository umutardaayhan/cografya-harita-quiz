/**
 * Leaflet Harita Yönetimi ve Geometrik Çizim Motoru
 * Desteklenen geometriler: Nokta (Point), Çizgi/Hat (Polyline), Alan/Çokgen (Polygon)
 * Desteklenen Quiz Modları: Tek Konum Vurgulama & Çoklu Seçenek (I, II, III, IV, V / A, B, C, D, E) Harita İşaretçileri
 */

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
        options: { attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 18, minZoom: 5 }
      },
      topo: {
        name: 'Fiziki / Topografik',
        withLabels: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        noLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
        options: { attribution: '&copy; OpenStreetMap &copy; OpenTopoMap / Esri', maxZoom: 17, minZoom: 5 }
      },
      satellite: {
        name: '🛰️ Gerçek Uydu',
        withLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        noLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        options: { attribution: '&copy; Esri &copy; Earthstar Geographics', maxZoom: 18, minZoom: 5 }
      },
      dark: {
        name: '🌙 Gece / Karanlık',
        withLabels: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        noLabels: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
        options: { attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 18, minZoom: 5 }
      },
      terrain: {
        name: '⛰️ Kabartı / Arazi',
        withLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        noLabels: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
        options: { attribution: '&copy; Esri &copy; USGS', maxZoom: 18, minZoom: 5 }
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
    this.map = L.map(this.containerId, {
      center: [39.0, 35.3],
      zoom: 6.4,
      minZoom: 5,
      maxBounds: [
        [34.0, 24.0],
        [43.5, 46.0]
      ],
      maxBoundsViscosity: 0.8,
      zoomControl: false
    });

    if (!this.labelsEnabled) {
      document.body.classList.add('map-no-labels');
    }

    // İlk katmanı yükle
    this.updateTileLayer();

    this.exploreLayerGroup.addTo(this.map);
    this.multiChoiceLayerGroup.addTo(this.map);
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

  // Öğe kategorisine göre en uygun özel ikonu döndür
  getCustomCategoryIcon(item) {
    const cat = item.category || '';
    const typeStr = (item.type || '').toLowerCase();

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
      const icon = this.getCustomCategoryIcon(questionItem);

      this.currentMarker = L.marker([lat, lng], { icon: icon }).addTo(this.map);

      if (this.autoZoomEnabled) {
        this.map.flyTo([lat, lng], Math.max(this.map.getZoom(), 7.2), {
          duration: 0.8,
          easeLinearity: 0.25
        });
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

      // Tepe / Merkez noktasına özel kategori ikonu koy
      if (questionItem.lat && questionItem.lng) {
        const centerIcon = this.getCustomCategoryIcon(questionItem);
        this.currentMarker = L.marker([questionItem.lat, questionItem.lng], { icon: centerIcon }).addTo(this.map);
      }

      if (this.autoZoomEnabled) {
        const bounds = L.latLngBounds(coords);
        this.map.flyToBounds(bounds.pad(0.35), { duration: 0.8 });
      }
    } else if (shapeType === 'polygon') {
      const coords = questionItem.coordinates;

      this.currentShapeLayer = L.polygon(coords, {
        color: '#ef4444',
        weight: 4,
        fillColor: '#ef4444',
        fillOpacity: 0.35,
        className: 'animated-pulse-polygon'
      }).addTo(this.map);

      if (this.autoZoomEnabled) {
        const bounds = L.latLngBounds(coords);
        this.map.flyToBounds(bounds.pad(0.35), { duration: 0.8 });
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
      const bounds = L.latLngBounds(boundsCoords);
      this.map.flyToBounds(bounds.pad(0.35), { duration: 0.8 });
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

  resetView() {
    this.map.flyTo([39.0, 35.3], 6.4, { duration: 0.8 });
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
        const marker = L.marker([item.lat, item.lng], { icon: customIcon });
        const popupContent = `
          <div class="popup-title">${item.name}</div>
          <div class="popup-type">${item.type} (${item.region || ''})</div>
          <div class="popup-text">${item.kpssNot || ''}</div>
        `;
        marker.bindPopup(popupContent, { maxWidth: 280 });
        this.exploreLayerGroup.addLayer(marker);
      } else if (shapeType === 'polyline') {
        let polyColor = color;
        if (isMountain) polyColor = '#d97706';
        else if (isStrait) polyColor = '#0284c7';
        else if (item.category === 'su_kaynaklari') polyColor = '#2563eb';

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

        // Tepe veya merkez noktasına da rozet ikonunu koy
        if (item.lat && item.lng) {
          const centerMarker = L.marker([item.lat, item.lng], { icon: customIcon });
          centerMarker.bindPopup(popupContent, { maxWidth: 280 });
          this.exploreLayerGroup.addLayer(centerMarker);
        }
      } else if (shapeType === 'polygon') {
        const polygon = L.polygon(item.coordinates, {
          color: color,
          weight: 2,
          fillColor: color,
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
