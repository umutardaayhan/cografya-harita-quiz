/**
 * 📐 MUTLAK (MATEMATİKSEL) KONUM OYUN MOTORLARI
 *
 * 5 mod:
 *   ☀️ SunShadowGame        - Güneş açısı & gölge boyu kapışması
 *   🌡️ TempDetectiveGame     - İndirgenmiş vs. gerçek sıcaklık dedektifi
 *   🌓 DayNightOrderGame     - Gece-gündüz süre farkı avcısı (sıralama)
 *   🎯 CoordinateHunterGame  - Paralel-meridyen koordinat avcısı (harita tıklama)
 *   🏃 CityDuelGame          - İki şehir karşılaştırması (5 saniyelik zaman yarışı)
 *
 * Hepsi app.js'e AYNI "view" nesnesini döndürür; tek bir HUD hepsini render eder.
 * Tüm cevaplar lat/lng/rakımdan HESAPLANIR, hiçbir sonuç veriye elle yazılmaz.
 */

// ============================================================
// ORTAK ASTRONOMİ / COĞRAFYA YARDIMCILARI
// ============================================================
const MK = {
  DATES: {
    haziran21: { label: '21 Haziran', icon: '☀️', decl: 23.45, note: 'Yengeç Dönencesi' },
    aralik21:  { label: '21 Aralık',  icon: '❄️', decl: -23.45, note: 'Oğlak Dönencesi' },
    mart21:    { label: '21 Mart',    icon: '🌱', decl: 0,      note: 'Ekinoks (Ilım)' },
    eylul23:   { label: '23 Eylül',   icon: '🍂', decl: 0,      note: 'Ekinoks (Ilım)' }
  },

  rad(d) { return d * Math.PI / 180; },

  /** Öğle vakti güneş ışınlarının yere değme açısı (derece) */
  sunAngle(lat, decl) {
    return 90 - Math.abs(lat - decl);
  },

  /** 1 metrelik bir cismin öğle vakti gölge uzunluğu (metre) = cot(açı) */
  shadowLength(lat, decl) {
    const a = this.sunAngle(lat, decl);
    if (a <= 0) return Infinity;
    return 1 / Math.tan(this.rad(a));
  },

  /** Teorik gündüz süresi (saat). Ekinokslarda her yerde 12 saattir. */
  dayLengthHours(lat, decl) {
    if (decl === 0) return 12;
    let c = -Math.tan(this.rad(lat)) * Math.tan(this.rad(decl));
    c = Math.max(-1, Math.min(1, c));
    return 24 * Math.acos(c) / Math.PI;
  },

  formatHours(h) {
    const total = Math.round(h * 60);
    return `${Math.floor(total / 60)} sa ${String(total % 60).padStart(2, '0')} dk`;
  },

  /** Yükselti kaynaklı sıcaklık farkı: her 100 m'de 0,5 °C */
  reducedTempDiff(alt) {
    return (alt / 100) * 0.5;
  },

  /** Ekvatorda 1670 km/sa; enlem arttıkça azalır */
  linearSpeed(lat) {
    return 1670 * Math.cos(this.rad(lat));
  },

  /** 37.005 -> "37° 00′ Kuzey" */
  formatCoord(value, isLat) {
    const deg = Math.floor(Math.abs(value));
    const min = Math.round((Math.abs(value) - deg) * 60);
    const d = min === 60 ? deg + 1 : deg;
    const m = min === 60 ? 0 : min;
    const dir = isLat ? 'Kuzey' : 'Doğu';
    return `${d}° ${String(m).padStart(2, '0')}′ ${dir}`;
  },

  haversineKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = this.rad(lat2 - lat1);
    const dLng = this.rad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2)) * Math.sin(dLng / 2) ** 2;
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  },

  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  randomOf(arr) { return arr[Math.floor(Math.random() * arr.length)]; },

  /**
   * Belirtilen anahtara göre birbirinden yeterince FARKLI n adet şehir seçer.
   * Böylece "en dik / en uzun / en fazla" sorusunun tek ve tartışmasız cevabı olur.
   */
  pickDistinct(pool, count, keyFn, minGap) {
    for (let attempt = 0; attempt < 60; attempt++) {
      const shuffled = this.shuffle(pool);
      const chosen = [];
      for (const city of shuffled) {
        if (chosen.every(c => Math.abs(keyFn(c) - keyFn(city)) >= minGap)) {
          chosen.push(city);
          if (chosen.length === count) return chosen;
        }
      }
    }
    // Yeterli aralık bulunamazsa boşluğu zorlamadan en ayrık olanları döndür
    const sorted = pool.slice().sort((a, b) => keyFn(a) - keyFn(b));
    const step = Math.max(1, Math.floor(sorted.length / count));
    const fallback = [];
    for (let i = 0; i < count; i++) fallback.push(sorted[Math.min(i * step, sorted.length - 1)]);
    return this.shuffle(fallback);
  },

  /** Mesafeye göre puan (koordinat avcısı) */
  distanceScore(km) {
    if (km <= 25) return 1000;
    if (km <= 75) return Math.round(1000 - (km - 25) * 9);
    if (km <= 200) return Math.round(550 - (km - 75) * 3.2);
    if (km <= 450) return Math.max(0, Math.round(150 - (km - 200) * 0.6));
    return 0;
  }
};

