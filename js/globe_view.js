/**
 * 🌍 KÜRE GÖRÜNÜMÜ (MapLibre GL · globe projeksiyonu)
 *
 * NE DEĞİL: Leaflet'in yerine geçen ikinci bir uygulama değil. Küre, harita
 * görünüm listesine (Sade / Fiziki / Uydu / Gece / Kabartı) eklenen İKİNCİ BİR
 * TABAN GÖRÜNÜMDÜR; `GeographyMap.setLayer('globe')` ile açılır, kapanınca
 * uygulama hiçbir şey kaybetmeden düz haritaya döner.
 *
 * NEDEN: Leaflet 2B Web Mercator ile sınırlıdır — küre projeksiyonu yoktur ve
 * dünya ölçeğinde kutuplara doğru şişme (Grönland ≈ Afrika) kaçınılmazdır.
 * MapLibre GL v5'in `globe` projeksiyonu gerçek bir küre çizer, yaklaşınca
 * kendiliğinden Mercator'a geçer. Döşeme kaynağı projenin HÂLİHAZIRDA
 * kullandığı Esri/CARTO raster servisleridir: yeni anahtar, yeni hesap yok.
 *
 * TASARIM KARARLARI
 *
 * 1. TEMBEL YÜKLEME. MapLibre 1 MB'tır; Leaflet 145 KB. Küreye hiç girmeyen
 *    kullanıcı bu bedeli ödemez: kütüphane ilk etkinleştirmede `<script>` ile
 *    indirilir. (`fetch` değil `<script>`: uygulama `file://` altında da
 *    açılabiliyor; paketler de bu yüzden JSONP mantığıyla yükleniyor.)
 *
 * 2. İKON VE MARKUP TEK KAYNAK. Pinler `GeographyMap.getCustomCategoryIcon()`
 *    ve `GeographyMap.buildChoicePin()` çıktısını AYNEN kullanır. Böylece
 *    3B dağ prizmaları, konu rozetleri ve harfli şık pinleri küre üzerinde de
 *    birebir aynı görünür; dahası cevap renklendirmesi
 *    (`highlightMultiChoiceAnswer`) ve rozet durumları (`applyChoicePinStates`)
 *    katman nesnesi değil DOM sorgusu kullandığı için küre pinlerinde de
 *    EK KOD OLMADAN çalışır.
 *
 * 3. DESTEKLENMEYENİ DÜRÜSTÇE REDDETME. Bağlı grup şekilleri (`isGroup`) küre
 *    tarafında henüz yok; bu tür soruları çizmeyi denemek yerine `false` döner,
 *    `GeographyMap` de o an düz haritaya düşer. Sessizce eksik çizmekten iyidir.
 *
 * 4. TIKLAMA KÖPRÜSÜ. Küre tıklaması Leaflet haritasında sentetik bir `click`
 *    olayı tetikler (`geoMap.map.fire('click', {latlng})`). Kör Atış ve
 *    Koordinat Avcısı dinleyicileri app.js'te TEK yerde durduğu için, hiçbir
 *    oyun motoruna dokunmadan küre üzerinde de çalışırlar.
 */

/** Küre kütüphanesi. v6 SADECE ESM dağıtılıyor; `file://` altında modül
 *  script'leri CORS'a takıldığı için UMD yayınlayan son sürüm (v5) sabitlendi. */
const GLOBE_LIB = {
  surum: '5.24.0',
  get js() { return `https://unpkg.com/maplibre-gl@${this.surum}/dist/maplibre-gl.js`; },
  get css() { return `https://unpkg.com/maplibre-gl@${this.surum}/dist/maplibre-gl.css`; }
};

/** Leaflet zoom'u 256 px'lik, MapLibre 512 px'lik dünya kullanır: ml = leaflet - 1 */
const GLOBE_ZOOM_OFSET = 1;

