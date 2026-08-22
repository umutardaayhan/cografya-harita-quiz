/**
 * Leaflet Harita Yönetimi ve Geometrik Çizim Motoru
 * Desteklenen geometriler: Nokta (Point), Çizgi/Hat (Polyline), Alan/Çokgen (Polygon)
 */

class GeographyMap {
  constructor(mapContainerId) {
    this.containerId = mapContainerId;
    this.map = null;
    this.currentMarker = null;
    this.currentShapeLayer = null;
    this.exploreLayerGroup = L.layerGroup();
    this.drawingLayerGroup = L.layerGroup();
    this.isTopoLayer = false;
    
    // Aktif çizim durumu
    this.isDrawing = false;
    this.drawingShapeType = null; // 'point', 'polyline', 'polygon'
    this.drawingCoords = [];
    this.drawingPreviewLayer = null;
    this.drawingVertexMarkers = [];
    this.onDrawingComplete = null;

    // Katmanlar
    this.lightTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 18,
      minZoom: 5
    });

    this.topoTileLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap &copy; OpenTopoMap',
      maxZoom: 17,
      minZoom: 5
    });

    this.initMap();
  }

  initMap() {
    // Türkiye merkezli harita başlatma
    this.map = L.map(this.containerId, {
      center: [39.0, 35.3],
      zoom: 6.4,
      minZoom: 5,
      maxBounds: [
        [34.0, 24.0], // Güneybatı sınırları
        [43.5, 46.0]  // Kuzeydoğu sınırları
      ],
      maxBoundsViscosity: 0.8,
      zoomControl: false
    });

    // Katmanları ekle
    this.lightTileLayer.addTo(this.map);
    this.exploreLayerGroup.addTo(this.map);
    this.drawingLayerGroup.addTo(this.map);

    // Zoom kontrolünü sağ üste al
    L.control.zoom({ position: 'topright' }).addTo(this.map);

    // Harita tıklama ve fare hareketi olayları (Çizim modu için)
    this.map.on('click', (e) => this.handleMapClick(e));
    this.map.on('mousemove', (e) => this.handleMouseMove(e));
    this.map.on('dblclick', (e) => {
      if (this.isDrawing && (this.drawingShapeType === 'polyline' || this.drawingShapeType === 'polygon')) {
        L.DomEvent.stopPropagation(e);
        this.finishDrawing();
      }
    });
  }

  toggleMapLayer() {
    this.isTopoLayer = !this.isTopoLayer;
    if (this.isTopoLayer) {
      this.map.removeLayer(this.lightTileLayer);
      this.topoTileLayer.addTo(this.map);
      return 'Fiziki Harita (Aktif)';
    } else {
      this.map.removeLayer(this.topoTileLayer);
      this.lightTileLayer.addTo(this.map);
      return 'Sade Harita (Aktif)';
    }
  }

  // --- SORU VURGULAMA MOTORU (NOKTA, ÇİZGİ, POLİGON DESTEKLİ) ---
  highlightQuestionShape(questionItem) {
    this.clearQuestionHighlight();

    if (!questionItem) return;

    const shapeType = questionItem.shapeType || 'point';

    if (shapeType === 'point' || !questionItem.coordinates || !Array.isArray(questionItem.coordinates[0])) {
      // Nokta Sorusu
      const lat = questionItem.lat;
      const lng = questionItem.lng;

      const pulseIcon = L.divIcon({
        className: 'pulse-marker-icon',
        html: '<div class="pulse-circle"></div>',
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      this.currentMarker = L.marker([lat, lng], { icon: pulseIcon }).addTo(this.map);

      this.map.flyTo([lat, lng], Math.max(this.map.getZoom(), 7.2), {
        duration: 0.8,
        easeLinearity: 0.25
      });
    } else if (shapeType === 'polyline') {
      // Çizgi / Akarsu / Hat Sorusu
      const coords = questionItem.coordinates;
      
      // Parıldayan ana çizgi
      this.currentShapeLayer = L.polyline(coords, {
        color: '#ef4444',
        weight: 6,
        opacity: 0.9,
        className: 'animated-pulse-polyline',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(this.map);

      // Merkez odak ve sınır ayarlama
      const bounds = L.latLngBounds(coords);
      this.map.flyToBounds(bounds.pad(0.35), { duration: 0.8 });
    } else if (shapeType === 'polygon') {
      // Geometrik Alan / Bölge / Havza Sorusu
      const coords = questionItem.coordinates;

      this.currentShapeLayer = L.polygon(coords, {
        color: '#ef4444',
        weight: 4,
        fillColor: '#ef4444',
        fillOpacity: 0.35,
        className: 'animated-pulse-polygon'
      }).addTo(this.map);

      const bounds = L.latLngBounds(coords);
      this.map.flyToBounds(bounds.pad(0.35), { duration: 0.8 });
    }
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
  }

  // Eski fonksiyonla uyumluluk (Nokta)
  highlightQuestionLocation(lat, lng) {
    this.highlightQuestionShape({ shapeType: 'point', lat, lng });
  }

  // Tüm Türkiye'yi görecek şekilde haritayı sıfırla
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

    // Harita imlecini değiştir
    const mapDiv = document.getElementById(this.containerId);
    if (mapDiv) {
      mapDiv.classList.add('drawing-mode-active');
    }
  }

  handleMapClick(e) {
    if (!this.isDrawing) return;

    const latLng = [Number(e.latlng.lat.toFixed(5)), Number(e.latlng.lng.toFixed(5))];

    if (this.drawingShapeType === 'point') {
      // Nokta çizimi tek tıkta biter
      this.addVertexMarker(latLng);
      this.finishDrawing([latLng[0], latLng[1]]);
      return;
    }

    // Çizgi veya Çokgen için köşe ekle
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

    // Minimum köşe kontrolü
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

      if (shapeType === 'point' || !item.coordinates || !Array.isArray(item.coordinates[0])) {
        const pointIcon = L.divIcon({
          className: 'explore-point-marker',
          html: `<div class="explore-point-icon" style="background-color: ${color};"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });

        const marker = L.marker([item.lat, item.lng], { icon: pointIcon });
        const popupContent = `
          <div class="popup-title">${item.name}</div>
          <div class="popup-type">${item.type} (${item.region || ''})</div>
          <div class="popup-text">${item.kpssNot || ''}</div>
        `;
        marker.bindPopup(popupContent, { maxWidth: 280 });
        this.exploreLayerGroup.addLayer(marker);
      } else if (shapeType === 'polyline') {
        const line = L.polyline(item.coordinates, {
          color: color,
          weight: 4,
          opacity: 0.85
        });
        const popupContent = `
          <div class="popup-title">${item.name}</div>
          <div class="popup-type">${item.type} (${item.region || 'Çizgi/Hat'})</div>
          <div class="popup-text">${item.kpssNot || ''}</div>
        `;
        line.bindPopup(popupContent, { maxWidth: 280 });
        this.exploreLayerGroup.addLayer(line);
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
