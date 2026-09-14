/**
 * 🖼️ GÖRSEL DERLEYİCİSİ
 *
 * tools/gorsel_kaynaklari.json (kayıt → Wikipedia makalesi) okunur; her kayıt
 * için SERBEST LİSANSLI bir Wikimedia Commons görseli bulunur ve
 * data/gorseller.js yazılır.
 *
 * Kullanım:  node tools/build_gorseller.js
 *
 * NEDEN DERLEME ANINDA, NEDEN ÇALIŞMA ZAMANINDA DEĞİL:
 *   - Uygulama file:// altında da açılıyor; her açılışta Wikipedia API'sine
 *     sorgu atmak hem yavaş hem kırılgan olurdu.
 *   - Lisans denetimi bir kez, burada, kurallı yapılır: serbest olmayan
 *     ("adil kullanım") görsel veriye hiç girmez.
 *   - Uygulama yalnızca hazır küçük resim adresini ve atıf bilgisini okur.
 *
 * NEDEN GÖRSELLER DEPOYA İNDİRİLMİYOR: 106 fotoğraf depoyu onlarca MB
 * şişirirdi. Commons küçük resimleri doğrudan gösterilir (Wikimedia buna izin
 * verir); CC lisanslarının şartı olan atıf (yazar + lisans + kaynak bağlantısı)
 * her görselin altında gösterilir. Çevrimdışıyken görsel yüklenmez, uygulama
 * görselsiz çalışmaya devam eder.
 *
 * GÖRSEL SEÇİM SIRASI (her aday başlık için):
 *   1. Makalenin Wikidata kaydındaki "görsel" (P18) — topluluk tarafından
 *      konuyu temsil etmek üzere seçilmiştir ve her zaman Commons'tadır.
 *   2. Makalenin serbest lisanslı ana görseli (page_image_free).
 *   Kaynak dosyada {"dosya": "X.jpg"} verilirse seçim atlanır (elle düzeltme).
 */

const fs = require('fs');
const path = require('path');

const KOK = path.join(__dirname, '..');
const KAYNAK = path.join(__dirname, 'gorsel_kaynaklari.json');
const CIKTI = path.join(KOK, 'data', 'gorseller.js');
const GENISLIK = 500;                  // Wikimedia'nın standart küçük resim adımlarından
const UA = 'cografya-harita-quiz/1.0 (https://github.com/umutardaayhan/cografya-harita-quiz)';

/** Kabul edilen lisanslar: yalnızca serbest (atıflı ya da kamu malı) */
const SERBEST = /^(CC0|Public domain|PD|No restrictions|CC BY(-SA)? [0-9.]+|CC-BY(-SA)?-[0-9.]+|Attribution)/i;

const bekle = ms => new Promise(r => setTimeout(r, ms));

async function api(url, deneme = 3) {
  for (let i = 0; i < deneme; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (r.status === 429) { await bekle(2000 * (i + 1)); continue; }
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return await r.json();
    } catch (e) {
      if (i === deneme - 1) throw e;
      await bekle(800 * (i + 1));
    }
  }
  // Döngü yalnızca her denemede 429 alınırsa buraya düşer. Eskiden fonksiyon
  // sessizce `undefined` dönüyor, çağıran "reading 'claims'" diye çöküyordu.
  throw new Error('istek sınırı (429) aşıldı: ' + url.slice(0, 80));
}

const q = o => Object.entries(o).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');

/** "en:Başlık" → {makale, wikidata, serbestGorsel} */
async function makaleCoz(aday) {
  const m = /^([a-z]{2,3}):(.+)$/.exec(aday);
  if (!m) throw new Error('biçim "dil:Başlık" olmalı: ' + aday);
  const [, dil, baslik] = m;
  const j = await api(`https://${dil}.wikipedia.org/w/api.php?` + q({
    action: 'query', titles: baslik, redirects: 1, prop: 'pageprops', format: 'json'
  }));
  const sayfa = Object.values((j.query && j.query.pages) || {})[0];
  if (!sayfa || sayfa.missing !== undefined) return null;
  const pp = sayfa.pageprops || {};
  return {
    makale: `https://${dil}.wikipedia.org/wiki/${encodeURIComponent(sayfa.title.replace(/ /g, '_'))}`,
    wikidata: pp.wikibase_item || null,
    serbestGorsel: pp.page_image_free || null
  };
}

async function wikidataGorseli(qid) {
  if (!qid) return null;
  const j = await api('https://www.wikidata.org/w/api.php?' + q({
    action: 'wbgetclaims', entity: qid, property: 'P18', format: 'json'
  }));
  const iddia = ((j.claims || {}).P18 || [])[0];
  return iddia && iddia.mainsnak && iddia.mainsnak.datavalue ? iddia.mainsnak.datavalue.value : null;
}

