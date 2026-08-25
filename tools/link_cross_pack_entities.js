const fs = require('fs');
const path = require('path');

const legacyPath = path.join(__dirname, '..', 'data', 'cografya_data.legacy.js');
const sourceDir = path.join(__dirname, '..', 'data', 'source');

const legacySrc = fs.readFileSync(legacyPath, 'utf8');
const extFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith('.js')).sort();
const extSrc = extFiles.map(f => fs.readFileSync(path.join(sourceDir, f), 'utf8')).join('\n');
const { COGRAFYA_DATA } = new Function(legacySrc + '\nvar COGRAFYA_DATA_EXT = {};\n' + extSrc + '\nObject.assign(COGRAFYA_DATA, COGRAFYA_DATA_EXT);\nreturn { COGRAFYA_DATA };')();

const allItems = [];
Object.entries(COGRAFYA_DATA).forEach(([cat, list]) => {
  list.forEach(it => {
    allItems.push({ cat, ...it });
  });
});

console.log('Total items in raw dataset:', allItems.length);

const HUB_DEFINITIONS = [
  // 1. Kapadokya / Peri Bacaları / Göreme
  {
    groupId: 'grp_kapadokya_goreme',
    title: 'Kapadokya - Göreme - Peribacaları Havzası',
    match: it => /kapadokya|göreme|peribaca/i.test(it.name) || (it.city && it.city.includes('Nevşehir') && /peribaca|turizm|tüf/i.test((it.type||'') + it.name))
  },
  // 2. Pamukkale / Hierapolis / Traverten
  {
    groupId: 'grp_pamukkale_hierapolis',
    title: 'Pamukkale Travertenleri ve Hierapolis',
    match: it => /pamukkale|hierapolis/i.test(it.name)
  },
  // 3. Kapıdağ Tombolosu / Yarımadası
  {
    groupId: 'grp_kapidag_tombolo',
    title: 'Kapıdağ Yarımadası Tombolosu',
    match: it => /kapıdağ/i.test(it.name) || (/tombolo/i.test(it.name) && it.city && it.city.includes('Balıkesir'))
  },
  // 4. Kaçkar Dağları / Sirk Gölleri / Alpin Çayırlar
  {
    groupId: 'grp_kackar_masifi',
    title: 'Kaçkar Dağları & Buzul Sirkleri',
    match: it => /kaçkar/i.test(it.name)
  },
  // 5. Cilo Dağı / Reşko / Güncel Buzul
  {
    groupId: 'grp_cilo_buzul',
    title: 'Cilo Dağı & Reşko Güncel Buzulları',
    match: it => /cilo|reşko/i.test(it.name)
  },
  // 6. Nemrut Volkanı & Kalderası (Bitlis / Van Gölü)
  {
    groupId: 'grp_nemrut_volkani_bitlis',
    title: 'Nemrut Volkanı ve Krater Gölü (Bitlis)',
    match: it => (/nemrut/i.test(it.name) && !/adıyaman|kommagene|heykeller/i.test(it.name + (it.city||''))) && (/volkan|krater|kaldera|göl/i.test(it.name + (it.type||'')))
  },
  // 7. Nemrut Dağı Heykelleri (Adıyaman - Kommagene)
  {
    groupId: 'grp_nemrut_kommagene_adiyaman',
    title: 'Nemrut Dağı Millî Parkı & Kommagene (Adıyaman)',
    match: it => /nemrut/i.test(it.name) && (/adıyaman|kommagene|heykel|örenyeri/i.test(it.name + (it.city||'') + (it.kpssNot||'')))
  },
  // 8. Meke Maarı / Tuzlası
  {
    groupId: 'grp_meke_tuzlasi',
    title: 'Meke Maar & Volkanik Göl',
    match: it => /meke/i.test(it.name)
  },
  // 9. Kula Volkanları & UNESCO Jeoparkı
  {
    groupId: 'grp_kula_volkanik_jeopark',
    title: 'Kula Volkanları & Jeoparkı',
    match: it => /kula/i.test(it.name) && /volkan|jeopark|katakekaumene/i.test(it.name + (it.type||'') + (it.kpssNot||''))
  },
  // 10. Karapınar Havzası (Kumullar, Obruklar, Kuraklık, GES)
  {
    groupId: 'grp_karapinar_havzasi',
    title: 'Karapınar Havzası (Obruk, Kumul, GES)',
    match: it => /karapınar/i.test(it.name)
  },
  // 11. Seydişehir Boksit & Alüminyum Tesisleri
  {
    groupId: 'grp_seydisehir_aluminyum',
    title: 'Seydişehir Boksit & Alüminyum Entegre Sahası',
    match: it => /seydişehir/i.test(it.name)
  },
  // 12. Aliağa Petrokimya, Rafineri & Limanı
  {
    groupId: 'grp_aliaga_petrokimya_liman',
    title: 'Aliağa Petrokimya, Rafineri ve Liman Kompleksi',
    match: it => /aliağa/i.test(it.name)
  },
  // 13. Batman Petrol Sahası (Raman) & Rafinerisi
  {
    groupId: 'grp_batman_petrol_kompleksi',
    title: 'Batman Petrol Yatakları & Rafinerisi',
    match: it => (/batman/i.test(it.name) && /petrol|rafineri|raman/i.test(it.name + (it.type||''))) || /raman/i.test(it.name)
  },
  // 14. Divriği Demir Madeni & Ulu Camii
  {
    groupId: 'grp_divrigi_sivas',
    title: 'Divriği Demir Yatakları & Ulu Camii',
    match: it => /divriği/i.test(it.name)
  },
  // 15. Nallıhan Kırgıbayır (Badlands)
  {
    groupId: 'grp_nallihan_badlands',
    title: 'Nallıhan Kırgıbayır (Badlands) Sahası',
    match: it => /nallıhan/i.test(it.name)
  },
  // 16. Damlataş & Alanya
  {
    groupId: 'grp_damlatas_alanya',
    title: 'Damlataş Mağarası & Alanya Kıyı Turizmi',
    match: it => /damlataş/i.test(it.name) || (/alanya/i.test(it.name) && /turizm|mağara/i.test(it.name + (it.type||'')))
  },
  // 17. Bodrum Yarımadası & Kıyı Turizmi
  {
    groupId: 'grp_bodrum_kiyi_turizm',
    title: 'Bodrum Yarımadası ve Kıyı Turizmi',
    match: it => /bodrum/i.test(it.name)
  },
  // 18. Sinop İnceburun (Tombolo & En Kuzey Nokta)
  {
    groupId: 'grp_sinop_inceburun',
    title: 'Sinop İnceburun Yarımadası (Tombolo & En Kuzey)',
    match: it => /inceburun/i.test(it.name) || (/sinop/i.test(it.name) && /yarımada|burun|tombolo/i.test(it.name + (it.type||'')))
  },
  // 19. Ergene Havzası (Taşkın, Bölüm, Çeltik/Pirinç)
  {
    groupId: 'grp_ergene_havzasi',
    title: 'Ergene Havzası & Tarım-Taşkın Kuşağı',
    match: it => /ergene/i.test(it.name)
  },
  // 20. Çukurova Deltası (Seyhan, Ceyhan, Alüvyal Toprak, Sanayi, Tarım)
  {
    groupId: 'grp_cukurova_deltasi_havza',
    title: 'Çukurova Deltası ve Tarım Havzası',
    match: it => /çukurova/i.test(it.name)
  },
  // 21. Bafra Deltası & Kızılırmak Ağzı
  {
    groupId: 'grp_bafra_deltasi',
    title: 'Bafra Deltası & Kızılırmak Ağzı',
    match: it => /bafra/i.test(it.name)
  },
  // 22. Çarşamba Deltası & Yeşilırmak Ağzı
  {
    groupId: 'grp_carsamba_deltasi',
    title: 'Çarşamba Deltası & Yeşilırmak Ağzı',
    match: it => /çarşamba/i.test(it.name) && /ova|delta/i.test(it.name + (it.type||''))
  },
  // 23. Silifke Deltası & Göksu Nehri
  {
    groupId: 'grp_silifke_deltasi',
    title: 'Silifke Deltası & Göksu Nehri',
    match: it => /silifke/i.test(it.name) && /ova|delta|çilek/i.test(it.name + (it.type||''))
  },
  // 24. Erzurum - Kars Platosu, Çernozyom, Büyükbaş & Sert Karasal İklim
  {
    groupId: 'grp_erzurum_kars_plato_ekosistem',
    title: 'Erzurum - Kars Platosu & Çernozyom & Büyükbaş Ekosistemi',
    match: it => (/erzurum/i.test(it.name) && /kars/i.test(it.name)) || (/çernozyom|cernozyom/i.test(it.name))
  },
  // 25. Teke & Taşeli Platoları, Kıl Keçisi & Karstik Arazi
  {
    groupId: 'grp_teke_taseli_karst_kusagi',
    title: 'Teke & Taşeli Platoları ve Kıl Keçisi Sahası',
    match: it => (/teke/i.test(it.name) && /taşeli/i.test(it.name)) || (/kıl keçisi/i.test(it.name))
  },
  // 26. Batı Karadeniz Demir-Çelik (Ereğli, Karabük, Zonguldak Kömürü)
  {
    groupId: 'grp_bati_karadeniz_demircelik',
    title: 'Batı Karadeniz Taşkömürü & Demir-Çelik Havzası',
    match: it => (/ereğli|karabük/i.test(it.name) && /demir|çelik|erdemir|kardemir/i.test(it.name + (it.type||''))) || (/taşkömürü/i.test(it.name) && /zonguldak/i.test(it.name + (it.city||'')))
  },
  // 27. İskenderun Demir-Çelik & Limanı
  {
    groupId: 'grp_iskenderun_sanayi_liman',
    title: 'İskenderun Demir-Çelik (İsdemir) & Limanı',
    match: it => /iskenderun/i.test(it.name) && /demir|çelik|liman|isdemir/i.test(it.name + (it.type||''))
  },
  // 28. Çanakkale Boğazı & 1915 Çanakkale Köprüsü
  {
    groupId: 'grp_canakkale_bogazi_koprusu',
    title: 'Çanakkale Boğazı & 1915 Çanakkale Köprüsü',
    match: it => /çanakkale/i.test(it.name) && /boğaz|köprü/i.test(it.name + (it.type||''))
  },
  // 29. İstanbul Boğazı, Köprüleri & Marmaray
  {
    groupId: 'grp_istanbul_bogazi_gecisleri',
    title: 'İstanbul Boğazı, Asma Köprüleri & Marmaray',
    match: it => /istanbul/i.test(it.name) && /boğaz|köprü|marmaray/i.test(it.name + (it.type||''))
  },
  // 30. Yusufeli Barajı & Heyelan
  {
    groupId: 'grp_yusufeli_artvin',
    title: 'Yusufeli Barajı & Heyelan Havzası (Artvin)',
    match: it => /yusufeli/i.test(it.name)
  },
  // 31. Manyas (Kuş) Gölü & Millî Parkı
  {
    groupId: 'grp_manyas_kus_cenneti',
    title: 'Manyas (Kuş Gölü) & Kuş Cenneti',
    match: it => /manyas|kuş gölü|kuş cenneti/i.test(it.name)
  },
  // 32. Köyceğiz Gölü & İztuzu / Dalyan
  {
    groupId: 'grp_koycegiz_dalyan',
    title: 'Köyceğiz Gölü & İztuzu Lagünü (Dalyan)',
    match: it => /köyceğiz|iztuzu|dalyan/i.test(it.name)
  },
  // 33. Salda Gölü (Mars Benzeri Karstik Göl)
  {
    groupId: 'grp_salda_golu',
    title: 'Salda Gölü (Burdur)',
    match: it => /salda/i.test(it.name)
  },
  // 34. Tuz Gölü & Tuz Çıkarımı
  {
    groupId: 'grp_tuz_golu_havzasi',
    title: 'Tuz Gölü Havzası & Tuz Tesisleri',
    match: it => /tuz gölü/i.test(it.name)
  },
  // 35. Van Gölü & Nemrut - Süphan Çevresi
  {
    groupId: 'grp_van_golu_ekosistemi',
    title: 'Van Gölü Havzası',
    match: it => /van gölü/i.test(it.name)
  },
  // 36. Tortum Şelalesi & Heyelan Set Gölü
  {
    groupId: 'grp_tortum_erzurum',
    title: 'Tortum Şelalesi & Heyelan Set Gölü',
    match: it => /tortum/i.test(it.name)
  },
  // 37. Abant & Yedigöller Millî Parkı
  {
    groupId: 'grp_abant_yedigoller_bolu',
    title: 'Abant & Yedigöller Havzası (Bolu)',
    match: it => /abant|yedigöller/i.test(it.name)
  },
  // 38. Keban Barajı & HES & Fırat Nehri
  {
    groupId: 'grp_keban_baraji_havzasi',
    title: 'Keban Barajı & Fırat Havzası',
    match: it => /keban/i.test(it.name)
  },
  // 39. Atatürk Barajı & GAP Sulaması
  {
    groupId: 'grp_ataturk_baraji_gap',
    title: 'Atatürk Barajı & GAP',
    match: it => /atatürk barajı/i.test(it.name)
  },
  // 40. Deriner Barajı & Çoruh
  {
    groupId: 'grp_deriner_baraji_coruh',
    title: 'Deriner Barajı & Çoruh Kanyonu',
    match: it => /deriner/i.test(it.name)
  },
  // 41. Soma Linyit & Termik Santrali
  {
    groupId: 'grp_soma_linyit_enerji',
    title: 'Soma Linyit Yatakları & Termik Santrali',
    match: it => /soma/i.test(it.name) && /linyit|termik/i.test(it.name + (it.type||''))
  },
  // 42. Afşin - Elbistan Linyit & Termik
  {
    groupId: 'grp_afsin_elbistan_enerji',
    title: 'Afşin - Elbistan Linyit & Termik Santrali',
    match: it => /afşin|elbistan/i.test(it.name) && /linyit|termik/i.test(it.name + (it.type||''))
  },
  // 43. Yatağan Linyit & Termik
  {
    groupId: 'grp_yatagan_linyit_enerji',
    title: 'Yatağan Linyit & Termik Santrali (Muğla)',
    match: it => /yatağan/i.test(it.name) && /linyit|termik/i.test(it.name + (it.type||''))
  },
  // 44. Hamitabat Doğalgaz Santrali & Kırklareli Gazı
  {
    groupId: 'grp_hamitabat_dogalgaz',
    title: 'Hamitabat Doğalgaz Çevrim Santrali & Yatağı',
    match: it => /hamitabat/i.test(it.name)
  },
  // 45. Kızıldere - Sarayköy Jeotermal Enerji
  {
    groupId: 'grp_kizildere_jeotermal',
    title: 'Kızıldere / Sarayköy Jeotermal Santrali',
    match: it => /kızıldere|sarayköy/i.test(it.name) && /jeotermal/i.test(it.name + (it.type||''))
  },
  // 46. Safranbolu Evleri & Tarihî Kent
  {
    groupId: 'grp_safranbolu_unesco',
    title: 'Safranbolu Tarihî Evleri (UNESCO)',
    match: it => /safranbolu/i.test(it.name)
  },
  // 47. Sümela Manastırı & Maçka
  {
    groupId: 'grp_sumela_macka',
    title: 'Sümela Manastırı & Altındere Vadisi',
    match: it => /sümela/i.test(it.name)
  },
  // 48. Ani Ören Yeri & Arpaçay
  {
    groupId: 'grp_ani_harabeleri_kars',
    title: 'Ani Harabeleri (UNESCO / Kars)',
    match: it => /ani örenyeri|ani harabeleri/i.test(it.name)
  },
  // 49. Efes Antik Kenti & Selçuk Ovası
  {
    groupId: 'grp_efes_selcuk',
    title: 'Efes Antik Kenti & Selçuk Ovası (Küçük Menderes)',
    match: it => /efes/i.test(it.name) || (/selçuk/i.test(it.name) && /ova|delta|antik/i.test(it.name + (it.type||'')))
  },
  // 50. Troya (Truva) & Çanakkale
  {
    groupId: 'grp_troya_canakkale',
    title: 'Troya (Truva) Antik Kenti (UNESCO)',
    match: it => /troya|truva/i.test(it.name)
  },
  // 51. Hattuşa (Boğazköy) & Hitit Başkenti
  {
    groupId: 'grp_hattusa_bogazkoy',
    title: 'Hattuşa (Boğazköy) - Hitit Başkenti (UNESCO)',
    match: it => /hattuşa|hattusa|boğazköy/i.test(it.name)
  },
  // 52. Gordion Antik Kenti (Polatlı / Ankara)
  {
    groupId: 'grp_gordion_polatli',
    title: 'Gordion Antik Kenti (UNESCO / Polatlı)',
    match: it => /gordion/i.test(it.name)
  },
  // 53. Göbeklitepe (Şanlıurfa)
  {
    groupId: 'grp_gobeklitepe_urfa',
    title: 'Göbeklitepe - Tarihin Sıfır Noktası (UNESCO)',
    match: it => /göbeklitepe/i.test(it.name)
  },
  // 54. Çatalhöyük (Konya)
  {
    groupId: 'grp_catalhoyuk_konya',
    title: 'Çatalhöyük Neolitik Kenti (UNESCO)',
    match: it => /çatalhöyük/i.test(it.name)
  },
  // 55. Arslantepe Höyüğü (Malatya)
  {
    groupId: 'grp_arslantepe_malatya',
    title: 'Arslantepe Höyüğü (UNESCO / Malatya)',
    match: it => /arslantepe/i.test(it.name)
  },
  // 56. Bergama (Pergamon / Bakırçay)
  {
    groupId: 'grp_bergama_unesco',
    title: 'Bergama Çok Katmanlı Kültürel Peyzajı (UNESCO)',
    match: it => /bergama/i.test(it.name)
  },
  // 57. Xanthos - Letoon (Muğla / Antalya Sınırı)
  {
    groupId: 'grp_xanthos_letoon',
    title: 'Xanthos - Letoon (UNESCO)',
    match: it => /xanthos|letoon/i.test(it.name)
  },
  // 58. İvriz Kaya Anıtı & Ereğli / Konya
  {
    groupId: 'grp_ivriz_konya',
    title: 'İvriz Kaya Anıtı (Konya)',
    match: it => /ivriz/i.test(it.name)
  },
  // 59. Çatalağzı Termik Santrali & Zonguldak Kömürü
  {
    groupId: 'grp_catalagzi_termik',
    title: 'Çatalağzı Termik Santrali (Zonguldak)',
    match: it => /çatalağzı/i.test(it.name)
  },
  // 60. Menteşe Yöresi (Dağlar, Yağış, Çam Balı)
  {
    groupId: 'grp_mentese_ekosistemi',
    title: 'Menteşe Yöresi Dağları, Yağışı & Çam Balı',
    match: it => /menteşe/i.test(it.name)
  },
  // 61. Yıldız (Istranca) Dağları (Dağ, Seyrek Nüfus, Bölüm)
  {
    groupId: 'grp_yildiz_daglari',
    title: 'Yıldız (Istranca) Dağları & Bölümü',
    match: it => /yıldız|istranca/i.test(it.name)
  },
  // 62. Hakkâri Dağlık Yöresi & Bölümü
  {
    groupId: 'grp_hakkari_daglik_bolum',
    title: 'Hakkâri Yöresi (Cilo, Kar, Bölüm)',
    match: it => (/hakkâri|hakkari/i.test(it.name) && /bölüm|kar|seyrek/i.test(it.name + (it.type||'')))
  },
  // 63. Iğdır Ovası Mikrokliması & Don Riski
  {
    groupId: 'grp_igdir_mikroklima',
    title: 'Iğdır Ovası Mikrokliması (En Az Yağış & Pamuk)',
    match: it => /iğdır/i.test(it.name) && /mikroklima|don|ova/i.test(it.name + (it.type||''))
  },
  // 64. Trabzon Limanı & Zigana Koridoru
  {
    groupId: 'grp_trabzon_zigana_koridoru',
    title: 'Trabzon Limanı & Zigana Geçidi Ulaşım Koridoru',
    match: it => /zigana/i.test(it.name) || (/trabzon limanı/i.test(it.name))
  },
  // 65. Ovit Geçidi & Tüneli (Rize - Erzurum)
  {
    groupId: 'grp_ovit_koridoru',
    title: 'Ovit Geçidi & Tüneli (Rize - Erzurum)',
    match: it => /ovit/i.test(it.name)
  },
  // 66. Kop Geçidi (Bayburt - Erzurum)
  {
    groupId: 'grp_kop_koridoru',
    title: 'Kop Geçidi (Bayburt - Erzurum)',
    match: it => /kop geçidi/i.test(it.name)
  },
  // 67. Ilgaz Geçidi & Tüneli (Kastamonu - Çankırı)
  {
    groupId: 'grp_ilgaz_koridoru',
    title: 'Ilgaz Dağı & Geçidi',
    match: it => /ilgaz/i.test(it.name) && /geçit|dağ|tünel/i.test(it.name + (it.type||''))
  },
  // 68. Belen Geçidi & İskenderun
  {
    groupId: 'grp_belen_gecidi',
    title: 'Belen Geçidi (Hatay - İskenderun)',
    match: it => /belen/i.test(it.name) && /geçit/i.test(it.name + (it.type||''))
  },
  // 69. Gülek Boğazı (Pozantı - Çukurova)
  {
    groupId: 'grp_gulek_bogazi',
    title: 'Gülek Boğazı / Geçidi',
    match: it => /gülek/i.test(it.name) && /geçit|boğaz/i.test(it.name + (it.type||''))
  },
  // 70. Sertavul Geçidi (Silifke - Karaman)
  {
    groupId: 'grp_sertavul_gecidi',
    title: 'Sertavul Geçidi (Mersin - Karaman)',
    match: it => /sertavul/i.test(it.name) && /geçit/i.test(it.name + (it.type||''))
  },
  // 71. Çubuk Geçidi (Antalya - Göller Yöresi)
  {
    groupId: 'grp_cubuk_gecidi',
    title: 'Çubuk Geçidi (Antalya - Burdur)',
    match: it => /çubuk/i.test(it.name) && /geçit/i.test(it.name + (it.type||''))
  },
  // 72. Taşköprü Sarımsağı
  {
    groupId: 'grp_taskopru_sarimsak',
    title: 'Taşköprü Sarımsağı (Kastamonu)',
    match: it => /taşköprü/i.test(it.name) || (/sarımsak/i.test(it.name) && it.cat === 'tarim')
  },
  // 73. Erciyes Dağı & Volkanizma
  {
    groupId: 'grp_erciyes_volkani',
    title: 'Erciyes Dağı & Volkanik Masifi',
    match: it => /erciyes/i.test(it.name)
  },
  // 74. Uludağ Batoliti & Kış Turizmi
  {
    groupId: 'grp_uludag_masifi',
    title: 'Uludağ Batolit Masifi & Kış Turizmi',
    match: it => /uludağ/i.test(it.name)
  },
  // 75. Hasan Dağı Volkanı (Aksaray / Niğde)
  {
    groupId: 'grp_hasan_dagi_volkani',
    title: 'Hasan Dağı Volkanı',
    match: it => /hasan dağı/i.test(it.name)
  },
  // 76. Tendürek Volkanı & Gaz Çıkışları
  {
    groupId: 'grp_tendurek_volkani',
    title: 'Tendürek Volkanı & Solfatar',
    match: it => /tendürek/i.test(it.name)
  },
  // 77. Süphan Volkanı
  {
    groupId: 'grp_suphan_volkani',
    title: 'Süphan Dağı Volkanı',
    match: it => /süphan/i.test(it.name)
  },
  // 78. Ağrı Dağı (Büyük Ağrı & Küçük Ağrı & Takke Buzulu)
  {
    groupId: 'grp_agri_dagi_zirve',
    title: 'Ağrı Dağı & Takke Buzulu',
    match: it => /ağrı dağı/i.test(it.name) || /büyük ağrı/i.test(it.name)
  },
  // 79. Karacadağ Kalkan Volkanı (Diyarbakır - Şanlıurfa)
  {
    groupId: 'grp_karacadag_guneydogu',
    title: 'Karacadağ Kalkan Volkanı (Güneydoğu)',
    match: it => /karacadağ/i.test(it.name) && (/güneydoğu|diyarbakır|urfa|şanlıurfa/i.test(it.name + (it.city||'') + (it.region||'')))
  }
];

let totalLinked = 0;
let hubCount = 0;
const itemToGroup = {};

HUB_DEFINITIONS.forEach(hub => {
  const matched = allItems.filter(hub.match);
  if (matched.length >= 2) {
    hubCount++;
    totalLinked += matched.length;
    console.log(`\n🔗 [${hub.groupId}] ${hub.title} (${matched.length} eleman):`);
    matched.forEach(it => {
      itemToGroup[it.id] = hub.groupId;
      console.log(`   - [${it.cat}] ${it.id} : ${it.name} (${it.type || ''})`);
    });
  }
});

console.log('\n=========================================');
console.log('TOTAL LINKED HUBS FOUND:', hubCount);
console.log('TOTAL ITEMS CONNECTED ACROSS HUBS:', totalLinked);

// Save mapping to json for apply step
fs.writeFileSync(path.join(__dirname, 'entity_links.json'), JSON.stringify(itemToGroup, null, 2), 'utf8');
console.log('Saved mapping to tools/entity_links.json');
