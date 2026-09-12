# 🏛️ KPSS Coğrafya Harita Ezber Uygulaması - Mimari Doküman

## 🎯 Projenin Amacı
Bu uygulama, KPSS adaylarının Türkiye fiziki coğrafyasında yer alan kritik konumları (Dağlar, Ovalar, Platolar, Akarsular, Göller ve Geçitler) harita üzerinde görsel hafızaya kazımaları, kendi özel şekil/hatlarını çizerek kişisel test havuzları oluşturmaları ve yapay zeka/adaptif algoritmalarla en çok zorlandıkları soruları pekiştirmeleri için tasarlanmış bağımsız bir web uygulamasıdır.

## 🧱 Modüler Mimari

1. **`index.html`**:
   - Saf, hızlı ve modüler kullanıcı arayüzü.
   - Harita alanı, kategori seçim çubuğu, çizim araç çubuğu, dinamik şık seçici (2, 3, 4, 5 şık), soru ve seçenek paneli, KPSS bilgi kartı, çizim ve yedekleme modalları.

2. **`css/style.css`**:
   - Modern, göz yormayan karanlık/vurgulu estetik.
   - Dikkat dağıtmayan odak paneli, animasyonlu nabız (pulse) işaretçileri, parıldayan çizgi (polyline) ve alan (polygon) SVG filtreleri.
   - 2-5 şıklı dinamik ızgara ve mobil uyumlu responsive tasarım.

3. **`data/` — Paket (DLC) Veri Katmanı** _(bkz. [PAKET_SISTEMI.md](PAKET_SISTEMI.md))_:
   - `cografya_data.legacy.js`: yazım kaynağı — yer şekillerinin koordinatları, oluşum tipleri ve hap sınav notları. Uygulamaya **yüklenmez**, yalnızca derleyici okur.
   - `packs/catalog.js` + `packs/pack.tr.*.js`: kurulabilir konu paketleri. Her kayıt bir detay kademesi (1-3), dilden bağımsız alt tür anahtarları ve çok dilli `i18n` bloğu taşır.
   - `cografya_data.js`: artık **boş çalışma zamanı kaplarıdır**. `PackManager`, kullanıcının kurduğu paketlerden `COGRAFYA_DATA` / `CATEGORIES` / `SUB_TYPES`'ı yerinde yeniden inşa eder.

4. **`js/custom_draw.js` (YENİ)**:
   - Kullanıcının haritaya eklediği serbest Nokta (Point), Çizgi/Hat (Polyline) ve Geometrik Alanların (Polygon) LocalStorage üzerinde yönetimi.
   - JSON formatında Dışa Aktarma (Export) ve İçe Aktarma (Import) yedekleme motoru.

5. **`js/map.js`**:
   - Leaflet.js entegrasyonu.
   - Kapsam odaklı harita yönetimi (Sade ve Fiziki/Kabartı katmanları). Harita tüm
     dünyada gezilebilir; **ev görünümü** (`setHomeView`) Türkiye ya da Dünya
     kapsamına göre `GeoScope` tarafından yazılır.
   - Çoklu geometri vurgulama motoru (Nokta nabzı, animasyonlu kesikli çizgi, taranmış parıltılı çokgen).
   - İnteraktif serbest çizim motoru (Vertex markers, kılavuz çizgiler, geri alma).

6. **`js/globe_view.js` (YENİ)**:
   - 🌍 Küre görünümü: MapLibre GL v5 `globe` projeksiyonu ile gerçek bir gezegen.
     Leaflet'in yerine geçmez, harita görünüm listesine altıncı seçenek olarak girer
     ve kabı Leaflet'in üstünü kaplar; kapanınca uygulama düz haritaya döner.
   - Kütüphane TEMBEL yüklenir (1 MB); pin ve şık markup'ı `GeographyMap` ile
     ortaktır, bu yüzden cevap renklendirmesi küre üzerinde de çalışır.
   - Küre tıklaması Leaflet'te sentetik `click` tetikler: Kör Atış ve Koordinat
     Avcısı hiç değişmeden küre üzerinde çalışır.
   - Gök mekaniği `js/globe_sky.js`'e devredilir (aşağıya bakın); bu dosya yalnızca
     ışık/gökyüzü rengini yazar, zaman durumunu tutar ve katmanları sıraya dizer.
   - Ayrıntı: [PAKET_SISTEMI.md](PAKET_SISTEMI.md) § Küre görünümü.

