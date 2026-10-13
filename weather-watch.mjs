// Weather watch (runs inside the hourly update, see update-data.mjs).
// 1) Checks the Valley forecast (forecast.json) and NWS alerts (safety.json) for things worth a briefing:
//    Valley snow, a hard freeze (25 degrees or colder), two wet days in a row (70%+), or an NWS warning.
//    The result goes in watch.json and shows on the private page weather-watch.html.
// 2) Drafts a weekly briefing graphic (weather-draft.png) every Monday morning, and again whenever a new
//    reason for a briefing shows up. Drafts are never posted on their own: they wait on weather-watch.html.
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import zlib from "node:zlib";

const TZ = "America/Denver";
const readJSON = f => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return null; } };
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
const AP = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
const DAYNAME = {Sun: "Sunday", Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday"};
function local(t = Date.now()) {
  const p = {}; new Intl.DateTimeFormat("en-US", {timeZone: TZ, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit", weekday: "short"})
    .formatToParts(new Date(t)).forEach(x => p[x.type] = x.value);
  return {y: +p.year, m: +p.month, d: +p.day, h: +p.hour, min: p.minute, wd: p.weekday, ymd: p.year + "-" + String(p.month).padStart(2, "0") + "-" + String(p.day).padStart(2, "0")};
}
function apDate(ymd) { const [y, m, d] = ymd.split("-").map(Number); return AP[m - 1] + " " + d; }
const span = (a, b, u = "°") => a === b ? a + u : a + "–" + b + u;
function apTime(iso) { if (!iso) return ""; const L = local(Date.parse(iso)); const h12 = L.h % 12 || 12; return h12 + ":" + L.min + (L.h < 12 ? " a.m." : " p.m.") + " " + AP[L.m - 1] + " " + L.d; }

/* ---------- what counts as "a briefing is needed" ---------- */
export function checkTriggers(fc, sf) {
  const days = (fc && fc.days) || [], reasons = [];
  const snowDays = days.filter(d => d.snow);
  if (snowDays.length) reasons.push({kind: "snow", key: "snow:" + snowDays.map(d => d.date).join(","), short: "VALLEY SNOW " + (snowDays.length > 2 ? snowDays[0].label.toUpperCase() + "–" + snowDays[snowDays.length - 1].label.toUpperCase() : snowDays.map(d => d.label.toUpperCase()).join(" & ")),
    text: "Snow is in the Valley forecast for " + snowDays.map(d => DAYNAME[d.label] || d.label).join(", ") + "."});
  else if (fc && fc.snowInches48 > 0) reasons.push({kind: "snow", key: "snow48", short: "VALLEY SNOW POSSIBLE", text: "The forecast shows about " + fc.snowInches48 + " inches of Valley snow in the next 48 hours."});
  const hard = days.filter(d => d.low != null && d.low <= 25);
  if (hard.length) { const cold = hard.reduce((a, d) => d.low < a.low ? d : a);
    reasons.push({kind: "freeze", key: "freeze:" + hard.map(d => d.date).join(","), short: "HARD FREEZE · LOW " + cold.low + "° " + cold.label.toUpperCase() + " NIGHT",
      text: "Hard freeze: lows of 25° or colder on " + hard.length + (hard.length === 1 ? " night" : " nights") + ", as cold as " + cold.low + "° " + (DAYNAME[cold.label] || cold.label) + " night."}); }
  for (let i = 0; i + 1 < days.length; i++) if (days[i].pop >= 70 && days[i + 1].pop >= 70) {
    reasons.push({kind: "wet", key: "wet:" + days[i].date, short: "WET " + days[i].label.toUpperCase() + "–" + days[i + 1].label.toUpperCase(),
      text: "Two wet days in a row: " + (DAYNAME[days[i].label] || days[i].label) + " " + days[i].pop + "% and " + (DAYNAME[days[i + 1].label] || days[i + 1].label) + " " + days[i + 1].pop + "%."});
    break;
  }
  const warn = ((sf && sf.weather) || []).filter(a => /warning/i.test(a.event || ""));
  for (const a of warn.reverse()) reasons.unshift({kind: "nws", key: "nws:" + a.event + ":" + (a.starts || ""), short: String(a.event).toUpperCase(), text: "National Weather Service " + a.event + " for Weber County" + (a.ends ? ", until " + apTime(a.ends) : "") + "."});
  return reasons;
}

/* ---------- simple drawn weather icons (no emoji, so they look the same everywhere) ---------- */
function icon(text, pop = 100) {
  let t = String(text || "").toLowerCase();
  if (pop < 30) t = t.replace(/[^/]*?(snow|flurr|sleet|wintry|thunder|storm|rain|shower|drizzle)[^/]*/g, " partly ");
  const sun = '<circle cx="30" cy="30" r="12" fill="#F6B13B"/><g stroke="#F6B13B" stroke-width="4" stroke-linecap="round"><line x1="30" y1="6" x2="30" y2="12"/><line x1="30" y1="48" x2="30" y2="54"/><line x1="6" y1="30" x2="12" y2="30"/><line x1="48" y1="30" x2="54" y2="30"/><line x1="13" y1="13" x2="17" y2="17"/><line x1="43" y1="43" x2="47" y2="47"/><line x1="13" y1="47" x2="17" y2="43"/><line x1="43" y1="17" x2="47" y2="13"/></g>';
  const cloud = (dx = 0, dy = 0) => '<g transform="translate(' + dx + ' ' + dy + ')" fill="#9FB3C8"><circle cx="24" cy="30" r="10"/><circle cx="36" cy="26" r="13"/><circle cx="46" cy="32" r="9"/><rect x="14" y="30" width="42" height="11" rx="5.5"/></g>';
  const rain = '<g stroke="#2E6DA4" stroke-width="4" stroke-linecap="round"><line x1="22" y1="46" x2="19" y2="54"/><line x1="33" y1="46" x2="30" y2="54"/><line x1="44" y1="46" x2="41" y2="54"/></g>';
  const snow = '<g fill="#2E6DA4"><circle cx="21" cy="50" r="3.5"/><circle cx="33" cy="53" r="3.5"/><circle cx="45" cy="50" r="3.5"/></g>';
  const bolt = '<polygon points="34,40 26,52 32,52 28,60 40,46 34,46 38,40" fill="#F6B13B"/>';
  let g;
  if (/snow|flurr|sleet|wintry/.test(t)) g = cloud(0, -4) + snow;
  else if (/thunder|storm/.test(t)) g = cloud(0, -6) + bolt;
  else if (/rain|shower|drizzle/.test(t)) g = cloud(0, -4) + rain;
  else if (/partly|mostly sunny|mostly clear/.test(t)) g = '<g transform="translate(-6 -6) scale(.8)">' + sun + '</g>' + cloud(4, 6);
  else if (/cloud|overcast|fog/.test(t)) g = cloud(0, 0);
  else g = sun;
  return '<svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">' + g + '</svg>';
}

/* ---------- the draft briefing graphic (same look as the Oct. 8 storm briefing) ---------- */
export function draftHTML(fc, sf, reasons, nowMs = Date.now()) {
  const L = local(nowMs);
  let days = ((fc && fc.days) || []).filter(d => d.date >= L.ymd);
  if (L.h >= 15 && days.length && days[0].date === L.ymd) days = days.slice(1);
  days = days.filter(d => d.high != null || d.low != null).slice(0, 6);
  if (days.length < 4) return null; // forecast too short or out of date
  const first = days[0].date, last = days[days.length - 1].date;
  const [fy, fm] = first.split("-").map(Number), [, lm, ld] = last.split("-").map(Number);
  const range = AP[fm - 1] + " " + +first.slice(8) + "–" + (lm !== fm ? AP[lm - 1] + " " : "") + ld + ", " + fy;
  const highs = days.map(d => d.high).filter(v => v != null), lows = days.map(d => d.low).filter(v => v != null);
  const wettest = days.reduce((a, d) => (d.pop > (a ? a.pop : -1) ? d : a), null);
  const freezeNights = days.filter(d => d.low != null && d.low <= 32);
  const has = k => reasons.some(r => r.kind === k);
  let band;
  if (reasons.length) band = reasons.map(r => r.short).slice(0, 2).join(" · ");
  else if (wettest && wettest.pop >= 40) band = "WETTEST DAY: " + (DAYNAME[wettest.label] || wettest.label).toUpperCase() + ", " + apDate(wettest.date).toUpperCase() + " · " + wettest.pop + "% CHANCE";
  else band = "MOSTLY DRY · HIGHS " + span(Math.min(...highs), Math.max(...highs));
  const hot = wettest && wettest.pop >= 40 ? wettest.date : null;
  const tiles = days.map(d => '<div class="d' + (d.date === hot ? " hot" : "") + '"><b>' + esc(d.label.toUpperCase()) + "</b><small>" + esc(d.md) + '</small><div class="i">' + icon(d.short || d.both, d.pop || 0) + '</div><div class="t">' +
    (d.high != null ? d.high + "°" : "–") + " / " + (d.low != null ? d.low + "°" : "–") + '</div><div class="p">' + (d.pop || 0) + "%</div></div>").join("");
  const wetDays = days.filter(d => d.pop >= 30);
  const box1 = wetDays.length ? "Best chances: " + wetDays.map(d => "<b>" + esc(DAYNAME[d.label] || d.label) + " " + d.pop + "%</b>").join(", ") + "." + (days.some(d => d.snow) ? " Snow is possible on the Valley floor." : "")
    : "Dry all week. <b>No day above a 30% chance</b> of rain or snow.";
  const box1b = wetDays.length && wetDays.length < days.length ? " The other days are 30% or less." : "";
  const box2 = "Highs <b>" + span(Math.min(...highs), Math.max(...highs)) + "</b>, lows <b>" + span(Math.min(...lows), Math.max(...lows)) + "</b>. " +
    (freezeNights.length ? "<b>" + freezeNights.length + (freezeNights.length === 1 ? " night" : " nights") + "</b> at or below freezing" + (has("freeze") ? ", with a <b>hard freeze</b> possible." : ".") : "No freezing nights in the forecast.");
  const sl = fc && fc.snowLevelFt;
  const box3 = sl ? "Lowest in the next 3 days: about <b>" + sl.toLocaleString("en-US") + " feet</b>. The Valley floor is about 5,000 feet, so " + (sl <= 5500 ? "<b>snow can reach the Valley</b>." : "snow stays above the Valley.") : "No snow level in the forecast for the next 3 days.";
  const alerts = (sf && sf.weather) || [];
  const box4 = alerts.length ? [...new Set(alerts.map(a => a.event))].map(e => "<b>" + esc(e) + "</b>").join(", ") + " for Weber County. Details at weather.gov/slc." : "No National Weather Service watches, warnings or advisories for Weber County <b>right now</b>.";
  const tips = [];
  if (has("snow") || (sl && sl <= 5500)) tips.push("Check tires and scrapers", "Watch the snowplow map");
  if (freezeNights.length) tips.push("Cover tender plants", "Unhook garden hoses");
  if (days.some(d => d.pop >= 60 && !d.snow)) tips.push("Never drive through water on the road", "Allow extra time in the canyons");
  if (has("nws")) tips.unshift("Follow official NWS instructions");
  tips.push("Check our Road & Weather page", "Share your weather photos with us");
  const tipList = [...new Set(tips)].slice(0, 6).map(t => "<li>" + esc(t) + "</li>").join("");
  const issued = fc && fc.forecastIssued ? ", issued " + apTime(fc.forecastIssued) + ", " + fy : "";
  return `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0;padding:0}body{width:1080px;height:1350px;background:#EEF3F8;font-family:Arial,"Liberation Sans",Helvetica,sans-serif;color:#10233D;overflow:hidden;display:flex;flex-direction:column}
.top{background:linear-gradient(120deg,#0D2340,#1F4E80);padding:36px 44px 28px;color:#fff}.eye{color:#F6A93B;font-weight:700;letter-spacing:4px;font-size:21px}
h1{font-size:60px;margin-top:10px;font-weight:800}.sub{font-size:26px;color:#D6E2F0;margin-top:10px}
.band{background:#DD4B10;color:#fff;font-weight:800;font-size:28px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center;padding:15px 20px}
.days{display:grid;grid-template-columns:repeat(${days.length},1fr);gap:12px;padding:28px 34px 0}
.d{background:#fff;border:2px solid #D6DFE9;border-radius:12px;text-align:center;padding:12px 4px}.d.hot{border:3px solid #DD4B10;background:#FFF4EE}
.d b{display:block;font-size:25px}.d small{font-size:18px;color:#4F6178}.d .i{margin:4px 0 2px}.d .t{font-size:25px;font-weight:700}.d .p{font-size:21px;color:#2E6DA4;font-weight:700;margin-top:4px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:24px 34px 0}
.c{background:#fff;border-radius:14px;border-left:10px solid #DD4B10;padding:16px 22px}.c.b{border-left-color:#2E6DA4}.c h2{font-size:32px;margin-bottom:10px}.c p{font-size:26px;line-height:1.38}
.dark{background:#10233D;color:#fff;border-radius:14px;padding:18px 26px;margin:22px 34px 0}.dark h2{color:#F6A93B;font-size:30px;margin-bottom:8px}.dark ul{columns:2;column-gap:30px;padding-left:26px;font-size:23px;line-height:1.4}
.src{font-size:17.5px;color:#4F6178;line-height:1.45;padding:20px 34px 0;margin-top:auto}.foot{text-align:right;font-weight:700;font-size:21px;padding:6px 34px 30px}
</style></head><body>
<div class="top"><div class="eye">OGDEN VALLEY INFO &amp; EVENTS · WEATHER</div><h1>Ogden Valley Weather Briefing</h1><div class="sub">${esc(range)} · Eden, Liberty, Huntsville</div></div>
<div class="band">${esc(band)}</div>
<div class="days">${tiles}</div>
<div class="grid">
<div class="c"><h2>Rain &amp; snow</h2><p>${box1}${box1b}</p></div>
<div class="c"><h2>Temperatures</h2><p>${box2}</p></div>
<div class="c b"><h2>Snow level</h2><p>${box3}</p></div>
<div class="c b"><h2>Alerts</h2><p>${box4}</p></div>
</div>
<div class="dark"><h2>Get ready</h2><ul>${tipList}</ul></div>
<div class="src"><b>Sources:</b> National Weather Service point forecast for the Eden, Liberty and Huntsville area${esc(issued)} (temperatures, rain and snow chances, snow level); National Weather Service alerts for Weber County. Forecasts change. This is not an official warning. Check weather.gov/slc for updates.</div>
<div class="foot">Ogden Valley Info &amp; Events</div>
</body></html>`;
}

function findChrome() {
  const list = [process.env.CHROME_PATH, "google-chrome", "google-chrome-stable", "chromium", "chromium-browser"].filter(Boolean);
  for (const c of list) { try { execSync((c.includes("/") ? '"' + c + '"' : c) + " --version", {stdio: "ignore"}); return c; } catch {} }
  return null;
}
// Headless Chrome shows a little less page than the window size it is given, so measure that gap,
// open a taller window, then keep only the top 1350 rows of the screenshot.
function chromeRun(chrome, args) { return execSync('"' + chrome + '" --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=1 ' + args, {encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 60000}); }
function cropPNGTop(file, keepRows) {
  const buf = fs.readFileSync(file);
  const chunks = []; let i = 8;
  while (i < buf.length) { const len = buf.readUInt32BE(i), type = buf.toString("ascii", i + 4, i + 8); chunks.push({type, data: buf.subarray(i + 8, i + 8 + len)}); i += 12 + len; }
  const ih = chunks.find(c => c.type === "IHDR").data; const w = ih.readUInt32BE(0), h = ih.readUInt32BE(4), depth = ih[8], color = ih[9], interlace = ih[12];
  if (h <= keepRows) return;
  if (interlace || depth !== 8 || ![2, 6].includes(color)) throw new Error("unexpected PNG format");
  const raw = zlib.inflateSync(Buffer.concat(chunks.filter(c => c.type === "IDAT").map(c => c.data)));
  const row = 1 + w * (color === 6 ? 4 : 3);
  const kept = raw.subarray(0, row * keepRows); // PNG row filters only look at rows above, so the top rows stay valid as they are
  const crcTable = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; crcTable[n] = c >>> 0; }
  const crc = b => { let c = 0xFFFFFFFF; for (const x of b) c = crcTable[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  const chunk = (type, data) => { const t = Buffer.from(type, "ascii"), l = Buffer.alloc(4), c = Buffer.alloc(4); l.writeUInt32BE(data.length); c.writeUInt32BE(crc(Buffer.concat([t, data]))); return Buffer.concat([l, t, data, c]); };
  const ih2 = Buffer.from(ih); ih2.writeUInt32BE(keepRows, 4);
  fs.writeFileSync(file, Buffer.concat([buf.subarray(0, 8), chunk("IHDR", ih2), chunk("IDAT", zlib.deflateSync(kept, {level: 9})), chunk("IEND", Buffer.alloc(0))]));
}
function render(html, out) {
  const chrome = findChrome(); if (!chrome) throw new Error("no Chrome found");
  const W = 1080, H = 1350;
  const probe = path.resolve(".viewport-probe.html"), tmp = path.resolve(".weather-draft.html");
  fs.writeFileSync(probe, '<html><body><script>document.title="VP"+innerHeight</script></body></html>');
  let gap = 0;
  try { const m = chromeRun(chrome, "--dump-dom --window-size=" + W + "," + H + ' "file://' + probe + '"').match(/VP(\d+)/); if (m) gap = Math.max(0, H - +m[1]); } catch {}
  fs.writeFileSync(tmp, html);
  try { chromeRun(chrome, "--virtual-time-budget=3000 --window-size=" + W + "," + (H + gap) + ' --screenshot="' + path.resolve(out) + '" "file://' + tmp + '"'); }
  finally { for (const f of [tmp, probe]) try { fs.unlinkSync(f); } catch {} }
  if (!fs.existsSync(out)) throw new Error("screenshot not written");
  cropPNGTop(out, H);
}

/* ---------- the hourly step ---------- */
export async function weatherWatch(nowMs = Date.now(), force = process.env.WEATHER_DRAFT === "1") {
  const fc = readJSON("forecast.json"), sf = readJSON("safety.json");
  const old = readJSON("watch.json") || {};
  if (!fc || !(fc.days || []).length) { console.log("weather watch: no forecast yet"); return; }
  const reasons = checkTriggers(fc, sf);
  const keys = reasons.map(r => r.key).sort(), oldKeys = (old.reasons || []).map(r => r.key).sort();
  const isNew = keys.some(k => !oldKeys.includes(k));
  const L = local(nowMs);
  const mondayDue = L.wd === "Mon" && L.h >= 6 && (!old.draft || local(Date.parse(old.draft.made)).ymd !== L.ymd);
  const out = {updated: new Date(nowMs).toISOString(), needed: reasons.length > 0, since: reasons.length ? (old.needed && old.since ? old.since : new Date(nowMs).toISOString()) : null,
    reasons: reasons.map(({kind, key, text}) => ({kind, key, text})), forecastIssued: fc.forecastIssued || null, draft: old.draft || null};
  if (force || mondayDue || (isNew && reasons.length)) {
    try {
      const html = draftHTML(fc, sf, reasons, nowMs);
      if (!html) throw new Error("not enough forecast days");
      render(html, "weather-draft.png");
      out.draft = {made: new Date(nowMs).toISOString(), why: force && !mondayDue && !(isNew && reasons.length) ? "Made by hand" : mondayDue ? "Monday weekly draft" : "New reason for a briefing: " + reasons.filter(r => !oldKeys.includes(r.key)).map(r => r.text).join(" "),
        image: "weather-draft.png", forecastIssued: fc.forecastIssued || null};
      try { execSync("git add -- weather-draft.png", {stdio: "ignore"}); } catch {}
      console.log("weather watch: new draft made (" + out.draft.why + ")");
    } catch (e) { console.log("weather watch: draft failed:", e.message); }
  }
  const strip = o => { const c = {...o}; delete c.updated; return JSON.stringify(c); };
  if (old.updated && strip(old) === strip(out)) { console.log("watch.json unchanged"); return; }
  fs.writeFileSync("watch.json", JSON.stringify(out, null, 1) + "\n"); console.log("watch.json written", out.needed ? "(briefing needed)" : "");
}
