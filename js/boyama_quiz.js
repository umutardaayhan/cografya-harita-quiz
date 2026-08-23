/**
 * 🖌️ HARİTA BOYAMA OYUNU
 *
 * "Karstik göllerin bulunduğu alanları boya" der; kullanıcı haritadaki
 * ızgara hücrelerini fırçayla boyar; isabet oranına göre puan alır.
 * Ardından o sınıfın gölleri/dağları tek tek quiz olarak sorulur.
 *
 * Neden ızgara?
 * Serbest fırçayla çizilen şekli adilce puanlamak zor. Izgara hem objektif
 * bir ölçüm verir (hangi hücre boyandı / hangisinde hedef var) hem de
 * "yaklaşık doğru" cevaplara tolerans tanımayı kolaylaştırır.
 *
 * Puanlama, kapsama (recall) ve isabet (precision) değerlerinin harmonik
 * ortalamasıdır. Sadece kapsama ölçülseydi tüm haritayı boyamak tam puan
 * verirdi; sadece isabet ölçülseydi tek hücre boyamak yeterdi.
 *
 * Sınıflandırma olusum_quiz.js'teki doğrulanmış taksonomiyi kullanır.
 */

const BOYAMA_ALANI = { latMin: 35.8, latMax: 42.3, lngMin: 25.6, lngMax: 45.0 };

/** Zorluk: hücre boyutu (derece) ve komşu toleransı (hücre) */
const BOYAMA_ZORLUK = {
  1: { hucre: 1.30, tolerans: 2 },
  2: { hucre: 1.05, tolerans: 2 },
  3: { hucre: 0.85, tolerans: 1 },
  4: { hucre: 0.65, tolerans: 1 },
  // Sv5'te tolerans 0 denendi ama tek karelik sapma bile puani sifirliyordu.
  // Uzmanlik farki artik hucre boyutundan geliyor: 0,5 derece ~ 45 km.
  5: { hucre: 0.50, tolerans: 1 }
};

class MapPaintGame extends MutlakKonumGameBase {
  constructor(mapInstance) {
    super(mapInstance);
    this.modeKey = 'boyama';
    this.modeTitle = 'Harita Boyama';
    this.maxRounds = 5;
    this.pointsPerRound = 1000 + 300; // boyama + 3 quiz sorusu
    this.minOptionCount = 2;
    this.maxOptionCount = 8;

    this.gridLayer = L.layerGroup();
    this.hedefLayer = L.layerGroup();
    this.hucreler = new Map();      // "r_c" -> L.rectangle
    this.boyali = new Set();
    this.faz = 'boyama';
    this.quizKuyrugu = [];
    this.quizIdx = 0;
    this.firca = { aktif: false, silme: false };
    this.onPaintProgress = null;
    // Boyama ve quiz basarilari ayri olculur; tek sayacta toplanınca
    // ozet "8/5 dogru tur" gibi anlamsiz bir deger gosteriyordu.
    this.boyamaSkorlari = [];
    this.quizDogru = 0;
    this.quizToplam = 0;

    if (this.geoMap && this.geoMap.map) {
      this.gridLayer.addTo(this.geoMap.map);
      this.hedefLayer.addTo(this.geoMap.map);
    }
    this._bindMap();
  }

  // ---------------------------------------------------------------
  // IZGARA
  // ---------------------------------------------------------------
  get profil() {
    return BOYAMA_ZORLUK[this.difficulty] || BOYAMA_ZORLUK[3];
  }

  hucreAnahtari(lat, lng) {
    const c = this.profil.hucre;
    const r = Math.floor((lat - BOYAMA_ALANI.latMin) / c);
    const k = Math.floor((lng - BOYAMA_ALANI.lngMin) / c);
    return `${r}_${k}`;
  }

  hucreSinirlari(anahtar) {
    const c = this.profil.hucre;
    const [r, k] = anahtar.split('_').map(Number);
    const lat = BOYAMA_ALANI.latMin + r * c;
    const lng = BOYAMA_ALANI.lngMin + k * c;
    return [[lat, lng], [lat + c, lng + c]];
  }

