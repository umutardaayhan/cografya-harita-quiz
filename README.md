# 🌍 Coğrafya Harita Lab / GeoQuiz ⚡

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Leaflet](https://img.shields.io/badge/Leaflet.js-1.9.4-199900?style=flat&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Modern_Glassmorphism-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> 🌐 **Live Demo / Canlı Site:** [https://cografya-harita-quiz.vercel.app](https://cografya-harita-quiz.vercel.app)

---

<div align="center">
  <h3>
    <a href="#-türkçe">🇹🇷 Türkçe</a> |
    <a href="#-english">🇬🇧 English</a>
  </h3>
</div>

---

<a name="-türkçe"></a>
## 🇹🇷 Türkçe

### 📌 Proje Hakkında
**Coğrafya Harita Lab**, Türkiye fiziki ve beşeri coğrafyasını görsel hafıza, interaktif harita katmanları ve oyunlaştırılmış bilişsel algoritmalarla kalıcı olarak öğrenmeyi sağlayan yeni nesil bir harita ve test platformudur. 

Özellikle KPSS, YKS ve genel coğrafya sınavlarına hazırlanan adaylar için tasarlanmış olup; klasik ezber yöntemlerini terk ederek **Haversine formülü tabanlı coğrafi mesafe zorluk motoru**, **Spaced Repetition (Ustalık Seyreltme)** ve **Etkileşimli Oyun Modları** sunar.

---

### ✨ Öne Çıkan Özellikler

#### 📦 1. Paket (DLC) Sistemi & Kişisel Müfredat
- **18 Konu Paketi / 472 Kayıt:** Dağlar, sular, ovalar, geçitler, iklim, **toprak tipleri**, **doğal afetler**, **fay hatları**, **kıyılar & adalar**, **dış kuvvetler**, **nüfus & göç**, **7 bölge & 21 bölüm**, tarım-sanayi, **madenler & enerji**, **turizm**, **ulaşım** ve matematiksel konum. Her şeye erişim yerine yalnızca çalışmak istediğin konuları indirirsin; harita, testler, günlük plan ve oyun modları indirdiğin paketlere göre şekillenir.
- **3 Detay Kademesi:** Her paket `Az` (sınav rekorları), `Orta` (sık sorulanlar) veya `Tam` (her kayıt) olarak kurulabilir; kademe sonradan yükseltilebilir, ilerleme korunur.
- **Mod & Katman Kilitleri:** Şekil Yapbozu ilişki paketiyle, Matematiksel Konum modülleri kendi paketiyle açılır. Harita görünümleri de pakete bağlıdır (Uydu → Turizm/Kıyılar, Kabartı → Dağlar/Fay, Gece → Matematiksel Konum).
- **Toplu İşlemler:** Mağazadan tek tıkla tüm paketleri kur ya da tümünü kaldır; soru geçmişin korunur.
- **İlk Giriş Rehberi:** Siteye ilk gelen kullanıcı haritayla değil, 3 adımlık rehber ve Paket Mağazası ile karşılaşır.
- **Ölçeklenebilir Mağaza:** Grup sekmeleri (Fiziki / Beşeri / Ekonomik / Modüller), Türkçe-güvenli arama ve sayfalama ile yüzlerce pakete kadar açılır.
- Ayrıntılı mimari: [docs/PAKET_SISTEMI.md](docs/PAKET_SISTEMI.md)

#### 🧠 2. Adaptif Soru & Ustalık Motoru (Spaced Repetition)
- **Rulet Tekerleği Algoritması:** Öğrencinin geçmiş başarı/hata verilerini takip eder.
- **Ustalık Seyreltme (Mastery Decay):** Art arda doğru bilinen soruların ağırlığı %90-95 oranında azaltılarak havuzdan seyreltilir.
- **Odak Rozetleri:** Sık hata yapılan sorular `⚠️ Sık Yanıldığın Soru`, pekişenler `🎓 Ustalaşılan Soru` rozetiyle işaretlenir.

#### ⚡ 3. Mesafe Tabanlı 5 Kademeli Akıllı Zorluk
- **Seviye 1 (Kolay):** Çeldiriciler Türkiye geneline yayılır (> 500 km).
- **Seviye 3 (Orta / Bölgesel):** Çeldiriciler aynı veya komşu bölgelerden seçilir (~150-350 km).
- **Seviye 5 (Uzman / ÖSYM Eleme Modu):** Çeldiriciler aynı fay hattı veya sıradağdaki **en yakın komşulardan** seçilir (Gerçek coğrafi ayrım gücü).

#### 🎮 4. İnteraktif Oyun Modları
- 🎯 **Kör Atış (GeoGuessr) Modu:** Dilsiz haritada serbest tıklama ile tahmin yapın, kuş uçuşu km sapma mesafesi ve radar halkaları ile puan toplayın.
- ⚔️ **Harita Fatihi:** 7 coğrafi bölge bazında soruları çözerek bölgeleri fethedin (%0-100) ve Türkiye haritasını renginize boyayın.
- 🧩 **Şekil Yapbozu (Match & Blast):** Akarsu-Delta, Dağ-Geçit ve Şekil-Şehir kartlarını zamana karşı kombo çarpanlarıyla eşleştirip patlatın.
- 🎨 **Harita Boyama & Şekil Oluşum Quizi:** Karstik, tektonik ve volkanik şekilleri harita üzerinde sınıflandırın.

#### 🧭 5. Mutlak Konum & Coğrafi Hesaplama Laboratuvarı
- Türkiye'nin uç noktaları (26°-45° Doğu, 36°-42° Kuzey), yerel saat farkları, gölge boyu ve güneş açısı simülasyonları.

#### 🛠️ 6. Özel Harita Çizim Editörü & NotebookLM Entegrasyonu
- Harita üzerine serbest Nokta (Marker), Hat/Çizgi (Polyline) ve Geometrik Alan (Polygon) çizebilme.
- JSON Dışa/İçe Aktarma (Export/Import) ve NotebookLM/AI çıktısını tek tıkla yapıştırma desteği.

#### 🔇 7. Dilsiz Harita & 5 Katman Desteği
- Tüm şehir ve yol yazılarını tek tıkla gizleyen **Sınav Tipi Dilsiz Harita**.
- Sade, Fiziki, Gerçek Uydu, Gece Modu ve Kabartı harita katmanları.

---

### ⌨️ Klavye Kısayolları

| Tuş | İşlev |
| :--- | :--- |
| `1` - `5` veya `A` - `E` | Test şıklarını hızlıca seçme |
| `Space` / `Enter` | Sonraki Soruya geçiş |
| `S` | Soru panelini küçült / büyüt |
| `M` | Dilsiz Harita modunu aç / kapat |

---

### 🛠️ Teknoloji Yığını (Tech Stack)

| Bileşen | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Frontend** | Vanilla JavaScript (ES6+), HTML5 | Sıfır bağımlılık, ultra hafif ve hızlı çekirdek |
| **Harita Motoru** | Leaflet.js v1.9.4 | Özel SVG filtreleri, dinamik katmanlar ve işaretçiler |
| **Stil & Arayüz** | Modern CSS3 (Glassmorphism) | Sivri köşeli modern koyu tema, responsive mobil uyum |
| **Veri & Dağıtım** | Paket (DLC) mimarisi | Lazy yüklenen konu paketleri, 3 detay kademesi, çok dilli kayıt şeması |
| **Kalıcılık** | LocalStorage API | Kurulu paketler, çizimler, çalışma planı ve soru geçmişi tarayıcıda güvende |
| **Dağıtım (Deploy)**| Vercel | Statik SPA yönlendirmesi ve optimize önbellek yapılandırması |

---

### 🚀 Kurulum ve Yerel Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için herhangi bir build aracına ihtiyaç yoktur:

1. **Repoyu klonlayın:**
   ```bash
   git clone https://github.com/umutardaayhan/cografya-harita-quiz.git
   cd cografya-harita-quiz
   ```

2. **Herhangi bir yerel sunucu ile çalıştırın (veya doğrudan `index.html` dosyasını açın):**
   ```bash
   # VS Code Live Server veya Python ile:
   python -m http.server 3000
   ```

3. **Tarayıcınızda açın:** `http://localhost:3000`

---

### 🌐 Vercel Üzerinde Yayınlama

1. GitHub reponuzu Vercel hesabınıza bağlayın.
2. Root Directory olarak ana dizini seçin (Framework Preset: **Other**).
3. **Deploy** butonuna tıklayın; `vercel.json` otomatik olarak yapılandırmayı tamamlayacaktır.

---

<a name="-english"></a>
## 🇬🇧 English

### 📌 About the Project
**GeoQuiz / Geography Map Lab** is an interactive, gamified web platform engineered for mastering geographical entities, landforms, and spatial reasoning through visual memory and cognitive algorithms.

While initially tailored for Turkish physical and human geography (KPSS / YKS national exam standards), its underlying modular engine is designed to scale into **global geography, multi-language support, and custom world maps**.

---

### 🌟 Key Features

- 📦 **Pack (DLC) System:** Topics ship as installable packs with three detail levels (Light / Medium / Full). You download only what you want to study, and the map, quizzes, daily plan and game modes are shaped by your installed packs. See [docs/PAKET_SISTEMI.md](docs/PAKET_SISTEMI.md).
- 🌐 **Dual-Layer i18n Core:** Interface strings and geographic entity names are translated independently; landform classification uses language-neutral keys, so the engine survives translation.
- 🧠 **Spaced Repetition & Adaptive Engine:** Tracks success rates and selectively decreases the frequency of mastered questions (Mastery Decay) while surfacing challenging concepts.
- ⚡ **5-Tier Distance-Based Difficulty (Haversine Algorithm):** Distractors are chosen based on geographical distance (from nationwide spread to closest geological neighbors).
- 🎯 **Interactive Game Modes:**
  - **GeoGuessr (Blind Shot):** Free click on mute map, distance error calculation in km, and radar feedback.
  - **Map Conqueror:** Answer questions to liberate and conquer 7 geographical regions (0-100%).
  - **Match & Blast Puzzle:** Fast-paced association game for rivers-deltas, mountains-passes, and shapes.
- 🛠️ **Custom Vector Drawing Studio:** Draw points, polylines, and polygons on the live map with instant JSON Export/Import and AI/NotebookLM clipboard pasting.
- 🔇 **Mute / Blind Map Mode:** Toggle labels off for true blind exam simulations.
- 🧭 **Mathematical Location Lab:** Sun angle, local time differentials, shadow length, and daylight calculations.
- 📱 **Modern Glassmorphic UI:** Fast, zero-dependency, dark-mode design with responsive layout and keyboard accessibility.

---

### 🗺️ Future Roadmap & Global Expansion
- 🌍 **Internationalization (i18n):** Multi-language interface (English, German, Spanish, etc.).
- 🌐 **World Geography Modules:** World mountain ranges, river basins, tectonic plates, capitals, and geopolitical borders.
- ☁️ **Cloud Sync:** Multi-device synchronization for custom drawing decks.

---

## 📄 License / Lisans
Bu proje [MIT](LICENSE) lisansı altında korunmaktadır.

---

<p align="center">
  <sub>Made with ❤️ by <a href="https://github.com/umutardaayhan">@umutardaayhan</a></sub>
</p>