// ============================================================
// ORTAK TABAN SINIF
// ============================================================
class MutlakKonumGameBase {
  constructor(mapInstance) {
    this.geoMap = mapInstance;
    this.isActive = false;
    this.round = 1;
    this.maxRounds = 8;
    this.score = 0;
    this.correctCount = 0;
    this.history = [];
    this.answered = false;
  }

  resetProgress() {
    this.isActive = true;
    this.round = 1;
    this.score = 0;
    this.correctCount = 0;
    this.history = [];
    this.answered = false;
  }

  /** Şehirleri haritada A-B-C-D pinleri olarak gösterir */
  showPins(cities, onSelect) {
    this.geoMap.showMultipleChoiceLocations(cities, onSelect);
  }

  baseView(extra) {
    return Object.assign({
      mode: this.modeKey,
      title: this.modeTitle,
      round: this.round,
      maxRounds: this.maxRounds,
      score: this.score,
      badge: '',
      prompt: '',
      hint: '',
      options: null,
      timer: null,
      feedback: null,
      showNext: false,
      finished: false,
      summary: null
    }, extra);
  }

  next() {
    if (this.round >= this.maxRounds) {
      this.isActive = false;
      return this.baseView({ finished: true, summary: this.buildSummary() });
    }
    this.round++;
    return this.nextRound();
  }

  buildSummary() {
    const maxScore = this.maxRounds * this.pointsPerRound;
    const ratio = maxScore > 0 ? this.score / maxScore : 0;
    let title = 'Acemi Kâşif';
    let badge = '🧭';
    if (ratio >= 0.9) { title = 'Matematiksel Konum Ustası'; badge = '🏆'; }
    else if (ratio >= 0.7) { title = 'Usta Hesapçı'; badge = '⭐'; }
    else if (ratio >= 0.45) { title = 'Yolunu Bulan Gezgin'; badge = '📐'; }

    return {
      badge,
      title,
      subtitle: this.modeTitle,
      stats: [
        { val: this.score, label: '🏆 Toplam Puan', cls: 'record' },
        { val: `${this.correctCount}/${this.maxRounds}`, label: '✓ Doğru Tur', cls: 'correct' }
      ],
      rows: this.history
    };
  }

  exit() {
    this.isActive = false;
    this.answered = false;
    this.geoMap.clearAll();
  }
}

// ============================================================
// ☀️ 1. GÜNEŞ AÇISI VE GÖLGE BOYU KAPIŞMASI
// ============================================================
class SunShadowGame extends MutlakKonumGameBase {
  constructor(mapInstance) {
    super(mapInstance);
    this.modeKey = 'sun';
    this.modeTitle = 'Güneş Açısı & Gölge Boyu';
    this.maxRounds = 8;
    this.pointsPerRound = 100;
  }

  start() {
    this.resetProgress();
    this.geoMap.clearAll();
    this.geoMap.resetView();
    return this.nextRound();
  }

  nextRound() {
    this.answered = false;

    const dateKey = MK.randomOf(Object.keys(MK.DATES));
    const dateInfo = MK.DATES[dateKey];
    const criteria = [
      { key: 'dik',        text: 'Güneş ışınlarını öğle vakti <strong>EN DİK</strong> alan il hangisidir?', wantMaxAngle: true },
      { key: 'kisa_golge', text: 'Öğle vakti gölge boyu <strong>EN KISA</strong> olan il hangisidir?',      wantMaxAngle: true },
      { key: 'uzun_golge', text: 'Öğle vakti gölge boyu <strong>EN UZUN</strong> olan il hangisidir?',      wantMaxAngle: false },
      { key: 'egik',       text: 'Güneş ışınlarını öğle vakti <strong>EN EĞİK</strong> alan il hangisidir?', wantMaxAngle: false }
    ];
    const criterion = MK.randomOf(criteria);

    const cities = MK.pickDistinct(TR_CITIES, 4, c => c.lat, 0.9);
    const scored = cities.map(c => ({
      city: c,
      angle: MK.sunAngle(c.lat, dateInfo.decl),
      shadow: MK.shadowLength(c.lat, dateInfo.decl)
    }));

    const sorted = scored.slice().sort((a, b) => b.angle - a.angle);
    const winner = criterion.wantMaxAngle ? sorted[0] : sorted[sorted.length - 1];

    this.current = { dateKey, dateInfo, criterion, scored, correctId: winner.city.id };
    this.showPins(cities, null);

    return this.baseView({
      badge: `${dateInfo.icon} ${dateInfo.label} · ${dateInfo.note}`,
      prompt: criterion.text,
      hint: `Öğle vakti güneş açısı = 90° − |enlem − ${dateInfo.decl}°| · Enlemi dönenceye yakın olan ışığı daha dik alır.`,
      options: cities.map(c => ({ id: c.id, label: c.name, sub: `${c.lat.toFixed(2)}° K` })),
      mapPins: cities
    });
  }

