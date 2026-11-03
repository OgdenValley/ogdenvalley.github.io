// Resort snow reports for Snowbasin, Powder Mountain and Nordic Valley -> resorts.json
// Reads each resort's own public snow report page and keeps ONLY the numbers (new snow, base,
// lifts/trails open, open or closed, road status, when the resort last updated). No text, logos
// or photos are copied; every card links back to the resort's own report.
// If a page changes and can't be read, the last good numbers are kept with a "couldn't update" note.

const ENT = s => String(s || "")
  .replace(/&#(\d+);/g, (m, n) => { try { return String.fromCodePoint(+n); } catch (e) { return " "; } })
  .replace(/&#x([0-9a-f]+);/gi, (m, n) => { try { return String.fromCodePoint(parseInt(n, 16)); } catch (e) { return " "; } })
  .replace(/&quot;/gi, '"').replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&(rsquo|lsquo|apos);/gi, "'");
// page HTML -> plain text (scripts/styles/comments removed, quote marks for inches made plain)
export function pageText(html){
  return ENT(String(html || "").replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ")).replace(/[“”″"]/g, '"').replace(/\s+/g, " ").trim();
}
const inch = v => { const n = parseFloat(String(v).replace(/[^\d.]/g, "")); return isFinite(n) ? n : null; };
const done = r => { const keys = ["new24", "base", "liftsOpen"]; return keys.some(k => r[k] != null) ? r : null; };

// Snowbasin: numbers come before their labels: 0" Since 5am 0" Overnight 0" 24 hours 2" 7 days 0" Base 2" Season
export function parseSnowbasin(html){
  const t = pageText(html), r = {};
  const before = lab => { const m = t.match(new RegExp("([\\d.]+)\\s*\"\\s*" + lab, "i")); return m ? inch(m[1]) : null; };
  r.since5am = before("Since 5\\s*am"); r.overnight = before("Overnight"); r.new24 = before("24 hours"); r.new7d = before("7 days");
  r.base = before("Base"); r.season = before("Season");
  const l = t.match(/Lifts Open\s*(\d+)\s*\/\s*(\d+)/i); if (l) { r.liftsOpen = +l[1]; r.liftsTotal = +l[2]; }
  const tr = t.match(/Trails Open\s*(\d+)\s*\/\s*(\d+)/i); if (tr) { r.trailsOpen = +tr[1]; r.trailsTotal = +tr[2]; }
  const u = t.match(/Last Updated:\s*([A-Za-z]{3,9}\.? \d{1,2},? \d{1,2}:\d{2}\s*[AP]M(?:\s*M[SD]?T)?)/i); if (u) r.resortUpdated = u[1].replace(/\s+/g, " ");
  if (r.liftsOpen != null) r.open = r.liftsOpen > 0;
  return done(r);
}

