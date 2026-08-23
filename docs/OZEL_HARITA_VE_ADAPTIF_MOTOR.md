# 🎨 KPSS Harita Quiz: Zorluk Sistemi, Ustalık Seyreltme, Alt Oluşum Filtreleri & Çizim Kılavuzu

Bu doküman; uygulamada yer alan **Alt Oluşum Türü Filtreleme**, **Coğrafi Mesafe Tabanlı 5 Kademeli Zorluk Sistemi**, **Ustalık Düzeyi & İyi Bilinenleri Seyreltme (Mastery Decay)**, **ÖSYM Çift Yönlü Test Formatları**, **Harita Çizim Editörü** ve **Doğrudan JSON Yapıştırma** sistemlerinin çalışma prensiplerini açıklar.

---

## 1. 🌋 Oluşum Türüne Göre Alt Kategori Filtreleme

Kullanıcı, ana kategori seçtikten sonra üst panelin hemen altındaki dinamik filtre haplarından (pills) belirli bir oluşum türünü seçerek **hem test hem de keşif modunda** yalnızca o konuya odaklanabilir:

- **🏔️ Dağlar:** `[Tüm Dağlar]` | `[🌋 Volkanik Dağlar]` | `[⚡ Kırık Dağlar (Horst)]` | `[⛰️ Kıvrım Dağları]`
- **🌾 Ovalar:** `[Tüm Ovalar]` | `[🏖️ Delta Ovaları]` | `[💥 Tektonik / Çöküntü]` | `[💧 Karstik (Polye)]`
- **⛰️ Platolar:** `[Tüm Platolar]` | `[🌋 Volkanik (Lav)]` | `[💧 Karstik Platolar]` | `[📉 Aşınım (Peneplen)]` | `[🥞 Tabaka Düzlüğü]`
- **🌊 Su Kaynakları:** `[Tüm Su Kaynakları]` | `[〰️ Akarsular / Nehirler (Polyline)]` | `[🏞️ Göller]`
- **🚪 Geçitler:** `[Tüm Geçitler]` | `[🌲 Karadeniz Geçitleri]` | `[☀️ Akdeniz Geçitleri]`
- **🚜 Tarım Ürünleri:** `[Tüm Tarım Ürünleri]` | `[🏭 Endüstri Bitkileri]` | `[🍑 Meyvecilik]` | `[🌾 Tahıl & Baklagil]` | `[🚢 İhraç Ürünleri]`
- **🐑 Hayvancılık Alanları:** `[Tüm Hayvancılık]` | `[🐂 Büyükbaş Mera]` | `[🐐 Küçükbaş]` | `[🐝 Arıcılık & Kümes]`
- **🏭 Sanayi & Tesisler:** `[Tüm Sanayi]` | `[⚙️ Demir-Çelik]` | `[🛢️ Rafineri]` | `[🧵 İmalat]`
- **🌡️ İklim & Uç Değerler:** `[Tüm İklim]` | `[🗺️ İklim Kuşakları]` | `[📈 Uç Değerler]` | `[🔍 Mikroklima]`
- **🌲 Orman & Bitki Örtüsü:** `[Tüm Bitki Örtüsü]` | `[🌳 Nemli Orman]` | `[🌲 İğne Yapraklı]` | `[🌿 Maki]` | `[🌾 Bozkır/Alpin]`
- **🎨 Çizimlerim:** `[Tümü]` | `[📍 Noktalar]` | `[📏 Çizgiler]` | `[📐 Alanlar]`

---

## 2. ⚡ Coğrafi Mesafe Tabanlı 5 Kademeli Zorluk Sistemi

Sistem, soruların basit kalmasını önlemek için çeldiricileri doğru cevabın koordinatlarına olan **Haversine Kuş Uçuşu Mesafesine (km)** göre seçer:

