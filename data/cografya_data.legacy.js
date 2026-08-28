/**
 * KPSS Coğrafya Yer Şekilleri Veri Tabanı
 * Her kayıt; benzersiz id, isim, kategori, alt tür (tip), koordinat [enlem, boylam],
 * bölge ve KPSS sınavına yönelik kısa ve can alıcı 'kpssNot' bilgisini barındırır.
 */

/**
 * Türkçe-güvenli karşılaştırma yardımcısı.
 * JS'in varsayılan toLowerCase'i "İ" harfini "i + U+0307" (birleşik nokta)
 * yapar; bu yüzden ("İhraç").toLowerCase().includes("ihraç") FALSE döner.
 * Bu fonksiyon harfleri ASCII'ye indirger, böylece filtreler sessizce
 * başarısız olmaz.
 */
function trLower(str) {
  return String(str || '')
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .replace(/ı/g, 'i')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Türkçe-güvenli BÜYÜK harf. JS'in toUpperCase'i "i" harfini "I" yapar,
 * oysa Türkçede "İ" olmalıdır ("volkanik" -> "VOLKANİK", "VOLKANIK" değil).
 */
function trUpper(str) {
  return String(str || '').replace(/i/g, 'İ').replace(/ı/g, 'I').toUpperCase();
}

const COGRAFYA_DATA = {
  daglar: [
    // --- VOLKANİK DAĞLAR ---
    {
      id: "dag_agri",
    groupId: 'grp_agri_dagi_zirve',
      name: "Ağrı Dağı (Büyük Ağrı)",
      category: "daglar",
      type: "Volkanik Dağ",
      lat: 39.70,
      lng: 44.30,
      region: "Doğu Anadolu",
      city: "Ağrı / Iğdır",
      kpssNot: "Türkiye'nin en yüksek dağıdır (5.137 m). Zirvesinde güncel takke buzulu bulunur. Sönmüş volkandır."
    },
    {
      id: "dag_kucuk_agri",
    groupId: 'grp_agri_dagi_zirve',
      name: "Küçük Ağrı Dağı",
      category: "daglar",
      type: "Volkanik Dağ",
      lat: 39.63,
      lng: 44.40,
      region: "Doğu Anadolu",
      city: "Ağrı / Iğdır",
      kpssNot: "Büyük Ağrı'nın güneydoğusunda yer alan volkanik konidir."
    },
    {
      id: "dag_tendurek",
      name: "Tendürek Dağı",
      category: "daglar",
      type: "Volkanik Dağ",
      lat: 39.35,
      lng: 43.87,
      region: "Doğu Anadolu",
      city: "Ağrı - Van",
      kpssNot: "Kraterinden halen gaz ve su buharı çıkışları görülen genç volkandır."
    },
    {
      id: "dag_suphan",
      name: "Süphan Dağı",
      category: "daglar",
      type: "Volkanik Dağ",
      lat: 38.93,
      lng: 42.82,
      region: "Doğu Anadolu",
      city: "Bitlis - Van",
      kpssNot: "Van Gölü'nün kuzeyinde yer alır. Türkiye'nin 3. yüksek zirvesidir. Buzul kalıntıları vardır."
    },
    {
      id: "dag_nemrut",
    groupId: 'grp_nemrut_kommagene_adiyaman',
      name: "Nemrut Dağı (Bitlis)",
      category: "daglar",
      type: "Volkanik Dağ",
      lat: 38.62,
      lng: 42.23,
      region: "Doğu Anadolu",
      city: "Bitlis (Tatvan)",
      kpssNot: "En son 1441'de faaliyete geçen en genç volkanımızdır. Kalderasında Nemrut Krater Gölü bulunur. (Adıyaman'daki heykelli dağla karıştırma!)"
    },
    {
      id: "dag_erciyes",
    groupId: 'grp_erciyes_volkani',
      name: "Erciyes Dağı",
      category: "daglar",
      type: "Volkanik Dağ",
      lat: 38.53,
      lng: 35.45,
      region: "İç Anadolu",
      city: "Kayseri",
      kpssNot: "İç Anadolu'nun en yüksek dağı (3.917 m). Kapadokya tüflerinin oluşmasında baş aktördür. Kış turizmi gelişmiştir."
    },
    {
      id: "dag_hasan",
      name: "Hasan Dağı",
      category: "daglar",
      type: "Volkanik Dağ",
      lat: 38.13,
      lng: 34.17,
      region: "İç Anadolu",
      city: "Aksaray - Niğde",
      kpssNot: "Aksaray-Niğde sınırında yer alan çift tepeli stratovolkandır."
    },
    {
      id: "dag_melendiz",
      name: "Melendiz Dağı",
      category: "daglar",
      type: "Volkanik Dağ",
      lat: 38.07,
      lng: 34.62,
      region: "İç Anadolu",
      city: "Niğde",
      kpssNot: "Niğde sınırlarında, Hasan Dağı ile Erciyes arasında uzanan volkanik kütledir."
    },
    {
      id: "dag_karacadag_ic",
      name: "Karacadağ (İç Anadolu)",
      category: "daglar",
      type: "Volkanik Dağ",
      lat: 37.80,
      lng: 33.48,
      region: "İç Anadolu",
      city: "Konya",
      kpssNot: "Konya Ovası'nın doğusunda yer alan sönmüş volkanik dağ."
    },
    {
      id: "dag_karadag",
    groupId: 'grp_batman_petrol_kompleksi',
      name: "Karadağ (Karaman)",
      category: "daglar",
      type: "Volkanik Dağ",
      lat: 37.40,
      lng: 33.15,
      region: "İç Anadolu",
      city: "Karaman",
      kpssNot: "Karaman'ın kuzeyinde yükselen volkanik dağdır."
    },
    {
      id: "dag_karacadag_gd",
      name: "Karacadağ (Güneydoğu)",
      category: "daglar",
      type: "Volkanik Dağ (Kalkan Volkan)",
      lat: 37.67,
      lng: 39.83,
      region: "Güneydoğu Anadolu",
      city: "Diyarbakır - Şanlıurfa",
      kpssNot: "Lavları çok akıcı olduğu için geniş alana yayılan, Türkiye'nin tek 'Kalkan Biçimli' volkanıdır. Diyarbakır-Şanlıurfa arasındadır."
    },
    {
      id: "dag_kula",
      name: "Kula Volkanları (Divlit)",
      category: "daglar",
      type: "Volkanik Saha / Jeopark",
      lat: 38.58,
      lng: 28.52,
      region: "Ege",
      city: "Manisa (Kula)",
      kpssNot: "Türkiye'nin en genç volkanik arazisidir. 'Yanık Ülke (Katakekaumene)' olarak bilinir. Türkiye'nin ilk UNESCO Jeoparkıdır."
    },

    // --- KIRIK DAĞLAR (HORST SIRALARI) ---
    {
      id: "dag_kaz",
      name: "Kaz Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [39.60, 26.50],
        [39.70, 26.85],
        [39.75, 27.20]
      ],
      lat: 39.70,
      lng: 26.85,
      type: "Kırık Dağ (Horst)",
      region: "Ege / Marmara",
      city: "Balıkesir - Çanakkale",
      kpssNot: "Edremit Körfezi kuzeyindedir. Yüksek oksijen oranı ve milli parkı ile bilinir. Kırık dağdır."
    },
    {
      id: "dag_madra",
      name: "Madra Dağı",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [39.20, 26.85],
        [39.30, 27.05],
        [39.40, 27.25]
      ],
      lat: 39.30,
      lng: 27.05,
      type: "Kırık Dağ (Horst)",
      region: "Ege",
      city: "Balıkesir - İzmir",
      kpssNot: "Bakırçay Grabeni'nin kuzeyinde yer alan horst dağdır."
    },
    {
      id: "dag_yunt",
      name: "Yunt Dağı",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [38.80, 27.10],
        [38.90, 27.30],
        [39.00, 27.50]
      ],
      lat: 38.90,
      lng: 27.30,
      type: "Kırık Dağ (Horst)",
      region: "Ege",
      city: "İzmir - Manisa",
      kpssNot: "Bakırçay ile Gediz grabenleri arasında yükselen horst dağıdır."
    },
    {
      id: "dag_bozdaglar",
      name: "Bozdağlar",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [38.25, 27.70],
        [38.35, 28.10],
        [38.45, 28.50]
      ],
      lat: 38.35,
      lng: 28.10,
      type: "Kırık Dağ (Horst)",
      region: "Ege",
      city: "İzmir - Manisa",
      kpssNot: "Gediz ile Küçük Menderes grabenleri arasında uzanır. Kış turizmi yapılır."
    },
    {
      id: "dag_aydin",
      name: "Aydın Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [37.85, 27.70],
        [37.95, 28.10],
        [38.05, 28.60]
      ],
      lat: 37.95,
      lng: 28.10,
      type: "Kırık Dağ (Horst)",
      region: "Ege",
      kpssNot: "Küçük Menderes ile Büyük Menderes grabenleri arasında uzanan horsttur."
    },
    {
      id: "dag_mentese",
    groupId: 'grp_mentese_ekosistemi',
      name: "Menteşe Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [37.05, 27.80],
        [37.20, 28.20],
        [37.35, 28.60]
      ],
      lat: 37.20,
      lng: 28.20,
      type: "Kırık / Engebeli Dağ",
      region: "Ege",
      city: "Muğla",
      kpssNot: "Ege'de kıyıya PARALEL uzanan tek dağ grubudur. Bu yüzden bol yamaç yağışı alır, nüfusu ve ulaşımı seyrektir."
    },
    {
      id: "dag_nur_amanos",
      name: "Nur (Amanos) Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [36.30, 36.15],
        [36.75, 36.30],
        [37.10, 36.45]
      ],
      lat: 36.75,
      lng: 36.30,
      type: "Kırık Dağ (Horst)",
      region: "Akdeniz",
      kpssNot: "Ege dışındaki tek kırık (horst) dağımızdır. Doğusunda Amik Grabeni yer alır. Üzerinde Belen Geçidi bulunur."
    },

    // --- KIVRIM DAĞLARI (SIRADAĞ SİLSİLELERİ) ---
    {
      id: "dag_kackar",
    groupId: 'grp_kackar_masifi',
      name: "Kaçkar Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [40.60, 40.80],
        [40.83, 41.16],
        [41.10, 41.60]
      ],
      lat: 40.83,
      lng: 41.16,
      type: "Kıvrım Dağı",
      region: "Karadeniz",
      city: "Rize - Artvin",
      kpssNot: "Kuzey Anadolu Dağları'nın en yüksek bölümüdür (3.932 m). Zirvelerinde buzul (sirk) gölleri ve aktüel buzullar vardır."
    },
    {
      id: "dag_canik",
      name: "Canik Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [40.85, 36.10],
        [41.00, 36.60],
        [41.05, 37.20]
      ],
      lat: 41.00,
      lng: 36.60,
      type: "Kıvrım Dağı",
      region: "Karadeniz",
      city: "Samsun - Ordu",
      kpssNot: "Yükseltisi azdır ve kıyıdan geride başlar. Bu sayede Samsun'un hinterlandı geniştir ve Bafra-Çarşamba deltaları oluşmuştur."
    },
    {
      id: "dag_kure",
      name: "Küre (İsfendiyar) Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [41.60, 33.10],
        [41.70, 33.70],
        [41.80, 34.30]
      ],
      lat: 41.70,
      lng: 33.70,
      type: "Kıvrım Dağı",
      region: "Karadeniz",
      city: "Kastamonu - Bartın",
      kpssNot: "Batı Karadeniz'de kıyıya paraleldir. Bakır yatakları (Kastamonu-Küre) ve zengin ormanlarıyla bilinir."
    },
    {
      id: "dag_ilgaz",
    groupId: 'grp_ilgaz_koridoru',
      name: "Ilgaz Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [40.95, 33.30],
        [41.08, 33.73],
        [41.20, 34.15]
      ],
      lat: 41.08,
      lng: 33.73,
      type: "Kıvrım Dağı",
      region: "Karadeniz",
      city: "Kastamonu - Çankırı",
      kpssNot: "Batı Karadeniz iç kuşağındadır. Milli park ve kış turizmi alanıdır. Üzerinde Ilgaz Geçidi bulunur."
    },
    {
      id: "dag_bolu_koroglu",
      name: "Köroğlu Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [40.45, 31.40],
        [40.60, 31.80],
        [40.75, 32.20]
      ],
      lat: 40.60,
      lng: 31.80,
      type: "Kıvrım Dağı",
      region: "Karadeniz",
      kpssNot: "Batı Karadeniz iç sırasında yer alır. Kartalkaya kayak merkezi buradadır."
    },
    {
      id: "dag_cilo_hakkari",
    groupId: 'grp_cilo_buzul',
      name: "Cilo (Buzul) Dağı / Reşko",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [37.35, 43.70],
        [37.48, 44.02],
        [37.60, 44.30]
      ],
      lat: 37.48,
      lng: 44.02,
      type: "Kıvrım Dağı",
      region: "Doğu Anadolu",
      kpssNot: "Türkiye'nin ikinci en yüksek zirvesi olan Uludoruk (Reşko-4.135 m) buradadır. Türkiye'nin en büyük vadi buzulu Cilo'dadır."
    },
    {
      id: "dag_munzur_mercan",
      name: "Munzur (Mercan) Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [39.25, 39.10],
        [39.35, 39.45],
        [39.45, 39.80]
      ],
      lat: 39.35,
      lng: 39.45,
      type: "Kıvrım Dağı",
      region: "Doğu Anadolu",
      kpssNot: "Tunceli-Erzincan arasında yer alır. Karstik kaynaklar ve buzul gölleri barındırır. Milli parktır."
    },
    {
      id: "dag_bolkar",
      name: "Bolkar Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [37.05, 34.20],
        [37.25, 34.60],
        [37.45, 35.00]
      ],
      lat: 37.25,
      lng: 34.60,
      type: "Kıvrım Dağı (Orta Toroslar)",
      region: "Akdeniz",
      city: "Mersin - Niğde",
      kpssNot: "Orta Toroslar'dadır. Karstik şekiller ve buzul izleri taşır. Sadece burada yaşayan endemik Toros Kurbağası bulunur."
    },
    {
      id: "dag_aladaglar",
      name: "Aladağlar",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [37.60, 34.90],
        [37.80, 35.15],
        [38.00, 35.40]
      ],
      lat: 37.80,
      lng: 35.15,
      type: "Kıvrım Dağı (Orta Toroslar)",
      region: "Akdeniz",
      city: "Adana - Niğde - Kayseri",
      kpssNot: "Torosların en yüksek kısmıdır (Demirkazık Zirvesi). Dağcılık ve karstik kanyonlarıyla (Kapuzbaşı) ünlüdür."
    },
    {
      id: "dag_beydaglari",
      name: "Bey Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [36.40, 30.15],
        [36.60, 30.30],
        [36.80, 30.45]
      ],
      lat: 36.60,
      lng: 30.30,
      type: "Kıvrım Dağı (Batı Toroslar)",
      region: "Akdeniz",
      city: "Antalya",
      kpssNot: "Antalya Körfezi'nin batısında yükselir. Saklıkent kayak merkezi buradadır."
    },
    {
      id: "dag_geyik",
      name: "Geyik Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [36.70, 31.80],
        [36.90, 32.20],
        [37.10, 32.60]
      ],
      lat: 36.90,
      lng: 32.20,
      type: "Kıvrım Dağı (Batı Toroslar)",
      region: "Akdeniz",
      city: "Antalya - Konya",
      kpssNot: "Antalya-Konya sınırında Batı Toroslar kuşağında yer alır."
    },
    {
      id: "dag_tahtali",
      name: "Tahtalı Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [38.05, 36.00],
        [38.30, 36.30],
        [38.55, 36.60]
      ],
      lat: 38.30,
      lng: 36.30,
      type: "Kıvrım Dağı (Orta Toroslar)",
      region: "Akdeniz / İç Anadolu",
      city: "Adana - Kayseri",
      kpssNot: "Seyhan Nehri kolları tarafından yarılmış Orta Toros kütlesidir."
    },
    {
      id: "dag_binboga",
      name: "Binboğa Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [38.05, 36.40],
        [38.25, 36.70],
        [38.45, 37.00]
      ],
      lat: 38.25,
      lng: 36.70,
      type: "Kıvrım Dağı (Orta Toroslar)",
      region: "Akdeniz / Doğu Anadolu",
      city: "Kahramanmaraş - Kayseri",
      kpssNot: "Kahramanmaraş-Kayseri sınırında uzanan Toros uzantısıdır."
    },
    {
      id: "dag_yildiz",
    groupId: 'grp_yildiz_daglari',
      name: "Yıldız (Istranca) Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [
        [41.50, 27.20],
        [41.75, 27.55],
        [41.95, 28.00]
      ],
      lat: 41.75,
      lng: 27.55,
      type: "Kıvrım / Masif Dağı",
      region: "Marmara",
      kpssNot: "Marmara'nın Karadeniz kıyısındaki engebeli masif alanıdır. Ulaşım yollarına sapa kaldığı için seyrek nüfusludur."
    },
    {
      id: "dag_uludag",
    groupId: 'grp_uludag_masifi',
      name: "Uludağ",
      category: "daglar",
      lat: 40.07,
      lng: 29.22,
      type: "Derinlik Volkanizması (Batolit)",
      region: "Marmara",
      city: "Bursa",
      kpssNot: "İç püskürük (batolit) yapılıdır. Marmara'nın en yüksek dağıdır. Sirk gölleri ve kış turizmi ile ünlüdür."
    },

    {
      id: "dag_giresun",
      name: "Giresun Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [[40.4, 38.3], [40.6, 38.7], [40.8, 39.1]],
      lat: 40.6,
      lng: 38.7,
      type: "Kıvrım Dağı",
      region: "Karadeniz",
      city: "Giresun",
      kpssNot: "Doğu Karadeniz Dağları kuşağında yer alır. Nemli denizel hava kütlelerini engelleyerek kıyıda bol yağış, iç kesimde kuraklık yaratır."
    },
    {
      id: "dag_mescit",
      name: "Mescit Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [[40.35, 40.9], [40.5, 41.25], [40.65, 41.6]],
      lat: 40.5,
      lng: 41.25,
      type: "Kıvrım Dağı",
      region: "Doğu Anadolu",
      city: "Erzurum",
      kpssNot: "Çoruh Nehri ile Fırat (Karasu) havzalarını birbirinden ayıran yüksek kıvrım dağ sırasıdır."
    },
    {
      id: "dag_yalnizcam",
      name: "Yalnızçam Dağları",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [[41.05, 42.0], [41.25, 42.3], [41.45, 42.6]],
      lat: 41.25,
      lng: 42.3,
      type: "Kıvrım Dağı",
      region: "Doğu Anadolu / Karadeniz",
      city: "Ardahan - Artvin",
      kpssNot: "Karadeniz ile Doğu Anadolu (Ardahan platosu) arasında doğal set oluşturur. Yaylacılık faaliyetleri gelişmiştir."
    },
    {
      id: "dag_kop",
      name: "Kop Dağı",
      category: "daglar",
      type: "Kıvrım Dağı",
      lat: 40.03,
      lng: 40.52,
      region: "Doğu Karadeniz / Doğu Anadolu",
      city: "Bayburt - Erzurum",
      kpssNot: "Doğu Karadeniz'i Doğu Anadolu'ya bağlayan stratejik Kop Geçidi ve Kop Tüneli bu dağ üzerindedir."
    },
    {
      id: "dag_akdaglar",
      name: "Akdağlar (Batı Toroslar)",
      category: "daglar",
      shapeType: "polyline",
      coordinates: [[36.45, 29.55], [36.65, 29.7], [36.85, 29.85]],
      lat: 36.65,
      lng: 29.7,
      type: "Kıvrım Dağı (Batı Toroslar)",
      region: "Akdeniz / Ege",
      city: "Muğla - Antalya",
      kpssNot: "Teke Yarımadası'nda yükselen, karstik ve buzul aşınım şekilleri barındıran Batı Toroslar kütlesidir."
    }
  ],

  ovalar: [
    // --- DELTA OVALARI ---
    {
      id: "ova_cukurova",
    groupId: 'grp_cukurova_deltasi_havza',
      name: "Çukurova Deltası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 36.85,
      lng: 35.5,
      region: "Akdeniz",
      city: "Adana - Mersin",
      kpssNot: "Seyhan ve Ceyhan nehirlerinin oluşturduğu TÜRKİYE'NİN EN BÜYÜK DELTA OVASIDIR. Sanayi bitkileri ve yılda birden fazla ürün alınır."
    },
    {
      id: "ova_bafra",
    groupId: 'grp_bafra_deltasi',
      name: "Bafra Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 41.29,
      lng: 36.33,
      region: "Karadeniz",
      city: "Samsun (Bafra)",
      kpssNot: "Kızılırmak nehrinin Karadeniz'e döküldüğü yerde oluşturduğu delta ovasıdır."
    },
    {
      id: "ova_carsamba",
    groupId: 'grp_carsamba_deltasi',
      name: "Çarşamba Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 41.29,
      lng: 36.33,
      region: "Karadeniz",
      city: "Samsun (Çarşamba)",
      kpssNot: "Yeşilırmak nehrinin Karadeniz'e döküldüğü yerde oluşturduğu delta ovasıdır."
    },
    {
      id: "ova_silifke",
    groupId: 'grp_silifke_deltasi',
      name: "Silifke Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 36.81,
      lng: 34.63,
      region: "Akdeniz",
      city: "Mersin (Silifke)",
      kpssNot: "Göksu Nehri'nin Akdeniz'e döküldüğü yerde oluşturduğu delta ovasıdır."
    },
    {
      id: "ova_menemen",
      name: "Menemen Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 38.42,
      lng: 27.14,
      region: "Ege",
      city: "İzmir (Menemen)",
      kpssNot: "Gediz Nehri'nin İzmir Körfezi girişinde oluşturduğu deltadır (İzmir Kuş Cenneti buradadır)."
    },
    {
      id: "ova_balat",
      name: "Balat Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 37.85,
      lng: 27.84,
      region: "Ege",
      city: "Aydın (Didim)",
      kpssNot: "Büyük Menderes Nehri'nin taşıdığı alüvyonlarla oluşturduğu delta ovasıdır (Eski Milet limanını doldurmuştur)."
    },
    {
      id: "ova_selcuk",
    groupId: 'grp_efes_selcuk',
      name: "Selçuk Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 38.42,
      lng: 27.14,
      region: "Ege",
      city: "İzmir (Selçuk)",
      kpssNot: "Küçük Menderes Nehri'nin oluşturduğu deltadır (Efes antik liman kentini karada bırakmıştır)."
    },
    {
      id: "ova_dikili",
      name: "Dikili Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 38.42,
      lng: 27.14,
      region: "Ege",
      city: "İzmir (Dikili)",
      kpssNot: "Bakırçay Nehri'nin Ege Denizi kıyısında oluşturduğu küçük deltadır."
    },

    // --- KARSTİK OVALAR (POLYE / TAKKEM) ---
    {
      id: "ova_tefenni",
      name: "Tefenni Ovası",
      category: "ovalar",
      type: "Karstik Ova (Polye)",
      lat: 37.72,
      lng: 30.29,
      region: "Akdeniz (Göller Yöresi)",
      city: "Burdur (Tefenni)",
      kpssNot: "Burdur'da yer alan karstik polye ovasıdır (TAKKEM kuralının 'T' harfi)."
    },
    {
      id: "ova_acipayam",
      name: "Acıpayam Ovası",
      category: "ovalar",
      type: "Karstik Ova (Polye)",
      lat: 37.77,
      lng: 29.09,
      region: "Ege / Akdeniz",
      city: "Denizli (Acıpayam)",
      kpssNot: "Denizli sınırlarında yer alan karstik polye ovasıdır (TAKKEM kuralının 'A' harfi)."
    },
    {
      id: "ova_korkuteli",
      name: "Korkuteli Ovası",
      category: "ovalar",
      type: "Karstik Ova (Polye)",
      lat: 36.89,
      lng: 30.71,
      region: "Akdeniz",
      city: "Antalya (Korkuteli)",
      kpssNot: "Antalya'nın kuzeybatısında yer alan karstik polye ovasıdır (TAKKEM kuralının ilk 'K' harfi)."
    },
    {
      id: "ova_kestel",
      name: "Kestel Ovası",
      category: "ovalar",
      type: "Karstik Ova (Polye)",
      lat: 37.72,
      lng: 30.29,
      region: "Akdeniz",
      city: "Burdur (Kestel)",
      kpssNot: "Burdur sınırlarında yer alan karstik polye ovasıdır (TAKKEM kuralının ikinci 'K' harfi)."
    },
    {
      id: "ova_elmali",
      name: "Elmalı Ovası",
      category: "ovalar",
      type: "Karstik Ova (Polye)",
      lat: 36.89,
      lng: 30.71,
      region: "Akdeniz",
      city: "Antalya (Elmalı)",
      kpssNot: "Antalya'da Teke Yarımadası içinde yer alan yüksek karstik polye ovasıdır (TAKKEM kuralının 'E' harfi)."
    },
    {
      id: "ova_mugla",
      name: "Muğla Ovası",
      category: "ovalar",
      type: "Karstik Ova (Polye)",
      lat: 37.22,
      lng: 28.36,
      region: "Ege",
      city: "Muğla (Menteşe)",
      kpssNot: "Menteşe Yöresi'nde kireçtaşlarının erimesiyle oluşmuş karstik polye ovasıdır (TAKKEM kuralının 'M' harfi)."
    },

    // --- TEKTONİK VE İÇ OVALAR ---
    {
      id: "ova_konya",
      name: "Konya Ovası",
      category: "ovalar",
      type: "Tektonik / Eski Göl Tabanı Ovası",
      lat: 37.87,
      lng: 32.48,
      region: "İç Anadolu",
      city: "Konya",
      kpssNot: "TÜRKİYE'NİN EN BÜYÜK İÇ OVASI ve tahıl ambarıdır. Eski göl tabanı üzerinde gelişmiştir. KOP projesiyle sulanmaktadır."
    },
    {
      id: "ova_harran",
      name: "Harran (Altınbaşak) Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 37.16,
      lng: 38.79,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa (Harran)",
      kpssNot: "GAP ile Atatürk Barajı'ndan Şanlıurfa Tünelleri aracılığıyla sulanan, pamuk üretim merkezimizdir."
    },
    {
      id: "ova_igdir",
    groupId: 'grp_igdir_mikroklima',
      name: "Iğdır Ovası",
      category: "ovalar",
      type: "Tektonik / Çöküntü Ovası",
      lat: 39.92,
      lng: 44.04,
      region: "Doğu Anadolu",
      city: "Iğdır",
      kpssNot: "Çevresine göre alçakta (graben) kaldığı için MİKROKLİMA iklim görülür; Doğu Anadolu'da pamuk yetişen tek yerdir."
    },
    {
      id: "ova_amik",
      name: "Amik Ovası",
      category: "ovalar",
      type: "Tektonik Graben Ovası",
      lat: 36.2,
      lng: 36.16,
      region: "Akdeniz",
      city: "Hatay (Antakya)",
      kpssNot: "Asi Nehri'nin suladığı, Amanos Dağları ile platolar arasında yer alan verimli graben ovasıdır."
    },
    {
      id: "ova_malatya",
      name: "Malatya Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 38.35,
      lng: 38.31,
      region: "Doğu Anadolu",
      city: "Malatya",
      kpssNot: "Doğu Anadolu Fayı kuşağında verimli bir çöküntü ovasıdır. Dünyaca ünlü kayısı üretim sahasıdır."
    },
    {
      id: "ova_erbaa_niksar",
      name: "Erbaa - Niksar Ovaları",
      category: "ovalar",
      type: "Tektonik Hat Ovası (KAF)",
      lat: 40.32,
      lng: 36.55,
      region: "Karadeniz",
      city: "Tokat (Erbaa-Niksar)",
      kpssNot: "Kuzey Anadolu Fay Hattı (Kelkit Oluğu) üzerindeki verimli çöküntü ovalarıdır."
    },
    {
      id: "ova_duzce",
      name: "Düzce Ovası",
      category: "ovalar",
      type: "Tektonik Çöküntü Ovası",
      lat: 40.84,
      lng: 31.16,
      region: "Karadeniz",
      city: "Düzce",
      kpssNot: "KAF hattında yer alan, fındık ve mısır tarımı yapılan zengin alüvyal çöküntü ovasıdır."
    },
    {
      id: "ova_adapazari",
      name: "Adapazarı Ovası",
      category: "ovalar",
      type: "Tektonik / Alüvyal Ova",
      lat: 40.77,
      lng: 30.4,
      region: "Marmara",
      city: "Sakarya (Adapazarı)",
      kpssNot: "Sakarya Nehri'nin taşıdığı alüvyonlarla kaplı, KAF üzerinde yer alan sanayi ve tarım ovasıdır."
    },
    {
      id: "ova_bursa",
      name: "Bursa Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 40.19,
      lng: 29.06,
      region: "Marmara",
      city: "Bursa",
      kpssNot: "Uludağ'ın kuzey eteğinde yer alan, sanayi ve meyve/sebze tarımının yoğun olduğu ovadır."
    },

    // --- 🌋 VOLKANİK OVALAR / LAV DOLGULU OVALAR ---
    {
      id: "ova_develi",
      name: "Develi Ovası",
      category: "ovalar",
      type: "Volkanik / Lav Dolgulu Ova",
      lat: 38.73,
      lng: 35.49,
      region: "İç Anadolu",
      city: "Kayseri (Develi)",
      kpssNot: "Erciyes Dağı'ndan çıkan volkanik lav ve tüflerin çöküntü alanını doldurmasıyla oluşan tipik volkanik ovadır (Sultan Sazlığı buradadır)."
    },
    {
      id: "ova_kayseri",
      name: "Kayseri Ovası",
      category: "ovalar",
      type: "Volkanik / Tektonik Ova",
      lat: 38.73,
      lng: 35.49,
      region: "İç Anadolu",
      city: "Kayseri",
      kpssNot: "Erciyes Volkanı'nın kuzey eteklerinde volkanik tüf ve alüvyonlarla kaplı volkanik kökenli iç ovadır."
    },
    {
      id: "ova_caldiran",
      name: "Çaldıran Ovası",
      category: "ovalar",
      type: "Volkanik Ova",
      lat: 38.49,
      lng: 43.38,
      region: "Doğu Anadolu",
      city: "Van (Çaldıran)",
      kpssNot: "Tendürek Yanardağı'ndan püsküren bazaltik lavların çanağı doldurmasıyla oluşan volkanik ovadır. Türkiye'nin en soğuk yerlerinden biridir."
    },
    {
      id: "ova_muradiye",
      name: "Muradiye Ovası",
      category: "ovalar",
      type: "Volkanik / Alüvyal Ova",
      lat: 38.49,
      lng: 43.38,
      region: "Doğu Anadolu",
      city: "Van (Muradiye)",
      kpssNot: "Süphan ve Tendürek volkanizması lavları arasında oluşmuş volkanik tabanlı ovadır."
    },

    {
      id: "ova_mus",
      name: "Muş Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 38.73,
      lng: 41.49,
      region: "Doğu Anadolu",
      city: "Muş",
      kpssNot: "Doğu Anadolu Fay Hattı (DAF) üzerinde Murat Nehri vadisinde oluşmuş geniş tektonik ovadır. Muş lalesi yetişir."
    },
    {
      id: "ova_erzurum",
      name: "Erzurum Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 39.91,
      lng: 41.28,
      region: "Doğu Anadolu",
      city: "Erzurum",
      kpssNot: "Yüksek rakımlı (yaklaşık 1800 m) tektonik çöküntü ovasıdır; sert karasal iklim nedeniyle tahıl ve yem bitkileri tarımı yapılır."
    },
    {
      id: "ova_erzincan",
      name: "Erzincan Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 39.75,
      lng: 39.49,
      region: "Doğu Anadolu",
      city: "Erzincan",
      kpssNot: "Kuzey Anadolu Fay Hattı (KAF) üzerinde yer alan, deprem riski yüksek tipik tektonik çöküntü ovasıdır."
    },
    {
      id: "ova_pasinler",
      name: "Pasinler Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 39.91,
      lng: 41.28,
      region: "Doğu Anadolu",
      city: "Erzurum (Pasinler)",
      kpssNot: "Aras Nehri'nin yukarı havzasında KAF-DAF kesişim alanında yer alan termal kaynaklı tektonik ovadır."
    },
    {
      id: "ova_yuksekova",
      name: "Yüksekova",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 37.57,
      lng: 43.74,
      region: "Doğu Anadolu",
      city: "Hakkari (Yüksekova)",
      kpssNot: "Türkiye'nin en engebeli yöresi olan Hakkari'de yüksek dağlar arasında yer alan tektonik çöküntü düzlüğüdür."
    },
    {
      id: "ova_tercan",
      name: "Tercan Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 39.75,
      lng: 39.49,
      region: "Doğu Anadolu",
      city: "Erzincan (Tercan)",
      kpssNot: "Karasu (Fırat) vadisinde yer alan, Tercan Barajı ile sulanan tektonik havzadır."
    },
    {
      id: "ova_erbaa",
      name: "Erbaa Ovası",
      category: "ovalar",
      type: "Tektonik Hat Ovası (KAF)",
      lat: 40.32,
      lng: 36.55,
      region: "Karadeniz",
      city: "Tokat (Erbaa)",
      kpssNot: "Kelkit Çayı havzasında meşhur Erbaa bağ yaprağının ve tütününün yetiştiği verimli tektonik ovadır."
    },
    {
      id: "ova_niksar",
      name: "Niksar Ovası",
      category: "ovalar",
      type: "Tektonik Hat Ovası (KAF)",
      lat: 40.32,
      lng: 36.55,
      region: "Karadeniz",
      city: "Tokat (Niksar)",
      kpssNot: "Kelkit Oluğu üzerinde yer alan, ceviz ve sebze üretimiyle ünlü mikroklima etkili KAF ovasıdır."
    },
    {
      id: "ova_tasova",
      name: "Taşova Ovası",
      category: "ovalar",
      type: "Tektonik Ova (KAF)",
      lat: 40.65,
      lng: 35.83,
      region: "Karadeniz",
      city: "Amasya (Taşova)",
      kpssNot: "KAF oluğunda Yeşilırmak havzasında yer alan verimli meyve ve sebze ovasıdır."
    },
    {
      id: "ova_merzifon",
      name: "Merzifon Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 40.65,
      lng: 35.83,
      region: "Karadeniz",
      city: "Amasya (Merzifon)",
      kpssNot: "Orta Karadeniz'i İç Anadolu'ya bağlayan kavşakta yer alan zengin tahıl ve pancar üretim ovasıdır."
    },
    {
      id: "ova_suluova",
      name: "Suluova",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 40.65,
      lng: 35.83,
      region: "Karadeniz",
      city: "Amasya (Suluova)",
      kpssNot: "Şekerpancarı ve besi hayvancılığının yoğun yapıldığı KAF bağlantılı tektonik ovadır."
    },
    {
      id: "ova_bolu",
      name: "Bolu Ovası",
      category: "ovalar",
      type: "Tektonik Çöküntü Ovası",
      lat: 40.74,
      lng: 31.61,
      region: "Karadeniz",
      city: "Bolu",
      kpssNot: "KAF hattında yer alan, patates ve kanatlı hayvancılığıyla ünlü zengin alüvyal çöküntü ovasıdır."
    },
    {
      id: "ova_balikesir",
      name: "Balıkesir Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 39.65,
      lng: 27.89,
      region: "Marmara",
      city: "Balıkesir",
      kpssNot: "Güney Marmara'da zengin tarım ve hayvancılık potansiyeline sahip tektonik ovadır."
    },
    {
      id: "ova_inegol",
      name: "İnegöl Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 40.19,
      lng: 29.06,
      region: "Marmara",
      city: "Bursa (İnegöl)",
      kpssNot: "Uludağ ve Domaniç dağları arasında yer alan, meyvecilik ve mobilya sanayisinin geliştiği çöküntü ovasıdır."
    },
    {
      id: "ova_yenisehir",
      name: "Yenişehir Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 40.19,
      lng: 29.06,
      region: "Marmara",
      city: "Bursa (Yenişehir)",
      kpssNot: "Bursa'nın doğusunda yer alan biber ve sebze üretimiyle ünlü tektonik ovadır; havalimanı barındırır."
    },
    {
      id: "ova_karacabey",
      name: "Karacabey Ovası",
      category: "ovalar",
      type: "Tektonik / Alüvyal Ova",
      lat: 40.19,
      lng: 29.06,
      region: "Marmara",
      city: "Bursa (Karacabey)",
      kpssNot: "Susurluk Havzası'nda salçalık domates ve soğan tarımının merkezi olan tektonik ovadır."
    },
    {
      id: "ova_eregli_konya",
      name: "Ereğli Ovası (Konya)",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 37.87,
      lng: 32.48,
      region: "İç Anadolu",
      city: "Konya (Ereğli)",
      kpssNot: "Konya kapalı havzasında yer alan, beyaz kirazı ve siyah havucu ile ünlü tektonik ovadır."
    },
    {
      id: "ova_aksaray",
      name: "Aksaray Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 38.37,
      lng: 34.03,
      region: "İç Anadolu",
      city: "Aksaray",
      kpssNot: "Tuz Gölü havzası güneydoğusunda Hasan Dağı eteklerinde yer alan tektonik tarım ovasıdır."
    },
    {
      id: "ova_eskisehir",
      name: "Eskişehir Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 39.78,
      lng: 30.52,
      region: "İç Anadolu",
      city: "Eskişehir",
      kpssNot: "Porsuk Çayı tarafından sulanan, şeker pancarı ve un sanayisine girdi sağlayan tektonik ovadır."
    },
    {
      id: "ova_murted",
      name: "Ankara (Mürted / Akıncı) Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 39.93,
      lng: 32.86,
      region: "İç Anadolu",
      city: "Ankara (Kazan)",
      kpssNot: "Ankara'nın kuzeybatısında Ova Çayı havzasında yer alan verimli tektonik ovadır."
    },
    {
      id: "ova_suruc",
      name: "Suruç Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 37.16,
      lng: 38.79,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa (Suruç)",
      kpssNot: "GAP kapsamında Suruç Tüneli ile Atatürk Barajı'ndan sulanan ve pamuk tarımı hızla artan tektonik ovadır."
    },
    {
      id: "ova_ceylanpinar",
      name: "Ceylanpınar Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 37.16,
      lng: 38.79,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa (Ceylanpınar)",
      kpssNot: "Türkiye'nin en büyük Tarım İşletmesi'ne (TİGEM) ev sahipliği yapan devasa tarım ve tohumculuk ovasıdır."
    }
  ],

  platolar: [
    // --- VOLKANİK (LAV) PLATOLARI ---
    {
      id: "plato_erzurum_kars",
    groupId: 'grp_erzurum_kars_plato_ekosistem',
      name: "Erzurum - Kars Platosu",
      category: "platolar",
      type: "Volkanik (Lav Örtüsü) Platosu",
      lat: 40.50,
      lng: 42.00,
      region: "Doğu Anadolu",
      city: "Erzurum - Kars",
      kpssNot: "TÜRKİYE'NİN EN YÜKSEK PLATOSUDUR. Yaz yağışları, gür çayırlar ve Çernezyom (kara toprak) sayesinde BÜYÜKBAŞ MERA hayvancılığı yapılır."
    },
    {
      id: "plato_ardahan",
      name: "Ardahan Platosu",
      category: "platolar",
      type: "Volkanik (Lav Örtüsü) Platosu",
      lat: 41.10,
      lng: 42.70,
      region: "Doğu Anadolu",
      city: "Ardahan",
      kpssNot: "Kura Nehri tarafından yarılan, volkanik lav örtüsü ile kaplı yüksek platodur."
    },

    // --- KARSTİK PLATOLAR ---
    {
      id: "plato_teke",
      name: "Teke Platosu",
      category: "platolar",
      type: "Karstik Plato",
      lat: 36.70,
      lng: 29.80,
      region: "Akdeniz",
      city: "Antalya - Muğla",
      kpssNot: "Kireçtaşı (kalker) yapılıdır. Suyu tabana sızdırdığı için çorak ve engebelidir. Nüfus seyrektir, KIL KEÇİSİ yetiştirilir."
    },
    {
      id: "plato_taseli",
      name: "Taşeli Platosu",
      category: "platolar",
      type: "Karstik Plato",
      lat: 36.50,
      lng: 32.80,
      region: "Akdeniz",
      city: "Mersin - Karaman - Antalya",
      kpssNot: "Göksu Nehri kanyonlarıyla yarılmıştır. Karstik yapı nedeniyle tarım zordur, nüfus seyrektir, KIL KEÇİSİ yaygındır."
    },

    // --- AŞINIM (PENEPLEN) PLATOLARI ---
    {
      id: "plato_catalca_kocaeli",
      name: "Çatalca - Kocaeli Platosu",
      category: "platolar",
      type: "Aşınım (Peneplen) Platosu",
      lat: 41.00,
      lng: 29.40,
      region: "Marmara",
      city: "İstanbul - Kocaeli",
      kpssNot: "TÜRKİYE'NİN EN ALÇAK PLATOSUDUR. Aşınarak deniz seviyesine yaklaşmıştır. Nüfus, sanayi, ticaret ve ulaşım yoğunluğu en fazladır."
    },
    {
      id: "plato_safranbolu",
    groupId: 'grp_safranbolu_unesco',
      name: "Safranbolu (Perşembe) Platosu",
      category: "platolar",
      type: "Aşınım Platosu",
      lat: 41.25,
      lng: 32.70,
      region: "Karadeniz",
      kpssNot: "Batı Karadeniz'de akarsular tarafından aşındırılmış plato sahasıdır."
    },

    // --- YATAY DURUŞLU (TABAKA DÜZLÜĞÜ) PLATOLARI ---
    {
      id: "plato_haymana",
      name: "Haymana Platosu",
      category: "platolar",
      type: "Tabaka Düzlüğü Platosu",
      lat: 39.40,
      lng: 32.50,
      region: "İç Anadolu",
      city: "Ankara (Haymana)",
      kpssNot: "Ankara güneyindedir. Bozkır bitki örtüsü nedeniyle TİFTİK KEÇİSİ (Ankara Keçisi) ve küçükbaş hayvancılık yaygındır."
    },
    {
      id: "plato_cihanbeyli",
      name: "Cihanbeyli Platosu",
      category: "platolar",
      type: "Tabaka Düzlüğü Platosu",
      lat: 38.65,
      lng: 32.90,
      region: "İç Anadolu",
      city: "Konya (Cihanbeyli)",
      kpssNot: "Tuz Gölü'nün batısındadır. Geniş düzlüklerinde makineli TAHIL (buğday/arpa) tarımı yapılır."
    },
    {
      id: "plato_obruk",
      name: "Obruk Platosu",
      category: "platolar",
      type: "Karstik / Tabaka Düzlüğü Platosu",
      lat: 38.15,
      lng: 33.50,
      region: "İç Anadolu",
      city: "Konya - Aksaray",
      kpssNot: "Kızören gibi çok sayıda yer altı mağarası tavanının çökmesiyle oluşan dev OBRUKLAR barındırır."
    },
    {
      id: "plato_bozok",
      name: "Bozok Platosu",
      category: "platolar",
      type: "Tabaka Düzlüğü Platosu",
      lat: 39.80,
      lng: 35.30,
      region: "İç Anadolu",
      city: "Yozgat",
      kpssNot: "Kızılırmak Yayı içinde (Yozgat çevresi) yer alan en geniş İç Anadolu platosudur. Küçükbaş hayvancılık ve tahıl yaygındır."
    },
    {
      id: "plato_uzunyayla",
      name: "Uzunyayla Platosu",
      category: "platolar",
      type: "Tabaka Düzlüğü Platosu",
      lat: 39.20,
      lng: 36.40,
      region: "İç Anadolu / Sivas",
      city: "Sivas - Kayseri",
      kpssNot: "Sivas-Kayseri arasında yüksek düzlüktür. At ve koyun yetiştiriciliği ile bilinir."
    },
    {
      id: "plato_yazilikaya",
      name: "Yazılıkaya (Bayat) Platosu",
      category: "platolar",
      type: "Tabaka Düzlüğü Platosu",
      lat: 39.20,
      lng: 30.70,
      region: "Ege / İç Batı Anadolu",
      city: "Eskişehir - Afyonkarahisar",
      kpssNot: "Eskişehir-Afyon arasında Frig vadisi kalıntılarını da içeren aşınmış platodur."
    },
    {
      id: "plato_gaziantep",
      name: "Gaziantep Platosu",
      category: "platolar",
      type: "Tabaka Düzlüğü Platosu",
      lat: 37.05,
      lng: 37.35,
      region: "Güneydoğu Anadolu",
      city: "Gaziantep",
      kpssNot: "Antep fıstığı, zeytin ve bağcılığın yapıldığı, Fırat kolları ile parçalanmış platodur."
    },
    {
      id: "plato_sanliurfa",
      name: "Şanlıurfa Platosu",
      category: "platolar",
      type: "Tabaka Düzlüğü Platosu",
      lat: 37.15,
      lng: 38.80,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa",
      kpssNot: "Güneydoğu'da tarım ve küçükbaş hayvancılığın yoğun olduğu geniş tabaka düzlüğüdür."
    },

    {
      id: "plato_adiyaman",
      name: "Adıyaman Platosu",
      category: "platolar",
      type: "Tabaka Düzlüğü Platosu",
      lat: 37.76,
      lng: 38.28,
      region: "Güneydoğu Anadolu",
      city: "Adıyaman",
      kpssNot: "Toroslar etekleri ile Fırat Nehri arasında uzanan, tütün ve badem tarımının yoğun olduğu aşınmış tabaka düzlüğüdür."
    },
    {
      id: "plato_diyarbakir",
      name: "Diyarbakır Platosu",
      category: "platolar",
      type: "Tabaka Düzlüğü Platosu",
      lat: 37.91,
      lng: 40.23,
      region: "Güneydoğu Anadolu",
      city: "Diyarbakır",
      kpssNot: "Dicle Nehri ve Karacadağ bazalt lav örtüsüyle çevrili, tahıl ve kırmızı mercimek üretiminin merkezi olan geniş platodur."
    }
  ],

  su_kaynaklari: [
    // --- AKARSULAR (GERÇEK AKIŞ VE ÇİZGİ GEOMETRİSİ) ---
    {
      id: "nehir_kizilirmak",
      name: "Kızılırmak",
      category: "su_kaynaklari",
      shapeType: "polyline",
      coordinates: [
        [39.85, 38.30],
        [39.05, 36.10],
        [38.75, 34.80],
        [39.80, 33.50],
        [40.60, 34.00],
        [41.20, 35.30],
        [41.73, 35.95]
      ],
      lat: 40.00,
      lng: 34.80,
      type: "Akarsu",
      region: "Karadeniz / İç Anadolu",
      city: "Sivas - Kayseri - Samsun",
      kpssNot: "SINIRLARIMIZ İÇİNDE DOĞUP SINIRLARIMIZ İÇİNDE DENİZE DÖKÜLEN EN UZUN NEHRİMİZDİR (1.355 km). Bafra Deltası'nı oluşturur."
    },
    {
      id: "nehir_yesilirmak",
      name: "Yeşilırmak",
      category: "su_kaynaklari",
      shapeType: "polyline",
      coordinates: [
        [39.90, 37.80],
        [40.35, 36.55],
        [40.65, 35.83],
        [41.38, 36.75]
      ],
      lat: 40.65,
      lng: 36.40,
      type: "Akarsu",
      region: "Karadeniz",
      city: "Sivas - Tokat - Samsun",
      kpssNot: "Kuzey Anadolu dağlarını yararak Karadeniz'e dökülür ve Çarşamba Deltası'nı oluşturur."
    },
    {
      id: "nehir_sakarya",
      name: "Sakarya Nehri",
      category: "su_kaynaklari",
      shapeType: "polyline",
      coordinates: [
        [39.10, 31.00],
        [39.60, 31.80],
        [40.05, 31.20],
        [40.45, 30.15],
        [40.80, 30.45],
        [41.20, 30.65]
      ],
      lat: 40.20,
      lng: 30.80,
      type: "Akarsu",
      region: "Marmara / İç Anadolu",
      city: "Eskişehir - Ankara - Sakarya",
      kpssNot: "Dört farklı coğrafi bölgeden (İç Anadolu, Ege, Marmara, Karadeniz) geçen tek akarsumuzdur."
    },
    {
      id: "nehir_coruh",
      name: "Çoruh Nehri",
      category: "su_kaynaklari",
      shapeType: "polyline",
      coordinates: [
        [40.20, 40.20],
        [40.48, 40.95],
        [40.82, 41.80],
        [41.20, 41.70],
        [41.60, 41.58]
      ],
      lat: 40.80,
      lng: 41.30,
      type: "Akarsu",
      region: "Karadeniz / Doğu Anadolu",
      city: "Bayburt - Erzurum - Artvin",
      kpssNot: "Akış hızı ve debisi çok yüksektir. Rafting sporuna çok uygundur. Gürcistan (Batum) üzerinden Karadeniz'e dökülür. Deriner ve Yusufeli barajları buradadır."
    },
    {
      id: "nehir_firat",
      name: "Fırat Nehri",
      category: "su_kaynaklari",
      shapeType: "polyline",
      coordinates: [
        [39.75, 39.50],
        [38.80, 38.75],
        [38.35, 38.45],
        [37.75, 38.15],
        [37.05, 38.00],
        [36.85, 38.01]
      ],
      lat: 38.10,
      lng: 38.40,
      type: "Akarsu (Sınır Aşan)",
      region: "Doğu & Güneydoğu Anadolu",
      city: "Erzincan - Elazığ - Şanlıurfa",
      kpssNot: "TÜRKİYE'NİN EN FAZLA SU TAŞIYAN ve HİDROELEKTRİK POTANSİYELİ EN YÜKSEK NEHRİDİR. Karasu ve Murat kollarından oluşur, Basra Körfezi'ne dökülür."
    },
    {
      id: "nehir_dicle",
      name: "Dicle Nehri",
      category: "su_kaynaklari",
      shapeType: "polyline",
      coordinates: [
        [38.45, 39.40],
        [37.90, 40.25],
        [37.70, 41.10],
        [37.55, 41.45],
        [37.33, 42.20]
      ],
      lat: 37.80,
      lng: 40.80,
      type: "Akarsu (Sınır Aşan)",
      region: "Güneydoğu Anadolu",
      city: "Diyarbakır - Batman - Mardin",
      kpssNot: "Hazar Gölü yakınlarından doğar, Ilısu (Veysel Eroğlu) barajı üzerindedir. Fırat ile Irak'ta birleşip Şattülarap adını alır."
    },
    {
      id: "nehir_aras",
      name: "Aras Nehri",
      category: "su_kaynaklari",
      shapeType: "polyline",
      coordinates: [
        [39.45, 41.20],
        [39.95, 42.50],
        [40.05, 43.50],
        [39.90, 44.40],
        [39.40, 44.85]
      ],
      lat: 39.90,
      lng: 43.20,
      type: "Akarsu (Kapalı Havza)",
      region: "Doğu Anadolu",
      city: "Erzurum - Kars - Iğdır",
      kpssNot: "Ermenistan, Azerbaycan ve İran sınırını oluşturur; Kura ile birleşerek HAZAR KAPALI HAVZASI'na dökülür."
    },
    {
      id: "nehir_meric",
      name: "Meriç Nehri",
      category: "su_kaynaklari",
      shapeType: "polyline",
      coordinates: [
        [41.75, 26.55],
        [41.35, 26.60],
        [40.95, 26.35],
        [40.73, 26.05]
      ],
      lat: 41.20,
      lng: 26.40,
      type: "Akarsu",
      region: "Marmara",
      city: "Edirne",
      kpssNot: "Bulgaristan'dan doğar, Türkiye-Yunanistan sınırını çizer, Ege Denizi'ne dökülür (Ergene en büyük koludur, pirinç/çeltik tarımı yaygındır)."
    },
    {
      id: "nehir_gediz",
      name: "Gediz Nehri",
      category: "su_kaynaklari",
      shapeType: "polyline",
      coordinates: [
        [38.95, 29.60],
        [38.60, 28.50],
        [38.60, 27.40],
        [38.58, 26.85]
      ],
      lat: 38.65,
      lng: 27.80,
      type: "Akarsu",
      region: "Ege",
      city: "Kütahya - Manisa - İzmir",
      kpssNot: "Ege grabenleri boyunca menderesler çizerek akar ve Menemen Deltası'nı oluşturur."
    },
    {
      id: "nehir_buyuk_menderes",
      name: "Büyük Menderes",
      category: "su_kaynaklari",
      shapeType: "polyline",
      coordinates: [
        [38.10, 30.15],
        [38.05, 29.10],
        [37.85, 28.30],
        [37.75, 27.60],
        [37.55, 27.20]
      ],
      lat: 37.80,
      lng: 28.50,
      type: "Akarsu",
      region: "Ege",
      city: "Afyon - Denizli - Aydın",
      kpssNot: "Ege'nin en uzun akarsuyudur. İsmini dünyaya 'menderes (kıvrım)' coğrafi terimi olarak vermiştir."
    },
    {
      id: "nehir_asi",
      name: "Asi Nehri",
      category: "su_kaynaklari",
      shapeType: "polyline",
      coordinates: [
        [35.90, 36.35],
        [36.20, 36.15],
        [36.10, 35.95]
      ],
      lat: 36.10,
      lng: 36.15,
      type: "Akarsu (Ters Akan)",
      region: "Akdeniz",
      city: "Hatay (Antakya)",
      kpssNot: "Lübnan'dan doğup Suriye'den geçerek Türkiye'ye girer. Güneyden kuzeye 'ters' aktığı için Asi adını almıştır."
    },
    {
      id: "nehir_goksu",
      name: "Göksu Nehri",
      category: "su_kaynaklari",
      shapeType: "polyline",
      coordinates: [
        [37.05, 32.70],
        [36.75, 33.40],
        [36.50, 33.80],
        [36.30, 33.95]
      ],
      lat: 36.65,
      lng: 33.50,
      type: "Akarsu",
      region: "Akdeniz",
      city: "Konya - Karaman - Mersin",
      kpssNot: "Taşeli Platosu'nu derin kanyonlarla yararak Silifke Deltası'nı oluşturan akarsumuzdur."
    },
    {
      id: "nehir_manavgat",
      name: "Manavgat Çayı",
      category: "su_kaynaklari",
      shapeType: "polyline",
      coordinates: [
        [37.30, 31.60],
        [36.95, 31.50],
        [36.78, 31.45]
      ],
      lat: 37.00,
      lng: 31.52,
      type: "Akarsu (Karstik)",
      region: "Akdeniz",
      city: "Antalya (Manavgat)",
      kpssNot: "Karstik (voklüz) gür kaynaklarla beslendiği için AKIMI YIL BOYUNCA EN DÜZENLİ akarsularımızdandır."
    },

    // --- GÖLLER (KPSS TÜM OLUŞUM TİPLERİ) ---
    // 1. TEKTONİK GÖLLER
    {
      id: "gol_tuz",
    groupId: 'grp_tuz_golu_havzasi',
      name: "Tuz Gölü",
      category: "su_kaynaklari",
      type: "Tektonik Göl (Kapalı Havza)",
      lat: 38.75,
      lng: 33.30,
      areaKm2: 1500,
      region: "İç Anadolu",
      city: "Konya - Aksaray - Ankara",
      kpssNot: "Türkiye'nin 2. büyük gölüdür; yazın buharlaşmayla alanı en çok değişen göldür. Türkiye tuz ihtiyacının %40'tan fazlasını karşılar (Kapalı Havza)."
    },
    {
      id: "gol_iznik",
      name: "İznik Gölü",
      category: "su_kaynaklari",
      type: "Tektonik Göl",
      lat: 40.43,
      lng: 29.50,
      areaKm2: 298,
      region: "Marmara (Bursa)",
      city: "Bursa (İznik)",
      kpssNot: "Marmara Bölgesi'nin en büyük doğal tatlı su gölüdür. Gideğeni (Karsak Deresi) olduğu için suları tatlıdır; bazilika batığıyla ünlüdür."
    },
    {
      id: "gol_sapanca",
      name: "Sapanca Gölü",
      category: "su_kaynaklari",
      type: "Tektonik Göl",
      lat: 40.71,
      lng: 30.26,
      areaKm2: 45,
      region: "Marmara (Sakarya-Kocaeli)",
      city: "Sakarya - Kocaeli",
      kpssNot: "Kuzey Anadolu Fay Hattı (KAF) çöküntü oluğunda yer alan, içme ve sanayi suyu sağlayan önemli tektonik tatlı su gölüdür."
    },
    {
      id: "gol_manyas",
    groupId: 'grp_manyas_kus_cenneti',
      name: "Manyas (Kuş) Gölü",
      category: "su_kaynaklari",
      type: "Tektonik Göl (Ramsar)",
      lat: 40.20,
      lng: 27.96,
      areaKm2: 166,
      region: "Marmara (Balıkesir)",
      city: "Balıkesir (Bandırma)",
      kpssNot: "Kuş Cenneti Milli Parkı ve RAMSAR alanıdır. Göçmen kuşların en önemli konaklama sahalarındandır. Suları tatlıdır."
    },
    {
      id: "gol_uluabat",
      name: "Uluabat (Apolyont) Gölü",
      category: "su_kaynaklari",
      type: "Tektonik Göl (Ramsar)",
      lat: 40.18,
      lng: 28.60,
      areaKm2: 134,
      region: "Marmara (Bursa)",
      city: "Bursa (Nilüfer)",
      kpssNot: "Ramsar koruma alanıdır. Gölyazı adası ve Avrupa Leylek Köyü (Eskikaraağaç) buradadır. Sığ ve tatlı bir tektonik göldür."
    },
    {
      id: "gol_burdur",
      name: "Burdur Gölü",
      category: "su_kaynaklari",
      type: "Tektonik Göl (Kapalı Havza)",
      lat: 37.75,
      lng: 30.18,
      areaKm2: 200,
      region: "Akdeniz (Göller Yöresi)",
      city: "Burdur",
      kpssNot: "Gideğeni olmadığı için suları ACI ve TUZLUDUR. Dikkuyruk ördeklerinin kışlama sahasıdır. Ramsar alanıdır."
    },
    {
      id: "gol_hazar",
      name: "Hazar Gölü",
      category: "su_kaynaklari",
      type: "Tektonik Göl",
      lat: 38.49,
      lng: 39.41,
      areaKm2: 86,
      region: "Doğu Anadolu (Elazığ)",
      city: "Elazığ (Sivrice)",
      kpssNot: "Doğu Anadolu Fay Hattı üzerindedir. Dicle Nehri bu gölün yakınlarından doğar. İçinde su altı batık şehir kalıntıları yer alır."
    },
    {
      id: "gol_aksehir",
      name: "Akşehir Gölü",
      category: "su_kaynaklari",
      type: "Tektonik Göl (Kapalı Havza)",
      lat: 38.58,
      lng: 31.42,
      areaKm2: 350,
      region: "İç Anadolu (Konya-Afyon)",
      city: "Konya - Afyonkarahisar",
      kpssNot: "Nasreddin Hoca'nın 'Ya tutarsa' diyerek maya çaldığı tarihi göldür. İklim değişikliği ve aşırı sulama nedeniyle kuruma tehdidi altındadır."
    },
    {
      id: "gol_eber",
      name: "Eber Gölü",
      category: "su_kaynaklari",
      type: "Tektonik Göl",
      lat: 38.62,
      lng: 31.18,
      areaKm2: 126,
      region: "İç Anadolu (Afyonkarahisar)",
      city: "Afyonkarahisar (Bolvadin)",
      kpssNot: "Üzerinde 'Kopak' adı verilen yüzen sazlık adacıklarıyla ünlü, biyolojik çeşitliliği zengin sığ tektonik göldür."
    },
    {
      id: "gol_seyfe",
      name: "Seyfe Gölü",
      category: "su_kaynaklari",
      type: "Tektonik Göl (Ramsar)",
      lat: 39.20,
      lng: 34.38,
      areaKm2: 24,
      region: "İç Anadolu (Kırşehir)",
      city: "Kırşehir (Mucur)",
      kpssNot: "Ramsar koruma alanı olan tuzlu göldür. Flamingo ve turnaların İç Anadolu'daki en önemli üreme/durak noktalarındandır."
    },

    // 2. KARMA VE KARSTİK GÖLLER
    {
      id: "gol_beysehir",
      name: "Beyşehir Gölü",
      category: "su_kaynaklari",
      type: "Karma Oluşumlu (Tektonik - Karstik)",
      lat: 37.75,
      lng: 31.50,
      areaKm2: 656,
      region: "Akdeniz (Göller Yöresi)",
      city: "Konya - Isparta",
      kpssNot: "TÜRKİYE'NİN EN BÜYÜK TATLI SU GÖLÜDÜR (Gideğeni Çarşamba Çayı ile Konya Ovası'nı sular). Milli park statüsündedir."
    },
    {
      id: "gol_egirdir",
      name: "Eğirdir Gölü",
      category: "su_kaynaklari",
      type: "Karma Oluşumlu (Tektonik - Karstik)",
      lat: 38.05,
      lng: 30.85,
      areaKm2: 468,
      region: "Akdeniz (Göller Yöresi)",
      city: "Isparta (Eğirdir)",
      kpssNot: "Türkiye'nin 2. büyük tatlı su gölüdür. Kovada Kanalı ile Kovada Gölü'ne ve HES santrallerine tatlı su aktarır."
    },
    {
      id: "gol_salda",
      name: "Salda Gölü",
      category: "su_kaynaklari",
      type: "Karstik Göl",
      lat: 37.55,
      lng: 29.68,
      areaKm2: 44,
      region: "Akdeniz (Burdur/Yeşilova)",
      city: "Burdur (Yeşilova)",
      kpssNot: "Türkiye'nin en derin göllerindendir (184 m). Beyaz hidromanyezit kumulları Mars kayaç yapısıyla benzerlik gösterir (Türkiye'nin Maldivleri)."
    },
    {
      id: "gol_kovada",
      name: "Kovada Gölü",
      category: "su_kaynaklari",
      type: "Karstik Göl (Milli Park)",
      lat: 37.64,
      lng: 30.87,
      areaKm2: 9,
      region: "Akdeniz (Isparta)",
      city: "Isparta (Eğirdir)",
      kpssNot: "Eğirdir Gölü'nün fazla sularının aktığı karstik milli park gölüdür; çevresi zengin flora ve yaban hayatına sahiptir."
    },
    {
      id: "gol_avlan",
      name: "Avlan Gölü",
      category: "su_kaynaklari",
      type: "Karstik Göl (Polye)",
      lat: 36.59,
      lng: 29.93,
      areaKm2: 5,
      region: "Akdeniz (Antalya/Elmalı)",
      city: "Antalya (Elmalı)",
      kpssNot: "Elmalı polyesi tabanında karstik düdenlerle beslenen göldür; kurutulduktan sonra iklim bozulunca yeniden su tutulmuştur."
    },
    {
      id: "gol_kizoren",
      name: "Kızören Obruk Gölü",
      category: "su_kaynaklari",
      type: "Karstik Obruk Gölü (Ramsar)",
      lat: 38.17,
      lng: 33.18,
      areaKm2: 0.1,
      region: "İç Anadolu (Konya)",
      city: "Konya (Karatay)",
      kpssNot: "Türkiye'nin en tipik kireçtaşı karstik obruk gölüdür. 180 metre derinliğindeki dikey çanakta su birikmiştir; Ramsar alanıdır."
    },

    // 3. VOLKANİK GÖLLER (KRATER / KALDERA / MAAR)
    {
      id: "gol_nemrut",
    groupId: 'grp_nemrut_volkani_bitlis',
      name: "Nemrut Kaldera Gölü",
      category: "su_kaynaklari",
      type: "Volkanik Kaldera Gölü (Ramsar)",
      lat: 38.62,
      lng: 42.24,
      areaKm2: 12,
      region: "Doğu Anadolu (Bitlis)",
      city: "Bitlis (Tatvan)",
      kpssNot: "Nemrut Yanardağı'nın patlamasıyla oluşan çanakta gelişen, DÜNYANIN 2. BÜYÜK KALDERA GÖLÜDÜR. Ramsar ve EDEN ödüllü doğa harikasıdır."
    },
    {
      id: "gol_meke",
    groupId: 'grp_meke_tuzlasi',
      name: "Meke Tuzlası (Maar)",
      category: "su_kaynaklari",
      type: "Volkanik Patlama Gölü (Maar)",
      lat: 37.69,
      lng: 33.64,
      areaKm2: 0.5,
      region: "İç Anadolu (Konya/Karapınar)",
      city: "Konya (Karapınar)",
      kpssNot: "Gaz patlaması sonucu oluşan çanak ve ortasındaki volkan konisiyle 'Dünyanın Nazar Boncuğu' olarak anılan Ramsar maar gölüdür."
    },
    {
      id: "gol_golcuk_isparta",
      name: "Gölcük Krater Gölü (Isparta)",
      category: "su_kaynaklari",
      type: "Volkanik Maar / Krater Gölü",
      lat: 37.73,
      lng: 30.49,
      areaKm2: 1,
      region: "Akdeniz (Isparta)",
      city: "Isparta",
      kpssNot: "Genç volkanik patlama krateri içinde yer alan tabiat parkı gölüdür; suları tatlıdır."
    },

    // 4. VOLKANİK SET GÖLLERİ (VAN GÖLÜ HAVZASI VE DOĞU ANADOLU)
    {
      id: "gol_van",
      name: "Van Gölü",
      category: "su_kaynaklari",
      type: "Volkanik Set / Tektonik (Karma)",
      lat: 38.60,
      lng: 42.90,
      areaKm2: 3713,
      region: "Doğu Anadolu",
      city: "Van - Bitlis",
      kpssNot: "TÜRKİYE'NİN EN BÜYÜK GÖLÜDÜR (Nemrut lavları önünü kesmiştir). Suları SODALI ve TUZLUDUR. İnci kefali yaşar. Van-Tatvan feribot hattı bulunur."
    },
    {
      id: "gol_cildir",
      name: "Çıldır Gölü",
      category: "su_kaynaklari",
      type: "Volkanik Set Gölü",
      lat: 41.05,
      lng: 43.25,
      areaKm2: 123,
      region: "Doğu Anadolu (Ardahan-Kars)",
      city: "Ardahan - Kars",
      kpssNot: "Lav akıntısının vadiyi tıkamasıyla oluşan yüksek rakımlı göldür. Kışın 1 metreye varan buz tutar; atlı kızak ve Eskimo usulü balıkçılık yapılır."
    },
    {
      id: "gol_ercek",
      name: "Erçek Gölü",
      category: "su_kaynaklari",
      type: "Volkanik Set Gölü",
      lat: 38.64,
      lng: 43.58,
      areaKm2: 98,
      region: "Doğu Anadolu (Van)",
      city: "Van (İpekyolu)",
      kpssNot: "Van Gölü'nün doğusunda yer alan volkanik set gölüdür; suları sodalıdır ve flamingoların önemli göç konaklama merkezidir."
    },
    {
      id: "gol_nazik",
      name: "Nazik Gölü",
      category: "su_kaynaklari",
      type: "Volkanik Set Gölü",
      lat: 38.85,
      lng: 42.27,
      areaKm2: 44,
      region: "Doğu Anadolu (Bitlis/Ahlat)",
      city: "Bitlis (Ahlat)",
      kpssNot: "Nemrut ve Süphan lavlarının önünü kapatmasıyla oluşan, kışın buz tutan tatlı su volkanik set gölüdür."
    },
    {
      id: "gol_balik",
      name: "Balık Gölü",
      category: "su_kaynaklari",
      type: "Volkanik Set Gölü",
      lat: 39.75,
      lng: 43.57,
      areaKm2: 34,
      region: "Doğu Anadolu (Ağrı/Taşlıçay)",
      city: "Ağrı (Taşlıçay)",
      kpssNot: "Türkiye'nin en yüksek rakımlı tatlı su göllerindendir (2.250 m). Kırmızı benekli alabalığı ile ünlüdür."
    },
    {
      id: "gol_hacli",
      name: "Haçlı (Bulanık) Gölü",
      category: "su_kaynaklari",
      type: "Volkanik Set Gölü",
      lat: 39.02,
      lng: 42.31,
      areaKm2: 16,
      region: "Doğu Anadolu (Muş/Bulanık)",
      city: "Muş (Bulanık)",
      kpssNot: "Volkanik lavların Şeyh Deresi vadisini tıkamasıyla oluşan sığ volkanik set gölüdür."
    },

    // 5. HEYELAN SET GÖLLERİ (KARADENİZ VE DOĞU ANADOLU)
    {
      id: "gol_abant",
    groupId: 'grp_abant_yedigoller_bolu',
      name: "Abant Gölü",
      category: "su_kaynaklari",
      type: "Heyelan Set Gölü",
      lat: 40.60,
      lng: 31.28,
      areaKm2: 1.3,
      region: "Karadeniz (Bolu)",
      city: "Bolu (Merkez)",
      kpssNot: "Heyelan kütlesinin vadi önünü kapatmasıyla oluşan Türkiye'nin en ünlü heyelan set gölü ve milli parkıdır."
    },
    {
      id: "gol_yedigoller",
    groupId: 'grp_abant_yedigoller_bolu',
      name: "Yedigöller",
      category: "su_kaynaklari",
      type: "Heyelan Set Gölleri",
      lat: 40.94,
      lng: 31.74,
      areaKm2: 0.1,
      region: "Karadeniz (Bolu)",
      city: "Bolu (Mengen)",
      kpssNot: "Birden çok heyelanın vadiyi basamaklı kapatmasıyla oluşan 7 gölden (Büyükgöl, Seringöl, Deringöl, Nazlıgöl vb.) meydana gelir."
    },
    {
      id: "gol_tortum",
      name: "Tortum Gölü",
      category: "su_kaynaklari",
      type: "Heyelan Set Gölü",
      lat: 40.65,
      lng: 41.65,
      areaKm2: 8,
      region: "Doğu Anadolu (Erzurum/Uzundere)",
      city: "Erzurum (Uzundere)",
      kpssNot: "Kemerlidağ'dan kopan heyelan kütlesinin Tortum Çayı vadisini kapatmasıyla oluşmuştur; taşan suları ünlü Tortum Şelalesi'ni oluşturur."
    },
    {
      id: "gol_sera",
      name: "Sera Gölü",
      category: "su_kaynaklari",
      type: "Heyelan Set Gölü",
      lat: 40.98,
      lng: 39.62,
      areaKm2: 0.15,
      region: "Karadeniz (Trabzon/Akçaabat)",
      city: "Trabzon (Akçaabat)",
      kpssNot: "1950 yılında meydana gelen büyük bir heyelanın Sera Deresi önünü birkaç günde kapatmasıyla gözler önünde oluşmuş tipik heyelan set gölüdür."
    },
    {
      id: "gol_borcka_karagol",
      name: "Borçka Karagöl",
      category: "su_kaynaklari",
      type: "Heyelan Set Gölü (Milli Park)",
      lat: 41.38,
      lng: 41.85,
      areaKm2: 0.05,
      region: "Karadeniz (Artvin/Borçka)",
      city: "Artvin (Borçka)",
      kpssNot: "Klaskur Yaylası'ndan gelen heyelanın dere yatağını kapatmasıyla oluşan tabiat parkı ve biyosfer rezerv alanıdır."
    },
    {
      id: "gol_zinav",
      name: "Zinav Gölü",
      category: "su_kaynaklari",
      type: "Heyelan Set Gölü",
      lat: 40.47,
      lng: 37.26,
      areaKm2: 1.5,
      region: "Karadeniz (Tokat/Reşadiye)",
      city: "Tokat (Reşadiye)",
      kpssNot: "Kelkit Havzası'nda bir heyelanın dere vadisini kapatmasıyla oluşmuş doğa harikası heyelan set gölüdür."
    },

    // 6. KIYI SET GÖLLERİ (LAGÜN / DENİZKULAĞI)
    {
      id: "gol_terkos",
      name: "Terkos (Durusu) Gölü",
      category: "su_kaynaklari",
      type: "Kıyı Set Gölü (Lagün)",
      lat: 41.33,
      lng: 28.58,
      areaKm2: 25,
      region: "Marmara (İstanbul)",
      city: "İstanbul (Çatalca/Arnavutköy)",
      kpssNot: "Karadeniz kıyısındaki koyun dalga biriktirmesi (kıyı kordonu) ile kapanması sonucu oluşan klasik LAGÜN gölüdür; İstanbul'un ana içme suyudur."
    },
    {
      id: "gol_buyukcekmece",
      name: "Büyükçekmece Gölü",
      category: "su_kaynaklari",
      type: "Kıyı Set Gölü (Lagün)",
      lat: 41.06,
      lng: 28.55,
      areaKm2: 29,
      region: "Marmara (İstanbul)",
      city: "İstanbul (Büyükçekmece)",
      kpssNot: "Marmara Denizi kıyısında koy önünün kıyı kordonuyla kapatılmasıyla oluşmuş tipik lagün gölüdür (Mimar Sinan Köprüsü buradadır)."
    },
    {
      id: "gol_kucukcekmece",
      name: "Küçükçekmece Gölü",
      category: "su_kaynaklari",
      type: "Kıyı Set Gölü (Lagün)",
      lat: 40.99,
      lng: 28.76,
      areaKm2: 16,
      region: "Marmara (İstanbul)",
      city: "İstanbul (Küçükçekmece)",
      kpssNot: "Marmara kıyısında denizle bağlantısı daralan lagün gölüdür; kıyısında Türkiye'nin en eski yerleşimlerinden Yarımburgaz Mağarası bulunur."
    },
    {
      id: "gol_akyatan",
      name: "Akyatan Lagünü",
      category: "su_kaynaklari",
      type: "Kıyı Set Gölü (Lagün / Ramsar)",
      lat: 36.63,
      lng: 35.25,
      areaKm2: 49,
      region: "Akdeniz (Adana/Çukurova)",
      city: "Adana (Karataş)",
      kpssNot: "Seyhan ve Ceyhan deltası üzerinde TÜRKİYE'NİN EN BÜYÜK LAGÜN GÖLÜDÜR. Caretta Caretta ve yeşil deniz kaplumbağalarının ana üreme Ramsar sahasıdır."
    },

    // 7. ALÜVYAL SET GÖLLERİ
    {
      id: "gol_koycegiz",
    groupId: 'grp_koycegiz_dalyan',
      name: "Köyceğiz Gölü",
      category: "su_kaynaklari",
      type: "Alüvyal Set Gölü",
      lat: 36.90,
      lng: 28.65,
      areaKm2: 52,
      region: "Ege (Muğla)",
      city: "Muğla (Köyceğiz)",
      kpssNot: "Namnam Çayı alüvyonlarının körfez önünü kapatmasıyla oluşmuştur. Dalyan kanalı üzerinden Akdeniz'e (İztuzu Plajı) bağlanır (Tatlı-tuzlu su karışımı)."
    },
    {
      id: "gol_bafa",
      name: "Bafa (Çamiçi) Gölü",
      category: "su_kaynaklari",
      type: "Alüvyal Set Gölü",
      lat: 37.50,
      lng: 27.42,
      areaKm2: 60,
      region: "Ege (Aydın-Muğla)",
      city: "Aydın - Muğla",
      kpssNot: "Büyük Menderes Nehri'nin taşıdığı alüvyonların eski Latmos Körfezi önünü kapatmasıyla denizden koparak göle dönüşmüştür."
    },
    {
      id: "gol_mogan",
      name: "Mogan Gölü (Gölbaşı)",
      category: "su_kaynaklari",
      type: "Alüvyal Set Gölü",
      lat: 39.77,
      lng: 32.79,
      areaKm2: 6,
      region: "İç Anadolu (Ankara)",
      city: "Ankara (Gölbaşı)",
      kpssNot: "Yan derelerin getirdiği alüvyonların Mogan Deresi vadisini kapatmasıyla oluşmuş rekreasyon ve göçmen kuş gölüdür."
    },
    {
      id: "gol_eymir",
      name: "Eymir Gölü",
      category: "su_kaynaklari",
      type: "Alüvyal Set Gölü",
      lat: 39.82,
      lng: 32.83,
      areaKm2: 1.25,
      region: "İç Anadolu (Ankara)",
      city: "Ankara (Çankaya/ODTÜ)",
      kpssNot: "Mogan Gölü'nün gideğeni ile beslenen, ODTÜ arazisi içinde yer alan tipik bir alüvyal set gölüdür."
    },
    {
      id: "gol_marmara_manisa",
      name: "Marmara Gölü (Manisa)",
      category: "su_kaynaklari",
      type: "Alüvyal Set / Tektonik",
      lat: 38.61,
      lng: 28.02,
      areaKm2: 44,
      region: "Ege (Manisa/Gölmarmara)",
      city: "Manisa (Gölmarmara)",
      kpssNot: "Gediz grabeninde alüvyonların çöküntü alanını kapatmasıyla oluşan önemli sulak alan ve balıkçılık gölüdür."
    },

    // 8. BUZUL (SİRK) GÖLLERİ
    {
      id: "gol_kackar_deniz",
    groupId: 'grp_kackar_masifi',
      name: "Kaçkar Deniz Gölü (Buzul Sirk)",
      category: "su_kaynaklari",
      type: "Buzul (Sirk) Gölü",
      lat: 40.83,
      lng: 41.16,
      areaKm2: 0.05,
      region: "Karadeniz (Rize-Artvin)",
      city: "Rize - Artvin",
      kpssNot: "Kaçkar Dağları'nın zirvesinde (3.370 m) buzul aşındırması sonucu oluşan çanakta gelişen TÜRKİYE'NİN EN DERİN BUZUL (SİRK) GÖLÜDÜR."
    },
    {
      id: "gol_uludag_aynali",
    groupId: 'grp_uludag_masifi',
      name: "Uludağ Aynalıgöl (Buzul Sirk)",
      category: "su_kaynaklari",
      type: "Buzul (Sirk) Gölü",
      lat: 40.11,
      lng: 29.17,
      areaKm2: 0.02,
      region: "Marmara (Bursa/Uludağ)",
      city: "Bursa (Uludağ)",
      kpssNot: "Batı Anadolu'da kuaterner buzullaşmasının izlerini taşıyan Uludağ zirve platosundaki sirk göllerindendir (Kilimli, Karagöl ile birlikte)."
    },

    {
      id: "nehir_bartin",
      name: "Bartın Çayı",
      category: "su_kaynaklari",
      type: "Akarsu",
      shapeType: "polyline",
      coordinates: [[41.5, 32.45], [41.64, 32.33], [41.69, 32.22]],
      lat: 41.64,
      lng: 32.33,
      region: "Karadeniz",
      city: "Bartın",
      kpssNot: "TÜRKİYE'DE ÜZERİNDE NEHİR TAŞIMACILIĞI YAPILAN TEK AKARSUDUR (Ağız kısmından içeriye doğru küçük tonajlı gemiler girebilir). Karadeniz'e dökülür."
    },
    {
      id: "nehir_filyos",
      name: "Yenice / Filyos Çayı",
      category: "su_kaynaklari",
      type: "Akarsu",
      shapeType: "polyline",
      coordinates: [[41.05, 32.65], [41.22, 32.35], [41.57, 32.03]],
      lat: 41.3,
      lng: 32.3,
      region: "Karadeniz",
      city: "Karabük - Zonguldak",
      kpssNot: "Batı Karadeniz'in önemli akarsularındandır; Filyos Limanı ve Sanayi Bölgesi bu akarsuyun ağzında kurulmuştur."
    },
    {
      id: "nehir_susurluk",
      name: "Susurluk Çayı (Simav Çayı)",
      category: "su_kaynaklari",
      type: "Akarsu",
      shapeType: "polyline",
      coordinates: [[39.25, 28.5], [39.91, 28.15], [40.38, 28.45]],
      lat: 39.91,
      lng: 28.15,
      region: "Marmara",
      city: "Balıkesir - Bursa",
      kpssNot: "Marmara Denizi'ne dökülen en büyük akarsudur. Güney Marmara'nın sularını toplayarak Kapıdağ Yarımadası doğusundan denize ulaşır."
    },
    {
      id: "nehir_ergene",
    groupId: 'grp_ergene_havzasi',
      name: "Ergene Nehri",
      category: "su_kaynaklari",
      type: "Akarsu",
      shapeType: "polyline",
      coordinates: [[41.6, 27.9], [41.3, 27.2], [41.2, 26.65]],
      lat: 41.3,
      lng: 27.2,
      region: "Marmara",
      city: "Tekirdağ - Kırklareli - Edirne",
      kpssNot: "Meriç Nehri'nin en büyük koludur. Trakya iç havzasının sularını toplar; pirinç/çeltik tarımında kullanılır."
    },
    {
      id: "nehir_bakircay",
      name: "Bakırçay",
      category: "su_kaynaklari",
      type: "Akarsu",
      shapeType: "polyline",
      coordinates: [[39.3, 27.8], [39.1, 27.35], [39.05, 26.95]],
      lat: 39.1,
      lng: 27.35,
      region: "Ege",
      city: "Manisa - İzmir",
      kpssNot: "Kendi adını taşıyan grabende batıya doğru akar ve Çandarlı Körfezi'ne (Dikili Deltası) dökülür."
    },
    {
      id: "nehir_kucuk_menderes",
      name: "Küçük Menderes Nehri",
      category: "su_kaynaklari",
      type: "Akarsu",
      shapeType: "polyline",
      coordinates: [[38.25, 28.25], [38.15, 27.75], [37.95, 27.28]],
      lat: 38.15,
      lng: 27.75,
      region: "Ege",
      city: "İzmir (Ödemiş - Torbalı - Selçuk)",
      kpssNot: "Bozdağlar ile Aydın Dağları arasındaki grabenden akar; taşıdığı alüvyonlarla antik liman kenti Efes'i denizden koparmıştır (Selçuk Deltası)."
    },
    {
      id: "nehir_dalaman",
      name: "Dalaman Çayı",
      category: "su_kaynaklari",
      type: "Akarsu (Karstik)",
      shapeType: "polyline",
      coordinates: [[37.2, 29.4], [36.95, 28.95], [36.7, 28.75]],
      lat: 36.95,
      lng: 28.95,
      region: "Ege / Akdeniz",
      city: "Muğla (Dalaman - Ortaca)",
      kpssNot: "Karstik kaynaklarla beslenir; akışı hızlı ve rafting için elverişlidir. Akdeniz'e dökülür."
    },
    {
      id: "nehir_esen",
      name: "Eşen Çayı",
      category: "su_kaynaklari",
      type: "Akarsu (Karstik)",
      shapeType: "polyline",
      coordinates: [[37.05, 29.6], [36.65, 29.35], [36.29, 29.27]],
      lat: 36.65,
      lng: 29.35,
      region: "Akdeniz",
      city: "Muğla - Antalya",
      kpssNot: "Muğla-Antalya sınırını oluşturur. Saklıkent Kanyonu ve antik Patara Plajı yanından Akdeniz'e ulaşır."
    },
    {
      id: "nehir_aksu",
      name: "Aksu Çayı",
      category: "su_kaynaklari",
      type: "Akarsu (Karstik)",
      shapeType: "polyline",
      coordinates: [[37.85, 30.95], [37.25, 30.85], [36.85, 30.9]],
      lat: 37.25,
      lng: 30.85,
      region: "Akdeniz",
      city: "Isparta - Antalya",
      kpssNot: "Eğirdir Gölü güneyinden doğup Antalya Körfezi'ne dökülen karstik rejimli akarsudur; Perge antik kenti yanından geçer."
    },
    {
      id: "nehir_koprucay",
      name: "Köprüçay",
      category: "su_kaynaklari",
      type: "Akarsu (Karstik)",
      shapeType: "polyline",
      coordinates: [[37.5, 31.25], [37.15, 31.18], [36.83, 31.15]],
      lat: 37.15,
      lng: 31.18,
      region: "Akdeniz",
      city: "Antalya (Manavgat - Serik)",
      kpssNot: "Köprülü Kanyon Milli Parkı'nı oluşturan, karstik gür kaynaklarla beslenen Türkiye'nin en popüler rafting nehridir."
    },
    {
      id: "nehir_seyhan",
      name: "Seyhan Nehri",
      category: "su_kaynaklari",
      type: "Akarsu",
      shapeType: "polyline",
      coordinates: [[38.75, 36.2], [37.85, 35.6], [36.98, 35.35], [36.72, 34.9]],
      lat: 37.4,
      lng: 35.4,
      region: "Akdeniz",
      city: "Kayseri - Adana",
      kpssNot: "Orta Toroslar'dan doğup Ceyhan ile birlikte Çukurova Deltası'nı oluşturur. Üzerinde Seyhan ve Çatalan barajları vardır."
    },
    {
      id: "nehir_ceyhan",
      name: "Ceyhan Nehri",
      category: "su_kaynaklari",
      type: "Akarsu",
      shapeType: "polyline",
      coordinates: [[38.3, 37.2], [37.55, 36.85], [37.02, 35.8], [36.58, 35.55]],
      lat: 37.3,
      lng: 36.3,
      region: "Akdeniz",
      city: "Kahramanmaraş - Osmaniye - Adana",
      kpssNot: "Elbistan Havzası'ndan doğar; Akdeniz'e dökülerek Çukurova Deltası'nı besler. Menzelet, Sır ve Aslantaş barajları üzerindedir."
    },
    {
      id: "nehir_kura",
      name: "Kura Nehri",
      category: "su_kaynaklari",
      type: "Akarsu (Kapalı Havza)",
      shapeType: "polyline",
      coordinates: [[40.9, 42.6], [41.15, 42.85], [41.2, 43.3]],
      lat: 41.1,
      lng: 42.85,
      region: "Doğu Anadolu",
      city: "Ardahan",
      kpssNot: "Türkiye'den doğup Gürcistan ve Azerbaycan üzerinden HAZAR DENİZİ KAPALI HAVZASI'NA dökülür (Sınır aşan / Kapalı havza)."
    },
    {
      id: "gol_acigol",
      name: "Acıgöl",
      category: "su_kaynaklari",
      type: "Tektonik Göl (Kapalı Havza)",
      lat: 37.82,
      lng: 29.88,
      areaKm2: 41,
      region: "Ege / Akdeniz",
      city: "Afyonkarahisar (Dazkırı) - Denizli (Çardak)",
      kpssNot: "Türkiye'nin doğal sodyum sülfat üretiminin neredeyse tamamının karşılandığı tektonik kapalı havza gölüdür."
    },
    {
      id: "gol_ilgin",
      name: "Ilgın (Çavuşçu) Gölü",
      category: "su_kaynaklari",
      type: "Tektonik Göl",
      lat: 38.35,
      lng: 31.88,
      areaKm2: 27,
      region: "İç Anadolu",
      city: "Konya (Ilgın)",
      kpssNot: "Konya Ovası'nın batısında yer alan, tarımsal sulamada kullanılan tatlı sulu tektonik göldür."
    },
    {
      id: "gol_kestel",
      name: "Kestel Gölü",
      category: "su_kaynaklari",
      type: "Karstik Göl (Polye)",
      lat: 37.45,
      lng: 30.12,
      areaKm2: 15,
      region: "Akdeniz",
      city: "Burdur (Bucak)",
      kpssNot: "Kestel polyesi tabanında yer alan, suları düdenlerle boşalan tipik karstik göldür."
    },
    {
      id: "gol_sugla",
      name: "Suğla Gölü",
      category: "su_kaynaklari",
      type: "Karstik Göl",
      lat: 37.33,
      lng: 31.98,
      areaKm2: 80,
      region: "İç Anadolu / Akdeniz",
      city: "Konya (Seydişehir)",
      kpssNot: "Toroslar eteğindeki karstik çanakta su tutan, yağışlı dönemlerde genişleyen karstik göldür; tarım sulamasında kullanılır."
    },
    {
      id: "gol_timras",
      name: "Timraş Obruk Gölü",
      category: "su_kaynaklari",
      type: "Karstik Obruk Gölü",
      lat: 37.62,
      lng: 32.9,
      areaKm2: 0.08,
      region: "İç Anadolu",
      city: "Konya (Çumra)",
      kpssNot: "Konya kapalı havzasında yeraltı sularının kalkerleri eritip tavanın çökmesiyle oluşan tipik derin obruk gölüdür."
    },
    {
      id: "gol_uludag_kilimli",
    groupId: 'grp_uludag_masifi',
      name: "Uludağ Kilimligöl (Buzul Sirk)",
      category: "su_kaynaklari",
      type: "Buzul (Sirk) Gölü",
      lat: 40.1,
      lng: 29.18,
      areaKm2: 0.02,
      region: "Marmara",
      city: "Bursa (Uludağ)",
      kpssNot: "Uludağ zirvesinde kuaterner buzul aşındırmasıyla oluşan ve dip tabanı çayır/kilim gibi bitki örtüsüyle kaplı sirk gölüdür."
    },
    {
      id: "gol_cilo_karagol",
    groupId: 'grp_cilo_buzul',
      name: "Cilo Karagöl (Buzul Sirk)",
      category: "su_kaynaklari",
      type: "Buzul (Sirk) Gölü",
      lat: 37.46,
      lng: 43.98,
      areaKm2: 0.05,
      region: "Doğu Anadolu",
      city: "Hakkari (Yüksekova / Cilo)",
      kpssNot: "Cilo-Sat Dağları zirvesinde (4.000 m civarı) kalıcı buzulların eteğindeki derin ve soğuk buzul sirk gölüdür."
    },
    {
      id: "gol_uzungol",
      name: "Uzungöl",
      category: "su_kaynaklari",
      type: "Heyelan Set Gölü",
      lat: 40.62,
      lng: 40.29,
      areaKm2: 0.2,
      region: "Karadeniz",
      city: "Trabzon (Çaykara)",
      kpssNot: "Haldizen Deresi vadisinin yamaçlardan kayan heyelan kütlesiyle kapanması sonucu oluşmuş ünlü heyelan set gölü ve turizm merkezidir."
    },
    {
      id: "gol_borabay",
      name: "Borabay Gölü",
      category: "su_kaynaklari",
      type: "Heyelan Set Gölü",
      lat: 40.86,
      lng: 36.15,
      areaKm2: 0.08,
      region: "Karadeniz",
      city: "Amasya (Taşova)",
      kpssNot: "Kocadağ eteğinde derenin heyelan kütlesiyle tıkanması sonucu krater gibi orman içinde oluşan doğa harikası heyelan set gölüdür."
    },
    {
      id: "gol_akyayan",
      name: "Akyayan Lagünü",
      category: "su_kaynaklari",
      type: "Kıyı Set Gölü (Lagün)",
      lat: 36.6,
      lng: 35.53,
      areaKm2: 31,
      region: "Akdeniz",
      city: "Adana (Karataş)",
      kpssNot: "Çukurova deltasında Ceyhan Nehri ağzı yakınında kıyı kordonunun koy önünü kapatmasıyla oluşan zengin kuş cenneti lagünüdür."
    },
    {
      id: "gol_agyatan",
      name: "Ağyatan Lagünü",
      category: "su_kaynaklari",
      type: "Kıyı Set Gölü (Lagün / Yaban Hayatı)",
      lat: 36.68,
      lng: 35.38,
      areaKm2: 22,
      region: "Akdeniz",
      city: "Adana (Karataş)",
      kpssNot: "Çukurova deltasında Seyhan ve Ceyhan nehirleri arasında yer alan, flamingolar ve göçmen su kuşlarının önemli kışlama alanı olan kıyı set gölüdür."
    }
  ],

  gecitler: [
    // --- AKDENİZ GEÇİTLERİ ---
    {
      id: "gecit_gulek",
    groupId: 'grp_gulek_bogazi',
      name: "Gülek Boğazı / Geçidi",
      category: "gecitler",
      type: "Dağ Geçidi",
      lat: 37.25,
      lng: 34.79,
      region: "Akdeniz / Orta Toroslar",
      city: "Adana - Mersin (Pozantı)",
      kpssNot: "Çukurova'yı (Adana/Mersin) İç Anadolu'ya (Niğde/Pozantı) bağlayan, tarihten bu yana en işlek Toros geçididir."
    },
    {
      id: "gecit_belen",
      name: "Belen Geçidi",
      category: "gecitler",
      type: "Dağ Geçidi",
      lat: 36.49,
      lng: 36.20,
      region: "Akdeniz / Amanos Dağları",
      city: "Hatay (İskenderun)",
      kpssNot: "Nur (Amanos) Dağları üzerinden İskenderun Limanı ve kıyısını Antakya/Amik Ovası ve Suriye'ye bağlar."
    },
    {
      id: "gecit_sertavul",
      name: "Sertavul Geçidi",
      category: "gecitler",
      type: "Dağ Geçidi",
      lat: 36.92,
      lng: 33.26,
      region: "Akdeniz / Orta Toroslar",
      city: "Mersin - Karaman (Mut)",
      kpssNot: "Silifke ve Mersin kıyılarını Karaman üzerinden İç Anadolu'ya bağlar."
    },
    {
      id: "gecit_cubuk",
      name: "Çubuk Boğazı / Geçidi",
      category: "gecitler",
      type: "Dağ Geçidi",
      lat: 37.15,
      lng: 30.58,
      region: "Akdeniz / Batı Toroslar",
      city: "Antalya - Burdur",
      kpssNot: "Antalya'yı Göller Yöresi'ne (Burdur/Isparta) bağlayan karstik boğaz geçididir."
    },

    // --- KARADENİZ GEÇİTLERİ ---
    {
      id: "gecit_zigana",
    groupId: 'grp_trabzon_zigana_koridoru',
      name: "Zigana (Kalkanlı) Geçidi",
      category: "gecitler",
      type: "Dağ Geçidi",
      lat: 40.64,
      lng: 39.43,
      region: "Karadeniz",
      city: "Trabzon - Gümüşhane",
      kpssNot: "Tarihi İpek Yolu güzergahında Trabzon Limanı'nı Gümüşhane ve Doğu Anadolu'ya bağlar. Yeni Zigana Tüneli Avrupa'nın en uzun tünellerindendir."
    },
    {
      id: "gecit_kop",
      name: "Kop Geçidi",
      category: "gecitler",
      type: "Dağ Geçidi",
      lat: 40.04,
      lng: 40.51,
      region: "Doğu Karadeniz / Doğu Anadolu",
      city: "Bayburt - Erzurum",
      kpssNot: "Bayburt'u Erzurum'a ve Doğu Anadolu'ya bağlayan yüksek dağ geçididir."
    },
    {
      id: "gecit_ovit",
    groupId: 'grp_ovit_koridoru',
      name: "Ovit Geçidi",
      category: "gecitler",
      type: "Dağ Geçidi",
      lat: 40.62,
      lng: 40.79,
      region: "Karadeniz / Doğu Anadolu",
      city: "Rize - Erzurum (İkizdere)",
      kpssNot: "Rize (İkizdere) ile Erzurum (İspir) arasındadır. Ovit Tüneli ile kışın kapanan yol yıl boyu açık hale getirilmiştir."
    },
    {
      id: "gecit_ilgaz",
    groupId: 'grp_ilgaz_koridoru',
      name: "Ilgaz Geçidi",
      category: "gecitler",
      type: "Dağ Geçidi",
      lat: 41.07,
      lng: 33.74,
      region: "Karadeniz / İç Anadolu",
      city: "Kastamonu - Çankırı",
      kpssNot: "Kastamonu ile Çankırı/Ankara arasındaki Ilgaz Dağları'nı aşan geçittir."
    },
    {
      id: "gecit_ecevit",
      name: "Ecevit Geçidi",
      category: "gecitler",
      type: "Dağ Geçidi",
      lat: 41.80,
      lng: 33.72,
      region: "Karadeniz",
      city: "Kastamonu (İnebolu)",
      kpssNot: "Küre Dağları'nı aşarak İnebolu Limanı'nı Kastamonu'ya bağlar (Milli Mücadele İstiklal Yolu)."
    },
    {
      id: "gecit_bolu",
      name: "Bolu Dağı Geçidi",
      category: "gecitler",
      type: "Dağ Geçidi",
      lat: 40.75,
      lng: 31.35,
      region: "Karadeniz / Marmara",
      kpssNot: "İstanbul ile Ankara arasındaki en kritik dağ geçişidir. Bolu Dağı Tüneli ile ulaşım kolaylaşmıştır."
    },

    // --- STRATEJİK DENİZ BOĞAZLARI ---
    {
      id: "bogaz_istanbul",
      name: "İstanbul Boğazı (Bosphorus)",
      category: "gecitler",
      shapeType: "polyline",
      coordinates: [
        [41.24, 29.13],
        [41.13, 29.07],
        [41.02, 29.00]
      ],
      lat: 41.12,
      lng: 29.05,
      type: "Deniz Boğazı (Ria Kıyı / Su Yolu)",
      region: "Marmara (İstanbul)",
      city: "İstanbul",
      kpssNot: "Karadeniz ile Marmara'yı bağlayan dünyaca ünlü ria tipi su yoludur. Karadeniz'den Marmara'ya üst akıntı, Marmara'dan Karadeniz'e alt akıntı gerçekleşir."
    },
    {
      id: "bogaz_canakkale",
    groupId: 'grp_canakkale_bogazi_koprusu',
      name: "Çanakkale Boğazı (Dardanelles)",
      category: "gecitler",
      shapeType: "polyline",
      coordinates: [
        [40.40, 26.68],
        [40.18, 26.40],
        [40.03, 26.20]
      ],
      lat: 40.15,
      lng: 26.40,
      type: "Deniz Boğazı (Ria Kıyı / Su Yolu)",
      region: "Marmara / Ege",
      city: "Çanakkale",
      kpssNot: "Marmara Denizi ile Ege Denizi'ni bağlayan tarihi ve stratejik ria tipi boğazdır. En dar yeri Nara Burnu'dur."
    }
  ],

  // --- 🔗 SEBEP-SONUÇ VE İLİŞKİLİ COĞRAFYA EŞLEŞTİRMELERİ ---
  iliskili_cografya: [
    {
      id: "match_kizilirmak_bafra",
    groupId: 'grp_bafra_deltasi',
      name: "Bafra Deltası",
      matchSource: "Kızılırmak Nehri",
      category: "iliskili_cografya",
      matchType: "akarsu_delta",
      shapeType: "polyline",
      coordinates: [
        [39.80, 38.30], [39.50, 36.00], [38.70, 34.80], [39.00, 33.70], [40.00, 33.40], [41.00, 34.50], [41.56, 35.90]
      ],
      lat: 41.56,
      lng: 35.90,
      type: "Akarsu ➡️ Delta Eşleştirmesi",
      region: "Karadeniz",
      city: "Samsun (Bafra)",
      questionText: "🌊 Kızılırmak Nehri'nin Karadeniz'e döküldüğü yerde oluşturduğu delta ovası hangisidir?",
      kpssNot: "Kızılırmak ➡️ Bafra Ovası (Samsun). Türkiye'nin en uzun nehri Bafra Deltası'nı besler."
    },
    {
      id: "match_yesilirmak_carsamba",
    groupId: 'grp_carsamba_deltasi',
      name: "Çarşamba Deltası",
      matchSource: "Yeşilırmak Nehri",
      category: "iliskili_cografya",
      matchType: "akarsu_delta",
      shapeType: "polyline",
      coordinates: [
        [39.90, 38.80], [40.15, 36.55], [40.65, 35.85], [41.20, 36.75]
      ],
      lat: 41.20,
      lng: 36.75,
      type: "Akarsu ➡️ Delta Eşleştirmesi",
      region: "Karadeniz",
      city: "Samsun (Çarşamba)",
      questionText: "🌊 Yeşilırmak Nehri'nin Karadeniz'e dökülürken oluşturduğu delta ovası hangisidir?",
      kpssNot: "Yeşilırmak ➡️ Çarşamba Ovası (Samsun). Çarşamba Ovası geniş alüvyon birikimidir."
    },
    {
      id: "match_seyhan_ceyhan_cukurova",
    groupId: 'grp_cukurova_deltasi_havza',
      name: "Çukurova Deltası",
      matchSource: "Seyhan & Ceyhan Nehirleri",
      category: "iliskili_cografya",
      matchType: "akarsu_delta",
      lat: 36.85,
      lng: 35.50,
      type: "Akarsu ➡️ Delta Eşleştirmesi",
      region: "Akdeniz",
      city: "Adana - Mersin",
      questionText: "🌊 Seyhan ve Ceyhan nehirlerinin Akdeniz'e döküldüğü yerde oluşturduğu Türkiye'nin en büyük deltası hangisidir?",
      kpssNot: "Seyhan ve Ceyhan ➡️ Çukurova Deltası (Adana/Mersin). Türkiye'nin en büyük kıyı deltasıdır."
    },
    {
      id: "match_goksu_silifke",
    groupId: 'grp_silifke_deltasi',
      name: "Silifke Deltası",
      matchSource: "Göksu Nehri",
      category: "iliskili_cografya",
      matchType: "akarsu_delta",
      shapeType: "polyline",
      coordinates: [
        [37.20, 32.10], [36.80, 32.90], [36.35, 33.95]
      ],
      lat: 36.35,
      lng: 33.95,
      type: "Akarsu ➡️ Delta Eşleştirmesi",
      region: "Akdeniz",
      city: "Mersin (Silifke)",
      questionText: "🌊 Göksu Nehri'nin Akdeniz kıyısında oluşturduğu verimli delta ovası hangisidir?",
      kpssNot: "Göksu ➡️ Silifke Deltası (Mersin). Akdeniz'in ikinci büyük deltasıdır."
    },
    {
      id: "match_gediz_menemen",
      name: "Menemen Deltası",
      matchSource: "Gediz Nehri",
      category: "iliskili_cografya",
      matchType: "akarsu_delta",
      shapeType: "polyline",
      coordinates: [
        [38.90, 29.50], [38.60, 28.20], [38.50, 27.20], [38.58, 26.90]
      ],
      lat: 38.58,
      lng: 26.90,
      type: "Akarsu ➡️ Delta Eşleştirmesi",
      region: "Ege",
      city: "İzmir (Menemen)",
      questionText: "🌊 Gediz Nehri'nin İzmir Körfezi girişinde oluşturduğu delta ovası hangisidir?",
      kpssNot: "Gediz ➡️ Menemen Deltası (İzmir). İzmir Kuş Cenneti bu deltada yer alır."
    },
    {
      id: "match_bmenderes_balat",
      name: "Balat Deltası",
      matchSource: "Büyük Menderes Nehri",
      category: "iliskili_cografya",
      matchType: "akarsu_delta",
      shapeType: "polyline",
      coordinates: [
        [38.10, 30.10], [37.85, 29.10], [37.88, 27.80], [37.55, 27.25]
      ],
      lat: 37.55,
      lng: 27.25,
      type: "Akarsu ➡️ Delta Eşleştirmesi",
      region: "Ege",
      city: "Aydın (Didim)",
      questionText: "🌊 Büyük Menderes Nehri'nin Ege Denizi'ne döküldüğü yerde oluşturduğu delta ovası hangisidir?",
      kpssNot: "Büyük Menderes ➡️ Balat Deltası (Aydın). Antik Milet şehri alüvyon dolmasıyla denizden içeride kalmıştır."
    },
    {
      id: "match_kmenderes_selcuk",
    groupId: 'grp_efes_selcuk',
      name: "Selçuk Deltası",
      matchSource: "Küçük Menderes Nehri",
      category: "iliskili_cografya",
      matchType: "akarsu_delta",
      lat: 37.95,
      lng: 27.30,
      type: "Akarsu ➡️ Delta Eşleştirmesi",
      region: "Ege",
      city: "İzmir (Selçuk)",
      questionText: "🌊 Küçük Menderes Nehri'nin oluşturduğu ve Efes Antik Kenti'nin denizle bağını kesen delta hangisidir?",
      kpssNot: "Küçük Menderes ➡️ Selçuk Deltası (İzmir). Efes liman kentini alüvyonlarla içeride bırakmıştır."
    },
    {
      id: "match_nur_belen",
    groupId: 'grp_belen_gecidi',
      name: "Belen Geçidi",
      matchSource: "Nur (Amanos) Dağları",
      category: "iliskili_cografya",
      matchType: "dag_gecit",
      shapeType: "polyline",
      coordinates: [
        [36.30, 36.15], [36.75, 36.30], [37.10, 36.45]
      ],
      lat: 36.49,
      lng: 36.20,
      type: "Dağ ➡️ Geçit Eşleştirmesi",
      region: "Akdeniz",
      city: "Hatay (İskenderun)",
      questionText: "🏔️ Nur (Amanos) Dağları'nı aşarak İskenderun Limanı'nı Amik Ovası'na bağlayan geçit hangisidir?",
      kpssNot: "Nur Dağları ➡️ Belen Geçidi. Ege dışındaki tek horst dağı üzerindeki kritik boğazdır."
    },
    {
      id: "match_toros_gulek",
    groupId: 'grp_gulek_bogazi',
      name: "Gülek Boğazı / Geçidi",
      matchSource: "Orta Toroslar (Bolkar Dağları)",
      category: "iliskili_cografya",
      matchType: "dag_gecit",
      shapeType: "polyline",
      coordinates: [
        [37.05, 34.20], [37.25, 34.60], [37.45, 35.00]
      ],
      lat: 37.25,
      lng: 34.79,
      type: "Dağ ➡️ Geçit Eşleştirmesi",
      region: "Akdeniz",
      city: "Adana - Mersin",
      questionText: "🏔️ Orta Toroslar (Bolkar Dağları) üzerinden Çukurova'yı İç Anadolu'ya bağlayan en işlek geçit hangisidir?",
      kpssNot: "Orta Toroslar ➡️ Gülek Boğazı (Adana-Pozantı-Niğde yolu)."
    },
    {
      id: "match_dogu_karadeniz_zigana",
    groupId: 'grp_trabzon_zigana_koridoru',
      name: "Zigana (Kalkanlı) Geçidi",
      matchSource: "Doğu Karadeniz Dağları",
      category: "iliskili_cografya",
      matchType: "dag_gecit",
      lat: 40.64,
      lng: 39.43,
      type: "Dağ ➡️ Geçit Eşleştirmesi",
      region: "Karadeniz",
      city: "Trabzon - Gümüşhane",
      questionText: "🏔️ Doğu Karadeniz Dağları'nı aşarak Trabzon Limanı'nı Gümüşhane/Erzurum'a bağlayan tarihi geçit hangisidir?",
      kpssNot: "Kuzey Anadolu Dağları ➡️ Zigana Geçidi (Tarihi İpek Yolu liman kapısı)."
    },
    {
      id: "match_kackar_ovit",
    groupId: 'grp_ovit_koridoru',
      name: "Ovit Geçidi / Tüneli",
      matchSource: "Kaçkar Dağları",
      category: "iliskili_cografya",
      matchType: "dag_gecit",
      shapeType: "polyline",
      coordinates: [
        [40.60, 40.80], [40.83, 41.16], [41.10, 41.60]
      ],
      lat: 40.62,
      lng: 40.79,
      type: "Dağ ➡️ Geçit Eşleştirmesi",
      region: "Karadeniz",
      city: "Rize - Erzurum",
      questionText: "🏔️ Kaçkar Dağları'nı aşarak Rize (İkizdere) ile Erzurum (İspir) arasını bağlayan yüksek dağ geçidi hangisidir?",
      kpssNot: "Kaçkar Dağları ➡️ Ovit Geçidi / Tüneli."
    },
    {
      id: "match_kure_ecevit",
      name: "Ecevit Geçidi",
      matchSource: "Küre (İsfendiyar) Dağları",
      category: "iliskili_cografya",
      matchType: "dag_gecit",
      shapeType: "polyline",
      coordinates: [
        [41.60, 33.10], [41.70, 33.70], [41.80, 34.30]
      ],
      lat: 41.80,
      lng: 33.72,
      type: "Dağ ➡️ Geçit Eşleştirmesi",
      region: "Karadeniz",
      city: "Kastamonu",
      questionText: "🏔️ Küre Dağları'nı aşarak İnebolu Limanı'nı Kastamonu ve Ankara'ya bağlayan İstiklal Yolu geçidi hangisidir?",
      kpssNot: "Küre Dağları ➡️ Ecevit Geçidi (İstiklal Yolu)."
    },
    {
      id: "match_ilgaz_ilgazgecit",
    groupId: 'grp_ilgaz_koridoru',
      name: "Ilgaz Geçidi",
      matchSource: "Ilgaz Dağları",
      category: "iliskili_cografya",
      matchType: "dag_gecit",
      shapeType: "polyline",
      coordinates: [
        [40.95, 33.30], [41.08, 33.73], [41.20, 34.15]
      ],
      lat: 41.07,
      lng: 33.74,
      type: "Dağ ➡️ Geçit Eşleştirmesi",
      region: "Karadeniz / İç Anadolu",
      questionText: "🏔️ Ilgaz Dağları üzerinden Kastamonu ile Çankırı/Ankara arasını bağlayan geçit hangisidir?",
      kpssNot: "Ilgaz Dağları ➡️ Ilgaz Geçidi."
    },
    {
      id: "match_erciyes_kapadokya",
    groupId: 'grp_kapadokya_goreme',
      name: "Kapadokya Peri Bacaları",
      matchSource: "Erciyes ve Hasan Dağı Volkanizması",
      category: "iliskili_cografya",
      matchType: "olusum_sekil",
      lat: 38.64,
      lng: 34.83,
      type: "Volkanizma ➡️ Yer Şekli",
      region: "İç Anadolu",
      city: "Nevşehir - Kayseri",
      questionText: "🌋 Erciyes ve Hasan Dağı'ndan çıkan volkanik tüf ve lavların akarsu/rüzgarla aşınmasıyla oluşan turistik alan hangisidir?",
      kpssNot: "Erciyes ve Hasan Dağı Tüfleri ➡️ Kapadokya Peri Bacaları (Nevşehir/Ürgüp/Göreme)."
    },
    {
      id: "match_basyan_bafa",
      name: "Bafa (Çamiçi) Gölü",
      matchSource: "Büyük Menderes Alüvyonları",
      category: "iliskili_cografya",
      matchType: "olusum_sekil",
      lat: 37.50,
      lng: 27.42,
      type: "Akarsu Biriktirmesi ➡️ Göl Oluşumu",
      region: "Ege",
      questionText: "🌊 Büyük Menderes'in taşıdığı alüvyonların Latmos Körfezi'nin önünü kapatmasıyla denizden ayrılan set gölü hangisidir?",
      kpssNot: "Büyük Menderes Alüvyonları ➡️ Bafa (Çamiçi) Alüvyal Set Gölü."
    },
    {
      id: "match_karapinar_meke",
    groupId: 'grp_meke_tuzlasi',
      name: "Meke Maar Gölü",
      matchSource: "Karapınar Gaz Patlaması",
      category: "iliskili_cografya",
      matchType: "olusum_sekil",
      lat: 37.69,
      lng: 33.64,
      type: "Volkanik Patlama (Maar) ➡️ Göl Oluşumu",
      region: "İç Anadolu",
      city: "Konya (Karapınar)",
      questionText: "🌋 Konya Karapınar'da gaz patlaması (maar) sonucu oluşan ve 'Dünyanın Nazar Boncuğu' olarak anılan göl hangisidir?",
      kpssNot: "Volkanik Gaz Patlaması ➡️ Meke Maarı (Konya)."
    }
  ],

  // --- 🚜 TARIM: ÜRÜN - YÖRE EŞLEŞMELERİ ---
    tarim: [
    // --- 1. TAHILLAR (HUBUBAT) ---
    {
      id: "tarim_bugday", name: "Buğday", shortName: "Buğday", category: "tarim",
      promptTitle: "Karasal iklim şartlarına uygun, Türkiye'de ekim alanı en geniş olup en fazla Konya'da yetiştirilen temel tahıl haritada neresidir?",
      type: "Tahıl (Hububat)", lat: 37.87, lng: 32.48, region: "İç Anadolu", city: "Konya",
      groupId: "tarim_grp_konya", shapeType: "point",
      kpssNot: "Karasal iklim şartlarına uygun bir ürün olup Türkiye'de en fazla Konya ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_arpa", name: "Arpa", shortName: "Arpa", category: "tarim",
      promptTitle: "Buğdayla benzer yetişme koşullarına sahip, soğuğa daha dayanıklı ve en fazla Konya'da üretilen tahıl haritada neresidir?",
      type: "Tahıl (Hububat / Yem)", lat: 37.87, lng: 32.48, region: "İç Anadolu", city: "Konya",
      groupId: "tarim_grp_konya", shapeType: "point",
      kpssNot: "Buğdayla benzer yetişme koşullarına sahiptir ve en fazla Konya ilinde üretilmektedir."
    },
    {
      id: "tarim_cavdar", name: "Çavdar", shortName: "Çavdar", category: "tarim",
      promptTitle: "Soğuğa ve kıraç topraklara en dayanıklı tahıl olup en çok Kayseri ilinde yetiştirilen ürün haritada neresidir?",
      type: "Tahıl (Hububat)", lat: 38.73, lng: 35.48, region: "İç Anadolu", city: "Kayseri",
      groupId: "tarim_grp_kayseri", shapeType: "point",
      kpssNot: "Tahıllar içinde soğuğa en dayanıklı ürünlerden biri olup en çok Kayseri ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_yulaf", name: "Yulaf", shortName: "Yulaf", category: "tarim",
      promptTitle: "Bisküvi sanayisi ve hayvan yemi olarak kullanılan, en fazla Sivas ilinde üretilen tahıl haritada neresidir?",
      type: "Tahıl (Hububat)", lat: 39.75, lng: 37.01, region: "İç Anadolu", city: "Sivas",
      shapeType: "point",
      kpssNot: "Bisküvi sanayisi ve yem bitkisi olarak kullanılan yulaf, en fazla Sivas ilinde üretilmektedir."
    },
    {
      id: "tarim_misir", name: "Mısır", shortName: "Mısır", category: "tarim",
      promptTitle: "Doğal ortamı Karadeniz olmasına rağmen sulama projeleriyle (Mavi Tünel) günümüzde en fazla Konya'da yetiştirilen ürün haritada neresidir?",
      type: "Tahıl (Sulu Tarım)", lat: 37.87, lng: 32.48, region: "İç Anadolu", city: "Konya",
      groupId: "tarim_grp_konya", shapeType: "point",
      kpssNot: "Doğal ortamı Karadeniz iklimi olmasına rağmen, sulama projelerinin (Mavi Tünel - KOP) etkisiyle günümüzde en fazla Konya ilinde yetiştirilmektedir."
    },

    // --- 2. BAKLAGİLLER ---
    {
      id: "tarim_kirmizi_mercimek", name: "Kırmızı Mercimek", shortName: "Kırmızı Mercimek", category: "tarim",
      promptTitle: "Kuraklığa ve yüksek sıcaklığa en dayanıklı baklagil olup en çok Şanlıurfa'da üretilen ürün haritada neresidir?",
      type: "Baklagil (Kurakçıl)", lat: 37.16, lng: 38.79, region: "Güneydoğu Anadolu", city: "Şanlıurfa",
      groupId: "tarim_grp_sanliurfa", shapeType: "point",
      kpssNot: "Kuraklığa en dayanıklı tarım ürünlerinden biri olup en çok Şanlıurfa ilinde üretilmektedir."
    },
    {
      id: "tarim_yesil_mercimek", name: "Yeşil Mercimek", shortName: "Yeşil Mercimek", category: "tarim",
      promptTitle: "İç Anadolu şartlarına uyum sağlamış, en fazla Yozgat ilinde yetiştirilen baklagil haritada neresidir?",
      type: "Baklagil", lat: 39.82, lng: 34.81, region: "İç Anadolu", city: "Yozgat",
      shapeType: "point",
      kpssNot: "İç Anadolu karasal ikliminde yetiştirilen yeşil mercimek, en fazla Yozgat ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_nohut", name: "Nohut", shortName: "Nohut", category: "tarim",
      promptTitle: "Türkiye'de ekim alanı en yaygın baklagil olup en çok Ankara ilinde üretilen ürün haritada neresidir?",
      type: "Baklagil", lat: 39.93, lng: 32.86, region: "İç Anadolu", city: "Ankara",
      groupId: "tarim_grp_ankara", shapeType: "point",
      kpssNot: "Baklagiller içinde Türkiye genelinde ekim alanı en yaygın ürün olup en çok Ankara ilinde üretilmektedir."
    },

    // --- 3. SANAYİ BİTKİLERİ ---
    {
      id: "tarim_pirinc", name: "Pirinç (Çeltik)", shortName: "Pirinç (Çeltik)", category: "tarim",
      promptTitle: "Akarsu boylarındaki sulak alanlarda yetişen, sıtma riski nedeniyle devlet kontrolünde olup en çok Edirne'de yetiştirilen ürün haritada neresidir?",
      type: "Sanayi Bitkisi (Devlet Kontrollü)", lat: 41.68, lng: 26.56, region: "Marmara", city: "Edirne",
      shapeType: "point",
      kpssNot: "Akarsu boylarındaki sulak ve bataklık alanlarda yetişen, sıtma hastalığı riski nedeniyle üretimi devlet kontrolünde olan pirinç, en çok Edirne (Meriç-Ergene havzası) ilinde üretilmektedir."
    },
    {
      id: "tarim_pamuk", name: "Pamuk", shortName: "Pamuk", category: "tarim",
      promptTitle: "GAP sulama projeleri sonrasında Türkiye üretiminde açık ara ilk sıraya yerleşen Şanlıurfa'nın beyaz altını haritada neresidir?",
      type: "Sanayi Bitkisi (Dokuma Hammaddesi)", lat: 37.16, lng: 38.79, region: "Güneydoğu Anadolu", city: "Şanlıurfa",
      groupId: "tarim_grp_sanliurfa", shapeType: "point",
      kpssNot: "GAP ile sulama imkânlarının artması sonucu günümüzde Türkiye pamuk üretiminde açık ara en fazla Şanlıurfa ilinde üretilmektedir."
    },
    {
      id: "tarim_sekerpancari", name: "Şeker Pancarı", shortName: "Şeker Pancarı", category: "tarim",
      promptTitle: "Hasattan sonra çabuk bozulduğu için fabrikaları tarlaya yakın kurulan, en fazla Konya'da üretilen sanayi bitkisi haritada neresidir?",
      type: "Sanayi Bitkisi", lat: 37.87, lng: 32.48, region: "İç Anadolu", city: "Konya",
      groupId: "tarim_grp_konya", shapeType: "point",
      kpssNot: "Hasat edildikten sonra çabuk bozulduğu için fabrikaları tarlalara yakın kurulan şeker pancarı, en fazla Konya ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_hashas", name: "Haşhaş", shortName: "Haşhaş", category: "tarim",
      promptTitle: "Uyuşturucu yapımında kullanıldığı için ekimi devlet denetiminde olan ve en fazla Afyonkarahisar'da üretilen bitki haritada neresidir?",
      type: "Sanayi Bitkisi (Devlet Kontrollü)", lat: 38.76, lng: 30.54, region: "Ege", city: "Afyonkarahisar",
      shapeType: "point",
      kpssNot: "Uyuşturucu yapımında kullanılması sebebiyle ekimi devlet denetiminde olan haşhaş, en fazla Afyonkarahisar ilinde üretilmektedir."
    },
    {
      id: "tarim_cay", name: "Çay", shortName: "Çay", category: "tarim",
      promptTitle: "Bol yağış ve asidik toprak isteyen, Doğu Karadeniz mikroklimasında ve en çok Rize'de yetiştirilen monokültür bitkisi haritada neresidir?",
      type: "Sanayi Bitkisi (Monokültür)", lat: 41.02, lng: 40.52, region: "Karadeniz", city: "Rize",
      shapeType: "point",
      kpssNot: "Bol yağış, nem ve asidik toprak isteyen çay, Türkiye'de en dar alanda yetişen monokültür bitkisidir; en çok Rize ve çevresinde üretilmektedir."
    },
    {
      id: "tarim_keten", name: "Keten", shortName: "Keten", category: "tarim",
      promptTitle: "Lifleri dokuma ve kâğıt para yapımında kullanılan, tohumundan bezir yağı elde edilen ve en çok Uşak'ta yetiştirilen bitki haritada neresidir?",
      type: "Sanayi Bitkisi (Lif / Yağ)", lat: 38.68, lng: 29.41, region: "Ege", city: "Uşak",
      shapeType: "point",
      kpssNot: "Lifleri dokuma ve kâğıt para yapımında kullanılan, tohumundan bezir yağı elde edilen keten, en çok Uşak ilinde üretilmektedir."
    },

    // --- 4. YAĞ BİTKİLERİ ---
    {
      id: "tarim_soya_fasulyesi", name: "Soya Fasulyesi", shortName: "Soya Fasulyesi", category: "tarim",
      promptTitle: "Sanayi amaçlı üretilen, zengin protein ve yağ oranına sahip olup Çukurova'da en çok Adana'da yetiştirilen yağ bitkisi haritada neresidir?",
      type: "Yağ Bitkisi / Sanayi", lat: 37.00, lng: 35.32, region: "Akdeniz", city: "Adana",
      groupId: "tarim_grp_adana", shapeType: "point",
      kpssNot: "Sanayi amaçlı üretilen bir yağ bitkisi olup Çukurova'da ikinci ürün olarak en çok Adana çevresinde yetiştirilmektedir."
    },
    {
      id: "tarim_aspir", name: "Aspir", shortName: "Aspir", category: "tarim",
      promptTitle: "Karasal iklim bölgelerinde kıraç arazilere uyum sağlayan, biyodizel ve yağ üretiminde kullanılan ve en fazla Kayseri'de üretilen bitki haritada neresidir?",
      type: "Yağ Bitkisi / Biyodizel", lat: 38.73, lng: 35.48, region: "İç Anadolu", city: "Kayseri",
      groupId: "tarim_grp_kayseri", shapeType: "point",
      kpssNot: "Karasal iklim bölgelerinde kıraç arazilere uyum sağlayan bu yağ bitkisi en fazla Kayseri ilinde üretilmektedir."
    },
    {
      id: "tarim_kanola", name: "Kanola (Koza)", shortName: "Kanola (Koza)", category: "tarim",
      promptTitle: "Biyodizel ve bitkisel yağ sanayisinde kullanılan, Trakya'da yaygın olup en çok Tekirdağ'da yetiştirilen yağ bitkisi haritada neresidir?",
      type: "Yağ Bitkisi", lat: 40.98, lng: 27.51, region: "Marmara", city: "Tekirdağ",
      shapeType: "point",
      kpssNot: "Bitkisel yağ ve biyodizel yakıt üretiminde kullanılan kanola (koza), en çok Tekirdağ ilinde yetiştirilmektedir."
    },

    // --- 5. MEYVELER ---
    {
      id: "tarim_incir", name: "İncir", shortName: "İncir", category: "tarim",
      promptTitle: "Kış ılıklığı isteyen, don olayına duyarlı ve Türkiye'nin dünya ihracatında lider olduğu, en fazla Aydın'da üretilen meyve haritada neresidir?",
      type: "Meyvecilik / İhraç Ürünü", lat: 37.85, lng: 27.84, region: "Ege", city: "Aydın",
      shapeType: "point",
      kpssNot: "Kış ılıklığı isteyen ve Türkiye'nin dünya ihracatında lider olduğu incir, en fazla Aydın ilinde üretilmektedir."
    },
    {
      id: "tarim_limon", name: "Limon (Turunçgil)", shortName: "Limon", category: "tarim",
      promptTitle: "Kış donlarına karşı en duyarlı turunçgil türü olup Türkiye üretiminde ilk sırada yer alan Mersin'in sembol meyvesi haritada neresidir?",
      type: "Meyvecilik (Narenciye)", lat: 36.81, lng: 34.64, region: "Akdeniz", city: "Mersin",
      groupId: "tarim_grp_mersin", shapeType: "point",
      kpssNot: "Turunçgiller içinde kış ılıklığı ihtiyacı en yüksek olan limon, Türkiye'de en fazla Mersin ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_turuncgil_adana", name: "Turunçgiller (Portakal, Mandalina, Greyfurt)", shortName: "Portakal, Mandalina, Greyfurt", category: "tarim",
      promptTitle: "Kış ılıklığı isteyen; portakal, mandalina ve greyfurt gibi turunçgillerin Türkiye'de en çok üretildiği Çukurova ili haritada neresidir?",
      type: "Meyvecilik (Narenciye)", lat: 37.00, lng: 35.32, region: "Akdeniz", city: "Adana",
      groupId: "tarim_grp_adana", shapeType: "point",
      kpssNot: "Limon en fazla Mersin ilinde yetiştirilirken; portakal, mandalina ve greyfurt gibi diğer turunçgiller en çok Adana ilinde üretilmektedir."
    },
    {
      id: "tarim_uzum", name: "Üzüm", shortName: "Üzüm", category: "tarim",
      promptTitle: "Soğuğa en dayanıklı meyvelerden biri olan ve çekirdeksiz kuru üretimde Manisa'nın ilk sırada yer aldığı meyve haritada neresidir?",
      type: "Meyvecilik / İhraç Ürünü", lat: 38.61, lng: 27.43, region: "Ege", city: "Manisa",
      groupId: "tarim_grp_manisa", shapeType: "point",
      kpssNot: "Soğuğa en dayanıklı meyvelerden biri olan üzüm, en fazla Manisa ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_elma", name: "Elma", shortName: "Elma", category: "tarim",
      promptTitle: "Üzüm gibi soğuğa dayanıklı, geniş ekim alanına sahip olan ve Göller Yöresi'nde en çok Isparta'da üretilen meyve haritada neresidir?",
      type: "Meyvecilik", lat: 37.76, lng: 30.55, region: "Akdeniz", city: "Isparta",
      shapeType: "point",
      kpssNot: "Üzüm gibi soğuğa dayanıklı ve geniş bir ekim alanına sahip olan elma, en çok Isparta ilinde üretilmektedir."
    },
    {
      id: "tarim_muz", name: "Muz", shortName: "Muz", category: "tarim",
      promptTitle: "Mikroklima şartlarında ve seracılık faaliyetleriyle yetişen, en çok Antalya (Alanya) ve Anamur hattında üretilen tropikal meyve haritada neresidir?",
      type: "Meyvecilik (Mikroklima / Tropikal)", lat: 36.89, lng: 30.71, region: "Akdeniz", city: "Antalya",
      groupId: "tarim_grp_antalya", shapeType: "point",
      kpssNot: "Mikroklima şartlarında ve seracılık faaliyetleriyle yetişen muz, en çok Antalya (Alanya) ve Anamur hattında (Antalya ili ön plandadır) üretilmektedir."
    },
    {
      id: "tarim_cilek", name: "Çilek", shortName: "Çilek", category: "tarim",
      promptTitle: "Erkenci örtü altı yetiştiriciliği ve Akdeniz iklimiyle en fazla Mersin (Silifke) ilinde üretilen meyve haritada neresidir?",
      type: "Meyvecilik / Örtü Altı", lat: 36.81, lng: 34.64, region: "Akdeniz", city: "Mersin",
      groupId: "tarim_grp_mersin", shapeType: "point",
      kpssNot: "Erkenci örtü altı yetiştiriciliği ve Akdeniz iklimiyle çilek en fazla Mersin (Silifke) ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_avokado", name: "Avokado", shortName: "Avokado", category: "tarim",
      promptTitle: "Kış ılıklığı ve subtropikal iklim isteyen, Türkiye'de üretimi hızla artan ve en çok Antalya'da yetiştirilen tropikal meyve haritada neresidir?",
      type: "Meyvecilik (Tropikal)", lat: 36.89, lng: 30.71, region: "Akdeniz", city: "Antalya",
      groupId: "tarim_grp_antalya", shapeType: "point",
      kpssNot: "Subtropikal iklim şartları ve kış ılıklığı isteyen avokado, Türkiye'de en çok Antalya ilinde yetiştirilmektedir."
    },

    // --- 6. YUMRULU VE DİĞER TARIM ÜRÜNLERİ ---
    {
      id: "tarim_sarimsak",
    groupId: 'grp_taskopru_sarimsak', name: "Sarımsak", shortName: "Sarımsak", category: "tarim",
      promptTitle: "Coğrafi işaretli Taşköprü üretimiyle ünlü, yüksek aromalı ve en fazla Kastamonu'da yetiştirilen yumrulu ürün haritada neresidir?",
      type: "Yumrulu Tarım Ürünü (Coğrafi İşaret)", lat: 41.38, lng: 33.78, region: "Karadeniz", city: "Kastamonu",
      shapeType: "point",
      kpssNot: "Yüksek aroması ve Taşköprü coğrafi işaretiyle bilinen sarımsak, en fazla Kastamonu ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_susam", name: "Susam", shortName: "Susam", category: "tarim",
      promptTitle: "Sıcak iklim isteyen, tahin ve helva sanayisinin hammaddesi olan ve en çok Antalya'da üretilen yağlı tohum ürünü haritada neresidir?",
      type: "Yağlı Tohum / Sanayi", lat: 36.89, lng: 30.71, region: "Akdeniz", city: "Antalya",
      groupId: "tarim_grp_antalya", shapeType: "point",
      kpssNot: "Sıcak ve güneşli iklim isteyen, tahin ve helva sanayisinde kullanılan susam en çok Antalya ilinde üretilmektedir."
    },
    {
      id: "tarim_kiraz", name: "Kiraz", shortName: "Kiraz", category: "tarim",
      promptTitle: "Türkiye'nin önemli bir ihraç meyvesi olan, Kemalpaşa bahçeleriyle ünlü ve en fazla İzmir'de yetiştirilen meyve haritada neresidir?",
      type: "Meyvecilik / İhraç Ürünü", lat: 38.42, lng: 27.14, region: "Ege", city: "İzmir",
      shapeType: "point",
      kpssNot: "Türkiye'nin önemli bir ihraç meyvesi olan kiraz (Kemalpaşa bahçeleri), en fazla İzmir ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_yer_fistigi", name: "Yer Fıstığı", shortName: "Yer Fıstığı", category: "tarim",
      promptTitle: "Gevşek kumlu toprak isteyen, Çukurova ve Osmaniye havzasıyla en fazla Adana ve Osmaniye hattında yetiştirilen ürün haritada neresidir?",
      type: "Yağlı Tohum / Çerezlik", lat: 37.00, lng: 35.32, region: "Akdeniz", city: "Adana",
      groupId: "tarim_grp_adana", shapeType: "point",
      kpssNot: "Gevşek kumlu toprak isteyen yer fıstığı, en fazla Adana ve Osmaniye hattında yetiştirilmektedir."
    },
    {
      id: "tarim_antep_fistigi", name: "Antep Fıstığı", shortName: "Antep Fıstığı", category: "tarim",
      promptTitle: "Adı komşu ille anılmasına rağmen günümüzde ağaç sayısı ve toplam üretimde en fazla Şanlıurfa'da üretilen kurakçıl meyve haritada neresidir?",
      type: "Meyvecilik / İhraç Ürünü", lat: 37.16, lng: 38.79, region: "Güneydoğu Anadolu", city: "Şanlıurfa",
      groupId: "tarim_grp_sanliurfa", shapeType: "point",
      kpssNot: "Aşırı yaz kuraklığına ve kireçli topraklara dayanıklıdır. Adı Gaziantep ile anılsa da ağaç sayısı ve üretim miktarıyla en fazla Şanlıurfa ilinde üretilmektedir."
    },
    {
      id: "tarim_siirt_fistigi", name: "Siirt Fıstığı", shortName: "Siirt Fıstığı", category: "tarim",
      promptTitle: "Antep fıstığına göre daha iri taneli ve çıtlama oranı yüksek olan, coğrafi işaretli fıstık türü haritada neresidir?",
      type: "Meyvecilik (Coğrafi İşaret)", lat: 37.93, lng: 41.94, region: "Güneydoğu Anadolu", city: "Siirt",
      shapeType: "point",
      kpssNot: "Antep fıstığına göre daha iri taneli ve yüksek çıtlama oranına sahip olan Siirt fıstığı en çok Siirt ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_kavun_karpuz", name: "Kavun ve Karpuz", shortName: "Kavun ve Karpuz", category: "tarim",
      promptTitle: "Erkencilik avantajı ve devasa rekoltesiyle Türkiye'de en yoğun olarak Adana'da üretilen bostan ürünleri haritada neresidir?",
      type: "Bostan / Tarım", lat: 37.00, lng: 35.32, region: "Akdeniz", city: "Adana",
      groupId: "tarim_grp_adana", shapeType: "point",
      kpssNot: "Erkencilik avantajı ve geniş ekim alanlarıyla Türkiye'de en yoğun olarak Adana'da üretilmektedir."
    },
    {
      id: "tarim_ceviz", name: "Ceviz", shortName: "Ceviz", category: "tarim",
      promptTitle: "Kapama bahçe yatırımları ve Çağlayancerit üretimiyle detay bir bilgi olarak öne çıkan Kahramanmaraş'ın meyvesi haritada neresidir?",
      type: "Meyvecilik (Sert Kabuklu)", lat: 37.58, lng: 36.93, region: "Akdeniz / Doğu Anadolu", city: "Kahramanmaraş",
      shapeType: "point",
      kpssNot: "Kapama bahçe yatırımları ve Çağlayancerit ceviziyle detay bir bilgi olarak Kahramanmaraş ilinde ön plana çıktığı belirtilmiştir."
    }
  ],

  hayvancilik: [
    {
      id: "hayvan_buyukbas_konya",
      groupId: 'tarim_grp_konya',
      name: "Büyükbaş Hayvancılık (Sığır / Ahır & Besi)",
      shortName: "Büyükbaş Hayvancılık",
      category: "hayvancilik",
      type: "Büyükbaş (Ahır & Besi Hayvancılığı)",
      lat: 37.87,
      lng: 32.48,
      region: "İç Anadolu",
      city: "Konya",
      shapeType: "point",
      kpssNot: "TÜİK güncel verilerine göre Türkiye'de büyükbaş sığır sayısında ve modern ahır/besi hayvancılığında 1. sırada Konya yer alır. Şeker pancarı küspesi, yem bitkileri üretimi ve modern entegre et-süt tesisleri gelişmesinde belirleyicidir."
    },
    {
      id: "hayvan_kucukbas_van",
      groupId: 'grp_van_golu_ekosistemi',
      name: "Küçükbaş Hayvancılık (Koyun)",
      shortName: "Küçükbaş Hayvancılık",
      category: "hayvancilik",
      type: "Küçükbaş (Koyun)",
      lat: 38.50,
      lng: 43.38,
      region: "Doğu Anadolu",
      city: "Van",
      shapeType: "point",
      kpssNot: "TÜİK güncel verilerine göre Türkiye'de küçükbaş ve koyun varlığında 1. sırada Van ili yer alır. Geniş mera alanları ve karasal iklimin bozkır (step) bitki örtüsü koyun yetiştiriciliğine oldukça uygundur."
    },
    {
      id: "hayvan_kil_kecisi_mersin",
      groupId: 'grp_teke_taseli_karst_kusagi',
      name: "Kıl Keçisi Yetiştiriciliği",
      shortName: "Kıl Keçisi",
      category: "hayvancilik",
      type: "Küçükbaş (Kıl Keçisi)",
      lat: 36.81,
      lng: 34.64,
      region: "Akdeniz",
      city: "Mersin",
      shapeType: "point",
      kpssNot: "TÜİK güncel verilerine göre Türkiye'de kıl keçisi sayısında 1. sırada Mersin ili yer alır. Engebeli karstik araziye, sarp kayalıklara ve maki bitki örtüsüne tam uyum sağlamıştır; ormanlara ve fidanlara zarar verdiği için devlet kontrolünde otlatılır."
    },
    {
      id: "hayvan_tiftik_kecisi_ankara",
      groupId: 'tarim_grp_ankara',
      name: "Tiftik (Ankara) Keçisi",
      shortName: "Tiftik Keçisi",
      category: "hayvancilik",
      type: "Küçükbaş (Tiftik Keçisi)",
      lat: 39.93,
      lng: 32.86,
      region: "İç Anadolu",
      city: "Ankara",
      shapeType: "point",
      kpssNot: "Ankara keçisi olarak da bilinir. İnce, parlak ve dokuma sanayisinde son derece değerli olan tiftik (moher) yünü için yetiştirilir. Türkiye üretiminde açık ara 1. sırada Ankara yer alır."
    },
    {
      id: "hayvan_manda_samsun",
      groupId: 'grp_samsun_limani',
      name: "Manda Yetiştiriciliği",
      shortName: "Manda Yetiştiriciliği",
      category: "hayvancilik",
      type: "Büyükbaş (Manda)",
      lat: 41.29,
      lng: 36.33,
      region: "Karadeniz",
      city: "Samsun",
      shapeType: "point",
      kpssNot: "Sulak, bataklık ve akarsu boylarını seven manda yetiştiriciliğinde Kızılırmak Deltası (Bafra) sayesinde Türkiye 1.si Samsun ilidir. Yağ oranı yüksek sütü ve meşhur manda kaymağı üretiminde değerlendirilir."
    },
    {
      id: "hayvan_kumes_manisa",
      groupId: 'tarim_grp_manisa',
      name: "Kümes Hayvancılığı (Tavuk / Beyaz Et)",
      shortName: "Kümes Hayvancılığı",
      category: "hayvancilik",
      type: "Kümes Hayvancılığı (Pazara Yakınlık)",
      lat: 38.61,
      lng: 27.43,
      region: "Ege",
      city: "Manisa",
      shapeType: "point",
      kpssNot: "Modern, kapalı ve klimalı entegre tesislerde yapıldığı için iklimden etkilenmez. Ege ve Marmara metropol tüketim merkezlerine (pazara) yakınlığıyla Türkiye kümes hayvancılığı, tavuk eti ve yumurta üretiminde 1. sırada Manisa yer alır."
    },
    {
      id: "hayvan_aricilik_ordu",
      groupId: 'grp_ordu_aricilik',
      name: "Arıcılık (Bal Üretimi)",
      shortName: "Arıcılık",
      category: "hayvancilik",
      type: "Arıcılık (Bal / Gezginci)",
      lat: 40.98,
      lng: 37.88,
      region: "Karadeniz",
      city: "Ordu",
      shapeType: "point",
      kpssNot: "Zengin kır çiçeği florası ve Türkiye'nin dört bir yanına yayılan köklü gezginci arıcılık kültürü sayesinde Türkiye bal üretiminde 1. sırada Ordu ili yer alır."
    },
    {
      id: "hayvan_ipekbocegi_diyarbakir",
      groupId: 'grp_diyarbakir_ipek',
      name: "İpek Böcekçiliği (Yaş Koza)",
      shortName: "İpek Böcekçiliği",
      category: "hayvancilik",
      type: "İpek Böcekçiliği",
      lat: 37.91,
      lng: 40.24,
      region: "Güneydoğu Anadolu",
      city: "Diyarbakır",
      shapeType: "point",
      kpssNot: "Tarihî ve geleneksel merkezi Bursa olmasına rağmen, günümüzde dut yaprağıyla beslenen ipek böceğinden yaş koza üretiminde Türkiye 1.si Diyarbakır (özellikle Kulp ilçesi) ilidir."
    }
  ],

  sanayi: [
    {
      id: "sanayi_eregli_demircelik",
    groupId: 'grp_bati_karadeniz_demircelik', name: "Ereğli Demir-Çelik (Erdemir)", shortName: "Ereğli Demir-Çelik Tesisleri", category: "sanayi",
      promptTitle: "Taşkömürü havzasına (enerji kaynağına) yakınlık ve liman avantajıyla kurulan entegre demir-çelik sahası haritada neresidir?",
      type: "Demir-Çelik (Enerjiye Yakınlık)", lat: 41.28, lng: 31.42, region: "Karadeniz", city: "Zonguldak (Kdz. Ereğli)",
      shapeType: "polygon",
      coordinates: [[41.2, 31.3], [41.35, 31.35], [41.35, 31.55], [41.2, 31.5]],
      kpssNot: "Zonguldak taşkömürü havzasının hemen yanına, enerji kaynağına yakınlık ilkesiyle kurulmuştur. Liman avantajıyla cevher ithal eder."
    },
    {
      id: "sanayi_karabuk_demircelik",
    groupId: 'grp_bati_karadeniz_demircelik', name: "Karabük Demir-Çelik (Kardemir)", shortName: "Karabük Demir-Çelik", category: "sanayi",
      promptTitle: "Türkiye'nin ilk entegre demir-çelik tesisi olan, iç kesimde güvenli konum amacıyla vadi içine kurulan tesis haritada neresidir?",
      type: "Demir-Çelik (Tarihî İlk Tesis)", lat: 41.20, lng: 32.63, region: "Karadeniz", city: "Karabük",
      shapeType: "polygon",
      coordinates: [[41.15, 32.55], [41.25, 32.55], [41.25, 32.7], [41.15, 32.7]],
      kpssNot: "Türkiye'nin ilk entegre demir-çelik tesisidir (1937). Kuruluşunda iç kesimde stratejik ve güvenli konum tercihi etkili olmuştur."
    },
    {
      id: "sanayi_iskenderun_demircelik", name: "İskenderun Demir-Çelik (İsdemir)", shortName: "İskenderun Demir-Çelik", category: "sanayi",
      promptTitle: "İthal hammadde ve kömürü doğrudan deniz yoluyla indirmek üzere ulaşım/liman avantajıyla kurulan dev demir-çelik kompleksi haritada neresidir?",
      type: "Demir-Çelik (Ulaşım / Liman)", lat: 36.58, lng: 36.17, region: "Akdeniz", city: "Hatay (İskenderun Körfezi)",
      shapeType: "polygon",
      coordinates: [[36.5, 36.05], [36.75, 36.1], [36.75, 36.25], [36.5, 36.22]],
      kpssNot: "Liman kenarında kurulmuştur; ithal cevher ve kömürü doğrudan tesise indirir. Ulaşım/liman etkeninin sanayi kuruluş yerine etkisine en güzel örnektir."
    },
    {
      id: "sanayi_izmit_rafineri", name: "İzmit (Tüpraş) Rafinerisi & Petrokimya", shortName: "İzmit Rafinerisi", category: "sanayi",
      promptTitle: "Türkiye'nin en büyük petrol rafinerisi olan, tüketim merkezine yakınlık (pazar) amacıyla Marmara kıyısında kurulan tesis haritada neresidir?",
      type: "Petrol Rafinerisi (Pazara Yakınlık)", lat: 40.76, lng: 29.92, region: "Marmara", city: "Kocaeli (İzmit Körfezi)",
      shapeType: "polygon",
      coordinates: [[40.7, 29.75], [40.82, 29.75], [40.82, 30.05], [40.7, 30.05]],
      kpssNot: "Türkiye'nin en büyük rafinerisidir. İthal ham petrolü limandan alır ve ülkenin en yoğun tüketim bölgesinin içinde yer alır (pazara yönelik)."
    },
    {
      id: "sanayi_kirikkale_rafineri", name: "Kırıkkale (Orta Anadolu) Rafinerisi", shortName: "Kırıkkale Rafinerisi", category: "sanayi",
      promptTitle: "İç bölgelerin akaryakıt ihtiyacını karşılamak amacıyla merkezi konumda boru hattıyla beslenen rafineri haritada neresidir?",
      type: "Petrol Rafinerisi (Merkezi Konum)", lat: 39.85, lng: 33.51, region: "İç Anadolu", city: "Kırıkkale",
      shapeType: "polygon",
      coordinates: [[39.78, 33.4], [39.92, 33.4], [39.92, 33.6], [39.78, 33.6]],
      kpssNot: "İç bölgelerin akaryakıt ihtiyacını karşılamak için kurulmuştur; Ceyhan'dan gelen ham petrol boru hattıyla taşınır."
    },
    {
      id: "sanayi_batman_rafineri",
    groupId: 'grp_batman_petrol_kompleksi', name: "Batman Petrol Rafinerisi", shortName: "Batman Rafinerisi", category: "sanayi",
      promptTitle: "Türkiye'nin ilk rafinerisi olup yerli petrol çıkarım sahalarının yanına (hammaddeye yakınlık) kurulan tesis haritada neresidir?",
      type: "Petrol Rafinerisi (Hammaddeye Yakınlık)", lat: 37.88, lng: 41.13, region: "Güneydoğu Anadolu", city: "Batman",
      shapeType: "polygon",
      coordinates: [[37.82, 41.05], [37.95, 41.05], [37.95, 41.22], [37.82, 41.22]],
      kpssNot: "Türkiye'nin ilk rafinerisidir ve ülkedeki petrol çıkarım sahalarının (Raman, Garzan) yanı başındadır — hammaddeye bağlı kuruluş örneğidir."
    },
    {
      id: "sanayi_aliaga_petrokimya",
    groupId: 'grp_aliaga_petrokimya_liman', name: "Aliağa Rafineri ve Petrokimya (Petkim / Star)", shortName: "Aliağa Petrokimya Kompleksi", category: "sanayi",
      promptTitle: "Liman avantajı, rafineri entegrasyonu ve gemi söküm tesislerinin bir arada bulunduğu Ege petrokimya kompleksi haritada neresidir?",
      type: "Rafineri / Petrokimya", lat: 38.80, lng: 26.97, region: "Ege", city: "İzmir (Aliağa)",
      shapeType: "polygon",
      coordinates: [[38.72, 26.9], [38.86, 26.9], [38.86, 27.05], [38.72, 27.05]],
      kpssNot: "Rafineri ile Petkim tesisleri yan yanadır; rafineri çıktısı doğrudan petrokimyaya hammadde olur. Ayrıca ülkenin en büyük gemi söküm tesisleri buradadır."
    },
    {
      id: "sanayi_seydisehir_aluminyum",
    groupId: 'grp_seydisehir_aluminyum', name: "Seydişehir Alüminyum Tesisleri", shortName: "Seydişehir Alüminyum", category: "sanayi",
      promptTitle: "Yakın çevresindeki boksit maden yataklarına bağlı olarak kurulan Türkiye'nin tek birincil alüminyum tesisi haritada neresidir?",
      type: "Metalurji (Boksit / Alüminyum)", lat: 37.42, lng: 31.85, region: "İç Anadolu", city: "Konya (Seydişehir)",
      shapeType: "polygon",
      coordinates: [[37.35, 31.78], [37.5, 31.78], [37.5, 31.95], [37.35, 31.95]],
      kpssNot: "Türkiye'nin alüminyum üretim merkezidir. Yakınındaki boksit yataklarına, yani hammaddeye bağlı olarak kurulmuştur."
    },
    {
      id: "sanayi_bursa_otomotiv", name: "Bursa Otomotiv Sanayisi Kuşağı", shortName: "Otomotiv Sanayi Kuşağı", category: "sanayi",
      promptTitle: "Yan sanayi gücü, limanlara yakınlık ve kalifiye işgücü ile Türkiye otomotiv üretiminin kalbi olan sanayi kuşağı haritada neresidir?",
      type: "Otomotiv / Montaj", lat: 40.19, lng: 29.06, region: "Marmara", city: "Bursa - Gemlik",
      shapeType: "polygon",
      coordinates: [[40.1, 28.9], [40.4, 29.0], [40.4, 29.5], [40.1, 29.4]],
      kpssNot: "Bursa, Türkiye otomotiv üretiminin merkezidir. Yan sanayi yoğunluğu, İstanbul pazarına ve Gemlik limanına yakınlık belirleyici olmuştur."
    },
    {
      id: "sanayi_denizli_tekstil", name: "Denizli Tekstil ve Dokuma Havzası", shortName: "Tekstil ve Dokuma Havzası", category: "sanayi",
      promptTitle: "Havlu ve bornoz ihracatında dünya çapında marka olan, Anadolu sanayileşmesinin öncüsü tekstil kenti haritada neresidir?",
      type: "Tekstil / Dokuma", lat: 37.78, lng: 29.09, region: "Ege", city: "Denizli",
      shapeType: "polygon",
      coordinates: [[37.68, 28.95], [37.88, 28.95], [37.88, 29.25], [37.68, 29.25]],
      kpssNot: "Havlu ve bornoz ihracatında öne çıkar. Anadolu'da sanayileşen yeni sanayi kentlerinin (Anadolu Kaplanları) tipik örneğidir."
    },
    {
      id: "sanayi_usak_deri_hali", name: "Uşak Halı, Battaniye ve Deri Sanayisi", shortName: "Deri ve Dokuma Sanayisi", category: "sanayi",
      promptTitle: "Battaniye-halı dokumacılığı, tekstil geri dönüşümü ve deri işlemeciliğiyle öne çıkan sanayi merkezi haritada neresidir?",
      type: "Dokuma / Deri Sanayisi", lat: 38.68, lng: 29.41, region: "Ege", city: "Uşak",
      shapeType: "polygon",
      coordinates: [[38.58, 29.3], [38.78, 29.3], [38.78, 29.55], [38.58, 29.55]],
      kpssNot: "Uşak; battaniye, halı dokumacılığı ve deri sanayisiyle bilinir. Ayrıca Türkiye'nin ilk şeker fabrikası 1926'da burada kurulmuştur."
    },
    {
      id: "sanayi_dalaman_kagit", name: "Dalaman Kâğıt (SEKA) Tesisleri", shortName: "Kâğıt ve Selüloz Sanayisi", category: "sanayi",
      promptTitle: "Selüloz hammaddesi için orman varlığına ve bol tatlı su kaynağına bağlı olarak kurulan kâğıt tesisi haritada neresidir?",
      type: "Kâğıt / Orman Ürünleri", lat: 36.77, lng: 28.80, region: "Ege", city: "Muğla (Dalaman)",
      shapeType: "polygon",
      coordinates: [[36.7, 28.7], [36.85, 28.7], [36.85, 28.9], [36.7, 28.9]],
      kpssNot: "Kâğıt sanayisi selüloz için orman varlığına ve bol suya bağlıdır. Bu nedenle tesisler ormanlık ve akarsu zengini yörelere kurulur."
    },
    {
      id: "sanayi_tuzla_tersane", name: "Tuzla Tersaneler ve Gemi İnşa Bölgesi", shortName: "Gemi İnşa / Tersaneler Bölgesi", category: "sanayi",
      promptTitle: "Korunaklı koy yapısı ve sanayi pazarına yakınlığıyla Türkiye gemi inşa ve bakım sanayisinin merkezi olan bölge haritada neresidir?",
      type: "Gemi İnşa / Tersane", lat: 40.83, lng: 29.30, region: "Marmara", city: "İstanbul (Tuzla - Pendik)",
      shapeType: "polygon",
      coordinates: [[40.8, 29.24], [40.88, 29.26], [40.88, 29.38], [40.8, 29.35]],
      kpssNot: "Türkiye gemi inşa sanayisinin kalbidir. Korunaklı körfez, derin su ve ağır sanayi merkezlerine yakınlık tersaneciliğin temel kuruluş koşullarıdır."
    }
  ],

  iklim: [
    {
      id: "iklim_akdeniz_antalya", name: "Akdeniz İklim Kuşağı", shortName: "Akdeniz İklimi", category: "iklim",
      promptTitle: "Yazları sıcak ve kurak, kışları ılık ve bol yağışlı geçen, maki bitki örtüsünün hakim olduğu iklim kuşağı haritada neresidir?",
      type: "İklim Kuşağı", lat: 36.89, lng: 30.71, region: "Akdeniz - Ege", city: "Antalya - Mersin - Muğla",
      shapeType: "polygon",
      coordinates: [[36.0, 27.5], [37.2, 27.2], [37.8, 28.5], [36.8, 32.0], [36.3, 34.5], [36.7, 36.0], [35.9, 36.0], [36.0, 32.5], [35.8, 28.5]],
      kpssNot: "Yazları sıcak-kurak, kışları ılık-yağışlıdır. En fazla yağış kışın düşer (cephesel yağışlar). Kar ve don olayı çok nadirdir; maki ve turunçgil kuşağıdır."
    },
    {
      id: "iklim_karadeniz_rize", name: "Karadeniz İklim Kuşağı", shortName: "Karadeniz İklimi", category: "iklim",
      promptTitle: "Her mevsim yağışlı, yıllık sıcaklık farkı en az, nemi en yüksek olan ılıman okyanusal iklim kuşağı haritada neresidir?",
      type: "İklim Kuşağı", lat: 41.02, lng: 40.52, region: "Karadeniz", city: "Rize - Trabzon - Zonguldak",
      shapeType: "polygon",
      coordinates: [[41.5, 31.0], [42.0, 35.0], [41.6, 41.5], [40.7, 41.5], [40.8, 35.0], [40.6, 31.0]],
      kpssNot: "Her mevsim yağışlıdır, yaz kuraklığı yoktur. En fazla yağış sonbaharda düşer (yamaç yağışları). Nem yüksek olduğundan kimyasal çözünme fazladır."
    },
    {
      id: "iklim_karasal_konya", name: "Ilıman Karasal (Step) İklim Kuşağı", shortName: "Karasal (Step) İklim", category: "iklim",
      promptTitle: "Yazları sıcak-kurak, kışları soğuk-kar yağışlı, en çok yağışı ilkbaharda konveksiyonel alan step iklimi haritada neresidir?",
      type: "İklim Kuşağı", lat: 37.87, lng: 32.48, region: "İç Anadolu", city: "Konya - Ankara - Sivas",
      shapeType: "polygon",
      coordinates: [[37.2, 31.5], [39.8, 31.5], [40.2, 36.5], [37.5, 36.0], [37.0, 33.5]],
      kpssNot: "Etrafı dağlarla çevrili iç çanaklarda görülür. Yağış azdır (~300-400 mm), en çok ilkbaharda (kırkikindi yağışları) düşer. Bitki örtüsü bozkırdır."
    },
    {
      id: "iklim_erzurum_sert_kis",
    groupId: 'grp_erzurum_kars_plato_ekosistem', name: "Sert Karasal İklim (Erzurum-Kars)", shortName: "Sert Karasal İklim", category: "iklim",
      promptTitle: "Türkiye'de kışların en sert ve uzun geçtiği, donlu gün sayısının en fazla olduğu, yaz yağışlarıyla çayırların yeşerdiği iklim alanı haritada neresidir?",
      type: "Uç Değer / İklim Kuşağı", lat: 39.91, lng: 41.28, region: "Doğu Anadolu", city: "Erzurum - Kars - Ardahan",
      shapeType: "polygon",
      coordinates: [[39.5, 40.5], [41.3, 41.2], [41.4, 43.5], [40.3, 43.5], [39.3, 42.0]],
      kpssNot: "Yükselti ve karasallık nedeniyle kışlar çok sert geçer. En fazla yağış yaz başlarında konveksiyonel olarak düşer; bu sayede gür Alpin çayırlar oluşur."
    },
    {
      id: "iklim_hopa_encok_yagis", name: "Türkiye'nin En Çok Yağış Alan Kıyı Şeridi (Rize-Hopa)", shortName: "En Çok Yağış Alan Yöre", category: "iklim",
      promptTitle: "Nemli hava kütlelerinin dik kıyı dağlarına çarparak yükselmesiyle yıllık 2400 mm ile Türkiye'nin yağış rekorunu kıran yöre haritada neresidir?",
      type: "Uç Değer / Yağış Rekoru", lat: 41.39, lng: 41.42, region: "Karadeniz", city: "Rize - Hopa (Kaçkar Etekleri)",
      shapeType: "polygon",
      coordinates: [[41.0, 40.3], [41.45, 41.3], [41.5, 41.6], [41.2, 41.6], [40.85, 40.5]],
      kpssNot: "Doğu Karadeniz dağlarının kıyıya paralel ve çok yüksek olması nemli havanın hızla yükselip soğumasını sağlar (orografik yağış). Türkiye yağış şampiyonudur."
    },
    {
      id: "iklim_igdir_enaz_yagis",
    groupId: 'grp_igdir_mikroklima', name: "Iğdır Ovası Mikrokliması (En Az Yağış)", shortName: "Iğdır Çukur Mikrokliması", category: "iklim",
      promptTitle: "Çevresindeki yüksek dağlar nedeniyle föhn rüzgârları alan, en az yağış alan ve pamuk yetişen çukur mikroklima sahası haritada neresidir?",
      type: "Mikroklima / Az Yağış", lat: 39.92, lng: 44.04, region: "Doğu Anadolu", city: "Iğdır Ovası",
      shapeType: "polygon",
      coordinates: [[39.8, 43.7], [40.1, 43.8], [40.1, 44.4], [39.75, 44.3]],
      kpssNot: "Çevresine göre 1000 metre daha alçakta bir çöküntü ovasıdır. Föhn etkisiyle kışları ılık geçer; Türkiye'nin en az yağış alan mikroklima sahasıdır."
    },
    {
      id: "iklim_karapinar_kuraklik",
    groupId: 'grp_karapinar_havzasi', name: "Karapınar Çölleşme & Kuraklık Alanı", shortName: "Karapınar Kuraklık Alanı", category: "iklim",
      promptTitle: "Türkiye'de rüzgâr erozyonunun en şiddetli olduğu, kumul hareketleri ve aşırı kuraklığın görüldüğü saha haritada neresidir?",
      type: "Uç Değer / Kuraklık", lat: 37.72, lng: 33.55, region: "İç Anadolu", city: "Konya (Karapınar)",
      shapeType: "polygon",
      coordinates: [[37.55, 33.3], [37.9, 33.35], [37.9, 33.8], [37.55, 33.75]],
      kpssNot: "Türkiye'nin en az yağış alan ve rüzgâr erozyonunun en yıkıcı olduğu sahasıdır. Yer altı sularının aşırı çekilmesiyle obruk oluşumu hızlanmıştır."
    },
    {
      id: "iklim_cizre_sicaklik", name: "Cizre - Şırnak (En Yüksek Yaz Sıcaklıkları)", shortName: "En Sıcak Yaz Yöresi", category: "iklim",
      promptTitle: "Güneyli enlem, alçak rakım ve çöl rüzgârları (Samyeli) nedeniyle yaz aylarında Türkiye sıcaklık rekorunun kırıldığı yöre haritada neresidir?",
      type: "Uç Değer / Sıcaklık Rekoru", lat: 37.32, lng: 42.19, region: "Güneydoğu Anadolu", city: "Şırnak (Cizre - Silopi)",
      shapeType: "polygon",
      coordinates: [[37.15, 41.9], [37.45, 41.9], [37.5, 42.5], [37.15, 42.5]],
      kpssNot: "Yaz mevsiminde Türkiye'nin en yüksek gölge sıcaklıkları (49°C+) burada ölçülür. Basra Alçak Basıncı ve Samyeli rüzgârı etkilidir."
    },
    {
      id: "iklim_hakkari_kar",
    groupId: 'grp_hakkari_daglik_bolum', name: "Hakkâri Cilo Yöresi (Kar Örtüsü Süresi)", shortName: "En Uzun Kar Örtüsü Yöresi", category: "iklim",
      promptTitle: "Aşırı yükselti ve sarp dağlık yapı nedeniyle karın yerde kalma süresinin en uzun olduğu yöre haritada neresidir?",
      type: "Uç Değer / Kar Örtüsü", lat: 37.57, lng: 43.74, region: "Doğu Anadolu", city: "Hakkâri - Cilo Dağları",
      shapeType: "polygon",
      coordinates: [[37.3, 43.3], [37.8, 43.4], [37.85, 44.3], [37.2, 44.2]],
      kpssNot: "Yükseltinin enleme üstün geldiği yerdir: Güneyde olmasına rağmen aşırı yüksek olduğu için kar yerde 6 aydan fazla kalır ve güncel buzullar barındırır."
    }
  ],

  orman: [
    {
      id: "orman_dogu_karadeniz", name: "Doğu Karadeniz Ormanları", category: "orman",
      type: "Nemli Orman", lat: 41.18, lng: 41.82, region: "Karadeniz", city: "Artvin",
      kpssNot: "Türkiye'nin en gür ve en nemli ormanlarıdır. Her mevsim yağış aldığı için ağaç türü çeşitliliği yüksektir; alçakta yayvan yapraklı, yükseklerde iğne yapraklı türler görülür."
    },
    {
      id: "orman_bati_karadeniz", name: "Batı Karadeniz Ormanları (Bolu)", category: "orman",
      type: "Nemli Orman", lat: 40.74, lng: 31.61, region: "Karadeniz", city: "Bolu",
      kpssNot: "Kayın, gürgen, meşe ve köknar bakımından zengindir. Türkiye orman varlığının ve orman ürünleri sanayisinin önemli merkezlerindendir."
    },
    {
      id: "orman_kazdaglari", name: "Kaz Dağları Ormanları", category: "orman",
      type: "İğne Yapraklı Orman", lat: 39.70, lng: 26.90, region: "Marmara", city: "Balıkesir - Çanakkale",
      kpssNot: "Kazdağı göknarı endemik bir türdür. Dağın kuzey (denize bakan) yamaçları güney yamaçlarına göre daha nemli ve daha gür ormanlıdır — bakı etkisinin tipik örneğidir."
    },
    {
      id: "orman_toros_sediri", name: "Toros Sediri Ormanları (Elmalı)", category: "orman",
      type: "İğne Yapraklı Orman", lat: 36.73, lng: 29.92, region: "Akdeniz", city: "Antalya (Elmalı)",
      kpssNot: "Sedir (katran ağacı) Toroslar'a özgüdür ve yaklaşık 1200 metrenin üzerinde yetişir. Akdeniz'de yükseldikçe maki yerini önce kızılçama, sonra sedir-göknara bırakır."
    },
    {
      id: "orman_maki_akdeniz", name: "Maki (Akdeniz Kıyıları)", category: "orman",
      type: "Çalı Formasyonu", lat: 36.62, lng: 29.12, region: "Akdeniz", city: "Muğla (Fethiye)",
      kpssNot: "Akdeniz ikliminin doğal bitki örtüsüdür: kısa boylu, sert ve cilalı yapraklı, kuraklığa dayanıklı çalılar. Yaklaşık 800-1000 metreye kadar çıkar; zeytin, mersin, defne, sakız başlıca türlerdir."
    },
    {
      id: "orman_psodomaki", name: "Psödomaki (Yalancı Maki)", category: "orman",
      type: "Çalı Formasyonu", lat: 41.00, lng: 39.72, region: "Karadeniz", city: "Trabzon",
      kpssNot: "Karadeniz kıyılarında ormanın tahrip edildiği yerlerde oluşan çalılıktır. Makiden farkı, nemli iklim türlerinden (fındık, kızılcık, orman gülü) oluşmasıdır."
    },
    {
      id: "orman_step_ic_anadolu", name: "Bozkır / Step (İç Anadolu)", category: "orman",
      type: "Ot Formasyonu", lat: 39.20, lng: 33.20, region: "İç Anadolu", city: "Ankara - Kırşehir",
      kpssNot: "İlkbaharda yeşerip yazın kuruyan otsu bitki örtüsüdür. İç Anadolu'daki bozkırın bir bölümü doğal değil, ormanların tahribiyle oluşmuş antropojen bozkırdır."
    },
    {
      id: "orman_belgrad", name: "Belgrad Ormanı", category: "orman",
      type: "Nemli Orman / Mesire", lat: 41.18, lng: 28.98, region: "Marmara", city: "İstanbul",
      kpssNot: "İstanbul'un kuzeyindeki nemli yayvan yapraklı ormandır. Tarihî su kemerleri ve bentleriyle kent su kaynağı olarak kullanılmıştır; kent içi orman baskısının örneğidir."
    },
    {
      id: "orman_yedigoller_mp",
    groupId: 'grp_abant_yedigoller_bolu', name: "Yedigöller Milli Parkı", category: "orman",
      type: "Milli Park", lat: 40.94, lng: 31.75, region: "Karadeniz", city: "Bolu",
      kpssNot: "Heyelan set gölleriyle ormanın iç içe geçtiği milli parktır. Sonbahar renkleriyle ekoturizmde öne çıkar."
    },
    {
      id: "orman_kure_daglari_mp", name: "Küre Dağları Milli Parkı", category: "orman",
      type: "Milli Park", lat: 41.75, lng: 33.30, region: "Karadeniz", city: "Kastamonu - Bartın",
      kpssNot: "Karstik kanyonları ve el değmemiş ormanlarıyla Avrupa'nın korunacak sıcak noktalarından sayılır. Ilgarini Mağarası ve Valla Kanyonu bu alandadır."
    },
    {
      id: "orman_ilgaz_mp",
    groupId: 'grp_ilgaz_koridoru', name: "Ilgaz Dağı Milli Parkı", category: "orman",
      type: "Milli Park", lat: 40.90, lng: 33.70, region: "Karadeniz", city: "Kastamonu - Çankırı",
      kpssNot: "Karadeniz ile İç Anadolu arasında bitki örtüsü geçişinin izlenebildiği alandır: kuzey yamaçlar ormanlık, güney yamaçlar bozkıra yakındır."
    },
    {
      id: "orman_kozak_fistikcami", name: "Kozak Yaylası Fıstıkçamı Ormanı", category: "orman",
      type: "İğne Yapraklı / Ekonomik Orman", lat: 39.23, lng: 27.05, region: "Ege", city: "İzmir (Bergama)",
      kpssNot: "Türkiye çam fıstığı üretiminin merkezidir. Ormanın yalnızca kereste değil, meyve yoluyla da ekonomik değer üretebildiğini gösterir."
    },
    {
      id: "orman_sigla_koycegiz", name: "Sığla (Günlük) Ormanları", category: "orman",
      type: "Endemik Orman", lat: 36.97, lng: 28.69, region: "Ege", city: "Muğla (Köyceğiz)",
      kpssNot: "Sığla ağacı yalnızca Güneybatı Anadolu'da (Köyceğiz - Dalaman - Fethiye) doğal olarak yetişen endemik bir türdür. Sığla yağı için korumaya alınmıştır."
    },
    {
      id: "orman_alpin_kackar",
    groupId: 'grp_kackar_masifi', name: "Alpin Çayırlar (Kaçkarlar)", category: "orman",
      type: "Ot Formasyonu / Yayla", lat: 40.85, lng: 41.15, region: "Karadeniz", city: "Rize - Artvin",
      kpssNot: "Orman üst sınırının (yaklaşık 2000-2200 m) üzerinde ağaç yetişemez; yerini yaz aylarında yeşeren gür çayırlar alır. Yaylacılık bu kuşakta yapılır."
    }
  ]

};