class GlobeView {
  /**
   * @param {string} containerId  küre kabı (#globe)
   * @param {GeographyMap} geoMap Leaflet motoru: ikon fabrikası, kamera kaynağı
   *                              ve tıklama olaylarının hedefi
   */
  constructor(containerId, geoMap) {
    this.containerId = containerId;
    this.geoMap = geoMap;
    this.map = null;
    this.active = false;

    this._libPromise = null;
    this._markers = [];
    this._sekiller = [];        // GeoJSON feature listesi (hat / alan)
    this._hataYazildi = false;
  }

  get container() { return document.getElementById(this.containerId); }
  get hazir() { return !!(this.map && this.map.loaded); }
  get kullanilabilir() { return typeof window !== 'undefined'; }

  // =========================================================================
  // KÜTÜPHANE & KURULUM
  // =========================================================================
  _loadLib() {
    if (window.maplibregl) return Promise.resolve();
    if (this._libPromise) return this._libPromise;

    this._libPromise = new Promise((resolve, reject) => {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = GLOBE_LIB.css;
      document.head.appendChild(css);

      const js = document.createElement('script');
      js.src = GLOBE_LIB.js;
      js.async = true;
      js.onload = () => (window.maplibregl ? resolve() : reject(new Error('maplibregl yüklendi ama global tanımlı değil')));
      js.onerror = () => reject(new Error('Küre kütüphanesi indirilemedi (çevrimdışı olabilirsiniz)'));
      document.head.appendChild(js);
    });
    return this._libPromise;
  }

  /**
   * Döşeme şablonunu MapLibre'nin beklediği biçime çevirir.
   * Leaflet'in `{s}` alt alan adı yer tutucusu MapLibre'de yoktur → her alt
   * alan için ayrı URL üretilir; retina `{r}` yer tutucusu da düşürülür.
   */
  _tileUrls(url, subdomains) {
    const temiz = String(url || '').replace('{r}', '');
    if (!temiz.includes('{s}')) return [temiz];
    return String(subdomains || 'abc').split('').map(s => temiz.replace('{s}', s));
  }

  /**
   * Küre stili. Taban olarak GERÇEK UYDU (Esri World Imagery) kullanılır:
   * "uzayda süzülen gezegen" görüntüsünü veren tek katman odur ve etiket
   * içermediği için sınav/dilsiz harita mantığına da uyar. Etiketler ayrı bir
   * referans katmanıyla, kullanıcının "Dilsiz Harita" tercihine göre açılır.
   */
  _buildStyle() {
    const cfg = (this.geoMap.layerConfigs && this.geoMap.layerConfigs.satellite) || {};
    const url = cfg.noLabels || cfg.withLabels;
    const opts = cfg.options || {};

    const sources = {
      taban: {
        type: 'raster',
        tiles: this._tileUrls(url, opts.subdomains),
        tileSize: 256,
        maxzoom: 19,
        attribution: opts.attribution || ''
      },
      sekiller: { type: 'geojson', data: { type: 'FeatureCollection', features: [] } }
    };
    const layers = [
      { id: 'taban', type: 'raster', source: 'taban' }
    ];

    // Etiket (yer adı / sınır) katmanı yalnızca dilsiz harita KAPALI iken
    if (this.geoMap.labelsEnabled) {
      sources.etiket = {
        type: 'raster',
        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256,
        maxzoom: 19
      };
      layers.push({ id: 'etiket', type: 'raster', source: 'etiket', paint: { 'raster-opacity': 0.9 } });
    }

    layers.push(
      {
        id: 'sekil-alan', type: 'fill', source: 'sekiller',
        filter: ['==', ['geometry-type'], 'Polygon'],
        paint: { 'fill-color': ['get', 'renk'], 'fill-opacity': ['get', 'dolgu'] }
      },
      {
        id: 'sekil-alan-kenar', type: 'line', source: 'sekiller',
        filter: ['==', ['geometry-type'], 'Polygon'],
        paint: { 'line-color': ['get', 'renk'], 'line-width': 2, 'line-opacity': 0.95 }
      },
      {
        id: 'sekil-hat', type: 'line', source: 'sekiller',
        filter: ['==', ['geometry-type'], 'LineString'],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': ['get', 'renk'],
          'line-width': ['get', 'kalinlik'],
          'line-opacity': 0.95,
          'line-blur': 0.5
        }
      }
    );

