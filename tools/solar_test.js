/**
 * ☀️ solar.js BİRİM TESTİ
 *
 * Çalıştırma:  node tools/solar_test.js
 *
 * Üç tür kontrol var:
 *   1. BİLİNEN DEĞERLER — gündönümü/ekinoks deklinasyonları, 12:00 UTC'de
 *      öğle boylamının Greenwich civarında olması, saatlik 15° dönüş.
 *   2. DİK NOKTA — alt-güneş noktasında yükseklik tam 90° olmalı.
 *   3. SHADER ÖLÇÜTÜNÜN ÇAPRAZ DOĞRULAMASI — `GeceKatmani` shader'ı gündüz/gece
 *      kararını `dot(yüzeyNormali, güneşYönü)` ile veriyor. Buradaki
 *      `Solar.elevation()` ise tamamen farklı bir yolla (küresel trigonometri,
 *      saat açısı) aynı büyüklüğü hesaplıyor. İkisi birbirini tutmazsa
 *      terminatör yanlış yerden geçiyor demektir — bu kontrol onu yakalar.
 *
 * NOT: terminatör poligonu (`nightPolygon`) ve öz-tutarlılık testleri
 * kaldırıldı; sınır artık poligonla değil, piksel başına shader'da çiziliyor
 * (bkz. js/globe_sky.js · GeceKatmani).
 */
const { Solar } = require('../js/solar.js');
// globe_sky.js tarayıcı script'i olarak yazıldığı için Solar'ı global bekler
global.Solar = Solar;
const { GokMekanigi } = require('../js/globe_sky.js');

let hata = 0;
const kontrol = (ad, kosul, detay) => {
  console.log((kosul ? '  ✓ ' : '  ✗ ') + ad + (detay ? '  → ' + detay : ''));
  if (!kosul) hata++;
};

// 1) Deklinasyon: gündönümleri ve ekinokslar
const testler = [
  ['2026-06-21T12:00:00Z', 23.44, 0.25],
  ['2026-12-21T12:00:00Z', -23.44, 0.25],
  ['2026-03-20T12:00:00Z', 0.0, 0.5],
  ['2026-09-23T12:00:00Z', 0.0, 0.5]
];
console.log('DEKLİNASYON (güneşin dik vurduğu enlem):');
testler.forEach(([iso, bekle, tol]) => {
  const s = Solar.subsolarPoint(new Date(iso));
  kontrol(`${iso} → ${s.lat.toFixed(2)}° (beklenen ~${bekle}°)`,
    Math.abs(s.lat - bekle) < tol, `sapma ${Math.abs(s.lat - bekle).toFixed(3)}°`);
});

// 2) Öğle boylamı: 12:00 UTC'de güneş Greenwich civarında (zaman denklemi ±4°)
console.log('\nÖĞLE BOYLAMI (12:00 UTC → ~0°):');
['2026-01-15T12:00:00Z','2026-05-15T12:00:00Z','2026-11-03T12:00:00Z'].forEach(iso => {
  const s = Solar.subsolarPoint(new Date(iso));
  kontrol(`${iso} → ${s.lng.toFixed(2)}°`, Math.abs(s.lng) < 5, `|boylam| ${Math.abs(s.lng).toFixed(2)}°`);
});

// 3) Saatlik dönüş: 1 saatte boylam ~15° batıya kayar
console.log('\nSAATLİK DÖNÜŞ (~15°/saat):');
const t0 = new Date('2026-07-04T00:00:00Z');
const a = Solar.subsolarPoint(t0).lng;
const b = Solar.subsolarPoint(new Date(t0.getTime() + 3600000)).lng;
let d = a - b; if (d < -180) d += 360; if (d > 180) d -= 360;
kontrol(`1 saatte ${d.toFixed(3)}° batıya`, Math.abs(d - 15.0) < 0.1);

