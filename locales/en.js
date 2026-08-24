/**
 * 🇬🇧 English interface dictionary.
 *
 * Currently covers the PACK SYSTEM and the ONBOARDING guide only; the rest of
 * the app still carries hard-coded Turkish markup. To translate a new string:
 * add `data-i18n="key"` in the HTML, then add the key here and in `tr.js`.
 */
GeoI18n.register('en', {
  // --- Onboarding ---
  'ob.skip': 'Skip',
  'ob.next': 'Continue →',
  'ob.back': '← Back',
  'ob.start': 'Choose Packs →',
  'ob.step': '{n} / {toplam}',

  'ob.1.title': 'A map memory laboratory',
  'ob.1.body': 'You commit landforms to memory by seeing them on the map, drawing them yourself and revisiting them through gamified drills. Questions you get wrong come back more often; the ones you master fade out.',
  'ob.2.title': 'Topics arrive as packs',
  'ob.2.body': 'Nothing is dumped on you at once. You download only the topics you want to study, and the map, the quizzes and the game modes are shaped by what you installed. Packs can be added or removed at any time.',
  'ob.3.title': 'Every pack has 3 detail levels',
  'ob.3.body': 'The Light level brings only exam records and core entries. Medium adds the frequently asked second ring. Full unlocks everything. You can upgrade later — your progress is preserved.',

  // --- Store ---
  'store.title': 'Pack Store',
  'store.subtitle': 'The packs you install define your map, your quizzes and your game modes.',
  'store.nav': 'Packs',
  'store.installed': 'Installed',
  'store.install': 'Install',
  'store.upgrade': 'Upgrade',
  'store.remove': 'Remove',
  'store.removeConfirm': 'Remove the "{ad}" pack? Your question history is kept — reinstalling restores your progress.',
  'store.installing': 'Installing…',
  'store.failed': 'Install failed',
  'store.records': '{n} entries',
  'store.unlocks': 'Unlocks',
  'store.recommends': 'Pairs well with',
  'store.virtual': 'Calculation module',
  'store.empty': 'No packs installed yet. Install at least one to get started.',
  'store.done': 'Start Studying',
  'store.totalInstalled': '{paket} packs · {kayit} entries installed',
  'store.close': 'Close',
  'store.lang': 'Language',

  'store.installAll': 'Install All',
  'store.installingAll': 'Installing {n}/{toplam}…',
  'store.removeAll': 'Remove All',
  'store.removeAllConfirm': 'Remove all {n} packs? Your question history is kept — reinstalling restores your progress.',
  'lock.layer': '🔒 This map view is tied to a pack',
  'store.search': 'Search packs…',
  'store.noResult': 'No pack matches your search.',
  'store.pageInfo': '{n} packs',
  'store.modeCount': 'modes',

  // --- Pack groups ---
  'group.all': 'All',
  'group.fiziki': 'Physical',
  'group.beseri': 'Human',
  'group.ekonomik': 'Economic',
  'group.modul': 'Modules',

  // --- Tiers ---
  'tier.az': 'Basic',
  'tier.orta': 'Medium',
  'tier.tam': 'Full',
  'tier.1': 'Basic',
  'tier.2': 'Medium',
  'tier.3': 'Full',
  'store.globalTier': 'Global Level',
  'tier.azDesc': 'Core — exam records and most asked items',
  'tier.ortaDesc': 'Core + frequently asked second circle',
  'tier.tamDesc': 'Every entry in the pack',

  // --- Locks ---
  'lock.badge': 'Locked',
  'lock.needs': '🔒 Requires the {paket} pack',
  'lock.needsAny': '🔒 Requires one of: {paketler}',
  'lock.needsTopic': '🔒 Requires any topic pack',
  'lock.openStore': 'Open the store',

  // --- Empty state ---
  'empty.title': 'Your map is empty',
  'empty.body': 'Install at least one pack from the store to start studying.',
  'empty.cta': '📦 Open the Pack Store'
});
