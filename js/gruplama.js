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

/* ==========================================================================
 * 🏷️ ETİKET ÜRETİCİLERİ
 *
 * Bir kaydın ekranda görünen adı iki ayrı yerde üretiliyordu (quiz.js'teki
 * "Haritada Bul" başlığı ve app.js'teki şık düğmesi) ve ikisi de farklı
 * davranıyordu:
 *
 *   • quiz.js parantezleri YALNIZCA `name` üzerinden temizliyordu; `shortName`
 *     varsa hiç dokunmuyordu. Sonuç: "📍 Demir (Divriği) ?" sorusu cevabın
 *     ilini kendi başlığında söylüyordu.
 *   • app.js `shortName`i olduğu gibi basıyor, yoksa `name`den parantezi
 *     atıyordu. Sonuç: dört linyit kaydı da şıkta "Linyit" yazıyor, aynı görünen
 *     dört seçenekli bir soru çıkıyordu.
 *
 * Artık ikisi de buradaki ortak üreticileri kullanır.
 * ========================================================================== */

/** Parantez içindeki yöre/nitelik ipuçlarını atarak sade bir etiket üretir */
function sadeEtiket(metin) {
  if (!metin) return '';
  const sade = String(metin).replace(/\s*\([^)]*\)/g, '').replace(/\s{2,}/g, ' ').trim();
  return sade || String(metin).trim();
}

/**
 * "Haritada Bul" sorusunun başlığı. Cevabın konumu sorulduğu için parantez
 * içindeki il/ilçe ipuçları (ör. "Demir (Divriği)") atılır.
 */
function haritadaBulEtiketi(item) {
  if (!item) return '';
  return sadeEtiket(item.shortName || item.name) || (item.name || '');
}

/**
 * Şık düğmelerinin etiketleri.
 *
 * Burada parantezler KORUNUR: "Linyit (Soma - Manisa)" ile "Linyit (Yatağan -
 * Muğla)"yı ayıran tek şey odur ve "(BTC)", "(TÜRASAŞ)" gibi parantezler adın
 * kendisidir. Eski kod parantezi atıp `shortName`i olmayan dört linyit kaydını
 * da "Linyit" diye yazıyor, dört şıkkı aynı görünen bir soru üretiyordu.
 *
 * Yine de iki şık birebir aynı yazacaksa (aynı `shortName`), o şıklara il/yöre
 * bilgisi eklenerek ayrıştırılır.
 */
function sikEtiketleri(secenekler) {
  const liste = (secenekler || []).map(o => ({
    o,
    etiket: (o && (o.shortName || o.name)) || ''
  }));
  const sayac = new Map();
  liste.forEach(x => sayac.set(x.etiket, (sayac.get(x.etiket) || 0) + 1));
  return liste.map(x => {
    if (sayac.get(x.etiket) <= 1) return x.etiket;
    // Ayırt edici ek: önce il/yöre, o da bilgi katmıyorsa tür bilgisi.
    const adaylar = [x.o && x.o.city, x.o && x.o.type];
    const ek = adaylar.find(a => a && !x.etiket.includes(a));
    return ek ? x.etiket + ' — ' + ek : x.etiket;
  });
}

/* ==========================================================================
 * ❓ SORU KÖKÜ (promptTitle) GÜVENLİK DENETİMİ
 *
 * Veride her kaydın elle yazılmış bir KPSS soru kökü (`promptTitle`) var ve
 * bu kökler jenerik "Haritada işaretli konum hangisidir?" cümlesinden çok daha
 * iyi sorular üretiyor. Ancak hepsi her formatta kullanılamaz:
 *
 *   • "Konumdan İsmi Bul"da kök, ŞIKTA YAZAN ADI söylememeli.
 *     ("...Ankara Beypazarı-Kazan trona sahası neresidir?" → cevap "Trona")
 *   • "İsimden Haritada Bul"da kök, CEVABIN İLİNİ söylememeli.
 *     ("...en fazla Sivas ilinde üretilen tahıl neresidir?" → Sivas'a tıkla)
 *
 * Veri tarafında düzeltilebilecekler düzeltildi; burası kalanları sessizce
 * eleyip eski (jenerik ama doğru) kalıba düşen GÜVENLİK AĞI'dır.
 * ========================================================================== */

