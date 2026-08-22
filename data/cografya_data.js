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
      kpssNot: "Türkiye'nin en genç volkanik arazisidir. 'Yanık Ülke (Katakekaumene)' olarak bilinir. Türkiye'nin ilk UNESCO Jeoparkıdır."
    },

    // --- KIRIK DAĞLAR (HORST) ---
    {
      id: "dag_kaz",
      name: "Kaz Dağları",
      category: "daglar",
      type: "Kırık Dağ (Horst)",
      lat: 39.70,
      lng: 26.85,
      region: "Ege / Marmara",
      kpssNot: "Edremit Körfezi kuzeyindedir. Yüksek oksijen oranı ve milli parkı ile bilinir. Kırık dağdır."
    },
    {
      id: "dag_madra",
      name: "Madra Dağı",
      category: "daglar",
      type: "Kırık Dağ (Horst)",
      lat: 39.30,
      lng: 27.05,
      region: "Ege",
      kpssNot: "Bakırçay Grabeni'nin kuzeyinde yer alan horst dağdır."
    },
    {
      id: "dag_yunt",
      name: "Yunt Dağı",
      category: "daglar",
      type: "Kırık Dağ (Horst)",
      lat: 38.90,
      lng: 27.30,
      region: "Ege",
      kpssNot: "Bakırçay ile Gediz grabenleri arasında yükselen horst dağıdır."
    },
    {
      id: "dag_bozdaglar",
      name: "Bozdağlar",
      category: "daglar",
      type: "Kırık Dağ (Horst)",
      lat: 38.35,
      lng: 28.10,
      region: "Ege",
      kpssNot: "Gediz ile Küçük Menderes grabenleri arasında uzanır. Kış turizmi yapılır."
    },
    {
      id: "dag_aydin",
      name: "Aydın Dağları",
      category: "daglar",
      type: "Kırık Dağ (Horst)",
      lat: 37.95,
      lng: 28.10,
      region: "Ege",
      kpssNot: "Küçük Menderes ile Büyük Menderes grabenleri arasında uzanan horsttur."
    },
    {
      id: "dag_mentese",
      name: "Menteşe Dağları",
      category: "daglar",
      type: "Kırık / Engebeli Dağ",
      lat: 37.20,
      lng: 28.20,
      region: "Ege",
      kpssNot: "Ege'de kıyıya PARALEL uzanan tek dağ grubudur. Bu yüzden bol yamaç yağışı alır, nüfusu ve ulaşımı seyrektir."
    },
    {
      id: "dag_nur_amanos",
      name: "Nur (Amanos) Dağları",
      category: "daglar",
      type: "Kırık Dağ (Horst)",
      lat: 36.75,
      lng: 36.30,
      region: "Akdeniz",
      kpssNot: "Ege dışındaki tek kırık (horst) dağımızdır. Doğusunda Amik Grabeni yer alır. Üzerinde Belen Geçidi bulunur."
    },

    // --- KIVRIM DAĞLARI ---
    {
      id: "dag_kackar",
      name: "Kaçkar Dağları",
      category: "daglar",
      type: "Kıvrım Dağı",
      lat: 40.83,
      lng: 41.16,
      region: "Karadeniz",
      kpssNot: "Kuzey Anadolu Dağları'nın en yüksek bölümüdür (3.932 m). Zirvelerinde buzul (sirk) gölleri ve aktüel buzullar vardır."
    },
    {
      id: "dag_canik",
      name: "Canik Dağları",
      category: "daglar",
      type: "Kıvrım Dağı",
      lat: 41.00,
      lng: 36.60,
      region: "Karadeniz",
      kpssNot: "Yükseltisi azdır ve kıyıdan geride başlar. Bu sayede Samsun'un hinterlandı geniştir ve Bafra-Çarşamba deltaları oluşmuştur."
    },
    {
      id: "dag_kure",
      name: "Küre (İsfendiyar) Dağları",
      category: "daglar",
      type: "Kıvrım Dağı",
      lat: 41.70,
      lng: 33.70,
      region: "Karadeniz",
      kpssNot: "Batı Karadeniz'de kıyıya paraleldir. Bakır yatakları (Kastamonu-Küre) ve zengin ormanlarıyla bilinir."
    },
    {
      id: "dag_ilgaz",
      name: "Ilgaz Dağları",
      category: "daglar",
      type: "Kıvrım Dağı",
      lat: 41.08,
      lng: 33.73,
      region: "Karadeniz",
      kpssNot: "Batı Karadeniz iç kuşağındadır. Milli park ve kış turizmi alanıdır. Üzerinde Ilgaz Geçidi bulunur."
    },
    {
      id: "dag_bolu_koroglu",
      name: "Köroğlu Dağları",
      category: "daglar",
      type: "Kıvrım Dağı",
      lat: 40.60,
      lng: 31.80,
      region: "Karadeniz",
      kpssNot: "Batı Karadeniz iç sırasında yer alır. Kartalkaya kayak merkezi buradadır."
    },
    {
      id: "dag_cilo_hakkari",
      name: "Cilo (Buzul) Dağı / Reşko",
      category: "daglar",
      type: "Kıvrım Dağı",
      lat: 37.48,
      lng: 44.02,
      region: "Doğu Anadolu",
      kpssNot: "Türkiye'nin ikinci en yüksek zirvesi olan Uludoruk (Reşko-4.135 m) buradadır. Türkiye'nin en büyük vadi buzulu Cilo'dadır."
    },
    {
      id: "dag_munzur_mercan",
      name: "Munzur (Mercan) Dağları",
      category: "daglar",
      type: "Kıvrım Dağı",
      lat: 39.35,
      lng: 39.45,
      region: "Doğu Anadolu",
      kpssNot: "Tunceli-Erzincan arasında yer alır. Karstik kaynaklar ve buzul gölleri barındırır. Milli parktır."
    },
    {
      id: "dag_bolkar",
      name: "Bolkar Dağları",
      category: "daglar",
      type: "Kıvrım Dağı (Orta Toroslar)",
      lat: 37.25,
      lng: 34.60,
      region: "Akdeniz",
      kpssNot: "Orta Toroslar'dadır. Karstik şekiller ve buzul izleri taşır. Sadece burada yaşayan endemik Toros Kurbağası bulunur."
    },
    {
      id: "dag_aladaglar",
      name: "Aladağlar",
      category: "daglar",
      type: "Kıvrım Dağı (Orta Toroslar)",
      lat: 37.80,
      lng: 35.15,
      region: "Akdeniz",
      kpssNot: "Torosların en yüksek kısmıdır (Demirkazık Zirvesi). Dağcılık ve karstik kanyonlarıyla (Kapuzbaşı) ünlüdür."
    },
    {
      id: "dag_beydaglari",
      name: "Bey Dağları",
      category: "daglar",
      type: "Kıvrım Dağı (Batı Toroslar)",
      lat: 36.60,
      lng: 30.30,
      region: "Akdeniz",
      kpssNot: "Antalya Körfezi'nin batısında yükselir. Saklıkent kayak merkezi buradadır."
    },
    {
      id: "dag_geyik",
      name: "Geyik Dağları",
      category: "daglar",
      type: "Kıvrım Dağı (Batı Toroslar)",
      lat: 36.90,
      lng: 32.20,
      region: "Akdeniz",
      kpssNot: "Antalya-Konya sınırında Batı Toroslar kuşağında yer alır."
    },
    {
      id: "dag_tahtali",
      name: "Tahtalı Dağları",
      category: "daglar",
      type: "Kıvrım Dağı (Orta Toroslar)",
      lat: 38.30,
      lng: 36.30,
      region: "Akdeniz / İç Anadolu",
      kpssNot: "Seyhan Nehri kolları tarafından yarılmış Orta Toros kütlesidir."
    },
    {
      id: "dag_binboga",
      name: "Binboğa Dağları",
      category: "daglar",
      type: "Kıvrım Dağı (Orta Toroslar)",
      lat: 38.25,
      lng: 36.70,
      region: "Akdeniz / Doğu Anadolu",
      kpssNot: "Kahramanmaraş-Kayseri sınırında uzanan Toros uzantısıdır."
    },
    {
      id: "dag_yildiz",
      name: "Yıldız (Istranca) Dağları",
      category: "daglar",
      type: "Kıvrım / Masif Dağı",
      lat: 41.75,
      lng: 27.55,
      region: "Marmara",
      kpssNot: "Marmara'nın Karadeniz kıyısındaki engebeli masif alanıdır. Ulaşım yollarına sapa kaldığı için seyrek nüfusludur."
    },
    {
      id: "dag_uludag",
      name: "Uludağ",
      category: "daglar",
      type: "Derinlik Volkanizması (Batolit)",
      lat: 40.07,
      lng: 29.22,
      region: "Marmara",
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
      kpssNot: "Uludağ'ın kuzey eteğinde yer alan, sanayi ve meyve/sebze tarımının yoğun olduğu ovadır."
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
      kpssNot: "Karstik (voklüz) gür kaynaklarla beslendiği için AKIMI YIL BOYUNCA EN DÜZENLİ akarsularımızdandır."
    },

    // --- GÖLLER ---
    {
      id: "gol_van",
      name: "Van Gölü",
      category: "su_kaynaklari",
      type: "Volkanik Set / Tektonik Göl",
      lat: 38.60,
      lng: 42.90,
      region: "Doğu Anadolu",
      kpssNot: "TÜRKİYE'NİN EN BÜYÜK GÖLÜDÜR (Karma oluşumlu: Nemrut lavları önünü kapatmıştır). Suları SODALIDIR. İnci kefali yaşar. Tatvan-Van arası feribotla demiryolu bağlantısı vardır."
    },
    {
      id: "gol_tuz",
      name: "Tuz Gölü",
      category: "su_kaynaklari",
      type: "Tektonik Göl (Kapalı Havza)",
      lat: 38.75,
      lng: 33.30,
      region: "İç Anadolu",
      kpssNot: "Türkiye'nin 2. büyük gölüdür ancak yazın buharlaşmayla alanı en çok küçülen göldür. Türkiye tuz ihtiyacının büyük kısmını karşılar."
    },
    {
      id: "gol_beysehir",
      name: "Beyşehir Gölü",
      category: "su_kaynaklari",
      type: "Tektonik - Karstik Göl",
      lat: 37.75,
      lng: 31.50,
      region: "Akdeniz (Göller Yöresi)",
      kpssNot: "TÜRKİYE'NİN EN BÜYÜK TATLI SU GÖLÜDÜR. Gideğeni (Çarşamba Çayı) olduğu için suları tatlıdır. Milli parktır."
    },
    {
      id: "gol_egirdir",
      name: "Eğirdir Gölü",
      category: "su_kaynaklari",
      type: "Tektonik - Karstik Göl",
      lat: 38.05,
      lng: 30.85,
      region: "Akdeniz (Göller Yöresi)",
      kpssNot: "Türkiye'nin 2. büyük tatlı su gölüdür. Kovada Kanalı ile Kovada Gölü'ne ve hidroelektrik santraline su verir."
    },
    {
      id: "gol_iznik",
      name: "İznik Gölü",
      category: "su_kaynaklari",
      type: "Tektonik Göl",
      lat: 40.43,
      lng: 29.50,
      region: "Marmara",
      kpssNot: "Marmara Bölgesi'nin en büyük doğal gölüdür. Suları tatlıdır."
    },
    {
      id: "gol_salda",
      name: "Salda Gölü",
      category: "su_kaynaklari",
      type: "Karstik Göl",
      lat: 37.55,
      lng: 29.68,
      region: "Akdeniz (Burdur)",
      kpssNot: "Türkiye'nin Maldivleri olarak anılır. Magnezyum zengini beyaz kumulları Mars kayaç yapısıyla benzerlik gösterir."
    },
    {
      id: "gol_cildir",
      name: "Çıldır Gölü",
      category: "su_kaynaklari",
      type: "Volkanik Set Gölü",
      lat: 41.05,
      lng: 43.25,
      region: "Doğu Anadolu (Ardahan-Kars)",
      kpssNot: "Kışın yüzeyi tamamen donar; atlı kızak ve buz altı balıkçılığı (eski usul) ile ünlüdür."
    },
    {
      id: "gol_terkos",
      name: "Terkos (Durusu) Gölü",
      category: "su_kaynaklari",
      type: "Kıyı Set Gölü (Lagün)",
      lat: 41.33,
      lng: 28.58,
      region: "Marmara (İstanbul)",
      kpssNot: "Dalga biriktirmesiyle koy önünün kapanması sonucu oluşan klasik KIYI SET (LAGÜN) gölü örneğidir. İstanbul'un önemli su kaynağıdır."
    },
    {
      id: "gol_abant",
      name: "Abant Gölü",
      category: "su_kaynaklari",
      type: "Heyelan Set Gölü",
      lat: 40.60,
      lng: 31.28,
      region: "Karadeniz (Bolu)",
      kpssNot: "Heyelan sonucu vadi önünün kapanmasıyla oluşan turistik heyelan set gölüdür."
    },
    {
      id: "gol_yedigoller",
      name: "Yedigöller",
      category: "su_kaynaklari",
      type: "Heyelan Set Gölleri",
      lat: 40.94,
      lng: 31.74,
      region: "Karadeniz (Bolu)",
      kpssNot: "Birden çok heyelanın vadiyi basamaklı kapatmasıyla oluşan 7 gölden (Büyükgöl, Seringöl vb.) oluşan milli parktır."
    },
    {
      id: "gol_tortum",
      name: "Tortum Gölü",
      category: "su_kaynaklari",
      type: "Heyelan Set Gölü",
      lat: 40.65,
      lng: 41.65,
      region: "Doğu Anadolu (Erzurum)",
      kpssNot: "Kheyelan set gölüdür; gölün taşan suları Tortum Şelalesi'ni oluşturur."
    },
    {
      id: "gol_meke",
      name: "Meke Tuzlası (Maar)",
      category: "su_kaynaklari",
      type: "Volkanik Patlama Gölü (Maar)",
      lat: 37.69,
      lng: 33.64,
      region: "İç Anadolu (Konya/Karapınar)",
      kpssNot: "Gaz patlaması sonucu oluşan çanakta gelişen, 'Dünyanın Nazar Boncuğu' olarak bilinen maar gölüdür."
    },
    {
      id: "gol_koycegiz",
      name: "Köyceğiz Gölü",
      category: "su_kaynaklari",
      type: "Alüvyal Set Gölü",
      lat: 36.90,
      lng: 28.65,
      region: "Ege (Muğla)",
      kpssNot: "Alüvyonların koy önünü kapatmasıyla oluşan göldür; Dalyan kanalı ile İztuzu Plajı'ndan Akdeniz'e bağlanır."
    },
    {
      id: "gol_bafa",
      name: "Bafa (Çamiçi) Gölü",
      category: "su_kaynaklari",
      type: "Alüvyal Set Gölü",
      lat: 37.50,
      lng: 27.42,
      region: "Ege (Aydın-Muğla)",
      kpssNot: "Büyük Menderes'in taşıdığı alüvyonların Latmos Körfezi önünü kapatmasıyla denizden ayrılan alüvyal set gölüdür."
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
    }
  ]
};

