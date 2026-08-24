/**
 * 🇹🇷 Türkçe arayüz sözlüğü.
 *
 * Şu an yalnızca PAKET SİSTEMİ ve REHBER metinlerini kapsar; uygulamanın geri
 * kalanındaki metinler HTML'de sabit durmaktadır. Yeni bir metni çeviriye
 * bağlamak için: HTML'de `data-i18n="anahtar"` yaz, buraya ve `en.js`'e satır ekle.
 */
GeoI18n.register('tr', {
  // --- Rehber (onboarding) ---
  'ob.skip': 'Atla',
  'ob.next': 'Devam →',
  'ob.back': '← Geri',
  'ob.start': 'Paketleri Seç →',
  'ob.step': '{n} / {toplam}',

  'ob.1.title': 'Bu bir harita ezber laboratuvarı',
  'ob.1.body': 'Coğrafi yer şekillerini haritada görerek, çizerek ve oyunlaştırılmış testlerle tekrar ederek kalıcı hafızaya alırsın. Yanlış yaptığın sorular seni daha sık bulur, ustalaştıkların seyrelir.',
  'ob.2.title': 'Konular paket halinde gelir',
  'ob.2.body': 'Her şey aynı anda karşına çıkmaz. Yalnızca çalışmak istediğin konuları indirirsin; harita, testler ve oyun modları indirdiğin paketlere göre şekillenir. Paketleri istediğin zaman ekleyip kaldırabilirsin.',
  'ob.3.title': 'Her paketin 3 detay kademesi var',
  'ob.3.body': 'Az kademe yalnızca sınav rekorlarını ve çekirdek kayıtları getirir. Orta kademe sık sorulan ikinci halkayı ekler. Tam kademe her şeyi açar. Kademeni sonradan yükseltebilirsin; ilerlemen korunur.',

  // --- Mağaza ---
  'store.title': 'Paket Mağazası',
  'store.subtitle': 'İndirdiğin paketler haritanı, testlerini ve oyun modlarını belirler.',
  'store.nav': 'Paketler',
  'store.installed': 'Kurulu',
  'store.install': 'İndir',
  'store.upgrade': 'Yükselt',
  'store.remove': 'Kaldır',
  'store.removeConfirm': '"{ad}" paketi kaldırılsın mı? Soru geçmişin silinmez; paketi geri kurduğunda ilerlemen geri gelir.',
  'store.installing': 'İndiriliyor…',
  'store.failed': 'İndirilemedi',
  'store.records': '{n} kayıt',
  'store.unlocks': 'Açılan modlar',
  'store.recommends': 'Birlikte iyi gider',
  'store.virtual': 'Hesaplama modülü',
  'store.empty': 'Henüz hiç paket kurmadın. Başlamak için en az bir paket indir.',
  'store.done': 'Çalışmaya Başla',
  'store.totalInstalled': '{paket} paket · {kayit} kayıt kurulu',
  'store.close': 'Kapat',
  'store.lang': 'Dil',

  'store.installAll': 'Tümünü Kur',
  'store.installingAll': 'Kuruluyor {n}/{toplam}…',
  'store.removeAll': 'Tümünü Kaldır',
  'store.removeAllConfirm': '{n} paketin tamamı kaldırılsın mı? Soru geçmişin silinmez; paketleri geri kurduğunda ilerlemen geri gelir.',
  'lock.layer': '🔒 Bu harita görünümü bir pakete bağlı',
  'store.search': 'Paket ara…',
  'store.noResult': 'Aramanla eşleşen paket yok.',
  'store.pageInfo': '{n} paket',
  'store.modeCount': 'mod',

  // --- Paket grupları ---
  'group.all': 'Tümü',
  'group.fiziki': 'Fiziki',
  'group.beseri': 'Beşeri',
  'group.ekonomik': 'Ekonomik',
  'group.modul': 'Modüller',

  // --- Kademeler ---
  'tier.az': 'Az',
  'tier.orta': 'Orta',
  'tier.tam': 'Tam',
  'tier.azDesc': 'Çekirdek — sınav rekorları ve en çok sorulanlar',
  'tier.ortaDesc': 'Çekirdek + sık sorulan ikinci halka',
  'tier.tamDesc': 'Paketteki her kayıt',

  // --- Kilitler ---
  'lock.badge': 'Kilitli',
  'lock.needs': '🔒 {paket} paketi gerekli',
  'lock.needsAny': '🔒 Şu paketlerden biri gerekli: {paketler}',
  'lock.needsTopic': '🔒 Herhangi bir konu paketi gerekli',
  'lock.openStore': 'Mağazayı aç',

  // --- Boş durum ---
  'empty.title': 'Haritan şu an boş',
  'empty.body': 'Çalışmaya başlamak için mağazadan en az bir paket indir.',
  'empty.cta': '📦 Paket Mağazasını Aç'
});