/** Ad karşılaştırmasında ayırt edici olmayan genel coğrafya sözcükleri */
const GENEL_COGRAFYA_SOZCUKLERI = new Set(('iklim iklimi dag dagi daglari gol golu golleri ova ovasi plato platosu ' +
  'liman limani limanlari kapi kapisi kapilari sinir hat hatti hatlari bolge bolgesi bolgeleri saha sahasi sahalari ' +
  'havza havzasi alan alani alanlari merkez merkezi merkezleri il ili iller fabrika fabrikasi fabrikalari sanayi ' +
  'sanayisi tesis tesisi tesisleri maden madeni madenleri cami camii camileri kilise kilisesi manastir manastiri ' +
  'turbe turbesi milli park parki antik kent kenti yarimada yarimadasi ada adasi deniz denizi korfez korfezi ' +
  'gecit gecidi gecitleri tunel tuneli otoyol otoyolu demiryolu boru santral santrali baraj baraji toprak topragi ' +
  'topraklari kusagi kusak sistemi sistem sehir sehri sehirleri gar gari istasyon istasyonu terminal terminali ' +
  'tipi tipik turk turkiye anadolu guzergahi guzergah etabi kolu agi rafinerisi rafineri ocak ocaklari yatagi ' +
  'yataklari buyuk kucuk yeni eski ilk son orta bati dogu kuzey guney tarihi dogal karma miras mirasi dunya unesco ' +
  'kultur kulturel guncel gaz enerji elektrik uretim uretimi tas tasi vadi vadisi cayi nehri irmagi delta deltasi ' +
  'grup grubu akim akimi bagalantili bagli serbest ticaret').split(' '));

/** Türkçe karakterleri sadeleştirip küçültür (karşılaştırma için) */
function trSade(metin) {
  return String(metin || '').toLocaleLowerCase('tr-TR')
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u');
}

/** `kok` metinde SÖZCÜK BAŞINDA geçiyor mu? (Türkçe ek toleranslı) */
function kokIceriyor(metin, kok) {
  if (!kok || kok.length < 4) return false;
  let i = metin.indexOf(kok);
  while (i !== -1) {
    const onceki = i > 0 ? metin[i - 1] : ' ';
    if (!/[a-z0-9]/.test(onceki)) return true;
    i = metin.indexOf(kok, i + 1);
  }
  return false;
}

/** Kaydın ekranda görünen adından ayırt edici sözcükler */
function adAnahtarlari(item) {
  return trSade((item.shortName || item.name || '').replace(/\([^)]*\)/g, ' '))
    .split(/[^a-z0-9]+/)
    .filter(w => w.length >= 4 && !GENEL_COGRAFYA_SOZCUKLERI.has(w));
}

/** Kaydın il / ilçe adları */
function yerAnahtarlari(item) {
  return String(item.city || '').split(/[(),\-&/]/)
    .map(x => trSade(x.trim()))
    .filter(x => x.length >= 4);
}

/** Kök, şıkta yazan adı ele veriyor mu? */
function promptAdiSizdiriyorMu(item) {
  if (!item || !item.promptTitle) return false;
  const p = trSade(item.promptTitle);
  return adAnahtarlari(item).some(k => kokIceriyor(p, k));
}

/** Kök, cevabın konumunu ele veriyor mu? (kaydın kendi adındaki yer adı sayılmaz) */
function promptYeriSizdiriyorMu(item) {
  if (!item || !item.promptTitle) return false;
  const p = trSade(item.promptTitle);
  const adlar = adAnahtarlari(item);
  return yerAnahtarlari(item).some(k =>
    kokIceriyor(p, k) && !adlar.some(a => k.indexOf(a) === 0 || a.indexOf(k) === 0)
  );
}

/**
 * Kaydın soru kökünü verilen formatta kullanmak güvenli mi?
 * Güvenliyse biçimlendirilmiş metni, değilse null döner.
 */
function guvenliSoruKoku(item, format) {
  if (!item || !item.promptTitle) return null;
  // Birleşik kayıtların kökü yoktur; bir üyenin kökü grubu anlatmaz.
  if (item.isGroup || item.shapeType === 'composite') return null;

  if (format === 'identify') {
    if (promptAdiSizdiriyorMu(item)) return null;
    // Harita zaten şekli gösteriyor: "...haritada neresidir?" → "...hangisidir?"
    return item.promptTitle
      .replace(/\s*haritada\s+(neresidir|nerededir)\s*\?\s*$/i, ' hangisidir?')
      .replace(/\s*(neresidir|nerededir)\s*\?\s*$/i, ' hangisidir?');
  }
  if (format === 'find_on_map') {
    if (promptYeriSizdiriyorMu(item)) return null;
    return item.promptTitle;
  }
  return null;
}

/**
 * 🔎 AKTİF ALT TÜR SÜZGECİ
 *
 * "Volkanik Dağlar" rozeti seçiliyken başlatılan oyun modları (Harita Boyama,
 * Kör Atış, Harita Fatihi, Eşleştirme, Oluşum, Deneme, Şimşek) süzgeçten
 * habersizdi ve daima kategorinin TAMAMINI kapsıyordu. Artık hepsi bu ortak
 * süzgeci kullanır.
 *
 * ⚠️ Süzgeç `gruplaHavuz`dan ÖNCE uygulanmalıdır; aksi halde "Volkanik"
 * filtresi, grubun volkanik olmayan üyesini de içeri sokar.
 */