  select(cityId) {
    if (!this.isActive || this.answered) return null;
    this.answered = true;

    const { dateInfo, criterion, scored, correctId } = this.current;
    const ok = cityId === correctId;
    if (ok) { this.score += this.pointsPerRound; this.correctCount++; }

    const ordered = scored.slice().sort((a, b) => b.angle - a.angle);
    const winnerName = scored.find(s => s.city.id === correctId).city.name;

    this.history.push({
      left: `${this.round}. ${dateInfo.label} · ${criterion.key === 'uzun_golge' || criterion.key === 'egik' ? 'en eğik/uzun gölge' : 'en dik/kısa gölge'}`,
      right: winnerName,
      ok
    });

    this.geoMap.highlightMultiChoiceAnswer(correctId, cityId);

    return this.baseView({
      badge: `${dateInfo.icon} ${dateInfo.label}`,
      prompt: criterion.text,
      options: scored.map(s => ({
        id: s.city.id,
        label: s.city.name,
        sub: `${s.city.lat.toFixed(2)}° K`,
        state: s.city.id === correctId ? 'correct' : (s.city.id === cityId ? 'wrong' : 'dim')
      })),
      feedback: {
        ok,
        title: ok ? `✓ Doğru — ${winnerName}` : `✗ Yanlış — Doğrusu: ${winnerName}`,
        rows: ordered.map(s => ({
          label: `${s.city.name} (${s.city.lat.toFixed(2)}° K)`,
          value: `açı ${s.angle.toFixed(1)}° · gölge ${s.shadow.toFixed(2)} m`,
          highlight: s.city.id === correctId
        })),
        note: `Gölge boyu, 1 metrelik bir cisim içindir. Güneş açısı büyüdükçe gölge kısalır. ${dateInfo.label}'da güneş ${dateInfo.decl === 0 ? 'Ekvator' : (dateInfo.decl > 0 ? 'Yengeç Dönencesi' : 'Oğlak Dönencesi')} üzerine dik gelir.`
      },
      showNext: true
    });
  }
}

// ============================================================
// 🌡️ 3. İNDİRGENMİŞ vs. GERÇEK SICAKLIK DEDEKTİFİ
// ============================================================
class TempDetectiveGame extends MutlakKonumGameBase {
  constructor(mapInstance) {
    super(mapInstance);
    this.modeKey = 'temp';
    this.modeTitle = 'İndirgenmiş Sıcaklık Dedektifi';
    this.maxRounds = 8;
    this.pointsPerRound = 100;
  }

  start() {
    this.resetProgress();
    this.geoMap.clearAll();
    this.geoMap.resetView();
    return this.nextRound();
  }

  nextRound() {
    this.answered = false;

    const kind = MK.randomOf(['max', 'max', 'min', 'coastal']);
    let cities, correctId, prompt, hint;

    if (kind === 'coastal') {
      // Tam olarak BİR tane alçak (kıyı) il, üçü yüksek olsun
      const low = MK.shuffle(TR_CITIES.filter(c => c.alt <= 60));
      const high = MK.pickDistinct(TR_CITIES.filter(c => c.alt >= 550), 3, c => c.alt, 150);
      cities = MK.shuffle([low[0], ...high]);
      correctId = low[0].id;
      prompt = 'Hangi ilin ölçülen sıcaklığı <strong>indirgeme gerektirmez</strong>; yani sıcaklığı neredeyse yalnızca <strong>ENLEM</strong> ile açıklanır?';
      hint = 'İndirgenmiş sıcaklık, yükseltinin etkisini silmek için hesaplanır. Rakımı deniz seviyesine yakın illerde gerçek ve indirgenmiş sıcaklık neredeyse aynıdır.';
    } else {
      cities = MK.pickDistinct(TR_CITIES, 4, c => c.alt, 260);
      const sorted = cities.slice().sort((a, b) => b.alt - a.alt);
      correctId = (kind === 'max' ? sorted[0] : sorted[sorted.length - 1]).id;
      prompt = kind === 'max'
        ? 'Gerçek sıcaklık ile indirgenmiş sıcaklık arasındaki fark <strong>EN FAZLA</strong> olan il hangisidir?'
        : 'Gerçek sıcaklık ile indirgenmiş sıcaklık arasındaki fark <strong>EN AZ</strong> olan il hangisidir?';
      hint = 'Her 100 metrede sıcaklık 0,5 °C değişir. Fark = (rakım ÷ 100) × 0,5 °C · Rakım yükseldikçe fark büyür.';
    }

    this.current = { kind, cities, correctId, prompt };
    this.showPins(cities, null);

    return this.baseView({
      badge: '🌡️ Yükselti & Sıcaklık İndirgeme',
      prompt,
      hint,
      options: cities.map(c => ({ id: c.id, label: c.name, sub: `${c.region}` })),
      mapPins: cities
    });
  }

