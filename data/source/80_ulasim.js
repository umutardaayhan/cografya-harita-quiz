/**
 * 🚢 ULAŞIM, LİMANLAR, GEÇİTLER, SINIR KAPILARI & TİCARET — Yazım Kaynağı
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
      promptTitle: "Doğu Karadeniz'de Gürcistan ve Kafkasya/İran transit ticaretinde önemli bir çıkış kapısı olan liman haritada neresidir?",
      kpssNot: "Doğu Karadeniz'in en doğusundaki limandır. Sarp Sınır Kapısı'na yakınlığı ile Kafkasya ve İran transit ticaretinde stratejik rol oynar."
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
      promptTitle: "Ovit Tüneli ile Erzurum ve Doğu Anadolu üzerinden İran transit ticaretine bağlanan Doğu Karadeniz limanı haritada neresidir?",
      kpssNot: "Ovit Tüneli'nin açılmasıyla iç kesimlerle (Erzurum/Doğu Anadolu) kışın kesintiye uğramayan güçlü bir karayolu bağı kurmuş ve İran transit ticaretinde önem kazanmıştır."
    },
    {
      id: "ula_liman_trabzon",
      groupId: "grp_trabzon_zigana_koridoru",
      name: "Trabzon Limanı",
      shortName: "Trabzon Limanı",
      category: "ulasim",
      type: "Liman / Transit Ticaret",
      lat: 41.00, lng: 39.73,
      region: "Karadeniz",
      city: "Trabzon",
      promptTitle: "Tarihi İpek Yolu'nun denize açıldığı, Yeni Zigana ve Kop tünelleriyle İran transit ticaretinde kritik rol oynayan liman haritada neresidir?",
      kpssNot: "Tarihi İpek Yolu'nun deniz kapısıdır. Yeni Zigana Tüneli ve Kop Geçidi ile İran transit ticaretinin Doğu Karadeniz'deki en köklü ve işlek limanıdır."
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
      promptTitle: "Gemi yapımı (tersane) ve Karadeniz kıyı ticaretinde hızla gelişen Orta Karadeniz limanı haritada neresidir?",
      kpssNot: "Orta Karadeniz'de önemli bir gemi inşa, tersane ve yük limanı olarak öne çıkar; hinterlandı iç kesimlere bağlanan karayollarıyla desteklenir."
    },
    {
      id: "ula_liman_samsun",
      groupId: "grp_samsun_limani",
      name: "Samsun Limanı",
      shortName: "Samsun Limanı",
      category: "ulasim",
      type: "Liman / Hinterlandı En Geniş",
      lat: 41.29, lng: 36.33,
      region: "Karadeniz",
      city: "Samsun",
      promptTitle: "Canik Dağları'nın alçak ve geride olması sayesinde Karadeniz'de hinterlandı en geniş olan ve demiryolu bağlantısı bulunan liman haritada neresidir?",
      kpssNot: "Canik Dağları kıyının gerisinde ve alçak olduğu için iç kesimlerle ulaşımı çok kolaydır. Karadeniz'de HİNTERLANDI EN GENİŞ limandır ve demiryolu bağlantısı vardır."
    },
    {
      id: "ula_liman_sinop",
      name: "Sinop Limanı",
      shortName: "Sinop Limanı",
      category: "ulasim",
      type: "Liman / Doğal Liman",
      lat: 42.02, lng: 35.15,
      region: "Karadeniz",
      city: "Sinop",
      promptTitle: "Karadeniz'in tek doğal limanı olmasına rağmen arkasındaki Küre Dağları ve demiryolu olmaması nedeniyle hinterlandı dar kalan liman haritada neresidir?",
      kpssNot: "Karadeniz'in TEK DOĞAL LİMANI'dır. Ancak arkasında Küre Dağları'nın dik yükselmesi ve demiryolu bağlantısının OLMAMASI nedeniyle hinterlandı çok dardır, gelişememiştir."
    },
    {
      id: "ula_liman_zonguldak",
      groupId: "grp_zonguldak_eregli_demir",
      name: "Zonguldak & Ereğli Limanları",
      shortName: "Zonguldak Limanı",
      category: "ulasim",
      type: "Liman / Maden & Ağır Sanayi",
      lat: 41.45, lng: 31.79,
      region: "Karadeniz",
      city: "Zonguldak (Ereğli)",
      promptTitle: "Taş kömürü ve demir-çelik sanayisi ürünlerinin sevkiyatında kritik rol oynayan, demiryolu bağlantılı Batı Karadeniz limanı haritada neresidir?",
      kpssNot: "Taş kömürü havzası ve Erdemir/Kardemir demir-çelik tesislerinin hammadde ve mamul sevkiyat kapısıdır. Demiryolu bağlantısı bulunur."
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
      promptTitle: "Sakarya'da inşa edilen, Karadeniz ülkeleriyle Ro-Ro taşımacılığı ve sanayi ihracatı yapan modern liman haritada neresidir?",
      kpssNot: "Marmara sanayi havzasını Karadeniz üzerinden Rusya, Ukrayna ve Romanya'ya bağlayan önemli bir Ro-Ro ve yük limanıdır."
    },
    {
      id: "ula_liman_tuzla",
      name: "Tuzla Limanı ve Tersaneleri",
      shortName: "Tuzla Tersaneleri",
      category: "ulasim",
      type: "Liman / Gemi İnşa & Sanayi",
      lat: 40.85, lng: 29.30,
      region: "Marmara",
      city: "İstanbul (Tuzla)",
      promptTitle: "Türkiye'nin en büyük gemi inşa, bakım-onarım ve tersane merkezi olan Marmara limanı haritada neresidir?",
      kpssNot: "Türkiye'nin gemi inşa ve tersane sektörünün kalbidir; kuru yük, tanker ve askeri gemi yapımında liderdir."
    },
    {
      id: "ula_liman_kocaeli",
      name: "Kocaeli (Derince & Dilovası) Limanları",
      shortName: "Kocaeli Limanları",
      category: "ulasim",
      type: "Liman / Dış Ticaret & Sanayi",
      lat: 40.75, lng: 29.83,
      region: "Marmara",
      city: "Kocaeli (İzmit Körfezi)",
      promptTitle: "İzmit Körfezi çevresindeki yoğun sanayi tesislerine hizmet veren, Türkiye dış ticaretinde ilk 3'te yer alan liman kompleksi haritada neresidir?",
      kpssNot: "Otomotiv, kimya ve metal sanayisinin kalbinde yer alır. Türkiye'nin toplam dış ticaret hacminde en ön sıralarda yer alan dev liman kompleksidir."
    },
    {
      id: "ula_liman_ambarli",
      name: "İstanbul Ambarlı Limanı",
      shortName: "Ambarlı Limanı",
      category: "ulasim",
      type: "Liman / Konteyner & Doğalgaz",
      lat: 40.97, lng: 28.69,
      region: "Marmara",
      city: "İstanbul (Avcılar - Beylikdüzü)",
      promptTitle: "Konteyner elleçlemesinde ve doğalgaz/sıvı yakıt ithalatında Türkiye'nin en işlek limanlarından biri olan merkez haritada neresidir?",
      kpssNot: "Konteyner trafiğinde ve sıvılaştırılmış doğalgaz (LNG) ithalatında Türkiye'nin en işlek dev limanıdır; Marmara sanayisinin ana ihracat kapısıdır."
    },
    {
      id: "ula_liman_gemlik",
      name: "Gemlik Limanı",
      shortName: "Gemlik Limanı",
      category: "ulasim",
      type: "Liman / Otomotiv & Sanayi",
      lat: 40.43, lng: 29.15,
      region: "Marmara",
      city: "Bursa (Gemlik)",
      promptTitle: "Bursa sanayisi ve otomotiv ihracatı için çok önemli olmasına rağmen DEMİRYOLU BAĞLANTISI BULUNMAYAN Marmara limanı haritada neresidir?",
      kpssNot: "Bursa'nın otomotiv, tekstil ve gıda sanayisine hizmet verir. Çok işlek bir sanayi limanı olmasına rağmen DEMİRYOLU BAĞLANTISI YOKTUR (KPSS klasiği)."
    },
    {
      id: "ula_liman_bandirma",
      name: "Bandırma Limanı",
      shortName: "Bandırma Limanı",
      category: "ulasim",
      type: "Liman / Maden & Demiryolu",
      lat: 40.35, lng: 27.97,
      region: "Marmara",
      city: "Balıkesir (Bandırma)",
      promptTitle: "Kütahya Emet ve Balıkesir Bigadiç'ten demiryoluyla gelen bor madeninin ihraç edildiği demiryolu bağlantılı liman haritada neresidir?",
      kpssNot: "Kütahya ve Balıkesir bor havzalarının ihracat kapısıdır. Güçlü bir demiryolu ve karayolu bağlantısı ile Güney Marmara'nın en stratejik limanıdır."
    },
    {
      id: "ula_liman_aliaga",
      groupId: "grp_aliaga_petrokimya_liman",
      name: "Aliağa Limanı",
      shortName: "Aliağa Limanı",
      category: "ulasim",
      type: "Liman / İthalat-İhracat 1 Numara",
      lat: 38.80, lng: 26.97,
      region: "Ege",
      city: "İzmir (Aliağa)",
      promptTitle: "Petrokimya rafinerilerine ev sahipliği yapan ve Türkiye'nin toplam ithalat-ihracat tonajında 1. SIRADA yer alan dev liman haritada neresidir?",
      kpssNot: "TÜPRAŞ ve STAR rafinerileri ile entegredir. Elleçlenen toplam yük, ithalat ve ihracat tonajında TÜRKİYE'DE 1. SIRADA yer alan devasa enerji/sanayi limanıdır."
    },
    {
      id: "ula_liman_kusadasi",
      name: "Kuşadası Limanı",
      shortName: "Kuşadası Limanı",
      category: "ulasim",
      type: "Liman / Kruvaziyer Lideri",
      lat: 37.86, lng: 27.26,
      region: "Ege",
      city: "Aydın (Kuşadası)",
      promptTitle: "Efes ve Meryem Ana gibi turizm merkezlerine yakınlığıyla Türkiye'de kruvaziyer (büyük yolcu gemisi) turizminde 1. SIRADA olan liman haritada neresidir?",
      kpssNot: "Türkiye'de KRUVAZİYER GEMİ VE YOLCU TAŞIMACILIĞINDA 1. SIRADADIR (2. İstanbul Galataport, 3. Bodrum). Efes ve Meryem Ana'nın giriş kapısıdır."
    },
    {
      id: "ula_liman_yat_turizmi",
      groupId: "grp_ege_akdeniz_yat_limanlari",
      name: "Ege & Akdeniz Yat Turizmi Limanları",
      shortName: "Yat Limanları (Çeşme-Bodrum-Kaş)",
      category: "ulasim",
      type: "Liman / Yat Turizmi & Marina",
      lat: 36.85, lng: 28.27,
      region: "Ege",
      city: "Çeşme, Bodrum, Marmaris, Göcek, Fethiye, Kaş, Finike",
      promptTitle: "Çeşme, Bodrum, Marmaris, Göcek, Fethiye ve Kaş hattında gelişen, 'Mavi Yolculuk' ve yat turizmine hizmet eden limanlar kuşağı haritada neresidir?",
      kpssNot: "Girintili-çıkıntılı koylar sayesinde Türkiye'nin en gelişmiş yat ve marina limanlarıdır (Çeşme, Güllük, Bodrum, Marmaris, Göcek, Fethiye, Kaş, Finike)."
    },
    {
      id: "ula_liman_antalya",
      name: "Antalya Limanı (Port Akdeniz)",
      shortName: "Antalya Limanı",
      category: "ulasim",
      type: "Liman / Turizm & Maden İhracatı",
      lat: 36.83, lng: 30.60,
      region: "Akdeniz",
      city: "Antalya",
      promptTitle: "Önemli bir turizm limanı ve ferrokrom/mermer ihracat kapısı olmasına rağmen DEMİRYOLU BAĞLANTISI BULUNMAYAN Akdeniz limanı haritada neresidir?",
      kpssNot: "Yat/kruvaziyer turizmi ve ferrokrom/mermer ihracatında önemlidir. Ancak arkasındaki Toroslar nedeniyle DEMİRYOLU BAĞLANTISI YOKTUR."
    },
    {
      id: "ula_liman_tasucu",
      name: "Taşucu Limanı",
      shortName: "Taşucu Limanı",
      category: "ulasim",
      type: "Liman / Kıbrıs Deniz Kapısı",
      lat: 36.32, lng: 33.88,
      region: "Akdeniz",
      city: "Mersin (Silifke)",
      promptTitle: "Kuzey Kıbrıs Türk Cumhuriyeti'ne (Girne) deniz yolu ve feribotla en hızlı ulaşımın sağlandığı Akdeniz limanı haritada neresidir?",
      kpssNot: "Kuzey Kıbrıs Türk Cumhuriyeti'ne (KKTC Girne) en yakın deniz kapısıdır; feribot, Ro-Ro ve hidrofil taşımacılığının merkezidir."
    },
    {
      id: "ula_liman_mersin",
      name: "Mersin Limanı",
      shortName: "Mersin Limanı",
      category: "ulasim",
      type: "Liman / Transit & Konteyner",
      lat: 36.79, lng: 34.62,
      region: "Akdeniz",
      city: "Mersin",
      promptTitle: "Orta Doğu'nun dünyaya açılan transit kapısı olan, demiryolu bağlantılı Türkiye'nin en büyük konteyner limanlarından biri haritada neresidir?",
      kpssNot: "Akdeniz'in en gelişmiş konteyner limanıdır. Irak, Suriye ve İran gibi ülkelerin dünyaya açılan transit kapısıdır; demiryolu bağlantısı bulunur."
    },
    {
      id: "ula_liman_botas",
      name: "Botaş (Ceyhan - Yumurtalık) Petrol Terminali",
      shortName: "Botaş / Ceyhan Limanı",
      category: "ulasim",
      type: "Liman / Enerji Terminali",
      lat: 36.87, lng: 35.93,
      region: "Akdeniz",
      city: "Adana (Ceyhan - Yumurtalık)",
      promptTitle: "BTC ve Kerkük-Yumurtalık uluslararası ham petrol boru hatlarının denize ulaştığı ve tankerlere yüklendiği liman haritada neresidir?",
      kpssNot: "Kerkük-Yumurtalık ve Bakü-Tiflis-Ceyhan (BTC) ham petrol boru hatlarının deniz sevkiyat terminalidir; Doğu Akdeniz'in küresel enerji merkezidir."
    },
    {
      id: "ula_liman_iskenderun",
      groupId: "grp_iskenderun_demir_celik",
      name: "İskenderun Limanı",
      shortName: "İskenderun Limanı",
      category: "ulasim",
      type: "Liman / Demir-Çelik & Ağır Sanayi",
      lat: 36.59, lng: 36.17,
      region: "Akdeniz",
      city: "Hatay (İskenderun)",
      promptTitle: "İsdemir demir-çelik sanayisinin lojistik ihtiyacını karşılayan, Güneydoğu ve Orta Doğu'ya demiryolu ile bağlanan liman haritada neresidir?",
      kpssNot: "İsdemir tesisleriyle entegredir; ağır sanayi, maden ve konteyner yüklemesinde liderdir. Güçlü demiryolu bağlantısı vardır."
    },

    // =========================================================================
    // 2. GEÇİTLER VE TÜNELLER (Dağları Aşan Stratejik Geçişler)
    // =========================================================================
    {
      id: "ula_gecit_cubuk",
      name: "Çubuk Geçidi",
      category: "ulasim",
      type: "Geçit & Tünel / Akdeniz",
      lat: 37.15, lng: 30.55,
      region: "Akdeniz",
      city: "Antalya - Burdur / Isparta",
      kpssNot: "Antalya kıyısını Göller Yöresi, Burdur, Isparta ve İç Anadolu'ya bağlayan geçittir."
    },
    {
      id: "ula_gecit_sertavul",
      name: "Sertavul Geçidi",
      category: "ulasim",
      type: "Geçit & Tünel / Akdeniz",
      lat: 36.91, lng: 33.26,
      region: "Akdeniz",
      city: "Mersin (Mut) - Karaman",
      kpssNot: "Mersin ve Silifke kıyı kuşağını Mut üzerinden Karaman ve İç Anadolu'ya bağlar."
    },
    {
      id: "ula_gecit_gulek",
      groupId: "grp_gulek_bogazi",
      name: "Gülek Boğazı",
      category: "ulasim",
      type: "Geçit & Tünel / Akdeniz - İç Anadolu",
      lat: 37.21, lng: 34.79,
      region: "Akdeniz",
      city: "Adana / Mersin - Niğde (İç Anadolu)",
      promptTitle: "Çukurova'yı (Adana-Mersin) İç Anadolu'ya bağlayan, otoyol ve demiryolunun geçtiği en kritik tarihi boğaz haritada neresidir?",
      kpssNot: "Toroslar üzerindeki en işlek geçittir; Çukurova sanayi bölgesini İç Anadolu'ya bağlar. Hem otoyol hem demiryolu geçer."
    },
    {
      id: "ula_gecit_belen",
      groupId: "grp_belen_gecidi",
      name: "Belen Geçidi",
      category: "ulasim",
      type: "Geçit & Tünel / Akdeniz",
      lat: 36.49, lng: 36.20,
      region: "Akdeniz",
      city: "Hatay (İskenderun - Antakya)",
      kpssNot: "Nur (Amanos) Dağları'nı aşarak İskenderun Limanı'nı Amik Ovası ve Antakya'ya bağlar."
    },
    {
      id: "ula_tunel_orhangazi",
      name: "Orhangazi Tüneli",
      category: "ulasim",
      type: "Geçit & Tünel / Marmara Otoyolu",
      lat: 40.52, lng: 29.35,
      region: "Marmara",
      city: "Yalova - Bursa",
      kpssNot: "İstanbul-İzmir Otoyolu üzerinde Samanlı Dağları'nı aşarak Yalova ile Bursa arasındaki yolu kısaltan tüneldir."
    },
    {
      id: "ula_tunel_bolu",
      name: "Bolu Dağı Tüneli",
      category: "ulasim",
      type: "Geçit & Tünel / Ana Transit Koridor",
      lat: 40.75, lng: 31.42,
      region: "Karadeniz",
      city: "Bolu - Düzce",
      kpssNot: "Ankara-İstanbul TEM Otoyolu üzerindeki en kritik geçiştir; Bolu Dağı'nın kış şartlarındaki ulaşım çilesini sona erdirmiştir."
    },
    {
      id: "ula_gecit_ecevit",
      name: "Ecevit Geçidi",
      category: "ulasim",
      type: "Geçit & Tünel / Batı Karadeniz",
      lat: 41.85, lng: 33.75,
      region: "Karadeniz",
      city: "Kastamonu - İnebolu",
      kpssNot: "Küre Dağları'nı aşarak Kastamonu merkez ile İnebolu Limanı arasındaki tarihi İstiklal Yolu bağlantısını sağlar."
    },
    {
      id: "ula_tunel_ilgaz",
      name: "Ilgaz 15 Temmuz İstiklal Tüneli",
      category: "ulasim",
      type: "Geçit & Tünel / Karadeniz - İç Anadolu",
      lat: 41.08, lng: 33.74,
      region: "Karadeniz",
      city: "Kastamonu - Çankırı (Ankara Hattı)",
      kpssNot: "Ilgaz Dağları'nı aşarak Kastamonu ve Batı Karadeniz'i Çankırı üzerinden Ankara'ya güvenle bağlar."
    },
    {
      id: "ula_tunel_nefise_akcelik",
      name: "Nefise Akçelik Tüneli",
      category: "ulasim",
      type: "Geçit & Tünel / Sahil Yolu",
      lat: 41.02, lng: 37.60,
      region: "Karadeniz",
      city: "Ordu (Fatsa - Altınordu)",
      kpssNot: "Karadeniz Sahil Yolu üzerinde Fatsa-Ordu arasındaki virajlı sahil yolunu baypas eden uzun karayolu tünelidir."
    },
    {
      id: "ula_tunel_yeni_zigana",
      groupId: "grp_trabzon_zigana_koridoru",
      name: "Yeni Zigana Tüneli",
      shortName: "Yeni Zigana Tüneli (14.5 km)",
      category: "ulasim",
      type: "Geçit & Tünel / Türkiye'nin En Uzunu",
      lat: 40.63, lng: 39.40,
      region: "Karadeniz",
      city: "Trabzon - Gümüşhane",
      promptTitle: "Yaklaşık 14.5 km uzunluğuyla Türkiye'nin ve Avrupa'nın en uzun çift tüplü karayolu tüneli haritada neresidir?",
      kpssNot: "Yaklaşık 14.5 km uzunluğuyla TÜRKİYE'NİN VE AVRUPA'NIN EN UZUN ÇİFT TÜPLÜ KARAYOLU TÜNELİDİR. Trabzon-Gümüşhane arasındadır."
    },
    {
      id: "ula_gecit_kop",
      name: "Kop Geçidi & Tüneli",
      category: "ulasim",
      type: "Geçit & Tünel / Doğu Anadolu",
      lat: 40.03, lng: 40.51,
      region: "Doğu Anadolu",
      city: "Bayburt - Erzurum",
      kpssNot: "Kop Dağları üzerinden Bayburt ve Doğu Karadeniz'i Erzurum ve Doğu Anadolu'ya bağlar; kış şartları ağırdır."
    },
    {
      id: "ula_tunel_ovit",
      groupId: "grp_ovit_koridoru",
      name: "Ovit Tüneli",
      category: "ulasim",
      type: "Geçit & Tünel / 14 km Çift Tüp",
      lat: 40.60, lng: 40.80,
      region: "Karadeniz",
      city: "Rize (İkizdere) - Erzurum (İspir)",
      kpssNot: "14 km uzunluğuyla Türkiye'nin en uzun tünellerindendir. Rize İkizdere ile Erzurum İspir arasını bağlar."
    },
    {
      id: "ula_gecit_cankurtaran",
      name: "Cankurtaran Geçidi & Tüneli",
      category: "ulasim",
      type: "Geçit & Tünel / Doğu Karadeniz",
      lat: 41.35, lng: 41.52,
      region: "Karadeniz",
      city: "Artvin (Hopa - Borçka)",
      kpssNot: "Cankurtaran Dağı'nı aşarak Hopa kıyısını Borçka ve Artvin iç kesimlerine bağlar."
    },
    {
      id: "ula_gecit_sakaltutan",
      name: "Sakaltutan Geçidi",
      category: "ulasim",
      type: "Geçit & Tünel / Doğu Anadolu",
      lat: 39.88, lng: 38.98,
      region: "Doğu Anadolu",
      city: "Erzincan (Refahiye)",
      kpssNot: "Erzincan-Sivas/Refahiye hattında kış mevsiminde yoğun kar ve buzlanma nedeniyle ulaşımı en çok zorlayan geçitlerdendir."
    },
    {
      id: "ula_tunel_prefabrik_kar",
      name: "Van - Bahçesaray Prefabrik Kar Tüneli",
      category: "ulasim",
      type: "Geçit & Tünel / Türkiye'de İlk",
      lat: 38.10, lng: 42.75,
      region: "Doğu Anadolu",
      city: "Van (Bahçesaray)",
      promptTitle: "Çığ tehlikesine karşı Türkiye'nin ilk prefabrik kar tünelinin inşa edildiği geçiş güzergahı haritada neresidir?",
      kpssNot: "Yoğun kar yağışı ve çığ felaketlerini önlemek amacıyla TÜRKİYE'NİN İLK PREFABRİK KAR TÜNELİ burada inşa edilmiştir."
    },
    {
      id: "ula_tunel_sabuncubeli",
      name: "Sabuncubeli Tüneli",
      category: "ulasim",
      type: "Geçit & Tünel / Ege",
      lat: 38.56, lng: 27.35,
      region: "Ege",
      city: "İzmir - Manisa",
      kpssNot: "Sabuncubeli Geçidi'ndeki dik eğim ve virajları ortadan kaldırarak İzmir ile Manisa arasındaki ulaşımı 15 dakikaya indiren tüneldir."
    },

    // =========================================================================
    // 3. DEMİRYOLLARI, TRENLER VE DEMİRYOLU BAĞLANTILARI
    // =========================================================================
    {
      id: "ula_demiryolu_ilk_hat",
      name: "Türkiye'nin İlk Demir Yolu Hattı (İzmir - Aydın)",
      shortName: "İlk Demiryolu (İzmir-Aydın)",
      category: "ulasim",
      type: "Demiryolu / Tarihi İlk Hat (1856-1866)",
      shapeType: "polyline",
      coordinates: [
        [38.42, 27.14], // İzmir (Alsancak Garı)
        [38.16, 27.36], // Torbalı
        [37.94, 27.34], // Selçuk
        [37.85, 27.84]  // Aydın Garı
      ],
      lat: 38.15, lng: 27.45,
      region: "Ege",
      city: "İzmir (Alsancak) - Aydın",
      promptTitle: "1856 yılında temeli atılan ve Ege tarım ürünlerini limana taşımak amacıyla açılan TÜRKİYE'NİN İLK DEMİRYOLU HATTI haritada neresidir?",
      kpssNot: "KPSS Soru Klasiği: Anadolu'nun ve Türkiye'nin İLK DEMİRYOLU HATTI 1856-1866 yılları arasında inşa edilen İZMİR - AYDIN hattıdır. Ege'nin incir, pamuk ve üzüm ürünlerini İzmir Alsancak Limanı'na taşımak amacıyla bir İngiliz şirketi tarafından yapılmıştır."
    },
    {
      id: "ula_demiryolu_limanlar_agi",
      name: "Demir Yolu Bağlantısı Olan Kıyı Limanları",
      shortName: "Demiryolu Bağlantılı Limanlar",
      category: "ulasim",
      type: "Demiryolu / Liman-Demiryolu Entegrasyonu",
      lat: 39.50, lng: 34.00,
      region: "Türkiye Geneli",
      city: "Samsun, Zonguldak, Mersin, İskenderun, İstanbul, İzmit, Bandırma, İzmir",
      promptTitle: "Karadeniz'de Samsun ve Zonguldak; Akdeniz'de Mersin ve İskenderun; Ege'de İzmir; Marmara'da Bandırma ve İzmit limanlarının ortak lojistik özelliği nedir?",
      kpssNot: "KPSS Çok Önemli Not: Demir yolu bağlantısı olan limanlar ve taşınan madenler:\n• Zonguldak/Ereğli: Sivas Divriği demiri buradaki demir-çelik fabrikalarına demiryoluyla taşınır.\n• İskenderun: Malatya Hekimhan-Hasançelebi demiri İskenderun Demir-Çelik'e demiryoluyla taşınır.\n• Bandırma: Kütahya Emet bor madenleri Bandırma Limanı'na demiryoluyla taşınır.\n• Samsun: Canik Dağları geride olduğundan Karadeniz'de hinterlandı en geniş demiryolu limanıdır.\n• İzmir, İzmit, İstanbul: İç kesimlerle demiryolu bağlantısı vardır.\n(Antalya, Sinop, Trabzon, Rize, Çanakkale ve Gemlik limanlarında demiryolu YOKTUR!)."
    },
    {
      id: "ula_yht_agi",
      name: "Yüksek Hızlı Tren (YHT) Ağı",
      shortName: "YHT Ağı (Ankara Merkezli)",
      category: "ulasim",
      type: "Demiryolu / Yüksek Hızlı Tren",
      shapeType: "polyline",
      coordinates: [
        // Ankara - İstanbul Kolu
        [41.00, 28.97], [40.80, 29.43], [40.76, 29.94], [40.71, 30.36], [40.14, 29.98], [39.77, 30.52], [39.58, 32.14], [39.93, 32.86],
        // Ankara - Sivas Kolu
        [39.84, 33.51], [39.82, 34.81], [39.75, 37.01],
        // Geri Dönüş ve Ankara - Konya - Karaman Kolu
        [39.82, 34.81], [39.84, 33.51], [39.93, 32.86], [39.58, 32.14], [37.87, 32.48], [37.18, 33.22]
      ],
      lat: 39.93, lng: 32.86,
      region: "İç Anadolu",
      city: "Ankara merkezli: İstanbul, Konya, Karaman, Eskişehir, Bilecik, Sakarya, Kocaeli, Kırıkkale, Yozgat, Sivas",
      promptTitle: "Ankara merkezli olarak İstanbul, Konya, Karaman, Eskişehir, Yozgat ve Sivas'a uzanan hızlı demiryolu ağı haritada neresidir?",
      kpssNot: "Başlangıç noktası Ankara'dır. Konya, Karaman, Eskişehir, Bilecik, Sakarya, İzmit, İstanbul, Kırıkkale, Yozgat ve Sivas'a ulaşır. (İzmir, Antalya, Muğla, Trabzon ve Kayseri'de henüz YHT yoktur)."
    },
    {
      id: "ula_yht_olmayan_merkezler",
      name: "YHT Bağlantısı Bulunmayan Büyük Şehirler",
      shortName: "YHT Ulaşmayan Büyükşehirler",
      category: "ulasim",
      type: "Demiryolu / YHT Olmayan Merkezler",
      lat: 38.73, lng: 35.48,
      region: "Türkiye Geneli",
      city: "İzmir, Antalya, Muğla, Trabzon, Kayseri, Diyarbakır, Adana",
      promptTitle: "Nüfus veya sanayi bakımından çok büyük olmalarına rağmen günümüzde henüz AKTİF YHT BAĞLANTISI BULUNMAYAN şehirler hangileridir?",
      kpssNot: "KPSS Soru Tuzağı: İZMİR, ANTALYA, MUĞLA, TRABZON ve KAYSERİ illerine henüz aktif YHT bağlantısı YOKTUR. (Ankara-Sivas YHT hattı Kayseri'den geçmez, Yozgat üzerinden Sivas'a ulaşır!)."
    },
    {
      id: "ula_tren_dogu_ekspresi",
      name: "Turistik Doğu Ekspresi Güzergahı",
      shortName: "Doğu Ekspresi Hattı",
      category: "ulasim",
      type: "Demiryolu / Turistik Tren Hattı",
      shapeType: "polyline",
      coordinates: [
        [39.93, 32.86], // Ankara Garı
        [39.84, 33.51], // Kırıkkale
        [38.73, 35.48], // Kayseri
        [39.75, 37.01], // Sivas
        [39.37, 38.12], // Divriği
        [39.75, 39.49], // Erzincan
        [39.91, 41.27], // Erzurum
        [40.33, 42.58], // Sarıkamış
        [40.60, 43.09]  // Kars Garı
      ],
      lat: 39.75, lng: 37.50,
      region: "Doğu Anadolu",
      city: "Ankara - Kırıkkale - Kayseri - Sivas - Erzincan - Erzurum - Kars",
      promptTitle: "Ankara'dan başlayıp Kayseri, Sivas, Erzincan ve Erzurum üzerinden Kars'a ulaşan ünlü kış turizm tren hattı haritada neresidir?",
      kpssNot: "Ankara - Kırıkkale - Kayseri - Sivas - Erzincan - Erzurum - Kars güzergahında işleyen, kış ve kültür turizmine büyük canlılık katan tren hattıdır."
    },
    {
      id: "ula_tren_mezopotamya",
      name: "Mezopotamya Ekspresi Güzergahı",
      shortName: "Mezopotamya Ekspresi Hattı",
      category: "ulasim",
      type: "Demiryolu / Turistik Tren Hattı",
      shapeType: "polyline",
      coordinates: [
        [39.93, 32.86], // Ankara
        [39.84, 33.51], // Kırıkkale
        [38.73, 35.48], // Kayseri
        [39.75, 37.01], // Sivas (Çetinkaya)
        [38.35, 38.31], // Malatya
        [38.67, 39.22], // Elazığ
        [37.91, 40.22]  // Diyarbakır (Son Durak)
      ],
      lat: 38.67, lng: 37.50,
      region: "Güneydoğu Anadolu",
      city: "Ankara - Kırıkkale - Kayseri - Sivas - Malatya - Elazığ - Diyarbakır",
      promptTitle: "Ankara'dan başlayıp Malatya ve Elazığ üzerinden Diyarbakır'a uzanan yeni turistik tren hattı haritada neresidir?",
      kpssNot: "Ankara'dan hareketle Malatya ve Elazığ üzerinden Diyarbakır'a kadar uzanır; DİYARBAKIR'DA SON BULUR (Mardin'e gitmez)."
    },
    {
      id: "ula_marmaray_tup",
      name: "Marmaray Boğaz Tüp Geçidi & Demir İpek Yolu",
      shortName: "Marmaray Tüp Geçit",
      category: "ulasim",
      type: "Demiryolu / Denizaltı Tüp Geçit",
      shapeType: "polyline",
      coordinates: [
        [41.01, 28.94], [41.015, 28.985], [41.018, 29.005], [41.02, 29.025], [41.00, 29.04]
      ],
      lat: 41.018, lng: 29.005,
      region: "Marmara",
      city: "İstanbul (Yenikapı - Sirkeci - Üsküdar - Ayrılık Çeşmesi)",
      kpssNot: "İstanbul Boğazı'nın altından geçen batırma tüp tüneldir. Asya ile Avrupa'yı kesintisiz bağlayarak Pekin'den Londra'ya Demir İpek Yolu'nu mümkün kılmıştır."
    },
    {
      id: "ula_demiryolu_olmayanlar",
      name: "Demiryolu Bağlantısı Olmayan Önemli Şehirler / Bölgeler",
      shortName: "Demiryolu Gitmeyen İller",
      category: "ulasim",
      type: "Demiryolu / Kör Noktalar",
      lat: 37.20, lng: 29.50,
      region: "Türkiye Geneli",
      city: "Doğu Karadeniz (Trabzon, Rize, Artvin, Giresun, Gümüşhane, Bayburt), Sinop, Çanakkale, Bursa (Gemlik), Muğla, Antalya, Hakkari, Şırnak",
      promptTitle: "Doğu Karadeniz, Sinop, Çanakkale, Muğla, Antalya, Hakkari ve Şırnak gibi merkezlerin ortak ulaşım özelliği nedir?",
      kpssNot: "KPSS Soru Klasiği: Doğu Karadeniz (Trabzon, Rize, Artvin, Gümüşhane, Bayburt), Sinop, Çanakkale, Bursa (Gemlik Limanı), Muğla, Antalya ve Hakkari-Şırnak hattında DEMİRYOLU YOKTUR."
    },

    // =========================================================================
    // 4. OTOYOL AĞLARI VE TRANSİT AKSLAR
    // =========================================================================
    {
      id: "ula_otoyol_istanbul_ankara",
      name: "Anadolu Otoyolu / TEM (İstanbul - Bolu - Ankara)",
      shortName: "TEM Otoyolu (İstanbul-Ankara)",
      category: "ulasim",
      type: "Otoyol / Ana Transit Hat",
      shapeType: "polyline",
      coordinates: [
        [41.00, 28.97], // İstanbul
        [40.75, 29.83], // İzmit
        [40.71, 30.36], // Adapazarı / Sakarya
        [40.84, 31.16], // Düzce
        [40.73, 31.60], // Bolu Dağı Tüneli
        [40.45, 32.25], // Kızılcahamam
        [39.93, 32.86]  // Ankara (Akıncı)
      ],
      lat: 40.75, lng: 31.00,
      region: "Marmara",
      city: "İstanbul - Kocaeli - Sakarya - Düzce - Bolu - Ankara",
      promptTitle: "İstanbul'u Kocaeli, Sakarya, Düzce ve Bolu Dağı Tüneli üzerinden başkent Ankara'ya bağlayan Türkiye'nin en işlek otoyolu haritada neresidir?",
      kpssNot: "İstanbul-Ankara arasındaki ana karayolu omurgasıdır; Bolu Dağı Tüneli ile kış aylarındaki ulaşım aksamaları ortadan kaldırılmıştır."
    },
    {
      id: "ula_otoyol_bati_aksi",
      name: "Batı Otoyol Aksı (Edirne - İstanbul - İzmir - Aydın - Denizli)",
      shortName: "Batı Otoyol Aksı (Denizli'ye Kadar)",
      category: "ulasim",
      type: "Otoyol / Batı Koridoru",
      shapeType: "polyline",
      coordinates: [
        [41.71, 26.35], // Kapıkule / Edirne
        [41.67, 26.56], // Edirne Merkez
        [41.42, 27.09], // Babaeski
        [41.16, 27.80], // Çorlu / Tekirdağ
        [41.07, 28.25], // Silivri
        [41.00, 28.97], // İstanbul
        [40.75, 29.83], // İzmit
        [40.72, 29.51], // Osmangazi Köprüsü
        [40.52, 29.35], // Orhangazi Tüneli / Yalova
        [40.20, 29.00], // Bursa
        [39.65, 27.88], // Balıkesir
        [38.92, 27.83], // Akhisar
        [38.56, 27.35], // Sabuncubeli / Manisa
        [38.42, 27.14], // İzmir
        [37.85, 27.84], // Aydın
        [37.91, 28.32], // Kuyucak / Nazilli
        [37.77, 29.08]  // Denizli (Son Nokta)
      ],
      lat: 39.50, lng: 28.00,
      region: "Ege",
      city: "Edirne - İstanbul - Kocaeli - Bursa - Balıkesir - Manisa - İzmir - Aydın - Denizli",
      promptTitle: "Edirne'den başlayıp İstanbul, İzmir ve Aydın üzerinden yeni açılan kesimle Denizli'ye kadar uzanan kesintisiz otoyol aksı haritada neresidir?",
      kpssNot: "Avrupa sınırından başlayıp Marmara ve Ege'yi birbirine bağlar; yeni açılan Aydın-Denizli etabıyla DENİZLİ'YE KADAR KESİNTİSİZ otoyol ulaşımı sağlanmıştır."
    },
    {
      id: "ula_otoyol_orta_dogu_aksi",
      name: "Orta ve Doğu Otoyol Aksı (Ankara - Niğde - Adana - Şanlıurfa)",
      shortName: "Güneydoğu Otoyol Aksı (Urfa'ya Kadar)",
      category: "ulasim",
      type: "Otoyol / Güney-Doğu Koridoru",
      shapeType: "polyline",
      coordinates: [
        [39.93, 32.86], // Ankara
        [39.79, 32.80], // Gölbaşı
        [38.94, 33.54], // Şereflikoçhisar (Kırşehir/Nevşehir bağlantıları)
        [38.37, 34.03], // Aksaray
        [37.97, 34.68], // Niğde
        [37.42, 34.87], // Pozantı
        [37.21, 34.79], // Gülek Boğazı
        [36.92, 34.90], // Tarsus - Mersin
        [37.00, 35.32], // Adana
        [37.03, 35.81], // Ceyhan
        [37.07, 36.25], // Osmaniye
        [37.18, 36.74], // Nurdağı
        [37.06, 37.38], // Gaziantep
        [37.03, 37.98], // Birecik
        [37.16, 38.79]  // Şanlıurfa (Son Nokta)
      ],
      lat: 37.80, lng: 35.80,
      region: "Güneydoğu Anadolu",
      city: "Ankara - Niğde - Adana - Mersin - Gaziantep - Şanlıurfa",
      promptTitle: "Ankara'dan başlayıp Niğde akıllı otoyolu, Çukurova ve Gaziantep üzerinden Şanlıurfa'ya kadar uzanan transit otoyol hattı haritada neresidir?",
      kpssNot: "Ankara-Niğde akıllı otoyolu (Kırşehir/Nevşehir kolları ile) üzerinden Çukurova ve Güneydoğu'yu bağlar; ŞANLIURFA'DA BİTER (Urfa'dan sonra Mardin yönüne otoyol gitmez!)."
    },
    {
      id: "ula_otoyol_adana_iskenderun",
      name: "Adana - İskenderun Otoyol Kolu",
      shortName: "İskenderun Otoyolu",
      category: "ulasim",
      type: "Otoyol / Hatay Kolu (İskenderun'da Biter)",
      shapeType: "polyline",
      coordinates: [
        [37.00, 35.32], // Adana
        [37.03, 35.81], // Ceyhan
        [36.93, 35.95], // Erzin
        [36.75, 36.12], // Dörtyol
        [36.58, 36.17]  // İskenderun (Son Nokta)
      ],
      lat: 36.80, lng: 36.00,
      region: "Akdeniz",
      city: "Adana - Ceyhan - Dörtyol - İskenderun",
      promptTitle: "Adana'dan güneye ayrılan ve Hatay il merkezine (Antakya) gitmeyip İskenderun'da son bulan otoyol kolu haritada neresidir?",
      kpssNot: "KPSS Çok Önemli Ayrıntı: Adana'dan Hatay yönüne ayrılan otoyol HATAY İL MERKEZİNE (ANTAKYA) GİTMEZ; İskenderun Limanı ve demir-çelik sanayi bölgesinde son bulur."
    },
    {
      id: "ula_otoyol_olmayan_merkezler",
      name: "Otoyol Bağlantısı Bulunmayan Önemli Merkezler",
      shortName: "Otoyol Olmayan Şehirler",
      category: "ulasim",
      type: "Otoyol / Otoyolsuz Merkezler",
      lat: 39.80, lng: 36.00,
      region: "Türkiye Geneli",
      city: "Eskişehir, Yozgat, Sivas, Antalya, Samsun, Erzurum, Mardin",
      promptTitle: "Sanayi, turizm veya ulaşım merkezi olmalarına rağmen (örneğin YHT varken otoyolu olmayan) otoyol şebekesine bağlı olmayan şehirler hangileridir?",
      kpssNot: "KPSS Soru Klasiği: Otoyolu bulunmayan kritik merkezler:\n• Eskişehir, Yozgat ve Sivas (YHT vardır fakat otoyol YOKTUR!).\n• Antalya (Türkiye'nin turizm başkentidir fakat otoyol bağlantısı YOKTUR!).\n• Samsun (Karadeniz'in en gelişmiş kenti olmasına rağmen otoyolu YOKTUR!).\n• Erzurum (Doğu Anadolu'nun merkezi olmasına rağmen otoyol YOKTUR!).\n• Mardin (Otoyol Şanlıurfa'da biter, Mardin'e uzanmaz!)."
    },

    // =========================================================================
    // 5. BORU HATLARI & ENERJİ KORİDORLARI
    // =========================================================================
    {
      id: "ula_btc_koridoru",
      name: "Bakü - Tiflis - Ceyhan (BTC) Ham Petrol Boru Hattı",
      shortName: "BTC Petrol Boru Hattı",
      category: "ulasim",
      type: "Boru Hattı / Uluslararası Enerji Koridoru",
      shapeType: "polyline",
      coordinates: [
        [41.18, 43.15], // Gürcistan Girişi (Posof/Ardahan)
        [40.60, 43.09], // Kars
        [39.91, 41.27], // Erzurum
        [39.75, 39.49], // Erzincan
        [39.37, 38.12], // Sivas
        [38.35, 38.31], // Malatya
        [37.57, 36.93], // Kahramanmaraş
        [36.87, 35.93]  // Ceyhan Haydar Aliyev Deniz Terminali
      ],
      lat: 39.20, lng: 39.50,
      region: "Doğu Anadolu",
      city: "Ardahan'dan Adana Ceyhan Deniz Terminali'ne",
      promptTitle: "Hazar petrolünü Gürcistan üzerinden Ceyhan Deniz Terminali'ne ulaştıran uluslararası petrol boru hattı haritada neresidir?",
      kpssNot: "Hazar (Azerbaycan) petrolünü Gürcistan üzerinden Akdeniz'e (Ceyhan) taşır. Türkiye'nin küresel enerji koridoru kimliğinin temel taşıdır."
    },
    {
      id: "ula_kerkuk_yumurtalik_koridoru",
      name: "Kerkük - Yumurtalık Ham Petrol Boru Hattı",
      shortName: "Kerkük - Yumurtalık Hattı",
      category: "ulasim",
      type: "Boru Hattı / Uluslararası Enerji Koridoru",
      shapeType: "polyline",
      coordinates: [
        [37.15, 42.57], // Silopi / Irak Sınırı
        [37.30, 41.50], // Midyat
        [37.07, 41.22], // Nusaybin
        [37.16, 38.79], // Şanlıurfa
        [37.06, 37.38], // Gaziantep
        [37.00, 36.25], // Osmaniye
        [36.87, 35.93]  // Adana Yumurtalık Deniz Terminali
      ],
      lat: 37.10, lng: 39.20,
      region: "Güneydoğu Anadolu",
      city: "Şırnak Silopi'den Adana Yumurtalık Terminali'ne",
      promptTitle: "Irak ham petrolünü Akdeniz kıyısındaki Yumurtalık deniz terminaline taşıyan tarihi boru hattı haritada neresidir?",
      kpssNot: "Irak petrolünü Ceyhan Yumurtalık'a ulaştıran ilk büyük transit boru hattıdır; Orta Doğu petrolünün Akdeniz'e çıkış kapısıdır."
    },
    {
      id: "ula_tanap_koridoru",
      name: "TANAP (Trans Anadolu Doğal Gaz Boru Hattı)",
      shortName: "TANAP Doğal Gaz Hattı",
      category: "ulasim",
      type: "Boru Hattı / Doğal Gaz Koridoru",
      shapeType: "polyline",
      coordinates: [
        [41.18, 43.15], // Ardahan (Giriş)
        [40.50, 42.00], // Erzurum
        [39.80, 39.50], // Erzincan
        [39.75, 37.00], // Sivas
        [39.82, 34.81], // Yozgat
        [39.84, 33.51], // Kırıkkale
        [39.93, 32.86], // Ankara
        [39.77, 30.52], // Eskişehir (Kompresör)
        [40.20, 29.00], // Bursa
        [40.75, 27.50], // Tekirdağ
        [41.27, 26.68], // Edirne İpsala (Avrupa Çıkışı - TAP Bağlantısı)
        [40.92, 26.38]
      ],
      lat: 39.80, lng: 34.50,
      region: "İç Anadolu",
      city: "Ardahan'dan Edirne İpsala Avrupa Sınırına (Türkiye'yi baştan başa geçer)",
      promptTitle: "Azerbaycan Şah Deniz gazını Türkiye üzerinden Avrupa'ya taşıyan ve Türkiye'yi doğudan batıya kat eden en uzun doğalgaz boru hattı neresidir?",
      kpssNot: "Azerbaycan doğal gazını 20 ilden geçerek Edirne İpsala üzerinden Avrupa'ya (TAP) bağlar. Türkiye'yi doğudan batıya kat eden EN UZUN BORU HATTIDIR."
    },
    {
      id: "ula_mavi_akim_turkakim",
      name: "Mavi Akım & TürkAkım Doğal Gaz Hatları",
      shortName: "Mavi Akım / TürkAkım",
      category: "ulasim",
      type: "Boru Hattı / Doğal Gaz Koridoru",
      shapeType: "polyline",
      coordinates: [
        [41.70, 35.80], [41.29, 36.33], [40.60, 35.80], [39.93, 32.86], // Mavi Akım (Samsun -> Ankara)
        [41.29, 36.33],
        [41.80, 28.50], [41.60, 28.00], [41.40, 27.30] // TürkAkım (Kıyıköy -> Trakya)
      ],
      lat: 41.40, lng: 32.00,
      region: "Karadeniz",
      city: "Samsun (Durusu) & Kırklareli (Kıyıköy)",
      kpssNot: "Karadeniz'in tabanından geçen hatlardır; Mavi Akım Rus gazını Samsun'a, TürkAkım ise Trakya Kıyıköy üzerinden Türkiye ve Avrupa'ya ulaştırır."
    },

    // =========================================================================
    // 5. SINIR KAPILARI (Gümrük & Transit Ticaret Kapıları)
    // =========================================================================
    {
      id: "ula_sinir_kapikule",
      name: "Kapıkule Sınır Kapısı (Bulgaristan)",
      shortName: "Kapıkule Sınır Kapısı",
      category: "ulasim",
      type: "Sınır Kapısı / En İşlek Kapı",
      lat: 41.71, lng: 26.35,
      region: "Marmara",
      city: "Edirne (Bulgaristan Sınırı)",
      promptTitle: "Avrupa'ya açılan, hem karayolu hem de demiryolu bağlantısı olan Türkiye'nin en işlek sınır kapısı haritada neresidir?",
      kpssNot: "Türkiye'nin ve Avrupa'nın EN İŞLEK sınır kapısıdır. Hem karayolu hem demiryolu bağlantısı vardır."
    },
    {
      id: "ula_sinir_derekoy",
      name: "Dereköy (Aziziye) Sınır Kapısı (Bulgaristan)",
      category: "ulasim",
      type: "Sınır Kapısı / Karayolu",
      lat: 41.93, lng: 27.36,
      region: "Marmara",
      city: "Kırklareli (Bulgaristan Sınırı)",
      kpssNot: "Yıldız Dağları üzerinden Bulgaristan'a bağlanan karayolu sınır kapısıdır."
    },
    {
      id: "ula_sinir_uzunkopru",
      name: "Uzunköprü & İpsala Sınır Kapıları (Yunanistan)",
      shortName: "İpsala & Uzunköprü Kapıları",
      category: "ulasim",
      type: "Sınır Kapısı / Demiryolu & Karayolu",
      lat: 41.27, lng: 26.68,
      region: "Marmara",
      city: "Edirne (Yunanistan Sınırı)",
      kpssNot: "İpsala en işlek karayolu kapısıdır; Uzunköprü ise Yunanistan ile DEMİRYOLU BAĞLANTISINI sağlayan kapıdır."
    },
    {
      id: "ula_sinir_sarp",
      name: "Sarp Sınır Kapısı (Gürcistan)",
      shortName: "Sarp Sınır Kapısı",
      category: "ulasim",
      type: "Sınır Kapısı / Kafkasya Kapısı",
      lat: 41.52, lng: 41.55,
      region: "Karadeniz",
      city: "Artvin (Hopa - Gürcistan)",
      promptTitle: "Kafkasya ve Gürcistan'a açılan, kimlikle geçiş yapılabilen Doğu Karadeniz'in en yoğun sınır kapısı haritada neresidir?",
      kpssNot: "Gürcistan ve Kafkasya'ya açılan en yoğun kapıdır; kimlikle geçiş yapılabilir. Türközü kapısı da Ardahan üzerinden Gürcistan'a açılır."
    },
    {
      id: "ula_sinir_cambaz",
      name: "Cambaz Demiryolu İstasyonu (Gürcistan)",
      shortName: "Cambaz İstasyonu (BTK)",
      category: "ulasim",
      type: "Sınır Kapısı / Demir İpek Yolu",
      lat: 41.18, lng: 43.15,
      region: "Doğu Anadolu",
      city: "Ardahan (Çıldır) - Kars",
      promptTitle: "Bakü-Tiflis-Kars (Demir İpek Yolu) demiryolu hattının Türkiye'ye giriş yaptığı sınır gümrük istasyonu haritada neresidir?",
      kpssNot: "Bakü-Tiflis-Kars (BTK) demiryolu hattının Türkiye'ye giriş yaptığı ilk demiryolu gümrük istasyonudur."
    },
    {
      id: "ula_sinir_dilucu",
      name: "Dilucu (Umut) Sınır Kapısı (Nahçıvan / Azerbaycan)",
      shortName: "Dilucu Sınır Kapısı",
      category: "ulasim",
      type: "Sınır Kapısı / Zengezur Koridoru",
      lat: 39.65, lng: 44.80,
      region: "Doğu Anadolu",
      city: "Iğdır (Nahçıvan Sınırı)",
      promptTitle: "Türkiye'nin en kısa kara sınırında yer alan, gelecekte Zengezur Koridoru ile demiryolu bağlanacak kapı haritada neresidir?",
      kpssNot: "Türkiye'nin EN KISA KARA SINIRIDIR (Nahçıvan). Zengezur Koridoru demiryolu projesi ile doğrudan Azerbaycan'a bağlanacaktır."
    },
    {
      id: "ula_sinir_kapikoy",
      name: "Kapıköy & Gürbulak Sınır Kapıları (İran)",
      shortName: "Gürbulak & Kapıköy Kapıları",
      category: "ulasim",
      type: "Sınır Kapısı / Demiryolu & Karayolu",
      lat: 38.56, lng: 44.33,
      region: "Doğu Anadolu",
      city: "Ağrı (Gürbulak) - Van (Kapıköy) - Hakkari (Esendere)",
      promptTitle: "İran ile olan sınır kapılarımızdan DEMİRYOLU BAĞLANTISI bulunan Van'daki kapı haritada neresidir?",
      kpssNot: "Gürbulak en işlek transit karayolu kapısıdır. KAPIKÖY (Van) ise İRAN İLE DEMİRYOLU BAĞLANTISI OLAN sınır kapımızdır."
    },
    {
      id: "ula_sinir_habur",
      name: "Habur Sınır Kapısı (Irak)",
      shortName: "Habur Sınır Kapısı",
      category: "ulasim",
      type: "Sınır Kapısı / Orta Doğu Ticareti",
      lat: 37.15, lng: 42.57,
      region: "Güneydoğu Anadolu",
      city: "Şırnak (Silopi - Irak Sınırı)",
      promptTitle: "Irak ve Orta Doğu ticaretinin can damarı olan, ancak DEMİRYOLU BAĞLANTISI BULUNMAYAN sınır kapısı haritada neresidir?",
      kpssNot: "Irak'a açılan en işlek ticaret kapısıdır. Ancak Irak sınırındaki hiçbir kapıda (Habur, Üzümlü, Derecik) DEMİRYOLU BAĞLANTISI YOKTUR."
    },
    {
      id: "ula_sinir_akyaka_dogukapi",
      name: "Akyaka / Doğukapı Sınır Kapısı (Ermenistan)",
      shortName: "Doğukapı (Ermenistan - Kapalı)",
      category: "ulasim",
      type: "Sınır Kapısı / Demiryolu (Kapalı)",
      lat: 40.75, lng: 43.62,
      region: "Doğu Anadolu",
      city: "Kars (Akyaka - Ermenistan Sınırı)",
      promptTitle: "Ermenistan ile demiryolu bağlantımız olmasına rağmen siyasi nedenlerle fiilen KAPALI TUTULAN sınır kapısı haritada neresidir?",
      kpssNot: "KPSS Sınır Kapıları Notu: Ermenistan ile Kars Akyaka'da (Doğukapı) demir yolu bağlantısı bulunmaktadır; ancak Karabağ işgali ve siyasi nedenlerle kapı fiilen KAPALI durumdadır."
    },
    {
      id: "ula_sinir_nusaybin",
      name: "Nusaybin & Cilvegözü Sınır Kapıları (Suriye)",
      shortName: "Nusaybin & Cilvegözü",
      category: "ulasim",
      type: "Sınır Kapısı / Demiryolu & Karayolu",
      lat: 37.07, lng: 41.22,
      region: "Güneydoğu Anadolu",
      city: "Mardin (Nusaybin) - Hatay (Cilvegözü / Yayladağı / Zeytin Dalı)",
      promptTitle: "Suriye sınırında DEMİRYOLU BAĞLANTISI bulunan tarihi Bağdat Demiryolu üzerindeki sınır kapısı haritada neresidir?",
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
