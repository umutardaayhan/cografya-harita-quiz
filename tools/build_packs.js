/**
 * 📦 PAKET DERLEYİCİSİ (Pack Builder)
 *
 * Eski monolitik `data/cografya_data.js` dosyasını okur ve onu globalleşmeye
 * hazır, ülke kapsamlı, i18n destekli DLC paketlerine böler:
 *
 *   data/packs/catalog.js        → paylaşılan kategori + alt tür + paket manifesti
 *   data/packs/pack.tr.*.js      → ülke/konu paketleri (lazy yüklenir)
 *
 * Bu betik, yol haritasındaki SQLite pipeline'ının (`build_dataset.py`) yerini
 * alacağı ARA KATMANDIR: çıktı şeması birebir aynı olduğu için, veri kaynağı
 * SQLite'a taşındığında yalnızca bu betiğin GİRDİ tarafı değişir.
 *
 * Kullanım:  node tools/build_packs.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'data', 'cografya_data.legacy.js');
const OUT_DIR = path.join(ROOT, 'data', 'packs');

// ---------------------------------------------------------------------------
// 1. KAYNAK VERİYİ YÜKLE
// ---------------------------------------------------------------------------
const legacySrc = fs.readFileSync(SRC, 'utf8');

// data/source/*.js dosyaları sıra numarasına göre okunur ve legacy kaynağın
// üzerine eklenir. Yeni konu eklemek için buraya yeni bir numaralı dosya
// bırakmak yeterlidir; derleyicide değişiklik gerekmez.
const SOURCE_DIR = path.join(ROOT, 'data', 'source');
const extFiles = fs.existsSync(SOURCE_DIR)
  ? fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.js')).sort()
  : [];
const extSrc = extFiles
  .map(f => fs.readFileSync(path.join(SOURCE_DIR, f), 'utf8'))
  .join(String.fromCharCode(10));

const BOOTSTRAP = [
  'var COGRAFYA_DATA_EXT = {};'
].join(String.fromCharCode(10));

const MERGE = [
  'Object.assign(COGRAFYA_DATA, COGRAFYA_DATA_EXT);',
  'if (typeof CATEGORIES_EXT !== "undefined") CATEGORIES.push.apply(CATEGORIES, CATEGORIES_EXT);',
  'if (typeof SUB_TYPES_EXT !== "undefined") Object.assign(SUB_TYPES, SUB_TYPES_EXT);',
  'return { COGRAFYA_DATA, CATEGORIES, SUB_TYPES, trLower };'
].join(String.fromCharCode(10));

const NL = String.fromCharCode(10);
const { COGRAFYA_DATA, CATEGORIES, SUB_TYPES, trLower } = new Function(
  legacySrc + NL + BOOTSTRAP + NL + extSrc + NL + MERGE
)();

// Oluşum taksonomisini oyun dosyasından aynen ödünç alıyoruz; böylece
// `formation` (olusumKey) alanı çalışan mantıkla BİREBİR aynı sonucu verir.
const olusumSrc = fs.readFileSync(path.join(ROOT, 'js', 'olusum_quiz.js'), 'utf8');
const taxoLiteral = olusumSrc.slice(
  olusumSrc.indexOf('const OLUSUM_TAKSONOMISI'),
  olusumSrc.indexOf('/** Zorluk arttıkça')
);
const { OLUSUM_TAKSONOMISI } = new Function(
  'trLower',
  taxoLiteral + '; return { OLUSUM_TAKSONOMISI };'
)(trLower);

// ---------------------------------------------------------------------------
// 2. ŞEMA TANIMLARI
// ---------------------------------------------------------------------------

/** Dile bağlı (çevrilebilir) alanlar → item.i18n[lang] altına taşınır */
const I18N_FIELDS = {
  name: 'name',
  shortName: 'shortName',
  type: 'type',
  region: 'region',
  city: 'city',
  kpssNot: 'note',
  matchSource: 'matchSource',
  questionText: 'questionText',
  promptTitle: 'promptTitle'
};

/** Dilden bağımsız alanlar → kökte kalır */
const NEUTRAL_FIELDS = ['areaKm2', 'matchType', 'groupId'];

/**
 * Kategori kayıt defteri. `canonical` alanı Faz 2'deki SQLite şemasının
 * `categories.id` sütununa denk gelir; çalışma zamanındaki anahtar (`daglar`)
 * ise DİLDEN BAĞIMSIZ, OPAK bir slug olarak kabul edilir — Almanya paketi de
 * dağlarını aynı `daglar` kovasına doldurur.
 */
