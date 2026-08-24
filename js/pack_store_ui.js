/**
 * 🛒 PAKET MAĞAZASI & İLK GİRİŞ REHBERİ
 *
 * İki ekran üretir; ikisi de tamamen JS'ten kurulur, index.html'de karşılığı
 * yalnızca tek bir boş kaptır (`#pack-layer`):
 *
 *   1) REHBER (onboarding) — siteye ilk defa giren kullanıcı haritayı değil,
 *      3 adımlık bir anlatımı görür ve doğrudan mağazaya iner.
 *   2) MAĞAZA — grup sekmeleri, arama kutusu ve SAYFALAMA ile gezilir; her kart
 *      kademe seçici (Az / Orta / Tam) ve indir/yükselt/kaldır eylemi taşır.
 *
 * ÖLÇEKLENME: Katalog yüzlerce pakete çıkabileceği için kartlar tek seferde
 * basılmaz. Gezinme üç katmanlıdır: önce GRUP (fiziki/beşeri/ekonomik/modül),
 * sonra ARAMA, en sonda SAYFA. Böylece kart sayısı ne olursa olsun ekranda
 * sabit sayıda kart kalır.
 *
 * Metinler `GeoI18n` üzerinden okunur; paket adları katalogdaki `i18n`
 * bloklarından gelir. Yeni dil eklendiğinde bu dosyada değişiklik gerekmez.
 */

/** Bir sayfada gösterilecek kart sayısı */
const STORE_PAGE_SIZE = 9;

/** Paket manifestindeki `unlocks` kimlikleri → mağazada gösterilen adlar */
const MOD_ROZET = {
  quiz: '📝 Test',
  geoguessr: '🎯 Kör Atış',
  conqueror: '⚔️ Harita Fatihi',
  match: '🧩 Şekil Yapbozu',
  speedrun: '⚡ Şimşek Turu',
  exam: '📋 Genel Deneme',
  olusum: '🧬 Oluşum Türü',
  boyama: '🖌️ Harita Boyama',
  mk_sun: '☀️ Güneş Açısı',
  mk_temp: '🌡️ Sıcaklık Dedektifi',
  mk_daynight: '🌓 Gece-Gündüz',
  mk_coord: '🎯 Koordinat Avcısı',
  mk_duel: '🏃 Şehir Kapışması'
};

/** Grup sekmeleri (katalogdaki `group` alanıyla eşleşir) */
const PACK_GROUP_TABS = [
  { id: 'all',      icon: '🗂️' },
  { id: 'fiziki',   icon: '⛰️' },
  { id: 'beseri',   icon: '👥' },
  { id: 'ekonomik', icon: '🏭' },
  { id: 'modul',    icon: '📐' }
];

/** tier numarası → sözlük anahtarı parçası */
function kademeAnahtar(tier) {
  return tier === 1 ? 'az' : tier === 2 ? 'orta' : 'tam';
}

class PackStoreUI {
  constructor(packManager) {
    this.pm = packManager;
    this.root = document.getElementById('pack-layer');
    this.onDone = null;          // mağaza kapanınca çağrılır
    this.obStep = 0;
    this.busy = {};              // packId -> true (indirme sürüyor)

    // Mağaza gezinme durumu
    this.group = 'all';
    this.query = '';
    this.page = 0;

    GeoI18n.onChange(() => {
      if (this.root.dataset.view === 'store') this.renderStore();
      if (this.root.dataset.view === 'onboarding') this.renderOnboarding();
    });
  }

  // =========================================================================
  // ORTAK
  // =========================================================================
  t(key, vars) { return GeoI18n.t(key, vars); }

  show(view) {
    this.root.dataset.view = view;
    this.root.style.display = 'flex';
    document.body.classList.add('pack-layer-open');
  }

  hide() {
    this.root.style.display = 'none';
    this.root.dataset.view = '';
    this.root.innerHTML = '';
    document.body.classList.remove('pack-layer-open');
  }