  select(cityId) {
    if (!this.isActive || this.answered) return null;
    this.answered = true;

    const { kind, cities, correctId } = this.current;
    const ok = cityId === correctId;
    if (ok) { this.score += this.pointsPerRound; this.correctCount++; }

    const winner = cities.find(c => c.id === correctId);
    const ordered = cities.slice().sort((a, b) => b.alt - a.alt);

    this.history.push({
      left: `${this.round}. ${kind === 'coastal' ? 'Enlemle açıklanan kıyı ili' : (kind === 'max' ? 'En fazla fark' : 'En az fark')}`,
      right: winner.name,
      ok
    });

    this.geoMap.highlightMultiChoiceAnswer(correctId, cityId);

    const example = MK.reducedTempDiff(winner.alt);
    const note = kind === 'coastal'
      ? `${winner.name} rakımı ${winner.alt} m olduğu için indirgeme farkı yalnızca ${example.toFixed(2)} °C'dir — pratikte sıfır sayılır. Kalan sıcaklık farkı ENLEM (mutlak konum) ile açıklanır.`
      : `${winner.name}'da ${winner.alt} m rakım, ${example.toFixed(2)} °C'lik fark demektir. Örnek: gerçek sıcaklık 10 °C ölçülseydi, indirgenmiş sıcaklık ≈ ${(10 + example).toFixed(2)} °C olurdu.`;

    return this.baseView({
      badge: '🌡️ Yükselti & Sıcaklık İndirgeme',
      prompt: this.current.prompt,
      options: cities.map(c => ({
        id: c.id,
        label: c.name,
        sub: `${c.alt} m`,
        state: c.id === correctId ? 'correct' : (c.id === cityId ? 'wrong' : 'dim')
      })),
      feedback: {
        ok,
        title: ok ? `✓ Doğru — ${winner.name}` : `✗ Yanlış — Doğrusu: ${winner.name}`,
        rows: ordered.map(c => ({
          label: `${c.name} (${c.alt} m)`,
          value: `fark +${MK.reducedTempDiff(c.alt).toFixed(2)} °C`,
          highlight: c.id === correctId
        })),
        note
      },
      showNext: true
    });
  }
}

// ============================================================
// 🌓 4. GECE-GÜNDÜZ SÜRE FARKI AVCISI (SIRALAMA)
// ============================================================
class DayNightOrderGame extends MutlakKonumGameBase {
  constructor(mapInstance) {
    super(mapInstance);
    this.modeKey = 'daynight';
    this.modeTitle = 'Gece-Gündüz Süre Avcısı';
    this.maxRounds = 6;
    this.pointsPerRound = 100;
    this.cardCount = 4;
  }

  start() {
    this.resetProgress();
    this.geoMap.clearAll();
    this.geoMap.resetView();
    return this.nextRound();
  }

  nextRound() {
    this.answered = false;
    this.picked = [];

    const dateKey = MK.randomOf(['haziran21', 'aralik21']);
    const dateInfo = MK.DATES[dateKey];
    const tasks = [
      { key: 'gunduz_uzun', text: 'GÜNDÜZÜ en <strong>UZUN</strong> olandan en <strong>KISA</strong> olana sırala', metric: 'day', desc: true },
      { key: 'gunduz_kisa', text: 'GÜNDÜZÜ en <strong>KISA</strong> olandan en <strong>UZUN</strong> olana sırala', metric: 'day', desc: false },
      { key: 'gece_uzun',   text: 'GECESİ en <strong>UZUN</strong> olandan en <strong>KISA</strong> olana sırala',  metric: 'night', desc: true }
    ];
    const task = MK.randomOf(tasks);

    const cities = MK.pickDistinct(TR_CITIES, this.cardCount, c => c.lat, 1.0);
    const measured = cities.map(c => {
      const day = MK.dayLengthHours(c.lat, dateInfo.decl);
      return { city: c, day, night: 24 - day };
    });

    const value = m => (task.metric === 'day' ? m.day : m.night);
    const correctOrder = measured.slice()
      .sort((a, b) => task.desc ? value(b) - value(a) : value(a) - value(b))
      .map(m => m.city.id);

    this.current = { dateKey, dateInfo, task, measured, correctOrder };
    this.showPins(cities, null);

    return this.baseView({
      badge: `${dateInfo.icon} ${dateInfo.label} · Sıralama`,
      prompt: task.text,
      hint: `${dateInfo.label}'da Kuzey Yarım Küre'de kuzeye gidildikçe gündüz ${dateInfo.decl > 0 ? 'UZAR' : 'KISALIR'}. Şehirleri istenen sıraya göre tek tek tıkla.`,
      options: cities.map(c => ({ id: c.id, label: c.name, sub: `${c.lat.toFixed(2)}° K` })),
      mapPins: cities,
      orderProgress: []
    });
  }

