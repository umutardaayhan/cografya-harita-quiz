/**
 * 🗺️ COĞRAFİ BÖLGELER & BÖLÜMLER — Yazım Kaynağı
 *
 * 7 coğrafi bölge POLİGON, 21 bölüm ise merkez NOKTA olarak tanımlanmıştır.
 * Poligonlar sınav haritalarındaki genel hatları temsil eder; idari sınır
 * hassasiyetinde değildir.
 *
 * Derleyici: node tools/build_packs.js
 */
Object.assign(COGRAFYA_DATA_EXT, {
  bolgeler: [
    // ---------------- 7 COĞRAFİ BÖLGE ----------------
    {
      id: "blg_karadeniz",
      name: "Karadeniz Bölgesi",
      shortName: "Karadeniz Bölgesi",
      category: "bolgeler",
      type: "Coğrafi Bölge / Ana Bölge",
      shapeType: "polygon",
      coordinates: [[41.2, 30.9], [42.1, 31.4], [42.1, 36.2], [41.6, 38.6], [41.6, 41.6], [40.5, 41.6], [40.2, 39.4], [40.4, 37.0], [40.4, 34.6], [40.6, 32.0]],
      lat: 41.1, lng: 36.0,
      region: "Karadeniz",
      city: "Zonguldak'tan Artvin'e",
      promptTitle: "Dağların kıyıya paralel uzandığı, her mevsim yağışlı ve Türkiye'nin en fazla orman varlığına sahip bölgesi haritada neresidir?",
      kpssNot: "Dağlar kıyıya PARALEL uzanır; bu yüzden denizel etki iç kesime giremez. Her mevsim yağışlıdır, orman oranı en yüksek bölgedir. Türkiye'nin en çok göç veren bölgelerindendir."
    },
    {
      id: "blg_marmara",
      name: "Marmara Bölgesi",
      shortName: "Marmara Bölgesi",
      category: "bolgeler",
      type: "Coğrafi Bölge / Ana Bölge",
      shapeType: "polygon",
      coordinates: [[41.9, 26.0], [42.1, 28.0], [41.3, 31.0], [40.2, 30.6], [39.9, 28.6], [39.5, 26.2], [40.3, 25.9]],
      lat: 40.7, lng: 28.4,
      region: "Marmara",
      city: "Edirne'den Bilecik'e",
      promptTitle: "Yüzölçümü en küçük ikinci, ancak nüfusu ve sanayisi en fazla olan; dört farklı iklimin görüldüğü bölge haritada neresidir?",
      kpssNot: "Nüfusu, sanayisi ve ticareti EN GELİŞMİŞ bölgedir. Yer şekilleri sadedir, ortalama yükseltisi en azdır. Karadeniz, Akdeniz ve karasal iklimin geçiş alanıdır."
    },
    {
      id: "blg_ege",
      name: "Ege Bölgesi",
      shortName: "Ege Bölgesi",
      category: "bolgeler",
      type: "Coğrafi Bölge / Ana Bölge",
      shapeType: "polygon",
      coordinates: [[36.6, 27.3], [38.0, 26.3], [39.5, 26.4], [39.7, 29.4], [38.9, 30.9], [37.6, 30.3], [36.9, 28.9]],
      lat: 38.4, lng: 28.3,
      region: "Ege",
      city: "İzmir - Aydın - Denizli - Kütahya",
      promptTitle: "Dağların kıyıya dik uzanması sayesinde denizel etkinin iç kesimlere sokulabildiği, girintili çıkıntılı kıyılara sahip bölge haritada neresidir?",
      kpssNot: "Dağlar kıyıya DİK (enine) uzanır; denizel etki içeriye sokulur ve kıyı en girintili çıkıntılı hale gelir. Türkiye'nin en uzun kıyısına sahip bölgesidir."
    },
    {
      id: "blg_akdeniz",
      name: "Akdeniz Bölgesi",
      shortName: "Akdeniz Bölgesi",
      category: "bolgeler",
      type: "Coğrafi Bölge / Ana Bölge",
      shapeType: "polygon",
      coordinates: [[36.0, 29.0], [37.6, 29.6], [38.3, 32.0], [38.3, 36.9], [36.9, 36.6], [36.1, 33.8], [36.1, 30.4]],
      lat: 37.1, lng: 32.5,
      region: "Akdeniz",
      city: "Antalya'dan Hatay'a",
      promptTitle: "Toroslar'ın kıyıya paralel uzandığı, ortalama yükseltisi en fazla ikinci ve karstik şekillerin en yaygın olduğu bölge haritada neresidir?",
      kpssNot: "Toroslar kıyıya PARALEL uzanır. Kalker yapı nedeniyle KARSTİK şekiller en yaygındır. Sera tarımı, turunçgil ve turizmde ilk sıradadır."
    },
    {
      id: "blg_ic_anadolu",
      name: "İç Anadolu Bölgesi",
      shortName: "İç Anadolu Bölgesi",
      category: "bolgeler",
      type: "Coğrafi Bölge / Ana Bölge",
      shapeType: "polygon",
      coordinates: [[37.4, 31.8], [39.4, 30.9], [40.5, 32.6], [40.4, 36.4], [39.0, 36.8], [37.7, 34.4], [37.3, 32.6]],
      lat: 39.0, lng: 33.6,
      region: "İç Anadolu",
      city: "Ankara - Konya - Kayseri - Sivas",
      promptTitle: "Etrafı dağlarla çevrili olduğu için en az yağış alan, plato ve bozkırların kapladığı bölge haritada neresidir?",
      kpssNot: "Etrafı dağlarla çevrili olduğu için EN AZ YAĞIŞ alan bölgedir. Platolar ve bozkır egemendir; tahıl üretiminde ilk sıradadır. Kapalı havzalar buradadır."
    },
    {
      id: "blg_dogu_anadolu",
      name: "Doğu Anadolu Bölgesi",
      shortName: "Doğu Anadolu Bölgesi",
      category: "bolgeler",
      type: "Coğrafi Bölge / Ana Bölge",
      shapeType: "polygon",
      coordinates: [[37.6, 36.9], [39.4, 37.6], [41.3, 40.5], [41.2, 44.6], [38.6, 44.6], [37.4, 43.6], [37.5, 39.4]],
      lat: 39.3, lng: 41.2,
      region: "Doğu Anadolu",
      city: "Erzurum - Van - Malatya - Elazığ",
      promptTitle: "Yüzölçümü en büyük, ortalama yükseltisi en fazla ve nüfus yoğunluğu en az olan bölge haritada neresidir?",
      kpssNot: "Yüzölçümü EN BÜYÜK, ortalama yükseltisi EN FAZLA, nüfus yoğunluğu EN AZ bölgedir. Karasallık en şiddetlidir; akarsu kaynaklarının çıkış noktasıdır."
    },
    {
      id: "blg_guneydogu",
      name: "Güneydoğu Anadolu Bölgesi",
      shortName: "Güneydoğu Anadolu",
      category: "bolgeler",
      type: "Coğrafi Bölge / Ana Bölge",
      shapeType: "polygon",
      coordinates: [[36.6, 37.2], [37.9, 38.0], [38.1, 41.4], [37.4, 42.8], [36.8, 42.4], [36.6, 38.6]],
      lat: 37.4, lng: 39.8,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa - Diyarbakır - Gaziantep - Mardin",
      promptTitle: "Yüzölçümü en küçük olan, yazları en sıcak ve buharlaşmanın en fazla olduğu bölge haritada neresidir?",
      kpssNot: "Yüzölçümü EN KÜÇÜK bölgedir. Yaz sıcaklıkları ve buharlaşma en yüksektir. GAP ile sulanan alanlar pamuk üretimini dönüştürmüştür."
    },

    // ---------------- 21 BÖLÜM ----------------
    {
      id: "blm_dogu_karadeniz",
      name: "Doğu Karadeniz Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 40.9, lng: 40.2,
      region: "Karadeniz",
      city: "Trabzon - Rize - Artvin - Giresun",
      kpssNot: "Türkiye'nin en çok yağış alan ve heyelanın en sık görüldüğü bölümüdür. Çay ve fındık üretiminin merkezidir."
    },
    {
      id: "blm_orta_karadeniz",
      name: "Orta Karadeniz Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 41.0, lng: 36.4,
      region: "Karadeniz",
      city: "Samsun - Ordu - Tokat - Amasya",
      kpssNot: "Canik Dağları alçak ve geride olduğu için denizel etki içeriye sokulur; hinterlandı en geniş bölümdür. Çarşamba ve Bafra deltaları buradadır."
    },
    {
      id: "blm_bati_karadeniz",
      name: "Batı Karadeniz Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 41.3, lng: 32.5,
      region: "Karadeniz",
      city: "Zonguldak - Kastamonu - Bolu - Bartın",
      kpssNot: "Türkiye'nin tek taşkömürü havzası buradadır. Dağlar kıyıya çok yakın ve yüksek olduğundan tarım alanı en dardır."
    },
    {
      id: "blm_yildiz",
    groupId: 'grp_yildiz_daglari',
      name: "Yıldız (Istranca) Dağları Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 41.75, lng: 27.4,
      region: "Marmara",
      city: "Kırklareli - Edirne (kuzey)",
      kpssNot: "Marmara'nın en engebeli ve ormanlık bölümüdür. Nüfus seyrektir; Karadeniz iklimi etkisi görülür."
    },
    {
      id: "blm_ergene",
    groupId: 'grp_ergene_havzasi',
      name: "Ergene Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 41.3, lng: 26.9,
      region: "Marmara",
      city: "Edirne - Tekirdağ",
      kpssNot: "Karasal iklimin görüldüğü, ayçiçeği ve buğday üretiminin merkezi olan düz havzadır. Sanayi kirliliğiyle gündeme gelir."
    },
    {
      id: "blm_catalca_kocaeli",
      name: "Çatalca - Kocaeli Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 41.0, lng: 29.4,
      region: "Marmara",
      city: "İstanbul - Kocaeli",
      kpssNot: "Türkiye'nin en alçak PLATOSU üzerindedir. Nüfus, sanayi ve ticaret yoğunluğu en yüksek bölümdür."
    },
    {
      id: "blm_guney_marmara",
      name: "Güney Marmara Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 40.2, lng: 28.6,
      region: "Marmara",
      city: "Bursa - Balıkesir - Çanakkale - Yalova",
      kpssNot: "Zeytin, şeftali ve süs bitkiciliğiyle öne çıkar. Bursa otomotiv ve tekstil sanayisinin merkezidir."
    },
    {
      id: "blm_asil_ege",
      name: "Asıl Ege (Kıyı Ege) Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 38.2, lng: 27.4,
      region: "Ege",
      city: "İzmir - Aydın - Manisa - Muğla",
      kpssNot: "Grabenler sayesinde tarımı en gelişmiş bölümdür. İncir, üzüm, zeytin ve pamukta Türkiye lideridir."
    },
    {
      id: "blm_ic_bati_anadolu",
      name: "İç Batı Anadolu Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 39.1, lng: 30.1,
      region: "Ege",
      city: "Kütahya - Afyonkarahisar - Uşak",
      kpssNot: "Ege ile İç Anadolu arasında bir GEÇİŞ alanıdır; yükselti artar, karasallık başlar. Linyit, mermer ve haşhaş üretimiyle bilinir."
    },
    {
      id: "blm_antalya",
      name: "Antalya Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 36.9, lng: 30.8,
      region: "Akdeniz",
      city: "Antalya - Isparta - Burdur",
      kpssNot: "Turizm ve seracılığın merkezidir. Traverten ve karstik şekiller ile Göller Yöresi bu bölümdedir."
    },
    {
      id: "blm_adana",
      name: "Adana Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 37.0, lng: 35.5,
      region: "Akdeniz",
      city: "Adana - Mersin - Osmaniye - Hatay",
      kpssNot: "Çukurova sayesinde tarımsal üretimi en yüksek bölümdür. Pamuk, turunçgil ve soya üretiminde öndedir; sanayi de gelişmiştir."
    },
    {
      id: "blm_konya",
      name: "Konya Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 37.9, lng: 32.6,
      region: "İç Anadolu",
      city: "Konya - Karaman - Aksaray - Niğde",
      kpssNot: "Türkiye'nin en büyük KAPALI HAVZASI'dır. En az yağış alan, tahıl ve şeker pancarında lider bölümdür."
    },
    {
      id: "blm_yukari_sakarya",
      name: "Yukarı Sakarya Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 39.8, lng: 31.4,
      region: "İç Anadolu",
      city: "Ankara - Eskişehir",
      kpssNot: "Başkent ve Eskişehir sanayisiyle İç Anadolu'nun en kalabalık bölümüdür. Lületaşı ve bor yatakları buradadır."
    },
    {
      id: "blm_orta_kizilirmak",
      name: "Orta Kızılırmak Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 38.9, lng: 35.0,
      region: "İç Anadolu",
      city: "Kayseri - Nevşehir - Kırşehir",
      kpssNot: "Kapadokya peribacaları ve volkanik dağlar (Erciyes, Hasan) bu bölümdedir. Turizm ve bağcılık öne çıkar."
    },
    {
      id: "blm_yukari_kizilirmak",
      name: "Yukarı Kızılırmak Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 39.75, lng: 37.0,
      region: "İç Anadolu",
      city: "Sivas",
      kpssNot: "İç Anadolu'nun en yüksek ve en soğuk bölümüdür. Divriği demir yatakları ile Hafik-Zara karstik gölleri buradadır."
    },
    {
      id: "blm_yukari_firat",
      name: "Yukarı Fırat Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 38.8, lng: 38.7,
      region: "Doğu Anadolu",
      city: "Malatya - Elazığ - Erzincan - Tunceli",
      kpssNot: "Doğu Anadolu'nun en alçak, en ılıman ve tarımı en gelişmiş bölümüdür. Keban ve Karakaya barajları buradadır."
    },
    {
      id: "blm_erzurum_kars",
    groupId: 'grp_erzurum_kars_plato_ekosistem',
      name: "Erzurum - Kars Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 40.4, lng: 41.8,
      region: "Doğu Anadolu",
      city: "Erzurum - Kars - Ardahan - Ağrı",
      kpssNot: "Türkiye'nin en soğuk ve en uzun kar örtülü bölümüdür. Volkanik platolar, çernezyom toprak ve büyükbaş mera hayvancılığı ile bilinir."
    },
    {
      id: "blm_yukari_murat_van",
      name: "Yukarı Murat - Van Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 38.7, lng: 43.0,
      region: "Doğu Anadolu",
      city: "Van - Muş - Bitlis - Bingöl",
      kpssNot: "Van Gölü ve volkanik dağlar (Nemrut, Süphan, Tendürek) bu bölümdedir. Küçükbaş hayvancılık ve Van kedisiyle anılır."
    },
    {
      id: "blm_hakkari",
    groupId: 'grp_hakkari_daglik_bolum',
      name: "Hakkâri Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 37.6, lng: 43.7,
      region: "Doğu Anadolu",
      city: "Hakkâri - Şırnak",
      kpssNot: "Türkiye'nin en engebeli ve en seyrek nüfuslu bölümüdür. Cilo-Sat Dağları'nda güncel BUZUL bulunur; çığ riski en yüksektir."
    },
    {
      id: "blm_orta_firat",
      name: "Orta Fırat Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 37.2, lng: 38.5,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa - Gaziantep - Adıyaman",
      kpssNot: "GAP'ın kalbidir; Atatürk Barajı ve Harran Ovası buradadır. Göbeklitepe ve Nemrut bu bölümün turizm değerleridir."
    },
    {
      id: "blm_dicle",
      name: "Dicle Bölümü",
      category: "bolgeler",
      type: "Coğrafi Bölüm / Alt Birim",
      lat: 37.7, lng: 40.9,
      region: "Güneydoğu Anadolu",
      city: "Diyarbakır - Mardin - Batman - Siirt",
      kpssNot: "Karacadağ bazalt örtüsü ve Diyarbakır Havzası buradadır. Türkiye petrolünün büyük bölümü bu bölümden çıkarılır."
    }
  ]
});