const CATEGORY_META = {
  daglar:            { canonical: 'mountains',   en: { title: 'Mountains',           short: 'Mtn' } },
  ovalar:            { canonical: 'plains',      en: { title: 'Plains',              short: 'Plain' } },
  platolar:          { canonical: 'plateaus',    en: { title: 'Plateaus',            short: 'Plateau' } },
  su_kaynaklari:     { canonical: 'waters',      en: { title: 'Rivers & Lakes',      short: 'Water' } },
  gecitler:          { canonical: 'passes',      en: { title: 'Passes & Straits',    short: 'Pass' } },
  tarim:             { canonical: 'agriculture', en: { title: 'Agriculture',         short: 'Agri' } },
  hayvancilik:       { canonical: 'livestock',   en: { title: 'Livestock',           short: 'Stock' } },
  sanayi:            { canonical: 'industry',    en: { title: 'Industry',            short: 'Ind' } },
  iklim:             { canonical: 'climate',     en: { title: 'Climate & Extremes',  short: 'Climate' } },
  orman:             { canonical: 'vegetation',  en: { title: 'Forest & Vegetation', short: 'Flora' } },
  iliskili_cografya: { canonical: 'relations',   en: { title: 'Relations',           short: 'Match' } },

  // --- Genişletilmiş müfredat kategorileri ---
  toprak:        { canonical: 'soils',        en: { title: 'Soil Types',              short: 'Soil' } },
  afet:          { canonical: 'hazards',      en: { title: 'Natural Hazard Zones',    short: 'Hazard' } },
  fay:           { canonical: 'tectonics',    en: { title: 'Faults & Tectonics',      short: 'Fault' } },
  madenler:      { canonical: 'minerals',     en: { title: 'Minerals & Energy',       short: 'Mineral' } },
  nufus:         { canonical: 'population',   en: { title: 'Population & Settlement', short: 'Pop.' } },
  bolgeler:      { canonical: 'regions',      en: { title: 'Regions & Subregions',    short: 'Region' } },
  kiyilar:       { canonical: 'coasts',       en: { title: 'Coasts, Islands & Seas',  short: 'Coast' } },
  dis_kuvvetler: { canonical: 'exogenic',     en: { title: 'Exogenic Landforms',      short: 'Exogenic' } },
  turizm:        { canonical: 'tourism',      en: { title: 'Tourism & Heritage',      short: 'Tourism' } },
  ulasim:        { canonical: 'transport',    en: { title: 'Transport & Trade',       short: 'Transport' } },
  sehirler:      { canonical: 'provinces',    en: { title: 'Provinces & 81 Cities',   short: 'Cities' } }
};

/**
 * Paket grupları — mağazada filtre sekmesi olarak kullanılır.
 * Paket sayısı arttıkça sayfalamanın yanında asıl gezinme aracı budur.
 */
const PACK_GROUPS = {
  'tr.daglar': 'fiziki', 'tr.sular': 'fiziki', 'tr.ova_plato': 'fiziki',
  'tr.gecitler': 'fiziki', 'tr.iklim_orman': 'fiziki', 'tr.toprak': 'fiziki',
  'tr.afet': 'fiziki', 'tr.fay': 'fiziki', 'tr.kiyilar': 'fiziki',
  'tr.dis_kuvvetler': 'fiziki',
  'tr.beseri': 'ekonomik', 'tr.madenler': 'ekonomik', 'tr.turizm': 'ekonomik',
  'tr.ulasim': 'ekonomik',
  'tr.sehirler': 'beseri', 'tr.nufus': 'beseri', 'tr.bolgeler': 'beseri', 'tr.iliskiler': 'beseri',
  'tr.mutlak_konum': 'modul'
};

/**
 * Paket tanımları. Her paket bir ÜLKE'ye (`country`) aittir ve bir ya da birden
 * fazla kategoriyi besler. Yeni ülke eklemek = buraya yeni satır + yeni kaynak.
 */
