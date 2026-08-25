/**
 * 🎯 Kör Atış / Coğrafya Radarı (GeoGuessr Modu) Oyun Motoru
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
    this.prevLabelsEnabled = null; // Oyun öncesi "Dilsiz Harita" ayarı (çıkışta geri yüklenir)

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
    if (distanceKm <= 50) return Math.max(0, Math.round(1000 - (distanceKm - 20) * 8));
    if (distanceKm <= 150) return Math.max(0, Math.round(760 - (distanceKm - 50) * 3.6));
    if (distanceKm <= 350) return Math.max(0, Math.round(400 - (distanceKm - 150) * 1.5));
    if (distanceKm <= 600) return Math.max(0, Math.round(100 - (distanceKm - 350) * 0.4));
    return 0;
  }

  start(customPool = null) {
    this.isActive = true;
    this.currentRound = 1;
    this.totalScore = 0;
    this.roundResults = [];
    this.customPool = (customPool && customPool.length) ? [...customPool] : null;

    if (this.geoMap && this.geoMap.map && !this.geoMap.map.hasLayer(this.guessLayerGroup)) {
      this.guessLayerGroup.addTo(this.geoMap.map);
    }

    this.guessLayerGroup.clearLayers();
    this.geoMap.clearAll();

    // Kullanıcının kendi etiket tercihini sakla; oyun bitince aynen geri verilecek
    if (this.prevLabelsEnabled === null) {
      this.prevLabelsEnabled = this.geoMap.labelsEnabled;
    }
    this.geoMap.setLabelsEnabled(false, false);

    this.geoMap.resetView();
    return this.nextRound();
  }

  nextRound() {
    this.hasGuessedThisRound = false;
    this.guessLayerGroup.clearLayers();
    this.geoMap.clearAll();
    // Önceki turun cevabına uçmuş kamerayı Türkiye geneline geri al
    this.geoMap.resetView();

    let pool = [];
    if (this.customPool && this.customPool.length > 0) {
      pool = this.customPool;
    } else {
      // Yalnızca KURULU paketlerin kategorilerini topla (iliskili_cografya haric)
      const allItems = [];
      if (typeof COGRAFYA_DATA !== 'undefined') {
        Object.keys(COGRAFYA_DATA).forEach(cat => {
          if (cat === 'iliskili_cografya') return;
          if (Array.isArray(COGRAFYA_DATA[cat])) {
            allItems.push(...COGRAFYA_DATA[cat]);
          }
        });
      }
      pool = allItems;
    }

    // Koordinatı olan ve daha önce bu oyunda sorulmamış öğeleri filtrele
    const validItems = pool.filter(it => it && typeof it.lat === 'number' && typeof it.lng === 'number');
    const unaskedPool = validItems.filter(it => !this.roundResults.some(r => r.target && r.target.id === it.id));
    const finalPool = unaskedPool.length > 0 ? unaskedPool : validItems;

    if (finalPool.length === 0) {
      this.currentTarget = null;
      return null;
    }

    this.currentTarget = finalPool[Math.floor(Math.random() * finalPool.length)];

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
    this.geoMap.flyToBoundsSafely(bounds.pad(0.35));
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
    const avgKm = this.roundResults.length > 0 ? Math.round(totalKm / this.roundResults.length) : 0;
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

  // Oyun öncesi "Dilsiz Harita" tercihini geri yükler.
  // true dönerse çağıran taraf buton arayüzünü tazelemelidir.
  restoreLabels() {
    if (this.prevLabelsEnabled === null) return false;
    this.geoMap.setLabelsEnabled(this.prevLabelsEnabled, false);
    this.prevLabelsEnabled = null;
    return true;
  }

  exit() {
    this.isActive = false;
    this.guessLayerGroup.clearLayers();
    this.geoMap.clearAll();
    return this.restoreLabels();
  }
}
