# 🎨 Özel Harita Çizim Editörü, JSON Yapıştırma ve Adaptif Quiz Motoru Kılavuzu

Bu doküman, uygulamaya eklenen serbest harita çizimi, dosyasız direkt JSON yapıştırma, çoklu harita katmanları (Uydu, Gece, Arazi, Topografik, Sade), açılıp kapanabilir otomatik yakınlaştırma (Auto-Zoom) ve dinamik şık sayısı sistemlerini açıklar.

---

## 1. 📋 Doğrudan JSON Metni Yapıştırma (NotebookLM Uyumlu)

Kullanıcıların bir dosya kaydetmesine veya seçmesine gerek kalmadan doğrudan kopyala-yapıştır ile quiz içeriği yüklemesi sağlanmıştır:

1. **"✏️ Harita Editörü"** veya **"🎨 Çizimlerim"** butonuna tıklayın.
2. Açılan araç kutusundan **"📁 Çizimlerim & İçe Aktar"** butonuna basın.
3. NotebookLM'in ürettiği JSON dizisini üstteki kutucuğa yapıştırın ve **"🚀 Yapıştırılan JSON'u İçe Aktar"** butonuna tıklayın.
4. Tüm coğrafi yer şekilleri ve KPSS soruları anında haritanıza işlenir ve test başlar.

---

## 2. 🗺️ Yeni Harita Görünümleri (Tile Katmanları)

Sol alt paneldeki harita seçici menüsünden 5 farklı harita modu seçilebilir:
- 🗺️ **Sade / Renkli (CartoDB Voyager):** Göz yormayan, modern ve net görünüm.
- ⛰️ **Fiziki / Topografik (OpenTopoMap):** Yükselti eğrileri ve eş yükselti eğrileri içeren fiziki harita.
- 🛰️ **Gerçek Uydu (Esri World Imagery):** Yüksek çözünürlüklü gerçek dünya uydu görüntüsü.
- 🌙 **Gece / Karanlık (CartoDB Dark Matter):** Gece çalışma modu, yüksek kontrastlı neon vurgular.
- 🏔️ **Kabartı / Arazi (Esri World Topo Map):** Gölgeli kabartı ve dağ sıralarını belirginleştiren arazi haritası.

---

## 3. 🔍 Açılıp Kapanabilir Otomatik Yakınlaştırma (Auto-Zoom)

Sol alt köşede yer alan **"🔍 Otomatik Odak: Açık/Kapalı"** butonu ile:
- **Açıkken (Varsayılan):** Her yeni soruda harita soru konumuna/şekline yumuşak animasyonla yaklaşır.
- **Kapalıyken:** Harita sizin ayarladığınız zoom seviyesinde ve Türkiye genel görünümünde sabit kalır; sadece işaretçi veya parıldayan çizgi haritada yanar.

---

## 4. 🧠 Hata Ağırlıklı Adaptif Soru Motoru (Spaced Repetition)

Quiz motoru, öğrencinin soru çözme geçmişini analiz eder:
$$W = \max\left(0.3, \, 1.0 + (\text{wrongCount} \times 2.5) - (\text{streak} \times 0.6)\right)$$
- En çok yanlış yapılan sorular Rulet Tekerleği algoritması ile daha sık karşınıza gelir.
- Bu sorular ekrana geldiğinde `⚠️ Sık Yanıldığın Soru (X Yanlış)` rozeti yanıp söner.

---

## 5. 🔢 Dinamik Şık Sayısı (2, 3, 4, 5 Şık / ÖSYM Modu)
- **2 Şık:** Hızlı 50/50 ezber modu.
- **3 Şık:** Hızlı tekrar.
- **4 Şık:** Standart pratik.
- **5 Şık:** Gerçek **ÖSYM KPSS A-B-C-D-E** sınav simülasyonu.
- Klavyeden `1-5` ve `A-E` tuşları desteklenir.
