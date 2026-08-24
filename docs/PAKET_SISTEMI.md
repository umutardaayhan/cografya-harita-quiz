# 📦 Paket (DLC) Sistemi — Mimari ve Yazım Kılavuzu

Bu belge, uygulamanın veri katmanının nasıl **kurulabilir/kaldırılabilir konu
paketlerine** bölündüğünü ve bu yapının [Globalleşme Yol Haritası](GLOBALLESTIRME_YOL_HARITASI.md)
ile nasıl bağlandığını anlatır.

---

## 🎯 Amaç

Kullanıcı her şeye değil, **yalnızca çalışmak istediği konulara** erişir. Siteye
ilk giren kişi haritayla değil, 3 adımlık bir rehber ve **Paket Mağazası** ile
karşılaşır; oradan seçtiği paketleri **az / orta / tam** detay kademesinde indirir.
Harita, testler, günlük plan ve oyun modları indirilen paketlere göre şekillenir.

---

## 📚 Paket Kataloğu (18 paket · 472 kayıt)

Mağaza dört GRUP sekmesi, bir arama kutusu ve sayfalama ile gezilir
(sayfa başına 9 kart). Kademe sütunu `Az / Orta / Tam` kayıt sayılarıdır.

### ⛰️ Fiziki Coğrafya
| Paket | id | Az / Orta / Tam |
| :--- | :--- | :--- |
| 🏔️ Dağlar & Sıradağlar | `tr.daglar` | 12 / 22 / 34 |
| 🌊 Akarsular & Göller | `tr.sular` | 26 / 42 / 55 |
| 🌾 Ovalar & Platolar | `tr.ova_plato` | 19 / 28 / 41 |
| 🚪 Geçitler & Boğazlar | `tr.gecitler` | 6 / 10 / 12 |
| 🌡️ İklim & Bitki Örtüsü | `tr.iklim_orman` | 15 / 19 / 23 |
| 🟫 Toprak Tipleri | `tr.toprak` | 8 / 11 / 15 |
| ⚠️ Doğal Afet Bölgeleri | `tr.afet` | 10 / 13 / 18 |
| 💥 Fay Hatları & Tektonik Yapı | `tr.fay` | 8 / 13 / 16 |
| 🏖️ Kıyılar, Adalar & Denizler | `tr.kiyilar` | 12 / 22 / 33 |
| 🌬️ Dış Kuvvetler & Yerşekilleri | `tr.dis_kuvvetler` | 10 / 18 / 26 |

### 👥 Beşeri Coğrafya
| Paket | id | Az / Orta / Tam |
| :--- | :--- | :--- |
| 👥 Nüfus, Yerleşme & Göç | `tr.nufus` | 11 / 16 / 22 |
| 🗺️ 7 Bölge & 21 Bölüm | `tr.bolgeler` | 10 / 18 / 28 |
| 🔗 İlişkili Eşleştirmeler | `tr.iliskiler` | 11 / 14 / 16 |

### 🏭 Ekonomik Coğrafya
| Paket | id | Az / Orta / Tam |
| :--- | :--- | :--- |
| 🚜 Tarım, Hayvancılık & Sanayi | `tr.beseri` | 19 / 30 / 41 |
| ⛏️ Madenler & Enerji Kaynakları | `tr.madenler` | 12 / 23 / 35 |
| 🏛️ Turizm & Kültür Mirası | `tr.turizm` | 13 / 20 / 31 |
| 🚢 Ulaşım & Ticaret Koridorları | `tr.ulasim` | 10 / 18 / 26 |

### 📐 Modüller
| Paket | id | Not |
| :--- | :--- | :--- |
| 📐 Matematiksel Konum Laboratuvarı | `tr.mutlak_konum` | Sanal paket — 5 hesaplama modunun kilidini açar |

---

## 🧠 Temel Karar: `COGRAFYA_DATA` artık türetilmiş bir görünümdür

