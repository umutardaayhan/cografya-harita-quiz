/**
 * 🌍 GENİŞLETİLMİŞ KPSS COĞRAFYA VERİ TABANI (Yazım Kaynağı)
 *
 * `cografya_data.legacy.js` fiziki ve temel ekonomik coğrafyayı kapsıyordu.
 * Bu dosya KPSS Genel Kültür Coğrafya müfredatının kalan başlıklarını ekler:
 * toprak tipleri, doğal afetler, fay hatları, madenler & enerji, turizm,
 * nüfus & yerleşme, coğrafi bölgeler, kıyılar, dış kuvvetler ve ulaşım.
 *
 * DİKKAT: Bu dosya uygulamaya YÜKLENMEZ. Yalnızca `tools/build_packs.js`
 * tarafından okunur ve `data/packs/*.js` paketlerine derlenir.
 * Şema `legacy` dosyasıyla birebir aynıdır:
 *   { id, name, category, type, lat, lng, region, city, kpssNot,
 *     shapeType?, coordinates?, shortName?, promptTitle? }
 */

Object.assign(COGRAFYA_DATA_EXT, {

  // =========================================================================
  // 🟫 TOPRAK TİPLERİ
  // Zonal (iklimin ürünü) / Azonal (taşınmış, katmansız) / İntrazonal (yerel)
  // =========================================================================
  toprak: [
    {
      id: "top_cernozyom",
    groupId: 'grp_erzurum_kars_plato_ekosistem',
      name: "Çernozyom (Kara Toprak)",
      shortName: "Çernozyom Sahası",
      category: "toprak",
      type: "Zonal Toprak / Karasal",
      shapeType: "polygon",
      coordinates: [[40.4, 40.8], [41.4, 41.2], [41.6, 43.4], [40.9, 43.9], [39.9, 42.6], [39.9, 41.2]],
      lat: 40.6, lng: 42.3,
      region: "Doğu Anadolu",
      city: "Erzurum - Kars - Ardahan",
      promptTitle: "Yaz yağışları sayesinde gür çayırların oluştuğu, Türkiye'nin en verimli doğal toprağı olan kara toprakların (çernozyom) yayıldığı plato haritada neresidir?",
      kpssNot: "Türkiye'nin EN VERİMLİ zonal toprağıdır. Erzurum-Kars ve Ardahan platolarında, yaz yağışlı çayır örtüsü altında oluşur. Büyükbaş mera hayvancılığının temelidir."
    },
    {
      id: "top_terra_rossa",
      name: "Terra Rossa (Kırmızı Akdeniz Toprağı)",
      shortName: "Terra Rossa Sahası",
      category: "toprak",
      type: "Zonal Toprak / Akdeniz",
      shapeType: "polygon",
      coordinates: [[36.2, 29.3], [36.9, 30.6], [36.6, 32.6], [36.1, 33.6], [36.0, 32.0], [36.1, 30.0]],
      lat: 36.5, lng: 31.3,
      region: "Akdeniz",
      city: "Antalya - Mersin - Isparta",
      promptTitle: "Kalker (kireçtaşı) ana kayasının Akdeniz iklimi altında çözünmesiyle oluşan, demir oksitten dolayı kırmızı renkli toprakların yayıldığı alan haritada neresidir?",
      kpssNot: "Kalkerin erimesiyle geriye kalan demir oksit toprağı kırmızıya boyar. Maki örtüsü altında görülür. Turunçgil ve zeytin için elverişlidir."
    },
    {
      id: "top_kahverengi_orman",
      name: "Kahverengi Orman Toprağı",
      shortName: "Kahverengi Orman Toprağı",
      category: "toprak",
      type: "Zonal Toprak / Nemli",
      shapeType: "polygon",
      coordinates: [[40.6, 30.5], [41.3, 31.5], [41.5, 34.5], [41.0, 36.5], [40.3, 35.0], [40.2, 31.5]],
      lat: 40.9, lng: 33.4,
      region: "Karadeniz",
      city: "Bolu - Kastamonu - Çankırı",
      promptTitle: "Nemli ormanların altında, bol humuslu ve koyu renkli olarak gelişen kahverengi orman topraklarının yaygın olduğu alan haritada neresidir?",
      kpssNot: "Yaprak döken nemli ormanların altında oluşur. Humusça zengindir. Batı Karadeniz ve Marmara'nın orman alanlarında yaygındır."
    },
    {
      id: "top_podzol",
      name: "Podzol Toprağı",
      shortName: "Podzol Sahası",
      category: "toprak",
      type: "Zonal Toprak / Nemli",
      shapeType: "polygon",
      coordinates: [[40.6, 39.5], [41.0, 40.5], [41.0, 42.0], [40.5, 41.5], [40.4, 40.2]],
      lat: 40.7, lng: 40.9,
      region: "Karadeniz",
      city: "Rize - Trabzon - Artvin (yükseklerde)",
      promptTitle: "Doğu Karadeniz'in çok yağışlı ve serin yüksek kesimlerinde, iğne yapraklı ormanlar altında oluşan asitli podzol toprakları haritada nerededir?",
      kpssNot: "Aşırı yıkanma nedeniyle asitli ve kül rengidir. İğne yapraklı orman altında, serin-nemli yüksek kesimlerde oluşur. Verimi düşüktür; çay tarımı için asitliliği uygundur."
    },
    {
      id: "top_laterit",
      name: "Laterit Toprağı",
      shortName: "Laterit Sahası",
      category: "toprak",
      type: "Zonal Toprak / Nemli",
      lat: 41.02, lng: 40.52,
      region: "Karadeniz",
      city: "Rize - Trabzon (kıyı)",
      kpssNot: "Sıcak ve çok nemli kıyı kuşağında aşırı yıkanmayla oluşan kırmızı topraktır. Türkiye'de yalnızca Doğu Karadeniz kıyı şeridinde görülür; ÇAY tarımının yapıldığı topraktır."
    },
    {
      id: "top_kestane_kahve_bozkir",
      name: "Kestane / Kahverengi Bozkır Toprağı",
      shortName: "Bozkır Toprağı",
      category: "toprak",
      type: "Zonal Toprak / Karasal",
      shapeType: "polygon",
      coordinates: [[38.4, 31.8], [39.6, 32.2], [40.0, 34.5], [39.4, 36.2], [38.2, 35.2], [37.9, 32.8]],
      lat: 39.0, lng: 33.8,
      region: "İç Anadolu",
      city: "Konya - Ankara - Kırşehir",
      promptTitle: "Az yağışlı karasal iklimin bozkır (step) örtüsü altında gelişen, tahıl tarımına elverişli kahverengi toprakların yayıldığı alan haritada neresidir?",
      kpssNot: "İç Anadolu bozkırlarının toprağıdır. Humus azdır ama kireç bakımından zengindir; TAHIL tarımı için elverişlidir. Erozyona çok açıktır."
    },
    {
      id: "top_aluvyal",
      name: "Alüvyal Toprak",
      shortName: "Alüvyal Toprak (Çukurova)",
      category: "toprak",
      type: "Azonal Toprak / Taşınmış",
      shapeType: "polygon",
      coordinates: [[36.6, 34.9], [37.1, 35.2], [37.0, 36.0], [36.5, 35.7], [36.4, 35.1]],
      lat: 36.8, lng: 35.4,
      region: "Akdeniz",
      city: "Adana - Mersin (Çukurova)",
      promptTitle: "Akarsuların taşıyıp biriktirdiği ince malzemeden oluşan, Türkiye'nin en verimli TAŞINMIŞ toprağının en geniş yayılım alanı haritada neresidir?",
      kpssNot: "Akarsu biriktirmesiyle oluşan, katmanlaşmamış (azonal) ve ÇOK VERİMLİ topraktır. Delta ve taban ovalarında görülür. Türkiye tarımının bel kemiğidir."
    },
    {
      id: "top_koluvyal",
      name: "Kolüvyal Toprak",
      shortName: "Kolüvyal Toprak",
      category: "toprak",
      type: "Azonal Toprak / Taşınmış",
      lat: 38.35, lng: 27.75,
      region: "Ege",
      city: "Manisa - İzmir (dağ etekleri)",
      kpssNot: "Yamaçlardan yerçekimiyle inen kaba malzemenin dağ eteklerinde birikmesiyle oluşur. Alüvyalden farkı: taşınma mesafesi kısa, malzeme İRİ ve köşelidir."
    },
    {
      id: "top_litosol",
      name: "Litosol (Taşlı Toprak)",
      shortName: "Litosol Sahası",
      category: "toprak",
      type: "Azonal Toprak / Taşınmış",
      lat: 37.2, lng: 33.2,
      region: "Akdeniz",
      city: "Toroslar (Karaman - Mersin)",
      kpssNot: "Eğimin fazla olduğu yamaçlarda ince malzemenin taşınıp yalnızca iri taşların kalmasıyla oluşur. Toroslar'da yaygındır; tarıma elverişsizdir."
    },
    {
      id: "top_regosol",
      name: "Regosol (Volkanik Kum Toprağı)",
      shortName: "Regosol Sahası",
      category: "toprak",
      type: "Azonal Toprak / Taşınmış",
      lat: 38.63, lng: 34.72,
      region: "İç Anadolu",
      city: "Nevşehir - Kayseri (Kapadokya)",
      kpssNot: "Volkanik kum ve tüf üzerinde gelişen gevşek topraktır. Kapadokya çevresinde bağcılık ve patates tarımına elverişlidir."
    },
    {
      id: "top_halomorfik",
      name: "Halomorfik (Tuzlu - Alkali) Toprak",
      shortName: "Tuzlu-Alkali Toprak",
      category: "toprak",
      type: "İntrazonal Toprak / Tuzlu",
      shapeType: "polygon",
      coordinates: [[38.4, 32.9], [39.0, 33.0], [39.1, 34.0], [38.5, 34.0], [38.3, 33.4]],
      lat: 38.7, lng: 33.5,
      region: "İç Anadolu",
      city: "Konya - Aksaray (Tuz Gölü çevresi)",
      promptTitle: "Buharlaşmanın şiddetli, drenajın yetersiz olduğu kapalı havzalarda tuzun yüzeyde birikmesiyle oluşan tuzlu-alkali toprakların alanı haritada neresidir?",
      kpssNot: "Buharlaşmanın yağıştan fazla olduğu kapalı havzalarda tuz yüzeye çıkar. Tuz Gölü çevresi ve Konya Ovası tipik alanıdır. Yanlış sulama bu toprağı yaygınlaştırır."
    },
    {
      id: "top_vertisol",
      name: "Vertisol (Killi Kara Toprak)",
      shortName: "Vertisol Sahası",
      category: "toprak",
      type: "İntrazonal Toprak / Kalsimorfik",
      lat: 37.35, lng: 39.5,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa - Diyarbakır",
      kpssNot: "Killi yapıdadır; kuruyunca derin çatlaklar açar, ıslanınca şişer. Güneydoğu Anadolu'da yaygındır; GAP sulamasıyla pamuk üretiminde kullanılır."
    },
    {
      id: "top_hidromorfik",
      name: "Hidromorfik (Bataklık) Toprağı",
      shortName: "Hidromorfik Toprak",
      category: "toprak",
      type: "İntrazonal Toprak / Nemli",
      lat: 38.55, lng: 35.28,
      region: "İç Anadolu",
      city: "Kayseri (Sultan Sazlığı)",
      kpssNot: "Taban suyunun yüzeye çok yakın olduğu bataklık ve sazlık alanlarda oluşur. Havasız ortamda organik madde çürüyemez; kurutulmadan tarıma açılamaz."
    },
    {
      id: "top_rendzina",
      name: "Rendzina Toprağı",
      shortName: "Rendzina Sahası",
      category: "toprak",
      type: "İntrazonal Toprak / Kalsimorfik",
      lat: 41.3, lng: 27.0,
      region: "Marmara",
      city: "Trakya (Ergene Havzası)",
      kpssNot: "Yumuşak kireçtaşı (marn) üzerinde gelişen koyu renkli topraktır. Trakya'da ayçiçeği tarımının yapıldığı alanlarda görülür."
    },
    {
      id: "top_kirmizimsi_kahve",
      name: "Kırmızımsı Kahverengi Toprak",
      shortName: "Kırmızımsı Kahverengi Toprak",
      category: "toprak",
      type: "Zonal Toprak / Karasal",
      lat: 37.1, lng: 38.8,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa - Gaziantep - Mardin",
      kpssNot: "Yarı kurak Güneydoğu Anadolu'nun zonal toprağıdır. Kireçli ve demir oksitlidir; sulama ile pamuk ve mercimek üretiminde çok verimli hale gelir."
    }
  ],

  // =========================================================================
  // ⚠️ DOĞAL AFET BÖLGELERİ
  // =========================================================================
  afet: [
    {
      id: "afet_kaf_deprem",
      name: "Kuzey Anadolu Deprem Kuşağı",
      shortName: "KAF Deprem Kuşağı",
      category: "afet",
      type: "Deprem Riski / 1. Derece",
      shapeType: "polyline",
      coordinates: [[40.75, 26.4], [40.75, 29.3], [40.7, 31.6], [40.85, 34.9], [40.4, 37.3], [39.75, 39.5], [39.9, 41.3]],
      lat: 40.7, lng: 31.6,
      region: "Karadeniz",
      city: "Sakarya - Bolu - Amasya - Erzincan",
      promptTitle: "Türkiye'nin en yıkıcı depremlerinin üzerinde gerçekleştiği, batıya doğru ilerleyen kırılma zinciriyle bilinen deprem kuşağı haritada neresidir?",
      kpssNot: "1939 Erzincan, 1999 Gölcük ve Düzce depremleri bu kuşakta oldu. Kırılmalar doğudan batıya doğru ilerler; Marmara Denizi altındaki kol en riskli parçadır."
    },
    {
      id: "afet_1999_golcuk",
      name: "1999 Gölcük (Marmara) Depremi Alanı",
      shortName: "1999 Marmara Depremi",
      category: "afet",
      type: "Deprem Riski / Tarihsel",
      lat: 40.72, lng: 29.99,
      region: "Marmara",
      city: "Kocaeli (Gölcük) - Sakarya - Yalova",
      kpssNot: "17 Ağustos 1999, Mw 7.4. Türkiye'nin sanayi kalbini vurduğu için ekonomik kaybı en büyük depremdir. Zemin sıvılaşması ve kaçak yapılaşmanın etkisi kritiktir."
    },
    {
      id: "afet_2023_maras",
    groupId: 'grp_batman_petrol_kompleksi',
      name: "2023 Kahramanmaraş Depremleri Alanı",
      shortName: "2023 Maraş Depremleri",
      category: "afet",
      type: "Deprem Riski / Tarihsel",
      shapeType: "polygon",
      coordinates: [[36.2, 36.1], [37.6, 36.4], [38.4, 38.4], [37.8, 39.0], [36.7, 37.3], [36.1, 36.6]],
      lat: 37.4, lng: 37.2,
      region: "Akdeniz",
      city: "Kahramanmaraş - Hatay - Adıyaman - Malatya",
      promptTitle: "6 Şubat 2023'te Doğu Anadolu Fay Hattı üzerinde 11 ili etkileyen ikiz depremlerin alanı haritada neresidir?",
      kpssNot: "6 Şubat 2023, Pazarcık (Mw 7.7) ve Elbistan (Mw 7.6) ikiz depremleri. DOĞU ANADOLU FAY HATTI üzerinde gerçekleşti; 11 ili etkiledi. Cumhuriyet tarihinin en yıkıcı afetidir."
    },
    {
      id: "afet_2011_van",
      name: "2011 Van Depremi Alanı",
      shortName: "2011 Van Depremi",
      category: "afet",
      type: "Deprem Riski / Tarihsel",
      lat: 38.69, lng: 43.47,
      region: "Doğu Anadolu",
      city: "Van (Erciş - Tabanlı)",
      kpssNot: "23 Ekim 2011, Mw 7.2. Van Gölü doğusundaki ters faylanmayla oluştu. Kış koşullarının arama-kurtarmayı zorlaştırdığı örnek olay olarak sorulur."
    },
    {
      id: "afet_2020_izmir",
      name: "2020 İzmir (Sisam) Depremi Alanı",
      shortName: "2020 İzmir Depremi",
      category: "afet",
      type: "Deprem Riski / Tarihsel",
      lat: 37.88, lng: 26.78,
      region: "Ege",
      city: "İzmir (Seferihisar açıkları)",
      kpssNot: "30 Ekim 2020, Mw 6.6. Ege'deki normal faylanmanın ürünüdür. Türkiye kıyılarında ölçülen ender TSUNAMİ örneklerinden biri Sığacık'ta görülmüştür."
    },
    {
      id: "afet_dogu_karadeniz_heyelan",
      name: "Doğu Karadeniz Heyelan Kuşağı",
      shortName: "Karadeniz Heyelan Kuşağı",
      category: "afet",
      type: "Kütle Hareketi / Heyelan",
      shapeType: "polygon",
      coordinates: [[40.6, 38.5], [41.1, 39.5], [41.3, 41.5], [40.8, 41.8], [40.4, 40.0], [40.4, 38.8]],
      lat: 40.85, lng: 40.2,
      region: "Karadeniz",
      city: "Rize - Trabzon - Giresun - Artvin",
      promptTitle: "Şiddetli yağış, dik yamaçlar ve killi ayrışma nedeniyle Türkiye'de en çok heyelan görülen bölüm haritada neresidir?",
      kpssNot: "Türkiye'de heyelanın EN SIK görüldüğü alandır. Nedenleri: bol yağış, çok dik yamaçlar, killi-ayrışmış zemin ve yol yarmalarıyla eğimin bozulması."
    },
    {
      id: "afet_yusufeli_heyelan",
    groupId: 'grp_yusufeli_artvin',
      name: "Artvin - Yusufeli Heyelan Sahası",
      shortName: "Yusufeli Heyelan Sahası",
      category: "afet",
      type: "Kütle Hareketi / Heyelan",
      lat: 40.82, lng: 41.54,
      region: "Karadeniz",
      city: "Artvin (Yusufeli)",
      kpssNot: "Çoruh Vadisi'nin çok dik yamaçları ve gevşek şist yapısı nedeniyle sürekli heyelan üretir. Yol ve baraj çalışmaları riski artırmıştır."
    },
    {
      id: "afet_hakkari_cig",
      name: "Hakkâri - Bitlis Çığ Kuşağı",
      shortName: "Çığ Riski Kuşağı",
      category: "afet",
      type: "Kütle Hareketi / Çığ",
      shapeType: "polygon",
      coordinates: [[37.4, 42.4], [38.5, 42.0], [38.6, 43.6], [37.6, 44.3], [37.3, 43.3]],
      lat: 37.9, lng: 43.2,
      region: "Doğu Anadolu",
      city: "Hakkâri - Bitlis - Van - Şırnak",
      promptTitle: "Kalın ve uzun süreli kar örtüsü ile çok dik yamaçların birleştiği, Türkiye'de çığ olaylarının en sık yaşandığı alan haritada neresidir?",
      kpssNot: "Çığın görülmesi için kalın kar örtüsü + dik yamaç + bitki örtüsünün olmaması gerekir. Hakkâri ve Bitlis çevresi bu üç koşulu birden taşır."
    },
    {
      id: "afet_bozkurt_sel",
      name: "Batı Karadeniz Sel & Taşkın Kuşağı",
      shortName: "Batı Karadeniz Sel Kuşağı",
      category: "afet",
      type: "Su Kaynaklı Afet / Sel",
      shapeType: "polygon",
      coordinates: [[41.2, 32.5], [42.0, 33.4], [42.0, 35.5], [41.3, 35.5], [41.0, 33.3]],
      lat: 41.6, lng: 34.1,
      region: "Karadeniz",
      city: "Kastamonu (Bozkurt) - Sinop - Bartın",
      promptTitle: "Ağustos 2021'de yaşanan yıkıcı sel felaketinin merkezi olan, dar vadi tabanlarına kurulmuş yerleşmeleriyle riskli olan alan haritada neresidir?",
      kpssNot: "Ağustos 2021 Bozkurt seli. Riski artıran unsurlar: dar vadi tabanına yerleşme, dere yatağının daraltılması ve eğimli arazide ani sağanaklar."
    },
    {
      id: "afet_ayamama_taskin",
      name: "İstanbul Ayamama Taşkın Sahası",
      shortName: "İstanbul Taşkın Sahası",
      category: "afet",
      type: "Su Kaynaklı Afet / Taşkın",
      lat: 41.02, lng: 28.82,
      region: "Marmara",
      city: "İstanbul (Ayamama Deresi)",
      kpssNot: "2009 taşkını. Betonlaşmanın suyu yer altına sızdırmaması ve dere yataklarının yapılaşmaya açılması KENTSEL taşkının temel nedenidir."
    },
    {
      id: "afet_karapinar_obruk",
    groupId: 'grp_karapinar_havzasi',
      name: "Karapınar Obruk Sahası",
      shortName: "Karapınar Obruk Sahası",
      category: "afet",
      type: "Diğer Afet / Obruk",
      shapeType: "polygon",
      coordinates: [[37.5, 33.2], [37.9, 33.3], [37.9, 33.9], [37.5, 33.9]],
      lat: 37.7, lng: 33.55,
      region: "İç Anadolu",
      city: "Konya (Karapınar)",
      promptTitle: "Aşırı yer altı suyu çekimi nedeniyle tavanı çöken karstik boşluklarla (obruk) ünlü, kuraklık ve çölleşme riski taşıyan saha haritada neresidir?",
      kpssNot: "Kaçak kuyularla yer altı suyunun aşırı çekilmesi karstik boşlukların tavanını çökertir. Konya Kapalı Havzası'nda obruk sayısı hızla artmaktadır."
    },
    {
      id: "afet_ic_anadolu_erozyon",
      name: "İç Anadolu Erozyon Kuşağı",
      shortName: "Erozyon Riski Kuşağı",
      category: "afet",
      type: "Diğer Afet / Erozyon",
      shapeType: "polygon",
      coordinates: [[38.6, 32.6], [39.8, 33.2], [40.2, 35.6], [39.4, 36.6], [38.5, 35.4], [38.3, 33.5]],
      lat: 39.3, lng: 34.5,
      region: "İç Anadolu",
      city: "Ankara - Kırıkkale - Çorum - Yozgat",
      promptTitle: "Bitki örtüsünün cılız, yağışın düzensiz sağanak biçiminde olduğu; Türkiye'de toprak kaybının en fazla yaşandığı alan haritada neresidir?",
      kpssNot: "Erozyonun temel nedeni BİTKİ ÖRTÜSÜNÜN TAHRİBİDİR. İç Anadolu'da cılız bozkır + sağanak yağış + eğim birleşir. Türkiye'nin %60'ından fazlası erozyon riski altındadır."
    },
    {
      id: "afet_nallihan_kirgibayir",
      name: "Nallıhan Kırgıbayır (Badlands) Sahası",
      shortName: "Kırgıbayır Sahası",
      category: "afet",
      type: "Diğer Afet / Erozyon",
      lat: 40.19, lng: 31.35,
      region: "İç Anadolu",
      city: "Ankara (Nallıhan)",
      kpssNot: "Bitki örtüsünden yoksun killi-marnlı yamaçların yağmur sularıyla oyulmasıyla oluşan 'kırgıbayır' erozyon şeklidir. Erozyonun uç noktasını gösterir."
    },
    {
      id: "afet_manavgat_yangin",
      name: "Antalya - Manavgat Orman Yangını Sahası",
      shortName: "Manavgat Yangın Sahası",
      category: "afet",
      type: "Diğer Afet / Orman Yangını",
      lat: 36.79, lng: 31.44,
      region: "Akdeniz",
      city: "Antalya (Manavgat)",
      kpssNot: "Temmuz-Ağustos 2021 yangınları. Kızılçam ormanları reçineli olduğu için çok kolay tutuşur; yaz kuraklığı ve sıcak rüzgârlar yangını büyütür."
    },
    {
      id: "afet_mugla_yangin",
      name: "Muğla - Marmaris Yangın Kuşağı",
      shortName: "Muğla Yangın Kuşağı",
      category: "afet",
      type: "Diğer Afet / Orman Yangını",
      shapeType: "polygon",
      coordinates: [[36.6, 27.6], [37.1, 28.0], [37.0, 28.9], [36.6, 28.6], [36.5, 27.9]],
      lat: 36.8, lng: 28.3,
      region: "Ege",
      city: "Muğla (Marmaris - Milas - Köyceğiz)",
      promptTitle: "Kızılçam ve maki örtüsünün yoğun olduğu, Türkiye'de orman yangını riskinin en yüksek olduğu alanlardan biri haritada neresidir?",
      kpssNot: "Akdeniz iklimindeki yaz kuraklığı, kızılçamın reçineli yapısı ve turizm baskısı riski artırır. Türkiye'de yangınların büyük çoğunluğu Akdeniz ve Ege kıyılarında çıkar."
    },
    {
      id: "afet_konya_kuraklik",
      name: "Konya Kapalı Havzası Kuraklık Sahası",
      shortName: "Konya Kuraklık Sahası",
      category: "afet",
      type: "Diğer Afet / Kuraklık",
      shapeType: "polygon",
      coordinates: [[37.3, 31.9], [38.9, 32.4], [39.0, 34.2], [37.8, 34.3], [37.2, 33.0]],
      lat: 38.1, lng: 33.1,
      region: "İç Anadolu",
      city: "Konya - Karaman - Aksaray",
      promptTitle: "Türkiye'nin en büyük kapalı havzası olan, yağış azlığı ve aşırı sulama nedeniyle çölleşme riski taşıyan alan haritada neresidir?",
      kpssNot: "Türkiye'nin EN BÜYÜK kapalı havzasıdır. Yıllık yağış 300 mm'nin altındadır. Aşırı sulama ve yer altı suyu çekimi çölleşme riskini artırmaktadır."
    },
    {
      id: "afet_ergene_taskin",
    groupId: 'grp_ergene_havzasi',
      name: "Ergene Havzası Taşkın Sahası",
      shortName: "Ergene Taşkın Sahası",
      category: "afet",
      type: "Su Kaynaklı Afet / Taşkın",
      lat: 41.3, lng: 26.9,
      region: "Marmara",
      city: "Edirne - Tekirdağ (Ergene)",
      kpssNot: "Meriç ve Ergene'nin taşmasıyla Edirne çevresi düzenli olarak su altında kalır. Havzanın çok düz olması suyun yayılmasını kolaylaştırır."
    },
    {
      id: "afet_igdir_don",
    groupId: 'grp_igdir_mikroklima',
      name: "Iğdır - Aras Don Riski Sahası",
      shortName: "Don Riski Sahası",
      category: "afet",
      type: "Diğer Afet / Don",
      lat: 39.92, lng: 44.04,
      region: "Doğu Anadolu",
      city: "Iğdır - Ağrı - Kars",
      kpssNot: "Çukur alanlarda soğuk havanın çökmesiyle (don çukuru) ilkbahar geç donları meyveciliğe zarar verir. Türkiye'nin en uzun donlu gün sayısı Doğu Anadolu'dadır."
    }
  ],

  // =========================================================================
  // 💥 FAY HATLARI, GRABENLER & TEKTONİK YAPI
  // =========================================================================
  fay: [
    {
      id: "fay_kaf",
      name: "Kuzey Anadolu Fay Hattı (KAF)",
      shortName: "Kuzey Anadolu Fayı",
      category: "fay",
      type: "Fay Hattı / Doğrultu Atımlı",
      shapeType: "polyline",
      coordinates: [[40.6, 26.2], [40.75, 27.6], [40.72, 29.3], [40.7, 30.9], [40.75, 32.6], [40.85, 34.9], [40.5, 36.6], [40.2, 38.2], [39.75, 39.5], [39.9, 41.0]],
      lat: 40.7, lng: 32.6,
      region: "Karadeniz",
      city: "Saros'tan Karlıova'ya",
      promptTitle: "Karlıova'dan Saros Körfezi'ne kadar uzanan, Anadolu Levhası'nı batıya kaydıran sağ yönlü doğrultu atımlı fay hattı haritada neresidir?",
      kpssNot: "Yaklaşık 1200 km uzunluğunda, SAĞ yönlü doğrultu atımlı faydır. Anadolu Levhası'nı batıya kaydırır. Karlıova'da Doğu Anadolu Fayı ile birleşir."
    },
    {
      id: "fay_daf",
      name: "Doğu Anadolu Fay Hattı (DAF)",
      shortName: "Doğu Anadolu Fayı",
      category: "fay",
      type: "Fay Hattı / Doğrultu Atımlı",
      shapeType: "polyline",
      coordinates: [[36.2, 36.1], [37.0, 36.4], [37.6, 37.0], [38.35, 38.3], [38.7, 39.3], [39.3, 40.6], [39.28, 41.0]],
      lat: 37.6, lng: 37.5,
      region: "Doğu Anadolu",
      city: "Karlıova - Kahramanmaraş - Hatay",
      promptTitle: "Karlıova'dan Hatay'a uzanan, 2023 Kahramanmaraş depremlerini üreten sol yönlü doğrultu atımlı fay hattı haritada neresidir?",
      kpssNot: "SOL yönlü doğrultu atımlı faydır. Arap Levhası ile Anadolu Levhası'nın sınırıdır. 6 Şubat 2023 ikiz depremleri bu hat üzerinde oldu."
    },
    {
      id: "fay_bitlis_zagros",
      name: "Bitlis - Zagros Kenet Kuşağı",
      shortName: "Bitlis-Zagros Kuşağı",
      category: "fay",
      type: "Fay Hattı / Bindirme",
      shapeType: "polyline",
      coordinates: [[37.4, 38.0], [37.8, 39.6], [38.2, 41.3], [38.4, 42.6], [37.9, 43.9]],
      lat: 38.0, lng: 41.0,
      region: "Doğu Anadolu",
      city: "Bitlis - Siirt - Hakkâri",
      kpssNot: "Arap ve Avrasya levhalarının ÇARPIŞTIĞI bindirme kuşağıdır. Doğu Anadolu'nun yükselmesinin ve volkanizmasının temel nedenidir."
    },
    {
      id: "fay_olu_deniz",
      name: "Ölü Deniz Fayı (Hatay Kolu)",
      shortName: "Ölü Deniz Fayı",
      category: "fay",
      type: "Fay Hattı / Doğrultu Atımlı",
      shapeType: "polyline",
      coordinates: [[35.9, 36.0], [36.3, 36.15], [36.9, 36.35]],
      lat: 36.3, lng: 36.15,
      region: "Akdeniz",
      city: "Hatay (Amik Ovası)",
      kpssNot: "Afrika-Arap levha sınırının Türkiye'ye giren koludur. Amik Ovası bu fayın oluşturduğu bir çöküntü alanıdır; Hatay'ın deprem riskini belirler."
    },
    {
      id: "fay_bat_anadolu_sistemi",
      name: "Batı Anadolu Fay Sistemi (Ege Grabenleri)",
      shortName: "Ege Graben Sistemi",
      category: "fay",
      type: "Fay Sistemi / Normal Fay",
      shapeType: "polygon",
      coordinates: [[37.5, 26.8], [39.2, 26.8], [39.4, 29.5], [38.6, 30.6], [37.4, 29.4], [37.2, 27.6]],
      lat: 38.4, lng: 28.3,
      region: "Ege",
      city: "İzmir - Manisa - Aydın - Denizli",
      promptTitle: "Doğu-batı doğrultulu horst ve grabenlerden oluşan, Türkiye'de gerilme (çekme) kuvvetlerinin etkisindeki fay sistemi haritada neresidir?",
      kpssNot: "Ege'de yer kabuğu GERİLİR (çekme). Bu nedenle NORMAL faylar oluşur; çöken yerler graben (ova), yükselenler horst (dağ) olur. Kıyıya DİK uzanır."
    },
    {
      id: "fay_gediz_grabeni",
      name: "Gediz Grabeni",
      shortName: "Gediz Grabeni",
      category: "fay",
      type: "Graben / Çöküntü",
      shapeType: "polygon",
      coordinates: [[38.5, 27.1], [38.75, 27.5], [38.7, 29.0], [38.4, 28.9], [38.35, 27.4]],
      lat: 38.55, lng: 28.1,
      region: "Ege",
      city: "Manisa - Salihli - Alaşehir",
      kpssNot: "Bozdağlar (horst) ile Manisa Dağı arasındaki çöküntü alanıdır. Alüvyal dolgusuyla üzüm ve pamuk üretiminin merkezidir."
    },
    {
      id: "fay_bmenderes_grabeni",
      name: "Büyük Menderes Grabeni",
      shortName: "B. Menderes Grabeni",
      category: "fay",
      type: "Graben / Çöküntü",
      shapeType: "polygon",
      coordinates: [[37.75, 27.3], [37.95, 27.9], [37.9, 29.2], [37.65, 29.1], [37.6, 27.6]],
      lat: 37.8, lng: 28.3,
      region: "Ege",
      city: "Aydın - Nazilli - Denizli",
      kpssNot: "Aydın Dağları ile Menteşe Dağları arasındaki grabendir. Türkiye'nin en verimli incir ve pamuk alanlarını barındırır; jeotermal potansiyeli yüksektir."
    },
    {
      id: "fay_kmenderes_grabeni",
      name: "Küçük Menderes Grabeni",
      shortName: "K. Menderes Grabeni",
      category: "fay",
      type: "Graben / Çöküntü",
      lat: 38.1, lng: 27.6,
      region: "Ege",
      city: "İzmir (Torbalı - Ödemiş - Tire)",
      kpssNot: "Bozdağlar ile Aydın Dağları arasındaki dar grabendir. Küçük Menderes Nehri buradan geçer; Selçuk Deltası'nı oluşturur."
    },
    {
      id: "fay_bakircay_grabeni",
      name: "Bakırçay Grabeni",
      shortName: "Bakırçay Grabeni",
      category: "fay",
      type: "Graben / Çöküntü",
      lat: 39.05, lng: 27.4,
      region: "Ege",
      city: "İzmir (Bergama) - Manisa (Soma)",
      kpssNot: "Madra Dağı ile Yunt Dağı arasındaki en kuzeydeki Ege grabenidir. Soma linyit havzası bu çöküntünün içinde yer alır."
    },
    {
      id: "fay_kuzey_marmara",
      name: "Kuzey Marmara Fayı (Marmara Çukuru)",
      shortName: "Kuzey Marmara Fayı",
      category: "fay",
      type: "Fay Hattı / Denizaltı",
      shapeType: "polyline",
      coordinates: [[40.85, 27.4], [40.82, 28.2], [40.85, 28.9], [40.78, 29.4]],
      lat: 40.83, lng: 28.4,
      region: "Marmara",
      city: "İstanbul - Tekirdağ açıkları",
      kpssNot: "KAF'ın Marmara Denizi altındaki koludur. 1200 m derinliğe ulaşan Çınarcık Çukuru buradadır. İstanbul'un beklenen büyük depreminin kaynağı sayılır."
    },
    {
      id: "fay_ecemis",
      name: "Ecemiş Fay Zonu",
      shortName: "Ecemiş Fayı",
      category: "fay",
      type: "Fay Hattı / Doğrultu Atımlı",
      shapeType: "polyline",
      coordinates: [[36.6, 34.4], [37.4, 34.9], [38.2, 35.4], [38.7, 35.6]],
      lat: 37.5, lng: 35.0,
      region: "İç Anadolu",
      city: "Niğde - Kayseri - Adana",
      kpssNot: "Aladağlar ile Bolkar Dağları'nı ayıran fay zonudur. Ulukışla-Pozantı ulaşım koridoru (Gülek Boğazı) bu fay boyunca gelişmiştir."
    },
    {
      id: "fay_tuzgolu",
    groupId: 'grp_tuz_golu_havzasi',
      name: "Tuz Gölü Fay Zonu",
      shortName: "Tuz Gölü Fayı",
      category: "fay",
      type: "Fay Hattı / Normal Fay",
      shapeType: "polyline",
      coordinates: [[38.2, 33.1], [38.7, 33.4], [39.3, 33.6], [39.9, 33.5]],
      lat: 38.9, lng: 33.4,
      region: "İç Anadolu",
      city: "Aksaray - Ankara (Şereflikoçhisar)",
      kpssNot: "Tuz Gölü çanağını oluşturan tektonik hattır. Gölün tektonik kökenli olmasının ve çevresinin çökmüş olmasının nedeni budur."
    },
    {
      id: "fay_erzincan_cukuru",
      name: "Erzincan Çöküntü Ovası (Fay Kavşağı)",
      shortName: "Erzincan Fay Kavşağı",
      category: "fay",
      type: "Graben / Çöküntü",
      lat: 39.75, lng: 39.49,
      region: "Doğu Anadolu",
      city: "Erzincan",
      kpssNot: "KAF üzerinde bir ÇEK-AYIR (pull-apart) havzasıdır. 1939 (Mw 7.9) ve 1992 depremlerinin merkezidir; Türkiye'nin en riskli çöküntü ovasıdır."
    },
    {
      id: "fay_anadolu_levhasi",
      name: "Anadolu Levhası",
      shortName: "Anadolu Levhası",
      category: "fay",
      type: "Levha / Tektonik Birim",
      shapeType: "polygon",
      coordinates: [[36.5, 27.0], [40.8, 26.5], [41.2, 34.0], [40.0, 40.0], [38.0, 41.0], [36.5, 36.0], [36.2, 30.0]],
      lat: 39.0, lng: 33.0,
      region: "İç Anadolu",
      city: "Türkiye geneli",
      promptTitle: "Kuzeyde Avrasya, güneyde Arap ve Afrika levhaları arasında sıkışarak batıya kaçan levha haritada neresidir?",
      kpssNot: "Kuzeyde Avrasya, güneyde Arap ve Afrika levhaları arasında sıkışır ve yılda ~2 cm BATIYA kaçar. Türkiye'nin deprem kuşağında olmasının temel nedenidir."
    },
    {
      id: "fay_arap_levhasi",
      name: "Arap Levhası (Kuzey Sınırı)",
      shortName: "Arap Levhası",
      category: "fay",
      type: "Levha / Tektonik Birim",
      lat: 37.0, lng: 40.0,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa - Mardin - Şırnak",
      kpssNot: "Kuzeye doğru hareket ederek Anadolu'yu sıkıştırır. Güneydoğu Anadolu bu levhanın üzerinde yer aldığı için deprem riski görece düşüktür."
    },
    {
      id: "fay_birinci_derece",
      name: "1. Derece Deprem Bölgeleri",
      shortName: "1. Derece Deprem Kuşağı",
      category: "fay",
      type: "Deprem Bölgesi / Risk Haritası",
      shapeType: "polygon",
      coordinates: [[40.4, 27.0], [41.0, 29.5], [40.9, 33.0], [40.5, 36.5], [39.6, 39.6], [39.5, 41.2], [38.2, 39.0], [37.0, 36.3], [38.5, 28.0], [39.8, 26.7]],
      lat: 39.8, lng: 33.0,
      region: "Türkiye Geneli",
      city: "KAF, DAF ve Ege graben kuşakları",
      kpssNot: "Türkiye yüzölçümünün yaklaşık %42'si, nüfusunun %45'i 1. derece deprem bölgesindedir. Bu alanlar KAF, DAF ve Ege graben sistemi boyunca uzanır."
    }
  ]
});
