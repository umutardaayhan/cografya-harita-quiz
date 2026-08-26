/**
 * 🎨 Özel Çizim ve Çoklu Harita Yöneticisi (CustomDrawManager)
 * - Birden Fazla Bağımsız Çizim Haritası Oluşturma, İsimlendirme ve Yönetme
 * - Temassız / Ayrık Bölgeleri (Örn: Yayla Evleri) Sürükle-Bırak ile Tek Bir Soru/Cevap Olarak Birleştirme (Grouping / Linking)
 * - Nokta (Point), Çizgi (Polyline), Geometrik Alan (Polygon) desteği
 * - Tam Geriye Dönük Uyumluluk ve JSON İçe/Dışa Aktarma
 */

class CustomDrawManager {
  constructor() {
    this.storageKey = 'kpss_cografya_custom_drawings';
    this.state = this.loadState();
  }

  // =========================================================================
  // DEPOLAMA & GERİYE DÖNÜK UYUMLULUK (MIGRATION)
  // =========================================================================
  loadState() {
    const saved = localStorage.getItem(this.storageKey);
    const defaultState = {
      activeMapId: 'map_default',
      maps: [
        {
          id: 'map_default',
          name: 'Varsayılan Harita',
          createdAt: new Date().toISOString(),
          drawings: []
        }
      ]
    };

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Eski format: Düz dizi [...]
        if (Array.isArray(parsed)) {
          return {
            activeMapId: 'map_default',
            maps: [
              {
                id: 'map_default',
                name: 'Özel Çizimlerim',
                createdAt: new Date().toISOString(),
                drawings: parsed
              }
            ]
          };
        }
        // Yeni format: { activeMapId, maps }
        if (parsed && typeof parsed === 'object' && Array.isArray(parsed.maps) && parsed.maps.length > 0) {
          if (!parsed.activeMapId || !parsed.maps.some(m => m.id === parsed.activeMapId)) {
            parsed.activeMapId = parsed.maps[0].id;
          }
          return parsed;
        }
      } catch (e) {
        console.error('Özel çizimler yüklenirken hata:', e);
      }
    }
    return defaultState;
  }

  saveState() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
  }

  // =========================================================================
  // HARİTA YÖNETİMİ (ÇOKLU HARİTA DESTEĞİ)
  // =========================================================================
  getMaps() {
    return this.state.maps.map(m => ({
      id: m.id,
      name: m.name,
      count: (m.drawings || []).length,
      createdAt: m.createdAt
    }));
  }

  getActiveMap() {
    let map = this.state.maps.find(m => m.id === this.state.activeMapId);
    if (!map) {
      map = this.state.maps[0];
      this.state.activeMapId = map.id;
      this.saveState();
    }
    if (!Array.isArray(map.drawings)) map.drawings = [];
    return map;
  }

  switchMap(mapId) {
    const exists = this.state.maps.some(m => m.id === mapId);
    if (exists) {
      this.state.activeMapId = mapId;
      this.saveState();
      return true;
    }
    return false;
  }

  createMap(name) {
    const cleanName = (name && name.trim()) || `Harita ${this.state.maps.length + 1}`;
    const newMap = {
      id: 'map_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      name: cleanName,
      createdAt: new Date().toISOString(),
      drawings: []
    };
    this.state.maps.push(newMap);
    this.state.activeMapId = newMap.id;
    this.saveState();
    return newMap;
  }

  renameMap(mapId, newName) {
    const cleanName = (newName && newName.trim());
    if (!cleanName) return false;
    const target = this.state.maps.find(m => m.id === mapId);
    if (target) {
      target.name = cleanName;
      this.saveState();
      return true;
    }
    return false;
  }

  deleteMap(mapId) {
    if (this.state.maps.length <= 1) {
      // Tek harita kaldıysa silmek yerine içini boşalt
      const map = this.state.maps[0];
      map.drawings = [];
      map.name = 'Varsayılan Harita';
      this.saveState();
      return { reset: true, map };
    }

    this.state.maps = this.state.maps.filter(m => m.id !== mapId);
    if (this.state.activeMapId === mapId) {
      this.state.activeMapId = this.state.maps[0].id;
    }
    this.saveState();
    return { deleted: true, activeMapId: this.state.activeMapId };
  }

  // =========================================================================
  // ÇİZİM ÖĞELERİ (AKTİF HARİTA İŞLEMLERİ)
  // =========================================================================
  /** Mevcut aktif haritanın çizim listesi (geriye dönük uyumluluk için getter) */
  get drawings() {
    return this.getActiveMap().drawings;
  }

  set drawings(items) {
    this.getActiveMap().drawings = Array.isArray(items) ? items : [];
    this.saveState();
  }

  addDrawing(item, targetMapId = null) {
    const targetMap = targetMapId 
      ? this.state.maps.find(m => m.id === targetMapId) || this.getActiveMap()
      : this.getActiveMap();

    const targetCategory = item.category || 'ozel_cizimler';

    const newDrawing = {
      id: item.id || ('custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5)),
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
      groupId: item.groupId || null, // Birleştirilmiş öğe grup ID'si
      isCustomUserAdded: true,
      createdAt: item.createdAt || new Date().toISOString()
    };

    targetMap.drawings.unshift(newDrawing);
    this.saveState();
    return newDrawing;
  }

  deleteDrawing(id) {
    let found = false;
    this.state.maps.forEach(m => {
      const initialLen = m.drawings.length;
      m.drawings = m.drawings.filter(d => d.id !== id);
      if (m.drawings.length !== initialLen) found = true;
    });
    if (found) this.saveState();
    return found;
  }

  findDrawing(id) {
    if (!id) return null;
    for (const map of this.state.maps) {
      const found = map.drawings.find(d => d.id === id);
      if (found) return found;
    }
    if (typeof COGRAFYA_DATA !== 'undefined') {
      const cats = Object.keys(COGRAFYA_DATA);
      for (let i = 0; i < cats.length; i++) {
        const found = (COGRAFYA_DATA[cats[i]] || []).find(d => d.id === id);
        if (found) return found;
      }
    }
    return null;
  }

  updateDrawing(id, updatedFields) {
    for (const m of this.state.maps) {
      const index = m.drawings.findIndex(d => d.id === id);
      if (index !== -1) {
        m.drawings[index] = { ...m.drawings[index], ...updatedFields };
        if (updatedFields.coordinates && updatedFields.shapeType !== 'point') {
          const center = this.calculateCenter(updatedFields.coordinates);
          if (!Number.isFinite(updatedFields.lat)) m.drawings[index].lat = center[0];
          if (!Number.isFinite(updatedFields.lng)) m.drawings[index].lng = center[1];
        }
        this.saveState();
        return m.drawings[index];
      }
    }
    return null;
  }

  clearAll(mapId = null) {
    if (mapId) {
      const map = this.state.maps.find(m => m.id === mapId);
      if (map) map.drawings = [];
    } else {
      this.getActiveMap().drawings = [];
    }
    this.saveState();
  }

  // =========================================================================
  // BİRLEŞTİRME & AYIRMA SİSTEMİ (LINK / GROUP ENGINE)
  // =========================================================================
  /**
   * İki öğeyi birbirine bağlar veya bağlıysa bağını koparır.
   * @param {string} id1 İlk öğe ID'si
   * @param {string} id2 İkinci öğe ID'si
   * @returns {object} { action: 'linked'|'unlinked', item1, item2, groupId }
   */
  toggleLink(id1, id2) {
    if (typeof toggleUniversalLink === 'function') {
      return toggleUniversalLink(id1, id2);
    }
    const item1 = this.findDrawing(id1);
    const item2 = this.findDrawing(id2);
    if (!item1 || !item2 || id1 === id2) return null;

    // Durum A: İkisi zaten aynı grupta -> BAĞI KOPAR (Unlink)
    if (item1.groupId && item2.groupId && item1.groupId === item2.groupId) {
      const gid = item1.groupId;
      const groupMembers = this.getGroupMembers(gid);

      if (groupMembers.length <= 2) {
        // Grupta sadece ikisi varsa grubun tamamı çözülür
        groupMembers.forEach(m => { m.groupId = null; });
      } else {
        // Grupta ikiden fazla üye varsa sadece item2 gruptan çıkarılır
        item2.groupId = null;
      }
      this.saveState();
      return { action: 'unlinked', item1, item2, groupId: null };
    }

    // Durum B: Birleştir (Link / Merge)
    let targetGroupId = item1.groupId || item2.groupId;
    if (!targetGroupId) {
      targetGroupId = 'grp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }

    // Eğer item2'nin başka bir grubu vardıysa o gruptakiler de bu gruba dahil edilir
    const oldGid2 = item2.groupId;
    item1.groupId = targetGroupId;
    item2.groupId = targetGroupId;

    if (oldGid2 && oldGid2 !== targetGroupId) {
      this.getGroupMembers(oldGid2).forEach(m => {
        m.groupId = targetGroupId;
      });
    }

    this.saveState();
    return { action: 'linked', item1, item2, groupId: targetGroupId };
  }

  getGroupMembers(groupId) {
    if (!groupId) return [];
    const members = [];
    this.state.maps.forEach(m => {
      m.drawings.forEach(d => {
        if (d.groupId === groupId) members.push(d);
      });
    });
    return members;
  }

  // =========================================================================
  // QUIZ & HAVUZ FORMATLAMA (KOMPOZİT GRUP DESTEĞİ)
  // =========================================================================
  getDrawingsByCategory(categoryKey) {
    if (categoryKey === 'ozel_cizimler') {
      return this.getQuizItems();
    }
    return this.drawings.filter(d => d.category === categoryKey);
  }

  /**
   * Tüm çizimleri Quiz motorunun anlayacağı formata çevirir.
   * Aynı groupId'ye sahip olan elemanları tek bir BİRLEŞİK (composite) soru olarak sunar.
   */
  /** Ham çizim listesi — birleştirme YAPILMAZ (motor dışarıda uygular) */
  getRawQuizItems() {
    return this.drawings.map(d => ({ ...d }));
  }

  /**
   * Geriye dönük uyumluluk: eskiden birleştirmeyi bu metot yapıyordu.
   * Artık evrensel motora devrediyor; böylece özel çizimler ve standart
   * paketler AYNI kurallarla birleşiyor.
   */
  getQuizItems() {
    if (typeof gruplaHavuz === 'function') return gruplaHavuz(this.getRawQuizItems());
    return this._eskiGetQuizItems();
  }

  _eskiGetQuizItems() {
    const rawDrawings = this.drawings;
    const processedGroupIds = new Set();
    const result = [];

    rawDrawings.forEach(item => {
      if (item.groupId) {
        if (processedGroupIds.has(item.groupId)) return;
        processedGroupIds.add(item.groupId);

        // Bu gruba ait tüm üyeleri topla
        const members = rawDrawings.filter(d => d.groupId === item.groupId);
        if (members.length === 1) {
          // Grupta tek eleman kalmışsa normal eleman gibi davran
          result.push({ ...members[0] });
          return;
        }

        // Tüm üyelerin ortak merkezini hesapla
        let allLat = 0;
        let allLng = 0;
        members.forEach(m => {
          allLat += m.lat;
          allLng += m.lng;
        });
        const centerLat = Number((allLat / members.length).toFixed(5));
        const centerLng = Number((allLng / members.length).toFixed(5));

        // Birleşik bölgeler metni
        const regions = members
          .map(m => m.region)
          .filter(Boolean)
          .filter((v, i, a) => a.indexOf(v) === i)
          .join(' & ');

        const compositeItem = {
          id: item.groupId, // Soru ID'si grup ID'si olur
          groupId: item.groupId,
          name: item.name,
          category: item.category || 'ozel_cizimler',
          shapeType: 'composite', // Çoklu geometri
          coordinates: members.map(m => m.coordinates),
          lat: centerLat,
          lng: centerLng,
          type: item.type || 'Birleşik Saha',
          region: regions || 'Çoklu Bölge',
          color: item.color || '#8b5cf6',
          kpssNot: members.map(m => m.kpssNot).filter(Boolean).join(' | ') || item.kpssNot,
          isCustomUserAdded: true,
          isGroup: true,
          groupItems: members, // Tüm alt geometriler ve koordinatlar
          memberIds: members.map(m => m.id) // Cevap kontrolünde tanınacak alt ID'ler
        };

        result.push(compositeItem);
      } else {
        result.push({ ...item });
      }
    });

    return result;
  }

  // =========================================================================
  // GEOMETRİK YARDIMCILAR
  // =========================================================================
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

  // =========================================================================
  // JSON İÇE / DIŞA AKTARMA
  // =========================================================================
  exportJSON(allMaps = false) {
    const activeMap = this.getActiveMap();
    const dataToExport = allMaps 
      ? this.state 
      : {
          mapName: activeMap.name,
          createdAt: activeMap.createdAt,
          drawings: activeMap.drawings
        };

    const fileName = allMaps
      ? `kpss_tum_cizim_haritalarim_${new Date().toISOString().slice(0,10)}.json`
      : `kpss_harita_${activeMap.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${new Date().toISOString().slice(0,10)}.json`;

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", fileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  importJSON(jsonString, targetMapName = null) {
    try {
      let data = JSON.parse(jsonString);

      // Çoklu harita yedeği ise
      if (data && typeof data === 'object' && Array.isArray(data.maps)) {
        let totalAdded = 0;
        data.maps.forEach(m => {
          if (m.name && Array.isArray(m.drawings)) {
            const newMap = this.createMap(m.name);
            m.drawings.forEach(d => {
              this.addDrawing(d, newMap.id);
              totalAdded++;
            });
          }
        });
        return { success: true, count: totalAdded, isMultiMap: true };
      }

      // Tekil harita veya düz liste
      if (!Array.isArray(data)) {
        if (data && typeof data === 'object') {
          if (Array.isArray(data.drawings)) {
            if (data.mapName && !targetMapName) targetMapName = data.mapName;
            data = data.drawings;
          } else if (Array.isArray(data.items)) {
            data = data.items;
          } else {
            data = [data];
          }
        } else {
          throw new Error('Geçersiz JSON formatı. Dizi (Array) veya Harita nesnesi bekleniyor.');
        }
      }

      const targetMap = targetMapName ? this.createMap(targetMapName) : this.getActiveMap();
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
            kpssNot: item.kpssNot || item.note || 'İçe aktarılan yer şekli.',
            groupId: item.groupId || null
          }, targetMap.id);
          addedCount++;
        }
      });

      return { success: true, count: addedCount, mapName: targetMap.name };
    } catch (e) {
      console.error('JSON Import Hatası:', e);
      return { success: false, error: e.message };
    }
  }
}
