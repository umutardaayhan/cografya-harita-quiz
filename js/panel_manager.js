/**
 * 🪟 PANEL YÖNETİCİSİ — Taşınabilir / Yeniden Boyutlandırılabilir / Katlanabilir Paneller
 *
 * Uygulamadaki her menüyü (üst çubuk, soru paneli, harita kontrolleri,
 * Yanlışlarım paneli, çizim araç çubuğu) tutup taşınabilir, kenarlarından
 * daraltılıp genişletilebilir ve tamamen küçültülebilir hale getirir.
 *
 * Tasarım notları:
 * - Paneller CSS'te right/bottom veya transform ile konumlandırılmış olabilir.
 *   İlk sürüklemede ölçülen ekran konumu left/top'a çevrilir ve transform
 *   temizlenir; böylece konumlandırma yöntemleri birbirine karışmaz.
 * - Pointer Events kullanılır: fare, dokunmatik ve kalem aynı kodla çalışır.
 * - Panel geometrisi ve katlanma durumu localStorage'da saklanır.
 * - Katlama, panelin KENDİ mevcut sınıfını kullanabilir (ör. quiz paneli
 *   zaten .minimized kullanıyor); böylece eski küçültme düğmeleri bozulmaz
 *   ve iki ayrı katlama mekanizması birbiriyle çakışmaz.
 */

const PANEL_LAYOUT_KEY = 'kpss_panel_yerlesimi_v1';

class PanelManager {
  constructor() {
    this.panels = new Map();
    this.layout = this.load();
    this.active = null;

    // Sürükleme/boyutlandırma belge seviyesinde takip edilir ki imleç
    // panelin dışına çıksa bile işlem kopmasın.
    this._onMove = this._onMove.bind(this);
    this._onUp = this._onUp.bind(this);
    window.addEventListener('pointermove', this._onMove, { passive: false });
    window.addEventListener('pointerup', this._onUp);
    window.addEventListener('pointercancel', this._onUp);
    window.addEventListener('resize', () => this.clampAll());
  }

