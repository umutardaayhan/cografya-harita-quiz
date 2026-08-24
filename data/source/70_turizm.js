/**
 * 🏛️ TURİZM MERKEZLERİ & KÜLTÜR MİRASI — Yazım Kaynağı
 * Derleyici: node tools/build_packs.js
 */
Object.assign(COGRAFYA_DATA_EXT, {
  turizm: [
    // ---------------- TARİHÎ & KÜLTÜREL ----------------
    {
      id: "tur_kapadokya",
      name: "Kapadokya (Göreme Millî Parkı)",
      shortName: "Kapadokya",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 38.64, lng: 34.83,
      region: "İç Anadolu",
      city: "Nevşehir - Ürgüp - Göreme",
      promptTitle: "Peribacaları, yeraltı şehirleri ve kaya kiliseleriyle UNESCO listesinde yer alan turizm merkezi haritada neresidir?",
      kpssNot: "Peribacaları, yeraltı şehirleri (Derinkuyu, Kaymaklı) ve kaya kiliseleriyle UNESCO Dünya Mirası'dır. Balon turizminin merkezidir."
    },
    {
      id: "tur_efes",
      name: "Efes Antik Kenti",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 37.94, lng: 27.34,
      region: "Ege",
      city: "İzmir (Selçuk)",
      kpssNot: "Dünyanın yedi harikasından Artemis Tapınağı ve Celsus Kütüphanesi buradadır. Küçük Menderes'in alüvyonları limanı doldurduğu için kent önemini yitirmiştir."
    },
    {
      id: "tur_pamukkale_hierapolis",
      name: "Pamukkale - Hierapolis",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 37.92, lng: 29.12,
      region: "Ege",
      city: "Denizli",
      kpssNot: "Doğal (traverten) ve kültürel (Hierapolis) değeri birlikte taşıyan KARMA UNESCO mirasıdır. Termal turizmle birleşir."
    },
    {
      id: "tur_truva",
      name: "Truva (Troya) Antik Kenti",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 39.96, lng: 26.24,
      region: "Marmara",
      city: "Çanakkale",
      kpssNot: "Homeros'un İlyada destanının geçtiği, dokuz kat halinde yerleşim taşıyan antik kenttir. UNESCO Dünya Mirası'dır."
    },
    {
      id: "tur_gobeklitepe",
      name: "Göbeklitepe",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 37.22, lng: 38.92,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa",
      promptTitle: "Yaklaşık 12 bin yıllık tapınak yapılarıyla 'dünyanın ilk tapınağı' sayılan, tarihi yeniden yazdıran arkeolojik alan haritada neresidir?",
      kpssNot: "Yaklaşık 12.000 yıllık, dünyanın bilinen en eski tapınak alanıdır. 'Tarih sıfır noktası' olarak anılır; UNESCO Dünya Mirası'dır."
    },
    {
      id: "tur_nemrut_adiyaman",
      name: "Nemrut Dağı Tümülüsü",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 37.98, lng: 38.74,
      region: "Güneydoğu Anadolu",
      city: "Adıyaman (Kâhta)",
      kpssNot: "Kommagene Kralı Antiokhos'un dev heykelli tümülüsüdür. Bitlis'teki VOLKANİK Nemrut ile karıştırılmamalıdır."
    },
    {
      id: "tur_hattusa",
      name: "Hattuşa (Hitit Başkenti)",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 40.02, lng: 34.62,
      region: "İç Anadolu",
      city: "Çorum (Boğazkale)",
      kpssNot: "Hitit İmparatorluğu'nun başkentidir. Dünyanın ilk yazılı antlaşması Kadeş'in tabletleri buradan çıkmıştır."
    },
    {
      id: "tur_catalhoyuk",
      name: "Çatalhöyük Neolitik Kenti",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 37.67, lng: 32.83,
      region: "İç Anadolu",
      city: "Konya (Çumra)",
      kpssNot: "Dünyanın bilinen en eski yerleşik tarım köylerindendir. Bitişik nizam evleriyle ilk kent planlaması örneği sayılır."
    },
    {
      id: "tur_safranbolu",
      name: "Safranbolu Evleri",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 41.25, lng: 32.69,
      region: "Karadeniz",
      city: "Karabük (Safranbolu)",
      kpssNot: "Geleneksel Osmanlı kent dokusunun en iyi korunduğu yerdir. Ahşap ve kerpiç mimarisiyle UNESCO listesindedir."
    },
    {
      id: "tur_ani",
      name: "Ani Arkeolojik Alanı",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 40.51, lng: 43.57,
      region: "Doğu Anadolu",
      city: "Kars",
      kpssNot: "'1001 Kiliseli Şehir' olarak bilinen ortaçağ kentidir. Ermenistan sınırında, Arpaçay Vadisi kenarındadır."
    },
    {
      id: "tur_bergama",
      name: "Bergama (Pergamon)",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 39.12, lng: 27.18,
      region: "Ege",
      city: "İzmir (Bergama)",
      kpssNot: "Antik dünyanın en dik tiyatrosu ve sağlık merkezi Asklepion buradadır. Parşömen kâğıdının adı bu kentten gelir."
    },
    {
      id: "tur_aspendos",
      name: "Aspendos & Perge Antik Kentleri",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / Antik Kent",
      lat: 36.94, lng: 31.17,
      region: "Akdeniz",
      city: "Antalya (Serik)",
      kpssNot: "Aspendos, dünyanın en iyi korunmuş Roma tiyatrosudur; hâlâ konser ve opera için kullanılır."
    },
    {
      id: "tur_sumela",
      name: "Sümela Manastırı",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / Antik Kent",
      lat: 40.69, lng: 39.66,
      region: "Karadeniz",
      city: "Trabzon (Maçka)",
      kpssNot: "Altındere Vadisi'nde dik bir kaya yamacına oyulmuş manastırdır. Doğu Karadeniz'in en çok ziyaret edilen kültür varlığıdır."
    },
    {
      id: "tur_divrigi_ulu_cami",
      name: "Divriği Ulu Camii ve Darüşşifası",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 39.37, lng: 38.12,
      region: "İç Anadolu",
      city: "Sivas (Divriği)",
      kpssNot: "Türkiye'nin UNESCO listesine giren İLK eserlerindendir (1985). Taş işçiliğiyle Anadolu Selçuklu mimarisinin zirvesidir."
    },
    {
      id: "tur_arslantepe",
      name: "Arslantepe Höyüğü",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 38.38, lng: 38.36,
      region: "Doğu Anadolu",
      city: "Malatya",
      kpssNot: "Dünyanın bilinen en eski saray yapılarından birini barındırır. 2021'de UNESCO Dünya Mirası ilan edilmiştir."
    },
    {
      id: "tur_afrodisias",
      name: "Afrodisias Antik Kenti",
      category: "turizm",
      type: "Tarihî & Kültürel Turizm / UNESCO",
      lat: 37.71, lng: 28.72,
      region: "Ege",
      city: "Aydın (Karacasu)",
      kpssNot: "Mermer heykeltıraşlık okuluyla ünlü antik kenttir; yakınındaki mermer ocakları sayesinde gelişmiştir."
    },

    // ---------------- KIŞ TURİZMİ ----------------
    {
      id: "tur_uludag",
      name: "Uludağ Kayak Merkezi",
      shortName: "Uludağ (Kış Turizmi)",
      category: "turizm",
      type: "Kış Turizmi / Kayak Merkezi",
      lat: 40.1, lng: 29.13,
      region: "Marmara",
      city: "Bursa",
      promptTitle: "Büyük nüfus merkezlerine yakınlığı sayesinde Türkiye'nin en çok ziyaret edilen kayak merkezi haritada neresidir?",
      kpssNot: "Türkiye'nin en çok ziyaret edilen kayak merkezidir; başarısının nedeni İstanbul ve Bursa'ya YAKINLIĞIDIR. Bir batolit (derinlik volkanizması) yükseltisidir."
    },
    {
      id: "tur_palandoken",
      name: "Palandöken Kayak Merkezi",
      category: "turizm",
      type: "Kış Turizmi / Kayak Merkezi",
      lat: 39.86, lng: 41.26,
      region: "Doğu Anadolu",
      city: "Erzurum",
      kpssNot: "Kar kalitesi ve pist uzunluğu en yüksek merkezlerdendir. Kar örtüsünün uzun sürmesi karasal iklimin sonucudur."
    },
    {
      id: "tur_erciyes_kayak",
      name: "Erciyes Kayak Merkezi",
      category: "turizm",
      type: "Kış Turizmi / Kayak Merkezi",
      lat: 38.53, lng: 35.45,
      region: "İç Anadolu",
      city: "Kayseri",
      kpssNot: "Sönmüş bir volkan konisi üzerindedir. Kapadokya turizmiyle birleştirilerek pazarlanır."
    },
    {
      id: "tur_kartalkaya",
      name: "Kartalkaya Kayak Merkezi",
      category: "turizm",
      type: "Kış Turizmi / Kayak Merkezi",
      lat: 40.58, lng: 31.72,
      region: "Karadeniz",
      city: "Bolu",
      kpssNot: "Köroğlu Dağları üzerindedir. Ankara-İstanbul aksına yakınlığı ziyaretçi sayısını artırır."
    },
    {
      id: "tur_sarikamis",
      name: "Sarıkamış Kayak Merkezi",
      category: "turizm",
      type: "Kış Turizmi / Kayak Merkezi",
      lat: 40.33, lng: 42.58,
      region: "Doğu Anadolu",
      city: "Kars (Sarıkamış)",
      kpssNot: "Kristal kar yapısıyla ünlüdür. Sarıçam ormanları içinde kayak yapılabilen ender merkezlerdendir."
    },

    // ---------------- TERMAL TURİZM ----------------
    {
      id: "tur_termal_afyon",
      name: "Afyonkarahisar Termal Kaynakları",
      shortName: "Afyon Termal",
      category: "turizm",
      type: "Termal Turizm / Kaplıca",
      lat: 38.76, lng: 30.54,
      region: "Ege",
      city: "Afyonkarahisar (Sandıklı - Ömer)",
      promptTitle: "Volkanik geçmişi ve fay hatları sayesinde Türkiye'nin termal turizm başkenti sayılan il haritada neresidir?",
      kpssNot: "Türkiye'nin termal turizm başkenti sayılır. Sıcak suyun kaynağı fay hatları ve volkanik geçmiştir."
    },
    {
      id: "tur_termal_bursa",
      name: "Bursa Çekirge Kaplıcaları",
      category: "turizm",
      type: "Termal Turizm / Kaplıca",
      lat: 40.19, lng: 29.03,
      region: "Marmara",
      city: "Bursa (Çekirge)",
      kpssNot: "Uludağ'ın kırıklı yapısı boyunca yüzeye çıkan sıcak sulardır; Osmanlı döneminden beri işletilir."
    },
    {
      id: "tur_termal_balcova",
      name: "Balçova (Agamemnon) Kaplıcaları",
      category: "turizm",
      type: "Termal Turizm / Kaplıca",
      lat: 38.39, lng: 27.05,
      region: "Ege",
      city: "İzmir (Balçova)",
      kpssNot: "Jeotermal enerjisi konut ısıtmasında da kullanılır; Türkiye'nin ilk jeotermal ısıtma uygulamalarındandır."
    },

    // ---------------- DOĞA & KIYI TURİZMİ ----------------
    {
      id: "tur_oludeniz",
      name: "Ölüdeniz & Babadağ",
      category: "turizm",
      type: "Kıyı & Doğa Turizmi / Sahil",
      lat: 36.55, lng: 29.12,
      region: "Ege",
      city: "Muğla (Fethiye)",
      kpssNot: "Lagün yapısı ve Babadağ'dan yamaç paraşütüyle ünlüdür. Türkiye'nin en çok fotoğraflanan koyudur."
    },
    {
      id: "tur_kaputas",
      name: "Kaputaş Plajı & Kaş - Kalkan Kıyıları",
      category: "turizm",
      type: "Kıyı & Doğa Turizmi / Sahil",
      lat: 36.22, lng: 29.53,
      region: "Akdeniz",
      city: "Antalya (Kaş)",
      kpssNot: "Dalmaçya tipi kıyının en tipik göründüğü kesimdir. Dar kanyon ağzındaki plajıyla bilinir."
    },
    {
      id: "tur_uzungol",
      name: "Uzungöl",
      category: "turizm",
      type: "Kıyı & Doğa Turizmi / Doğal Alan",
      lat: 40.62, lng: 40.29,
      region: "Karadeniz",
      city: "Trabzon (Çaykara)",
      kpssNot: "HEYELAN SET gölüdür. Yayla turizminin merkezi olmuş; aşırı yapılaşma nedeniyle koruma tartışması yaşanmıştır."
    },
    {
      id: "tur_ihlara",
      name: "Ihlara Vadisi",
      category: "turizm",
      type: "Kıyı & Doğa Turizmi / Doğal Alan",
      lat: 38.25, lng: 34.31,
      region: "İç Anadolu",
      city: "Aksaray (Güzelyurt)",
      kpssNot: "Melendiz Çayı'nın volkanik tüfleri oyarak açtığı kanyon vadidir; yamaçlarında kaya kiliseleri bulunur."
    },
    {
      id: "tur_bodrum_kiyi",
      name: "Bodrum & Çeşme Kıyı Turizmi",
      category: "turizm",
      type: "Kıyı & Doğa Turizmi / Sahil",
      lat: 37.03, lng: 27.43,
      region: "Ege",
      city: "Muğla (Bodrum) - İzmir (Çeşme)",
      kpssNot: "Girintili çıkıntılı Ege kıyısının yat ve marina turizmine dönüştüğü merkezlerdir. Mavi yolculuğun çıkış noktasıdır."
    },
    {
      id: "tur_alanya",
      name: "Alanya & Side Kıyı Turizmi",
      category: "turizm",
      type: "Kıyı & Doğa Turizmi / Sahil",
      lat: 36.54, lng: 31.99,
      region: "Akdeniz",
      city: "Antalya (Alanya - Manavgat)",
      kpssNot: "Turizm sezonunun en uzun olduğu kesimdir; Akdeniz ikliminin yaz sıcaklığı ve deniz suyu sıcaklığı avantaj sağlar."
    },
    {
      id: "tur_nemrut_kraterr",
      name: "Nemrut Krater Gölü (Bitlis)",
      category: "turizm",
      type: "Kıyı & Doğa Turizmi / Doğal Alan",
      lat: 38.62, lng: 42.23,
      region: "Doğu Anadolu",
      city: "Bitlis (Tatvan)",
      kpssNot: "Türkiye'nin en büyük kaldera gölüdür ve dünyanın en büyük kalderalarındandır. Adıyaman'daki heykelli Nemrut'tan farklıdır."
    }
  ]
});