  cizIzgara() {
    this.gridLayer.clearLayers();
    this.hucreler.clear();
    const c = this.profil.hucre;

    for (let lat = BOYAMA_ALANI.latMin; lat < BOYAMA_ALANI.latMax; lat += c) {
      for (let lng = BOYAMA_ALANI.lngMin; lng < BOYAMA_ALANI.lngMax; lng += c) {
        const anahtar = this.hucreAnahtari(lat + c / 2, lng + c / 2);
        const dikdortgen = L.rectangle(this.hucreSinirlari(anahtar), {
          className: 'boyama-hucre',
          color: '#38bdf8', weight: 0.5, opacity: 0.25,
          fillColor: '#38bdf8', fillOpacity: 0.02,
          interactive: false      // tıklama haritaya geçsin, fırça oradan yönetilir
        });
        this.gridLayer.addLayer(dikdortgen);
        this.hucreler.set(anahtar, dikdortgen);
      }
    }
  }

  hucreBoya(anahtar, sil) {
    const d = this.hucreler.get(anahtar);
    if (!d) return;
    if (sil) {
      if (!this.boyali.has(anahtar)) return;
      this.boyali.delete(anahtar);
      d.setStyle({ fillColor: '#38bdf8', fillOpacity: 0.02, color: '#38bdf8', weight: 0.5, opacity: 0.25 });
    } else {
      if (this.boyali.has(anahtar)) return;
      this.boyali.add(anahtar);
      d.setStyle({ fillColor: '#f59e0b', fillOpacity: 0.45, color: '#fbbf24', weight: 1, opacity: 0.8 });
    }
    if (this.onPaintProgress) this.onPaintProgress(this.boyali.size);
  }

  // ---------------------------------------------------------------
  // FIRÇA (harita etkileşimi)
  // ---------------------------------------------------------------
  /**
   * Fırça, Leaflet'in mouse olaylari yerine Pointer Events ile baglanir.
   * Leaflet dokunmatikte surekli mousemove uretmedigi icin tablette firca
   * darbesi calismiyordu; pointer olaylari fare, dokunmatik ve kalemi
   * tek kodla kapsar.
   */
  _bindMap() {
    const map = this.geoMap.map;
    const kap = map.getContainer();

    const konumdanLatLng = (e) => {
      const r = kap.getBoundingClientRect();
      return map.containerPointToLatLng(L.point(e.clientX - r.left, e.clientY - r.top));
    };

    this._onDown = (e) => {
      if (!this.isActive || this.faz !== 'boyama' || this.answered) return;
      if (e.button !== undefined && e.button !== 0) return;
      const ll = konumdanLatLng(e);
      const anahtar = this.hucreAnahtari(ll.lat, ll.lng);
      if (!this.hucreler.has(anahtar)) return;

      e.preventDefault();
      // Dolu bir hücreden başlayan darbe siler, boş hücreden başlayan boyar
      this.firca.silme = this.boyali.has(anahtar);
      this.firca.aktif = true;
      map.dragging.disable();
      this.hucreBoya(anahtar, this.firca.silme);
    };

    this._onMove = (e) => {
      if (!this.firca.aktif) return;
      e.preventDefault();
      const ll = konumdanLatLng(e);
      this.hucreBoya(this.hucreAnahtari(ll.lat, ll.lng), this.firca.silme);
    };

    this._onUp = () => {
      if (!this.firca.aktif) return;
      this.firca.aktif = false;
      map.dragging.enable();
    };

    kap.addEventListener('pointerdown', this._onDown);
    window.addEventListener('pointermove', this._onMove, { passive: false });
    window.addEventListener('pointerup', this._onUp);
    window.addEventListener('pointercancel', this._onUp);
  }

  // ---------------------------------------------------------------
  // HEDEF SINIF SEÇİMİ
  // ---------------------------------------------------------------
  /** Boyanmaya değecek kadar örneği olan (>=3) oluşum sınıflarını toplar */
  buildTargets() {
    const adaylar = [];
    Object.keys(OLUSUM_TAKSONOMISI).forEach(grupKey => {
      const grup = OLUSUM_TAKSONOMISI[grupKey];
      let items = (COGRAFYA_DATA[grup.kaynak || grupKey] || []).slice();
      if (typeof grup.onFiltre === 'function') items = items.filter(grup.onFiltre);

      const kova = {};
      items.forEach(it => {
        const s = FormationTypeGame.siniflandir(it, grup);
        if (!s) return;
        (kova[s.key] || (kova[s.key] = [])).push(it);
      });

      Object.keys(kova).forEach(sinifKey => {
        if (kova[sinifKey].length >= 3) {
          adaylar.push({
            grupKey, grup,
            sinif: grup.siniflar.find(s => s.key === sinifKey),
            items: kova[sinifKey]
          });
        }
      });
    });
    this.hedefler = adaylar;
    return adaylar;
  }

