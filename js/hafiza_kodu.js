/**
 * 🧠 HAFIZA KODU ATÖLYESİ
 *
 * "Ekrana hikâyeyi bas, kullanıcı bilsin" TİPİ BİR OYUN DEĞİLDİR. Hikâyeyi
 * okumak ezber üretmez; hikâyenin İÇİNDE çalışmak üretir. Bu yüzden motor tek
 * bir kaynaktan (data/hafiza_kodlari.js içindeki [[imge|gerçek]] işaretli
 * metin) altı ayrı çalışma biçimi türetir:
 *
 *   🧩 esles   Kod Çözücü      — metaforları karşılıklarıyla eşleştir
 *   ✍️ bosluk  Boşluk Doldur   — hikâyenin içinden bir halka silinir
 *   🔗 zincir  Hikâye Zinciri  — tekerlemeyi coğrafi sırasına diz
 *   🕵️ kacak   Kaçak Yakala    — listeye sonradan sızan yabancıyı bul
 *   🔑 ters    Ters Kod        — bilgiden hikâyeye geri dön
 *   🗺️ harita  Harita Damgası  — kodun geçtiği yeri haritada işaretle
 *
 * Hepsinin ortak noktası: cevap verildiği anda hikâye ÇÖZÜLMÜŞ hâliyle
 * yeniden yazılır ve kodun geçtiği yerler haritaya düşer. Kullanıcı böylece
 * her turda aynı kodu üç kanaldan (metin + eşleme + harita) alır.
 *
 * Ustalık kaydı localStorage'da tutulur ve tur seçimi zayıf kodlara ağırlık
 * verir — sitenin geri kalanındaki adaptif motorla aynı felsefe.
 */

const HK_USTALIK_KEY = 'kpss_hafiza_kodu_ustalik';
const HK_TUR_TANIMLARI = [
  { key: 'esles',  ad: 'Kod Çözücü',      ikon: '🧩', aciklama: 'Metaforları karşılıklarıyla eşleştir' },
  { key: 'bosluk', ad: 'Boşluk Doldur',   ikon: '✍️', aciklama: 'Hikâyeden silinen halkayı tamamla' },
  { key: 'zincir', ad: 'Hikâye Zinciri',  ikon: '🔗', aciklama: 'Tekerlemeyi coğrafi sırasına diz' },
  { key: 'kacak',  ad: 'Kaçak Yakala',    ikon: '🕵️', aciklama: 'Listeye sızan yabancıyı bul' },
  { key: 'ters',   ad: 'Ters Kod',        ikon: '🔑', aciklama: 'Bilgiden hikâyeye geri dön' },
  { key: 'harita', ad: 'Harita Damgası',  ikon: '🗺️', aciklama: 'Kodun geçtiği yeri haritada işaretle' }
];

/* ==========================================================================
 * 📖 HİKÂYE AYRIŞTIRICI
 * Tek bir [[imge|gerçek]] metni bütün soru tiplerinin ham maddesidir.
 * ========================================================================== */

const HK_MARKER_RE = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;

/** Hikâyeyi metin ve çift parçalarına böler */
function hkParcala(hikaye) {
  const parcalar = [];
  let son = 0, m, i = 0;
  HK_MARKER_RE.lastIndex = 0;
  while ((m = HK_MARKER_RE.exec(hikaye)) !== null) {
    if (m.index > son) parcalar.push({ tip: 'metin', metin: hikaye.slice(son, m.index) });
    parcalar.push({ tip: 'cift', idx: i++, imge: m[1].trim(), gercek: m[2].trim() });
    son = m.index + m[0].length;
  }
  if (son < hikaye.length) parcalar.push({ tip: 'metin', metin: hikaye.slice(son) });
  return parcalar;
}

/** Kodun metafor ↔ gerçek çiftleri */
function hkCiftler(kod) {
  return hkParcala(kod.hikaye).filter(p => p.tip === 'cift');
}