7. **`js/globe_sky.js` (YENİ)**:
   - 🌌 Kürenin gerçekçilik çekirdeği. Üç parça:
     - **`GokMekanigi`** — saf matematik, WebGL'e dokunmaz: alt-güneş noktası
       (Astronomical Almanac güneş formülü), GMST, küre birim vektörleri ve
       MapLibre `light.position` çevirimi. Dünya-sabit → view dönüşümü
       MapLibre'nin kendi `light` zincirinin birebir kopyasıdır; aksi hâlde bizim
       terminatörümüz ile MapLibre'nin atmosfer parlaması birbirinden kayar.
     - **`YildizKatmani`** — `data/yildiz_katalogu.js`'teki 5070 gerçek yıldızı
       (HYG v3.8, kadir ≤ 6.0) gök küresine çizer + prosedürel Samanyolu.
       ra/dec göksel çerçevede saklanır, GMST döndürmesi vertex shader'da tek
       uniform ile yapılır: zaman değişince tampon yeniden yüklenmez.
     - **`GeceKatmani`** — her piksel için ışın-küre kesişimi ile güneş
       yükseltisini bulur: gerçek terminatör, gün batımı halkası ve NASA GIBS
       Black Marble şehir ışıkları (shader'da terminatörle maskelenir).
   - **Neden bu dosya var**: küre önce MapLibre'nin hazır çıktısıyla yetiniyordu ve
     "güneş" diye bir şey yoktu (parlama `light.anchor: viewport` ile EKRANA
     çiviliydi), yıldızlar CSS `radial-gradient` noktalarıydı (WebGL tuvalinin
     arkasındaki DOM katmanında) ve gündüz/gece sınırı hiç yoktu. Kusur kameranın
     hareketi değil, güneş ile yıldızların REFERANS ÇERÇEVESİYDİ — ikisi de dünya
     uzayında değildi. Ayrıntılı gerekçe dosyanın kendi başlığındadır.
   - Katman sırası bağlayıcıdır: `gok-yildiz → taban → etiket → gok-gece → sekil-*`.
     Gece örtüsü bilinçli olarak şekillerin ALTINDADIR; üstte olsa sınav
     şekillerini ve pinlerini de karartırdı.
   - `tools/build_star_catalog.js` kataloğu HYG'den yeniden üretir.

8. **`js/quiz.js`**:
   - **Adaptif Soru Motoru (Spaced Repetition)**: Kullanıcının her soru için hata ve başarı geçmişini izleyerek en çok yanlış yapılan soruları ağırlıklı rastgele (Roulette Wheel) seçimiyle daha sık karşısına çıkarma.
   - **Dinamik Şık Motoru**: 2, 3, 4 veya 5 (A-B-C-D-E ÖSYM formatı) şık üretimi ve çeldirici yönetimi.
   - **Soru Kökü Motoru**: veride elle yazılmış KPSS soru kökleri (`promptTitle`) cevabın adını/ilini ele vermiyorsa jenerik kalıbın yerine geçer; kategori ve şekil (nokta/alan/çizgi/bağlı grup) başına ayrı soru kalıpları. Ayrıntı: [OZEL_HARITA_VE_ADAPTIF_MOTOR.md](OZEL_HARITA_VE_ADAPTIF_MOTOR.md) §18.

9. **`js/app.js`**:
   - Çizim editörü akışı, mod yönetimi (Quiz, Keşif, Çizim), klavye kısayolları (1-5 ve A-E tuşları, Space/Enter ile geçiş).

10. **`js/pack_manager.js` + `js/pack_store_ui.js` (YENİ)**:
   - DLC motoru: paketlerin lazy indirilmesi, kademe (az/orta/tam) eşiği, kaldırma, oyun modu kilitleri ve `packs:changed` yayını.
   - İlk giriş rehberi ve Paket Mağazası arayüzü.
   - **`GeoScope` (kapsam çözücü)**: paket kimliğinin ülke kısmından (`tr.*` / `world.*`)
     haritanın ev görünümünü (merkez/zoom) ve mesafe tabanlı puanlamanın ölçek
     katsayısını çözer. Böylece Türkiye ve Dünya kapsamları aynı motorlarla,
     kendi ölçeklerinde çalışır. Ayrıntı: [PAKET_SISTEMI.md](PAKET_SISTEMI.md) § Dünya Modülü.

11. **`data/hafiza_kodlari.js` + `js/hafiza_kodu.js` (YENİ)**:
   - Hafıza Kodu Atölyesi: müfredatın mnemonic (hikâye) katmanı. Paket sisteminden bağımsızdır.
   - Tek kaynak ilkesi: her kod `[[imge|gerçek]]` işaretli TEK bir hikâye metnidir; eşleştirme, boşluk doldurma, sıralama, kaçak yakalama, ters kod ve harita damgası turlarının hepsi bu metinden türetilir.
   - Ustalık defteri (`kpss_hafiza_kodu_ustalik`) zayıf kodlara ağırlık verir; tur tipi dağılımı `1/√bolluk` ile dengelenir.
   - Galeri üreteci (`HafizaGaleri`) 68 kodu hikâyesi, çözüm tablosu, püf notu ve ustalık çubuğuyla listeler.

12. **`js/i18n.js` + `locales/*.js` (YENİ)**:
   - Çift katmanlı dil motoru: arayüz metinleri (`GeoI18n.t`) ve coğrafi varlık çevirileri (`GeoI18n.pick`) birbirinden bağımsız yönetilir.
