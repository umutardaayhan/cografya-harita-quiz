const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'cografya_data.legacy.js');
let content = fs.readFileSync(filePath, 'utf8');

const tarimArrayStr = `  tarim: [
    // --- 1. TAHILLAR (HUBUBAT) ---
    {
      id: "tarim_bugday", name: "Buğday", shortName: "Buğday", category: "tarim",
      promptTitle: "Karasal iklim şartlarına uygun, Türkiye'de ekim alanı en geniş olup en fazla Konya'da yetiştirilen temel tahıl haritada neresidir?",
      type: "Tahıl (Hububat)", lat: 37.87, lng: 32.48, region: "İç Anadolu", city: "Konya",
      groupId: "tarim_grp_konya", shapeType: "point",
      kpssNot: "Karasal iklim şartlarına uygun bir ürün olup Türkiye'de en fazla Konya ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_arpa", name: "Arpa", shortName: "Arpa", category: "tarim",
      promptTitle: "Buğdayla benzer yetişme koşullarına sahip, soğuğa daha dayanıklı ve en fazla Konya'da üretilen tahıl haritada neresidir?",
      type: "Tahıl (Hububat / Yem)", lat: 37.87, lng: 32.48, region: "İç Anadolu", city: "Konya",
      groupId: "tarim_grp_konya", shapeType: "point",
      kpssNot: "Buğdayla benzer yetişme koşullarına sahiptir ve en fazla Konya ilinde üretilmektedir."
    },
    {
      id: "tarim_cavdar", name: "Çavdar", shortName: "Çavdar", category: "tarim",
      promptTitle: "Soğuğa ve kıraç topraklara en dayanıklı tahıl olup en çok Kayseri ilinde yetiştirilen ürün haritada neresidir?",
      type: "Tahıl (Hububat)", lat: 38.73, lng: 35.48, region: "İç Anadolu", city: "Kayseri",
      groupId: "tarim_grp_kayseri", shapeType: "point",
      kpssNot: "Tahıllar içinde soğuğa en dayanıklı ürünlerden biri olup en çok Kayseri ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_yulaf", name: "Yulaf", shortName: "Yulaf", category: "tarim",
      promptTitle: "Bisküvi sanayisi ve hayvan yemi olarak kullanılan, en fazla Sivas ilinde üretilen tahıl haritada neresidir?",
      type: "Tahıl (Hububat)", lat: 39.75, lng: 37.01, region: "İç Anadolu", city: "Sivas",
      shapeType: "point",
      kpssNot: "Bisküvi sanayisi ve yem bitkisi olarak kullanılan yulaf, en fazla Sivas ilinde üretilmektedir."
    },
    {
      id: "tarim_misir", name: "Mısır", shortName: "Mısır", category: "tarim",
      promptTitle: "Doğal ortamı Karadeniz olmasına rağmen sulama projeleriyle (Mavi Tünel) günümüzde en fazla Konya'da yetiştirilen ürün haritada neresidir?",
      type: "Tahıl (Sulu Tarım)", lat: 37.87, lng: 32.48, region: "İç Anadolu", city: "Konya",
      groupId: "tarim_grp_konya", shapeType: "point",
      kpssNot: "Doğal ortamı Karadeniz iklimi olmasına rağmen, sulama projelerinin (Mavi Tünel - KOP) etkisiyle günümüzde en fazla Konya ilinde yetiştirilmektedir."
    },

    // --- 2. BAKLAGİLLER ---
    {
      id: "tarim_kirmizi_mercimek", name: "Kırmızı Mercimek", shortName: "Kırmızı Mercimek", category: "tarim",
      promptTitle: "Kuraklığa ve yüksek sıcaklığa en dayanıklı baklagil olup en çok Şanlıurfa'da üretilen ürün haritada neresidir?",
      type: "Baklagil (Kurakçıl)", lat: 37.16, lng: 38.79, region: "Güneydoğu Anadolu", city: "Şanlıurfa",
      groupId: "tarim_grp_sanliurfa", shapeType: "point",
      kpssNot: "Kuraklığa en dayanıklı tarım ürünlerinden biri olup en çok Şanlıurfa ilinde üretilmektedir."
    },
    {
      id: "tarim_yesil_mercimek", name: "Yeşil Mercimek", shortName: "Yeşil Mercimek", category: "tarim",
      promptTitle: "İç Anadolu şartlarına uyum sağlamış, en fazla Yozgat ilinde yetiştirilen baklagil haritada neresidir?",
      type: "Baklagil", lat: 39.82, lng: 34.81, region: "İç Anadolu", city: "Yozgat",
      shapeType: "point",
      kpssNot: "İç Anadolu karasal ikliminde yetiştirilen yeşil mercimek, en fazla Yozgat ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_nohut", name: "Nohut", shortName: "Nohut", category: "tarim",
      promptTitle: "Türkiye'de ekim alanı en yaygın baklagil olup en çok Ankara ilinde üretilen ürün haritada neresidir?",
      type: "Baklagil", lat: 39.93, lng: 32.86, region: "İç Anadolu", city: "Ankara",
      groupId: "tarim_grp_ankara", shapeType: "point",
      kpssNot: "Baklagiller içinde Türkiye genelinde ekim alanı en yaygın ürün olup en çok Ankara ilinde üretilmektedir."
    },

    // --- 3. SANAYİ BİTKİLERİ ---
    {
      id: "tarim_pirinc", name: "Pirinç (Çeltik)", shortName: "Pirinç (Çeltik)", category: "tarim",
      promptTitle: "Akarsu boylarındaki sulak alanlarda yetişen, sıtma riski nedeniyle devlet kontrolünde olup en çok Edirne'de yetiştirilen ürün haritada neresidir?",
      type: "Sanayi Bitkisi (Devlet Kontrollü)", lat: 41.68, lng: 26.56, region: "Marmara", city: "Edirne",
      shapeType: "point",
      kpssNot: "Akarsu boylarındaki sulak ve bataklık alanlarda yetişen, sıtma hastalığı riski nedeniyle üretimi devlet kontrolünde olan pirinç, en çok Edirne (Meriç-Ergene havzası) ilinde üretilmektedir."
    },
    {
      id: "tarim_pamuk", name: "Pamuk", shortName: "Pamuk", category: "tarim",
      promptTitle: "GAP sulama projeleri sonrasında Türkiye üretiminde açık ara ilk sıraya yerleşen Şanlıurfa'nın beyaz altını haritada neresidir?",
      type: "Sanayi Bitkisi (Dokuma Hammaddesi)", lat: 37.16, lng: 38.79, region: "Güneydoğu Anadolu", city: "Şanlıurfa",
      groupId: "tarim_grp_sanliurfa", shapeType: "point",
      kpssNot: "GAP ile sulama imkânlarının artması sonucu günümüzde Türkiye pamuk üretiminde açık ara en fazla Şanlıurfa ilinde üretilmektedir."
    },
    {
      id: "tarim_sekerpancari", name: "Şeker Pancarı", shortName: "Şeker Pancarı", category: "tarim",
      promptTitle: "Hasattan sonra çabuk bozulduğu için fabrikaları tarlaya yakın kurulan, en fazla Konya'da üretilen sanayi bitkisi haritada neresidir?",
      type: "Sanayi Bitkisi", lat: 37.87, lng: 32.48, region: "İç Anadolu", city: "Konya",
      groupId: "tarim_grp_konya", shapeType: "point",
      kpssNot: "Hasat edildikten sonra çabuk bozulduğu için fabrikaları tarlalara yakın kurulan şeker pancarı, en fazla Konya ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_hashas", name: "Haşhaş", shortName: "Haşhaş", category: "tarim",
      promptTitle: "Uyuşturucu yapımında kullanıldığı için ekimi devlet denetiminde olan ve en fazla Afyonkarahisar'da üretilen bitki haritada neresidir?",
      type: "Sanayi Bitkisi (Devlet Kontrollü)", lat: 38.76, lng: 30.54, region: "Ege", city: "Afyonkarahisar",
      shapeType: "point",
      kpssNot: "Uyuşturucu yapımında kullanılması sebebiyle ekimi devlet denetiminde olan haşhaş, en fazla Afyonkarahisar ilinde üretilmektedir."
    },
    {
      id: "tarim_cay", name: "Çay", shortName: "Çay", category: "tarim",
      promptTitle: "Bol yağış ve asidik toprak isteyen, Doğu Karadeniz mikroklimasında ve en çok Rize'de yetiştirilen monokültür bitkisi haritada neresidir?",
      type: "Sanayi Bitkisi (Monokültür)", lat: 41.02, lng: 40.52, region: "Karadeniz", city: "Rize",
      shapeType: "point",
      kpssNot: "Bol yağış, nem ve asidik toprak isteyen çay, Türkiye'de en dar alanda yetişen monokültür bitkisidir; en çok Rize ve çevresinde üretilmektedir."
    },
    {
      id: "tarim_keten", name: "Keten", shortName: "Keten", category: "tarim",
      promptTitle: "Lifleri dokuma ve kâğıt para yapımında kullanılan, tohumundan bezir yağı elde edilen ve en çok Uşak'ta yetiştirilen bitki haritada neresidir?",
      type: "Sanayi Bitkisi (Lif / Yağ)", lat: 38.68, lng: 29.41, region: "Ege", city: "Uşak",
      shapeType: "point",
      kpssNot: "Lifleri dokuma ve kâğıt para yapımında kullanılan, tohumundan bezir yağı elde edilen keten, en çok Uşak ilinde üretilmektedir."
    },

    // --- 4. YAĞ BİTKİLERİ ---
    {
      id: "tarim_soya_fasulyesi", name: "Soya Fasulyesi", shortName: "Soya Fasulyesi", category: "tarim",
      promptTitle: "Sanayi amaçlı üretilen, zengin protein ve yağ oranına sahip olup Çukurova'da en çok Adana'da yetiştirilen yağ bitkisi haritada neresidir?",
      type: "Yağ Bitkisi / Sanayi", lat: 37.00, lng: 35.32, region: "Akdeniz", city: "Adana",
      groupId: "tarim_grp_adana", shapeType: "point",
      kpssNot: "Sanayi amaçlı üretilen bir yağ bitkisi olup Çukurova'da ikinci ürün olarak en çok Adana çevresinde yetiştirilmektedir."
    },
    {
      id: "tarim_aspir", name: "Aspir", shortName: "Aspir", category: "tarim",
      promptTitle: "Karasal iklim bölgelerinde kıraç arazilere uyum sağlayan, biyodizel ve yağ üretiminde kullanılan ve en fazla Kayseri'de üretilen bitki haritada neresidir?",
      type: "Yağ Bitkisi / Biyodizel", lat: 38.73, lng: 35.48, region: "İç Anadolu", city: "Kayseri",
      groupId: "tarim_grp_kayseri", shapeType: "point",
      kpssNot: "Karasal iklim bölgelerinde kıraç arazilere uyum sağlayan bu yağ bitkisi en fazla Kayseri ilinde üretilmektedir."
    },
    {
      id: "tarim_kanola", name: "Kanola (Koza)", shortName: "Kanola (Koza)", category: "tarim",
      promptTitle: "Biyodizel ve bitkisel yağ sanayisinde kullanılan, Trakya'da yaygın olup en çok Tekirdağ'da yetiştirilen yağ bitkisi haritada neresidir?",
      type: "Yağ Bitkisi", lat: 40.98, lng: 27.51, region: "Marmara", city: "Tekirdağ",
      shapeType: "point",
      kpssNot: "Bitkisel yağ ve biyodizel yakıt üretiminde kullanılan kanola (koza), en çok Tekirdağ ilinde yetiştirilmektedir."
    },

    // --- 5. MEYVELER ---
    {
      id: "tarim_incir", name: "İncir", shortName: "İncir", category: "tarim",
      promptTitle: "Kış ılıklığı isteyen, don olayına duyarlı ve Türkiye'nin dünya ihracatında lider olduğu, en fazla Aydın'da üretilen meyve haritada neresidir?",
      type: "Meyvecilik / İhraç Ürünü", lat: 37.85, lng: 27.84, region: "Ege", city: "Aydın",
      shapeType: "point",
      kpssNot: "Kış ılıklığı isteyen ve Türkiye'nin dünya ihracatında lider olduğu incir, en fazla Aydın ilinde üretilmektedir."
    },
    {
      id: "tarim_limon", name: "Limon (Turunçgil)", shortName: "Limon", category: "tarim",
      promptTitle: "Kış donlarına karşı en duyarlı turunçgil türü olup Türkiye üretiminde ilk sırada yer alan Mersin'in sembol meyvesi haritada neresidir?",
      type: "Meyvecilik (Narenciye)", lat: 36.81, lng: 34.64, region: "Akdeniz", city: "Mersin",
      groupId: "tarim_grp_mersin", shapeType: "point",
      kpssNot: "Turunçgiller içinde kış ılıklığı ihtiyacı en yüksek olan limon, Türkiye'de en fazla Mersin ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_turuncgil_adana", name: "Turunçgiller (Portakal, Mandalina, Greyfurt)", shortName: "Portakal, Mandalina, Greyfurt", category: "tarim",
      promptTitle: "Kış ılıklığı isteyen; portakal, mandalina ve greyfurt gibi turunçgillerin Türkiye'de en çok üretildiği Çukurova ili haritada neresidir?",
      type: "Meyvecilik (Narenciye)", lat: 37.00, lng: 35.32, region: "Akdeniz", city: "Adana",
      groupId: "tarim_grp_adana", shapeType: "point",
      kpssNot: "Limon en fazla Mersin ilinde yetiştirilirken; portakal, mandalina ve greyfurt gibi diğer turunçgiller en çok Adana ilinde üretilmektedir."
    },
    {
      id: "tarim_uzum", name: "Üzüm", shortName: "Üzüm", category: "tarim",
      promptTitle: "Soğuğa en dayanıklı meyvelerden biri olan ve çekirdeksiz kuru üretimde Manisa'nın ilk sırada yer aldığı meyve haritada neresidir?",
      type: "Meyvecilik / İhraç Ürünü", lat: 38.61, lng: 27.43, region: "Ege", city: "Manisa",
      groupId: "tarim_grp_manisa", shapeType: "point",
      kpssNot: "Soğuğa en dayanıklı meyvelerden biri olan üzüm, en fazla Manisa ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_elma", name: "Elma", shortName: "Elma", category: "tarim",
      promptTitle: "Üzüm gibi soğuğa dayanıklı, geniş ekim alanına sahip olan ve Göller Yöresi'nde en çok Isparta'da üretilen meyve haritada neresidir?",
      type: "Meyvecilik", lat: 37.76, lng: 30.55, region: "Akdeniz", city: "Isparta",
      shapeType: "point",
      kpssNot: "Üzüm gibi soğuğa dayanıklı ve geniş bir ekim alanına sahip olan elma, en çok Isparta ilinde üretilmektedir."
    },
    {
      id: "tarim_muz", name: "Muz", shortName: "Muz", category: "tarim",
      promptTitle: "Mikroklima şartlarında ve seracılık faaliyetleriyle yetişen, en çok Antalya (Alanya) ve Anamur hattında üretilen tropikal meyve haritada neresidir?",
      type: "Meyvecilik (Mikroklima / Tropikal)", lat: 36.89, lng: 30.71, region: "Akdeniz", city: "Antalya",
      groupId: "tarim_grp_antalya", shapeType: "point",
      kpssNot: "Mikroklima şartlarında ve seracılık faaliyetleriyle yetişen muz, en çok Antalya (Alanya) ve Anamur hattında (Antalya ili ön plandadır) üretilmektedir."
    },
    {
      id: "tarim_cilek", name: "Çilek", shortName: "Çilek", category: "tarim",
      promptTitle: "Erkenci örtü altı yetiştiriciliği ve Akdeniz iklimiyle en fazla Mersin (Silifke) ilinde üretilen meyve haritada neresidir?",
      type: "Meyvecilik / Örtü Altı", lat: 36.81, lng: 34.64, region: "Akdeniz", city: "Mersin",
      groupId: "tarim_grp_mersin", shapeType: "point",
      kpssNot: "Erkenci örtü altı yetiştiriciliği ve Akdeniz iklimiyle çilek en fazla Mersin (Silifke) ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_avokado", name: "Avokado", shortName: "Avokado", category: "tarim",
      promptTitle: "Kış ılıklığı ve subtropikal iklim isteyen, Türkiye'de üretimi hızla artan ve en çok Antalya'da yetiştirilen tropikal meyve haritada neresidir?",
      type: "Meyvecilik (Tropikal)", lat: 36.89, lng: 30.71, region: "Akdeniz", city: "Antalya",
      groupId: "tarim_grp_antalya", shapeType: "point",
      kpssNot: "Subtropikal iklim şartları ve kış ılıklığı isteyen avokado, Türkiye'de en çok Antalya ilinde yetiştirilmektedir."
    },

    // --- 6. YUMRULU VE DİĞER TARIM ÜRÜNLERİ ---
    {
      id: "tarim_sarimsak", name: "Sarımsak", shortName: "Sarımsak", category: "tarim",
      promptTitle: "Coğrafi işaretli Taşköprü üretimiyle ünlü, yüksek aromalı ve en fazla Kastamonu'da yetiştirilen yumrulu ürün haritada neresidir?",
      type: "Yumrulu Tarım Ürünü (Coğrafi İşaret)", lat: 41.38, lng: 33.78, region: "Karadeniz", city: "Kastamonu",
      shapeType: "point",
      kpssNot: "Yüksek aroması ve Taşköprü coğrafi işaretiyle bilinen sarımsak, en fazla Kastamonu ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_susam", name: "Susam", shortName: "Susam", category: "tarim",
      promptTitle: "Sıcak iklim isteyen, tahin ve helva sanayisinin hammaddesi olan ve en çok Antalya'da üretilen yağlı tohum ürünü haritada neresidir?",
      type: "Yağlı Tohum / Sanayi", lat: 36.89, lng: 30.71, region: "Akdeniz", city: "Antalya",
      groupId: "tarim_grp_antalya", shapeType: "point",
      kpssNot: "Sıcak ve güneşli iklim isteyen, tahin ve helva sanayisinde kullanılan susam en çok Antalya ilinde üretilmektedir."
    },
    {
      id: "tarim_kiraz", name: "Kiraz", shortName: "Kiraz", category: "tarim",
      promptTitle: "Türkiye'nin önemli bir ihraç meyvesi olan, Kemalpaşa bahçeleriyle ünlü ve en fazla İzmir'de yetiştirilen meyve haritada neresidir?",
      type: "Meyvecilik / İhraç Ürünü", lat: 38.42, lng: 27.14, region: "Ege", city: "İzmir",
      shapeType: "point",
      kpssNot: "Türkiye'nin önemli bir ihraç meyvesi olan kiraz (Kemalpaşa bahçeleri), en fazla İzmir ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_yer_fistigi", name: "Yer Fıstığı", shortName: "Yer Fıstığı", category: "tarim",
      promptTitle: "Gevşek kumlu toprak isteyen, Çukurova ve Osmaniye havzasıyla en fazla Adana ve Osmaniye hattında yetiştirilen ürün haritada neresidir?",
      type: "Yağlı Tohum / Çerezlik", lat: 37.00, lng: 35.32, region: "Akdeniz", city: "Adana",
      groupId: "tarim_grp_adana", shapeType: "point",
      kpssNot: "Gevşek kumlu toprak isteyen yer fıstığı, en fazla Adana ve Osmaniye hattında yetiştirilmektedir."
    },
    {
      id: "tarim_antep_fistigi", name: "Antep Fıstığı", shortName: "Antep Fıstığı", category: "tarim",
      promptTitle: "Adı komşu ille anılmasına rağmen günümüzde ağaç sayısı ve toplam üretimde en fazla Şanlıurfa'da üretilen kurakçıl meyve haritada neresidir?",
      type: "Meyvecilik / İhraç Ürünü", lat: 37.16, lng: 38.79, region: "Güneydoğu Anadolu", city: "Şanlıurfa",
      groupId: "tarim_grp_sanliurfa", shapeType: "point",
      kpssNot: "Aşırı yaz kuraklığına ve kireçli topraklara dayanıklıdır. Adı Gaziantep ile anılsa da ağaç sayısı ve üretim miktarıyla en fazla Şanlıurfa ilinde üretilmektedir."
    },
    {
      id: "tarim_siirt_fistigi", name: "Siirt Fıstığı", shortName: "Siirt Fıstığı", category: "tarim",
      promptTitle: "Antep fıstığına göre daha iri taneli ve yüksek çıtlama oranına sahip, en çok Siirt'te yetiştirilen fıstık türü haritada neresidir?",
      type: "Meyvecilik (Coğrafi İşaret)", lat: 37.93, lng: 41.94, region: "Güneydoğu Anadolu", city: "Siirt",
      shapeType: "point",
      kpssNot: "Antep fıstığına göre daha iri taneli ve yüksek çıtlama oranına sahip olan Siirt fıstığı en çok Siirt ilinde yetiştirilmektedir."
    },
    {
      id: "tarim_kavun_karpuz", name: "Kavun ve Karpuz", shortName: "Kavun ve Karpuz", category: "tarim",
      promptTitle: "Erkencilik avantajı ve devasa rekoltesiyle Türkiye'de en yoğun olarak Adana'da üretilen bostan ürünleri haritada neresidir?",
      type: "Bostan / Tarım", lat: 37.00, lng: 35.32, region: "Akdeniz", city: "Adana",
      groupId: "tarim_grp_adana", shapeType: "point",
      kpssNot: "Erkencilik avantajı ve geniş ekim alanlarıyla Türkiye'de en yoğun olarak Adana'da üretilmektedir."
    },
    {
      id: "tarim_ceviz", name: "Ceviz", shortName: "Ceviz", category: "tarim",
      promptTitle: "Kapama bahçe yatırımları ve Çağlayancerit üretimiyle detay bir bilgi olarak öne çıkan Kahramanmaraş'ın meyvesi haritada neresidir?",
      type: "Meyvecilik (Sert Kabuklu)", lat: 37.58, lng: 36.93, region: "Akdeniz / Doğu Anadolu", city: "Kahramanmaraş",
      shapeType: "point",
      kpssNot: "Kapama bahçe yatırımları ve Çağlayancerit ceviziyle detay bir bilgi olarak Kahramanmaraş ilinde ön plana çıktığı belirtilmiştir."
    }
  ],

  hayvancilik: [
    {
      id: "hayvan_buyukbas_konya",
      groupId: 'tarim_grp_konya',
      name: "Büyükbaş Hayvancılık (Sığır / Ahır & Besi)",
      shortName: "Büyükbaş Hayvancılık",
      category: "hayvancilik",
      type: "Büyükbaş (Ahır & Besi Hayvancılığı)",
      lat: 37.87,
      lng: 32.48,
      region: "İç Anadolu",
      city: "Konya",
      shapeType: "point",
      kpssNot: "TÜİK güncel verilerine göre Türkiye'de büyükbaş sığır sayısında ve modern ahır/besi hayvancılığında 1. sırada Konya yer alır. Şeker pancarı küspesi, yem bitkileri üretimi ve modern entegre et-süt tesisleri gelişmesinde belirleyicidir."
    },
    {
      id: "hayvan_kucukbas_van",
      groupId: 'grp_van_golu_ekosistemi',
      name: "Küçükbaş Hayvancılık (Koyun)",
      shortName: "Küçükbaş Hayvancılık",
      category: "hayvancilik",
      type: "Küçükbaş (Koyun)",
      lat: 38.50,
      lng: 43.38,
      region: "Doğu Anadolu",
      city: "Van",
      shapeType: "point",
      kpssNot: "TÜİK güncel verilerine göre Türkiye'de küçükbaş ve koyun varlığında 1. sırada Van ili yer alır. Geniş mera alanları ve karasal iklimin bozkır (step) bitki örtüsü koyun yetiştiriciliğine oldukça uygundur."
    },
    {
      id: "hayvan_kil_kecisi_mersin",
      groupId: 'tarim_grp_mersin',
      name: "Kıl Keçisi Yetiştiriciliği",
      shortName: "Kıl Keçisi",
      category: "hayvancilik",
      type: "Küçükbaş (Kıl Keçisi)",
      lat: 36.81,
      lng: 34.64,
      region: "Akdeniz",
      city: "Mersin",
      shapeType: "point",
      kpssNot: "TÜİK güncel verilerine göre Türkiye'de kıl keçisi sayısında 1. sırada Mersin ili yer alır. Engebeli karstik araziye, sarp kayalıklara ve maki bitki örtüsüne tam uyum sağlamıştır; ormanlara ve fidanlara zarar verdiği için devlet kontrolünde otlatılır."
    },
    {
      id: "hayvan_tiftik_kecisi_ankara",
      groupId: 'tarim_grp_ankara',
      name: "Tiftik (Ankara) Keçisi",
      shortName: "Tiftik Keçisi",
      category: "hayvancilik",
      type: "Küçükbaş (Tiftik Keçisi)",
      lat: 39.93,
      lng: 32.86,
      region: "İç Anadolu",
      city: "Ankara",
      shapeType: "point",
      kpssNot: "Ankara keçisi olarak da bilinir. İnce, parlak ve dokuma sanayisinde son derece değerli olan tiftik (moher) yünü için yetiştirilir. Türkiye üretiminde açık ara 1. sırada Ankara yer alır."
    },
    {
      id: "hayvan_manda_samsun",
      groupId: 'grp_samsun_limani',
      name: "Manda Yetiştiriciliği",
      shortName: "Manda Yetiştiriciliği",
      category: "hayvancilik",
      type: "Büyükbaş (Manda)",
      lat: 41.29,
      lng: 36.33,
      region: "Karadeniz",
      city: "Samsun",
      shapeType: "point",
      kpssNot: "Sulak, bataklık ve akarsu boylarını seven manda yetiştiriciliğinde Kızılırmak Deltası (Bafra) sayesinde Türkiye 1.si Samsun ilidir. Yağ oranı yüksek sütü ve meşhur manda kaymağı üretiminde değerlendirilir."
    },
    {
      id: "hayvan_kumes_manisa",
      groupId: 'tarim_grp_manisa',
      name: "Kümes Hayvancılığı (Tavuk / Beyaz Et)",
      shortName: "Kümes Hayvancılığı",
      category: "hayvancilik",
      type: "Kümes Hayvancılığı (Pazara Yakınlık)",
      lat: 38.61,
      lng: 27.43,
      region: "Ege",
      city: "Manisa",
      shapeType: "point",
      kpssNot: "Modern, kapalı ve klimalı entegre tesislerde yapıldığı için iklimden etkilenmez. Ege ve Marmara metropol tüketim merkezlerine (pazara) yakınlığıyla Türkiye kümes hayvancılığı, tavuk eti ve yumurta üretiminde 1. sırada Manisa yer alır."
    },
    {
      id: "hayvan_aricilik_ordu",
      groupId: 'grp_ordu_aricilik',
      name: "Arıcılık (Bal Üretimi)",
      shortName: "Arıcılık",
      category: "hayvancilik",
      type: "Arıcılık (Bal / Gezginci)",
      lat: 40.98,
      lng: 37.88,
      region: "Karadeniz",
      city: "Ordu",
      shapeType: "point",
      kpssNot: "Zengin kır çiçeği florası ve Türkiye'nin dört bir yanına yayılan köklü gezginci arıcılık kültürü sayesinde Türkiye bal üretiminde 1. sırada Ordu ili yer alır."
    },
    {
      id: "hayvan_ipekbocegi_diyarbakir",
      groupId: 'grp_diyarbakir_ipek',
      name: "İpek Böcekçiliği (Yaş Koza)",
      shortName: "İpek Böcekçiliği",
      category: "hayvancilik",
      type: "İpek Böcekçiliği",
      lat: 37.91,
      lng: 40.24,
      region: "Güneydoğu Anadolu",
      city: "Diyarbakır",
      shapeType: "point",
      kpssNot: "Tarihî ve geleneksel merkezi Bursa olmasına rağmen, günümüzde dut yaprağıyla beslenen ipek böceğinden yaş koza üretiminde Türkiye 1.si Diyarbakır (özellikle Kulp ilçesi) ilidir."
    }
  ],`;

// Replace from 'tarim: [' to 'sanayi: ['
const regex = /tarim:\s*\[[\s\S]*?\n\s*sanayi:\s*\[/;
if (regex.test(content)) {
  content = content.replace(regex, `${tarimArrayStr}\n\n  sanayi: [`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully patched tarim (33) and hayvancilik (8) into legacy data!');
} else {
  console.error('Could not find tarim/hayvancilik section in file');
}
