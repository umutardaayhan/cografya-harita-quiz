/**
 * Özel Çizim ve Kullanıcı Harita Katmanı Yöneticisi
 * Nokta (Point), Çizgi (Polyline), Geometrik Alan (Polygon) destekler.
 */

class CustomDrawManager {
  constructor() {
    this.storageKey = 'kpss_cografya_custom_drawings';
    this.drawings = this.loadDrawings();
  }

  loadDrawings() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Özel çizimler yüklenirken hata:', e);
      }
    }
    return [];
  }

  saveDrawings() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.drawings));
  }

  // Yeni çizim öğesi ekle
  addDrawing(item) {
    const newDrawing = {
      id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      name: item.name.trim(),
      shapeType: item.shapeType, // 'point', 'polyline', 'polygon'
      coordinates: item.coordinates, // LatLng array veya single [lat, lng]
      lat: item.shapeType === 'point' ? item.coordinates[0] : this.calculateCenter(item.coordinates)[0],
      lng: item.shapeType === 'point' ? item.coordinates[1] : this.calculateCenter(item.coordinates)[1],
      type: item.type || 'Özel İşaret',
      region: item.region || 'Özel Konum',
      color: item.color || '#f59e0b',
      kpssNot: item.kpssNot || 'Kullanıcı tarafından oluşturulan özel not.',
      createdAt: new Date().toISOString()
    };

    this.drawings.unshift(newDrawing);
    this.saveDrawings();
    return newDrawing;
  }

  // Çizim sil
  deleteDrawing(id) {
    this.drawings = this.drawings.filter(d => d.id !== id);
    this.saveDrawings();
  }

  // Çizim güncelle
  updateDrawing(id, updatedFields) {
    const index = this.drawings.findIndex(d => d.id === id);
    if (index !== -1) {
      this.drawings[index] = { ...this.drawings[index], ...updatedFields };
      this.saveDrawings();
      return this.drawings[index];
    }
    return null;
  }

  // Tüm çizimleri temizle
  clearAll() {
    this.drawings = [];
    this.saveDrawings();
  }

  // Çizimleri Quiz motorunun anlayacağı formata çevir
  getQuizItems() {
    return this.drawings.map(d => ({
      id: d.id,
      name: d.name,
      shapeType: d.shapeType,
      coordinates: d.coordinates,
      lat: d.lat,
      lng: d.lng,
      type: d.type,
      region: d.region,
      color: d.color,
      kpssNot: d.kpssNot
    }));
  }

  // Çokgen veya Çizgi koordinatlarının geometrik merkezini (centroid) hesapla
  calculateCenter(coords) {
    if (!coords || coords.length === 0) return [39.0, 35.0];
    if (!Array.isArray(coords[0])) return coords; // Zaten tekil [lat, lng]

    let latSum = 0;
    let lngSum = 0;
    coords.forEach(pt => {
      latSum += pt[0];
      lngSum += pt[1];
    });

    return [latSum / coords.length, lngSum / coords.length];
  }

  // JSON Dışa Aktarma
  exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.drawings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kpss_ozel_cizimler_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  // JSON İçe Aktarma
  importJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data)) {
        // Temel alanları olan öğeleri filtrele
        const validItems = data.filter(item => item.name && item.shapeType && item.coordinates);
        this.drawings = [...validItems, ...this.drawings];
        this.saveDrawings();
        return { success: true, count: validItems.length };
      }
      return { success: false, error: 'Geçersiz veri formatı.' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
}
