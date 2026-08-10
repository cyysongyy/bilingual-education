/* =====================================================================
   雙語教育研習互動遊戲 — 共用程式
   陳彥揚 校長 ｜ 興南國小 108–112 · 辰光國小 112–115
   ---------------------------------------------------------------------
   【唯一需要修改的地方】把 Apps Script 部署後的網址貼在下面 GAS_URL。
   沒有貼也可以正常玩（自動切成「離線模式」，成績只存在自己手機）。
   ===================================================================== */

const GAS_URL = 'https://script.google.com/macros/s/AKfycbwL5L2FzsGbsO0DmQNuwZzbUcH6KlxcBxr1nZ-1gzRsQr5zjar9tOBReI6jEDRlVNk5/exec';

const OPENING = {
  url: 'https://cyysongyy.github.io/heros-journey/',
  title: '英雄旅程 Hero\'s Journey',
  desc: '六種模式任選一個玩 3 分鐘：故事模式、你的英雄旅程、弒魔英雄旅、英雄牌旅、內在英雄之旅、奧德賽內在航程。',
  note: '這是整場研習的開場——因為推動任何改變，本來就是一場英雄旅程。',
};

const GAMES = [
  { id: 'g1', file: 'g1.html', n: '1', title: '三種語言分類挑戰', part: 'PART I ｜ 觀念地基',
    desc: '把 12 張卡片分到 Language OF / FOR / THROUGH，再挑戰 CLIL 名詞辨識。', mins: 5 },
  { id: 'g2', file: 'g2.html', n: '2', title: 'CLIL 教案拼裝廠', part: 'PART II ｜ 興南 CLIL',
    desc: '用國中理化「浮力」當範例，把碎片放進三欄；最後做出你自己的一份三欄簡案。', mins: 8 },
  { id: 'g3', file: 'g3.html', n: '3', title: 'SEL 辰光句型挑戰', part: 'PART III ｜ 辰光 SEL',
    desc: '情緒 Check-in、留空句型接龍、60 秒情緒詞彙快打、一句話 Check-out。', mins: 7 },
  { id: 'g4', file: 'g4.html', n: '4', title: '校長的兩難', part: 'PART IV ｜ 行政推動',
    desc: '五個真實情境、四個指標。你的每一個決定都會改變教師信任與續航力。', mins: 8 },
];

const APP = {
  online() { return !!GAS_URL; },

  session() {
    const q = new URLSearchParams(location.search).get('s');
    if (q) { localStorage.setItem('be_session', q); return q; }
    return localStorage.getItem('be_session') || 'default';
  },
  setSession(v) { localStorage.setItem('be_session', (v || 'default').trim()); },

  me() { try { return JSON.parse(localStorage.getItem('be_me')); } catch (e) { return null; } },
  setMe(o) {
    if (!o.pid) o.pid = 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    localStorage.setItem('be_me', JSON.stringify(o));
    return o;
  },
  requireMe() {
    const m = this.me();
    if (!m || !m.name) { location.href = 'index.html'; return null; }
    return m;
  },

  // ---- local progress ----
  results() { try { return JSON.parse(localStorage.getItem('be_res')) || {}; } catch (e) { return {}; } },
  saveResult(game, score, max, payload) {
    const r = this.results();
    r[game] = { score, max, payload, at: new Date().toISOString() };
    localStorage.setItem('be_res', JSON.stringify(r));
    return r;
  },

  // ---- send to Google Sheet ----
  async send(game, score, max, payload) {
    this.saveResult(game, score, max, payload);
    if (!GAS_URL) return { ok: false, offline: true };
    const m = this.me() || {};
    const body = new URLSearchParams({
      action: 'submit',
      session: this.session(),
      pid: m.pid || '', name: m.name || '', school: m.school || '', role: m.role || '',
      game, score: String(score), max: String(max),
      payload: JSON.stringify(payload || {}),
      ts: new Date().toISOString(),
    });
    try {
      await fetch(GAS_URL, { method: 'POST', body });
      return { ok: true };
    } catch (e) {
      try { await fetch(GAS_URL, { method: 'POST', mode: 'no-cors', body }); return { ok: true }; }
      catch (e2) { return { ok: false, error: String(e2) }; }
    }
  },

  // ---- JSONP read (for host.html) ----
  jsonp(params) {
    return new Promise((resolve, reject) => {
      if (!GAS_URL) return reject(new Error('GAS_URL 尚未設定'));
      const cb = 'cb' + Date.now().toString(36) + Math.floor(Math.random() * 1e4);
      const s = document.createElement('script');
      const t = setTimeout(() => { cleanup(); reject(new Error('timeout')); }, 12000);
      function cleanup() { clearTimeout(t); delete window[cb]; s.remove(); }
      window[cb] = (d) => { cleanup(); resolve(d); };
      s.onerror = () => { cleanup(); reject(new Error('network')); };
      s.src = GAS_URL + '?' + new URLSearchParams(Object.assign({ callback: cb }, params));
      document.body.appendChild(s);
    });
  },

  // ---- shared UI ----
  header(title, sub, back) {
    const off = this.online() ? '' : '<span class="badge off">離線模式</span>';
    return `<header><div class="wrap">
      ${back ? '<a class="back" href="index.html">&#8249;</a>' : ''}
      <div style="flex:1"><h1>${title}</h1><div class="sub">${sub || ''}</div></div>
      ${off}</div></header>`;
  },

  shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
  esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); },
};
