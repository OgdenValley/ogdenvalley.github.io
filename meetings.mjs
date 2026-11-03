// Valley public meetings -> meetings.json (used by meetings.html and the home page "This week" line)
// Source: the Utah Public Notice Website (utah.gov/pmn), the official place every public body posts its notices,
// agendas, audio recordings and minutes. Only what each notice says is kept; nothing is added or summarized.
// Upcoming meetings are re-read every hour. Past meetings (last 60 days) are re-read every 6 hours so the
// "Recording" and "Minutes" links appear once the body posts them.

export const BODIES = [
  {id: 9431, name: "Ogden Valley City Council", short: "OV City Council", group: "Ogden Valley City"},
  {id: 9467, name: "Ogden Valley Planning Commission", short: "OV Planning", group: "Ogden Valley City"},
  {id: 313, name: "Huntsville Town Council", short: "Huntsville Council", group: "Huntsville Town"},
  {id: 314, name: "Huntsville Planning Commission", short: "Huntsville Planning", group: "Huntsville Town"},
  {id: 1707, name: "Weber Fire District Board of Trustees", short: "Weber Fire District", group: "Districts"},
  {id: 2167, name: "Weber County Commission", short: "County Commission", group: "Weber County"}
];
const PMN = "https://www.utah.gov";
const ENT = s => String(s || "").replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (m, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&nbsp;/gi, " ").replace(/&(rsquo|lsquo|apos|#39);/gi, "'").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
const txt = h => ENT(String(h || "").replace(/\r/g, "").replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, " ")).replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").trim();
const abs = u => u.startsWith("http") ? u : PMN + u;

// Utah (America/Denver) wall-clock -> epoch ms
function mt(y, mo, d, h, mi){ const guess = Date.UTC(y, mo - 1, d, h, mi);
  const p = {}; new Intl.DateTimeFormat("en-US", {timeZone: "America/Denver", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"}).formatToParts(new Date(guess)).forEach(x => p[x.type] = x.value);
  const shown = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute); return guess - (shown - guess); }
const MONTHS = {january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12};
function when(s){ s = String(s || "");
  let m = s.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (m) { let h = +m[4] % 12; if (/pm/i.test(m[6])) h += 12; return mt(+m[1], +m[2], +m[3], h, +m[5]); }
  m = s.match(/([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (m && MONTHS[m[1].toLowerCase()]) { let h = +m[4] % 12; if (/pm/i.test(m[6])) h += 12; return mt(+m[3], MONTHS[m[1].toLowerCase()], +m[2], h, +m[5]); }
  return null; }

// public body page: list of notices with title and date
export function parseBody(html){
  const out = [];
  for (const r of String(html || "").matchAll(/<tr[^>]*>\s*<td>\s*<a href="(\/pmn\/sitemap\/notice\/(\d+)\.html)"[^>]*>([\s\S]*?)<\/a>\s*<\/td>\s*<td>([\s\S]*?)<\/td>/g))
    out.push({id: r[2], link: abs(r[1]), title: txt(r[3]).slice(0, 200), start: when(txt(r[4]))});
  const seen = new Set(); return out.filter(x => !seen.has(x.id) && seen.add(x.id));
}
const SKIP = /^(call to order|roll call|pledge|moment of silence|invocation|adjourn|welcome|approval of (the )?agenda|closed (meeting|session).*as needed)/i;
// one notice page: times, place, online link, agenda items, attachments (audio, minutes, agenda/packet)
export function parseNotice(html){
  const h = String(html || ""), dd = label => { const m = h.match(new RegExp("<dt>\\s*" + label + "\\s*</dt>\\s*<dd[^>]*>([\\s\\S]*?)</dd>", "i")); return m ? m[1] : ""; };
  const r = {};
  r.title = txt(dd("Notice Title")).slice(0, 200);
  r.start = when(txt(dd("Event Start Date &amp; Time")) || txt(dd("Event Start Date & Time")));
  r.end = when(txt(dd("Event End Date &amp; Time")) || txt(dd("Event End Date & Time")));
  const locHtml = dd("Meeting Location").split(/<a\b/i)[0];
  r.place = txt(locHtml).split("\n").map(x => x.trim()).filter(Boolean).join(", ").slice(0, 160);
  const agenda = txt(dd("Description/Agenda"));
  const link = (agenda.match(/https?:\/\/(?:teams\.microsoft\.com|teams\.live\.com|[\w.-]*zoom\.us|meet\.google\.com)\/[^\s"<>)]+/i) || [])[0];
  if (link) { r.online = link.replace(/[.,;]+$/, ""); r.onlineKind = /zoom/i.test(link) ? "Zoom" : /google/i.test(link) ? "Google Meet" : "Teams"; }
  const items = [...agenda.replace(/\n/g, " ").matchAll(/(?:^|\s)(\d{1,2})\.\s+(.+?)(?=\s\d{1,2}\.\s|$)/g)].map(m => m[2].replace(/\s+[a-z]\.\s.*$/, "").replace(/\s*\(\d+\s*min(utes)?\)/gi, "").trim())
    .filter(x => x && !SKIP.test(x) && x.length > 3).map(x => x.slice(0, 110));
  if (items.length) r.items = items.slice(0, 12);
  r.canceled = /cancel+ed|postponed/i.test(r.title);
  r.files = [];
  const att = h.split(/Download Attachments/i)[1] || "";
  for (const m of att.matchAll(/<tr>\s*<td>\s*<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>/g)) {
    const name = txt(m[2]).slice(0, 120), cat = txt(m[3]), url = abs(m[1]);
    const kind = /audio|recording/i.test(cat) || /\.(m4a|mp3|wav|wma|mp4)$/i.test(url) ? "recording" : /minute/i.test(cat + " " + name) ? "minutes" : /agenda|packet/i.test(cat + " " + name) ? "agenda" : "file";
    r.files.push({name, kind, url, added: when(txt(m[4]))});
  }
  return r;
}

// deps: {getText, writeIfChanged, oldJSON}
export async function meetings({getText, writeIfChanged, oldJSON}){
  const old = oldJSON("meetings.json") || {}, byId = new Map((old.meetings || []).map(m => [m.id, m]));
  const now = Date.now(), PAST = 60 * 864e5, AHEAD = 60 * 864e5, REREAD_PAST = 6 * 36e5;
  const out = {updated: new Date().toISOString(), source: "Utah Public Notice Website (utah.gov/pmn)", bodies: BODIES.map(b => ({id: b.id, name: b.name, short: b.short, group: b.group, link: PMN + "/pmn/sitemap/publicbody/" + b.id + ".html"})), meetings: [], status: {}};
  for (const b of BODIES) {
    let list;
    try { list = parseBody(await getText(PMN + "/pmn/sitemap/publicbody/" + b.id + ".html")); out.status[b.name] = list.length ? "ok" : "no notices found"; }
    catch (e) { out.status[b.name] = "failed"; console.log("meetings", b.name, "failed:", e.message); out.meetings.push(...(old.meetings || []).filter(m => m.bodyId === b.id)); continue; }
    for (const n of list) {
      if (n.start && (n.start < now - PAST || n.start > now + AHEAD)) continue;
      const prev = byId.get(n.id), past = n.start && n.start < now - 3 * 36e5;
      let d = prev && past && prev.read && now - prev.read < REREAD_PAST ? prev : null;
      if (!d) { try { d = {...parseNotice(await getText(n.link)), read: now}; } catch (e) { d = prev || {}; console.log("notice", n.id, "failed:", e.message); } }
      out.meetings.push({...d, id: n.id, bodyId: b.id, body: b.name, short: b.short, link: n.link, title: d.title || n.title, start: d.start || n.start});
    }
    console.log("meetings", b.name, list.length, "notices");
  }
  out.meetings.sort((a, b) => (a.start || 9e15) - (b.start || 9e15));
  writeIfChanged("meetings.json", out);
  return out;
}
