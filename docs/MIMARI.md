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

3. **`data/cografya_data.js`**:
   - KPSS sınavlarında en çok soru gelen yer şekillerinin koordinatları, oluşum tipleri (kıvrım, kırık, volkanik, karstik vb.) ve hap sınav notları.

4. **`js/custom_draw.js` (YENİ)**:
   - Kullanıcının haritaya eklediği serbest Nokta (Point), Çizgi/Hat (Polyline) ve Geometrik Alanların (Polygon) LocalStorage üzerinde yönetimi.
   - JSON formatında Dışa Aktarma (Export) ve İçe Aktarma (Import) yedekleme motoru.

5. **`js/map.js`**:
   - Leaflet.js entegrasyonu.
   - Türkiye sınırları odaklı harita yönetimi (Sade ve Fiziki/Kabartı katmanları).
   - Çoklu geometri vurgulama motoru (Nokta nabzı, animasyonlu kesikli çizgi, taranmış parıltılı çokgen).
   - İnteraktif serbest çizim motoru (Vertex markers, kılavuz çizgiler, geri alma).

6. **`js/quiz.js`**:
   - **Adaptif Soru Motoru (Spaced Repetition)**: Kullanıcının her soru için hata ve başarı geçmişini izleyerek en çok yanlış yapılan soruları ağırlıklı rastgele (Roulette Wheel) seçimiyle daha sık karşısına çıkarma.
   - **Dinamik Şık Motoru**: 2, 3, 4 veya 5 (A-B-C-D-E ÖSYM formatı) şık üretimi ve çeldirici yönetimi.
   - Çizgi ve Poligon sorularına özel dinamik soru başlıkları.

7. **`js/app.js`**:
   - Çizim editörü akışı, mod yönetimi (Quiz, Keşif, Çizim), klavye kısayolları (1-5 ve A-E tuşları, Space/Enter ile geçiş).