const PACK_DEFS = [
  {
    id: 'tr.daglar', country: 'tr', categories: ['daglar'],
    icon: '🏔️', color: '#e67e22',
    tr: { title: 'Dağlar & Sıradağlar', desc: 'Volkanik, kıvrım ve kırık dağlar; zirveler, sıradağlar ve yükselti rekorları.' },
    en: { title: 'Mountains & Ranges',  desc: 'Volcanic, fold and fault mountains; peaks, ranges and elevation records.' },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam', 'olusum', 'boyama', 'layer_topo', 'layer_terrain'],
    planRows: [{ cat: 'daglar', icon: '🏔️', count: 20, tr: 'Dağ', en: 'Mountain' }],
    recommends: []
  },
  {
    id: 'tr.sular', country: 'tr', categories: ['su_kaynaklari'],
    icon: '🌊', color: '#2980b9',
    tr: { title: 'Akarsular & Göller', desc: 'Nehir hatları ve havzalar; tektonik, karstik, buzul ve set gölleri.' },
    en: { title: 'Rivers & Lakes',     desc: 'River courses and basins; tectonic, karstic, glacial and barrier lakes.' },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam', 'olusum', 'boyama'],
    planRows: [
      { cat: 'su_kaynaklari', icon: '🏞️', count: 15, tr: 'Akarsu', en: 'River', geom: 'polyline' },
      { cat: 'su_kaynaklari', icon: '💧', count: 10, tr: 'Göl',    en: 'Lake',  geom: 'point' }
    ],
    recommends: []
  },
  {
    id: 'tr.ova_plato', country: 'tr', categories: ['ovalar', 'platolar'],
    icon: '🌾', color: '#27ae60',
    tr: { title: 'Ovalar & Platolar', desc: 'Delta, tektonik ve karstik ovalar; tabaka, lav ve aşınım platoları.' },
    en: { title: 'Plains & Plateaus', desc: 'Delta, tectonic and karstic plains; strata, lava and erosion plateaus.' },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam', 'olusum', 'boyama', 'layer_topo'],
    planRows: [
      { cat: 'ovalar',   icon: '🌾', count: 12, tr: 'Ova',   en: 'Plain' },
      { cat: 'platolar', icon: '⛰️', count: 10, tr: 'Plato', en: 'Plateau' }
    ],
    recommends: []
  },
  {
    id: 'tr.gecitler', country: 'tr', categories: ['gecitler'],
    icon: '🚪', color: '#8e44ad',
    tr: { title: 'Geçitler & Boğazlar', desc: 'Dağ geçitleri, ulaşım koridorları ve deniz boğazları.' },
    en: { title: 'Passes & Straits',    desc: 'Mountain passes, transport corridors and sea straits.' },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam'],
    planRows: [{ cat: 'gecitler', icon: '🚪', count: 8, tr: 'Geçit', en: 'Pass' }],
    recommends: ['tr.daglar']
  },
  {
    id: 'tr.beseri', country: 'tr', categories: ['tarim', 'hayvancilik', 'sanayi'],
    icon: '🚜', color: '#84cc16',
    tr: { title: 'Tarım, Hayvancılık & Sanayi', desc: 'Ürün yetişme alanları, hayvancılık kuşakları ve sanayi tesisleri.' },
    en: { title: 'Agriculture, Livestock & Industry', desc: 'Crop belts, livestock zones and industrial facilities.' },
    unlocks: ['quiz', 'conqueror', 'speedrun', 'exam'],
    planRows: [
      { cat: 'tarim',       icon: '🚜', count: 33, tr: 'Tarım',  en: 'Agriculture' },
      { cat: 'hayvancilik', icon: '🐑', count: 6,  tr: 'Hayvan', en: 'Livestock' },
      { cat: 'sanayi',      icon: '🏭', count: 10, tr: 'Sanayi', en: 'Industry' }
    ],
    recommends: []
  },
  {
    id: 'tr.iklim_orman', country: 'tr', categories: ['iklim', 'orman'],
    icon: '🌡️', color: '#f59e0b',
    tr: { title: 'İklim & Bitki Örtüsü', desc: 'İklim kuşakları, uç değerler, mikroklima alanları ve orman formasyonları.' },
    en: { title: 'Climate & Vegetation', desc: 'Climate belts, extremes, microclimates and forest formations.' },
    unlocks: ['quiz', 'conqueror', 'speedrun', 'exam'],
    planRows: [
      { cat: 'iklim', icon: '🌡️', count: 10, tr: 'İklim', en: 'Climate' },
      { cat: 'orman', icon: '🌲', count: 10, tr: 'Orman', en: 'Forest' }
    ],
    recommends: []
  },
  {
    id: 'tr.iliskiler', country: 'tr', categories: ['iliskili_cografya'],
    icon: '🔗', color: '#ec4899',
    tr: { title: 'İlişkili Eşleştirmeler', desc: 'Akarsu ➡️ Delta, Dağ ➡️ Geçit ve Hayvancılık ➡️ Bölge bağlantıları.' },
    en: { title: 'Geographic Relations',  desc: 'River ➡️ Delta, Mountain ➡️ Pass and Livestock ➡️ Region links.' },
    unlocks: ['quiz', 'match'],
    planRows: [],
    recommends: ['tr.sular', 'tr.daglar']
  },
  {
    id: 'tr.toprak', country: 'tr', categories: ['toprak'],
    icon: '🟫', color: '#a16207',
    tr: { title: 'Toprak Tipleri', desc: 'Zonal, azonal ve intrazonal topraklar; çernezyomdan terra rossaya oluşum koşulları.' },
    en: { title: 'Soil Types',     desc: 'Zonal, azonal and intrazonal soils; formation conditions from chernozem to terra rossa.' },
    unlocks: ['quiz', 'conqueror', 'speedrun', 'exam'],
    planRows: [{ cat: 'toprak', icon: '🟫', count: 10, tr: 'Toprak', en: 'Soil' }],
    recommends: ['tr.iklim_orman']
  },
  {
    id: 'tr.afet', country: 'tr', categories: ['afet'],
    icon: '⚠️', color: '#dc2626',
    tr: { title: 'Doğal Afet Bölgeleri', desc: 'Deprem, heyelan, çığ, sel, erozyon, orman yangını ve kuraklık riski taşıyan alanlar.' },
    en: { title: 'Natural Hazard Zones', desc: 'Areas at risk of earthquake, landslide, avalanche, flood, erosion, wildfire and drought.' },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam'],
    planRows: [{ cat: 'afet', icon: '⚠️', count: 12, tr: 'Afet', en: 'Hazard' }],
    recommends: ['tr.fay']
  },
  {
    id: 'tr.fay', country: 'tr', categories: ['fay'],
    icon: '💥', color: '#f97316',
    tr: { title: 'Fay Hatları & Tektonik Yapı', desc: 'KAF, DAF, Ege grabenleri, levha sınırları ve birinci derece deprem bölgeleri.' },
    en: { title: 'Faults & Tectonic Structure', desc: 'North and East Anatolian faults, Aegean grabens, plate boundaries and seismic zones.' },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam', 'layer_terrain'],
    planRows: [{ cat: 'fay', icon: '💥', count: 10, tr: 'Fay', en: 'Fault' }],
    recommends: ['tr.afet']
  },
  {
    id: 'tr.madenler', country: 'tr', categories: ['madenler'],
    icon: '⛏️', color: '#78716c',
    tr: { title: 'Madenler & Enerji Kaynakları', desc: 'Bor, krom, demir, linyit, petrol; barajlar, nükleer, jeotermal ve rüzgâr santralleri.' },
    en: { title: 'Minerals & Energy Resources', desc: 'Boron, chromium, iron, lignite, oil; dams, nuclear, geothermal and wind plants.' },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam'],
    planRows: [{ cat: 'madenler', icon: '⛏️', count: 15, tr: 'Maden', en: 'Mineral' }],
    recommends: ['tr.beseri']
  },
  {
    id: 'tr.sehirler', country: 'tr', categories: ['sehirler'],
    icon: '🏛️', color: '#3b82f6',
    tr: { title: 'Şehirler & 81 İl', desc: "Türkiye'nin 81 ili, resmi il sınırları, plaka kodları, coğrafi bölgeleri ve KPSS özellikleri." },
    en: { title: 'Provinces & 81 Cities', desc: "Turkey's 81 provinces, official borders, license plates, geographic regions and facts." },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam'],
    planRows: [{ cat: 'sehirler', icon: '🏛️', count: 18, tr: 'İl', en: 'City' }],
    recommends: ['tr.bolgeler', 'tr.nufus']
  },
  {
    id: 'tr.nufus', country: 'tr', categories: ['nufus'],
    icon: '👥', color: '#0ea5e9',
    tr: { title: 'Nüfus & Yerleşme', desc: 'Yoğun ve seyrek nüfuslu alanlar, göç hareketleri, kır-kent ve idari merkezler.' },
    en: { title: 'Population & Settlement', desc: 'Densely and sparsely populated areas, migration, rural-urban and administrative centers.' },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam'],
    planRows: [{ cat: 'nufus', icon: '👥', count: 12, tr: 'Nüfus', en: 'Pop.' }],
    recommends: ['tr.bolgeler']
  },
  {
    id: 'tr.bolgeler', country: 'tr', categories: ['bolgeler'],
    icon: '🗺️', color: '#10b981',
    tr: { title: 'Coğrafi Bölgeler & Bölümler', desc: '7 coğrafi bölge ve 21 coğrafi bölüm; sınırları, genel özellikleri ve kalkınma projeleri.' },
    en: { title: 'Regions & Subregions', desc: '7 geographic regions and 21 subregions; boundaries, traits and development projects.' },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam'],
    planRows: [{ cat: 'bolgeler', icon: '🗺️', count: 14, tr: 'Bölge', en: 'Region' }],
    recommends: ['tr.sehirler']
  },
  {
    id: 'tr.kiyilar', country: 'tr', categories: ['kiyilar'],
    icon: '🏖️', color: '#0ea5e9',
    tr: { title: 'Kıyılar, Adalar & Denizler', desc: 'Boyuna, enine, dalmaçya, ria ve limanlı kıyı tipleri; adalar, körfezler ve denizlerimiz.' },
    en: { title: 'Coasts, Islands & Seas', desc: 'Longitudinal, transverse, Dalmatian, ria and liman coast types; islands and gulfs.' },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam'],
    planRows: [{ cat: 'kiyilar', icon: '🏖️', count: 12, tr: 'Kıyı', en: 'Coast' }],
    recommends: ['tr.sular']
  },
  {
    id: 'tr.dis_kuvvetler', country: 'tr', categories: ['dis_kuvvetler'],
    icon: '🌬️', color: '#8b5cf6',
    tr: { title: 'Dış Kuvvetler & Yer Şekilleri', desc: 'Karstik, buzul, rüzgâr, dalga-akıntı ve peri bacaları gibi aşınım ve birikim şekilleri.' },
    en: { title: 'Exogenic Landforms', desc: 'Karstic, glacial, aeolian, coastal and fairy chimney erosional/depositional landforms.' },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam'],
    planRows: [{ cat: 'dis_kuvvetler', icon: '🌬️', count: 14, tr: 'Şekil', en: 'Landform' }],
    recommends: ['tr.daglar']
  },
  {
    id: 'tr.turizm', country: 'tr', categories: ['turizm'],
    icon: '🏛️', color: '#eab308',
    tr: { title: 'Turizm & Kültür Mirası', desc: 'UNESCO alanları, antik kentler, kış ve termal merkezler, kıyı turizmi.' },
    en: { title: 'Tourism & Cultural Heritage', desc: 'UNESCO sites, ancient cities, ski and thermal resorts, coastal tourism.' },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam', 'layer_satellite'],
    planRows: [{ cat: 'turizm', icon: '🏛️', count: 15, tr: 'Turizm', en: 'Tourism' }],
    recommends: []
  },
  {
    id: 'tr.ulasim', country: 'tr', categories: ['ulasim'],
    icon: '🚢', color: '#3b82f6',
    tr: { title: 'Ulaşım & Ticaret Koridorları', desc: 'Limanlar, havalimanları, köprüler, tüneller, boru hatları ve Türk Boğazları.' },
    en: { title: 'Transport & Trade Corridors', desc: 'Ports, airports, bridges, tunnels, pipelines and the Turkish Straits.' },
    unlocks: ['quiz', 'geoguessr', 'conqueror', 'speedrun', 'exam'],
    planRows: [{ cat: 'ulasim', icon: '🚢', count: 12, tr: 'Ulaşım', en: 'Transport' }],
    recommends: ['tr.gecitler']
  },
  {
    id: 'tr.mutlak_konum', country: 'tr', categories: [], virtual: true,
    icon: '📐', color: '#38bdf8',
    tr: { title: 'Matematiksel Konum Laboratuvarı', desc: 'Güneş açısı, gölge boyu, yerel saat, gündüz süresi ve koordinat avı modülleri.' },
    en: { title: 'Absolute Location Lab', desc: 'Sun angle, shadow length, local time, daylight duration and coordinate hunting.' },
    unlocks: ['mk_sun', 'mk_temp', 'mk_daynight', 'mk_coord', 'mk_duel', 'layer_dark'],
    planRows: [],
    recommends: [],
    // Sanal paket: ayrı veri dosyası yoktur, yalnızca 5 oyun modunun kilidini açar.
    virtualCount: 81
  }
];

