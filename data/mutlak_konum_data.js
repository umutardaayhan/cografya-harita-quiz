/**
 * 📐 MUTLAK (MATEMATİKSEL) KONUM VERİ SETİ
 *
 * Oyun modları bu veriden TÜRETİLMİŞ değerlerle çalışır (güneş açısı, gölge boyu,
 * gündüz süresi, indirgenmiş sıcaklık farkı, çizgisel hız). Hiçbir sonuç elle
 * yazılmaz; hepsi lat/lng/rakım üzerinden hesaplanır.
 *
 * Not: Rakımlar il MERKEZİNİN yaklaşık yükseltisidir (KPSS kaynaklarında kullanılan
 * yuvarlanmış değerler). Koordinatlar il merkezi içindir.
 */

const TR_CITIES = [
  { id: "c_adana",      name: "Adana",           lat: 37.00, lng: 35.32, alt: 23,   region: "Akdeniz" },
  { id: "c_adiyaman",   name: "Adıyaman",        lat: 37.76, lng: 38.28, alt: 672,  region: "Güneydoğu Anadolu" },
  { id: "c_afyon",      name: "Afyonkarahisar",  lat: 38.76, lng: 30.54, alt: 1021, region: "Ege" },
  { id: "c_agri",       name: "Ağrı",            lat: 39.72, lng: 43.05, alt: 1640, region: "Doğu Anadolu" },
  { id: "c_ankara",     name: "Ankara",          lat: 39.93, lng: 32.86, alt: 890,  region: "İç Anadolu" },
  { id: "c_antalya",    name: "Antalya",         lat: 36.89, lng: 30.71, alt: 30,   region: "Akdeniz" },
  { id: "c_ardahan",    name: "Ardahan",         lat: 41.11, lng: 42.70, alt: 1800, region: "Doğu Anadolu" },
  { id: "c_artvin",     name: "Artvin",          lat: 41.18, lng: 41.82, alt: 550,  region: "Karadeniz" },
  { id: "c_aydin",      name: "Aydın",           lat: 37.85, lng: 27.84, alt: 60,   region: "Ege" },
  { id: "c_balikesir",  name: "Balıkesir",       lat: 39.65, lng: 27.89, alt: 100,  region: "Marmara" },
  { id: "c_bitlis",     name: "Bitlis",          lat: 38.40, lng: 42.11, alt: 1545, region: "Doğu Anadolu" },
  { id: "c_bolu",       name: "Bolu",            lat: 40.74, lng: 31.61, alt: 725,  region: "Karadeniz" },
  { id: "c_burdur",     name: "Burdur",          lat: 37.72, lng: 30.29, alt: 950,  region: "Akdeniz" },
  { id: "c_bursa",      name: "Bursa",           lat: 40.19, lng: 29.06, alt: 100,  region: "Marmara" },
  { id: "c_canakkale",  name: "Çanakkale",       lat: 40.15, lng: 26.41, alt: 3,    region: "Marmara" },
  { id: "c_diyarbakir", name: "Diyarbakır",      lat: 37.91, lng: 40.24, alt: 660,  region: "Güneydoğu Anadolu" },
  { id: "c_edirne",     name: "Edirne",          lat: 41.68, lng: 26.56, alt: 41,   region: "Marmara" },
  { id: "c_elazig",     name: "Elazığ",          lat: 38.68, lng: 39.22, alt: 1067, region: "Doğu Anadolu" },
  { id: "c_erzincan",   name: "Erzincan",        lat: 39.75, lng: 39.49, alt: 1185, region: "Doğu Anadolu" },
  { id: "c_erzurum",    name: "Erzurum",         lat: 39.91, lng: 41.28, alt: 1890, region: "Doğu Anadolu" },
  { id: "c_eskisehir",  name: "Eskişehir",       lat: 39.78, lng: 30.52, alt: 800,  region: "İç Anadolu" },
  { id: "c_gaziantep",  name: "Gaziantep",       lat: 37.07, lng: 37.38, alt: 850,  region: "Güneydoğu Anadolu" },
  { id: "c_giresun",    name: "Giresun",         lat: 40.91, lng: 38.39, alt: 10,   region: "Karadeniz" },
  { id: "c_hakkari",    name: "Hakkâri",         lat: 37.57, lng: 43.74, alt: 1720, region: "Doğu Anadolu" },
  { id: "c_hatay",      name: "Hatay (Antakya)", lat: 36.20, lng: 36.16, alt: 85,   region: "Akdeniz" },
  { id: "c_igdir",      name: "Iğdır",           lat: 39.92, lng: 44.04, alt: 850,  region: "Doğu Anadolu" },
  { id: "c_isparta",    name: "Isparta",         lat: 37.76, lng: 30.55, alt: 1035, region: "Akdeniz" },
  { id: "c_istanbul",   name: "İstanbul",        lat: 41.01, lng: 28.98, alt: 40,   region: "Marmara" },
  { id: "c_izmir",      name: "İzmir",           lat: 38.42, lng: 27.14, alt: 25,   region: "Ege" },
  { id: "c_kars",       name: "Kars",            lat: 40.60, lng: 43.10, alt: 1750, region: "Doğu Anadolu" },
  { id: "c_kastamonu",  name: "Kastamonu",       lat: 41.38, lng: 33.78, alt: 775,  region: "Karadeniz" },
  { id: "c_kayseri",    name: "Kayseri",         lat: 38.73, lng: 35.49, alt: 1050, region: "İç Anadolu" },
  { id: "c_konya",      name: "Konya",           lat: 37.87, lng: 32.48, alt: 1030, region: "İç Anadolu" },
  { id: "c_malatya",    name: "Malatya",         lat: 38.35, lng: 38.31, alt: 950,  region: "Doğu Anadolu" },
  { id: "c_mersin",     name: "Mersin",          lat: 36.81, lng: 34.63, alt: 10,   region: "Akdeniz" },
  { id: "c_mugla",      name: "Muğla",           lat: 37.22, lng: 28.36, alt: 646,  region: "Ege" },
  { id: "c_mus",        name: "Muş",             lat: 38.73, lng: 41.49, alt: 1300, region: "Doğu Anadolu" },
  { id: "c_nevsehir",   name: "Nevşehir",        lat: 38.62, lng: 34.71, alt: 1250, region: "İç Anadolu" },
  { id: "c_rize",       name: "Rize",            lat: 41.02, lng: 40.52, alt: 5,    region: "Karadeniz" },
  { id: "c_samsun",     name: "Samsun",          lat: 41.29, lng: 36.33, alt: 15,   region: "Karadeniz" },
  { id: "c_sanliurfa",  name: "Şanlıurfa",       lat: 37.16, lng: 38.79, alt: 550,  region: "Güneydoğu Anadolu" },
  { id: "c_sinop",      name: "Sinop",           lat: 42.03, lng: 35.15, alt: 30,   region: "Karadeniz" },
  { id: "c_sivas",      name: "Sivas",           lat: 39.75, lng: 37.02, alt: 1285, region: "İç Anadolu" },
  { id: "c_trabzon",    name: "Trabzon",         lat: 41.00, lng: 39.72, alt: 30,   region: "Karadeniz" },
  { id: "c_van",        name: "Van",             lat: 38.49, lng: 43.38, alt: 1725, region: "Doğu Anadolu" },
  { id: "c_zonguldak",  name: "Zonguldak",       lat: 41.45, lng: 31.79, alt: 10,   region: "Karadeniz" }
];

