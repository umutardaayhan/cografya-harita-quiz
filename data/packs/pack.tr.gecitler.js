/**
 * 📦 Geçitler & Boğazlar  —  tr.gecitler
 *
 * OTOMATİK ÜRETİLDİ — elle düzenlemeyin: node tools/build_packs.js
 * Şema: { id, cat, tier(1-3), sub[], formation, geom, i18n: { lang: {...} } }
 */
GeoPacks.register("tr.gecitler", {
  version: 1,
  country: "tr",
  categories: ["gecitler"],
  items: [
    {"id":"gecit_gulek","cat":"gecitler","tier":1,"geom":{"t":"point","lat":37.25,"lng":34.79},"sub":["akdeniz"],"i18n":{"tr":{"name":"Gülek Boğazı / Geçidi","type":"Dağ Geçidi","region":"Akdeniz / Orta Toroslar","city":"Adana - Mersin (Pozantı)","note":"Çukurova'yı (Adana/Mersin) İç Anadolu'ya (Niğde/Pozantı) bağlayan, tarihten bu yana en işlek Toros geçididir."}}},
    {"id":"gecit_belen","cat":"gecitler","tier":1,"geom":{"t":"point","lat":36.49,"lng":36.2},"sub":["akdeniz"],"i18n":{"tr":{"name":"Belen Geçidi","type":"Dağ Geçidi","region":"Akdeniz / Amanos Dağları","city":"Hatay (İskenderun)","note":"Nur (Amanos) Dağları üzerinden İskenderun Limanı ve kıyısını Antakya/Amik Ovası ve Suriye'ye bağlar."}}},
    {"id":"gecit_sertavul","cat":"gecitler","tier":1,"geom":{"t":"point","lat":36.92,"lng":33.26},"sub":["akdeniz"],"i18n":{"tr":{"name":"Sertavul Geçidi","type":"Dağ Geçidi","region":"Akdeniz / Orta Toroslar","city":"Mersin - Karaman (Mut)","note":"Silifke ve Mersin kıyılarını Karaman üzerinden İç Anadolu'ya bağlar."}}},
    {"id":"gecit_cubuk","cat":"gecitler","tier":1,"geom":{"t":"point","lat":37.15,"lng":30.58},"sub":["akdeniz"],"i18n":{"tr":{"name":"Çubuk Boğazı / Geçidi","type":"Dağ Geçidi","region":"Akdeniz / Batı Toroslar","city":"Antalya - Burdur","note":"Antalya'yı Göller Yöresi'ne (Burdur/Isparta) bağlayan karstik boğaz geçididir."}}},
    {"id":"gecit_zigana","cat":"gecitler","tier":1,"geom":{"t":"point","lat":40.64,"lng":39.43},"sub":["karadeniz"],"i18n":{"tr":{"name":"Zigana (Kalkanlı) Geçidi","type":"Dağ Geçidi","region":"Karadeniz","city":"Trabzon - Gümüşhane","note":"Tarihi İpek Yolu güzergahında Trabzon Limanı'nı Gümüşhane ve Doğu Anadolu'ya bağlar. Yeni Zigana Tüneli Avrupa'nın en uzun tünellerindendir."}}},
    {"id":"gecit_kop","cat":"gecitler","tier":2,"geom":{"t":"point","lat":40.04,"lng":40.51},"sub":["karadeniz"],"i18n":{"tr":{"name":"Kop Geçidi","type":"Dağ Geçidi","region":"Doğu Karadeniz / Doğu Anadolu","city":"Bayburt - Erzurum","note":"Bayburt'u Erzurum'a ve Doğu Anadolu'ya bağlayan yüksek dağ geçididir."}}},
    {"id":"gecit_ovit","cat":"gecitler","tier":2,"geom":{"t":"point","lat":40.62,"lng":40.79},"sub":["karadeniz"],"i18n":{"tr":{"name":"Ovit Geçidi","type":"Dağ Geçidi","region":"Karadeniz / Doğu Anadolu","city":"Rize - Erzurum (İkizdere)","note":"Rize (İkizdere) ile Erzurum (İspir) arasındadır. Ovit Tüneli ile kışın kapanan yol yıl boyu açık hale getirilmiştir."}}},
    {"id":"gecit_ilgaz","cat":"gecitler","tier":2,"geom":{"t":"point","lat":41.07,"lng":33.74},"sub":["karadeniz"],"i18n":{"tr":{"name":"Ilgaz Geçidi","type":"Dağ Geçidi","region":"Karadeniz / İç Anadolu","city":"Kastamonu - Çankırı","note":"Kastamonu ile Çankırı/Ankara arasındaki Ilgaz Dağları'nı aşan geçittir."}}},
    {"id":"gecit_ecevit","cat":"gecitler","tier":2,"geom":{"t":"point","lat":41.8,"lng":33.72},"sub":["karadeniz"],"i18n":{"tr":{"name":"Ecevit Geçidi","type":"Dağ Geçidi","region":"Karadeniz","city":"Kastamonu (İnebolu)","note":"Küre Dağları'nı aşarak İnebolu Limanı'nı Kastamonu'ya bağlar (Milli Mücadele İstiklal Yolu)."}}},
    {"id":"gecit_bolu","cat":"gecitler","tier":3,"geom":{"t":"point","lat":40.75,"lng":31.35},"sub":["karadeniz"],"i18n":{"tr":{"name":"Bolu Dağı Geçidi","type":"Dağ Geçidi","region":"Karadeniz / Marmara","note":"İstanbul ile Ankara arasındaki en kritik dağ geçişidir. Bolu Dağı Tüneli ile ulaşım kolaylaşmıştır."}}},
    {"id":"bogaz_istanbul","cat":"gecitler","tier":1,"geom":{"t":"polyline","lat":41.12,"lng":29.05,"c":[[41.24,29.13],[41.13,29.07],[41.02,29]]},"sub":["bogazlar"],"i18n":{"tr":{"name":"İstanbul Boğazı (Bosphorus)","type":"Deniz Boğazı (Ria Kıyı / Su Yolu)","region":"Marmara (İstanbul)","city":"İstanbul","note":"Karadeniz ile Marmara'yı bağlayan dünyaca ünlü ria tipi su yoludur. Karadeniz'den Marmara'ya üst akıntı, Marmara'dan Karadeniz'e alt akıntı gerçekleşir."}}},
    {"id":"bogaz_canakkale","cat":"gecitler","tier":3,"geom":{"t":"polyline","lat":40.15,"lng":26.4,"c":[[40.4,26.68],[40.18,26.4],[40.03,26.2]]},"sub":["bogazlar"],"i18n":{"tr":{"name":"Çanakkale Boğazı (Dardanelles)","type":"Deniz Boğazı (Ria Kıyı / Su Yolu)","region":"Marmara / Ege","city":"Çanakkale","note":"Marmara Denizi ile Ege Denizi'ni bağlayan tarihi ve stratejik ria tipi boğazdır. En dar yeri Nara Burnu'dur."}}}
  ]
});