  // ---------------------------------------------------------------
  // KALICILIK
  // ---------------------------------------------------------------
  load() {
    try {
      return JSON.parse(localStorage.getItem(PANEL_LAYOUT_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  save() {
    try {
      localStorage.setItem(PANEL_LAYOUT_KEY, JSON.stringify(this.layout));
    } catch (e) {
      /* kota dolduysa sessizce geç */
    }
  }

  // ---------------------------------------------------------------
  // KAYIT
  // ---------------------------------------------------------------
  /**
   * @param {string} id           Kalıcılık anahtarı
   * @param {HTMLElement} el      Panel kökü
   * @param {object} opts
   *   handle           : sürükleme tutamağının seçicisi (yoksa başlık şeridi eklenir)
   *   resize           : kenarlardan boyutlandırma açık mı
   *   collapseClass    : katlama için kullanılacak sınıf (varsayılan 'panel-collapsed')
   *   minWidth/minHeight
   *   label            : eklenen başlık şeridinde görünecek ad
   */
  register(id, el, opts = {}) {
    if (!el || this.panels.has(id)) return;

    const cfg = Object.assign({
      handle: null,
      resize: true,
      collapseClass: 'panel-collapsed',
      minWidth: 180,
      minHeight: 48,
      label: id
    }, opts);

    const panel = { id, el, cfg };
    this.panels.set(id, panel);

    el.classList.add('pm-panel');
    el.dataset.pmId = id;

    this._buildChrome(panel);
    if (cfg.resize) this._buildResizers(panel);
    this._watchCollapse(panel);
    this.restore(id);
  }

  /** Panelin üstüne taşıma tutamağı + katla/sıfırla düğmeleri ekler */
  _buildChrome(panel) {
    const { el, cfg } = panel;

    const bar = document.createElement('div');
    bar.className = 'pm-bar';
    bar.innerHTML = `
      <span class="pm-grip" title="Tutup taşı">⠿</span>
      <span class="pm-label">${cfg.label}</span>
      <button type="button" class="pm-btn pm-collapse" title="Küçült / Aç">▾</button>
      <button type="button" class="pm-btn pm-reset" title="Bu panelin konum ve boyutunu sıfırla">⟲</button>
    `;
    el.insertBefore(bar, el.firstChild);
    panel.bar = bar;

    const handle = cfg.handle ? el.querySelector(cfg.handle) : bar;
    panel.handle = handle || bar;
    panel.handle.classList.add('pm-draggable');

    panel.handle.addEventListener('pointerdown', (e) => {
      // Tutamağın içindeki düğmeler sürüklemeyi başlatmasın
      if (e.target.closest('button, input, select, textarea, a')) return;
      this._startDrag(panel, e);
    });

    bar.querySelector('.pm-collapse').addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleCollapse(panel.id);
    });
    bar.querySelector('.pm-reset').addEventListener('click', (e) => {
      e.stopPropagation();
      this.reset(panel.id);
    });
  }

  _buildResizers(panel) {
    const yonler = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
    yonler.forEach(yon => {
      const h = document.createElement('div');
      h.className = `pm-resizer pm-${yon}`;
      h.addEventListener('pointerdown', (e) => this._startResize(panel, e, yon));
      panel.el.appendChild(h);
    });
  }

  /**
   * Panel kendi düğmesiyle katlanırsa (ör. quiz panelinin ▾ düğmesi)
   * durumu yakalayıp kaydeder; iki mekanizma ayrışmaz.
   */
  _watchCollapse(panel) {
    const gozlemci = new MutationObserver(() => {
      const katli = panel.el.classList.contains(panel.cfg.collapseClass);
      const kayit = this.layout[panel.id] || (this.layout[panel.id] = {});
      if (kayit.collapsed !== katli) {
        kayit.collapsed = katli;
        this.save();
      }
      const btn = panel.bar && panel.bar.querySelector('.pm-collapse');
      if (btn) btn.textContent = katli ? '▸' : '▾';
    });
    gozlemci.observe(panel.el, { attributes: true, attributeFilter: ['class'] });
  }

  // ---------------------------------------------------------------
  // SÜRÜKLEME
  // ---------------------------------------------------------------
  _startDrag(panel, e) {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    this._pinPosition(panel);
    const r = panel.el.getBoundingClientRect();
    this.active = {
      panel, mode: 'drag',
      dx: e.clientX - r.left,
      dy: e.clientY - r.top
    };
    panel.el.classList.add('pm-dragging');
    this.bringToFront(panel);
  }

  /**
   * right/bottom/transform ile konumlanmış paneli left/top'a sabitler.
   * Bu yapılmazsa sürükleme sırasında iki konumlandırma yöntemi çakışır.
   */
  _pinPosition(panel) {
    if (panel.pinned) return;
    const r = panel.el.getBoundingClientRect();
    const s = panel.el.style;
    s.transform = 'none';
    s.right = 'auto';
    s.bottom = 'auto';
    s.left = `${Math.round(r.left)}px`;
    s.top = `${Math.round(r.top)}px`;
    panel.pinned = true;
    // Sabitlenen panelde konum/boyut CSS gecisi kapatilir; aksi halde
    // .quiz-panel'in "transition: all .25s" kurali her surukleme karesini
    // ve sayfa acilisindaki konum geri yuklemesini animasyona sokuyor.
    panel.el.dataset.pmPinned = '1';
  }

  // ---------------------------------------------------------------
  // BOYUTLANDIRMA
  // ---------------------------------------------------------------
  _startResize(panel, e, yon) {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    this._pinPosition(panel);
    const r = panel.el.getBoundingClientRect();
    this.active = {
      panel, mode: 'resize', yon,
      startX: e.clientX, startY: e.clientY,
      startW: r.width, startH: r.height,
      startL: r.left, startT: r.top
    };
    panel.el.classList.add('pm-resizing');
    this.bringToFront(panel);
  }

  _onMove(e) {
    const a = this.active;
    if (!a) return;
    e.preventDefault();

    const { panel } = a;
    const s = panel.el.style;

    if (a.mode === 'drag') {
      const r = panel.el.getBoundingClientRect();
      // Panelin en az bir kısmı ekranda kalsın
      const maxL = window.innerWidth - 60;
      const maxT = window.innerHeight - 40;
      s.left = `${Math.max(-r.width + 60, Math.min(maxL, e.clientX - a.dx))}px`;
      s.top = `${Math.max(0, Math.min(maxT, e.clientY - a.dy))}px`;
      return;
    }

    const dx = e.clientX - a.startX;
    const dy = e.clientY - a.startY;
    const minW = panel.cfg.minWidth;
    const minH = panel.cfg.minHeight;

    if (a.yon.includes('e')) {
      s.width = `${Math.max(minW, a.startW + dx)}px`;
    }
    if (a.yon.includes('w')) {
      const w = Math.max(minW, a.startW - dx);
      s.width = `${w}px`;
      s.left = `${a.startL + (a.startW - w)}px`;
    }
    if (a.yon.includes('s')) {
      s.height = `${Math.max(minH, a.startH + dy)}px`;
    }
    if (a.yon.includes('n')) {
      const h = Math.max(minH, a.startH - dy);
      s.height = `${h}px`;
      s.top = `${a.startT + (a.startH - h)}px`;
    }
    // Boyutlandırılan panel içerik genişliğine geri dönmesin
    s.maxWidth = 'none';
    s.maxHeight = 'none';
  }

  _onUp() {
    const a = this.active;
    if (!a) return;
    a.panel.el.classList.remove('pm-dragging', 'pm-resizing');
    this.active = null;
    this.persist(a.panel.id);
  }

  // ---------------------------------------------------------------
  // DURUM
  // ---------------------------------------------------------------
  persist(id) {
    const panel = this.panels.get(id);
    if (!panel) return;
    const s = panel.el.style;
    const kayit = this.layout[id] || (this.layout[id] = {});
    if (panel.pinned) {
      kayit.left = s.left;
      kayit.top = s.top;
    }
    if (s.width) kayit.width = s.width;
    if (s.height) kayit.height = s.height;
    kayit.collapsed = panel.el.classList.contains(panel.cfg.collapseClass);
    this.save();
  }

  restore(id) {
    const panel = this.panels.get(id);
    const kayit = this.layout[id];
    if (!panel || !kayit) return;
    const s = panel.el.style;

    if (kayit.left && kayit.top) {
      s.transform = 'none';
      s.right = 'auto';
      s.bottom = 'auto';
      s.left = kayit.left;
      s.top = kayit.top;
      panel.pinned = true;
      panel.el.dataset.pmPinned = '1';
    }
    if (kayit.width) { s.width = kayit.width; s.maxWidth = 'none'; }
    if (kayit.height) { s.height = kayit.height; s.maxHeight = 'none'; }
    if (kayit.collapsed) panel.el.classList.add(panel.cfg.collapseClass);

    this.clamp(panel);
  }

  toggleCollapse(id) {
    const panel = this.panels.get(id);
    if (!panel) return;
    panel.el.classList.toggle(panel.cfg.collapseClass);
    this.persist(id);
  }

  reset(id) {
    const panel = this.panels.get(id);
    if (!panel) return;
    const s = panel.el.style;
    ['left', 'top', 'right', 'bottom', 'width', 'height', 'transform', 'maxWidth', 'maxHeight']
      .forEach(k => { s[k] = ''; });
    panel.el.classList.remove(panel.cfg.collapseClass);
    panel.pinned = false;
    delete panel.el.dataset.pmPinned;
    delete this.layout[id];
    this.save();
  }

  resetAll() {
    [...this.panels.keys()].forEach(id => this.reset(id));
    this.layout = {};
    this.save();
  }

  /** Ekran küçüldüğünde panel dışarıda kalmasın */
  clamp(panel) {
    if (!panel.pinned) return;
    const r = panel.el.getBoundingClientRect();
    const s = panel.el.style;
    if (r.left > window.innerWidth - 60) s.left = `${window.innerWidth - 60}px`;
    if (r.top > window.innerHeight - 40) s.top = `${window.innerHeight - 40}px`;
    if (r.left < -r.width + 60) s.left = `${-r.width + 60}px`;
    if (r.top < 0) s.top = '0px';
  }

  clampAll() {
    this.panels.forEach(p => this.clamp(p));
  }

  bringToFront(panel) {
    let enUst = 1000;
    this.panels.forEach(p => {
      const z = parseInt(getComputedStyle(p.el).zIndex, 10);
      if (Number.isFinite(z) && z > enUst) enUst = z;
    });
    panel.el.style.zIndex = String(enUst + 1);
  }
}