// Kategori başlıkları ve ikonları
const CATEGORIES = [
  { id: "daglar", title: "Dağlar", icon: "🏔️", color: "#e67e22", count: COGRAFYA_DATA.daglar.length },
  { id: "ovalar", title: "Ovalar", icon: "🌾", color: "#27ae60", count: COGRAFYA_DATA.ovalar.length },
  { id: "platolar", title: "Platolar", icon: "⛰️", color: "#d35400", count: COGRAFYA_DATA.platolar.length },
  { id: "su_kaynaklari", title: "Akarsu & Göller", icon: "🌊", color: "#2980b9", count: COGRAFYA_DATA.su_kaynaklari.length },
  { id: "gecitler", title: "Geçitler & Boğazlar", icon: "🚪", color: "#8e44ad", count: COGRAFYA_DATA.gecitler.length }
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
    { id: "karstik", label: "Karstik (Polye)", icon: "💧", filter: (item) => (item.type || "").toLowerCase().includes("karstik") || (item.type || "").toLowerCase().includes("polye") }
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
    { id: "goller", label: "Göller", icon: "🏞️", filter: (item) => (item.type || "").toLowerCase().includes("göl") }
  ],
  gecitler: [
    { id: "all", label: "Tüm Geçitler", icon: "🚪" },
    { id: "karadeniz", label: "Karadeniz Geçitleri", icon: "🌲", filter: (item) => (item.region || "").toLowerCase().includes("karadeniz") },
    { id: "akdeniz", label: "Akdeniz Geçitleri", icon: "☀️", filter: (item) => (item.region || "").toLowerCase().includes("akdeniz") }
  ],
  ozel_cizimler: [
    { id: "all", label: "Tüm Çizimlerim", icon: "🎨" },
    { id: "point", label: "Noktalar (Pin)", icon: "📍", filter: (item) => item.shapeType === "point" || !item.shapeType },
    { id: "polyline", label: "Çizgiler / Hatlar", icon: "📏", filter: (item) => item.shapeType === "polyline" },
    { id: "polygon", label: "Alanlar / Çokgenler", icon: "📐", filter: (item) => item.shapeType === "polygon" }
  ]
};
