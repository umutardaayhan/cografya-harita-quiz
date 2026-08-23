# 🚀 Vercel Dağıtım ve GitHub Yayınlama Rehberi

Bu doküman, **Coğrafya Harita Lab** projesinin GitHub üzerinde barındırılması ve Vercel üzerinde kesintisiz (zero-downtime) bir şekilde canlıya alınması için gerekli teknik detayları içerir.

---

## 📦 1. Proje Mimarisi ve Statik Yapı
Proje tamamen saf frontend (Vanilla JavaScript, HTML5, CSS3, Leaflet.js) mimarisine sahiptir. Herhangi bir Node.js build aşamasına gerek duyulmaksızın tarayıcı üzerinde yerel olarak çalışır.

### `vercel.json` Yapılandırması:
- **Clean URLs:** `.html` uzantısı olmadan temiz URL yönlendirmeleri sağlar.
- **Cache-Control:** `css/`, `js/` ve `data/` dizinleri için 1 yıllık statik önbellekleme (`public, max-age=31536000, immutable`) uygular.
- **Güvenlik Başlıkları:** `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection` ve `Referrer-Policy` başlıkları eklenmiştir.

---

## 🛠️ 2. GitHub Üzerinde Yeni Repo Oluşturma

1. GitHub'da oturum açın ve **New Repository** seçeneğine tıklayın.
2. **Önerilen Repo İsimleri:**
   - ⭐ `cografya-harita-quiz` *(Önerilen)*
   - `cografya-harita-lab`
   - `kpss-cografya-harita`
   - `geo-cografya-lab`
3. Repository'yi **Public** yapın.
4. Yerel dizinde terminalden aşağıdaki komutlarla reponuzu GitHub'a bağlayıp push edin:
   ```bash
   git remote add origin https://github.com/umutardaayhan/<REPO_ISMI>.git
   git branch -M main
   git push -u origin main
   ```

---

## ⚡ 3. Vercel Entegrasyonu

1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin.
2. **Add New... -> Project** butonuna tıklayın.
3. GitHub reponuzu (`cografya-harita-quiz`) içe aktarın (Import).
4. Ayarlar:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./`
   - **Build Command:** *(Boş bırakın)*
   - **Output Directory:** *(Boş bırakın)*
5. **Deploy** butonuna basarak canlıya alın.

---

## 🌐 4. Gelecek Vizyonu: Çoklu Dil & Dünya Coğrafyası (i18n)
Mevcut modüler `data/cografya_data.js` ve `js/map.js` mimarisi, dünya haritaları ve farklı diller entegre edildiğinde doğrudan yeni veri modülleri eklenerek genişletilebilecek şekilde tasarlanmıştır.
