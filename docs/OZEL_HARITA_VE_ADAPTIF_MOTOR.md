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

## 3. 🧠 Ustalık Düzeyi, 5+ Bilinenleri Seyreltme (Mastery Decay) & Dinamik Homojenlik (1-5 Kademe)

Öğrencinin zaten ezberlediği sorularla vakit kaybetmesini önlemek ve bilinmeyen/yanlış yapılan sorulara odaklanmasını sağlamak için dinamik ağırlıklandırma sistemi devrededir:

### 🎲 Homojenlik Düzeyleri (Harita Araçları Menüsünden Ayarlanabilir):
- **Düzey 1 (Maksimum Adaptif):** Yanlış yapılan ve henüz hiç sorulmamış yeni sorular en yüksek öncelikle (%68+ ihtimalle) havuzdan çekilir. 5. kez sorulup bilinen sorular (%0.6 ihtimalle) çok nadir gelir.
- **Düzey 2 (Yüksek Adaptif):** Yanlışlar ve bilinmeyenler belirgin şekilde öne çıkarılır.
- **Düzey 3 (Dengeli Dağılım - Varsayılan):** Standart adaptif çalışma dengesi.
- **Düzey 4 (Hafif Adaptif):** Bilinen sorular hafifçe seyreltilir.
- **Düzey 5 (Tam Homojen):** Geçmiş istatistiklerden ve doğru/yanlış sayılarından tamamen bağımsız olarak **tüm sorular eşit ihtimalle (1.0 ağırlık)** sorulur.

### 📐 Ağırlık Dağılımı ve Enterpolasyon Formülü:
- **5+ Kez Bilinen Sorular ($\text{correctCount} \ge 5$):** Taban ağırlık $0.05$ (havuzdan %95 seyreltilir, kartta `🎓 5+ Kez Bilindi` rozeti yanar).
- **Yeni / Hiç Sorulmamış Sorular:** Taban ağırlık $1.8$ (`✨ Yeni Soru` rozeti).
- **Sık Yanılınan Sorular ($\text{wrongCount} \ge 1$):** Taban ağırlık $1.5 + \min(3.5, \text{wrongCount} \times 0.8) + \text{taze hata bonusu}$ (`⚠️ Sık Yanıldığın Soru` rozeti).
- **Dinamik Enterpolasyon:**
  $$\alpha = \frac{5 - \text{homogeneityLevel}}{4}$$
  $$\text{Ağırlık} = \max(0.02, 1.0 + (\text{HamAğırlık} - 1.0) \times \alpha)$$

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

---

## 8. 🎯 Seçmece Quiz (Kategori Bağımsız Özel Havuz)
Öğrencinin kendi belirlediği yer şekillerinden oluşan odaklanmış çalışma havuzu:
- **Kategori Sınırı Yok:** Dağ, ova, plato, akarsu, göl, maden, geçit veya turizm varlıkları tek bir sepette toplanabilir.
- **Akıllı Filtreleme & Hızlı Seçim:** Anlık arama (search), kategori hapları, `🔴 Yanlış Yaptıklarım` ve `✨ Bilinmeyenler` tek tıkla seçime dahil edilebilir.
- **Kalıcı Sepet:** Seçilen varlıklar `localStorage`'da korunur; kullanıcı dilediğinde listesini güncelleyip quiz başlatabilir.
- **Özel HUD Banner:** Seçmece modunda soru panelinde `🎯 Seçmece Quiz (X Soru)` bilgi çubuğu ve tek tıkla moddan çıkış butonu yer alır.

---

## 9. 🗑️ Tüm İstatistikleri Sıfırla (Master Factory Reset)
Tüm soru analizlerini ve çalışma geçmişini sıfırdan başlatma:
- Genel doğru/yanlış sayıları ve serileri (`kpss_cografya_stats`),
- Soru bazlı ustalık ve hata geçmişi analitiği (`kpss_cografya_question_analytics`),
- Hata bankası (`kpss_mistakes_bank`),
- Günlük çalışma planı ilerlemesi (`kpss_gunun_plani_v1`),
- Oyun modları en iyi skorları (`kpss_speedrun_best_score`, `kpss_cografya_conqueror_progress`)
tamamen temizlenir ve kullanıcıya tertemiz bir başlangıç sunulur.

