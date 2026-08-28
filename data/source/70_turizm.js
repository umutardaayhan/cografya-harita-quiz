/**
 * 🏛️ TURİZM, UNESCO DÜNYA MİRASLARI, MİLLİ PARKLAR & İNANÇ TURİZMİ — Yazım Kaynağı
 * Derleyici: node tools/build_packs.js
 */
Object.assign(COGRAFYA_DATA_EXT, {
  turizm: [
    // =========================================================================
    // 1. UNESCO DÜNYA MİRAS LİSTESİ NOKTALARI
    // =========================================================================
    {
      id: "tur_unesco_istanbul",
      name: "İstanbul Tarihi Alanları",
      shortName: "İstanbul Tarihi Alanları",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Kültürel",
      lat: 41.01, lng: 28.98,
      region: "Marmara",
      city: "İstanbul (Tarihi Yarımada)",
      promptTitle: "Ayasofya, Topkapı Sarayı, Sultanahmet ve Süleymaniye camilerini kapsayan Türkiye'nin en çok turist çeken UNESCO mirası haritada neresidir?",
      kpssNot: "Ayasofya, Topkapı Sarayı, Sultanahmet Camii, Süleymaniye Camii ve Zeyrek'i içine alan Tarihi Yarımada; Türkiye'nin en çok yabancı turist ağırlayan kültürel merkezidir."
    },
    {
      id: "tur_unesco_divrigi",
      groupId: "grp_divrigi_sivas",
      name: "Divriği Ulu Camii ve Darüşşifası",
      shortName: "Divriği Ulu Camii",
      category: "turizm",
      type: "UNESCO Dünya Mirası / İlk Kayıt (1985)",
      lat: 39.37, lng: 38.12,
      region: "İç Anadolu",
      city: "Sivas (Divriği)",
      promptTitle: "Eşsiz taş işçiliği ve gölge siluetleriyle 1985 yılında Türkiye'nin UNESCO listesine giren İLK KÜLTÜR MİRASI haritada neresidir?",
      kpssNot: "1985 yılında İstanbul ile birlikte TÜRKİYE'NİN UNESCO LİSTESİNE GİREN İLK ESERİDİR. Mengücekli eseri olup kapılarındaki ışık-gölge namaz kılan insan siluetiyle ünlüdür."
    },
    {
      id: "tur_unesco_kapadokya",
      groupId: "grp_kapadokya_goreme",
      name: "Kapadokya & Göreme Tarihî Millî Parkı",
      shortName: "Kapadokya (Karma Miras)",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Karma Miras",
      lat: 38.64, lng: 34.83,
      region: "İç Anadolu",
      city: "Nevşehir (Ürgüp - Göreme - Derinkuyu)",
      promptTitle: "Volkanik peribacaları (doğal) ile yeraltı şehirleri ve kaya kiliselerini (kültürel) bir arada barındıran KARMA UNESCO MİRASI haritada neresidir?",
      kpssNot: "Hem DOĞAL (volkanik peribacaları) hem KÜLTÜREL (kaya kiliseleri, Derinkuyu yeraltı şehri) özellikleri bir arada taşıyan iki KARMA MİRASIMIZDAN BİRİDİR (Diğeri Pamukkale)."
    },
    {
      id: "tur_unesco_hattusa",
      name: "Hattuşa (Boğazköy) Hitit Başkenti",
      shortName: "Hattuşa",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Antik Başkent",
      lat: 40.02, lng: 34.62,
      region: "İç Anadolu",
      city: "Çorum (Boğazkale)",
      promptTitle: "Hitit İmparatorluğu'nun başkenti olan, Aslanlı Kapı ve tarihin ilk yazılı antlaşması Kadeş tabletlerinin bulunduğu UNESCO mirası haritada neresidir?",
      kpssNot: "Hitit İmparatorluğu'nun tarihi başkentidir. Yazılıkaya açık hava tapınağı, Aslanlı Kapı ve Kadeş Barış Antlaşması çivi yazılı tabletleri buradadır."
    },
    {
      id: "tur_unesco_nemrut_adiyaman",
      groupId: "grp_nemrut_kommagene_adiyaman",
      name: "Nemrut Dağı Kommagene Kalıntıları",
      shortName: "Nemrut Dağı (Adıyaman)",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Anıt Heykeller",
      lat: 37.98, lng: 38.74,
      region: "Güneydoğu Anadolu",
      city: "Adıyaman (Kâhta)",
      promptTitle: "Kommagene Kralı I. Antiochos'un yaptırdığı dev tanrı heykelleri ve tümülüsün bulunduğu ünlü UNESCO mirası haritada neresidir?",
      kpssNot: "Kommagene Krallığı'na ait devasa heykeller ve tümülüs bulunur; gün doğumu/batımı turizmiyle meşhurdur. (Bitlis'teki volkanik Nemrut Krateri ile karıştırılmamalıdır)."
    },
    {
      id: "tur_unesco_xanthos_letoon",
      name: "Xanthos - Letoon Antik Kentleri",
      shortName: "Xanthos - Letoon",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Likya Başkenti",
      lat: 36.36, lng: 29.32,
      region: "Akdeniz",
      city: "Muğla (Fethiye) - Antalya (Kaş Sınırı)",
      promptTitle: "Likya Uygarlığı'nın idari başkenti ile kutsal din merkezini birlikte kapsayan, iki ilin sınırındaki ortak UNESCO mirası haritada neresidir?",
      kpssNot: "Likya Uygarlığı'nın idari merkezi (Xanthos) ve kutsal din merkezidir (Letoon). Muğla ile Antalya'nın idari sınırında yer alır."
    },
    {
      id: "tur_unesco_safranbolu",
      groupId: "grp_safranbolu_unesco",
      name: "Safranbolu Şehri",
      shortName: "Safranbolu Evleri",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Osmanlı Mimarisi",
      lat: 41.25, lng: 32.69,
      region: "Karadeniz",
      city: "Karabük (Safranbolu)",
      promptTitle: "Geleneksel ahşap Osmanlı sivil mimarisini ve kent dokusunu koruyarak UNESCO Dünya Mirası ilan edilen yerleşim haritada neresidir?",
      kpssNot: "Osmanlı ahşap ve kerpiç sivil konak mimarisini, arastalarını ve lonca kültürünü bozulmadan koruyan ünlü kültür mirasıdır."
    },
    {
      id: "tur_unesco_troya",
      name: "Troya (Truva) Antik Kenti",
      shortName: "Troya",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Antik Kent",
      lat: 39.96, lng: 26.24,
      region: "Marmara",
      city: "Çanakkale",
      promptTitle: "Homeros'un İlyada Destanı'nda anlatılan, 9 farklı katmandan oluşan ünlü antik kent ve savaş alanı haritada neresidir?",
      kpssNot: "Homeros'un İlyada destanına konu olan Truva Savaşı'nın geçtiği, 9 arkeolojik katmana sahip dünyaca ünlü antik ören yeridir."
    },
    {
      id: "tur_unesco_pamukkale",
      groupId: "grp_pamukkale_hierapolis",
      name: "Pamukkale - Hierapolis",
      shortName: "Pamukkale (Karma Miras)",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Karma Miras",
      lat: 37.92, lng: 29.12,
      region: "Ege",
      city: "Denizli",
      promptTitle: "Karstik traverten terasları (doğal) ile Hierapolis antik kentini ve Kleopatra Havuzu'nu (kültürel) barındıran KARMA UNESCO MİRASI haritada neresidir?",
      kpssNot: "Kalsiyum oksitli karstik termal suların oluşturduğu travertenler (DOĞAL) ile Hierapolis Antik Kenti (KÜLTÜREL) bir arada KARMA MİRAS'tır."
    },
    {
      id: "tur_unesco_selimiye",
      name: "Selimiye Camii ve Külliyesi",
      shortName: "Selimiye Camii",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Mimar Sinan Ustalık",
      lat: 41.68, lng: 26.56,
      region: "Marmara",
      city: "Edirne",
      promptTitle: "Mimar Sinan'ın 'ustalık eserim' dediği, tek kubbeli mimarisi ve minareleriyle UNESCO listesinde yer alan şaheser haritada neresidir?",
      kpssNot: "Mimar Sinan'ın 80 yaşında inşa ettiği 'USTALIK ESERİM' dediği, tek kubbe altındaki muazzam akustik ve mimari şaheserdir."
    },
    {
      id: "tur_unesco_catalhoyuk",
      name: "Çatalhöyük Neolitik Kenti",
      shortName: "Çatalhöyük",
      category: "turizm",
      type: "UNESCO Dünya Mirası / İlk Şehirleşme",
      lat: 37.67, lng: 32.83,
      region: "İç Anadolu",
      city: "Konya (Çumra)",
      promptTitle: "Neolitik dönemde çatılardan girilen bitişik evleriyle insanlığın ilk yerleşik tarım ve şehirleşme modeli sayılan UNESCO mirası haritada neresidir?",
      kpssNot: "İnsanlığın avcı-toplayıcılıktan yerleşik tarım ve köy/kent hayatına geçişini belgeleyen M.Ö. 7400'lere uzanan ilk yerleşim alanıdır."
    },
    {
      id: "tur_unesco_cumalikizik",
      name: "Bursa ve Cumalıkızık (Osmanlı İmparatorluğu'nun Doğuşu)",
      shortName: "Cumalıkızık",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Tarihi Köy",
      lat: 40.17, lng: 29.17,
      region: "Marmara",
      city: "Bursa (Yıldırım)",
      promptTitle: "Erken Osmanlı döneminin kırsal yaşam dokusunu, dar sokaklarını ve rengarenk tarihi konaklarını koruyan UNESCO köyü haritada neresidir?",
      kpssNot: "Bursa'nın fethiyle kurulan 700 yıllık vakıf köyüdür; erken Osmanlı dönemi konakları ve ticari kırsal yaşam dokusuyla korunmaktadır."
    },
    {
      id: "tur_unesco_bergama",
    groupId: 'grp_bergama_unesco',
      name: "Bergama Çok Katmanlı Kültürel Peyzajı",
      shortName: "Bergama",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Helenistik Başkent",
      lat: 39.12, lng: 27.18,
      region: "Ege",
      city: "İzmir (Bergama)",
      promptTitle: "Parşömen kağıdının icat edildiği, dik yamaç tiyatrosu ve Asklepion sağlık merkeziyle ünlü UNESCO mirası haritada neresidir?",
      kpssNot: "Parşömenin (Bergama kağıdı) doğduğu yerdir. Dünyanın en dik antik tiyatrosu, Zeus Sunağı ve ilk büyük tıp merkezi Asklepion buradadır."
    },
    {
      id: "tur_unesco_efes",
      groupId: "grp_efes_selcuk",
      name: "Efes Antik Kenti",
      shortName: "Efes",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Liman Kenti",
      lat: 37.94, lng: 27.34,
      region: "Ege",
      city: "İzmir (Selçuk)",
      promptTitle: "Celsus Kütüphanesi, Artemis Tapınağı ve Meryem Ana Evi ile iki farklı UNESCO mekanına birden ev sahipliği yapan ildeki antik kent neresidir?",
      kpssNot: "KPSS Çok Önemli Bilgi: Bergama ve Efes ile Türkiye'de UNESCO LİSTESİNDE 2 AYRI MEKANA SAHİP TEK İL İZMİR'DİR. Küçük Menderes alüvyonlarıyla liman özelliğini yitirmiştir."
    },
    {
      id: "tur_unesco_diyarbakir_hevsel",
      name: "Diyarbakır Kalesi ve Hevsel Bahçeleri",
      shortName: "Diyarbakır Surları & Hevsel",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Kültürel Peyzaj",
      lat: 37.91, lng: 40.24,
      region: "Güneydoğu Anadolu",
      city: "Diyarbakır",
      promptTitle: "Çin Seddi'nden sonra dünyanın en uzun surları kabul edilen siyah bazalt taşlı kale ve Dicle kenarındaki tarihi bahçeler haritada neresidir?",
      kpssNot: "Bazalt taşından yapılmış devasa Diyarbakır Surları ile Dicle Nehri kıyısında 8000 yıldır tarım yapılan Hevsel Bahçeleri ortak kültürel peyzajdır."
    },
    {
      id: "tur_unesco_ani",
      name: "Ani Arkeolojik Alanı",
      shortName: "Ani Harabeleri",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Orta Çağ Kenti",
      lat: 40.51, lng: 43.57,
      region: "Doğu Anadolu",
      city: "Kars (Arpaçay Sınırı)",
      promptTitle: "Ermenistan sınırında '1001 Kiliseli Şehir' olarak bilinen, İpek Yolu üzerindeki görkemli Orta Çağ kenti haritada neresidir?",
      kpssNot: "'1001 Kiliseli Şehir' ve '40 Kapılı Kent' olarak anılır. İpek Yolu'nun Anadolu'ya giriş kapısıdır; Menuçehr Camii (Anadolu'daki ilk Türk camisi) buradadır."
    },
    {
      id: "tur_unesco_afrodisias",
      name: "Afrodisias Antik Kenti",
      shortName: "Afrodisias",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Mermer Heykeltıraşlık",
      lat: 37.71, lng: 28.72,
      region: "Ege",
      city: "Aydın (Karacasu)",
      promptTitle: "Antik dönemin en büyük mermer heykeltıraşlık okuluna ve 30 bin kişilik stadyumuna sahip UNESCO antik kenti haritada neresidir?",
      kpssNot: "Yakınındaki beyaz/mavi mermer ocakları sayesinde Roma dünyasının 1 numaralı heykeltıraşlık okulu olmuştur. 30 bin kişilik stadyumu çok iyi korunmuştur."
    },
    {
      id: "tur_unesco_gobeklitepe",
      name: "Göbeklitepe & Karahantepe (Taş Tepeler)",
      shortName: "Göbeklitepe (Tarihin Sıfır Noktası)",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Tarihin İlk Tapınağı",
      lat: 37.22, lng: 38.92,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa",
      promptTitle: "12 bin yıllık 'T' biçimli dikilitaşlarıyla insanlık tarihinin bilinen en eski inanç ve toplanma merkezi kabul edilen UNESCO alanı haritada neresidir?",
      kpssNot: "M.Ö. 10.000'lere uzanan T sütunlu tapınaklarıyla 'Tarihin Sıfır Noktası'dır. Yerleşik hayatın tarımdan önce inanç sebebiyle başladığını kanıtlamıştır."
    },
    {
      id: "tur_unesco_arslantepe",
      name: "Arslantepe Höyüğü",
      shortName: "Arslantepe Höyüğü",
      category: "turizm",
      type: "UNESCO Dünya Mirası / İlk Kerpiç Saray",
      lat: 38.38, lng: 38.36,
      region: "Doğu Anadolu",
      city: "Malatya (Battalgazi)",
      promptTitle: "Dünyanın en eski kerpiç saray kompleksini ve ilk madeni kılıçlarını barındıran, devlet sisteminin doğduğu kabul edilen höyük haritada neresidir?",
      kpssNot: "Devlet sisteminin ve bürokrasinin doğduğu yer kabul edilen M.Ö. 3300'lere ait dünyanın en eski kerpiç saray kompleksine ev sahipliği yapar."
    },
    {
      id: "tur_unesco_gordion",
      name: "Gordion Antik Kenti",
      shortName: "Gordion (Frig Başkenti)",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Frig Başkenti",
      lat: 39.65, lng: 31.98,
      region: "İç Anadolu",
      city: "Ankara (Polatlı)",
      promptTitle: "Frigya Krallığı'nın başkenti olan, Kral Midas'ın Tümülüsü ve ünlü 'Kör Düğüm' efsanesinin geçtiği UNESCO ören yeri haritada neresidir?",
      kpssNot: "Frig Krallığı'nın başkentidir; Kral Midas'ın mezar odası (tümülüs) ve Büyük İskender'in kestiği rivayet edilen Gordion Düğümü buradadır."
    },
    {
      id: "tur_ahsap_esrefoglu",
      groupId: "grp_ahsap_hipostil_camiler",
      groupName: "Orta Çağ Ahşap Hipostil Camileri (5 Camili Seri Miras)",
      name: "Eşrefoğlu Camii (Beyşehir)",
      shortName: "Eşrefoğlu Camii",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Ahşap Hipostil Cami",
      lat: 37.68, lng: 31.72,
      region: "İç Anadolu",
      city: "Konya (Beyşehir)",
      kpssNot: "Seri mirasın en büyük ve en ünlü üyesidir; 42 ahşap direkli orman görünümlü harimiyle bilinir."
    },
    {
      id: "tur_ahsap_sivrihisar",
      groupId: "grp_ahsap_hipostil_camiler",
      groupName: "Orta Çağ Ahşap Hipostil Camileri (5 Camili Seri Miras)",
      name: "Sivrihisar Ulu Camii",
      shortName: "Sivrihisar Ulu Camii",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Ahşap Hipostil Cami",
      lat: 39.45, lng: 31.53,
      region: "İç Anadolu",
      city: "Eskişehir (Sivrihisar)",
      kpssNot: "Anadolu Selçuklu döneminden kalan ahşap direkli (hipostil) ulu cami örneğidir."
    },
    {
      id: "tur_ahsap_mahmutbey",
      groupId: "grp_ahsap_hipostil_camiler",
      groupName: "Orta Çağ Ahşap Hipostil Camileri (5 Camili Seri Miras)",
      name: "Mahmut Bey Camii (Kasaba Köyü)",
      shortName: "Mahmut Bey Camii",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Ahşap Hipostil Cami",
      lat: 41.47, lng: 33.66,
      region: "Karadeniz",
      city: "Kastamonu (Kasaba Köyü)",
      kpssNot: "Çivi kullanılmadan inşa edilen ahşap işçiliği ve kalem işi bezemeleriyle ünlüdür."
    },
    {
      id: "tur_ahsap_arslanhane",
      groupId: "grp_ahsap_hipostil_camiler",
      groupName: "Orta Çağ Ahşap Hipostil Camileri (5 Camili Seri Miras)",
      name: "Arslanhane Camii (Ulus)",
      shortName: "Arslanhane Camii",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Ahşap Hipostil Cami",
      lat: 39.94, lng: 32.86,
      region: "İç Anadolu",
      city: "Ankara (Ulus)",
      kpssNot: "Ankara'nın en eski camilerindendir; ahşap direkli harimi ve çini mihrabıyla listeye girmiştir."
    },
    {
      id: "tur_ahsap_afyon_ulu",
      groupId: "grp_ahsap_hipostil_camiler",
      groupName: "Orta Çağ Ahşap Hipostil Camileri (5 Camili Seri Miras)",
      name: "Afyonkarahisar Ulu Camii",
      shortName: "Afyon Ulu Camii",
      category: "turizm",
      type: "UNESCO Dünya Mirası / Ahşap Hipostil Cami",
      lat: 38.76, lng: 30.54,
      region: "Ege",
      city: "Afyonkarahisar",
      kpssNot: "Selçuklu dönemi ahşap direkli ulu camisidir; 40 ahşap sütun üzerine oturur."
    },
    {
      id: "tur_unesco_sardes",
      name: "Sardes Antik Kenti ve Bintepe Tümülüsleri",
      shortName: "Sardes & Bintepe (En Yeni UNESCO)",
      category: "turizm",
      type: "UNESCO Dünya Mirası / En Yeni Eklenen (Lidya Başkenti)",
      lat: 38.49, lng: 28.04,
      region: "Ege",
      city: "Manisa (Salihli)",
      promptTitle: "Parayı ilk basan Lidyalıların başkenti ve devasa tümülüs mezarlarıyla UNESCO DÜNYA MİRAS LİSTESİ'NE EN SON DAHİL EDİLEN MEKAN haritada neresidir?",
      kpssNot: "KPSS En Güncel Bilgi: Lidyalıların başkenti Sardes (Kral Yolu başlangıcı, paranın basıldığı yer) ve Anadolu Piramitleri denilen Bintepe Tümülüsleri, UNESCO LİSTESİNE EN SON DAHİL EDİLEN MEKANDIR."
    },

    // =========================================================================
    // 2. MİLLİ PARKLAR (İlk, En Son ve En Önemliler)
    // =========================================================================
    {
      id: "tur_mp_yozgat_camligi",
      name: "Yozgat Çamlığı Milli Parkı",
      shortName: "Yozgat Çamlığı (İlk MP)",
      category: "turizm",
      type: "Milli Park / Türkiye'nin İlk Milli Parkı (1958)",
      lat: 39.81, lng: 34.82,
      region: "İç Anadolu",
      city: "Yozgat",
      promptTitle: "1958 yılında Türkiye'de ilan edilen İLK MİLLİ PARK haritada neresidir?",
      kpssNot: "1958 yılında ilan edilen TÜRKİYE'NİN İLK MİLLİ PARKI'DIR. Kafkas çamı (karaçam) relikt kalıntısı barındırır."
    },
    {
      id: "tur_mp_geben_vadisi",
      name: "Geben Vadisi Milli Parkı",
      shortName: "Geben Vadisi (En Son MP)",
      category: "turizm",
      type: "Milli Park / Türkiye'nin En Son Milli Parkı",
      lat: 37.75, lng: 36.45,
      region: "Akdeniz",
      city: "Kahramanmaraş (Andırın)",
      promptTitle: "Resmi Gazete'de ilan edilerek Türkiye'nin EN SON MİLLİ PARKI unvanını alan doğa alanı haritada neresidir?",
      kpssNot: "KPSS En Güncel Bilgi: Türkiye'nin EN SON İLAN EDİLEN GÜNCEL MİLLİ PARKI Kahramanmaraş Andırın'daki GEBEN VADİSİ MİLLİ PARKI'DIR."
    },
    {
      id: "tur_mp_altindere",
      name: "Altındere Vadisi (Sümela) Milli Parkı",
      category: "turizm",
      type: "Milli Park / Karadeniz",
      lat: 40.69, lng: 39.66,
      region: "Karadeniz",
      city: "Trabzon (Maçka)",
      kpssNot: "Sarp kayalıklara inşa edilmiş tarihi Sümela Manastırı'nı ve ladin ormanlarını koruyan vadidir."
    },
    {
      id: "tur_mp_kackar",
    groupId: 'grp_kackar_masifi',
      name: "Kaçkar Dağları Milli Parkı",
      category: "turizm",
      type: "Milli Park / Buzul & Yayla",
      lat: 40.85, lng: 41.15,
      region: "Karadeniz",
      city: "Rize - Artvin",
      kpssNot: "Buzul gölleri, sirkler, alpin çayırlar ve Ayder Yaylası'nı kapsayan yüksek dağ ekosistemidir."
    },
    {
      id: "tur_mp_koprulu_kanyon",
      name: "Köprülü Kanyon Milli Parkı",
      category: "turizm",
      type: "Milli Park / Rafting & Kanyon",
      lat: 37.19, lng: 31.18,
      region: "Akdeniz",
      city: "Antalya (Manavgat)",
      kpssNot: "Köprüçay üzerinde rafting sporunun ve Türkiye'nin en büyük Akdeniz servisi ormanının bulunduğu kanyondur."
    },
    {
      id: "tur_mp_baskomutanlik",
      name: "Başkomutanlık Tarihi Milli Parkı",
      category: "turizm",
      type: "Milli Park / Tarihi Muharebe",
      lat: 38.72, lng: 30.25,
      region: "Ege",
      city: "Afyonkarahisar - Kütahya - Uşak",
      kpssNot: "Büyük Taarruz ve Dumlupınar Meydan Muharebesi'nin yaşandığı zafer tepelerini kapsar."
    },
    {
      id: "tur_mp_kuscenneti",
    groupId: 'grp_manyas_kus_cenneti',
      name: "Manyas Kuşcenneti Milli Parkı",
      category: "turizm",
      type: "Milli Park / Ramsar & Kuş Alanı",
      lat: 40.23, lng: 27.97,
      region: "Marmara",
      city: "Balıkesir (Bandırma)",
      kpssNot: "Göçmen kuşların üreme ve konaklama cennetidir; Avrupa Konseyi A Sınıfı Diploması ve Ramsar statüsündedir."
    },
    {
      id: "tur_mp_botan_vadisi",
      name: "Botan Vadisi Milli Parkı",
      category: "turizm",
      type: "Milli Park / Kanyon & Doğa",
      lat: 37.90, lng: 41.90,
      region: "Güneydoğu Anadolu",
      city: "Siirt (Tillo)",
      kpssNot: "Botan Çayı'nın oluşturduğu derin kanyon vadi ve Rasıl Hacar (Delikli Taş) seyir tepesiyle ünlüdür."
    },

    // =========================================================================
    // 3. İNANÇ TURİZMİ VE KUTSAL MEKANLAR
    // =========================================================================
    {
      id: "tur_inanc_meryem_ana",
      name: "Meryem Ana Evi",
      category: "turizm",
      type: "İnanç Turizmi / Hac Merkezi",
      lat: 37.91, lng: 27.33,
      region: "Ege",
      city: "İzmir (Selçuk - Bülbüldağı)",
      kpssNot: "Hristiyanlar için kutsal hac merkezidir; Papa VI. Paul ve Papa II. Jean Paul tarafından tescillenmiştir."
    },
    {
      id: "tur_inanc_noel_baba",
      name: "Aziz Nikolaos (Noel Baba) Kilisesi",
      category: "turizm",
      type: "İnanç Turizmi / Likya",
      lat: 36.24, lng: 29.98,
      region: "Akdeniz",
      city: "Antalya (Demre)",
      kpssNot: "Dünyada 'Noel Baba' olarak bilinen Aziz Nikolaos'un piskoposluk yaptığı ve mezarının bulunduğu tarihi kilisedir."
    },
    {
      id: "tur_inanc_st_paul_ashab",
      name: "St. Paul Kilisesi & Ashab-ı Kehf Mağarası",
      category: "turizm",
      type: "İnanç Turizmi / Kutsal Alan",
      lat: 36.92, lng: 34.90,
      region: "Akdeniz",
      city: "Mersin (Tarsus)",
      kpssNot: "Hristiyanlığı yayan havari St. Paul'ün kuyusu ve İslamiyet'te 'Yedi Uyurlar' olarak bilinen Ashab-ı Kehf Mağarası buradadır."
    },
    {
      id: "tur_inanc_st_pierre",
      name: "St. Pierre Kilisesi (Dünyanın İlk Mağara Kilisesi)",
      shortName: "St. Pierre Kilisesi",
      category: "turizm",
      type: "İnanç Turizmi / İlk Mağara Kilisesi",
      lat: 36.21, lng: 36.18,
      region: "Akdeniz",
      city: "Hatay (Antakya)",
      promptTitle: "Hristiyanlara 'Hristiyan' adının ilk kez verildiği ve dünyanın ilk mağara kilisesi kabul edilen kutsal mekan haritada neresidir?",
      kpssNot: "DÜNYANIN İLK MAĞARA KİLİSESİ kabul edilir. İsa'nın havarilerinden Petrus'un ilk vaazını verdiği ve cemaate 'Hristiyan' adının ilk kez verildiği yerdir."
    },
    {
      id: "tur_inanc_mevlana",
      name: "Mevlana Müzesi ve Türbesi",
      category: "turizm",
      type: "İnanç Turizmi / Tasavvuf",
      lat: 37.87, lng: 32.50,
      region: "İç Anadolu",
      city: "Konya",
      kpssNot: "Mevlevilik ve tasavvuf düşüncesinin merkezidir; Yeşil Kubbe (Kubbe-i Hadra) ve Şeb-i Arus törenleriyle milyonlarca ziyaretçi çeker."
    },
    {
      id: "tur_inanc_haci_bektas",
    groupId: 'grp_kapadokya_goreme',
      name: "Hacı Bektaş-ı Veli Türbesi ve Külliyesi",
      category: "turizm",
      type: "İnanç Turizmi / Tasavvuf",
      lat: 38.94, lng: 34.56,
      region: "İç Anadolu",
      city: "Nevşehir (Hacıbektaş)",
      kpssNot: "Anadolu Alevi-Bektaşi tasavvuf kültürünün ana ocağıdır; her yıl anma törenleri düzenlenir."
    },
    {
      id: "tur_inanc_mor_gabriel",
      name: "Mor Gabriel (Deyrulumur) Manastırı",
      shortName: "Mor Gabriel Manastırı",
      category: "turizm",
      type: "İnanç Turizmi / Süryani Kadim",
      lat: 37.49, lng: 41.53,
      region: "Güneydoğu Anadolu",
      city: "Mardin (Midyat)",
      promptTitle: "M.S. 397 yılında kurulan, dünyanın halen faaliyet gösteren en eski Süryani Ortodoks manastırı haritada neresidir?",
      kpssNot: "M.S. 397'de kurulmuş olup DÜNYANIN EN ESKİ FAAL SÜRYANİ ORTODOKS MANASTIRLARINDAN BİRİDİR; Turabdin platosunun kalbidir."
    },
    {
      id: "tur_inanc_veysel_karani",
      name: "Veysel Karani Türbesi",
      category: "turizm",
      type: "İnanç Turizmi / Ziyaretgah",
      lat: 38.16, lng: 41.77,
      region: "Güneydoğu Anadolu",
      city: "Siirt (Baykan)",
      kpssNot: "İslamiyet'te anne sevgisi ve peygamber aşığı olarak bilinen Veysel Karani adına yapılmış ünlü türbedir."
    },
    {
      id: "tur_inanc_akdamar",
      name: "Akdamar Kilisesi (Surp Haç)",
      category: "turizm",
      type: "İnanç Turizmi / Ada Kilisesi",
      lat: 38.34, lng: 43.03,
      region: "Doğu Anadolu",
      city: "Van (Gevaş - Akdamar Adası)",
      kpssNot: "Van Gölü üzerindeki Akdamar Adası'nda yer alır; dış cephesindeki Tevrat ve İncil kabartmalarıyla taş sanatının zirvesidir."
    },

    // =========================================================================
    // 4. SAKİN ŞEHİRLER (CITTASLOW)
    // =========================================================================
    {
      id: "tur_citta_seferihisar",
      name: "Seferihisar (İlk Sakin Şehir)",
      shortName: "Seferihisar (İlk Cittaslow)",
      category: "turizm",
      type: "Cittaslow / İlk Sakin Şehir (2009)",
      lat: 38.20, lng: 26.84,
      region: "Ege",
      city: "İzmir (Seferihisar - Sığacık)",
      promptTitle: "2009 yılında Türkiye'nin İLK SAKİN ŞEHRİ (Cittaslow) unvanını alan Ege sahil ilçesi haritada neresidir?",
      kpssNot: "2009 yılında İtalya merkezli Cittaslow ağına kabul edilen TÜRKİYE'NİN İLK SAKİN ŞEHRİDİR (Sığacık kalesi ve organik pazarıyla ünlüdür)."
    },
    {
      id: "tur_citta_ibradi",
      name: "İbradı (Düğmeli Evler - En Son Sakin Şehir)",
      shortName: "İbradı (En Son Cittaslow)",
      category: "turizm",
      type: "Cittaslow / En Yeni Sakin Şehir",
      lat: 37.10, lng: 31.60,
      region: "Akdeniz",
      city: "Antalya (İbradı - Ormana)",
      promptTitle: "Özgün harçsız 'Düğmeli Evleri' ve Altınbeşik Mağarası ile Türkiye'nin EN SON CİTTASLOW (Sakin Şehir) seçilen ilçesi haritada neresidir?",
      kpssNot: "KPSS En Güncel Bilgi: Harçsız sedir ağacı ve taşla örülen 'DÜĞMELİ EVLERİ' ve Altınbeşik Mağarası ile TÜRKİYE'NİN EN SON SAKİN ŞEHRİ (CITTASLOW) seçilmiştir."
    },
    {
      id: "tur_citta_halfeti",
      groupId: "grp_dogu_cittaslow",
      groupName: "Doğu'nun Sakin Şehirleri (Halfeti & Arapgir)",
      name: "Halfeti (Batık Şehir)",
      shortName: "Halfeti",
      category: "turizm",
      type: "Cittaslow / Sakin Şehir",
      lat: 37.25, lng: 37.87,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa (Halfeti)",
      promptTitle: "Birecik Barajı suları altında kalan 'Batık Şehir' ve siyah gülüyle ünlü sakin şehir haritada neresidir?",
      kpssNot: "Birecik Barajı suları altında kalan 'Batık Şehir' ve siyah gülüyle tescilli sakin şehirdir."
    },
    {
      id: "tur_citta_arapgir",
      groupId: "grp_dogu_cittaslow",
      groupName: "Doğu'nun Sakin Şehirleri (Halfeti & Arapgir)",
      name: "Arapgir (Tarihi Taş Evler)",
      shortName: "Arapgir",
      category: "turizm",
      type: "Cittaslow / Sakin Şehir",
      lat: 39.04, lng: 38.49,
      region: "Doğu Anadolu",
      city: "Malatya (Arapgir)",
      promptTitle: "Tarihi taş evleri ve coğrafi işaretli köhnü üzümüyle bilinen, Doğu Anadolu'nun tescilli sakin şehri haritada neresidir?",
      kpssNot: "Tarihi taş evleri ve coğrafi işaretli 'köhnü' üzümüyle tescillenmiş sakin şehirdir."
    },

    // =========================================================================
    // 5. DİĞER ÖNEMLİ DOĞAL VE KÜLTÜREL DEĞERLER
    // =========================================================================
    {
      id: "tur_uludag_kis",
      groupId: "grp_uludag_masifi",
      name: "Uludağ Kış Turizmi ve Milli Parkı",
      category: "turizm",
      type: "Kış Turizmi / Derinlik Volkanizması",
      lat: 40.10, lng: 29.13,
      region: "Marmara",
      city: "Bursa",
      kpssNot: "Türkiye'nin ilk ve en gelişmiş kış turizm merkezidir; jeolojik olarak bir iç püskürük batolit (derinlik volkanizması) kütlesidir."
    },
    {
      id: "tur_oludeniz_lagun",
      name: "Ölüdeniz Lagünü & Babadağ",
      category: "turizm",
      type: "Doğal Miras / Dalga Biriktirmesi Lagün",
      lat: 36.55, lng: 29.12,
      region: "Ege",
      city: "Muğla (Fethiye)",
      kpssNot: "Kıyı oku ve dalga biriktirmesi sonucu oluşmuş lagün doğa harikasıdır; Babadağ'dan yapılan yamaç paraşütüyle dünyaca ünlüdür."
    },
    {
      id: "tur_zeugma",
      name: "Zeugma Antik Kenti (Çingene Kızı Mozaiği)",
      shortName: "Zeugma Antik Kenti",
      category: "turizm",
      type: "Kültürel Miras / Mozaik Müzesi",
      lat: 37.05, lng: 37.86,
      region: "Güneydoğu Anadolu",
      city: "Gaziantep (Nizip)",
      promptTitle: "Fırat kıyısındaki Roma sınır kenti olan, 'Çingene Kızı' mozaiğiyle dünyaca tanınan antik kent haritada neresidir?",
      kpssNot: "Fırat kıyısındaki Roma sınır kentidir; kurtarılan 'Çingene Kızı' mozaiği Gaziantep Zeugma Müzesi'nde sergilenmektedir."
    },
    {
      id: "tur_meke_maari",
    groupId: 'grp_meke_tuzlasi',
      name: "Meke Maar Gölü (Dünyanın Nazar Boncuğu)",
      shortName: "Meke Maar Gölü",
      category: "turizm",
      type: "Doğal Miras / Volkanik Maar",
      lat: 37.69, lng: 33.64,
      region: "İç Anadolu",
      city: "Konya (Karapınar)",
      promptTitle: "Volkanik gaz patlamasıyla (maar) oluşan ve 'Dünyanın Nazar Boncuğu' olarak bilinen doğa harikası göl haritada neresidir?",
      kpssNot: "Gaz patlamasıyla oluşan çift evreli volkanik maar gölüdür. 'Dünyanın Nazar Boncuğu' unvanını taşır (ne yazık ki kuraklık ve yer altı suyu çekimiyle kurumaktadır)."
    },
    {
      id: "tur_ishak_pasa",
      name: "İshak Paşa Sarayı",
      shortName: "İshak Paşa Sarayı",
      category: "turizm",
      type: "Kültürel Miras / Saray Mimarisi",
      lat: 39.52, lng: 44.13,
      region: "Doğu Anadolu",
      city: "Ağrı (Doğubayazıt)",
      promptTitle: "Osmanlı, Selçuklu ve Barok mimarisini birleştiren, dünyada ilk kalorifer (merkezi ısıtma) sistemine sahip saray haritada neresidir?",
      kpssNot: "Osmanlı'nın Lale Devri'ndeki en görkemli sarayıdır. Dünyada MERKEZİ ISITMA (kalorifer) sisteminin kullanıldığı ilk saray yapılarındandır."
    },
    {
      id: "tur_hasankeyf",
      name: "Hasankeyf Tarihi Kenti",
      shortName: "Hasankeyf",
      category: "turizm",
      type: "Kültürel Miras / Tarihi Köprü & Kale",
      lat: 37.71, lng: 41.41,
      region: "Güneydoğu Anadolu",
      city: "Batman",
      promptTitle: "Dicle Nehri kenarında yer alan, Ilısu (Prof. Dr. Veysel Eroğlu) Barajı suları altında kalarak eserleri yeni yerleşime taşınan tarihi kent neresidir?",
      kpssNot: "GAP projesi kapsamında inşa edilen Ilısu (Veysel Eroğlu) Barajı suları altında kalmış; Zeynel Bey Türbesi gibi eserler yeni yerleşim alanına taşınmıştır."
    }
  ]
});
