# 🌍 Coğrafya Harita Lab / GeoQuiz ⚡

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Leaflet](https://img.shields.io/badge/Leaflet.js-1.9.4-199900?style=flat&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Modern_Glassmorphism-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Packs](https://img.shields.io/badge/Paketler-18_paket_·_472_kayıt-8b5cf6?style=flat)](docs/PAKET_SISTEMI.md)
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

Veri katmanı **kurulabilir konu paketlerine** bölünmüştür: kullanıcı her şeye değil, yalnızca çalışmak istediği konulara erişir.

---

### ✨ Öne Çıkan Özellikler

#### 📦 1. Paket (DLC) Sistemi & Kişisel Müfredat
- **18 Konu Paketi / 472 Kayıt:** Dağlar, akarsu & göller, ovalar & platolar, geçitler, iklim & bitki örtüsü, toprak tipleri, doğal afetler, fay hatları, kıyılar & adalar, dış kuvvetler, nüfus & göç, 7 bölge & 21 bölüm, tarım-hayvancılık-sanayi, madenler & enerji, turizm, ulaşım ve matematiksel konum.
- **3 Detay Kademesi:** Her paket `Az` (sınav rekorları), `Orta` (sık sorulanlar) veya `Tam` (her kayıt) olarak kurulur. Kademe sonradan yükseltilebilir; ilerleme korunur.
- **Mod & Katman Kilitleri:** Şekil Yapbozu ilişki paketiyle, Matematiksel Konum modülleri kendi paketiyle açılır. Harita görünümleri de pakete bağlıdır (Uydu → Turizm/Kıyılar, Kabartı → Dağlar/Fay, Gece → Matematiksel Konum).
- **Toplu İşlemler:** Mağazadan tek tıkla tüm paketleri kur ya da tümünü kaldır; soru geçmişin her koşulda korunur.
- **İlk Giriş Rehberi:** Siteye ilk gelen kullanıcı haritayla değil, 3 adımlık rehber ve Paket Mağazası ile karşılaşır.
- **Ölçeklenebilir Mağaza:** Grup sekmeleri (Fiziki / Beşeri / Ekonomik / Modüller), Türkçe-güvenli arama ve sayfalama ile yüzlerce pakete kadar açılır.

> 📖 Mimari ve yazım kılavuzu: **[docs/PAKET_SISTEMI.md](docs/PAKET_SISTEMI.md)**

#### 🧠 2. Adaptif Soru & Ustalık Motoru (Spaced Repetition)
- **Rulet Tekerleği Algoritması:** Öğrencinin geçmiş başarı/hata verilerini takip eder.
- **Ustalık Seyreltme (Mastery Decay):** Art arda doğru bilinen soruların ağırlığı %90-95 oranında azaltılarak havuzdan seyreltilir.
- **Odak Rozetleri:** Sık hata yapılan sorular `⚠️ Sık Yanıldığın Soru`, pekişenler `🎓 Ustalaşılan Soru` rozetiyle işaretlenir.
- **Bugünün Planı:** Yeni / Tekrar / Yanlışlar fazlarından oluşan günlük paket, kurulu paketlerden türetilir ve günlük bütçeyle sınırlanır.

#### ⚡ 3. Mesafe Tabanlı 5 Kademeli Akıllı Zorluk
- **Seviye 1 (Kolay):** Çeldiriciler Türkiye geneline yayılır (> 500 km).
- **Seviye 3 (Orta / Bölgesel):** Çeldiriciler aynı veya komşu bölgelerden seçilir (~150-350 km).
- **Seviye 5 (Uzman / ÖSYM Eleme Modu):** Çeldiriciler aynı fay hattı veya sıradağdaki **en yakın komşulardan** seçilir.

#### 🎮 4. İnteraktif Oyun Modları
- 🎯 **Kör Atış (GeoGuessr):** Dilsiz haritada serbest tıklama, km sapma ölçümü ve radar halkaları.
- ⚔️ **Harita Fatihi:** 7 coğrafi bölgeyi soru çözerek fethedin ve haritayı renginize boyayın.
- 🧩 **Şekil Yapbozu (Match & Blast):** Akarsu-Delta, Dağ-Geçit ve Hayvancılık-Bölge kartlarını kombo çarpanlarıyla eşleştirin.
- 🖌️ **Harita Boyama & 🧬 Oluşum Türü Quizi:** Karstik, tektonik ve volkanik şekilleri harita üzerinde sınıflandırın.
- ⚡ **Şimşek Turu (60 sn)** ve 📋 **Genel Deneme (18 soru)** kronometreli sınav provaları.

#### 🧠 5. Hafıza Kodu Atölyesi (Mnemonic Lab)
Coğrafya müfredatının **hikâyeye çevrilmiş** hâli: 8 bölüm, **68 kod**, 272 metafor halkası, 190 harita durağı.
Amaç hikâyeyi *okutmak* değil, hikâyenin **içinde çalıştırmak** — her kod tek bir metin olarak yazılır ve motor altı ayrı çalışma biçimini o metinden türetir:

| Biçim | Ne yapar |
| :--- | :--- |
| 🧩 **Kod Çözücü** | "Sakar fil" ↔ "Sakarya + Filyos" kartlarını eşleştir |
| ✍️ **Boşluk Doldur** | Hikâyeden bir halka silinir; imgeyi ya da karşılığını tamamla |
| 🔗 **Hikâye Zinciri** | Tekerlemeyi **gerçek coğrafi sırasına** diz |
| 🕵️ **Kaçak Yakala** | Listeye sonradan sızan yabancıyı bul (Salda, heyelan set gölü değildir) |
| 🔑 **Ters Kod** | Bilgiden hikâyeye geri dön |
| 🗺️ **Harita Damgası** | Kodun uğradığı yeri harita üzerinde işaretle |

- **Üç kanal aynı anda:** cevap verilir verilmez hikâye çözülmüş hâliyle yeniden yazılır, kodun bütün durakları haritaya pin olarak düşer.
- **Haritaya harf çizme:** MASİF (M+A), volkanik **V**, vertisol **V** ve renzina **R** kodları haritanın üzerine animasyonlu olarak çizilir.
- **📚 Kod Galerisi:** 68 kodun tamamı hikâyesi, çözüm tablosu, püf notu ve ustalık çubuğuyla; bölüm sekmeleri, arama, "Haritada göster" ve tek kod için mini oturum.
- **Ustalık defteri:** zayıf kodlar rulet seçiminde daha ağır; tur tipi dağılımı nadir biçimleri (zincir) görünür tutacak şekilde dengelenir.
- **Paket gerektirmez:** kodlar coğrafi kaydın kendisi değil, o kayda giden hafıza yoludur — hiçbir DLC kurulmasa da çalışır.

#### 🧭 6. Mutlak Konum & Coğrafi Hesaplama Laboratuvarı
- Türkiye'nin uç noktaları (26°-45° Doğu, 36°-42° Kuzey), yerel saat farkları, gölge boyu, gündüz süresi ve güneş açısı simülasyonları.

#### 🛠️ 7. Özel Harita Çizim Editörü & NotebookLM Entegrasyonu
- Harita üzerine serbest Nokta (Marker), Hat/Çizgi (Polyline) ve Geometrik Alan (Polygon) çizebilme.
- JSON Dışa/İçe Aktarma (Export/Import) ve NotebookLM/AI çıktısını tek tıkla yapıştırma desteği.

#### 🔇 8. Dilsiz Harita & Çok Katmanlı Görünüm
- Tüm şehir ve yol yazılarını tek tıkla gizleyen **Sınav Tipi Dilsiz Harita**.
- Sade, Fiziki, Gerçek Uydu, Gece ve Kabartı katmanları — Sade dışındakiler ilgili paketle açılır.

#### 🌐 9. Çift Katmanlı i18n Çekirdeği
- **Arayüz dili** (`locales/*.js`) ve **coğrafi varlık dili** (paket kaydındaki `i18n` bloğu) birbirinden bağımsız yönetilir.
- Alt tür ve oluşum sınıflandırması Türkçe metin yerine **dilden bağımsız anahtarlar** kullanır; veri çevrildiğinde motor bozulmaz.

---

### ⌨️ Klavye Kısayolları

| Tuş | İşlev |
| :--- | :--- |
| `1` - `5` veya `A` - `E` | Test şıklarını hızlıca seçme |
| `Space` / `Enter` | Sonraki Soruya geçiş |
| `S` | Soru panelini küçült / büyüt |
| `M` | Dilsiz Harita modunu aç / kapat |

---

### 🗂️ Proje Yapısı

```
├── index.html                     # Tek sayfa uygulama iskeleti
├── css/
│   ├── style.css                  # Ana tema, paneller, oyun modları
│   └── packs.css                  # Rehber, paket mağazası, kilit stilleri
├── data/
│   ├── cografya_data.js           # Çalışma zamanı KAPLARI (boş gelir)
│   ├── cografya_data.legacy.js    # Yazım kaynağı — fiziki & temel ekonomik
│   ├── hafiza_kodlari.js          # 🧠 Mnemonic korpusu — [[imge|gerçek]] hikâyeleri
│   ├── source/*.js                # Yazım kaynağı — genişletilmiş müfredat
│   ├── packs/catalog.js           # Paket manifesti + kategori/alt tür defteri
│   └── packs/pack.tr.*.js         # DLC paketleri (lazy yüklenir)
├── js/
│   ├── pack_manager.js            # DLC motoru: kurulum, kademe, kilitler
│   ├── pack_store_ui.js           # Rehber ekranı + paket mağazası
│   ├── i18n.js                    # Çift katmanlı dil motoru
│   ├── map.js  quiz.js  app.js    # Harita, adaptif soru motoru, akış
│   ├── study_plan.js              # Bugünün Planı / aralıklı tekrar
│   ├── hafiza_kodu.js             # 🧠 Hafıza Kodu Atölyesi motoru + galeri
│   ├── panel_manager.js           # Taşınabilir & katlanabilir paneller
│   └── geoguessr|conqueror|match|olusum_quiz|boyama_quiz|mutlak_konum.js
├── locales/tr.js, en.js           # Arayüz metin sözlükleri
├── tools/build_packs.js           # Paket derleyicisi
└── docs/                          # Mimari, müfredat ve yol haritası belgeleri
```

---

### 🛠️ Teknoloji Yığını (Tech Stack)

| Bileşen | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Frontend** | Vanilla JavaScript (ES6+), HTML5 | Sıfır çalışma zamanı bağımlılığı, ultra hafif çekirdek |
| **Harita Motoru** | Leaflet.js v1.9.4 | Özel SVG filtreleri, dinamik katmanlar ve işaretçiler |
| **Stil & Arayüz** | Modern CSS3 (Glassmorphism) | Sivri köşeli koyu tema, responsive mobil uyum |
| **Veri & Dağıtım** | Paket (DLC) mimarisi | Lazy yüklenen konu paketleri, 3 detay kademesi, çok dilli kayıt şeması |
| **Derleme** | Node.js (yalnızca geliştirme) | `tools/build_packs.js` kaynakları paketlere derler |
| **Kalıcılık** | LocalStorage API | Kurulu paketler, çizimler, çalışma planı ve soru geçmişi tarayıcıda |
| **Dağıtım (Deploy)** | Vercel | Statik SPA yönlendirmesi ve optimize önbellek yapılandırması |

---

### 🚀 Kurulum ve Yerel Çalıştırma

Uygulamayı **çalıştırmak** için build aracına ihtiyaç yoktur; Node.js yalnızca veri düzenlerken gerekir.

1. **Repoyu klonlayın:**
   ```bash
   git clone https://github.com/umutardaayhan/cografya-harita-quiz.git
   ```

2. **Yerel bir sunucuyla açın:**
   ```bash
   python -m http.server 3000
   ```
   Ardından `http://localhost:3000` adresini açın. (Paketler `<script>` ile yüklendiği için `index.html` doğrudan da açılabilir.)

3. **Veri düzenlediyseniz paketleri yeniden derleyin:**
   ```bash
   node tools/build_packs.js
   ```
   Bu komut `data/cografya_data.legacy.js` ve `data/source/*.js` kaynaklarını okuyup `data/packs/` altını üretir. Üretilen dosyalar elle düzenlenmemelidir.

---

### ➕ Yeni Paket Ekleme (Özet)

1. Kayıtları `data/source/` içine yeni numaralı bir dosya olarak yazın.
2. Yeni bir kategori açtıysanız `data/source/90_meta.js` içindeki `CATEGORIES_EXT` ve `SUB_TYPES_EXT` listelerine satır ekleyin.
3. `tools/build_packs.js` içindeki `PACK_DEFS` dizisine paket tanımını (`id`, `categories`, `unlocks`, `planRows`…) ekleyin.
4. `node tools/build_packs.js` çalıştırın.

Ayrıntılar: [docs/PAKET_SISTEMI.md](docs/PAKET_SISTEMI.md)

---

### 🌐 Vercel Üzerinde Yayınlama

1. GitHub reponuzu Vercel hesabınıza bağlayın.
2. Root Directory olarak ana dizini seçin (Framework Preset: **Other**).
3. **Deploy** butonuna tıklayın; `vercel.json` yönlendirme ve önbellek başlıklarını otomatik uygular.

> **Önbellek notu.** `vercel.json`, `/css`, `/js` ve `/data` altını bir yıl `immutable`
> saklar. Bu yüzden yayın alırken iki sürüm numarası vardır:
>
> | Ne değişti? | Ne yapılmalı? |
> | :--- | :--- |
> | Herhangi bir `css/` veya `js/` dosyası | `index.html` içindeki `?v=N` sürümünü artır |
> | Bir paketin içeriği | `data/packs/catalog.js` içindeki ilgili `version` alanını artır |
>
> Bu yapılmazsa siteyi daha önce ziyaret etmiş tarayıcılar YENİ `index.html` ile
> ESKİ `app.js`/`style.css` dosyalarını karıştırır ve uygulama bozuk görünür.

---

<a name="-english"></a>
## 🇬🇧 English

### 📌 About the Project
**GeoQuiz / Geography Map Lab** is an interactive, gamified web platform engineered for mastering geographical entities, landforms, and spatial reasoning through visual memory and cognitive algorithms.

While initially tailored for Turkish physical and human geography (KPSS / YKS national exam standards), its underlying modular engine is designed to scale into **global geography, multi-language support, and custom world maps**.

---

### 🌟 Key Features

- 📦 **Pack (DLC) System — 18 packs, 472 entries:** Topics ship as installable packs with three detail levels (Light / Medium / Full). You download only what you want to study, and the map, quizzes, daily plan, game modes **and even the available map layers** are shaped by your installed packs. One-click *Install All* / *Remove All* is available in the store, and your question history always survives uninstalling. See [docs/PAKET_SISTEMI.md](docs/PAKET_SISTEMI.md).
- 🌐 **Dual-Layer i18n Core:** Interface strings and geographic entity names are translated independently; sub-type filters and landform classification use language-neutral keys, so the engine survives translation.
- 🧠 **Spaced Repetition & Adaptive Engine:** Tracks success rates and selectively decreases the frequency of mastered questions (Mastery Decay) while surfacing challenging concepts.
- ⚡ **5-Tier Distance-Based Difficulty (Haversine):** Distractors are chosen by geographical distance, from nationwide spread down to the closest geological neighbours.
- 🎯 **Interactive Game Modes:** GeoGuessr-style blind shot, Map Conqueror (7 regions), Match & Blast pairing, map painting, formation-type drills, 60-second speedrun and an 18-question mock exam.
- 🧠 **Mnemonic Lab:** 68 Turkish memory codes (68 stories, 272 metaphor links, 190 map stops) drilled six ways — pair matching, cloze, chain ordering, intruder hunt, reverse decoding and map stamping. Solved stories are re-rendered and pinned on the map; four codes literally draw their letters (M+A, V, R) across Türkiye.
- 🛠️ **Custom Vector Drawing Studio:** Draw points, polylines, and polygons on the live map with JSON Export/Import and AI/NotebookLM clipboard pasting.
- 🔇 **Mute / Blind Map Mode:** Toggle labels off for true blind exam simulations.
- 🧭 **Mathematical Location Lab:** Sun angle, local time differentials, shadow length, and daylight calculations.
- 📱 **Modern Glassmorphic UI:** Fast, zero-dependency, dark-mode design with draggable panels, responsive layout and keyboard accessibility.

---

### 🚀 Running Locally

No build step is needed to *run* the app — Node.js is only required when editing data.

```bash
git clone https://github.com/umutardaayhan/cografya-harita-quiz.git
python -m http.server 3000        # then open http://localhost:3000
node tools/build_packs.js         # only after editing data/source/*
```

---

### 🗺️ Future Roadmap & Global Expansion
- 🌍 **Interface translation:** the i18n engine is in place; the remaining hard-coded Turkish markup is being migrated to `locales/*.js`.
- 🌐 **World Geography Modules:** country packs (`de.*`, `fr.*`, …) reusing the shared category registry, plus world mountain ranges, river basins and tectonic plates.
- 🗄️ **SQLite pipeline:** replacing `tools/build_packs.js` with a database-backed builder (see [docs/GLOBALLESTIRME_YOL_HARITASI.md](docs/GLOBALLESTIRME_YOL_HARITASI.md)).
- ☁️ **Cloud Sync:** multi-device synchronization for installed packs and custom drawing decks.

---

## 📄 License / Lisans
Bu proje [MIT](LICENSE) lisansı altında korunmaktadır.

---

<p align="center">
  <sub>Made with ❤️ by <a href="https://github.com/umutardaayhan">@umutardaayhan</a></sub>
</p>