const htmlSil = s => String(s || '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
  .replace(/&#0?39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

/** Commons dosyası → küçük resim + lisans; serbest değilse ya da yoksa null */
async function commonsDosyasi(dosya) {
  const j = await api('https://commons.wikimedia.org/w/api.php?' + q({
    action: 'query', titles: 'File:' + dosya, prop: 'imageinfo',
    iiprop: 'url|size|extmetadata|mime', iiurlwidth: GENISLIK, format: 'json'
  }));
  const sayfa = Object.values((j.query && j.query.pages) || {})[0];
  const ii = sayfa && sayfa.imageinfo && sayfa.imageinfo[0];
  if (!ii) return { red: 'Commons\'ta yok' };
  if (!/^image\/(jpeg|png|webp)$/.test(ii.mime)) return { red: 'biçim ' + ii.mime };
  const md = ii.extmetadata || {};
  const lisans = htmlSil(md.LicenseShortName && md.LicenseShortName.value);
  if (!SERBEST.test(lisans)) return { red: 'lisans "' + lisans + '"' };
  let yazar = htmlSil(md.Artist && md.Artist.value) || htmlSil(md.Credit && md.Credit.value) || 'Bilinmiyor';
  if (yazar.length > 60) yazar = yazar.slice(0, 57).trim() + '…';
  return {
    src: ii.thumburl,
    w: ii.thumbwidth,
    h: ii.thumbheight,
    sayfa: ii.descriptionurl,
    yazar,
    lisans,
    lisansUrl: (md.LicenseUrl && md.LicenseUrl.value) || ''
  };
}

async function kayitCoz(id, tanim) {
  const adaylar = [].concat(tanim);
  const notlar = [];
  for (const aday of adaylar) {
    if (aday && typeof aday === 'object' && aday.dosya) {
      const g = await commonsDosyasi(aday.dosya);
      if (g && !g.red) return { ...g, makale: aday.makale || '', kaynak: 'elle' };
      notlar.push(`${aday.dosya}: ${g.red}`);
      continue;
    }
    const mk = await makaleCoz(aday);
    if (!mk) { notlar.push(`${aday}: makale yok`); continue; }
    const dosyalar = [];
    const p18 = await wikidataGorseli(mk.wikidata);
    if (p18) dosyalar.push(['P18', p18]);
    if (mk.serbestGorsel && mk.serbestGorsel.replace(/_/g, ' ') !== (p18 || '').replace(/_/g, ' ')) {
      dosyalar.push(['makale', mk.serbestGorsel]);
    }
    for (const [kaynak, dosya] of dosyalar) {
      const g = await commonsDosyasi(dosya);
      if (g && !g.red) return { ...g, makale: mk.makale, kaynak };
      notlar.push(`${aday} ${kaynak} ${dosya}: ${g.red}`);
    }
    if (!dosyalar.length) notlar.push(`${aday}: görsel yok`);
  }
  return { hata: notlar.join(' | ') || 'aday yok' };
}

(async () => {
  const kaynak = JSON.parse(fs.readFileSync(KAYNAK, 'utf8'));
  delete kaynak._aciklama;

  // Kaynak dosyadaki her kimlik gerçekten paketlerde var mı?
  const kimlikler = new Set();
  for (const f of fs.readdirSync(path.join(KOK, 'data', 'packs')).filter(f => /^pack\..+\.js$/.test(f))) {
    for (const s of fs.readFileSync(path.join(KOK, 'data', 'packs', f), 'utf8').split('\n')) {
      const t = s.trim().replace(/,$/, '');
      if (t.startsWith('{"id"')) kimlikler.add(JSON.parse(t).id);
    }
  }
  const bilinmeyen = Object.keys(kaynak).filter(id => !kimlikler.has(id));
  if (bilinmeyen.length) { console.error('✖ Paketlerde olmayan kimlik: ' + bilinmeyen.join(', ')); process.exit(1); }

  const sonuc = {}, hatalar = [];
  let i = 0;
  for (const [id, tanim] of Object.entries(kaynak)) {
    i++;
    try {
      const r = await kayitCoz(id, tanim);
      if (r.hata) { hatalar.push(`${id}: ${r.hata}`); console.log(`  ✗ [${i}] ${id}  ${r.hata}`); }
      else { sonuc[id] = r; console.log(`  ✓ [${i}] ${id}  ${r.kaynak} · ${r.lisans} · ${r.yazar}`); }
    } catch (e) {
      hatalar.push(`${id}: ${e.message}`);
      console.log(`  ✗ [${i}] ${id}  ${e.message}`);
    }
    await bekle(150);
  }

  const govde = Object.entries(sonuc).map(([id, g]) =>
    `  ${JSON.stringify(id)}: ${JSON.stringify({ src: g.src, w: g.w, h: g.h, yazar: g.yazar, lisans: g.lisans, lisansUrl: g.lisansUrl, sayfa: g.sayfa, makale: g.makale })}`
  ).join(',\n');

  const dosya = `/**
 * 🖼️ GÖRSELLER — önemli mekânların serbest lisanslı fotoğrafları
 *
 * ÜRETİLMİŞ DOSYA — elle düzenlemeyin.  Üretici: node tools/build_gorseller.js
 * Kaynak eşleme: tools/gorsel_kaynaklari.json
 *
 * Görseller Wikimedia Commons'tan doğrudan gösterilir (depoya indirilmez);
 * yalnızca serbest lisanslı (CC / kamu malı) dosyalar kabul edilir. Her
 * görselin altında yazar + lisans + Commons sayfası bağlantısı gösterilir —
 * CC BY / CC BY-SA lisanslarının şartı budur.
 *
 * Görsel YALNIZCA cevap verildikten sonra (hap kartı) ve keşif balonlarında
 * görünür: soru sırasında göstermek cevabı ele verirdi.
 *
 * Kapsam: ${Object.keys(sonuc).length} kayıt (Turizm & Kültür Mirası, Dünya Harikaları, Dünya Yapıları).
 */
const GORSELLER = {
${govde}
};

if (typeof module !== 'undefined' && module.exports) module.exports = { GORSELLER };
`;
  fs.writeFileSync(CIKTI, dosya, 'utf8');
  console.log(`\n✔ ${Object.keys(sonuc).length}/${Object.keys(kaynak).length} kayıt → data/gorseller.js`);
  if (hatalar.length) { console.log(`✖ ${hatalar.length} kayıt çözülemedi`); process.exitCode = 2; }
})().catch(e => { console.error('✖ ' + e.message); process.exit(1); });