Paket sisteminden önce `data/cografya_data.js` hem **veri kaynağı** hem de
**çalışma zamanı havuzu**ydı. Artık bu ikisi ayrıldı:

```
data/cografya_data.legacy.js   ← YAZIM KAYNAĞI (elle düzenlenir, uygulamaya yüklenmez)
          │
          │  node tools/build_packs.js
          ▼
data/packs/catalog.js          ← paylaşılan kategori + alt tür + paket manifesti
data/packs/pack.tr.*.js        ← DLC dosyaları (lazy yüklenir)
          │
          │  PackManager.rebuild()   (yalnızca KURULU paketler, kademe eşiğiyle)
          ▼
COGRAFYA_DATA / CATEGORIES / SUB_TYPES   ← çalışma zamanı kapları
```

Kaplar **yerinde (in-place)** mutasyona uğratılır — referansları asla yeniden
atanmaz. Bu yüzden `quiz.js`, `map.js`, `study_plan.js`, `geoguessr.js`,
`conqueror.js`, `match_game.js`, `olusum_quiz.js` ve `boyama_quiz.js` **tek satır
bile değişmeden** çalışır; sadece gördükleri havuz kullanıcının indirdiği kadardır.

Kurulu paketi olmayan kategori `COGRAFYA_DATA`'da **hiç bulunmaz** (boş dizi bile
değil). Rastgele kategori seçen oyun modları (ör. Kör Atış) böylece boş havuza düşmez.

---

## 🗂️ Dosya Düzeni

| Dosya | Rol |
| :--- | :--- |
| `data/cografya_data.legacy.js` | İlk yazım kaynağı (fiziki + temel ekonomik coğrafya). Uygulamada **yüklenmez**. |
| `data/source/*.js` | Ek yazım kaynakları. Numaralı dosyalar sırayla okunup birleştirilir; yeni konu = yeni dosya. |
| `tools/build_packs.js` | Derleyici. Kaynağı paketlere böler, kademe/alt tür/oluşum alanlarını hesaplar. |
| `data/packs/catalog.js` | Paylaşılan kayıt defteri: ülkeler, kategoriler, alt türler, paket manifestleri. |
| `data/packs/pack.tr.*.js` | Paket içerikleri. Kendilerini `GeoPacks.register()` ile kaydeder. |
| `data/cografya_data.js` | Boş çalışma zamanı kapları + Türkçe-güvenli `trLower`/`trUpper`. |
| `js/pack_manager.js` | DLC motoru: kurulum, kademe, kaldırma, projeksiyon, mod kilitleri. |
| `js/pack_store_ui.js` | Rehber ekranı + mağaza arayüzü. |
| `js/i18n.js` | Çift katmanlı dil motoru. |
| `locales/tr.js`, `locales/en.js` | Arayüz metin sözlükleri. |
| `css/packs.css` | Rehber, mağaza ve kilit stilleri. |

> **Neden `.js`, `.json` değil?** `fetch()` `file://` altında CORS'a takılır,
> `<script>` takılmaz. Uygulama yerel sunucu olmadan da açılabilsin diye paketler
> kendilerini çağıran JS dosyalarıdır (JSONP mantığı).

---

## 🧬 Paket Kayıt Şeması

```js
GeoPacks.register('tr.daglar', {
  version: 1,
  country: 'tr',
  categories: ['daglar'],
  items: [
    {
      id: 'dag_agri',
      cat: 'daglar',
      tier: 1,                                  // 1=Az  2=Orta  3=Tam
      sub: ['volkanik'],                        // DİLDEN BAĞIMSIZ alt tür anahtarları
      formation: 'volkanik',                    // oluşum sınıfı (olusumKey)
      geom: { t: 'point', lat: 39.70, lng: 44.30 },
      i18n: {
        tr: { name: 'Ağrı Dağı (Büyük Ağrı)', type: 'Volkanik Dağ',
              region: 'Doğu Anadolu', city: 'Ağrı / Iğdır', note: '...' },
        en: { name: 'Mount Ararat', type: 'Volcanic Mountain', ... }   // isteğe bağlı
      }
    }
  ]
});
```