/** Alt tür id'leri için İngilizce etiket sözlüğü */
const SUBTYPE_EN = {
  all: 'All', volkanik: 'Volcanic Mountains', kivrim: 'Fold Mountains', kirik: 'Fault Mountains (Horst)',
  delta: 'Delta Plains', karstik: 'Karstic Plains (Polje)', tektonik: 'Tectonic Plains', volkanik_ova: 'Volcanic Plains',
  tabaka: 'Strata Plateaus', volkanik_plato: 'Volcanic (Lava) Plateaus', karstik_plato: 'Karstic Plateaus',
  asinim: 'Erosion (Peneplain) Plateaus', akarsular: 'Rivers', goller: 'Lakes', tektonik_gol: 'Tectonic Lakes',
  karstik_gol: 'Karstic Lakes', volkanik_gol: 'Volcanic & Crater Lakes', heyelan_gol: 'Landslide Barrier Lakes',
  kiyi_aluvyal_gol: 'Lagoon & Alluvial Lakes', buzul_gol: 'Glacial (Cirque) Lakes',
  karadeniz: 'Black Sea Passes', akdeniz: 'Mediterranean Passes', bogazlar: 'Sea Straits',
  endustri: 'Industrial & Oil Crops', meyve: 'Fruit Growing', tahil: 'Grains & Legumes', ihrac: 'Export Crops',
  buyukbas: 'Cattle (Pasture)', kucukbas: 'Sheep & Goat', diger_hayvan: 'Beekeeping, Poultry & Silk',
  demir_celik: 'Iron & Steel', rafineri: 'Refinery & Petrochemical', imalat: 'Automotive, Textile & Manufacturing',
  kusaklar: 'Climate Belts', uc_degerler: 'Extremes & Records', mikroklima: 'Microclimates',
  nemli: 'Humid Forests', igne: 'Coniferous Forests', cali: 'Shrubland (Maquis)', ot: 'Grassland (Steppe / Alpine)',
  milli_park: 'National Parks', akarsu_delta: 'River to Delta', dag_gecit: 'Mountain to Pass',
  hayvan_bolge: 'Livestock to Region', point: 'Points', polyline: 'Lines', polygon: 'Areas'
};

