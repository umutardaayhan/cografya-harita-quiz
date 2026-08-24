/**
 * 👥 NÜFUS, YERLEŞME & GÖÇ — Yazım Kaynağı
 * Derleyici: node tools/build_packs.js
 */
Object.assign(COGRAFYA_DATA_EXT, {
  nufus: [
    {
      id: "nuf_istanbul",
      name: "İstanbul Metropolü",
      shortName: "En Kalabalık İl",
      category: "nufus",
      type: "Yoğun Nüfus / Metropol",
      lat: 41.01, lng: 28.98,
      region: "Marmara",
      city: "İstanbul",
      promptTitle: "Türkiye nüfusunun yaklaşık altıda birini barındıran, sanayi ve ticaretin yoğunlaştığı en kalabalık il haritada neresidir?",
      kpssNot: "Türkiye'nin EN KALABALIK ve nüfus yoğunluğu EN YÜKSEK ilidir. Sanayi, ticaret ve hizmet sektörünün toplanması sürekli göç çeker."
    },
    {
      id: "nuf_ankara",
      name: "Ankara",
      category: "nufus",
      type: "Yoğun Nüfus / Metropol",
      lat: 39.93, lng: 32.86,
      region: "İç Anadolu",
      city: "Ankara",
      kpssNot: "Başkent olması nedeniyle kamu hizmetleri ve üniversitelerle büyümüştür. Nüfus artışı doğal artıştan çok GÖÇ kaynaklıdır."
    },
    {
      id: "nuf_izmir",
      name: "İzmir",
      category: "nufus",
      type: "Yoğun Nüfus / Metropol",
      lat: 38.42, lng: 27.14,
      region: "Ege",
      city: "İzmir",
      kpssNot: "Liman, sanayi ve tarımsal hinterlandın birleştiği üçüncü büyük metropoldür. Ege Bölgesi'nin göç odağıdır."
    },
    {
      id: "nuf_bursa_kocaeli",
      name: "Bursa - Kocaeli Sanayi Kuşağı",
      shortName: "Marmara Sanayi Kuşağı",
      category: "nufus",
      type: "Yoğun Nüfus / Sanayi Kuşağı",
      shapeType: "polygon",
      coordinates: [[40.1, 28.7], [40.5, 29.2], [40.9, 30.5], [40.6, 30.9], [40.05, 29.6]],
      lat: 40.4, lng: 29.7,
      region: "Marmara",
      city: "Bursa - Kocaeli - Sakarya",
      promptTitle: "Otomotiv ve kimya sanayisinin yoğunlaştığı, Türkiye'nin en çok göç alan sanayi kuşağı haritada neresidir?",
      kpssNot: "Otomotiv, kimya ve tekstilin yoğunlaştığı kuşaktır. İş olanakları nedeniyle Türkiye'nin en çok göç alan alanlarındandır."
    },
    {
      id: "nuf_cukurova",
      name: "Çukurova Nüfus Yoğunluğu",
      shortName: "Çukurova Yoğunluğu",
      category: "nufus",
      type: "Yoğun Nüfus / Tarımsal",
      shapeType: "polygon",
      coordinates: [[36.6, 34.9], [37.1, 35.2], [37.05, 36.2], [36.5, 35.8], [36.45, 35.1]],
      lat: 36.85, lng: 35.5,
      region: "Akdeniz",
      city: "Adana - Mersin - Osmaniye",
      kpssNot: "Verimli alüvyal toprak, sulama ve ulaşım kolaylığı nüfusu yoğunlaştırır. Pamuk hasadı nedeniyle MEVSİMLİK göç alır."
    },
    {
      id: "nuf_gaziantep",
      name: "Gaziantep",
      category: "nufus",
      type: "Yoğun Nüfus / Sanayi Kuşağı",
      lat: 37.07, lng: 37.38,
      region: "Güneydoğu Anadolu",
      city: "Gaziantep",
      kpssNot: "Güneydoğu'nun sanayi merkezidir; halı, gıda ve makine üretimiyle bölgesinden göç ALAN nadir illerdendir."
    },
    {
      id: "nuf_antalya",
      name: "Antalya",
      category: "nufus",
      type: "Yoğun Nüfus / Turizm",
      lat: 36.89, lng: 30.71,
      region: "Akdeniz",
      city: "Antalya",
      kpssNot: "Turizm ve seracılık nedeniyle hızlı büyür. Yaz aylarında nüfusu birkaç katına çıkan tipik TURİZM göçü örneğidir."
    },
    {
      id: "nuf_hakkari_seyrek",
      name: "Hakkâri - Şırnak Seyrek Nüfus Alanı",
      shortName: "Hakkâri Seyrek Nüfus",
      category: "nufus",
      type: "Seyrek Nüfus / Engebeli",
      shapeType: "polygon",
      coordinates: [[37.2, 42.6], [37.9, 42.8], [38.0, 44.4], [37.4, 44.5], [37.15, 43.4]],
      lat: 37.6, lng: 43.5,
      region: "Doğu Anadolu",
      city: "Hakkâri - Şırnak",
      promptTitle: "Yükselti, engebe ve sert kış koşulları nedeniyle Türkiye'de nüfusun en seyrek olduğu alanlardan biri haritada neresidir?",
      kpssNot: "Seyrek nüfusun nedenleri: yüksek engebe, sert kış, tarım alanı azlığı ve ulaşım güçlüğü. Türkiye'nin en az yoğun kesimlerindendir."
    },
    {
      id: "nuf_erzurum_kars_seyrek",
      name: "Erzurum - Kars Platoları Seyrek Nüfus",
      shortName: "Erzurum-Kars Seyrekliği",
      category: "nufus",
      type: "Seyrek Nüfus / Karasal",
      shapeType: "polygon",
      coordinates: [[39.9, 41.0], [40.8, 41.4], [41.3, 43.3], [40.4, 43.7], [39.8, 42.4]],
      lat: 40.6, lng: 42.3,
      region: "Doğu Anadolu",
      city: "Erzurum - Kars - Ardahan",
      kpssNot: "Yükselti ve sert karasal iklim tarımı sınırlar; nüfus seyrektir ve sürekli GÖÇ VERİR. Ekonomi mera hayvancılığına dayanır."
    },
    {
      id: "nuf_menteşe_seyrek",
      name: "Menteşe - Teke Yöresi Seyrek Nüfus",
      shortName: "Menteşe Seyrekliği",
      category: "nufus",
      type: "Seyrek Nüfus / Engebeli",
      lat: 37.05, lng: 29.4,
      region: "Ege",
      city: "Muğla - Burdur - Antalya (iç kesim)",
      kpssNot: "Karstik yapı ve engebe nedeniyle tarım alanı azdır; yüzey suyu yetersizdir. Kıyıdaki turizm yoğunluğunun tam tersi bir tabloyu gösterir."
    },
    {
      id: "nuf_taseli_seyrek",
      name: "Taşeli Platosu Seyrek Nüfus",
      shortName: "Taşeli Seyrekliği",
      category: "nufus",
      type: "Seyrek Nüfus / Karstik",
      lat: 36.75, lng: 33.3,
      region: "Akdeniz",
      city: "Mersin - Karaman (Taşeli)",
      kpssNot: "Kalker yapı suyu yer altına kaçırır; tarım yapılamaz. Kıl keçisi yetiştiriciliği yapılan, nüfusun en seyrek olduğu platolardandır."
    },
    {
      id: "nuf_yildiz_seyrek",
      name: "Yıldız (Istranca) Dağları Seyrek Nüfus",
      shortName: "Istranca Seyrekliği",
      category: "nufus",
      type: "Seyrek Nüfus / Ormanlık",
      lat: 41.75, lng: 27.4,
      region: "Marmara",
      city: "Kırklareli - Edirne",
      kpssNot: "Ormanlık ve engebeli olduğu için Trakya'nın en seyrek nüfuslu kesimidir; tarım alanları sınırlıdır."
    },
    {
      id: "nuf_goc_veren_dogu",
      name: "Göç Veren Alanlar (Doğu & Güneydoğu)",
      shortName: "Göç Veren Alanlar",
      category: "nufus",
      type: "Göç / Veren Bölge",
      shapeType: "polygon",
      coordinates: [[37.2, 38.5], [39.4, 39.0], [40.2, 42.0], [38.6, 44.3], [37.3, 43.5], [36.9, 40.0]],
      lat: 38.5, lng: 41.0,
      region: "Doğu Anadolu",
      city: "Doğu ve Güneydoğu Anadolu",
      promptTitle: "İş olanaklarının kısıtlılığı ve tarımda makineleşme nedeniyle Türkiye'de en fazla göç veren alan haritada neresidir?",
      kpssNot: "Göç verme nedenleri: iş olanaklarının azlığı, tarımda makineleşme, eğitim-sağlık hizmetlerinin sınırlılığı ve olumsuz iklim koşulları."
    },
    {
      id: "nuf_goc_alan_bati",
      name: "Göç Alan Alanlar (Marmara & Ege Kıyıları)",
      shortName: "Göç Alan Alanlar",
      category: "nufus",
      type: "Göç / Alan Bölge",
      shapeType: "polygon",
      coordinates: [[37.8, 26.8], [39.5, 26.6], [41.3, 27.2], [41.2, 30.5], [40.3, 30.2], [38.3, 27.9]],
      lat: 39.8, lng: 28.2,
      region: "Marmara",
      city: "İstanbul - Kocaeli - Bursa - İzmir",
      kpssNot: "Göç alma nedenleri: sanayileşme, iş olanakları, eğitim ve sağlık hizmetlerinin gelişmişliği. Sonuç: çarpık kentleşme ve altyapı yetersizliği."
    },
    {
      id: "nuf_mevsimlik_findik",
      name: "Mevsimlik Göç (Fındık Hasadı)",
      shortName: "Fındık Mevsimlik Göçü",
      category: "nufus",
      type: "Göç / Mevsimlik",
      lat: 40.98, lng: 37.88,
      region: "Karadeniz",
      city: "Ordu - Giresun - Trabzon",
      kpssNot: "Ağustos-Eylül'de fındık hasadı için Güneydoğu'dan işçi göçü olur. Mevsimlik göç NÜFUSUN daimî dağılışını değiştirmez."
    },
    {
      id: "nuf_yayla_gocu",
      name: "Yaylacılık (Mevsimlik Yayla Göçü)",
      shortName: "Yayla Göçü",
      category: "nufus",
      type: "Göç / Mevsimlik",
      lat: 40.65, lng: 40.3,
      region: "Karadeniz",
      city: "Rize - Trabzon - Giresun yaylaları",
      kpssNot: "Yaz aylarında hayvanları otlatmak için yükseklere çıkılır. Türkiye'de en yaygın MEVSİMLİK yerleşme biçimidir; Toroslar'da da görülür."
    },
    {
      id: "nuf_beyin_gocu",
      name: "Beyin Göçü Odağı (Büyükşehirler)",
      shortName: "Beyin Göçü",
      category: "nufus",
      type: "Göç / Beyin Göçü",
      lat: 39.93, lng: 32.86,
      region: "İç Anadolu",
      city: "İstanbul - Ankara - İzmir",
      kpssNot: "Nitelikli iş gücünün yurt dışına ya da büyük kentlere gitmesidir. Kaynak bölge için kayıp, hedef bölge için kazançtır."
    },
    {
      id: "nuf_en_az_bayburt",
      name: "Bayburt (En Az Nüfuslu İl)",
      shortName: "En Az Nüfuslu İl",
      category: "nufus",
      type: "Seyrek Nüfus / Karasal",
      lat: 40.26, lng: 40.22,
      region: "Karadeniz",
      city: "Bayburt",
      promptTitle: "Türkiye'nin nüfusu en az olan ili haritada neresidir?",
      kpssNot: "Türkiye'nin nüfusu EN AZ olan ilidir. Yükselti, dar tarım alanı ve sürekli göç vermesi başlıca nedenlerdir. Tunceli ve Ardahan da en az nüfuslular arasındadır."
    },
    {
      id: "nuf_yerlesme_kom_oba",
      name: "Geçici Yerleşmeler (Kom - Oba - Dam)",
      shortName: "Geçici Yerleşmeler",
      category: "nufus",
      type: "Yerleşme / Geçici",
      lat: 39.2, lng: 41.5,
      region: "Doğu Anadolu",
      city: "Doğu Anadolu - Toroslar",
      kpssNot: "Kom, oba, ağıl, dam ve yayla GEÇİCİ (mevsimlik) yerleşmelerdir. Hayvancılık ve tarım amaçlı kurulur; yıl boyu oturulmaz."
    },
    {
      id: "nuf_yerlesme_dagınık",
      name: "Dağınık Yerleşme Dokusu",
      shortName: "Dağınık Yerleşme",
      category: "nufus",
      type: "Yerleşme / Kırsal Doku",
      lat: 40.9, lng: 39.7,
      region: "Karadeniz",
      city: "Doğu Karadeniz",
      promptTitle: "Su kaynağının bol, arazinin engebeli olması nedeniyle evlerin birbirinden uzak kurulduğu dağınık yerleşme dokusunun tipik alanı haritada neresidir?",
      kpssNot: "Su bolluğu ve engebe evlerin dağılmasına yol açar. Tersine, suyun kıt olduğu İç Anadolu'da TOPLU yerleşme görülür."
    },
    {
      id: "nuf_yerlesme_toplu",
      name: "Toplu Yerleşme Dokusu",
      shortName: "Toplu Yerleşme",
      category: "nufus",
      type: "Yerleşme / Kırsal Doku",
      lat: 38.9, lng: 33.2,
      region: "İç Anadolu",
      city: "Konya - Aksaray - Karaman",
      kpssNot: "Su kaynağının kıt ve arazinin düz olduğu yerlerde evler su başında toplanır. İç Anadolu ve Güneydoğu'nun tipik dokusudur."
    },
    {
      id: "nuf_artis_sanliurfa",
      name: "En Yüksek Nüfus Artışı (Şanlıurfa - Şırnak)",
      shortName: "En Hızlı Nüfus Artışı",
      category: "nufus",
      type: "Yoğun Nüfus / Doğal Artış",
      lat: 37.16, lng: 38.8,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa - Şırnak",
      kpssNot: "Türkiye'de doğal nüfus artış hızının EN YÜKSEK olduğu illerdir. Geniş aile yapısı ve genç nüfus oranının yüksekliği temel nedendir."
    }
  ]
});