- **⭐ Seviye 1 (Kolay):** Çeldiriciler Türkiye geneline dağılır (Farklı coğrafi bölgeler, > 500 km).
- **⭐⭐ Seviye 2 (Orta-Kolay):** Çeldiriciler 350 - 500 km mesafeden seçilir.
- **⭐⭐⭐ Seviye 3 (Orta / Bölgesel):** Çeldiriciler aynı veya komşu coğrafi bölgelerden seçilir (~150 - 350 km).
- **⭐⭐⭐⭐ Seviye 4 (Zor / Aynı Yöre):** Çeldiriciler 75 - 150 km yakınlıktaki komşu yer şekillerinden seçilir.
- **⭐⭐⭐⭐⭐ Seviye 5 (Uzman / ÖSYM Eleme Modu):** Çeldiriciler **birbirine en yakın, adeta aynı dağ silsilesi / fay hattı / havzadaki en yakın komşulardan** seçilir! (Örn: Kaz Dağı sorulduğunda Madra, Yunt, Spil dağları gelir; hepsi Ege'de dip dibe olduğu için tam koordinat bilgisi gerektirir).

---

## 3. 🧠 Ustalık Düzeyi & İyi Bilinen Soruları Seyreltme (Mastery Decay)

Öğrencinin zaten ezberlediği sorularla vakit kaybetmesini önlemek için akıllı seyreltme devrededir:
- **Ustalaşılan Sorular (Seri $\ge 3$ Doğru):** Seçim ağırlığı $0.04 - 0.12$ bandına iner (%90-95 oranında havuzdan geri çekilir). Sadece uzun aralıklarla hafızayı yoklamak için nadiren gelir ve kartta `🎓 Ustalaşılan Soru` rozeti yanar.
- **Takılınan Sorular (Yanlış $\ge 1$):** Yanlış sayısı kadar ağırlığı katlanarak artar ve `⚠️ Sık Yanıldığın Soru` rozetiyle öncelikli olarak tekrar tekrar karşınıza çıkarılır.

---

## 4. 🎯 Çift Yönlü Test Formatları

- 📍 **İsimden Haritada Bul (ÖSYM Tipi I-V / A-E):** İsim verilir -> Haritada 2-5 adet parıldayan harita pini (I-V) belirir. Doğrudan haritadan veya klavyeden cevaplanır.
- 🔍 **Konumdan İsmi Bul (Klasik):** Haritada 1 yer parıldar -> Şıklardan ismi bulunur.
- 🎲 **Karışık Sürpriz Modu:** Her soruda rastgele bir mod gelir.

---

## 5. 📋 Doğrudan JSON Yapıştırma & Harita Katmanları
- NotebookLM çıktısını kopyalayıp dosyasız tek tıkla yapıştırma desteği.
- 5 Harita Katmanı (Sade, Fiziki, Gerçek Uydu, Gece, Kabartı) ve açılıp kapanabilir Otomatik Odak (Auto-Zoom).

---

## 6. 🛡️ Cevap İfşası (Spoiler) Önleme Sistemi
Soru kökü ve şık butonları arasında ipucu sızmasını önleyen çift yönlü koruma:
- **`find_on_map` (Haritada Bul) Modunda:** Şık butonlarında şehir isimleri (`📍 Erzurum`) tamamen gizlenerek ÖSYM formatında `A) I. Konum (A Pini)`, `B) II. Konum (B Pini)` gösterilir. Öğrenci haritadaki pini ve coğrafi konumu incelemek zorunda kalır.
- **Soru Başlıklarında:** İklim ve ilişkili sorularda soru başlığı doğrudan soru niteliğini sorar (`Türkiye'de kışların en sert ve soğuk geçtiği yöre haritada neresidir?`), cevap şehri soru kökünde açık edilmez.

---

## 7. 🗺️ Bölgesel Alan (Polygon) Geometrisi
Tek bir nokta ile sınırlı kalmayan geniş coğrafi varlıklar için dinamik poligonlar:
- **Tarım & Hayvancılık:** Doğu Karadeniz Fındık/Çay Kuşağı, Çukurova Deltası, GAP Harran Pamuk Havzası, Erzurum-Kars Alpin Çayır Platosu, Teke-Taşeli Karstik Kıl Keçisi Alanları.
- **Sanayi:** İzmit Petrokimya Havzası, Bursa Otomotiv Kuşağı, İskenderun ve Ereğli Demir-Çelik Havzaları.
- **İklim Kuşakları:** Akdeniz, Karadeniz ve Karasal İklim Kuşakları ile Uç Değer (Iğdır Çukur Mikroklima, Hopa Yağış Kuşağı, Cizre Sıcaklık Sahası) poligonları.