`geom.t` `polyline`/`polygon` olduğunda koordinat dizisi `geom.c` alanında durur.

### Çalışma zamanı projeksiyonu

`PackManager.project()` bu kaydı uygulamanın her yerinde beklenen **düz** biçime
çevirir ve `i18n` bloğunu aktif dile göre çözer:

```js
{ id, name, category, type, lat, lng, region, city, kpssNot,
  shapeType, coordinates?, areaKm2?, matchType?, shortName?, matchSource?,
  questionText?, promptTitle?,
  tier, sub, olusumKey?, packId }
```

Dil değişince tek yapılan `rebuild()` çağırmaktır; tüm isimler ve notlar yeniden
projekte edilir.

---

## 🎚️ Kademe (tier) Sistemi

Kurulum kademesi bir **eşiktir**: `item.tier <= kurulanKademe` olan kayıtlar görünür.

| Kademe | Anlam |
| :--- | :--- |
| 1 · Az | Çekirdek — sınav rekorları ve en çok sorulan kayıtlar |
| 2 · Orta | Çekirdek + sık sorulan ikinci halka |
| 3 · Tam | Paketteki her kayıt |

Kademe ataması `tools/build_packs.js` içinde yapılır. Puanlama iki bileşenlidir:
`kpssNot`/`name` içindeki üstünlük ifadeleri ("en yüksek", "ilk", "tek", "rekor"…)
ve kaynak dosyadaki sıra (dosya zaten kabaca önem sırasındadır). Ardından dört
**güvence** uygulanır:

1. Kategori başına tier 1'de en az 6 kayıt (test çeldirici havuzu için).
2. Her alt türden en az 1 kayıt tier 1'de (boş filtre rozeti olmasın).
3. Her oluşum sınıfından en az 2 kayıt tier 1'de (Oluşum & Boyama oyunları).
4. Her eşleştirme türünden en az 3 kayıt tier 1'de (Şekil Yapbozu çift üretebilsin).

Kademeleri elle ayarlamak için `data/cografya_data.legacy.js`'deki kayda
`tier: 1` gibi bir alan eklemek yeterli değildir — bunun yerine derleyicideki
`SUPERLATIVES`/`TIER_RATIO` ayarlarını değiştirin ya da üretilen pakete elle
dokunmak istiyorsanız `build_packs.js`'i çalıştırmayı bırakıp paketleri kaynak
kabul edin.

---

## 🔒 Mod Kilitleri

Her paket manifesti `unlocks` listesi taşır (`quiz`, `geoguessr`, `conqueror`,
`match`, `speedrun`, `exam`, `olusum`, `boyama`, `mk_*` ve harita görünümleri
için `layer_*`). `app.js` içindeki
`refreshModeLocks()` oyun menüsündeki butonları buna göre kilitler ve açıklamayı
"hangi paket gerekli"ye çevirir.

Asıl engelleme, oyun menüsüne bağlanan **yakalama fazı** dinleyicisiyle yapılır:
kilitli bir butona tıklama oyunu başlatmak yerine mağazayı açar. Bu sayede her
modun kendi başlatma fonksiyonuna ayrı kontrol eklemek gerekmez — yeni bir mod
eklendiğinde tek yapılacak `MODE_BUTTON_MAP`'e bir satır yazmaktır.

`tr.mutlak_konum` **sanal paket**tir: veri dosyası yoktur (`data/mutlak_konum_data.js`
zaten küçük ve her zaman yüklüdür), yalnızca 5 matematiksel konum modunun kilidini açar.

---

## 🧭 Mağaza Gezinmesi (yüzlerce pakete ölçeklenir)

Katalog büyüdükçe kartları tek listede basmak sürdürülemez. Gezinme üç katmanlıdır:

1. **Grup sekmeleri** — `catalog.packs[].group` alanına göre Fiziki / Beşeri /
   Ekonomik / Modüller. Sekmelerde canlı paket sayacı bulunur.
2. **Arama** — paket adı, açıklaması ve kimliği üzerinde Türkçe-güvenli arama
   (`trLower`, böylece "iklim" araması "İklim"i de bulur).
3. **Sayfalama** — sayfa başına `STORE_PAGE_SIZE` (9) kart. Grup ya da arama
   değiştiğinde sayfa başa döner.

Kartlar bilinçli olarak kompakttır (~200 px, öncekinin yarısı): açıklama iki
satırda kesilir, açılan mod listesi tek bir sayaç rozetine (`🎮 7 mod`, tam liste
tooltip'te) indirgenir ve "Kaldır" bir ikon düğmesine dönüşür. Kart yüksekliği
paketten pakete oynamaz.

---

## 📅 Günlük Plan

`js/study_plan.js` içindeki sabit `DAILY_PLAN_SPEC` kaldırıldı. Plan satırları
artık kurulu paketlerin manifestlerindeki `planRows` alanından türer
(`PackManager.planSpec()`). Kullanıcı bir paketi kaldırdığında o konu plandan da
kendiliğinden düşer; **yeni konu eklemek = yeni paket yayınlamak**.

**Günlük bütçe:** 18 paketin `planRows` toplamı 250+ soruya çıkıyor ve bir
oturumda bitirilemiyordu. `PackManager.planSpec()` toplamı `PLAN_DAILY_BUDGET`
(120) ile sınırlar: aşılırsa satırlar ORANTILI küçültülür (satır başına en az
`PLAN_MIN_ROW` = 4). Böylece her konu planda temsil edilir ama paket sayısı
günlük yükü şişirmez.

---

## 🪟 Menü & Panel Düzeni (paket sayısı arttıktan sonra)

Kategori sayısı 11'den 21'e çıkınca menülerde birkaç yapısal sorun ortaya çıktı.
Düzeltmeler `css/style.css` sonundaki "MENÜ & PANEL DÜZENİ" bölümünde toplandı.

| Belirti | Kök neden | Çözüm |
| :--- | :--- | :--- |
| Üst menü ekranın tamamını kaplıyordu | `.top-nav` daralt-sığdır bir kutuydu; genişliğini en geniş satırından (21 sekme) alıyor, kaydırma hiç devreye girmiyordu | `.top-nav` sabit genişliğe alındı (`min(94vw, 900px)`); sekme satırı içeride ince bir kaydırma çubuğuyla kayıyor |
| Soru paneli tabana yakınken büyüyünce sayfanın altında siyah şerit beliriyordu | Paneller `position: absolute` idi; büyüyünce **belgeyi** uzatıyor, tarayıcı da odaklanan düğmeyi göstermek için görünüm alanını kaydırıyordu | Paneller `position: fixed` yapıldı — sabit kutular belge yüksekliğine katkı vermez. Ek olarak PanelManager panelin tamamını görünüm alanına çekiyor |
| Harita editörü araç çubuğu menünün altında kalıyordu | Sabit `top: 76px` ve `z-index: 1001` (üst menü 1500) | `z-index: 1600` ve `top: var(--nav-bottom)`. Menü yüksekliği `app.js` içinde ölçülüp CSS değişkenine yazılıyor |
| Panel, içerik değişince 250 ms zıplıyordu | `.quiz-panel` üzerindeki `transition: all`, yeni eklenen `width` ve `max-height` özelliklerini de animasyona sokuyordu | Geçiş yalnızca görsel özelliklerle (opaklık, gölge, kenarlık) sınırlandı |
| Deneme / Şimşek buton ve modal stilleri masaüstünde hiç uygulanmıyordu | `@media (max-width: 768px)` bloğu **kapanmamıştı**; dosyanın geri kalanı bu sorgunun içinde kalıyordu | Eksik `}` eklendi (mevcut bir hata) |
| Bazı sorularda harita çizilmiyor, panel boş kalıyordu | Leaflet konteyner boyutunu önbelleğe alır. Kap ölçülmeden kurulduğunda önbellek `0x0` kalıyor, `flyToBounds` NaN üretip soru render'ını komple çökertiyordu | `GeographyMap` kabı `ResizeObserver` ile izleyip `invalidateSize()` çağırıyor; uçuş fonksiyonları NaN'a karşı korumalı |

Panellerin görünüm alanı içinde kalması iki gözlemciyle güvenceye alınır:
`ResizeObserver` (boyut değişimi) ve `MutationObserver` (içerik değişimi).
İkincisi mikro görev olarak çalıştığı için panel tek bir kare bile dışarıda kalmaz.

### Harita görünümleri de pakete bağlı

Tile katmanları (Sade / Fiziki / Uydu / Gece / Kabartı) da `unlocks` mekanizmasını
kullanır. `voyager` (Sade) her zaman açıktır — en az bir taban harita gerekir;
diğerleri konusuyla tematik olarak eşleşen paketle gelir:

| Görünüm | Kilit anahtarı | Açan paket |
| :--- | :--- | :--- |
| ⛰️ Fiziki / Topografik | `layer_topo` | Dağlar, Ovalar & Platolar |
| 🏔️ Kabartı / Arazi | `layer_terrain` | Dağlar, Fay Hatları |
| 🛰️ Gerçek Uydu | `layer_satellite` | Turizm, Kıyılar |
| 🌙 Gece / Karanlık | `layer_dark` | Matematiksel Konum |

Kilitli görünüme tıklamak katmanı değiştirmez, mağazayı açar. Kullanılan
görünümün paketi kaldırılırsa harita otomatik olarak Sade'ye döner
(`refreshLayerLocks`, `js/app.js`).

### Mağaza toplu işlemleri

Mağaza altlığında **Tümünü Kur** ve **Tümünü Kaldır** düğmeleri vardır:

- *Tümünü Kur* yalnızca kurulu OLMAYAN paketleri **Orta** kademede kurar; zaten
  kurulu bir paketin kademesine dokunmaz (kullanıcı bilinçli olarak "Az" seçmiş
  olabilir). Paketler tek tek indirildiği için düğme bir ilerleme sayacına döner.
- *Tümünü Kaldır* onay ister. Soru geçmişi silinmez; paketler geri kurulduğunda
  ustalık ve tekrar aralıkları geri gelir.

### Küçültülmüş soru paneli

Panel küçültüldüğünde eskiden gövde tamamen gizleniyor, kullanıcı hangi soruda
olduğunu göremiyordu. Artık **soru başlığı ve kategori rozeti görünür**, şıklar /
hap bilgi kartı / istatistikler / oyun HUD'ları gizli kalır. Böylece panel
haritayı kapatmadan "şu an ne soruluyor" bilgisini taşır.

### Harita ikonları

Dağ, ova, plato ve geçit için elle modellenmiş 3B ikonlar korunur. Diğer tüm
konu kategorileri `js/map.js` başındaki üç tablodan beslenir:

- `TOPIC_CATEGORY_ICON` — kategori emojisi (yedek)
- `TOPIC_SUB_ICON` — alt tür emojisi; anahtarlar paketlerdeki **dilden bağımsız**
  `sub` kimlikleridir, bu yüzden veri İngilizceye çevrildiğinde de çalışır
- `TOPIC_CATEGORY_COLOR` — rozet arka planı ile çokgen/çizgi rengi

Böylece bir liman ⚓, havalimanı ✈️, deprem bölgesi 🏚️, buzul şekli ❄️ olarak
ayrışır. Yeni bir kategori eklendiğinde bu üç tabloya birer satır ve
`css/style.css` içindeki `.topic-badge.topic-<kategori>` kuralına bir renk yazmak
yeterlidir.

---

## 🌐 Globalleşme Bağlantısı

Bu altyapı yol haritasının Faz 1 ve Faz 2'sine doğrudan oturur:

- **Faz 1 (i18n):** Çift katman hazır. Arayüz metinleri `locales/*.js`'te,
  varlık çevirileri paket kayıtlarının `i18n` bloğunda. Alt tür filtreleri ve
  oluşum sınıflandırması artık Türkçe metin eşleştirmesi yerine **dilden bağımsız
  anahtarlar** (`sub`, `formation`) kullanır — veri İngilizceye çevrildiğinde
  sessizce bozulmaz.
- **Faz 2 (SQLite pipeline):** `tools/build_packs.js` ileride yerini alacak
  `build_dataset.py`'nin **ara katmanıdır**. Çıktı şeması aynı olduğu için veri
  kaynağı SQLite'a taşındığında yalnızca derleyicinin **girdi** tarafı değişir.
  Katalogdaki `categories[].canonical` alanı (`daglar → mountains`) doğrudan
  SQL şemasının `categories.id` sütununa eşlenir.
- **Faz 3-4 (ülkeler):** Paket kimlikleri `{ülke}.{konu}` biçimindedir
  (`tr.daglar`, ileride `de.gebirge`). Çalışma zamanı kategori anahtarları
  **opak slug** kabul edilir: Almanya paketi de dağlarını aynı `daglar` kovasına
  doldurur, böylece "Dünya Dağları" gibi çok ülkeli modlar tek havuzdan beslenir.
- **Faz 5 (topluluk paketleri):** Mevcut çizim Export/Import motoru
  (`js/custom_draw.js`) bu şemaya uyarlanarak kullanıcı paketlerinin
  paylaşılmasına açılabilir.

---

## 🛠️ Yeni Paket Ekleme

1. Kayıtları `data/source/` içine yeni bir numaralı dosya olarak yaz
   (ör. `95_madenler_v2.js`). Dosya `Object.assign(COGRAFYA_DATA_EXT, { ... })`
   biçiminde olmalı; yeni bir kategori açıyorsan `90_meta.js` içindeki
   `CATEGORIES_EXT` ve `SUB_TYPES_EXT` listelerine de satır ekle.
2. `tools/build_packs.js` içindeki `PACK_DEFS` dizisine paketi tanımla:
   `id`, `country`, `categories`, ikon/renk, `tr`/`en` başlık ve açıklama,
   `unlocks`, `planRows`, `recommends`.
3. Yeni bir kategori eklediysen `CATEGORY_META`'ya `canonical` + İngilizce başlık
   satırı ekle.
4. `node tools/build_packs.js` çalıştır.
5. İçeriği güncellenen bir paketin `catalog.js`'teki `version` alanını artır —
   CDN'de dosyalar bir yıl `immutable` saklandığı için önbellek ancak `?v=` ile kırılır.

---

## 💾 Depolama ve Geriye Dönük Uyum

| Anahtar | İçerik |
| :--- | :--- |
| `geo_packs_v1` | `{ paketId: { tier, version, at } }`. `null` = hiç karar verilmemiş (ilk giriş). |
| `geo_lang_v1` | Seçili arayüz/veri dili. |

- **Paket kaldırmak ilerlemeyi silmez.** Soru geçmişi (`kpss_cografya_question_analytics`)
  id bazlıdır; paket geri kurulduğunda ustalık ve tekrar aralıkları geri gelir.
- **Eski kullanıcı göçü:** Paket kaydı olmayan ama soru geçmişi olan kullanıcıya
  tüm paketler **tam kademede** otomatik kurulur. Rehber ekranını yalnızca gerçekten
  yeni gelenler görür.

---

## ✅ Veri Sadakati

Derleyici çıktısı kaynakla karşılaştırmalı doğrulandı:

- 222 kaydın tamamı korundu.
- Tüm alt tür filtrelerinde eski/yeni sayım farkı: **0**.
- Oluşum sınıflandırmasında (111 sınıflanabilir kayıt) fark: **0**.
