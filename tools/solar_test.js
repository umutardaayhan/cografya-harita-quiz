/**
 * ☀️ solar.js BİRİM TESTİ
 *
 * Çalıştırma:  node tools/solar_test.js
 *
 * İki tür kontrol var:
 *   1. BİLİNEN DEĞERLER — gündönümü/ekinoks deklinasyonları, 12:00 UTC'de
 *      öğle boylamının Greenwich civarında olması, saatlik 15° dönüş.
 *   2. ÖZ-TUTARLILIK — terminatör poligonunun sınırındaki HER noktada güneş
 *      yüksekliği, bağımsız `elevation()` fonksiyonuyla ölçülüp hedefe
 *      (0° / -6° / -12° / -18°) eşit çıkmalı. Poligon matematiği bozulursa
 *      bu kontrol anında yakalar.
 */
const { Solar } = require('../js/solar.js');

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

// 5) TERMINATÖR ÖZ-TUTARLILIĞI: poligon sınırındaki her noktada güneş
//    yüksekliği hedefe eşit olmalı (bağımsız elevation() ile ölçülür)
console.log('\nTERMINATÖR ÖZ-TUTARLILIĞI (sınırdaki güneş yüksekliği = hedef):');
[['2026-06-21T12:00:00Z', 0], ['2026-06-21T12:00:00Z', -6], ['2026-12-21T03:00:00Z', -12],
 ['2026-03-20T18:00:00Z', 0], ['2026-09-23T09:00:00Z', -18]].forEach(([iso, hedef]) => {
  const t = new Date(iso);
  const halka = Solar.nightPolygon(t, hedef, 2)[0];
  let enKotu = 0, kutupta = 0;
  halka.slice(0, -3).forEach(([lng, lat]) => {
    if (Math.abs(lat) >= 89.999) { kutupta++; return; }   // kutup kapanışı: sınır yok
    const y = Solar.elevation(lat, lng, t);
    enKotu = Math.max(enKotu, Math.abs(y - hedef));
  });
  kontrol(`${iso} hedef ${hedef}° → en büyük sapma ${enKotu.toFixed(4)}° (${kutupta} nokta kutupta)`,
    enKotu < 0.02);
});

// 6) Gece poligonu gerçekten GECE tarafını mı kaplıyor?
console.log('\nGECE TARAFI KONTROLÜ:');
[['2026-06-21T12:00:00Z'], ['2026-12-21T00:00:00Z'], ['2026-04-10T06:00:00Z']].forEach(([iso]) => {
  const t = new Date(iso);
  const halka = Solar.nightPolygon(t, 0, 2)[0];
  const s = Solar.subsolarPoint(t);
  const karanlikKutup = s.decl >= 0 ? -90 : 90;
  // Poligonun kapandığı kutupta güneş gerçekten batmış olmalı
  const kutupYuksekligi = Solar.elevation(karanlikKutup * 0.999, 0, t);
  kontrol(`${iso} → kapanış kutbu ${karanlikKutup}°, orada güneş yüksekliği ${kutupYuksekligi.toFixed(2)}°`,
    kutupYuksekligi < 0);
  kontrol(`  halka ${halka.length} nokta, kapalı`, halka[0][0] === halka[halka.length - 1][0] && halka[0][1] === halka[halka.length - 1][1]);
});

console.log(hata ? `\n❌ ${hata} kontrol başarısız` : '\n✅ TÜM KONTROLLER GEÇTİ');
process.exit(hata ? 1 : 0);
