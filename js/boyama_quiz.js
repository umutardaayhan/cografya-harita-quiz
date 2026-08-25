/**
 * 🖌️ HARİTA BOYAMA OYUNU (serbest fırça)
 *
 * "Karstik göllerin bulunduğu alanları boya" der; kullanıcı haritanın üzerine
 * gerçek bir boyama aracı gibi serbest darbelerle boyar; isabet oranına göre
 * puan alır. İstenirse ardından o sınıfın örnekleri tek tek sorulur.
 *
 * ÇİZİM: Harita konteynerinin üzerine bir <canvas> serilir. Darbeler coğrafi
 * koordinatta (latlng dizisi + metre yarıçap) saklanır, her harita
 * hareketinde yeniden çizilir. Böylece boya haritaya "yapışır": kaydırıp
 * yakınlaştırınca aynı bölgenin üzerinde kalır. Silgi, canvas üzerinde
 * destination-out ile çalışır.
 *
 * PUANLAMA: Serbest şekli adilce ölçmek için Türkiye üzerine seyrek bir
 * örnekleme ızgarası serilir; her örnek noktanın boyalı olup olmadığı
 * darbelere olan geometrik uzaklıkla belirlenir (görünümden bağımsız).
 * Sonra kapsama / isabet / aşırı boyama üçlüsü kilometre cinsinden hesaplanır.
 */

const BOYAMA_ALANI = { latMin: 35.8, latMax: 42.3, lngMin: 25.6, lngMax: 45.0 };

/** Puanlama örnekleme ızgarasının adımı (derece) — yaklaşık 20 km */
const ORNEKLEME_ADIMI = 0.2;

/** Fırça yarıçapları (metre) */
const FIRCA_BOYUTLARI = { kucuk: 22000, orta: 45000, buyuk: 78000 };

/** Zorluk: "doğru sayılan" mesafe toleransı (km) */
const BOYAMA_ZORLUK = {
  1: { toleransKm: 130 },
  2: { toleransKm: 105 },
  3: { toleransKm: 80 },
  4: { toleransKm: 55 },
  5: { toleransKm: 35 }
};

const BOYAMA_AYAR_KEY = 'kpss_boyama_ayarlari_v1';

class MapPaintGame extends MutlakKonumGameBase {
  constructor(mapInstance) {
    super(mapInstance);
    this.modeKey = 'boyama';
    this.modeTitle = 'Harita Boyama';
    this.maxRounds = 5;
    this.minOptionCount = 2;
    this.maxOptionCount = 8;

    this.darbeler = [];                 // [{ noktalar:[{lat,lng}], yaricapM, silgi }]
    this.aktifDarbe = null;
    this.firca = { boyut: 'orta', silgi: false, aktif: false };
    this.faz = 'boyama';
    this.quizKuyrugu = [];
    this.quizIdx = 0;
    this.onPaintProgress = null;

    this.boyamaSkorlari = [];
    this.quizDogru = 0;
    this.quizToplam = 0;

    const kayit = this._ayarlariYukle();
    this.sorularAcik = kayit.sorularAcik !== false;   // varsayılan: açık
    this.firca.boyut = kayit.fircaBoyutu || 'orta';

    this.hedefLayer = L.layerGroup();
    if (this.geoMap && this.geoMap.map) this.hedefLayer.addTo(this.geoMap.map);

    this._initCanvas();
    this._bindMap();
  }

  /** Sorular kapalıyken tur başına yalnızca boyama puanı verilir */
  get pointsPerRound() {
    return this.sorularAcik ? 1000 + 300 : 1000;
  }

  // ---------------------------------------------------------------
  // AYARLAR
  // ---------------------------------------------------------------
  _ayarlariYukle() {
    try { return JSON.parse(localStorage.getItem(BOYAMA_AYAR_KEY)) || {}; }
    catch (e) { return {}; }
  }