  /** Dil seçici — her iki ekranın sağ üstünde durur */
  langSwitcher() {
    const langs = GeoI18n.available();
    if (langs.length < 2) return '';
    const btns = langs.map(l =>
      `<button class="pack-lang-btn ${l === GeoI18n.lang ? 'active' : ''}" data-lang="${l}">${l.toUpperCase()}</button>`
    ).join('');
    return `<div class="pack-lang-switch" title="${this.t('store.lang')}">${btns}</div>`;
  }

  bindLangSwitcher() {
    this.root.querySelectorAll('.pack-lang-btn').forEach(b => {
      b.addEventListener('click', () => GeoI18n.setLang(b.dataset.lang));
    });
  }

  // =========================================================================
  // 1. REHBER
  // =========================================================================
  startOnboarding(onDone) {
    this.onDone = onDone;
    this.obStep = 0;
    this.show('onboarding');
    this.renderOnboarding();
  }

  renderOnboarding() {
    const TOPLAM = 3;
    const n = this.obStep + 1;
    const ICONS = ['🗺️', '📦', '🎚️'];

    this.root.innerHTML = `
      <div class="pack-overlay">
        ${this.langSwitcher()}
        <div class="ob-card">
          <div class="ob-icon">${ICONS[this.obStep]}</div>
          <div class="ob-step">${this.t('ob.step', { n: n, toplam: TOPLAM })}</div>
          <h1 class="ob-title">${this.t('ob.' + n + '.title')}</h1>
          <p class="ob-body">${this.t('ob.' + n + '.body')}</p>
          <div class="ob-dots">
            ${[0, 1, 2].map(i => `<span class="ob-dot ${i === this.obStep ? 'active' : ''}"></span>`).join('')}
          </div>
          <div class="ob-actions">
            <button class="pack-btn ghost" id="ob-skip">${this.t('ob.skip')}</button>
            <div class="ob-actions-right">
              ${this.obStep > 0 ? `<button class="pack-btn ghost" id="ob-back">${this.t('ob.back')}</button>` : ''}
              <button class="pack-btn primary" id="ob-next">
                ${this.obStep === TOPLAM - 1 ? this.t('ob.start') : this.t('ob.next')}
              </button>
            </div>
          </div>
        </div>
      </div>`;

    this.bindLangSwitcher();
    this.root.querySelector('#ob-skip').addEventListener('click', () => this.openStore(this.onDone));
    const back = this.root.querySelector('#ob-back');
    if (back) back.addEventListener('click', () => { this.obStep--; this.renderOnboarding(); });
    this.root.querySelector('#ob-next').addEventListener('click', () => {
      if (this.obStep === TOPLAM - 1) this.openStore(this.onDone);
      else { this.obStep++; this.renderOnboarding(); }
    });
  }

  // =========================================================================
  // 2. MAĞAZA
  // =========================================================================
  openStore(onDone) {
    this.onDone = onDone || this.onDone;
    this.show('store');
    this.renderStore();
  }

  /** Grup + arama süzgecinden geçen paketler */
  filtered() {
    const q = GeoI18n.pick ? this.query.trim() : '';
    const arananlar = trLower(q);
    return this.pm.summary().filter(row => {
      if (this.group !== 'all' && (row.def.group || 'fiziki') !== this.group) return false;
      if (!arananlar) return true;
      const txt = GeoI18n.pick(row.def.i18n);
      return trLower((txt.title || '') + ' ' + (txt.desc || '') + ' ' + row.def.id).includes(arananlar);
    });
  }

  /** Bir grupta kaç paket var (sekme rozetleri için) */
  groupCount(groupId) {
    if (groupId === 'all') return this.pm.catalog.packs.length;
    return this.pm.catalog.packs.filter(p => (p.group || 'fiziki') === groupId).length;
  }