  select(cityId) {
    if (!this.isActive || this.answered) return null;
    if (this.picked.includes(cityId)) return null;

    this.picked.push(cityId);
    const { dateInfo, task, measured, correctOrder } = this.current;

    // Sıralama henüz tamamlanmadı: ara durumu göster
    if (this.picked.length < correctOrder.length) {
      return this.baseView({
        badge: `${dateInfo.icon} ${dateInfo.label} · Sıralama`,
        prompt: task.text,
        hint: `${this.picked.length}/${correctOrder.length} seçildi. Sıradaki şehri tıkla.`,
        options: measured.map(m => ({
          id: m.city.id,
          label: m.city.name,
          sub: `${m.city.lat.toFixed(2)}° K`,
          state: this.picked.includes(m.city.id) ? 'picked' : '',
          order: this.picked.indexOf(m.city.id) + 1 || null
        })),
        orderProgress: this.picked.slice()
      });
    }

    // Sıralama tamamlandı: değerlendir
    this.answered = true;
    const correctSlots = this.picked.filter((id, i) => id === correctOrder[i]).length;
    const perfect = correctSlots === correctOrder.length;
    const earned = Math.round(this.pointsPerRound * (correctSlots / correctOrder.length));
    this.score += earned;
    if (perfect) this.correctCount++;

    const nameOf = id => measured.find(m => m.city.id === id).city.name;
    this.history.push({
      left: `${this.round}. ${dateInfo.label} · ${task.key === 'gece_uzun' ? 'gece' : 'gündüz'} sıralaması`,
      right: `${correctSlots}/${correctOrder.length} doğru (+${earned})`,
      ok: perfect
    });

    const value = m => (task.metric === 'day' ? m.day : m.night);
    const orderedRows = correctOrder.map((id, i) => {
      const m = measured.find(x => x.city.id === id);
      return {
        label: `${i + 1}. ${m.city.name} (${m.city.lat.toFixed(2)}° K)`,
        value: `gündüz ${MK.formatHours(m.day)} · gece ${MK.formatHours(m.night)}`,
        highlight: this.picked[i] === id
      };
    });

    return this.baseView({
      badge: `${dateInfo.icon} ${dateInfo.label} · Sıralama`,
      prompt: task.text,
      options: measured.map(m => {
        const myIdx = this.picked.indexOf(m.city.id);
        return {
          id: m.city.id,
          label: m.city.name,
          sub: `senin sıran: ${myIdx + 1} · doğru sıra: ${correctOrder.indexOf(m.city.id) + 1}`,
          state: this.picked[myIdx] === correctOrder[myIdx] ? 'correct' : 'wrong',
          order: myIdx + 1
        };
      }),
      feedback: {
        ok: perfect,
        title: perfect
          ? `✓ Kusursuz sıralama! (+${earned} puan)`
          : `${correctSlots}/${correctOrder.length} doğru yerleşti (+${earned} puan)`,
        rows: orderedRows,
        note: `Senin sıran: ${this.picked.map(nameOf).join(' → ')}. ${dateInfo.label}'da ${dateInfo.decl > 0 ? 'en kuzeydeki ilin gündüzü en uzundur' : 'en kuzeydeki ilin gecesi en uzundur'}. Süreler teorik (kırılma etkisi hariç) değerlerdir.`
      },
      showNext: true
    });
  }
}

// ============================================================
// 🎯 6. PARALEL-MERİDYEN KOORDİNAT AVCISI
// ============================================================
class CoordinateHunterGame extends MutlakKonumGameBase {
  constructor(mapInstance) {
    super(mapInstance);
    this.modeKey = 'coord';
    this.modeTitle = 'Koordinat Avcısı';
    this.maxRounds = 8;
    this.pointsPerRound = 1000;
    this.gridLayer = L.layerGroup();
    this.guessLayer = L.layerGroup();
    if (this.geoMap && this.geoMap.map) {
      this.gridLayer.addTo(this.geoMap.map);
      this.guessLayer.addTo(this.geoMap.map);
    }
    this.prevLabelsEnabled = null;
  }

