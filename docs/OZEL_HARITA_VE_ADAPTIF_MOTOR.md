# 🎨 Özel Harita Çizim Editörü ve Adaptif Quiz Motoru Kılavuzu

Bu doküman, uygulamaya eklenen serbest harita çizimi, kişisel quiz üretimi, adaptif hata analizi ve dinamik şık sayısı sistemlerinin teknik detaylarını ve kullanımını açıklar.

---

## 1. ✏️ Özel Harita Çizim Sistemi (`CustomDrawManager` & `GeographyMap`)

Kullanıcılar haritada 3 farklı geometri tipinde çizim yapabilir:

1. **📍 Nokta (Point):** Tek bir konumu (zirve, geçit, delta vb.) işaretlemek için kullanılır. Haritaya tek tık yeterlidir.
2. **📏 Çizgi / Hat (Polyline):** Akarsular, fay hatları, dağ sıraları veya demiryolu hatları için kullanılır. Haritaya ardışık tıklayarak ara noktalar belirlenir, çift tıklama veya "✅ Tamamla" butonu ile çizim bitirilir.
3. **📐 Alan / Çokgen (Polygon):** Platolar, havzalar, ovalar veya coğrafi bölgeleri taramak için kullanılır. En az 3 köşe tıklanarak alan oluşturulur.

### 💾 Veri Saklama ve Yedekleme (JSON)
- Çizimler tarayıcının `localStorage` alanında `kpss_cografya_custom_drawings` anahtarı altında JSON dizisi olarak saklanır.
- **Yedekleme:** "JSON Olarak Yedekle" butonu ile tüm çizimler tek tıkla `.json` dosyası olarak indirilebilir.
- **Geri Yükleme:** "JSON Yükle" ile başka bir cihazdan veya arkadaşınızdan aldığınız hazır harita setleri anında içe aktarılabilir.

---

## 2. 🧠 Hata Ağırlıklı Adaptif Soru Motoru (Spaced Repetition)

Quiz motoru, öğrencinin soru çözme alışkanlıklarını analiz eder ve zorlandığı yer şekillerini tespit eder:

### ⚙️ Ağırlık Algoritması
Her soru için `localStorage` üzerinde şu istatistikler tutulur:
- `wrongCount`: Toplam yanlış sayısı.
- `correctCount`: Toplam doğru sayısı.
- `streak`: Ardışık doğru sayısı.

Soru seçilme ağırlığı şu formülle hesaplanır:
$$W = \max\left(0.3, \, 1.0 + (\text{wrongCount} \times 2.5) - (\text{streak} \times 0.6)\right)$$

- **Rulet Tekerleği Seçimi (Weighted Random Selection):** Soru havuzundaki tüm soruların ağırlık toplamı üzerinden rastgele seçim yapılır. Böylece en çok yanlış yapılan sorular havuzda kat kat daha yüksek gelme olasılığına sahip olur.
- **Rozet Gösterimi:** Çok sık yanlış yapılan sorular karşınıza çıktığında panelde `⚠️ Sık Yanıldığın Soru (X Yanlış)` rozeti yanıp söner.

---

## 3. 🔢 Dinamik Şık Sayısı (2, 3, 4, 5 Şık / ÖSYM Modu)

Sol alt araç çubuğundaki şık seçici ile:
- **2 Şık:** Hızlı 50/50 ezber modu.
- **3 Şık:** Hızlı tekrar.
- **4 Şık:** Standart pratik.
- **5 Şık:** Gerçek **ÖSYM KPSS A-B-C-D-E** sınav formatı.

Klavye ile hem `1-5` sayı tuşları hem de `A-E` harf tuşları ile şıklar anında işaretlenebilir.