  renderStore() {
    const bos = this.pm.isEmpty();
    const kayit = this.pm.totalItems();
    const paket = this.pm.installedIds().length;

    const sekmeler = PACK_GROUP_TABS.map(g => `
      <button class="store-tab ${g.id === this.group ? 'active' : ''}" data-group="${g.id}">
        <span>${g.icon}</span> <span>${this.t('group.' + g.id)}</span>
        <span class="store-tab-count">${this.groupCount(g.id)}</span>
      </button>`).join('');

    this.root.innerHTML = `
      <div class="pack-overlay">
        ${this.langSwitcher()}
        <div class="store-card">
          <div class="store-head">
            <div class="store-head-text">
              <h1 class="store-title">📦 ${this.t('store.title')}</h1>
              <p class="store-subtitle">${this.t('store.subtitle')}</p>
            </div>
            <div class="store-head-side">
              <div class="store-meter">${
                bos ? this.t('store.empty')
                    : this.t('store.totalInstalled', { paket: paket, kayit: kayit })
              }</div>
            </div>
          </div>

          <div class="store-toolbar">
            <div class="store-tabs">${sekmeler}</div>
            <div class="store-search">
              <span class="store-search-icon">🔍</span>
              <input id="store-search-input" type="search" autocomplete="off"
                     placeholder="${this.t('store.search')}" value="${this.query.replace(/"/g, '&quot;')}">
            </div>
          </div>

          <div class="store-grid" id="store-grid"></div>
          <div class="store-pager" id="store-pager"></div>

          <div class="store-foot">
            <button class="pack-btn" id="store-install-all" ${paket === this.pm.catalog.packs.length ? 'disabled' : ''}>
              ⬇ ${this.t('store.installAll')}
            </button>
            <button class="pack-btn primary" id="store-done" ${bos ? 'disabled' : ''}>
              ${bos ? this.t('store.empty') : '▶ ' + this.t('store.done')}
            </button>
            <button class="pack-btn danger" id="store-remove-all" ${bos ? 'disabled' : ''}>
              🗑 ${this.t('store.removeAll')}
            </button>
          </div>
        </div>
      </div>`;

    this.bindLangSwitcher();
    this.renderCards();

    this.root.querySelectorAll('.store-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.group = tab.dataset.group;
        this.page = 0;
        this.renderStore();
      });
    });

    const search = this.root.querySelector('#store-search-input');
    search.addEventListener('input', () => {
      this.query = search.value;
      this.page = 0;
      this.renderCards();
    });

    this.root.querySelector('#store-done').addEventListener('click', () => {
      if (this.pm.isEmpty()) return;
      this.pm.markVisited();
      this.hide();
      if (typeof this.onDone === 'function') this.onDone();
    });

    this.root.querySelector('#store-install-all').addEventListener('click', (e) => {
      this.installAll(e.currentTarget);
    });

    this.root.querySelector('#store-remove-all').addEventListener('click', () => {
      if (!confirm(this.t('store.removeAllConfirm', { n: this.pm.installedIds().length }))) return;
      this.pm.uninstallAll();
      this.renderStore();
    });
  }

  /**
   * Toplu kurulum. Paketler tek tek indirildiği için düğme bir ilerleme
   * sayacına dönüşür; ekran kilitlenmesin diye her adımda arayüze sıra verilir.
   */
  async installAll(btn) {
    const kalan = this.pm.catalog.packs.filter(p => !this.pm.isInstalled(p.id)).length;
    if (!kalan) return;

    btn.disabled = true;
    const kartlar = this.root.querySelector('#store-grid');
    if (kartlar) kartlar.classList.add('busy');

    try {
      await this.pm.installAll(2, (yapilan, toplam) => {
        btn.textContent = `⬇ ${this.t('store.installingAll', { n: yapilan, toplam: toplam })}`;
      });
    } catch (e) {
      console.error(e);
      alert(this.t('store.failed') + ' — ' + e.message);
    }
    this.renderStore();
  }

  /** Kart ızgarasını ve sayfalayıcıyı tazeler (tüm ekranı yeniden kurmadan) */
  renderCards() {
    const grid = this.root.querySelector('#store-grid');
    const pager = this.root.querySelector('#store-pager');
    if (!grid) return;

    const hepsi = this.filtered();
    const sayfaSayisi = Math.max(1, Math.ceil(hepsi.length / STORE_PAGE_SIZE));
    if (this.page >= sayfaSayisi) this.page = sayfaSayisi - 1;

    grid.innerHTML = '';
    if (!hepsi.length) {
      grid.innerHTML = `<div class="store-noresult">🔎 ${this.t('store.noResult')}</div>`;
      pager.innerHTML = '';
      return;
    }

    hepsi
      .slice(this.page * STORE_PAGE_SIZE, (this.page + 1) * STORE_PAGE_SIZE)
      .forEach(row => grid.appendChild(this.buildCard(row)));

    // --- Sayfalayıcı ---
    if (sayfaSayisi <= 1) { pager.innerHTML = ''; return; }
    const nums = [];
    for (let i = 0; i < sayfaSayisi; i++) {
      nums.push(`<button class="pager-num ${i === this.page ? 'active' : ''}" data-page="${i}">${i + 1}</button>`);
    }
    pager.innerHTML = `
      <button class="pager-nav" data-step="-1" ${this.page === 0 ? 'disabled' : ''}>‹</button>
      ${nums.join('')}
      <button class="pager-nav" data-step="1" ${this.page === sayfaSayisi - 1 ? 'disabled' : ''}>›</button>
      <span class="pager-info">${this.t('store.pageInfo', { n: hepsi.length })}</span>`;

    pager.querySelectorAll('.pager-num').forEach(b => {
      b.addEventListener('click', () => { this.page = parseInt(b.dataset.page, 10); this.renderCards(); });
    });
    pager.querySelectorAll('.pager-nav').forEach(b => {
      b.addEventListener('click', () => {
        this.page = Math.max(0, Math.min(sayfaSayisi - 1, this.page + parseInt(b.dataset.step, 10)));
        this.renderCards();
      });
    });
  }

  buildCard(row) {
    const def = row.def;
    const txt = GeoI18n.pick(def.i18n);
    const busy = !!this.busy[def.id];

    const card = document.createElement('div');
    card.className = 'store-item' + (row.installed ? ' installed' : '') + (busy ? ' busy' : '');
    card.style.setProperty('--pack-color', def.color);
    card.dataset.pack = def.id;

    // --- Kademe seçici ---
    const secili = row.installed ? row.tier : 2;   // varsayılan öneri: Orta
    const tierHtml = def.virtual ? '' : PACK_TIERS.map(t => `
      <button class="tier-btn ${t.tier === secili ? 'active' : ''}" data-tier="${t.tier}"
              title="${this.t('tier.' + kademeAnahtar(t.tier) + 'Desc')}">
        <span class="tier-name">${this.t(t.key)}</span>
        <span class="tier-count">${def.tiers[t.tier]}</span>
      </button>`).join('');

    // --- Açılan modlar: yer kaplamasın diye tek satırlık sayaç + tooltip ---
    const modlar = (def.unlocks || []).map(m => MOD_ROZET[m]).filter(Boolean);
    const modHtml = modlar.length
      ? `<span class="unlock-pill" title="${modlar.join(' · ')}">🎮 ${modlar.length} ${this.t('store.modeCount')}</span>`
      : '';

    // --- Öneriler: yalnızca kurulu olmayanlar, tek satır ---
    const oneri = (def.recommends || [])
      .map(id => this.pm.packDef(id))
      .filter(p => p && !this.pm.isInstalled(p.id));
    const oneriHtml = oneri.length
      ? `<span class="recommend-pill" title="${this.t('store.recommends')}: ${oneri.map(p => GeoI18n.field(p.i18n, 'title', p.id)).join(', ')}">🔗 ${oneri.map(p => p.icon).join('')}</span>`
      : '';

    const badge = row.installed
      ? `<span class="store-badge">✓ ${this.t('tier.' + kademeAnahtar(row.tier))}</span>`
      : (def.virtual ? `<span class="store-badge virtual">📐</span>` : '');

    card.innerHTML = `
      <div class="store-item-head">
        <span class="store-item-icon">${def.icon}</span>
        <strong class="store-item-name">${txt.title || def.id}</strong>
        ${badge}
      </div>
      <p class="store-item-desc" title="${(txt.desc || '').replace(/"/g, '&quot;')}">${txt.desc || ''}</p>
      ${tierHtml ? `<div class="tier-picker">${tierHtml}</div>` : ''}
      <div class="store-item-meta">${modHtml}${oneriHtml}</div>
      <div class="store-item-actions">
        <button class="pack-btn primary small" data-act="install" ${busy ? 'disabled' : ''}>
          ${busy ? this.t('store.installing')
                 : (row.installed ? '⬆ ' + this.t('store.upgrade') : '⬇ ' + this.t('store.install'))}
        </button>
        ${row.installed ? `<button class="pack-btn danger icon" data-act="remove" title="${this.t('store.remove')}">🗑</button>` : ''}
      </div>
      <div class="store-item-error" style="display:none"></div>`;

    // --- Kademe seçimi ---
    let seciliKademe = secili;
    card.querySelectorAll('.tier-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        seciliKademe = parseInt(btn.dataset.tier, 10);
        card.querySelectorAll('.tier-btn').forEach(b => b.classList.toggle('active', b === btn));
        // Kurulu bir pakette kademe değişimi anında uygulanır
        if (row.installed) this.applyInstall(def, seciliKademe, card);
      });
    });

    card.querySelector('[data-act="install"]').addEventListener('click', () => {
      this.applyInstall(def, def.virtual ? 3 : seciliKademe, card);
    });

    const rm = card.querySelector('[data-act="remove"]');
    if (rm) {
      rm.addEventListener('click', () => {
        const ad = txt.title || def.id;
        if (!confirm(this.t('store.removeConfirm', { ad: ad }))) return;
        this.pm.uninstall(def.id);
        this.refreshMeter();
        this.renderCards();
      });
    }

    return card;
  }

  /** Başlıktaki sayaç ve "Çalışmaya Başla" düğmesini tazeler */
  refreshMeter() {
    const meter = this.root.querySelector('.store-meter');
    const done = this.root.querySelector('#store-done');
    if (!meter || !done) return;
    const bos = this.pm.isEmpty();
    meter.textContent = bos
      ? this.t('store.empty')
      : this.t('store.totalInstalled', { paket: this.pm.installedIds().length, kayit: this.pm.totalItems() });
    done.disabled = bos;
    done.textContent = bos ? this.t('store.empty') : '▶ ' + this.t('store.done');
  }

  async applyInstall(def, tier, card) {
    const btn = card.querySelector('[data-act="install"]');
    const err = card.querySelector('.store-item-error');
    err.style.display = 'none';

    this.busy[def.id] = true;
    card.classList.add('busy');
    if (btn) { btn.disabled = true; btn.textContent = this.t('store.installing'); }

    try {
      await this.pm.install(def.id, tier);
      delete this.busy[def.id];
      this.refreshMeter();
      this.renderCards();
    } catch (e) {
      delete this.busy[def.id];
      card.classList.remove('busy');
      console.error(e);
      err.textContent = '⚠ ' + this.t('store.failed') + ' — ' + e.message;
      err.style.display = 'block';
      if (btn) { btn.disabled = false; btn.textContent = '⬇ ' + this.t('store.install'); }
    }
  }
}