  _ayarlariKaydet() {
    try {
      localStorage.setItem(BOYAMA_AYAR_KEY, JSON.stringify({
        sorularAcik: this.sorularAcik,
        fircaBoyutu: this.firca.boyut
      }));
    } catch (e) { /* kota dolduysa sessizce geç */ }
  }

  setFircaBoyutu(boyut) {
    if (!FIRCA_BOYUTLARI[boyut]) return;
    this.firca.boyut = boyut;
    this._ayarlariKaydet();
  }

  setSilgi(acik) { this.firca.silgi = !!acik; }

  setSorular(acik) {
    this.sorularAcik = !!acik;
    this._ayarlariKaydet();
  }

  get yaricapM() { return FIRCA_BOYUTLARI[this.firca.boyut] || FIRCA_BOYUTLARI.orta; }
  get toleransKm() { return (BOYAMA_ZORLUK[this.difficulty] || BOYAMA_ZORLUK[3]).toleransKm; }

  // ---------------------------------------------------------------
  // TUVAL
  // ---------------------------------------------------------------
  /**
   * Tuval, Leaflet'in KENDİ pane sistemine özel bir pane olarak eklenir.
   *
   * Önce doğrudan harita konteynerine ekleniyordu; ancak tilePane (200) ve
   * overlayPane (400) .leaflet-map-pane'in (400) İÇİNDEDİR. Konteynerin
   * doğrudan çocuğu olan bir tuval, z-index 350 ile map-pane'in tamamının
   * altında kalıyor ve karolar tarafından örtülüyordu; boya yalnızca harita
   * katmanı değiştirilip karolar bir an kaybolduğunda görünüyordu.
   * Kendi pane'imizde 350, tilePane ile overlayPane arasına doğru oturur.
   */
  _initCanvas() {
    const map = this.geoMap.map;

    if (!map.getPane('boyamaPane')) {
      map.createPane('boyamaPane');
      const pane = map.getPane('boyamaPane');
      pane.style.zIndex = 350;          // karoların üstü, cevap katmanının altı
      pane.style.pointerEvents = 'none';
    }

    const c = document.createElement('canvas');
    c.className = 'boyama-tuval';
    map.getPane('boyamaPane').appendChild(c);
    this.canvas = c;
    this.ctx = c.getContext('2d');

    this._boyutlandir();
    this._redraw = this._redraw.bind(this);
    // Pan sırasında 'move', zoom bitiminde 'zoomend' yeterli: zoom animasyonu
    // boyunca map-pane'in CSS dönüşümü tuvali de birlikte ölçeklendirir.
    map.on('move moveend zoomend viewreset resize', this._redraw);
    window.addEventListener('resize', () => { this._boyutlandir(); this._redraw(); });
  }

  _boyutlandir() {
    const kap = this.geoMap.map.getContainer();
    const oran = window.devicePixelRatio || 1;
    this.canvas.width = kap.clientWidth * oran;
    this.canvas.height = kap.clientHeight * oran;
    this.canvas.style.width = `${kap.clientWidth}px`;
    this.canvas.style.height = `${kap.clientHeight}px`;
    this.ctx.setTransform(oran, 0, 0, oran, 0, 0);
  }

  /** Metre cinsinden yarıçapı, mevcut zoom'da piksele çevirir */
  _pikselYaricap(yaricapM) {
    const map = this.geoMap.map;
    const merkez = map.getCenter();
    const a = map.latLngToContainerPoint(merkez);
    const b = map.latLngToContainerPoint(
      L.latLng(merkez.lat, merkez.lng + yaricapM / (111320 * Math.cos(merkez.lat * Math.PI / 180)))
    );
    return Math.max(1, Math.abs(b.x - a.x));
  }

