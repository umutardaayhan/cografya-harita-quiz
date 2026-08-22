/**
 * ⚔️ Harita Fatihi (Türkiye'yi Fethet / Bölge Boyama) Oyun Motoru
 * - Hedefler, oyuna verilen gerçek soru havuzuna göre dinamik hesaplanır (ulaşılamaz hedef yok)
 * - Bölge eşleştirmesi Türkçe "İ/ı" sorununa karşı normalize edilmiştir
 */

class ConquerorGame {
  // Bölge başına ideal fetih hedefi (havuz yetmiyorsa otomatik kısılır)
  static get BASE_GOALS() {
    return {
      "Marmara": 4,
      "Ege": 4,
      "Akdeniz": 4,
      "İç Anadolu": 4,
      "Karadeniz": 4,
      "Doğu Anadolu": 4,
      "Güneydoğu Anadolu": 3
    };
  }

  constructor(mapInstance) {
    this.geoMap = mapInstance;
    this.isActive = false;
    this.conqueredItems = new Set();
    this.regionGoals = { ...ConquerorGame.BASE_GOALS };
    this.regionProgress = {};
    this.victoryShown = false;
    this.itemPool = [];
    this.conquerLayerGroup = L.layerGroup();

    if (this.geoMap && this.geoMap.map) {
      this.conquerLayerGroup.addTo(this.geoMap.map);
    }
  }

  // "İç Anadolu (Konya)" -> "ic anadolu (konya)"
  // Not: JS'in varsayılan toLowerCase'i "İ" harfini "i + U+0307" yaptığı için
  // düz includes('iç anadolu') karşılaştırmaları sessizce başarısız oluyordu.
  normalizeRegion(str) {
    return String(str || '')
      .replace(/İ/g, 'I')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // Eşleşme bulunamazsa null döner (eskiden sessizce "İç Anadolu"ya yazılıyordu)
  matchRegion(itemRegion) {
    const reg = this.normalizeRegion(itemRegion);
    if (!reg) return null;
    if (reg.includes("marmara")) return "Marmara";
    if (reg.includes("ege")) return "Ege";
    if (reg.includes("akdeniz")) return "Akdeniz";
    if (reg.includes("guneydogu")) return "Güneydoğu Anadolu";
    if (reg.includes("dogu anadolu")) return "Doğu Anadolu";
    if (reg.includes("karadeniz")) return "Karadeniz";
    if (reg.includes("ic anadolu")) return "İç Anadolu";
    return null;
  }

  // Hedefleri gerçek havuza göre kur: bir bölgede 2 şekil varsa hedef 2 olur,
  // hiç yoksa o bölge tabloya hiç girmez. Böylece %100 daima ulaşılabilir.
  buildGoals(itemPool) {
    const available = {};
    (itemPool || []).forEach(item => {
      const key = this.matchRegion(item && item.region);
      if (key) available[key] = (available[key] || 0) + 1;
    });

    const base = ConquerorGame.BASE_GOALS;
    this.regionGoals = {};
    Object.keys(base).forEach(reg => {
      const count = available[reg] || 0;
      if (count > 0) {
        this.regionGoals[reg] = Math.min(base[reg], count);
      }
    });

    // Havuz tanınabilir bölge içermiyorsa en azından boş bir tablo yerine varsayılana dön
    if (Object.keys(this.regionGoals).length === 0) {
      this.regionGoals = { ...base };
    }
  }

  start(itemPool) {
    this.isActive = true;
    this.victoryShown = false;
    this.conqueredItems.clear();
    this.itemPool = [...(itemPool || [])];
    this.buildGoals(itemPool);

    this.regionProgress = {};
    Object.keys(this.regionGoals).forEach(reg => {
      this.regionProgress[reg] = 0;
    });

    if (this.geoMap && this.geoMap.map && !this.geoMap.map.hasLayer(this.conquerLayerGroup)) {
      this.conquerLayerGroup.addTo(this.geoMap.map);
    }

    this.conquerLayerGroup.clearLayers();
    this.geoMap.clearAll();
    this.geoMap.resetView();
    return this.getStatus();
  }

  recordConquest(item) {
    if (!this.isActive || !item) return null;
    if (this.conqueredItems.has(item.id)) return this.getStatus();

    this.conqueredItems.add(item.id);

    const regionKey = this.matchRegion(item.region);
    if (regionKey && Object.prototype.hasOwnProperty.call(this.regionGoals, regionKey)) {
      this.regionProgress[regionKey] = (this.regionProgress[regionKey] || 0) + 1;
    }

    if (typeof item.lat === 'number' && typeof item.lng === 'number') {
      const conqueredPin = L.circleMarker([item.lat, item.lng], {
        radius: 7,
        fillColor: '#8b5cf6',
        color: '#ffffff',
        weight: 1.5,
        fillOpacity: 0.9
      }).bindTooltip(`👑 Fethedildi: ${item.name}`, { permanent: false });
      this.conquerLayerGroup.addLayer(conqueredPin);
    }

    return this.getStatus();
  }

  // Hedefi henuz dolmamis bolgelerin, henuz fethedilmemis sekilleri.
  // Sorular buna gore daraltilir; aksi halde son 1-2 bolgeyi tamamlamak
  // 140 soruluk havuzda onlarca tur suruyordu.
  getPendingPool() {
    const pending = this.itemPool.filter(item => {
      if (this.conqueredItems.has(item.id)) return false;
      const key = this.matchRegion(item && item.region);
      if (!key || !Object.prototype.hasOwnProperty.call(this.regionGoals, key)) return false;
      return (this.regionProgress[key] || 0) < this.regionGoals[key];
    });
    return pending.length > 0 ? pending : this.itemPool;
  }

  getStatus() {
    let totalTarget = 0;
    let totalCurrent = 0;
    const regionStats = [];

    for (const [reg, goal] of Object.entries(this.regionGoals)) {
      const current = Math.min(this.regionProgress[reg] || 0, goal);
      totalTarget += goal;
      totalCurrent += current;
      regionStats.push({
        name: reg,
        current: current,
        goal: goal,
        percent: goal > 0 ? Math.round((current / goal) * 100) : 100,
        isCompleted: current >= goal
      });
    }

    const overallPercent = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0;
    const isVictory = totalTarget > 0 && totalCurrent >= totalTarget;

    // Zafer modalı yalnızca bir kez açılsın (kapatıldıktan sonra tekrar açılmasın)
    const isNewVictory = isVictory && !this.victoryShown;
    if (isNewVictory) this.victoryShown = true;

    return {
      overallPercent: overallPercent,
      totalConquered: this.conqueredItems.size,
      regionStats: regionStats,
      isVictory: isVictory,
      isNewVictory: isNewVictory
    };
  }

  exit() {
    this.isActive = false;
    this.victoryShown = false;
    this.itemPool = [];
    this.conquerLayerGroup.clearLayers();
    this.geoMap.clearAll();
  }
}
