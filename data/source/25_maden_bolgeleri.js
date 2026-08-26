/**
 * ⛏️ MADENLER BÖLGE HARİTASI (HAVZALAR & KUŞAKLAR) — Yazım Kaynağı
 * Derleyici: node tools/build_packs.js
 * 
 * 23 Maden için şehir noktaları yerine bölgesel poligon havzalarını kapsar.
 */
Object.assign(COGRAFYA_DATA_EXT, {
  maden_bolgeleri: [
    {
      id: "mad_bolge_demir",
      name: "Demir Havzaları",
      shortName: "Demir Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [40.95, 30.40], [39.90, 27.20], [38.00, 27.10], [36.80, 35.20],
        [37.40, 37.20], [38.70, 38.30], [39.60, 38.40], [40.20, 35.50],
        [40.95, 30.40]
      ],
      lat: 38.85, lng: 35.50,
      type: "Metalik Maden / Sanayi Girdisi",
      region: "İç & Doğu Anadolu - Akdeniz - Ege - Marmara",
      city: "Sivas (Divriği), Malatya (Hekimhan), Maraş, Adana, Sakarya, Balıkesir, İzmir",
      promptTitle: "Divriği, Hekimhan, Maraş, Adana, Sakarya ve Ege hattını kapsayan Türkiye'nin en zengin demir havzası haritada neresidir?",
      kpssNot: "Türkiye'nin en önemli demir sahalarıdır. Sivas Divriği en zengin yataktır; Malatya Hekimhan-Hasançelebi, Sakarya Çamdağı, Balıkesir Eymir ve İzmir Torbalı diğer ana sahalardır. Karabük, Ereğli ve İskenderun demir-çelik tesislerini besler."
    },
    {
      id: "mad_bolge_bakir",
      name: "Bakır Havzaları",
      shortName: "Bakır Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [42.10, 33.50], [41.60, 41.80], [40.80, 41.90], [37.70, 42.10],
        [37.90, 39.50], [39.80, 38.00], [39.30, 27.60], [40.10, 28.20],
        [41.20, 33.30], [42.10, 33.50]
      ],
      lat: 40.30, lng: 37.50,
      type: "Metalik Maden / İhraç",
      region: "Karadeniz - Doğu & Güneydoğu Anadolu - Marmara",
      city: "Artvin (Murgul), Rize (Çayeli), Giresun, Kastamonu (Küre), Elazığ (Maden), Diyarbakır (Ergani), Siirt (Madenköy), Balıkesir",
      promptTitle: "Murgul, Çayeli, Küre, Ergani ve Madenköy yataklarını içine alan Türkiye bakır üretim kuşağı haritada neresidir?",
      kpssNot: "Elektrik-elektronik sanayisinin temel hammaddesidir. Karadeniz kuşağında Artvin (Murgul), Rize (Çayeli), Kastamonu (Küre); Güneydoğu kuşağında Elazığ (Maden), Diyarbakır (Ergani), Siirt (Madenköy) ana sahalardır. Samsun ve Elazığ'da izabe tesisleri bulunur."
    },
    {
      id: "mad_bolge_krom",
      name: "Krom Havzaları",
      shortName: "Krom Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [40.30, 40.70], [38.20, 39.80], [36.80, 35.10], [36.50, 28.60],
        [37.20, 28.50], [39.80, 28.80], [40.00, 30.80], [39.50, 36.50],
        [40.30, 40.70]
      ],
      lat: 38.60, lng: 34.50,
      type: "Metalik Maden / İhraç",
      region: "Doğu Anadolu - Ege - Akdeniz - Marmara",
      city: "Elazığ (Guleman), Muğla (Köyceğiz), Bursa (Orhaneli), Eskişehir, Adana, Kop Dağı",
      promptTitle: "Guleman, Köyceğiz-Fethiye, Pozantı, Orhaneli ve Kop Dağı ofiyolitik kuşaklarını kapsayan krom havzası haritada neresidir?",
      kpssNot: "Paslanmaz çelik üretiminin ve kaplama sanayisinin vazgeçilmezidir. Türkiye dünya üretiminde ilk sıralardadır. Elazığ (Guleman) en zengin yataktır; Muğla (Köyceğiz-Fethiye), Adana (Pozantı), Bursa (Orhaneli) ve Kop Dağı diğer ana sahalardır. Antalya ve Elazığ'da ferrokrom tesisleri bulunur."
    },
    {
      id: "mad_bolge_boksit",
      name: "Boksit (Alüminyum) Havzaları",
      shortName: "Boksit Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [41.60, 31.60], [38.20, 36.30], [36.40, 36.30], [36.70, 31.60],
        [37.00, 27.50], [37.60, 27.90], [37.70, 32.20], [41.10, 32.10],
        [41.60, 31.60]
      ],
      lat: 37.80, lng: 32.50,
      type: "Metalik Maden / Sanayi Girdisi",
      region: "Akdeniz - İç Anadolu - Ege - Karadeniz",
      city: "Konya (Seydişehir), Antalya (Akseki), Muğla (Milas), Adana, Hatay, Zonguldak",
      promptTitle: "Seydişehir, Akseki, Milas, Adana-Hatay ve Zonguldak boksit sahalarını kapsayan alüminyum hammaddesi kuşağı haritada neresidir?",
      kpssNot: "Alüminyum metalinin hammaddesidir. En önemli yatak Konya Seydişehir ve Antalya Akseki hattındadır; Seydişehir'de Türkiye'nin tek entegre alüminyum tesisi yer alır. Muğla Milas, Adana Saimbeyli, Hatay Payas ve Zonguldak diğer yataklardır."
    },
    {
      id: "mad_bolge_bentonit",
      name: "Bentonit Havzaları",
      shortName: "Bentonit Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [41.80, 26.00], [40.40, 26.20], [37.50, 32.20], [38.20, 33.20],
        [40.10, 37.60], [41.20, 38.60], [41.30, 37.00], [41.00, 33.40],
        [41.80, 26.00]
      ],
      lat: 40.20, lng: 34.50,
      type: "Endüstriyel Hammadde / Kil",
      region: "Karadeniz - İç Anadolu - Marmara",
      city: "Edirne, Konya, Çankırı, Tokat, Ordu, Giresun",
      promptTitle: "Ordu (Ünye-Fatsa), Tokat (Reşadiye), Çankırı, Konya ve Edirne bentonit kil sahalarını içine alan bölge haritada neresidir?",
      kpssNot: "Sondaj çamuru, döküm kumu, kedi kumu ve arıtma sanayisinde kullanılan yüksek su tutma kapasiteli kildir. Ordu (Ünye-Fatsa), Tokat (Reşadiye), Çankırı, Konya ve Edirne (Enez) ana üretim sahalarıdır; Türkiye önemli bir ihracatçıdır."
    },
    {
      id: "mad_bolge_bor",
      name: "Bor Havzası",
      shortName: "Bor Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [40.40, 27.80], [40.10, 29.20], [39.50, 30.80], [39.00, 30.60],
        [39.10, 29.00], [39.20, 28.00], [39.80, 27.70], [40.40, 27.80]
      ],
      lat: 39.60, lng: 29.10,
      type: "Endüstriyel Hammadde / İhraç (Dünya Lideri)",
      region: "Güney Marmara & İç Batı Anadolu",
      city: "Balıkesir (Bandırma / Bigadiç), Bursa (Kestelek), Eskişehir (Kırka), Kütahya (Emet)",
      promptTitle: "Dünya rezervlerinin yaklaşık %73'ünü oluşturan Bigadiç, Kestelek, Emet ve Kırka bor yatakları havzası haritada neresidir?",
      kpssNot: "Türkiye dünya bor rezervinin yaklaşık %73'üne sahiptir ve DÜNYA LİDERİDİR. Balıkesir (Bigadiç, Susurluk), Bursa (Mustafakemalpaşa/Kestelek), Kütahya (Emet) ve Eskişehir (Seyitgazi/Kırka) 4 ana havzadır. Bandırma ve Kırka'da bor işleme tesisleri bulunur."
    },
    {
      id: "mad_bolge_kukurt",
      name: "Kükürt Sahası",
      shortName: "Kükürt Yatağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [38.05, 30.15], [38.05, 30.45], [37.85, 30.45], [37.85, 30.15],
        [38.05, 30.15]
      ],
      lat: 37.95, lng: 30.30,
      type: "Endüstriyel Hammadde / Kimya",
      region: "Akdeniz (Göller Yöresi)",
      city: "Isparta (Keçiborlu)",
      promptTitle: "Sülfürik asit, gübre ve kimya sanayisinin girdisi olan Isparta Keçiborlu kükürt üretim alanı haritada neresidir?",
      kpssNot: "Kimya, gübre ve tarım ilacı sanayisinin temel girdisidir. Türkiye'nin en bilinen kükürt sahası Isparta Keçiborlu'dur."
    },
    {
      id: "mad_bolge_fosfat",
      name: "Fosfat Havzası",
      shortName: "Fosfat Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [39.10, 40.40], [38.60, 42.30], [38.00, 42.20], [37.20, 40.80],
        [36.90, 38.60], [37.60, 38.00], [38.20, 38.40], [39.10, 40.40]
      ],
      lat: 37.90, lng: 40.20,
      type: "Endüstriyel Hammadde / Gübre",
      region: "Güneydoğu Anadolu & Doğu Anadolu",
      city: "Mardin (Mazıdağı), Adıyaman, Şanlıurfa, Bitlis, Bingöl",
      promptTitle: "Suni gübre sanayisinin hammaddesi olan Mazıdağı, Adıyaman, Şanlıurfa ve Bitlis-Bingöl fosfat kuşağı haritada neresidir?",
      kpssNot: "Yapay gübre sanayisinin ana girdisidir. En büyük yatak Mardin Mazıdağı'ndadır; Adıyaman, Şanlıurfa, Bitlis ve Bingöl diğer sahalardır. Üretimimiz iç tüketimi karşılamadığı için Kuzey Afrika ülkelerinden ithal edilir."
    },
    {
      id: "mad_bolge_civa",
      name: "Cıva Sahaları",
      shortName: "Cıva Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [38.70, 26.50], [38.40, 28.20], [38.00, 28.10], [38.10, 32.50],
        [38.40, 32.60], [38.50, 32.30], [38.10, 27.80], [38.70, 26.50]
      ],
      lat: 38.30, lng: 29.50,
      type: "Metalik Maden / Sıvı Metal",
      region: "Ege & İç Anadolu",
      city: "İzmir (Ödemiş), Konya (Sarayönü)",
      promptTitle: "Oda sıcaklığında sıvı halde bulunan tek metal olan ve Ödemiş ile Sarayönü sahalarında çıkarılan cıva bölgesi haritada neresidir?",
      kpssNot: "Doğada oda sıcaklığında sıvı halde bulunan tek metaldir. Tıpta, termometrelerde ve kimya sanayisinde kullanılır. İzmir (Ödemiş, Karaburun) ve Konya (Sarayönü) ana çıkarım sahalarıdır."
    },
    {
      id: "mad_bolge_kursun_cinko",
      name: "Kurşun-Çinko Havzaları",
      shortName: "Kurşun-Çinko Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [40.10, 26.80], [41.10, 38.50], [38.90, 39.00], [37.80, 35.80],
        [37.70, 34.80], [39.40, 35.80], [39.50, 27.80], [40.10, 26.80]
      ],
      lat: 39.20, lng: 34.00,
      type: "Metalik Maden / Ağır Sanayi",
      region: "Marmara - İç Anadolu - Karadeniz - Doğu Anadolu",
      city: "Çanakkale (Yenice), Balıkesir (Balya), Yozgat, Kayseri, Niğde, Giresun, Elazığ (Keban)",
      promptTitle: "Yenice, Balya, Keban, Yahyalı ve Çamardı yataklarını kapsayan kurşun-çinko madeni kuşağı haritada neresidir?",
      kpssNot: "Genellikle doğada birlikte bulunan metallerdir. Akü, pil, kablo yalıtımı ve pas önleyici kaplama sanayisinde kullanılır. Çanakkale (Yenice), Balıkesir (Balya), Elazığ (Keban), Yozgat (Akdağmadeni), Kayseri (Yahyalı), Niğde ve Giresun ana sahalardır."
    },
    {
      id: "mad_bolge_manganez",
      name: "Manganez Havzaları",
      shortName: "Manganez Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [41.60, 31.70], [41.30, 41.80], [40.80, 39.80], [36.80, 35.80],
        [37.40, 29.00], [37.80, 29.10], [41.20, 31.80], [41.60, 31.70]
      ],
      lat: 39.40, lng: 35.50,
      type: "Metalik Maden / Çelik Sertleştirici",
      region: "Ege - Karadeniz - Akdeniz",
      city: "Denizli (Tavas), Zonguldak (Ereğli), Adana, Trabzon, Artvin",
      promptTitle: "Demirin çeliğe dönüştürülmesinde sertleştirici olarak kullanılan Tavas, Ereğli, Adana ve Doğu Karadeniz manganez kuşağı haritada neresidir?",
      kpssNot: "Demir-çelik sanayisinde çeliğe sertlik ve dayanıklılık kazandırmak için kullanılan stratejik katkı maddesidir. Denizli (Tavas), Zonguldak (Ereğli), Adana (Ceyhan), Trabzon ve Artvin (Borçka) ana yataklardır."
    },
    {
      id: "mad_bolge_tuz",
      name: "Tuz Havzaları (Kaya, Göl & Deniz)",
      shortName: "Tuz Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [40.80, 33.40], [40.40, 43.80], [39.80, 44.20], [39.60, 42.00],
        [38.60, 33.60], [38.40, 26.70], [38.60, 27.00], [39.30, 33.20],
        [39.80, 35.20], [40.80, 33.40]
      ],
      lat: 39.60, lng: 36.50,
      type: "Endüstriyel Hammadde / Gıda & Kimya",
      region: "İç Anadolu - Doğu Anadolu - Ege",
      city: "İzmir (Çamaltı), Tuz Gölü, Çankırı, Nevşehir, Yozgat, Seyfe & Palas Gölleri, Sivas, Erzincan, Erzurum, Kars, Iğdır",
      promptTitle: "Çamaltı deniz tuzlası, Tuz Gölü ve Çankırı-Iğdır kaya tuzu yataklarını kapsayan geniş tuz üretim kuşağı haritada neresidir?",
      kpssNot: "Türkiye tuz üretiminin büyük bölümü Tuz Gölü'nden (göl tuzu), İzmir Çamaltı Tuzlası'ndan (deniz tuzu) ve Çankırı, Nevşehir, Yozgat, Sivas, Erzincan, Erzurum, Kars (Kağızman), Iğdır (Tuzluca) kaya tuzu madenlerinden karşılanır."
    },
    {
      id: "mad_bolge_mermer",
      name: "Mermer Havzaları",
      shortName: "Mermer Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [40.60, 27.60], [40.20, 30.20], [38.90, 39.80], [38.30, 39.70],
        [37.10, 28.50], [37.40, 28.20], [38.70, 30.40], [40.60, 27.60]
      ],
      lat: 39.10, lng: 33.50,
      type: "Endüstriyel Hammadde / Doğaltaş & İhraç (Lider)",
      region: "Ege - Marmara - Doğu Anadolu",
      city: "Bursa, Bilecik, Afyonkarahisar, Muğla, Elazığ",
      promptTitle: "Dünya rezervlerinin %40'ına sahip olduğumuz Afyon, Marmara Adası, Bilecik, Muğla ve Elazığ mermer sahaları haritada neresidir?",
      kpssNot: "Kalkerlerin metamorfizmaya uğramasıyla oluşur. Türkiye dünya mermer rezervinin yaklaşık %40'ına sahiptir ve en çok ihraç ettiğimiz madendir. Afyonkarahisar (şeker mermeri), Bursa (Marmara Adası), Bilecik (bej), Muğla (Yatağan) ve Elazığ (Vişne mermeri) dünyaca ünlüdür."
    },
    {
      id: "mad_bolge_zimpara_tasi",
      name: "Zımpara Taşı Kuşağı",
      shortName: "Zımpara Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [38.20, 27.20], [38.00, 29.20], [37.10, 29.30], [37.00, 27.40],
        [37.50, 27.10], [38.20, 27.20]
      ],
      lat: 37.60, lng: 28.20,
      type: "Endüstriyel Hammadde / Aşındırıcı & İhraç",
      region: "Ege Bölgesi (Menteşe Yöresi)",
      city: "İzmir (Tire), Aydın (Karacasu, Söke), Denizli, Muğla (Yatağan, Milas)",
      promptTitle: "Aşındırıcı sanayisinde kullanılan ve Menteşe yöresinde (İzmir, Aydın, Muğla, Denizli) yoğunlaşan zımpara taşı kuşağı haritada neresidir?",
      kpssNot: "Sert kristalli yapısıyla aşındırıcı ve parlatıcı sanayisinde kullanılır. Türkiye dünya üretiminde önemli paya sahiptir. İzmir (Tire), Aydın (Söke, Karacasu), Muğla (Milas, Yatağan) ve Denizli havzası ana üretim alanıdır."
    },
    {
      id: "mad_bolge_lule_oltu",
      name: "Lüle & Oltu Taşı Sahaları",
      shortName: "Süs Taşları Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [40.70, 41.80], [40.40, 42.20], [40.40, 41.80], [39.60, 30.80],
        [39.80, 30.40], [40.70, 41.80]
      ],
      lat: 40.10, lng: 36.20,
      type: "Endüstriyel Hammadde / Yöresel El Sanatları",
      region: "İç Anadolu & Doğu Anadolu",
      city: "Eskişehir (Lületaşı), Erzurum (Oltu Taşı)",
      promptTitle: "Pipo ve biblo yapımında kullanılan beyaz lületaşı (Eskişehir) ile tespih yapımında kullanılan siyah oltu taşının (Erzurum) sahaları haritada neresidir?",
      kpssNot: "Lületaşı (Beyaz Altın): Magnezyum ve silisyum kökenli hidrate magnezyum silikattır; dünyada neredeyse sadece Eskişehir'de çıkarılır. Oltu Taşı (Siyah Kehribar): Organik kökenli linyit türevi siyah süs taşıdır; yalnızca Erzurum Oltu ilçesinde çıkarılır."
    },
    {
      id: "mad_bolge_volfram",
      name: "Volfram (Tungsten) Havzası",
      shortName: "Volfram Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [40.20, 29.10], [40.10, 33.00], [39.90, 37.10], [39.50, 37.00],
        [39.60, 33.50], [39.90, 29.00], [40.20, 29.10]
      ],
      lat: 39.85, lng: 33.00,
      type: "Metalik Maden / Yüksek Isı Dirençli Metal",
      region: "Marmara & İç Anadolu",
      city: "Bursa (Uludağ), Ankara, Kırıkkale, Sivas",
      promptTitle: "Çok yüksek erime sıcaklığı nedeniyle ampul teli ve uzay-savunma sanayisinde kullanılan Uludağ, Ankara, Kırıkkale ve Sivas volfram kuşağı haritada neresidir?",
      kpssNot: "Erime sıcaklığı en yüksek metallerdendir (3422°C). Ampul teli (flaman), özel çelik sertleştirme, roket ve savunma sanayisinde kullanılır. En önemli yatak Bursa Uludağ'dadır; Ankara, Kırıkkale (Keskin) ve Sivas diğer yataklardır."
    },
    {
      id: "mad_bolge_feldispat",
      name: "Feldispat Sahası",
      shortName: "Feldispat Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [39.30, 28.80], [39.20, 29.20], [37.50, 28.30], [37.10, 27.60],
        [37.40, 27.50], [38.90, 28.10], [39.30, 28.80]
      ],
      lat: 38.20, lng: 28.40,
      type: "Endüstriyel Hammadde / Seramik & Cam & İhraç",
      region: "Ege Bölgesi",
      city: "Kütahya, Manisa, Muğla (Milas - Çine Kuşağı)",
      promptTitle: "Seramik, cam ve porselen sanayisinin temel girdisi olup Türkiye'nin dünya ihracat lideri olduğu Kütahya, Manisa ve Muğla-Aydın feldispat sahası haritada neresidir?",
      kpssNot: "Seramik, porselen, cam ve kaynak elektrodu sanayisinin vazgeçilmez hammaddesidir. Türkiye dünya feldispat ihracatında LİDERDİR. Muğla (Milas), Aydın (Çine), Manisa (Demirci, Gördes) ve Kütahya (Simav) ana çıkarım merkezleridir; Güllük Limanı'ndan ihraç edilir."
    },
    {
      id: "mad_bolge_asfaltit",
      name: "Asfaltit Havzası",
      shortName: "Asfaltit Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [37.60, 40.50], [37.70, 42.60], [37.10, 42.60], [37.10, 40.60],
        [37.60, 40.50]
      ],
      lat: 37.40, lng: 41.80,
      type: "Enerji Hammaddesi / Katı Fosil Yakıt",
      region: "Güneydoğu Anadolu",
      city: "Mardin, Şırnak (Silopi - Harbul)",
      promptTitle: "Katılaşmış petrol kökenli bir fosil yakıt olan ve Silopi Termik Santrali'ni besleyen Şırnak-Mardin asfaltit havzası haritada neresidir?",
      kpssNot: "Petrol kökenli katı yakıttır; yüksek kalori değerine sahiptir. Şırnak (Silopi - Harbul) ve Mardin ana havzasıdır. Silopi'deki Türkiye'nin ilk ve tek asfaltit yakıtlı termik santralini besler."
    },
    {
      id: "mad_bolge_molibden",
      name: "Molibden Sahaları",
      shortName: "Molibden Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [41.90, 27.60], [41.10, 39.80], [40.60, 41.10], [38.70, 38.80],
        [38.80, 38.60], [40.80, 40.90], [41.60, 27.80], [41.90, 27.60]
      ],
      lat: 40.60, lng: 35.00,
      type: "Metalik Maden / Özel Çelik Alaşımı",
      region: "Marmara - Karadeniz - Doğu Anadolu",
      city: "Kırklareli (Demirköy), Trabzon (Maçka), Erzurum (İspir), Elazığ (Keban)",
      promptTitle: "Çeliğe yüksek ısı ve paslanmazlık direnci veren Demirköy, Maçka, İspir ve Keban molibden sahaları haritada neresidir?",
      kpssNot: "Özel çelik alaşımlarında, uçak, uzay ve savunma sanayisinde çeliğin paslanmazlığını ve yüksek ısı direncini artıran stratejik metaldir. Kırklareli (Demirköy), Trabzon (Maçka), Erzurum (İspir) ve Elazığ (Keban) ana yataklardır."
    },
    {
      id: "mad_bolge_nikel",
      name: "Nikel Havzaları",
      shortName: "Nikel Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [40.20, 29.10], [39.90, 31.40], [39.30, 37.30], [38.60, 42.30],
        [38.20, 42.10], [38.70, 28.10], [39.90, 28.70], [40.20, 29.10]
      ],
      lat: 39.20, lng: 34.50,
      type: "Metalik Maden / Paslanmazlık Alaşımı",
      region: "Ege - Marmara - İç Anadolu - Doğu Anadolu",
      city: "Bursa, Manisa (Gördes - Çaldağ), Eskişehir (Mihalıççık), Sivas (Kangal), Bitlis (Pancarlı)",
      promptTitle: "Batarya teknolojisi ve paslanmaz çelik sanayisinde kullanılan Manisa Gördes, Bursa, Eskişehir, Sivas ve Bitlis nikel kuşağı haritada neresidir?",
      kpssNot: "Elektrikli araç bataryaları, paslanmaz çelik üretimi ve madeni para yapımında kullanılır. Manisa (Gördes Çaldağ), Bursa, Eskişehir (Mihalıççık), Sivas (Kangal) ve Bitlis (Pancarlı) ana havzalarıdır."
    },
    {
      id: "mad_bolge_trona",
      name: "Trona (Doğal Soda Külü) Sahası",
      shortName: "Trona Sahası",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [40.30, 31.80], [40.30, 32.80], [40.00, 32.80], [40.00, 31.80],
        [40.30, 31.80]
      ],
      lat: 40.15, lng: 32.30,
      type: "Endüstriyel Hammadde / Kimya & İhraç (Dünya 2.si)",
      region: "İç Anadolu Bölgesi",
      city: "Ankara (Beypazarı, Kazan)",
      promptTitle: "Cam, deterjan ve kimya sanayisinin girdisi olan ve Türkiye'nin dünyada 2. büyük rezervine sahip olduğu Ankara Beypazarı-Kazan trona sahası haritada neresidir?",
      kpssNot: "Doğal sodyum karbonat (soda külü) mineralidir. Cam, deterjan, kâğıt ve kimya sanayisinde kullanılır. Türkiye, ABD'den sonra DÜNYANIN EN BÜYÜK 2. trona rezervine sahiptir. Ankara Beypazarı ve Kazan havzasından çıkarılır ve ihraç edilir."
    },
    {
      id: "mad_bolge_altin",
      name: "Altın Kuşakları",
      shortName: "Altın Kuşağı",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [41.30, 41.80], [40.60, 39.60], [37.40, 34.60], [38.40, 29.40],
        [39.00, 26.80], [39.80, 26.70], [40.10, 30.10], [39.50, 31.60],
        [41.30, 41.80]
      ],
      lat: 39.60, lng: 34.20,
      type: "Kıymetli Maden / Rezerv & Yatırım",
      region: "Ege - Marmara - Karadeniz - İç Anadolu",
      city: "Çanakkale, Balıkesir, İzmir, Uşak (Kışladağ), Bilecik (Söğüt), Eskişehir (Sivrihisar), Niğde, Gümüşhane (Mastra), Artvin (Cerattepe)",
      promptTitle: "Kışladağ, Ovacık, Söğüt, Mastra ve Cerattepe yataklarını kapsayan Türkiye altın madeni kuşağı haritada neresidir?",
      kpssNot: "Kıymetli madendir; mücevherat ve finansal rezervin temelidir. Uşak (Kışladağ - Türkiye'nin en büyük açık ocak altın madeni), İzmir (Bergama Ovacık), Balıkesir (Havran), Çanakkale (Kazdağları), Bilecik (Söğüt), Eskişehir (Kaymaz), Gümüşhane (Mastra) ve Artvin (Cerattepe) ana işletilen yataklardır."
    },
    {
      id: "mad_bolge_dolomit",
      name: "Dolomit Havzası",
      shortName: "Dolomit Sahası",
      category: "maden_bolgeleri",
      shapeType: "polygon",
      coordinates: [
        [38.00, 35.80], [38.00, 37.30], [37.20, 37.20], [36.80, 35.20],
        [37.30, 35.10], [38.00, 35.80]
      ],
      lat: 37.50, lng: 36.20,
      type: "Endüstriyel Hammadde / Refrakter & Demir-Çelik",
      region: "Akdeniz Bölgesi",
      city: "Adana, Kahramanmaraş",
      promptTitle: "Demir-çelik sanayisinde cüruf yapıcı ve refrakter tuğla hammaddesi olarak kullanılan Adana-Kahramanmaraş dolomit kuşağı haritada neresidir?",
      kpssNot: "Kalsiyum magnezyum karbonat bileşimli kayaçtır. Demir-çelik üretiminde eritken (cüruf yapıcı), refrakter (yüksek ısıya dayanıklı) malzeme, cam ve tarımda toprak düzenleyici olarak kullanılır. Adana ve Kahramanmaraş havzası en zengin üretim alanıdır; İskenderun Demir-Çelik tesislerini besler."
    }
  ]
});
