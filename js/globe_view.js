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

/** Ultra Gerçekçi Mod tercihinin saklandığı anahtar */
const GLOBE_ULTRA_KEY = 'kpss_cografya_globe_ultra';

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

    // ☀️ Ultra Gerçekçi Mod tercihi küre kapalıyken de hatırlanır
    this.ultra = this._ultraTercihiOku();
    this._ultraTimer = null;
    this._ultraMoveBagli = null;
    this._gokyuzu = null;
  }

  _ultraTercihiOku() {
    try { return localStorage.getItem(GLOBE_ULTRA_KEY) === '1'; }
    catch (e) { return false; }
  }

  _ultraTercihiYaz(acik) {
    try { localStorage.setItem(GLOBE_ULTRA_KEY, acik ? '1' : '0'); } catch (e) {}
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

    // STİL HAZIRLIK BAYRAĞI. `map.isStyleLoaded()` bu iş için YANLIŞ ölçüt:
    // o bayrak stilin ayrıştırılmasını DEĞİL, tüm kaynakların döşemelerinin
    // yüklenmesini de bekler — küre ölçeğinde sürekli döşeme istendiği için
    // uzun süre `false` kalabiliyor ve katman eklemeyi sonsuza erteliyordu.
    // `addSource/addLayer` için gereken tek koşul `style.load`'dır.
    this._styleReady = false;
    this.map.on('style.load', () => {
      this._styleReady = true;
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

    // Ultra Gerçekçi Mod açık bırakılmışsa stil hazır olunca geri gelir
    if (this.ultra) {
      if (this._styleReady) this.setUltraRealistic(true);
      else this.map.once('style.load', () => this.setUltraRealistic(true));
    }
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

    // Ultra mod kaynakları: zamanlayıcı ve gökyüzü katmanı. TERCİH korunur,
    // yalnızca çalışan parçalar durdurulur (küre yeniden açılınca geri gelir).
    if (this._ultraTimer) { clearInterval(this._ultraTimer); this._ultraTimer = null; }
    this._ultraMoveBagli = null;
    this._gokyuzuKaldir();

    this._styleReady = false;
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
    if (!this.map || !this._styleReady) return;
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

  // =========================================================================
  // ☀️ ULTRA GERÇEKÇİ MOD — gece/gündüz sınırı, yıldızlar, güneş
  //
  // Üç parça bir arada çalışır:
  //   1. TERMINATÖR: `Solar.nightPolygon()` ile O ANKI gece yarımküresi ve üç
  //      alacakaranlık kuşağı (sivil -6°, deniz -12°, astronomik -18°) ayrı
  //      dolgular olarak üst üste binerek yumuşak bir geçiş üretir.
  //      Sınıra sıcak renkli, bulanık bir çizgi eklenir: şafak/alacakaranlık.
  //   2. YILDIZ ALANI: kabın arkasına çizilen tuval. Tohumlu rastgele sayı
  //      üretici kullanılır, böylece her yeniden çizimde yıldızlar YER
  //      DEĞİŞTİRMEZ (aksi halde pencere boyutu değişince gökyüzü titriyordu).
  //   3. GÜNEŞ: konumu gerçek güneş yönünden hesaplanır. Dik nokta görünen
  //      yüzdeyse güneş kameranın ARKASINDADIR — disk çizilmez, o noktaya
  //      parlama (specular bloom) konur. Arka yüzdeyse küre onu gizler; disk
  //      kürenin kenarında, doğru yönde belirir.
  // =========================================================================

  /** Gece dolgularının katman tanımı: dıştan içe, üst üste binerek koyulaşır */
  get _geceKatmanlari() {
    return [
      { id: 'gece-0',  yukseklik: 0,   renk: '#04070f', opaklik: 0.20 },
      { id: 'gece-6',  yukseklik: -6,  renk: '#04070f', opaklik: 0.18 },
      { id: 'gece-12', yukseklik: -12, renk: '#03050c', opaklik: 0.18 },
      { id: 'gece-18', yukseklik: -18, renk: '#010206', opaklik: 0.24 }
    ];
  }

  setUltraRealistic(acik) {
    this.ultra = !!acik;
    this._ultraTercihiYaz(this.ultra);
    if (!this.map) return this.ultra;          // küre kapalıyken yalnızca tercih saklanır
    if (!this._styleReady) {
      this.map.once('style.load', () => this.setUltraRealistic(acik));
      return this.ultra;
    }

    if (this.ultra) {
      this._geceKatmanlariKur();
      this._gokyuzuKur();
      this._gunesiTazele();
      if (!this._ultraTimer) {
        // Terminatör dakikada 0,25° kayar; 60 saniyelik tazeleme gözle
        // kesintisiz görünür ve boşuna iş yapmaz.
        this._ultraTimer = setInterval(() => this._ultraTazele(), 60000);
      }
      if (!this._ultraMoveBagli) {
        this._ultraMoveBagli = () => this._gunesiTazele();
        this.map.on('move', this._ultraMoveBagli);
        this.map.on('zoom', this._ultraMoveBagli);
      }
    } else {
      this._geceKatmanlariKaldir();
      this._gokyuzuKaldir();
      if (this._ultraTimer) { clearInterval(this._ultraTimer); this._ultraTimer = null; }
      if (this._ultraMoveBagli) {
        this.map.off('move', this._ultraMoveBagli);
        this.map.off('zoom', this._ultraMoveBagli);
        this._ultraMoveBagli = null;
      }
    }
    return this.ultra;
  }

  _ultraTazele() {
    if (!this.ultra || !this.map || !this._styleReady) return;
    const src = this.map.getSource('gece');
    if (src) src.setData(this._geceVerisi());
    this._gunesiTazele();
  }

  /** Gece + alacakaranlık halkalarını tek bir FeatureCollection'da topla */
  _geceVerisi() {
    const simdi = new Date();
    return {
      type: 'FeatureCollection',
      features: this._geceKatmanlari.map(k => ({
        type: 'Feature',
        properties: { kusak: k.id },
        geometry: { type: 'Polygon', coordinates: Solar.nightPolygon(simdi, k.yukseklik, 2) }
      })).concat([{
        type: 'Feature',
        properties: { kusak: 'sinir' },
        // Şafak/akşam çizgisi: poligonun kutup kapanışı olmayan halkası
        geometry: { type: 'LineString', coordinates: Solar.nightPolygon(simdi, 0, 2)[0].slice(0, -3) }
      }])
    };
  }

  _geceKatmanlariKur() {
    if (!this.map.getSource('gece')) {
      this.map.addSource('gece', { type: 'geojson', data: this._geceVerisi() });
    } else {
      this.map.getSource('gece').setData(this._geceVerisi());
    }

    // Şekil katmanlarının ALTINA: pinler ve hatlar gecede de okunabilir kalsın
    const once = this.map.getLayer('sekil-alan') ? 'sekil-alan' : undefined;

    this._geceKatmanlari.forEach(k => {
      if (this.map.getLayer(k.id)) return;
      this.map.addLayer({
        id: k.id, type: 'fill', source: 'gece',
        filter: ['==', ['get', 'kusak'], k.id],
        paint: { 'fill-color': k.renk, 'fill-opacity': k.opaklik }
      }, once);
    });

    if (!this.map.getLayer('gece-sinir')) {
      this.map.addLayer({
        id: 'gece-sinir', type: 'line', source: 'gece',
        filter: ['==', ['get', 'kusak'], 'sinir'],
        paint: {
          'line-color': '#fb923c',          // şafak turuncusu
          'line-width': 3,
          'line-blur': 6,
          'line-opacity': 0.55
        }
      }, once);
    }
  }

  _geceKatmanlariKaldir() {
    ['gece-sinir'].concat(this._geceKatmanlari.map(k => k.id)).forEach(id => {
      if (this.map.getLayer(id)) this.map.removeLayer(id);
    });
    if (this.map.getSource('gece')) this.map.removeSource('gece');
  }

  // --- Gökyüzü katmanı (yıldızlar + güneş) --------------------------------
  _gokyuzuKur() {
    const kap = this.container;
    if (!kap || this._gokyuzu) { this._yildizCiz(); return; }

    const gok = document.createElement('div');
    gok.className = 'globe-sky';
    gok.innerHTML = '<canvas class="globe-stars"></canvas><div class="globe-sun"></div>';
    // MapLibre tuvalinin ARKASINA: gökyüzü kürenin arkasında kalmalı
    kap.insertBefore(gok, kap.firstChild);

    this._gokyuzu = gok;
    this._yildizTuval = gok.querySelector('.globe-stars');
    this._gunesEl = gok.querySelector('.globe-sun');
    this._yildizCiz();

    if (typeof ResizeObserver !== 'undefined') {
      this._gokGozlemci = new ResizeObserver(() => this._yildizCiz());
      this._gokGozlemci.observe(kap);
    }
  }

  _gokyuzuKaldir() {
    if (this._gokGozlemci) { this._gokGozlemci.disconnect(); this._gokGozlemci = null; }
    if (this._gokyuzu && this._gokyuzu.parentNode) this._gokyuzu.parentNode.removeChild(this._gokyuzu);
    this._gokyuzu = null;
    this._yildizTuval = null;
    this._gunesEl = null;
  }

  /**
   * Yıldız alanı. TOHUMLU üretici kullanılır: pencere boyutu değiştiğinde
   * yıldızlar yeniden hesaplanır ama AYNI yerlere düşer — gökyüzü titremez.
   */
  _yildizCiz() {
    const c = this._yildizTuval;
    const kap = this.container;
    if (!c || !kap) return;

    const oran = Math.min(window.devicePixelRatio || 1, 2);
    const g = Math.max(1, kap.clientWidth), y = Math.max(1, kap.clientHeight);
    c.width = Math.round(g * oran);
    c.height = Math.round(y * oran);
    c.style.width = g + 'px';
    c.style.height = y + 'px';

    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(oran, 0, 0, oran, 0, 0);
    ctx.clearRect(0, 0, g, y);

    let tohum = 20260912;                       // sabit tohum → sabit yıldızlar
    const rnd = () => { tohum = (tohum * 9301 + 49297) % 233280; return tohum / 233280; };

    const sayi = Math.round((g * y) / 5200);    // ~250 yıldız (1400x900)
    for (let i = 0; i < sayi; i++) {
      const x = rnd() * g, yy = rnd() * y;
      const parlak = rnd();
      const r = parlak > 0.97 ? 1.6 : (parlak > 0.85 ? 1.1 : 0.7);
      const a = 0.28 + parlak * 0.62;
      // Yıldızların çoğu beyaz; azı sıcak/soğuk renkli — gökyüzü tek düze olmasın
      const renk = parlak > 0.95 ? '255,236,205' : (parlak < 0.12 ? '200,220,255' : '255,255,255');
      ctx.fillStyle = `rgba(${renk},${a.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(x, yy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // --- Küre geometrisi -----------------------------------------------------
  //
  // MapLibre küreyi PERSPEKTİF kamerayla çizer, ortografik değil. Sonuçları:
  //   • Silüet yarıçapı `512·2^z/(2π)` formülüyle bulunamaz — ölçümde %10,8
  //     sapma çıktı (formül 163 px, gerçek 145 px).
  //   • `map.project()` ARKA yüzdeki bir noktayı diskin dışına, antipodal
  //     noktada ise tam MERKEZE düşürebiliyor. "Merkeze uzaklığı yarıçaptan
  //     küçük mü?" testi bu yüzden güneşi yanlış tarafa koyuyordu: kamera
  //     Pasifik'e bakarken güneş ekranın ortasında çıkıyordu (ölçüldü).
  //
  // Bu yüzden geometri FORMÜLLE değil ÖLÇÜMLE bulunuyor: gizlilik için
  // MapLibre'nin kendi `isLocationOccluded()` hesabı, silüet yarıçapı için de
  // gizlilik sınırında ikili arama. Kamera perspektifi değişse de doğru kalır.

  /** İki nokta arası ilk kerteriz (derece, kuzeyden saat yönünde) */
  _kerteriz(a, b) {
    const R = Solar.RAD;
    const dLng = (b.lng - a.lng) * R;
    const y = Math.sin(dLng) * Math.cos(b.lat * R);
    const x = Math.cos(a.lat * R) * Math.sin(b.lat * R) -
              Math.sin(a.lat * R) * Math.cos(b.lat * R) * Math.cos(dLng);
    return (Math.atan2(y, x) / R + 360) % 360;
  }

  /** Bir noktadan verilen kerterizde `aci` derece ilerleyerek varılan nokta */
  _ilerle(lat, lng, kerteriz, aci) {
    const R = Solar.RAD;
    const d = aci * R, k = kerteriz * R;
    const la = Math.asin(Math.sin(lat * R) * Math.cos(d) +
                         Math.cos(lat * R) * Math.sin(d) * Math.cos(k));
    const ln = lng * R + Math.atan2(Math.sin(k) * Math.sin(d) * Math.cos(lat * R),
                                    Math.cos(d) - Math.sin(lat * R) * Math.sin(la));
    return { lat: la / R, lng: Solar._norm180(ln / R) };
  }

  /** Nokta kürenin arka yüzünde mi? (MapLibre'nin hesabı; yoksa açı testi) */
  _gizliMi(lngLat) {
    const t = this.map.transform;
    if (t && typeof t.isLocationOccluded === 'function') {
      try { return t.isLocationOccluded(maplibregl.LngLat.convert(lngLat)); }
      catch (e) { /* yedeğe düş */ }
    }
    // Yedek: görüş merkezinden açısal uzaklık 90°'yi geçiyorsa arka yüzdedir
    const c = this.map.getCenter();
    const R = Solar.RAD;
    const [lng, lat] = Array.isArray(lngLat) ? lngLat : [lngLat.lng, lngLat.lat];
    const cosA = Math.sin(c.lat * R) * Math.sin(lat * R) +
                 Math.cos(c.lat * R) * Math.cos(lat * R) * Math.cos((lng - c.lng) * R);
    return cosA < 0;
  }

  /**
   * Silüet yarıçapı (px), verilen kerteriz yönünde ÖLÇÜLEREK: merkezden o
   * yöne ilerleyip gizliliğin başladığı açıyı ikili aramayla bulur, sınır
   * noktasını ekrana yansıtıp merkeze uzaklığını döndürür.
   */
  _limbYaricapi(kerteriz) {
    const c = this.map.getCenter();
    const kap = this.container;
    const cx = kap.clientWidth / 2, cy = kap.clientHeight / 2;

    let alt = 0, ust = 90;
    for (let i = 0; i < 12; i++) {
      const orta = (alt + ust) / 2;
      const p = this._ilerle(c.lat, c.lng, kerteriz, orta);
      if (this._gizliMi([p.lng, p.lat])) ust = orta; else alt = orta;
    }
    const sinir = this._ilerle(c.lat, c.lng, kerteriz, alt);
    try {
      const p = this.map.project([sinir.lng, sinir.lat]);
      const r = Math.hypot(p.x - cx, p.y - cy);
      if (Number.isFinite(r) && r > 8) return r;
    } catch (e) { /* yedeğe düş */ }
    // Yedek: kaba formül (perspektif düzeltmesi olmadan)
    return (512 * Math.pow(2, this.map.getZoom())) / (2 * Math.PI) * 0.9;
  }

  /**
   * Güneşi gerçek yönüne yerleştir.
   *  - Dik nokta GÖRÜNEN yüzdeyse güneş kameranın ARKASINDADIR: disk çizmek
   *    yanlış olur, o noktaya yumuşak bir parlama (bloom) konur.
   *  - ARKA yüzdeyse küre güneşi gizler: disk, dik noktanın kerterizi yönünde
   *    silüetin hemen dışında belirir.
   */
  _gunesiTazele() {
    if (!this.ultra || !this.map || !this._gunesEl) return;
    const el = this._gunesEl;
    const kap = this.container;
    if (!kap) return;

    // Yüzeye yaklaşıldığında gökyüzü zaten görünmez: güneşi gizle
    if (this.map.getZoom() > 3.2) { el.style.display = 'none'; return; }

    const s = Solar.subsolarPoint(new Date());
    const cx = kap.clientWidth / 2, cy = kap.clientHeight / 2;
    const gizli = this._gizliMi([s.lng, s.lat]);
    const kerteriz = this._kerteriz(this.map.getCenter(), { lat: s.lat, lng: s.lng });
    const r = this._limbYaricapi(kerteriz);

    let hedefX, hedefY, boyut;
    if (!gizli) {
      let p;
      try { p = this.map.project([s.lng, s.lat]); } catch (e) { p = null; }
      if (!p || !Number.isFinite(p.x)) { el.style.display = 'none'; return; }
      hedefX = p.x; hedefY = p.y; boyut = Math.max(120, r * 1.05);
    } else {
      const aci = (kerteriz - (this.map.getBearing() || 0)) * Solar.RAD;
      hedefX = cx + Math.sin(aci) * r * 1.14;
      hedefY = cy - Math.cos(aci) * r * 1.14;
      boyut = Math.max(140, r * 0.95);   // korona kutunun içinde sönümlendiği için geniş
    }

    el.style.display = 'block';
    el.classList.toggle('on-globe', !gizli);
    el.style.width = el.style.height = Math.round(boyut) + 'px';
    el.style.left = Math.round(hedefX - boyut / 2) + 'px';
    el.style.top = Math.round(hedefY - boyut / 2) + 'px';
  }
}