---

## 10. 🏛️ 81 İl (Şehirler) Haritası ve Glow Efektli Sınır Poligonları
Türkiye'nin 81 ilinin sade ve resmi sınır geometrisi ile interaktif test sistemi:
- **Gerçek Statik GeoJSON:** 81 ilin tamamı resmi sınır geometrisiyle (`data/tr_cities_geojson.js`) çizilir. Nokta yerine gerçek poligonlar kullanılır.
- **İnteraktif Hover Glow:** Fareyle üzerine gelinen il `city-polygon-glow` efekti ile parıldar (`filter: drop-shadow(0 0 10px #60a5fa)`). Tooltip ile plaka kodu, il adı ve bölgesi görüntülenir.
- **Çift Yönlü Şehirler Testi:**
  - *Konumdan İl Bulma:* Hedef il haritada parıldayan mavi/altın renkli pulsasyonla gösterilir; şıklardan ili bulma istenir.
  - *İsimden Haritada İl Bulma:* Şık seçenekleri olan 4-5 il haritada sınırları ve A-E / I-V pinleriyle parıldar, doğrudan haritaya veya şıkka tıklanarak cevaplanır.
- **7 Bölge Alt Filtresi:** Marmara (11), Ege (8), Akdeniz (8), İç Anadolu (13), Karadeniz (18), Doğu Anadolu (14), Güneydoğu (9) illeri tek tıkla filtrelenebilir.
- **Paket Entegrasyonu:** `tr.sehirler` paketi altında 81 kayıt (Az: 28, Orta: 52, Tam: 81) olarak yönetilir.

---

## 11. 🏷️ Gösterge Gizle (Minimalist Soru Noktaları & Çizgileri)
Soru çözümü esnasında haritayı kapatan büyük şık pinlerini (`choice-pin-badge`) gizleme ve minimalist şekillere dönüştürme modu:
- **Hedef:** Harita üzerindeki büyük harf ve roma rakamı kutularını gizleyerek yalnızca yer şeklinin kendi geometrisini veya keşif ikonu temsilini ön plana çıkarmak.
- **Çalışma Prensibi:**
  - `Harita Araçları` çubuğundaki **🏷️ Göstergeler** butonu ile açılıp kapatılır.
  - Aktif olduğunda (`.hide-choice-badges`):
    - **Çizgisel ve Poligon Varlıklar (Dağ sıraları, Akarsular, Şehirler, Bölgeler):** Üzerlerindeki tüm pin ve göstergeler **TAMAMEN GİZLENİR**; haritada doğrudan çizgi ve alanın kendisi parıldar ve tıklanabilir kalır.
    - **Noktasal Varlıklar (Tek Dağlar, Göller, Geçitler, Madenler, Platolar):** Pin rozeti gizlenir; varlığın tam merkezinde (`lat, lng`) Keşif Modunda onu temsil eden 3B Dağ Prizması, Ova/Plato tepsisi veya konu ikonu merkezlenerek parıldar.
  - Fareyle üzerine gelindiğinde (hover) şık rozeti yukarıda belirir ve tıklanabilirlik tam olarak korunur.
  - Tercih `localStorage` (`kpss_cografya_badges_enabled`) üzerinde kalıcı olarak saklanır.

### 11.1 Kopya, Konum ve Seçme Güvenceleri
Gizleme modu haritayı sadeleştirirken sessizce üç sınıf hata üretebiliyordu; motor
bunları yapısal olarak engeller:

| Güvence | Sorun | Çözüm |
| --- | --- | --- |
| **Kopya (isim balonu)** | Keşif ikonlarının HTML'inde `title="${item.name}"` vardı. Gizli modda ikonun üzerinde bir saniye beklemek cevabın adını tarayıcı balonunda gösteriyordu. Aynı sızıntı "Konumdan İsim Bul" modunda **vurgulanan soru işaretçisinde** de vardı. | `getCustomCategoryIcon(item, { isimsiz: true })` — soru bağlamındaki tüm çağrılarda `title` hiç basılmaz. Keşif Modunda korunur. |
| **Kopya (tür sızıntısı)** | İkonun alt tür sınıfı (`volcanic`, `karstic`, `delta`) ve alt tür emojisi (🏅 UNESCO) şıkları renklendiriyor, "hangisi volkanik kökenlidir" tipi soruyu tek bakışta ele veriyordu. | Şık pinleri `{ notr: true }` ile üretilir: alt tür sınıfı yazılmaz, kategori emojisi kullanılır. Tüm şıklar birbirinin aynı görünür, öğrenci konuma bakmak zorunda kalır. |
| **Konum kayması** | Keşif ikonu `transform: translate(-50%,-50%)` ile ortalanıyordu. `pulseCorrectPin` ve `shake` animasyonları `transform`'u tümüyle ezip ikonu kendi yarıçapı kadar (16 px) kaydırıyordu — hem de doğru cevabın gösterildiği anda. Kapsayıcıya verilen hover/sönük `transform`'u da hizalama kutusunu kaydırıyordu. | Ortalama artık `translate` **özelliğiyle** yapılır (`transform`'dan bağımsızdır); gizli modda kapsayıcıya `transform: none` verilir, ölçekleme ikonun kendisinde olur. |
| **Konum kayması (ankraj)** | Şık pini, kaynak ikonun yalnızca HTML'ini kopyalayıp `iconAnchor`'ını atıyordu. Dağ prizmasının tabanı 32 px'lik kutunun 26. pikselindedir; ortalanınca dağ 10 px aşağı oturuyordu. | Kaynak ikonun `iconSize`/`iconAnchor` farkı `--pin-dx` / `--pin-dy` değişkenleriyle telafi edilir. |
| **Hayalet şık** | Rozet CSS ile gizlense de Leaflet işaretçisinin 36×44'lük şeffaf kutusu DOM'da kalıyordu. Haritanın bomboş görünen bir yerine tıklayan öğrenci farkında olmadan o şıkkı işaretliyordu. | Şekil sınıfları işaretçinin **kök** öğesine de yazılır; gizlenen kutu `pointer-events: none` ile kapatılır. Noktasal şıklarda tıklama hedefi yalnızca görünen ikondur. |
| **Kaybolan şık** | GeoJSON'u bulunamayan bir il ya da koordinat dizisi olmayan bir bölge şıkkında rozet gizlenince şık haritada ne görünür ne de tıklanabilir kalıyordu. | Rozet yalnızca haritada **gerçekten çizilmiş** bir geometri varsa gizlenir (`geometri-var`); yoksa rozet yerinde durur. |
| **Anonim pin** | Mutlak Konum ailesinde (Güneş, Sıcaklık, Gündüz-Gece, Koordinat Avcısı, Düello) pini panel kartına bağlayan tek ipucu A-B-C-D harfidir. Gizleme açıkken tüm pinler aynı anonim daireye dönüşüyor ve oyun oynanamaz hale geliyordu. | `showMultipleChoiceLocations(..., { rozetSabit: true })` — bu modlarda rozet hiçbir zaman gizlenmez. |
| **Takılı sıra numarası** | Sıralama modunda pin harfinin yerine seçim sırası yazılıyor, sıra düşünce harf geri gelmiyordu. | Özgün harf `data-letter` üzerinde saklanır ve sıra boşalınca geri yazılır. |

---

## 12. 🗺️ Çoklu Çizim Haritaları, Sürükle-Bırak Birleştirme (Linking) ve Edit Sistemi

Kullanıcının coğrafi olarak birbiriyle teması olmayan ayrık bölgeleri (örneğin hem Doğu Karadeniz hem Akdeniz'deki Yayla Evleri) tek bir soru ve cevap varlığı olarak tanımlayabilmesini, birden fazla bağımsız harita üretebilmesini ve tam düzenleme yapabilmesini sağlayan sistem:

### 12.1 🗂️ Çoklu Çizim Haritaları & İsimlendirme
- **Bağımsız Harita Üretimi:** Kullanıcı "Çizimlerim" sekmesi altındayken dilediği kadar harita (örn: `Yayla Evleri Haritası`, `Maden Havzalarım`, `Özel Notlarım`) oluşturabilir, isimlendirebilir ve yeniden adlandırabilir.
- **Alt Kategori Barı Entegrasyonu:** "Çizimlerim" kategorisi seçildiğinde alt kategori barında kayıtlı tüm haritalar `[🗺️ Yayla Evleri (3)] [🗺️ Madenlerim (5)]` şeklinde hap butonlar olarak listelenir ve `[➕ Yeni Harita]` butonuyla anında yeni harita açılabilir.
- **İçe/Dışa Aktarma:** Haritalar tekil olarak veya toplu yedek halinde JSON formatında dışa aktarılabilir ve içe alınabilir.

### 12.2 🔗 Keşif Modunda Sürükle-Bırak ile Birleştirme & Ayırma (Drag-to-Connect)
- **Kullanım:** Keşif Modundayken haritadaki bir yer şeklinin üzerine sol tık ile basılı tutup başka bir yer şekline sürüklendiğinde aralarında dinamik parıldayan bir bağlantı çizgisi (laser link) uzanır.
- **Birleştirme (Merge / Group):** Hedef elemanın üzerine bırakıldığında iki eleman birbirine bağlanır (`groupId` atanır).
- **Ayırma (Unlink / Split):** Zaten bağlı olan iki eleman arasında aynı sürükleme işlemi tekrar yapıldığında aralarındaki bağ koparılır ve bağımsız iki elemana dönüşürler.
- **Görsel Bağlantı:** Keşif modunda bağlı elemanlar arasında zarif kesikli çizgiler (`group-connection-line`) ve popup içinde `🔗 Birleşik Grup Üyesi` rozeti görüntülenir.

### 12.3 🎯 Test ve Soru Motoru Entegrasyonu
- **Tek ve Ortak Cevap:** Birleştirilmiş elemanlar quiz motoru tarafından tek bir kompozit soru olarak ele alınır.
- **Konumdan İsim Bul Modunda:** Soru sorulduğunda gruptaki tüm üyelerin geometrileri (tüm poligon, çizgi ve noktalar) haritada aynı anda parıldar ve harita tüm üyeleri kapsayacak şekilde otomatik kadrajlanır.
- **İsimden Haritada Bul Modunda:** Gruptaki tüm üyeler aynı şık pini (örn: A Pini) ile işaretlenir; öğrenci haritada bağlı bölgelerden herhangi birine tıkladığında cevap **DOĞRU** kabul edilir.

### 12.4 ✏️ Çizimler İçin Tam Düzenleme (Edit) ve Haritadan Yeniden Çizim
- Keşif balonundaki `✏️ Düzenle` butonu ile özel çizimlerin adı, kategorisi, türü, yöresi, KPSS notu ve koordinatları güncellenebilir.
- `🖉 Haritadan Yeniden Çiz` butonuyla şekil doğrudan harita üzerinden yeniden çizilip kaydedilebilir.

---

## 13. 🏙️ Şehir Göstergesi (Pin Şehir İsimleri Modu)

KPSS ve coğrafya harita sorularında görsel il-konum pekiştirmesini hızlandırmak için geliştirilen şehir gösterge motoru:

- **Hedef:** Haritadaki noktasal soru göstergelerinde (rozetlerde) "1, 2, 3" veya "I, II, III" gibi soyut numaralar yerine o noktanın üzerinde yer aldığı **şehri (İl Adını)** göstermek.
- **Çalışma Prensibi:**
  - `Harita Araçları` menüsündeki **🏙️ Şehir İsimleri** butonu (`#toggle-pin-city-btn`) ile açılıp kapatılır.
  - **Noktasal Varlıklar (Point Pins):** Tek dağlar, göller, geçitler, madenler, turizm mekanları ve nüfus merkezlerinde pin rozetinde sayı yerine il adı (`Kayseri`, `Rize`, `Adana` vb.) yazılır (`.choice-pin-city-badge`).
  - **Çizgisel & Poligon Varlıklar (Polyline & Polygon):** Birden fazla şehre uzanan akarsular, sıra dağlar ve geniş alanlar (ovalar, platolar, bölgeler) eski usul roma rakamları/sayılarıyla ifade edilmeye devam eder.
  - **Ray-Casting Algoritması:** `data/tr_cities_geojson.js` üzerindeki 81 ilin poligon sınırları Işın Kaydırma (Ray-Casting) yöntemiyle taranır; koordinatların hangi il sınırına düştüğü anında belirlenir ve O(1) önbelleğe alınır.
  - **Panel Entegrasyonu:** Test panelindeki şık butonlarında da noktasal konumlar için ilgili şehrin adı görüntülenir.
  - **Kalıcılık:** Tercih `localStorage` (`kpss_cografya_pin_city_enabled`) üzerinde kalıcı olarak saklanır.

---

## 14. 🎲 Bağlı Elemanlar İçin Rastgele Alt Küme Örneklemesi ve Tam Ağ Gösterimi (Random Subset & Full Network Reveal)

Çok merkezli maden havzaları, tarım-sanayi kuşakları ve birbirine bağlanmış kompozit yer şekilleri için geliştirilen dinamik test motoru özelliği:

### 14.1 🎲 Rastgele Alt Küme Örneklemesi (Random Subset Sampling)
- **Problem:** Çok üyeli bir maden havzası (örneğin 6 merkezli Krom, 9 merkezli Altın veya 12 merkezli Tuz) her sorulduğunda tüm üyelerin sabit olarak haritaya konması, testin tahmin edilebilir ve ezbere dönüşmesine yol açıyordu.
- **Çözüm:** Bir grup sorulduğunda; o grubun üye sayısına göre **en az 2 adet (tekli gruplarda 1 adet)** rastgele sayıda alt küme seçilir:
  $$2 \le k \le \text{Toplam Üye Sayısı}$$
- Seçilen $k$ adet nokta `displayGroupItems` olarak haritaya yansıtılır. Örneğin bir soruda Krom Elazığ + Muğla olarak sorulurken, diğer soruda Bursa + Adana + Kop Dağı olarak sorulabilir.
- **Çift Yönlü Uyumluluk:** Hem `identify` (konumdan isim bul) hem de `find_on_map` (isimden haritada bul) modlarında şık pinleri bu dinamik alt kümeler üzerinden üretilir.

### 14.2 🌐 Cevap Sonrası Tam Ağ Aydınlatması (Full Network & Line Reveal)
- Soru cevaplandığında (doğru veya yanlış); soru esnasında sadece 2-3 nokta gösterilmiş olsa bile haritada o madene/gruba ait **TÜM noktalar** (`groupItems`) anında aydınlatılır.
- Üye noktalar arasında en kısa tur (TSP / MST döngüsü) üzerinden akan yeşil/parıldayan bağlantı çizgileri (`animated-network-line`) çizilir.
- Her üye noktanın üzerinde parıldayan halka (`network-pulse-ring`) ve il/ilçe adı (`network-item-label`) belirir.
- Harita tüm ağı kapsayacak şekilde otomatik kadrajlanır; böylece öğrenci o madenin Türkiye genelindeki tüm çıkarım koridorunu ve coğrafi yayılımını her soruda pekiştirir.

### 14.3 ⚙️ Açılır-Kapanır Dinamik Havza Modu (Toggle & Live Refresh)
- **Harita Araçları & Menü Erişimi:** Sol alt harita araç çubuğundaki **🎲 Dinamik Havza** butonu (`#toggle-dynamic-group-btn`) veya üstteki ⚙️ Araçlar menüsünden (`#btn-dynamic-group-tools`) açılıp kapatılabilir.
- **Açıkken (🎲 Dinamik Havza):** Çok merkezli havzalarda dinamik $2 \le k \le n$ rastgele alt küme örneklemesi devrededir.
- **Kapalıyken (🌐 Tüm Havza):** Grubun tüm çıkarım noktaları ($k = n$) eksiksiz olarak soru havuzuna ve haritaya düşer, tüm noktalar aynı anda gösterilir.
- **Canlı Yenileme (Live Refresh):** Mod değiştirildiğinde ekranda henüz cevaplanmamış aktif bir soru varsa, haritadaki şık pinleri ve soru işaretçileri sayfa yenilenmeden anında güncellenir.
- **Kalıcılık:** Tercih `localStorage` (`kpss_dynamic_group_sampling`) üzerinde saklanır.

---

## 15. 🖌️ Harita Boyama Modu: Harita Harita Çalışma & Özel Çizim Haritaları Entegrasyonu

Kullanıcının harita üzerinde fırça ve silgiyle serbestçe coğrafi alanları boyadığı **Harita Boyama Modu (`MapPaintGame`)**, tüm DLC paketleriyle ve kullanıcının kendi çizim haritalarıyla tam uyumlu hale getirilmiştir:

### 15.1 🎯 Kapsam Seçimi (Scope Selection)
- Oyun modları menüsünden `🖌️ Harita Boyama` seçildiğinde diğer modlarda olduğu gibi **Kapsam Seçim Modalı (`openGameScopeModal`)** açılır.
- **Tüm Paketler:** Kurulu tüm standart paketlerin ve çizim haritalarının hedefleri karma bir havuzda sunulur.
- **Yalnızca Seçili Harita:** Kullanıcının aktif çalıştığı kategori (örn. `maden_bolgeleri`, `enerji_bolgeleri`, `daglar`, `toprak`, `sehirler` vb.) veya **Özel Çizim Haritası (`ozel_cizimler`)** üzerinden hedefler derlenir.

### 15.2 📐 Çoklu Geometri & Çizim Desteği (Multi-Geometry Engine)
- **Noktasal Varlıklar (Point):** Tolerans dairesi (`toleransKm`) ile boyama kapsama ve aşırı boyama cezası ($F_1 / \text{aşım}$) hesaplanır.
- **Alansal & Çizgisel Çizimler (Polygon & Polyline):** Poligon köşe noktaları, ağırlık merkezi ve çizgi segmentleri örneklenerek boyama isabeti ölçülür.
- **Dairesel Çizimler (Circle):** Kendi yarıçapı ve merkez koordinatları üzerinden boyama kabul alanı oluşturulur.
- **Cevap Aydınlatması (`cevabiGoster`):** Boyama bittiğinde doğru boyanan şekiller zümrüt yeşili (`#10b981`), kaçırılan yerler mercan kırmızısı (`#ef4444`) renk tonuyla haritada netleştirilir.

---

## 16. 🎨 Şık Bazlı Dinamik Renk Paleti ve Harita-Küme Senkronizasyonu (Choice Colors & Group Clustering)

Çok merkezli maden havzaları, enerji kuşakları, tarım-sanayi alanları ve çoklu şıklı testlerde seçeneklerin coğrafi sınırlarını ve küme noktalarını tek bakışta ayırt etmek için geliştirilen renk motoru:

### 16.1 🌈 10 Benzersiz Canlı Renk Tablosu (`CHOICE_PALETTE`)
Haritadaki açık, koyu, fiziki ve uydu altlıklarının tümünde yüksek kontrast ve göz alıcı parlaklık sağlayan renk dizilimi:
- **A Şıkkı:** 🔵 **Canlı Mavi** (`#3b82f6`) -> Mavi Pin, Mavi Çizgi/Poligon, Mavi Buton Harfi
- **B Şıkkı:** 🟢 **Zümrüt Yeşili** (`#10b981`) -> Yeşil Pin, Yeşil Çizgi/Poligon, Yeşil Buton Harfi
- **C Şıkkı:** 🟠 **Kehribar Turuncu** (`#f59e0b`) -> Turuncu Pin, Turuncu Çizgi/Poligon, Turuncu Buton Harfi
- **D Şıkkı:** 🟣 **Canlı Mor** (`#a855f7`) -> Mor Pin, Mor Çizgi/Poligon, Mor Buton Harfi
- **E Şıkkı:** 🌸 **Mercan Pembesi** (`#ec4899`) -> Pembe Pin, Pembe Çizgi/Poligon, Pembe Buton Harfi
- **F Şıkkı:** 🌊 **Turkuaz** (`#06b6d4`)
- **G Şıkkı:** 🟡 **Altın Sarısı** (`#eab308`)
- **H Şıkkı:** 🔴 **Parlak Kızıl** (`#f97316`)
- **I Şıkkı:** 🌌 **Çivit Mavisi** (`#6366f1`)
- **J Şıkkı:** 🌿 **Akuamarin** (`#14b8a6`)

### 16.2 🌐 Harita & Küme Elemanları Entegrasyonu
- **Grup & Havza Ayrımı:** Bir şık birden fazla noktayı kapsadığında (örneğin A Şıkkı Krom 6 nokta, B Şıkkı Bor 4 nokta), grubun tüm noktaları ve aralarındaki dinamik kesikli bağlantı hatları (`.group-choice-connector`) o şıkkın kendi renginde çizilir. Hangi noktaların hangi şıkka ait olduğu haritada anında ayrışır.
- **Poligon ve Çizgiler:** Şehir GeoJSON sınırları, göller, delta ovaları ve nehir çizgileri ilgili şıkkın rengiyle parıldar.
- **Göstergeler Gizliyken Bile Renk Korunur:** Rozetler gizlendiğinde dahi tam koordinat merkezindeki keşif ikonu ilgili şıkkın renginde renkli bir `drop-shadow` ile ışıltı yayar.

### 16.3 ⚡ Çift Yönlü Hover Senkronizasyonu (Hover Sync)
- Quiz panelinde bir şık butonunun üzerine gelindiğinde haritadaki ilgili şıkkın tüm pinleri ve geometrileri büyür ve parıldar (`.highlight-hover`).
- Haritada bir pinin üzerine gelindiğinde paneldeki ilgili şık butonu belirginleşir.

---

## 17. 🚢🏛️ Güncel KPSS Ulaşım, Ticaret & Turizm Veri Mimarisi (2026/2027)

Tüm ulaşım hatları, limanlar, geçitler, sınır kapıları, serbest ticaret bölgeleri ve turizm mirası en güncel akademik ve sınav verileriyle güncellenmiştir:

### 17.1 🚢 Limanlar & Transit Ticaret Koridorları
- **İthalat-İhracat 1 Numarası:** Aliağa Limanı (İzmir - Petrokimya).
- **Kruvaziyer Lideri:** Kuşadası Limanı (1. Kuşadası, 2. Galataport, 3. Bodrum).
- **Hinterlandı En Geniş Karadeniz Limanı:** Samsun Limanı (Canik Dağları geride, demiryolu bağlantılı).
- **Doğal Ama Hinterlandı Dar Liman:** Sinop Limanı (Küre Dağları engebeli, demiryolu yok).
- **Maden & Ağır Sanayi Limanları:** Bandırma (Bor ihracatı, demiryolu var), Zonguldak/Ereğli (Taş kömürü & demir-çelik, demiryolu var), İskenderun (Demir-çelik, demiryolu var).
- **Demiryolu Olmayan Önemli Limanlar:** Gemlik Limanı (Bursa sanayisi), Antalya Limanı (Turizm ve ferrokrom).
- **Transit & Konteyner Kapıları:** Mersin Limanı (Orta Doğu transit kapısı), Trabzon & Rize Limanları (İran transit ticareti).

### 17.2 🌉 Geçitler, Tüneller & Mühendislik Yapıları
- **Türkiye'nin En Uzun Tüneli:** Yeni Zigana Tüneli (14.5 km çift tüp - Trabzon-Gümüşhane).
- **Ovit Tüneli:** 14 km (Rize İkizdere - Erzurum İspir).
- **Türkiye'nin İlk Prefabrik Kar Tüneli:** Van - Bahçesaray (Çığ önleme tüneli).
- **Kritik Geçitler:** Gülek Boğazı (Çukurova-İç Anadolu), Çubuk Geçidi (Antalya-Göller Yöresi), Sertavul Geçidi (Mersin-Karaman), Belen Geçidi (İskenderun-Amik), Ilgaz İstiklal Tüneli, Bolu Dağı Tüneli, Sabuncubeli Tüneli.

### 17.3 🚆 Demiryolu, YHT & Otoyol Aksları
- **YHT Ağı (Ankara Merkezli):** İstanbul, Konya, Karaman, Eskişehir, Bilecik, Sakarya, İzmit, Kırıkkale, Yozgat, Sivas.
- **Turistik Tren Hatları:** Doğu Ekspresi (Ankara-Kars), Mezopotamya Ekspresi (Ankara-Diyarbakır - Diyarbakır'da biter, Mardin'e gitmez).
- **Demiryolu Bulunmayan Merkezler:** Doğu Karadeniz (Trabzon, Rize, Artvin), Sinop, Çanakkale, Bursa (Gemlik), Muğla, Antalya, Hakkari-Şırnak.
- **Otoyol Aksları:** Batı Otoyol Aksı (Edirne -> İstanbul -> İzmir -> Aydın -> Denizli'ye kadar), Güneydoğu Otoyol Aksı (Ankara -> Niğde -> Adana -> Gaziantep -> Şanlıurfa'da biter).

### 17.4 🚪 Sınır Kapıları & Demir İpek Yolu
- **Kapıkule:** En işlek sınır kapısı (Bulgaristan / demiryolu var).
- **Uzunköprü:** Yunanistan demiryolu kapısı.
- **Cambaz İstasyonu:** Bakü-Tiflis-Kars (Demir İpek Yolu) Gürcistan sınır demiryolu istasyonu.
- **Dilucu (Nahçıvan):** En kısa sınırımız; Zengezur Koridoru demiryolu projesi.
- **Kapıköy (Van):** İran demiryolu sınır kapısı.
- **Habur (Irak):** En işlek Orta Doğu kapısı (Demiryolu YOKTUR).
- **Nusaybin (Mardin):** Suriye demiryolu sınır kapısı.

### 17.5 💼 Serbest Ticaret Bölgeleri
- **İlk Serbest Bölge:** Mersin Serbest Bölgesi (1987).
- **Ankara'da Serbest Bölge YOKTUR:** 15+ ilde serbest bölge varken başkent Ankara'da serbest bölge bulunmaz (KPSS tuzağı).

### 17.6 🏛️ UNESCO Dünya Mirasları, Milli Parklar & İnanç
- **UNESCO'ya En Son Eklenen Güncel Mekan:** Sardes Antik Kenti ve Bintepe Tümülüsleri (Manisa).
- **UNESCO'da 2 Farklı Mekana Sahip Tek İl:** İzmir (Bergama & Efes).
- **İlk UNESCO Mirasımız:** Divriği Ulu Camii ve Darüşşifası (Sivas - 1985).
- **Karma Miraslar:** Kapadokya (Nevşehir) ve Pamukkale-Hierapolis (Denizli).
- **Ahşap Destekli Camiler (Ortak Miras):** Eşrefoğlu, Sivrihisar, Mahmut Bey, Arslanhane, Afyon Ulu Camii.
- **En Son Milli Park:** Geben Vadisi Milli Parkı (Kahramanmaraş).
- **İlk Milli Park:** Yozgat Çamlığı Milli Parkı (1958).
- **En Son Sakin Şehir (Cittaslow):** İbradı (Antalya - Düğmeli Evler).
- **İlk Sakin Şehir (Cittaslow):** Seferihisar (İzmir - 2009).
- **İnanç Turizmi:** St. Pierre Kilisesi (Dünyanın ilk mağara kilisesi - Hatay), Mor Gabriel Manastırı (Mardin), Meryem Ana Evi (İzmir), Akdamar Kilisesi (Van).