// Powder Mountain: "It's 40°F and sunny with 0" base depth. 0/5 lifts and 0/153 trails are open."
// plus labels like aria-label="24HR Snowfall: 0"" and "Road: Summit Pass, Status: Clear and dry"
export function parsePowder(html){
  const h = String(html || ""), t = pageText(h), r = {};
  const s = t.match(/with\s*([\d.]+)\s*"\s*base depth\.?\s*(\d+)\s*\/\s*(\d+)\s*lifts and\s*(\d+)\s*\/\s*(\d+)\s*trails/i);
  if (s) { r.base = inch(s[1]); r.liftsOpen = +s[2]; r.liftsTotal = +s[3]; r.trailsOpen = +s[4]; r.trailsTotal = +s[5]; }
  const labels = [...h.matchAll(/aria-label="([^"]*)"/g)].map(m => ENT(m[1]).replace(/\s+/g, " ").trim());
  const lab = re => { const x = labels.find(v => re.test(v)); if (!x) return null; const m = x.match(/:\s*([\d.]+)/); return m ? inch(m[1]) : null; };
  r.new12 = lab(/^12\s*HR Snowfall/i); r.new24 = lab(/^24\s*HR Snowfall/i); r.new48 = lab(/^48\s*HR Snowfall/i); r.new7d = lab(/^7 Day Snowfall/i);
  if (r.base == null) r.base = lab(/^Base Depth/i);
  const roads = labels.filter(v => /^Road: /i.test(v)).map(v => { const m = v.match(/^Road:\s*(.+?),\s*Status:\s*(.+)$/i); return m ? {name: m[1].trim().slice(0, 40), status: m[2].trim().slice(0, 60)} : null; }).filter(Boolean);
  const seen = new Set(); r.roads = roads.filter(x => !seen.has(x.name) && seen.add(x.name)).slice(0, 4);
  if (!r.roads.length) delete r.roads;
  const u = t.match(/Updated:\s*(\d{1,2}\/\d{1,2}\/\d{2,4}\s+\d{1,2}:\d{2}\s*[AP]M(?:\s*M[SD]T)?)/i); if (u) r.resortUpdated = u[1];
  if (r.liftsOpen != null) r.open = r.liftsOpen > 0;
  return done(r);
}

// Nordic Valley: 0" 24 Hr 0" 48 Hr 0" 7 Day 0" Base Depth 29" Season Total, plus "is currently closed."
export function parseNordic(html){
  const t = pageText(html), r = {};
  const before = lab => { const m = t.match(new RegExp("([\\d.]+)\\s*\"\\s*" + lab, "i")); return m ? inch(m[1]) : null; };
  r.new24 = before("24 Hr"); r.new48 = before("48 Hr"); r.new7d = before("7 Day"); r.base = before("Base Depth"); r.season = before("Season Total");
  if (/currently closed/i.test(t)) r.open = false; else if (/currently open|is open today|open today/i.test(t)) r.open = true;
  const u = t.match(/totals updated:\s*([A-Za-z]+ \d{1,2},? \d{4}(?:,? \d{1,2}:\d{2}\s*[ap]m)?)/i); if (u) r.resortUpdated = u[1];
  return done(r);
}

export const RESORTS = [
  {id: "snowbasin", name: "Snowbasin", url: "https://www.snowbasin.com/the-mountain/mountain-report/", parse: parseSnowbasin},
  {id: "powder", name: "Powder Mountain", url: "https://powdermountain.com/conditions", parse: parsePowder},
  {id: "nordic", name: "Nordic Valley", url: "https://www.nordicvalley.ski/nordic-valley-weather-conditions-webcams/", parse: parseNordic}
];

// deps: {getText, writeIfChanged, oldJSON}
export async function resorts({getText, writeIfChanged, oldJSON}){
  const old = oldJSON("resorts.json") || {};
  const prev = id => (old.resorts || []).find(x => x.id === id) || null;
  const out = {updated: new Date().toISOString(), note: "Numbers from each resort's own snow report. Check the resort before you go.", resorts: []};
  for (const R of RESORTS) {
    const base = {id: R.id, name: R.name, link: R.url, source: R.name};
    try {
      const got = R.parse(await getText(R.url));
      if (!got) throw new Error("no numbers found on the page");
      out.resorts.push({...base, ...got, checked: new Date().toISOString(), status: "ok"});
      console.log("resort", R.name, JSON.stringify(got));
    } catch (e) {
      const p = prev(R.id);
      out.resorts.push({...(p || base), ...base, checked: p ? p.checked : null, status: "couldn't update", error: String(e.message || e).slice(0, 80)});
      console.log("resort", R.name, "failed:", e.message);
    }
  }
  writeIfChanged("resorts.json", out);
  return out;
}

// Winter alerts that switch the website into snow mode (not frost/freeze, which are fall garden alerts)
export const WINTER_EVENTS = /winter storm|winter weather|blizzard|ice storm|snow squall|heavy snow|lake effect snow|avalanche|wind chill|extreme cold|cold weather advisory|freezing rain|freezing drizzle/i;
export const isWinterAlert = a => WINTER_EVENTS.test(String((a && (a.event || a.headline)) || ""));