/** Türkiye'nin 4 uç noktası (mutlak konum sınırları) */
const TR_EXTREME_POINTS = [
  {
    id: "uc_kuzey",
    name: "İnceburun",
    dir: "Kuzey",
    icon: "⬆️",
    lat: 42.10, lng: 35.15,
    place: "Sinop / Türkeli",
    coordText: "42° 06′ Kuzey",
    kpssNot: "Türkiye'nin en kuzey noktası. Gündüz süresinin 21 Haziran'da en uzun, 21 Aralık'ta en kısa olduğu; alacakaranlık (grup-tan) süresinin en fazla olduğu yerdir."
  },
  {
    id: "uc_guney",
    name: "Topraktutan (Beysun) Köyü",
    dir: "Güney",
    icon: "⬇️",
    lat: 35.85, lng: 36.15,
    place: "Hatay / Yayladağı",
    coordText: "35° 51′ Kuzey",
    kpssNot: "Türkiye'nin en güney noktası. Güneş ışınlarının en dik geldiği, öğle vakti gölge boyunun en kısa olduğu ve çizgisel hızın en fazla olduğu yerdir."
  },
  {
    id: "uc_bati",
    name: "Avlaka Burnu",
    dir: "Batı",
    icon: "⬅️",
    lat: 40.17, lng: 25.67,
    place: "Çanakkale / Gökçeada",
    coordText: "25° 40′ Doğu",
    kpssNot: "Türkiye'nin en batı noktası. Güneşin en geç doğup en geç battığı, yerel saati en geri olan yerdir."
  },
  {
    id: "uc_dogu",
    name: "Dilucu (Aralık)",
    dir: "Doğu",
    icon: "➡️",
    lat: 39.65, lng: 44.80,
    place: "Iğdır / Aralık",
    coordText: "44° 48′ Doğu",
    kpssNot: "Türkiye'nin en doğu noktası. Güneşin en erken doğup en erken battığı, yerel saati en ileri olan yerdir. Batı ucu ile arasında 76 dakikalık yerel saat farkı vardır."
  }
];

/** Türkiye'nin ortak saati bu meridyene göre ayarlanır (UTC+3) */
const TR_MERIDIAN_UTC3 = 45;
