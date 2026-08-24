/**
 * 🚢 ULAŞIM, LİMANLAR & TİCARET KORİDORLARI — Yazım Kaynağı
 * Derleyici: node tools/build_packs.js
 */
Object.assign(COGRAFYA_DATA_EXT, {
  ulasim: [
    // ---------------- LİMANLAR ----------------
    {
      id: "ula_ambarli",
      name: "Ambarlı Limanı",
      shortName: "Ambarlı Limanı",
      category: "ulasim",
      type: "Liman / Deniz Ulaşımı",
      lat: 40.97, lng: 28.69,
      region: "Marmara",
      city: "İstanbul (Avcılar - Beylikdüzü)",
      promptTitle: "Konteyner elleçlemesinde Türkiye'nin en büyük limanı olan, Marmara'daki ana kapı haritada neresidir?",
      kpssNot: "Konteyner trafiğinde Türkiye'nin EN BÜYÜK limanıdır. Marmara sanayi kuşağının ihracat kapısıdır."
    },
    {
      id: "ula_mersin_liman",
      name: "Mersin Limanı",
      category: "ulasim",
      type: "Liman / Deniz Ulaşımı",
      lat: 36.79, lng: 34.62,
      region: "Akdeniz",
      city: "Mersin",
      kpssNot: "Akdeniz'in en büyük limanıdır. Çukurova'nın ve Orta Doğu transit ticaretinin çıkış kapısıdır."
    },
    {
      id: "ula_izmir_liman",
      name: "İzmir (Alsancak) Limanı",
      category: "ulasim",
      type: "Liman / Deniz Ulaşımı",
      lat: 38.44, lng: 27.15,
      region: "Ege",
      city: "İzmir",
      kpssNot: "Ege'nin ihracat limanıdır; hinterlandı geniş tarım ve sanayi alanlarını kapsar."
    },
    {
      id: "ula_iskenderun_liman",
      name: "İskenderun Limanı",
      category: "ulasim",
      type: "Liman / Deniz Ulaşımı",
      lat: 36.59, lng: 36.17,
      region: "Akdeniz",
      city: "Hatay (İskenderun)",
      kpssNot: "Demir-çelik ve maden yükleme limanıdır; Güneydoğu Anadolu ile Orta Doğu'nun deniz kapısıdır."
    },
    {
      id: "ula_samsun_liman",
      name: "Samsun Limanı",
      category: "ulasim",
      type: "Liman / Deniz Ulaşımı",
      lat: 41.29, lng: 36.33,
      region: "Karadeniz",
      city: "Samsun",
      kpssNot: "Karadeniz'in en işlek limanıdır. Demiryolu bağlantısı sayesinde iç bölgelere aktarma yapabilir."
    },
    {
      id: "ula_trabzon_liman",
      name: "Trabzon Limanı",
      category: "ulasim",
      type: "Liman / Deniz Ulaşımı",
      lat: 41.0, lng: 39.73,
      region: "Karadeniz",
      city: "Trabzon",
      kpssNot: "Kafkasya ve İran transit ticaretinin kapısıdır. Zigana ve Kop geçitleri hinterlandını genişletir."
    },
    {
      id: "ula_aliaga_liman",
      name: "Aliağa Limanı & Petrokimya Tesisleri",
      category: "ulasim",
      type: "Liman / Deniz Ulaşımı",
      lat: 38.8, lng: 26.97,
      region: "Ege",
      city: "İzmir (Aliağa)",
      kpssNot: "Rafineri, petrokimya ve gemi söküm tesisleriyle bütünleşmiş sanayi limanıdır."
    },
    {
      id: "ula_ceyhan_terminal",
      name: "Ceyhan (Yumurtalık) Petrol Terminali",
      category: "ulasim",
      type: "Liman / Boru Hattı Terminali",
      lat: 36.87, lng: 35.93,
      region: "Akdeniz",
      city: "Adana (Ceyhan - Yumurtalık)",
      promptTitle: "Bakü-Tiflis ve Kerkük boru hatlarının denize ulaştığı, Türkiye'nin enerji terminali haritada neresidir?",
      kpssNot: "BTC (Bakü-Tiflis-Ceyhan) ve Kerkük-Yumurtalık boru hatlarının bittiği enerji terminalidir. Türkiye'yi enerji koridoru yapan merkezdir."
    },

    // ---------------- HAVALİMANLARI ----------------
    {
      id: "ula_istanbul_hava",
      name: "İstanbul Havalimanı",
      shortName: "İstanbul Havalimanı",
      category: "ulasim",
      type: "Havalimanı / Hava Ulaşımı",
      lat: 41.26, lng: 28.74,
      region: "Marmara",
      city: "İstanbul (Arnavutköy)",
      kpssNot: "Türkiye'nin en büyük ve yolcu trafiği en yoğun havalimanıdır. Avrupa-Asya arasındaki aktarma (hub) konumunu güçlendirir."
    },
    {
      id: "ula_esenboga",
      name: "Esenboğa Havalimanı",
      category: "ulasim",
      type: "Havalimanı / Hava Ulaşımı",
      lat: 40.13, lng: 32.99,
      region: "İç Anadolu",
      city: "Ankara",
      kpssNot: "Başkentin havalimanıdır; iç hat trafiğinin merkez düğümlerindendir."
    },
    {
      id: "ula_antalya_hava",
      name: "Antalya Havalimanı",
      category: "ulasim",
      type: "Havalimanı / Hava Ulaşımı",
      lat: 36.9, lng: 30.79,
      region: "Akdeniz",
      city: "Antalya",
      kpssNot: "Dış hat yolcu sayısında ilk sıralardadır; trafiği turizm sezonuna göre keskin biçimde değişir."
    },
    {
      id: "ula_dalaman_hava",
      name: "Dalaman & Milas-Bodrum Havalimanları",
      category: "ulasim",
      type: "Havalimanı / Hava Ulaşımı",
      lat: 36.71, lng: 28.79,
      region: "Ege",
      city: "Muğla (Dalaman - Milas)",
      kpssNot: "Güney Ege turizminin hava kapılarıdır. Yaz aylarında charter (tarifesiz) uçuş yoğunluğu yaşanır."
    },

    // ---------------- KÖPRÜLER & TÜNELLER ----------------
    {
      id: "ula_1915_canakkale",
      name: "1915 Çanakkale Köprüsü",
      shortName: "1915 Çanakkale Köprüsü",
      category: "ulasim",
      type: "Köprü & Tünel / Kara Ulaşımı",
      lat: 40.19, lng: 26.4,
      region: "Marmara",
      city: "Çanakkale (Lapseki - Gelibolu)",
      promptTitle: "Çanakkale Boğazı'nı geçen, dünyanın en uzun orta açıklıklı asma köprüsü haritada neresidir?",
      kpssNot: "Dünyanın en uzun orta açıklıklı asma köprüsüdür. Çanakkale Boğazı'nı geçerek Trakya ile Biga Yarımadası'nı bağlar."
    },
    {
      id: "ula_bogazici_koprular",
      name: "İstanbul Boğazı Köprüleri",
      shortName: "Boğaz Köprüleri",
      category: "ulasim",
      type: "Köprü & Tünel / Kara Ulaşımı",
      lat: 41.09, lng: 29.06,
      region: "Marmara",
      city: "İstanbul",
      kpssNot: "15 Temmuz Şehitler, Fatih Sultan Mehmet ve Yavuz Sultan Selim köprüleri Asya ile Avrupa'yı bağlar; transit yük trafiğini taşır."
    },
    {
      id: "ula_osmangazi_koprusu",
      name: "Osmangazi Köprüsü",
      category: "ulasim",
      type: "Köprü & Tünel / Kara Ulaşımı",
      lat: 40.72, lng: 29.51,
      region: "Marmara",
      city: "Kocaeli (İzmit Körfezi)",
      kpssNot: "İzmit Körfezi'ni geçerek İstanbul-İzmir otoyolunun süresini kısaltır; Güney Marmara'nın ulaşımını dönüştürmüştür."
    },
    {
      id: "ula_marmaray",
      name: "Marmaray (Boğaz Tüp Geçidi)",
      category: "ulasim",
      type: "Köprü & Tünel / Demiryolu",
      lat: 41.0, lng: 29.0,
      region: "Marmara",
      city: "İstanbul",
      kpssNot: "İstanbul Boğazı'nın altından geçen demiryolu tüneldir. Asya-Avrupa kesintisiz demiryolu hattını mümkün kılmıştır."
    },
    {
      id: "ula_ovit_tuneli",
      name: "Ovit Tüneli",
      category: "ulasim",
      type: "Köprü & Tünel / Kara Ulaşımı",
      lat: 40.6, lng: 40.8,
      region: "Karadeniz",
      city: "Rize - Erzurum",
      kpssNot: "Türkiye'nin en uzun çift tüplü tünellerindendir. Ovit Geçidi'nin kışın kapanma sorununu ortadan kaldırmıştır."
    },
    {
      id: "ula_zigana_tuneli",
      name: "Yeni Zigana Tüneli",
      category: "ulasim",
      type: "Köprü & Tünel / Kara Ulaşımı",
      lat: 40.63, lng: 39.4,
      region: "Karadeniz",
      city: "Trabzon - Gümüşhane",
      kpssNot: "Zigana Geçidi'ni tünelle aşarak Trabzon Limanı'nın İran-Kafkasya bağlantısını güvence altına alır."
    },

    // ---------------- BORU HATLARI ----------------
    {
      id: "ula_btc",
      name: "Bakü - Tiflis - Ceyhan (BTC) Boru Hattı",
      shortName: "BTC Boru Hattı",
      category: "ulasim",
      type: "Boru Hattı / Enerji Koridoru",
      shapeType: "polyline",
      coordinates: [[41.1, 43.6], [40.5, 42.0], [39.9, 40.4], [39.3, 38.6], [38.3, 37.6], [37.4, 36.6], [36.87, 35.93]],
      lat: 39.3, lng: 38.6,
      region: "Doğu Anadolu",
      city: "Kars'tan Ceyhan'a",
      promptTitle: "Hazar petrolünü Gürcistan üzerinden Akdeniz'e taşıyan, Türkiye'yi enerji koridoru yapan boru hattı haritada neresidir?",
      kpssNot: "Hazar (Azerbaycan) petrolünü Gürcistan üzerinden Ceyhan'a taşır. Türkiye'nin enerji koridoru kimliğinin temel taşıdır."
    },
    {
      id: "ula_kerkuk_yumurtalik",
      name: "Kerkük - Yumurtalık Boru Hattı",
      category: "ulasim",
      type: "Boru Hattı / Enerji Koridoru",
      shapeType: "polyline",
      coordinates: [[37.3, 42.5], [37.4, 40.5], [37.3, 38.5], [37.0, 36.8], [36.87, 35.93]],
      lat: 37.2, lng: 39.0,
      region: "Güneydoğu Anadolu",
      city: "Şırnak'tan Ceyhan'a",
      kpssNot: "Irak petrolünü Ceyhan'a ulaştıran ilk büyük transit hattır. Bölgesel istikrara bağlı olarak kapasitesi değişir."
    },
    {
      id: "ula_tanap",
      name: "TANAP (Trans Anadolu Doğal Gaz Hattı)",
      shortName: "TANAP",
      category: "ulasim",
      type: "Boru Hattı / Enerji Koridoru",
      shapeType: "polyline",
      coordinates: [[40.0, 43.6], [39.9, 41.3], [39.8, 38.5], [39.6, 35.5], [39.7, 32.9], [40.2, 29.9], [40.6, 26.6]],
      lat: 39.8, lng: 35.5,
      region: "Doğu Anadolu",
      city: "Ardahan'dan Edirne'ye",
      kpssNot: "Azerbaycan doğal gazını Türkiye üzerinden Avrupa'ya taşır. Ülkeyi doğudan batıya kat eden en uzun boru hattıdır."
    },
    {
      id: "ula_mavi_akim",
      name: "Mavi Akım & TürkAkım Hatları",
      shortName: "Mavi Akım / TürkAkım",
      category: "ulasim",
      type: "Boru Hattı / Enerji Koridoru",
      lat: 41.6, lng: 33.0,
      region: "Karadeniz",
      city: "Samsun (Durusu) - Kırklareli",
      kpssNot: "Karadeniz'in altından Rus doğal gazını taşıyan hatlardır. Mavi Akım Samsun'a, TürkAkım Trakya'ya ulaşır."
    },

    // ---------------- KARA & DEMİRYOLU ----------------
    {
      id: "ula_yht_hatti",
      name: "Yüksek Hızlı Tren (YHT) Hatları",
      shortName: "YHT Hattı",
      category: "ulasim",
      type: "Demiryolu / Kara Ulaşımı",
      shapeType: "polyline",
      coordinates: [[41.0, 29.0], [40.4, 30.4], [39.8, 31.5], [39.93, 32.86], [39.5, 34.5], [39.75, 37.0]],
      lat: 39.9, lng: 32.5,
      region: "İç Anadolu",
      city: "İstanbul - Ankara - Konya - Sivas",
      kpssNot: "Ankara merkezli YHT ağı İstanbul, Konya ve Sivas'a uzanır. Demiryolu, birim maliyeti en düşük kara taşımacılığıdır."
    },
    {
      id: "ula_tem_otoyol",
      name: "TEM & Kuzey Marmara Otoyolu",
      shortName: "TEM Otoyolu",
      category: "ulasim",
      type: "Karayolu / Kara Ulaşımı",
      shapeType: "polyline",
      coordinates: [[41.6, 26.6], [41.2, 28.0], [41.1, 29.3], [40.8, 30.4], [40.7, 31.6], [40.2, 32.6]],
      lat: 41.1, lng: 29.3,
      region: "Marmara",
      city: "Edirne - İstanbul - Ankara",
      kpssNot: "Avrupa'yı Anadolu'ya bağlayan ana transit koridordur. Türkiye'de yük taşımacılığının büyük bölümü KARAYOLU ile yapılır."
    },
    {
      id: "ula_istanbul_izmir_otoyol",
      name: "İstanbul - İzmir Otoyolu",
      category: "ulasim",
      type: "Karayolu / Kara Ulaşımı",
      shapeType: "polyline",
      coordinates: [[40.85, 29.4], [40.72, 29.51], [40.2, 28.9], [39.6, 28.0], [38.9, 27.5], [38.44, 27.2]],
      lat: 39.8, lng: 28.2,
      region: "Marmara",
      city: "İstanbul - Bursa - Balıkesir - İzmir",
      kpssNot: "Osmangazi ve Körfez geçişleriyle iki büyük sanayi merkezini birleştirir; Güney Marmara'nın ekonomisini hızlandırmıştır."
    },
    {
      id: "ula_bogazlar",
      name: "Türk Boğazları (Transit Deniz Yolu)",
      shortName: "Türk Boğazları",
      category: "ulasim",
      type: "Su Yolu / Deniz Ulaşımı",
      shapeType: "polyline",
      coordinates: [[41.2, 29.13], [41.0, 29.0], [40.85, 28.9], [40.6, 27.5], [40.35, 26.68], [40.05, 26.2]],
      lat: 40.7, lng: 28.0,
      region: "Marmara",
      city: "İstanbul & Çanakkale Boğazları",
      promptTitle: "Karadeniz'e kıyısı olan ülkelerin açık denizlere tek çıkışını sağlayan, Montrö ile statüsü belirlenmiş su yolu haritada neresidir?",
      kpssNot: "Karadeniz'e kıyısı olan ülkelerin açık denizlere TEK çıkışıdır. Statüsü 1936 Montrö Sözleşmesi ile belirlenmiştir; Türkiye'nin jeopolitik gücünün temelidir."
    }
  ]
});