function hkKacir(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Hikâyeyi HTML'e çevirir.
 * @param {object} opt
 *   cozuk      : true ise her imgenin altına gerçek karşılığı yazılır
 *   bosluk     : bu indeksteki çift boşluğa çevrilir
 *   boslukTipi : 'imge' | 'gercek' — boşluğa dönüşen taraf
 *   vurgu      : bu indeksteki çift öne çıkarılır
 */
function hkHikayeHtml(kod, opt = {}) {
  return hkParcala(kod.hikaye).map(p => {
    if (p.tip === 'metin') return hkKacir(p.metin);

    const imge = hkKacir(p.imge);
    const gercek = hkKacir(p.gercek);
    const vurgulu = opt.vurgu === p.idx ? ' vurgu' : '';

    if (opt.bosluk === p.idx) {
      if (opt.boslukTipi === 'gercek') {
        return `<span class="hk-cift bos${vurgulu}"><span class="hk-imge">${imge}</span>` +
               `<span class="hk-gercek hk-blank">? ? ?</span></span>`;
      }
      return `<span class="hk-cift bos${vurgulu}"><span class="hk-imge hk-blank">? ? ?</span>` +
             `<span class="hk-gercek">${gercek}</span></span>`;
    }

    if (opt.cozuk) {
      return `<span class="hk-cift${vurgulu}"><span class="hk-imge">${imge}</span>` +
             `<span class="hk-gercek">${gercek}</span></span>`;
    }
    return `<span class="hk-cift kapali${vurgulu}"><span class="hk-imge">${imge}</span></span>`;
  }).join('');
}

/* ==========================================================================
 * 📊 USTALIK DEFTERİ
 * ========================================================================== */

const HafizaUstalik = {
  oku() {
    try {
      const ham = localStorage.getItem(HK_USTALIK_KEY);
      return ham ? JSON.parse(ham) : {};
    } catch (e) { return {}; }
  },
  yaz(defter) {
    try { localStorage.setItem(HK_USTALIK_KEY, JSON.stringify(defter)); } catch (e) { /* kota dolu */ }
  },
  kayit(kodId) {
    const d = this.oku();
    return d[kodId] || { dogru: 0, yanlis: 0, seri: 0, son: 0 };
  },
  isle(kodId, dogruMu) {
    const d = this.oku();
    const k = d[kodId] || { dogru: 0, yanlis: 0, seri: 0, son: 0 };
    if (dogruMu) { k.dogru++; k.seri++; } else { k.yanlis++; k.seri = 0; }
    k.son = Date.now();
    d[kodId] = k;
    this.yaz(d);
    return k;
  },
  /** 0-100 arası ustalık yüzdesi: art arda doğru serisi ağırlıklıdır */
  yuzde(kodId) {
    const k = this.kayit(kodId);
    const toplam = k.dogru + k.yanlis;
    if (!toplam) return 0;
    const oran = k.dogru / toplam;
    const seriBonus = Math.min(k.seri, 4) / 4;          // 4 üst üste doğru = tam
    return Math.round(100 * (0.55 * oran + 0.45 * seriBonus));
  },
  sifirla() {
    try { localStorage.removeItem(HK_USTALIK_KEY); } catch (e) { /* yoksay */ }
  }
};

/* ==========================================================================
 * 🎮 OYUN MOTORU
 * ========================================================================== */

class HafizaKoduGame {
  constructor(mapInstance) {
    this.geoMap = mapInstance;
    this.modeKey = 'hafiza';
    this.modeTitle = 'Hafıza Kodu Atölyesi';
    this.isActive = false;
    this.hkLayer = null;

    this.maxTur = 12;
    this.tur = 1;
    this.skor = 0;
    this.seri = 0;
    this.enUzunSeri = 0;
    this.dogruSayisi = 0;
    this.gecmis = [];
    this.cevaplandi = false;

    this.bolumFiltre = null;   // null = tümü
    this.turFiltre = null;     // null = tümü
    this.kodFiltre = null;     // null = tümü (galeriden tek kod çalışma)
    this.sonKodId = null;
    this.gorulenGorevler = new Set();

    this.getSettings = null;   // app.js sol alt paneldeki ayarları verir
    this.optionCount = 4;
    this.difficulty = 5;
  }

  // ------------------------------------------------------------------
  // AYARLAR
  // ------------------------------------------------------------------
  applySettings() {
    const s = (typeof this.getSettings === 'function' && this.getSettings()) || {};
    const lv = parseInt(s.difficulty, 10);
    this.difficulty = Number.isFinite(lv) ? Math.max(1, Math.min(5, lv)) : 5;
    if (s.optionCount === 'all') {
      this.optionCount = 6;
    } else {
      const raw = parseInt(s.optionCount, 10);
      this.optionCount = Math.max(2, Math.min(8, Number.isFinite(raw) ? raw : 4));
    }
  }

  ayarEtiketi() {
    return `⚡ Sv.${this.difficulty} · ${this.optionCount} şık`;
  }

  // ------------------------------------------------------------------
  // HAVUZ
  // ------------------------------------------------------------------
  /**
   * Seçilen kapsamdaki kodlar.
   * `kodFiltre` galerideki "🎯 Bu kodu çalış" düğmesinden gelir: tek bir kodun
   * bütün tur tipleriyle üst üste çalışılması, o kodu kalıcı hâle getirir.
   */
  kodHavuzu() {
    const hepsi = (typeof HAFIZA_KODLARI !== 'undefined' ? HAFIZA_KODLARI : []);
    if (this.kodFiltre && this.kodFiltre.length) {
      return hepsi.filter(k => this.kodFiltre.includes(k.id));
    }
    if (!this.bolumFiltre || !this.bolumFiltre.length) return hepsi.slice(0);
    return hepsi.filter(k => this.bolumFiltre.includes(k.bolum));
  }

  /** Bir kodun hangi tur tiplerini besleyebildiği */
  static uygunTurler(kod) {
    const turler = [];
    const cift = hkCiftler(kod);
    if (cift.length >= 3) turler.push('esles');
    if (cift.length >= 2) turler.push('bosluk');
    if (kod.sira && kod.sira.ogeler && kod.sira.ogeler.length >= 3) turler.push('zincir');
    if (kod.uyeler && kod.uyeler.length >= 3 && kod.kacaklar && kod.kacaklar.length) turler.push('kacak');
    if (kod.cevap && kod.soru) turler.push('ters');
    if (kod.yerler && kod.yerler.length) turler.push('harita');
    return turler;
  }

  /** Zayıf kodlara ağırlık veren rulet seçimi */
  sonrakiGorev() {
    const havuz = this.kodHavuzu();
    const gorevler = [];

    havuz.forEach(kod => {
      let turler = HafizaKoduGame.uygunTurler(kod);
      if (this.turFiltre && this.turFiltre.length) {
        turler = turler.filter(t => this.turFiltre.includes(t));
      }
      if (!turler.length) return;
      // Aynı kod iki tur üst üste gelmesin (havuz yetiyorsa)
      const ceza = (kod.id === this.sonKodId && havuz.length > 1) ? 0.05 : 1;
      const ustalik = HafizaUstalik.yuzde(kod.id);
      // 0 ustalık → ağırlık 5, tam ustalık → ağırlık 1
      const agirlik = (5 - 4 * (ustalik / 100)) * ceza;
      turler.forEach(tur => {
        // Bu oturumda zaten sorulmuş kod+tur bileşimi neredeyse hiç seçilmesin;
        // 12 turluk bir oturumda aynı sorunun ikinci kez gelmesi öğretmiyor.
        const tekrar = this.gorulenGorevler.has(kod.id + '|' + tur) ? 0.03 : 1;
        gorevler.push({ kod, tur, agirlik: (agirlik * tekrar) / turler.length });
      });
    });

    if (!gorevler.length) return null;

    // TUR TİPİ DENGELEMESİ
    // Ham havuzda tip dağılımı çok çarpık: "ters kod" 68 kodun hepsinden,
    // "hikâye zinciri" ise yalnızca 8 kodun sıralamasından beslenir. Düz rulet
    // çevirince 12 turluk bir oturumda zincir hiç gelmiyor, oysa sıralama
    // soruları sınavda en çok karşılaşılanlardan. Her tipin ağırlığını kendi
    // bolluğunun kareköküne bölerek nadir tipleri görünür kılıyoruz — tam
    // eşitlemek de yanlış olurdu, o zaman 8 kodluk zincir sürekli tekrar ederdi.
    const tipSayisi = {};
    gorevler.forEach(g => { tipSayisi[g.tur] = (tipSayisi[g.tur] || 0) + 1; });
    gorevler.forEach(g => { g.agirlik /= Math.sqrt(tipSayisi[g.tur]); });

    const toplam = gorevler.reduce((a, g) => a + g.agirlik, 0);
    let r = Math.random() * toplam;
    for (const g of gorevler) {
      r -= g.agirlik;
      if (r <= 0) return g;
    }
    return gorevler[gorevler.length - 1];
  }

  bolumBilgi(key) {
    const b = (typeof HAFIZA_BOLUMLERI !== 'undefined' ? HAFIZA_BOLUMLERI : [])
      .find(x => x.key === key);
    return b || { key, ad: 'Hafıza Kodu', kisa: 'Kod', ikon: '🧠', renk: '#8b5cf6' };
  }

  // ------------------------------------------------------------------
  // ÇELDİRİCİLER
  // Zorluk arttıkça çeldiriciler AYNI bölümden seçilir; kolay seviyede
  // başka bölümlerden gelir. Ege körfezini Akdeniz geçidiyle karıştırmak
  // kolay, Ege körfezini başka bir Ege körfeziyle karıştırmak zordur.
  // ------------------------------------------------------------------
  /**
   * ÖNCELİK SIRALI çeldirici havuzu döndürür: baştaki kayıtlar tercih edilen
   * kovadan, sonrakiler uzak kovadan gelir. Çağıranlar havuzu baştan keser
   * (`slice`), KARIŞTIRMAZ — karıştırmak önceliği yok ederdi.
   *
   * İki kova birleştirilmek zorunda: eskiden yalnızca tek kova dönüyordu ve
   * "Ege körfezleri" gibi 8 kodluk bir bölümde 8 şıklık soru istendiğinde
   * çeldirici bitip soru 5 şıkla açılıyordu.
   */
  celdiriciHavuzu(kod, cikar) {
    const ayniBolum = [], digerBolum = [];
    (typeof HAFIZA_KODLARI !== 'undefined' ? HAFIZA_KODLARI : []).forEach(k => {
      if (k.id === kod.id) return;
      (k.bolum === kod.bolum ? ayniBolum : digerBolum).push(k);
    });
    // Sv.5 → neredeyse tamamı aynı bölümden, Sv.1 → çoğu uzak bölümden
    const yakinlik = (this.difficulty - 1) / 4;
    const yakinOnce = Math.random() < (0.25 + 0.7 * yakinlik);
    const oncelik = yakinOnce ? ayniBolum : digerBolum;
    const yedek = yakinOnce ? digerBolum : ayniBolum;

    const havuz = HafizaKoduGame.karistir(oncelik).concat(HafizaKoduGame.karistir(yedek));
    return havuz.filter(k => !cikar || !cikar.includes(k.id));
  }

  static karistir(dizi) {
    const a = dizi.slice(0);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  static benzersiz(dizi, anahtar) {
    const gorulen = new Set(), sonuc = [];
    dizi.forEach(x => {
      const k = (anahtar ? anahtar(x) : x);
      const norm = (typeof trLower === 'function' ? trLower(k) : String(k).toLowerCase());
      if (gorulen.has(norm)) return;
      gorulen.add(norm);
      sonuc.push(x);
    });
    return sonuc;
  }

  // ------------------------------------------------------------------
  // HARİTA
  // ------------------------------------------------------------------
  _katman() {
    if (!this.geoMap || !this.geoMap.map) return null;
    if (!this.hkLayer) {
      this.hkLayer = L.layerGroup().addTo(this.geoMap.map);
      // Ortak temizlik zincirine kaydol: başka bir mod `geoMap.clearAll()`
      // çağırdığında kod pinlerimiz de silinsin. Eskiden bu katman kimsenin
      // haberi olmadan yaşıyor, Keşif Modu'na ya da standart teste geçildiğinde
      // hafıza pinleri o modun işaretlerinin üstünde asılı kalıyordu.
      if (this.geoMap.registerAuxLayer) this.geoMap.registerAuxLayer(this.hkLayer);
    }
    return this.hkLayer;
  }

  temizleHarita() {
    if (this.hkLayer) this.hkLayer.clearLayers();
  }

  /**
   * Kodun geçtiği yerleri ve (varsa) haritaya yazdığı harfi çizer.
   * Cevap verildikten SONRA çağrılır: hikâye çözülürken coğrafyaya oturur.
   */
  kodaOdaklan(kod) {
    const katman = this._katman();
    if (!katman) return;
    // Harita bu koda AYRILIR. Galeriden "Haritada göster" standart test ya da
    // Keşif Modu açıkken de çağrılabiliyor; o modun işaretleri silinmezse
    // kullanıcı iki farklı konu kümesini aynı anda görüyordu. `clearAll` bizim
    // katmanımızı da boşalttığı için önce o çağrılır, çizim sonra gelir.
    if (this.geoMap.clearAll) this.geoMap.clearAll();
    this.temizleHarita();

    const bolum = this.bolumBilgi(kod.bolum);
    const noktalar = [];

    // Haritaya yazılan harfler (MASİF M+A, volkanik V, vertisol V, renzina R)
    if (kod.cizim && Array.isArray(kod.cizim.izler)) {
      kod.cizim.izler.forEach(iz => {
        const izNokta = (iz.nokta || []).filter(
          n => Array.isArray(n) && Number.isFinite(n[0]) && Number.isFinite(n[1])
        );
        if (izNokta.length < 2) return;
        L.polyline(izNokta, {
          color: iz.renk || bolum.renk,
          weight: 7,
          opacity: 0.85,
          lineCap: 'round',
          lineJoin: 'round',
          className: 'hk-harf-izi'
        }).addTo(katman);
        izNokta.forEach(n => noktalar.push(n));
      });
    }

    (kod.yerler || []).forEach((y, i) => {
      if (!Number.isFinite(y.lat) || !Number.isFinite(y.lng)) return;
      const ikon = L.divIcon({
        className: 'hk-yer-ikon',
        html: `<span class="hk-yer-pin" style="--hk-renk:${bolum.renk}">` +
              `<b>${i + 1}</b><i>${hkKacir(y.ad)}</i></span>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      L.marker([y.lat, y.lng], { icon: ikon, interactive: false }).addTo(katman);
      noktalar.push([y.lat, y.lng]);
    });

    // `latLngBounds` bozuk bir koordinat görürse hata fırlatır ve tur render'ı
    // yarıda kalır; harf izlerinin noktaları veri dosyasından elle geldiği için
    // sınırı kurmadan önce süzülürler.
    const gecerli = noktalar.filter(n => Array.isArray(n) && Number.isFinite(n[0]) && Number.isFinite(n[1]));
    if (gecerli.length && this.geoMap.flyToBoundsSafely) {
      this.geoMap.flyToBoundsSafely(L.latLngBounds(gecerli), { padding: [70, 70], maxZoom: 8 });
    }
  }

  // ------------------------------------------------------------------
  // AKIŞ
  // ------------------------------------------------------------------
  start(ayar = {}) {
    this.isActive = true;
    this.tur = 1;
    this.skor = 0;
    this.seri = 0;
    this.enUzunSeri = 0;
    this.dogruSayisi = 0;
    this.gecmis = [];
    this.cevaplandi = false;
    this.sonKodId = null;
    this.gorulenGorevler = new Set();

    this.bolumFiltre = (ayar.bolumler && ayar.bolumler.length) ? ayar.bolumler.slice(0) : null;
    this.turFiltre = (ayar.turler && ayar.turler.length) ? ayar.turler.slice(0) : null;
    this.kodFiltre = (ayar.kodlar && ayar.kodlar.length) ? ayar.kodlar.slice(0) : null;
    this.maxTur = Math.max(4, Math.min(30, parseInt(ayar.turSayisi, 10) || 12));

    // Tek kod çalışılırken tur sayısı o kodun besleyebildiği tip sayısını
    // aşmasın; aksi halde aynı soru birebir tekrar ederdi.
    if (this.kodFiltre && this.kodFiltre.length === 1) {
      const kod = this.kodHavuzu()[0];
      const uygun = kod ? HafizaKoduGame.uygunTurler(kod) : [];
      const sayi = this.turFiltre ? uygun.filter(t => this.turFiltre.includes(t)).length : uygun.length;
      if (sayi > 0) this.maxTur = Math.min(this.maxTur, sayi);
    }

    if (this.geoMap) {
      this.geoMap.clearAll();
      this.geoMap.resetView();
    }
    this.temizleHarita();

    return this.turKur();
  }

  next() {
    if (this.tur >= this.maxTur) {
      this.isActive = false;
      this.temizleHarita();
      return this.temelGorunum({ finished: true, summary: this.karne() });
    }
    this.tur++;
    return this.turKur();
  }

  /** Ayarlar tur ortasında değişirse aynı turu yeni ayarlarla kurar */
  refreshRound() {
    if (!this.isActive) return null;
    return this.turKur();
  }

  temelGorunum(ek) {
    return Object.assign({
      mode: this.modeKey,
      title: this.modeTitle,
      tur: this.tur,
      maxTur: this.maxTur,
      skor: this.skor,
      seri: this.seri,
      ayar: this.ayarEtiketi(),
      bolum: null,
      kod: null,
      turAdi: '',
      turIkon: '',
      turKey: '',
      yonerge: '',
      hikayeHtml: '',
      hikayeBaslik: '',
      tip: 'secim',
      secenekler: null,
      esles: null,
      zincir: null,
      geri: null,
      ileri: false,
      finished: false,
      summary: null
    }, ek);
  }

  turKur() {
    this.applySettings();
    this.cevaplandi = false;
    // Kendi katmanımızın yanında STANDART soru katmanını da boşalt: "Harita
    // Damgası" turu çoktan seçmeli pinleri multiChoiceLayerGroup'a bırakır ve
    // temizlenmezse bir sonraki turun üstünde asılı kalırlar.
    this.temizleHarita();
    if (this.geoMap && this.geoMap.clearAll) this.geoMap.clearAll();

    const gorev = this.sonrakiGorev();
    if (!gorev) {
      this.isActive = false;
      return this.temelGorunum({ finished: true, summary: this.karne(true) });
    }

    this.aktif = { kod: gorev.kod, tur: gorev.tur };
    this.sonKodId = gorev.kod.id;
    this.gorulenGorevler.add(gorev.kod.id + '|' + gorev.tur);

    switch (gorev.tur) {
      case 'esles':  return this.kurEsles(gorev.kod);
      case 'bosluk': return this.kurBosluk(gorev.kod);
      case 'zincir': return this.kurZincir(gorev.kod);
      case 'kacak':  return this.kurKacak(gorev.kod);
      case 'ters':   return this.kurTers(gorev.kod);
      case 'harita': return this.kurHarita(gorev.kod);
      default:       return this.kurTers(gorev.kod);
    }
  }

  _turBasligi(turKey) {
    return HK_TUR_TANIMLARI.find(t => t.key === turKey) || { ad: '', ikon: '🧠' };
  }

  _kodGorunum(kod, turKey, ek) {
    const t = this._turBasligi(turKey);
    return this.temelGorunum(Object.assign({
      bolum: this.bolumBilgi(kod.bolum),
      kod: { id: kod.id, baslik: kod.baslik, ikon: kod.ikon, konu: kod.konu },
      turAdi: t.ad,
      turIkon: t.ikon,
      turKey: turKey
    }, ek));
  }

  // ---------------- 🧩 KOD ÇÖZÜCÜ (EŞLEŞTİRME) ----------------
  kurEsles(kod) {
    const ciftler = hkCiftler(kod);
    const secilen = HafizaKoduGame.karistir(ciftler).slice(0, Math.min(6, ciftler.length));

    this.durum = {
      tip: 'esles',
      hedefler: secilen.map(c => c.idx),
      eslesen: [],
      hata: 0,
      secilenSol: null,
      secilenSag: null
    };

    return this._kodGorunum(kod, 'esles', {
      tip: 'esles',
      yonerge: 'Hikâyedeki her <b>imge</b>, gerçekte bir coğrafi bilgiyi saklıyor. Soldaki metaforu sağdaki karşılığıyla eşleştir.',
      hikayeBaslik: 'Hikâye (imgeler açık, karşılıklar kapalı)',
      hikayeHtml: hkHikayeHtml(kod, { cozuk: false }),
      esles: this._eslesTahtasi(kod, secilen)
    });
  }

  _eslesTahtasi(kod, secilen) {
    return {
      sol: HafizaKoduGame.karistir(secilen).map(c => ({
        id: c.idx, label: c.imge, state: this.durum.eslesen.includes(c.idx) ? 'matched' : ''
      })),
      sag: HafizaKoduGame.karistir(secilen).map(c => ({
        id: c.idx, label: c.gercek, state: this.durum.eslesen.includes(c.idx) ? 'matched' : ''
      })),
      hata: this.durum.hata,
      kalan: this.durum.hedefler.length - this.durum.eslesen.length
    };
  }

  /** Eşleştirme tahtasında bir kart seçimi */
  eslesSec(kartId, taraf) {
    if (!this.isActive || this.cevaplandi || !this.durum || this.durum.tip !== 'esles') return null;
    const kod = this.aktif.kod;
    const id = parseInt(kartId, 10);
    if (this.durum.eslesen.includes(id)) return null;

    if (taraf === 'sol') this.durum.secilenSol = id;
    else this.durum.secilenSag = id;

    const sol = this.durum.secilenSol, sag = this.durum.secilenSag;
    if (sol == null || sag == null) {
      return { sonuc: 'secildi', secilenSol: sol, secilenSag: sag };
    }

    this.durum.secilenSol = null;
    this.durum.secilenSag = null;

    if (sol === sag) {
      this.durum.eslesen.push(sol);
      const bitti = this.durum.eslesen.length === this.durum.hedefler.length;
      if (bitti) {
        const puan = Math.max(30, 100 - 12 * this.durum.hata);
        const gorunum = this._bitir(kod, this.durum.hata === 0, puan, {
          baslik: this.durum.hata === 0
            ? '🎯 Kodu hatasız çözdün!'
            : `✅ Kod çözüldü — ${this.durum.hata} hatayla`,
          satirlar: hkCiftler(kod).map(c => ({ label: c.imge, value: c.gercek })),
          not: kod.puf
        });
        return { sonuc: 'tamam', eslesenId: sol, gorunum: gorunum };
      }
      return { sonuc: 'eslesti', eslesenId: sol, kalan: this.durum.hedefler.length - this.durum.eslesen.length };
    }

    this.durum.hata++;
    return { sonuc: 'hata', solId: sol, sagId: sag, hata: this.durum.hata };
  }

  // ---------------- ✍️ BOŞLUK DOLDUR ----------------
  kurBosluk(kod) {
    const ciftler = hkCiftler(kod);
    const hedef = ciftler[Math.floor(Math.random() * ciftler.length)];
    // Yarı yarıya: bazen imge silinir (hikâyeyi hatırla), bazen gerçek (kodu çöz)
    const tip = Math.random() < 0.5 ? 'gercek' : 'imge';
    const dogruMetin = tip === 'gercek' ? hedef.gercek : hedef.imge;

    // Çeldiriciler: önce AYNI kodun diğer halkaları (en zorlayıcı olan bu),
    // yetmezse komşu kodların aynı türden halkaları.
    let havuz = ciftler
      .filter(c => c.idx !== hedef.idx)
      .map(c => (tip === 'gercek' ? c.gercek : c.imge));

    this.celdiriciHavuzu(kod).forEach(k => {
      hkCiftler(k).forEach(c => havuz.push(tip === 'gercek' ? c.gercek : c.imge));
    });

    // Havuz SIRASI korunur: baştaki adaylar aynı kodun diğer halkaları, sonrakiler
    // öncelik sırasına göre komşu kodlar. Burada karıştırmak, en öğretici
    // çeldiriciyi (aynı hikâyenin başka bir halkası) listenin dibine atardı.
    havuz = HafizaKoduGame.benzersiz(havuz.filter(x => x && x !== dogruMetin));

    const secenekler = HafizaKoduGame.karistir(
      [dogruMetin].concat(havuz.slice(0, this.optionCount - 1))
    ).map((metin, i) => ({ id: 'b' + i, label: metin, dogru: metin === dogruMetin }));

    this.durum = { tip: 'bosluk', hedefIdx: hedef.idx, boslukTipi: tip, secenekler: secenekler };

    return this._kodGorunum(kod, 'bosluk', {
      tip: 'secim',
      yonerge: tip === 'gercek'
        ? 'Hikâyedeki imge duruyor ama <b>coğrafi karşılığı</b> silindi. Boşluğa ne gelmeli?'
        : 'Coğrafi karşılık duruyor ama hikâyedeki <b>imge</b> silindi. Hangi metafordu?',
      hikayeBaslik: 'Eksik halkalı hikâye',
      hikayeHtml: hkHikayeHtml(kod, { cozuk: true, bosluk: hedef.idx, boslukTipi: tip }),
      secenekler: secenekler.map(s => ({ id: s.id, label: s.label }))
    });
  }

  // ---------------- 🔗 HİKÂYE ZİNCİRİ (SIRALAMA) ----------------
  kurZincir(kod) {
    const ogeler = kod.sira.ogeler.slice(0);
    this.durum = {
      tip: 'zincir',
      dogruSira: ogeler.slice(0),
      yerlesim: []                       // kullanıcının koyduğu sıra (etiketler)
    };

    return this._kodGorunum(kod, 'zincir', {
      tip: 'zincir',
      yonerge: `<b>${hkKacir(kod.sira.baslik)}</b> — ${hkKacir(kod.sira.yon)}. Kartlara doğru sırayla tıkla; yanlış koyduğunu tekrar tıklayarak geri al.`,
      hikayeBaslik: 'Tekerleme',
      hikayeHtml: hkHikayeHtml(kod, { cozuk: false }),
      zincir: {
        havuz: HafizaKoduGame.karistir(ogeler).map((o, i) => ({ id: 'z' + i, label: o, order: null })),
        hedefSayi: ogeler.length,
        yon: kod.sira.yon
      }
    });
  }

  /** Zincir turunda bir kart yerleştirilir ya da geri alınır */
  zincirSec(etiket) {
    if (!this.isActive || this.cevaplandi || !this.durum || this.durum.tip !== 'zincir') return null;

    const mevcut = this.durum.yerlesim.indexOf(etiket);
    if (mevcut >= 0) {
      // Bu karttan sonrasını da bırak — yarım kalmış bir sıra kafa karıştırıyordu
      this.durum.yerlesim = this.durum.yerlesim.slice(0, mevcut);
      return { sonuc: 'geri', yerlesim: this.durum.yerlesim.slice(0) };
    }

    this.durum.yerlesim.push(etiket);
    if (this.durum.yerlesim.length < this.durum.dogruSira.length) {
      return { sonuc: 'yerlesti', yerlesim: this.durum.yerlesim.slice(0) };
    }

    // Tamamlandı — değerlendir
    const kod = this.aktif.kod;
    const dogru = this.durum.dogruSira;
    let isabet = 0;
    dogru.forEach((d, i) => { if (this.durum.yerlesim[i] === d) isabet++; });
    const tamMi = isabet === dogru.length;
    const puan = Math.round(100 * (isabet / dogru.length));

    const satirlar = dogru.map((d, i) => ({
      label: `${i + 1}. ${d}`,
      value: this.durum.yerlesim[i] === d ? '✓' : `✗ (senin: ${this.durum.yerlesim[i]})`,
      vurgu: this.durum.yerlesim[i] !== d
    }));

    const gorunum = this._bitir(kod, tamMi, puan, {
      baslik: tamMi ? '🎯 Zincir tam sırasında!' : `⚠️ ${isabet}/${dogru.length} halka doğru yerde`,
      satirlar: satirlar,
      not: [kod.siraNot, kod.puf].filter(Boolean).join('  ')
    });

    return { sonuc: 'tamam', gorunum: gorunum, yerlesim: this.durum.yerlesim.slice(0) };
  }

  // ---------------- 🕵️ KAÇAK YAKALA ----------------
  kurKacak(kod) {
    const uyeSayisi = Math.max(2, Math.min(kod.uyeler.length, this.optionCount - 1));
    const uyeler = HafizaKoduGame.karistir(kod.uyeler).slice(0, uyeSayisi);
    const kacak = HafizaKoduGame.karistir(kod.kacaklar)[0];

    const secenekler = HafizaKoduGame.karistir(
      uyeler.map(u => ({ label: u, dogru: false })).concat([{ label: kacak, dogru: true }])
    ).map((s, i) => ({ id: 'k' + i, label: s.label, dogru: s.dogru }));

    this.durum = { tip: 'kacak', secenekler: secenekler, kacak: kacak, uyeler: uyeler };

    return this._kodGorunum(kod, 'kacak', {
      tip: 'secim',
      yonerge: `Aşağıdaki listeye <b>bir tanesi sonradan sızdı</b>. “${hkKacir(kod.baslik)}” koduna ait <b>olmayan</b> hangisi?`,
      hikayeBaslik: 'Kodun konusu',
      hikayeHtml: `<span class="hk-konu-kutu">${hkKacir(kod.konu)}</span>`,
      secenekler: secenekler.map(s => ({ id: s.id, label: s.label }))
    });
  }

  // ---------------- 🔑 TERS KOD ----------------
  kurTers(kod) {
    const celdirici = HafizaKoduGame.benzersiz(
      this.celdiriciHavuzu(kod).map(k => k.cevap).filter(Boolean),
      x => x
    ).filter(c => c !== kod.cevap);

    const secenekler = HafizaKoduGame.karistir(
      [{ label: kod.cevap, dogru: true }]
        .concat(celdirici.slice(0, this.optionCount - 1).map(c => ({ label: c, dogru: false })))
    ).map((s, i) => ({ id: 't' + i, label: s.label, dogru: s.dogru }));

    this.durum = { tip: 'ters', secenekler: secenekler };

    return this._kodGorunum(kod, 'ters', {
      tip: 'secim',
      yonerge: hkKacir(kod.soru),
      hikayeBaslik: 'Kodun kendisi (karşılıklar kapalı)',
      hikayeHtml: hkHikayeHtml(kod, { cozuk: false }),
      secenekler: secenekler.map(s => ({ id: s.id, label: s.label }))
    });
  }

  // ---------------- 🗺️ HARİTA DAMGASI ----------------
  kurHarita(kod) {
    const hedef = HafizaKoduGame.karistir(kod.yerler)[0];

    // Çeldirici noktalar başka kodlardan; zorluk arttıkça aynı bölümden gelir
    const digerYerler = [];
    this.celdiriciHavuzu(kod).forEach(k => {
      (k.yerler || []).forEach(y => {
        if (Number.isFinite(y.lat) && Number.isFinite(y.lng)) digerYerler.push(y);
      });
    });

    const secilenler = HafizaKoduGame.karistir(
      [hedef].concat(
        HafizaKoduGame.benzersiz(digerYerler, y => y.ad)
          .filter(y => y.ad !== hedef.ad)
          .slice(0, Math.max(1, this.optionCount - 1))
      )
    );

    const pinler = secilenler.map((y, i) => ({
      id: 'h' + i,
      name: y.ad,
      lat: y.lat,
      lng: y.lng,
      shapeType: 'point',
      category: 'hafiza_kodu',
      dogru: y.ad === hedef.ad
    }));

    this.durum = { tip: 'harita', pinler: pinler, hedef: hedef };

    // Pinleri haritaya bas; kullanıcı hem panelden hem haritadan cevaplayabilir
    if (this.geoMap && this.geoMap.showMultipleChoiceLocations) {
      this.geoMap.showMultipleChoiceLocations(pinler, (pinId) => {
        if (this.onPinSelect) this.onPinSelect(pinId);
      }, { rozetSabit: true });
    }

    return this._kodGorunum(kod, 'harita', {
      tip: 'secim',
      yonerge: `“${hkKacir(kod.baslik)}” kodunun uğradığı yerlerden biri: <b>${hkKacir(hedef.ad)}</b>. Haritada hangi işaret ona ait?`,
      hikayeBaslik: 'Hikâye',
      hikayeHtml: hkHikayeHtml(kod, { cozuk: true }),
      secenekler: pinler.map(p => ({ id: p.id, label: p.name })),
      haritaPinleri: true
    });
  }

  // ------------------------------------------------------------------
  // CEVAP
  // ------------------------------------------------------------------
  /** Tek seçimli turlar (bosluk / kacak / ters / harita) */
  select(secenekId) {
    if (!this.isActive || this.cevaplandi || !this.durum) return null;
    if (this.durum.tip === 'esles' || this.durum.tip === 'zincir') return null;

    const kod = this.aktif.kod;
    const liste = this.durum.secenekler || this.durum.pinler || [];
    const secilen = liste.find(s => s.id === secenekId);
    if (!secilen) return null;

    const dogru = !!secilen.dogru;
    const dogruSecenek = liste.find(s => s.dogru);

    liste.forEach(s => { s.state = s.dogru ? 'correct' : (s.id === secenekId ? 'wrong' : ''); });

    if (this.durum.tip === 'harita' && this.geoMap && this.geoMap.highlightMultiChoiceAnswer) {
      this.geoMap.highlightMultiChoiceAnswer(dogruSecenek ? dogruSecenek.id : null, secenekId);
    }

    const satirlar = this._geriBildirimSatirlari(kod, secilen, dogruSecenek, dogru);
    const baslik = dogru
      ? '✅ Doğru — kod çözüldü'
      : `❌ Yanlış — doğrusu: ${dogruSecenek ? dogruSecenek.label || dogruSecenek.name : '—'}`;

    return this._bitir(kod, dogru, dogru ? 100 : 0, {
      baslik: baslik,
      satirlar: satirlar,
      not: [this.durum.tip === 'zincir' ? kod.siraNot : null, kod.puf].filter(Boolean).join('  ')
    }, liste);
  }

  _geriBildirimSatirlari(kod, secilen, dogruSecenek, dogru) {
    if (this.durum.tip === 'kacak') {
      return [
        { label: 'Kaçak (koda ait değil)', value: this.durum.kacak, vurgu: true },
        { label: 'Kodun gerçek üyeleri', value: this.durum.uyeler.join(' · ') }
      ];
    }
    if (this.durum.tip === 'harita') {
      return [
        { label: 'Aranan yer', value: this.durum.hedef.ad, vurgu: true },
        { label: 'Kodun tüm durakları', value: (kod.yerler || []).map(y => y.ad).join(' · ') }
      ];
    }
    if (this.durum.tip === 'bosluk') {
      const cift = hkCiftler(kod).find(c => c.idx === this.durum.hedefIdx);
      return [
        { label: 'İmge', value: cift ? cift.imge : '—' },
        { label: 'Gerçek karşılığı', value: cift ? cift.gercek : '—', vurgu: true }
      ];
    }
    // ters kod
    return [
      { label: 'Kod', value: kod.baslik },
      { label: 'Karşılığı', value: kod.cevap, vurgu: true }
    ];
  }

  /** Turu kapatan ortak yol: puan, ustalık, harita odağı, çözülmüş hikâye */
  _bitir(kod, dogru, puan, geri, secenekListesi) {
    this.cevaplandi = true;

    this.skor += puan;
    if (dogru) {
      this.dogruSayisi++;
      this.seri++;
      this.enUzunSeri = Math.max(this.enUzunSeri, this.seri);
    } else {
      this.seri = 0;
    }

    HafizaUstalik.isle(kod.id, dogru);

    this.gecmis.push({
      left: `${kod.ikon || '🧠'} ${kod.baslik} · ${this._turBasligi(this.aktif.tur).ad}`,
      right: dogru ? `+${puan}` : (puan > 0 ? `+${puan}` : '✗'),
      ok: dogru
    });

    this.kodaOdaklan(kod);

    const gorunum = this._kodGorunum(kod, this.aktif.tur, {
      tip: this.aktif.tur === 'esles' ? 'esles' : (this.aktif.tur === 'zincir' ? 'zincir' : 'secim'),
      yonerge: '',
      hikayeBaslik: '🔓 Çözülmüş hikâye',
      hikayeHtml: hkHikayeHtml(kod, { cozuk: true, vurgu: this.durum && this.durum.hedefIdx }),
      secenekler: secenekListesi
        ? secenekListesi.map(s => ({ id: s.id, label: s.label || s.name, state: s.state || '' }))
        : null,
      geri: Object.assign({ ok: dogru, puan: puan }, geri),
      ileri: true
    });

    gorunum.skor = this.skor;
    gorunum.seri = this.seri;
    return gorunum;
  }

  // ------------------------------------------------------------------
  // KARNE
  // ------------------------------------------------------------------
  karne(havuzBitti = false) {
    const maks = this.maxTur * 100;
    const oran = maks > 0 ? this.skor / maks : 0;
    let unvan = 'Kod Çırağı', rozet = '🧠';
    if (oran >= 0.9) { unvan = 'Hafıza Sarayı Mimarı'; rozet = '🏛️'; }
    else if (oran >= 0.7) { unvan = 'Kod Çözücü'; rozet = '🔑'; }
    else if (oran >= 0.45) { unvan = 'Hikâye Avcısı'; rozet = '📖'; }

    const bolumAdi = this.bolumFiltre
      ? this.bolumFiltre.map(b => this.bolumBilgi(b).kisa).join(' · ')
      : 'Tüm bölümler';

    return {
      badge: rozet,
      title: havuzBitti ? 'Bu seçimde soru kalmadı' : unvan,
      subtitle: `${bolumAdi} · ${this.ayarEtiketi()}`,
      stats: [
        { val: this.skor, label: '🏆 Toplam Puan', cls: 'record' },
        { val: `${this.dogruSayisi}/${this.gecmis.length || this.maxTur}`, label: '✓ Doğru Tur', cls: 'correct' },
        { val: this.enUzunSeri, label: '🔥 En Uzun Seri', cls: 'streak' }
      ],
      rows: this.gecmis
    };
  }

  exit() {
    this.isActive = false;
    this.cevaplandi = false;
    this.durum = null;
    this.aktif = null;
    this.temizleHarita();
    if (this.geoMap) this.geoMap.clearAll();
  }
}

/* ==========================================================================
 * 📚 KOD GALERİSİ
 * Kullanıcının isteğinin ilk yarısı: "elimdeki tüm kodları görselleştirerek
 * bize sunan" bir yer. Oyun burada başlar, burada biter.
 * ========================================================================== */

const HafizaGaleri = {
  /** Bölüm sekmesi şeridi */
  bolumSeridi(aktifKey) {
    const kodlar = (typeof HAFIZA_KODLARI !== 'undefined' ? HAFIZA_KODLARI : []);
    const bolumler = (typeof HAFIZA_BOLUMLERI !== 'undefined' ? HAFIZA_BOLUMLERI : []);

    const hepsi = `<button class="hk-gal-tab ${!aktifKey ? 'active' : ''}" data-bolum="">
        <span>🧠</span> Tümü <b>${kodlar.length}</b></button>`;

    return hepsi + bolumler.map(b => {
      const adet = kodlar.filter(k => k.bolum === b.key).length;
      if (!adet) return '';
      return `<button class="hk-gal-tab ${aktifKey === b.key ? 'active' : ''}"
                data-bolum="${b.key}" style="--hk-renk:${b.renk}">
                <span>${b.ikon}</span> ${hkKacir(b.kisa)} <b>${adet}</b></button>`;
    }).join('');
  },

  /** Kod kartları — hikâye + çözüm tablosu + ustalık + harita durakları */
  kartlar(bolumKey, arama) {
    const kodlar = (typeof HAFIZA_KODLARI !== 'undefined' ? HAFIZA_KODLARI : []);
    const norm = (s) => (typeof trLower === 'function' ? trLower(s) : String(s || '').toLowerCase());
    const q = norm(arama || '');

    const liste = kodlar.filter(k => {
      if (bolumKey && k.bolum !== bolumKey) return false;
      if (!q) return true;
      return norm(k.baslik).includes(q) || norm(k.konu).includes(q) ||
             norm(k.hikaye).includes(q) || norm(k.puf || '').includes(q);
    });

    if (!liste.length) {
      return `<div class="hk-gal-bos">🔍 Aramanla eşleşen kod bulunamadı.</div>`;
    }

    return liste.map(kod => {
      const bolum = (typeof HAFIZA_BOLUMLERI !== 'undefined' ? HAFIZA_BOLUMLERI : [])
        .find(b => b.key === kod.bolum) || { renk: '#8b5cf6', ikon: '🧠', kisa: 'Kod' };
      const ust = HafizaUstalik.yuzde(kod.id);
      const kayit = HafizaUstalik.kayit(kod.id);
      const ciftler = hkCiftler(kod);

      const rozetler = [];
      if (kod.sira) rozetler.push('🔗 sıralama');
      if (kod.uyeler) rozetler.push('🕵️ kaçak');
      if (kod.cizim) rozetler.push(`✏️ ${kod.cizim.etiket}`);
      if (kod.yerler && kod.yerler.length) rozetler.push(`🗺️ ${kod.yerler.length} durak`);

      return `
      <article class="hk-gal-kart" data-kod="${kod.id}" style="--hk-renk:${bolum.renk}">
        <header class="hk-gal-kart-bas">
          <span class="hk-gal-ikon">${kod.ikon || bolum.ikon}</span>
          <div class="hk-gal-bas-metin">
            <h3>${hkKacir(kod.baslik)}</h3>
            <small>${hkKacir(kod.konu)}</small>
          </div>
          <div class="hk-gal-ustalik" title="Ustalık: ${ust}%  ·  ✓${kayit.dogru} ✗${kayit.yanlis}">
            <div class="hk-gal-ust-track"><div class="hk-gal-ust-fill" style="width:${ust}%"></div></div>
            <span>${ust}%</span>
          </div>
        </header>

        <div class="hk-gal-hikaye">${hkHikayeHtml(kod, { cozuk: true })}</div>

        <details class="hk-gal-cozum">
          <summary>🔑 Çözüm tablosu (${ciftler.length} halka)</summary>
          <table>
            ${ciftler.map(c => `<tr><td>${hkKacir(c.imge)}</td><td>${hkKacir(c.gercek)}</td></tr>`).join('')}
          </table>
        </details>

        ${kod.puf ? `<p class="hk-gal-puf">📌 ${hkKacir(kod.puf)}</p>` : ''}
        ${kod.siraNot ? `<p class="hk-gal-uyari">⚠️ ${hkKacir(kod.siraNot)}</p>` : ''}

        <footer class="hk-gal-alt">
          <div class="hk-gal-rozetler">${rozetler.map(r => `<span>${r}</span>`).join('')}</div>
          <div class="hk-gal-btnler">
            ${(kod.yerler && kod.yerler.length) || kod.cizim
              ? `<button class="hk-gal-btn harita" data-harita="${kod.id}"
                    title="Haritayı bu koda ayırır; ekrandaki testin/keşfin işaretleri temizlenir.">🗺️ Haritada göster</button>` : ''}
            <button class="hk-gal-btn calis" data-calis="${kod.id}">🎯 Bu kodu çalış</button>
          </div>
        </footer>
      </article>`;
    }).join('');
  }
};

if (typeof window !== 'undefined') {
  window.HafizaKoduGame = HafizaKoduGame;
  window.HafizaUstalik = HafizaUstalik;
  window.HafizaGaleri = HafizaGaleri;
  window.HK_TUR_TANIMLARI = HK_TUR_TANIMLARI;
  window.hkHikayeHtml = hkHikayeHtml;
  window.hkCiftler = hkCiftler;
}