// Kategori başlıkları ve ikonları
// title: tam ad (soru rozeti ve tooltip). short: üst çubuktaki sekme adı.
const CATEGORIES = [
  { id: "daglar", title: "Dağlar", short: "Dağ", icon: "🏔️", color: "#e67e22", count: COGRAFYA_DATA.daglar.length },
  { id: "ovalar", title: "Ovalar", short: "Ova", icon: "🌾", color: "#27ae60", count: COGRAFYA_DATA.ovalar.length },
  { id: "platolar", title: "Platolar", short: "Plato", icon: "⛰️", color: "#d35400", count: COGRAFYA_DATA.platolar.length },
  { id: "su_kaynaklari", title: "Akarsu & Göller", short: "Sular", icon: "🌊", color: "#2980b9", count: COGRAFYA_DATA.su_kaynaklari.length },
  { id: "gecitler", title: "Geçitler & Boğazlar", short: "Geçit", icon: "🚪", color: "#8e44ad", count: COGRAFYA_DATA.gecitler.length },
  { id: "tarim", title: "Tarım Ürünleri", short: "Tarım", icon: "🚜", color: "#84cc16", count: COGRAFYA_DATA.tarim.length },
  { id: "hayvancilik", title: "Hayvancılık Alanları", short: "Hayvan", icon: "🐑", color: "#10b981", count: COGRAFYA_DATA.hayvancilik.length },
  { id: "sanayi", title: "Sanayi & Tesisler", short: "Sanayi", icon: "🏭", color: "#64748b", count: COGRAFYA_DATA.sanayi.length },
  { id: "iklim", title: "İklim & Uç Değerler", short: "İklim", icon: "🌡️", color: "#f59e0b", count: COGRAFYA_DATA.iklim.length },
  { id: "orman", title: "Orman & Bitki Örtüsü", short: "Orman", icon: "🌲", color: "#16a34a", count: COGRAFYA_DATA.orman.length },
  { id: "iliskili_cografya", title: "İlişkili Eşleştirme", short: "Eşleştir", icon: "🔗", color: "#ec4899", count: COGRAFYA_DATA.iliskili_cografya.length }
];