  /** Paralel ve meridyen ızgarasını haritaya çizer */
  drawGraticule() {
    this.gridLayer.clearLayers();

    for (let lat = 36; lat <= 42; lat++) {
      this.gridLayer.addLayer(L.polyline([[lat, 25], [lat, 46]], {
        color: '#38bdf8', weight: lat % 2 === 0 ? 1.4 : 0.8, opacity: 0.5, dashArray: '5, 7', interactive: false
      }));
      this.gridLayer.addLayer(L.marker([lat, 25.9], {
        interactive: false,
        icon: L.divIcon({ className: 'mk-grid-label', html: `<span>${lat}°K</span>`, iconSize: [40, 16], iconAnchor: [20, 8] })
      }));
    }

    for (let lng = 26; lng <= 45; lng++) {
      this.gridLayer.addLayer(L.polyline([[35.5, lng], [42.5, lng]], {
        color: '#38bdf8', weight: lng % 2 === 0 ? 1.4 : 0.8, opacity: 0.5, dashArray: '5, 7', interactive: false
      }));
      if (lng % 2 === 0) {
        this.gridLayer.addLayer(L.marker([35.85, lng], {
          interactive: false,
          icon: L.divIcon({ className: 'mk-grid-label', html: `<span>${lng}°D</span>`, iconSize: [40, 16], iconAnchor: [20, 8] })
        }));
      }
    }
  }

  start() {
    this.resetProgress();
    this.guessLayer.clearLayers();
    this.geoMap.clearAll();

    if (this.geoMap.map) {
      if (!this.geoMap.map.hasLayer(this.gridLayer)) this.gridLayer.addTo(this.geoMap.map);
      if (!this.geoMap.map.hasLayer(this.guessLayer)) this.guessLayer.addTo(this.geoMap.map);
    }

    // Dilsiz harita: kalıcı ayara DOKUNMADAN geçici override
    if (this.prevLabelsEnabled === null) this.prevLabelsEnabled = this.geoMap.labelsEnabled;
    this.geoMap.setLabelsEnabled(false, false);

    this.drawGraticule();

    // 4 uç nokta + 4 koordinat turu, karışık
    const extremes = MK.shuffle(TR_EXTREME_POINTS).map(p => ({ type: 'extreme', point: p }));
    const coords = MK.shuffle(TR_CITIES).slice(0, 4).map(c => ({ type: 'coord', city: c }));
    this.queue = MK.shuffle([...extremes, ...coords]);
    this.maxRounds = this.queue.length;

    this.geoMap.resetView();
    return this.nextRound();
  }

  nextRound() {
    this.answered = false;
    this.guessLayer.clearLayers();
    this.geoMap.resetView();

    const task = this.queue[this.round - 1];
    this.current = task;

    if (task.type === 'extreme') {
      const p = task.point;
      return this.baseView({
        badge: `${p.icon} Türkiye'nin Uç Noktaları`,
        prompt: `Türkiye'nin <strong>en ${p.dir.toLowerCase()}</strong> noktası olan <strong>${p.name}</strong>'nu haritada tıkla.`,
        hint: `İpucu: ${p.coordText} · Izgaradaki paralel ve meridyenleri kullan.`,
        options: null,
        mapPins: null
      });
    }

    const c = task.city;
    return this.baseView({
      badge: '🎯 Koordinat Okuma',
      prompt: `<strong>${MK.formatCoord(c.lat, true)}</strong> &nbsp;–&nbsp; <strong>${MK.formatCoord(c.lng, false)}</strong> koordinatını haritada tıkla.`,
      hint: 'Önce paraleli (yatay çizgi), sonra meridyeni (dikey çizgi) bul; kesiştikleri noktaya tıkla.',
      options: null,
      mapPins: null
    });
  }

  handleMapClick(lat, lng) {
    if (!this.isActive || this.answered || !this.current) return null;
    this.answered = true;

    const target = this.current.type === 'extreme' ? this.current.point : this.current.city;
    const km = MK.haversineKm(lat, lng, target.lat, target.lng);
    const earned = MK.distanceScore(km);
    this.score += earned;
    if (km <= 75) this.correctCount++;

    this.history.push({
      left: `${this.round}. ${target.name}`,
      right: `${km} km · +${earned} puan`,
      ok: km <= 75
    });

    this.renderResultOnMap(lat, lng, target, km, earned);

    const isExtreme = this.current.type === 'extreme';
    const rows = [
      { label: 'Tıkladığın nokta', value: `${MK.formatCoord(lat, true)} – ${MK.formatCoord(lng, false)}` },
      { label: 'Doğru konum', value: `${MK.formatCoord(target.lat, true)} – ${MK.formatCoord(target.lng, false)}`, highlight: true },
      { label: 'Sapma', value: `${km} km` }
    ];

    return this.baseView({
      badge: isExtreme ? `${this.current.point.icon} Uç Nokta` : '🎯 Koordinat Okuma',
      prompt: `<strong>${target.name}</strong>${isExtreme ? ` · ${this.current.point.place}` : ''}`,
      options: null,
      feedback: {
        ok: km <= 75,
        title: km <= 25 ? `🎯 Tam isabet! (+${earned})` : (km <= 75 ? `✓ Çok yakın — ${km} km (+${earned})` : `${km} km saptın (+${earned})`),
        rows,
        note: isExtreme ? this.current.point.kpssNot
          : `Bu koordinat ${target.name} il merkezine karşılık gelir. Rakım ${target.alt} m, bölge: ${target.region}.`
      },
      showNext: true
    });
  }

