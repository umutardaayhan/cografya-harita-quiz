/**
 * Leaflet Harita Yönetimi
 */

class GeographyMap {
  constructor(mapContainerId) {
    this.containerId = mapContainerId;
    this.map = null;
    this.currentMarker = null;
    this.exploreLayerGroup = L.layerGroup();
    this.isTopoLayer = false;
    
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

    // Varsayılan hafif / modern katman
    this.lightTileLayer.addTo(this.map);
    this.exploreLayerGroup.addTo(this.map);

    // Zoom kontrolünü sağ üste al
    L.control.zoom({ position: 'topright' }).addTo(this.map);
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

  // Soru için parlayan pin koy ve oraya odaklan
  highlightQuestionLocation(lat, lng) {
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }

    const pulseIcon = L.divIcon({
      className: 'pulse-marker-icon',
      html: '<div class="pulse-circle"></div>',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });

    this.currentMarker = L.marker([lat, lng], { icon: pulseIcon }).addTo(this.map);

    // Yumuşak odaklanma
    this.map.flyTo([lat, lng], Math.max(this.map.getZoom(), 7.2), {
      duration: 0.8,
      easeLinearity: 0.25
    });
  }

  // Tüm Türkiye'yi görecek şekilde haritayı sıfırla
  resetView() {
    this.map.flyTo([39.0, 35.3], 6.4, { duration: 0.8 });
  }

  // Keşif modunda tüm kategori noktalarını haritaya yerleştir
  showAllPoints(items, color = '#3b82f6') {
    this.clearAll();

    items.forEach(item => {
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
        <div class="popup-text">${item.kpssNot}</div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280 });
      this.exploreLayerGroup.addLayer(marker);
    });

    this.resetView();
  }

  clearAll() {
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
      this.currentMarker = null;
    }
    this.exploreLayerGroup.clearLayers();
  }
}
