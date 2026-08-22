/**
 * KPSS Coğrafya Yer Şekilleri Veri Tabanı
 * Her kayıt; benzersiz id, isim, kategori, alt tür (tip), koordinat [enlem, boylam],
 * bölge ve KPSS sınavına yönelik kısa ve can alıcı 'kpssNot' bilgisini barındırır.
 */

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
  ]
};

// Kategori başlıkları ve ikonları
const CATEGORIES = [
  { id: "daglar", title: "Dağlar", icon: "🏔️", color: "#e67e22", count: COGRAFYA_DATA.daglar.length },
  { id: "ovalar", title: "Ovalar", icon: "🌾", color: "#27ae60", count: COGRAFYA_DATA.ovalar.length },
  { id: "platolar", title: "Platolar", icon: "⛰️", color: "#d35400", count: COGRAFYA_DATA.platolar.length },
  { id: "su_kaynaklari", title: "Akarsu & Göller", icon: "🌊", color: "#2980b9", count: COGRAFYA_DATA.su_kaynaklari.length },
  { id: "gecitler", title: "Geçitler & Boğazlar", icon: "🚪", color: "#8e44ad", count: COGRAFYA_DATA.gecitler.length },
  { id: "iliskili_cografya", title: "İlişkili Eşleştirme", icon: "🔗", color: "#ec4899", count: COGRAFYA_DATA.iliskili_cografya.length }
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
  iliskili_cografya: [
    { id: "all", label: "Tüm Eşleştirmeler", icon: "🔗" },
    { id: "akarsu_delta", label: "Akarsu ➡️ Delta", icon: "🏖️", filter: (item) => item.matchType === 'akarsu_delta' },
    { id: "dag_gecit", label: "Dağ ➡️ Geçit", icon: "🚪", filter: (item) => item.matchType === 'dag_gecit' },
    { id: "olusum_sekil", label: "Oluşum ➡️ Yer Şekli", icon: "🌋", filter: (item) => item.matchType === 'olusum_sekil' }
  ],
  ozel_cizimler: [
    { id: "all", label: "Tüm Çizimlerim", icon: "🎨" },
    { id: "point", label: "Noktalar (Pin)", icon: "📍", filter: (item) => item.shapeType === "point" || !item.shapeType },
    { id: "polyline", label: "Çizgiler / Hatlar", icon: "📏", filter: (item) => item.shapeType === "polyline" },
    { id: "polygon", label: "Alanlar / Çokgenler", icon: "📐", filter: (item) => item.shapeType === "polygon" }
  ]
};
