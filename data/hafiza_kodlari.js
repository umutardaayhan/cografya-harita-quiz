/**
 * 🧠 HAFIZA KODLARI (MNEMONIC) VERİ KATMANI
 *
 * Bu dosya coğrafya müfredatının "hikâyeye çevrilmiş" halidir. Paket (DLC)
 * sisteminden BAĞIMSIZDIR: hiçbir paket kurulmasa da Hafıza Kodu Atölyesi
 * çalışır. Sebebi basit — kodlar coğrafi kaydın kendisi değil, o kayda giden
 * hafıza yoludur; kilitlenmeleri anlamsız olurdu.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * HİKÂYE SÖZDİZİMİ:  [[imge|gerçek]]
 *
 *   "Sahnede [[sakar bir fil|Sakarya + Filyos]] vardır."
 *          imge = hafızadaki çengel      gerçek = coğrafi karşılık
 *
 * Motor tek bir hikâye metninden BÜTÜN soru tiplerini türetir:
 *   • eşleştirme  → imge ↔ gerçek kartları
 *   • boşluk      → hikâyenin içinden imge ya da gerçek silinir
 *   • ters kod    → gerçekten imgeye geri dönüş
 * Yani yeni bir kod eklemek için tek yapılacak iş hikâyeyi yazmaktır;
 * soruların hepsi kendiliğinden oluşur.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ALANLAR
 *   id        : benzersiz anahtar (ustalık kaydı bununla tutulur)
 *   bolum     : HAFIZA_BOLUMLERI anahtarı
 *   baslik    : kodun adı (kullanıcının hatırladığı tekerleme)
 *   konu      : kodun neyi öğrettiği (galeri alt başlığı)
 *   hikaye    : [[imge|gerçek]] işaretli metin
 *   puf       : sınavda işe yarayan çıplak bilgi (geri bildirim panelinde)
 *   cevap     : "ters kod" turunun doğru cevabı
 *   soru      : "ters kod" turunun soru kökü
 *   yerler    : haritada gösterilecek noktalar [{ad, lat, lng}]
 *   sira      : {baslik, yon, ogeler[]} — "hikâye zinciri" turu
 *   siraNot   : tekerleme sırası gerçek coğrafi sıradan ayrılıyorsa uyarı
 *   uyeler    : koda ait liste — "kaçak yakala" turunun doğru üyeleri
 *   kacaklar  : listeye ait GÖRÜNEN ama olmayan çeldiriciler
 *   cizim     : haritaya harf çizen kodlar {etiket, izler:[{ad,renk,nokta[]}]}
 */

const HAFIZA_BOLUMLERI = [
  { key: 'jeoloji',    ad: 'Jeolojik Zamanlar & Masif Araziler',     kisa: 'Jeolojik Zaman', ikon: '🪨', renk: '#b45309' },
  { key: 'orojenez',   ad: 'Orojenez, Kıvrım & Kırık Sistemleri',    kisa: 'Orojenez',       ikon: '⛰️', renk: '#ea580c' },
  { key: 'volkanizma', ad: 'Volkanizma Şekilleri & Volkanik Dağlar', kisa: 'Volkanizma',     ikon: '🌋', renk: '#dc2626' },
  { key: 'akarsular',  ad: 'Akarsular, Havzalar & Sınır Nehirleri',  kisa: 'Akarsular',      ikon: '🌊', renk: '#0284c7' },
  { key: 'goller',     ad: 'Göller & Oluşum Türleri',                kisa: 'Göller',         ikon: '💧', renk: '#0891b2' },
  { key: 'toprak',     ad: 'Topraklar & Bitki Örtüsü',               kisa: 'Toprak & Bitki', ikon: '🌱', renk: '#16a34a' },
  { key: 'madenler',   ad: 'Madenler & Enerji Kaynakları',           kisa: 'Madenler',       ikon: '⛏️', renk: '#7c3aed' },
  { key: 'gecitler',   ad: 'Geçitler, Sınır Kapıları & Körfezler',   kisa: 'Geçit & Kapı',   ikon: '🚪', renk: '#db2777' }
];