  _redraw() {
    if (!this.ctx) return;
    const map = this.geoMap.map;
    const kap = map.getContainer();
    if (this.canvas.style.width !== `${kap.clientWidth}px`) this._boyutlandir();

    // Tuval map-pane'in içinde olduğu için harita kaydırıldıkça birlikte
    // ötelenir; her karede görünüm penceresinin sol üstüne geri hizalanır.
    L.DomUtil.setPosition(this.canvas, map.containerPointToLayerPoint([0, 0]));

    this.ctx.clearRect(0, 0, kap.clientWidth, kap.clientHeight);
    if (!this.aktif()) return;
    if (map._animatingZoom) return;   // zoom animasyonunu CSS dönüşümü taşır

    const tum = this.aktifDarbe ? this.darbeler.concat([this.aktifDarbe]) : this.darbeler;
    tum.forEach(d => {
      const px = this._pikselYaricap(d.yaricapM);
      this.ctx.save();
      this.ctx.globalCompositeOperation = d.silgi ? 'destination-out' : 'source-over';
      this.ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)';
      this.ctx.fillStyle = 'rgba(245, 158, 11, 0.55)';
      this.ctx.lineWidth = px * 2;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';

      const noktalar = d.noktalar.map(n => map.latLngToContainerPoint(L.latLng(n.lat, n.lng)));
      if (noktalar.length === 1) {
        this.ctx.beginPath();
        this.ctx.arc(noktalar[0].x, noktalar[0].y, px, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.beginPath();
        noktalar.forEach((p, i) => (i ? this.ctx.lineTo(p.x, p.y) : this.ctx.moveTo(p.x, p.y)));
        this.ctx.stroke();
      }
      this.ctx.restore();
    });
  }

  aktif() { return this.isActive && this.faz === 'boyama'; }

  // ---------------------------------------------------------------
  // FIRÇA
  // ---------------------------------------------------------------
  _bindMap() {
    const map = this.geoMap.map;
    const kap = map.getContainer();

    const konum = (e) => {
      const r = kap.getBoundingClientRect();
      return map.containerPointToLatLng(L.point(e.clientX - r.left, e.clientY - r.top));
    };

    this._onDown = (e) => {
      if (!this.aktif() || this.answered) return;
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();
      const ll = konum(e);
      this.aktifDarbe = {
        noktalar: [{ lat: ll.lat, lng: ll.lng }],
        yaricapM: this.yaricapM,
        silgi: this.firca.silgi
      };
      this.firca.aktif = true;
      map.dragging.disable();
      this._redraw();
    };

    this._onMove = (e) => {
      if (!this.firca.aktif || !this.aktifDarbe) return;
      e.preventDefault();
      const ll = konum(e);
      const son = this.aktifDarbe.noktalar[this.aktifDarbe.noktalar.length - 1];
      // Çok yakın noktaları atla: hem çizim hem puanlama ucuzlar
      if (this.kmMesafe(son.lat, son.lng, ll.lat, ll.lng) < 3) return;
      this.aktifDarbe.noktalar.push({ lat: ll.lat, lng: ll.lng });
      this._redraw();
    };

    this._onUp = () => {
      if (!this.firca.aktif) return;
      this.firca.aktif = false;
      if (this.aktifDarbe) {
        this.darbeler.push(this.aktifDarbe);
        this.aktifDarbe = null;
      }
      map.dragging.enable();
      this._redraw();
      if (this.onPaintProgress) this.onPaintProgress(this.darbeler.length);
    };

    kap.addEventListener('pointerdown', this._onDown);
    window.addEventListener('pointermove', this._onMove, { passive: false });
    window.addEventListener('pointerup', this._onUp);
    window.addEventListener('pointercancel', this._onUp);
  }

  geriAl() {
    this.darbeler.pop();
    this._redraw();
    if (this.onPaintProgress) this.onPaintProgress(this.darbeler.length);
  }

  temizle() {
    this.darbeler = [];
    this.aktifDarbe = null;
    this._redraw();
    if (this.onPaintProgress) this.onPaintProgress(0);
  }

  // ---------------------------------------------------------------
  // GEOMETRİ
  // ---------------------------------------------------------------
  kmMesafe(lat1, lng1, lat2, lng2) {
    const dLat = (lat2 - lat1) * 111.32;
    const dLng = (lng2 - lng1) * 111.32 * Math.cos(((lat1 + lat2) / 2) * Math.PI / 180);
    return Math.hypot(dLat, dLng);
  }

