# 🏛️ KPSS Coğrafya Harita Ezber Uygulaması - Mimari Doküman

## 🎯 Projenin Amacı
Bu uygulama, KPSS adaylarının Türkiye fiziki coğrafyasında yer alan kritik konumları (Dağlar, Ovalar, Platolar, Akarsular, Göller ve Geçitler) harita üzerinde görsel hafızaya kazımaları ve test ederek pekiştirmeleri için tasarlanmış bağımsız bir web uygulamasıdır.

## 🧱 Modüler Mimari

1. **`index.html`**:
   - Saf, gereksiz sayfalardan ve ağırlıktan arındırılmış kullanıcı arayüzü.
   - Harita alanı, kategori seçim çubuğu, soru ve seçenek paneli, KPSS bilgi kartı.

2. **`css/style.css`**:
   - Modern, göz yormayan karanlık/vurgulu estetik.
   - Dikkat dağıtmayan odak paneli, animasyonlu harita nabız (pulse) işaretçileri.

3. **`data/cografya_data.js`**:
   - KPSS sınavlarında en çok soru gelen yer şekillerinin koordinatları, oluşum tipleri (kıvrım, kırık, volkanik, karstik vb.) ve hap sınav notları.

4. **`js/map.js`**:
   - Leaflet.js entegrasyonu.
   - Türkiye sınırları odaklı harita yönetimi.
   - Standart ve Fiziki/Kabartı harita katmanları.
   - Özel parlak soru işaretçisi ve keşif modu etiketleri.

5. **`js/quiz.js`**:
   - Soru üretimi, çeldirici seçimi, skorlama, seri takibi.
   - Yanlış yapılan soruları tekrar sorma mekanizması.

6. **`js/app.js`**:
   - Olay dinleyicileri (kategori değişimi, klavye kısayolları 1-4, mod geçişleri).
