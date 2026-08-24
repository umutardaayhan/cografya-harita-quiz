/**
 * 🌬️ DIŞ KUVVETLER & OLUŞTURDUĞU YERŞEKİLLERİ — Yazım Kaynağı
 * Karstik, buzul, rüzgâr, akarsu ve dalga şekilleri.
 * Derleyici: node tools/build_packs.js
 */
Object.assign(COGRAFYA_DATA_EXT, {
  dis_kuvvetler: [
    // ---------------- KARSTİK ŞEKİLLER ----------------
    {
      id: "dk_pamukkale_traverten",
      name: "Pamukkale Travertenleri",
      shortName: "Traverten (Karstik Birikim)",
      category: "dis_kuvvetler",
      type: "Karstik Şekil / Birikim",
      lat: 37.92, lng: 29.12,
      region: "Ege",
      city: "Denizli",
      promptTitle: "Kalsiyum karbonatça zengin sıcak suların yüzeye çıkıp çökelmesiyle oluşan basamaklı beyaz birikim şekli haritada neresidir?",
      kpssNot: "Kalsiyum karbonatlı sıcak suların çökelmesiyle oluşan KARSTİK BİRİKİM şeklidir. UNESCO Dünya Mirası'dır; Hierapolis antik kenti üzerindedir."
    },
    {
      id: "dk_obruk_kizoren",
      name: "Kızören Obruğu",
      shortName: "Obruk (Karstik Çukur)",
      category: "dis_kuvvetler",
      type: "Karstik Şekil / Aşınım",
      lat: 37.99, lng: 33.31,
      region: "İç Anadolu",
      city: "Konya (Karapınar)",
      kpssNot: "Yer altındaki karstik boşluğun tavanının çökmesiyle oluşan derin çukurdur. Konya Obruk Platosu Türkiye'nin obruk merkezidir."
    },
    {
      id: "dk_duden_selalesi",
      name: "Düden Şelalesi (Düden = Yutan Delik)",
      shortName: "Düden",
      category: "dis_kuvvetler",
      type: "Karstik Şekil / Aşınım",
      lat: 36.95, lng: 30.75,
      region: "Akdeniz",
      city: "Antalya",
      kpssNot: "Düden, suların yer altına indiği karstik deliktir. Antalya'da yer altına inen sular travertenin ucundan şelale olarak denize dökülür."
    },
    {
      id: "dk_damlatas_magara",
      name: "Damlataş Mağarası",
      shortName: "Mağara (Karstik)",
      category: "dis_kuvvetler",
      type: "Karstik Şekil / Aşınım",
      lat: 36.54, lng: 31.99,
      region: "Akdeniz",
      city: "Antalya (Alanya)",
      kpssNot: "Sarkıt, dikit ve sütunlarıyla ünlü karstik mağaradır. Nemli havası astım tedavisinde kullanılır."
    },
    {
      id: "dk_cennet_cehennem",
      name: "Cennet - Cehennem Obrukları",
      shortName: "Cennet-Cehennem",
      category: "dis_kuvvetler",
      type: "Karstik Şekil / Aşınım",
      lat: 36.45, lng: 34.1,
      region: "Akdeniz",
      city: "Mersin (Silifke - Narlıkuyu)",
      kpssNot: "Taşeli Platosu'ndaki dev karstik çöküntülerdir. Kalker yapının çözünmesiyle oluşmuştur."
    },
    {
      id: "dk_karain_magara",
      name: "Karain Mağarası",
      category: "dis_kuvvetler",
      type: "Karstik Şekil / Aşınım",
      lat: 37.08, lng: 30.57,
      region: "Akdeniz",
      city: "Antalya (Döşemealtı)",
      kpssNot: "Türkiye'nin en eski yerleşilmiş mağaralarındandır; hem karstik şekil hem arkeolojik değer taşır."
    },
    {
      id: "dk_lapya_dolin",
      name: "Lapya - Dolin - Uvala Sahası",
      shortName: "Lapya & Dolin",
      category: "dis_kuvvetler",
      type: "Karstik Şekil / Aşınım",
      lat: 37.3, lng: 30.5,
      region: "Akdeniz",
      city: "Toroslar (Isparta - Antalya)",
      promptTitle: "Kalker yüzeyde eriyerek gelişen lapya, dolin ve uvala aşınım şekillerinin en yaygın olduğu alan haritada neresidir?",
      kpssNot: "Karstik aşınımın büyükten küçüğe sırası: LAPYA → DOLİN → UVALA → POLYE. Hepsi kalkerin erimesiyle oluşur; Toroslar tipik alanıdır."
    },

    // ---------------- BUZUL ŞEKİLLERİ ----------------
    {
      id: "dk_cilo_buzul",
      name: "Cilo Dağı Güncel Buzulu",
      shortName: "Güncel Buzul",
      category: "dis_kuvvetler",
      type: "Buzul Şekli / Aşınım",
      lat: 37.5, lng: 44.03,
      region: "Doğu Anadolu",
      city: "Hakkâri (Cilo - Reşko)",
      promptTitle: "Türkiye'nin en büyük güncel buzulunun (İzbırak Buzulu) bulunduğu, Reşko zirvesini taşıyan dağ haritada neresidir?",
      kpssNot: "Türkiye'nin EN BÜYÜK güncel buzulu buradadır. Buzulun oluşması için yükselti + kalıcı kar sınırının aşılması gerekir."
    },
    {
      id: "dk_kackar_sirk",
      name: "Kaçkar Sirk Gölleri",
      shortName: "Sirk (Buzul Çukuru)",
      category: "dis_kuvvetler",
      type: "Buzul Şekli / Aşınım",
      lat: 40.85, lng: 41.15,
      region: "Karadeniz",
      city: "Rize - Artvin (Kaçkarlar)",
      kpssNot: "Buzulun yamaçta oyduğu koltuk biçimli çukura SİRK denir; içi suyla dolunca sirk gölü olur. Kaçkarlar ve Bolkarlar'da yaygındır."
    },
    {
      id: "dk_buzul_vadisi",
      name: "Buzul (U) Vadisi",
      shortName: "Buzul Vadisi",
      category: "dis_kuvvetler",
      type: "Buzul Şekli / Aşınım",
      lat: 37.55, lng: 44.15,
      region: "Doğu Anadolu",
      city: "Hakkâri (Cilo - Sat)",
      kpssNot: "Buzulun aşındırdığı vadi tabanı geniş ve U biçimlidir; akarsu vadisi ise V biçimindedir. Bu ayrım sınavda sık sorulur."
    },
    {
      id: "dk_moren",
      name: "Moren (Buzul Taşı) Birikimi",
      shortName: "Moren",
      category: "dis_kuvvetler",
      type: "Buzul Şekli / Birikim",
      lat: 39.7, lng: 44.3,
      region: "Doğu Anadolu",
      city: "Ağrı Dağı - Süphan - Kaçkarlar",
      kpssNot: "Buzulun taşıyıp bıraktığı, boylanmamış karışık malzemedir. Buzul BİRİKİM şeklidir; buzul gölü setlerini oluşturabilir."
    },

    // ---------------- RÜZGÂR ŞEKİLLERİ ----------------
    {
      id: "dk_peribacalari",
      name: "Kapadokya Peribacaları",
      shortName: "Peribacası",
      category: "dis_kuvvetler",
      type: "Rüzgâr & Sel Şekli / Aşınım",
      shapeType: "polygon",
      coordinates: [[38.5, 34.6], [38.75, 34.7], [38.75, 35.05], [38.5, 35.0]],
      lat: 38.63, lng: 34.83,
      region: "İç Anadolu",
      city: "Nevşehir (Ürgüp - Göreme - Avanos)",
      promptTitle: "Volkanik tüflerin sel suları ve rüzgârla aşındırılması sonucu oluşan, şapkalı sütun biçimindeki aşınım şekilleri haritada neresidir?",
      kpssNot: "Erciyes ve Hasan Dağı tüflerinin sel suları ve rüzgârla aşındırılmasıyla oluşur. Sert kaya 'şapka' görevi görür. UNESCO Dünya Mirası'dır."
    },
    {
      id: "dk_karapinar_kumul",
      name: "Karapınar Kum Tepeleri (Barkan)",
      shortName: "Barkan (Kumul)",
      category: "dis_kuvvetler",
      type: "Rüzgâr Şekli / Birikim",
      lat: 37.68, lng: 33.68,
      region: "İç Anadolu",
      city: "Konya (Karapınar)",
      kpssNot: "Rüzgârın taşıdığı kumun hilal biçiminde birikmesiyle oluşan BARKAN'lardır. Türkiye'de rüzgâr birikiminin en tipik örneğidir."
    },
    {
      id: "dk_igneada_kumul",
      name: "İğneada - Kıyı Kumulları",
      shortName: "Kıyı Kumulu",
      category: "dis_kuvvetler",
      type: "Rüzgâr Şekli / Birikim",
      lat: 41.87, lng: 28.03,
      region: "Marmara",
      city: "Kırklareli (İğneada)",
      kpssNot: "Dalgaların getirdiği kumun rüzgârla karaya taşınmasıyla oluşur. Longoz ormanlarını denizden ayıran doğal settir."
    },
    {
      id: "dk_mantarkaya",
      name: "Mantarkaya (Şahitkaya)",
      shortName: "Mantarkaya",
      category: "dis_kuvvetler",
      type: "Rüzgâr Şekli / Aşınım",
      lat: 38.6, lng: 34.9,
      region: "İç Anadolu",
      city: "Nevşehir - Konya çevresi",
      kpssNot: "Rüzgârın taşıdığı kumun kayanın alt kısmını daha çok aşındırmasıyla oluşan mantar biçimli aşınım şeklidir."
    },

    // ---------------- AKARSU ŞEKİLLERİ ----------------
    {
      id: "dk_menderes",
      name: "Menderes (Kıvrım) Oluşumu",
      shortName: "Menderes",
      category: "dis_kuvvetler",
      type: "Akarsu Şekli / Aşınım",
      shapeType: "polyline",
      coordinates: [[37.82, 28.9], [37.86, 28.4], [37.79, 28.0], [37.85, 27.6], [37.68, 27.28]],
      lat: 37.85, lng: 28.0,
      region: "Ege",
      city: "Aydın (Büyük Menderes)",
      promptTitle: "Eğimin azaldığı düzlüklerde akarsuyun yatağında çizdiği büklümlere adını veren nehir haritada neresidir?",
      kpssNot: "Eğimin azaldığı yerde akarsu büklümler çizer; bu şekle adını Büyük Menderes vermiştir. Menderesli akarsuda aşındırma azalmış, denge profiline yaklaşılmıştır."
    },
    {
      id: "dk_koprulu_kanyon",
      name: "Köprülü Kanyon",
      shortName: "Kanyon Vadi",
      category: "dis_kuvvetler",
      type: "Akarsu Şekli / Aşınım",
      lat: 37.28, lng: 31.19,
      region: "Akdeniz",
      city: "Antalya (Manavgat)",
      kpssNot: "Akarsuyun kalker gibi sert ve geçirimli kayayı derine oyarak oluşturduğu dar ve derin vadidir. Rafting turizminin merkezidir."
    },
    {
      id: "dk_valla_kanyon",
      name: "Valla Kanyonu",
      category: "dis_kuvvetler",
      type: "Akarsu Şekli / Aşınım",
      lat: 41.72, lng: 33.16,
      region: "Karadeniz",
      city: "Kastamonu (Pınarbaşı)",
      kpssNot: "Türkiye'nin en derin kanyonlarındandır (yaklaşık 1200 m). Küre Dağları Millî Parkı içindedir."
    },
    {
      id: "dk_saklikent_kanyon",
      name: "Saklıkent Kanyonu",
      category: "dis_kuvvetler",
      type: "Akarsu Şekli / Aşınım",
      lat: 36.49, lng: 29.39,
      region: "Akdeniz",
      city: "Muğla - Antalya (Fethiye)",
      kpssNot: "Eşen Çayı'nın kalkerleri oyarak açtığı dar kanyondur; karstik kaynak sularıyla beslenir."
    },
    {
      id: "dk_dev_kazani",
      name: "Dev Kazanı (Şelale Aşınımı)",
      shortName: "Dev Kazanı",
      category: "dis_kuvvetler",
      type: "Akarsu Şekli / Aşınım",
      lat: 36.79, lng: 31.44,
      region: "Akdeniz",
      city: "Antalya (Manavgat Şelalesi)",
      kpssNot: "Şelalenin döküldüğü yerde suyun ve taşıdığı çakılların dönerek oyduğu çukurdur. Şelalenin geriye doğru aşınmasına yol açar."
    },
    {
      id: "dk_birikinti_konisi",
      name: "Birikinti Konisi & Yelpazesi",
      shortName: "Birikinti Konisi",
      category: "dis_kuvvetler",
      type: "Akarsu Şekli / Birikim",
      lat: 38.4, lng: 27.8,
      region: "Ege",
      city: "Manisa - Aydın (dağ etekleri)",
      kpssNot: "Akarsuyun dağdan ovaya çıktığı, eğimin aniden azaldığı yerde malzemesini yelpaze biçiminde bırakmasıdır. AKARSU BİRİKİM şeklidir."
    },
    {
      id: "dk_peribaca_nallihan",
      name: "Kırgıbayır (Badlands) Oluşumu",
      shortName: "Kırgıbayır",
      category: "dis_kuvvetler",
      type: "Akarsu Şekli / Aşınım",
      lat: 40.19, lng: 31.35,
      region: "İç Anadolu",
      city: "Ankara (Nallıhan)",
      kpssNot: "Bitki örtüsünden yoksun killi-marnlı yamaçların sel sularıyla yarılmasıdır. Erozyonun en ileri aşamasını gösterir."
    },
    {
      id: "dk_delta_ovasi",
      name: "Delta Ovası Oluşumu",
      shortName: "Delta (Akarsu Birikimi)",
      category: "dis_kuvvetler",
      type: "Akarsu Şekli / Birikim",
      lat: 36.72, lng: 35.05,
      region: "Akdeniz",
      city: "Adana (Seyhan - Ceyhan ağzı)",
      promptTitle: "Akarsuyun denize döküldüğü yerde alüvyonlarını biriktirmesiyle oluşan, Türkiye'nin en büyük birikim ovası haritada neresidir?",
      kpssNot: "Delta oluşması için: akarsuyun bol alüvyon taşıması, kıyının sığ olması, gelgitin ve akıntının zayıf olması gerekir. Türkiye'de gelgit etkisiz olduğu için delta çoktur."
    },

    // ---------------- DALGA ŞEKİLLERİ ----------------
    {
      id: "dk_kiyi_oku",
      name: "Kıyı Oku & Kıyı Kordonu",
      shortName: "Kıyı Oku",
      category: "dis_kuvvetler",
      type: "Dalga Şekli / Birikim",
      lat: 41.72, lng: 35.95,
      region: "Karadeniz",
      city: "Samsun (Kızılırmak Deltası)",
      kpssNot: "Dalga ve akıntının taşıdığı malzemenin kıyı boyunca birikmesiyle oluşan dil biçimli settir. Uzayıp koyu kapatırsa LAGÜN oluşur."
    },
    {
      id: "dk_tombolo",
      name: "Tombolo (Bağlanmış Ada)",
      shortName: "Tombolo",
      category: "dis_kuvvetler",
      type: "Dalga Şekli / Birikim",
      lat: 40.45, lng: 27.87,
      region: "Marmara",
      city: "Balıkesir (Kapıdağ)",
      kpssNot: "Kıyı okunun bir adayı karaya bağlamasıyla oluşur. Türkiye'nin en tipik örneği Kapıdağ Yarımadası'dır (Erdek - Bandırma arası)."
    },
    {
      id: "dk_kumsal",
      name: "Kumsal (Plaj) Oluşumu",
      shortName: "Kumsal",
      category: "dis_kuvvetler",
      type: "Dalga Şekli / Birikim",
      lat: 36.55, lng: 31.99,
      region: "Akdeniz",
      city: "Antalya (Alanya - Side)",
      kpssNot: "Dalgaların aşındırıp öğüttüğü malzemeyi kıyıda biriktirmesiyle oluşur. Turizmin temel doğal sermayesidir."
    }
  ]
});