    return {
      version: 8,
      // Projeksiyon STİLDE tanımlanır. `style.load` sonrası `setProjection()`
      // ile geçmek, o ana kadar eklenmiş HTML işaretçilerini Mercator
      // konumlarında donduruyordu: pinler kürenin dışına, boşluğa düşüyordu.
      projection: { type: 'globe' },
      sources,
      layers,
      // Atmosfer halkası: gezegeni "uzayda" gösteren asıl detay
      sky: {
        'sky-color': '#0a1428',
        'horizon-color': '#1d4f7c',
        'fog-color': '#0b2135',
        'fog-ground-blend': 0.55,
        'horizon-fog-blend': 0.6,
        'sky-horizon-blend': 0.7,
        'atmosphere-blend': ['interpolate', ['linear'], ['zoom'], 0, 1, 5, 0.6, 7, 0]
      }
    };
  }

  _createMap() {
    const c = this.container;
    if (!c) throw new Error('Küre kabı bulunamadı: #' + this.containerId);

    const ev = this.geoMap.homeView || { center: [39, 35.3], zoom: 6.4 };
    this.map = new maplibregl.Map({
      container: this.containerId,
      style: this._buildStyle(),
      center: [ev.center[1], ev.center[0]],
      zoom: Math.max(0, ev.zoom - GLOBE_ZOOM_OFSET),
      minZoom: 0,
      maxZoom: 18,
      attributionControl: { compact: true },
      // Döndürme serbest ama eğim kapalı: eğik kamera pin ↔ konum eşleşmesini
      // gözle takip etmeyi zorlaştırıyor, sınav pratiğinde işe yaramıyor.
      pitchWithRotate: false,
      touchPitch: false,
      maxPitch: 0
    });

    this.map.addControl(new maplibregl.NavigationControl({ showCompass: true, visualizePitch: false }), 'top-right');
    this.map.addControl(new maplibregl.GlobeControl(), 'top-right');

    this.map.on('style.load', () => {
      // Stil zaten küre tanımlıyor; eski sürümlerde veya stil değişiminde
      // garanti olsun diye tekrar yazılır.
      this.map.setProjection({ type: 'globe' });
      // Projeksiyon değişimi işaretçi konumlarını kendiliğinden tazelemiyor;
      // aynı koordinatı yeniden yazmak yeni transform ile yeniden hesaplatır.
      this._markers.forEach(m => { try { m.setLngLat(m.getLngLat()); } catch (e) {} });
    });

    // Küre tıklaması → Leaflet'te sentetik `click`. Kör Atış ve Koordinat
    // Avcısı dinleyicileri böylece değişmeden çalışır.
    this.map.on('click', (e) => {
      if (!this.active || !this.geoMap.map) return;
      this.geoMap.map.fire('click', {
        latlng: L.latLng(e.lngLat.lat, e.lngLat.wrap().lng),
        latLng: L.latLng(e.lngLat.lat, e.lngLat.wrap().lng),
        _kureden: true
      });
    });

    // Döşeme hataları (kapalı ağ, erişilemeyen referans katmanı) küreyi
    // çökertmemeli; bir kez uyarıp sessizleşiyoruz.
    this.map.on('error', (e) => {
      if (this._hataYazildi) return;
      this._hataYazildi = true;
      console.warn('Küre görünümü uyarısı:', (e && e.error && e.error.message) || e);
    });
  }

  // =========================================================================
  // AÇ / KAPAT
  // =========================================================================
  async enable() {
    await this._loadLib();
    if (!this.map) this._createMap();

    const c = this.container;
    if (c) c.style.display = 'block';
    document.body.classList.add('globe-active');
    this.active = true;

    this.syncFromLeaflet();
    // Kap yeni görünür oldu: MapLibre boyut önbelleğini tazele (Leaflet'teki
    // `invalidateSize` ile aynı gerekçe — ölçüsüz kapta kamera hesabı bozulur).
    requestAnimationFrame(() => { if (this.map) this.map.resize(); });
    return true;
  }

  /**
   * Küreyi kapatır ve MapLibre örneğini SÖKER.
   *
   * Gizli bırakmak iki bedel getiriyordu: (1) tarayıcı başına WebGL bağlamı
   * sınırlı, arkada boşuna bir bağlam tutulur; (2) kap `display:none` olunca
   * tuval 0x0'a düşüyor ve MapLibre uçuşan döşeme isteklerini iptal ederken
   * işlenmeyen promise reddi ("reading 'signal'") üretiyordu — ölçümde tek
   * kapatmada 16 konsol hatası. `remove()` aynı temizliği düzenli yapar;
   * tekrar açıldığında `enable()` örneği yeniden kurar (döşemeler tarayıcı
   * önbelleğinden gelir, gözle farkı yok).
   */
  disable() {
    if (!this.active) return false;
    this.active = false;
    this.syncToLeaflet();

    if (this.map) {
      try { this.map.stop(); this.map.remove(); }
      catch (e) { console.warn('Küre sökülürken uyarı:', e); }
      this.map = null;
    }
    this._markers = [];
    this._sekiller = [];

    const c = this.container;
    if (c) c.style.display = 'none';
    document.body.classList.remove('globe-active');
    return true;
  }

  // =========================================================================
  // KAMERA
  // =========================================================================
  /** Leaflet kamerasını küreye taşı (görünüm geçişi sıçramasın) */
  syncFromLeaflet() {
    if (!this.map || !this.geoMap.map) return;
    const c = this.geoMap.map.getCenter();
    const z = this.geoMap.map.getZoom();
    if (!c || !Number.isFinite(z)) return;
    this.map.jumpTo({ center: [c.lng, c.lat], zoom: Math.max(0, z - GLOBE_ZOOM_OFSET) });
  }

  /** Küre kamerasını Leaflet'e taşı (küreden çıkınca aynı yere bakılsın) */
  syncToLeaflet() {
    if (!this.map || !this.geoMap.map) return;
    const c = this.map.getCenter();
    const z = this.map.getZoom();
    if (!c || !Number.isFinite(z)) return;
    this.geoMap.map.setView([c.lat, c.lng], z + GLOBE_ZOOM_OFSET, { animate: false });
  }

  /**
   * MapLibre geçersiz koordinatta İSTİSNA FIRLATIR ("Invalid LngLat latitude
   * value") ve bu istisna soru render'ının ortasında patlayıp paneli yarım
   * bırakır. Leaflet ise sessizce tolere eder — çağıranlar da bu yüzden
   * `L.latLngBounds(...).pad(0.35)` gibi kutup ötesine taşabilen değerler
   * gönderiyor. Küreye giren her koordinat burada kırpılır.
   */
  _kirp(lat, lng) {
    return [
      Math.max(-85, Math.min(85, lat)),
      Math.max(-180, Math.min(180, lng))
    ];
  }

  flyTo(latLng, leafletZoom) {
    if (!this.map) return;
    const lat0 = Array.isArray(latLng) ? latLng[0] : latLng.lat;
    const lng0 = Array.isArray(latLng) ? latLng[1] : latLng.lng;
    if (!Number.isFinite(lat0) || !Number.isFinite(lng0)) return;
    const [lat, lng] = this._kirp(lat0, lng0);
    const zoom = Math.max(0, (Number.isFinite(leafletZoom) ? leafletZoom : 4) - GLOBE_ZOOM_OFSET);
    this.map.easeTo({ center: [lng, lat], zoom, duration: 900 });
  }

  fitBounds(bounds) {
    if (!this.map || !bounds) return;
    const sw = bounds.getSouthWest ? bounds.getSouthWest() : null;
    const ne = bounds.getNorthEast ? bounds.getNorthEast() : null;
    if (!sw || !ne) return;
    if (![sw.lat, sw.lng, ne.lat, ne.lng].every(Number.isFinite)) return;

    const [gLat, gLng] = this._kirp(sw.lat, sw.lng);
    const [kLat, kLng] = this._kirp(ne.lat, ne.lng);
    if (kLat <= gLat || kLng <= gLng) {   // kırpma sonrası dejenere kutu
      this.flyTo([(gLat + kLat) / 2, (gLng + kLng) / 2], 5);
      return;
    }
    this.map.fitBounds([[gLng, gLat], [kLng, kLat]], { padding: 80, duration: 900, maxZoom: 12 });
  }

  resize() { if (this.map) this.map.resize(); }

  // =========================================================================
  // ÇİZİM
  // =========================================================================
  clear() {
    this._markers.forEach(m => m.remove());
    this._markers = [];
    this._sekiller = [];
    this._sekilleriYaz();
    if (this._popup) { this._popup.remove(); this._popup = null; }
  }

  _sekilleriYaz() {
    if (!this.map) return;
    const src = this.map.getSource && this.map.getSource('sekiller');
    if (!src) return;
    src.setData({ type: 'FeatureCollection', features: this._sekiller });
  }

  /** [lat,lng][] → GeoJSON [lng,lat][] */
  _ters(coords) {
    return (coords || [])
      .filter(p => Array.isArray(p) && Number.isFinite(p[0]) && Number.isFinite(p[1]))
      .map(p => { const [la, ln] = this._kirp(p[0], p[1]); return [ln, la]; });
  }

  _sekilEkle(item, { renk, kalinlik = 4, dolgu = 0.3 }) {
    const tip = item.shapeType || 'point';
    const coords = item.coordinates;
    if (!Array.isArray(coords) || !Array.isArray(coords[0])) return false;

    const halka = this._ters(coords);
    if (halka.length < 2) return false;

    if (tip === 'polygon') {
      const kapali = (halka[0][0] !== halka[halka.length - 1][0] || halka[0][1] !== halka[halka.length - 1][1])
        ? halka.concat([halka[0]])
        : halka;
      this._sekiller.push({
        type: 'Feature',
        properties: { renk, kalinlik, dolgu, id: item.id },
        geometry: { type: 'Polygon', coordinates: [kapali] }
      });
    } else {
      this._sekiller.push({
        type: 'Feature',
        properties: { renk, kalinlik, dolgu, id: item.id },
        geometry: { type: 'LineString', coordinates: halka }
      });
    }
    return true;
  }

  /** GeoJSON feature'ı (ör. il sınırı) doğrudan ekler */
  _featureEkle(feature, { renk, kalinlik = 2, dolgu = 0.3, id }) {
    if (!feature || !feature.geometry) return false;
    this._sekiller.push({
      type: 'Feature',
      properties: { renk, kalinlik, dolgu, id: id || '' },
      geometry: feature.geometry
    });
    return true;
  }

  /**
   * İşaretçi kur. Leaflet `divIcon` ayarlarını (html + iconSize + iconAnchor)
   * MapLibre HTML işaretçisine çevirir; hizalama farkı `offset` ile telafi
   * edilir (MapLibre merkeze, Leaflet ankraya göre hizalar).
   */
  _pinEkle(latLng, ikonAyar, { popupHtml, onClick, ekSinif } = {}) {
    if (!this.map) return null;
    const [lat0, lng0] = latLng;
    if (!Number.isFinite(lat0) || !Number.isFinite(lng0)) return null;
    const [lat, lng] = this._kirp(lat0, lng0);

    const [g, y] = ikonAyar.iconSize || [26, 26];
    const [ax, ay] = ikonAyar.iconAnchor || [g / 2, y / 2];

    const el = document.createElement('div');
    el.className = [ikonAyar.className || '', 'globe-pin', ekSinif || ''].filter(Boolean).join(' ');
    el.style.width = g + 'px';
    el.style.height = y + 'px';
    el.innerHTML = ikonAyar.html || '';

    const m = new maplibregl.Marker({
      element: el,
      offset: [(g / 2) - ax, (y / 2) - ay],
      // Gezegenin ARKA yüzündeki işaretçiler tamamen kaybolur. Varsayılan
      // (0.2) onları yarı saydam bırakıyor ve MapLibre arka yüz noktalarını
      // kürenin diskinin DIŞINA düşürdüğü için pinler boşlukta uçuyordu.
      opacityWhenCovered: '0'
    }).setLngLat([lng, lat]).addTo(this.map);

    if (popupHtml) {
      m.setPopup(new maplibregl.Popup({ offset: Math.round(y / 2) + 6, maxWidth: '300px', className: 'globe-popup' })
        .setHTML(popupHtml));
    }
    if (onClick) el.addEventListener('click', (e) => { e.stopPropagation(); onClick(); });

    this._markers.push(m);
    return m;
  }

  // =========================================================================
  // KEŞİF MODU
  // =========================================================================
  showExplore(items) {
    if (!this.map) return false;
    this.clear();

    // Bağlı gruplar küre tarafında henüz desteklenmiyor → alt öğelerine açılır
    const duz = [];
    (items || []).forEach(it => {
      if (it && it.isGroup && Array.isArray(it.groupItems)) duz.push(...it.groupItems);
      else if (it) duz.push(it);
    });

    duz.forEach(item => {
      const renk = topicColor(item.category);
      const tip = item.shapeType || 'point';

      if (item.category === 'sehirler' && this.geoMap.getCityFeature) {
        const feat = this.geoMap.getCityFeature(item);
        if (feat && this._featureEkle(feat, { renk, dolgu: 0.35, id: item.id })) return;
      }

      if (tip !== 'point' && this._sekilEkle(item, { renk, kalinlik: 4, dolgu: 0.3 })) {
        // Hat/alan şeklinin adı okunabilsin diye merkezine küçük bir pin
        if (Number.isFinite(item.lat) && Number.isFinite(item.lng)) {
          const ikon = this.geoMap.getCustomCategoryIcon(item);
          this._pinEkle([item.lat, item.lng], (ikon && ikon.options) || {}, {
            popupHtml: this.geoMap._popupHtml ? this.geoMap._popupHtml(item) : (item.name || '')
          });
        }
        return;
      }

      const ikon = this.geoMap.getCustomCategoryIcon(item);
      this._pinEkle([item.lat, item.lng], (ikon && ikon.options) || {}, {
        popupHtml: this.geoMap._popupHtml ? this.geoMap._popupHtml(item) : (item.name || '')
      });
    });

    this._sekilleriYaz();
    return true;
  }

  // =========================================================================
  // SORU VURGUSU
  // =========================================================================
  /**
   * @returns {boolean} false → küre bu soruyu çizemez, çağıran düz haritaya düşer
   */
  highlightShape(item) {
    if (!this.map || !item) return false;
    if (item.isGroup) return false;          // bağlı grup: düz harita işi

    this.clear();
    const renk = topicColor(item.category, '#f59e0b');
    const tip = item.shapeType || 'point';

    if (item.category === 'sehirler' && this.geoMap.getCityFeature) {
      const feat = this.geoMap.getCityFeature(item);
      if (feat && this._featureEkle(feat, { renk: '#3b82f6', dolgu: 0.55, kalinlik: 3, id: item.id })) {
        this._sekilleriYaz();
        this._odakla(item);
        return true;
      }
    }

    if (tip !== 'point') {
      if (!this._sekilEkle(item, { renk, kalinlik: 6, dolgu: 0.45 })) return false;
      this._sekilleriYaz();
      this._odakla(item);
      return true;
    }

    // Noktasal hedef: nabız atan halka (Leaflet'teki `pulse-marker-icon` ile
    // aynı CSS sınıfını kullanır, görünüm birebir aynı kalır)
    this._pinEkle([item.lat, item.lng], {
      className: 'pulse-marker-icon',
      html: '<div class="pulse-circle"></div>',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    }, { ekSinif: 'globe-target' });
    this._sekilleriYaz();
    this._odakla(item);
    return true;
  }

  /** Otomatik odak açıksa hedefi kadraja al */
  _odakla(item) {
    if (!this.geoMap.autoZoomEnabled) return;
    const coords = item.coordinates;
    if (Array.isArray(coords) && Array.isArray(coords[0]) && typeof L !== 'undefined') {
      this.fitBounds(L.latLngBounds(coords).pad(0.35));
      return;
    }
    if (Number.isFinite(item.lat) && Number.isFinite(item.lng)) {
      this.flyTo([item.lat, item.lng], 6);
    }
  }

  // =========================================================================
  // ÇOKTAN SEÇMELİ ŞIK PİNLERİ
  // =========================================================================
  /**
   * @returns {boolean} false → küre bu şık kümesini çizemez (bağlı grup var)
   */
  showChoices(options, onSelectOption, ayarlar = {}) {
    if (!this.map || !options || !options.length) return false;
    if (options.some(o => o && o.isGroup)) return false;   // grup şıkları: düz harita

    this.clear();
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const rozetSabit = !!ayarlar.rozetSabit;
    const kapsam = [];

    options.forEach((opt, index) => {
      const letter = letters[index] || `${index + 1}`;
      const roman = romanNumerals[index] || `${index + 1}`;
      const choiceColor = CHOICE_PALETTE[index % CHOICE_PALETTE.length];
      const shapeType = opt.shapeType || 'point';
      let geometriVar = false;

      if (opt.category === 'sehirler' && this.geoMap.getCityFeature) {
        const feat = this.geoMap.getCityFeature(opt);
        if (feat) geometriVar = this._featureEkle(feat, { renk: choiceColor.main, dolgu: 0.28, kalinlik: 2, id: opt.id });
      }
      if (!geometriVar && shapeType !== 'point') {
        geometriVar = this._sekilEkle(opt, { renk: choiceColor.main, kalinlik: 4, dolgu: 0.25 });
      }

      // Pin markup'ı Leaflet ile ORTAK üreticiden gelir (bkz. buildChoicePin)
      const pin = this.geoMap.buildChoicePin(opt, {
        index, letter, roman, choiceColor, geometriVar, rozetSabit, shapeType
      });

      if (Number.isFinite(opt.lat) && Number.isFinite(opt.lng)) {
        this._pinEkle([opt.lat, opt.lng], pin, {
          onClick: () => { if (onSelectOption) onSelectOption(opt.id); }
        });
        kapsam.push([opt.lat, opt.lng]);
      }
      if (Array.isArray(opt.coordinates)) {
        opt.coordinates.forEach(p => {
          if (Array.isArray(p) && Number.isFinite(p[0]) && Number.isFinite(p[1])) kapsam.push(p);
        });
      }
    });

    this._sekilleriYaz();
    if (this.geoMap.autoZoomEnabled && kapsam.length && typeof L !== 'undefined') {
      this.fitBounds(L.latLngBounds(kapsam).pad(0.35));
    }
    return true;
  }

  /**
   * "Dilsiz Harita" tercihi değişince etiket katmanını aç/kapat.
   *
   * Stili baştan kurmak (`setStyle`) hem çizilmiş şekilleri yeniden yazmayı
   * gerektiriyor hem de uçuşan döşeme isteklerini iptal ederek gereksiz
   * konsol gürültüsü çıkarıyordu. Tek katman ekleyip çıkarmak yeterli.
   */
  refreshStyle() {
    if (!this.map || !this.map.isStyleLoaded()) return;
    const varMi = !!this.map.getLayer('etiket');
    const olmali = !!this.geoMap.labelsEnabled;
    if (varMi === olmali) return;

    if (olmali) {
      if (!this.map.getSource('etiket')) {
        this.map.addSource('etiket', {
          type: 'raster',
          tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'],
          tileSize: 256,
          maxzoom: 19
        });
      }
      // Şekil katmanlarının ALTINA girer: pinler ve hatlar etiketlerin üstünde kalsın
      this.map.addLayer(
        { id: 'etiket', type: 'raster', source: 'etiket', paint: { 'raster-opacity': 0.9 } },
        this.map.getLayer('sekil-alan') ? 'sekil-alan' : undefined
      );
    } else {
      this.map.removeLayer('etiket');
      if (this.map.getSource('etiket')) this.map.removeSource('etiket');
    }
  }
}
