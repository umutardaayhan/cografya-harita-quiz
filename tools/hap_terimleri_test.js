/**
 * 🔑 data/hap_terimleri.js DENETİMİ
 *
 * Çalıştırma:  node tools/hap_terimleri_test.js
 *
 * Hap terimleri paket dosyalarından AYRI bir katmandır (paketler derleyiciyle
 * üretildiği için). Ayrı katmanın riski sessiz kaymadır: pakete yeni kayıt
 * eklenir ama terimi yazılmaz, ya da bir kayıt silinir ve terimi öksüz kalır.
 * Bu test ikisini de ve biçim kurallarını yakalar.
 */
const fs = require('fs');
const path = require('path');
const { HAP_TERIMLERI } = require('../data/hap_terimleri.js');

let hata = 0;
const kontrol = (ad, kosul, detay) => {
  console.log((kosul ? '  ✓ ' : '  ✗ ') + ad + (detay ? '  → ' + detay : ''));
  if (!kosul) hata++;
};

const PAKET_DIZINI = path.join(__dirname, '..', 'data', 'packs');
const kayitlar = [];
for (const f of fs.readdirSync(PAKET_DIZINI).filter(f => /^pack\..+\.js$/.test(f))) {
  for (const satir of fs.readFileSync(path.join(PAKET_DIZINI, f), 'utf8').split('\n')) {
    const t = satir.trim().replace(/,$/, '');
    if (!t.startsWith('{"id"')) continue;
    const o = JSON.parse(t);
    kayitlar.push({ id: o.id, ad: (o.i18n && o.i18n.tr && o.i18n.tr.name) || o.id });
  }
}
const kimlikler = new Set(kayitlar.map(k => k.id));

console.log('KAPSAM:');
const eksik = kayitlar.filter(k => !HAP_TERIMLERI[k.id]);
const oksuz = Object.keys(HAP_TERIMLERI).filter(id => !kimlikler.has(id));
kontrol(`${kayitlar.length} kaydın hepsinin terimi var`, eksik.length === 0,
  eksik.length ? eksik.slice(0, 8).map(k => k.id).join(', ') : '');
kontrol('Paketlerde olmayan (öksüz) kimlik yok', oksuz.length === 0, oksuz.slice(0, 8).join(', '));

console.log('\nBİÇİM:');
const kelime = s => s.trim().split(/\s+/).length;
const sade = s => String(s).toLocaleLowerCase('tr-TR').replace(/\s*\(.*?\)/g, '').trim();
let sayiHata = [], kelimeHata = [], bosHata = [], tekrarHata = [], adHata = [];
for (const k of kayitlar) {
  const t = HAP_TERIMLERI[k.id];
  if (!t) continue;
  if (!Array.isArray(t) || t.length < 1 || t.length > 2) sayiHata.push(k.id);
  (t || []).forEach(x => {
    if (typeof x !== 'string' || !x.trim()) bosHata.push(k.id);
    else if (kelime(x) > 2) kelimeHata.push(`${k.id}: "${x}"`);
    if (sade(x) === sade(k.ad)) adHata.push(`${k.id}: "${x}"`);
  });
  if (t && t.length === 2 && sade(t[0]) === sade(t[1])) tekrarHata.push(k.id);
}
kontrol('Kayıt başına 1-2 terim', sayiHata.length === 0, sayiHata.slice(0, 8).join(', '));
kontrol('Her terim en fazla 2 kelime', kelimeHata.length === 0, kelimeHata.slice(0, 8).join(' | '));
kontrol('Boş terim yok', bosHata.length === 0, bosHata.slice(0, 8).join(', '));
kontrol('Aynı kayıtta tekrar eden terim yok', tekrarHata.length === 0, tekrarHata.slice(0, 8).join(', '));
kontrol('Terim kaydın kendi adını tekrar etmiyor', adHata.length === 0, adHata.slice(0, 8).join(' | '));

const hepsi = Object.values(HAP_TERIMLERI).flat();
const tekKelime = hepsi.filter(x => kelime(x) === 1).length;
console.log(`\n  ${hepsi.length} terim · tek kelime ${tekKelime} · iki kelime ${hepsi.length - tekKelime}`);

console.log(hata ? `\n❌ ${hata} kontrol başarısız` : '\n✅ TÜM KONTROLLER GEÇTİ');
process.exit(hata ? 1 : 0);