// ---------------------------------------------------------------------------
// 3. ZENGİNLEŞTİRME: sub / formation / tier
// ---------------------------------------------------------------------------

/** Bir öğenin uyduğu tüm alt tür id'lerini (dilden bağımsız) hesaplar */
function computeSubs(item, catKey) {
  const defs = SUB_TYPES[catKey] || [];
  const subs = [];
  defs.forEach(def => {
    if (def.id === 'all' || typeof def.filter !== 'function') return;
    try { if (def.filter(item)) subs.push(def.id); } catch (e) { /* yoksay */ }
  });
  return subs;
}

/** olusum_quiz.js ile birebir aynı sınıflandırma (yalnızca tek sınıfa oturuyorsa) */
function computeFormation(item, catKey) {
  const grupKey = Object.keys(OLUSUM_TAKSONOMISI)
    .find(g => (OLUSUM_TAKSONOMISI[g].kaynak || g) === catKey);
  if (!grupKey) return null;
  const grup = OLUSUM_TAKSONOMISI[grupKey];
  if (typeof grup.onFiltre === 'function' && !grup.onFiltre(item)) return null;
  const t = trLower(item.type);
  const uyanlar = grup.siniflar.filter(s => s.test(t));
  return uyanlar.length === 1 ? uyanlar[0].key : null;
}