  // ---------------------------------------------------------------
  // AKIŞ
  // ---------------------------------------------------------------
  start() {
    this.resetProgress();
    this.applySettings();
    this.buildTargets();
    this.kullanilan = [];
    this.boyamaSkorlari = [];
    this.quizDogru = 0;
    this.quizToplam = 0;
    this.geoMap.clearAll();
    this.geoMap.resetView();
    return this.nextRound();
  }

  nextRound() {
    this.answered = false;
    this.faz = 'boyama';
    this.quizKuyrugu = [];
    this.quizIdx = 0;
    this.applySettings();

    if (!this.hedefler || !this.hedefler.length) this.buildTargets();

    let havuz = this.hedefler.filter(h => !this.kullanilan.includes(h.sinif.key + h.grupKey));
    if (!havuz.length) { this.kullanilan = []; havuz = this.hedefler; }
    const hedef = MK.randomOf(havuz);
    this.kullanilan.push(hedef.sinif.key + hedef.grupKey);

    this.aktifHedef = hedef;
    this.boyali.clear();
    this.hedefLayer.clearLayers();
    this.geoMap.clearAll();
    this.geoMap.resetView();
    this.cizIzgara();

    // Hedef hücreler: içinde en az bir örnek bulunan hücreler
    this.hedefHucreler = new Set(
      hedef.items
        .filter(it => typeof it.lat === 'number')
        .map(it => this.hucreAnahtari(it.lat, it.lng))
    );

    return this.baseView({
      badge: `🖌️ ${hedef.grup.label} · Alan Boyama`,
      prompt: `<strong>${trUpper(hedef.sinif.label)}</strong> sınıfına giren ${hedef.grup.cogulIn} bulunduğu alanları boya.`,
      hint: `Haritada sürükleyerek boya. Dolu bir kareden başlarsan o darbe siler. Türkiye'de ${hedef.items.length} adet ${hedef.sinif.label.toLowerCase()} var · hücre ${this.profil.hucre}° · tolerans ${this.profil.tolerans} kare`,
      options: [{ id: '__bitir__', label: '✅ Boyamayı Bitir', sub: 'Değerlendir ve puanı gör' }],
      paintMode: true,
      mapPins: null
    });
  }

  /** Boyanmış hücre, hedefe tolerans kadar yakınsa isabet sayılır */
  yakinMi(anahtar, kume, tolerans) {
    if (kume.has(anahtar)) return true;
    if (tolerans <= 0) return false;
    const [r, k] = anahtar.split('_').map(Number);
    for (let dr = -tolerans; dr <= tolerans; dr++) {
      for (let dk = -tolerans; dk <= tolerans; dk++) {
        if (kume.has(`${r + dr}_${k + dk}`)) return true;
      }
    }
    return false;
  }

  /** Hedeflere tolerans kadar yakın olan tüm hücreler: "kabul edilebilir alan" */
  kabulBolgesi() {
    const tol = this.profil.tolerans;
    const kume = new Set();
    this.hedefHucreler.forEach(a => {
      const [r, k] = a.split('_').map(Number);
      for (let dr = -tol; dr <= tol; dr++) {
        for (let dk = -tol; dk <= tol; dk++) {
          const anahtar = `${r + dr}_${k + dk}`;
          if (this.hucreler.has(anahtar)) kume.add(anahtar);
        }
      }
    });
    return kume;
  }

