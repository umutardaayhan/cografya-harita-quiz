/**
 * 🚢 ULAŞIM, LİMANLAR, GEÇİTLER, SINIR KAPILARI & TİCARET — Yazım Kaynağı
 * Şehir Şehir Bağlı Pinler + Kısa & Net KPSS Hap Bilgileri
 * Derleyici: node tools/build_packs.js
 */
Object.assign(COGRAFYA_DATA_EXT, {
  ulasim: [
    // =========================================================================
    // 1. ÖNEMLİ DENİZ LİMANLARI (Ticaret, Sanayi & Turizm)
    // =========================================================================
    {
      id: "ula_liman_hopa",
      name: "Hopa Limanı",
      shortName: "Hopa Limanı",
      category: "ulasim",
      type: "Liman / Transit Ticaret",
      lat: 41.40, lng: 41.43,
      region: "Karadeniz",
      city: "Artvin (Hopa)",
      promptTitle: "Kafkasya ve Gürcistan transit ticaretinde önemli çıkış kapısı olan Doğu Karadeniz limanı hangisidir?",
      kpssNot: "Sarp Sınır Kapısı'na yakındır; Kafkasya transit ticaretinde stratejik rol oynar."
    },
    {
      id: "ula_liman_rize",
      name: "Rize Limanı",
      shortName: "Rize Limanı",
      category: "ulasim",
      type: "Liman / Transit Ticaret",
      lat: 41.03, lng: 40.52,
      region: "Karadeniz",
      city: "Rize",
      promptTitle: "Ovit Tüneli ile Doğu Anadolu üzerinden İran transit ticaretine bağlanan liman hangisidir?",
      kpssNot: "Ovit Tüneli ile Erzurum ve İran transit karayolu bağlantısı güçlenmiştir."
    },
    {
      id: "ula_liman_trabzon",
      name: "Trabzon Limanı",
      shortName: "Trabzon Limanı",
      category: "ulasim",
      type: "Liman / Transit Ticaret",
      lat: 41.00, lng: 39.73,
      region: "Karadeniz",
      city: "Trabzon",
      promptTitle: "Yeni Zigana Tüneli ve Kop Geçidi ile İran transit ticaretinde en işlek olan tarihi liman hangisidir?",
      kpssNot: "Tarihi İpek Yolu limanıdır; Yeni Zigana Tüneli ile İran transit ticaretinde kritik rol oynar."
    },
    {
      id: "ula_liman_unye",
      name: "Ünye Limanı",
      shortName: "Ünye Limanı",
      category: "ulasim",
      type: "Liman / Tersane & Sanayi",
      lat: 41.13, lng: 37.28,
      region: "Karadeniz",
      city: "Ordu (Ünye)",
      promptTitle: "Gemi yapımı (tersane) ve Karadeniz kıyı ticaretinde gelişen liman hangisidir?",
      kpssNot: "Orta Karadeniz'de tersane ve yük taşımacılığında öne çıkar."
    },
    {
      id: "ula_liman_samsun",
      name: "Samsun Limanı",
      shortName: "Samsun Limanı",
      category: "ulasim",
      type: "Liman / Hinterlandı En Geniş",
      lat: 41.29, lng: 36.33,
      region: "Karadeniz",
      city: "Samsun",
      promptTitle: "Canik Dağları geride olduğu için Karadeniz'de hinterlandı en geniş ve demiryolu bağlantılı liman hangisidir?",
      kpssNot: "Karadeniz'in en büyük limanıdır; demiryolu bağlantısı vardır ve hinterlandı geniştir."
    },
    {
      id: "ula_liman_sinop",
      name: "Sinop Limanı",
      shortName: "Sinop Limanı",
      category: "ulasim",
      type: "Liman / Doğal Liman (Hinterlandı Dar)",
      lat: 42.02, lng: 35.15,
      region: "Karadeniz",
      city: "Sinop",
      promptTitle: "Karadeniz'in tek doğal limanı olmasına rağmen arkasındaki dağlar ve demiryolu yokluğu nedeniyle gelişemeyen liman hangisidir?",
      kpssNot: "Tek doğal limandır; Küre Dağları ve demiryolu olmaması nedeniyle hinterlandı dardır."
    },
    {
      id: "ula_liman_zonguldak_eregli",
      name: "Zonguldak & Ereğli Limanları",
      shortName: "Zonguldak Limanı",
      category: "ulasim",
      type: "Liman / Maden & Demir-Çelik",
      lat: 41.45, lng: 31.79,
      region: "Karadeniz",
      city: "Zonguldak (Ereğli)",
      promptTitle: "Sivas Divriği'den gelen demir cevherinin işlendiği ve demiryolu bağlantılı Batı Karadeniz sanayi limanı hangisidir?",
      kpssNot: "Taş kömürü havzası ve Erdemir/Kardemir demir-çelik sanayisinin demiryolu bağlantılı limanıdır."
    },
    {
      id: "ula_liman_karasu",
      name: "Karasu Limanı",
      shortName: "Karasu Limanı",
      category: "ulasim",
      type: "Liman / Ro-Ro & Sanayi",
      lat: 41.11, lng: 30.69,
      region: "Marmara",
      city: "Sakarya (Karasu)",
      promptTitle: "Karasu-Köstence (Romanya) Ro-Ro hattıyla Rusya ve Ukrayna ticaretine açılan Marmara limanı hangisidir?",
      kpssNot: "Karadeniz kıyısındaki Ro-Ro ve otomotiv ihracat kapısıdır."
    },
    {
      id: "ula_liman_ambarli",
      name: "Ambarlı Limanı",
      shortName: "Ambarlı Limanı",
      category: "ulasim",
      type: "Liman / En Büyük Konteyner Limanı",
      lat: 40.97, lng: 28.69,
      region: "Marmara",
      city: "İstanbul (Avcılar/Beylikdüzü)",
      promptTitle: "Türkiye'nin konteyner hacmi bakımından en büyük ticaret limanı hangisidir?",
      kpssNot: "Türkiye'nin en büyük konteyner limanıdır; dış ticaretin merkezidir."
    },
    {
      id: "ula_liman_haydarpasa",
      name: "Haydarpaşa Limanı",
      shortName: "Haydarpaşa Limanı",
      category: "ulasim",
      type: "Liman / Tarihi Demiryolu Limanı",
      lat: 41.00, lng: 29.02,
      region: "Marmara",
      city: "İstanbul (Kadıköy)",
      promptTitle: "Hicaz ve Bağdat demiryollarının tarihi başlangıç noktası olan Anadolu yakası limanı hangisidir?",
      kpssNot: "Tarihi demiryolu-deniz yolu entegrasyonu sağlayan Marmara limanıdır."
    },
    {
      id: "ula_liman_kocaeli_derince",
      name: "Kocaeli & Derince Limanları",
      shortName: "Derince & İzmit Limanları",
      category: "ulasim",
      type: "Liman / Otomotiv & Kimya Sanayi",
      lat: 40.75, lng: 29.83,
      region: "Marmara",
      city: "Kocaeli (İzmit Körfezi)",
      promptTitle: "Otomotiv ve petrokimya ihracatında demiryolu bağlantılı en işlek körfez limanı hangisidir?",
      kpssNot: "Otomotiv, demir-çelik ve sanayi ürünleri ihracatının demiryolu bağlantılı merkezidir."
    },
    {
      id: "ula_liman_gemlik",
      name: "Gemlik Limanı",
      shortName: "Gemlik Limanı (Demiryolsuz)",
      category: "ulasim",
      type: "Liman / Otomotiv (Demiryolu Yok)",
      lat: 40.43, lng: 29.15,
      region: "Marmara",
      city: "Bursa (Gemlik)",
      promptTitle: "Bursa sanayisinin dünyaya açılan kapısı olmasına rağmen demiryolu bağlantısı bulunmayan liman hangisidir?",
      kpssNot: "KPSS Tuzağı: Bursa ve TOGG otomotiv ihracat kapısıdır; ancak DEMİRYOLU BAĞLANTISI YOKTUR."
    },
    {
      id: "ula_liman_bandirma",
      name: "Bandırma Limanı",
      shortName: "Bandırma Limanı",
      category: "ulasim",
      type: "Liman / Bor Madeni & Demiryolu",
      lat: 40.35, lng: 27.97,
      region: "Marmara",
      city: "Balıkesir (Bandırma)",
      promptTitle: "Kütahya ve Balıkesir'den çıkarılan bor madenlerinin işlenip ihraç edildiği demiryolu bağlantılı liman hangisidir?",
      kpssNot: "Kütahya Emet bor madenleri demiryoluyla buraya taşınır ve ihraç edilir."
    },
    {
      id: "ula_liman_canakkale",
      name: "Çanakkale Limanı",
      shortName: "Çanakkale Limanı (Demiryolsuz)",
      category: "ulasim",
      type: "Liman / Boğaz Geçişi (Demiryolu Yok)",
      lat: 40.15, lng: 26.41,
      region: "Marmara",
      city: "Çanakkale",
      promptTitle: "Stratejik boğaz üzerinde yer almasına rağmen demiryolu bağlantısı bulunmayan liman hangisidir?",
      kpssNot: "Demiryolu bağlantısı yoktur; 1915 Çanakkale Köprüsü ile karayolu bağı güçlenmiştir."
    },
    {
      id: "ula_liman_izmir",
      name: "İzmir Alsancak Limanı",
      shortName: "İzmir Alsancak Limanı",
      category: "ulasim",
      type: "Liman / İhracat & Demiryolu",
      lat: 38.44, lng: 27.14,
      region: "Ege",
      city: "İzmir (Konak)",
      promptTitle: "Ege tarım ve sanayi ürünlerinin ihraç edildiği, ilk demiryolu hattıyla iç kesimlere bağlanan liman hangisidir?",
      kpssNot: "Ege'nin ana ihracat kapısıdır; hinterlandı geniştir ve demiryolu bağlantısı vardır."
    },
    {
      id: "ula_liman_aliaga",
      name: "Aliağa Limanı",
      shortName: "Aliağa Limanı",
      category: "ulasim",
      type: "Liman / Petrol & Rafineri",
      lat: 38.80, lng: 26.97,
      region: "Ege",
      city: "İzmir (Aliağa)",
      promptTitle: "TÜPRAŞ ve STAR rafinerileriyle Türkiye'nin en büyük petrokimya ve ham petrol limanlarından biri hangisidir?",
      kpssNot: "Ham petrol, petrokimya ve demir-çelik sanayisinde Ege'nin en yoğun limanıdır."
    },
    {
      id: "ula_liman_cesme_kusadasi",
      name: "Çeşme & Kuşadası Limanları",
      shortName: "Kuşadası & Çeşme Limanları",
      category: "ulasim",
      type: "Liman / Kruvaziyer & Turizm",
      lat: 37.86, lng: 27.26,
      region: "Ege",
      city: "Aydın (Kuşadası) - İzmir (Çeşme)",
      promptTitle: "Kruvaziyer yolcu gemisi trafiğinde ve adalara feribot geçişinde Türkiye'nin lider limanları hangileridir?",
      kpssNot: "Kuşadası kruvaziyer yolcu sayısında Türkiye 1.'sidir; Çeşme Yunanistan feribot kapısıdır."
    },
    {
      id: "ula_liman_antalya",
      name: "Antalya Limanı (Port Akdeniz)",
      shortName: "Antalya Limanı (Demiryolsuz)",
      category: "ulasim",
      type: "Liman / Yat & İhracat (Demiryolu Yok)",
      lat: 36.83, lng: 30.60,
      region: "Akdeniz",
      city: "Antalya",
      promptTitle: "Lüks yat üretimi ve mermer ihracatında öne çıkan ancak arkasındaki Beydağları nedeniyle demiryolu bulunmayan liman hangisidir?",
      kpssNot: "KPSS Soru Klasiği: Türkiye'nin turizm başkenti olmasına rağmen DEMİRYOLU BAĞLANTISI YOKTUR."
    },
    {
      id: "ula_liman_tasucu",
      name: "Taşucu Limanı & Seka",
      shortName: "Taşucu Limanı (KKTC)",
      category: "ulasim",
      type: "Liman / KKTC Feribot Kapısı",
      lat: 36.31, lng: 33.88,
      region: "Akdeniz",
      city: "Mersin (Silifke)",
      promptTitle: "Kuzey Kıbrıs Türk Cumhuriyeti'ne (Girne) en önemli deniz bağlantısını sağlayan Akdeniz limanı hangisidir?",
      kpssNot: "KKTC feribot ve deniz otobüsü trafiğinin ana merkezidir; Akkuyu Nükleer Santrali lojistiğini destekler."
    },
    {
      id: "ula_liman_mersin",
      name: "Mersin Uluslararası Limanı (MIP)",
      shortName: "Mersin Limanı",
      category: "ulasim",
      type: "Liman / Orta Doğu Transit & En Büyük",
      lat: 36.80, lng: 34.64,
      region: "Akdeniz",
      city: "Mersin",
      promptTitle: "Geniş hinterlandı, serbest bölgesi, demiryolu hattı ve Orta Doğu transit ticaretiyle Akdeniz'in en büyük limanı hangisidir?",
      kpssNot: "Türkiye'nin ve Doğu Akdeniz'in en büyük transit ticaret ve konteyner limanlarından biridir; demiryolu vardır."
    },
    {
      id: "ula_liman_iskenderun_dortyol",
      name: "İskenderun & Dörtyol Limanları",
      shortName: "İskenderun Limanı",
      category: "ulasim",
      type: "Liman / Demir-Çelik & Petrol",
      lat: 36.58, lng: 36.17,
      region: "Akdeniz",
      city: "Hatay (İskenderun / Dörtyol)",
      promptTitle: "Malatya Hekimhan'dan gelen demir madeninin işlendiği ve demiryolu bağlantılı ağır sanayi limanı hangisidir?",
      kpssNot: "İsdemir demir-çelik ve BOTAŞ petrol terminallerine ev sahipliği yapar; demiryolu bağlantısı vardır."
    },

    // =========================================================================
    // 2. GEÇİTLER, TÜNELLER & KRİTİK GEÇİŞLER
    // =========================================================================
    {
      id: "ula_tunel_yeni_zigana",
      name: "Yeni Zigana Tüneli",
      shortName: "Yeni Zigana (En Uzun)",
      category: "ulasim",
      type: "Geçit & Tünel / Türkiye'nin En Uzun Tüneli",
      lat: 40.66, lng: 39.42,
      region: "Karadeniz",
      city: "Trabzon - Gümüşhane",
      promptTitle: "14.5 km uzunluğuyla Türkiye'nin ve Avrupa'nın en uzun çift tüplü karayolu tüneli hangisidir?",
      kpssNot: "14.5 km çift tüptür; Trabzon-Gümüşhane-Erzurum-İran transit koridorunun can damarıdır."
    },
    {
      id: "ula_tunel_ovit",
      name: "Ovit Tüneli",
      shortName: "Ovit Tüneli (14 km)",
      category: "ulasim",
      type: "Geçit & Tünel / Çift Tüp",
      lat: 40.62, lng: 40.78,
      region: "Karadeniz",
      city: "Rize (İkizdere) - Erzurum (İspir)",
      promptTitle: "14 km çift tüp uzunluğuyla Rize'yi Erzurum'a bağlayan ve kışın yolu kesintisiz açık tutan tünel hangisidir?",
      kpssNot: "Rize-Erzurum arasını kış aylarında çığ ve kardan koruyarak 12 ay açık tutar."
    },
    {
      id: "ula_tunel_bahcesaray",
      name: "Van - Bahçesaray Prefabrik Kar Tüneli",
      shortName: "Bahçesaray Kar Tüneli (İlk)",
      category: "ulasim",
      type: "Geçit & Tünel / İlk Prefabrik Kar Tüneli",
      lat: 38.10, lng: 42.80,
      region: "Doğu Anadolu",
      city: "Van (Bahçesaray)",
      promptTitle: "3000 metre rakımda çığ facialarını önlemek için inşa edilen TÜRKİYE'NİN İLK PREFABRİK KAR TÜNELİ nerededir?",
      kpssNot: "Türkiye'nin İLK PREFABRİK KAR TÜNELİ'dir; kışın aylarca kapalı kalan Bahçesaray yolunu çığlardan korur."
    },
    {
      id: "ula_gecit_gulek",
      name: "Gülek Boğazı",
      shortName: "Gülek Boğazı",
      category: "ulasim",
      type: "Geçit & Tünel / Akdeniz - İç Anadolu",
      lat: 37.21, lng: 34.79,
      region: "Akdeniz",
      city: "Mersin - Adana - Niğde",
      promptTitle: "Çukurova'yı İç Anadolu'ya bağlayan Toroslar üzerindeki en tarihi ve işlek doğal geçit hangisidir?",
      kpssNot: "Akdeniz ile İç Anadolu arasındaki ana geçittir; otoyol ve demiryolu buradan geçer."
    },
    {
      id: "ula_gecit_cubuk_sertavul",
      name: "Çubuk ve Sertavul Geçitleri",
      shortName: "Çubuk & Sertavul",
      category: "ulasim",
      type: "Geçit & Tünel / Toros Geçitleri",
      lat: 37.05, lng: 30.55,
      region: "Akdeniz",
      city: "Antalya (Çubuk) - Karaman/Mersin (Sertavul)",
      promptTitle: "Antalya'yı Göller Yöresi'ne bağlayan Çubuk Geçidi ile Mersin'i Karaman'a bağlayan geçit hangisidir?",
      kpssNot: "Çubuk Geçidi Antalya-Burdur; Sertavul Geçidi Mersin (Silifke)-Karaman arasını bağlar."
    },
    {
      id: "ula_gecit_belen",
      name: "Belen Geçidi",
      shortName: "Belen Geçidi",
      category: "ulasim",
      type: "Geçit & Tünel / Amanos Dağları",
      lat: 36.49, lng: 36.20,
      region: "Akdeniz",
      city: "Hatay (İskenderun - Antakya)",
      promptTitle: "Amanos (Nur) Dağları üzerinden İskenderun Körfezi'ni Amik Ovası ve Suriye yoluna bağlayan geçit hangisidir?",
      kpssNot: "Amanos Dağları'nı aşarak İskenderun ile Antakya/Suriye bağlantısını sağlar."
    },

    // =========================================================================
    // 3. ŞEHİR ŞEHİR BAĞLI DEMİRYOLLARI VE TREN HATLARI (GRUP PİNLERİ)
    // =========================================================================
    // A. İLK DEMİRYOLU (İzmir - Aydın)
    {
      id: "ula_ilktr_izmir",
      groupId: "grp_ilk_demiryolu_izmir_aydin",
      groupName: "Türkiye'nin İlk Demiryolu Hattı (İzmir - Aydın)",
      name: "İzmir Alsancak Garı (İlk Hat Başlangıcı)",
      shortName: "İzmir Garı (İlk Hat)",
      category: "ulasim",
      type: "Demiryolu / İlk Hat (1856-1866)",
      lat: 38.44, lng: 27.14,
      region: "Ege",
      city: "İzmir",
      promptTitle: "1856 yılında inşasına başlanan Türkiye'nin İLK DEMİRYOLU HATTININ başlangıç noktası hangisidir?",
      kpssNot: "Türkiye'nin ilk demiryolu 1856-1866'da İzmir-Aydın arasında inşa edilmiştir."
    },
    {
      id: "ula_ilktr_torbali_selcuk",
      groupId: "grp_ilk_demiryolu_izmir_aydin",
      groupName: "Türkiye'nin İlk Demiryolu Hattı (İzmir - Aydın)",
      name: "Torbalı ve Selçuk İstasyonları",
      shortName: "Torbalı - Selçuk",
      category: "ulasim",
      type: "Demiryolu / İlk Hat Güzergahı",
      lat: 38.05, lng: 27.35,
      region: "Ege",
      city: "İzmir (Torbalı / Selçuk)",
      promptTitle: "İzmir-Aydın ilk demiryolu hattının Ege tarım havzalarını bağlayan ara durakları nerededir?",
      kpssNot: "Ege'nin incir, üzüm ve pamuğunu İzmir Limanı'na taşımak için İngilizler tarafından yapılmıştır."
    },
    {
      id: "ula_ilktr_aydin",
      groupId: "grp_ilk_demiryolu_izmir_aydin",
      groupName: "Türkiye'nin İlk Demiryolu Hattı (İzmir - Aydın)",
      name: "Aydın Garı (İlk Hat Bitişi)",
      shortName: "Aydın Garı",
      category: "ulasim",
      type: "Demiryolu / İlk Hat Bitiş Noktası",
      lat: 37.85, lng: 27.84,
      region: "Ege",
      city: "Aydın",
      promptTitle: "Anadolu'nun ilk demiryolu hattının bağlandığı Büyük Menderes tarım merkezi garı hangisidir?",
      kpssNot: "1866'da işletmeye açılan ilk hattın son durağıdır."
    },

    // B. YÜKSEK HIZLI TREN (YHT) AĞI (Ankara Merkezli)
    {
      id: "ula_yht_ankara",
      groupId: "grp_yht_agi",
      groupName: "Yüksek Hızlı Tren (YHT) Ağı",
      name: "Ankara YHT Garı (Ağın Merkezi)",
      shortName: "Ankara Garı",
      category: "ulasim",
      type: "Demiryolu / YHT Merkezi",
      lat: 39.93, lng: 32.86,
      region: "İç Anadolu",
      city: "Ankara",
      promptTitle: "Türkiye'deki tüm aktif Yüksek Hızlı Tren (YHT) hatlarının ana merkez garı hangisidir?",
      kpssNot: "YHT ağının ana kavşağı ve başlangıç merkezidir."
    },
    {
      id: "ula_yht_eskisehir",
      groupId: "grp_yht_agi",
      groupName: "Yüksek Hızlı Tren (YHT) Ağı",
      name: "Eskişehir YHT Garı",
      shortName: "Eskişehir YHT",
      category: "ulasim",
      type: "Demiryolu / YHT Kavşağı",
      lat: 39.77, lng: 30.52,
      region: "İç Anadolu",
      city: "Eskişehir",
      promptTitle: "Türkiye'de İLK YHT SEFERİNİN (2009) başladığı Ankara-İstanbul kavşak garı hangisidir?",
      kpssNot: "Türkiye'nin ilk YHT hattı 2009'da Ankara-Eskişehir arasında açılmıştır."
    },
    {
      id: "ula_yht_istanbul_kocaeli_sakarya",
      groupId: "grp_yht_agi",
      groupName: "Yüksek Hızlı Tren (YHT) Ağı",
      name: "İstanbul - Kocaeli - Sakarya - Bilecik YHT Kolu",
      shortName: "Marmara YHT Kolu",
      category: "ulasim",
      type: "Demiryolu / Marmara YHT",
      lat: 40.75, lng: 29.90,
      region: "Marmara",
      city: "İstanbul (Söğütlüçeşme/Halkalı) - Kocaeli - Sakarya - Bilecik",
      promptTitle: "Ankara'dan batıya uzanarak Marmara sanayi havzalarını bağlayan YHT hattı nerededir?",
      kpssNot: "Bilecik, Sakarya, İzmit ve İstanbul'u Ankara ve Konya'ya bağlar."
    },
    {
      id: "ula_yht_konya_karaman",
      groupId: "grp_yht_agi",
      groupName: "Yüksek Hızlı Tren (YHT) Ağı",
      name: "Konya ve Karaman YHT Hattı",
      shortName: "Konya - Karaman YHT",
      category: "ulasim",
      type: "Demiryolu / Güney YHT Kolu",
      lat: 37.50, lng: 32.80,
      region: "İç Anadolu",
      city: "Konya - Karaman",
      promptTitle: "Ankara ve İstanbul'dan güneye uzanan YHT hattının ulaştığı iller hangileridir?",
      kpssNot: "Ankara-Konya ve Konya-Karaman hızlı tren hatları aktiftir."
    },
    {
      id: "ula_yht_kirikkale_yozgat_sivas",
      groupId: "grp_yht_agi",
      groupName: "Yüksek Hızlı Tren (YHT) Ağı",
      name: "Kırıkkale - Yozgat - Sivas YHT Hattı",
      shortName: "Doğu YHT Kolu (Sivas)",
      category: "ulasim",
      type: "Demiryolu / Doğu YHT Kolu",
      lat: 39.75, lng: 37.01,
      region: "İç Anadolu",
      city: "Kırıkkale - Yozgat (Sorgun) - Sivas",
      promptTitle: "Ankara'dan doğuya uzanarak Yozgat üzerinden Sivas'a ulaşan en yeni YHT hattı nerededir?",
      kpssNot: "Ankara-Sivas YHT hattı Yozgat'tan geçer; Kayseri'den GEÇMEZ."
    },

    // C. TURİSTİK DOĞU EKSPRESİ (Ankara - Kars)
    {
      id: "ula_dogu_ankara_kayseri",
      groupId: "grp_dogu_ekspresi",
      groupName: "Turistik Doğu Ekspresi Güzergahı",
      name: "Doğu Ekspresi Batı Etabı (Ankara - Kırıkkale - Kayseri)",
      shortName: "Doğu Ekspresi (Batı)",
      category: "ulasim",
      type: "Demiryolu / Turistik Hat",
      lat: 39.20, lng: 34.20,
      region: "İç Anadolu",
      city: "Ankara - Kırıkkale - Kayseri",
      promptTitle: "Turistik Doğu Ekspresi'nin İç Anadolu'dan hareket ettiği başlangıç etabı nerededir?",
      kpssNot: "Ankara'dan kalkıp Kayseri üzerinden Sivas ve Doğu Anadolu'ya yönelir."
    },
    {
      id: "ula_dogu_sivas_divrigi_erzincan",
      groupId: "grp_dogu_ekspresi",
      groupName: "Turistik Doğu Ekspresi Güzergahı",
      name: "Doğu Ekspresi Orta Etabı (Sivas - Divriği - Erzincan)",
      shortName: "Doğu Ekspresi (Orta)",
      category: "ulasim",
      type: "Demiryolu / Kanyon & Doğa Hattı",
      lat: 39.60, lng: 38.80,
      region: "Doğu Anadolu",
      city: "Sivas (Divriği) - Erzincan (İliç/Kemaliye)",
      promptTitle: "Doğu Ekspresi'nin Fırat Nehri vadileri ve kanyonlar boyunca ilerlediği rota nerededir?",
      kpssNot: "Divriği Ulu Camii ve Kemaliye Karanlık Kanyon manzaralarından geçer."
    },
    {
      id: "ula_dogu_erzurum_sarikamis_kars",
      groupId: "grp_dogu_ekspresi",
      groupName: "Turistik Doğu Ekspresi Güzergahı",
      name: "Doğu Ekspresi Kış Turizmi Etabı (Erzurum - Kars)",
      shortName: "Doğu Ekspresi (Kars Bitişi)",
      category: "ulasim",
      type: "Demiryolu / Kış Turizmi Bitiş Etabı",
      lat: 40.30, lng: 42.20,
      region: "Doğu Anadolu",
      city: "Erzurum - Sarıkamış - Kars",
      promptTitle: "Doğu Ekspresi'nin Sarıkamış ve Çıldır Gölü kış turizmine ulaştığı son durak neresidir?",
      kpssNot: "Kars Garı'nda son bulur; Ani Harabeleri ve Çıldır turizmini canlandırır."
    },

    // D. MEZOPOTAMYA EKSPRESİ (Ankara - Diyarbakır)
    {
      id: "ula_mezo_malatya_elazig",
      groupId: "grp_mezopotamya_ekspresi",
      groupName: "Mezopotamya Ekspresi Güzergahı",
      name: "Mezopotamya Ekspresi Orta Etabı (Malatya - Elazığ)",
      shortName: "Mezopotamya Ekspresi (Orta)",
      category: "ulasim",
      type: "Demiryolu / Turistik Hat",
      lat: 38.50, lng: 38.80,
      region: "Doğu Anadolu",
      city: "Malatya - Elazığ",
      promptTitle: "Ankara'dan hareket eden yeni Mezopotamya Ekspresi'nin geçtiği Doğu Anadolu illeri hangileridir?",
      kpssNot: "Kayseri ve Sivas'tan sonra Malatya ve Elazığ üzerinden Güneydoğu'ya iner."
    },
    {
      id: "ula_mezo_diyarbakir_son",
      groupId: "grp_mezopotamya_ekspresi",
      groupName: "Mezopotamya Ekspresi Güzergahı",
      name: "Diyarbakır Garı (Mezopotamya Ekspresi Son Durağı)",
      shortName: "Diyarbakır Garı (Son Durak)",
      category: "ulasim",
      type: "Demiryolu / Turistik Hat Bitiş Noktası",
      lat: 37.91, lng: 40.22,
      region: "Güneydoğu Anadolu",
      city: "Diyarbakır",
      promptTitle: "Mezopotamya Ekspresi turistik tren hattının son bulduğu gar hangisidir?",
      kpssNot: "KPSS Çok Önemli: Mezopotamya Ekspresi DİYARBAKIR'DA BİTER, Mardin'e gitmez."
    },

    // E. DEMİRYOLU BAĞLANTILI LİMANLAR (Maden & Sanayi)
    {
      id: "ula_demirliman_karadeniz",
      groupId: "grp_demiryolu_limanlari",
      groupName: "Demiryolu Bağlantılı Kıyı Limanları",
      name: "Samsun ve Zonguldak Demiryolu Limanları",
      shortName: "Karadeniz Demiryolu Limanları",
      category: "ulasim",
      type: "Demiryolu / Maden & Tarım Limanları",
      lat: 41.35, lng: 34.00,
      region: "Karadeniz",
      city: "Samsun - Zonguldak/Ereğli",
      promptTitle: "Karadeniz kıyısında demiryolu bağlantısı bulunan TEK İKİ LİMAN hangileridir?",
      kpssNot: "Karadeniz'de yalnızca Samsun ve Zonguldak/Ereğli limanlarında demiryolu vardır (Divriği demiri taşınır)."
    },
    {
      id: "ula_demirliman_akdeniz",
      groupId: "grp_demiryolu_limanlari",
      groupName: "Demiryolu Bağlantılı Kıyı Limanları",
      name: "Mersin ve İskenderun Demiryolu Limanları",
      shortName: "Akdeniz Demiryolu Limanları",
      category: "ulasim",
      type: "Demiryolu / Maden & Transit Limanları",
      lat: 36.70, lng: 35.40,
      region: "Akdeniz",
      city: "Mersin - İskenderun",
      promptTitle: "Akdeniz kıyısında demiryolu bağlantısı olan ve Hekimhan demirinin taşındığı limanlar hangileridir?",
      kpssNot: "Mersin ve İskenderun limanlarında demiryolu vardır (Antalya'da yoktur)."
    },
    {
      id: "ula_demirliman_marmara_ege",
      groupId: "grp_demiryolu_limanlari",
      groupName: "Demiryolu Bağlantılı Kıyı Limanları",
      name: "Bandırma, İzmit, İstanbul ve İzmir Limanları",
      shortName: "Marmara & Ege Demiryolu Limanları",
      category: "ulasim",
      type: "Demiryolu / Bor & İhracat Limanları",
      lat: 39.50, lng: 27.50,
      region: "Marmara",
      city: "Bandırma - Kocaeli (Derince) - İstanbul (Haydarpaşa) - İzmir (Alsancak)",
      promptTitle: "Kütahya bor madenlerinin ve Ege/Marmara sanayisinin taşındığı demiryolu limanları hangileridir?",
      kpssNot: "Bandırma (bor taşınır), Derince, Haydarpaşa ve İzmir limanlarında demiryolu mevcuttur."
    },

    // F. DEMİRYOLU OLMAYAN MERKEZLER & YHT OLMAYANLAR
    {
      id: "ula_demiryolsuz_karadeniz",
      groupId: "grp_demiryolsuz_merkezler",
      groupName: "Demiryolu Bağlantısı Olmayan Önemli Merkezler",
      name: "Doğu Karadeniz ve Sinop (Demiryolsuz)",
      shortName: "Doğu Karadeniz & Sinop",
      category: "ulasim",
      type: "Demiryolu / Kör Noktalar",
      lat: 41.20, lng: 39.00,
      region: "Karadeniz",
      city: "Trabzon, Rize, Artvin, Giresun, Gümüşhane, Bayburt, Sinop",
      promptTitle: "Engebeli yer şekilleri nedeniyle günümüzde DEMİRYOLU BULUNMAYAN Karadeniz illeri hangileridir?",
      kpssNot: "Doğu Karadeniz (Trabzon, Rize, Artvin vb.) ve Sinop'ta demiryolu yoktur."
    },
    {
      id: "ula_demiryolsuz_akdeniz_ege",
      groupId: "grp_demiryolsuz_merkezler",
      groupName: "Demiryolu Bağlantısı Olmayan Önemli Merkezler",
      name: "Antalya, Muğla ve Çanakkale (Demiryolsuz)",
      shortName: "Antalya, Muğla, Çanakkale",
      category: "ulasim",
      type: "Demiryolu / Kör Noktalar",
      lat: 37.00, lng: 28.50,
      region: "Akdeniz",
      city: "Antalya, Muğla, Çanakkale, Bursa (Gemlik)",
      promptTitle: "Turizm ve kıyı merkezleri olmalarına rağmen demiryolu ağına bağlı olmayan iller hangileridir?",
      kpssNot: "Antalya, Muğla, Çanakkale ve Gemlik Limanı'nda demiryolu hattı bulunmaz."
    },
    {
      id: "ula_demiryolsuz_dogu",
      groupId: "grp_demiryolsuz_merkezler",
      groupName: "Demiryolu Bağlantısı Olmayan Önemli Merkezler",
      name: "Hakkari ve Şırnak (Demiryolsuz)",
      shortName: "Hakkari & Şırnak",
      category: "ulasim",
      type: "Demiryolu / Kör Noktalar",
      lat: 37.40, lng: 43.50,
      region: "Güneydoğu Anadolu",
      city: "Hakkari - Şırnak",
      promptTitle: "Güneydoğu Toroslar'ın engebeli yapısı nedeniyle demiryolu ulaşmayan sınır illerimiz hangileridir?",
      kpssNot: "Hakkari ve Şırnak illerinde demiryolu bağlantısı yoktur."
    },
    {
      id: "ula_yht_olmayan_iller",
      groupId: "grp_yht_olmayan_merkezler",
      groupName: "YHT Bağlantısı Bulunmayan Büyük Şehirler",
      name: "İzmir, Antalya, Muğla, Trabzon ve Kayseri (YHT Yok)",
      shortName: "YHT Olmayan Büyükşehirler",
      category: "ulasim",
      type: "Demiryolu / YHT Olmayan Merkezler",
      lat: 38.50, lng: 34.00,
      region: "Türkiye Geneli",
      city: "İzmir, Antalya, Muğla, Trabzon, Kayseri",
      promptTitle: "Büyük nüfus ve sanayilerine rağmen günümüzde AKTİF YHT HATTI BULUNMAYAN iller hangileridir?",
      kpssNot: "KPSS Tuzağı: İZMİR, ANTALYA, TRABZON ve KAYSERİ'de henüz aktif YHT yoktur (Ankara-Sivas YHT'si Kayseri'ye uğramaz)."
    },

    // =========================================================================
    // 4. ŞEHİR ŞEHİR BAĞLI OTOYOL HATLARI (GRUP PİNLERİ)
    // =========================================================================
    // A. BATI OTOYOL AKSI (Edirne'den Denizli'ye)
    {
      id: "ula_otobat_edirne_istanbul",
      groupId: "grp_bati_otoyol_aksi",
      groupName: "Batı Otoyol Aksı (Edirne - Denizli)",
      name: "Edirne - İstanbul Otoyol Kesimi",
      shortName: "Avrupa Otoyolu (Edirne-İstanbul)",
      category: "ulasim",
      type: "Otoyol / Avrupa Transit Koridoru",
      lat: 41.35, lng: 27.50,
      region: "Marmara",
      city: "Edirne (Kapıkule) - Tekirdağ - İstanbul",
      promptTitle: "Bulgaristan sınırından başlayıp Trakya üzerinden İstanbul'a bağlanan otoyol nerededir?",
      kpssNot: "Avrupa transit ticaretinin ana karayolu kapısıdır."
    },
    {
      id: "ula_otobat_bursa_balikesir_manisa",
      groupId: "grp_bati_otoyol_aksi",
      groupName: "Batı Otoyol Aksı (Edirne - Denizli)",
      name: "İstanbul - Bursa - Balıkesir - Manisa Otoyolu",
      shortName: "Kuzey Ege Otoyolu",
      category: "ulasim",
      type: "Otoyol / Osmangazi & Ege Hattı",
      lat: 39.50, lng: 28.00,
      region: "Marmara",
      city: "Yalova (Osmangazi Köprüsü) - Bursa - Balıkesir - Manisa",
      promptTitle: "Osmangazi Köprüsü üzerinden İstanbul ile Ege sanayi merkezlerini bağlayan otoyol nerededir?",
      kpssNot: "İstanbul-İzmir otoyolunun ana gövdesidir; mesafeyi 3.5 saate düşürmüştür."
    },
    {
      id: "ula_otobat_izmir_aydin_denizli",
      groupId: "grp_bati_otoyol_aksi",
      groupName: "Batı Otoyol Aksı (Edirne - Denizli)",
      name: "İzmir - Aydın - Denizli Otoyol Kesimi",
      shortName: "İzmir - Aydın - Denizli Otoyolu",
      category: "ulasim",
      type: "Otoyol / Güney Ege Aksı",
      lat: 37.80, lng: 28.50,
      region: "Ege",
      city: "İzmir - Aydın - Denizli",
      promptTitle: "Yeni açılan etapla otoyol ağının Denizli'ye kadar kesintisiz bağlandığı Güney Ege aksı nerededir?",
      kpssNot: "Aydın-Denizli otoyolunun açılmasıyla batı aksı DENİZLİ'YE KADAR uzatılmıştır."
    },

    // B. ANADOLU OTOYOLU / TEM (İstanbul - Ankara)
    {
      id: "ula_tem_istanbul_kocaeli_sakarya",
      groupId: "grp_tem_otoyolu",
      groupName: "Anadolu Otoyolu / TEM (İstanbul - Ankara)",
      name: "İstanbul - Kocaeli - Sakarya Otoyol Etabı",
      shortName: "TEM Marmara Etabı",
      category: "ulasim",
      type: "Otoyol / Ana Transit Omurga",
      lat: 40.75, lng: 29.90,
      region: "Marmara",
      city: "İstanbul - Kocaeli - Sakarya",
      promptTitle: "Türkiye'nin sanayi kalbini oluşturan en yoğun transit otoyol koridoru nerededir?",
      kpssNot: "Türkiye'nin en yoğun araç trafiğine sahip ana transit aksıdır."
    },
    {
      id: "ula_tem_duzce_bolu_ankara",
      groupId: "grp_tem_otoyolu",
      groupName: "Anadolu Otoyolu / TEM (İstanbul - Ankara)",
      name: "Düzce - Bolu Dağı Tüneli - Ankara Otoyol Etabı",
      shortName: "TEM Bolu - Ankara Etabı",
      category: "ulasim",
      type: "Otoyol / Bolu Dağı Tüneli & Başkent Hattı",
      lat: 40.50, lng: 31.80,
      region: "Karadeniz",
      city: "Düzce - Bolu Dağı - Ankara",
      promptTitle: "Bolu Dağı Tüneli ile kış aksamalarını bitiren ve başkent Ankara'ya bağlanan otoyol nerededir?",
      kpssNot: "Bolu Dağı Tüneli ile İstanbul-Ankara kesintisiz otoyol bağı kurulmuştur."
    },

    // C. GÜNEYDOĞU OTOYOL AKSI (Ankara - Şanlıurfa)
    {
      id: "ula_otodog_ankara_nigde",
      groupId: "grp_guneydogu_otoyol_aksi",
      groupName: "Güneydoğu Otoyol Aksı (Ankara - Şanlıurfa)",
      name: "Ankara - Niğde Akıllı Otoyolu",
      shortName: "Ankara - Niğde Otoyolu",
      category: "ulasim",
      type: "Otoyol / İç Anadolu Akıllı Hat",
      lat: 38.70, lng: 34.00,
      region: "İç Anadolu",
      city: "Ankara - Kırşehir - Nevşehir - Aksaray - Niğde",
      promptTitle: "Kırşehir ve Nevşehir bağlantılarıyla Ankara'yı güneye bağlayan akıllı otoyol nerededir?",
      kpssNot: "Akıllı otoyol altyapısıyla İç Anadolu'yu Akdeniz ve Güneydoğu'ya bağlar."
    },
    {
      id: "ula_otodog_adana_gaziantep_urfa",
      groupId: "grp_guneydogu_otoyol_aksi",
      groupName: "Güneydoğu Otoyol Aksı (Ankara - Şanlıurfa)",
      name: "Pozantı - Adana - Gaziantep - Şanlıurfa Otoyolu",
      shortName: "Adana - Gaziantep - Urfa Otoyolu",
      category: "ulasim",
      type: "Otoyol / Güneydoğu Transit Koridoru",
      lat: 37.10, lng: 37.00,
      region: "Güneydoğu Anadolu",
      city: "Mersin - Adana - Osmaniye - Gaziantep - Şanlıurfa",
      promptTitle: "Çukurova'dan başlayıp Gaziantep üzerinden Şanlıurfa'da son bulan otoyol aksı nerededir?",
      kpssNot: "KPSS Çok Önemli: Otoyol ŞANLIURFA'DA BİTER, Mardin'e doğru otoyol devam etmez."
    },

    // D. ADANA - İSKENDERUN OTOYOL KOLU
    {
      id: "ula_otoisk_adana_iskenderun",
      groupId: "grp_adana_iskenderun_otoyolu",
      groupName: "Adana - İskenderun Otoyol Kolu",
      name: "Ceyhan - Dörtyol - İskenderun Otoyolu",
      shortName: "İskenderun Otoyolu",
      category: "ulasim",
      type: "Otoyol / Hatay Kolu (İskenderun'da Biter)",
      lat: 36.80, lng: 36.00,
      region: "Akdeniz",
      city: "Adana - Ceyhan - Dörtyol - İskenderun",
      promptTitle: "Adana'dan güneye inen ve Hatay il merkezine (Antakya) gitmeyip İskenderun'da biten otoyol kolu hangisidir?",
      kpssNot: "KPSS Tuzağı: Otoyol Hatay merkeze (Antakya) gitmez; İskenderun Limanı'nda son bulur."
    },

    // E. OTOYOL BAĞLANTISI OLMAYAN MERKEZLER
    {
      id: "ula_otoyolsuz_merkezler_ic_bati",
      groupId: "grp_otoyolsuz_merkezler",
      groupName: "Otoyol Bağlantısı Bulunmayan Önemli Merkezler",
      name: "Eskişehir, Yozgat ve Sivas (YHT Var, Otoyol Yok)",
      shortName: "Eskişehir, Yozgat, Sivas",
      category: "ulasim",
      type: "Otoyol / Otoyolsuz Merkezler",
      lat: 39.75, lng: 35.00,
      region: "İç Anadolu",
      city: "Eskişehir, Yozgat, Sivas",
      promptTitle: "Hızlı tren (YHT) bağlantısı olmasına rağmen OTOYOL ŞEBEKESİ BULUNMAYAN iller hangileridir?",
      kpssNot: "Eskişehir, Yozgat ve Sivas'a YHT ulaşır ancak otoyol bağlantıları yoktur."
    },
    {
      id: "ula_otoyolsuz_merkezler_kestirme",
      groupId: "grp_otoyolsuz_merkezler",
      groupName: "Otoyol Bağlantısı Bulunmayan Önemli Merkezler",
      name: "Antalya, Samsun, Erzurum ve Mardin (Otoyol Yok)",
      shortName: "Antalya, Samsun, Erzurum, Mardin",
      category: "ulasim",
      type: "Otoyol / Otoyolsuz Merkezler",
      lat: 38.50, lng: 36.50,
      region: "Türkiye Geneli",
      city: "Antalya, Samsun, Erzurum, Mardin",
      promptTitle: "Büyük turizm, liman veya bölgesel merkez olmalarına rağmen otoyol ağına bağlı olmayan iller hangileridir?",
      kpssNot: "Antalya (turizm devi), Samsun (Karadeniz'in en büyüğü), Erzurum ve Mardin'de otoyol yoktur."
    },

    // =========================================================================
    // 5. BORU HATLARI & ENERJİ KORİDORLARI (ŞEHİR ŞEHİR BAĞLI PİNLER)
    // =========================================================================
    {
      id: "ula_btc_giris_cikis",
      name: "Bakü - Tiflis - Ceyhan (BTC) Ham Petrol Hattı",
      shortName: "BTC Petrol Hattı",
      category: "ulasim",
      type: "Boru Hattı / Petrol Koridoru",
      lat: 38.50, lng: 39.00,
      region: "Türkiye Geneli",
      city: "Ardahan (Giriş) - Kars - Erzurum - Erzincan - Sivas - Malatya - Adana Ceyhan Terminali (Çıkış)",
      promptTitle: "Hazar (Azerbaycan) petrolünü Gürcistan üzerinden Ceyhan Deniz Terminali'ne ulaştıran hat hangisidir?",
      kpssNot: "Hazar petrolünü Akdeniz'e (Ceyhan) taşır; küresel enerji koridorumuzun omurgasıdır."
    },
    {
      id: "ula_kerkuk_yumurtalik",
      name: "Kerkük - Yumurtalık Ham Petrol Hattı",
      shortName: "Kerkük - Yumurtalık Hattı",
      category: "ulasim",
      type: "Boru Hattı / Petrol Koridoru",
      lat: 37.10, lng: 39.00,
      region: "Güneydoğu Anadolu",
      city: "Şırnak (Silopi) - Nusaybin - Şanlıurfa - Gaziantep - Adana Yumurtalık",
      promptTitle: "Irak ham petrolünü Akdeniz kıyısındaki Yumurtalık deniz terminaline taşıyan tarihi boru hattı hangisidir?",
      kpssNot: "Irak petrolünü Akdeniz'e çıkaran ilk uluslararası boru hattımızdır."
    },
    {
      id: "ula_tanap_koridoru",
      name: "TANAP (Trans Anadolu Doğal Gaz Boru Hattı)",
      shortName: "TANAP Doğalgaz Hattı",
      category: "ulasim",
      type: "Boru Hattı / En Uzun Gaz Hattı",
      lat: 39.80, lng: 34.50,
      region: "Türkiye Geneli",
      city: "Ardahan (Giriş) - Erzurum - Sivas - Ankara - Eskişehir - Bursa - Edirne İpsala (Avrupa Çıkışı)",
      promptTitle: "Azerbaycan Şah Deniz gazını 20 ilden geçerek Edirne İpsala üzerinden Avrupa'ya (TAP) taşıyan en uzun hat hangisidir?",
      kpssNot: "Türkiye'yi doğudan batıya kat eden EN UZUN doğal gaz boru hattıdır."
    },
    {
      id: "ula_mavi_turkakim",
      name: "Mavi Akım & TürkAkım Doğal Gaz Hatları",
      shortName: "Mavi Akım & TürkAkım",
      category: "ulasim",
      type: "Boru Hattı / Karadeniz Denizaltı Gaz Hatları",
      lat: 41.50, lng: 32.00,
      region: "Karadeniz",
      city: "Samsun (Mavi Akım Girişi) & Kırklareli Kıyıköy (TürkAkım Girişi)",
      promptTitle: "Karadeniz'in tabanından geçerek Rus doğal gazını Samsun ve Trakya Kıyıköy'e ulaştıran denizaltı hatları hangileridir?",
      kpssNot: "Karadeniz'in tabanından geçer; Mavi Akım Samsun'a, TürkAkım Trakya Kıyıköy'e bağlanır."
    },

    // =========================================================================
    // 6. SINIR KAPILARI (GÜMRÜK & DEMİRYOLU / KARAYOLU KAPILARI)
    // =========================================================================
    {
      id: "ula_sinir_kapikule",
      name: "Kapıkule Sınır Kapısı (Bulgaristan)",
      shortName: "Kapıkule (En İşlek Kapı)",
      category: "ulasim",
      type: "Sınır Kapısı / Karayolu & Demiryolu",
      lat: 41.71, lng: 26.35,
      region: "Marmara",
      city: "Edirne (Bulgaristan Sınırı)",
      promptTitle: "Avrupa'ya açılan hem karayolu hem demiryolu bağlantılı Türkiye'nin EN İŞLEK sınır kapısı hangisidir?",
      kpssNot: "Türkiye'nin ve Avrupa'nın EN İŞLEK kapısıdır; hem karayolu hem demiryolu vardır."
    },
    {
      id: "ula_sinir_uzunkopru_ipsala",
      name: "Uzunköprü ve İpsala Sınır Kapıları (Yunanistan)",
      shortName: "İpsala & Uzunköprü Kapıları",
      category: "ulasim",
      type: "Sınır Kapısı / Karayolu & Demiryolu",
      lat: 41.27, lng: 26.68,
      region: "Marmara",
      city: "Edirne (Yunanistan Sınırı)",
      promptTitle: "Yunanistan'a açılan en işlek karayolu kapısı (İpsala) ile DEMİRYOLU KAPISI (Uzunköprü) nerededir?",
      kpssNot: "İpsala işlek karayolu; Uzunköprü ise Yunanistan ile DEMİRYOLU bağlantılı kapıdır."
    },
    {
      id: "ula_sinir_sarp_cambaz",
      name: "Sarp Kapısı ve Cambaz İstasyonu (Gürcistan)",
      shortName: "Sarp & Cambaz (Demir İpek Yolu)",
      category: "ulasim",
      type: "Sınır Kapısı / Kimlikle Geçiş & BTK Demiryolu",
      lat: 41.35, lng: 42.35,
      region: "Doğu Anadolu",
      city: "Artvin (Sarp) - Ardahan/Kars (Cambaz İstasyonu)",
      promptTitle: "Kimlikle geçiş yapılan Sarp Kapısı ile Bakü-Tiflis-Kars (Demir İpek Yolu) demiryolunun girdiği Cambaz İstasyonu nerededir?",
      kpssNot: "Sarp işlek karayoludur (kimlikle geçilir); Cambaz İstasyonu BTK demiryolunun giriş kapısıdır."
    },
    {
      id: "ula_sinir_dilucu",
      name: "Dilucu (Umut) Sınır Kapısı (Nahçıvan / Azerbaycan)",
      shortName: "Dilucu (Zengezur Koridoru)",
      category: "ulasim",
      type: "Sınır Kapısı / En Kısa Sınır",
      lat: 39.65, lng: 44.80,
      region: "Doğu Anadolu",
      city: "Iğdır (Nahçıvan Sınırı)",
      promptTitle: "Türkiye'nin en kısa kara sınırında yer alan ve Zengezur Koridoru demiryoluyla Azerbaycan'a bağlanacak kapı hangisidir?",
      kpssNot: "En kısa kara sınırımızdır (Nahçıvan); Zengezur Koridoru ile demiryolu bağlanacaktır."
    },
    {
      id: "ula_sinir_kapikoy_gurbulak",
      name: "Kapıköy ve Gürbulak Sınır Kapıları (İran)",
      shortName: "Gürbulak & Kapıköy Kapıları",
      category: "ulasim",
      type: "Sınır Kapısı / Karayolu & Demiryolu",
      lat: 38.56, lng: 44.33,
      region: "Doğu Anadolu",
      city: "Ağrı (Gürbulak) - Van (Kapıköy)",
      promptTitle: "İran ile en işlek transit karayolu kapısı (Gürbulak) ve DEMİRYOLU BAĞLANTILI KAPI (Kapıköy) nerededir?",
      kpssNot: "Gürbulak transit karayolu; Kapıköy (Van) ise İRAN İLE DEMİRYOLU bağlantılı kapıdır."
    },
    {
      id: "ula_sinir_akyaka_dogukapi",
      name: "Akyaka / Doğukapı Sınır Kapısı (Ermenistan)",
      shortName: "Doğukapı (Ermenistan - Kapalı)",
      category: "ulasim",
      type: "Sınır Kapısı / Demiryolu (Kapalı)",
      lat: 40.75, lng: 43.62,
      region: "Doğu Anadolu",
      city: "Kars (Akyaka)",
      promptTitle: "Ermenistan ile demiryolu bağlantısı bulunmasına rağmen siyasi nedenlerle KAPALI TUTULAN sınır kapısı hangisidir?",
      kpssNot: "Kars Akyaka'da demiryolu kapısıdır; siyasi nedenlerle fiilen KAPALIDIR."
    },
    {
      id: "ula_sinir_habur_irak",
      name: "Habur Sınır Kapısı (Irak)",
      shortName: "Habur (Demiryolsuz)",
      category: "ulasim",
      type: "Sınır Kapısı / Orta Doğu Ticareti (Demiryolu Yok)",
      lat: 37.15, lng: 42.57,
      region: "Güneydoğu Anadolu",
      city: "Şırnak (Silopi - Irak Sınırı)",
      promptTitle: "Orta Doğu ticaretinin en işlek karayolu kapısı olan ancak DEMİRYOLU BULUNMAYAN sınır kapısı hangisidir?",
      kpssNot: "Irak'a açılan en işlek ticaret kapısıdır; ancak DEMİRYOLU BAĞLANTISI YOKTUR."
    },
    {
      id: "ula_sinir_nusaybin_cilvegozu",
      name: "Nusaybin ve Cilvegözü Sınır Kapıları (Suriye)",
      shortName: "Nusaybin & Cilvegözü",
      category: "ulasim",
      type: "Sınır Kapısı / Demiryolu & Karayolu",
      lat: 37.07, lng: 41.22,
      region: "Güneydoğu Anadolu",
      city: "Mardin (Nusaybin) - Hatay (Cilvegözü)",
      promptTitle: "Suriye sınırında DEMİRYOLU BAĞLANTISI bulunan tarihi Bağdat demiryolu kapısı hangisidir?",
      kpssNot: "Nusaybin (Mardin) ve Çobanbey (Kilis) Suriye ile DEMİRYOLU BAĞLANTISI olan kapılardır. Cilvegözü ve Öncüpınar en işlek karayolu kapılarıdır. (Irak ile doğrudan demiryolu yoktur; dolaylı olarak Suriye üzerinden bağlantı kurulabilmektedir)."
    },

    // =========================================================================
    // 6. TİCARET VE SERBEST BÖLGELER (İhracat Odaklı Özel Alanlar)
    // =========================================================================
    {
      id: "ula_serbest_mersin",
      name: "Mersin Serbest Bölgesi",
      shortName: "Mersin Serbest Bölgesi (İlk)",
      category: "ulasim",
      type: "Ticaret / İlk Serbest Bölge",
      lat: 36.80, lng: 34.64,
      region: "Akdeniz",
      city: "Mersin",
      promptTitle: "1987 yılında Türkiye'de kurulan İLK SERBEST TİCARET BÖLGESİ haritada neresidir?",
      kpssNot: "Türkiye'nin İLK SERBEST TİCARET BÖLGESİ'dir (1987). Limanın hemen bitişiğinde yer alması lojistik üstünlük sağlar."
    },
    {
      id: "ula_serbest_bolgeler_haritasi",
      name: "Türkiye Serbest Ticaret Bölgeleri",
      shortName: "Serbest Bölgeler Ağı",
      category: "ulasim",
      type: "Ticaret / Serbest Bölgeler",
      lat: 38.42, lng: 27.14,
      region: "Türkiye Geneli",
      city: "İstanbul, Kocaeli, Sakarya, Bursa, Tekirdağ, İzmir, Denizli, Antalya, Adana, Gaziantep, Kayseri, Samsun, Trabzon, Rize",
      promptTitle: "İhracatı artırmak için kurulan serbest ticaret bölgelerinin bulunduğu iller arasında HANGİ BÜYÜKŞEHİR YER ALMAZ?",
      kpssNot: "KPSS Soru Tuzağı: İstanbul, İzmir, Kocaeli, Bursa, Adana, Gaziantep, Antalya, Samsun, Trabzon gibi 15+ merkezde serbest bölge varken BAŞKENT ANKARA'DA SERBEST BÖLGE YOKTUR."
    }
  ]
});