// KPSS Oluşum ve Alt Tür Filtreleme Haritası
const SUB_TYPES = {
  daglar: [
    { id: "all", label: "Tüm Dağlar", icon: "🏔️" },
    { id: "volkanik", label: "Volkanik Dağlar", icon: "🌋", filter: (item) => (item.type || "").toLowerCase().includes("volkanik") },
    { id: "kirik", label: "Kırık Dağlar (Horst)", icon: "⚡", filter: (item) => (item.type || "").toLowerCase().includes("kırık") || (item.type || "").toLowerCase().includes("horst") },
    { id: "kivrim", label: "Kıvrım Dağları", icon: "⛰️", filter: (item) => (item.type || "").toLowerCase().includes("kıvrım") }
  ],
  ovalar: [
    { id: "all", label: "Tüm Ovalar", icon: "🌾" },
    { id: "delta", label: "Delta Ovaları (Kıyı)", icon: "🏖️", filter: (item) => (item.type || "").toLowerCase().includes("delta") },
    { id: "tektonik", label: "Tektonik / Çöküntü", icon: "💥", filter: (item) => (item.type || "").toLowerCase().includes("tektonik") },
    { id: "karstik", label: "Karstik (Polye)", icon: "💧", filter: (item) => (item.type || "").toLowerCase().includes("karstik") || (item.type || "").toLowerCase().includes("polye") },
    { id: "volkanik_ova", label: "Volkanik Ovalar", icon: "🌋", filter: (item) => (item.type || "").toLowerCase().includes("volkanik") || (item.type || "").toLowerCase().includes("lav") }
  ],
  platolar: [
    { id: "all", label: "Tüm Platolar", icon: "⛰️" },
    { id: "volkanik", label: "Volkanik (Lav) Platoları", icon: "🌋", filter: (item) => (item.type || "").toLowerCase().includes("volkanik") || (item.type || "").toLowerCase().includes("lav") },
    { id: "karstik", label: "Karstik Platolar", icon: "💧", filter: (item) => (item.type || "").toLowerCase().includes("karstik") },
    { id: "asinim", label: "Aşınım (Peneplen) Platoları", icon: "📉", filter: (item) => (item.type || "").toLowerCase().includes("aşınım") || (item.type || "").toLowerCase().includes("peneplen") },
    { id: "tabaka", label: "Tabaka Düzlüğü Platoları", icon: "🥞", filter: (item) => (item.type || "").toLowerCase().includes("tabaka") || (item.type || "").toLowerCase().includes("düzlüğü") }
  ],
  su_kaynaklari: [
    { id: "all", label: "Tüm Su Kaynakları", icon: "🌊" },
    { id: "akarsular", label: "Akarsular / Nehirler", icon: "〰️", filter: (item) => item.shapeType === "polyline" || (item.type || "").toLowerCase().includes("akarsu") || (item.type || "").toLowerCase().includes("çay") },
    { id: "goller", label: "Tüm Göller (30+)", icon: "🏞️", filter: (item) => (item.type || "").toLowerCase().includes("göl") || (item.type || "").toLowerCase().includes("lagün") || (item.type || "").toLowerCase().includes("maar") },
    { id: "tektonik_gol", label: "Tektonik Göller", icon: "💥", filter: (item) => (item.type || "").toLowerCase().includes("tektonik") },
    { id: "karstik_gol", label: "Karstik Göller", icon: "💧", filter: (item) => (item.type || "").toLowerCase().includes("karstik") || (item.type || "").toLowerCase().includes("obruk") },
    { id: "volkanik_gol", label: "Volkanik & Set Gölleri", icon: "🌋", filter: (item) => (item.type || "").toLowerCase().includes("volkanik") || (item.type || "").toLowerCase().includes("maar") || (item.type || "").toLowerCase().includes("kaldera") },
    { id: "heyelan_gol", label: "Heyelan Set Gölleri", icon: "⛰️", filter: (item) => (item.type || "").toLowerCase().includes("heyelan") },
    { id: "kiyi_aluvyal_gol", label: "Kıyı Set (Lagün) & Alüvyal", icon: "🏖️", filter: (item) => (item.type || "").toLowerCase().includes("kıyı") || (item.type || "").toLowerCase().includes("lagün") || (item.type || "").toLowerCase().includes("alüvyal") },
    { id: "buzul_gol", label: "Buzul (Sirk) Gölleri", icon: "❄️", filter: (item) => (item.type || "").toLowerCase().includes("buzul") || (item.type || "").toLowerCase().includes("sirk") }
  ],
  gecitler: [
    { id: "all", label: "Tüm Geçit & Boğazlar", icon: "🚪" },
    { id: "karadeniz", label: "Karadeniz Geçitleri", icon: "🌲", filter: (item) => (item.region || "").toLowerCase().includes("karadeniz") && !(item.type || "").toLowerCase().includes("deniz boğazı") },
    { id: "akdeniz", label: "Akdeniz Geçitleri", icon: "☀️", filter: (item) => (item.region || "").toLowerCase().includes("akdeniz") },
    { id: "bogazlar", label: "Deniz Boğazları", icon: "🌉", filter: (item) => (item.type || "").toLowerCase().includes("deniz boğazı") || (item.type || "").toLowerCase().includes("su yolu") }
  ],
  tarim: [
    { id: "all", label: "Tüm Tarım Ürünleri", icon: "🚜" },
    { id: "endustri", label: "Endüstri & Yağ Bitkileri", icon: "🏭", filter: (item) => trLower(item.type).includes("endustri") || trLower(item.type).includes("yag bitkisi") },
    { id: "meyve", label: "Meyvecilik", icon: "🍑", filter: (item) => trLower(item.type).includes("meyvecilik") },
    { id: "tahil", label: "Tahıl & Baklagil", icon: "🌾", filter: (item) => trLower(item.type).includes("tahil") || trLower(item.type).includes("baklagil") },
    { id: "ihrac", label: "İhraç Ürünleri", icon: "🚢", filter: (item) => trLower(item.type).includes("ihrac") }
  ],
  hayvancilik: [
    { id: "all", label: "Tüm Hayvancılık Türleri", icon: "🐑" },
    { id: "buyukbas", label: "Büyükbaş (Mera/Çayır)", icon: "🐂", filter: (item) => trLower(item.type).includes("buyukbas") },
    { id: "kucukbas", label: "Küçükbaş (Koyun/Keçi)", icon: "🐐", filter: (item) => trLower(item.type).includes("kucukbas") },
    { id: "diger_hayvan", label: "Arıcılık & Kümes & İpek", icon: "🐝", filter: (item) => trLower(item.type).includes("aricilik") || trLower(item.type).includes("kumes") || trLower(item.type).includes("ipek") }
  ],
  sanayi: [
    { id: "all", label: "Tüm Sanayi Tesisleri", icon: "🏭" },
    { id: "demir_celik", label: "Demir-Çelik", icon: "⚙️", filter: (item) => trLower(item.type).includes("demir-celik") },
    { id: "rafineri", label: "Rafineri & Petrokimya", icon: "🛢️", filter: (item) => trLower(item.type).includes("rafineri") || trLower(item.type).includes("petrokimya") },
    { id: "imalat", label: "Otomotiv & Dokuma & İmalat", icon: "🧵", filter: (item) => { const t = trLower(item.type); return t.includes("tekstil") || t.includes("dokuma") || t.includes("otomotiv") || t.includes("deri") || t.includes("kagit") || t.includes("gemi") || t.includes("metalurji"); } }
  ],
  iklim: [
    { id: "all", label: "Tüm İklim Konuları", icon: "🌡️" },
    { id: "kusaklar", label: "İklim Kuşakları", icon: "🗺️", filter: (item) => trLower(item.type).includes("iklim kusagi") || trLower(item.type).includes("iklim") },
    { id: "uc_degerler", label: "Uç Değerler & Rekorlar", icon: "📈", filter: (item) => trLower(item.type).includes("uc deger") || trLower(item.type).includes("rekor") },
    { id: "mikroklima", label: "Mikroklima Alanları", icon: "🔍", filter: (item) => trLower(item.type).includes("mikroklima") }
  ],
  orman: [
    { id: "all", label: "Tüm Bitki Örtüsü", icon: "🌲" },
    { id: "nemli", label: "Nemli Ormanlar", icon: "🌳", filter: (item) => trLower(item.type).includes("nemli") },
    { id: "igne", label: "İğne Yapraklı Ormanlar", icon: "🌲", filter: (item) => trLower(item.type).includes("igne yaprakli") },
    { id: "cali", label: "Çalı Formasyonu (Maki)", icon: "🌿", filter: (item) => trLower(item.type).includes("cali") },
    { id: "ot", label: "Ot Formasyonu (Bozkır/Alpin)", icon: "🌾", filter: (item) => trLower(item.type).includes("ot formasyonu") },
    { id: "milli_park", label: "Milli Parklar", icon: "🏞️", filter: (item) => trLower(item.type).includes("milli park") }
  ],
  iliskili_cografya: [
    { id: "all", label: "Tüm Eşleştirmeler", icon: "🔗" },
    { id: "akarsu_delta", label: "Akarsu ➡️ Delta", icon: "🏖️", filter: (item) => item.matchType === 'akarsu_delta' },
    { id: "dag_gecit", label: "Dağ ➡️ Geçit", icon: "🚪", filter: (item) => item.matchType === 'dag_gecit' },
    { id: "hayvan_bolge", label: "Hayvancılık ➡️ Bölge", icon: "🐑", filter: (item) => item.matchType === 'hayvan_bolge' }
  ],
  ozel_cizimler: [
    { id: "all", label: "Tüm Çizimlerim", icon: "🎨" },
    { id: "point", label: "Noktalar (Pin)", icon: "📍", filter: (item) => item.shapeType === "point" || !item.shapeType },
    { id: "polyline", label: "Çizgiler / Hatlar", icon: "📏", filter: (item) => item.shapeType === "polyline" },
    { id: "polygon", label: "Alanlar / Çokgenler", icon: "📐", filter: (item) => item.shapeType === "polygon" }
  ]
};
