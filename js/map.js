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

    // Aktif çizim durumu
    this.isDrawing = false;
    this.drawingShapeType = null; // 'point', 'polyline', 'polygon'
    this.drawingCoords = [];
    this.drawingPreviewLayer = null;
    this.drawingVertexMarkers = [];
    this.onDrawingComplete = null;

    // Harita Katmanları Havuzu
    this.layers = {
      voyager: {
        name: 'Sade / Renkli',
        layer: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 18,
          minZoom: 5
        })
      },
      topo: {
        name: 'Fiziki / Topografik',
        layer: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap &copy; OpenTopoMap',
          maxZoom: 17,
          minZoom: 5
        })
      },
      satellite: {
        name: '🛰️ Gerçek Uydu',
        layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '&copy; Esri &copy; Earthstar Geographics',
          maxZoom: 18,
          minZoom: 5
        })
      },
      dark: {
        name: '🌙 Gece / Karanlık',
        layer: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 18,
          minZoom: 5
        })
      },
      terrain: {
        name: '⛰️ Kabartı / Arazi',
        layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
          attribution: '&copy; Esri &copy; HERE, DeLorme, USGS, Intermap',
          maxZoom: 18,
          minZoom: 5
        })
      }
    };

    this.activeLayerKey = 'voyager';
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

    // Varsayılan katmanı ekle
    this.layers[this.activeLayerKey].layer.addTo(this.map);
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

  setLayer(layerKey) {
    if (!this.layers[layerKey]) return;

    if (this.layers[this.activeLayerKey]) {
      this.map.removeLayer(this.layers[this.activeLayerKey].layer);
    }

    this.activeLayerKey = layerKey;
    this.layers[layerKey].layer.addTo(this.map);
    return this.layers[layerKey].name;
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

  // --- KLASİK MOD: TEK SORU VURGULAMA MOTORU ---
  highlightQuestionShape(questionItem) {
    this.clearQuestionHighlight();
    if (!questionItem) return;

    const shapeType = questionItem.shapeType || 'point';
    const isMountain = questionItem.category === 'daglar' || (questionItem.type || '').toLowerCase().includes('dağ');

    if (shapeType === 'point' || !questionItem.coordinates || !Array.isArray(questionItem.coordinates[0])) {
      const lat = questionItem.lat;
      const lng = questionItem.lng;

      let icon = null;
      if (isMountain) {
        icon = this.createMountainPrismIcon(questionItem);
      } else {
        icon = L.divIcon({
          className: 'pulse-marker-icon',
          html: '<div class="pulse-circle"></div>',
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });
      }

      this.currentMarker = L.marker([lat, lng], { icon: icon }).addTo(this.map);

      if (this.autoZoomEnabled) {
        this.map.flyTo([lat, lng], Math.max(this.map.getZoom(), 7.2), {
          duration: 0.8,
          easeLinearity: 0.25
        });
      }
    } else if (shapeType === 'polyline') {
      const coords = questionItem.coordinates;
      
      const polyColor = isMountain ? '#f59e0b' : '#ef4444';
      const polyClass = isMountain ? 'mountain-range-polyline' : 'animated-pulse-polyline';

      this.currentShapeLayer = L.polyline(coords, {
        color: polyColor,
        weight: isMountain ? 7 : 6,
        opacity: 0.9,
        className: polyClass,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(this.map);

      // Sıra dağın tepe noktasına 3D Dağ Prizması koy
      if (isMountain && questionItem.lat && questionItem.lng) {
        const prismIcon = this.createMountainPrismIcon(questionItem);
        this.currentMarker = L.marker([questionItem.lat, questionItem.lng], { icon: prismIcon }).addTo(this.map);
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

    const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
    const letters = ['A', 'B', 'C', 'D', 'E'];
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

      if (shapeType === 'point' || !item.coordinates || !Array.isArray(item.coordinates[0])) {
        let markerIcon = null;
        if (isMountain) {
          markerIcon = this.createMountainPrismIcon(item);
        } else {
          markerIcon = L.divIcon({
            className: 'explore-point-marker',
            html: `<div class="explore-point-icon" style="background-color: ${color};"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7]
          });
        }

        const marker = L.marker([item.lat, item.lng], { icon: markerIcon });
        const popupContent = `
          <div class="popup-title">${isMountain ? '🏔️ ' : ''}${item.name}</div>
          <div class="popup-type">${item.type} (${item.region || ''})</div>
          <div class="popup-text">${item.kpssNot || ''}</div>
        `;
        marker.bindPopup(popupContent, { maxWidth: 280 });
        this.exploreLayerGroup.addLayer(marker);
      } else if (shapeType === 'polyline') {
        const polyColor = isMountain ? '#d97706' : color;
        const line = L.polyline(item.coordinates, {
          color: polyColor,
          weight: isMountain ? 5 : 4,
          opacity: 0.9,
          dashArray: isMountain ? '8, 4' : null
        });
        const popupContent = `
          <div class="popup-title">${isMountain ? '🏔️ ' : ''}${item.name}</div>
          <div class="popup-type">${item.type} (${item.region || 'Sıradağ / Hat'})</div>
          <div class="popup-text">${item.kpssNot || ''}</div>
        `;
        line.bindPopup(popupContent, { maxWidth: 280 });
        this.exploreLayerGroup.addLayer(line);

        // Sıra dağın tepe noktasına da 3D Prizma koy
        if (isMountain && item.lat && item.lng) {
          const mountainIcon = this.createMountainPrismIcon(item);
          const peakMarker = L.marker([item.lat, item.lng], { icon: mountainIcon });
          peakMarker.bindPopup(popupContent, { maxWidth: 280 });
          this.exploreLayerGroup.addLayer(peakMarker);
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
      }
    });

    this.resetView();
  }

  clearAll() {
    this.clearQuestionHighlight();
    this.exploreLayerGroup.clearLayers();
    this.drawingLayerGroup.clearLayers();
  }
}