  renderResultOnMap(lat, lng, target, km, earned) {
    this.guessLayer.clearLayers();

    this.guessLayer.addLayer(L.polyline([[lat, lng], [target.lat, target.lng]], {
      color: km <= 75 ? '#10b981' : km <= 200 ? '#f59e0b' : '#ef4444',
      weight: 3, dashArray: '6, 8', opacity: 0.9
    }));

    this.guessLayer.addLayer(L.circleMarker([lat, lng], {
      radius: 8, fillColor: '#f59e0b', color: '#fff', weight: 2, fillOpacity: 1
    }).bindTooltip(`📍 Tıkladığın yer<br><strong>${km} km</strong> sapma (+${earned})`, {
      permanent: true, direction: 'top', className: 'geoguessr-tooltip guess'
    }));

    this.guessLayer.addLayer(L.circleMarker([target.lat, target.lng], {
      radius: 9, fillColor: '#10b981', color: '#fff', weight: 2, fillOpacity: 1
    }).bindTooltip(`🎯 ${target.name}`, {
      permanent: true, direction: 'bottom', className: 'geoguessr-tooltip target'
    }));

    this.geoMap.map.flyToBounds(
      L.latLngBounds([[lat, lng], [target.lat, target.lng]]).pad(0.4),
      { duration: 0.8 }
    );
  }

  restoreLabels() {
    if (this.prevLabelsEnabled === null) return false;
    this.geoMap.setLabelsEnabled(this.prevLabelsEnabled, false);
    this.prevLabelsEnabled = null;
    return true;
  }

  exit() {
    this.isActive = false;
    this.answered = false;
    this.gridLayer.clearLayers();
    this.guessLayer.clearLayers();
    this.geoMap.clearAll();
    return this.restoreLabels();
  }
}

// ============================================================
// 🏃 9. İKİ ŞEHİR KARŞILAŞTIRMASI (5 SANİYELİK ZAMAN YARIŞI)
// ============================================================
class CityDuelGame extends MutlakKonumGameBase {
  constructor(mapInstance) {
    super(mapInstance);
    this.modeKey = 'duel';
    this.modeTitle = 'İki Şehir Kapışması';
    this.maxRounds = 10;
    this.pointsPerRound = 150;
    this.roundSeconds = 5;
    this.timerInterval = null;
    this.streak = 0;
    this.bestStreak = 0;
  }

  static get QUESTIONS() {
    return [
      { text: 'Hangisinin <strong>YEREL SAATİ</strong> daha ileridir?',            key: c => c.lng, dir: 'max', gap: 2.5, unit: c => `${c.lng.toFixed(2)}° D`, why: 'Daha DOĞUDA olan ilin yerel saati ileridir.' },
      { text: 'Güneş hangisinde daha <strong>ERKEN DOĞAR</strong>?',               key: c => c.lng, dir: 'max', gap: 2.5, unit: c => `${c.lng.toFixed(2)}° D`, why: 'Dünya batıdan doğuya döndüğü için güneşi önce doğudaki il görür.' },
      { text: 'Güneş hangisinde daha <strong>GEÇ BATAR</strong>?',                 key: c => c.lng, dir: 'min', gap: 2.5, unit: c => `${c.lng.toFixed(2)}° D`, why: 'Daha BATIDA olan ilde güneş daha geç batar.' },
      { text: '<strong>21 Haziran</strong>\'da <strong>GÜNDÜZÜ</strong> daha uzun olan?', key: c => c.lat, dir: 'max', gap: 2.0, unit: c => `${c.lat.toFixed(2)}° K · ${MK.formatHours(MK.dayLengthHours(c.lat, 23.45))}`, why: '21 Haziran\'da Kuzey Yarım Küre\'de kuzeye gidildikçe gündüz uzar.' },
      { text: '<strong>21 Aralık</strong>\'ta <strong>GÜNDÜZÜ</strong> daha uzun olan?',  key: c => c.lat, dir: 'min', gap: 2.0, unit: c => `${c.lat.toFixed(2)}° K · ${MK.formatHours(MK.dayLengthHours(c.lat, -23.45))}`, why: '21 Aralık\'ta kuzeye gidildikçe gündüz KISALIR; güneydeki ilin gündüzü daha uzundur.' },
      { text: '<strong>21 Aralık</strong>\'ta <strong>GECESİ</strong> daha uzun olan?',   key: c => c.lat, dir: 'max', gap: 2.0, unit: c => `${c.lat.toFixed(2)}° K · gece ${MK.formatHours(24 - MK.dayLengthHours(c.lat, -23.45))}`, why: '21 Aralık\'ta en uzun geceyi en kuzeydeki il yaşar.' },
      { text: '<strong>21 Haziran</strong> öğlesinde <strong>GÖLGE BOYU</strong> daha kısa olan?', key: c => c.lat, dir: 'min', gap: 2.0, unit: c => `${c.lat.toFixed(2)}° K · açı ${MK.sunAngle(c.lat, 23.45).toFixed(1)}°`, why: 'Güneye gidildikçe ışınlar dikleşir, gölge kısalır.' },
      { text: '<strong>ÇİZGİSEL HIZI</strong> daha fazla olan?',                   key: c => c.lat, dir: 'min', gap: 2.0, unit: c => `${c.lat.toFixed(2)}° K · ${Math.round(MK.linearSpeed(c.lat))} km/sa`, why: 'Ekvatora yaklaştıkça (enlem küçüldükçe) çizgisel hız artar.' },
      { text: 'Gerçek – indirgenmiş sıcaklık <strong>FARKI</strong> daha fazla olan?', key: c => c.alt, dir: 'max', gap: 500, unit: c => `${c.alt} m · +${MK.reducedTempDiff(c.alt).toFixed(2)} °C`, why: 'Rakım yükseldikçe indirgeme farkı büyür (her 100 m\'de 0,5 °C).' }
    ];
  }

