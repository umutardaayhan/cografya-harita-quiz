/**
 * 🔗 EVRENSEL ELEMAN BİRLEŞTİRME MOTORU
 *
 * AMAÇ: Aynı gerçek cevabı temsil eden ama haritanın farklı yerlerinde /
 * farklı kategorilerde duran kayıtları TEK BİR ORTAK CEVABA indirger.
 *
 *   grp_agri_dagi_zirve   → Ağrı Dağı + Küçük Ağrı        (aynı kategori)
 *   tarim_grp_konya       → buğday + arpa + mısır + …     (aynı il)
 *   grp_karapinar_havzasi → obruk + kumul + kuraklık + GES (4 farklı kategori)
 *
 * Bu olmadan iki sorun çıkıyordu:
 *   1. Aynı yer iki ayrı soru olarak soruluyordu (gereksiz tekrar),
 *   2. Bir üye sorulup diğeri şık olarak gelebiliyordu — iki doğru cevap.
 *      (2. sorun quiz.js/areLocationsSame ile zaten engelleniyordu, ama
 *       asıl çözüm kayıtları baştan birleştirmektir.)
 *
 * ÖNEMLİ: Birleştirme HER ZAMAN verilen havuzun içinde yapılır. Kategori
 * havuzunda o kategorideki üyeler, genel havuzda (deneme/şimşek/fatih) tüm
 * üyeler birleşir. Böylece kullanıcı hangi kapsamda çalışıyorsa birleşme de
 * o kapsamda olur; kategoriler arası bağ genel modlarda kendini gösterir.
 *
 * Alt tür süzgeci birleştirmeden ÖNCE uygulanmalıdır; aksi halde "Volkanik
 * Dağlar" filtresi volkanik olmayan bir grup üyesini de içeri sokar.
 */

/** Bir kaydın haritadaki temsilî merkezi */
function grupMerkezi(item) {
  if (typeof item.lat === 'number' && typeof item.lng === 'number') {
    return [item.lat, item.lng];
  }
  const koord = item.coordinates;
  if (Array.isArray(koord) && koord.length) {
    let la = 0, ln = 0, n = 0;
    koord.forEach(p => {
      if (Array.isArray(p) && p.length >= 2) { la += p[0]; ln += p[1]; n++; }
    });
    if (n) return [la / n, ln / n];
  }
  return null;
}

/** Birden çok üyeden birleşik (composite) bir kayıt üretir */
function birlesikKayitYap(gid, uyeler) {
  // Merkez: üyelerin temsilî merkezlerinin ortalaması
  let la = 0, ln = 0, n = 0;
  uyeler.forEach(m => {
    const c = grupMerkezi(m);
    if (c) { la += c[0]; ln += c[1]; n++; }
  });
  const merkez = n ? [Number((la / n).toFixed(5)), Number((ln / n).toFixed(5))] : [39, 35];

  const tekilBirlestir = (alan) => uyeler
    .map(m => m[alan])
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i);

  // Ad: veri "groupName" verdiyse o, yoksa en kısa üye adı (genelde en genel olan)
  const grupAdi = uyeler.find(m => m.groupName)?.groupName
    || uyeler.map(m => m.name).filter(Boolean).sort((a, b) => a.length - b.length)[0]
    || gid;

  // Alt tür anahtarlarının BİRLEŞİMİ: composite, üyelerinin tüm alt türlerine aittir
  const altTurler = [];
  uyeler.forEach(m => (m.sub || []).forEach(s => { if (!altTurler.includes(s)) altTurler.push(s); }));

  // Oluşum sınıfı yalnızca TÜM üyeler aynıysa korunur (oluşum quizi bozulmasın)
  const olusumlar = tekilBirlestir('olusumKey');
  const oncu = uyeler[0];

  return {
    id: gid,
    groupId: gid,
    name: grupAdi,
    shortName: uyeler.find(m => m.shortName)?.shortName || grupAdi,
    category: oncu.category,
    shapeType: 'composite',
    coordinates: uyeler.map(m => m.coordinates).filter(Boolean),
    lat: merkez[0],
    lng: merkez[1],
    type: tekilBirlestir('type').join(' & ') || 'Birleşik Saha',
    region: tekilBirlestir('region').join(' & ') || 'Çoklu Bölge',
    city: tekilBirlestir('city').join(' & '),
    kpssNot: uyeler.map(m => m.kpssNot).filter(Boolean).join(' | '),
    sub: altTurler,
    tier: Math.min(...uyeler.map(m => m.tier || 3)),
    olusumKey: olusumlar.length === 1 ? olusumlar[0] : undefined,
    packId: oncu.packId,
    color: oncu.color,
    isCustomUserAdded: uyeler.every(m => m.isCustomUserAdded),
    isGroup: true,
    groupItems: uyeler,                    // haritada hepsi birlikte parlar
    memberIds: uyeler.map(m => m.id),      // cevap kontrolünde tanınan alt id'ler
    kategoriler: tekilBirlestir('category') // hangi kategorileri kapsıyor
  };
}

/**
 * Bir kayıt listesini birleştirir.
 * groupId taşımayan ya da havuzda tek üyesi kalan kayıtlar aynen geçer.
 *
 * @param {Array} items
 * @returns {Array} birleştirilmiş liste (giriş sırası korunur)
 */
function gruplaHavuz(items) {
  if (!Array.isArray(items) || !items.length) return [];

  // Havuzdaki grup üyelerini say
  const sayac = new Map();
  items.forEach(it => {
    if (it && it.groupId) sayac.set(it.groupId, (sayac.get(it.groupId) || 0) + 1);
  });

  const islenen = new Set();
  const sonuc = [];

  items.forEach(it => {
    if (!it) return;
    const gid = it.groupId;

    // Grupsuz, zaten birleşik ya da havuzda tek kalmış üye: olduğu gibi
    if (!gid || it.isGroup || sayac.get(gid) < 2) { sonuc.push(it); return; }

    if (islenen.has(gid)) return;          // grup zaten eklendi
    islenen.add(gid);

    const uyeler = items.filter(m => m && m.groupId === gid && !m.isGroup);
    sonuc.push(birlesikKayitYap(gid, uyeler));
  });

  return sonuc;
}

/** Bir kaydın (veya composite'in) kapsadığı tüm id'ler */
function grupUyeIdleri(item) {
  if (!item) return [];
  if (item.isGroup && Array.isArray(item.memberIds)) return item.memberIds.slice();
  return [item.id];
}
