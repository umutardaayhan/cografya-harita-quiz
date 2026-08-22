/**
 * ⚔️ Harita Fatihi (Türkiye'yi Fethet / Bölge Boyama) Oyun Motoru
 */

class ConquerorGame {
  constructor(mapInstance) {
    this.geoMap = mapInstance;
    this.isActive = false;
    this.conqueredItems = new Set();
    this.regionGoals = {
      "Marmara": 4,
      "Ege": 4,
      "Akdeniz": 4,
      "İç Anadolu": 4,
      "Karadeniz": 4,
      "Doğu Anadolu": 4,
      "Güneydoğu Anadolu": 3
    };
    this.regionProgress = {};
    this.conquerLayerGroup = L.layerGroup();

    if (this.geoMap && this.geoMap.map) {
      this.conquerLayerGroup.addTo(this.geoMap.map);
    }
  }

  start() {
    this.isActive = true;
    this.conqueredItems.clear();
    this.regionProgress = {
      "Marmara": 0,
      "Ege": 0,
      "Akdeniz": 0,
      "İç Anadolu": 0,
      "Karadeniz": 0,
      "Doğu Anadolu": 0,
      "Güneydoğu Anadolu": 0
    };

    if (this.geoMap && this.geoMap.map && !this.geoMap.map.hasLayer(this.conquerLayerGroup)) {
      this.conquerLayerGroup.addTo(this.geoMap.map);
    }

    this.conquerLayerGroup.clearLayers();
    this.geoMap.clearAll();
    this.geoMap.resetView();
    return this.getStatus();
  }

  matchRegion(itemRegion) {
    if (!itemRegion) return "İç Anadolu";
    const reg = itemRegion.toLowerCase();
    if (reg.includes("marmara")) return "Marmara";
    if (reg.includes("ege")) return "Ege";
    if (reg.includes("akdeniz")) return "Akdeniz";
    if (reg.includes("güneydoğu") || reg.includes("guneydogu")) return "Güneydoğu Anadolu";
    if (reg.includes("doğu anadolu") || reg.includes("dogu anadolu")) return "Doğu Anadolu";
    if (reg.includes("karadeniz")) return "Karadeniz";
    if (reg.includes("iç anadolu") || reg.includes("ic anadolu")) return "İç Anadolu";
    return "İç Anadolu";
  }

  recordConquest(item) {
    if (!this.isActive || !item) return null;
    const regionKey = this.matchRegion(item.region);

    if (!this.conqueredItems.has(item.id)) {
      this.conqueredItems.add(item.id);
      this.regionProgress[regionKey] = (this.regionProgress[regionKey] || 0) + 1;
      
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

  getStatus() {
    let totalTarget = 0;
    let totalCurrent = 0;
    const regionStats = [];

    for (const [reg, goal] of Object.entries(this.regionGoals)) {
      const current = Math.min(this.regionProgress[reg] || 0, goal);
      totalTarget += goal;
      totalCurrent += current;
      const isCompleted = current >= goal;
      regionStats.push({
        name: reg,
        current: current,
        goal: goal,
        percent: Math.round((current / goal) * 100),
        isCompleted: isCompleted
      });
    }

    const overallPercent = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0;
    const isVictory = overallPercent >= 100;

    return {
      overallPercent: overallPercent,
      totalConquered: this.conqueredItems.size,
      regionStats: regionStats,
      isVictory: isVictory
    };
  }

  exit() {
    this.isActive = false;
    this.conquerLayerGroup.clearLayers();
    this.geoMap.clearAll();
  }
}
