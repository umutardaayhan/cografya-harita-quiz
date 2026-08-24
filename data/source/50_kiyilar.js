/**
 * 🏖️ KIYILAR, DENİZLER, YARIMADALAR & ADALAR — Yazım Kaynağı
 * Derleyici: node tools/build_packs.js
 */
Object.assign(COGRAFYA_DATA_EXT, {
  kiyilar: [
    // ---------------- YARIMADALAR ----------------
    {
      id: "kiy_gelibolu",
      name: "Gelibolu Yarımadası",
      category: "kiyilar",
      type: "Yarımada / Kıyı Şekli",
      lat: 40.32, lng: 26.5,
      region: "Marmara",
      city: "Çanakkale (Gelibolu)",
      kpssNot: "Saros Körfezi ile Çanakkale Boğazı arasındadır. Tarihî yarımada ve millî park statüsüyle turizmde önemlidir."
    },
    {
      id: "kiy_kapidag",
      name: "Kapıdağ Yarımadası",
      category: "kiyilar",
      type: "Yarımada / Kıyı Şekli",
      lat: 40.45, lng: 27.87,
      region: "Marmara",
      city: "Balıkesir (Erdek - Bandırma)",
      promptTitle: "Eskiden bir ada iken kıyı oku ile karaya bağlanmış, Türkiye'nin en tipik TOMBOLO örneği olan yarımada haritada neresidir?",
      kpssNot: "Eskiden ADAYDI; kıyı okunun karaya bağlamasıyla yarımada oldu. Türkiye'nin en tipik TOMBOLO (bağlanmış ada) örneğidir."
    },
    {
      id: "kiy_kocaeli_ym",
      name: "Kocaeli Yarımadası",
      category: "kiyilar",
      type: "Yarımada / Kıyı Şekli",
      lat: 40.85, lng: 29.6,
      region: "Marmara",
      city: "Kocaeli - İstanbul (Anadolu yakası)",
      kpssNot: "Karadeniz ile Marmara arasında yer alan, Türkiye'nin en alçak platosunu taşıyan yarımadadır. Sanayi yoğunluğu çok yüksektir."
    },
    {
      id: "kiy_biga",
      name: "Biga Yarımadası",
      category: "kiyilar",
      type: "Yarımada / Kıyı Şekli",
      lat: 40.05, lng: 27.0,
      region: "Marmara",
      city: "Çanakkale - Balıkesir",
      kpssNot: "Kaz Dağı bu yarımadadadır. Çanakkale Boğazı'nın doğusunda kalır; jeotermal ve maden kaynakları bakımından zengindir."
    },
    {
      id: "kiy_cesme_karaburun",
      name: "Çeşme - Karaburun Yarımadası",
      category: "kiyilar",
      type: "Yarımada / Kıyı Şekli",
      lat: 38.4, lng: 26.4,
      region: "Ege",
      city: "İzmir (Çeşme - Karaburun)",
      kpssNot: "Türkiye'nin en batı kesimlerindendir. Sürekli rüzgâr nedeniyle RES yatırımlarının ve rüzgâr sörfünün merkezidir."
    },
    {
      id: "kiy_datca",
      name: "Datça (Reşadiye) Yarımadası",
      category: "kiyilar",
      type: "Yarımada / Kıyı Şekli",
      lat: 36.72, lng: 27.7,
      region: "Ege",
      city: "Muğla (Datça)",
      kpssNot: "Ege ile Akdeniz'in buluştuğu, badem ve zeytiniyle ünlü uzun ve dar yarımadadır."
    },
    {
      id: "kiy_bodrum",
      name: "Bodrum Yarımadası",
      category: "kiyilar",
      type: "Yarımada / Kıyı Şekli",
      lat: 37.03, lng: 27.43,
      region: "Ege",
      city: "Muğla (Bodrum)",
      kpssNot: "Girintili çıkıntılı koylarıyla yat turizminin merkezidir. Halikarnas Mozolesi burada bulunuyordu."
    },
    {
      id: "kiy_teke",
      name: "Teke Yarımadası",
      category: "kiyilar",
      type: "Yarımada / Kıyı Şekli",
      lat: 36.7, lng: 29.8,
      region: "Akdeniz",
      city: "Antalya - Burdur (batı)",
      kpssNot: "Karstik yapısı ve Teke Platosu ile bilinir. Antalya Körfezi'nin batısında Dalmaçya tipi kıyıları taşır."
    },
    {
      id: "kiy_taseli_ym",
      name: "Taşeli (Anamur) Yarımadası",
      category: "kiyilar",
      type: "Yarımada / Kıyı Şekli",
      lat: 36.15, lng: 32.9,
      region: "Akdeniz",
      city: "Mersin (Anamur - Silifke)",
      kpssNot: "Türkiye'nin en güney noktası (Anamur - Kaledran Burnu) bu yarımadadadır. Kalker yapısı karstik şekiller üretir."
    },
    {
      id: "kiy_sinop_ym",
      name: "Sinop (İnceburun) Yarımadası",
      category: "kiyilar",
      type: "Yarımada / Kıyı Şekli",
      lat: 42.05, lng: 34.99,
      region: "Karadeniz",
      city: "Sinop",
      promptTitle: "Türkiye'nin en kuzey noktasını (İnceburun) taşıyan ve Karadeniz'in tek doğal limanını barındıran yarımada haritada neresidir?",
      kpssNot: "Türkiye'nin EN KUZEY noktası İnceburun buradadır. Karadeniz'in dalgalara en kapalı doğal limanı Sinop'tadır."
    },

    // ---------------- KÖRFEZLER ----------------
    {
      id: "kiy_izmit_korfezi",
      name: "İzmit Körfezi",
      category: "kiyilar",
      type: "Körfez / Kıyı Şekli",
      lat: 40.72, lng: 29.6,
      region: "Marmara",
      city: "Kocaeli - Yalova",
      kpssNot: "KAF'ın oluşturduğu tektonik çöküntüdür. Türkiye'nin en yoğun sanayi ve liman kuşağını barındırır."
    },
    {
      id: "kiy_edremit_korfezi",
      name: "Edremit Körfezi",
      category: "kiyilar",
      type: "Körfez / Kıyı Şekli",
      lat: 39.55, lng: 26.75,
      region: "Marmara",
      city: "Balıkesir (Edremit - Ayvalık)",
      kpssNot: "Kaz Dağı'nın güneyindedir. Zeytinciliğin merkezi ve oksijen oranı yüksek bir turizm alanıdır."
    },
    {
      id: "kiy_izmir_korfezi",
      name: "İzmir Körfezi",
      category: "kiyilar",
      type: "Körfez / Kıyı Şekli",
      lat: 38.44, lng: 26.95,
      region: "Ege",
      city: "İzmir",
      kpssNot: "Ege'nin en büyük doğal limanıdır. Gediz'in alüvyonları körfezi doldurduğu için nehir yatağı kuzeye çevrilmiştir."
    },
    {
      id: "kiy_gokova_korfezi",
      name: "Gökova Körfezi",
      category: "kiyilar",
      type: "Körfez / Kıyı Şekli",
      lat: 36.95, lng: 28.1,
      region: "Ege",
      city: "Muğla (Marmaris - Bodrum arası)",
      kpssNot: "Bodrum ve Datça yarımadaları arasındadır. Ege'nin en korunaklı koylarını barındıran mavi yolculuk rotasıdır."
    },
    {
      id: "kiy_antalya_korfezi",
      name: "Antalya Körfezi",
      category: "kiyilar",
      type: "Körfez / Kıyı Şekli",
      lat: 36.6, lng: 30.9,
      region: "Akdeniz",
      city: "Antalya",
      kpssNot: "Teke Yarımadası ile Taşeli arasındadır. Traverten falezleri ve Düden Şelalesi'nin denize döküldüğü kıyıdır."
    },
    {
      id: "kiy_iskenderun_korfezi",
      name: "İskenderun Körfezi",
      category: "kiyilar",
      type: "Körfez / Kıyı Şekli",
      lat: 36.6, lng: 35.9,
      region: "Akdeniz",
      city: "Hatay - Adana",
      kpssNot: "Türkiye'nin en doğudaki körfezidir. Demir-çelik sanayisi ve Ceyhan petrol terminali burada yer alır."
    },
    {
      id: "kiy_saros_korfezi",
      name: "Saros Körfezi",
      category: "kiyilar",
      type: "Körfez / Kıyı Şekli",
      lat: 40.55, lng: 26.6,
      region: "Marmara",
      city: "Çanakkale - Edirne",
      kpssNot: "KAF'ın batı ucunda yer alan tektonik körfezdir. Akıntı yapısı nedeniyle Türkiye'nin en temiz denizlerinden sayılır."
    },

    // ---------------- BURUNLAR (UÇ NOKTALAR) ----------------
    {
      id: "kiy_inceburun",
      name: "İnceburun (En Kuzey Nokta)",
      category: "kiyilar",
      type: "Burun / Uç Nokta",
      lat: 42.09, lng: 34.98,
      region: "Karadeniz",
      city: "Sinop",
      kpssNot: "Türkiye'nin EN KUZEY noktasıdır (yaklaşık 42° K). En uzun gündüz ve en kısa gece burada yaşanır."
    },
    {
      id: "kiy_anamur_burnu",
      name: "Anamur (Kaledran) Burnu — En Güney Nokta",
      shortName: "Anamur Burnu",
      category: "kiyilar",
      type: "Burun / Uç Nokta",
      lat: 36.01, lng: 32.8,
      region: "Akdeniz",
      city: "Mersin (Anamur)",
      kpssNot: "Türkiye'nin EN GÜNEY noktasıdır (yaklaşık 36° K). Güneş ışınlarını en dik alan, yıllık sıcaklık ortalaması en yüksek yerdir."
    },
    {
      id: "kiy_baba_burnu",
      name: "Baba Burnu (Anakaranın En Batısı)",
      shortName: "Baba Burnu",
      category: "kiyilar",
      type: "Burun / Uç Nokta",
      lat: 39.46, lng: 26.06,
      region: "Marmara",
      city: "Çanakkale (Ayvacık)",
      kpssNot: "Türkiye ANAKARASININ en batı noktasıdır. Ülkenin en batısı ise Gökçeada'daki Avlaka Burnu'dur; güneş en geç buradan doğar."
    },

    // ---------------- ADALAR ----------------
    {
      id: "kiy_gokceada",
      name: "Gökçeada (En Büyük Ada)",
      shortName: "Gökçeada",
      category: "kiyilar",
      type: "Ada / Kıyı Şekli",
      lat: 40.19, lng: 25.9,
      region: "Marmara",
      city: "Çanakkale",
      promptTitle: "Türkiye'nin en büyük adası olan ve ülkenin en batı noktasını (Avlaka Burnu) taşıyan ada haritada neresidir?",
      kpssNot: "Türkiye'nin EN BÜYÜK adasıdır. Ülkenin en batı noktası Avlaka Burnu buradadır. Sakin şehir (cittaslow) ilan edilmiştir."
    },
    {
      id: "kiy_bozcaada",
      name: "Bozcaada",
      category: "kiyilar",
      type: "Ada / Kıyı Şekli",
      lat: 39.83, lng: 26.04,
      region: "Marmara",
      city: "Çanakkale",
      kpssNot: "Türkiye'nin üçüncü büyük adasıdır. Bağcılık ve rüzgâr enerjisiyle bilinir; Çanakkale Boğazı'nın girişini denetler."
    },
    {
      id: "kiy_marmara_adasi",
      name: "Marmara Adası",
      category: "kiyilar",
      type: "Ada / Kıyı Şekli",
      lat: 40.6, lng: 27.57,
      region: "Marmara",
      city: "Balıkesir",
      kpssNot: "Türkiye'nin ikinci büyük adasıdır. Adını verdiği mermer (marmaros) yataklarıyla ünlüdür."
    },
    {
      id: "kiy_prens_adalari",
      name: "Prens Adaları (Büyükada)",
      category: "kiyilar",
      type: "Ada / Kıyı Şekli",
      lat: 40.86, lng: 29.12,
      region: "Marmara",
      city: "İstanbul",
      kpssNot: "Marmara Denizi'ndeki dokuz adadan oluşur. Kocaeli Yarımadası'nın sular altında kalmış uzantılarıdır."
    },

    // ---------------- KIYI TİPLERİ ----------------
    {
      id: "kiy_tipi_ria",
      name: "Ria Tipi Kıyı (Haliç Kıyıları)",
      shortName: "Ria Tipi Kıyı",
      category: "kiyilar",
      type: "Kıyı Tipi / Boğulmuş Vadi",
      lat: 41.05, lng: 28.95,
      region: "Marmara",
      city: "İstanbul - Karadeniz (batı)",
      promptTitle: "Deniz seviyesinin yükselmesiyle akarsu vadilerinin sular altında kalmasıyla oluşan kıyı tipinin Türkiye'deki tipik örneği haritada neresidir?",
      kpssNot: "Akarsu vadilerinin deniz suları altında kalmasıyla oluşur. İstanbul Boğazı ve Haliç en tipik örnektir; doğal liman oluşturur."
    },
    {
      id: "kiy_tipi_dalmacya",
      name: "Dalmaçya Tipi Kıyı",
      shortName: "Dalmaçya Tipi Kıyı",
      category: "kiyilar",
      type: "Kıyı Tipi / Boyuna Kıyı",
      shapeType: "polyline",
      coordinates: [[36.2, 29.6], [36.35, 30.2], [36.6, 30.6]],
      lat: 36.35, lng: 30.2,
      region: "Akdeniz",
      city: "Antalya (Kaş - Kalkan - Finike)",
      promptTitle: "Kıyıya PARALEL uzanan dağların sular altında kalarak uzun adalar oluşturduğu kıyı tipi Türkiye'de haritada neresidir?",
      kpssNot: "Kıyıya PARALEL uzanan dağların sular altında kalmasıyla oluşur; kıyıya paralel uzun adalar görülür. Türkiye'de Kaş-Kalkan arasında tipiktir."
    },
    {
      id: "kiy_tipi_enine",
      name: "Enine (Ege) Tipi Kıyı",
      shortName: "Enine Tipi Kıyı",
      category: "kiyilar",
      type: "Kıyı Tipi / Enine Kıyı",
      lat: 38.2, lng: 26.9,
      region: "Ege",
      city: "İzmir - Aydın - Muğla",
      kpssNot: "Dağların kıyıya DİK uzanmasıyla oluşur; girintili çıkıntılı, koy ve körfezi bol kıyı ortaya çıkar. Türkiye'nin en uzun kıyı çizgisini üretir."
    },
    {
      id: "kiy_tipi_boyuna",
      name: "Boyuna (Karadeniz) Tipi Kıyı",
      shortName: "Boyuna Tipi Kıyı",
      category: "kiyilar",
      type: "Kıyı Tipi / Boyuna Kıyı",
      shapeType: "polyline",
      coordinates: [[41.0, 36.5], [41.1, 38.4], [41.05, 40.5], [41.3, 41.5]],
      lat: 41.1, lng: 38.4,
      region: "Karadeniz",
      city: "Samsun - Rize arası",
      kpssNot: "Dağların kıyıya PARALEL uzanmasıyla oluşur; kıyı sade ve düzdür, doğal liman azdır. Karadeniz kıyısının temel özelliğidir."
    },
    {
      id: "kiy_tipi_falez",
      name: "Falezli (Yalıyar) Kıyı",
      shortName: "Falezli Kıyı",
      category: "kiyilar",
      type: "Kıyı Tipi / Aşınım",
      lat: 36.86, lng: 30.65,
      region: "Akdeniz",
      city: "Antalya (traverten falezleri)",
      kpssNot: "Dalga aşındırmasıyla oluşan dik kıyı yamacıdır. Antalya travertenlerinde ve Karadeniz'in dik kıyılarında tipiktir."
    },
    {
      id: "kiy_tipi_lagun",
      name: "Kıyı Set Gölü (Lagün) Kıyısı",
      shortName: "Lagünlü Kıyı",
      category: "kiyilar",
      type: "Kıyı Tipi / Birikim",
      lat: 41.33, lng: 28.6,
      region: "Marmara",
      city: "İstanbul (Terkos - Büyükçekmece)",
      kpssNot: "Kıyı okunun bir koyun ağzını kapatmasıyla oluşan göllerdir. Terkos, Büyükçekmece ve Akyatan tipik örneklerdir."
    },

    // ---------------- DENİZLER ----------------
    {
      id: "kiy_karadeniz",
      name: "Karadeniz",
      category: "kiyilar",
      type: "Deniz / Su Kütlesi",
      shapeType: "polygon",
      coordinates: [[41.6, 28.0], [43.0, 29.0], [43.0, 41.5], [41.4, 41.6], [41.2, 36.0], [41.3, 31.5]],
      lat: 42.2, lng: 35.0,
      region: "Karadeniz",
      city: "Kuzey kıyıları",
      kpssNot: "Tuzluluğu EN AZ denizimizdir (‰18); bol akarsu boşalımı ve az buharlaşma nedeniyle. 200 m altı oksijensizdir; balık çeşidi azdır ama miktarı fazladır."
    },
    {
      id: "kiy_akdeniz",
      name: "Akdeniz",
      category: "kiyilar",
      type: "Deniz / Su Kütlesi",
      shapeType: "polygon",
      coordinates: [[36.0, 28.5], [36.1, 33.0], [36.4, 36.0], [35.0, 35.5], [34.8, 29.5]],
      lat: 35.6, lng: 32.5,
      region: "Akdeniz",
      city: "Güney kıyıları",
      kpssNot: "Tuzluluğu EN FAZLA denizimizdir (‰39); buharlaşma çok, akarsu boşalımı azdır. Suyu en berrak ve en sıcak denizimizdir."
    },
    {
      id: "kiy_marmara_denizi",
      name: "Marmara Denizi",
      category: "kiyilar",
      type: "Deniz / Su Kütlesi",
      shapeType: "polygon",
      coordinates: [[40.4, 26.9], [41.0, 27.6], [41.0, 29.3], [40.4, 29.4], [40.3, 27.5]],
      lat: 40.7, lng: 28.3,
      region: "Marmara",
      city: "İstanbul - Balıkesir - Bursa arası",
      promptTitle: "Tamamı Türkiye sınırları içinde kalan, iki katlı akıntı sistemine sahip iç deniz haritada neresidir?",
      kpssNot: "Tamamı Türkiye sınırları içindeki TEK denizdir (iç deniz). Üstte Karadeniz'den az tuzlu, altta Akdeniz'den çok tuzlu su akar: İKİ KATLI akıntı."
    }
  ]
});
