/**
 * 🌐 DÜNYA BEŞERİ & KÜLTÜREL COĞRAFYASI — Yazım Kaynağı
 *
 * Kapsam: ülkeler & başkentler & kıtalar, dünyanın harikaları (antik 7 /
 * yeni 7 / doğal), önemli yapılar & mühendislik eserleri.
 *
 * Yazım kuralları 92_dunya_fiziki.js ile aynıdır: `region` KITA, `city` ÜLKE.
 * Başkent kayıtlarında `name` ÜLKE + BAŞKENT çiftini değil, sorunun cevabı
 * olacak tek adı taşır — soru kökü (`promptTitle`) ülkeyi sorar, cevap şıkkı
 * başkenttir.
 *
 * Derleyici: node tools/build_packs.js
 */
Object.assign(COGRAFYA_DATA_EXT, {

  // =========================================================================
  // 🏳️ ÜLKELER, BAŞKENTLER & KITALAR
  // =========================================================================
  dunya_ulkeleri: [
    // ---------------- KITALAR ----------------
    {
      id: "wu_kita_asya",
      name: "Asya",
      category: "dunya_ulkeleri",
      type: "Kıta / Yüzölçümü Rekoru",
      lat: 45.00, lng: 90.00,
      region: "Asya",
      city: "48 ülke",
      promptTitle: "Yüzölçümü ve nüfusu en büyük, dünya nüfusunun yaklaşık %60'ını barındıran kıta haritada hangisidir?",
      kpssNot: "Yüzölçümü (~44 milyon km²) ve nüfusu en büyük kıtadır. Dünyanın en yüksek (Everest) ve en alçak (Ölü Deniz) noktaları buradadır."
    },
    {
      id: "wu_kita_afrika",
      name: "Afrika",
      category: "dunya_ulkeleri",
      type: "Kıta / Yüzölçümü Rekoru",
      lat: 2.00, lng: 20.00,
      region: "Afrika",
      city: "54 ülke",
      kpssNot: "İkinci büyük kıtadır ve ekvator tarafından ortadan kesilir. En genç nüfus yapısına sahip kıtadır."
    },
    {
      id: "wu_kita_avrupa",
      name: "Avrupa",
      category: "dunya_ulkeleri",
      type: "Kıta / Nüfus Yoğunluğu",
      lat: 54.00, lng: 15.00,
      region: "Avrupa",
      city: "~45 ülke",
      kpssNot: "Yüzölçümü küçük, nüfus yoğunluğu ve kentleşme oranı yüksektir. Asya'dan Ural Dağları ile ayrılır; nüfusu yaşlanmaktadır."
    },
    {
      id: "wu_kita_kuzeyamerika",
      name: "Kuzey Amerika",
      category: "dunya_ulkeleri",
      type: "Kıta / Yüzölçümü Rekoru",
      lat: 48.00, lng: -100.00,
      region: "Kuzey Amerika",
      city: "23 ülke",
      kpssNot: "Üçüncü büyük kıtadır. Batısında Kayalıklar, doğusunda Apalaşlar, ortasında Büyük Ovalar (Prairie) uzanır."
    },
    {
      id: "wu_kita_guneyamerika",
      name: "Güney Amerika",
      category: "dunya_ulkeleri",
      type: "Kıta / Yüzölçümü Rekoru",
      lat: -15.00, lng: -60.00,
      region: "Güney Amerika",
      city: "12 ülke",
      kpssNot: "Amazon havzası ve And Dağları'nı barındırır. Dünyanın en kurak çölü (Atacama) ile en nemli ormanı aynı kıtadadır."
    },
    {
      id: "wu_kita_okyanusya",
      name: "Okyanusya",
      category: "dunya_ulkeleri",
      type: "Kıta / Yüzölçümü Rekoru",
      lat: -25.00, lng: 134.00,
      region: "Okyanusya",
      city: "14 ülke",
      kpssNot: "Yüzölçümü en küçük kıtadır. Avustralya ana karası ile Pasifik ada devletlerinden oluşur; iç kesimleri çöldür."
    },
    {
      id: "wu_kita_antarktika",
      name: "Antarktika",
      category: "dunya_ulkeleri",
      type: "Kıta / İklim Rekoru",
      lat: -82.00, lng: 20.00,
      region: "Antarktika",
      city: "Kalıcı nüfus yok",
      promptTitle: "Kalıcı yerleşik nüfusu bulunmayan, dünyanın en soğuk ve en kurak (kutup çölü) kıtası haritada hangisidir?",
      kpssNot: "Kalıcı nüfusu olmayan tek kıtadır. Dünyanın en soğuk (-89,2 °C rekoru) ve yağış bakımından en kurak kıtasıdır; tatlı suyun %70'i buradadır."
    },

    // ---------------- BAŞKENTLER ----------------
    {
      id: "wu_bas_ankara",
      name: "Ankara",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 39.9334, lng: 32.8597,
      region: "Asya - Avrupa",
      city: "Türkiye",
      promptTitle: "Türkiye'nin başkenti haritada hangisidir?",
      kpssNot: "Türkiye'nin başkentidir (1923). İç Anadolu'nun merkezinde, ülkenin ulaşım ağının kesiştiği konumdadır."
    },
    {
      id: "wu_bas_washington",
      name: "Washington D.C.",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 38.9072, lng: -77.0369,
      region: "Kuzey Amerika",
      city: "ABD",
      promptTitle: "ABD'nin başkenti haritada hangisidir?",
      kpssNot: "ABD'nin başkentidir. Hiçbir eyalete bağlı olmayan özel bir federal bölgedir (District of Columbia)."
    },
    {
      id: "wu_bas_pekin",
      name: "Pekin (Beijing)",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 39.9042, lng: 116.4074,
      region: "Asya",
      city: "Çin",
      promptTitle: "Çin'in başkenti haritada hangisidir?",
      kpssNot: "Çin'in başkentidir. Yasak Şehir ve Çin Seddi'nin Badaling bölümü bu kentin çevresindedir."
    },
    {
      id: "wu_bas_yenidelhi",
      name: "Yeni Delhi",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 28.6139, lng: 77.2090,
      region: "Asya",
      city: "Hindistan",
      promptTitle: "2023'ten bu yana dünyanın en kalabalık ülkesi olan Hindistan'ın başkenti haritada hangisidir?",
      kpssNot: "Hindistan'ın başkentidir. Hindistan 2023'te Çin'i geçerek dünyanın en kalabalık ülkesi olmuştur."
    },
    {
      id: "wu_bas_moskova",
      name: "Moskova",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 55.7558, lng: 37.6173,
      region: "Avrupa",
      city: "Rusya",
      promptTitle: "Yüzölçümü dünyanın en büyüğü olan ülkenin başkenti haritada hangisidir?",
      kpssNot: "Yüzölçümü en büyük ülke olan Rusya'nın (17,1 milyon km²) başkentidir. Avrupa'nın en kalabalık şehridir."
    },
    {
      id: "wu_bas_tokyo",
      name: "Tokyo",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 35.6762, lng: 139.6503,
      region: "Asya",
      city: "Japonya",
      kpssNot: "Japonya'nın başkenti ve dünyanın en kalabalık metropol alanıdır (~37 milyon). Deprem riski en yüksek megakentlerden biridir."
    },
    {
      id: "wu_bas_londra",
      name: "Londra",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 51.5074, lng: -0.1278,
      region: "Avrupa",
      city: "Birleşik Krallık",
      promptTitle: "Başlangıç (Greenwich) meridyeninin geçtiği, Birleşik Krallık'ın başkenti haritada hangisidir?",
      kpssNot: "Birleşik Krallık'ın başkentidir. Başlangıç meridyeni (0°) bu kentin Greenwich semtinden geçer."
    },
    {
      id: "wu_bas_paris",
      name: "Paris",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 48.8566, lng: 2.3522,
      region: "Avrupa",
      city: "Fransa",
      kpssNot: "Fransa'nın başkentidir; Sen (Seine) Nehri kıyısındadır. Dünyanın en çok turist çeken kentlerindendir."
    },
    {
      id: "wu_bas_berlin",
      name: "Berlin",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 52.5200, lng: 13.4050,
      region: "Avrupa",
      city: "Almanya",
      kpssNot: "Almanya'nın başkentidir. 1961-1989 arasında duvarla ikiye bölünmüş, Soğuk Savaş'ın simgesi olmuştur."
    },
    {
      id: "wu_bas_roma",
      name: "Roma",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 41.9028, lng: 12.4964,
      region: "Avrupa",
      city: "İtalya",
      kpssNot: "İtalya'nın başkentidir. İçinde bağımsız bir devlet (Vatikan) barındıran tek başkenttir."
    },
    {
      id: "wu_bas_madrid",
      name: "Madrid",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 40.4168, lng: -3.7038,
      region: "Avrupa",
      city: "İspanya",
      kpssNot: "İspanya'nın başkentidir. İber Yarımadası'nın iç platosunda (Meseta), Avrupa'nın en yüksek rakımlı başkentlerindendir."
    },
    {
      id: "wu_bas_brasilia",
      name: "Brasília",
      category: "dunya_ulkeleri",
      type: "Başkent / Planlı Kent",
      lat: -15.7939, lng: -47.8828,
      region: "Güney Amerika",
      city: "Brezilya",
      promptTitle: "Kıyıdaki nüfus yığılmasını iç bölgelere kaydırmak için 1960'ta sıfırdan planlanıp kurulan başkent haritada hangisidir?",
      kpssNot: "1960'ta sıfırdan planlanarak kurulmuş başkenttir. Amaç, nüfusu kıyıdan iç bölgelere çekmekti; UNESCO mirasıdır."
    },
    {
      id: "wu_bas_buenosaires",
      name: "Buenos Aires",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: -34.6037, lng: -58.3816,
      region: "Güney Amerika",
      city: "Arjantin",
      kpssNot: "Arjantin'in başkentidir; La Plata haliçi kıyısındadır. Pampa bozkırlarının tahıl ve et ihracat kapısıdır."
    },
    {
      id: "wu_bas_kahire",
      name: "Kahire",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 30.0444, lng: 31.2357,
      region: "Afrika",
      city: "Mısır",
      kpssNot: "Mısır'ın başkenti ve Arap dünyasının en kalabalık kentidir. Nil deltasının başladığı noktada, Giza piramitlerinin yanındadır."
    },
    {
      id: "wu_bas_pretoria",
      name: "Pretoria",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: -25.7479, lng: 28.2293,
      region: "Afrika",
      city: "Güney Afrika Cumhuriyeti",
      promptTitle: "Yürütme, yasama ve yargı başkentleri ayrı kentlerde olan ülkenin yürütme (yönetim) başkenti haritada hangisidir?",
      kpssNot: "Güney Afrika'nın yürütme başkentidir. Ülkenin üç başkenti vardır: Pretoria (yürütme), Cape Town (yasama), Bloemfontein (yargı)."
    },
    {
      id: "wu_bas_canberra",
      name: "Canberra",
      category: "dunya_ulkeleri",
      type: "Başkent / Planlı Kent",
      lat: -35.2809, lng: 149.1300,
      region: "Okyanusya",
      city: "Avustralya",
      promptTitle: "Sydney ile Melbourne arasındaki başkentlik çekişmesini bitirmek için iki kentin ortasında planlanarak kurulan başkent haritada hangisidir?",
      kpssNot: "Sydney-Melbourne rekabeti yüzünden iki kentin arasında planlanarak kurulmuş başkenttir."
    },
    {
      id: "wu_bas_ottawa",
      name: "Ottawa",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 45.4215, lng: -75.6972,
      region: "Kuzey Amerika",
      city: "Kanada",
      kpssNot: "Yüzölçümü bakımından dünyanın ikinci büyük ülkesi olan Kanada'nın başkentidir; en soğuk başkentlerden biridir."
    },
    {
      id: "wu_bas_cakarta",
      name: "Cakarta (Jakarta)",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: -6.2088, lng: 106.8456,
      region: "Asya",
      city: "Endonezya",
      kpssNot: "Dünyada en fazla adaya sahip ülke olan Endonezya'nın başkentidir. Hızlı çökme ve su basması nedeniyle başkent Nusantara'ya taşınmaktadır."
    },
    {
      id: "wu_bas_abuja",
      name: "Abuja",
      category: "dunya_ulkeleri",
      type: "Başkent / Planlı Kent",
      lat: 9.0765, lng: 7.3986,
      region: "Afrika",
      city: "Nijerya",
      kpssNot: "Afrika'nın en kalabalık ülkesi Nijerya'nın planlı başkentidir (1991'de Lagos'un yerini aldı)."
    },
    {
      id: "wu_bas_mexico",
      name: "Meksiko (Mexico City)",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 19.4326, lng: -99.1332,
      region: "Kuzey Amerika",
      city: "Meksika",
      kpssNot: "Kurutulmuş bir göl yatağı üzerinde, 2.240 m yükseltide kurulu megakenttir; zemin çökmesi ve deprem riski yüksektir."
    },
    {
      id: "wu_bas_riyad",
      name: "Riyad",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 24.7136, lng: 46.6753,
      region: "Asya",
      city: "Suudi Arabistan",
      kpssNot: "Arap Yarımadası'nın iç çölünde kurulu başkenttir; ülke ekonomisi dünya petrol ihracatının merkezindedir."
    },
    {
      id: "wu_bas_seul",
      name: "Seul",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 37.5665, lng: 126.9780,
      region: "Asya",
      city: "Güney Kore",
      kpssNot: "Güney Kore'nin başkentidir; ülke nüfusunun yaklaşık yarısı bu metropol alanda yaşar. Sınır hattına çok yakındır."
    },
    {
      id: "wu_bas_tahran",
      name: "Tahran",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: 35.6892, lng: 51.3890,
      region: "Asya",
      city: "İran",
      kpssNot: "Elburz Dağları'nın güney yamacında kurulu başkenttir; hava kirliliği ve deprem riski yüksektir."
    },
    {
      id: "wu_bas_vatikan",
      name: "Vatikan",
      category: "dunya_ulkeleri",
      type: "Ülke Rekoru / Yüzölçümü",
      lat: 41.9029, lng: 12.4534,
      region: "Avrupa",
      city: "Vatikan",
      promptTitle: "0,44 km² yüzölçümü ve yaklaşık 800 nüfusuyla dünyanın en küçük bağımsız devleti haritada neresidir?",
      kpssNot: "Dünyanın en küçük bağımsız devletidir (0,44 km²). Roma'nın içinde yer alır; Katolik dünyasının merkezidir."
    },
    {
      id: "wu_bas_astana",
      name: "Astana",
      category: "dunya_ulkeleri",
      type: "Ülke Rekoru / Konum",
      lat: 51.1694, lng: 71.4491,
      region: "Asya",
      city: "Kazakistan",
      promptTitle: "Denize kıyısı olmayan ülkeler arasında yüzölçümü en büyük olan devletin başkenti haritada hangisidir?",
      kpssNot: "Denize kıyısı olmayan en büyük ülke olan Kazakistan'ın başkentidir; dünyanın en soğuk başkentlerinden biridir."
    },
    {
      id: "wu_bas_singapur",
      name: "Singapur",
      category: "dunya_ulkeleri",
      type: "Ülke Rekoru / Nüfus Yoğunluğu",
      lat: 1.3521, lng: 103.8198,
      region: "Asya",
      city: "Singapur",
      promptTitle: "Malakka Boğazı'nın çıkışında kurulu, nüfus yoğunluğu dünyada en yüksek ülkeler arasında yer alan şehir-devlet haritada neresidir?",
      kpssNot: "Şehir-devlettir; Malakka Boğazı'nın kapısındaki konumu sayesinde dünyanın en büyük aktarma limanlarından birine sahiptir."
    },
    {
      id: "wu_bas_reykjavik",
      name: "Reykjavík",
      category: "dunya_ulkeleri",
      type: "Ülke Rekoru / Konum",
      lat: 64.1466, lng: -21.9426,
      region: "Avrupa",
      city: "İzlanda",
      promptTitle: "Dünyanın en kuzeyde yer alan başkenti haritada hangisidir?",
      kpssNot: "Dünyanın en kuzeydeki başkentidir. Enerjisinin neredeyse tamamını jeotermal ve hidroelektrikten karşılar."
    },
    {
      id: "wu_bas_wellington",
      name: "Wellington",
      category: "dunya_ulkeleri",
      type: "Ülke Rekoru / Konum",
      lat: -41.2866, lng: 174.7756,
      region: "Okyanusya",
      city: "Yeni Zelanda",
      kpssNot: "Dünyanın en güneydeki başkentidir. Levha sınırı üzerinde olduğu için deprem riski yüksek, rüzgârı çok güçlüdür."
    },
    {
      id: "wu_bas_lapaz",
      name: "La Paz",
      category: "dunya_ulkeleri",
      type: "Ülke Rekoru / Yükselti",
      lat: -16.4897, lng: -68.1193,
      region: "Güney Amerika",
      city: "Bolivya",
      promptTitle: "3.600 m'yi aşan yükseltisiyle dünyanın en yüksek rakımlı yönetim merkezi olan kent haritada hangisidir?",
      kpssNot: "Dünyanın en yüksek rakımlı yönetim merkezidir (~3.640 m). Bolivya'nın anayasal başkenti ise Sucre'dir."
    },
    {
      id: "wu_bas_nairobi",
      name: "Nairobi",
      category: "dunya_ulkeleri",
      type: "Başkent / Ülke",
      lat: -1.2864, lng: 36.8172,
      region: "Afrika",
      city: "Kenya",
      kpssNot: "Ekvatorun hemen güneyinde, 1.795 m yükseltide kurulu başkenttir; yükselti sayesinde iklimi ılımandır (yükselti-iklim ilişkisi)."
    }
  ],

  // =========================================================================
  // 🗿 DÜNYANIN HARİKALARI
  // =========================================================================
  dunya_harikalari: [
    // ---------------- ANTİK DÜNYANIN 7 HARİKASI ----------------
    {
      id: "wh_keops",
      name: "Keops Piramidi (Giza Piramitleri)",
      category: "dunya_harikalari",
      type: "Antik Dünyanın 7 Harikası / Ayakta Kalan",
      lat: 29.9792, lng: 31.1342,
      region: "Afrika",
      city: "Mısır",
      promptTitle: "Antik dünyanın yedi harikasından günümüze ayakta kalan tek eser haritada neresidir?",
      kpssNot: "Antik 7 harikadan günümüze ulaşan tek eserdir. Nil'in batı yakasında, Kahire'nin hemen yanındadır."
    },
    {
      id: "wh_babil",
      name: "Babil'in Asma Bahçeleri",
      category: "dunya_harikalari",
      type: "Antik Dünyanın 7 Harikası / Kayıp Eser",
      lat: 32.5355, lng: 44.4275,
      region: "Asya",
      city: "Irak",
      kpssNot: "Fırat kıyısındaki Babil kentinde olduğu söylenen, teraslı bahçelerden oluşan kayıp harikadır."
    },
    {
      id: "wh_artemis",
      name: "Artemis Tapınağı (Efes)",
      category: "dunya_harikalari",
      type: "Antik Dünyanın 7 Harikası / Kayıp Eser",
      lat: 37.9497, lng: 27.3639,
      region: "Asya",
      city: "Türkiye",
      kpssNot: "Efes antik kentinde (Selçuk/İzmir) yer alan, antik 7 harikadan biridir. Bugün yalnızca tek bir sütunu ayaktadır."
    },
    {
      id: "wh_zeus",
      name: "Zeus Heykeli (Olimpia)",
      category: "dunya_harikalari",
      type: "Antik Dünyanın 7 Harikası / Kayıp Eser",
      lat: 37.6380, lng: 21.6300,
      region: "Avrupa",
      city: "Yunanistan",
      kpssNot: "Antik Olimpiyat Oyunları'nın yapıldığı Olimpia'daki fildişi-altın kaplama dev heykeldir."
    },
    {
      id: "wh_mozole",
      name: "Halikarnas Mozolesi",
      category: "dunya_harikalari",
      type: "Antik Dünyanın 7 Harikası / Kayıp Eser",
      lat: 37.0379, lng: 27.4241,
      region: "Asya",
      city: "Türkiye",
      kpssNot: "Bugünkü Bodrum'daki Kral Mausolos'un anıt mezarıdır; 'mozole' sözcüğü buradan gelir. Antik 7 harikadan ikisi Türkiye'dedir."
    },
    {
      id: "wh_rodos",
      name: "Rodos Heykeli (Kolossos)",
      category: "dunya_harikalari",
      type: "Antik Dünyanın 7 Harikası / Kayıp Eser",
      lat: 36.4510, lng: 28.2278,
      region: "Avrupa",
      city: "Yunanistan",
      kpssNot: "Rodos Limanı girişindeki dev bronz Helios heykelidir; MÖ 226'daki depremde yıkılmıştır."
    },
    {
      id: "wh_iskenderiye",
      name: "İskenderiye Feneri",
      category: "dunya_harikalari",
      type: "Antik Dünyanın 7 Harikası / Kayıp Eser",
      lat: 31.2139, lng: 29.8856,
      region: "Afrika",
      city: "Mısır",
      kpssNot: "Pharos Adası'ndaki, tarihin ilk büyük deniz fenerlerinden biridir; depremlerle yıkılmıştır."
    },

    // ---------------- YENİ DÜNYANIN 7 HARİKASI (2007) ----------------
    {
      id: "wh_cinseddi",
      name: "Çin Seddi",
      category: "dunya_harikalari",
      type: "Yeni Dünyanın 7 Harikası / Savunma Yapısı",
      shapeType: "polyline",
      coordinates: [
        [40.60, 116.00],
        [40.43, 116.57],
        [40.20, 117.50],
        [39.96, 119.75]
      ],
      lat: 40.40, lng: 117.00,
      region: "Asya",
      city: "Çin",
      promptTitle: "Kuzeyden gelen akınlara karşı yüzyıllar boyunca yapılan, dünyanın en uzun savunma yapısı haritada hangisidir?",
      kpssNot: "Kollarıyla birlikte ~21.000 km'ye ulaşan, dünyanın en uzun savunma yapısıdır. Yeni 7 harikadan biridir."
    },
    {
      id: "wh_petra",
      name: "Petra",
      category: "dunya_harikalari",
      type: "Yeni Dünyanın 7 Harikası / Antik Kent",
      lat: 30.3285, lng: 35.4444,
      region: "Asya",
      city: "Ürdün",
      kpssNot: "Nabatîlerin kayalara oyduğu antik kervan kentidir; 'Gül Kenti' olarak bilinir."
    },
    {
      id: "wh_kolezyum",
      name: "Kolezyum",
      category: "dunya_harikalari",
      type: "Yeni Dünyanın 7 Harikası / Antik Yapı",
      lat: 41.8902, lng: 12.4922,
      region: "Avrupa",
      city: "İtalya",
      kpssNot: "Roma'daki, 50 binden fazla seyirci alan antik amfi tiyatrodur; Roma mühendisliğinin simgesidir."
    },
    {
      id: "wh_chichenitza",
      name: "Chichén Itzá",
      category: "dunya_harikalari",
      type: "Yeni Dünyanın 7 Harikası / Antik Kent",
      lat: 20.6829, lng: -88.5686,
      region: "Kuzey Amerika",
      city: "Meksika",
      kpssNot: "Maya uygarlığının Yucatán'daki merkezidir. Kukulkan Piramidi ekinokslarda yılan gölgesi oluşturacak biçimde yapılmıştır."
    },
    {
      id: "wh_machupicchu",
      name: "Machu Picchu",
      category: "dunya_harikalari",
      type: "Yeni Dünyanın 7 Harikası / Antik Kent",
      lat: -13.1631, lng: -72.5450,
      region: "Güney Amerika",
      city: "Peru",
      promptTitle: "And Dağları'nda 2.430 m yükseltide kurulmuş, teraslı tarımıyla ünlü İnka kenti haritada hangisidir?",
      kpssNot: "And Dağları'nda 2.430 m yükseltideki İnka kentidir; teraslı (basamaklı) tarımın en bilinen örneğidir."
    },
    {
      id: "wh_tacmahal",
      name: "Tac Mahal",
      category: "dunya_harikalari",
      type: "Yeni Dünyanın 7 Harikası / Anıt Mezar",
      lat: 27.1751, lng: 78.0421,
      region: "Asya",
      city: "Hindistan",
      kpssNot: "Agra'da, Babür hükümdarı Şah Cihan'ın eşi için yaptırdığı beyaz mermer anıt mezardır."
    },
    {
      id: "wh_kurtariciisa",
      name: "Kurtarıcı İsa Heykeli",
      category: "dunya_harikalari",
      type: "Yeni Dünyanın 7 Harikası / Anıt",
      lat: -22.9519, lng: -43.2105,
      region: "Güney Amerika",
      city: "Brezilya",
      kpssNot: "Rio de Janeiro'da Corcovado Tepesi'ndeki 30 m yüksekliğindeki heykeldir; kentin ve ülkenin simgesidir."
    },

    // ---------------- DOĞAL HARİKALAR ----------------
    {
      id: "wh_buyukkanyon",
      name: "Büyük Kanyon (Grand Canyon)",
      category: "dunya_harikalari",
      type: "Doğal Harika / Akarsu Şekli",
      lat: 36.1069, lng: -112.1129,
      region: "Kuzey Amerika",
      city: "ABD",
      promptTitle: "Colorado Nehri'nin plato içine gömülerek açtığı, akarsu aşındırmasının dünyadaki en görkemli örneği olan vadi haritada neresidir?",
      kpssNot: "Colorado Nehri'nin Kolorado Platosu'na gömülmesiyle oluşmuştur; akarsu aşındırmasının (gömük vadi) en görkemli örneğidir."
    },
    {
      id: "wh_buyuksetresifi",
      name: "Büyük Set Resifi",
      category: "dunya_harikalari",
      type: "Doğal Harika / Mercan Resifi",
      lat: -18.2871, lng: 147.6992,
      region: "Okyanusya",
      city: "Avustralya",
      kpssNot: "Dünyanın en büyük mercan resifi sistemidir (~2.300 km). Uzaydan görülebilen tek canlı yapıdır; ısınmayla ağarma tehdidi altındadır."
    },
    {
      id: "wh_amazonormani",
      name: "Amazon Yağmur Ormanı",
      category: "dunya_harikalari",
      type: "Doğal Harika / Ekvatoral Orman",
      lat: -3.4653, lng: -62.2159,
      region: "Güney Amerika",
      city: "Brezilya - Peru - Kolombiya",
      kpssNot: "Dünyanın en büyük yağmur ormanıdır; 'dünyanın akciğerleri' denir. Ekvatoral iklimin bitki örtüsü (selva) örneğidir."
    },
    {
      id: "wh_halong",
      name: "Ha Long Koyu",
      category: "dunya_harikalari",
      type: "Doğal Harika / Karstik Şekil",
      lat: 20.9101, lng: 107.1839,
      region: "Asya",
      city: "Vietnam",
      kpssNot: "Denizden yükselen 1.600'den fazla kireçtaşı adacığından oluşan karstik koydur; sular altında kalmış karst topoğrafyasıdır."
    },
    {
      id: "wh_tablemountain",
      name: "Masa Dağı (Table Mountain)",
      category: "dunya_harikalari",
      type: "Doğal Harika / Aşınım Şekli",
      lat: -33.9628, lng: 18.4098,
      region: "Afrika",
      city: "Güney Afrika Cumhuriyeti",
      kpssNot: "Cape Town'un üzerindeki düz tepeli aşınım yüzeyidir; bulut örtüsü nedeniyle 'masa örtüsü' benzetmesiyle bilinir."
    },
    {
      id: "wh_komodo",
      name: "Komodo Adası",
      category: "dunya_harikalari",
      type: "Doğal Harika / Ada Ekosistemi",
      lat: -8.5586, lng: 119.4894,
      region: "Asya",
      city: "Endonezya",
      kpssNot: "Dünyanın en büyük kertenkelesi Komodo ejderinin tek doğal yaşam alanıdır; ada endemizminin (türleşme) örneğidir."
    },
    {
      id: "wh_puertoprincesa",
      name: "Puerto Princesa Yeraltı Nehri",
      category: "dunya_harikalari",
      type: "Doğal Harika / Karstik Şekil",
      lat: 10.1932, lng: 118.9260,
      region: "Asya",
      city: "Filipinler",
      kpssNot: "Denize dökülen yeraltı nehrinin oyduğu kireçtaşı mağara sistemidir; karstik çözünmenin (yeraltı drenajı) örneğidir."
    },
    {
      id: "wh_jeju",
      name: "Jeju Adası",
      category: "dunya_harikalari",
      type: "Doğal Harika / Volkanik Ada",
      lat: 33.4890, lng: 126.4983,
      region: "Asya",
      city: "Güney Kore",
      kpssNot: "Volkanik kökenli, lav tüpleri ve krater gölleriyle ünlü adadır; Güney Kore'nin en yüksek noktası (Hallasan) buradadır."
    },
    {
      id: "wh_kapadokya",
      name: "Kapadokya Peri Bacaları",
      category: "dunya_harikalari",
      type: "Doğal Harika / Volkanik Aşınım Şekli",
      lat: 38.6431, lng: 34.8286,
      region: "Asya",
      city: "Türkiye",
      kpssNot: "Volkanik tüflerin rüzgâr ve sel sularıyla aşınmasından oluşan peri bacaları alanıdır; UNESCO Dünya Mirası'dır."
    },
    {
      id: "wh_paricutin",
      name: "Paricutín Volkanı",
      category: "dunya_harikalari",
      type: "Doğal Harika / Volkan",
      lat: 19.4931, lng: -102.2508,
      region: "Kuzey Amerika",
      city: "Meksika",
      kpssNot: "1943'te bir mısır tarlasında gözle görülerek doğan volkandır; oluşumu baştan sona izlenebilen tek volkan olarak bilinir."
    }
  ],

  // =========================================================================
  // 🏗️ ÖNEMLİ YAPILAR & MÜHENDİSLİK ESERLERİ
  // =========================================================================
  dunya_yapilari: [
    // ---------------- GÖKDELENLER ----------------
    {
      id: "wy_burjkhalifa",
      name: "Burç Halife (Burj Khalifa)",
      category: "dunya_yapilari",
      type: "Gökdelen / Yükseklik Rekoru",
      lat: 25.1972, lng: 55.2744,
      region: "Asya",
      city: "Birleşik Arap Emirlikleri",
      promptTitle: "828 m yüksekliğiyle dünyanın en yüksek binası olan gökdelen haritada neresidir?",
      kpssNot: "828 m ile dünyanın en yüksek binasıdır (Dubai, 2010). Petrol sonrası ekonomiye geçişin ve kent markalaşmasının simgesidir."
    },
    {
      id: "wy_merdeka",
      name: "Merdeka 118",
      category: "dunya_yapilari",
      type: "Gökdelen / Yükseklik Rekoru",
      lat: 3.1418, lng: 101.7005,
      region: "Asya",
      city: "Malezya",
      kpssNot: "679 m ile dünyanın ikinci en yüksek binasıdır (Kuala Lumpur, 2023)."
    },
    {
      id: "wy_shanghaitower",
      name: "Shanghai Tower",
      category: "dunya_yapilari",
      type: "Gökdelen / Yükseklik Rekoru",
      lat: 31.2336, lng: 121.5057,
      region: "Asya",
      city: "Çin",
      kpssNot: "632 m ile Çin'in en yüksek binasıdır; burgu biçimli gövdesi rüzgâr yükünü azaltacak şekilde tasarlanmıştır."
    },
    {
      id: "wy_petronas",
      name: "Petronas İkiz Kuleleri",
      category: "dunya_yapilari",
      type: "Gökdelen / Simge Yapı",
      lat: 3.1578, lng: 101.7117,
      region: "Asya",
      city: "Malezya",
      kpssNot: "1998-2004 arasında dünyanın en yüksek binasıydı (452 m); ikiz kuleler gökdelen mimarisinin simgesidir."
    },
    {
      id: "wy_empirestate",
      name: "Empire State Binası",
      category: "dunya_yapilari",
      type: "Gökdelen / Simge Yapı",
      lat: 40.7484, lng: -73.9857,
      region: "Kuzey Amerika",
      city: "ABD",
      kpssNot: "1931'de tamamlandı ve 40 yıl boyunca dünyanın en yüksek binası kaldı; New York'un simgesidir."
    },
    {
      id: "wy_cntower",
      name: "CN Kulesi",
      category: "dunya_yapilari",
      type: "Gökdelen / Kule",
      lat: 43.6426, lng: -79.3871,
      region: "Kuzey Amerika",
      city: "Kanada",
      kpssNot: "553 m yüksekliğinde beton iletişim ve gözlem kulesidir; Toronto'nun simgesidir."
    },

    // ---------------- KÖPRÜLER & TÜNELLER ----------------
    {
      id: "wy_goldengate",
      name: "Golden Gate Köprüsü",
      category: "dunya_yapilari",
      type: "Köprü / Asma Köprü",
      lat: 37.8199, lng: -122.4783,
      region: "Kuzey Amerika",
      city: "ABD",
      kpssNot: "San Francisco Körfezi'nin girişini geçen asma köprüdür (1937); yoğun sis ve deprem kuşağı koşullarında inşa edilmiştir."
    },
    {
      id: "wy_canakkale1915",
      name: "1915 Çanakkale Köprüsü",
      category: "dunya_yapilari",
      type: "Köprü / Asma Köprü",
      lat: 40.3915, lng: 26.6406,
      region: "Asya - Avrupa",
      city: "Türkiye",
      promptTitle: "2.023 m orta açıklığıyla dünyanın en uzun orta açıklıklı asma köprüsü haritada neresidir?",
      kpssNot: "2022'de açıldı. 2.023 m orta açıklığıyla dünyanın en uzun orta açıklıklı asma köprüsüdür; Çanakkale Boğazı'nı geçer."
    },
    {
      id: "wy_akashi",
      name: "Akashi Kaikyō Köprüsü",
      category: "dunya_yapilari",
      type: "Köprü / Asma Köprü",
      lat: 34.6163, lng: 135.0212,
      region: "Asya",
      city: "Japonya",
      kpssNot: "1998-2022 arasında dünyanın en uzun orta açıklıklı asma köprüsüydü (1.991 m); deprem ve tayfun yüklerine göre tasarlandı."
    },
    {
      id: "wy_danyang",
      name: "Danyang - Kunshan Büyük Viyadüğü",
      category: "dunya_yapilari",
      type: "Köprü / Viyadük",
      lat: 31.9500, lng: 119.7000,
      region: "Asya",
      city: "Çin",
      kpssNot: "164 km uzunluğuyla dünyanın en uzun köprüsüdür; Pekin-Şanghay yüksek hızlı tren hattının bir bölümüdür."
    },
    {
      id: "wy_manstuneli",
      name: "Manş Tüneli (Channel Tunnel)",
      category: "dunya_yapilari",
      type: "Köprü / Deniz Altı Tüneli",
      shapeType: "polyline",
      coordinates: [
        [51.09, 1.31],
        [50.99, 1.50],
        [50.93, 1.71]
      ],
      lat: 51.00, lng: 1.50,
      region: "Avrupa",
      city: "Birleşik Krallık - Fransa",
      kpssNot: "1994'te açıldı. Manş Denizi'nin altından geçen 50 km'lik demiryolu tünelidir; deniz altı bölümü dünyada en uzundur."
    },
    {
      id: "wy_gotthard",
      name: "Gotthard Baz Tüneli",
      category: "dunya_yapilari",
      type: "Köprü / Demiryolu Tüneli",
      lat: 46.6000, lng: 8.8000,
      region: "Avrupa",
      city: "İsviçre",
      kpssNot: "57 km ile dünyanın en uzun demiryolu tünelidir (2016). Alpler'i geçen yük trafiğini karayolundan demiryoluna kaydırmak için yapıldı."
    },
    {
      id: "wy_marmaray",
      name: "Marmaray Tüp Geçidi",
      category: "dunya_yapilari",
      type: "Köprü / Deniz Altı Tüneli",
      lat: 41.0080, lng: 28.9950,
      region: "Asya - Avrupa",
      city: "Türkiye",
      kpssNot: "İstanbul Boğazı'nın altından geçen demiryolu tüp geçididir (2013); dünyanın en derin batırma tüp tünellerindendir."
    },

    // ---------------- BARAJLAR & ENERJİ YAPILARI ----------------
    {
      id: "wy_ucbogaz",
      name: "Üç Boğaz Barajı (Three Gorges)",
      category: "dunya_yapilari",
      type: "Baraj / Hidroelektrik Santral",
      lat: 30.8232, lng: 111.0033,
      region: "Asya",
      city: "Çin",
      promptTitle: "Kurulu gücü dünyada en yüksek olan hidroelektrik santralin bulunduğu baraj haritada neresidir?",
      kpssNot: "Kurulu gücü (22.500 MW) dünyada en yüksek hidroelektrik santraldir. Yangtze üzerindedir; taşkın kontrolü de sağlar."
    },
    {
      id: "wy_itaipu",
      name: "Itaipu Barajı",
      category: "dunya_yapilari",
      type: "Baraj / Hidroelektrik Santral",
      lat: -25.4083, lng: -54.5889,
      region: "Güney Amerika",
      city: "Brezilya - Paraguay",
      kpssNot: "Parana Nehri üzerinde iki ülkenin ortak işlettiği santraldir; Paraguay elektriğinin neredeyse tamamını buradan karşılar."
    },
    {
      id: "wy_hoover",
      name: "Hoover Barajı",
      category: "dunya_yapilari",
      type: "Baraj / Hidroelektrik Santral",
      lat: 36.0161, lng: -114.7377,
      region: "Kuzey Amerika",
      city: "ABD",
      kpssNot: "Colorado Nehri üzerindeki kemer barajdır (1936); Mead Gölü'nü oluşturur ve Las Vegas'ın gelişimini mümkün kılmıştır."
    },
    {
      id: "wy_ataturk",
      name: "Atatürk Barajı",
      category: "dunya_yapilari",
      type: "Baraj / Hidroelektrik Santral",
      lat: 37.4869, lng: 38.3186,
      region: "Asya",
      city: "Türkiye",
      kpssNot: "Fırat üzerindeki, Türkiye'nin en büyük barajıdır; GAP'ın omurgasıdır ve dünyanın en büyük toprak dolgu barajlarındandır."
    },
    {
      id: "wy_assuan",
      name: "Assuan Yüksek Barajı",
      category: "dunya_yapilari",
      type: "Baraj / Hidroelektrik Santral",
      lat: 23.9707, lng: 32.8770,
      region: "Afrika",
      city: "Mısır",
      promptTitle: "Nil'in taşkınlarını denetim altına alan, ardında Nasır Gölü'nü oluşturan baraj haritada neresidir?",
      kpssNot: "Nil taşkınlarını denetleyen barajdır; ardında Nasır Gölü oluştu. Deltaya alüvyon taşınımını kestiği için kıyı erozyonuna yol açtı."
    },

    // ---------------- ANITLAR & SİMGE YAPILAR ----------------
    {
      id: "wy_eyfel",
      name: "Eyfel Kulesi",
      category: "dunya_yapilari",
      type: "Anıt / Simge Yapı",
      lat: 48.8584, lng: 2.2945,
      region: "Avrupa",
      city: "Fransa",
      kpssNot: "1889 Dünya Sergisi için yapılan 330 m'lik demir kuledir; 40 yıl dünyanın en yüksek yapısı olarak kaldı."
    },
    {
      id: "wy_bigben",
      name: "Big Ben & Westminster Sarayı",
      category: "dunya_yapilari",
      type: "Anıt / Simge Yapı",
      lat: 51.5007, lng: -0.1246,
      region: "Avrupa",
      city: "Birleşik Krallık",
      kpssNot: "Britanya Parlamentosu'nun bulunduğu Westminster Sarayı ve saat kulesidir; UNESCO Dünya Mirası'dır."
    },
    {
      id: "wy_sydneyopera",
      name: "Sydney Opera Binası",
      category: "dunya_yapilari",
      type: "Anıt / Simge Yapı",
      lat: -33.8568, lng: 151.2153,
      region: "Okyanusya",
      city: "Avustralya",
      kpssNot: "Yelken kabuklu çatısıyla 20. yüzyıl mimarlığının simgesidir; Sydney Limanı'nda, UNESCO mirasıdır."
    },
    {
      id: "wy_ozgurluk",
      name: "Özgürlük Anıtı",
      category: "dunya_yapilari",
      type: "Anıt / Simge Yapı",
      lat: 40.6892, lng: -74.0445,
      region: "Kuzey Amerika",
      city: "ABD",
      kpssNot: "New York Limanı girişindeki, Fransa'nın armağanı bakır heykeldir; göçmenlerin Amerika'ya girişinin simgesidir."
    },
    {
      id: "wy_ayasofya",
      name: "Ayasofya",
      category: "dunya_yapilari",
      type: "Anıt / Simge Yapı",
      lat: 41.0086, lng: 28.9802,
      region: "Asya - Avrupa",
      city: "Türkiye",
      kpssNot: "537'de bazilika olarak yapıldı; kubbe mühendisliğinin dönüm noktasıdır. İstanbul Tarihi Alanları UNESCO mirasının parçasıdır."
    },
    {
      id: "wy_kremlin",
      name: "Kremlin & Kızıl Meydan",
      category: "dunya_yapilari",
      type: "Anıt / Simge Yapı",
      lat: 55.7539, lng: 37.6208,
      region: "Avrupa",
      city: "Rusya",
      kpssNot: "Moskova'nın kalesi ve yönetim merkezidir; Kızıl Meydan ile birlikte UNESCO Dünya Mirası'dır."
    },
    {
      id: "wy_brandenburg",
      name: "Brandenburg Kapısı",
      category: "dunya_yapilari",
      type: "Anıt / Simge Yapı",
      lat: 52.5163, lng: 13.3777,
      region: "Avrupa",
      city: "Almanya",
      kpssNot: "Berlin'in simge kapısıdır; Berlin Duvarı döneminde bölünmenin, 1989 sonrası birleşmenin simgesi olmuştur."
    },
    {
      id: "wy_stonehenge",
      name: "Stonehenge",
      category: "dunya_yapilari",
      type: "Anıt / Tarih Öncesi Yapı",
      lat: 51.1789, lng: -1.8262,
      region: "Avrupa",
      city: "Birleşik Krallık",
      kpssNot: "Tarih öncesi dönemde dikilmiş dev taş halkadır; gün dönümlerinde güneşin doğuşuna göre hizalanmıştır."
    },
    {
      id: "wy_kabe",
      name: "Kâbe & Mescid-i Haram",
      category: "dunya_yapilari",
      type: "Anıt / İnanç Merkezi",
      lat: 21.4225, lng: 39.8262,
      region: "Asya",
      city: "Suudi Arabistan",
      kpssNot: "Mekke'de, İslam dünyasının kıblesidir. Hac ve umre ile dünyanın en yoğun inanç turizmi hareketini yaratır."
    },
    {
      id: "wy_pisa",
      name: "Pisa Kulesi",
      category: "dunya_yapilari",
      type: "Anıt / Simge Yapı",
      lat: 43.7230, lng: 10.3966,
      region: "Avrupa",
      city: "İtalya",
      kpssNot: "Zeminin farklı oturması nedeniyle eğilen çan kulesidir; zemin mekaniğinin ders kitabı örneğidir."
    },
    {
      id: "wy_palmjumeirah",
      name: "Palm Jumeirah",
      category: "dunya_yapilari",
      type: "Anıt / Yapay Ada Projesi",
      lat: 25.1124, lng: 55.1390,
      region: "Asya",
      city: "Birleşik Arap Emirlikleri",
      kpssNot: "Denizin doldurulmasıyla oluşturulmuş palmiye biçimli yapay adadır; kıyı doldurma (reklamasyon) mühendisliğinin en bilinen örneğidir."
    }
  ]
});
