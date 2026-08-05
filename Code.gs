/**
 * 雙語教育研習互動遊戲 — Google Apps Script 後端
 * ---------------------------------------------------------------
 * 部署步驟（只要做一次，約 3 分鐘）：
 *  1. 開一份新的 Google 試算表，命名為「雙語研習遊戲紀錄」
 *  2. 上方選單 → 擴充功能 Extensions → Apps Script
 *  3. 把這整個檔案的內容貼進去，取代原本的 myFunction，然後儲存
 *  4. 右上角「部署 Deploy」→「新增部署作業 New deployment」
 *     · 類型選「網頁應用程式 Web app」
 *     · 執行身分 Execute as：我 Me
 *     · 誰可以存取 Who has access：所有人 Anyone
 *     · 按「部署」→ 第一次會要求授權，一路允許
 *  5. 複製產生的網址（結尾是 /exec）
 *  6. 把網址貼到 common.js 第 12 行的 GAS_URL = '這裡'
 *  7. 重新上傳 common.js 到 GitHub，完成
 *
 * 修改題目或選項後不需要重新部署 Apps Script，只要重傳 HTML 即可。
 */

var SHEET_NAME = 'log';
var HEADERS = ['ts', 'session', 'pid', 'name', 'school', 'role', 'game', 'score', 'max', 'payload'];

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

/** 學員送出作答（表單 POST） */
function doPost(e) {
  try {
    var p = (e && e.parameter) || {};
    var sh = sheet_();
    var row = [
      p.ts || new Date().toISOString(),
      p.session || 'default',
      p.pid || '', p.name || '', p.school || '', p.role || '',
      p.game || '', Number(p.score || 0), Number(p.max || 0),
      p.payload || '{}'
    ];

    // 同一個人、同一關只保留最新一筆
    var last = sh.getLastRow();
    var hit = 0;
    if (last > 1) {
      var vals = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
      for (var i = vals.length - 1; i >= 0; i--) {
        if (vals[i][2] === row[2] && vals[i][6] === row[6] && vals[i][1] === row[1]) { hit = i + 2; break; }
      }
    }
    if (hit) sh.getRange(hit, 1, 1, HEADERS.length).setValues([row]);
    else sh.appendRow(row);

    return out_({ ok: true }, null);
  } catch (err) {
    return out_({ ok: false, error: String(err) }, null);
  }
}

/** 主持人畫面讀取（JSONP GET） */
function doGet(e) {
  var p = (e && e.parameter) || {};
  var cb = p.callback || null;
  try {
    if (p.action === 'ping') return out_({ ok: true, pong: true }, cb);

    var sh = sheet_();
    var last = sh.getLastRow();
    var rows = [];
    if (last > 1) {
      var vals = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
      for (var i = 0; i < vals.length; i++) {
        var o = {};
        for (var j = 0; j < HEADERS.length; j++) o[HEADERS[j]] = vals[i][j];
        if (!p.session || p.session === 'ALL' || String(o.session) === String(p.session)) rows.push(o);
      }
    }
    return out_({ ok: true, count: rows.length, rows: rows }, cb);
  } catch (err) {
    return out_({ ok: false, error: String(err) }, cb);
  }
}

function out_(obj, cb) {
  var json = JSON.stringify(obj);
  if (cb) {
    return ContentService.createTextOutput(cb + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

/** 研習結束後清空這一場的紀錄：在編輯器裡改好 session 再按執行 */
function clearSession() {
  var session = 'default';               // ← 要清掉的場次代碼
  var sh = sheet_();
  var last = sh.getLastRow();
  if (last < 2) return;
  var vals = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
  for (var i = vals.length - 1; i >= 0; i--) {
    if (String(vals[i][1]) === session) sh.deleteRow(i + 2);
  }
}