/** "en yüksek / ilk / tek / rekor" gibi sınav-kritik ifadeler kademeyi yukarı çeker */
const SUPERLATIVES = [
  'en yuksek', 'en buyuk', 'en uzun', 'en derin', 'en genis', 'en kalabalik', 'en verimli',
  'en fazla', 'en onemli', 'en bilinen', 'en yogun', 'en sicak', 'en soguk', 'en yagisli',
  'ilk ', 'tek ', 'rekor', 'birinci', 'dunya', 'turkiye nin en'
];

function coreScore(item, indexInCat, catSize) {
  const hay = trLower((item.kpssNot || '') + ' ' + (item.name || ''));
  let score = 0;
  SUPERLATIVES.forEach(s => { if (hay.includes(s)) score += 12; });
  // Dosyadaki sıralama zaten kabaca önem sırasıdır: baştakiler öne çıksın
  score += Math.round(((catSize - indexInCat) / Math.max(catSize, 1)) * 10);
  return score;
}

/**
 * Kademe ataması. Kategori bazında yapılır ve üç güvence içerir:
 *   1) Kategori başına tier 1 en az MIN_CORE öğe içerir (çeldirici havuzu).
 *   2) Her alt türden en az 1 öğe tier 1'e girer (boş filtre rozeti olmasın).
 *   3) Her oluşum sınıfından en az 3 öğe tier 1'e girer (boyama/oluşum oyunu
 *      bir sınıfı ancak >= 3 örnekle hedef seçebiliyor).
 */
const TIER_RATIO = { 1: 0.35, 2: 0.30 };
const MIN_CORE = 6;

