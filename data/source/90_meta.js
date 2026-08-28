/**
 * 🗂️ GENİŞLETİLMİŞ KATEGORİ & ALT TÜR TANIMLARI — Yazım Kaynağı
 *
 * Buradaki filtreler yalnızca DERLEME sırasında çalışır: `build_packs.js` her
 * kaydın hangi alt türlere uyduğunu hesaplayıp pakete DİLDEN BAĞIMSIZ `sub`
 * anahtarları olarak yazar. Çalışma zamanında Türkçe metin eşleştirmesi yapılmaz.
 *
 * DİKKAT: "intrazonal toprak" metni "zonal toprak" alt dizesini İÇERİR. Bu tür
 * tuzaklar için `includes` yerine baştan eşleşme (indexOf === 0) kullanılır.
 */
const CATEGORIES_EXT = [
  { id: "toprak",         title: "Toprak Tipleri",          short: "Toprak",  icon: "🟫", color: "#a16207" },
  { id: "afet",           title: "Doğal Afet Bölgeleri",    short: "Afet",    icon: "⚠️", color: "#dc2626" },
  { id: "fay",            title: "Fay Hatları & Tektonik",  short: "Fay",     icon: "💥", color: "#f97316" },
  { id: "madenler",       title: "Madenler & Enerji",       short: "Maden",   icon: "⛏️", color: "#78716c" },
  { id: "maden_bolgeleri", title: "Madenler Bölge Haritası", short: "Maden Bölge", icon: "⛏️", color: "#d97706" },
  { id: "enerji_bolgeleri", title: "Enerji Kaynakları Bölge Haritası", short: "Enerji Bölge", icon: "⚡", color: "#f59e0b" },
  { id: "nufus",          title: "Nüfus & Yerleşme",        short: "Nüfus",   icon: "👥", color: "#0ea5e9" },
  { id: "bolgeler",       title: "Bölgeler & Bölümler",     short: "Bölge",   icon: "🗺️", color: "#7c3aed" },
  { id: "kiyilar",        title: "Kıyılar, Adalar & Denizler", short: "Kıyı", icon: "🏖️", color: "#06b6d4" },
  { id: "dis_kuvvetler",  title: "Dış Kuvvetler & Şekiller", short: "Dış Kuv.", icon: "🌬️", color: "#14b8a6" },
  { id: "turizm",         title: "Turizm & Kültür Mirası",  short: "Turizm",  icon: "🏛️", color: "#eab308" },
  { id: "ulasim",         title: "Ulaşım & Ticaret",        short: "Ulaşım",  icon: "🚢", color: "#3b82f6" },
  { id: "sehirler",       title: "Şehirler (81 İl)",        short: "İller",   icon: "🏛️", color: "#3b82f6" }
];

/** Bir metnin BAŞTAN eşleşmesi (alt dize tuzaklarına karşı) */
function bas(item, onek) {
  return trLower(item.type).indexOf(onek) === 0;
}
/** Bir metnin herhangi bir yerinde geçmesi */
function ic(item, parca) {
  return trLower(item.type).includes(parca);
}