  /** Noktanın bir doğru parçasına uzaklığı (km, yerel düzlem yaklaşımı) */
  _noktaSegmentKm(plat, plng, alat, alng, blat, blng) {
    const kx = 111.32 * Math.cos(plat * Math.PI / 180);
    const ky = 111.32;
    const px = plng * kx, py = plat * ky;
    const ax = alng * kx, ay = alat * ky;
    const bx = blng * kx, by = blat * ky;
    const dx = bx - ax, dy = by - ay;
    const uzunluk2 = dx * dx + dy * dy;
    let t = uzunluk2 ? ((px - ax) * dx + (py - ay) * dy) / uzunluk2 : 0;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
  }

  /**
   * Bir coğrafi noktanın boyalı olup olmadığı.
   * Darbeler SIRAYLA uygulanır: boya işaretler, silgi kaldırır.
   */
  boyaliMi(lat, lng) {
    let boyali = false;
    for (const d of this.darbeler) {
      const yariKm = d.yaricapM / 1000;
      let deger = false;
      const n = d.noktalar;
      if (n.length === 1) {
        deger = this.kmMesafe(lat, lng, n[0].lat, n[0].lng) <= yariKm;
      } else {
        for (let i = 1; i < n.length; i++) {
          if (this._noktaSegmentKm(lat, lng, n[i - 1].lat, n[i - 1].lng, n[i].lat, n[i].lng) <= yariKm) {
            deger = true;
            break;
          }
        }
      }
      if (deger) boyali = !d.silgi;
    }
    return boyali;
  }

  /** Örnekleme ızgarasındaki boyalı noktalar */
  boyaliOrnekler() {
    const noktalar = [];
    for (let lat = BOYAMA_ALANI.latMin; lat <= BOYAMA_ALANI.latMax; lat += ORNEKLEME_ADIMI) {
      for (let lng = BOYAMA_ALANI.lngMin; lng <= BOYAMA_ALANI.lngMax; lng += ORNEKLEME_ADIMI) {
        if (this.boyaliMi(lat, lng)) noktalar.push({ lat, lng });
      }
    }
    return noktalar;
  }

  // ---------------------------------------------------------------
  // HEDEF SINIFLAR
  // ---------------------------------------------------------------
  buildTargets() {
    const adaylar = [];
    const hedefler = Object.keys(OLUSUM_TAKSONOMISI).filter(grupKey => {
      if (!this.categoryFilter) return true;
      const grup = OLUSUM_TAKSONOMISI[grupKey];
      return grupKey === this.categoryFilter || (grup.kaynak && grup.kaynak === this.categoryFilter);
    });

    const aktifGruplar = hedefler.length > 0 ? hedefler : Object.keys(OLUSUM_TAKSONOMISI);

    aktifGruplar.forEach(grupKey => {
      const grup = OLUSUM_TAKSONOMISI[grupKey];
      let items = (COGRAFYA_DATA[grup.kaynak || grupKey] || []).slice();
      if (typeof grup.onFiltre === 'function') items = items.filter(grup.onFiltre);

      const kova = {};
      items.forEach(it => {
        const s = FormationTypeGame.siniflandir(it, grup);
        if (s && typeof it.lat === 'number') (kova[s.key] || (kova[s.key] = [])).push(it);
      });

      Object.keys(kova).forEach(k => {
        if (kova[k].length >= 3) {
          adaylar.push({ grupKey, grup, sinif: grup.siniflar.find(x => x.key === k), items: kova[k] });
        }
      });
    });
    this.hedefler = adaylar;
    return adaylar;
  }

