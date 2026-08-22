# 🎨 KPSS Harita Quiz: Çift Yönlü Test Modelleri, Çizim Editörü & Adaptif Motor Kılavuzu

Bu doküman; uygulamada yer alan çift yönlü soru modlarını (İsimden Haritada Konum Bulma I-V & Konumdan İsim Bulma), serbest harita çizimini, doğrudan JSON yapıştırmayı ve çoklu harita katmanlarını açıklar.

---

## 1. 🎯 Çift Yönlü Test Formatları (Soru Tipleri)

Üst menüdeki **"🎯 Soru Formatı"** seçicisinden dilediğiniz modda çalışabilirsiniz:

### A. 📍 İsimden Haritada Bul (ÖSYM Tipi I-V / A-E):
- **Nasıl Çalışır?:** Soru başlığında yer şeklinin adı ve türü verilir: *(Örn: "Haritada numaralandırılmış konumlardan hangisi **Nemrut Dağı**'dır?")*
- Harita üzerinde seçtiğiniz şık adedi kadar (2, 3, 4 veya 5 adet) **(I, II, III, IV, V)** ve **(A, B, C, D, E)** rozetli parıldayan pinler belirir.
- Doğrudan **haritadaki numaralara tıklayarak**, panelden veya klavyeden (`1-5` / `A-E`) cevap verebilirsiniz.
- Doğru pin anında yeşil dalga efektiyle onaylanır, yanlış pin kırmızı yanıp söner ve KPSS bilgi kartı açılır.

### B. 🔍 Konumdan İsmi Bul (Klasik Mod):
- Haritada tek bir konum veya çizgi/alan parıldayarak gösterilir, paneldeki şıklardan ismi seçilir.

### C. 🎲 Karışık Sürpriz Modu:
- Her soruda rastgele olarak bu iki formattan biri karşınıza gelir.

---

## 2. 📋 Doğrudan JSON Metni Yapıştırma (NotebookLM Uyumlu)

1. **"✏️ Harita Editörü"** -> **"📁 Çizimlerim & İçe Aktar"** butonuna basın.
2. NotebookLM'in ürettiği JSON dizisini üstteki kutucuğa yapıştırın ve **"🚀 Yapıştırılan JSON'u İçe Aktar"** butonuna tıklayın.
3. Tüm coğrafi yer şekilleri ve KPSS soruları anında haritanıza işlenir.

---

## 3. 🗺️ Harita Katmanları ve Yakınlaştırma (Auto-Zoom)

- 5 Katman: 🗺️ **Sade / Renkli**, ⛰️ **Fiziki / Topografik**, 🛰️ **Gerçek Uydu**, 🌙 **Gece / Karanlık**, 🏔️ **Kabartı / Arazi**.
- **🔍 Otomatik Odak (Auto-Zoom):** Açıp kapatarak haritanın sabit Türkiye görünümünde kalmasını veya her soruda otomatik odaklanmasını ayarlayabilirsiniz.

---

## 4. 🧠 Hata Ağırlıklı Adaptif Soru Motoru (Spaced Repetition)
- En çok takıldığınız sorular Rulet Tekerleği algoritması ile daha sık gelir ve `⚠️ Sık Yanıldığın Soru` rozetiyle uyarır.
