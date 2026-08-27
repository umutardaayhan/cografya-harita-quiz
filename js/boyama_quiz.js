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

  _getItemSamplePoints(item) {
    if (!item) return [];
    const pts = [];

    const addPoint = (lat, lng) => {
      if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
        pts.push({ lat, lng });
      }
    };

    if (typeof item.lat === 'number' && typeof item.lng === 'number') {
      addPoint(item.lat, item.lng);
    }

    // Polyline ve Polygon için hat boyunca ara örnekleme (Interpolation)
    if (item.coordinates && Array.isArray(item.coordinates)) {
      const isPolygon = item.shapeType === 'polygon';

      const sampleLine = (coords) => {
        for (let i = 0; i < coords.length; i++) {
          addPoint(coords[i][0], coords[i][1]);
          if (i > 0 && Array.isArray(coords[i - 1]) && Array.isArray(coords[i])) {
            const p1 = coords[i - 1];
            const p2 = coords[i];
            const distKm = this.kmMesafe(p1[0], p1[1], p2[0], p2[1]);
            const steps = Math.max(1, Math.floor(distKm / 15)); // Her 15 km'de bir ara örnek nokta
            for (let s = 1; s < steps; s++) {
              const f = s / steps;
              addPoint(p1[0] + (p2[0] - p1[0]) * f, p1[1] + (p2[1] - p1[1]) * f);
            }
          }
        }
      };

      const flattenAndSample = (arr) => {
        if (!Array.isArray(arr) || !arr.length) return;
        if (typeof arr[0] === 'number') {
          addPoint(arr[0], arr[1]);
        } else if (Array.isArray(arr[0]) && typeof arr[0][0] === 'number') {
          sampleLine(arr);
          if (isPolygon && arr.length >= 3) {
            // Poligon kapanış çizgisi ara noktaları
            const pFirst = arr[0];
            const pLast = arr[arr.length - 1];
            const distKm = this.kmMesafe(pLast[0], pLast[1], pFirst[0], pFirst[1]);
            const steps = Math.max(1, Math.floor(distKm / 15));
            for (let s = 1; s < steps; s++) {
              const f = s / steps;
              addPoint(pLast[0] + (pFirst[0] - pLast[0]) * f, pLast[1] + (pFirst[1] - pLast[1]) * f);
            }
            // Poligon ağırlık merkezi (Centroid)
            let sumLat = 0, sumLng = 0;
            arr.forEach(c => { sumLat += c[0]; sumLng += c[1]; });
            addPoint(sumLat / arr.length, sumLng / arr.length);
          }
        } else {
          arr.forEach(flattenAndSample);
        }
      };

      flattenAndSample(item.coordinates);
    }

    if (item.groupItems && Array.isArray(item.groupItems)) {
      item.groupItems.forEach(sub => {
        if (typeof sub.lat === 'number' && typeof sub.lng === 'number') {
          addPoint(sub.lat, sub.lng);
        }
      });
    }
    return pts;
  }

  _isItemCovered(item, boyaliOrnekler, tol) {
    const pts = this._getItemSamplePoints(item);
    if (!pts.length) return false;
    for (const pt of pts) {
      if (this.boyaliMi(pt.lat, pt.lng)) return true;
      if (boyaliOrnekler && boyaliOrnekler.some(b => this.kmMesafe(b.lat, b.lng, pt.lat, pt.lng) <= tol)) {
        return true;
      }
    }
    return false;
  }

  _isNearItem(lat, lng, item, tol) {
    const pts = this._getItemSamplePoints(item);
    if (!pts.length) return false;
    return pts.some(pt => this.kmMesafe(lat, lng, pt.lat, pt.lng) <= tol);
  }

  // ---------------------------------------------------------------
  // HEDEF SINIFLAR & HAVZALAR (EVRENSEL MOD)
  // ---------------------------------------------------------------
  buildTargets(categoryFilter = null) {
    this.categoryFilter = categoryFilter;
    const adaylar = [];

    const buildCategoryTargets = (catKey) => {
      // 1. ÖZEL ÇİZİMLER HARİTASI
      if (catKey === 'ozel_cizimler') {
        let drawings = [];
        if (typeof customDrawManager !== 'undefined' && customDrawManager) {
          const activeMap = customDrawManager.getActiveMap ? customDrawManager.getActiveMap() : null;
          drawings = activeMap ? (activeMap.drawings || []) : (customDrawManager.drawings || []);
        }
        if (drawings.length) {
          const groupMap = {};
          const nonGrouped = [];
          drawings.forEach(d => {
            if (d.groupId) {
              (groupMap[d.groupId] || (groupMap[d.groupId] = [])).push(d);
            } else {
              nonGrouped.push(d);
            }
          });
          Object.keys(groupMap).forEach(gId => {
            const gItems = groupMap[gId];
            const gName = gItems[0].groupName || gItems[0].name || 'Çizim Grubu';
            adaylar.push({
              grupKey: 'ozel_cizimler',
              grup: { label: 'Özel Çizimler', soruAdi: 'özel çizim', cogulIn: 'çizimlerin' },
              sinif: { key: gId, label: gName, icon: '🎨' },
              items: gItems
            });
          });
          if (nonGrouped.length > 0) {
            if (nonGrouped.length <= 4) {
              nonGrouped.forEach(d => {
                adaylar.push({
                  grupKey: 'ozel_cizimler',
                  grup: { label: 'Özel Çizim', soruAdi: 'çizim', cogulIn: 'çizimin' },
                  sinif: { key: d.id, label: d.name || 'Özel Çizim', icon: '🎨' },
                  items: [d]
                });
              });
            } else {
              const byType = {};
              nonGrouped.forEach(d => {
                const k = d.type || d.category || 'Özel Çizimler';
                (byType[k] || (byType[k] = [])).push(d);
              });
              Object.keys(byType).forEach(k => {
                adaylar.push({
                  grupKey: 'ozel_cizimler',
                  grup: { label: 'Özel Çizimler', soruAdi: 'çizim', cogulIn: 'çizimlerin' },
                  sinif: { key: k, label: k, icon: '🎨' },
                  items: byType[k]
                });
              });
            }
          }
        }
        return;
      }

      // 2. STANDART KATEGORİLER
      let items = (typeof COGRAFYA_DATA !== 'undefined' && COGRAFYA_DATA[catKey]) ? COGRAFYA_DATA[catKey].slice() : [];
      if (!items.length) return;

      const catMeta = (typeof CATEGORIES !== 'undefined') ? CATEGORIES.find(c => c.id === catKey) : null;
      const catTitle = catMeta ? catMeta.title : catKey;
      const catIcon = catMeta ? (catMeta.icon || '📍') : '📍';

      // A. groupId bağlantıları (Maden havzaları, Enerji havzaları vb.)
      const groupMap = {};
      items.forEach(it => {
        if (it.groupId) {
          (groupMap[it.groupId] || (groupMap[it.groupId] = [])).push(it);
        }
      });
      if (Object.keys(groupMap).length >= 1) {
        Object.keys(groupMap).forEach(gId => {
          const gItems = groupMap[gId];
          const gName = gItems[0].groupName || gItems[0].name || gId;
          adaylar.push({
            grupKey: catKey,
            grup: { label: catTitle, soruAdi: 'havza', cogulIn: 'çıkarım/üretim merkezlerinin' },
            sinif: { key: gId, label: gName, icon: catIcon },
            items: gItems
          });
        });
        return;
      }

      // B. Oluşum Taksonomisi (Dağlar, Ovalar, Platolar, Göller)
      if (typeof OLUSUM_TAKSONOMISI !== 'undefined') {
        const olusumGrup = OLUSUM_TAKSONOMISI[catKey] || Object.values(OLUSUM_TAKSONOMISI).find(g => g.kaynak === catKey);
        if (olusumGrup) {
          let oItems = items;
          if (typeof olusumGrup.onFiltre === 'function') oItems = oItems.filter(olusumGrup.onFiltre);
          const kova = {};
          oItems.forEach(it => {
            const s = (typeof FormationTypeGame !== 'undefined' && FormationTypeGame.siniflandir)
              ? FormationTypeGame.siniflandir(it, olusumGrup) : null;
            if (s) (kova[s.key] || (kova[s.key] = [])).push(it);
          });
          const matchedClasses = Object.keys(kova);
          if (matchedClasses.length > 0) {
            matchedClasses.forEach(k => {
              const sinifObj = olusumGrup.siniflar.find(x => x.key === k) || { key: k, label: k, icon: catIcon };
              adaylar.push({
                grupKey: catKey,
                grup: olusumGrup,
                sinif: sinifObj,
                items: kova[k]
              });
            });
            return;
          }
        }
      }

      // C. Alt Türler (SUB_TYPES)
      const subList = (typeof SUB_TYPES !== 'undefined' && SUB_TYPES[catKey]) ? SUB_TYPES[catKey].filter(s => s.id !== 'all') : [];
      let subMatched = false;
      if (subList.length > 0) {
        subList.forEach(st => {
          let matched = [];
          if (typeof st.filter === 'function') {
            matched = items.filter(st.filter);
          } else if (st.id) {
            matched = items.filter(it => it.sub === st.id || (it.type && it.type.toLowerCase().includes(st.id)));
          }
          if (matched.length >= 1) {
            subMatched = true;
            adaylar.push({
              grupKey: catKey,
              grup: { label: catTitle, soruAdi: 'öğe', cogulIn: 'alanların' },
              sinif: { key: st.id, label: st.label, icon: st.icon || catIcon },
              items: matched
            });
          }
        });
      }
      if (subMatched) return;

      // D. Tür (type) bazında gruplama
      const typeMap = {};
      items.forEach(it => {
        const rawType = (it.type || 'Diğer').split('/')[0].split('(')[0].trim();
        (typeMap[rawType] || (typeMap[rawType] = [])).push(it);
      });
      const typeKeys = Object.keys(typeMap).filter(k => typeMap[k].length >= 1);
      if (typeKeys.length > 1) {
        typeKeys.forEach(tKey => {
          adaylar.push({
            grupKey: catKey,
            grup: { label: catTitle, soruAdi: 'tür', cogulIn: 'alanların' },
            sinif: { key: tKey, label: `${tKey} Alanları`, icon: catIcon },
            items: typeMap[tKey]
          });
        });
        return;
      }

      // E. Bölge (region) bazında gruplama fallback
      const regMap = {};
      items.forEach(it => {
        const reg = it.region || 'Türkiye Geneli';
        (regMap[reg] || (regMap[reg] = [])).push(it);
      });
      Object.keys(regMap).forEach(reg => {
        adaylar.push({
          grupKey: catKey,
          grup: { label: catTitle, soruAdi: 'bölge', cogulIn: 'yerlerin' },
          sinif: { key: reg, label: `${reg} (${catTitle})`, icon: catIcon },
          items: regMap[reg]
        });
      });
    };

    if (this.categoryFilter) {
      buildCategoryTargets(this.categoryFilter);
    } else {
      // Tüm kategoriler
      if (typeof CATEGORIES !== 'undefined') {
        CATEGORIES.forEach(c => {
          if (c.id) buildCategoryTargets(c.id);
        });
      }
      if (typeof customDrawManager !== 'undefined' && customDrawManager && customDrawManager.drawings && customDrawManager.drawings.length) {
        buildCategoryTargets('ozel_cizimler');
      }
      if (!adaylar.length && typeof COGRAFYA_DATA !== 'undefined') {
        Object.keys(COGRAFYA_DATA).forEach(k => buildCategoryTargets(k));
      }
    }

    this.hedefler = adaylar;
    this.maxRounds = Math.max(1, Math.min(5, adaylar.length));
    return adaylar;
  }

  // ---------------------------------------------------------------
  // AKIŞ
  // ---------------------------------------------------------------
  start(categoryFilter = null) {
    this.resetProgress();
    this.categoryFilter = categoryFilter;
    this.applySettings();
    this.buildTargets(categoryFilter);
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
    if (!this.hedefler || !this.hedefler.length) this.buildTargets(this.categoryFilter);

    if (!this.hedefler || !this.hedefler.length) {
      return this.baseView({
        badge: '🖌️ Harita Boyama',
        prompt: 'Bu harita için boyama hedefi bulunamadı.',
        options: [{ id: '__bitir__', label: 'Çıkış', sub: 'Oyun modundan çık' }]
      });
    }

    let havuz = this.hedefler.filter(h => !this.kullanilan.includes(h.sinif.key + h.grupKey));
    if (!havuz.length) { this.kullanilan = []; havuz = this.hedefler; }
    const hedef = MK.randomOf(havuz);
    this.kullanilan.push(hedef.sinif.key + hedef.grupKey);
    this.aktifHedef = hedef;

    this.temizle();
    this.hedefLayer.clearLayers();
    this.geoMap.clearAll();
    this.geoMap.resetView();

    let promptText = '';
    const sinifAdi = hedef.sinif.label;
    if (sinifAdi.toLowerCase().includes('alan') || sinifAdi.toLowerCase().includes('havza') || sinifAdi.toLowerCase().includes('kuşak') || sinifAdi.toLowerCase().includes('bölge') || sinifAdi.toLowerCase().includes('santral') || sinifAdi.toLowerCase().includes('çizim')) {
      promptText = `<strong>${trUpper(sinifAdi)}</strong> alanlarını harita üzerinde boya.`;
    } else {
      promptText = `<strong>${trUpper(sinifAdi)}</strong> sınıfına giren ${hedef.grup.cogulIn || 'yerlerin'} bulunduğu alanları boya.`;
    }

    return this.baseView({
      badge: `🖌️ ${hedef.grup.label} · Alan Boyama`,
      prompt: promptText,
      hint: `Haritada sürükleyerek serbestçe boya. Türkiye'de ${hedef.items.length} nokta/bölge var · ${this.toleransKm} km yakınlık doğru sayılır`,
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
      hedefler.some(h => this._isNearItem(lat, lng, h, tol));

    const isabetli = boyali.filter(p => yakinHedefVar(p.lat, p.lng)).length;
    const kapsanan = hedefler.filter(h => this._isItemCovered(h, boyali, tol)).length;

    const isabet = boyali.length ? isabetli / boyali.length : 0;
    const kapsama = hedefler.length ? kapsanan / hedefler.length : 0;
    const f1 = (isabet + kapsama) > 0 ? (2 * isabet * kapsama) / (isabet + kapsama) : 0;

    // AŞIRI BOYAMA CEZASI
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
      const bulundu = this._isItemCovered(it, boyali, tol);
      const color = bulundu ? '#10b981' : '#ef4444';
      const label = it.name || it.groupName || 'Hedef';

      if (it.shapeType === 'polygon' && it.coordinates) {
        this.hedefLayer.addLayer(L.polygon(it.coordinates, {
          color, fillColor: color, fillOpacity: 0.35, weight: 2
        }).bindTooltip(label, { direction: 'top' }));
      } else if (it.shapeType === 'polyline' && it.coordinates) {
        this.hedefLayer.addLayer(L.polyline(it.coordinates, {
          color, weight: 4
        }).bindTooltip(label, { direction: 'top' }));
      } else if (it.shapeType === 'circle' && typeof it.lat === 'number') {
        this.hedefLayer.addLayer(L.circle([it.lat, it.lng], {
          radius: it.radius || (tol * 1000),
          color, fillColor: color, fillOpacity: 0.25, weight: 2
        }).bindTooltip(label, { direction: 'top' }));
      } else if (typeof it.lat === 'number' && typeof it.lng === 'number') {
        this.hedefLayer.addLayer(L.circle([it.lat, it.lng], {
          radius: tol * 1000,
          color,
          fillColor: color,
          fillOpacity: 0.1, weight: 1.5, dashArray: '4, 6', interactive: false
        }));
        this.hedefLayer.addLayer(L.circleMarker([it.lat, it.lng], {
          radius: 6, fillColor: color,
          color: '#fff', weight: 2, fillOpacity: 1
        }).bindTooltip(label, { direction: 'top' }));
      }
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
          note: `Yeşil daireler/şekiller bulduğun örnekler, kırmızılar kaçırdıkların. Daire yarıçapı ${this.toleransKm} km — doğru sayılan yakınlık.` +
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
      left: `${this.round}.${this.quizIdx + 1} ${soru.name || soru.groupName || 'Öğe'}`,
      right: dogru ? '+100' : 'yanlış',
      ok: dogru
    });

    return this.baseView({
      badge: `🖌️ ${this.aktifHedef.sinif.label} · Soru ${this.quizIdx + 1}/${this.quizKuyrugu.length}`,
      prompt: this._quizMetni(),
      options: this.quizSecenekler.map(it => ({
        id: it.id, label: it.name || it.groupName || 'İsimsiz', sub: it.region || it.type || '',
        state: it.id === soru.id ? 'correct' : (it.id === secilenId ? 'wrong' : 'dim')
      })),
      feedback: {
        ok: dogru,
        title: dogru ? `✓ Doğru — ${soru.name || soru.groupName || 'Tebrikler'}` : `✗ Yanlış — Doğrusu: ${soru.name || soru.groupName || 'Cevap'}`,
        rows: [
          { label: soru.name || soru.groupName || 'Öğe', value: soru.type || soru.category || '—', highlight: true },
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

    // Çeldirici havuzu
    let havuz = [];
    if (h.grupKey === 'ozel_cizimler' && typeof customDrawManager !== 'undefined' && customDrawManager) {
      havuz = (customDrawManager.getRawQuizItems ? customDrawManager.getRawQuizItems() : (customDrawManager.drawings || []))
        .filter(x => x.id !== soru.id);
    } else {
      const kaynak = h.grup.kaynak || h.grupKey;
      havuz = ((typeof COGRAFYA_DATA !== 'undefined' && COGRAFYA_DATA[kaynak]) || [])
        .filter(x => x.id !== soru.id);
    }
    if (havuz.length < 3 && typeof COGRAFYA_DATA !== 'undefined') {
      const globalPool = Object.values(COGRAFYA_DATA).flat().filter(x => x && x.id !== soru.id);
      havuz = havuz.concat(globalPool);
    }

    const celdirici = MK.shuffle(havuz).slice(0, Math.max(1, this.optionCount - 1));
    this.quizSecenekler = MK.shuffle([soru, ...celdirici]);

    this.hedefLayer.clearLayers();
    this.temizle();
    this.geoMap.clearAll();
    this.geoMap.highlightQuestionShape(soru);

    return this.baseView({
      badge: `🖌️ ${h.sinif.label} · Soru ${this.quizIdx + 1}/${this.quizKuyrugu.length}`,
      prompt: `Haritada işaretli <strong>${soru.name || h.sinif.label}</strong> hangisidir?`,
      hint: 'Boyadığın alandaki örnekler tek tek soruluyor.',
      options: this.quizSecenekler.map(it => ({ id: it.id, label: it.name || it.groupName || 'İsimsiz', sub: it.region || it.type || '' })),
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
