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

7. **`js/solar.js` (YENİ)**:
   - ☀️ ASTRONOMİ ÇEKİRDEĞİ: güneşin o anda dik vurduğu nokta (deklinasyon +
     Greenwich saat açısı + GMST) ve verilen bir noktadaki güneş yüksekliği.
   - `mutlak_konum.js` içindeki sadeleştirilmiş öğretici hesaplardan AYRIDIR
     (orada 21 Haziran = sabit 23,45°, yalnızca öğle açısı). Karıştırılmadı;
     oradaki müfredata uygun basitlik bozulmadı.
   - Node'dan da çalışır (`module.exports`), bu yüzden birim testi var:
     `node tools/solar_test.js`. Test ayrıca `globe_sky.js`'in shader'da
     kullandığı `dot(yüzeyNormali, güneşYönü)` ölçütünü, buradaki bağımsız
     küresel trigonometri formülüyle çapraz doğrular.
   - Gece-gündüz sınırı eskiden burada POLİGON olarak üretiliyordu
     (`nightPolygon` + üç alacakaranlık dolgusu); terminatör artık piksel başına
     shader'da çizildiği için o matematik kaldırıldı.

8. **`js/globe_sky.js` (YENİ)**:
   - 🌌 Kürenin gerçekçilik çekirdeği. Üç parça:
     - **`GokMekanigi`** — saf matematik, WebGL'e dokunmaz: küre birim
       vektörleri, MapLibre `light.position` çevirimi ve Dünya-sabit → view
       dönüşümü. Bu dönüşüm MapLibre'nin kendi `light` zincirinin birebir
       kopyasıdır; aksi hâlde bizim terminatörümüz ile MapLibre'nin atmosfer
       parlaması birbirinden kayar. Alt-güneş noktası hesabı `solar.js`'e
       devredilir — aynı formülü iki yerde tutmak sessiz sapma kaynağıdır.
     - **`YildizKatmani`** — `data/yildiz_katalogu.js`'teki 5070 gerçek yıldızı
       (HYG v3.8, kadir ≤ 6.0) gök küresine çizer + prosedürel Samanyolu.
       ra/dec göksel çerçevede saklanır, GMST döndürmesi vertex shader'da tek
       uniform ile yapılır: zaman değişince tampon yeniden yüklenmez.
     - **`GeceKatmani`** — her piksel için ışın-küre kesişimi ile güneş
       yükseltisini bulur: gerçek terminatör, gün batımı halkası ve NASA GIBS
       Black Marble şehir ışıkları (shader'da terminatörle maskelenir).
   - **Neden bu dosya var**: Ultra Gerçekçi Mod'un ilk sürümünde yıldızlar
     `<canvas>` ile, güneş de bir `<div>` diski ile çiziliyordu; ikisi de
     MapLibre tuvalinin ARKASINDA, sayfa koordinatlarındaydı. Yani kamera
     döndüğünde yıldızlar kıpırdamıyor, güneş diski de silüetin kenarına
     "yapıştırılmış" gibi duruyordu. Kusur kameranın hareketi değil, güneş ile
     yıldızların REFERANS ÇERÇEVESİYDİ — ikisi de dünya uzayında değildi.
     Ayrıntılı gerekçe dosyanın kendi başlığındadır.
   - Katman sırası bağlayıcıdır: `gok-yildiz → taban → etiket → gok-gece → sekil-*`.
     Gece örtüsü bilinçli olarak şekillerin ALTINDADIR; üstte olsa sınav
     şekillerini ve pinlerini de karartırdı.
   - **Ultra ana anahtarı** (`GlobeView.setUltraRealistic`, sol alt panelde
     "🌞 Ultra Gerçekçi" düğmesi): kapalıyken katmanlar yerinde durur ama
     yoğunluğu 0 döner, yani tek piksel çizilmez. Shader programlarını ve
     5070 yıldızlık tamponu her açma-kapamada yeniden kurmamak için.
   - `tools/build_star_catalog.js` kataloğu HYG'den yeniden üretir.

9. **`js/quiz.js`**:
   - **Adaptif Soru Motoru (Spaced Repetition)**: Kullanıcının her soru için hata ve başarı geçmişini izleyerek en çok yanlış yapılan soruları ağırlıklı rastgele (Roulette Wheel) seçimiyle daha sık karşısına çıkarma.
   - **Dinamik Şık Motoru**: 2, 3, 4 veya 5 (A-B-C-D-E ÖSYM formatı) şık üretimi ve çeldirici yönetimi.
   - **Soru Metni Kuralı**: soru metni yalnızca yapının adı (`find_on_map`) ya da kategori + şekil başına kısa bir kalıptır (`identify`, bağlı grup). Veride elle yazılmış uzun KPSS kökleri (`promptTitle`, `questionText`) soru başlığında hiç kullanılmaz; cevap sonrası hap kartında **Tanım** olarak gösterilir. Ayrıntı: [OZEL_HARITA_VE_ADAPTIF_MOTOR.md](OZEL_HARITA_VE_ADAPTIF_MOTOR.md) §18.

10. **`js/app.js`**:
   - Çizim editörü akışı, mod yönetimi (Quiz, Keşif, Çizim), klavye kısayolları (1-5 ve A-E tuşları, Space/Enter ile geçiş).

11. **`js/pack_manager.js` + `js/pack_store_ui.js` (YENİ)**:
   - DLC motoru: paketlerin lazy indirilmesi, kademe (az/orta/tam) eşiği, kaldırma, oyun modu kilitleri ve `packs:changed` yayını.
   - İlk giriş rehberi ve Paket Mağazası arayüzü.
   - **`GeoScope` (kapsam çözücü)**: paket kimliğinin ülke kısmından (`tr.*` / `world.*`)
     haritanın ev görünümünü (merkez/zoom) ve mesafe tabanlı puanlamanın ölçek
     katsayısını çözer. Böylece Türkiye ve Dünya kapsamları aynı motorlarla,
     kendi ölçeklerinde çalışır. Ayrıntı: [PAKET_SISTEMI.md](PAKET_SISTEMI.md) § Dünya Modülü.

12. **`data/hafiza_kodlari.js` + `js/hafiza_kodu.js` (YENİ)**:
   - Hafıza Kodu Atölyesi: müfredatın mnemonic (hikâye) katmanı. Paket sisteminden bağımsızdır.
   - Tek kaynak ilkesi: her kod `[[imge|gerçek]]` işaretli TEK bir hikâye metnidir; eşleştirme, boşluk doldurma, sıralama, kaçak yakalama, ters kod ve harita damgası turlarının hepsi bu metinden türetilir.
   - Ustalık defteri (`kpss_hafiza_kodu_ustalik`) zayıf kodlara ağırlık verir; tur tipi dağılımı `1/√bolluk` ile dengelenir.
   - Galeri üreteci (`HafizaGaleri`) 68 kodu hikâyesi, çözüm tablosu, püf notu ve ustalık çubuğuyla listeler.

13. **`js/i18n.js` + `locales/*.js` (YENİ)**:
   - Çift katmanlı dil motoru: arayüz metinleri (`GeoI18n.t`) ve coğrafi varlık çevirileri (`GeoI18n.pick`) birbirinden bağımsız yönetilir.