// 4) Dik nokta gerçekten dik mi? (elevation = 90°)
console.log('\nDİK NOKTA KONTROLÜ (yükseklik = 90°):');
['2026-02-10T07:13:00Z','2026-08-30T19:41:00Z'].forEach(iso => {
  const t = new Date(iso); const s = Solar.subsolarPoint(t);
  const y = Solar.elevation(s.lat, s.lng, t);
  kontrol(`${iso} → ${y.toFixed(4)}°`, Math.abs(y - 90) < 0.01);
});

// 5) SHADER ÖLÇÜTÜNÜN ÇAPRAZ DOĞRULAMASI
//    GeceKatmani shader'ı:  h = dot(yüzeyNormali, güneşYönü) = sin(yükseklik)
//    Solar.elevation():     küresel trigonometri + saat açısı
//    İki yol birbirinden bağımsız; sonuç aynı olmak ZORUNDA.
console.log();
console.log('SHADER ÖLÇÜTÜ ↔ KÜRESEL TRİGONOMETRİ (bağımsız iki yol):');
[
  '2026-06-21T12:00:00Z', '2026-12-21T03:00:00Z',
  '2026-03-20T18:00:00Z', '2026-09-23T09:00:00Z'
].forEach(iso => {
  const t = new Date(iso);
  const s = Solar.subsolarPoint(t);
  const gunes = GokMekanigi.yuzeyVektoru(s.lng, s.lat);
  let enKotu = 0, nokta = 0;
  for (let lat = -85; lat <= 85; lat += 5) {
    for (let lng = -180; lng < 180; lng += 15) {
      const n = GokMekanigi.yuzeyVektoru(lng, lat);
      const h = n[0] * gunes[0] + n[1] * gunes[1] + n[2] * gunes[2];   // shader'ın h'si
      const shaderYuk = Math.asin(Math.max(-1, Math.min(1, h))) / Solar.RAD;
      const trigYuk = Solar.elevation(lat, lng, t);
      enKotu = Math.max(enKotu, Math.abs(shaderYuk - trigYuk));
      nokta++;
    }
  }
  kontrol(`${iso} → ${nokta} noktada en büyük sapma ${enKotu.toExponential(2)}°`, enKotu < 1e-9);
});

// 6) IŞIK KONUMU GİDİŞ-DÖNÜŞ
//    isikKonumu() MapLibre'nin sphericalToCartesian + işaret tersleme zincirini
//    ANALİTİK OLARAK tersine çözüyor. Zinciri ileri yönde yeniden uygulayıp
//    başladığımız güneş yönüne dönmemiz gerekir; dönmüyorsak atmosfer
//    parlaması yanlış yönden gelir.
console.log();
console.log('IŞIK KONUMU GİDİŞ-DÖNÜŞ (MapLibre light.position çevirimi):');
function mapLibreCartesian([r, azimuthal, polar]) {
  const A = (azimuthal + 90) * Solar.RAD;      // MapLibre "kuzey = 0°" kaydırması
  const P = polar * Solar.RAD;
  return [r * Math.cos(A) * Math.sin(P), r * Math.sin(A) * Math.sin(P), r * Math.cos(P)];
}
[[0, 0], [0, 90], [90, 0], [-23.44, 137.5], [45.2, -78.9], [-60, 179]].forEach(([lat, lng]) => {
  const S = GokMekanigi.yuzeyVektoru(lng, lat);
  const pos = GokMekanigi.isikKonumu(lng, lat);
  const c = mapLibreCartesian(pos);
  // MapLibre güneş yönünü `-cartesian(position)` olarak kullanıyor (draw_sky.ts)
  const geri = c.map(v => -v / pos[0]);
  const sapma = Math.max(...S.map((v, i) => Math.abs(v - geri[i])));
  kontrol(`alt-güneş (${lat}°, ${lng}°) → position [${pos.map(v => v.toFixed(1)).join(', ')}]`,
    sapma < 1e-12, `en büyük bileşen sapması ${sapma.toExponential(2)}`);
});

console.log(hata ? `\n❌ ${hata} kontrol başarısız` : '\n✅ TÜM KONTROLLER GEÇTİ');
process.exit(hata ? 1 : 0);