  start() {
    this.resetProgress();
    this.streak = 0;
    this.bestStreak = 0;
    this.geoMap.clearAll();
    this.geoMap.resetView();
    return this.nextRound();
  }

  nextRound() {
    this.answered = false;
    const q = MK.randomOf(CityDuelGame.QUESTIONS);
    const pair = MK.pickDistinct(TR_CITIES, 2, q.key, q.gap);
    const [a, b] = pair;
    const winner = q.dir === 'max'
      ? (q.key(a) > q.key(b) ? a : b)
      : (q.key(a) < q.key(b) ? a : b);

    this.current = { q, pair, correctId: winner.id };
    this.showPins(pair, null);
    this.startTimer();

    return this.baseView({
      badge: '🏃 5 saniyen var!',
      prompt: q.text,
      hint: 'Süre dolarsa tur yanlış sayılır. Hızlı cevap daha çok puan getirir.',
      options: pair.map(c => ({ id: c.id, label: c.name, sub: c.region })),
      mapPins: pair,
      timer: this.roundSeconds,
      streak: this.streak
    });
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.secondsLeft = this.roundSeconds;
    this.timerInterval = setInterval(() => {
      if (!this.isActive || this.answered) { clearInterval(this.timerInterval); return; }
      this.secondsLeft--;
      if (this.secondsLeft <= 0) {
        clearInterval(this.timerInterval);
        if (this.onTimeout) this.onTimeout(this.select(null));
        return;
      }
      if (this.onTick) this.onTick(this.secondsLeft);
    }, 1000);
  }

  select(cityId) {
    if (!this.isActive || this.answered) return null;
    this.answered = true;
    clearInterval(this.timerInterval);

    const { q, pair, correctId } = this.current;
    const timedOut = cityId === null;
    const ok = !timedOut && cityId === correctId;

    let earned = 0;
    if (ok) {
      // Hız bonusu: kalan her saniye +25 puan
      earned = 100 + Math.max(0, this.secondsLeft) * 25;
      this.score += earned;
      this.correctCount++;
      this.streak++;
      if (this.streak > this.bestStreak) this.bestStreak = this.streak;
    } else {
      this.streak = 0;
    }

    const winner = pair.find(c => c.id === correctId);
    const loser = pair.find(c => c.id !== correctId);

    this.history.push({
      left: `${this.round}. ${winner.name} / ${loser.name}`,
      right: timedOut ? 'süre doldu' : (ok ? `+${earned} puan` : 'yanlış'),
      ok
    });

    this.geoMap.highlightMultiChoiceAnswer(correctId, cityId || '');

    return this.baseView({
      badge: timedOut ? '⌛ Süre doldu!' : (ok ? '✓ Doğru!' : '✗ Yanlış'),
      prompt: q.text,
      options: pair.map(c => ({
        id: c.id,
        label: c.name,
        sub: q.unit(c),
        state: c.id === correctId ? 'correct' : (c.id === cityId ? 'wrong' : 'dim')
      })),
      timer: 0,
      streak: this.streak,
      feedback: {
        ok,
        title: timedOut ? `⌛ Süre doldu — Doğrusu: ${winner.name}` : (ok ? `✓ ${winner.name} (+${earned} puan)` : `✗ Doğrusu: ${winner.name}`),
        rows: pair.map(c => ({ label: c.name, value: q.unit(c), highlight: c.id === correctId })),
        note: q.why
      },
      showNext: true
    });
  }

  buildSummary() {
    const summary = super.buildSummary();
    summary.stats.push({ val: this.bestStreak, label: '🔥 En İyi Seri', cls: 'streak' });
    return summary;
  }

  exit() {
    this.isActive = false;
    this.answered = false;
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.geoMap.clearAll();
  }
}
