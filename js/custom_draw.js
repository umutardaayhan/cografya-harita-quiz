/**
 * Özel Çizim ve Kullanıcı Harita Katmanı Yöneticisi
 * - Hem Bağımsız Çizimler (Özel Çizimlerim) hem de Gömülü Kategorilere (Dağlar, Ovalar, Platolar, vb.) Yeni Şekil Ekleme Desteği
 * - Nokta (Point), Çizgi (Polyline), Geometrik Alan (Polygon) destekler.
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

  // Yeni çizim öğesi ekle (İsteğe bağlı hedef kategori ile: 'daglar', 'ovalar', 'platolar', 'su_kaynaklari', 'gecitler', 'ozel_cizimler')
  addDrawing(item) {
    const targetCategory = item.category || 'ozel_cizimler';

    const newDrawing = {
      id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      name: item.name.trim(),
      category: targetCategory,
      shapeType: item.shapeType, // 'point', 'polyline', 'polygon'
      coordinates: item.coordinates, // LatLng array veya single [lat, lng]
      lat: item.shapeType === 'point' ? item.coordinates[0] : this.calculateCenter(item.coordinates)[0],
      lng: item.shapeType === 'point' ? item.coordinates[1] : this.calculateCenter(item.coordinates)[1],
      type: item.type || 'Özel İşaret',
      region: item.region || 'Özel Konum',
      color: item.color || '#8b5cf6',
      kpssNot: item.kpssNot || 'Kullanıcı tarafından oluşturulan özel not.',
      isCustomUserAdded: true,
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

  // Belirli bir kategoriye ait kullanıcı çizimlerini getir
  getDrawingsByCategory(categoryKey) {
    if (categoryKey === 'ozel_cizimler') {
      return this.getQuizItems();
    }
    return this.drawings
      .filter(d => d.category === categoryKey)
      .map(d => ({
        id: d.id,
        name: d.name,
        category: d.category,
        shapeType: d.shapeType,
        coordinates: d.coordinates,
        lat: d.lat,
        lng: d.lng,
        type: d.type,
        region: d.region,
        color: d.color,
        kpssNot: d.kpssNot,
        isCustomUserAdded: true
      }));
  }

  // Tüm çizimleri Quiz motorunun anlayacağı formata çevir
  getQuizItems() {
    return this.drawings.map(d => ({
      id: d.id,
      name: d.name,
      category: d.category || 'ozel_cizimler',
      shapeType: d.shapeType,
      coordinates: d.coordinates,
      lat: d.lat,
      lng: d.lng,
      type: d.type,
      region: d.region,
      color: d.color,
      kpssNot: d.kpssNot,
      isCustomUserAdded: true
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

    return [
      Number((latSum / coords.length).toFixed(5)),
      Number((lngSum / coords.length).toFixed(5))
    ];
  }

  // JSON Dışa Aktar
  exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.drawings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kpss_harita_cizimlerim_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  // JSON İçe Aktar (NotebookLM veya dosya çıktısı)
  importJSON(jsonString) {
    try {
      let data = JSON.parse(jsonString);
      if (!Array.isArray(data)) {
        if (data && typeof data === 'object') {
          // Eğer tek bir obje veya sarmalanmış liste ise
          if (Array.isArray(data.items)) data = data.items;
          else if (Array.isArray(data.drawings)) data = data.drawings;
          else data = [data];
        } else {
          throw new Error('Geçersiz JSON formatı. Dizi (Array) bekleniyor.');
        }
      }

      let addedCount = 0;
      data.forEach(item => {
        if (item.name && (item.coordinates || (item.lat && item.lng))) {
          let coords = item.coordinates;
          let shapeType = item.shapeType || 'point';

          if (!coords && item.lat && item.lng) {
            coords = [item.lat, item.lng];
            shapeType = 'point';
          }

          this.addDrawing({
            name: item.name,
            category: item.category || 'ozel_cizimler',
            shapeType: shapeType,
            coordinates: coords,
            type: item.type || 'Özel Konum',
            region: item.region || 'Türkiye',
            color: item.color || '#8b5cf6',
            kpssNot: item.kpssNot || item.note || 'İçe aktarılan yer şekli.'
          });
          addedCount++;
        }
      });

      return { success: true, count: addedCount };
    } catch (e) {
      console.error('JSON Import Hatası:', e);
      return { success: false, error: e.message };
    }
  }
}