function assignTiers(items, catKey) {
  const size = items.length;
  const scored = items.map((it, i) => ({ it, i, s: coreScore(it, i, size) }));
  const byScore = scored.slice().sort((a, b) => b.s - a.s || a.i - b.i);

  const coreTarget = Math.min(size, Math.max(MIN_CORE, Math.round(size * TIER_RATIO[1])));
  const midTarget = Math.max(0, Math.min(size - coreTarget, Math.round(size * TIER_RATIO[2])));

  const tier = new Map();
  byScore.slice(0, coreTarget).forEach(x => tier.set(x.it.id, 1));
  byScore.slice(coreTarget, coreTarget + midTarget).forEach(x => tier.set(x.it.id, 2));
  byScore.slice(coreTarget + midTarget).forEach(x => tier.set(x.it.id, 3));

  // Güvence 2: her alt tür tier 1'de temsil edilsin
  (SUB_TYPES[catKey] || []).forEach(def => {
    if (def.id === 'all' || typeof def.filter !== 'function') return;
    const uyan = scored.filter(x => { try { return def.filter(x.it); } catch (e) { return false; } });
    if (!uyan.length || uyan.some(x => tier.get(x.it.id) === 1)) return;
    const best = uyan.slice().sort((a, b) => b.s - a.s || a.i - b.i)[0];
    tier.set(best.it.id, 1);
  });

  // Güvence 3: oluşum sınıfları tier 1'de en az 3 örnekle temsil edilsin
  const byFormation = {};
  scored.forEach(x => {
    const f = computeFormation(x.it, catKey);
    if (f) (byFormation[f] || (byFormation[f] = [])).push(x);
  });
  Object.values(byFormation).forEach(grup => {
    if (grup.filter(x => tier.get(x.it.id) === 1).length >= 2) return;
    grup.slice().sort((a, b) => b.s - a.s || a.i - b.i)
        .slice(0, 2)
        .forEach(x => tier.set(x.it.id, 1));
  });

  // Güvence 4: eşleştirme türlerinin her biri tier 1'de en az 3 çift bulundursun
  const byMatch = {};
  scored.forEach(x => {
    if (x.it.matchType) (byMatch[x.it.matchType] || (byMatch[x.it.matchType] = [])).push(x);
  });
  Object.values(byMatch).forEach(grup => {
    if (grup.filter(x => tier.get(x.it.id) === 1).length >= 3) return;
    grup.slice().sort((a, b) => b.s - a.s || a.i - b.i)
        .slice(0, 3)
        .forEach(x => tier.set(x.it.id, 1));
  });

  return tier;
}

// ---------------------------------------------------------------------------
// 4. ÖĞE DÖNÜŞÜMÜ
// ---------------------------------------------------------------------------
function toPackItem(item, catKey, tier) {
  const shape = item.shapeType || 'point';
  const geom = { t: shape, lat: item.lat, lng: item.lng };
  if (shape !== 'point' && Array.isArray(item.coordinates)) geom.c = item.coordinates;

  const out = { id: item.id, cat: catKey, tier, geom };

  const subs = computeSubs(item, catKey);
  if (subs.length) out.sub = subs;

  const formation = item.olusumKey || computeFormation(item, catKey);
  if (formation) out.formation = formation;

  NEUTRAL_FIELDS.forEach(f => { if (item[f] !== undefined) out[f] = item[f]; });

  const tr = {};
  Object.keys(I18N_FIELDS).forEach(src => {
    const v = item[src];
    if (v !== undefined && v !== null && v !== '') tr[I18N_FIELDS[src]] = v;
  });
  out.i18n = { tr };
  return out;
}

// ---------------------------------------------------------------------------
// 5. YAZIM
// ---------------------------------------------------------------------------
function writePack(def, itemsByCat) {
  const all = [];
  def.categories.forEach(cat => all.push(...(itemsByCat[cat] || [])));

  const lines = [
    '/**',
    ' * 📦 ' + def.tr.title + '  —  ' + def.id,
    ' *',
    ' * OTOMATİK ÜRETİLDİ — elle düzenlemeyin: node tools/build_packs.js',
    ' * Şema: { id, cat, tier(1-3), sub[], formation, geom, i18n: { lang: {...} } }',
    ' */',
    'GeoPacks.register(' + JSON.stringify(def.id) + ', {',
    '  version: 1,',
    '  country: ' + JSON.stringify(def.country) + ',',
    '  categories: ' + JSON.stringify(def.categories) + ',',
    '  items: ['
  ];
  all.forEach((it, i) => {
    lines.push('    ' + JSON.stringify(it) + (i === all.length - 1 ? '' : ','));
  });
  lines.push('  ]');
  lines.push('});');
  lines.push('');

  const file = 'pack.' + def.id + '.js';
  fs.writeFileSync(path.join(OUT_DIR, file), lines.join('\n'), 'utf8');
  return { file, count: all.length, items: all };
}

// ---------------------------------------------------------------------------
// 6. ANA AKIŞ
// ---------------------------------------------------------------------------
const itemsByCat = {};

Object.keys(COGRAFYA_DATA).forEach(cat => {
  const raw = COGRAFYA_DATA[cat] || [];
  const tiers = assignTiers(raw, cat);
  itemsByCat[cat] = raw.map(it => toPackItem(it, cat, tiers.get(it.id) || 3));
});

const catalogPacks = [];
let toplam = 0;

