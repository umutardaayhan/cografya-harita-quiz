/**
 * 🌍 DÜNYA FİZİKİ COĞRAFYASI — Yazım Kaynağı
 *
 * Kapsam: dünya dağ sistemleri & volkanlar, nehirler & göller & şelaleler,
 * okyanuslar & akıntılar & derin çukurlar, denizler & körfezler,
 * boğazlar & kanallar.
 *
 * Yazım kuralları:
 *  - `region` alanı KITA (Avrupa, Asya, Afrika, Kuzey Amerika, Güney Amerika,
 *    Okyanusya, Antarktika) tutar; Türkiye kayıtlarında bölge ne işe yarıyorsa
 *    dünya kayıtlarında kıta o işi yapar (çeldirici/rozet metni).
 *  - `city` alanı ÜLKE(ler)dir.
 *  - Çizgisel kayıtlarda (`polyline`) `lat/lng` hattın kabaca ortasıdır;
 *    mesafe hesapları ve harita uçuşu bu noktayı kullanır.
 *  - `type` metni alt tür filtrelerini besler (bkz. 91_dunya_meta.js); ilk
 *    kelime alt türü belirlediği için "A / B" kalıbı bozulmamalıdır.
 *
 * Derleyici: node tools/build_packs.js
 */
Object.assign(COGRAFYA_DATA_EXT, {

  // =========================================================================
  // 🗻 DÜNYA DAĞLARI & VOLKANLARI
  // =========================================================================
  dunya_daglari: [
    // ---------------- ZİRVELER ----------------
    {
      id: "wd_everest",
      name: "Everest Dağı",
      category: "dunya_daglari",
      type: "Zirve / Yükselti Rekoru",
      lat: 27.9881, lng: 86.9250,
      region: "Asya",
      city: "Nepal - Çin (Tibet)",
      promptTitle: "Deniz seviyesinden ölçüldüğünde 8.849 m ile dünyanın en yüksek noktası olan zirve haritada neresidir?",
      kpssNot: "Dünyanın en yüksek noktasıdır (8.849 m). Himalayalar'da Nepal-Çin sınırındadır; Nepalce adı Sagarmatha, Tibetçe Chomolungma'dır."
    },
    {
      id: "wd_k2",
      name: "K2 (Godwin Austen)",
      category: "dunya_daglari",
      type: "Zirve / Yükselti Rekoru",
      lat: 35.8808, lng: 76.5133,
      region: "Asya",
      city: "Pakistan - Çin",
      kpssNot: "8.611 m ile dünyanın ikinci en yüksek zirvesidir. Karakurum Sıradağları'nda yer alır; tırmanışı Everest'ten zor kabul edilir."
    },
    {
      id: "wd_kilimanjaro",
      name: "Kilimanjaro Dağı",
      category: "dunya_daglari",
      type: "Zirve / Volkan",
      lat: -3.0674, lng: 37.3556,
      region: "Afrika",
      city: "Tanzanya",
      promptTitle: "Ekvator kuşağında yer almasına rağmen zirvesi buzullarla kaplı olan, Afrika'nın en yüksek noktası haritada neresidir?",
      kpssNot: "Afrika'nın en yüksek noktasıdır (5.895 m). Sönmüş bir volkan konisidir; ekvatoral kuşakta olmasına karşın zirvesinde buzul bulunur."
    },
    {
      id: "wd_aconcagua",
      name: "Aconcagua",
      category: "dunya_daglari",
      type: "Zirve / Yükselti Rekoru",
      lat: -32.6532, lng: -70.0109,
      region: "Güney Amerika",
      city: "Arjantin",
      kpssNot: "6.961 m ile Amerika kıtalarının ve Güney Yarım Küre'nin en yüksek zirvesidir. And Dağları üzerindedir."
    },
    {
      id: "wd_denali",
      name: "Denali (McKinley)",
      category: "dunya_daglari",
      type: "Zirve / Yükselti Rekoru",
      lat: 63.0692, lng: -151.0070,
      region: "Kuzey Amerika",
      city: "ABD (Alaska)",
      kpssNot: "6.190 m ile Kuzey Amerika'nın en yüksek zirvesidir. Taban-zirve arası yükselti farkı en büyük karasal dağlardan biridir."
    },
    {
      id: "wd_elbruz",
      name: "Elbruz Dağı",
      category: "dunya_daglari",
      type: "Zirve / Volkan",
      lat: 43.3550, lng: 42.4392,
      region: "Avrupa",
      city: "Rusya",
      kpssNot: "5.642 m ile Avrupa'nın en yüksek noktası sayılır. Kafkasya'da yer alan sönmüş bir volkandır."
    },
    {
      id: "wd_montblanc",
      name: "Mont Blanc",
      category: "dunya_daglari",
      type: "Zirve / Yükselti Rekoru",
      lat: 45.8326, lng: 6.8652,
      region: "Avrupa",
      city: "Fransa - İtalya",
      kpssNot: "4.808 m ile Alpler'in en yüksek zirvesidir. Avrupa Birliği sınırları içindeki en yüksek noktadır."
    },
    {
      id: "wd_vinson",
      name: "Vinson Masifi",
      category: "dunya_daglari",
      type: "Zirve / Yükselti Rekoru",
      lat: -78.5254, lng: -85.6171,
      region: "Antarktika",
      city: "Antarktika",
      kpssNot: "4.892 m ile Antarktika'nın en yüksek noktasıdır. 'Yedi Zirve' listesinin en zor ulaşılan üyesidir."
    },
    {
      id: "wd_puncakjaya",
      name: "Puncak Jaya (Carstensz)",
      category: "dunya_daglari",
      type: "Zirve / Yükselti Rekoru",
      lat: -4.0784, lng: 137.1582,
      region: "Okyanusya",
      city: "Endonezya (Papua)",
      kpssNot: "4.884 m ile Okyanusya'nın ve ada üzerindeki en yüksek zirvesidir; tropikal kuşakta buzul taşır."
    },
    {
      id: "wd_maunakea",
      name: "Mauna Kea",
      category: "dunya_daglari",
      type: "Volkan / Zirve",
      lat: 19.8207, lng: -155.4681,
      region: "Okyanusya",
      city: "ABD (Hawaii)",
      promptTitle: "Okyanus tabanındaki asıl tabanından ölçüldüğünde 10.200 m'yi aşarak dünyanın en yüksek dağı sayılan kalkan volkan haritada neresidir?",
      kpssNot: "Deniz seviyesinden 4.207 m, okyanus tabanındaki asıl tabanından ise 10.200 m'yi aşar; bu ölçümle dünyanın en yüksek dağıdır."
    },

    // ---------------- SIRADAĞLAR ----------------
    {
      id: "wd_himalayalar",
      name: "Himalayalar",
      category: "dunya_daglari",
      type: "Sıradağ / Kıvrım Dağ Sistemi",
      shapeType: "polyline",
      coordinates: [
        [35.50, 74.50],
        [34.00, 78.00],
        [31.00, 82.00],
        [28.50, 87.00],
        [27.50, 91.00],
        [28.20, 95.30]
      ],
      lat: 29.50, lng: 84.00,
      region: "Asya",
      city: "Nepal - Çin - Hindistan - Bhutan - Pakistan",
      promptTitle: "Hint levhasının Avrasya levhasına çarpmasıyla yükselen, 8.000 m'yi aşan zirvelerin tamamını barındıran kıvrım dağ sistemi haritada hangisidir?",
      kpssNot: "Alp-Himalaya kıvrım kuşağının en genç ve en yüksek bölümüdür. 8.000 m üzerindeki 14 zirvenin tamamı bu sistemdedir."
    },
    {
      id: "wd_andlar",
      name: "And Dağları (Andlar)",
      category: "dunya_daglari",
      type: "Sıradağ / Kıvrım Dağ Sistemi",
      shapeType: "polyline",
      coordinates: [
        [10.50, -73.50],
        [0.00, -78.00],
        [-16.00, -68.50],
        [-33.00, -70.20],
        [-45.00, -72.50],
        [-53.00, -71.50]
      ],
      lat: -20.00, lng: -70.00,
      region: "Güney Amerika",
      city: "Venezuela - Kolombiya - Ekvador - Peru - Bolivya - Şili - Arjantin",
      promptTitle: "Yaklaşık 7.000 km uzunluğuyla dünyanın en uzun kara sıradağ sistemi olan, Pasifik Ateş Çemberi üzerindeki kıvrım dağı haritada hangisidir?",
      kpssNot: "Dünyanın en uzun sıradağ sistemidir (~7.000 km). Nazca levhasının dalmasıyla oluşmuştur; yoğun volkanik etkinlik görülür."
    },
    {
      id: "wd_kayaliklar",
      name: "Kayalık Dağlar (Rocky Mountains)",
      category: "dunya_daglari",
      type: "Sıradağ / Kıvrım Dağ Sistemi",
      shapeType: "polyline",
      coordinates: [
        [54.00, -121.00],
        [49.00, -115.00],
        [44.00, -110.00],
        [39.00, -106.00],
        [35.00, -106.00]
      ],
      lat: 44.00, lng: -110.00,
      region: "Kuzey Amerika",
      city: "Kanada - ABD",
      kpssNot: "Kuzey Amerika'nın batısını boydan boya kesen kıvrım dağ sistemidir. Kıtanın su bölümü çizgisini (Continental Divide) taşır."
    },
    {
      id: "wd_alpler",
      name: "Alpler",
      category: "dunya_daglari",
      type: "Sıradağ / Kıvrım Dağ Sistemi",
      shapeType: "polyline",
      coordinates: [
        [44.10, 7.20],
        [45.90, 6.90],
        [46.50, 10.00],
        [47.10, 12.50],
        [47.40, 15.00]
      ],
      lat: 46.30, lng: 10.20,
      region: "Avrupa",
      city: "Fransa - İsviçre - İtalya - Avusturya - Almanya - Slovenya",
      kpssNot: "Avrupa'nın en önemli kıvrım dağ sistemidir; Alp-Himalaya kuşağına adını vermiştir. Buzul şekilleri (sirk, tekne vadi) tipiktir."
    },
    {
      id: "wd_ural",
      name: "Ural Dağları",
      category: "dunya_daglari",
      type: "Sıradağ / Aşınmış Kıvrım Dağ",
      shapeType: "polyline",
      coordinates: [
        [68.00, 66.00],
        [61.00, 59.50],
        [55.00, 59.00],
        [51.00, 58.00]
      ],
      lat: 58.00, lng: 60.00,
      region: "Avrupa - Asya",
      city: "Rusya - Kazakistan",
      promptTitle: "Avrupa ile Asya kıtaları arasında doğal sınır kabul edilen, çok eski ve aşınmış kıvrım dağ sistemi haritada hangisidir?",
      kpssNot: "Avrupa ile Asya arasındaki doğal sınırdır. Paleozoik yaşlı, aşınmış bir kıvrım dağıdır; maden çeşitliliği çok yüksektir."
    },
    {
      id: "wd_atlas",
      name: "Atlas Dağları",
      category: "dunya_daglari",
      type: "Sıradağ / Kıvrım Dağ Sistemi",
      shapeType: "polyline",
      coordinates: [
        [33.80, -8.00],
        [31.60, -7.50],
        [33.00, -3.00],
        [35.00, 1.50],
        [36.50, 6.00]
      ],
      lat: 32.50, lng: -5.00,
      region: "Afrika",
      city: "Fas - Cezayir - Tunus",
      kpssNot: "Kuzeybatı Afrika'da Akdeniz iklimi ile Sahra'yı ayıran kıvrım dağ sistemidir. Alp orojenezinde oluşmuştur."
    },
    {
      id: "wd_kafkaslar",
      name: "Kafkas Dağları",
      category: "dunya_daglari",
      type: "Sıradağ / Kıvrım Dağ Sistemi",
      shapeType: "polyline",
      coordinates: [
        [44.50, 39.00],
        [43.30, 42.50],
        [42.60, 44.50],
        [41.30, 47.50]
      ],
      lat: 43.00, lng: 43.50,
      region: "Avrupa - Asya",
      city: "Rusya - Gürcistan - Azerbaycan",
      kpssNot: "Karadeniz ile Hazar arasında uzanan kıvrım dağ sistemidir; Avrupa-Asya sınırı tartışmasının merkezindedir."
    },
    {
      id: "wd_apalaslar",
      name: "Apalaş Dağları (Appalachians)",
      category: "dunya_daglari",
      type: "Sıradağ / Aşınmış Kıvrım Dağ",
      shapeType: "polyline",
      coordinates: [
        [46.00, -70.00],
        [42.00, -74.00],
        [38.00, -79.00],
        [35.00, -83.50],
        [33.50, -85.50]
      ],
      lat: 39.00, lng: -78.00,
      region: "Kuzey Amerika",
      city: "ABD - Kanada",
      kpssNot: "Kuzey Amerika'nın doğusundaki eski ve aşınmış kıvrım dağıdır. Taş kömürü havzaları ABD sanayisinin doğduğu alanlardır."
    },
    {
      id: "wd_tienshan",
      name: "Tien Şan Dağları",
      category: "dunya_daglari",
      type: "Sıradağ / Kıvrım Dağ Sistemi",
      shapeType: "polyline",
      coordinates: [
        [42.50, 74.00],
        [42.00, 78.00],
        [42.50, 83.00],
        [43.50, 87.00]
      ],
      lat: 42.50, lng: 80.00,
      region: "Asya",
      city: "Kırgızistan - Çin - Kazakistan",
      kpssNot: "Orta Asya'nın 'Gök Dağları'dır. İpek Yolu'nun kuzey ve güney kollarını birbirinden ayırmıştır."
    },
    {
      id: "wd_karakurum",
      name: "Karakurum Sıradağları",
      category: "dunya_daglari",
      type: "Sıradağ / Kıvrım Dağ Sistemi",
      shapeType: "polyline",
      coordinates: [
        [35.20, 74.60],
        [35.60, 76.00],
        [36.00, 77.50],
        [36.40, 78.50]
      ],
      lat: 35.80, lng: 76.50,
      region: "Asya",
      city: "Pakistan - Çin - Hindistan",
      kpssNot: "Kutuplar dışındaki en uzun buzulları (Siachen, Biafo) barındıran sıradağdır. K2 bu sistemdedir."
    },

    // ---------------- VOLKANLAR ----------------
    {
      id: "wd_fuji",
      name: "Fuji Dağı",
      category: "dunya_daglari",
      type: "Volkan / Aktif Volkan",
      lat: 35.3606, lng: 138.7274,
      region: "Asya",
      city: "Japonya",
      kpssNot: "Japonya'nın en yüksek noktası (3.776 m) ve simgesidir. Pasifik Ateş Çemberi üzerindeki tipik bir koni volkandır."
    },
    {
      id: "wd_etna",
      name: "Etna Yanardağı",
      category: "dunya_daglari",
      type: "Volkan / Aktif Volkan",
      lat: 37.7510, lng: 14.9934,
      region: "Avrupa",
      city: "İtalya (Sicilya)",
      kpssNot: "Avrupa'nın en yüksek ve en aktif volkanıdır. Çevresindeki volkanik topraklar narenciye ve bağcılık için çok verimlidir."
    },
    {
      id: "wd_vezuv",
      name: "Vezüv Yanardağı",
      category: "dunya_daglari",
      type: "Volkan / Aktif Volkan",
      lat: 40.8210, lng: 14.4260,
      region: "Avrupa",
      city: "İtalya",
      promptTitle: "MS 79 yılındaki patlamasıyla Pompei ve Herkulaneum kentlerini kül altında bırakan volkan haritada hangisidir?",
      kpssNot: "MS 79'daki patlaması Pompei ve Herkulaneum'u kül altında bıraktı. Napoli'nin hemen yanındaki en riskli volkanlardan biridir."
    },
    {
      id: "wd_krakatoa",
      name: "Krakatoa (Krakatau)",
      category: "dunya_daglari",
      type: "Volkan / Aktif Volkan",
      lat: -6.1021, lng: 105.4230,
      region: "Asya",
      city: "Endonezya",
      kpssNot: "1883 patlaması tarihin en şiddetli volkanik olaylarından biridir; küresel sıcaklıkları düşürmüş ve tsunami üretmiştir."
    },
    {
      id: "wd_ojos",
      name: "Ojos del Salado",
      category: "dunya_daglari",
      type: "Volkan / Yükselti Rekoru",
      lat: -27.1092, lng: -68.5413,
      region: "Güney Amerika",
      city: "Şili - Arjantin",
      kpssNot: "6.893 m ile dünyanın en yüksek volkanıdır. And Dağları üzerinde, Atacama Çölü kenarındadır."
    },
    {
      id: "wd_cotopaxi",
      name: "Cotopaxi (Kotopaksi)",
      category: "dunya_daglari",
      type: "Volkan / Aktif Volkan",
      lat: -0.6840, lng: -78.4378,
      region: "Güney Amerika",
      city: "Ekvador",
      kpssNot: "Ekvator çizgisine en yakın buzullu ve dünyanın en yüksek aktif volkanlarından biridir (5.897 m)."
    },
    {
      id: "wd_kilauea",
      name: "Kilauea",
      category: "dunya_daglari",
      type: "Volkan / Aktif Volkan",
      lat: 19.4069, lng: -155.2834,
      region: "Okyanusya",
      city: "ABD (Hawaii)",
      kpssNot: "Dünyanın en etkin volkanlarındandır. Levha ortası 'sıcak nokta' (hot spot) volkanizmasının en bilinen örneğidir."
    },
    {
      id: "wd_eyjafjallajokull",
      name: "Eyjafjallajökull",
      category: "dunya_daglari",
      type: "Volkan / Aktif Volkan",
      lat: 63.6300, lng: -19.6206,
      region: "Avrupa",
      city: "İzlanda",
      kpssNot: "2010 patlamasındaki kül bulutu Avrupa hava trafiğini günlerce durdurdu. Orta Atlantik Sırtı üzerindeki buzul altı volkandır."
    }
  ],

  // =========================================================================
  // 🏞️ DÜNYA NEHİRLERİ, GÖLLERİ & ŞELALELERİ
  // =========================================================================
  dunya_sulari: [
    // ---------------- NEHİRLER ----------------
    {
      id: "ws_nil",
      name: "Nil Nehri",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [0.30, 33.00],
        [4.85, 31.60],
        [15.60, 32.50],
        [24.10, 32.90],
        [30.00, 31.20]
      ],
      lat: 20.00, lng: 32.00,
      region: "Afrika",
      city: "Uganda - Sudan - Mısır",
      promptTitle: "Güneyden kuzeye akarak Akdeniz'e dökülen, 6.650 km ile dünyanın en uzun nehri sayılan akarsu haritada hangisidir?",
      kpssNot: "6.650 km ile dünyanın en uzun nehri kabul edilir. Çöl içinde aktığı hâlde debisini korur; Akdeniz'e delta ile dökülür."
    },
    {
      id: "ws_amazon",
      name: "Amazon Nehri",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [-4.50, -73.50],
        [-3.30, -64.70],
        [-3.10, -58.40],
        [-1.50, -52.00],
        [-0.50, -50.00]
      ],
      lat: -3.00, lng: -60.00,
      region: "Güney Amerika",
      city: "Peru - Kolombiya - Brezilya",
      promptTitle: "Havzası ve taşıdığı su miktarı (debisi) dünyada en büyük olan, ekvatoral kuşakta akan nehir haritada hangisidir?",
      kpssNot: "Dünyanın debisi en yüksek ve havzası en geniş nehridir. Ekvatoral iklim nedeniyle rejimi tüm yıl düzenlidir."
    },
    {
      id: "ws_yangtze",
      name: "Yangtze (Chang Jiang)",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [32.20, 97.00],
        [28.80, 104.70],
        [29.60, 109.50],
        [30.60, 114.30],
        [31.20, 121.50]
      ],
      lat: 30.50, lng: 112.00,
      region: "Asya",
      city: "Çin",
      kpssNot: "Asya'nın en uzun nehridir (~6.300 km). Üç Boğaz Barajı bu nehir üzerindedir; Çin'in iç ulaşım omurgasıdır."
    },
    {
      id: "ws_mississippi",
      name: "Mississippi - Missouri",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [47.20, -95.20],
        [42.50, -91.20],
        [38.60, -90.20],
        [35.10, -90.10],
        [29.20, -89.30]
      ],
      lat: 38.00, lng: -90.50,
      region: "Kuzey Amerika",
      city: "ABD",
      kpssNot: "Kuzey Amerika'nın en uzun akarsu sistemidir. Meksika Körfezi'ne kuşayağı (parmak) delta ile dökülür."
    },
    {
      id: "ws_tuna",
      name: "Tuna Nehri (Danube)",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [48.10, 8.20],
        [48.20, 16.40],
        [47.50, 19.00],
        [44.80, 20.50],
        [44.10, 27.30],
        [45.20, 29.70]
      ],
      lat: 45.50, lng: 22.00,
      region: "Avrupa",
      city: "Almanya - Avusturya - Macaristan - Sırbistan - Romanya",
      promptTitle: "En fazla ülkeden geçen ve dört başkenti bağlayan, Karadeniz'e delta ile dökülen Avrupa nehri haritada hangisidir?",
      kpssNot: "En fazla ülkeden geçen nehirdir (10 ülke). Viyana, Bratislava, Budapeşte ve Belgrad'ı bağlar; Karadeniz'e delta ile dökülür."
    },
    {
      id: "ws_ren",
      name: "Ren Nehri (Rhine)",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [46.50, 9.50],
        [47.60, 8.20],
        [49.50, 8.40],
        [51.20, 6.80],
        [51.90, 4.30]
      ],
      lat: 49.50, lng: 7.50,
      region: "Avrupa",
      city: "İsviçre - Almanya - Hollanda",
      kpssNot: "Dünyanın taşımacılıkta en yoğun kullanılan nehridir. Ruhr sanayi bölgesini Rotterdam Limanı'na bağlar."
    },
    {
      id: "ws_volga",
      name: "Volga Nehri",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [57.10, 32.70],
        [56.30, 44.00],
        [53.20, 50.10],
        [48.70, 44.50],
        [46.30, 47.90]
      ],
      lat: 52.00, lng: 46.00,
      region: "Avrupa",
      city: "Rusya",
      kpssNot: "Avrupa'nın en uzun nehridir (~3.530 km). Denize değil kapalı havzaya (Hazar) dökülen bir akarsudur."
    },
    {
      id: "ws_kongo",
      name: "Kongo Nehri",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [-11.00, 26.70],
        [-4.30, 20.60],
        [0.00, 18.30],
        [-4.30, 15.30],
        [-6.00, 12.40]
      ],
      lat: -3.00, lng: 18.00,
      region: "Afrika",
      city: "Zambiya - Kongo Demokratik Cumhuriyeti - Kongo",
      kpssNot: "Debisi Amazon'dan sonra en yüksek nehirdir ve ekvatoru iki kez keser. Hidroelektrik potansiyeli dünyada en yüksek havzadır."
    },
    {
      id: "ws_ganj",
      name: "Ganj Nehri",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [30.10, 78.30],
        [25.40, 81.90],
        [25.60, 85.10],
        [23.50, 90.00],
        [22.20, 90.60]
      ],
      lat: 25.00, lng: 85.00,
      region: "Asya",
      city: "Hindistan - Bangladeş",
      kpssNot: "Hinduizmde kutsal sayılan nehirdir. Brahmaputra ile birleşip dünyanın en büyük deltasını (Ganj-Brahmaputra) oluşturur."
    },
    {
      id: "ws_indus",
      name: "İndus Nehri",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [35.50, 75.00],
        [33.90, 72.20],
        [28.40, 68.90],
        [24.90, 67.90]
      ],
      lat: 30.00, lng: 70.00,
      region: "Asya",
      city: "Çin - Hindistan - Pakistan",
      kpssNot: "İndus (Mohenjo-daro) uygarlığının doğduğu nehirdir. Pakistan tarımının tamamı bu havzanın sulamasına dayanır."
    },
    {
      id: "ws_mekong",
      name: "Mekong Nehri",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [28.00, 98.50],
        [21.00, 101.00],
        [15.00, 105.80],
        [11.50, 105.00],
        [10.00, 106.30]
      ],
      lat: 17.00, lng: 103.00,
      region: "Asya",
      city: "Çin - Laos - Tayland - Kamboçya - Vietnam",
      kpssNot: "Güneydoğu Asya'nın en uzun nehridir. Deltası dünyanın en yoğun pirinç üretim alanlarından biridir."
    },
    {
      id: "ws_huanghe",
      name: "Sarı Irmak (Huang He)",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [35.00, 96.50],
        [36.00, 103.50],
        [40.50, 110.00],
        [34.90, 114.00],
        [37.50, 118.50]
      ],
      lat: 37.00, lng: 110.00,
      region: "Asya",
      city: "Çin",
      kpssNot: "Taşıdığı lös (sarı toprak) yükü nedeniyle 'Sarı' adını alır. Çin uygarlığının doğduğu, taşkınlarıyla 'Çin'in Kederi' denen nehirdir."
    },
    {
      id: "ws_niger",
      name: "Nijer Nehri",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [9.50, -10.50],
        [16.80, -3.00],
        [13.50, 2.10],
        [7.70, 6.70],
        [4.90, 6.30]
      ],
      lat: 12.00, lng: -1.00,
      region: "Afrika",
      city: "Gine - Mali - Nijer - Nijerya",
      kpssNot: "Batı Afrika'nın en uzun nehridir; Sahra'nın güney kenarında bumerang biçimli bir yay çizer."
    },
    {
      id: "ws_parana",
      name: "Parana Nehri",
      category: "dunya_sulari",
      type: "Nehir / Akarsu",
      shapeType: "polyline",
      coordinates: [
        [-18.90, -49.50],
        [-24.10, -54.30],
        [-27.30, -58.80],
        [-32.90, -60.70],
        [-34.50, -58.50]
      ],
      lat: -27.00, lng: -57.00,
      region: "Güney Amerika",
      city: "Brezilya - Paraguay - Arjantin",
      kpssNot: "Güney Amerika'nın Amazon'dan sonraki en uzun nehridir. Itaipu Barajı ve Iguazu Şelalesi bu havzadadır."
    },

    // ---------------- GÖLLER ----------------
    {
      id: "ws_baykal",
      name: "Baykal Gölü",
      category: "dunya_sulari",
      type: "Göl / Tektonik Göl",
      lat: 53.50, lng: 108.20,
      region: "Asya",
      city: "Rusya (Sibirya)",
      promptTitle: "1.642 m derinliğiyle dünyanın en derin gölü olan ve yüzeydeki tatlı suyun yaklaşık beşte birini barındıran göl haritada hangisidir?",
      kpssNot: "Dünyanın en derin (1.642 m) ve en yaşlı gölüdür. Yer üstündeki akışkan tatlı suyun yaklaşık %20'sini barındırır; tektonik kökenlidir."
    },
    {
      id: "ws_superior",
      name: "Superior Gölü",
      category: "dunya_sulari",
      type: "Göl / Buzul Kökenli Göl",
      lat: 47.70, lng: -87.50,
      region: "Kuzey Amerika",
      city: "ABD - Kanada",
      kpssNot: "Yüzey alanı en büyük tatlı su gölüdür. Büyük Göller sisteminin en büyük üyesidir; buzul aşındırmasıyla oluşmuştur."
    },
    {
      id: "ws_victoria",
      name: "Victoria Gölü",
      category: "dunya_sulari",
      type: "Göl / Tatlı Su Gölü",
      lat: -1.00, lng: 33.00,
      region: "Afrika",
      city: "Tanzanya - Uganda - Kenya",
      kpssNot: "Afrika'nın en büyük, dünyanın en büyük tropikal gölüdür. Nil'in ana kaynağı sayılır."
    },
    {
      id: "ws_tanganyika",
      name: "Tanganyika Gölü",
      category: "dunya_sulari",
      type: "Göl / Tektonik Göl",
      lat: -6.00, lng: 29.50,
      region: "Afrika",
      city: "Tanzanya - Kongo DC - Burundi - Zambiya",
      kpssNot: "Dünyanın en uzun ve Baykal'dan sonra en derin gölüdür. Doğu Afrika Rift Vadisi'nin (graben) içindedir."
    },
    {
      id: "ws_titicaca",
      name: "Titicaca Gölü",
      category: "dunya_sulari",
      type: "Göl / Yükselti Rekoru",
      lat: -15.85, lng: -69.35,
      region: "Güney Amerika",
      city: "Peru - Bolivya",
      kpssNot: "3.812 m yükseltisiyle gemi ulaşımına elverişli en yüksek göldür. And Dağları içindeki Altiplano platosundadır."
    },
    {
      id: "ws_ladoga",
      name: "Ladoga Gölü",
      category: "dunya_sulari",
      type: "Göl / Buzul Kökenli Göl",
      lat: 60.90, lng: 31.50,
      region: "Avrupa",
      city: "Rusya",
      kpssNot: "Avrupa'nın en büyük gölüdür. Buzul aşındırmasıyla oluşmuş, Neva Nehri ile Baltık'a boşalır."
    },
    {
      id: "ws_aral",
      name: "Aral Gölü",
      category: "dunya_sulari",
      type: "Göl / Kuruyan Göl",
      lat: 45.00, lng: 60.00,
      region: "Asya",
      city: "Kazakistan - Özbekistan",
      promptTitle: "Amuderya ve Sirderya'nın sulamaya çevrilmesiyle yüzeyinin büyük bölümünü yitiren, insan kaynaklı çevre felaketinin simgesi olan göl haritada hangisidir?",
      kpssNot: "Amuderya ve Sirderya'nın pamuk sulamasına ayrılmasıyla yüzeyinin %90'ını yitirdi; insan kaynaklı çevre felaketinin simgesidir."
    },
    {
      id: "ws_cad",
      name: "Çad Gölü",
      category: "dunya_sulari",
      type: "Göl / Kuruyan Göl",
      lat: 13.20, lng: 14.20,
      region: "Afrika",
      city: "Çad - Nijer - Nijerya - Kamerun",
      kpssNot: "Sahra'nın güney kenarındaki sığ kapalı havza gölüdür; çölleşme ve aşırı kullanım nedeniyle hızla küçülmektedir."
    },
    {
      id: "ws_eyre",
      name: "Eyre Gölü",
      category: "dunya_sulari",
      type: "Göl / Kapalı Havza Gölü",
      lat: -28.37, lng: 137.36,
      region: "Okyanusya",
      city: "Avustralya",
      kpssNot: "Avustralya'nın en büyük ve en alçak (-15 m) gölüdür; çoğu yıl kurudur, ancak seyrek yağışlarda dolar."
    },

    // ---------------- ŞELALELER ----------------
    {
      id: "ws_niagara",
      name: "Niagara Şelalesi",
      category: "dunya_sulari",
      type: "Şelale / Turizm Değeri",
      lat: 43.0796, lng: -79.0747,
      region: "Kuzey Amerika",
      city: "ABD - Kanada",
      kpssNot: "Erie ve Ontario gölleri arasında, dirençli-dirençsiz tabaka farkıyla oluşmuş şelaledir; debisi en yüksek şelalelerdendir."
    },
    {
      id: "ws_victoria_sel",
      name: "Victoria Şelalesi",
      category: "dunya_sulari",
      type: "Şelale / Doğal Miras",
      lat: -17.9243, lng: 25.8572,
      region: "Afrika",
      city: "Zambiya - Zimbabve",
      kpssNot: "Zambezi Nehri üzerinde, yerel adıyla 'Gürleyen Duman'dır. Tek perde hâlindeki en geniş şelale sayılır."
    },
    {
      id: "ws_iguazu",
      name: "Iguazu Şelalesi",
      category: "dunya_sulari",
      type: "Şelale / Doğal Miras",
      lat: -25.6953, lng: -54.4367,
      region: "Güney Amerika",
      city: "Arjantin - Brezilya",
      kpssNot: "275 ayrı çağlayandan oluşan basamaklı şelale sistemidir; Parana havzasındadır."
    },
    {
      id: "ws_angel",
      name: "Angel Şelalesi (Salto Ángel)",
      category: "dunya_sulari",
      type: "Şelale / Yükselti Rekoru",
      lat: 5.9701, lng: -62.5362,
      region: "Güney Amerika",
      city: "Venezuela",
      kpssNot: "979 m ile dünyanın en yüksek kesintisiz şelalesidir; bir tepui (masa dağ) kenarından dökülür."
    }
  ],

  // =========================================================================
  // 🌐 OKYANUSLAR, AKINTILAR & DERİN ÇUKURLAR
  // =========================================================================
  dunya_okyanuslari: [
    {
      id: "wo_pasifik",
      name: "Büyük Okyanus (Pasifik)",
      category: "dunya_okyanuslari",
      type: "Okyanus / Su Kütlesi",
      lat: 0.00, lng: -160.00,
      region: "Dünya",
      city: "Asya - Amerika - Okyanusya kıyıları",
      promptTitle: "Yaklaşık 165 milyon km² yüzölçümüyle dünyanın en büyük ve en derin okyanusu haritada hangisidir?",
      kpssNot: "Dünyanın en büyük (~165 milyon km²) ve en derin okyanusudur. Kıyıları boyunca Ateş Çemberi uzanır."
    },
    {
      id: "wo_atlas",
      name: "Atlas Okyanusu (Atlantik)",
      category: "dunya_okyanuslari",
      type: "Okyanus / Su Kütlesi",
      lat: 5.00, lng: -30.00,
      region: "Dünya",
      city: "Amerika - Avrupa - Afrika kıyıları",
      kpssNot: "İkinci büyük okyanustur; 'S' biçimindedir. Ortasında levhaları ayıran Orta Atlantik Sırtı bulunur."
    },
    {
      id: "wo_hint",
      name: "Hint Okyanusu",
      category: "dunya_okyanuslari",
      type: "Okyanus / Su Kütlesi",
      lat: -20.00, lng: 75.00,
      region: "Dünya",
      city: "Afrika - Asya - Avustralya kıyıları",
      kpssNot: "Üçüncü büyük okyanustur. Muson rüzgârlarının etkisiyle yüzey akıntıları yön değiştiren tek okyanustur."
    },
    {
      id: "wo_guney",
      name: "Güney Okyanusu (Antarktika)",
      category: "dunya_okyanuslari",
      type: "Okyanus / Su Kütlesi",
      lat: -60.00, lng: 20.00,
      region: "Antarktika",
      city: "Antarktika çevresi",
      kpssNot: "Antarktika'yı çevreleyen okyanustur. Dünyanın en güçlü akıntısı olan Antarktika Çevre Akıntısı buradadır."
    },
    {
      id: "wo_arktik",
      name: "Kuzey Buz Denizi (Arktik Okyanus)",
      category: "dunya_okyanuslari",
      type: "Okyanus / Su Kütlesi",
      lat: 85.00, lng: 0.00,
      region: "Kuzey Kutbu",
      city: "Rusya - Kanada - Grönland - Norveç kıyıları",
      kpssNot: "En küçük ve en sığ okyanustur. Yüzeyi büyük ölçüde deniz buzuyla kaplıdır; küresel ısınmayla buz alanı hızla daralıyor."
    },
    {
      id: "wo_mariana",
      name: "Mariana Çukuru (Challenger Deep)",
      category: "dunya_okyanuslari",
      type: "Çukur / Derin Deniz Çukuru",
      lat: 11.3733, lng: 142.5917,
      region: "Asya - Okyanusya",
      city: "Büyük Okyanus (Guam yakını)",
      promptTitle: "Yaklaşık 11.000 m derinliğiyle yer kabuğunun bilinen en derin noktası haritada neresidir?",
      kpssNot: "Dünyanın en derin noktasıdır (~10.994 m). Pasifik levhasının Filipin levhası altına dalmasıyla oluşmuş bir dalma-batma çukurudur."
    },
    {
      id: "wo_tonga",
      name: "Tonga Çukuru",
      category: "dunya_okyanuslari",
      type: "Çukur / Derin Deniz Çukuru",
      lat: -23.00, lng: -174.50,
      region: "Okyanusya",
      city: "Büyük Okyanus (Tonga)",
      kpssNot: "Dünyanın ikinci en derin çukurudur (~10.880 m). Levha hareketinin en hızlı olduğu dalma-batma alanlarındandır."
    },
    {
      id: "wo_portoriko",
      name: "Porto Riko Çukuru (Milwaukee)",
      category: "dunya_okyanuslari",
      type: "Çukur / Derin Deniz Çukuru",
      lat: 19.80, lng: -66.50,
      region: "Kuzey Amerika",
      city: "Atlas Okyanusu (Porto Riko)",
      kpssNot: "Atlas Okyanusu'nun en derin noktasıdır (~8.380 m). Karayip ve Kuzey Amerika levhalarının sınırındadır."
    },
    {
      id: "wo_java",
      name: "Java (Sunda) Çukuru",
      category: "dunya_okyanuslari",
      type: "Çukur / Derin Deniz Çukuru",
      lat: -10.00, lng: 110.00,
      region: "Asya",
      city: "Hint Okyanusu (Endonezya)",
      kpssNot: "Hint Okyanusu'nun en derin noktasıdır. 2004 Sumatra depremi ve tsunamisi bu dalma-batma zonunda oluştu."
    },
    {
      id: "wo_kuril",
      name: "Kuril - Kamçatka Çukuru",
      category: "dunya_okyanuslari",
      type: "Çukur / Derin Deniz Çukuru",
      lat: 45.00, lng: 152.00,
      region: "Asya",
      city: "Büyük Okyanus (Rusya)",
      kpssNot: "Kuzeybatı Pasifik'in en derin çukurlarındandır; ada yayı (Kuril Adaları) volkanizmasını besleyen dalma-batma zonudur."
    },
    {
      id: "wo_orta_atlantik",
      name: "Orta Atlantik Sırtı",
      category: "dunya_okyanuslari",
      type: "Sırt / Uzaklaşan Levha Sınırı",
      shapeType: "polyline",
      coordinates: [
        [66.00, -18.00],
        [45.00, -28.00],
        [30.00, -42.00],
        [10.00, -40.00],
        [0.00, -16.00],
        [-20.00, -13.00],
        [-40.00, -15.00]
      ],
      lat: 10.00, lng: -30.00,
      region: "Dünya",
      city: "Atlas Okyanusu",
      promptTitle: "Levhaların birbirinden uzaklaştığı ve yeni okyanus tabanının üretildiği, İzlanda'nın üzerinde yer aldığı okyanus ortası yükselti haritada hangisidir?",
      kpssNot: "Levhaların birbirinden uzaklaştığı (diverjan) sınırdır; yeni okyanus tabanı burada üretilir. İzlanda bu sırtın su üstüne çıkan bölümüdür."
    },
    {
      id: "wo_ates_cemberi",
      name: "Pasifik Ateş Çemberi",
      category: "dunya_okyanuslari",
      type: "Kuşak / Yaklaşan Levha Sınırı",
      shapeType: "polyline",
      coordinates: [
        [-39.00, 175.50],
        [-6.00, 150.00],
        [14.00, 120.50],
        [35.00, 139.00],
        [52.00, 158.00],
        [58.00, -152.00],
        [40.00, -124.00],
        [18.00, -102.00],
        [-12.00, -77.00],
        [-35.00, -72.00]
      ],
      lat: 20.00, lng: 170.00,
      region: "Dünya",
      city: "Büyük Okyanus çevresi",
      kpssNot: "Dünyadaki aktif volkanların ~%75'i ve depremlerin ~%90'ı bu kuşaktadır. Pasifik levhasının çevre levhalar altına dalmasıyla oluşur."
    },
    {
      id: "wo_golfstream",
      name: "Gulf Stream (Golf Akıntısı)",
      category: "dunya_okyanuslari",
      type: "Akıntı / Sıcak Su Akıntısı",
      shapeType: "polyline",
      coordinates: [
        [25.00, -79.00],
        [32.00, -78.00],
        [38.00, -70.00],
        [44.00, -50.00],
        [52.00, -30.00],
        [58.00, -10.00]
      ],
      lat: 40.00, lng: -55.00,
      region: "Kuzey Amerika - Avrupa",
      city: "Atlas Okyanusu",
      promptTitle: "Meksika Körfezi'nden kuzeydoğuya taşıdığı sıcak suyla Batı Avrupa kıyılarını enlemine göre çok daha ılıman kılan akıntı haritada hangisidir?",
      kpssNot: "Meksika Körfezi'nden kuzeydoğuya akan sıcak su akıntısıdır. Batı Avrupa limanlarının kışın donmamasının temel nedenidir."
    },
    {
      id: "wo_labrador",
      name: "Labrador Akıntısı",
      category: "dunya_okyanuslari",
      type: "Akıntı / Soğuk Su Akıntısı",
      shapeType: "polyline",
      coordinates: [
        [60.00, -55.00],
        [52.00, -52.00],
        [46.00, -50.00],
        [42.00, -52.00]
      ],
      lat: 50.00, lng: -52.00,
      region: "Kuzey Amerika",
      city: "Kanada (Newfoundland) açıkları",
      kpssNot: "Soğuk su akıntısıdır; Golf Akıntısı ile karşılaştığı Newfoundland açıklarında yoğun sis ve dünyanın en zengin balıkçılık alanları oluşur."
    },
    {
      id: "wo_peru",
      name: "Peru (Humboldt) Akıntısı",
      category: "dunya_okyanuslari",
      type: "Akıntı / Soğuk Su Akıntısı",
      shapeType: "polyline",
      coordinates: [
        [-40.00, -74.00],
        [-30.00, -72.00],
        [-18.00, -72.00],
        [-6.00, -81.00],
        [0.00, -82.00]
      ],
      lat: -20.00, lng: -74.00,
      region: "Güney Amerika",
      city: "Şili - Peru açıkları",
      kpssNot: "Soğuk su akıntısıdır; Atacama Çölü'nün kuruluğunda ve bölgenin zengin hamsi balıkçılığında etkilidir. El Niño'da zayıflar."
    }
  ],

  // =========================================================================
  // 🌊 DENİZLER & KÖRFEZLER
  // =========================================================================
  dunya_denizleri: [
    {
      id: "wz_akdeniz",
      name: "Akdeniz",
      category: "dunya_denizleri",
      type: "Deniz / İç Deniz",
      lat: 35.00, lng: 18.00,
      region: "Avrupa - Asya - Afrika",
      city: "22 kıyı ülkesi",
      promptTitle: "Üç kıtanın kuşattığı, Cebelitarık Boğazı ile okyanusa açılan ve tuzluluğu okyanus ortalamasının üzerinde olan iç deniz haritada hangisidir?",
      kpssNot: "Üç kıta arasındaki iç denizdir. Buharlaşma fazlalığı nedeniyle tuzluluğu yüksektir; Cebelitarık ve Süveyş ile bağlanır."
    },
    {
      id: "wz_karadeniz",
      name: "Karadeniz",
      category: "dunya_denizleri",
      type: "Deniz / İç Deniz",
      lat: 43.40, lng: 34.00,
      region: "Avrupa - Asya",
      city: "Türkiye - Bulgaristan - Romanya - Ukrayna - Rusya - Gürcistan",
      kpssNot: "Akarsu beslemesi bol, buharlaşması az olduğu için tuzluluğu düşüktür. Derinlerinde oksijensiz (hidrojen sülfürlü) katman vardır."
    },
    {
      id: "wz_kizildeniz",
      name: "Kızıldeniz",
      category: "dunya_denizleri",
      type: "Deniz / İç Deniz",
      lat: 20.00, lng: 38.50,
      region: "Afrika - Asya",
      city: "Mısır - Suudi Arabistan - Sudan - Eritre - Yemen",
      kpssNot: "Afrika ile Arap Yarımadası arasında, levhaların ayrılmasıyla açılan genç bir denizdir. Dünyanın en tuzlu denizlerindendir."
    },
    {
      id: "wz_baltik",
      name: "Baltık Denizi",
      category: "dunya_denizleri",
      type: "Deniz / İç Deniz",
      lat: 58.00, lng: 20.00,
      region: "Avrupa",
      city: "İsveç - Finlandiya - Rusya - Polonya - Almanya - Baltık ülkeleri",
      kpssNot: "Tuzluluğu en düşük denizdir (yer yer ‰5). Kışın donar; Kiel Kanalı ile Kuzey Denizi'ne bağlanır."
    },
    {
      id: "wz_kuzey",
      name: "Kuzey Denizi",
      category: "dunya_denizleri",
      type: "Deniz / Kenar Deniz",
      lat: 56.00, lng: 3.00,
      region: "Avrupa",
      city: "Birleşik Krallık - Norveç - Hollanda - Almanya - Danimarka",
      kpssNot: "Petrol ve doğal gaz platformlarıyla ünlüdür. Balıkçılık ve deniz ticareti açısından Avrupa'nın en yoğun sularındandır."
    },
    {
      id: "wz_hazar",
      name: "Hazar Denizi",
      category: "dunya_denizleri",
      type: "Kapalı Havza / Göl-Deniz",
      lat: 41.50, lng: 50.50,
      region: "Avrupa - Asya",
      city: "Rusya - Kazakistan - Türkmenistan - İran - Azerbaycan",
      promptTitle: "Denizle bağlantısı olmayan, yüzölçümü bakımından dünyanın en büyük gölü sayılan kapalı havza haritada hangisidir?",
      kpssNot: "Adı deniz olsa da denizle bağlantısı olmayan, dünyanın en büyük gölüdür. Petrol ve havyar (mersin balığı) kaynaklarıyla ünlüdür."
    },
    {
      id: "wz_oludeniz",
      name: "Ölü Deniz",
      category: "dunya_denizleri",
      type: "Kapalı Havza / Göl-Deniz",
      lat: 31.50, lng: 35.50,
      region: "Asya",
      city: "İsrail - Ürdün - Filistin",
      promptTitle: "Kıyısı deniz seviyesinin yaklaşık 430 m altında kalan, yer kabuğunun en alçak karasal noktası haritada neresidir?",
      kpssNot: "Yer kabuğunun en alçak karasal noktasıdır (-430 m). Aşırı tuzluluk (~%34) nedeniyle canlı yaşamaz, insan batmaz."
    },
    {
      id: "wz_ege",
      name: "Ege Denizi",
      category: "dunya_denizleri",
      type: "Deniz / Kenar Deniz",
      lat: 38.00, lng: 25.00,
      region: "Avrupa - Asya",
      city: "Türkiye - Yunanistan",
      kpssNot: "Çok sayıda ada barındıran, çöküntü (graben) sistemleriyle şekillenmiş denizdir. Kıyı tipi girintili-çıkıntılıdır."
    },
    {
      id: "wz_marmara",
      name: "Marmara Denizi",
      category: "dunya_denizleri",
      type: "Deniz / İç Deniz",
      lat: 40.70, lng: 28.20,
      region: "Avrupa - Asya",
      city: "Türkiye",
      kpssNot: "Kıyılarının tamamı tek bir ülkenin (Türkiye) sınırları içinde kalan denizdir. İki boğazla iki denize bağlanır."
    },
    {
      id: "wz_adriyatik",
      name: "Adriyatik Denizi",
      category: "dunya_denizleri",
      type: "Deniz / Kenar Deniz",
      lat: 43.00, lng: 15.50,
      region: "Avrupa",
      city: "İtalya - Hırvatistan - Arnavutluk - Slovenya - Karadağ",
      kpssNot: "Doğu kıyısı, kıyıya paralel sıradağların sular altında kalmasıyla oluşan Dalmaçya tipi kıyının dünyadaki en tipik örneğidir."
    },
    {
      id: "wz_karayip",
      name: "Karayip Denizi",
      category: "dunya_denizleri",
      type: "Deniz / Kenar Deniz",
      lat: 15.00, lng: -75.00,
      region: "Kuzey Amerika - Güney Amerika",
      city: "Küba - Jamaika - Panama - Kolombiya - Venezuela",
      kpssNot: "Mercan resifleri, tropikal turizm ve Panama Kanalı'nın Atlas kapısıdır. Kasırga (hurricane) kuşağındadır."
    },
    {
      id: "wz_guneycin",
      name: "Güney Çin Denizi",
      category: "dunya_denizleri",
      type: "Deniz / Kenar Deniz",
      lat: 13.00, lng: 114.00,
      region: "Asya",
      city: "Çin - Vietnam - Filipinler - Malezya - Brunei",
      kpssNot: "Dünya deniz ticaretinin en yoğun geçtiği sulardan biridir; ada ve kıta sahanlığı egemenliği en çok tartışılan denizdir."
    },
    {
      id: "wz_japon",
      name: "Japon Denizi (Doğu Denizi)",
      category: "dunya_denizleri",
      type: "Deniz / Kenar Deniz",
      lat: 40.00, lng: 135.00,
      region: "Asya",
      city: "Japonya - Kore - Rusya",
      kpssNot: "Japon ada yayı ile Asya kıtası arasındaki kenar denizdir; kışın Sibirya'dan gelen kuru hava buradan nem alarak Japonya'ya kar bırakır."
    },
    {
      id: "wz_arap",
      name: "Arap Denizi",
      category: "dunya_denizleri",
      type: "Deniz / Kenar Deniz",
      lat: 15.00, lng: 65.00,
      region: "Asya - Afrika",
      city: "Hindistan - Pakistan - Umman - Yemen - Somali",
      kpssNot: "Hint Okyanusu'nun kuzeybatı kolu ve muson rüzgârlarının yön değiştirdiği denizdir; Basra-Avrupa petrol yolu üzerindedir."
    },
    {
      id: "wz_bengal",
      name: "Bengal Körfezi",
      category: "dunya_denizleri",
      type: "Körfez / Kenar Deniz",
      lat: 15.00, lng: 88.00,
      region: "Asya",
      city: "Hindistan - Bangladeş - Myanmar - Sri Lanka",
      kpssNot: "Dünyanın en büyük körfezidir. Ganj-Brahmaputra deltası buraya açılır; tropikal siklonların en ölümcül olduğu alandır."
    },
    {
      id: "wz_basra",
      name: "Basra Körfezi",
      category: "dunya_denizleri",
      type: "Körfez / Kenar Deniz",
      lat: 27.00, lng: 51.00,
      region: "Asya",
      city: "Suudi Arabistan - İran - Irak - Kuveyt - BAE - Katar",
      promptTitle: "Dünya petrol rezervlerinin büyük bölümünü çevreleyen, Hürmüz Boğazı ile açık denize bağlanan körfez haritada hangisidir?",
      kpssNot: "Dünya petrol ticaretinin kalbidir; tek çıkışı Hürmüz Boğazı olduğu için jeopolitik olarak en kırılgan sulardan biridir."
    },
    {
      id: "wz_meksika",
      name: "Meksika Körfezi",
      category: "dunya_denizleri",
      type: "Körfez / Kenar Deniz",
      lat: 25.00, lng: -90.00,
      region: "Kuzey Amerika",
      city: "ABD - Meksika - Küba",
      kpssNot: "Golf Akıntısı'nın doğduğu körfezdir. Mississippi deltası ve yoğun açık deniz petrol platformları buradadır."
    },
    {
      id: "wz_hudson",
      name: "Hudson Körfezi",
      category: "dunya_denizleri",
      type: "Körfez / Kenar Deniz",
      lat: 60.00, lng: -85.00,
      region: "Kuzey Amerika",
      city: "Kanada",
      kpssNot: "Yılın büyük bölümünde donan, buzul aşındırmasıyla şekillenmiş sığ körfezdir; kutup ayısı yaşam alanıdır."
    },
    {
      id: "wz_biskay",
      name: "Biskay Körfezi",
      category: "dunya_denizleri",
      type: "Körfez / Kenar Deniz",
      lat: 45.00, lng: -4.00,
      region: "Avrupa",
      city: "Fransa - İspanya",
      kpssNot: "Şiddetli fırtınalarıyla denizcilerin korkulu körfezidir; batı rüzgârları ve cephe sistemlerinin Avrupa'ya giriş kapısıdır."
    },
    {
      id: "wz_aden",
      name: "Aden Körfezi",
      category: "dunya_denizleri",
      type: "Körfez / Kenar Deniz",
      lat: 12.50, lng: 47.50,
      region: "Asya - Afrika",
      city: "Yemen - Somali - Cibuti",
      kpssNot: "Süveyş-Hint Okyanusu deniz yolunun kilit halkasıdır; korsanlık olayları nedeniyle uluslararası donanma devriyesi altındadır."
    },
    {
      id: "wz_bering",
      name: "Bering Denizi",
      category: "dunya_denizleri",
      type: "Deniz / Kenar Deniz",
      lat: 58.00, lng: -178.00,
      region: "Asya - Kuzey Amerika",
      city: "Rusya - ABD (Alaska)",
      kpssNot: "Buzul çağlarında Asya ile Amerika'yı birleştiren Beringia kara köprüsünün bulunduğu sığ denizdir; dünyanın en verimli balıkçılık alanlarındandır."
    },
    {
      id: "wz_okhotsk",
      name: "Okhotsk Denizi",
      category: "dunya_denizleri",
      type: "Deniz / Kenar Deniz",
      lat: 54.00, lng: 150.00,
      region: "Asya",
      city: "Rusya - Japonya",
      kpssNot: "Kuril ada yayı ile Pasifik'ten ayrılan, kışın büyük bölümü donan soğuk kenar denizdir."
    },
    {
      id: "wz_tasman",
      name: "Tasman Denizi",
      category: "dunya_denizleri",
      type: "Deniz / Kenar Deniz",
      lat: -38.00, lng: 160.00,
      region: "Okyanusya",
      city: "Avustralya - Yeni Zelanda",
      kpssNot: "Avustralya ile Yeni Zelanda arasındaki denizdir; 'Kükreyen Kırklar' batı rüzgârlarının etkisindedir."
    },
    {
      id: "wz_sargasso",
      name: "Sargasso Denizi",
      category: "dunya_denizleri",
      type: "Deniz / Kıyısız Deniz",
      lat: 30.00, lng: -55.00,
      region: "Kuzey Amerika",
      city: "Atlas Okyanusu (açık deniz)",
      promptTitle: "Kara sınırı olmayan, yalnızca okyanus akıntılarıyla çevrelenen ve yüzen sargassum yosunlarıyla tanınan deniz haritada hangisidir?",
      kpssNot: "Kıyısı olmayan tek denizdir; sınırlarını dört okyanus akıntısı çizer. Yüzen sargassum yosunlarıyla tanınır."
    }
  ],

  // =========================================================================
  // ⛴️ BOĞAZLAR & KANALLAR
  // =========================================================================
  dunya_bogazlari: [
    {
      id: "wb_suveys",
      name: "Süveyş Kanalı",
      category: "dunya_bogazlari",
      type: "Kanal / Yapay Su Yolu",
      shapeType: "polyline",
      coordinates: [
        [31.26, 32.31],
        [30.60, 32.34],
        [29.93, 32.55]
      ],
      lat: 30.60, lng: 32.35,
      region: "Afrika - Asya",
      city: "Mısır",
      promptTitle: "1869'da açılan, Akdeniz ile Kızıldeniz'i birleştirerek Avrupa-Asya deniz yolunu binlerce km kısaltan yapay su yolu haritada hangisidir?",
      kpssNot: "1869'da açıldı. Akdeniz ile Kızıldeniz'i birleştirir; Afrika'nın dolaşılma zorunluluğunu kaldırarak Avrupa-Asya yolunu ~7.000 km kısalttı."
    },
    {
      id: "wb_panama",
      name: "Panama Kanalı",
      category: "dunya_bogazlari",
      type: "Kanal / Yapay Su Yolu",
      shapeType: "polyline",
      coordinates: [
        [9.35, -79.92],
        [9.15, -79.80],
        [8.93, -79.57]
      ],
      lat: 9.12, lng: -79.75,
      region: "Kuzey Amerika",
      city: "Panama",
      promptTitle: "1914'te açılan, Atlas Okyanusu ile Büyük Okyanus'u birleştirerek Güney Amerika'nın dolaşılmasını gereksiz kılan kanal haritada hangisidir?",
      kpssNot: "1914'te açıldı. Atlas ile Büyük Okyanus'u birleştirir; havuzlu (kilitli) sistemle gemileri 26 m yükseltip indirir."
    },
    {
      id: "wb_istanbul",
      name: "İstanbul Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [41.24, 29.13],
        [41.10, 29.05],
        [41.02, 28.98]
      ],
      lat: 41.10, lng: 29.05,
      region: "Avrupa - Asya",
      city: "Türkiye",
      kpssNot: "Karadeniz ile Marmara'yı birleştirir ve Asya ile Avrupa'yı ayırır. Montrö Sözleşmesi ile statüsü belirlenmiştir."
    },
    {
      id: "wb_canakkale",
      name: "Çanakkale Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [40.45, 26.68],
        [40.22, 26.40],
        [40.02, 26.19]
      ],
      lat: 40.22, lng: 26.40,
      region: "Avrupa - Asya",
      city: "Türkiye",
      kpssNot: "Marmara ile Ege'yi birleştirir. Antik adı Hellespontos'tur; tarih boyunca kıtalar arası geçişin kilidi olmuştur."
    },
    {
      id: "wb_cebelitarik",
      name: "Cebelitarık Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [36.15, -5.60],
        [35.95, -5.50],
        [35.80, -5.38]
      ],
      lat: 35.95, lng: -5.50,
      region: "Avrupa - Afrika",
      city: "İspanya - Fas - Birleşik Krallık (Cebelitarık)",
      promptTitle: "Akdeniz'i Atlas Okyanusu'na bağlayan, en dar yeri yaklaşık 14 km olan ve Avrupa ile Afrika'yı ayıran boğaz haritada hangisidir?",
      kpssNot: "Akdeniz'in Atlas Okyanusu'na tek doğal kapısıdır. En dar yeri ~14 km'dir; Avrupa ile Afrika'yı ayırır."
    },
    {
      id: "wb_hurmuz",
      name: "Hürmüz Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [26.90, 56.00],
        [26.60, 56.40],
        [26.30, 56.70]
      ],
      lat: 26.60, lng: 56.40,
      region: "Asya",
      city: "İran - Umman - BAE",
      promptTitle: "Basra Körfezi'ni açık denize bağlayan, dünya deniz yoluyla taşınan petrolün yaklaşık beşte birinin geçtiği boğaz haritada hangisidir?",
      kpssNot: "Basra Körfezi'nin tek çıkışıdır; deniz yoluyla taşınan petrolün yaklaşık %20'si buradan geçer. Dünyanın en stratejik geçididir."
    },
    {
      id: "wb_malakka",
      name: "Malakka Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [5.50, 97.50],
        [3.50, 100.00],
        [1.30, 103.50]
      ],
      lat: 3.50, lng: 100.00,
      region: "Asya",
      city: "Endonezya - Malezya - Singapur",
      kpssNot: "Hint Okyanusu ile Güney Çin Denizi arasındaki en kısa yoldur; Doğu Asya'nın enerji ve ticaret damarıdır. Singapur bu boğazın kapısındadır."
    },
    {
      id: "wb_bering",
      name: "Bering Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [66.40, -169.50],
        [65.80, -168.80],
        [65.20, -168.20]
      ],
      lat: 65.80, lng: -168.80,
      region: "Asya - Kuzey Amerika",
      city: "Rusya - ABD",
      promptTitle: "Asya ile Kuzey Amerika kıtalarını birbirinden ayıran, iki ülke sınırının ve tarih değiştirme çizgisinin geçtiği boğaz haritada hangisidir?",
      kpssNot: "Asya ile Kuzey Amerika'yı ayırır. Rusya-ABD sınırı ve Uluslararası Tarih Değiştirme Çizgisi buradan geçer."
    },
    {
      id: "wb_babulmendeb",
      name: "Babülmendeb Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [13.00, 43.00],
        [12.60, 43.30],
        [12.30, 43.50]
      ],
      lat: 12.60, lng: 43.30,
      region: "Asya - Afrika",
      city: "Yemen - Cibuti - Eritre",
      kpssNot: "Kızıldeniz'in güney kapısıdır ('Gözyaşı Kapısı'). Süveyş rotasının tamamlayıcısıdır; kapanması Süveyş'i işlevsiz bırakır."
    },
    {
      id: "wb_dover",
      name: "Dover Boğazı (Manş'ın en dar yeri)",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [51.10, 1.40],
        [50.95, 1.60],
        [50.80, 1.80]
      ],
      lat: 50.95, lng: 1.60,
      region: "Avrupa",
      city: "Birleşik Krallık - Fransa",
      kpssNot: "Manş Denizi'nin en dar yeridir (~34 km) ve dünyanın en yoğun gemi trafiğine sahiptir. Manş Tüneli buranın altından geçer."
    },
    {
      id: "wb_magellan",
      name: "Magellan Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [-52.50, -68.50],
        [-53.40, -70.90],
        [-53.80, -72.50]
      ],
      lat: -53.40, lng: -70.90,
      region: "Güney Amerika",
      city: "Şili - Arjantin",
      kpssNot: "Panama Kanalı açılmadan önce Atlas-Pasifik arası ana geçitti. Güney Amerika'yı Ateş Toprakları'ndan (Tierra del Fuego) ayırır."
    },
    {
      id: "wb_drake",
      name: "Drake Geçidi",
      category: "dunya_bogazlari",
      type: "Boğaz / Açık Deniz Geçidi",
      shapeType: "polyline",
      coordinates: [
        [-56.00, -67.00],
        [-58.50, -64.00],
        [-61.00, -62.00]
      ],
      lat: -58.50, lng: -64.00,
      region: "Güney Amerika - Antarktika",
      city: "Şili - Antarktika",
      kpssNot: "Güney Amerika ile Antarktika arasındaki geçittir; dünyanın en fırtınalı sularıdır. Antarktika Çevre Akıntısı buradan geçer."
    },
    {
      id: "wb_danimarka",
      name: "Danimarka Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [67.00, -24.00],
        [66.00, -27.00],
        [65.00, -30.00]
      ],
      lat: 66.00, lng: -27.00,
      region: "Avrupa - Kuzey Amerika",
      city: "İzlanda - Grönland (Danimarka)",
      kpssNot: "İzlanda ile Grönland arasındadır. Soğuk Doğu Grönland akıntısının Atlas'a girdiği, buz dağlarının (aysberg) sürüklendiği geçittir."
    },
    {
      id: "wb_mozambik",
      name: "Mozambik Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [-12.00, 42.00],
        [-18.00, 41.00],
        [-25.00, 35.50]
      ],
      lat: -18.00, lng: 41.00,
      region: "Afrika",
      city: "Mozambik - Madagaskar",
      kpssNot: "Afrika ile Madagaskar arasındaki, dünyanın en uzun boğazıdır (~1.600 km). Sıcak Mozambik akıntısı buradan geçer."
    },
    {
      id: "wb_kerc",
      name: "Kerç Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [45.40, 36.60],
        [45.20, 36.60],
        [45.00, 36.50]
      ],
      lat: 45.20, lng: 36.60,
      region: "Avrupa",
      city: "Rusya - Ukrayna",
      kpssNot: "Azak Denizi'ni Karadeniz'e bağlar. Kırım Yarımadası ile Rusya ana karası arasındaki geçittir."
    },
    {
      id: "wb_tayvan",
      name: "Tayvan (Formoza) Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [25.50, 120.50],
        [24.50, 119.50],
        [23.50, 118.50]
      ],
      lat: 24.50, lng: 119.50,
      region: "Asya",
      city: "Çin - Tayvan",
      kpssNot: "Doğu Çin Denizi ile Güney Çin Denizi'ni bağlar; yarı iletken ticaretinin ve bölgesel gerilimin merkezindeki geçittir."
    },
    {
      id: "wb_kore",
      name: "Kore Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [34.50, 128.50],
        [34.20, 129.50],
        [33.90, 130.50]
      ],
      lat: 34.20, lng: 129.50,
      region: "Asya",
      city: "Güney Kore - Japonya",
      kpssNot: "Japon Denizi'ni Doğu Çin Denizi'ne bağlar. Sıcak Kuroşivo kolunun Japon Denizi'ne girdiği geçittir."
    },
    {
      id: "wb_messina",
      name: "Messina Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [38.30, 15.60],
        [38.20, 15.62],
        [38.10, 15.65]
      ],
      lat: 38.20, lng: 15.62,
      region: "Avrupa",
      city: "İtalya",
      kpssNot: "Sicilya'yı İtalya ana karasından ayırır. Güçlü gelgit akıntıları mitolojideki Skilla ve Kharibdis'e ilham vermiştir."
    },
    {
      id: "wb_otranto",
      name: "Otranto Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [40.50, 18.50],
        [40.20, 19.00],
        [39.90, 19.40]
      ],
      lat: 40.20, lng: 19.00,
      region: "Avrupa",
      city: "İtalya - Arnavutluk",
      kpssNot: "Adriyatik Denizi'ni İyon Denizi'ne bağlar; Adriyatik'in tek kapısıdır."
    },
    {
      id: "wb_torres",
      name: "Torres Boğazı",
      category: "dunya_bogazlari",
      type: "Boğaz / Doğal Su Geçidi",
      shapeType: "polyline",
      coordinates: [
        [-9.50, 142.00],
        [-10.00, 142.50],
        [-10.50, 143.00]
      ],
      lat: -10.00, lng: 142.50,
      region: "Okyanusya",
      city: "Avustralya - Papua Yeni Gine",
      kpssNot: "Avustralya'yı Yeni Gine'den ayırır. Sığ ve resifli olduğu için gemiler için tehlikeli bir geçittir."
    },
    {
      id: "wb_kiel",
      name: "Kiel Kanalı",
      category: "dunya_bogazlari",
      type: "Kanal / Yapay Su Yolu",
      shapeType: "polyline",
      coordinates: [
        [54.37, 9.45],
        [54.30, 9.70],
        [54.36, 10.14]
      ],
      lat: 54.33, lng: 9.80,
      region: "Avrupa",
      city: "Almanya",
      kpssNot: "Kuzey Denizi ile Baltık Denizi'ni birleştirir; Danimarka'yı dolaşma zorunluluğunu kaldırır. Dünyanın en yoğun yapay su yoludur."
    },
    {
      id: "wb_korint",
      name: "Korint Kanalı",
      category: "dunya_bogazlari",
      type: "Kanal / Yapay Su Yolu",
      shapeType: "polyline",
      coordinates: [
        [37.95, 22.92],
        [37.93, 22.97],
        [37.91, 23.02]
      ],
      lat: 37.93, lng: 22.97,
      region: "Avrupa",
      city: "Yunanistan",
      kpssNot: "Mora Yarımadası'nı ana karadan ayırarak Korint Körfezi ile Ege'yi birleştirir; kayaya oyulmuş çok dar bir kanaldır."
    },
    {
      id: "wb_volgadon",
      name: "Volga - Don Kanalı",
      category: "dunya_bogazlari",
      type: "Kanal / Yapay Su Yolu",
      shapeType: "polyline",
      coordinates: [
        [48.70, 44.45],
        [48.50, 43.90],
        [48.10, 43.00]
      ],
      lat: 48.50, lng: 43.80,
      region: "Avrupa",
      city: "Rusya",
      kpssNot: "Hazar Denizi'ni (Volga üzerinden) Karadeniz'e (Don üzerinden) bağlar; kapalı havzayı dünya denizlerine açan su yoludur."
    }
  ]
});
