/**
 * ⛏️ MADENLER & ENERJİ KAYNAKLARI — Yazım Kaynağı
 * Derleyici: node tools/build_packs.js
 */
Object.assign(COGRAFYA_DATA_EXT, {
  madenler: [
    {
      id: "mad_bor_kirka",
      name: "Bor (Kırka - Eskişehir)",
      shortName: "Bor Yatakları",
      category: "madenler",
      type: "Endüstriyel Hammadde / İhraç",
      lat: 39.28, lng: 30.52,
      region: "İç Anadolu",
      city: "Eskişehir (Kırka)",
      promptTitle: "Türkiye'nin dünya rezervlerinin yaklaşık dörtte üçüne sahip olduğu, seramikten roket yakıtına kadar kullanılan stratejik madenin en büyük yatağı haritada neresidir?",
      kpssNot: "Türkiye dünya bor rezervinin yaklaşık %73'üne sahiptir; DÜNYA LİDERİDİR. Kırka (Eskişehir), Emet (Kütahya), Bigadiç (Balıkesir) ve Kestelek (Bursa) ana yataklardır."
    },
    {
      id: "mad_bor_emet",
      name: "Bor (Emet - Kütahya)",
      category: "madenler",
      type: "Endüstriyel Hammadde / İhraç",
      lat: 39.34, lng: 29.25,
      region: "Ege",
      city: "Kütahya (Emet)",
      kpssNot: "Kolemanit türü bor yatağıdır. Eti Maden işletir; ürünün büyük bölümü işlenerek ihraç edilir."
    },
    {
      id: "mad_bor_bigadic",
      name: "Bor (Bigadiç - Balıkesir)",
      category: "madenler",
      type: "Endüstriyel Hammadde / İhraç",
      lat: 39.39, lng: 28.13,
      region: "Marmara",
      city: "Balıkesir (Bigadiç)",
      kpssNot: "Kolemanit ve üleksit yataklarıdır. Bandırma Limanı'na yakınlığı ihracat avantajı sağlar."
    },
    {
      id: "mad_krom_guleman",
      name: "Krom (Guleman - Elazığ)",
      shortName: "Krom Yatakları",
      category: "madenler",
      type: "Metalik Maden / İhraç",
      lat: 38.42, lng: 39.55,
      region: "Doğu Anadolu",
      city: "Elazığ (Guleman - Alacakaya)",
      promptTitle: "Paslanmaz çelik üretiminin vazgeçilmezi olan, Türkiye'nin dünyada ilk sıralarda üretici olduğu madenin en zengin yatağı haritada neresidir?",
      kpssNot: "Türkiye dünyanın önde gelen krom üreticilerindendir. Guleman en zengin yataktır. Paslanmaz çelik yapımında kullanılır; Antalya'da ferrokrom tesisi vardır."
    },
    {
      id: "mad_krom_fethiye",
      name: "Krom (Fethiye - Köyceğiz)",
      category: "madenler",
      type: "Metalik Maden / İhraç",
      lat: 36.75, lng: 28.9,
      region: "Ege",
      city: "Muğla (Fethiye - Köyceğiz)",
      kpssNot: "Toroslar'ın ofiyolitik kayaçlarında bulunur. Fethiye Limanı üzerinden ihraç edilir."
    },
    {
      id: "mad_demir_divrigi",
      name: "Demir (Divriği - Sivas)",
      shortName: "Demir Yatakları",
      category: "madenler",
      type: "Metalik Maden / Sanayi Girdisi",
      lat: 39.37, lng: 38.12,
      region: "İç Anadolu",
      city: "Sivas (Divriği)",
      promptTitle: "Karabük ve Kırıkkale demir-çelik tesislerinin ana cevher kaynağı olan, Türkiye'nin en zengin demir yatağı haritada neresidir?",
      kpssNot: "Türkiye'nin EN ZENGİN demir yatağıdır. Karabük ve Kırıkkale demir-çelik tesislerini besler; cevher demiryoluyla taşınır."
    },
    {
      id: "mad_demir_hekimhan",
      name: "Demir (Hekimhan - Malatya)",
      category: "madenler",
      type: "Metalik Maden / Sanayi Girdisi",
      lat: 38.82, lng: 37.93,
      region: "Doğu Anadolu",
      city: "Malatya (Hekimhan - Hasançelebi)",
      kpssNot: "Divriği'den sonraki en önemli demir yatağıdır. İskenderun Demir-Çelik tesislerine cevher sağlar."
    },
    {
      id: "mad_bakir_murgul",
      name: "Bakır (Murgul - Artvin)",
      shortName: "Bakır Yatakları",
      category: "madenler",
      type: "Metalik Maden / İhraç",
      lat: 41.29, lng: 41.55,
      region: "Karadeniz",
      city: "Artvin (Murgul)",
      kpssNot: "Türkiye'nin en önemli bakır yataklarındandır. Elektrik teli üretiminin hammaddesidir; Samsun'da bakır izabe tesisi bulunur."
    },
    {
      id: "mad_bakir_ergani",
      name: "Bakır (Ergani - Diyarbakır)",
      category: "madenler",
      type: "Metalik Maden / İhraç",
      lat: 38.27, lng: 39.76,
      region: "Güneydoğu Anadolu",
      city: "Diyarbakır (Ergani - Maden)",
      kpssNot: "Türkiye'nin en eski işletilen bakır yatağıdır; 'Maden' ilçesinin adı bu yataktan gelir."
    },
    {
      id: "mad_bakir_kure",
      name: "Bakır (Küre - Kastamonu)",
      category: "madenler",
      type: "Metalik Maden / İhraç",
      lat: 41.81, lng: 33.71,
      region: "Karadeniz",
      city: "Kastamonu (Küre)",
      kpssNot: "Küre Dağları'ndaki masif sülfit yatağıdır. Bakırın yanında kükürt de üretilir."
    },
    {
      id: "mad_boksit_seydisehir",
      name: "Boksit & Alüminyum (Seydişehir - Konya)",
      shortName: "Boksit Yatağı",
      category: "madenler",
      type: "Metalik Maden / Sanayi Girdisi",
      lat: 37.42, lng: 31.85,
      region: "İç Anadolu",
      city: "Konya (Seydişehir)",
      promptTitle: "Alüminyumun hammaddesi olan boksitin çıkarıldığı ve Türkiye'nin tek entegre alüminyum tesisinin bulunduğu yer haritada neresidir?",
      kpssNot: "Boksit alüminyumun hammaddesidir. Seydişehir'de Türkiye'nin tek ENTEGRE alüminyum tesisi vardır; Oymapınar HES'in enerjisini kullanır."
    },
    {
      id: "mad_taskomuru_zonguldak",
      name: "Taşkömürü (Zonguldak Havzası)",
      shortName: "Taşkömürü Havzası",
      category: "madenler",
      type: "Enerji Hammaddesi / Fosil",
      shapeType: "polygon",
      coordinates: [[41.3, 31.6], [41.75, 31.8], [41.85, 32.6], [41.4, 32.5], [41.25, 31.9]],
      lat: 41.45, lng: 32.1,
      region: "Karadeniz",
      city: "Zonguldak - Bartın - Karabük",
      promptTitle: "Türkiye'nin TEK taşkömürü havzası olan, Karabük demir-çelik tesisinin kurulmasına gerekçe olmuş alan haritada neresidir?",
      kpssNot: "Türkiye'nin TEK taşkömürü havzasıdır (Ereğli-Zonguldak-Amasra). Kalori değeri yüksektir; demir-çelik sanayisinin kurulma nedenidir. Kıvrımlı damarlar maliyeti yükseltir."
    },
    {
      id: "mad_linyit_afsin",
      name: "Linyit (Afşin - Elbistan)",
      shortName: "Afşin-Elbistan Linyiti",
      category: "madenler",
      type: "Enerji Hammaddesi / Fosil",
      lat: 38.3, lng: 36.9,
      region: "Akdeniz",
      city: "Kahramanmaraş (Afşin - Elbistan)",
      promptTitle: "Türkiye'nin en büyük linyit rezervinin bulunduğu ve ocak ağzında dev termik santrallerin kurulduğu havza haritada neresidir?",
      kpssNot: "Türkiye'nin EN BÜYÜK linyit rezervidir. Kalori değeri düşük olduğu için taşınmaz; enerjiye çevrilmek üzere OCAK AĞZINDA termik santral kurulmuştur."
    },
    {
      id: "mad_linyit_soma",
      name: "Linyit (Soma - Manisa)",
      category: "madenler",
      type: "Enerji Hammaddesi / Fosil",
      lat: 39.19, lng: 27.61,
      region: "Ege",
      city: "Manisa (Soma)",
      kpssNot: "Bakırçay Grabeni içindedir. Soma Termik Santrali'ni besler; Ege'nin en önemli linyit havzasıdır."
    },
    {
      id: "mad_linyit_tuncbilek",
      name: "Linyit (Tunçbilek - Seyitömer)",
      category: "madenler",
      type: "Enerji Hammaddesi / Fosil",
      lat: 39.53, lng: 29.44,
      region: "Ege",
      city: "Kütahya (Tavşanlı - Seyitömer)",
      kpssNot: "Seyitömer ve Tunçbilek yatakları Kütahya'yı linyit merkezi yapar; kendi termik santrallerini besler."
    },
    {
      id: "mad_linyit_yatagan",
      name: "Linyit (Yatağan - Muğla)",
      category: "madenler",
      type: "Enerji Hammaddesi / Fosil",
      lat: 37.34, lng: 28.14,
      region: "Ege",
      city: "Muğla (Yatağan - Milas)",
      kpssNot: "Yatağan, Yeniköy ve Kemerköy termik santrallerini besler. Kükürt oranı yüksek olduğu için hava kirliliği tartışmasıyla anılır."
    },
    {
      id: "mad_linyit_cayirhan",
      name: "Linyit (Çayırhan - Ankara)",
      category: "madenler",
      type: "Enerji Hammaddesi / Fosil",
      lat: 40.13, lng: 31.64,
      region: "İç Anadolu",
      city: "Ankara (Nallıhan - Çayırhan)",
      kpssNot: "İç Anadolu'nun en önemli linyit yatağıdır; ocak ağzındaki termik santral Ankara'nın elektriğine katkı sağlar."
    },
    {
      id: "mad_petrol_batman",
      name: "Petrol (Batman - Raman)",
      shortName: "Petrol Sahaları",
      category: "madenler",
      type: "Enerji Hammaddesi / Fosil",
      lat: 37.86, lng: 41.15,
      region: "Güneydoğu Anadolu",
      city: "Batman (Raman - Garzan)",
      promptTitle: "Türkiye'nin ilk ve en önemli petrol üretim sahası ile rafinerisinin bulunduğu yer haritada neresidir?",
      kpssNot: "Türkiye petrolünün büyük bölümü Güneydoğu Anadolu'dan çıkar. Arap Levhası'nın tortul yapısı nedeniyle burada bulunur; üretim tüketimi karşılamaz."
    },
    {
      id: "mad_petrol_adiyaman",
      name: "Petrol (Adıyaman - Kâhta)",
      category: "madenler",
      type: "Enerji Hammaddesi / Fosil",
      lat: 37.76, lng: 38.6,
      region: "Güneydoğu Anadolu",
      city: "Adıyaman",
      kpssNot: "Batman'dan sonraki en verimli petrol sahasıdır. Ham petrol boru hattıyla Batman rafinerisine iletilir."
    },
    {
      id: "mad_dogalgaz_karadeniz",
      name: "Sakarya Gaz Sahası (Karadeniz)",
      shortName: "Sakarya Gaz Sahası",
      category: "madenler",
      type: "Enerji Hammaddesi / Fosil",
      lat: 41.95, lng: 32.2,
      region: "Karadeniz",
      city: "Zonguldak - Bartın açıkları (Filyos)",
      kpssNot: "2020'de keşfedilen Türkiye'nin en büyük doğal gaz rezervidir. Gaz, Filyos'taki karasal tesise boru hattıyla ulaştırılır."
    },
    {
      id: "mad_tuz_golu",
      name: "Kaya & Göl Tuzu (Tuz Gölü)",
      shortName: "Tuz Üretim Sahası",
      category: "madenler",
      type: "Endüstriyel Hammadde / Tuz",
      lat: 38.75, lng: 33.4,
      region: "İç Anadolu",
      city: "Aksaray - Konya - Ankara",
      kpssNot: "Türkiye tuz üretiminin büyük bölümü buradandır; yaz buharlaşmasıyla tuz kendiliğinden çöker. Çankırı'da KAYA tuzu, İzmir Çamaltı'nda DENİZ tuzu üretilir."
    },
    {
      id: "mad_tuz_camalti",
      name: "Deniz Tuzu (Çamaltı - İzmir)",
      category: "madenler",
      type: "Endüstriyel Hammadde / Tuz",
      lat: 38.5, lng: 26.87,
      region: "Ege",
      city: "İzmir (Çamaltı Tuzlası)",
      kpssNot: "Türkiye'nin en büyük DENİZ tuzlasıdır. Gediz Deltası'nda, buharlaşmanın yüksek olduğu sığ havuzlarda üretim yapılır."
    },
    {
      id: "mad_mermer_afyon",
      name: "Mermer (Afyon - Bilecik - Muğla)",
      shortName: "Mermer Sahaları",
      category: "madenler",
      type: "Endüstriyel Hammadde / İhraç",
      lat: 38.76, lng: 30.54,
      region: "Ege",
      city: "Afyonkarahisar - Bilecik - Muğla",
      kpssNot: "Türkiye dünya mermer rezervinin yaklaşık %40'ına sahiptir ve önde gelen ihracatçılardandır. Afyon (şeker beyazı), Bilecik (bej) ve Muğla mermeri ünlüdür."
    },
    {
      id: "mad_manyezit_eskisehir",
      name: "Manyezit (Eskişehir - Kütahya)",
      category: "madenler",
      type: "Endüstriyel Hammadde / İhraç",
      lat: 39.65, lng: 30.9,
      region: "İç Anadolu",
      city: "Eskişehir (Mihalıççık) - Kütahya",
      kpssNot: "Ateşe dayanıklı (refrakter) tuğla yapımında kullanılır; Türkiye dünya üretiminde ilk sıralardadır."
    },
    {
      id: "mad_luletasi",
      name: "Lületaşı (Eskişehir)",
      category: "madenler",
      type: "Endüstriyel Hammadde / Özel",
      lat: 39.72, lng: 30.6,
      region: "İç Anadolu",
      city: "Eskişehir (Sepetçi - Margı)",
      kpssNot: "Dünyada neredeyse yalnızca Eskişehir'de çıkarılır. Pipo ve süs eşyası yapımında kullanılan, işlenmesi kolay beyaz taştır."
    },
    {
      id: "mad_kukurt_keciborlu",
      name: "Kükürt (Keçiborlu - Isparta)",
      category: "madenler",
      type: "Endüstriyel Hammadde / Kimya",
      lat: 37.94, lng: 30.3,
      region: "Akdeniz",
      city: "Isparta (Keçiborlu)",
      kpssNot: "Türkiye'nin bilinen tek önemli kükürt yatağıdır; sülfürik asit ve gübre sanayisinin girdisidir."
    },
    {
      id: "mad_oltu_tasi",
      name: "Oltu Taşı (Erzurum)",
      category: "madenler",
      type: "Endüstriyel Hammadde / Özel",
      lat: 40.55, lng: 41.99,
      region: "Doğu Anadolu",
      city: "Erzurum (Oltu)",
      kpssNot: "Dünyada yalnızca Oltu çevresinde çıkarılan siyah süs taşıdır; tespih ve takı yapımıyla yöresel el sanatlarının temelidir."
    },
    {
      id: "enerji_akkuyu",
      name: "Akkuyu Nükleer Güç Santrali",
      shortName: "Akkuyu NGS",
      category: "madenler",
      type: "Enerji Tesisi / Nükleer",
      lat: 36.14, lng: 33.54,
      region: "Akdeniz",
      city: "Mersin (Gülnar - Büyükeceli)",
      promptTitle: "Türkiye'nin ilk nükleer güç santralinin kurulduğu, soğutma suyu ihtiyacı nedeniyle kıyıda seçilmiş yer haritada neresidir?",
      kpssNot: "Türkiye'nin İLK nükleer santralidir. Kıyıda kurulmasının nedeni SOĞUTMA SUYU ihtiyacıdır; deprem riski düşük bir zemin seçilmiştir."
    },
    {
      id: "enerji_ataturk_baraji",
      name: "Atatürk Barajı & HES",
      shortName: "Atatürk Barajı",
      category: "madenler",
      type: "Enerji Tesisi / Hidroelektrik",
      lat: 37.49, lng: 38.32,
      region: "Güneydoğu Anadolu",
      city: "Şanlıurfa - Adıyaman (Fırat)",
      promptTitle: "GAP'ın kalbi olan, Fırat Nehri üzerindeki Türkiye'nin en büyük barajı haritada neresidir?",
      kpssNot: "Gövde hacmi bakımından Türkiye'nin EN BÜYÜK barajıdır. GAP'ın kalbidir; Şanlıurfa Tünelleri ile Harran Ovası'nı sular."
    },
    {
      id: "enerji_keban_baraji",
      name: "Keban Barajı & HES",
      shortName: "Keban Barajı",
      category: "madenler",
      type: "Enerji Tesisi / Hidroelektrik",
      lat: 38.81, lng: 38.75,
      region: "Doğu Anadolu",
      city: "Elazığ (Keban)",
      kpssNot: "Fırat üzerindeki İLK büyük barajdır (1974). Karasu ve Murat'ın birleştiği yerdedir; baraj gölü Türkiye'nin en büyük yapay gölüdür."
    },
    {
      id: "enerji_ilisu_baraji",
      name: "Ilısu Barajı & HES",
      shortName: "Ilısu Barajı",
      category: "madenler",
      type: "Enerji Tesisi / Hidroelektrik",
      lat: 37.53, lng: 41.84,
      region: "Güneydoğu Anadolu",
      city: "Mardin - Şırnak (Dicle)",
      kpssNot: "DİCLE Nehri üzerindeki en büyük barajdır. Hasankeyf'in sular altında kalmasına neden olduğu için tarihî doku tartışmasıyla anılır."
    },
    {
      id: "enerji_deriner_baraji",
      name: "Deriner Barajı & HES",
      shortName: "Deriner Barajı",
      category: "madenler",
      type: "Enerji Tesisi / Hidroelektrik",
      lat: 41.31, lng: 41.87,
      region: "Karadeniz",
      city: "Artvin (Çoruh)",
      kpssNot: "Çoruh Nehri üzerindedir; Türkiye'nin en yüksek gövdeli barajlarındandır. Çoruh'un hızlı akışı hidroelektrik potansiyelini yükseltir."
    },
    {
      id: "enerji_jes_germencik",
      name: "Jeotermal Santraller (Germencik - Sarayköy)",
      shortName: "Jeotermal Santral Kuşağı",
      category: "madenler",
      type: "Enerji Tesisi / Yenilenebilir",
      shapeType: "polygon",
      coordinates: [[37.7, 27.6], [38.0, 28.2], [37.95, 29.2], [37.7, 29.0], [37.65, 27.9]],
      lat: 37.85, lng: 28.4,
      region: "Ege",
      city: "Aydın (Germencik) - Denizli (Sarayköy)",
      promptTitle: "Graben sistemindeki fay hatları sayesinde Türkiye jeotermal elektrik üretiminin neredeyse tamamının yapıldığı alan haritada neresidir?",
      kpssNot: "Türkiye jeotermal elektriğinin neredeyse tamamı Büyük Menderes Grabeni'nden gelir. Nedeni: kırıklı yapı sıcak suyun yüzeye çıkmasını sağlar."
    },
    {
      id: "enerji_res_ege",
      name: "Rüzgâr Enerji Santralleri (Çeşme - Bandırma)",
      shortName: "Rüzgâr Santralleri",
      category: "madenler",
      type: "Enerji Tesisi / Yenilenebilir",
      lat: 38.32, lng: 26.35,
      region: "Ege",
      city: "İzmir (Çeşme - Aliağa) - Balıkesir (Bandırma)",
      kpssNot: "RES'ler sürekli ve düzenli rüzgâr isteyen kıyı ve boğaz kesimlerine kurulur. Balıkesir, İzmir ve Çanakkale Türkiye'nin rüzgâr enerjisi liderleridir."
    },
    {
      id: "enerji_ges_karapinar",
      name: "Karapınar Güneş Enerjisi Santrali",
      shortName: "Karapınar GES",
      category: "madenler",
      type: "Enerji Tesisi / Yenilenebilir",
      lat: 37.72, lng: 33.62,
      region: "İç Anadolu",
      city: "Konya (Karapınar)",
      kpssNot: "Türkiye'nin en büyük güneş enerjisi santralidir. Güneşlenme süresinin uzunluğu ve açık arazi bolluğu bu alanı elverişli kılar."
    }
  ]
});