  degerlendir() {
    const tol = this.profil.tolerans;
    const boyaliDizi = [...this.boyali];
    const hedefDizi = [...this.hedefHucreler];

    // Bölgeyi cömertçe boyamak cezalandırılmaz: hedefe tolerans kadar yakın
    // her hücre isabet sayılır.
    const isabetli = boyaliDizi.filter(a => this.yakinMi(a, this.hedefHucreler, tol)).length;
    const kapsanan = hedefDizi.filter(a => this.yakinMi(a, this.boyali, tol)).length;

    const isabet = boyaliDizi.length ? isabetli / boyaliDizi.length : 0;
    const kapsama = hedefDizi.length ? kapsanan / hedefDizi.length : 0;
    const f1 = (isabet + kapsama) > 0 ? (2 * isabet * kapsama) / (isabet + kapsama) : 0;

    // AŞIRI BOYAMA CEZASI: sadece tolerans kullanılsaydı "tüm haritayı boya"
    // stratejisi %50'ye yakın puan alırdı. Boyanan alan, kabul edilebilir
    // alanın kaç katıysa puan o oranda kırpılır.
    const kabul = Math.max(1, this.kabulBolgesi().size);
    const asim = Math.max(1, boyaliDizi.length / kabul);
    const carpan = 1 / asim;

    const oran = f1 * carpan;
    return {
      isabet: Math.round(isabet * 100),
      kapsama: Math.round(kapsama * 100),
      asim: Math.round(asim * 100) / 100,
      oran: Math.round(oran * 100),
      puan: Math.round(oran * 1000),
      boyananHucre: boyaliDizi.length,
      hedefHucre: hedefDizi.length,
      kabulHucre: kabul,
      kapsanan, isabetli
    };
  }

  /** Doğru alanı ve örnekleri haritada gösterir */
  cevabiGoster() {
    this.hedefLayer.clearLayers();

    this.hedefHucreler.forEach(anahtar => {
      const dogruBoyandi = this.yakinMi(anahtar, this.boyali, this.profil.tolerans);
      this.hedefLayer.addLayer(L.rectangle(this.hucreSinirlari(anahtar), {
        color: dogruBoyandi ? '#10b981' : '#ef4444',
        weight: 2,
        fillColor: dogruBoyandi ? '#10b981' : '#ef4444',
        fillOpacity: 0.3,
        interactive: false
      }));
    });

    this.aktifHedef.items.forEach(it => {
      if (typeof it.lat !== 'number') return;
      this.hedefLayer.addLayer(
        L.circleMarker([it.lat, it.lng], {
          radius: 6, fillColor: '#10b981', color: '#fff', weight: 2, fillOpacity: 1
        }).bindTooltip(it.name, { direction: 'top' })
      );
    });
  }

  select(secilenId) {
    if (!this.isActive || this.answered) return null;

    // --- Boyama fazı: değerlendirme ---
    if (this.faz === 'boyama') {
      if (secilenId !== '__bitir__') return null;
      this.answered = true;

      const s = this.degerlendir();
      this.score += s.puan;
      this.boyamaSkorlari.push(s.oran);
      this.cevabiGoster();

      const h = this.aktifHedef;
      this.history.push({
        left: `${this.round}. ${h.sinif.label} alanı`,
        right: `%${s.oran} isabet (+${s.puan})`,
        ok: s.oran >= 60
      });

      // Ardından gelecek tek tek sorular
      this.quizKuyrugu = MK.shuffle(h.items).slice(0, 3);

      return this.baseView({
        badge: `🖌️ ${h.grup.label} · Sonuç`,
        prompt: `<strong>${trUpper(h.sinif.label)}</strong> alanı — %${s.oran} isabet`,
        options: [],
        feedback: {
          ok: s.oran >= 60,
          title: s.oran >= 85 ? `🎯 Harika! %${s.oran} (+${s.puan} puan)`
               : s.oran >= 60 ? `✓ İyi — %${s.oran} (+${s.puan} puan)`
               : `%${s.oran} isabet (+${s.puan} puan)`,
          rows: [
            { label: 'Kapsama (hedefin ne kadarını buldun)', value: `%${s.kapsama} · ${s.kapsanan}/${s.hedefHucre} kare`, highlight: true },
            { label: 'İsabet (boyadığının ne kadarı doğru)', value: `%${s.isabet} · ${s.isabetli}/${s.boyananHucre} kare` },
            { label: 'Boyadığın alan', value: s.asim > 1.05 ? `${s.boyananHucre} kare — uygun alanın ${s.asim}× katı (puan kırpıldı)` : `${s.boyananHucre} kare — ölçülü` },
            { label: 'Toplam örnek', value: `${h.items.length} adet ${h.sinif.label.toLowerCase()}` }
          ],
          note: `Yeşil kareler doğru bulduğun alanlar, kırmızılar kaçırdıkların. Yeşil noktalar tek tek örnekler. Şimdi bunlardan ${this.quizKuyrugu.length} tanesi tek tek sorulacak.`
        },
        showNext: true,
        paintMode: false
      });
    }

    // --- Quiz fazı ---
    this.answered = true;
    const soru = this.quizKuyrugu[this.quizIdx];
    const dogru = secilenId === soru.id;
    this.quizToplam++;
    if (dogru) { this.score += 100; this.quizDogru++; }

    this.history.push({
      left: `${this.round}.${this.quizIdx + 1} ${soru.name}`,
      right: dogru ? '+100' : 'yanlış',
      ok: dogru
    });

    return this.baseView({
      badge: `🖌️ ${this.aktifHedef.sinif.label} · Soru ${this.quizIdx + 1}/${this.quizKuyrugu.length}`,
      prompt: this._quizMetni(soru),
      options: this.quizSecenekler.map(it => ({
        id: it.id, label: it.name, sub: it.region || '',
        state: it.id === soru.id ? 'correct' : (it.id === secilenId ? 'wrong' : 'dim')
      })),
      feedback: {
        ok: dogru,
        title: dogru ? `✓ Doğru — ${soru.name}` : `✗ Yanlış — Doğrusu: ${soru.name}`,
        rows: [
          { label: soru.name, value: soru.type, highlight: true },
          { label: 'Bölge', value: soru.region || '—' }
        ],
        note: soru.kpssNot || ''
      },
      showNext: true
    });
  }

