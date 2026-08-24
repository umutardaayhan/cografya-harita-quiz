/**
 * 📐 MUTLAK (MATEMATİKSEL) KONUM OYUN MOTORLARI
 *
 * 5 mod:
 *   ☀️ SunShadowGame        - Güneş açısı & gölge boyu kapışması
 *   🌡️ TempDetectiveGame     - İndirgenmiş vs. gerçek sıcaklık dedektifi
 *   🌓 DayNightOrderGame     - Gece-gündüz süre farkı avcısı (sıralama)
 *   🎯 CoordinateHunterGame  - Paralel-meridyen koordinat avcısı (harita tıklama)
 *   🏃 CityDuelGame          - Şehir kapışması (süreli hızlı seçim)
 *
 * DİNAMİK AYARLAR (sol alt kontrol panelinden):
 *   • Şık sayısı  -> tur başına kaç seçenek/kart üretileceği
 *                    (Koordinat Avcısı'nda: kaç koordinat turu ekleneceği)
 *   • Zorluk 1-5  -> seçeneklerin birbirine COĞRAFİ YAKINLIĞI.
 *                    1 = uçlar (Hatay/Sinop gibi), 5 = neredeyse aynı enlem/rakım.
 *                    (Koordinat Avcısı'nda: ızgara detayı + puanlama toleransı)
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

  /**
   * Zorluk kademesi, şıkların TOPLAM coğrafi yayılımını belirler.
   * 1.0 = şıklar Türkiye'nin bir ucundan diğerine, 0.16 = hepsi dar bir kuşakta.
   * (Sabit "minimum aralık" yaklaşımı, şık sayısı arttıkça havuza sığmadığı için
   *  seviyeleri birbirinin aynısı yapıyordu.)
   */
  SPREAD: { 1: 1.0, 2: 0.75, 3: 0.52, 4: 0.32, 5: 0.16 },

  /** Cevabın tartışmasız kalması için iki şık arasındaki mutlak alt sınır */
  FLOOR: { lat: 0.15, lng: 0.35, alt: 45 },

  /** Zorluk kademesine göre zorluk etiketi */
  levelLabel(level) {
    return { 1: 'Kolay', 2: 'Orta-Kolay', 3: 'Orta', 4: 'Zor', 5: 'Uzman' }[level] || 'Orta';
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
   * Zorluğa göre n şehir seçer.
   *
   * Havuzun tam genişliği S ise, o turun hedef yayılımı T = S × SPREAD[zorluk].
   * Rastgele bir [lo, lo+T] kuşağı seçilir, kuşak n eşit dilime bölünür ve her
   * dilimden rastgele bir şehir alınır. Böylece hem zorluk gerçekten değişir
   * hem de aynı seviyede her tur farklı şehirler gelir.
   *
   * T asla (n−1) × floor × 1,3'ün altına inmez: iki şıkkın neredeyse eşit
   * değer alıp soruyu tartışmalı hale getirmesi engellenir.
   */
  pickBySpread(pool, count, keyFn, difficulty, floor) {
    const n = Math.min(count, pool.length);
    if (n < 2) return pool.slice(0, n);

    const sorted = pool.slice().sort((a, b) => keyFn(a) - keyFn(b));
    const minVal = keyFn(sorted[0]);
    const span = keyFn(sorted[sorted.length - 1]) - minVal;

    const frac = this.SPREAD[difficulty] !== undefined ? this.SPREAD[difficulty] : 0.52;
    const minSpan = (n - 1) * floor * 1.35;
    let target = Math.min(span, Math.max(span * frac, minSpan));

    /**
     * Kusak icinde n adet ESIT ARALIKLI "ideal konum" belirlenir; her biri icin
     * o konuma en yakin, henuz alinmamis ve bir oncekinden en az floor uzaktaki
     * sehir secilir. Ideal konumlara jitter eklenir ki ayni seviyede her tur
     * farkli sehirler gelsin.
     */
    const collect = (band, lo) => {
      const step = target / (n - 1);
      const used = new Set();
      const chosen = [];
      let last = -Infinity;

      for (let i = 0; i < n; i++) {
        const ideal = lo + i * step + (Math.random() * 2 - 1) * step * 0.35;
        let best = null;
        let bestDist = Infinity;
        for (const city of band) {
          if (used.has(city.id)) continue;
          const v = keyFn(city);
          if (v - last < floor) continue;
          const d = Math.abs(v - ideal);
          if (d < bestDist) { bestDist = d; best = city; }
        }
        if (!best) return chosen;
        used.add(best.id);
        chosen.push(best);
        last = keyFn(best);
      }
      return chosen;
    };

    for (let attempt = 0; attempt < 40; attempt++) {
      const lo = minVal + Math.random() * Math.max(0, span - target);
      const band = sorted.filter(c => keyFn(c) >= lo - 1e-9 && keyFn(c) <= lo + target + 1e-9);
      if (band.length >= n) {
        const chosen = collect(band, lo);
        if (chosen.length === n) return this.shuffle(chosen);
      }
      // Kusak bu zorlukta n adet ayrik sehir barindiramiyorsa kademeli genislet
      if (attempt % 8 === 7) target = Math.min(span, target * 1.2);
    }

    // Son care: tum havuza esit yayilmis secim (en genis ayrim, daima net cevap)
    const fallbackStep = (sorted.length - 1) / (n - 1);
    const fallback = [];
    for (let i = 0; i < n; i++) fallback.push(sorted[Math.round(i * fallbackStep)]);
    return this.shuffle(fallback);
  },

  /** Mesafeye göre puan. tolerance = "tam isabet" sayılan yarıçap (km). */
  distanceScore(km, tolerance) {
    const t = tolerance || 25;
    if (km <= t) return 1000;
    if (km <= t * 3) return Math.round(1000 - ((km - t) / (t * 2)) * 450);
    if (km <= t * 8) return Math.round(550 - ((km - t * 3) / (t * 5)) * 400);
    if (km <= t * 18) return Math.max(0, Math.round(150 - ((km - t * 8) / (t * 10)) * 150));
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

    // Dinamik ayarlar (app.js getSettings ile besler)
    this.getSettings = null;
    this.minOptionCount = 2;
    this.maxOptionCount = 10;
    this.optionCount = 4;
    this.difficulty = 5;
  }

  /** Sol alt panelde seçili şık sayısı ve zorluğu her turda yeniden okur */
  applySettings() {
    const s = (typeof this.getSettings === 'function' && this.getSettings()) || {};

    const level = parseInt(s.difficulty, 10);
    this.difficulty = Number.isFinite(level) ? Math.max(1, Math.min(5, level)) : 5;

    if (s.optionCount === 'all') {
      this.optionCount = this.maxOptionCount;
    } else {
      const raw = parseInt(s.optionCount, 10);
      const wanted = Number.isFinite(raw) ? raw : 4;
      this.optionCount = Math.max(this.minOptionCount, Math.min(this.maxOptionCount, wanted));
    }
  }

  /** HUD'da gösterilen "⚡ Sv.5 (Uzman) · 4 şık" rozeti */
  settingsLabel(optionWord = 'şık') {
    return `⚡ Sv.${this.difficulty} (${MK.levelLabel(this.difficulty)}) · ${this.optionCount} ${optionWord}`;
  }

  /** Bu zorlukta şıkların hangi coğrafi genişliğe yayıldığı (yüzde) */
  spreadPercent() {
    return Math.round((MK.SPREAD[this.difficulty] || 0.52) * 100);
  }

  resetProgress() {
    this.isActive = true;
    this.round = 1;
    this.score = 0;
    this.correctCount = 0;
    this.history = [];
    this.answered = false;
  }

  /**
   * Şehirleri haritada A-B-C-D pinleri olarak gösterir.
   * Pinler tıklanabilir: cevap panelden de haritadan da verilebilir
   * (standart "Haritada Bul" testiyle aynı davranış).
   */
  showPins(cities) {
    // `rozetSabit`: bu ailedeki oyunlarda pini panel kartina baglayan tek sey
    // A-B-C-D harfidir. "Gosterge Gizle" acikken harf gizlenince tum pinler
    // ayni anonim daireye donusuyor ve oyun oynanamaz hale geliyordu.
    this.geoMap.showMultipleChoiceLocations(cities, (cityId) => {
      if (this.onPinSelect) this.onPinSelect(cityId);
    }, { rozetSabit: true });
  }

  baseView(extra) {
    return Object.assign({
      mode: this.modeKey,
      title: this.modeTitle,
      round: this.round,
      maxRounds: this.maxRounds,
      score: this.score,
      settings: this.settingsLabel(),
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

  /** Ayarlar oyun ortasında değişince aynı turu yeni ayarlarla yeniden kurar */
  refreshRound() {
    if (!this.isActive) return null;
    this.answered = false;
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
      subtitle: `${this.modeTitle} · ${this.settingsLabel()}`,
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
    this.minOptionCount = 2;
    this.maxOptionCount = 10;
  }

  start() {
    this.resetProgress();
    this.geoMap.clearAll();
    this.geoMap.resetView();
    return this.nextRound();
  }

  nextRound() {
    this.answered = false;
    this.applySettings();

    const dateKey = MK.randomOf(Object.keys(MK.DATES));
    const dateInfo = MK.DATES[dateKey];
    const criteria = [
      { key: 'dik',        text: 'Güneş ışınlarını öğle vakti <strong>EN DİK</strong> alan il hangisidir?', wantMaxAngle: true },
      { key: 'kisa_golge', text: 'Öğle vakti gölge boyu <strong>EN KISA</strong> olan il hangisidir?',      wantMaxAngle: true },
      { key: 'uzun_golge', text: 'Öğle vakti gölge boyu <strong>EN UZUN</strong> olan il hangisidir?',      wantMaxAngle: false },
      { key: 'egik',       text: 'Güneş ışınlarını öğle vakti <strong>EN EĞİK</strong> alan il hangisidir?', wantMaxAngle: false }
    ];
    const criterion = MK.randomOf(criteria);

    const cities = MK.pickBySpread(TR_CITIES, this.optionCount, c => c.lat, this.difficulty, MK.FLOOR.lat);
    const scored = cities.map(c => ({
      city: c,
      angle: MK.sunAngle(c.lat, dateInfo.decl),
      shadow: MK.shadowLength(c.lat, dateInfo.decl)
    }));

    const sorted = scored.slice().sort((a, b) => b.angle - a.angle);
    const winner = criterion.wantMaxAngle ? sorted[0] : sorted[sorted.length - 1];
    const closestGap = Math.abs(sorted[0].angle - sorted[1].angle);

    this.current = { dateKey, dateInfo, criterion, scored, correctId: winner.city.id };
    this.showPins(cities);

    return this.baseView({
      badge: `${dateInfo.icon} ${dateInfo.label} · ${dateInfo.note}`,
      prompt: criterion.text,
      hint: `Öğle vakti güneş açısı = 90° − |enlem − ${dateInfo.decl}°| · Enlemi dönenceye yakın olan ışığı daha dik alır. <em>Haritadaki pine de tıklayabilirsin.</em>` +
            (this.difficulty >= 4 ? ` <em>En yakın iki şık arasında yalnızca ${closestGap.toFixed(2)}° var.</em>` : ''),
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
    const wantsMax = criterion.wantMaxAngle;

    this.history.push({
      left: `${this.round}. ${dateInfo.label} · ${wantsMax ? 'en dik / en kısa gölge' : 'en eğik / en uzun gölge'}`,
      right: winnerName,
      ok
    });

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
    this.minOptionCount = 2;
    this.maxOptionCount = 10;
  }

  start() {
    this.resetProgress();
    this.geoMap.clearAll();
    this.geoMap.resetView();
    return this.nextRound();
  }

  nextRound() {
    this.answered = false;
    this.applySettings();

    const kind = MK.randomOf(['max', 'max', 'min', 'coastal']);
    let cities, correctId, prompt, hint;

    if (kind === 'coastal') {
      // Tam olarak BİR tane alçak (kıyı) il, geri kalanı yüksek olsun.
      // Zorluk arttıkça "yüksek" eşiği düşer; ayırt etmek zorlaşır.
      const highThreshold = { 1: 900, 2: 750, 3: 600, 4: 420, 5: 300 }[this.difficulty];
      const low = MK.shuffle(TR_CITIES.filter(c => c.alt <= 60));
      const highPool = TR_CITIES.filter(c => c.alt >= highThreshold);
      const high = MK.pickBySpread(highPool, this.optionCount - 1, c => c.alt, this.difficulty, MK.FLOOR.alt);
      cities = MK.shuffle([low[0], ...high]);
      correctId = low[0].id;
      prompt = 'Hangi ilin ölçülen sıcaklığı <strong>indirgeme gerektirmez</strong>; yani sıcaklığı neredeyse yalnızca <strong>ENLEM</strong> ile açıklanır?';
      hint = 'İndirgenmiş sıcaklık, yükseltinin etkisini silmek için hesaplanır. Rakımı deniz seviyesine yakın illerde gerçek ve indirgenmiş sıcaklık neredeyse aynıdır. <em>Haritadaki pine de tıklayabilirsin.</em>';
    } else {
      cities = MK.pickBySpread(TR_CITIES, this.optionCount, c => c.alt, this.difficulty, MK.FLOOR.alt);
      const sorted = cities.slice().sort((a, b) => b.alt - a.alt);
      correctId = (kind === 'max' ? sorted[0] : sorted[sorted.length - 1]).id;
      const closest = kind === 'max'
        ? sorted[0].alt - sorted[1].alt
        : sorted[sorted.length - 2].alt - sorted[sorted.length - 1].alt;
      prompt = kind === 'max'
        ? 'Gerçek sıcaklık ile indirgenmiş sıcaklık arasındaki fark <strong>EN FAZLA</strong> olan il hangisidir?'
        : 'Gerçek sıcaklık ile indirgenmiş sıcaklık arasındaki fark <strong>EN AZ</strong> olan il hangisidir?';
      hint = 'Her 100 metrede sıcaklık 0,5 °C değişir. Fark = (rakım ÷ 100) × 0,5 °C · Rakım yükseldikçe fark büyür. <em>Haritadaki pine de tıklayabilirsin.</em>' +
             (this.difficulty >= 4 ? ` <em>En yakın iki şık arasında yalnızca ${closest} m var.</em>` : '');
    }

    this.current = { kind, cities, correctId, prompt };
    this.showPins(cities);

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
    this.minOptionCount = 2;
    this.maxOptionCount = 8; // 8'den fazla kartı sıralamak oynanabilirliği bozuyor
    this.picked = [];
  }

  settingsLabel() {
    return super.settingsLabel('kart');
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
    this.applySettings();

    const dateKey = MK.randomOf(['haziran21', 'aralik21']);
    const dateInfo = MK.DATES[dateKey];
    const tasks = [
      { key: 'gunduz_uzun', text: 'GÜNDÜZÜ en <strong>UZUN</strong> olandan en <strong>KISA</strong> olana sırala', metric: 'day', desc: true },
      { key: 'gunduz_kisa', text: 'GÜNDÜZÜ en <strong>KISA</strong> olandan en <strong>UZUN</strong> olana sırala', metric: 'day', desc: false },
      { key: 'gece_uzun',   text: 'GECESİ en <strong>UZUN</strong> olandan en <strong>KISA</strong> olana sırala',  metric: 'night', desc: true }
    ];
    const task = MK.randomOf(tasks);

    const cities = MK.pickBySpread(TR_CITIES, this.optionCount, c => c.lat, this.difficulty, MK.FLOOR.lat);
    const measured = cities.map(c => {
      const day = MK.dayLengthHours(c.lat, dateInfo.decl);
      return { city: c, day, night: 24 - day };
    });

    const value = m => (task.metric === 'day' ? m.day : m.night);
    const correctOrder = measured.slice()
      .sort((a, b) => task.desc ? value(b) - value(a) : value(a) - value(b))
      .map(m => m.city.id);

    // En yakın iki şehir arasındaki süre farkı (dakika) - zor seviyelerde ipucu
    const sortedVals = measured.map(m => value(m) * 60).sort((a, b) => a - b);
    let tightest = Infinity;
    for (let i = 1; i < sortedVals.length; i++) tightest = Math.min(tightest, sortedVals[i] - sortedVals[i - 1]);

    this.current = { dateKey, dateInfo, task, measured, correctOrder };
    this.showPins(cities);

    return this.baseView({
      badge: `${dateInfo.icon} ${dateInfo.label} · Sıralama`,
      prompt: task.text,
      hint: `${dateInfo.label}'da Kuzey Yarım Küre'de kuzeye gidildikçe gündüz ${dateInfo.decl > 0 ? 'UZAR' : 'KISALIR'}. ${this.optionCount} şehri istenen sıraya göre tek tek tıkla — panelden ya da doğrudan haritadaki pinlerden.` +
            (this.difficulty >= 4 && Number.isFinite(tightest) ? ` <em>En yakın iki şehir arasında yalnızca ${tightest.toFixed(0)} dakika var.</em>` : ''),
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
    this.pointsPerRound = 1000;
    this.minOptionCount = 2;
    this.maxOptionCount = 10;
    this.gridLayer = L.layerGroup();
    this.guessLayer = L.layerGroup();
    if (this.geoMap && this.geoMap.map) {
      this.gridLayer.addTo(this.geoMap.map);
      this.guessLayer.addTo(this.geoMap.map);
    }
    this.prevLabelsEnabled = null;
  }

  /** Bu modda "şık sayısı" = uç noktalara eklenen koordinat turu sayısı */
  settingsLabel() {
    return `⚡ Sv.${this.difficulty} (${MK.levelLabel(this.difficulty)}) · ${this.optionCount} koordinat turu`;
  }

  /** Zorluk arttıkça ızgara seyrekleşir, etiketler kaybolur, tolerans daralır */
  get gridProfile() {
    return {
      1: { latStep: 1, lngStep: 1, labelEvery: 1, tolerance: 70, showHint: true },
      2: { latStep: 1, lngStep: 1, labelEvery: 1, tolerance: 50, showHint: true },
      3: { latStep: 1, lngStep: 1, labelEvery: 2, tolerance: 35, showHint: true },
      4: { latStep: 1, lngStep: 2, labelEvery: 4, tolerance: 22, showHint: false },
      5: { latStep: 2, lngStep: 2, labelEvery: 0, tolerance: 12, showHint: false }
    }[this.difficulty];
  }

  /** Paralel ve meridyen ızgarasını haritaya çizer */
  drawGraticule() {
    this.gridLayer.clearLayers();
    const p = this.gridProfile;

    for (let lat = 36; lat <= 42; lat += p.latStep) {
      this.gridLayer.addLayer(L.polyline([[lat, 25], [lat, 46]], {
        color: '#38bdf8', weight: lat % 2 === 0 ? 1.4 : 0.8, opacity: 0.5, dashArray: '5, 7', interactive: false
      }));
      if (p.labelEvery > 0 && lat % p.labelEvery === 0) {
        this.gridLayer.addLayer(L.marker([lat, 25.9], {
          interactive: false,
          icon: L.divIcon({ className: 'mk-grid-label', html: `<span>${lat}°K</span>`, iconSize: [40, 16], iconAnchor: [20, 8] })
        }));
      }
    }

    for (let lng = 26; lng <= 45; lng += p.lngStep) {
      this.gridLayer.addLayer(L.polyline([[35.5, lng], [42.5, lng]], {
        color: '#38bdf8', weight: lng % 2 === 0 ? 1.4 : 0.8, opacity: 0.5, dashArray: '5, 7', interactive: false
      }));
      if (p.labelEvery > 0 && lng % Math.max(2, p.labelEvery) === 0) {
        this.gridLayer.addLayer(L.marker([35.85, lng], {
          interactive: false,
          icon: L.divIcon({ className: 'mk-grid-label', html: `<span>${lng}°D</span>`, iconSize: [40, 16], iconAnchor: [20, 8] })
        }));
      }
    }
  }

  buildQueue() {
    // 4 uç nokta her zaman sorulur; üzerine "şık sayısı" kadar koordinat turu eklenir
    const extremes = MK.shuffle(TR_EXTREME_POINTS).map(p => ({ type: 'extreme', point: p }));
    const coords = MK.shuffle(TR_CITIES).slice(0, this.optionCount).map(c => ({ type: 'coord', city: c }));
    this.queue = MK.shuffle([...extremes, ...coords]);
    this.maxRounds = this.queue.length;
  }

  start() {
    this.resetProgress();
    this.applySettings();
    this.guessLayer.clearLayers();
    this.geoMap.clearAll();

    if (this.geoMap.map) {
      if (!this.geoMap.map.hasLayer(this.gridLayer)) this.gridLayer.addTo(this.geoMap.map);
      if (!this.geoMap.map.hasLayer(this.guessLayer)) this.guessLayer.addTo(this.geoMap.map);
    }

    // Dilsiz harita: kalıcı ayara DOKUNMADAN geçici override
    if (this.prevLabelsEnabled === null) this.prevLabelsEnabled = this.geoMap.labelsEnabled;
    this.geoMap.setLabelsEnabled(false, false);

    this.buildQueue();
    this.drawGraticule();
    this.geoMap.resetView();
    return this.nextRound();
  }

  /** Ayar değişince kuyruğu ve ızgarayı baştan kurmak gerekir */
  refreshRound() {
    if (!this.isActive) return null;
    const prevCount = this.optionCount;
    const prevDiff = this.difficulty;
    this.applySettings();
    if (this.optionCount !== prevCount) {
      this.buildQueue();
      this.round = Math.min(this.round, this.maxRounds);
    }
    if (this.difficulty !== prevDiff) this.drawGraticule();
    this.answered = false;
    return this.nextRound();
  }

  nextRound() {
    this.answered = false;
    this.applySettings();
    this.guessLayer.clearLayers();
    this.geoMap.resetView();

    const task = this.queue[this.round - 1];
    if (!task) return this.baseView({ finished: true, summary: this.buildSummary() });
    this.current = task;
    const p = this.gridProfile;

    if (task.type === 'extreme') {
      const pt = task.point;
      return this.baseView({
        badge: `${pt.icon} Türkiye'nin Uç Noktaları`,
        prompt: `Türkiye'nin <strong>en ${pt.dir.toLowerCase()}</strong> noktası olan <strong>${pt.name}</strong>'nu haritada tıkla.`,
        hint: p.showHint
          ? `İpucu: ${pt.coordText} · Izgaradaki paralel ve meridyenleri kullan.`
          : `Bu seviyede koordinat ipucu yok. ${p.tolerance} km içinde tıklarsan tam puan.`,
        options: null,
        mapPins: null
      });
    }

    const c = task.city;
    return this.baseView({
      badge: '🎯 Koordinat Okuma',
      prompt: `<strong>${MK.formatCoord(c.lat, true)}</strong> &nbsp;–&nbsp; <strong>${MK.formatCoord(c.lng, false)}</strong> koordinatını haritada tıkla.`,
      hint: p.labelEvery > 0
        ? `Önce paraleli (yatay çizgi), sonra meridyeni (dikey çizgi) bul; kesiştikleri noktaya tıkla. Tam puan sınırı: ${p.tolerance} km.`
        : `Izgarada etiket yok — dereceleri kendin saymalısın. Tam puan sınırı: ${p.tolerance} km.`,
      options: null,
      mapPins: null
    });
  }

  handleMapClick(lat, lng) {
    if (!this.isActive || this.answered || !this.current) return null;
    this.answered = true;

    const target = this.current.type === 'extreme' ? this.current.point : this.current.city;
    const tolerance = this.gridProfile.tolerance;
    const km = MK.haversineKm(lat, lng, target.lat, target.lng);
    const earned = MK.distanceScore(km, tolerance);
    this.score += earned;
    if (km <= tolerance * 3) this.correctCount++;

    this.history.push({
      left: `${this.round}. ${target.name}`,
      right: `${km} km · +${earned} puan`,
      ok: km <= tolerance * 3
    });

    this.renderResultOnMap(lat, lng, target, km, earned, tolerance);

    const isExtreme = this.current.type === 'extreme';
    const rows = [
      { label: 'Tıkladığın nokta', value: `${MK.formatCoord(lat, true)} – ${MK.formatCoord(lng, false)}` },
      { label: 'Doğru konum', value: `${MK.formatCoord(target.lat, true)} – ${MK.formatCoord(target.lng, false)}`, highlight: true },
      { label: 'Sapma', value: `${km} km (tam puan sınırı ${tolerance} km)` }
    ];

    return this.baseView({
      badge: isExtreme ? `${this.current.point.icon} Uç Nokta` : '🎯 Koordinat Okuma',
      prompt: `<strong>${target.name}</strong>${isExtreme ? ` · ${this.current.point.place}` : ''}`,
      options: null,
      feedback: {
        ok: km <= tolerance * 3,
        title: km <= tolerance ? `🎯 Tam isabet! (+${earned})` : (km <= tolerance * 3 ? `✓ Yakın — ${km} km (+${earned})` : `${km} km saptın (+${earned})`),
        rows,
        note: isExtreme ? this.current.point.kpssNot
          : `Bu koordinat ${target.name} il merkezine karşılık gelir. Rakım ${target.alt} m, bölge: ${target.region}.`
      },
      showNext: true
    });
  }

  renderResultOnMap(lat, lng, target, km, earned, tolerance) {
    this.guessLayer.clearLayers();

    this.guessLayer.addLayer(L.polyline([[lat, lng], [target.lat, target.lng]], {
      color: km <= tolerance ? '#10b981' : km <= tolerance * 3 ? '#f59e0b' : '#ef4444',
      weight: 3, dashArray: '6, 8', opacity: 0.9
    }));

    // Tam puan yarıçapını göster: zorluk seviyesi görünür olsun
    this.guessLayer.addLayer(L.circle([target.lat, target.lng], {
      radius: tolerance * 1000,
      color: '#10b981', fillColor: '#10b981', fillOpacity: 0.1, weight: 1.5, dashArray: '4, 6'
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

    this.geoMap.flyToBoundsSafely(
      L.latLngBounds([[lat, lng], [target.lat, target.lng]]).pad(0.4)
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
// 🏃 9. ŞEHİR KAPIŞMASI (SÜRELİ HIZLI SEÇİM)
// ============================================================
class CityDuelGame extends MutlakKonumGameBase {
  constructor(mapInstance) {
    super(mapInstance);
    this.modeKey = 'duel';
    this.modeTitle = 'Şehir Kapışması';
    this.maxRounds = 10;
    this.pointsPerRound = 250;
    this.minOptionCount = 2;
    this.maxOptionCount = 10;
    this.timerInterval = null;
    this.streak = 0;
    this.bestStreak = 0;
  }

  /**
   * two : iki şehir varken karşılaştırmalı ifade  ("daha ileridir")
   * many: üç ve üzeri şehirde üstünlük ifadesi     ("EN ileridir")
   */
  static get QUESTIONS() {
    return [
      { keyType: 'lng', dir: 'max',
        two: 'Hangisinin <strong>YEREL SAATİ</strong> daha ileridir?',
        many: 'Hangisinin <strong>YEREL SAATİ</strong> EN ileridir?',
        unit: c => `${c.lng.toFixed(2)}° D`,
        why: 'Daha DOĞUDA olan ilin yerel saati ileridir.' },
      { keyType: 'lng', dir: 'max',
        two: 'Güneş hangisinde daha <strong>ERKEN DOĞAR</strong>?',
        many: 'Güneş hangisinde <strong>EN ERKEN</strong> doğar?',
        unit: c => `${c.lng.toFixed(2)}° D`,
        why: 'Dünya batıdan doğuya döndüğü için güneşi önce doğudaki il görür.' },
      { keyType: 'lng', dir: 'min',
        two: 'Güneş hangisinde daha <strong>GEÇ BATAR</strong>?',
        many: 'Güneş hangisinde <strong>EN GEÇ</strong> batar?',
        unit: c => `${c.lng.toFixed(2)}° D`,
        why: 'Daha BATIDA olan ilde güneş daha geç batar.' },
      { keyType: 'lat', dir: 'max',
        two: '<strong>21 Haziran</strong>\'da <strong>GÜNDÜZÜ</strong> daha uzun olan?',
        many: '<strong>21 Haziran</strong>\'da <strong>GÜNDÜZÜ EN UZUN</strong> olan?',
        unit: c => `${c.lat.toFixed(2)}° K · ${MK.formatHours(MK.dayLengthHours(c.lat, 23.45))}`,
        why: '21 Haziran\'da Kuzey Yarım Küre\'de kuzeye gidildikçe gündüz uzar.' },
      { keyType: 'lat', dir: 'min',
        two: '<strong>21 Aralık</strong>\'ta <strong>GÜNDÜZÜ</strong> daha uzun olan?',
        many: '<strong>21 Aralık</strong>\'ta <strong>GÜNDÜZÜ EN UZUN</strong> olan?',
        unit: c => `${c.lat.toFixed(2)}° K · ${MK.formatHours(MK.dayLengthHours(c.lat, -23.45))}`,
        why: '21 Aralık\'ta kuzeye gidildikçe gündüz KISALIR; güneydeki ilin gündüzü daha uzundur.' },
      { keyType: 'lat', dir: 'max',
        two: '<strong>21 Aralık</strong>\'ta <strong>GECESİ</strong> daha uzun olan?',
        many: '<strong>21 Aralık</strong>\'ta <strong>GECESİ EN UZUN</strong> olan?',
        unit: c => `${c.lat.toFixed(2)}° K · gece ${MK.formatHours(24 - MK.dayLengthHours(c.lat, -23.45))}`,
        why: '21 Aralık\'ta en uzun geceyi en kuzeydeki il yaşar.' },
      { keyType: 'lat', dir: 'min',
        two: '<strong>21 Haziran</strong> öğlesinde <strong>GÖLGE BOYU</strong> daha kısa olan?',
        many: '<strong>21 Haziran</strong> öğlesinde <strong>GÖLGE BOYU EN KISA</strong> olan?',
        unit: c => `${c.lat.toFixed(2)}° K · açı ${MK.sunAngle(c.lat, 23.45).toFixed(1)}°`,
        why: 'Güneye gidildikçe ışınlar dikleşir, gölge kısalır.' },
      { keyType: 'lat', dir: 'min',
        two: '<strong>ÇİZGİSEL HIZI</strong> daha fazla olan?',
        many: '<strong>ÇİZGİSEL HIZI EN FAZLA</strong> olan?',
        unit: c => `${c.lat.toFixed(2)}° K · ${Math.round(MK.linearSpeed(c.lat))} km/sa`,
        why: 'Ekvatora yaklaştıkça (enlem küçüldükçe) çizgisel hız artar.' },
      { keyType: 'alt', dir: 'max',
        two: 'Gerçek – indirgenmiş sıcaklık <strong>FARKI</strong> daha fazla olan?',
        many: 'Gerçek – indirgenmiş sıcaklık <strong>FARKI EN FAZLA</strong> olan?',
        unit: c => `${c.alt} m · +${MK.reducedTempDiff(c.alt).toFixed(2)} °C`,
        why: 'Rakım yükseldikçe indirgeme farkı büyür (her 100 m\'de 0,5 °C).' }
    ];
  }

  /** Şık sayısı arttıkça okuma süresi de artsın: 2 şık = 5 sn, 6 şık = 9 sn */
  get roundSeconds() {
    return 3 + this.optionCount;
  }

  keyFn(keyType) {
    return keyType === 'lng' ? (c => c.lng) : keyType === 'alt' ? (c => c.alt) : (c => c.lat);
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
    clearInterval(this.timerInterval);
    this.applySettings();

    const q = MK.randomOf(CityDuelGame.QUESTIONS);
    const key = this.keyFn(q.keyType);
    const cities = MK.pickBySpread(TR_CITIES, this.optionCount, key, this.difficulty, MK.FLOOR[q.keyType]);

    const sorted = cities.slice().sort((a, b) => key(b) - key(a));
    const winner = q.dir === 'max' ? sorted[0] : sorted[sorted.length - 1];

    this.current = { q, key, cities, correctId: winner.id };
    this.showPins(cities);
    this.startTimer();

    return this.baseView({
      badge: `🏃 ${this.roundSeconds} saniyen var!`,
      prompt: this.optionCount === 2 ? q.two : q.many,
      hint: 'Süre dolarsa tur yanlış sayılır. Hızlı cevap daha çok puan getirir. <em>Haritadaki pine de tıklayabilirsin.</em>',
      options: cities.map(c => ({ id: c.id, label: c.name, sub: c.region })),
      mapPins: cities,
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

    const { q, cities, correctId } = this.current;
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

    const winner = cities.find(c => c.id === correctId);

    this.history.push({
      left: `${this.round}. ${winner.name} (${cities.length} şehir)`,
      right: timedOut ? 'süre doldu' : (ok ? `+${earned} puan` : 'yanlış'),
      ok
    });

    return this.baseView({
      badge: timedOut ? '⌛ Süre doldu!' : (ok ? '✓ Doğru!' : '✗ Yanlış'),
      prompt: this.optionCount === 2 ? q.two : q.many,
      options: cities.map(c => ({
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
        rows: cities.slice()
          .sort((a, b) => this.current.key(b) - this.current.key(a))
          .map(c => ({ label: c.name, value: q.unit(c), highlight: c.id === correctId })),
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
