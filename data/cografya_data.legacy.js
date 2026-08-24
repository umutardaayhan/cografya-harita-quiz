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
      name: "Uludağ",
      category: "daglar",
      lat: 40.07,
      lng: 29.22,
      type: "Derinlik Volkanizması (Batolit)",
      region: "Marmara",
      city: "Bursa",
      kpssNot: "İç püskürük (batolit) yapılıdır. Marmara'nın en yüksek dağıdır. Sirk gölleri ve kış turizmi ile ünlüdür."
    }
  ],

  ovalar: [
    // --- DELTA OVALARI ---
    {
      id: "ova_cukurova",
      name: "Çukurova Deltası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 36.85,
      lng: 35.50,
      region: "Akdeniz",
      city: "Adana - Mersin",
      kpssNot: "Seyhan ve Ceyhan nehirlerinin oluşturduğu TÜRKİYE'NİN EN BÜYÜK DELTA OVASIDIR. Sanayi bitkileri ve yılda birden fazla ürün alınır."
    },
    {
      id: "ova_bafra",
      name: "Bafra Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 41.56,
      lng: 35.90,
      region: "Karadeniz",
      city: "Samsun (Bafra)",
      kpssNot: "Kızılırmak nehrinin Karadeniz'e döküldüğü yerde oluşturduğu delta ovasıdır."
    },
    {
      id: "ova_carsamba",
      name: "Çarşamba Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 41.20,
      lng: 36.75,
      region: "Karadeniz",
      city: "Samsun (Çarşamba)",
      kpssNot: "Yeşilırmak nehrinin Karadeniz'e döküldüğü yerde oluşturduğu delta ovasıdır."
    },
    {
      id: "ova_silifke",
      name: "Silifke Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 36.35,
      lng: 33.95,
      region: "Akdeniz",
      city: "Mersin (Silifke)",
      kpssNot: "Göksu Nehri'nin Akdeniz'e döküldüğü yerde oluşturduğu delta ovasıdır."
    },
    {
      id: "ova_menemen",
      name: "Menemen Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 38.60,
      lng: 27.00,
      region: "Ege",
      city: "İzmir (Menemen)",
      kpssNot: "Gediz Nehri'nin İzmir Körfezi girişinde oluşturduğu deltadır (İzmir Kuş Cenneti buradadır)."
    },
    {
      id: "ova_balat",
      name: "Balat Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 37.55,
      lng: 27.30,
      region: "Ege",
      city: "Aydın (Didim)",
      kpssNot: "Büyük Menderes Nehri'nin taşıdığı alüvyonlarla oluşturduğu delta ovasıdır (Eski Milet limanını doldurmuştur)."
    },
    {
      id: "ova_selcuk",
      name: "Selçuk Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 37.95,
      lng: 27.35,
      region: "Ege",
      city: "İzmir (Selçuk)",
      kpssNot: "Küçük Menderes Nehri'nin oluşturduğu deltadır (Efes antik liman kentini karada bırakmıştır)."
    },
    {
      id: "ova_dikili",
      name: "Dikili Ovası",
      category: "ovalar",
      type: "Delta Ovası",
      lat: 39.05,
      lng: 26.90,
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
      lat: 37.31,
      lng: 29.77,
      region: "Akdeniz (Göller Yöresi)",
      city: "Burdur (Tefenni)",
      kpssNot: "Burdur'da yer alan karstik polye ovasıdır (TAKKEM kuralının 'T' harfi)."
    },
    {
      id: "ova_acipayam",
      name: "Acıpayam Ovası",
      category: "ovalar",
      type: "Karstik Ova (Polye)",
      lat: 37.42,
      lng: 29.35,
      region: "Ege / Akdeniz",
      city: "Denizli (Acıpayam)",
      kpssNot: "Denizli sınırlarında yer alan karstik polye ovasıdır (TAKKEM kuralının 'A' harfi)."
    },
    {
      id: "ova_korkuteli",
      name: "Korkuteli Ovası",
      category: "ovalar",
      type: "Karstik Ova (Polye)",
      lat: 37.05,
      lng: 30.19,
      region: "Akdeniz",
      city: "Antalya (Korkuteli)",
      kpssNot: "Antalya'nın kuzeybatısında yer alan karstik polye ovasıdır (TAKKEM kuralının ilk 'K' harfi)."
    },
    {
      id: "ova_kestel",
      name: "Kestel Ovası",
      category: "ovalar",
      type: "Karstik Ova (Polye)",
      lat: 37.50,
      lng: 30.40,
      region: "Akdeniz",
      city: "Burdur (Kestel)",
      kpssNot: "Burdur sınırlarında yer alan karstik polye ovasıdır (TAKKEM kuralının ikinci 'K' harfi)."
    },
    {
      id: "ova_elmali",
      name: "Elmalı Ovası",
      category: "ovalar",
      type: "Karstik Ova (Polye)",
      lat: 36.73,
      lng: 29.91,
      region: "Akdeniz",
      city: "Antalya (Elmalı)",
      kpssNot: "Antalya'da Teke Yarımadası içinde yer alan yüksek karstik polye ovasıdır (TAKKEM kuralının 'E' harfi)."
    },
    {
      id: "ova_mugla",
      name: "Muğla Ovası",
      category: "ovalar",
      type: "Karstik Ova (Polye)",
      lat: 37.21,
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
      lng: 32.50,
      region: "İç Anadolu",
      city: "Konya",
      kpssNot: "TÜRKİYE'NİN EN BÜYÜK İÇ OVASI ve tahıl ambarıdır. Eski göl tabanı üzerinde gelişmiştir. KOP projesiyle sulanmaktadır."
    },
    {
      id: "ova_harran",
      name: "Harran (Altınbaşak) Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 36.86,
      lng: 39.02,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa (Harran)",
      kpssNot: "GAP ile Atatürk Barajı'ndan Şanlıurfa Tünelleri aracılığıyla sulanan, pamuk üretim merkezimizdir."
    },
    {
      id: "ova_igdir",
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
      lat: 36.35,
      lng: 36.30,
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
      lng: 38.30,
      region: "Doğu Anadolu",
      city: "Malatya",
      kpssNot: "Doğu Anadolu Fayı kuşağında verimli bir çöküntü ovasıdır. Dünyaca ünlü kayısı üretim sahasıdır."
    },
    {
      id: "ova_erbaa_niksar",
      name: "Erbaa - Niksar Ovaları",
      category: "ovalar",
      type: "Tektonik Hat Ovası (KAF)",
      lat: 40.70,
      lng: 36.80,
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
      lng: 31.15,
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
      lng: 30.40,
      region: "Marmara",
      city: "Sakarya (Adapazarı)",
      kpssNot: "Sakarya Nehri'nin taşıdığı alüvyonlarla kaplı, KAF üzerinde yer alan sanayi ve tarım ovasıdır."
    },
    {
      id: "ova_bursa",
      name: "Bursa Ovası",
      category: "ovalar",
      type: "Tektonik Ova",
      lat: 40.20,
      lng: 29.05,
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
      lat: 38.39,
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
      lng: 35.48,
      region: "İç Anadolu",
      city: "Kayseri",
      kpssNot: "Erciyes Volkanı'nın kuzey eteklerinde volkanik tüf ve alüvyonlarla kaplı volkanik kökenli iç ovadır."
    },
    {
      id: "ova_caldiran",
      name: "Çaldıran Ovası",
      category: "ovalar",
      type: "Volkanik Ova",
      lat: 39.14,
      lng: 43.91,
      region: "Doğu Anadolu",
      city: "Van (Çaldıran)",
      kpssNot: "Tendürek Yanardağı'ndan püsküren bazaltik lavların çanağı doldurmasıyla oluşan volkanik ovadır. Türkiye'nin en soğuk yerlerinden biridir."
    },
    {
      id: "ova_muradiye",
      name: "Muradiye Ovası",
      category: "ovalar",
      type: "Volkanik / Alüvyal Ova",
      lat: 38.98,
      lng: 43.76,
      region: "Doğu Anadolu",
      city: "Van (Muradiye)",
      kpssNot: "Süphan ve Tendürek volkanizması lavları arasında oluşmuş volkanik tabanlı ovadır."
    }
  ],

  platolar: [
    // --- VOLKANİK (LAV) PLATOLARI ---
    {
      id: "plato_erzurum_kars",
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
      name: "Uludağ Aynalıgöl (Buzul Sirk)",
      category: "su_kaynaklari",
      type: "Buzul (Sirk) Gölü",
      lat: 40.11,
      lng: 29.17,
      areaKm2: 0.02,
      region: "Marmara (Bursa/Uludağ)",
      city: "Bursa (Uludağ)",
      kpssNot: "Batı Anadolu'da kuaterner buzullaşmasının izlerini taşıyan Uludağ zirve platosundaki sirk göllerindendir (Kilimli, Karagöl ile birlikte)."
    }
  ],

  gecitler: [
    // --- AKDENİZ GEÇİTLERİ ---
    {
      id: "gecit_gulek",
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
    {
      id: "tarim_findik_giresun", name: "Fındık (Doğu Karadeniz Kıyısı)", shortName: "Fındık Üretim Alanı", category: "tarim",
      promptTitle: "Türkiye'nin Dünya üretiminde ilk sırada olduğu, kış ılıklığı ve bol nem isteyen fındık üretim alanı haritada neresidir?",
      type: "Meyvecilik / İhraç Ürünü", lat: 40.91, lng: 38.39, region: "Karadeniz", city: "Giresun - Ordu - Trabzon",
      shapeType: "polygon",
      coordinates: [[40.85, 37.4], [41.15, 37.7], [41.1, 39.5], [41.25, 40.8], [40.95, 41.0], [40.65, 39.2], [40.68, 37.5]],
      kpssNot: "Türkiye dünya fındık üretiminde 1. sıradadır. Doğu Karadeniz kıyı kuşağında, yaz kuraklığı görülmeyen nemli iklim ve eğimli yamaçlarda yetişir. Ordu ve Giresun üretimin merkezidir."
    },
    {
      id: "tarim_cay_rize", name: "Çay (Doğu Karadeniz Kıyı Kuşağı)", shortName: "Çay Tarım Alanı", category: "tarim",
      promptTitle: "Her mevsim bol yağış, yüksek nem ve asidik toprak isteyen, Türkiye'de en dar alanda yetişen monokültür tarım alanı haritada neresidir?",
      type: "Endüstri Bitkisi", lat: 41.02, lng: 40.52, region: "Karadeniz", city: "Rize - Artvin - Trabzon",
      shapeType: "polygon",
      coordinates: [[40.95, 40.1], [41.25, 40.5], [41.48, 41.4], [41.35, 41.6], [41.1, 41.2], [40.85, 40.3]],
      kpssNot: "Her mevsim yağışlı iklim, yüksek bağıl nem ve kireçsiz asidik toprak ister. Rize merkezli Doğu Karadeniz kıyı şeridinde toplanmıştır; yayılış alanı Türkiye'de çok dardır."
    },
    {
      id: "tarim_pamuk_cukurova", name: "Pamuk (Çukurova Deltası)", shortName: "Pamuk (Çukurova)", category: "tarim",
      promptTitle: "Yüksek yaz sıcaklığı ve alüvyal delta toprağı isteyen, tekstil sanayisinin hammaddesi olan pamuk alanı haritada neresidir?",
      type: "Endüstri Bitkisi", lat: 37.00, lng: 35.32, region: "Akdeniz", city: "Adana - Mersin",
      shapeType: "polygon",
      coordinates: [[36.75, 34.9], [37.15, 35.1], [37.2, 35.8], [36.85, 36.0], [36.55, 35.4]],
      kpssNot: "Yüksek sıcaklık ve olgunlaşma döneminde kuraklık ister. Çukurova alüvyal toprakları ve uzun vejetasyon süresiyle klasik pamuk yöresidir; tekstil sanayisini besler."
    },
    {
      id: "tarim_pamuk_gap", name: "Pamuk (GAP / Harran Ovası)", shortName: "Pamuk (GAP / Şanlıurfa)", category: "tarim",
      promptTitle: "GAP sulama projeleri sonrasında Türkiye pamuk üretiminde ilk sıraya yerleşen sulu tarım alanı haritada neresidir?",
      type: "Endüstri Bitkisi", lat: 37.16, lng: 38.79, region: "Güneydoğu Anadolu", city: "Şanlıurfa (Harran Ovası)",
      shapeType: "polygon",
      coordinates: [[37.35, 38.6], [37.35, 39.3], [36.85, 39.4], [36.7, 38.8], [37.0, 38.5]],
      kpssNot: "GAP sulaması devreye girdikten sonra Güneydoğu Anadolu pamuk üretiminde 1. sıraya yükselmiştir. Sulamanın tarımsal verimi artırma etkisinin en somut örneğidir."
    },
    {
      id: "tarim_incir_aydin", name: "İncir (Büyük Menderes Grabeni)", shortName: "İncir Üretim Alanı", category: "tarim",
      promptTitle: "Dünya kuru incir üretim ve ihracatında 1. sırada yer aldığımız Ege graben sahası haritada neresidir?",
      type: "Meyvecilik / İhraç Ürünü", lat: 37.85, lng: 27.84, region: "Ege", city: "Aydın - Büyük Menderes",
      shapeType: "polygon",
      coordinates: [[37.75, 27.2], [37.95, 27.6], [38.0, 28.5], [37.7, 28.6], [37.6, 27.5]],
      kpssNot: "Türkiye kuru incir üretim ve ihracatında dünyada ilk sıradadır. Akdeniz iklimi ve Büyük Menderes Ovası'nın alüvyal toprakları belirleyicidir."
    },
    {
      id: "tarim_uzum_manisa", name: "Çekirdeksiz Üzüm (Gediz Grabeni)", shortName: "Çekirdeksiz Kuru Üzüm", category: "tarim",
      promptTitle: "Kuru üzüm (Sultaniye) üretiminin merkezi olan, Ege'nin güneşli graben ovası haritada neresidir?",
      type: "Meyvecilik / İhraç Ürünü", lat: 38.61, lng: 27.43, region: "Ege", city: "Manisa - Gediz Ovası",
      shapeType: "polygon",
      coordinates: [[38.55, 27.2], [38.75, 27.5], [38.55, 28.6], [38.3, 28.5], [38.4, 27.4]],
      kpssNot: "Kuru üzüm (sultaniye) üretiminin merkezi Gediz Ovası çevresidir. Akdeniz ikliminin kurak ve güneşli yazı kurutma için elverişlidir."
    },
    {
      id: "tarim_zeytin_ayvalik", name: "Zeytin (Edremit & Güney Marmara)", shortName: "Zeytin Üretim Kuşağı", category: "tarim",
      promptTitle: "Kış ılıklığı isteyen, sofralık ve yağlık üretimin yoğunlaştığı kıyı kuşağı haritada neresidir?",
      type: "Meyvecilik / Yağ Bitkisi", lat: 39.32, lng: 26.69, region: "Ege - Marmara", city: "Balıkesir (Ayvalık - Edremit)",
      shapeType: "polygon",
      coordinates: [[39.2, 26.5], [39.6, 26.6], [39.7, 27.1], [39.3, 27.0]],
      kpssNot: "Zeytin, Akdeniz ikliminin tipik bitkisidir; kışın don olmaması şarttır. Ege ve Güney Marmara kıyıları en yoğun üretim sahalarıdır."
    },
    {
      id: "tarim_tutun_akhisar", name: "Tütün (Ege & Karadeniz Kuşağı)", shortName: "Tütün Yetişme Alanı", category: "tarim",
      promptTitle: "Kıraç ve eğimli arazilerde kaliteli yetiştirilen, devlet kontrolünde üretilen tütün yöresi haritada neresidir?",
      type: "Endüstri Bitkisi", lat: 38.92, lng: 27.84, region: "Ege", city: "Manisa (Akhisar) - Ege",
      shapeType: "polygon",
      coordinates: [[38.7, 27.5], [39.1, 27.7], [39.05, 28.2], [38.65, 28.0]],
      kpssNot: "Kaliteli tütün, taban suyu az ve eğimli topraklarda yetişir. Ege (Akhisar), Karadeniz (Bafra - Samsun) ve Güneydoğu (Adıyaman) başlıca üretim yöreleridir."
    },
    {
      id: "tarim_muz_anamur", name: "Muz (Anamur - Alanya Kıyı Şeridi)", shortName: "Muz Yetişme Sahası", category: "tarim",
      promptTitle: "Torosların kuzeyden gelen soğuğu kesmesiyle kış ılıklığının korunduğu mikroklima muz sahası haritada neresidir?",
      type: "Meyvecilik / Mikroklima Ürünü", lat: 36.08, lng: 32.84, region: "Akdeniz", city: "Mersin (Anamur) - Antalya (Alanya)",
      shapeType: "polygon",
      coordinates: [[36.0, 32.3], [36.3, 32.0], [36.4, 32.5], [36.1, 33.1], [35.95, 32.9]],
      kpssNot: "Tropikal kökenli bir üründür; kışın dahi düşük sıcaklık görülmeyen mikroklima alanları ister. Anamur - Gazipaşa - Alanya kıyı şeridi uygundur."
    },
    {
      id: "tarim_antepfistigi_gaziantep", name: "Antep Fıstığı (Güneydoğu Platoları)", shortName: "Antep Fıstığı Sahası", category: "tarim",
      promptTitle: "Taşlı, kireçli topraklara ve aşırı yaz kuraklığına dayanıklı fıstık üretim alanı haritada neresidir?",
      type: "Meyvecilik / İhraç Ürünü", lat: 37.07, lng: 37.38, region: "Güneydoğu Anadolu", city: "Gaziantep - Şanlıurfa",
      shapeType: "polygon",
      coordinates: [[36.85, 37.1], [37.35, 37.2], [37.4, 38.2], [36.8, 38.3]],
      kpssNot: "Kurakçıl bir türdür, sulama gerektirmeden taşlı ve kireçli topraklarda yetişebilir. Güneydoğu Anadolu'nun sıcak ve kurak yazına tam uyum sağlamıştır."
    },
    {
      id: "tarim_kayisi_malatya", name: "Kayısı (Malatya Havzası)", shortName: "Kayısı Üretim Havzası", category: "tarim",
      promptTitle: "Dünya kuru kayısı üretiminde lider olduğumuz, çöküntü havzası niteliğindeki alan haritada neresidir?",
      type: "Meyvecilik / İhraç Ürünü", lat: 38.35, lng: 38.31, region: "Doğu Anadolu", city: "Malatya",
      shapeType: "polygon",
      coordinates: [[38.15, 38.0], [38.55, 38.1], [38.6, 38.6], [38.2, 38.5]],
      kpssNot: "Türkiye kuru kayısı üretiminde dünyada ilk sıradadır. Malatya Ovası, Doğu Anadolu içinde çevresine göre daha ılıman ve sulanabilir bir çöküntü alanıdır."
    },
    {
      id: "tarim_gul_isparta", name: "Gül (Göller Yöresi / Isparta)", shortName: "Yağ Gülü Tarım Alanı", category: "tarim",
      promptTitle: "Kozmetik ve parfüm sanayisinin değerli hammaddesi olan yağ gülü üretim sahası haritada neresidir?",
      type: "Endüstri Bitkisi", lat: 37.76, lng: 30.55, region: "Akdeniz", city: "Isparta - Burdur",
      shapeType: "polygon",
      coordinates: [[37.55, 30.2], [37.95, 30.3], [38.0, 31.0], [37.6, 30.9]],
      kpssNot: "Yağ gülü üretimi Göller Yöresi'nde (Isparta-Burdur) toplanmıştır. Gülyağı, parfüm sanayisinin hammaddesidir ve yüksek katma değerli bir ihraç ürünüdür."
    },
    {
      id: "tarim_hashas_afyon", name: "Haşhaş (İç Batı Anadolu)", shortName: "Haşhaş Ekim Sahası", category: "tarim",
      promptTitle: "Tıbbi alkaloid üretimi amacıyla ekimi devlet denetiminde yapılan haşhaş bölgesi haritada neresidir?",
      type: "Endüstri Bitkisi (Devlet Kontrollü)", lat: 38.76, lng: 30.54, region: "Ege", city: "Afyonkarahisar - Uşak",
      shapeType: "polygon",
      coordinates: [[38.4, 30.0], [38.9, 30.1], [38.95, 31.1], [38.45, 31.0]],
      kpssNot: "Ekimi devlet iznine bağlıdır. Afyonkarahisar üretimin merkezidir; Bolvadin'deki tesiste tıbbi alkaloid üretilir."
    },
    {
      id: "tarim_sekerpancari_konya", name: "Şeker Pancarı (İç Anadolu Havzası)", shortName: "Şeker Pancarı Alanı", category: "tarim",
      promptTitle: "Hasattan sonra çabuk bozulduğu için fabrikaları üretim sahasına kurulan şeker pancarı havzası haritada neresidir?",
      type: "Endüstri Bitkisi", lat: 37.87, lng: 32.48, region: "İç Anadolu", city: "Konya - Aksaray - Karaman",
      shapeType: "polygon",
      coordinates: [[37.3, 32.2], [38.2, 32.4], [38.3, 33.7], [37.4, 33.6]],
      kpssNot: "Bozulmadan uzağa taşınamadığı için fabrikalar tarlaların yakınına kurulur (hammaddeye bağlılık). Sulanabilen karasal ovalarda yetişir."
    },
    {
      id: "tarim_celtik_edirne", name: "Çeltik / Pirinç (Meriç & Ergene Havzası)", shortName: "Çeltik (Pirinç) Sahası", category: "tarim",
      promptTitle: "Bol su ve bataklık ortamı isteyen, sıtma riski nedeniyle yerleşim yerlerinden uzakta devlet kontrolünde ekilen çeltik sahası haritada neresidir?",
      type: "Tahıl / Sulu Tarım", lat: 41.68, lng: 26.56, region: "Marmara", city: "Edirne (Meriç - Ergene)",
      shapeType: "polygon",
      coordinates: [[41.1, 26.3], [41.75, 26.4], [41.8, 26.8], [41.3, 26.8]],
      kpssNot: "Bol su isteyen bir üründür; Meriç-Ergene havzası Türkiye pirinç üretiminin en büyük bölümünü karşılar. Ekim alanları sıtma riski sebebiyle devlet iznine bağlıdır."
    },
    {
      id: "tarim_turuncgil_antalya", name: "Turunçgil (Akdeniz Kıyı Kuşağı)", shortName: "Turunçgil (Narenciye) Kuşağı", category: "tarim",
      promptTitle: "Kış donlarına karşı aşırı duyarlı olan, Türkiye üretiminin büyük kısmının yapıldığı Akdeniz kıyı kuşağı haritada neresidir?",
      type: "Meyvecilik", lat: 36.89, lng: 30.71, region: "Akdeniz", city: "Antalya - Mersin - Adana",
      shapeType: "polygon",
      coordinates: [[36.3, 30.1], [36.95, 30.6], [36.85, 32.2], [36.4, 34.5], [36.8, 35.8], [36.2, 35.8], [36.1, 30.5]],
      kpssNot: "Kışın don görmeyen kıyı ovalarında yetişir. Akdeniz kıyı şeridi ile Doğu Karadeniz'de Rize çevresi (mikroklima) başlıca üretim alanlarıdır."
    },
    {
      id: "tarim_aycicegi_trakya", name: "Ayçiçeği (Ergene / Trakya Havzası)", shortName: "Ayçiçeği Üretim Havzası", category: "tarim",
      promptTitle: "Türkiye'nin sıvı yağ ihtiyacının karşılanmasında 1. sırada yer alan Trakya tarım havzası haritada neresidir?",
      type: "Yağ Bitkisi", lat: 40.98, lng: 27.51, region: "Marmara", city: "Tekirdağ - Edirne - Kırklareli",
      shapeType: "polygon",
      coordinates: [[41.0, 26.6], [41.55, 26.8], [41.6, 27.6], [41.1, 27.8], [40.85, 27.3]],
      kpssNot: "Türkiye'nin bitkisel yağ açığını kapatan temel üründür. Ergene Havzası (Tekirdağ - Edirne - Kırklareli) üretimin ağırlık merkezidir."
    },
    {
      id: "tarim_bugday_polatli", name: "Buğday (İç Anadolu Tahıl Kuşağı)", shortName: "Buğday Ekim Kuşağı", category: "tarim",
      promptTitle: "Türkiye'de ekim alanı en geniş olan, ilkbahar yağışı ve yaz kuraklığı isteyen temel tahıl kuşağı haritada neresidir?",
      type: "Tahıl", lat: 39.58, lng: 32.14, region: "İç Anadolu", city: "Ankara (Polatlı) - Konya",
      shapeType: "polygon",
      coordinates: [[39.2, 31.6], [39.9, 31.8], [39.95, 32.9], [39.25, 32.8]],
      kpssNot: "Türkiye'de en geniş ekim alanına sahip üründür. Karasal iklimin yarı kurak koşullarına uyumludur; İç Anadolu platoları başlıca alandır."
    },
    {
      id: "tarim_mercimek_diyarbakir", name: "Kırmızı Mercimek (Güneydoğu Platoları)", shortName: "Kırmızı Mercimek Sahası", category: "tarim",
      promptTitle: "Aşırı kurak ve sıcak iklime uyum sağlamış olan kırmızı mercimek üretim sahası haritada neresidir?",
      type: "Baklagil", lat: 37.91, lng: 40.24, region: "Güneydoğu Anadolu", city: "Diyarbakır - Şanlıurfa - Mardin",
      shapeType: "polygon",
      coordinates: [[37.2, 39.5], [38.0, 39.7], [38.1, 41.0], [37.3, 41.1]],
      kpssNot: "Kırmızı mercimek üretimi Güneydoğu Anadolu'da yoğunlaşmıştır. Yeşil mercimek ise daha çok İç Anadolu'da (Yozgat - Çorum) yetiştirilir."
    },
    {
      id: "tarim_sera_kumluca", name: "Örtü Altı (Sera) Sebzeciliği - Kumluca", shortName: "Sera Tarım Alanı", category: "tarim",
      promptTitle: "Kış ılıklığı ve yüksek güneşlenme süresi sayesinde kış sebzeciliğinin yapıldığı örtü altı tarım merkezi haritada neresidir?",
      type: "Sera Tarımı", lat: 36.37, lng: 30.29, region: "Akdeniz", city: "Antalya (Kumluca - Finike - Demre)",
      shapeType: "polygon",
      coordinates: [[36.2, 29.9], [36.4, 30.1], [36.45, 30.4], [36.25, 30.4]],
      kpssNot: "Akdeniz kıyısındaki ılık kışlar sayesinde seralar az enerjiyle ısıtılır. Kumluca - Finike - Demre hattı Türkiye'nin sera merkezidir."
    },
    {
      id: "tarim_elma_karaman", name: "Elma (İç Anadolu & Göller Yöresi)", shortName: "Elma Yetişme Kuşağı", category: "tarim",
      promptTitle: "Kış soğuklamasına ihtiyaç duyan, Türkiye üretiminde başı çeken elma bahçeleri kuşağı haritada neresidir?",
      type: "Meyvecilik", lat: 37.18, lng: 33.22, region: "İç Anadolu - Akdeniz", city: "Karaman - Niğde - Isparta",
      shapeType: "polygon",
      coordinates: [[37.0, 30.8], [37.9, 31.0], [38.1, 34.6], [37.1, 34.0], [36.9, 33.1]],
      kpssNot: "Elma, kış soğuğuna ihtiyaç duyan bir meyvedir. Karaman, Isparta ve Niğde Türkiye elma üretiminin zirvesindedir."
    }
  ],

  hayvancilik: [
    {
      id: "hayvan_buyukbas_erzurum_kars", name: "Büyükbaş Mera Hayvancılığı (Erzurum - Kars)", shortName: "Büyükbaş (Mera / Çayır)", category: "hayvancilik",
      promptTitle: "Yaz yağışlarıyla yeşeren gür Alpin çayırları sayesinde büyükbaş mera hayvancılığının geliştiği yüksek plato sahası haritada neresidir?",
      type: "Büyükbaş (Mera)", lat: 40.50, lng: 42.60, region: "Doğu Anadolu", city: "Erzurum - Kars - Ardahan",
      shapeType: "polygon",
      coordinates: [[39.7, 41.0], [41.2, 41.5], [41.4, 43.2], [40.4, 43.5], [39.6, 42.2]],
      kpssNot: "Yaz yağışları -> gür çayırlar -> büyükbaş mera hayvancılığı bağlantısı KPSS'nin en klasik nedensellik sorularındandır. Et ve süt kombinaları gelişmiştir."
    },
    {
      id: "hayvan_kil_kecisi_teke_taseli", name: "Kıl Keçisi (Teke & Taşeli Karstik Platoları)", shortName: "Kıl Keçisi Yetiştiriciliği", category: "hayvancilik",
      promptTitle: "Engebeli karstik araziye ve maki bitki örtüsüne uyum sağlamış kıl keçisi yetiştiriciliğinin merkezi olan platolar haritada neresidir?",
      type: "Küçükbaş (Kıl Keçisi)", lat: 36.55, lng: 31.50, region: "Akdeniz", city: "Teke ve Taşeli Platoları",
      shapeType: "polygon",
      coordinates: [[36.2, 29.3], [37.1, 29.8], [37.0, 33.4], [36.0, 33.2], [36.0, 30.5]],
      kpssNot: "Kıl keçisi dağlık ve kayalık alanlara çok iyi tırmanır; maki çalılarıyla beslenir. Ormanlara zarar verdiği için otlatılması devlet kontrolündedir."
    },
    {
      id: "hayvan_tiftik_ankara", name: "Tiftik Keçisi (Ankara & İç Batı Anadolu)", shortName: "Tiftik (Ankara) Keçisi", category: "hayvancilik",
      promptTitle: "Yünü (Moher) dokuma sanayisinde değerli olan tiftik keçisinin anavatanı ve yetiştirme alanı haritada neresidir?",
      type: "Küçükbaş (Tiftik Keçisi)", lat: 39.93, lng: 32.85, region: "İç Anadolu", city: "Ankara - Eskişehir - Çankırı",
      shapeType: "polygon",
      coordinates: [[39.3, 31.5], [40.4, 31.8], [40.5, 33.7], [39.4, 33.5]],
      kpssNot: "Ankara keçisi olarak da bilinir. İnce, parlak ve dayanıklı tiftik (moher) yünü için beslenir; bozkır alanlarına uyumludur."
    },
    {
      id: "hayvan_kucukbas_koyun_ic_anadolu", name: "Küçükbaş Koyun Hayvancılığı (İç Anadolu)", shortName: "Koyun (Step / Bozkır)", category: "hayvancilik",
      promptTitle: "İlkbaharda yeşerip yazın kuruyan bozkır (step) otlarıyla beslenen koyun yetiştiriciliğinin en yaygın olduğu düzlükler haritada neresidir?",
      type: "Küçükbaş (Koyun)", lat: 38.60, lng: 33.50, region: "İç Anadolu", city: "Konya - Aksaray - Karaman - Kırşehir",
      shapeType: "polygon",
      coordinates: [[37.5, 32.0], [39.3, 32.3], [39.5, 34.5], [37.6, 34.2]],
      kpssNot: "Türkiye'de sayıca en fazla beslenen hayvan koyundur. Düz araziler ve kısa boylu bozkır otları küçükbaş koyun için idealdir."
    },
    {
      id: "hayvan_kumes_marmara_bolu", name: "Kümes Hayvancılığı (Marmara & Bolu Kuşağı)", shortName: "Kümes Hayvancılığı Kuşağı", category: "hayvancilik",
      promptTitle: "İklimden bağımsız olarak büyük şehirlerin et ve yumurta tüketim ihtiyacını karşılamak amacıyla kurulan tesisler kuşağı haritada neresidir?",
      type: "Kümes Hayvancılığı (Pazara Yakınlık)", lat: 40.73, lng: 31.60, region: "Marmara - Karadeniz", city: "Bolu - Sakarya - Manisa - Balıkesir",
      shapeType: "polygon",
      coordinates: [[40.3, 29.5], [40.9, 30.2], [40.9, 32.1], [40.2, 31.9]],
      kpssNot: "Kümes hayvancılığı kapalı modern tesislerde yapıldığı için iklimden etkilenmez. Kuruluşunda tek belirleyici etken tüketim merkezlerine (pazara) yakınlıktır."
    },
    {
      id: "hayvan_aricilik_mentese_mugla", name: "Arıcılık / Çam Balı (Menteşe Yöresi)", shortName: "Arıcılık (Çam Balı / Menteşe)", category: "hayvancilik",
      promptTitle: "Zengin kızılçam ormanları ve basra böceği sayesinde dünya çam balı üretiminin merkezi olan engebeli kıyı sahası haritada neresidir?",
      type: "Arıcılık", lat: 37.05, lng: 28.25, region: "Ege", city: "Muğla (Menteşe Yöresi)",
      shapeType: "polygon",
      coordinates: [[36.6, 27.4], [37.3, 27.6], [37.4, 28.8], [36.7, 28.7]],
      kpssNot: "Muğla - Menteşe yöresi Türkiye ve dünya çam balı üretiminin kalbidir. Arıcılık ayrıca bitki örtüsü zengin Doğu Karadeniz (Rize-Anzer) ve Hakkâri'de de gelişmiştir."
    },
    {
      id: "hayvan_ipekbocegi_diyarbakir_bursa", name: "İpek Böcekçiliği (Diyarbakır & Güney Marmara)", shortName: "İpek Böcekçiliği", category: "hayvancilik",
      promptTitle: "Dut yaprağı ile beslenen tırtıllardan doğal ipek lifi elde edilen tarihî yetiştiricilik alanı haritada neresidir?",
      type: "İpek Böcekçiliği", lat: 37.91, lng: 40.24, region: "Güneydoğu & Marmara", city: "Diyarbakır (Kulp) - Bursa",
      shapeType: "polygon",
      coordinates: [[38.1, 40.5], [38.5, 40.8], [38.6, 41.3], [38.0, 41.1]],
      kpssNot: "Geleneksel merkezi Bursa iken, günümüzde yaş koza üretiminde Diyarbakır (Kulp) ilk sıraya yükselmiştir."
    }
  ],

  sanayi: [
    {
      id: "sanayi_eregli_demircelik", name: "Ereğli Demir-Çelik (Erdemir)", shortName: "Ereğli Demir-Çelik Tesisleri", category: "sanayi",
      promptTitle: "Taşkömürü havzasına (enerji kaynağına) yakınlık ve liman avantajıyla kurulan entegre demir-çelik sahası haritada neresidir?",
      type: "Demir-Çelik (Enerjiye Yakınlık)", lat: 41.28, lng: 31.42, region: "Karadeniz", city: "Zonguldak (Kdz. Ereğli)",
      shapeType: "polygon",
      coordinates: [[41.2, 31.3], [41.35, 31.35], [41.35, 31.55], [41.2, 31.5]],
      kpssNot: "Zonguldak taşkömürü havzasının hemen yanına, enerji kaynağına yakınlık ilkesiyle kurulmuştur. Liman avantajıyla cevher ithal eder."
    },
    {
      id: "sanayi_karabuk_demircelik", name: "Karabük Demir-Çelik (Kardemir)", shortName: "Karabük Demir-Çelik", category: "sanayi",
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
      id: "sanayi_batman_rafineri", name: "Batman Petrol Rafinerisi", shortName: "Batman Rafinerisi", category: "sanayi",
      promptTitle: "Türkiye'nin ilk rafinerisi olup yerli petrol çıkarım sahalarının yanına (hammaddeye yakınlık) kurulan tesis haritada neresidir?",
      type: "Petrol Rafinerisi (Hammaddeye Yakınlık)", lat: 37.88, lng: 41.13, region: "Güneydoğu Anadolu", city: "Batman",
      shapeType: "polygon",
      coordinates: [[37.82, 41.05], [37.95, 41.05], [37.95, 41.22], [37.82, 41.22]],
      kpssNot: "Türkiye'nin ilk rafinerisidir ve ülkedeki petrol çıkarım sahalarının (Raman, Garzan) yanı başındadır — hammaddeye bağlı kuruluş örneğidir."
    },
    {
      id: "sanayi_aliaga_petrokimya", name: "Aliağa Rafineri ve Petrokimya (Petkim / Star)", shortName: "Aliağa Petrokimya Kompleksi", category: "sanayi",
      promptTitle: "Liman avantajı, rafineri entegrasyonu ve gemi söküm tesislerinin bir arada bulunduğu Ege petrokimya kompleksi haritada neresidir?",
      type: "Rafineri / Petrokimya", lat: 38.80, lng: 26.97, region: "Ege", city: "İzmir (Aliağa)",
      shapeType: "polygon",
      coordinates: [[38.72, 26.9], [38.86, 26.9], [38.86, 27.05], [38.72, 27.05]],
      kpssNot: "Rafineri ile Petkim tesisleri yan yanadır; rafineri çıktısı doğrudan petrokimyaya hammadde olur. Ayrıca ülkenin en büyük gemi söküm tesisleri buradadır."
    },
    {
      id: "sanayi_seydisehir_aluminyum", name: "Seydişehir Alüminyum Tesisleri", shortName: "Seydişehir Alüminyum", category: "sanayi",
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
      id: "iklim_erzurum_sert_kis", name: "Sert Karasal İklim (Erzurum-Kars)", shortName: "Sert Karasal İklim", category: "iklim",
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
      id: "iklim_igdir_enaz_yagis", name: "Iğdır Ovası Mikrokliması (En Az Yağış)", shortName: "Iğdır Çukur Mikrokliması", category: "iklim",
      promptTitle: "Çevresindeki yüksek dağlar nedeniyle föhn rüzgârları alan, en az yağış alan ve pamuk yetişen çukur mikroklima sahası haritada neresidir?",
      type: "Mikroklima / Az Yağış", lat: 39.92, lng: 44.04, region: "Doğu Anadolu", city: "Iğdır Ovası",
      shapeType: "polygon",
      coordinates: [[39.8, 43.7], [40.1, 43.8], [40.1, 44.4], [39.75, 44.3]],
      kpssNot: "Çevresine göre 1000 metre daha alçakta bir çöküntü ovasıdır. Föhn etkisiyle kışları ılık geçer; Türkiye'nin en az yağış alan mikroklima sahasıdır."
    },
    {
      id: "iklim_karapinar_kuraklik", name: "Karapınar Çölleşme & Kuraklık Alanı", shortName: "Karapınar Kuraklık Alanı", category: "iklim",
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
      id: "iklim_hakkari_kar", name: "Hakkâri Cilo Yöresi (Kar Örtüsü Süresi)", shortName: "En Uzun Kar Örtüsü Yöresi", category: "iklim",
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
      id: "orman_yedigoller_mp", name: "Yedigöller Milli Parkı", category: "orman",
      type: "Milli Park", lat: 40.94, lng: 31.75, region: "Karadeniz", city: "Bolu",
      kpssNot: "Heyelan set gölleriyle ormanın iç içe geçtiği milli parktır. Sonbahar renkleriyle ekoturizmde öne çıkar."
    },
    {
      id: "orman_kure_daglari_mp", name: "Küre Dağları Milli Parkı", category: "orman",
      type: "Milli Park", lat: 41.75, lng: 33.30, region: "Karadeniz", city: "Kastamonu - Bartın",
      kpssNot: "Karstik kanyonları ve el değmemiş ormanlarıyla Avrupa'nın korunacak sıcak noktalarından sayılır. Ilgarini Mağarası ve Valla Kanyonu bu alandadır."
    },
    {
      id: "orman_ilgaz_mp", name: "Ilgaz Dağı Milli Parkı", category: "orman",
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
      id: "orman_alpin_kackar", name: "Alpin Çayırlar (Kaçkarlar)", category: "orman",
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
