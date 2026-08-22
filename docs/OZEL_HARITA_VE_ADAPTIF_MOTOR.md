# 🎨 KPSS Harita Quiz: Zorluk Sistemi, Ustalık Seyreltme, Test Modelleri & Çizim Kılavuzu

Bu doküman; uygulamada yer alan **Coğrafi Mesafe Tabanlı 5 Kademeli Zorluk Sistemi**, **Ustalık Düzeyi & İyi Bilinenleri Seyreltme (Mastery Decay)**, **ÖSYM Çift Yönlü Test Formatları**, **Harita Çizim Editörü** ve **Doğrudan JSON Yapıştırma** sistemlerinin çalışma prensiplerini açıklar.

---

## 1. ⚡ Coğrafi Mesafe Tabanlı 5 Kademeli Zorluk Sistemi

Sistem, soruların basit kalmasını önlemek için çeldiricileri doğru cevabın koordinatlarına olan **Haversine Kuş Uçuşu Mesafesine (km)** göre seçer:

- **⭐ Seviye 1 (Kolay):** Çeldiriciler Türkiye geneline dağılır (Farklı coğrafi bölgeler, > 500 km).
- **⭐⭐ Seviye 2 (Orta-Kolay):** Çeldiriciler 350 - 500 km mesafeden seçilir.
- **⭐⭐⭐ Seviye 3 (Orta / Bölgesel):** Çeldiriciler aynı veya komşu coğrafi bölgelerden seçilir (~150 - 350 km).
- **⭐⭐⭐⭐ Seviye 4 (Zor / Aynı Yöre):** Çeldiriciler 75 - 150 km yakınlıktaki komşu yer şekillerinden seçilir.
- **⭐⭐⭐⭐⭐ Seviye 5 (Uzman / ÖSYM Eleme Modu):** Çeldiriciler **birbirine en yakın, adeta aynı dağ silsilesi / fay hattı / havzadaki en yakın komşulardan** seçilir! (Örn: Kaz Dağı sorulduğunda Madra, Yunt, Spil dağları gelir; hepsi Ege'de dip dibe olduğu için tam koordinat bilgisi gerektirir).

---

## 2. 🧠 Ustalık Düzeyi & İyi Bilinen Soruları Seyreltme (Mastery Decay)

Öğrencinin zaten ezberlediği sorularla vakit kaybetmesini önlemek için akıllı seyreltme devrededir:
- **Ustalaşılan Sorular (Seri $\ge 3$ Doğru):** Seçim ağırlığı $0.04 - 0.12$ bandına iner (%90-95 oranında havuzdan geri çekilir). Sadece uzun aralıklarla hafızayı yoklamak için nadiren gelir ve kartta `🎓 Ustalaşılan Soru` rozeti yanar.
- **Takılınan Sorular (Yanlış $\ge 1$):** Yanlış sayısı kadar ağırlığı katlanarak artar ve `⚠️ Sık Yanıldığın Soru` rozetiyle öncelikli olarak tekrar tekrar karşınıza çıkarılır.

---

## 3. 🎯 Çift Yönlü Test Formatları

- 📍 **İsimden Haritada Bul (ÖSYM Tipi I-V / A-E):** İsim verilir -> Haritada 2-5 adet parıldayan harita pini (I-V) belirir. Doğrudan haritadan veya klavyeden cevaplanır.
- 🔍 **Konumdan İsmi Bul (Klasik):** Haritada 1 yer parıldar -> Şıklardan ismi bulunur.
- 🎲 **Karışık Sürpriz Modu:** Her soruda rastgele bir mod gelir.

---

## 4. 📋 Doğrudan JSON Yapıştırma & Harita Katmanları
- NotebookLM çıktısını kopyalayıp dosyasız tek tıkla yapıştırma desteği.
- 5 Harita Katmanı (Sade, Fiziki, Gerçek Uydu, Gece, Kabartı) ve açılıp kapanabilir Otomatik Odak (Auto-Zoom).
