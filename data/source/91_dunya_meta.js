/**
 * 🌐 DÜNYA MODÜLÜ — KATEGORİ & ALT TÜR TANIMLARI (Yazım Kaynağı)
 *
 * Bu dosya `90_meta.js`'ten SONRA okunur (dosyalar ada göre sıralanır), bu
 * yüzden `CATEGORIES_EXT` / `SUB_TYPES_EXT` zaten tanımlıdır: yeniden `const`
 * ile bildirilmez, üzerine EKLENİR.
 *
 * Kategori anahtarları `dunya_` ön ekiyle Türkiye kategorilerinden AYRI tutulur.
 * Sebep: test motoru çeldiricileri AYNI kategori havuzundan seçer. "Geçitler"
 * sekmesinde Panama Kanalı çeldirici olarak çıksaydı Türkiye çalışan kullanıcı
 * için soru anlamsızlaşırdı. Ayrı kategori = ayrı çeldirici havuzu = tutarlı
 * ölçek (Türkiye soruları km, dünya soruları bin km düzeyinde ayrışır).
 *
 * Alt tür filtreleri yalnızca DERLEME sırasında çalışır; `build_packs.js` her
 * kaydın uyduğu alt türleri dilden bağımsız `sub` anahtarları olarak pakete
 * yazar. Filtrelerde Türkçe harfler ASCII'ye indirgenir (`trLower`), bu yüzden
 * "boğaz" yerine "bogaz" aranır.
 */
CATEGORIES_EXT.push(
  { id: "dunya_daglari",     title: "Dünya Dağları & Volkanları",   short: "D. Dağ",   icon: "🗻", color: "#b45309" },
  { id: "dunya_sulari",      title: "Dünya Nehirleri & Gölleri",    short: "D. Su",    icon: "🏞️", color: "#1d4ed8" },
  { id: "dunya_okyanuslari", title: "Okyanuslar & Akıntılar",       short: "Okyanus",  icon: "🌐", color: "#0e7490" },
  { id: "dunya_denizleri",   title: "Denizler & Körfezler",         short: "Deniz",    icon: "🌊", color: "#0891b2" },
  { id: "dunya_bogazlari",   title: "Boğazlar & Kanallar",          short: "Boğaz",    icon: "⛴️", color: "#7c3aed" },
  { id: "dunya_ulkeleri",    title: "Ülkeler & Başkentler",         short: "Ülke",     icon: "🏳️", color: "#db2777" },
  { id: "dunya_harikalari",  title: "Dünyanın Harikaları",          short: "Harika",   icon: "🗿", color: "#f59e0b" },
  { id: "dunya_yapilari",    title: "Önemli Yapılar & Mühendislik", short: "Yapı",     icon: "🏗️", color: "#475569" }
);

/** Bir tür metninin BAŞTAN eşleşmesi (dünya kayıtlarında tür metni "A / B" biçimindedir) */
function dBas(item, onek) {
  return trLower(item.type).indexOf(onek) === 0;
}
/** Tür metninin herhangi bir yerinde geçmesi */
function dIc(item, parca) {
  return trLower(item.type).includes(parca);
}

Object.assign(SUB_TYPES_EXT, {
  dunya_daglari: [
    { id: "all",       label: "Tüm Dağ & Volkanlar",  icon: "🗻" },
    { id: "d_sirada",  label: "Sıradağ Sistemleri",   icon: "⛰️", filter: (i) => dIc(i, "siradag") },
    { id: "d_zirve",   label: "Zirveler & Rekorlar",  icon: "🏔️", filter: (i) => dIc(i, "zirve") },
    { id: "d_volkan",  label: "Volkanlar",            icon: "🌋", filter: (i) => dIc(i, "volkan") }
  ],
  dunya_sulari: [
    { id: "all",       label: "Tüm Nehir & Göller",   icon: "🏞️" },
    { id: "d_nehir",   label: "Nehirler",             icon: "🌊", filter: (i) => dIc(i, "nehir") },
    { id: "d_gol",     label: "Göller",               icon: "💧", filter: (i) => dIc(i, "gol") },
    { id: "d_selale",  label: "Şelaleler",            icon: "⛲", filter: (i) => dIc(i, "selale") }
  ],
  dunya_okyanuslari: [
    { id: "all",       label: "Tüm Okyanus Konuları", icon: "🌐" },
    { id: "d_okyanus", label: "Okyanuslar",           icon: "🌊", filter: (i) => dBas(i, "okyanus") },
    { id: "d_cukur",   label: "Derin Deniz Çukurları", icon: "🕳️", filter: (i) => dBas(i, "cukur") },
    { id: "d_akinti",  label: "Okyanus Akıntıları",   icon: "🌀", filter: (i) => dBas(i, "akinti") },
    { id: "d_sirt",    label: "Sırtlar & Levha Sınırları", icon: "🌍", filter: (i) => dIc(i, "levha siniri") }
  ],
  dunya_denizleri: [
    { id: "all",       label: "Tüm Deniz & Körfezler", icon: "🌊" },
    { id: "d_deniz",   label: "Denizler",              icon: "🌐", filter: (i) => dBas(i, "deniz") },
    { id: "d_korfez",  label: "Körfezler",             icon: "🏖️", filter: (i) => dBas(i, "korfez") },
    { id: "d_kapali",  label: "Kapalı Havzalar",       icon: "🧂", filter: (i) => dBas(i, "kapali havza") }
  ],
  dunya_bogazlari: [
    { id: "all",       label: "Tüm Boğaz & Kanallar",  icon: "⛴️" },
    { id: "d_bogaz",   label: "Doğal Boğazlar",        icon: "〰️", filter: (i) => dBas(i, "bogaz") },
    { id: "d_kanal",   label: "Yapay Kanallar",        icon: "🚧", filter: (i) => dBas(i, "kanal") }
  ],
  dunya_ulkeleri: [
    { id: "all",           label: "Tüm Ülke Konuları",     icon: "🏳️" },
    { id: "d_baskent",     label: "Başkentler",            icon: "🏛️", filter: (i) => dBas(i, "baskent") },
    { id: "d_ulke_rekor",  label: "Ülke Rekorları",        icon: "🥇", filter: (i) => dBas(i, "ulke rekoru") },
    { id: "d_kita",        label: "Kıtalar",               icon: "🗺️", filter: (i) => dBas(i, "kita") }
  ],
  dunya_harikalari: [
    { id: "all",       label: "Tüm Harikalar",          icon: "🗿" },
    { id: "d_antik",   label: "Antik Dünyanın 7 Harikası", icon: "🏺", filter: (i) => dIc(i, "antik dunyanin") },
    { id: "d_yeni7",   label: "Yeni Dünyanın 7 Harikası",  icon: "🏅", filter: (i) => dIc(i, "yeni dunyanin") },
    { id: "d_dogal",   label: "Doğal Harikalar",        icon: "🏞️", filter: (i) => dIc(i, "dogal harika") }
  ],
  dunya_yapilari: [
    { id: "all",        label: "Tüm Yapılar",            icon: "🏗️" },
    { id: "d_gokdelen", label: "Gökdelenler",            icon: "🏙️", filter: (i) => dBas(i, "gokdelen") },
    { id: "d_kopru",    label: "Köprüler & Tüneller",    icon: "🌉", filter: (i) => dBas(i, "kopru") },
    { id: "d_baraj",    label: "Barajlar & Enerji Yapıları", icon: "⚡", filter: (i) => dBas(i, "baraj") },
    { id: "d_anit",     label: "Anıtlar & Simge Yapılar", icon: "🗽", filter: (i) => dBas(i, "anit") }
  ]
});
