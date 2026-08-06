/* =====================================================================
   art.js — 遊戲用的向量插圖（純 inline SVG，不需要任何圖檔）
   所有顏色沿用 style.css 的變數，深淺模式都看得清楚。
   ===================================================================== */

const ART = (() => {
  const S = (inner, vb) => `<svg viewBox="${vb || '0 0 200 130'}" class="art" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  const T = 'var(--teal)', T2 = 'var(--teal2)', T3 = 'var(--teal3)',
        A = 'var(--amber)', AL = 'var(--amberL)', P = 'var(--pale)', W = '#fff',
        I = 'var(--ink)', G = 'var(--grey2)', R = 'var(--err)', OK = 'var(--ok)';

  const board = (x, y, w, h, fill) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${fill || W}" stroke="${T3}" stroke-width="2"/>`;
  const line = (x, y, w, c) => `<rect x="${x}" y="${y}" width="${w}" height="4" rx="2" fill="${c || P}"/>`;
  const head = (cx, cy, r, c) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c || T2}"/>`;
  const body = (cx, cy, w, h, c) =>
    `<path d="M${cx - w / 2} ${cy + h} v-${h - 6} a${w / 2} ${w / 2} 0 0 1 ${w} 0 v${h - 6} z" fill="${c || T2}"/>`;
  const bubble = (x, y, w, h, txt, c, fs) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${W}" stroke="${c || T2}" stroke-width="2"/>
     <path d="M${x + 14} ${y + h} l0 9 l11 -9 z" fill="${W}" stroke="${c || T2}" stroke-width="2"/>
     <text x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle" font-size="${fs || 12}" font-weight="700" fill="${I}">${txt}</text>`;

  return {

    /* ---------- 三種語言的圖像 ---------- */
    // 地理課：地圖上的專業字彙 → Language OF
    mapGeo: () => S(`
      <rect x="18" y="14" width="164" height="102" rx="6" fill="${P}" stroke="${T3}" stroke-width="2"/>
      <path d="M35 92 q22 -34 46 -16 q20 15 40 -8 q18 -20 44 -6" fill="none" stroke="${T2}" stroke-width="3"/>
      <path d="M28 58 h144" stroke="${A}" stroke-width="3" stroke-dasharray="8 6"/>
      <text x="100" y="52" text-anchor="middle" font-size="13" font-weight="800" fill="${A}">equator</text>
      <text x="52" y="110" font-size="12" font-weight="700" fill="${T}">latitude</text>
      <text x="118" y="110" font-size="12" font-weight="700" fill="${T}">longitude</text>`),

    // 教室海報上的指令 → Language FOR
    posterClass: () => S(`
      ${board(26, 12, 148, 84)}
      <text x="100" y="38" text-anchor="middle" font-size="13" font-weight="800" fill="${T2}">CLASSROOM</text>
      <text x="100" y="60" text-anchor="middle" font-size="12" font-weight="700" fill="${I}">Take out your worksheet.</text>
      <text x="100" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="${I}">Work with your partner.</text>
      <rect x="88" y="96" width="24" height="20" fill="${T3}"/>`),

    // 學生突然舉手發問 → Language THROUGH
    studentQ: () => S(`
      ${bubble(74, 8, 116, 40, '', A)}
      <text x="132" y="26" text-anchor="middle" font-size="11" font-weight="700" fill="${I}">Teacher, what if</text>
      <text x="132" y="40" text-anchor="middle" font-size="11" font-weight="700" fill="${I}">we do it backwards?</text>
      ${head(42, 58, 15)}${body(42, 73, 42, 40)}
      <path d="M62 72 l16 -30" stroke="${T2}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="80" cy="40" r="6" fill="${T2}"/>`),

    // 家政課食譜 → Language OF
    recipe: () => S(`
      ${board(30, 10, 140, 106)}
      <text x="100" y="32" text-anchor="middle" font-size="13" font-weight="800" fill="${A}">RECIPE</text>
      <circle cx="48" cy="52" r="6" fill="${T2}"/><text x="62" y="57" font-size="12" font-weight="700" fill="${I}">chop　切</text>
      <circle cx="48" cy="76" r="6" fill="${T2}"/><text x="62" y="81" font-size="12" font-weight="700" fill="${I}">boil　煮</text>
      <circle cx="48" cy="100" r="6" fill="${T2}"/><text x="62" y="105" font-size="12" font-weight="700" fill="${I}">stir　攪拌</text>`),

    // 黑板上的討論句框 → Language FOR
    boardFrame: () => S(`
      <rect x="16" y="12" width="168" height="88" rx="4" fill="${I}"/>
      <text x="100" y="44" text-anchor="middle" font-size="13" font-weight="700" fill="${W}">I agree with you,</text>
      <text x="100" y="66" text-anchor="middle" font-size="13" font-weight="700" fill="${A}">because ______.</text>
      <rect x="30" y="100" width="140" height="8" rx="3" fill="${T3}"/>`),

    // 聯絡簿上孩子自己寫的句子 → Language THROUGH
    diaryNote: () => S(`
      ${board(26, 10, 148, 106, AL)}
      <text x="100" y="34" text-anchor="middle" font-size="11" font-weight="800" fill="${A}">MY DIARY</text>
      <text x="100" y="60" text-anchor="middle" font-size="11" font-weight="700" fill="${I}">今天我用英語買東西，</text>
      <text x="100" y="78" text-anchor="middle" font-size="11" font-weight="700" fill="${I}">好有趣！</text>
      <path d="M52 94 h96" stroke="${A}" stroke-width="2" stroke-dasharray="5 4"/>`),

    /* ---------- 鷹架好壞（G2 圖形題） ---------- */
    scaffoldCards: () => S(`
      ${board(14, 22, 76, 74)}
      <text x="52" y="48" text-anchor="middle" font-size="12" font-weight="800" fill="${I}">density</text>
      <path d="M30 58 h44" stroke="${G}" stroke-width="2"/>
      <text x="52" y="78" text-anchor="middle" font-size="12" font-weight="700" fill="${G}">密度</text>
      ${board(110, 22, 76, 74)}
      <text x="148" y="48" text-anchor="middle" font-size="12" font-weight="800" fill="${I}">float</text>
      <path d="M126 58 h44" stroke="${G}" stroke-width="2"/>
      <text x="148" y="78" text-anchor="middle" font-size="12" font-weight="700" fill="${G}">浮起</text>`),

    scaffoldTank: () => S(`
      <rect x="16" y="34" width="92" height="70" rx="5" fill="#DCEBF5" stroke="${T2}" stroke-width="3"/>
      <path d="M16 56 h92" stroke="${T2}" stroke-width="2" stroke-dasharray="5 4"/>
      <circle cx="40" cy="46" r="10" fill="${A}"/>
      <circle cx="68" cy="88" r="10" fill="${R}"/>
      <circle cx="92" cy="90" r="9" fill="${T}"/>
      ${board(120, 24, 66, 82, P)}
      <text x="153" y="44" text-anchor="middle" font-size="11" font-weight="800" fill="${T}">SINK</text>
      <path d="M128 52 h50" stroke="${T3}" stroke-width="2"/>
      <text x="153" y="76" text-anchor="middle" font-size="11" font-weight="800" fill="${A}">FLOAT</text>
      <path d="M128 84 h50" stroke="${T3}" stroke-width="2"/>`),

    scaffoldWall: () => S(`
      <rect x="18" y="14" width="164" height="102" rx="5" fill="${I}"/>
      ${[30, 44, 58, 72, 86, 100].map((y, i) =>
        line(32, y, i % 2 ? 122 : 138, i % 3 === 0 ? '#3E6D68' : '#2C534F')).join('')}
      <text x="100" y="126" text-anchor="middle" font-size="10" font-weight="700" fill="${G}">整頁英文</text>`),

    scaffoldTalk: () => S(`
      ${head(52, 44, 16, T)}${body(52, 60, 46, 46, T)}
      ${bubble(88, 22, 100, 44, '', G)}
      <text x="138" y="40" text-anchor="middle" font-size="11" font-weight="700" fill="${I}">「所以密度就是</text>
      <text x="138" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="${I}">單位體積的質量」</text>`),

    /* ---------- 辰光五種手勢 ---------- */
    gFist: () => S(`
      <path d="M100 118 v-32" stroke="${T2}" stroke-width="10" stroke-linecap="round"/>
      <rect x="76" y="38" width="48" height="46" rx="16" fill="${T}"/>
      <path d="M84 56 h32 M84 68 h32" stroke="${W}" stroke-width="3" stroke-linecap="round"/>
      <path d="M138 40 q10 12 0 24" stroke="${A}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M150 32 q16 20 0 40" stroke="${A}" stroke-width="3" fill="none" stroke-linecap="round"/>`, '0 0 200 130'),

    gPoint: () => S(`
      <path d="M100 120 v-30" stroke="${T2}" stroke-width="10" stroke-linecap="round"/>
      <rect x="78" y="52" width="44" height="40" rx="14" fill="${T}"/>
      <rect x="93" y="12" width="14" height="46" rx="7" fill="${T}"/>
      ${bubble(126, 18, 62, 30, '!', A, 15)}`, '0 0 200 130'),

    gBTT: () => S(`
      <path d="M22 66 h34" stroke="${A}" stroke-width="4"/><path d="M56 58 l12 8 l-12 8 z" fill="${A}"/>
      <text x="38" y="46" text-anchor="middle" font-size="11" font-weight="800" fill="${A}">Back</text>
      <circle cx="100" cy="66" r="22" fill="${P}" stroke="${T2}" stroke-width="3"/>
      <path d="M90 60 q10 -10 20 0 q-10 10 -20 0" fill="${T2}"/>
      <text x="100" y="102" text-anchor="middle" font-size="11" font-weight="800" fill="${T2}">Think</text>
      <path d="M144 66 h34" stroke="${T}" stroke-width="4"/><path d="M178 58 l12 8 l-12 8 z" fill="${T}"/>
      <text x="162" y="46" text-anchor="middle" font-size="11" font-weight="800" fill="${T}">Tell</text>`),

    gEyes: () => S(`
      <ellipse cx="66" cy="62" rx="30" ry="20" fill="${W}" stroke="${T}" stroke-width="3"/>
      <circle cx="66" cy="62" r="10" fill="${T}"/>
      <ellipse cx="134" cy="62" rx="30" ry="20" fill="${W}" stroke="${T}" stroke-width="3"/>
      <circle cx="134" cy="62" r="10" fill="${T}"/>
      <text x="100" y="112" text-anchor="middle" font-size="12" font-weight="800" fill="${T2}">eyes on me</text>`),

    gSit: () => S(`
      ${head(100, 44, 18, T2)}
      <path d="M88 42 q6 -5 12 0 M100 42 q6 -5 12 0" stroke="${W}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M70 112 q30 -42 60 0 z" fill="${T2}"/>
      <path d="M62 100 q-10 8 0 14 M138 100 q10 8 0 14" stroke="${T2}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M42 30 q10 10 0 20 M158 30 q-10 10 0 20" stroke="${T3}" stroke-width="3" fill="none" stroke-linecap="round"/>`),

    /* ---------- 四種情緒表情 ---------- */
    face: (kind) => {
      const col = { happy: OK, sad: '#2E86C1', angry: R, worried: A }[kind] || T2;
      const mouth = {
        happy: `<path d="M74 84 q26 24 52 0" stroke="${W}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
        sad: `<path d="M74 92 q26 -22 52 0" stroke="${W}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
        angry: `<path d="M74 92 q26 -18 52 0" stroke="${W}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
        worried: `<path d="M74 88 q13 -10 26 0 q13 10 26 0" stroke="${W}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
      }[kind];
      const brow = {
        happy: '', sad: `<path d="M62 48 q12 6 22 2 M116 50 q10 -4 22 -2" stroke="${W}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
        angry: `<path d="M60 44 l26 12 M140 44 l-26 12" stroke="${W}" stroke-width="6" stroke-linecap="round"/>`,
        worried: `<path d="M62 46 q12 -6 24 0 M114 46 q12 -6 24 0" stroke="${W}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
      }[kind];
      return S(`<circle cx="100" cy="72" r="56" fill="${col}"/>${brow}
        <circle cx="78" cy="66" r="7" fill="${W}"/><circle cx="122" cy="66" r="7" fill="${W}"/>${mouth}`, '0 0 200 140');
    },

    /* ---------- 英語比例長條圖（G4 判讀題） ---------- */
    ratioChart: () => S(`
      <path d="M28 108 h156" stroke="${G}" stroke-width="2"/>
      ${[['三年級數學', 20, T2], ['五年級數學', 25, T2], ['低年級體育', 30, T3], ['低年級數學', 50, A]]
        .map((b, i) => {
          const h = b[1] * 1.5, x = 40 + i * 36;
          return `<rect x="${x}" y="${108 - h}" width="24" height="${h}" rx="3" fill="${b[2]}"/>
                  <text x="${x + 12}" y="${104 - h}" text-anchor="middle" font-size="11" font-weight="800" fill="${I}">${b[1]}%</text>`;
        }).join('')}
      <text x="100" y="124" text-anchor="middle" font-size="10" font-weight="700" fill="${G}">同一週、同一所學校的四個班</text>`),

    /* ---------- 跨科圖示（G2 選科目） ---------- */
    subj: (k) => {
      const art = {
        chinese: `<rect x="58" y="24" width="84" height="86" rx="5" fill="${AL}" stroke="${A}" stroke-width="3"/>
                  <text x="100" y="62" text-anchor="middle" font-size="26" font-weight="800" fill="${A}">文</text>
                  <path d="M72 78 h56 M72 92 h56" stroke="${A}" stroke-width="3"/>`,
        geo: `<circle cx="100" cy="66" r="42" fill="${P}" stroke="${T2}" stroke-width="3"/>
              <path d="M58 66 h84 M100 24 v84" stroke="${T2}" stroke-width="2"/>
              <path d="M70 44 q30 22 60 0 M70 88 q30 -22 60 0" stroke="${T2}" stroke-width="2" fill="none"/>`,
        pe: `<circle cx="100" cy="66" r="36" fill="${A}"/>
             <path d="M64 66 h72 M100 30 v72" stroke="${W}" stroke-width="4"/>
             <path d="M74 40 q26 26 52 0 M74 92 q26 -26 52 0" stroke="${W}" stroke-width="4" fill="none"/>`,
        sci: `<path d="M84 22 v34 l-26 46 a8 8 0 0 0 7 12 h70 a8 8 0 0 0 7 -12 l-26 -46 v-34 z"
                 fill="#DCEBF5" stroke="${T2}" stroke-width="3"/>
              <path d="M74 82 h52" stroke="${T2}" stroke-width="2"/>
              <circle cx="92" cy="94" r="5" fill="${A}"/><circle cx="112" cy="90" r="4" fill="${T}"/>
              <path d="M78 22 h44" stroke="${T2}" stroke-width="4" stroke-linecap="round"/>`,
      }[k];
      return S(art, '0 0 200 130');
    },
  };
})();