  // ---------------------------------------------------------------
  // AKIŞ
  // ---------------------------------------------------------------
  start(categoryFilter = null) {
    this.resetProgress();
    this.categoryFilter = categoryFilter;
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

    this.temizle();
    this.hedefLayer.clearLayers();
    this.geoMap.clearAll();
    this.geoMap.resetView();

    return this.baseView({
      badge: `🖌️ ${hedef.grup.label} · Alan Boyama`,
      prompt: `<strong>${trUpper(hedef.sinif.label)}</strong> sınıfına giren ${hedef.grup.cogulIn} bulunduğu alanları boya.`,
      hint: `Haritada sürükleyerek serbestçe boya. Türkiye'de ${hedef.items.length} adet ${hedef.sinif.label.toLowerCase()} var · ${this.toleransKm} km yakınlık doğru sayılır`,
      options: [{ id: '__bitir__', label: '✅ Boyamayı Bitir', sub: 'Değerlendir ve puanı gör' }],
      paintMode: true,
      mapPins: null
    });
  }

  degerlendir() {
    const tol = this.toleransKm;
    const boyali = this.boyaliOrnekler();
    const hedefler = this.aktifHedef.items;

    const yakinHedefVar = (lat, lng) =>
      hedefler.some(h => this.kmMesafe(lat, lng, h.lat, h.lng) <= tol);

    const isabetli = boyali.filter(p => yakinHedefVar(p.lat, p.lng)).length;
    const kapsanan = hedefler.filter(h =>
      this.boyaliMi(h.lat, h.lng) ||
      boyali.some(p => this.kmMesafe(p.lat, p.lng, h.lat, h.lng) <= tol)
    ).length;

    const isabet = boyali.length ? isabetli / boyali.length : 0;
    const kapsama = hedefler.length ? kapsanan / hedefler.length : 0;
    const f1 = (isabet + kapsama) > 0 ? (2 * isabet * kapsama) / (isabet + kapsama) : 0;

    // AŞIRI BOYAMA CEZASI: yalnızca tolerans kullanılsaydı "tüm haritayı boya"
    // stratejisi yüksek puan alırdı. Boyanan alan, hedeflerin tolerans kadar
    // genişletilmiş "kabul bölgesi"nin kaç katıysa puan o oranda kırpılır.
    let kabul = 0;
    for (let lat = BOYAMA_ALANI.latMin; lat <= BOYAMA_ALANI.latMax; lat += ORNEKLEME_ADIMI) {
      for (let lng = BOYAMA_ALANI.lngMin; lng <= BOYAMA_ALANI.lngMax; lng += ORNEKLEME_ADIMI) {
        if (yakinHedefVar(lat, lng)) kabul++;
      }
    }
    const asim = Math.max(1, boyali.length / Math.max(1, kabul));
    const oran = f1 / asim;

    return {
      isabet: Math.round(isabet * 100),
      kapsama: Math.round(kapsama * 100),
      asim: Math.round(asim * 100) / 100,
      oran: Math.round(oran * 100),
      puan: Math.round(oran * 1000),
      boyaliNokta: boyali.length,
      kabulNokta: kabul,
      kapsanan,
      hedefSayisi: hedefler.length
    };
  }

  cevabiGoster() {
    this.hedefLayer.clearLayers();
    const tol = this.toleransKm;
    const boyali = this.boyaliOrnekler();

    this.aktifHedef.items.forEach(it => {
      const bulundu = this.boyaliMi(it.lat, it.lng) ||
        boyali.some(p => this.kmMesafe(p.lat, p.lng, it.lat, it.lng) <= tol);
      this.hedefLayer.addLayer(L.circle([it.lat, it.lng], {
        radius: tol * 1000,
        color: bulundu ? '#10b981' : '#ef4444',
        fillColor: bulundu ? '#10b981' : '#ef4444',
        fillOpacity: 0.1, weight: 1.5, dashArray: '4, 6', interactive: false
      }));
      this.hedefLayer.addLayer(L.circleMarker([it.lat, it.lng], {
        radius: 6, fillColor: bulundu ? '#10b981' : '#ef4444',
        color: '#fff', weight: 2, fillOpacity: 1
      }).bindTooltip(it.name, { direction: 'top' }));
    });
  }