const SUB_TYPES_EXT = {
  toprak: [
    { id: "all",         label: "Tüm Toprak Tipleri",     icon: "🟫" },
    { id: "zonal",       label: "Zonal (İklim) Toprakları", icon: "🌡️", filter: (i) => bas(i, "zonal toprak") },
    { id: "azonal",      label: "Azonal (Taşınmış)",      icon: "🌊", filter: (i) => bas(i, "azonal toprak") },
    { id: "intrazonal",  label: "İntrazonal (Yerel)",     icon: "🧂", filter: (i) => bas(i, "intrazonal toprak") }
  ],
  afet: [
    { id: "all",         label: "Tüm Afet Bölgeleri",     icon: "⚠️" },
    { id: "deprem",      label: "Deprem Riski",           icon: "🏚️", filter: (i) => ic(i, "deprem") },
    { id: "kutle",       label: "Heyelan & Çığ",          icon: "⛰️", filter: (i) => ic(i, "kutle hareketi") },
    { id: "su_afet",     label: "Sel & Taşkın",           icon: "🌊", filter: (i) => ic(i, "su kaynakli") },
    { id: "erozyon",     label: "Erozyon & Obruk",        icon: "🕳️", filter: (i) => ic(i, "erozyon") || ic(i, "obruk") },
    { id: "yangin",      label: "Orman Yangını",          icon: "🔥", filter: (i) => ic(i, "yangin") },
    { id: "kuraklik",    label: "Kuraklık & Don",         icon: "🏜️", filter: (i) => ic(i, "kuraklik") || ic(i, "don") }
  ],
  fay: [
    { id: "all",         label: "Tüm Tektonik Yapılar",   icon: "💥" },
    { id: "fay_hatti",   label: "Fay Hatları",            icon: "⚡", filter: (i) => ic(i, "fay hatti") || ic(i, "fay sistemi") },
    { id: "graben",      label: "Grabenler (Çöküntüler)", icon: "🕳️", filter: (i) => ic(i, "graben") },
    { id: "levha",       label: "Levhalar",               icon: "🌍", filter: (i) => ic(i, "levha") },
    { id: "deprem_bolge", label: "Deprem Bölgeleri",      icon: "🏚️", filter: (i) => ic(i, "deprem bolgesi") }
  ],
  madenler: [
    { id: "all",         label: "Tüm Maden & Enerji",     icon: "⛏️" },
    { id: "metal",       label: "Metalik Madenler",       icon: "🔩", filter: (i) => ic(i, "metalik maden") },
    { id: "enerji_ham",  label: "Enerji Hammaddeleri",    icon: "🛢️", filter: (i) => ic(i, "enerji hammaddesi") },
    { id: "endustriyel", label: "Endüstriyel Hammadde",   icon: "🧱", filter: (i) => ic(i, "endustriyel hammadde") },
    { id: "enerji_tesis", label: "Enerji Santralleri",    icon: "⚡", filter: (i) => ic(i, "enerji tesisi") }
  ],
  maden_bolgeleri: [
    { id: "all",         label: "Tüm Maden Havzaları",    icon: "⛏️" },
    { id: "metal",       label: "Metalik Maden Kuşakları", icon: "🔩", filter: (i) => ic(i, "metalik maden") },
    { id: "endustriyel", label: "Endüstriyel Hammaddeler", icon: "🧱", filter: (i) => ic(i, "endustriyel hammadde") },
    { id: "enerji_ham",  label: "Enerji & Fosil Yakıtlar", icon: "🛢️", filter: (i) => ic(i, "enerji hammaddesi") },
    { id: "kiymetli",    label: "Kıymetli Maden & Taşlar", icon: "💎", filter: (i) => ic(i, "kiymetli maden") || ic(i, "yoresel el sanatlari") }
  ],
  enerji_bolgeleri: [
    { id: "all",           label: "Tüm Enerji Havzaları",    icon: "⚡" },
    { id: "fosil_yakit",   label: "Fosil Yakıtlar & Termik", icon: "🔥", filter: (i) => ic(i, "fosil") || ic(i, "komur") || ic(i, "linyit") || ic(i, "petrol") || ic(i, "dogal gaz") || ic(i, "asfaltit") },
    { id: "yenilenebilir", label: "Yenilenebilir Enerji (HES/RES/GES/JES)", icon: "🌱", filter: (i) => ic(i, "yenilenebilir") || ic(i, "hidroelektrik") || ic(i, "ruzgar") || ic(i, "gunes") || ic(i, "jeotermal") || ic(i, "biyoenerji") },
    { id: "nukleer",       label: "Nükleer Enerji & Yakıt",  icon: "⚛️", filter: (i) => ic(i, "nukleer") || ic(i, "uranyum") || ic(i, "toryum") }
  ],
  nufus: [
    { id: "all",         label: "Tüm Nüfus Konuları",     icon: "👥" },
    { id: "yogun",       label: "Yoğun Nüfus Alanları",   icon: "🏙️", filter: (i) => ic(i, "yogun nufus") },
    { id: "seyrek",      label: "Seyrek Nüfus Alanları",  icon: "🏔️", filter: (i) => ic(i, "seyrek nufus") },
    { id: "goc",         label: "Göç Hareketleri",        icon: "🧳", filter: (i) => bas(i, "goc /") },
    { id: "yerlesme",    label: "Yerleşme Dokusu",        icon: "🏘️", filter: (i) => bas(i, "yerlesme /") }
  ],
  bolgeler: [
    { id: "all",                label: "Tüm Bölge Konuları",         icon: "🗺️" },
    { id: "ana_bolge",          label: "7 Bölge & 21 Bölüm",         icon: "🌐", filter: (i) => ic(i, "cografi bolge") || ic(i, "cografi bolum") },
    { id: "dogal_sekilsel",     label: "Doğal (Fiziki) Şekilsel",    icon: "⛰️", filter: (i) => ic(i, "dogal sekilsel") || ic(i, "daglik") || ic(i, "ovalik") || ic(i, "karstik plato") || ic(i, "volkanik") || ic(i, "iklim bolgesi") || ic(i, "bitki ortusu") || ic(i, "toprak bolgesi") || ic(i, "afet bolgesi") },
    { id: "beseri_sekilsel",    label: "Beşeri & Ekonomik Şekilsel", icon: "👥", filter: (i) => ic(i, "beseri sekilsel") || ic(i, "nufus bolgesi") || ic(i, "yerlesme bolgesi") || ic(i, "tarim bolgesi") || ic(i, "sanayi bolgesi") || ic(i, "madencilik bolgesi") },
    { id: "islevsel_yonetim",   label: "İşlevsel Yönetim & Hizmet",  icon: "🏛️", filter: (i) => ic(i, "islevsel yonetim") || ic(i, "islevsel hizmet") || ic(i, "islevsel istatistik") },
    { id: "kalkinma_projeleri", label: "Kalkınma Projeleri",         icon: "🏗️", filter: (i) => ic(i, "kalkinma projesi") || ic(i, "plan-proje") || ic(i, "gap") || ic(i, "dap") || ic(i, "dokap") || ic(i, "kop") || ic(i, "zbk") || ic(i, "yhgp") }
  ],
  kiyilar: [
    { id: "all",         label: "Tüm Kıyı Şekilleri",     icon: "🏖️" },
    { id: "yarimada",    label: "Yarımadalar",            icon: "🗿", filter: (i) => ic(i, "yarimada") },
    { id: "korfez",      label: "Körfezler",              icon: "🌊", filter: (i) => ic(i, "korfez") },
    { id: "burun",       label: "Burunlar (Uç Noktalar)", icon: "📌", filter: (i) => ic(i, "burun") },
    { id: "ada",         label: "Adalar",                 icon: "🏝️", filter: (i) => bas(i, "ada /") },
    { id: "kiyi_tipi",   label: "Kıyı Tipleri",           icon: "〰️", filter: (i) => ic(i, "kiyi tipi") },
    { id: "deniz",       label: "Denizler",               icon: "🌐", filter: (i) => bas(i, "deniz /") }
  ],
  dis_kuvvetler: [
    { id: "all",         label: "Tüm Dış Kuvvet Şekilleri", icon: "🌬️" },
    { id: "karstik_dk",  label: "Karstik Şekiller",       icon: "💧", filter: (i) => ic(i, "karstik sekil") },
    { id: "buzul_dk",    label: "Buzul Şekilleri",        icon: "❄️", filter: (i) => ic(i, "buzul sekli") },
    { id: "ruzgar_dk",   label: "Rüzgâr Şekilleri",       icon: "🌪️", filter: (i) => ic(i, "ruzgar") },
    { id: "akarsu_dk",   label: "Akarsu Şekilleri",       icon: "🏞️", filter: (i) => ic(i, "akarsu sekli") },
    { id: "dalga_dk",    label: "Dalga & Kıyı Şekilleri", icon: "🌊", filter: (i) => ic(i, "dalga sekli") }
  ],
  turizm: [
    { id: "all",         label: "Tüm Turizm & Kültür Mirası", icon: "🏛️" },
    { id: "unesco",      label: "UNESCO Dünya Mirası",        icon: "🏅", filter: (i) => ic(i, "unesco") },
    { id: "milli_park",  label: "Milli Parklar",              icon: "🌲", filter: (i) => ic(i, "milli park") },
    { id: "inanc_tur",   label: "İnanç Turizmi & Mabetler",   icon: "🕊️", filter: (i) => ic(i, "inanc") || ic(i, "cami") || ic(i, "kilise") || ic(i, "manastir") || ic(i, "turbe") },
    { id: "cittaslow",   label: "Sakin Şehirler (Cittaslow)", icon: "🐌", filter: (i) => ic(i, "cittaslow") || ic(i, "sakin sehir") },
    { id: "tarihi",      label: "Tarihî & Antik Kentler",     icon: "🏺", filter: (i) => ic(i, "tarih") || ic(i, "kulturel") || ic(i, "antik") || ic(i, "saray") || ic(i, "hoyuk") },
    { id: "kis_tur",     label: "Kış Turizmi & Kayak",        icon: "⛷️", filter: (i) => ic(i, "kis turizmi") || ic(i, "kayak") },
    { id: "termal_tur",  label: "Termal & Kaplıcalar",        icon: "♨️", filter: (i) => ic(i, "termal") || ic(i, "kaplica") },
    { id: "kiyi_doga",   label: "Kıyı, Doğa & Kanyonlar",     icon: "🏖️", filter: (i) => ic(i, "doga") || ic(i, "kiyi") || ic(i, "lagun") || ic(i, "maar") || ic(i, "kanyon") }
  ],
  ulasim: [
    { id: "all",           label: "Tüm Ulaşım & Ticaret",        icon: "🚢" },
    { id: "liman",         label: "Deniz Limanları & Marinalar", icon: "⚓", filter: (i) => ic(i, "liman") },
    { id: "gecit_tunel",   label: "Geçitler & Tüneller",         icon: "🌉", filter: (i) => ic(i, "gecit") || ic(i, "tunel") || ic(i, "bogaz") || ic(i, "kopru") },
    { id: "sinir_kapisi",  label: "Sınır Kapıları & Gümrük",     icon: "🚪", filter: (i) => ic(i, "sinir kapisi") || ic(i, "istasyon") },
    { id: "demir_yolu",    label: "Demiryolları & Tren Hatları", icon: "🚆", filter: (i) => ic(i, "demiryolu") || ic(i, "tren") || ic(i, "marmaray") },
    { id: "otoyol",        label: "Otoyollar & Karayolu Aksları",icon: "🛣️", filter: (i) => ic(i, "otoyol") || ic(i, "karayolu") },
    { id: "serbest_bolge", label: "Serbest Ticaret Bölgeleri",   icon: "💼", filter: (i) => ic(i, "ticaret") || ic(i, "serbest bolge") },
    { id: "havalimani",    label: "Havalimanları",               icon: "✈️", filter: (i) => ic(i, "havalimani") },
    { id: "boru_hatti",    label: "Boru Hatları & Enerji",       icon: "🛢️", filter: (i) => ic(i, "boru hatti") || ic(i, "terminal") }
  ],
  sehirler: [
    { id: "all",         label: "Tüm İller (81)",         icon: "🌍" },
    { id: "marmara",     label: "Marmara (11)",           icon: "🏙️", filter: (i) => i.region === "Marmara" },
    { id: "ege",         label: "Ege (8)",                icon: "🏖️", filter: (i) => i.region === "Ege" },
    { id: "akdeniz_bolge", label: "Akdeniz (8)",          icon: "☀️", filter: (i) => i.region === "Akdeniz" },
    { id: "icanadolu",   label: "İç Anadolu (13)",        icon: "🌾", filter: (i) => i.region === "İç Anadolu" },
    { id: "karadeniz_bolge", label: "Karadeniz (18)",     icon: "🌲", filter: (i) => i.region === "Karadeniz" },
    { id: "doguanadolu", label: "Doğu Anadolu (14)",      icon: "🏔️", filter: (i) => i.region === "Doğu Anadolu" },
    { id: "guneydogu",   label: "Güneydoğu (9)",          icon: "🏛️", filter: (i) => i.region === "Güneydoğu Anadolu" }
  ],
  sanayi: [
    { id: "all",            label: "Tüm Sanayi Kolları (7 Sektör)", icon: "🏭" },
    { id: "gida",           label: "Besin (Gıda) Sanayisi",        icon: "🍞", filter: (i) => ic(i, "gida") || ic(i, "seker") || ic(i, "cay") || ic(i, "et") || ic(i, "sut") || ic(i, "konserve") || ic(i, "un") || ic(i, "yag") },
    { id: "tekstil_deri",   label: "Dokuma, Deri & Giyim",         icon: "👕", filter: (i) => ic(i, "dokuma") || ic(i, "deri") || ic(i, "giyim") || ic(i, "hali") || ic(i, "ipek") || ic(i, "tekstil") },
    { id: "metalurji",      label: "Maden Sanayisi (Metalurji)",   icon: "🔩", filter: (i) => ic(i, "metalurji") || ic(i, "demir-celik") || ic(i, "ferrokrom") || ic(i, "aluminyum") || ic(i, "bakir") || ic(i, "kursun") || ic(i, "cinko") },
    { id: "otomotiv_ulasim", label: "Makine, Otomotiv & Araçlar",  icon: "🚗", filter: (i) => ic(i, "otomotiv") || ic(i, "traktor") || ic(i, "ulasim araclari") || ic(i, "havacilik") || ic(i, "denizcilik") || ic(i, "vagon") || ic(i, "lokomotif") || ic(i, "tersane") || ic(i, "yat") },
    { id: "kimya",          label: "Kimya Endüstrisi & Rafineri",  icon: "🧪", filter: (i) => ic(i, "kimya") || ic(i, "petrol") || ic(i, "rafineri") || ic(i, "gubre") || ic(i, "ilac") },
    { id: "orman",          label: "Orman Ürünleri & Mobilya",     icon: "🪵", filter: (i) => ic(i, "orman") || ic(i, "kagit") || ic(i, "mobilya") || ic(i, "agac") || ic(i, "kereste") || ic(i, "sunta") },
    { id: "tasa_topraga",   label: "Taşa Toprağa Dayalı Sanayi",   icon: "🧱", filter: (i) => ic(i, "toprak") || ic(i, "cam") || ic(i, "tugla") || ic(i, "kiremit") || ic(i, "seramik") || ic(i, "porselen") || ic(i, "cimento") }
  ]
};
