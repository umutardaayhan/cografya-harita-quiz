/**
 * ✨ YILDIZ KATALOĞU DERLEYİCİSİ
 *
 * HYG Database v3.8'i indirir, çıplak gözle görünen gökyüzünü (kadir ≤ 6.0)
 * süzer ve `data/yildiz_katalogu.js` dosyasını üretir.
 *
 * NEDEN DERLENİYOR: HYG'nin tamamı sıkıştırılmış hâlde 13 MB, açılmış hâlde
 * 34 MB ve 119.000 yıldız içerir. Bunun 114.000'i çıplak gözle görünmez;
 * tarayıcıya taşınmasının hiçbir karşılığı yok. Süzülmüş alt küme 59 KB'a
 * iner ve GERÇEK takımyıldızları verir — prosedürel serpme bunu vermez.
 *
 * Kullanım:  node tools/build_star_catalog.js
 *
 * Kaynak lisansı: HYG Database, CC BY-SA 2.5 (astronexus/HYG-Database).
 * Türetilmiş çıktı aynı lisansa tabidir; atıf üretilen dosyanın başlığındadır.
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const https = require('https');

const KAYNAK = 'https://raw.githubusercontent.com/astronexus/HYG-Database/main/hyg/v3/hyg_v38.csv.gz';
const KADIR_SINIRI = 6.0;
const CIKTI = path.join(__dirname, '..', 'data', 'yildiz_katalogu.js');

/** Sabit genişlikli base36 — ayırıcı karakteri kazanmak için */
function b36(sayi, genislik) {
  const s = Math.round(sayi).toString(36);
  if (s.length > genislik) throw new Error(`base36 taşması: ${sayi} → ${s} (${genislik} hane)`);
  return s.padStart(genislik, '0');
}

/**
 * CSV satırını alanlara böler. HYG hem başlık satırını hem de metin alanlarını
 * (`proper`, `spect`, `bf`…) tırnaklı yazıyor ve o alanların içinde virgül
 * geçebiliyor; düz `split(',')` sütun hizasını kaydırır.
 */
function csvBol(satir) {
  const alanlar = [];
  let mevcut = '';
  let tirnakta = false;
  for (let i = 0; i < satir.length; i++) {
    const c = satir[i];
    if (c === '"') {
      if (tirnakta && satir[i + 1] === '"') { mevcut += '"'; i++; }   // kaçırılmış tırnak
      else tirnakta = !tirnakta;
    } else if (c === ',' && !tirnakta) {
      alanlar.push(mevcut); mevcut = '';
    } else if (c !== '\r') {
      mevcut += c;
    }
  }
  alanlar.push(mevcut);
  return alanlar;
}

function indir(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return indir(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} — ${url}`));
      const parcalar = [];
      res.on('data', (p) => parcalar.push(p));
      res.on('end', () => resolve(Buffer.concat(parcalar)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  console.log('HYG v3.8 indiriliyor…');
  const gz = await indir(KAYNAK);
  console.log(`  ${(gz.length / 1048576).toFixed(1)} MB indirildi, açılıyor…`);
  const csv = zlib.gunzipSync(gz).toString('utf8');

  const satirlar = csv.split('\n');
  const basliklar = csvBol(satirlar[0].trim());
  const sut = (ad) => basliklar.indexOf(ad);
  const iId = sut('id'), iRa = sut('ra'), iDec = sut('dec'), iMag = sut('mag'), iCi = sut('ci');
  if ([iId, iRa, iDec, iMag, iCi].some(i => i < 0)) {
    throw new Error('HYG sütun düzeni değişmiş: ' + basliklar.slice(0, 20).join(','));
  }

  const yildizlar = [];
  for (let i = 1; i < satirlar.length; i++) {
    const s = satirlar[i];
    if (!s) continue;
    const a = csvBol(s);
    if (a[iId] === '0') continue;                  // Güneş: gökyüzü nesnesi değil
    const ra = parseFloat(a[iRa]), dec = parseFloat(a[iDec]), mag = parseFloat(a[iMag]);
    if (!Number.isFinite(ra) || !Number.isFinite(dec) || !Number.isFinite(mag)) continue;
    if (mag > KADIR_SINIRI) continue;
    const ci = Number.isFinite(parseFloat(a[iCi])) ? parseFloat(a[iCi]) : 0.65;  // Güneş benzeri
    yildizlar.push({ ra, dec, mag, ci });
  }

  // Parlaktan sönüğe: ileride kısmi yükleme yapılırsa parlaklar önce gelsin
  yildizlar.sort((x, y) => x.mag - y.mag);

  const dizge = yildizlar.map(y =>
    b36(Math.min(24000, y.ra * 1000), 4) +
    b36(Math.min(18000, Math.max(0, (y.dec + 90) * 100)), 4) +
    b36(Math.min(1295, Math.max(0, (y.mag + 2) * 10)), 2) +
    b36(Math.min(1295, Math.max(0, (y.ci + 0.5) * 50)), 2)
  ).join('');

  const baslik = `/**
 * ✨ YILDIZ KATALOĞU (çıplak göz gökyüzü · kadir ≤ ${KADIR_SINIRI.toFixed(1)} · ${yildizlar.length} yıldız)
 *
 * ÜRETİLMİŞ DOSYA — elle düzenlemeyin.  Üretici: tools/build_star_catalog.js
 * Kaynak: HYG Database v3.8 (astronexus/HYG-Database, CC BY-SA 2.5) —
 * Hipparcos, Yale Bright Star ve Gliese kataloglarının birleşimi.
 *
 * NEDEN KATALOG, NEDEN PROSEDÜREL DEĞİL: rastgele serpilmiş noktalar "yıldız"
 * gibi durur ama GÖKYÜZÜ gibi durmaz — Büyük Ayı, Orion ya da Güney Çaprazı
 * tanınmıyorsa gerçekçilik iddiası boştur. Bu ${(dizge.length / 1024).toFixed(0)} KB gerçek gökyüzünü
 * verir ve yalnızca küre görünümü ilk açıldığında yüklenir.
 *
 * BİÇİM: ayırıcısız, yıldız başına 12 karakter, base36 sabit genişlik:
 *
 *     [0..4)   ra   → sağ açıklık, 0.001 saat biriminde   (0 … 24000)
 *     [4..8)   dec  → dik açıklık, (derece + 90) × 100    (0 … 18000)
 *     [8..10)  mag  → görünür kadir, (mag + 2) × 10       (Sirius −1.44 → 6)
 *     [10..12) ci   → B−V renk indisi, (ci + 0.5) × 50    (renk sıcaklığı)
 *
 * Kuantalama hatası ra'da ≈0.015°, dec'te 0.01°: kürenin ekranda kaplayabileceği
 * en büyük ölçekte bile piksel altı.
 *
 * ra/dec GÖKSEL (ekvatoral) çerçevededir. Dünya'ya sabit çerçeveye çevirim
 * GMST ile yapılır → bkz. js/globe_sky.js · GokMekanigi.yildizlariCoz()
 */
`;

  fs.writeFileSync(CIKTI, `${baslik}const YILDIZ_KATALOGU = '${dizge}';\n`, 'utf8');
  console.log(`✔ ${yildizlar.length} yıldız → ${path.relative(process.cwd(), CIKTI)} (${(dizge.length / 1024).toFixed(1)} KB dizge)`);
  console.log(`  en parlak: kadir ${yildizlar[0].mag} · ra ${yildizlar[0].ra.toFixed(3)}h · dec ${yildizlar[0].dec.toFixed(2)}°`);
})().catch(e => { console.error('✖ ' + e.message); process.exit(1); });
