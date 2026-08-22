/**
 * 🎯 Kör Atış / Coğrafya Radarı (GeoGuessr Modu) Oyun Motoru
 * Haritada serbest tıklama ile tahmin yürütme, Haversine km mesafe hesaplama,
 * görsel mesafe çizgisi ve 5 turluk GeoGuessr puanlama sistemi.
 */

class GeoGuessrGame {
  constructor(mapInstance) {
    this.geoMap = mapInstance;
    this.isActive = false;
    this.currentRound = 1;
    this.maxRounds = 5;
    this.totalScore = 0;
    this.roundResults = [];
    this.currentTarget = null;
    this.guessLayerGroup = L.layerGroup();
    this.hasGuessedThisRound = false;

    if (this.geoMap && this.geoMap.map) {
      this.guessLayerGroup.addTo(this.geoMap.map);
    }
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }

  calculateScore(distanceKm) {
    if (distanceKm <= 20) return 1000;
    if (distanceKm <= 50) return Math.round(1000 - (distanceKm - 20) * 8);
    if (distanceKm <= 150) return Math.round(760 - (distanceKm - 50) * 3.6);
    if (distanceKm <= 350) return Math.round(400 - (distanceKm - 150) * 1.5);
    if (distanceKm <= 600) return Math.round(100 - (distanceKm - 350) * 0.4);
    return 0;
  }

  start() {
    this.isActive = true;
    this.currentRound = 1;
    this.totalScore = 0;
    this.roundResults = [];
    this.guessLayerGroup.clearLayers();
    this.geoMap.clearAllLayers();
    this.geoMap.setLabelsEnabled(false);
    return this.nextRound();
  }

  nextRound() {
    this.hasGuessedThisRound = false;
    this.guessLayerGroup.clearLayers();
    this.geoMap.clearAllLayers();

    const allCategories = ['daglar', 'ovalar', 'platolar', 'su_kaynaklari', 'gecitler'];
    const randomCat = allCategories[Math.floor(Math.random() * allCategories.length)];
    const items = COGRAFYA_DATA[randomCat] || [];
    
    const pool = items.filter(it => !this.roundResults.some(r => r.target.id === it.id));
    this.currentTarget = (pool.length > 0 ? pool : items)[Math.floor(Math.random() * (pool.length > 0 ? pool.length : items.length))];

    return {
      round: this.currentRound,
      maxRounds: this.maxRounds,
      totalScore: this.totalScore,
      target: this.currentTarget
    };
  }

  handleMapClick(clickLat, clickLng) {
    if (!this.isActive || this.hasGuessedThisRound || !this.currentTarget) return null;

    this.hasGuessedThisRound = true;
    const targetLat = this.currentTarget.lat;
    const targetLng = this.currentTarget.lng;

    const distanceKm = this.calculateDistance(clickLat, clickLng, targetLat, targetLng);
    const score = this.calculateScore(distanceKm);
    this.totalScore += score;

    const result = {
      round: this.currentRound,
      target: this.currentTarget,
      guess: { lat: clickLat, lng: clickLng },
      actual: { lat: targetLat, lng: targetLng },
      distanceKm: distanceKm,
      score: score
    };

    this.roundResults.push(result);
    this.renderGuessOnMap(clickLat, clickLng, targetLat, targetLng, distanceKm, score);
    return result;
  }

  renderGuessOnMap(clickLat, clickLng, targetLat, targetLng, distanceKm, score) {
    this.guessLayerGroup.clearLayers();

    const guessMarker = L.circleMarker([clickLat, clickLng], {
      radius: 8,
      fillColor: '#f59e0b',
      color: '#ffffff',
      weight: 2,
      fillOpacity: 1
    }).bindTooltip(`📍 Tahmininiz<br><strong>${distanceKm} km</strong> sapma (+${score} Puan)`, {
      permanent: true,
      direction: 'top',
      className: 'geoguessr-tooltip guess'
    });

    const targetMarker = L.circleMarker([targetLat, targetLng], {
      radius: 9,
      fillColor: '#10b981',
      color: '#ffffff',
      weight: 2,
      fillOpacity: 1
    }).bindTooltip(`🎯 ${this.currentTarget.name}`, {
      permanent: true,
      direction: 'bottom',
      className: 'geoguessr-tooltip target'
    });

    const line = L.polyline([[clickLat, clickLng], [targetLat, targetLng]], {
      color: distanceKm <= 50 ? '#10b981' : distanceKm <= 150 ? '#f59e0b' : '#ef4444',
      weight: 3,
      dashArray: '6, 8',
      opacity: 0.85
    });

    const targetCircle = L.circle([targetLat, targetLng], {
      radius: 35000,
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.1,
      weight: 1.5,
      dashArray: '4, 6'
    });

    this.guessLayerGroup.addLayer(line);
    this.guessLayerGroup.addLayer(targetCircle);
    this.guessLayerGroup.addLayer(guessMarker);
    this.guessLayerGroup.addLayer(targetMarker);

    const bounds = L.latLngBounds([[clickLat, clickLng], [targetLat, targetLng]]);
    this.geoMap.map.flyToBounds(bounds.pad(0.35), { duration: 0.8 });
  }

  proceedToNext() {
    if (this.currentRound >= this.maxRounds) {
      this.isActive = false;
      return { isFinished: true, summary: this.getSummary() };
    }

    this.currentRound++;
    const nextRoundData = this.nextRound();
    return { isFinished: false, roundData: nextRoundData };
  }

  getSummary() {
    const totalKm = this.roundResults.reduce((sum, r) => sum + r.distanceKm, 0);
    const avgKm = Math.round(totalKm / this.roundResults.length);
    let title = "Acemi Haritacı";
    let badge = "🧭";

    if (this.totalScore >= 4500) {
      title = "Coğrafya Radarı / Nokta Atışı Uzmanı";
      badge = "🎯";
    } else if (this.totalScore >= 3500) {
      title = "Usta Gezgin";
      badge = "⚡";
    } else if (this.totalScore >= 2500) {
      title = "Gözü Pek Haritacı";
      badge = "📍";
    }

    return {
      totalScore: this.totalScore,
      maxPossibleScore: this.maxRounds * 1000,
      avgDistanceKm: avgKm,
      roundResults: this.roundResults,
      title: title,
      badge: badge
    };
  }

  exit() {
    this.isActive = false;
    this.guessLayerGroup.clearLayers();
  }
}