function altTurSuz(items, categoryKey, subTypeId) {
  if (!Array.isArray(items) || !items.length) return items || [];
  if (!subTypeId || subTypeId === 'all') return items;
  if (typeof SUB_TYPES === 'undefined' || !SUB_TYPES[categoryKey]) return items;

  const tanim = SUB_TYPES[categoryKey].find(s => s.id === subTypeId);
  if (!tanim || typeof tanim.filter !== 'function') return items;

  const suzulmus = items.filter(tanim.filter);
  // Boş havuz oyunu kilitler: süzgeç hiçbir şey döndürmezse tamamına dön
  return suzulmus.length ? suzulmus : items;
}

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

/**
 * Composite'in hap bilgisi: üyelerin notları arka arkaya eklenince 9 gübre
 * fabrikasında hangi cümlenin hangi tesise ait olduğu kayboluyordu. İki üyeden
 * fazlaysa her not sahibinin adıyla etiketlenir.
 */
function grupNotu(uyeler) {
  const notlu = uyeler.filter(m => m.kpssNot);
  if (!notlu.length) return '';
  if (notlu.length <= 2) return notlu.map(m => m.kpssNot).join(' | ');
  return notlu
    .map(m => (m.shortName || m.name || '').replace(/\s*\([^)]*\)/g, '').trim() + ': ' + m.kpssNot)
    .join('  |  ');
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

  /**
   * Çok üyeli bir composite'in "&" ile zincirlenen alanları (type / region /
   * city) 10 üyeli bir havzada ekrana sığmayan bir duvara dönüşüyordu. En çok
   * SINIR kadarını yazıp geri kalanını "+N" ile özetliyoruz.
   */
  const ozetle = (alan, sinir, tasmaEtiketi) => {
    const hepsi = tekilBirlestir(alan);
    if (hepsi.length <= sinir) return hepsi.join(' & ');
    if (tasmaEtiketi) return tasmaEtiketi;
    return hepsi.slice(0, sinir).join(' & ') + ' (+' + (hepsi.length - sinir) + ')';
  };

  /**
   * Adsız grubun etiketi: ÜYELERİN TAMAMI (en çok 3 tanesi + "+N").
   *
   * Eskiden "en kısa üye adı" seçiliyordu; bu, grubu üyelerinden birine
   * indirgediği için yanlış etiketler üretiyordu — iki zirveli Ağrı grubu
   * "Küçük Ağrı Dağı", Konya'nın dört ürünlü havzası "Arpa" oluyordu.
   */
  const uyeAdlariniBirlestir = () => {
    const adlar = uyeler
      .map(m => m.shortName || m.name)
      .filter(Boolean)
      .filter((v, i, a) => a.indexOf(v) === i);
    if (!adlar.length) return gid;
    if (adlar.length <= 3) return adlar.join(' & ');
    // "+N" parantezsizdir: parantezli olsaydı "Haritada Bul" başlığındaki
    // parantez temizliği onu da silip grubu eksik gösterirdi.
    let govde = adlar.slice(0, 3).join(' & ');
    let kalan = adlar.length - 3;
    if (govde.length > 55) { govde = adlar.slice(0, 2).join(' & '); kalan = adlar.length - 2; }
    return govde + ' +' + kalan;
  };

  // Ad: veri "groupName" verdiyse o, yoksa üyelerin birleşimi
  const veriGrupAdi = uyeler.find(m => m.groupName)?.groupName;
  const grupAdi = veriGrupAdi || uyeAdlariniBirlestir();

  /**
   * ⚠️ Şıkta ve "Haritada Bul" sorusunda GÖRÜNEN etiket `shortName`'dir.
   * Eskiden burada koşulsuz olarak İLK ÜYENİN shortName'i alınıyordu; bu yüzden
   * haritada 12 tuz sahası birden parlarken doğru şık "Tuz (Çamaltı)",
   * YHT ağının tamamı parlarken doğru şık "Ankara Garı" yazıyordu — yani soru
   * bütünü gösterip parçanın adını istiyordu.
   *
   * Grubun adı veride açıkça verilmişse (groupName) etiket DAİMA grup adıdır;
   * üye adına yalnızca isimsiz gruplarda (ör. aynı zirvenin iki kaydı) düşülür.
   */
  const grupKisaAdi = uyeler.find(m => m.groupShortName)?.groupShortName
    || veriGrupAdi
    || grupAdi;

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
    shortName: grupKisaAdi,
    category: oncu.category,
    shapeType: 'composite',
    coordinates: uyeler.map(m => m.coordinates).filter(Boolean),
    lat: merkez[0],
    lng: merkez[1],
    type: ozetle('type', 2) || 'Birleşik Saha',
    region: ozetle('region', 3, 'Çoklu Bölge') || 'Çoklu Bölge',
    city: ozetle('city', 4),
    kpssNot: grupNotu(uyeler),
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