const HAFIZA_KODLARI = [

  /* ══════════════════════════════════════════════════════════════════
   * 🪨 1. JEOLOJİK ZAMANLAR, MASİF ARAZİLER VE KITA HAREKETLERİ
   * ══════════════════════════════════════════════════════════════════ */

  {
    id: 'hk_prekambriyen',
    bolum: 'jeoloji',
    ikon: '🦠',
    baslik: 'Pire',
    konu: 'Prekambriyen (İlkel Zaman)',
    hikaye: 'Zamanın en dibinde küçücük bir [[pire|Prekambriyen]] zıplıyor. İşin içinde pire varsa o iş [[en eski, en ilkel iştir|İlkel Zaman — jeolojik zamanların en başı]].',
    puf: 'Pire → Prekambriyen → İLKEL ZAMAN. Sıralamada daima en başta gelir; masif (kristalen) arazilerin çekirdeği bu zamana dayanır.',
    cevap: 'Prekambriyen (İlkel Zaman)',
    soru: '“Pire” kodu hangi jeolojik zamanı saklar?'
  },

  {
    id: 'hk_paleozoyik',
    bolum: 'jeoloji',
    ikon: '🪨',
    baslik: 'Pala Ersin — taş gibi adamdı',
    konu: 'Paleozoyik (I. Jeolojik Zaman)',
    hikaye: 'Mahallede [[Pala Ersin|Paleozoyik — I. Jeolojik Zaman]] diye biri vardı; herkes onun için [[“taş gibi adamdı”|TAŞ KÖMÜRÜ yatakları bu zamanda oluştu]] derdi.',
    puf: 'Pala Ersin → Paleozoyik → I. Zaman. “Taş gibi adam” benzetmesi TAŞ KÖMÜRÜ’nü verir (Zonguldak Havzası). Linyitle karıştırma: linyit III. Zaman’dır.',
    cevap: 'Paleozoyik (I. Zaman) — Taş kömürü',
    soru: '“Pala Ersin taş gibi adamdı” kodu hangi zamanı ve hangi yeraltı kaynağını verir?',
    yerler: [{ ad: 'Zonguldak Taşkömürü Havzası', lat: 41.45, lng: 31.79 }]
  },

  {
    id: 'hk_mezozoyik',
    bolum: 'jeoloji',
    ikon: '☄️',
    baslik: 'Meteor',
    konu: 'Mezozoyik (II. Jeolojik Zaman)',
    hikaye: 'Gökten [[meteor|Mezozoyik — II. Jeolojik Zaman]] yağıyor, yerde koca koca [[dinozorlar|II. Zamanın canlıları — dinozorlar]] kaçışıyor.',
    puf: 'Meteor → Mezozoyik → II. Zaman. Dinozorların yaşadığı ve bir meteor çarpmasıyla kapandığı kabul edilen dönemdir.',
    cevap: 'Mezozoyik (II. Zaman)',
    soru: '“Meteor” kodu hangi jeolojik zamanı saklar?'
  },

  {
    id: 'hk_senozoyik',
    bolum: 'jeoloji',
    ikon: '🔢',
    baslik: '“Sen” üç harflidir',
    konu: 'Senozoyik (III. Jeolojik Zaman)',
    hikaye: 'Aynaya bakıp [[“sen”|Senozoyik]] diyorsun. “Sen” kelimesi [[üç harflidir|III. Jeolojik Zaman]].',
    puf: 'SEN = 3 harf = 3. Zaman. Senozoyik kendi içinde Tersiyer ve Kuaterner diye ikiye ayrılır.',
    cevap: 'Senozoyik (III. Zaman)',
    soru: '“Sen” kelimesinin harf sayısı hangi jeolojik zamanı verir?'
  },

  {
    id: 'hk_tersiyer',
    bolum: 'jeoloji',
    ikon: '🇹🇷',
    baslik: 'Tersiyer — Türkiye’nin doğduğu masa',
    konu: 'Tersiyer (III. Zamanın alt katmanı)',
    hikaye: '[[Tersiyer|Senozoyik’in ilk bölümü]] masasında Türkiye’nin [[ana hatları çizilir|Türkiye bugünkü görünümünü bu dönemde kazanır]]. Masanın üstünde de [[linyit, petrol, bor, tuz ve doğal gaz|Tersiyer’de oluşan yeraltı kaynakları]] durur.',
    puf: 'TERSİYER = Türkiye’nin ana hatları + LİNYİT, PETROL, BOR, TUZ, DOĞAL GAZ. Taş kömürü buraya YAZILMAZ (o I. Zaman’dır).',
    cevap: 'Tersiyer',
    soru: 'Linyit, petrol, bor, tuz ve doğal gaz hangi dönemde oluşmuştur?',
    uyeler: ['Linyit', 'Petrol', 'Bor', 'Tuz', 'Doğal gaz'],
    kacaklar: ['Taş kömürü', 'Dinozorlar', 'İnsanın ortaya çıkışı']
  },

  {
    id: 'hk_kuaterner',
    bolum: 'jeoloji',
    ikon: '🧣',
    baslik: 'Guatırlı Erler',
    konu: 'Kuaterner (IV. Zaman / Senozoyik’in son dönemi)',
    hikaye: '[[Guatırlı erler|Kuaterner — IV. Zaman]] sıraya dizilmiş. Guatır nerede olur? [[Boğazda|İstanbul ve Çanakkale Boğazları bu dönemde şekillendi]]. Sonra [[Egeit karası çöker|Ege Denizi ve adaları oluşur]], en sonunda da [[insan sahneye çıkar|İnsanın ortaya çıkışı]].',
    puf: 'Guatır → boğaz. Kuaterner: İstanbul & Çanakkale Boğazlarının oluşumu, Egeit karasının çökmesi (Ege adaları) ve İNSANIN ortaya çıkışı.',
    cevap: 'Kuaterner (IV. Zaman)',
    soru: 'İstanbul ve Çanakkale Boğazlarının oluşumu hangi döneme aittir?',
    yerler: [
      { ad: 'İstanbul Boğazı', lat: 41.12, lng: 29.06 },
      { ad: 'Çanakkale Boğazı', lat: 40.22, lng: 26.40 },
      { ad: 'Egeit karası (Ege adaları)', lat: 38.30, lng: 25.90 }
    ],
    uyeler: ['İstanbul Boğazı’nın oluşumu', 'Çanakkale Boğazı’nın oluşumu', 'Egeit karasının çökmesi', 'İnsanın ortaya çıkışı'],
    kacaklar: ['Taş kömürünün oluşumu', 'Dinozorların yok oluşu', 'Bor yataklarının oluşumu']
  },

  {
    id: 'hk_masif',
    bolum: 'jeoloji',
    ikon: '🅼',
    baslik: 'Haritaya MASİF yaz (M + A)',
    konu: 'Masif araziler — eski, sert ve yaşlı kütleler',
    hikaye: 'Masif araziler günümüzün parlak masaları değil, [[eski, sert ve yaşlı masalar|Aşınmaya dirençli, kıvrılmayan sert kütleler]]dır. Haritada bulmak için [[Yıldız Dağları’ndan|M’nin sol ayağı]] başla; [[Menderes|M’nin ikinci köşesi]], [[Alanya|M’nin dip noktası]], [[Amasya-Tokat|M’nin yükselen kolu]] üzerinden [[Bitlis-Van’a|M’nin sağ ayağı]] uzan. Sonuna [[Zonguldak-Kastamonu’yu|A harfi]] koyunca haritaya MASİF yazmış olursun.',
    puf: 'Masif = Prekambriyen–Paleozoyik kökenli sert kütle. Haritadaki M: Yıldız → Menderes → Alanya → Amasya/Tokat → Bitlis/Van. A: Zonguldak–Kastamonu.',
    cevap: 'Masif araziler',
    soru: 'Haritaya çizilen dev “M + A” harfleri hangi arazi tipini gösterir?',
    yerler: [
      { ad: 'Yıldız (Istranca) Masifi', lat: 41.85, lng: 27.50 },
      { ad: 'Menderes Masifi', lat: 38.05, lng: 28.30 },
      { ad: 'Alanya Masifi', lat: 36.55, lng: 32.00 },
      { ad: 'Amasya-Tokat Masifi', lat: 40.50, lng: 36.30 },
      { ad: 'Bitlis-Van Masifi', lat: 38.45, lng: 42.30 },
      { ad: 'Zonguldak-Kastamonu Masifi', lat: 41.45, lng: 32.70 }
    ],
    sira: {
      baslik: 'M harfini doğru sırayla çiz',
      yon: 'M’nin kalem yolu (batıdan doğuya)',
      ogeler: ['Yıldız Dağları', 'Menderes', 'Alanya', 'Amasya-Tokat', 'Bitlis-Van']
    },
    cizim: {
      etiket: 'MASİF',
      izler: [
        { ad: 'M', renk: '#f59e0b', nokta: [[41.85, 27.50], [38.05, 28.30], [36.55, 32.00], [40.50, 36.30], [38.45, 42.30]] },
        { ad: 'A', renk: '#f59e0b', nokta: [[40.90, 31.40], [41.90, 32.70], [40.90, 34.00]] },
        { ad: 'A çubuğu', renk: '#f59e0b', nokta: [[41.35, 31.95], [41.35, 33.45]] }
      ]
    }
  },

  /* ══════════════════════════════════════════════════════════════════
   * ⛰️ 2. OROJENEZ, KIVRIM VE KIRIK SİSTEMLERİ
   * ══════════════════════════════════════════════════════════════════ */

  {
    id: 'hk_orojenez',
    bolum: 'orojenez',
    ikon: '🏔️',
    baslik: 'Orada bir dağ var uzakta',
    konu: 'Orojenez = dağ oluşumu',
    hikaye: '[[“Orada bir dağ var uzakta…”|Orojenez]] diye mırıldan; o dağın adı [[OR-DAĞ|Dağ oluşumu hareketi]].',
    puf: 'OROjenez → OR-DAĞ → DAĞ oluşumu. Yatay (sıkışma) yönlü hareketlerdir; kıvrım ve kırık dağlarını doğurur.',
    cevap: 'Orojenez (dağ oluşumu)',
    soru: '“OR-DAĞ” kodu hangi yer kabuğu hareketini anlatır?'
  },

  {
    id: 'hk_epirojenez',
    bolum: 'orojenez',
    ikon: '📜',
    baslik: 'Epik şiirler kıtalardan oluşur',
    konu: 'Epirojenez = kıta oluşumu',
    hikaye: '[[Epik şiirler|Epirojenez]] okunuyor. Şiirler [[kıtalardan|KITA oluşumu hareketi]] oluşur; bu yüzden epirojenez [[alçalma ve yükselme|Kıtaların dikey (düşey) hareketi]] ile [[deniz ilerlemesi ve gerilemesi|Transgresyon ve regresyon]] demektir.',
    puf: 'EPİrojenez → EPİK şiir → şiirin KITA’sı → KITA oluşumu. Dikey hareket: yükselme (regresyon / deniz gerilemesi), alçalma (transgresyon / deniz ilerlemesi).',
    cevap: 'Epirojenez (kıta oluşumu)',
    soru: '“Epik şiirin kıtaları” kodu hangi hareketi anlatır?',
    uyeler: ['Kıtaların yükselmesi', 'Kıtaların alçalması', 'Transgresyon (deniz ilerlemesi)', 'Regresyon (deniz gerilemesi)'],
    kacaklar: ['Kıvrım dağlarının oluşumu', 'Horst ve graben oluşumu', 'Volkanik konilerin oluşumu']
  },

  {
    id: 'hk_antiklinal',
    bolum: 'orojenez',
    ikon: '〰️',
    baslik: 'Yumuşak annemiz yukarıda',
    konu: 'Antiklinal & Senklinal (kıvrım dağları)',
    hikaye: 'Arazi [[yumuşak|Kıvrılabilen arazi — kıvrım dağları]] olduğu için kırılmaz, kıvrılır. Kıvrımın üstte kalan kubbe kısmı [[“annemiz yukarıda”|Antiklinal — kubbe / yüksek kısım]], altta kalan çukur kısmı ise [[“sen aşağıdakiydin”|Senklinal — çukur / alçak kısım]]dır.',
    puf: 'ANtiklinal = ANnemiz = yukarıdaki kubbe. SENklinal = SEN = aşağıdaki çukur. Kıvrım için arazinin YUMUŞAK (esnek) olması şarttır.',
    cevap: 'Antiklinal (kubbe) ve Senklinal (çukur)',
    soru: '“Yumuşak annemiz yukarıda” kodu hangi kıvrım öğelerini ayırır?'
  },

  {
    id: 'hk_horst_graben',
    bolum: 'orojenez',
    ikon: '🐎',
    baslik: 'Horse üstte, garibanlar altta',
    konu: 'Horst & Graben (kırık dağları)',
    hikaye: 'Arazi sert olduğu için kıvrılmaz, kırılır. [[Atın (horse) üstünde|Horst — yüksekte kalan blok]] olduğun için yukarıdasın; [[garibanlar|Graben — çöken çukur blok]] ise hep altta kalır.',
    puf: 'HORST = HORSE = üstte kalan yüksek blok (kırık dağ). GRABEN = GARİBAN = altta kalan çöküntü ovası. Kırık için arazinin SERT olması şarttır.',
    cevap: 'Horst (yüksek blok) ve Graben (çöküntü)',
    soru: '“Horse üstte, garibanlar altta” kodu hangi kırık öğelerini ayırır?'
  },

  {
    id: 'hk_kirik_daglari',
    bolum: 'orojenez',
    ikon: '⚡',
    baslik: 'Kaz Madra Yunt Bozdağ… aman hocam sus',
    konu: 'Türkiye’nin kırık (horst) dağları',
    hikaye: 'Ritmi tuttur: [[Kaz|Kaz Dağı — Balıkesir/Çanakkale]], [[Madra|Madra Dağı — Balıkesir/İzmir]], [[Yunt|Yunt Dağı — Manisa]], [[Bozdağlar|Bozdağlar — İzmir/Manisa]], [[Aydın|Aydın Dağları]], [[Menteşe|Menteşe Dağları — Muğla]]… ve [[“aman hocam sus”|Amanos (Nur) Dağları — Akdeniz’in kırık dağı]] dağları.',
    puf: 'Ege’nin horstları kuzeyden güneye: Kaz – Madra – Yunt – Bozdağlar – Aydın – Menteşe. “Aman sus” ise AMANOS (Nur) Dağları’dır ve Ege’de değil AKDENİZ’dedir.',
    cevap: 'Kırık (horst) dağları',
    soru: '“Kaz, Madra, Yunt, Bozdağlar, Aydın, Menteşe” tekerlemesi hangi dağ tipini sayar?',
    yerler: [
      { ad: 'Kaz Dağı', lat: 39.70, lng: 26.90 },
      { ad: 'Madra Dağı', lat: 39.35, lng: 27.20 },
      { ad: 'Yunt Dağı', lat: 38.80, lng: 27.30 },
      { ad: 'Bozdağlar', lat: 38.35, lng: 28.10 },
      { ad: 'Aydın Dağları', lat: 37.95, lng: 27.90 },
      { ad: 'Menteşe Dağları', lat: 37.30, lng: 28.50 },
      { ad: 'Amanos (Nur) Dağları', lat: 36.85, lng: 36.30 }
    ],
    sira: {
      baslik: 'Ege horstlarını kuzeyden güneye diz',
      yon: 'Kuzeyden güneye',
      ogeler: ['Kaz Dağı', 'Madra Dağı', 'Yunt Dağı', 'Bozdağlar', 'Aydın Dağları', 'Menteşe Dağları']
    },
    uyeler: ['Kaz Dağı', 'Madra Dağı', 'Yunt Dağı', 'Bozdağlar', 'Aydın Dağları', 'Menteşe Dağları', 'Amanos (Nur) Dağları'],
    kacaklar: ['Erciyes Dağı', 'Uludağ', 'Ağrı Dağı', 'Süphan Dağı']
  },

  {
    id: 'hk_graben_ovalari',
    bolum: 'orojenez',
    ikon: '🕳️',
    baslik: 'Bakırçay Gediz Küçük-Büyük Menderes',
    konu: 'Batı Anadolu graben (çöküntü) ovaları',
    hikaye: 'Horstların arasına çöken ovaları ritimle say: [[Bakırçay|Bakırçay Grabeni — Balıkesir/İzmir]], [[Gediz|Gediz Grabeni — Manisa/İzmir]], [[Küçük Menderes|Küçük Menderes Grabeni — İzmir]], [[Büyük Menderes|Büyük Menderes Grabeni — Aydın/Denizli]].',
    puf: 'Grabenler kuzeyden güneye: Bakırçay – Gediz – Küçük Menderes – Büyük Menderes. Ege’de horst ile graben sırayla dizildiği için kıyı tipi ENİNE (dağlar kıyıya dik) olur.',
    cevap: 'Graben (çöküntü) ovaları',
    soru: '“Bakırçay, Gediz, Küçük Menderes, Büyük Menderes” dizisi hangi ova tipini verir?',
    yerler: [
      { ad: 'Bakırçay Ovası', lat: 39.10, lng: 27.10 },
      { ad: 'Gediz Ovası', lat: 38.60, lng: 27.40 },
      { ad: 'Küçük Menderes Ovası', lat: 38.15, lng: 27.60 },
      { ad: 'Büyük Menderes Ovası', lat: 37.80, lng: 27.90 }
    ],
    sira: {
      baslik: 'Grabenleri kuzeyden güneye diz',
      yon: 'Kuzeyden güneye',
      ogeler: ['Bakırçay', 'Gediz', 'Küçük Menderes', 'Büyük Menderes']
    },
    uyeler: ['Bakırçay Ovası', 'Gediz Ovası', 'Küçük Menderes Ovası', 'Büyük Menderes Ovası'],
    kacaklar: ['Çukurova', 'Konya Ovası', 'Bafra Ovası', 'Muş Ovası']
  },

  /* ══════════════════════════════════════════════════════════════════
   * 🌋 3. DERİNLİK VE YÜZEY VOLKANİZMASI ŞEKİLLERİ
   * ══════════════════════════════════════════════════════════════════ */

  {
    id: 'hk_lakolit',
    bolum: 'volkanizma',
    ikon: '🍄',
    baslik: 'Lako-lita-kolina',
    konu: 'Lakolit — mantar biçimli derinlik şekli',
    hikaye: '[[“Lako-lita-kolina”|Lakolit]] şarkısını söyleyen adam zehirli [[mantar|Lakolit MANTAR biçimlidir]] yemiş; kollarında mantarlar bitmiş. Lakolit [[yerin derinliklerinde|Derinlik (iç) volkanizması şekli]] kalan mantar biçimli kütledir.',
    puf: 'Lakolit = MANTAR biçimli derinlik volkanizması şekli. Magma yüzeye çıkamadan katılaşır.',
    cevap: 'Lakolit',
    soru: 'Mantar biçimindeki derinlik volkanizması şekli hangisidir?'
  },

  {
    id: 'hk_batolit',
    bolum: 'volkanizma',
    ikon: '⬇️',
    baslik: 'En dibe batmış olan: Batolit',
    konu: 'Batolit — en büyük derinlik şekli',
    hikaye: 'Derinlik volkanizmasının [[en aşağıya batmış|Batolit]] olanı, aynı zamanda [[en büyük kütlesidir|Batolit = derinlik şekillerinin en irisi]]; ülkemizdeki örneği [[Uludağ|Uludağ Batoliti — Bursa]]dır.',
    puf: 'BATolit = en derine BATan ve en büyük olan derinlik şekli. Türkiye örneği: ULUDAĞ.',
    cevap: 'Batolit',
    soru: 'En derinde oluşan, en büyük derinlik volkanizması şekli hangisidir?',
    yerler: [{ ad: 'Uludağ Batoliti', lat: 40.09, lng: 29.13 }]
  },

  {
    id: 'hk_krater',
    bolum: 'volkanizma',
    ikon: '🥨',
    baslik: 'Çubuk kraker',
    konu: 'Krater — volkanın tepesindeki küçük çukur',
    hikaye: 'Volkanın tepesindeki [[küçük çukur|Krater]], şekil olarak tam bir [[balık ya da çubuk kraker|Krater ≈ kraker: küçük çanak]] gibidir.',
    puf: 'KRAter ≈ KRAker: volkan bacasının tepesindeki KÜÇÜK çanak. Büyüğü kalderadır.',
    cevap: 'Krater',
    soru: 'Volkan konisinin tepesindeki küçük çanağa ne denir?'
  },

  {
    id: 'hk_kaldera',
    bolum: 'volkanizma',
    ikon: '🕳️',
    baslik: 'Kal, deraya gitme!',
    konu: 'Kaldera — kraterin dev boyutlusu',
    hikaye: 'Arkandan “[[Kal, deraya gitme!|Kaldera]]” diye bağırıyorlar; çünkü kaldera [[kraterin çok daha büyüğüdür|Kaldera = dev çöküntü çanağı]]. Ülkemizdeki en ünlü örneği [[Nemrut|Nemrut Kalderası — Bitlis/Tatvan]]tir.',
    puf: 'Kaldera = kraterin dev hâli (çöküntü çanağı). Nemrut Kalderası dünyanın 2. büyük kaldera gölünü barındırır.',
    cevap: 'Kaldera',
    soru: 'Kraterin çok daha büyüğü olan volkanik çanağa ne denir?',
    yerler: [{ ad: 'Nemrut Kalderası', lat: 38.62, lng: 42.24 }]
  },

  {
    id: 'hk_maar',
    bolum: 'volkanizma',
    ikon: '💨',
    baslik: 'Maaar! (gaz patlaması)',
    konu: 'Maar — gaz patlaması çukuru',
    hikaye: 'Ağzını kocaman açıp [[“Maaar!”|Maar]] diye gaz çıkarıyorsun: maar, [[gaz patlamasıyla oluşan çukurdur|Maar = patlama çukuru]]. [[Meke Maarı|Konya Karapınar — Meke Tuzlası]] ise adını [[magma|Meke ← Magma kökü]] kökünden alır.',
    puf: 'Maar = GAZ patlamasıyla açılan çukur. Meke (Karapınar/Konya) Türkiye’nin en ünlü maarıdır — “Dünyanın Nazar Boncuğu”.',
    cevap: 'Maar',
    soru: 'Gaz patlamasıyla oluşan volkanik çukura ne denir?',
    yerler: [{ ad: 'Meke Maarı (Karapınar)', lat: 37.69, lng: 33.64 }]
  },

  {
    id: 'hk_ic_anadolu_volkanik',
    bolum: 'volkanizma',
    ikon: '🌋',
    baslik: 'Erciyesli Kara Hasan Melendiz',
    konu: 'İç Anadolu’nun volkanik dağları',
    hikaye: 'Tekerlemeyi söyle: [[Erciyesli|Erciyes Dağı — Kayseri]] [[Kara|Karacadağ — Karaman/Konya]] [[Hasan|Hasandağı — Aksaray]] [[Melendiz|Melendiz Dağı — Niğde]]; yanına bir de [[Karadağ|Karadağ — Karaman]] ekle.',
    puf: 'İç Anadolu volkanikleri: ERCİYES, KARACADAĞ, HASANDAĞI, MELENDİZ, KARADAĞ. (Diyarbakır Karacadağ ile Karaman Karacadağ’ı karıştırma.)',
    cevap: 'İç Anadolu’nun volkanik dağları',
    soru: '“Erciyesli Kara Hasan Melendiz” tekerlemesi hangi bölgenin volkanik dağlarını sayar?',
    yerler: [
      { ad: 'Erciyes Dağı', lat: 38.53, lng: 35.45 },
      { ad: 'Hasandağı', lat: 38.13, lng: 34.17 },
      { ad: 'Melendiz Dağı', lat: 38.00, lng: 34.50 },
      { ad: 'Karadağ (Karaman)', lat: 37.38, lng: 33.20 },
      { ad: 'Karacadağ (Karaman/Konya)', lat: 37.70, lng: 33.40 }
    ],
    uyeler: ['Erciyes Dağı', 'Hasandağı', 'Melendiz Dağı', 'Karadağ', 'Karacadağ'],
    kacaklar: ['Ağrı Dağı', 'Süphan Dağı', 'Nemrut Dağı', 'Tendürek Dağı', 'Uludağ']
  },

  {
    id: 'hk_dogu_anadolu_volkanik',
    bolum: 'volkanizma',
    ikon: '🏔️',
    baslik: 'Nemrus Süpantendürekar',
    konu: 'Doğu Anadolu’nun volkanik dağları',
    hikaye: 'Van Gölü’nün çevresinde ritimle say: [[Nemrut|Nemrut Dağı — Bitlis]], [[Süphan|Süphan Dağı — Bitlis]], [[Tendürek|Tendürek Dağı — Ağrı]], [[Ağrı|Ağrı Dağı — Türkiye’nin en yüksek dağı (5.137 m)]].',
    puf: 'Doğu Anadolu volkanikleri: NEMRUT – SÜPHAN – TENDÜREK – AĞRI. Hepsi Van Gölü çevresinde toplanır; Nemrut lavları Van Gölü’nün önünü keserek gölü oluşturmuştur.',
    cevap: 'Doğu Anadolu’nun volkanik dağları',
    soru: '“Nemrus Süpantendürekar” kodu hangi dağ dizisini saklar?',
    yerler: [
      { ad: 'Nemrut Dağı (Bitlis)', lat: 38.62, lng: 42.23 },
      { ad: 'Süphan Dağı', lat: 38.92, lng: 42.82 },
      { ad: 'Tendürek Dağı', lat: 39.37, lng: 43.87 },
      { ad: 'Ağrı Dağı', lat: 39.70, lng: 44.30 }
    ],
    sira: {
      baslik: 'Tekerlemeyi doğru sırayla söyle',
      yon: 'Güneybatıdan kuzeydoğuya (Van Gölü çevresi)',
      ogeler: ['Nemrut', 'Süphan', 'Tendürek', 'Ağrı']
    },
    uyeler: ['Nemrut Dağı', 'Süphan Dağı', 'Tendürek Dağı', 'Ağrı Dağı'],
    kacaklar: ['Erciyes Dağı', 'Hasandağı', 'Melendiz Dağı', 'Kaz Dağı']
  },

  {
    id: 'hk_kula',
    bolum: 'volkanizma',
    ikon: '👂',
    baslik: 'Mani duyamaz bizim kulaklarımız',
    konu: 'Manisa Kula volkanları — kül konileri',
    hikaye: '[[“Mani duyamaz bizim kulaklarımız”|Manisa – Kula]] diyorsun. Kula volkanları [[kül konileridir|Kül konisi — Türkiye’nin en genç volkanik alanı]]; zaten [[Kula – Külla – Kül|Koniler küllerden oluşur]] diye kodlanır.',
    puf: 'KULA (Manisa) = KÜL konileri. Türkiye’nin en genç volkanik arazisidir; “Kula Yanıkyöresi / Divitler” diye anılır, UNESCO Jeoparkı’dır.',
    cevap: 'Kula (Manisa) kül konileri',
    soru: '“Mani duyamaz bizim kulaklarımız” kodu hangi volkanik alanı verir?',
    yerler: [{ ad: 'Kula Volkanik Alanı', lat: 38.55, lng: 28.65 }]
  },

  {
    id: 'hk_volkanik_v',
    bolum: 'volkanizma',
    ikon: '🆅',
    baslik: 'Haritaya kalın bir V çiz',
    konu: 'Türkiye’de volkanik arazilerin dağılışı',
    hikaye: 'Volkanik alanları haritada bulmak için kalın bir [[V harfi|Volkanik arazilerin dağılışı]] çiz: [[Ergene hariç batı köşesinden|V’nin sol üst ucu — Kula/Ege]] başla, [[Hatay’a in|V’nin dip noktası]], oradan da [[doğu köşesine çık|V’nin sağ üst ucu — Ağrı/Kars]].',
    puf: 'Volkanik V: Batı köşesi (Kula) → Hatay → Doğu köşesi (Ağrı). Ergene Havzası V’nin DIŞINDA kalır — orada volkanik arazi yoktur.',
    cevap: 'Volkanik arazilerin dağılışı',
    soru: 'Haritaya çizilen kalın “V” harfi hangi arazi tipinin dağılışını gösterir?',
    yerler: [
      { ad: 'Kula (V’nin batı ucu)', lat: 38.55, lng: 28.65 },
      { ad: 'Hatay (V’nin dip noktası)', lat: 36.20, lng: 36.16 },
      { ad: 'Ağrı (V’nin doğu ucu)', lat: 39.72, lng: 43.05 }
    ],
    cizim: {
      etiket: 'VOLKANİK V',
      izler: [
        { ad: 'V', renk: '#ef4444', nokta: [[39.20, 27.60], [36.20, 36.16], [40.20, 43.60]] }
      ]
    }
  },

  /* ══════════════════════════════════════════════════════════════════
   * 🌊 4. AKARSULAR, HAVZALAR VE SINIRLAR
   * ══════════════════════════════════════════════════════════════════ */

  {
    id: 'hk_sakar_fil',
    bolum: 'akarsular',
    ikon: '🐘',
    baslik: 'Sakar Fil Karadeniz’de',
    konu: 'Karadeniz’e dökülen akarsular',
    hikaye: 'Sahnede [[sakar bir fil|Sakarya + Filyos]] vardır. Bu sakar fil yere düşer, her yeri [[kanar ve kızarır|Kızılırmak]]. Sonra zehirlenmiş gibi [[yeşillenir|Yeşilırmak]] ve en sonunda vücudundan [[ruhu çıkar|Çoruh]].',
    puf: 'Karadeniz’e dökülenler batıdan doğuya: SAKARYA – FİLYOS – KIZILIRMAK – YEŞİLIRMAK – ÇORUH. Hikâyenin sırası coğrafi sırayla birebir aynıdır.',
    cevap: 'Karadeniz’e dökülen akarsular',
    soru: '“Sakar fil düştü, kızardı, yeşillendi, ruhu çıktı” hikâyesi hangi akarsu grubunu verir?',
    yerler: [
      { ad: 'Sakarya Nehri', lat: 41.13, lng: 30.63 },
      { ad: 'Filyos Çayı', lat: 41.55, lng: 32.03 },
      { ad: 'Kızılırmak (Bafra)', lat: 41.65, lng: 35.95 },
      { ad: 'Yeşilırmak (Çarşamba)', lat: 41.35, lng: 36.75 },
      { ad: 'Çoruh Nehri', lat: 41.30, lng: 41.60 }
    ],
    sira: {
      baslik: 'Karadeniz’e dökülenleri batıdan doğuya diz',
      yon: 'Batıdan doğuya',
      ogeler: ['Sakarya', 'Filyos', 'Kızılırmak', 'Yeşilırmak', 'Çoruh']
    },
    uyeler: ['Sakarya', 'Filyos', 'Kızılırmak', 'Yeşilırmak', 'Çoruh'],
    kacaklar: ['Susurluk', 'Seyhan', 'Gediz', 'Meriç', 'Dicle']
  },

  {
    id: 'hk_kura_aras',
    bolum: 'akarsular',
    ikon: '🧊',
    baslik: 'Karslı Kura ve Aras',
    konu: 'Hazar kapalı havzası',
    hikaye: 'Haritanın Doğu Anadolu köşesinde [[Kars|Kura ve Aras]] yan yana durur. İkisi de ülkemizden doğar, [[Azerbaycan’da birleşir|Kura + Aras birleşimi]] ve [[Hazar’a dökülür|Hazar KAPALI havzası — denize ulaşamaz]].',
    puf: 'KARS = KURA + ARAS. İkisi de Hazar’a döküldüğü için KAPALI HAVZA’dır (okyanusa bağlanmaz). Aras aynı zamanda Ermenistan–Nahçıvan–İran sınırını çizer.',
    cevap: 'Hazar kapalı havzası (Kura ve Aras)',
    soru: '“Karslı Kura ve Aras” kodu hangi havzayı anlatır?',
    yerler: [
      { ad: 'Kura Nehri (Ardahan)', lat: 41.10, lng: 42.70 },
      { ad: 'Aras Nehri (Iğdır)', lat: 39.90, lng: 44.20 }
    ],
    uyeler: ['Kura Nehri', 'Aras Nehri'],
    kacaklar: ['Fırat', 'Dicle', 'Çoruh', 'Kızılırmak']
  },

  {
    id: 'hk_susurluk',
    bolum: 'akarsular',
    ikon: '🚿',
    baslik: 'Su mermere dökülür',
    konu: 'Marmara’ya dökülen akarsu',
    hikaye: 'Evlerimizde su genellikle nereye dökülür? Tabii ki [[mermere|Marmara Denizi]]. Buradan hareketle [[Susurluk (Simav) Çayı|Marmara’ya dökülen en önemli akarsu]] Marmara’ya dökülür.',
    puf: 'SU → MERMER → MARMARA. Susurluk (Simav) Çayı Marmara Denizi’ne dökülür; Marmara Bölgesi’nin en uzun akarsuyudur.',
    cevap: 'Susurluk (Simav) Çayı',
    soru: '“Su mermere dökülür” kodu hangi akarsuyu verir?',
    yerler: [{ ad: 'Susurluk (Simav) Çayı', lat: 40.32, lng: 28.20 }]
  },

  {
    id: 'hk_akdeniz_akarsulari',
    bolum: 'akarsular',
    ikon: '💃',
    baslik: 'Asi kızlar Çukurova’da, sonra manava',
    konu: 'Akdeniz’e dökülen akarsular',
    hikaye: '“[[Seyhan, Ceyhan|Seyhan ve Ceyhan — Çukurova’yı oluştururlar]], [[asi|Asi Nehri — Hatay, güneyden kuzeye ters akar]] kızlar Çukurova’da oynarlar” diye başlar şarkı. Sonra “[[Silifke’nin yoğurdu|Göksu Nehri — Silifke Deltası]]” eşliğinde oynarlar; bu yoğurt [[gökten düşen suyla|Göksu]] mayalanır. Acıkınca [[manava giderler|Manavgat Çayı]], yemek yiyip [[köprüyü geçerler|Köprüçay]], [[ak bir suyla yıkanırlar|Aksu Çayı]], [[eşleşerek|Eşen Çayı]] suya [[dalarlar|Dalaman Çayı]].',
    puf: 'Akdeniz akarsuları doğudan batıya: ASİ – CEYHAN – SEYHAN – GÖKSU – MANAVGAT – KÖPRÜÇAY – AKSU – EŞEN – DALAMAN. Seyhan+Ceyhan Çukurova (Adana) deltasını, Göksu Silifke deltasını kurar.',
    cevap: 'Akdeniz’e dökülen akarsular',
    soru: '“Asi kızlar Çukurova’da oynar, sonra manava gider” hikâyesi hangi akarsu grubunu verir?',
    yerler: [
      { ad: 'Asi Nehri', lat: 36.10, lng: 36.15 },
      { ad: 'Ceyhan Nehri', lat: 36.65, lng: 35.62 },
      { ad: 'Seyhan Nehri', lat: 36.72, lng: 35.30 },
      { ad: 'Göksu Nehri (Silifke)', lat: 36.35, lng: 33.95 },
      { ad: 'Manavgat Çayı', lat: 36.78, lng: 31.45 },
      { ad: 'Köprüçay', lat: 36.87, lng: 31.18 },
      { ad: 'Aksu Çayı', lat: 36.88, lng: 30.85 },
      { ad: 'Eşen Çayı', lat: 36.35, lng: 29.30 },
      { ad: 'Dalaman Çayı', lat: 36.72, lng: 28.82 }
    ],
    sira: {
      baslik: 'Akdeniz akarsularını doğudan batıya diz',
      yon: 'Doğudan batıya',
      ogeler: ['Asi', 'Ceyhan', 'Seyhan', 'Göksu', 'Manavgat', 'Köprüçay', 'Aksu', 'Eşen', 'Dalaman']
    },
    siraNot: 'Şarkı “Seyhan, Ceyhan, Asi” diye başlar ama haritada doğudan batıya gerçek sıra ASİ – CEYHAN – SEYHAN’dır. Tekerleme ezberi kolaylaştırır, sıralama sorusunda haritaya güven.',
    uyeler: ['Asi', 'Ceyhan', 'Seyhan', 'Göksu', 'Manavgat', 'Köprüçay', 'Aksu', 'Eşen', 'Dalaman'],
    kacaklar: ['Kızılırmak', 'Susurluk', 'Bakırçay', 'Çoruh']
  },

  {
    id: 'hk_firat_dicle',
    bolum: 'akarsular',
    ikon: '⚔️',
    baslik: 'Kara Murat ve zıplayan Zap',
    konu: 'Fırat ve Dicle’nin kolları',
    hikaye: '[[Karasu|Fırat’ın kolu — Karasu]] ile [[Murat|Fırat’ın kolu — Murat]] birleşir; ortaya çıkan [[“Kara Murat”|Fırat Nehri]] destan yazar. [[Dicle ise zıplıyor|Dicle’nin kolu ZAP Suyu]].',
    puf: 'FIRAT = KARASU + MURAT (“Kara Murat”). DİCLE’nin kolu ZAP’tır (“Dicle zıplıyor”). İkisi Irak’ta birleşip Şattülarap adını alır ve Basra Körfezi’ne dökülür.',
    cevap: 'Fırat (Karasu + Murat) ve Dicle (Zap)',
    soru: '“Kara Murat” ve “zıplayan Zap” hangi nehirlerin kollarını verir?',
    yerler: [
      { ad: 'Karasu (Erzurum)', lat: 39.85, lng: 40.30 },
      { ad: 'Murat Nehri (Muş)', lat: 38.85, lng: 41.35 },
      { ad: 'Fırat Nehri', lat: 38.10, lng: 38.40 },
      { ad: 'Dicle Nehri', lat: 37.80, lng: 40.80 },
      { ad: 'Zap Suyu (Hakkâri)', lat: 37.55, lng: 43.55 }
    ]
  },

  {
    id: 'hk_sinir_nehirleri',
    bolum: 'akarsular',
    ikon: '🚧',
    baslik: 'Baş harfi sınırı söyler',
    konu: 'Sınır çizen nehirler ve komşu ülkeler',
    hikaye: 'Sınır nehirlerinin baş harfi komşuyu ele verir: [[Asi|Suriye sınırı — “Araplar”]] Araplarla, [[Arpaçay|Ermenistan sınırı — “Ermenilerle çay içiyoruz”]] Ermenilerle çay içer; [[“Hezil rezil herif, Irak’ta dur”|Hezil Suyu — Irak sınırı]] ise Irak’ta durur.',
    puf: 'ASİ → Suriye (Araplar). ARPAÇAY → Ermenistan (Arpaçay ile “çay içmek”). HEZİL → Irak. Ayrıca Meriç → Yunanistan, Aras → Ermenistan/Nahçıvan/İran sınırını çizer.',
    cevap: 'Sınır çizen nehirler',
    soru: 'Asi, Arpaçay ve Hezil hangi özellikleriyle birlikte anılır?',
    yerler: [
      { ad: 'Asi Nehri (Suriye sınırı)', lat: 36.05, lng: 36.28 },
      { ad: 'Arpaçay (Ermenistan sınırı)', lat: 40.45, lng: 43.55 },
      { ad: 'Hezil Suyu (Irak sınırı)', lat: 37.35, lng: 42.60 }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════
   * 💧 5. GÖLLER VE OLUŞUM TÜRLERİ
   * ══════════════════════════════════════════════════════════════════ */

  {
    id: 'hk_tektonik_goller',
    bolum: 'goller',
    ikon: '🪨',
    baslik: 'Tek tonluk taş',
    konu: 'Tektonik göller',
    hikaye: '[[Tek tonluk|Tektonik]] bir taş olan [[Aktaş’ı|Aktaş Gölü — Ardahan]] alıyoruz. Bu taşı [[sapanla|Sapanca Gölü]] fırlatmak için [[izin|İznik Gölü]] alıp [[Ulubatlı Hasan’dan|Uluabat (Apolyont) Gölü]] [[manyak kuşu|Manyas (Kuş) Gölü]] vuruyoruz. Vurulan kuş [[geberiyor|Eber Gölü]] ve bembeyaz [[ak|Akşehir Gölü]] oluyor. Bu kuşu [[keyifle|Seyfe Gölü]] azar azar [[tuzlayıp|Tuz Gölü]] yerken tuzu kaçırıyoruz. Yanımızdakiler “[[Bir durun ya|Burdur Gölü]], çok tuzladınız [[acı oldu|Acıgöl]]!” diye bağırıyor.',
    puf: 'Tektonik göller: AKTAŞ – SAPANCA – İZNİK – ULUABAT – MANYAS – EBER – AKŞEHİR – SEYFE – TUZ – BURDUR – ACIGÖL. Tuz, Burdur ve Acıgöl gideğeni olmadığı için TUZLU/ACI’dır.',
    cevap: 'Tektonik göller',
    soru: '“Tek tonluk taş” hikâyesi hangi oluşum türündeki gölleri sayar?',
    yerler: [
      { ad: 'Aktaş Gölü', lat: 41.20, lng: 43.35 },
      { ad: 'Sapanca Gölü', lat: 40.71, lng: 30.26 },
      { ad: 'İznik Gölü', lat: 40.43, lng: 29.50 },
      { ad: 'Uluabat Gölü', lat: 40.18, lng: 28.60 },
      { ad: 'Manyas (Kuş) Gölü', lat: 40.20, lng: 27.96 },
      { ad: 'Eber Gölü', lat: 38.62, lng: 31.18 },
      { ad: 'Akşehir Gölü', lat: 38.58, lng: 31.42 },
      { ad: 'Seyfe Gölü', lat: 39.20, lng: 34.38 },
      { ad: 'Tuz Gölü', lat: 38.75, lng: 33.30 },
      { ad: 'Burdur Gölü', lat: 37.75, lng: 30.18 },
      { ad: 'Acıgöl', lat: 37.80, lng: 29.88 }
    ],
    uyeler: ['Sapanca', 'İznik', 'Uluabat', 'Manyas', 'Eber', 'Akşehir', 'Seyfe', 'Tuz Gölü', 'Burdur', 'Acıgöl'],
    kacaklar: ['Salda', 'Abant', 'Çıldır', 'Terkos', 'Uzungöl', 'Meke']
  },

  {
    id: 'hk_karstik_goller',
    bolum: 'goller',
    ikon: '❄️',
    baslik: 'Karlı yerdeki kız',
    konu: 'Karstik göller',
    hikaye: '[[Karlı yerdeki|Karstik]] güzel bir kız elinde [[elma|Elmalı — Antalya karstik alanı]] kesiyor, [[kestane|Kestel Gölü — Burdur/Bucak]] soyuyor. “Bu meyvelerle doymayız” deyince bize aş hazırlamak için [[salda|Salda Gölü — Burdur/Yeşilova]] balık [[avlamaya|Avlan Gölü — Antalya/Elmalı]] gidiyor.',
    puf: 'Karstik göller: ELMALI – KESTEL – SALDA – AVLAN (ayrıca Sivas’ta HAFİK ve TÖDÜRGE). Kireçtaşının erimesiyle oluşan çanaklarda birikirler.',
    cevap: 'Karstik göller',
    soru: '“Karlı yerdeki kız elma kesip kestane soyuyor” hikâyesi hangi göl tipini verir?',
    yerler: [
      { ad: 'Elmalı (Antalya)', lat: 36.74, lng: 29.92 },
      { ad: 'Kestel Gölü (Burdur)', lat: 37.42, lng: 30.55 },
      { ad: 'Salda Gölü', lat: 37.55, lng: 29.68 },
      { ad: 'Avlan Gölü', lat: 36.59, lng: 29.93 },
      { ad: 'Hafik Gölü (Sivas)', lat: 39.85, lng: 37.40 },
      { ad: 'Tödürge Gölü (Sivas)', lat: 39.85, lng: 37.95 }
    ],
    uyeler: ['Elmalı', 'Kestel', 'Salda', 'Avlan', 'Hafik', 'Tödürge'],
    kacaklar: ['Sapanca', 'Van Gölü', 'Abant', 'Uzungöl', 'Çıldır']
  },

  {
    id: 'hk_karma_goller',
    bolum: 'goller',
    ikon: '🧩',
    baslik: 'Karmaşık Bey',
    konu: 'Karma yapılı (tektonik + karstik) göller',
    hikaye: 'Beyimiz [[eğri bir kovayla|Eğirdir Gölü + Kovada Gölü]] koca bir [[Bey şehrini|Beyşehir Gölü + Suğla Gölü]] suluyor. Bu iş çok [[karmaşık|Karma yapılı göller: tektonik + karstik]] olduğu için bu göller karma yapılıdır.',
    puf: 'Karma yapılı (tektonik + karstik) göller: EĞİRDİR – KOVADA – BEYŞEHİR – SUĞLA. Beyşehir Türkiye’nin en büyük TATLI su gölüdür.',
    cevap: 'Karma yapılı (tektonik + karstik) göller',
    soru: '“Karmaşık Bey eğri kovayla suluyor” hikâyesi hangi göl tipini verir?',
    yerler: [
      { ad: 'Eğirdir Gölü', lat: 38.05, lng: 30.85 },
      { ad: 'Kovada Gölü', lat: 37.64, lng: 30.87 },
      { ad: 'Beyşehir Gölü', lat: 37.75, lng: 31.50 },
      { ad: 'Suğla Gölü', lat: 37.35, lng: 32.10 }
    ],
    uyeler: ['Eğirdir', 'Kovada', 'Beyşehir', 'Suğla'],
    kacaklar: ['Tuz Gölü', 'Salda', 'Van Gölü', 'Sera']
  },

  {
    id: 'hk_buzul_goller',
    bolum: 'goller',
    ikon: '🧊',
    baslik: 'Buzun üstündeki kilim',
    konu: 'Buzul (sirk) gölleri',
    hikaye: 'Buzun üstüne serilmiş bir [[kilimin|Kilimli Gölü — Cilo/Hakkâri]] üzerinde durup [[aynaya|Aynalı Göl — Hakkâri]] bakan adam soğuktan [[kararıyor|Karagöl]]. Onu gören arkadaşı “[[Mal mısın|Verçenik — Rize]], buzun üzerinde oturma, [[ver şunu bana|Cilo Dağları — Hakkâri]]!” diye uyarıyor.',
    puf: 'Buzul (sirk) gölleri: KİLİMLİ – AYNALI – KARAGÖL – VERÇENİK – CİLO. Yüksek dağların (Cilo, Kaçkar, Buzul) zirvelerinde, buzul aşındırma çanaklarında oluşurlar.',
    cevap: 'Buzul (sirk) gölleri',
    soru: '“Buzun üstündeki kilim” hikâyesi hangi göl tipini verir?',
    yerler: [
      { ad: 'Kilimli Gölü (Cilo)', lat: 37.48, lng: 44.00 },
      { ad: 'Aynalı Göl (Hakkâri)', lat: 37.52, lng: 43.95 },
      { ad: 'Karagöl (Kaçkarlar)', lat: 40.85, lng: 41.10 },
      { ad: 'Verçenik (Rize)', lat: 40.75, lng: 40.85 },
      { ad: 'Cilo Dağları', lat: 37.45, lng: 44.05 }
    ],
    uyeler: ['Kilimli', 'Aynalı', 'Karagöl', 'Verçenik', 'Cilo'],
    kacaklar: ['Tuz Gölü', 'Manyas', 'Terkos', 'Meke', 'Bafa']
  },

  {
    id: 'hk_heyelan_goller',
    bolum: 'goller',
    ikon: '⛰️',
    baslik: 'Hey lan! Sulama artık',
    konu: 'Heyelan set gölleri',
    hikaye: '[[Bora Bey|Borabay Gölü — Amasya]], [[Sera’yı|Sera Gölü — Trabzon]] abartılı bir şekilde [[7 gün boyunca|Yedigöller — Bolu]] [[hortumla|Tortum Gölü — Erzurum]] suluyor; her tarafı [[sülükler|Sülüklü Göl — Bolu]] basıyor. Arkadan biri “[[Hey lan!|Heyelan set gölleri]] Sulama artık, her taraf sel olacak!” diye bağırıyor.',
    puf: 'Heyelan set gölleri: BORABAY – SERA – YEDİGÖLLER – TORTUM – SÜLÜKLÜ (ayrıca ABANT ve ZİNAV). Heyelan kütlesi vadinin önünü kapatır; en çok Karadeniz’de görülür.',
    cevap: 'Heyelan set gölleri',
    soru: '“Hey lan! Sulama artık” hikâyesi hangi göl tipini verir?',
    yerler: [
      { ad: 'Borabay Gölü', lat: 40.75, lng: 35.90 },
      { ad: 'Sera Gölü', lat: 40.98, lng: 39.62 },
      { ad: 'Yedigöller', lat: 40.94, lng: 31.74 },
      { ad: 'Tortum Gölü', lat: 40.65, lng: 41.65 },
      { ad: 'Sülüklü Göl (Bolu)', lat: 40.70, lng: 31.55 },
      { ad: 'Abant Gölü', lat: 40.60, lng: 31.28 }
    ],
    uyeler: ['Borabay', 'Sera', 'Yedigöller', 'Tortum', 'Sülüklü', 'Abant', 'Zinav'],
    kacaklar: ['Salda', 'Tuz Gölü', 'Çıldır', 'Meke', 'Akyatan']
  },

  {
    id: 'hk_aluvyal_goller',
    bolum: 'goller',
    ikon: '🛌',
    baslik: 'Gariban Ali yorgansız yatıyor',
    konu: 'Alüvyal set gölleri',
    hikaye: 'Köyde [[çamların arasında|Çamiçi (Bafa) Gölü — Aydın/Muğla]] yaşayan gariban [[Ali|Alüvyal set gölleri]], soğuk [[mermerin|Marmara Gölü — Manisa]] üzerinde [[uzun uzadıya|Uzungöl — Trabzon]] yatıyor. Üstünde [[yorganı olmadığı için|Mogan Gölü — Ankara]] ona artık yorgansız yatmamasını [[emir|Eymir Gölü — Ankara]] veriyoruz. [[Kafasına çam düşünce|Bafa Gölü — “kafa”]] biraz sersemliyor.',
    puf: 'Alüvyal set gölleri: BAFA (Çamiçi) – MARMARA GÖLÜ – UZUNGÖL – MOGAN – EYMİR (ayrıca Köyceğiz). Akarsuyun taşıdığı alüvyonlar önü kapatır.',
    cevap: 'Alüvyal set gölleri',
    soru: '“Gariban Ali yorgansız yatıyor” hikâyesi hangi göl tipini verir?',
    yerler: [
      { ad: 'Bafa (Çamiçi) Gölü', lat: 37.49, lng: 27.45 },
      { ad: 'Marmara Gölü (Manisa)', lat: 38.62, lng: 28.02 },
      { ad: 'Uzungöl (Trabzon)', lat: 40.62, lng: 40.30 },
      { ad: 'Mogan Gölü (Ankara)', lat: 39.75, lng: 32.80 },
      { ad: 'Eymir Gölü (Ankara)', lat: 39.80, lng: 32.83 },
      { ad: 'Köyceğiz Gölü', lat: 36.90, lng: 28.65 }
    ],
    uyeler: ['Bafa', 'Marmara Gölü', 'Uzungöl', 'Mogan', 'Eymir', 'Köyceğiz'],
    kacaklar: ['Van Gölü', 'Salda', 'Nemrut', 'Aktaş', 'Cilo']
  },

  {
    id: 'hk_volkanik_set_goller',
    bolum: 'goller',
    ikon: '🐟',
    baslik: 'Lav görünce çıldıran balık',
    konu: 'Volkanik (lav) set gölleri',
    hikaye: 'Boynunda [[haç kolyesi|Haçlı (Bulanık) Gölü — Muş]] olan [[nazik|Nazik Gölü — Bitlis/Ahlat]] bir [[balık|Balık Gölü — Ağrı]] hayatında ilk kez lav görüyor ve [[çıldırıyor|Çıldır Gölü — Ardahan/Kars]]. Kontrolünü kaybedince ona nazik davranmak zorunda kalıyoruz.',
    puf: 'Volkanik (lav) set gölleri: HAÇLI – NAZİK – BALIK – ÇILDIR; bölgedeki diğerleri VAN ve ERÇEK’tir. Lav akıntısı vadinin önünü keser.',
    cevap: 'Volkanik (lav) set gölleri',
    soru: '“Lav görünce çıldıran balık” hikâyesi hangi göl tipini verir?',
    yerler: [
      { ad: 'Haçlı (Bulanık) Gölü', lat: 39.02, lng: 42.31 },
      { ad: 'Nazik Gölü', lat: 38.85, lng: 42.27 },
      { ad: 'Balık Gölü (Ağrı)', lat: 39.75, lng: 43.57 },
      { ad: 'Çıldır Gölü', lat: 41.05, lng: 43.25 },
      { ad: 'Van Gölü', lat: 38.60, lng: 42.90 },
      { ad: 'Erçek Gölü', lat: 38.64, lng: 43.58 }
    ],
    uyeler: ['Haçlı', 'Nazik', 'Balık Gölü', 'Çıldır', 'Van Gölü', 'Erçek'],
    kacaklar: ['Salda', 'Burdur', 'Bafa', 'Terkos', 'Sera']
  },

  {
    id: 'hk_lagun_goller',
    bolum: 'goller',
    ikon: '🌊',
    baslik: 'La Dursun, çok kokuyorsun',
    konu: 'Kıyı set (lagün) gölleri',
    hikaye: 'Kıyıda beklemekten terleyen Dursun’a “[[La dursun|Lagün — Durusu (Terkos) Gölü]], [[ölü|Ölüdeniz — Fethiye]] gibi, [[yumurta|Yumurtalık Lagünü — Adana]] gibi kokuyorsun” diyoruz. Kokuyu gidermek için [[Büyükçekmece ve Küçükçekmece’yi|Büyükçekmece + Küçükçekmece Gölleri — İstanbul]] açıp içindeki deodorantı almasını söylüyoruz.',
    puf: 'Kıyı set (lagün) gölleri: DURUSU (TERKOS) – ÖLÜDENİZ – YUMURTALIK – BÜYÜKÇEKMECE – KÜÇÜKÇEKMECE (ayrıca Akyatan: Türkiye’nin en büyük lagünü). Dalga biriktirmesiyle koyun önü kapanır.',
    cevap: 'Kıyı set (lagün) gölleri',
    soru: '“La Dursun, çok kokuyorsun” hikâyesi hangi göl tipini verir?',
    yerler: [
      { ad: 'Terkos (Durusu) Gölü', lat: 41.33, lng: 28.58 },
      { ad: 'Ölüdeniz (Fethiye)', lat: 36.55, lng: 29.12 },
      { ad: 'Yumurtalık Lagünü', lat: 36.75, lng: 35.75 },
      { ad: 'Büyükçekmece Gölü', lat: 41.06, lng: 28.55 },
      { ad: 'Küçükçekmece Gölü', lat: 40.99, lng: 28.76 },
      { ad: 'Akyatan Lagünü', lat: 36.63, lng: 35.25 }
    ],
    uyeler: ['Terkos (Durusu)', 'Ölüdeniz', 'Yumurtalık', 'Büyükçekmece', 'Küçükçekmece', 'Akyatan'],
    kacaklar: ['Eğirdir', 'Nemrut', 'Abant', 'Verçenik', 'Seyfe']
  },

  {
    id: 'hk_krater_goller',
    bolum: 'goller',
    ikon: '🍞',
    baslik: 'Nemli ekmek meke acı olur',
    konu: 'Volkanik krater / maar gölleri',
    hikaye: '“[[Nemli|Nemrut Kaldera Gölü — Bitlis]] [[ekmek|Ekmek: kelime köprüsü]] [[meke|Meke Maarı — Konya/Karapınar]] [[acı|Acıgöl (Nevşehir maarları) — krater/maar gölü]] olur” diye tekrarla.',
    puf: 'Krater/maar gölleri: NEMRUT (kaldera) – MEKE (maar) – ACIGÖL (Nevşehir maarı). Denizli’deki tektonik Acıgöl ile karıştırma.',
    cevap: 'Krater ve maar gölleri',
    soru: '“Nemli ekmek meke acı olur” kodu hangi göl tipini verir?',
    yerler: [
      { ad: 'Nemrut Kaldera Gölü', lat: 38.62, lng: 42.24 },
      { ad: 'Meke Maarı', lat: 37.69, lng: 33.64 },
      { ad: 'Acıgöl (Nevşehir)', lat: 38.57, lng: 34.53 }
    ],
    uyeler: ['Nemrut', 'Meke', 'Acıgöl (Nevşehir)'],
    kacaklar: ['Sapanca', 'Uzungöl', 'Terkos', 'Salda']
  },

  /* ══════════════════════════════════════════════════════════════════
   * 🌱 6. TOPRAK VE BİTKİ ÖRTÜSÜ KODLAMALARI
   * ══════════════════════════════════════════════════════════════════ */

  {
    id: 'hk_halomorfik',
    bolum: 'toprak',
    ikon: '🧂',
    baslik: 'Halıları tuzla yıkıyoruz',
    konu: 'Halomorfik (tuzlu) topraklar',
    hikaye: '[[Halıları|Halomorfik topraklar]] mikroptan arındırmak için [[tuzla yıkıyoruz|Tuzlu topraklar]]. Bu topraklar [[kurak bölgelerde|Buharlaşmanın yağıştan fazla olduğu yerler]] gelişir.',
    puf: 'HALI → HALOMORFİK → TUZLU toprak. Kurak/yarı kurak bölgelerde, buharlaşmanın şiddetli olduğu yerlerde (Tuz Gölü çevresi, Konya Ovası) görülür.',
    cevap: 'Halomorfik (tuzlu) topraklar',
    soru: '“Halıları tuzla yıkıyoruz” kodu hangi toprak tipini verir?',
    yerler: [{ ad: 'Tuz Gölü çevresi', lat: 38.75, lng: 33.30 }]
  },

  {
    id: 'hk_terra_rossa',
    bolum: 'toprak',
    ikon: '🟥',
    baslik: 'Terleyen Rosa Akdeniz’e gitti',
    konu: 'Terra Rossa (kırmızı Akdeniz toprağı)',
    hikaye: '[[Terleyen Rosa|Terra Rossa]] tatile nereye gider? Tabii ki [[Akdeniz’e|Akdeniz iklim bölgesi]]. [[Kalkerli arazide|Kireç taşı (kalker) üzerinde oluşur]] terleyen Rosa’nın rengi [[kıpkırmızıdır|Kırmızı renkli toprak — demir oksit]].',
    puf: 'TERRA ROSSA = “terleyen Rosa” = AKDENİZ’in KALKER (kireç taşı) üzerinde oluşan KIRMIZI toprağıdır. Adı zaten İtalyanca “kırmızı toprak” demektir.',
    cevap: 'Terra Rossa',
    soru: '“Terleyen Rosa Akdeniz’e gitti” kodu hangi toprağı verir?',
    yerler: [{ ad: 'Akdeniz kalkerli kuşağı (Taşeli)', lat: 36.80, lng: 33.20 }]
  },

  {
    id: 'hk_vertisol',
    bolum: 'toprak',
    ikon: '🆅',
    baslik: 'Taş doğuran toprak: V harfi',
    konu: 'Vertisoller (dönen / taş doğuran topraklar)',
    hikaye: 'Haritada [[Ergene ve Van çevresine|Vertisollerin dağılışı]] dev bir [[V harfi|Vertisol]] çiz. [[Kil oranı çok yüksektir|Killi yapı]]: kuruyunca [[çatlar|Yazın derin çatlaklar açılır]], yağışla birlikte altındaki [[taşları yukarı fırlatır|“Taş doğuran / dönen toprak”]].',
    puf: 'VERTİSOL: killi, kuruyunca çatlayan, taşları yüzeye çıkaran toprak. Türkiye’de ERGENE ve VAN çevresinde yaygındır (haritada V harfi).',
    cevap: 'Vertisoller',
    soru: '“Taş doğuran / dönen toprak” hangi toprak tipidir?',
    yerler: [
      { ad: 'Ergene Havzası', lat: 41.20, lng: 27.00 },
      { ad: 'Van çevresi', lat: 38.50, lng: 43.40 }
    ],
    cizim: {
      etiket: 'VERTİSOL V',
      izler: [
        { ad: 'V', renk: '#22c55e', nokta: [[41.30, 26.90], [37.30, 35.40], [38.60, 43.40]] }
      ]
    }
  },

  {
    id: 'hk_cernezyom',
    bolum: 'toprak',
    ikon: '🥜',
    baslik: 'Kara Çerez',
    konu: 'Çernezyom (kara topraklar)',
    hikaye: '[[Kara çerez|Çernezyom — kara topraklar]] yiyoruz. Bu toprak [[Erzurum-Kars çevresinde|Çernezyomun Türkiye’deki alanı]], [[çayır altında|Çayır bitki örtüsü altında gelişir]] gelişir ve [[en verimli topraktır|Dünyanın en verimli toprağı]].',
    puf: 'ÇERNEZYOM = “kara çerez” = KARA TOPRAK. Türkiye’de ERZURUM–KARS platolarında, ÇAYIR örtüsü altında oluşur; dünyanın en verimli toprağıdır.',
    cevap: 'Çernezyom (kara topraklar)',
    soru: '“Kara Çerez” kodu hangi toprağı ve hangi yöreyi verir?',
    yerler: [
      { ad: 'Erzurum-Kars Platoları', lat: 40.30, lng: 42.30 }
    ]
  },

  {
    id: 'hk_renzina',
    bolum: 'toprak',
    ikon: '🆁',
    baslik: 'Haritaya R harfi çiz',
    konu: 'Renzinalar',
    hikaye: 'Renzinaların yerini bulmak için haritaya bir [[R harfi|Renzina]] çiz: harf [[Marmara ve İç Ege’yi|Renzinaların dağılış alanı]] kapsar. Bu topraklar [[yumuşak kireç taşları üzerinde|Renzina = yumuşak kalker üzerinde oluşan toprak]] gelişir.',
    puf: 'RENZİNA = R harfi = MARMARA + İÇ EGE. YUMUŞAK kireç taşı (marn) üzerinde oluşur. Terra Rossa ise SERT kalker üzerinde, Akdeniz’dedir.',
    cevap: 'Renzinalar',
    soru: 'Haritaya çizilen “R” harfi hangi toprak tipinin alanını gösterir?',
    yerler: [
      { ad: 'Marmara (Trakya-Bursa)', lat: 40.40, lng: 28.40 },
      { ad: 'İç Ege (Kütahya-Uşak)', lat: 38.90, lng: 29.60 }
    ],
    cizim: {
      etiket: 'RENZİNA R',
      izler: [
        { ad: 'R gövdesi', renk: '#f97316', nokta: [[38.60, 27.20], [41.25, 27.20]] },
        { ad: 'R kesesi', renk: '#f97316', nokta: [[41.25, 27.20], [41.25, 29.80], [40.05, 29.80], [40.05, 27.20]] },
        { ad: 'R bacağı', renk: '#f97316', nokta: [[40.05, 28.60], [38.75, 30.40]] }
      ]
    }
  },

  {
    id: 'hk_dogu_ladini',
    bolum: 'toprak',
    ikon: '🌲',
    baslik: 'Bin Ladin nereye saklandı?',
    konu: 'Doğu ladini',
    hikaye: 'Usame Bin [[Ladin|Doğu ladini]] nereye saklanıyordu? [[Doğu Karadeniz’in gür ormanlarına|Doğu ladininin tek doğal yayılış alanı]].',
    puf: 'DOĞU LADİNİ yalnızca DOĞU KARADENİZ’de (Trabzon–Rize–Artvin, Kaçkarlar) doğal olarak yetişir. Nemli ve gür iğne yapraklı orman türüdür.',
    cevap: 'Doğu ladini — Doğu Karadeniz',
    soru: 'Doğu ladininin doğal yayılış alanı neresidir?',
    yerler: [{ ad: 'Doğu Karadeniz (Kaçkarlar)', lat: 40.85, lng: 41.00 }]
  },

  {
    id: 'hk_saricam',
    bolum: 'toprak',
    ikon: '☀️',
    baslik: 'Sarıçam sarı güneşi sever',
    konu: 'Sarıçam',
    hikaye: '[[Sarıçamlar sarı güneşi|Sarıçam]] çok sever. Bu yüzden güneşe en yakın olmak için [[yüksek yerlerde|Yüksek dağ zirveleri]], mesela [[Kars Sarıkamış’ta|Sarıkamış sarıçam ormanları]] bulunurlar.',
    puf: 'SARIÇAM = güneşi ve yüksekliği sever. Türkiye’de en ünlü alanı KARS–SARIKAMIŞ’tır; ayrıca yüksek dağların zirvelerinde bulunur. Soğuğa dayanıklıdır.',
    cevap: 'Sarıçam',
    soru: '“Sarı güneşi sevdiği için yükseklerde durur” kodu hangi ağacı verir?',
    yerler: [{ ad: 'Sarıkamış (Kars)', lat: 40.33, lng: 42.58 }]
  },

  {
    id: 'hk_maki',
    bolum: 'toprak',
    ikon: '🌿',
    baslik: 'Defne ve Funda Mersin’e gitti',
    konu: 'Maki türleri',
    hikaye: '[[Defne|Maki türü — defne]] ve [[Funda|Maki türü — funda]] adında iki kız, [[Mersin’e|Maki türü — mersin]] “[[koca yemiş|Maki türü — kocayemiş]]” bulmaya gidiyorlar. Hepsi [[Akdeniz kuşağında|Makinin yayılış alanı — Akdeniz iklimi]] yaşar.',
    puf: 'MAKİ türleri: defne, funda, mersin, kocayemiş, zeytin, keçiboynuzu, sakız, zakkum… Akdeniz ikliminin bodur, kışın yapraklarını dökmeyen çalı örtüsüdür (kuraklığa dayanıklı).',
    cevap: 'Maki',
    soru: '“Defne ve Funda Mersin’e koca yemiş bulmaya gitti” kodu hangi bitki örtüsünü verir?',
    yerler: [{ ad: 'Akdeniz maki kuşağı', lat: 36.60, lng: 31.50 }],
    uyeler: ['Defne', 'Funda', 'Mersin', 'Kocayemiş', 'Zeytin', 'Keçiboynuzu'],
    kacaklar: ['Kekik', 'Lavanta', 'Sarıçam', 'Doğu ladini', 'Kayın']
  },

  {
    id: 'hk_garik',
    bolum: 'toprak',
    ikon: '🌾',
    baslik: 'Garibanın evine gül gitmez',
    konu: 'Garig (bodur çalılar)',
    hikaye: '[[Garik|Garig — bodur çalı örtüsü]] aslında “[[garibanlar|Makinin tahribiyle oluşan cılız örtü]]”dır. Garibanın evine gül gitmez; yemekte kullansınlar diye [[kekik, nane, lavanta|Garig türleri]] gider.',
    puf: 'GARİG = “gariban” = makinin tahribiyle oluşan BODUR, cılız çalı örtüsü. Türleri: kekik, lavanta, nane, yasemin, çakaleriği… Akdeniz’de makinin üst sınırında görülür.',
    cevap: 'Garig (bodur çalılar)',
    soru: '“Garibanın evine gül değil kekik gider” kodu hangi bitki örtüsünü verir?',
    uyeler: ['Kekik', 'Lavanta', 'Nane', 'Yasemin'],
    kacaklar: ['Defne', 'Kocayemiş', 'Mersin', 'Zeytin']
  },

  {
    id: 'hk_pseudomaki',
    bolum: 'toprak',
    ikon: '🤥',
    baslik: 'Pis maki (yalancı maki)',
    konu: 'Psödomaki',
    hikaye: '[[“Pis maki”|Psödomaki — yalancı maki]] Karadeniz’de [[ormanın tahribiyle|Ormanların tahrip edildiği alanlarda oluşur]] ortaya çıkan çalılardır. Gerçek makiler [[Akdeniz’dedir|Makinin asıl vatanı]]; Karadeniz’de maki olduğunu iddia eden [[yalan söylüyordur|“Yalancı maki” adının kaynağı]].',
    puf: 'PSÖDOMAKİ = yalancı maki = KARADENİZ’de orman tahribi sonrası oluşan çalı örtüsü. Gerçek maki AKDENİZ’dedir; psödomaki kışın yaprağını döken türler de içerir.',
    cevap: 'Psödomaki (yalancı maki)',
    soru: '“Pis maki” kodu hangi bitki örtüsünü ve hangi bölgeyi verir?',
    yerler: [{ ad: 'Karadeniz kıyı kuşağı', lat: 41.20, lng: 37.50 }]
  },

  /* ══════════════════════════════════════════════════════════════════
   * ⛏️ 7. MADENLER VE ENERJİ KAYNAKLARI
   * ══════════════════════════════════════════════════════════════════ */

  {
    id: 'hk_demir',
    bolum: 'madenler',
    ikon: '🧲',
    baslik: 'Divriği Demiri, Hekim Hasan’ı kurtardı',
    konu: 'Demir yatakları',
    hikaye: '[[Divriği Demiri|Sivas – Divriği: Türkiye’nin en zengin demir yatağı]] diye tekrarla. Sonra [[Kangal köpeği|Sivas – Kangal]] dişleriyle kovalarken [[Hekim Hasan|Malatya – Hekimhan ve Hasançelebi demir yatakları]] gelip kurtarıyor; olay [[Karakaya ve Keban|Fırat üzerindeki barajlar — aynı yöre]] barajlarının yanında geçiyor.',
    puf: 'DEMİR: SİVAS–DİVRİĞİ (en zengin), MALATYA–HEKİMHAN & HASANÇELEBİ, ayrıca Kayseri–Attepe. İşlendiği yerler: Karabük, Ereğli (Zonguldak), İskenderun.',
    cevap: 'Demir',
    soru: '“Divriği Demiri” ve “Hekim Hasan” kodları hangi madeni verir?',
    yerler: [
      { ad: 'Divriği (Sivas)', lat: 39.37, lng: 38.12 },
      { ad: 'Hekimhan (Malatya)', lat: 38.82, lng: 37.93 },
      { ad: 'Hasançelebi (Malatya)', lat: 38.95, lng: 37.80 },
      { ad: 'Keban Barajı', lat: 38.80, lng: 38.75 },
      { ad: 'Karakaya Barajı', lat: 38.23, lng: 38.90 }
    ],
    uyeler: ['Divriği', 'Hekimhan', 'Hasançelebi', 'Attepe'],
    kacaklar: ['Küre', 'Guleman', 'Seydişehir', 'Kırka']
  },

  {
    id: 'hk_bakir',
    bolum: 'madenler',
    ikon: '🟠',
    baslik: 'Deli Bekir’in küresi',
    konu: 'Bakır yatakları',
    hikaye: '[[Deli Bekir|Bakır]] sürekli [[Samsun sigarası|Samsun — bakırın işlendiği (izabe) yer]] içtiği için delirmiştir. Deli Bekir bir [[kürenin|Küre — Kastamonu]] içine [[mor gül|Murgul — Artvin]], [[çay|Çayeli — Rize]] ve [[maden suyu|Maden — Elazığ]] dökerek şifre üçgenini tamamlar.',
    puf: 'BAKIR: KÜRE (Kastamonu), MURGUL (Artvin), ÇAYELİ (Rize), MADEN (Elazığ), Siirt–Madenköy. İzabe (işleme): SAMSUN. “Deli Bekir” = BAKIR.',
    cevap: 'Bakır',
    soru: '“Deli Bekir Samsun içiyor” kodu hangi madeni verir?',
    yerler: [
      { ad: 'Küre (Kastamonu)', lat: 41.80, lng: 33.70 },
      { ad: 'Murgul (Artvin)', lat: 41.30, lng: 41.55 },
      { ad: 'Çayeli (Rize)', lat: 41.09, lng: 40.73 },
      { ad: 'Maden (Elazığ)', lat: 38.39, lng: 39.68 },
      { ad: 'Samsun (izabe)', lat: 41.29, lng: 36.33 }
    ],
    uyeler: ['Küre', 'Murgul', 'Çayeli', 'Maden (Elazığ)'],
    kacaklar: ['Divriği', 'Kırka', 'Seydişehir', 'Mazıdağı']
  },

  {
    id: 'hk_krom',
    bolum: 'madenler',
    ikon: '✨',
    baslik: 'Kro Orhan: bana gulemezsiniz',
    konu: 'Krom yatakları',
    hikaye: '[[Kro Orhan|Krom — Orhaneli/Bursa]] karakteri bu kodun kahramanı. Bu krolar ülkemizde çok fazladır ve [[dışarıya satılır|Krom ihraç ürünümüzdür]]. [[Guleman’dakiler|Guleman — Elazığ]] ona “bana gulemezsiniz” diye bağırınca, Orhan “[[kop gel!|Kopdağı — Bayburt/Erzurum]]” diyerek meydan okur.',
    puf: 'KROM: ORHANELİ (Bursa), GULEMAN (Elazığ), KOPDAĞI (Bayburt/Erzurum), ayrıca Fethiye–Köyceğiz. Ferrokrom tesisleri Elazığ ve Antalya’dadır; krom ihraç edilir.',
    cevap: 'Krom',
    soru: '“Kro Orhan bana gulemezsiniz” kodu hangi madeni verir?',
    yerler: [
      { ad: 'Orhaneli (Bursa)', lat: 39.91, lng: 28.99 },
      { ad: 'Guleman (Elazığ)', lat: 38.50, lng: 39.65 },
      { ad: 'Kopdağı (Bayburt)', lat: 40.05, lng: 40.35 },
      { ad: 'Fethiye-Köyceğiz', lat: 36.85, lng: 28.85 }
    ],
    uyeler: ['Orhaneli', 'Guleman', 'Kopdağı', 'Fethiye'],
    kacaklar: ['Divriği', 'Küre', 'Sorgun', 'Keçiborlu']
  },

  {
    id: 'hk_boksit',
    bolum: 'madenler',
    ikon: '🥊',
    baslik: 'Seyit Onbaşı, Muhammed Ali ile boks yapıyor',
    konu: 'Boksit (alüminyum) yatakları',
    hikaye: '[[Seyit Onbaşı|Seydişehir — Konya]], dev cüsseli [[Muhammed Ali|Alüminyum]] ile [[boks|Boksit]] yaparken onu [[aksak|Akseki — Antalya]] bırakmıştır. Muhammed Ali ise [[miller öteden|Milas — Muğla]] gelip “[[benim payımı verin|Payas — Hatay]], siz [[korkaksınız|Kokaksu — Antalya/Alanya]]!” diye bağırmıştır.',
    puf: 'BOKSİT: SEYDİŞEHİR (Konya — alüminyum tesisi burada), AKSEKİ (Antalya), MİLAS (Muğla), PAYAS (Hatay), KOKAKSU. Boksit → ALÜMİNYUM hammaddesidir.',
    cevap: 'Boksit (alüminyum)',
    soru: '“Seyit Onbaşı, Muhammed Ali ile boks yapıyor” kodu hangi madeni verir?',
    yerler: [
      { ad: 'Seydişehir (Konya)', lat: 37.42, lng: 31.85 },
      { ad: 'Akseki (Antalya)', lat: 37.05, lng: 31.79 },
      { ad: 'Milas (Muğla)', lat: 37.32, lng: 27.78 },
      { ad: 'Payas (Hatay)', lat: 36.75, lng: 36.22 }
    ],
    uyeler: ['Seydişehir', 'Akseki', 'Milas', 'Payas'],
    kacaklar: ['Guleman', 'Divriği', 'Kırka', 'Mazıdağı']
  },

  {
    id: 'hk_bor',
    bolum: 'madenler',
    ikon: '🧥',
    baslik: 'Bol hırkalı Seyit Gazi',
    konu: 'Bor yatakları',
    hikaye: '[[Bol hırka|Bor]] giyen [[Seyit Gazi|Seyitgazi — Eskişehir]], kışın üşümemek için [[Kırka’da|Kırka — Eskişehir, dünyanın en büyük bor yatağı]] oturur. [[Emet|Emet — Kütahya]] ile et keserken [[Kestelek|Kestelek — Bursa]] devreye girer; [[Mustafa Kemal Paşa|Mustafakemalpaşa — Bursa]] uzaktan izleyip “[[bi gadiç|Bigadiç — Balıkesir]] içki içiyor mu?” diye kontrol eder.',
    puf: 'BOR: KIRKA & SEYİTGAZİ (Eskişehir), EMET (Kütahya), BİGADİÇ (Balıkesir), KESTELEK & MUSTAFAKEMALPAŞA (Bursa). Dünya bor rezervinin yaklaşık %73’ü Türkiye’dedir.',
    cevap: 'Bor',
    soru: '“Bol hırkalı Seyit Gazi” kodu hangi madeni verir?',
    yerler: [
      { ad: 'Kırka (Eskişehir)', lat: 39.28, lng: 30.52 },
      { ad: 'Seyitgazi (Eskişehir)', lat: 39.45, lng: 30.70 },
      { ad: 'Emet (Kütahya)', lat: 39.34, lng: 29.25 },
      { ad: 'Bigadiç (Balıkesir)', lat: 39.39, lng: 28.13 },
      { ad: 'Kestelek (Bursa)', lat: 39.95, lng: 28.75 },
      { ad: 'Mustafakemalpaşa (Bursa)', lat: 40.03, lng: 28.41 }
    ],
    uyeler: ['Kırka', 'Seyitgazi', 'Emet', 'Bigadiç', 'Kestelek', 'Mustafakemalpaşa'],
    kacaklar: ['Divriği', 'Küre', 'Guleman', 'Keçiborlu', 'Mazıdağı']
  },

  {
    id: 'hk_linyit',
    bolum: 'madenler',
    ikon: '🐕',
    baslik: 'Kovalayan “it” hikâyesi',
    konu: 'Linyit yatakları',
    hikaye: 'Kovalayan bir [[it|Linyit]] var. [[Afşin|Afşin-Elbistan — Kahramanmaraş, en büyük linyit havzası]] adında elbiseli bir kızı kovalıyor. [[Tunç bilekli|Tunçbilek — Kütahya]] kahramanlarımız [[Orhan|Orhaneli — Bursa]] ve [[Seyit Ömer|Seyitömer — Kütahya]], [[çayırlarda|Çayırhan — Ankara]] [[tavşanıyla|Tavşanlı — Kütahya]] birlikte onu kurtarır. Bu sırada [[çanlar|Çan — Çanakkale]] çalar. Kız korkuyla “[[sorma ne haldeyim|Soma — Manisa]]” deyip [[yatağına|Yatağan — Muğla]] gider.',
    puf: 'LİNYİT: AFŞİN-ELBİSTAN (K.Maraş, en büyük), SOMA (Manisa), TUNÇBİLEK & SEYİTÖMER & TAVŞANLI (Kütahya), ORHANELİ (Bursa), ÇAYIRHAN (Ankara), ÇAN (Çanakkale), YATAĞAN (Muğla). Termik santrallerin ana yakıtıdır.',
    cevap: 'Linyit',
    soru: '“Kovalayan it” hikâyesi hangi enerji kaynağını verir?',
    yerler: [
      { ad: 'Afşin-Elbistan (K.Maraş)', lat: 38.28, lng: 36.90 },
      { ad: 'Tunçbilek (Kütahya)', lat: 39.55, lng: 29.45 },
      { ad: 'Seyitömer (Kütahya)', lat: 39.55, lng: 29.90 },
      { ad: 'Tavşanlı (Kütahya)', lat: 39.55, lng: 29.50 },
      { ad: 'Orhaneli (Bursa)', lat: 39.91, lng: 28.99 },
      { ad: 'Çayırhan (Ankara)', lat: 40.13, lng: 31.63 },
      { ad: 'Çan (Çanakkale)', lat: 40.03, lng: 27.05 },
      { ad: 'Soma (Manisa)', lat: 39.19, lng: 27.61 },
      { ad: 'Yatağan (Muğla)', lat: 37.34, lng: 28.14 }
    ],
    uyeler: ['Afşin-Elbistan', 'Soma', 'Tunçbilek', 'Seyitömer', 'Çayırhan', 'Çan', 'Yatağan', 'Orhaneli'],
    kacaklar: ['Zonguldak', 'Divriği', 'Kırka', 'Guleman', 'Mazıdağı']
  },

  {
    id: 'hk_fosfat',
    bolum: 'madenler',
    ikon: '🐎',
    baslik: 'Fosfat atlar mazı yer',
    konu: 'Fosfat yatakları',
    hikaye: '[[Fosfat atlar|Fosfat]] ne yer? [[Mardin Mazıdağı’nda|Mazıdağı — Mardin]] mazı yer. Atların dışkısı gübre olduğu için fosfat da [[gübre yapımında|Fosfatın kullanım alanı]] kullanılır.',
    puf: 'FOSFAT: MARDİN–MAZIDAĞI (tek önemli yatağımız). Kullanım alanı: GÜBRE sanayii.',
    cevap: 'Fosfat',
    soru: '“Fosfat atlar mazı yer” kodu hangi madeni ve hangi yeri verir?',
    yerler: [{ ad: 'Mazıdağı (Mardin)', lat: 37.47, lng: 40.48 }]
  },

  {
    id: 'hk_civa',
    bolum: 'madenler',
    ikon: '🌡️',
    baslik: 'Burnu düşen adam bedelini ödemiş',
    konu: 'Cıva yatakları',
    hikaye: 'Cıva zehirli olduğu için karakterin [[burnu düşmüş|Karaburun — İzmir]] ve bu tehlikeli madeni kullanmanın bedelini [[ödemiş|Ödemiş — İzmir]]tir.',
    puf: 'CIVA: KARABURUN ve ÖDEMİŞ (İzmir), ayrıca Konya–Sızma. Zehirli olduğu için üretimi büyük ölçüde durdurulmuştur.',
    cevap: 'Cıva',
    soru: '“Burnu düşmüş, bedelini ödemiş” kodu hangi madeni verir?',
    yerler: [
      { ad: 'Karaburun (İzmir)', lat: 38.64, lng: 26.51 },
      { ad: 'Ödemiş (İzmir)', lat: 38.23, lng: 27.97 }
    ]
  },

  {
    id: 'hk_kukurt',
    bolum: 'madenler',
    ikon: '🐐',
    baslik: 'Keçinin kürkü kalın olur',
    konu: 'Kükürt yatakları',
    hikaye: '[[Keçinin kürkü|Keçiborlu — Isparta]] kalın olur; işte [[kükürt|Kükürt]] de oradadır.',
    puf: 'KÜKÜRT: KEÇİBORLU (Isparta). “Keçi + kürk” → Keçiborlu + kükürt.',
    cevap: 'Kükürt',
    soru: '“Keçinin kürkü” kodu hangi madeni ve hangi ilçeyi verir?',
    yerler: [{ ad: 'Keçiborlu (Isparta)', lat: 37.94, lng: 30.30 }]
  },

  {
    id: 'hk_wolfram',
    bolum: 'madenler',
    ikon: '🐺',
    baslik: 'Uludağ’daki wolf',
    konu: 'Volfram (tungsten)',
    hikaye: '[[Uludağ’da|Uludağ — Bursa]] yaşayan vahşi bir [[wolf (kurt)|Volfram / Tungsten]] var. Kelimenin kendisi madenin adını veriyor.',
    puf: 'VOLFRAM (tungsten): ULUDAĞ (Bursa). Çok yüksek erime sıcaklığı nedeniyle ampul teli ve sert alaşımlarda kullanılır.',
    cevap: 'Volfram (Tungsten)',
    soru: '“Uludağ’daki wolf” kodu hangi madeni verir?',
    yerler: [{ ad: 'Uludağ (Bursa)', lat: 40.09, lng: 29.13 }]
  },

  {
    id: 'hk_barit',
    bolum: 'madenler',
    ikon: '💥',
    baslik: 'Sondajda barut patladı',
    konu: 'Barit yatakları',
    hikaye: 'Sondaj vururken [[barut|Barit]] kullanıyoruz. Siz işi ciddiye almayıp [[şarkı|Şarkikaraağaç — Isparta]] söyleyince patlama oluyor; ben [[gazi|Gazipaşa — Antalya]] oluyorum ve “[[Alanya!|Alanya — Antalya]] Elim koptu!” diye bağırıyorum.',
    puf: 'BARİT: ŞARKİKARAAĞAÇ (Isparta), GAZİPAŞA & ALANYA (Antalya). Petrol sondajlarında çamur ağırlaştırıcı olarak kullanılır.',
    cevap: 'Barit',
    soru: '“Sondajda barut patladı” kodu hangi madeni verir?',
    yerler: [
      { ad: 'Şarkikaraağaç (Isparta)', lat: 38.08, lng: 31.37 },
      { ad: 'Gazipaşa (Antalya)', lat: 36.27, lng: 32.32 },
      { ad: 'Alanya (Antalya)', lat: 36.54, lng: 31.99 }
    ]
  },

  {
    id: 'hk_asbest',
    bolum: 'madenler',
    ikon: '🔥',
    baslik: 'Yanmamak için abdest al',
    konu: 'Asbest (amyant)',
    hikaye: 'Yanmamak için [[abdest|Asbest / Amyant]] almak gerekir: asbest [[yüksek ısıya dayanıklıdır|Isıya dayanıklılık — asbestin kullanım sebebi]]. Ama akciğerlerde [[astım ve hastalık|Kanserojen olduğu için kullanımı yasaklandı]] yaptığı için yasaklanmıştır.',
    puf: 'ASBEST (AMYANT) = “abdest”. Isıya son derece dayanıklıdır ama kanserojendir; kullanımı yasaklanmıştır.',
    cevap: 'Asbest (Amyant)',
    soru: '“Yanmamak için abdest al” kodu hangi madeni verir?'
  },

  {
    id: 'hk_toryum_uranyum',
    bolum: 'madenler',
    ikon: '☢️',
    baslik: 'Eski torbalar ve “ulan” sorgusu',
    konu: 'Toryum ve Uranyum (nükleer hammaddeler)',
    hikaye: '[[Eski torbalar|Toryum — Eskişehir]] [[sivri hisarla|Sivrihisar — Eskişehir]] delinir. Uranyum içinse “[[Ulan!|Uranyum]]” deyip şüphelileri [[sorguya|Sorgun — Yozgat]] çekiyoruz.',
    puf: 'TORYUM: ESKİŞEHİR–SİVRİHİSAR (dünya rezervinin önemli bir kısmı Türkiye’dedir). URANYUM: YOZGAT–SORGUN, ayrıca Manisa–Köprübaşı. İkisi de nükleer enerji hammaddesidir.',
    cevap: 'Toryum ve Uranyum',
    soru: '“Eski torbalar sivri hisarla delinir” ve “ulan, sorguya çek” kodları hangi madenleri verir?',
    yerler: [
      { ad: 'Sivrihisar (Eskişehir)', lat: 39.45, lng: 31.53 },
      { ad: 'Sorgun (Yozgat)', lat: 39.81, lng: 35.19 }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════
   * 🚪 8. GEÇİTLER, SINIR KAPILARI VE KÖRFEZLER
   * ══════════════════════════════════════════════════════════════════ */

  {
    id: 'hk_akdeniz_gecitleri',
    bolum: 'gecitler',
    ikon: '🍗',
    baslik: 'Çubukla sert tavuğu gülerek beline vur',
    konu: 'Akdeniz geçitleri (batıdan doğuya)',
    hikaye: '“[[Çubukla|Çubuk Geçidi — Antalya]] beraber [[sert|Sertavul Geçidi — Karaman/Mersin]] bir tavuğu [[gülerek|Gülek Geçidi — Mersin/Niğde]] [[beline|Belen Geçidi — Hatay]] vurup” pişirmeye hazırlanıyoruz.',
    puf: 'Akdeniz geçitleri batıdan doğuya: ÇUBUK – SERTAVUL – GÜLEK – BELEN. Gülek Boğazı (Toros geçidi) Çukurova ile İç Anadolu’yu bağlayan en işlek geçittir.',
    cevap: 'Akdeniz geçitleri',
    soru: '“Çubukla sert tavuğu gülerek beline vur” kodu hangi geçitleri sıralar?',
    yerler: [
      { ad: 'Çubuk Geçidi (Antalya)', lat: 37.15, lng: 30.55 },
      { ad: 'Sertavul Geçidi', lat: 36.90, lng: 33.30 },
      { ad: 'Gülek Geçidi', lat: 37.28, lng: 34.75 },
      { ad: 'Belen Geçidi (Hatay)', lat: 36.49, lng: 36.20 }
    ],
    sira: {
      baslik: 'Akdeniz geçitlerini batıdan doğuya diz',
      yon: 'Batıdan doğuya',
      ogeler: ['Çubuk', 'Sertavul', 'Gülek', 'Belen']
    },
    uyeler: ['Çubuk Geçidi', 'Sertavul Geçidi', 'Gülek Geçidi', 'Belen Geçidi'],
    kacaklar: ['Zigana Geçidi', 'Kop Geçidi', 'Ecevit Geçidi', 'Sertavul Boğazı']
  },

  {
    id: 'hk_kapi_bulgaristan',
    bolum: 'gecitler',
    ikon: '🇧🇬',
    baslik: 'Bulgarlar kapıda köle olacaktı',
    konu: 'Bulgaristan sınır kapıları',
    hikaye: '[[Bulgarlar|Bulgaristan sınırı]] kapıda [[köle|Kapıkule — Edirne]] olacaklardı. [[Hamza|Hamzabeyli — Edirne]], derenin kenarındaki [[köyün|Dereköy — Kırklareli]] kapısında bulgur yiyordu.',
    puf: 'BULGARİSTAN kapıları: KAPIKULE (Edirne — Türkiye’nin en işlek kara kapısı), HAMZABEYLİ (Edirne), DEREKÖY (Kırklareli).',
    cevap: 'Bulgaristan sınır kapıları',
    soru: '“Bulgarlar kapıda köle olacaktı” kodu hangi ülkenin kapılarını verir?',
    yerler: [
      { ad: 'Kapıkule (Edirne)', lat: 41.72, lng: 26.35 },
      { ad: 'Hamzabeyli (Edirne)', lat: 41.87, lng: 26.60 },
      { ad: 'Dereköy (Kırklareli)', lat: 41.90, lng: 27.25 }
    ],
    uyeler: ['Kapıkule', 'Hamzabeyli', 'Dereköy'],
    kacaklar: ['İpsala', 'Habur', 'Sarp', 'Gürbulak']
  },

  {
    id: 'hk_kapi_yunanistan',
    bolum: 'gecitler',
    ikon: '🇬🇷',
    baslik: 'İple sallandıracağız',
    konu: 'Yunanistan sınır kapısı',
    hikaye: 'Yaramazlık yapanları [[iple sallandıracağız|İpsala — Edirne, Yunanistan sınır kapısı]]; demiryoluyla gidenleri de [[uzun bir köprüden|Uzunköprü — Edirne, demiryolu kapısı]] geçirip [[Yunanlılara|Yunanistan sınırı]] teslim edeceğiz.',
    puf: 'YUNANİSTAN kapısı: İPSALA (Edirne). Ayrıca Uzunköprü demiryolu kapısı vardır.',
    cevap: 'İpsala',
    soru: '“İple sallandıracağız” kodu hangi sınır kapısını verir?',
    yerler: [{ ad: 'İpsala (Edirne)', lat: 40.92, lng: 26.38 }]
  },

  {
    id: 'hk_kapi_iran',
    bolum: 'gecitler',
    ikon: '🇮🇷',
    baslik: 'Esip gürleyen komşu',
    konu: 'İran sınır kapısı',
    hikaye: 'Esip [[gürleyen|Gürbulak — Ağrı/Doğubayazıt]] komşumuz İran’ın kapısı [[Gürbulak|İran sınır kapısı]]tır.',
    puf: 'İRAN kapısı: GÜRBULAK (Ağrı–Doğubayazıt). Ayrıca Van–Kapıköy demiryolu kapısı ve Esendere (Hakkâri) vardır.',
    cevap: 'Gürbulak',
    soru: '“Esip gürleyen komşu” kodu hangi sınır kapısını verir?',
    yerler: [{ ad: 'Gürbulak (Ağrı)', lat: 39.55, lng: 44.42 }]
  },

  {
    id: 'hk_kapi_irak',
    bolum: 'gecitler',
    ikon: '🇮🇶',
    baslik: 'Irak değil, hemen Haburda',
    konu: 'Irak sınır kapısı',
    hikaye: '[[Irak (uzak) değil|Kelime oyunu: Irak = uzak]], hemen [[Haburda|Habur — Şırnak/Silopi]].',
    puf: 'IRAK kapısı: HABUR (Şırnak–Silopi). Türkiye’nin güneydoğudaki en yoğun ticaret kapısıdır.',
    cevap: 'Habur',
    soru: '“Irak değil, hemen Haburda” kodu hangi sınır kapısını verir?',
    yerler: [{ ad: 'Habur (Şırnak)', lat: 37.20, lng: 42.42 }]
  },

  {
    id: 'hk_kapi_azerbaycan',
    bolum: 'gecitler',
    ikon: '🇦🇿',
    baslik: 'Dilimizin ucu birdir',
    konu: 'Azerbaycan (Nahçıvan) sınır kapısı',
    hikaye: '[[Dilimizin ucu|Dilucu — Iğdır, Nahçıvan sınır kapısı]] birdir; [[aynı dili konuşuyoruz|Azerbaycan (Nahçıvan) sınırı]]. Bu kapı [[Iğdır’dadır|Kapının bulunduğu il]] ve Azerbaycan’a açılan [[tek kara kapımızdır|Türkiye’nin Azerbaycan’a tek kara sınırı]].',
    puf: 'AZERBAYCAN (NAHÇIVAN) kapısı: DİLUCU (Iğdır). Türkiye’nin Azerbaycan’a açılan tek kara kapısıdır (Nahçıvan Özerk Cumhuriyeti).',
    cevap: 'Dilucu',
    soru: '“Dilimizin ucu birdir” kodu hangi sınır kapısını verir?',
    yerler: [{ ad: 'Dilucu (Iğdır)', lat: 39.90, lng: 44.78 }]
  },

  {
    id: 'hk_kapi_gurcistan',
    bolum: 'gecitler',
    ikon: '🇬🇪',
    baslik: 'Sarp kayanın üstündeki gür ses',
    konu: 'Gürcistan sınır kapıları',
    hikaye: '[[Sarp|Sarp — Artvin/Hopa]] bir kayanın üzerine çıkıp [[gür sesle|Gürcistan sınırı]] bağıran Gürcüleri, [[Türk gözüyle|Türkgözü — Ardahan/Posof]] izliyoruz.',
    puf: 'GÜRCİSTAN kapıları: SARP (Artvin–Hopa, en işlek) ve TÜRKGÖZÜ (Ardahan–Posof), ayrıca Çıldır–Aktaş.',
    cevap: 'Gürcistan sınır kapıları',
    soru: '“Sarp kayanın üstündeki gür ses” kodu hangi ülkenin kapılarını verir?',
    yerler: [
      { ad: 'Sarp (Artvin)', lat: 41.52, lng: 41.55 },
      { ad: 'Türkgözü (Ardahan)', lat: 41.50, lng: 42.75 }
    ],
    uyeler: ['Sarp', 'Türkgözü', 'Aktaş (Çıldır)'],
    kacaklar: ['Habur', 'Gürbulak', 'Kapıkule', 'Dilucu']
  },

  {
    id: 'hk_ege_korfezleri',
    bolum: 'gecitler',
    ikon: '🕊️',
    baslik: 'Sarı Erdem’in çanı ve kuşu',
    konu: 'Ege körfezleri (kuzeyden güneye)',
    hikaye: '[[Sarı Erdem|Saros + Edremit Körfezleri]] elindeki [[çana|Çandarlı Körfezi]] bakıyordu. Çanın üstünde ağzında [[gül|Güllük Körfezi]] olan bir [[kuş|Kuşadası Körfezi]] vardı. Kuş, Erdem’in baktığını görünce [[göğe|Gökova Körfezi]] doğru yükselip sevgilisinin gönlünü [[fethetmeye|Fethiye Körfezi]] gitti.',
    puf: 'Ege körfezleri kuzeyden güneye: SAROS – EDREMİT – ÇANDARLI – İZMİR – KUŞADASI – GÜLLÜK – GÖKOVA – FETHİYE.',
    cevap: 'Ege körfezleri',
    soru: '“Sarı Erdem’in çanı ve kuşu” hikâyesi hangi kıyı şekillerini sıralar?',
    yerler: [
      { ad: 'Saros Körfezi', lat: 40.55, lng: 26.70 },
      { ad: 'Edremit Körfezi', lat: 39.45, lng: 26.75 },
      { ad: 'Çandarlı Körfezi', lat: 38.85, lng: 26.90 },
      { ad: 'İzmir Körfezi', lat: 38.45, lng: 26.90 },
      { ad: 'Kuşadası Körfezi', lat: 37.83, lng: 27.10 },
      { ad: 'Güllük Körfezi', lat: 37.20, lng: 27.45 },
      { ad: 'Gökova Körfezi', lat: 36.90, lng: 28.10 },
      { ad: 'Fethiye Körfezi', lat: 36.65, lng: 28.95 }
    ],
    sira: {
      baslik: 'Ege körfezlerini kuzeyden güneye diz',
      yon: 'Kuzeyden güneye',
      ogeler: ['Saros', 'Edremit', 'Çandarlı', 'İzmir', 'Kuşadası', 'Güllük', 'Gökova', 'Fethiye']
    },
    siraNot: 'Tekerlemede “gül” (Güllük) “kuş”tan (Kuşadası) önce geçer; haritada ise Kuşadası daha KUZEYDEDİR. Ayrıca tekerlemede İZMİR Körfezi hiç anılmaz — sıralama sorusunda ikisini de unutma.',
    uyeler: ['Saros', 'Edremit', 'Çandarlı', 'İzmir', 'Kuşadası', 'Güllük', 'Gökova', 'Fethiye'],
    kacaklar: ['İskenderun Körfezi', 'Mersin Körfezi', 'Antalya Körfezi', 'İzmit Körfezi', 'Bandırma Körfezi']
  }
];

/* Küresel erişim (script etiketiyle yüklenen diğer modüller için) */
if (typeof window !== 'undefined') {
  window.HAFIZA_BOLUMLERI = HAFIZA_BOLUMLERI;
  window.HAFIZA_KODLARI = HAFIZA_KODLARI;
}
