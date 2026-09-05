/**
 * RSVP collector for orlando-and-sofia.
 * Deploy this as a Google Apps Script Web App bound to a Google Sheet.
 * Every submission becomes one row. Nothing leaves your Google account.
 *
 * Setup is in apps-script/README.md.
 */

var SHEET_NAME = 'RSVPs';

/** Columns, in the order they appear in the sheet. */
var FIELDS = ['submittedAt', 'name', 'email', 'attending', 'guests', 'dietary', 'message'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = getSheet_();
    var params = (e && e.parameter) || {};
    var row = FIELDS.map(function (key) {
      if (key === 'submittedAt') return params.submittedAt || new Date().toISOString();
      return params[key] || '';
    });
    sheet.appendRow(row);
    notify_(params);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Visiting the Web App URL in a browser confirms it is live. */
function doGet() {
  return json_({ ok: true, message: 'RSVP endpoint is live. Post to this URL.' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(FIELDS);
    sheet.getRange(1, 1, 1, FIELDS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Emails you when an RSVP lands.
 * Set NOTIFY_EMAIL in Project Settings > Script Properties to switch it on.
 */
function notify_(p) {
  var to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
  if (!to) return;
  var verdict = p.attending === 'yes' ? 'is coming' : 'cannot make it';
  MailApp.sendEmail({
    to: to,
    subject: 'RSVP: ' + (p.name || 'someone') + ' ' + verdict,
    body: FIELDS.map(function (k) { return k + ': ' + (p[k] || ''); }).join('\n')
  });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