  _quizMetni(item) {
    return `Haritada işaretli <strong>${this.aktifHedef.sinif.label.toLowerCase()}</strong> hangisidir?`;
  }

  _quizSoru() {
    this.answered = false;
    const soru = this.quizKuyrugu[this.quizIdx];
    const h = this.aktifHedef;

    // Çeldiriciler aynı gruptan, farklı yerler
    const havuz = (COGRAFYA_DATA[h.grup.kaynak || h.grupKey] || [])
      .filter(x => x.id !== soru.id && typeof x.lat === 'number');
    const celdirici = MK.shuffle(havuz).slice(0, Math.max(1, this.optionCount - 1));
    this.quizSecenekler = MK.shuffle([soru, ...celdirici]);

    this.hedefLayer.clearLayers();
    this.gridLayer.clearLayers();
    this.geoMap.clearAll();
    this.geoMap.highlightQuestionShape(soru);

    return this.baseView({
      badge: `🖌️ ${h.sinif.label} · Soru ${this.quizIdx + 1}/${this.quizKuyrugu.length}`,
      prompt: this._quizMetni(soru),
      hint: 'Boyadığın alandaki örnekler tek tek soruluyor.',
      options: this.quizSecenekler.map(it => ({ id: it.id, label: it.name, sub: it.region || '' })),
      mapPins: null
    });
  }

  next() {
    if (this.faz === 'boyama') {
      if (this.quizKuyrugu.length) {
        this.faz = 'quiz';
        this.quizIdx = 0;
        return this._quizSoru();
      }
      return super.next();
    }

    this.quizIdx++;
    if (this.quizIdx < this.quizKuyrugu.length) return this._quizSoru();
    return super.next();
  }

  buildSummary() {
    const ortalama = this.boyamaSkorlari.length
      ? Math.round(this.boyamaSkorlari.reduce((a, b) => a + b, 0) / this.boyamaSkorlari.length)
      : 0;

    let baslik = 'Acemi Boyacı';
    let rozet = '🖌️';
    if (ortalama >= 85) { baslik = 'Bölge Ustası'; rozet = '🏆'; }
    else if (ortalama >= 65) { baslik = 'İyi Nişancı'; rozet = '⭐'; }
    else if (ortalama >= 40) { baslik = 'Yolunu Bulan'; rozet = '🧭'; }

    return {
      badge: rozet,
      title: baslik,
      subtitle: `${this.modeTitle} · ${this.settingsLabel()}`,
      stats: [
        { val: this.score, label: '🏆 Toplam Puan', cls: 'record' },
        { val: `%${ortalama}`, label: '🖌️ Boyama Ortalaması', cls: 'correct' },
        { val: `${this.quizDogru}/${this.quizToplam}`, label: '✓ Quiz Doğru', cls: 'streak' }
      ],
      rows: this.history
    };
  }

  exit() {
    this.isActive = false;
    this.answered = false;
    this.firca.aktif = false;
    this.gridLayer.clearLayers();
    this.hedefLayer.clearLayers();
    this.boyali.clear();
    if (this.geoMap.map && this.geoMap.map.dragging) this.geoMap.map.dragging.enable();
    this.geoMap.clearAll();
  }
}