  select(secilenId) {
    if (!this.isActive || this.answered) return null;

    // --- Boyama fazı ---
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

      if (this.sorularAcik) this.quizKuyrugu = MK.shuffle(h.items).slice(0, 3);

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
            { label: 'Kapsama (kaç örneği buldun)', value: `%${s.kapsama} · ${s.kapsanan}/${s.hedefSayisi}`, highlight: true },
            { label: 'İsabet (boyadığının ne kadarı doğru)', value: `%${s.isabet}` },
            { label: 'Boyadığın alan', value: s.asim > 1.05 ? `uygun alanın ${s.asim}× katı — puan kırpıldı` : 'ölçülü' }
          ],
          note: `Yeşil daireler bulduğun örnekler, kırmızılar kaçırdıkların. Daire yarıçapı ${this.toleransKm} km — doğru sayılan yakınlık.` +
                (this.sorularAcik
                  ? ` Şimdi ${this.quizKuyrugu.length} tanesi tek tek sorulacak.`
                  : ' Sorular kapalı; sonraki alana geçiliyor.')
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
      prompt: this._quizMetni(),
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

  _quizMetni() {
    return `Haritada işaretli <strong>${this.aktifHedef.sinif.label.toLowerCase()}</strong> hangisidir?`;
  }

  _quizSoru() {
    this.answered = false;
    const soru = this.quizKuyrugu[this.quizIdx];
    const h = this.aktifHedef;
    const havuz = (COGRAFYA_DATA[h.grup.kaynak || h.grupKey] || [])
      .filter(x => x.id !== soru.id && typeof x.lat === 'number');
    const celdirici = MK.shuffle(havuz).slice(0, Math.max(1, this.optionCount - 1));
    this.quizSecenekler = MK.shuffle([soru, ...celdirici]);

    this.hedefLayer.clearLayers();
    this.temizle();
    this.geoMap.clearAll();
    this.geoMap.highlightQuestionShape(soru);

    return this.baseView({
      badge: `🖌️ ${h.sinif.label} · Soru ${this.quizIdx + 1}/${this.quizKuyrugu.length}`,
      prompt: this._quizMetni(),
      hint: 'Boyadığın alandaki örnekler tek tek soruluyor.',
      options: this.quizSecenekler.map(it => ({ id: it.id, label: it.name, sub: it.region || '' })),
      mapPins: null
    });
  }

  next() {
    if (this.faz === 'boyama') {
      if (this.sorularAcik && this.quizKuyrugu.length) {
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
    const ort = this.boyamaSkorlari.length
      ? Math.round(this.boyamaSkorlari.reduce((a, b) => a + b, 0) / this.boyamaSkorlari.length)
      : 0;

    let baslik = 'Acemi Boyacı';
    let rozet = '🖌️';
    if (ort >= 85) { baslik = 'Bölge Ustası'; rozet = '🏆'; }
    else if (ort >= 65) { baslik = 'İyi Nişancı'; rozet = '⭐'; }
    else if (ort >= 40) { baslik = 'Yolunu Bulan'; rozet = '🧭'; }

    const stats = [
      { val: this.score, label: '🏆 Toplam Puan', cls: 'record' },
      { val: `%${ort}`, label: '🖌️ Boyama Ortalaması', cls: 'correct' }
    ];
    if (this.quizToplam) {
      stats.push({ val: `${this.quizDogru}/${this.quizToplam}`, label: '✓ Quiz Doğru', cls: 'streak' });
    }

    return {
      badge: rozet,
      title: baslik,
      subtitle: `${this.modeTitle} · ${this.settingsLabel()}${this.sorularAcik ? '' : ' · sadece boyama'}`,
      stats,
      rows: this.history
    };
  }

  exit() {
    this.isActive = false;
    this.answered = false;
    this.firca.aktif = false;
    this.temizle();
    this.hedefLayer.clearLayers();
    if (this.geoMap.map && this.geoMap.map.dragging) this.geoMap.map.dragging.enable();
    this.geoMap.clearAll();
  }
}