console.log('');
PACK_DEFS.forEach(def => {
  const counts = { 1: 0, 2: 0, 3: 0 };
  const bytes = { 1: 0, 2: 0, 3: 0 };
  let file = null;

  if (def.virtual) {
    counts[1] = counts[2] = counts[3] = def.virtualCount;
    bytes[1] = bytes[2] = bytes[3] = 5 * 1024;
    console.log('  ○ ' + (def.id + ' (sanal)').padEnd(30) + ' yalnızca mod kilidi açar');
  } else {
    const res = writePack(def, itemsByCat);
    file = 'data/packs/' + res.file;
    toplam += res.count;
    res.items.forEach(it => {
      for (let t = it.tier; t <= 3; t++) { counts[t]++; bytes[t] += JSON.stringify(it).length; }
    });
    console.log('  ✓ ' + res.file.padEnd(30) + String(res.count).padStart(3) + ' kayıt   ' +
                'az ' + counts[1] + ' / orta ' + counts[2] + ' / tam ' + counts[3]);
  }

  catalogPacks.push({
    id: def.id,
    country: def.country,
    group: PACK_GROUPS[def.id] || 'fiziki',
    // Önbellek kırıcı: paket dosyaları `?v=` ile istenir. Bir paketin içeriği
    // güncellendiğinde bu numarayı artırmak, CDN'deki immutable kopyayı geçersiz
    // kılar (bkz. vercel.json).
    version: 1,
    icon: def.icon,
    color: def.color,
    file: file,
    virtual: !!def.virtual,
    categories: def.categories,
    tiers: counts,
    sizeKb: {
      1: Math.max(1, Math.round(bytes[1] / 1024)),
      2: Math.max(1, Math.round(bytes[2] / 1024)),
      3: Math.max(1, Math.round(bytes[3] / 1024))
    },
    unlocks: def.unlocks,
    recommends: def.recommends,
    planRows: def.planRows,
    i18n: { tr: def.tr, en: def.en }
  });
});

// --- Kategori kayıt defteri ---
const catalogCategories = {};
CATEGORIES.forEach(c => {
  const meta = CATEGORY_META[c.id] || {};
  catalogCategories[c.id] = {
    canonical: meta.canonical || c.id,
    icon: c.icon,
    color: c.color,
    i18n: {
      tr: { title: c.title, short: c.short },
      en: meta.en || { title: c.title, short: c.short }
    }
  };
});

// --- Alt tür kayıt defteri (filtreler artık `sub` dizisi üzerinden çalışır) ---
const catalogSubTypes = {};
Object.keys(SUB_TYPES).forEach(cat => {
  if (cat === 'ozel_cizimler') return;   // kullanıcı çizimleri paket sistemine dahil değil
  catalogSubTypes[cat] = SUB_TYPES[cat].map(s => ({
    id: s.id,
    icon: s.icon,
    i18n: { tr: { label: s.label }, en: { label: SUBTYPE_EN[s.id] || s.label } }
  }));
});

const indent = (obj) => JSON.stringify(obj, null, 2).replace(/\n/g, '\n  ');

const catalogLines = [
  '/**',
  ' * 🗂️ PAKET KATALOĞU — paylaşılan kayıt defteri',
  ' *',
  ' * OTOMATİK ÜRETİLDİ — elle düzenlemeyin: node tools/build_packs.js',
  ' *',
  ' * `categories` ve `subTypes` TÜM ÜLKELERCE paylaşılır: ileride eklenecek',
  ' * Almanya paketi de dağlarını aynı `daglar` kovasına doldurur. Çalışma zamanı',
  ' * anahtarları OPAK slug kabul edilir; `canonical` alanı Faz 2 SQLite şemasının',
  ' * `categories.id` sütununa eşlenir.',
  ' */',
  'const GEO_CATALOG = {',
  '  schemaVersion: 1,',
  '  defaultLang: "tr",',
  '  langs: ["tr", "en"],',
  '  countries: {',
  '    tr: {',
  '      code: "TUR", center: [39.0, 35.0], zoom: 6, bbox: [[35.8, 25.6], [42.3, 45.0]],',
  '      i18n: { tr: { name: "Türkiye" }, en: { name: "Türkiye (Turkey)" } }',
  '    }',
  '  },',
  '  categories: ' + indent(catalogCategories) + ',',
  '  subTypes: ' + indent(catalogSubTypes) + ',',
  '  packs: ' + indent(catalogPacks),
  '};',
  ''
];
fs.writeFileSync(path.join(OUT_DIR, 'catalog.js'), catalogLines.join('\n'), 'utf8');

console.log('\n📦 ' + catalogPacks.length + ' paket, ' + toplam + ' kayıt derlendi → data/packs/\n');
