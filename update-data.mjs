// Runs every hour on GitHub (see .github/workflows/update-data.yml).
// 1) Pulls the two public Google Calendars into events.json
// 2) Pulls the NOAA northern-lights (Kp) forecast and NWS cloud cover into sky.json
// Files are only rewritten when something actually changed.
import fs from "node:fs";

function cleanDesc(d){ if(!d) return ""; return d.replace(/<br\s*\/?>/gi,"\n").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/\n{3,}/g,"\n\n").trim().slice(0,600); }
function firstUrl(d){ const m = String(d||"").match(/https?:\/\/[^\s"<>)]+/); return m ? m[0] : ""; }

function icsTzOff(t,tz){try{const p={};new Intl.DateTimeFormat("en-US",{timeZone:tz,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(t)).forEach(x=>p[x.type]=x.value);return Date.UTC(+p.year,+p.month-1,+p.day,+p.hour%24,+p.minute,+p.second)-t}catch(e){return null}}
function icsTime(v,P){P=P||{};const m=String(v).match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?$/);if(!m)return null;
  const y=+m[1],mo=+m[2],d=+m[3];if(!m[4]||P.VALUE==="DATE")return {t:new Date(y,mo-1,d).getTime(),allDay:true};
  const h=+m[4],mi=+m[5],s=+(m[6]||0);if(m[7])return {t:Date.UTC(y,mo-1,d,h,mi,s)};
  const tz=P.TZID&&P.TZID.replace(/^"|"$/g,"");if(tz){const g=Date.UTC(y,mo-1,d,h,mi,s);const o=icsTzOff(g,tz);if(o!=null){let t=g-o;const o2=icsTzOff(t,tz);if(o2!=null&&o2!==o)t=g-o2;return {t}}}
  return {t:new Date(y,mo-1,d,h,mi,s).getTime()}}
function icsDur(v){const m=String(v||"").match(/^([+-])?P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/);if(!m)return null;return ((+m[2]||0)*7*864e5+(+m[3]||0)*864e5+(+m[4]||0)*36e5+(+m[5]||0)*6e4+(+m[6]||0)*1e3)*(m[1]==="-"?-1:1)}
function icsText(v){return String(v||"").replace(/\\n/gi,"\n").replace(/\\([,;\\])/g,"$1").trim()}
function icsParse(txt,from,to){
  const lines=String(txt||"").replace(/\r?\n[ \t]/g,"").split(/\r?\n/);const raw=[];let cur=null,depth=0;
  for(const ln of lines){
    if(ln==="BEGIN:VEVENT"){cur={ex:[]};depth=0;continue}
    if(!cur)continue;
    if(/^BEGIN:/.test(ln)){depth++;continue} if(/^END:/.test(ln)&&ln!=="END:VEVENT"){depth--;continue}
    if(ln==="END:VEVENT"){raw.push(cur);cur=null;continue}
    if(depth>0)continue;
    const i=ln.search(/:(?=(?:[^"]*"[^"]*")*[^"]*$)/);if(i<0)continue;
    const left=ln.slice(0,i),val=ln.slice(i+1);const parts=left.split(";");const name=parts[0].toUpperCase();const P={};parts.slice(1).forEach(p=>{const k=p.indexOf("=");if(k>0)P[p.slice(0,k).toUpperCase()]=p.slice(k+1)});
    if(name==="DTSTART")cur.ds=icsTime(val,P);else if(name==="DTEND")cur.de=icsTime(val,P);else if(name==="DURATION")cur.dur=icsDur(val);
    else if(name==="SUMMARY")cur.t=icsText(val);else if(name==="LOCATION")cur.loc=icsText(val);else if(name==="RRULE")cur.rr=val;
    else if(name==="EXDATE")val.split(",").forEach(v=>{const x=icsTime(v,P);if(x)cur.ex.push(x.t)});
    else if(name==="RECURRENCE-ID")cur.rid=icsTime(val,P);else if(name==="STATUS")cur.st=val.toUpperCase();else if(name==="UID")cur.uid=val;else if(name==="TRANSP")cur.tr=val.toUpperCase();else if(name==="DESCRIPTION")cur.desc=icsText(val);else if(name==="URL")cur.url=val}
  const out=[];const over={};
  raw.filter(e=>e.rid&&e.uid).forEach(e=>{over[e.uid+"|"+e.rid.t]=e});
  const len=e=>{if(!e.ds)return 0;if(e.de)return Math.max(0,e.de.t-e.ds.t);if(e.dur!=null)return e.dur;return e.ds.allDay?864e5:36e5};
  const push=(e,s,L)=>{if(e.st==="CANCELLED"||e.tr==="TRANSPARENT")return;const en=s+L;if(en<=from||s>=to)return;out.push({s,e:en,t:e.t||"Event",loc:e.loc||"",allDay:!!(e.ds&&e.ds.allDay),desc:cleanDesc(e.desc),url:e.url||firstUrl(e.desc)})};
  const DOW={SU:0,MO:1,TU:2,WE:3,TH:4,FR:5,SA:6};
  raw.forEach(e=>{
    if(!e.ds||e.rid)return;const L=len(e);
    if(!e.rr){push(e,e.ds.t,L);return}
    const R={};e.rr.split(";").forEach(p=>{const k=p.indexOf("=");if(k>0)R[p.slice(0,k).toUpperCase()]=p.slice(k+1)});
    const F=R.FREQ,I=Math.max(1,+R.INTERVAL||1),C=R.COUNT?+R.COUNT:null,U=R.UNTIL?(icsTime(R.UNTIL,{})||{}).t:null;
    const base=new Date(e.ds.t);const ex=new Set(e.ex);let n=0,guard=0;
    const emit=d=>{const t=d.getTime();if(t<e.ds.t)return true;if(U!=null&&t>U)return false;if(C!=null&&n>=C)return false;n++;if(t>to)return false;
      if(!ex.has(t)){const o=e.uid&&over[e.uid+"|"+t];if(o){if(o.ds)push(o,o.ds.t,len(o))}else push(e,t,L)}return true};
    const at=(y,m,d)=>new Date(y,m,d,base.getHours(),base.getMinutes(),base.getSeconds());
    if(F==="DAILY"){let k=0;if(C==null){const skip=Math.floor((from-L-e.ds.t)/(864e5*I));if(skip>0)k=skip}
      while(guard++<3000){const d=at(base.getFullYear(),base.getMonth(),base.getDate()+k*I);if(!emit(d))break;k++}}
    else if(F==="WEEKLY"){const days=(R.BYDAY?R.BYDAY.split(",").map(x=>DOW[x.slice(-2)]).filter(x=>x!=null):[base.getDay()]).sort((a,b)=>a-b);
      const wk0=at(base.getFullYear(),base.getMonth(),base.getDate()-base.getDay());let w=0;if(C==null){const skip=Math.floor((from-L-wk0.getTime())/(7*864e5*I))-1;if(skip>0)w=skip}
      outer:while(guard++<3000){for(const dw of days){const d=at(wk0.getFullYear(),wk0.getMonth(),wk0.getDate()+w*7*I+dw);if(!emit(d))break outer}w++}}
    else if(F==="MONTHLY"){let k=0;const bd=R.BYDAY&&R.BYDAY.match(/^(-?\d)?(SU|MO|TU|WE|TH|FR|SA)$/);const md=R.BYMONTHDAY?+R.BYMONTHDAY:null;
      while(guard++<600){const y=base.getFullYear(),m=base.getMonth()+k*I;let d;
        if(bd&&bd[1]){const nth=+bd[1],want=DOW[bd[2]];if(nth>0){const f=new Date(y,m,1);const off=(want-f.getDay()+7)%7;d=at(y,m,1+off+(nth-1)*7)}else{const l=new Date(y,m+1,0);const off=(l.getDay()-want+7)%7;d=at(y,m+1,0-off+(nth+1)*7)}if(d.getMonth()!==((m%12)+12)%12){k++;continue}}
        else{const dd=md||base.getDate();d=at(y,m,dd);if(d.getDate()!==dd){k++;continue}}
        if(!emit(d))break;k++}}
    else if(F==="YEARLY"){let k=0;while(guard++<60){const d=at(base.getFullYear()+k*I,base.getMonth(),base.getDate());if(d.getDate()===base.getDate()&&!emit(d))break;k++}}
    else push(e,e.ds.t,L)});
  return out.sort((a,b)=>a.s-b.s)}

function writeIfChanged(path, obj){
  let old = null; try { old = JSON.parse(fs.readFileSync(path, "utf8")); } catch {}
  const strip = o => { if(!o) return ""; const c = {...o}; delete c.updated; return JSON.stringify(c); };
  if (old && strip(old) === strip(obj)) { console.log(path, "unchanged"); return; }
  fs.writeFileSync(path, JSON.stringify(obj, null, 1) + "\n"); console.log(path, "written");
}
const UA = {"User-Agent": "ogdenvalley.github.io (Ogden Valley Info & Events community site)", "Accept": "application/json, text/calendar, */*"};

async function fetchCal(id){
  const r = await fetch("https://calendar.google.com/calendar/ical/" + encodeURIComponent(id) + "/public/basic.ics", {headers: UA});
  if (!r.ok) throw new Error("HTTP " + r.status);
  const txt = await r.text();
  if (!txt.includes("BEGIN:VCALENDAR")) throw new Error("not a calendar (is it set to public?)");
  return txt;
}
async function calendars(){
  const ids = JSON.parse(fs.readFileSync("calendars.json", "utf8"));
  let oldFile = {}; try { oldFile = JSON.parse(fs.readFileSync("events.json", "utf8")); } catch {}
  const old = oldFile.calendars || {}, oldExtra = oldFile.sources || {};
  const now = Date.now(), from = now - 864e5, to = now + 180 * 864e5;
  const out = {updated: new Date().toISOString(), calendars: {}, sources: {}};
  const entries = Object.entries(ids).filter(([k]) => !k.startsWith("_"));
  // main calendars first
  for (const [key, cal] of entries.filter(([, c]) => !c.into)) {
    const id = (cal.id || "").trim();
    if (!id) { out.calendars[key] = {name: cal.name, events: []}; continue; }
    try { out.calendars[key] = {name: cal.name, events: icsParse(await fetchCal(id), from, to)}; console.log(key, out.calendars[key].events.length, "events"); }
    catch (e) { console.log(key, "failed:", e.message, "- keeping the last good copy"); out.calendars[key] = old[key] || {name: cal.name, events: []}; }
  }
  // extra sources get added into a main calendar
  for (const [key, cal] of entries.filter(([, c]) => c.into)) {
    const id = (cal.id || "").trim(); if (!id) continue;
    let evs;
    try { evs = icsParse(await fetchCal(id), from, to).map(e => ({...e, src: cal.name})); console.log(key, evs.length, "events into", cal.into); }
    catch (e) { console.log(key, "failed:", e.message, "- keeping the last good copy"); evs = oldExtra[key] || []; }
    out.sources[key] = evs;
    if (!out.calendars[cal.into]) out.calendars[cal.into] = {name: cal.into, events: []};
    out.calendars[cal.into].events = out.calendars[cal.into].events.concat(evs).sort((a, b) => a.s - b.s);
  }
  // keep the file small: sources are only stored for fallback, not shown twice
  writeIfChanged("events.json", out);
}

async function sky(){
  let old = {}; try { old = JSON.parse(fs.readFileSync("sky.json", "utf8")); } catch {}
  const out = {updated: new Date().toISOString(), kpMaxNext24: old.kpMaxNext24 ?? null, cloudsTonight: old.cloudsTonight ?? null};
  try {
    const r = await fetch("https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json", {headers: UA});
    const j = await r.json();
    let rows = j;
    if (Array.isArray(j) && Array.isArray(j[0])) { const h = j[0]; rows = j.slice(1).map(a => Object.fromEntries(h.map((k, i) => [k, a[i]]))); }
    const now = Date.now(), end = now + 864e5;
    const kps = rows.map(x => ({t: Date.parse(String(x.time_tag).replace(" ", "T") + (String(x.time_tag).endsWith("Z") ? "" : "Z")), kp: parseFloat(x.kp)}))
      .filter(x => x.t >= now - 3 * 36e5 && x.t <= end && !isNaN(x.kp));
    out.kpMaxNext24 = kps.length ? Math.max(...kps.map(x => x.kp)) : null;
    console.log("kp max next 24h", out.kpMaxNext24);
  } catch (e) { console.log("kp failed:", e.message); }
  try {
    const p = await (await fetch("https://api.weather.gov/points/41.3013,-111.8219", {headers: UA})).json();
    const g = await (await fetch(p.properties.forecastGridData, {headers: UA})).json();
    const vals = g.properties.skyCover.values;
    // tonight = 9 PM to 3 AM Mountain time
    const parts = new Intl.DateTimeFormat("en-US", {timeZone: "America/Denver", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23"}).formatToParts(new Date());
    const P = Object.fromEntries(parts.map(x => [x.type, x.value]));
    const offset = icsTzOff(Date.now(), "America/Denver");
    let start = Date.UTC(+P.year, +P.month - 1, +P.day, 21) - offset;
    if (+P.hour < 4) start -= 864e5;
    const stop = start + 6 * 36e5, hrs = [];
    for (const v of vals) {
      const [ts, dur] = v.validTime.split("/"); const s = Date.parse(ts); const h = Math.max(1, Math.round((icsDur(dur) || 36e5) / 36e5));
      for (let i = 0; i < h; i++) { const t = s + i * 36e5; if (t >= start && t < stop) hrs.push(v.value); }
    }
    out.cloudsTonight = hrs.length ? Math.round(hrs.reduce((a, b) => a + b, 0) / hrs.length) : null;
    console.log("clouds tonight", out.cloudsTonight);
  } catch (e) { console.log("clouds failed:", e.message); }
  writeIfChanged("sky.json", out);
}


/* ---------------- SAFETY: weather alerts, fires, city alerts ---------------- */
async function getJSON(u){ const r = await fetch(u, {headers: UA}); if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); }
async function getText(u){ const r = await fetch(u, {headers: UA}); if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); }
const strip = s => String(s || "").replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
function rssItems(xml){ return [...xml.matchAll(/<item[\s>][\s\S]*?<\/item>/g)].map(m => { const x = m[0]; const g = t => { const r = x.match(new RegExp("<" + t + "[^>]*>([\\s\\S]*?)</" + t + ">")); return r ? strip(r[1]) : ""; };
  return {title: g("title"), link: g("link"), date: g("pubDate") ? Date.parse(g("pubDate")) : null, text: g("description").slice(0, 400)}; }); }

async function safety(){
  let old = {}; try { old = JSON.parse(fs.readFileSync("safety.json", "utf8")); } catch {}
  const out = {updated: new Date().toISOString(), weather: old.weather || [], fires: old.fires || [], city: old.city || [], status: {}};
  // National Weather Service alerts that include Weber County (FIPS 049057)
  try {
    const j = await getJSON("https://api.weather.gov/alerts/active?area=UT");
    out.weather = (j.features || []).map(f => f.properties).filter(p => (p.geocode && (p.geocode.SAME || []).includes("049057")) || /Weber/i.test(p.areaDesc || ""))
      .map(p => ({event: p.event, severity: p.severity, headline: p.headline, area: p.areaDesc, starts: p.onset || p.effective, ends: p.ends || p.expires, text: (p.description || "").slice(0, 900), instruction: (p.instruction || "").slice(0, 500), link: "https://forecast.weather.gov/MapClick.php?lat=41.3013&lon=-111.8219", source: "National Weather Service"}));
    out.status.weather = "ok"; console.log("NWS alerts", out.weather.length);
  } catch (e) { out.status.weather = "failed"; console.log("NWS failed:", e.message); }
  // Wildfires in and around Weber County (NIFC / WFIGS current incidents)
  try {
    const where = "POOState='US-UT' AND POOCounty IN ('Weber','Davis','Morgan','Box Elder','Cache','Rich','Summit')";
    const u = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/WFIGS_Incident_Locations_Current/FeatureServer/0/query?where=" + encodeURIComponent(where) + "&outFields=IncidentName,POOCounty,IncidentSize,PercentContained,FireDiscoveryDateTime,ModifiedOnDateTime_dt,IncidentTypeCategory&f=json";
    const j = await getJSON(u);
    if (j.error) throw new Error(j.error.message || "query error");
    out.fires = (j.features || []).map(f => f.attributes).filter(a => a.IncidentTypeCategory !== "RX")
      .map(a => ({name: (a.IncidentName || "Fire").trim() + " Fire", county: a.POOCounty, acres: a.IncidentSize, contained: a.PercentContained, discovered: a.FireDiscoveryDateTime, updated: a.ModifiedOnDateTime_dt, source: "National Interagency Fire Center (WFIGS)", link: "https://utahfireinfo.gov/"}))
      .sort((a, b) => (a.county === "Weber" ? -1 : 0) - (b.county === "Weber" ? -1 : 0) || (b.acres || 0) - (a.acres || 0));
    out.status.fires = "ok"; console.log("fires", out.fires.length);
  } catch (e) { out.status.fires = "failed"; console.log("fires failed:", e.message); }
  // City alert feeds (water main breaks, road work)
  const feeds = [
    {name: "Ogden City Alerts", url: "https://www.ogdencity.gov/RSSFeed.aspx?ModID=63&CID=All-0", link: "https://www.ogdencity.gov/AlertCenter.aspx"}
  ];
  const city = [];
  for (const f of feeds) {
    try { const items = rssItems(await getText(f.url)).filter(i => i.title).slice(0, 15).map(i => ({...i, source: f.name, sourceLink: f.link})); city.push(...items); out.status[f.name] = "ok"; console.log(f.name, items.length); }
    catch (e) { out.status[f.name] = "failed"; console.log(f.name, "failed:", e.message); city.push(...(old.city || []).filter(i => i.source === f.name)); }
  }
  out.city = city.sort((a, b) => (b.date || 0) - (a.date || 0));
  writeIfChanged("safety.json", out);
}

/* ---------------- LOCAL: public meetings, snow, Pineview ---------------- */
async function local(){
  let old = {}; try { old = JSON.parse(fs.readFileSync("local.json", "utf8")); } catch {}
  const out = {updated: new Date().toISOString(), meetings: [], snow: old.snow || [], pineview: old.pineview || null, status: {}};
  // Utah Public Notice Website — public bodies (add more ids here)
  const bodies = [
    {id: 9431, name: "Ogden Valley City Council"},
    {id: 313, name: "Huntsville Town Council"}
  ];
  for (const b of bodies) {
    try {
      const html = await getText("https://www.utah.gov/pmn/sitemap/publicbody/" + b.id + ".html");
      const rows = [...html.matchAll(/<a[^>]+href="([^"]*\/pmn\/sitemap\/notice\/\d+\.html)"[^>]*>([\s\S]*?)<\/a>([\s\S]{0,400})/g)];
      let n = 0;
      for (const r of rows) {
        const title = strip(r[2]); const near = strip(r[3]) + " " + title;
        const d = near.match(/(\d{4})\/(\d{2})\/(\d{2})\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i) || near.match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{1,2}):(\d{2})\s*(AM|PM)?/i);
        let t = null;
        if (d) { let h = +d[4] % 12; if ((d[6] || "").toUpperCase() === "PM") h += 12; const guess = Date.UTC(+d[1], +d[2] - 1, +d[3], h, +d[5]); t = guess - icsTzOff(guess, "America/Denver"); }
        if (!title) continue;
        const link = r[1].startsWith("http") ? r[1] : "https://www.utah.gov" + r[1];
        out.meetings.push({body: b.name, title, start: t, link, source: "Utah Public Notice Website"}); n++;
      }
      out.status[b.name] = n ? "ok" : "no notices found"; console.log(b.name, n, "notices");
    } catch (e) { out.status[b.name] = "failed"; console.log(b.name, "failed:", e.message); out.meetings.push(...(old.meetings || []).filter(m => m.body === b.name)); }
  }
  const now = Date.now();
  out.meetings = out.meetings.filter(m => !m.start || m.start > now - 864e5).sort((a, b) => (a.start || 9e15) - (b.start || 9e15)).slice(0, 20);
  // SNOTEL snow depth (NRCS)
  try {
    const end = new Date().toISOString().slice(0, 10), begin = new Date(Date.now() - 3 * 864e5).toISOString().slice(0, 10);
    const sites = [{t: "332:UT:SNTL", name: "Ben Lomond Peak", elev: 7690}, {t: "333:UT:SNTL", name: "Ben Lomond Trail", elev: 5970}, {t: "634:UT:SNTL", name: "Monte Cristo", elev: 8930}];
    const j = await getJSON("https://wcc.sc.egov.usda.gov/awdbRestApi/services/v1/data?stationTriplets=" + sites.map(s => s.t).join(",") + "&elements=WTEQ,SNWD&duration=DAILY&beginDate=" + begin + "&endDate=" + end);
    out.snow = sites.map(s => { const st = (j || []).find(x => x.stationTriplet === s.t) || {}; const get = el => { const d = (st.data || []).find(x => x.stationElement && x.stationElement.elementCode === el); const v = d && (d.values || []).filter(v => v.value != null).pop(); return v ? {value: v.value, date: v.date} : null; };
      return {name: s.name, elev: s.elev, depth: get("SNWD"), water: get("WTEQ"), link: "https://wcc.sc.egov.usda.gov/nwcc/site?sitenum=" + s.t.split(":")[0], source: "USDA NRCS SNOTEL"}; });
    out.status.snow = "ok"; console.log("snow", JSON.stringify(out.snow.map(s => s.depth)));
  } catch (e) { out.status.snow = "failed"; console.log("snow failed:", e.message); }
  // Pineview Reservoir storage (Bureau of Reclamation RISE, item 652)
  try {
    const end = new Date().toISOString().slice(0, 10), begin = new Date(Date.now() - 10 * 864e5).toISOString().slice(0, 10);
    const txt = await getText("https://data.usbr.gov/rise/api/result?itemId=652&dateTime%5Bbefore%5D=" + end + "&dateTime%5Bafter%5D=" + begin + "&order%5BdateTime%5D=DESC&itemsPerPage=5");
    let val = null, when = null;
    try { const j = JSON.parse(txt); const rows = j["hydra:member"] || j.data || j; const r = Array.isArray(rows) ? rows[0] : null; if (r) { const a = r.attributes || r; val = +a.result; when = a.dateTime; } } catch {}
    if (val && !isNaN(val)) { out.pineview = {acreFeet: val, percent: Math.round(val / 110150 * 100), date: when, source: "U.S. Bureau of Reclamation", link: "https://data.usbr.gov/location/437"}; out.status.pineview = "ok"; console.log("pineview", val); }
    else throw new Error("no value in response");
  } catch (e) { out.status.pineview = "failed"; console.log("pineview failed:", e.message); }
  writeIfChanged("local.json", out);
}

/* ---------------- REVIEWS (Google Form → published sheet tab, CSV) ---------------- */
function parseCSV(t){ const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < t.length; i++) { const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true; else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && t[i + 1] === "\n") i++; row.push(cur); rows.push(row); row = []; cur = ""; }
    else cur += c; }
  if (cur || row.length) { row.push(cur); rows.push(row); } return rows; }
const slugify = s => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const BAD = /\b(fuck|shit|bitch|bastard|asshole|dick|cunt|whore|slut|damn you|retard|fag)\w*/i;
function heldReason(text, name){
  const all = (text || "") + " " + (name || "");
  if (BAD.test(all)) return "language";
  if (/https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|biz|info|io|co)\b/i.test(all)) return "link";
  if (/\b\d{3}[\s.\-)]*\d{3}[\s.\-]*\d{4}\b/.test(all)) return "phone";
  if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(all)) return "email";
  if ((text || "").trim().length < 3) return "empty";
  return "";
}
async function reviews(){
  let cfg = {}; try { cfg = JSON.parse(fs.readFileSync("calendars.json", "utf8")); } catch {}
  const url = (cfg._reviewsCsv || "").trim();
  let old = {}; try { old = JSON.parse(fs.readFileSync("reviews.json", "utf8")); } catch {}
  if (!url) { console.log("reviews: no sheet link yet"); if (!old.byBusiness) writeIfChanged("reviews.json", {updated: new Date().toISOString(), byBusiness: {}, held: 0}); return; }
  try {
    const rows = parseCSV(await getText(url)).filter(r => r.some(c => c.trim()));
    const head = (rows.shift() || []).map(h => h.toLowerCase());
    const col = re => head.findIndex(h => re.test(h));
    const iT = col(/timestamp|date/), iB = col(/business/), iS = col(/star|rating/), iR = col(/review|comment/), iN = col(/name/), iH = col(/^hide/);
    const by = {}; let held = 0;
    for (const r of rows) {
      if (iH >= 0 && /hide/i.test(r[iH] || "")) continue;
      const biz = (r[iB] || "").trim(), text = (r[iR] || "").trim(), name = (r[iN] || "").trim().slice(0, 40);
      const stars = Math.max(1, Math.min(5, parseInt(r[iS], 10) || 0));
      if (!biz || !stars) continue;
      if (heldReason(text, name)) { held++; continue; }
      const k = slugify(biz); by[k] = by[k] || {name: biz, items: []};
      by[k].items.push({name: name || "A Valley visitor", stars, text: text.slice(0, 1200), date: iT >= 0 ? Date.parse(r[iT]) || null : null});
    }
    for (const k in by) { const it = by[k].items.sort((a, b) => (b.date || 0) - (a.date || 0)); by[k].count = it.length; by[k].avg = Math.round(it.reduce((a, b) => a + b.stars, 0) / it.length * 10) / 10; }
    console.log("reviews", Object.keys(by).length, "businesses,", held, "held back");
    writeIfChanged("reviews.json", {updated: new Date().toISOString(), byBusiness: by, held});
  } catch (e) { console.log("reviews failed:", e.message, "- keeping the last good copy"); }
}

/* ---------------- MAP PINS: look up event locations (OpenStreetMap Nominatim, cached) ---------------- */
async function geocode(){
  let cache = {}; try { cache = JSON.parse(fs.readFileSync("geocache.json", "utf8")); } catch {}
  let ev = {}; try { ev = JSON.parse(fs.readFileSync("events.json", "utf8")); } catch {}
  const locs = new Set();
  for (const c of Object.values(ev.calendars || {})) for (const e of c.events || []) if (e.loc && e.loc.trim().length > 3) locs.add(e.loc.trim());
  const todo = [...locs].filter(l => !(l in cache)).slice(0, 25);
  for (const l of todo) {
    try {
      const q = /utah|\bUT\b/i.test(l) ? l : l + ", Weber County, Utah";
      const j = await getJSON("https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&q=" + encodeURIComponent(q));
      cache[l] = j && j[0] ? {lat: +(+j[0].lat).toFixed(5), lng: +(+j[0].lon).toFixed(5)} : null;
      console.log("geocode", l, "->", cache[l] ? "found" : "not found");
    } catch (e) { console.log("geocode failed for", l, e.message); }
    await new Promise(r => setTimeout(r, 1100)); // be polite: one lookup per second
  }
  writeIfChanged("geocache.json", cache);
}

/* ---------------- COMMUNITY REPORTS (Google Form → published sheet tab, CSV) ----------------
   Text posts automatically after the filter; photos only show once "Photo OK" is marked yes.
   Reports drop off after 48 hours. */
async function reports(){
  let cfg = {}; try { cfg = JSON.parse(fs.readFileSync("calendars.json", "utf8")); } catch {}
  const url = (cfg._reportsCsv || "").trim();
  if (!url) { let old = null; try { old = JSON.parse(fs.readFileSync("reports.json", "utf8")); } catch {} if (!old) writeIfChanged("reports.json", {updated: new Date().toISOString(), items: [], held: 0}); console.log("reports: no sheet link yet"); return; }
  try {
    const rows = parseCSV(await getText(url)).filter(r => r.some(c => c.trim()));
    const head = (rows.shift() || []).map(h => h.toLowerCase());
    const col = re => head.findIndex(h => re.test(h));
    const iT = col(/timestamp/), iK = col(/what kind|type|kind/), iW = col(/where|location|cross/), iD = col(/what did|what you saw|details|describe/), iP = col(/photo(?! ok)/), iOK = col(/photo ok/), iH = col(/^hide/), iN = col(/name/);
    const now = Date.now(); let held = 0; const items = [];
    for (const r of rows) {
      if (iH >= 0 && /hide/i.test(r[iH] || "")) continue;
      const t = Date.parse(r[iT]); if (!t || now - t > 48 * 36e5) continue;
      const where = (r[iW] || "").trim(), text = (r[iD] || "").trim();
      if (heldReason(text + " " + where, r[iN] || "")) { held++; continue; }
      let photo = null;
      if (iP >= 0 && iOK >= 0 && /^y/i.test((r[iOK] || "").trim())) { const m = (r[iP] || "").match(/[-\w]{25,}/); if (m) photo = "https://drive.google.com/thumbnail?id=" + m[0] + "&sz=w1200"; }
      items.push({time: t, kind: (r[iK] || "Report").trim().slice(0, 40), where: where.slice(0, 120), text: text.slice(0, 600), by: (r[iN] || "").trim().slice(0, 30), photo});
    }
    items.sort((a, b) => b.time - a.time);
    console.log("reports", items.length, "showing,", held, "held back");
    writeIfChanged("reports.json", {updated: new Date().toISOString(), items, held});
  } catch (e) { console.log("reports failed:", e.message, "- keeping the last good copy"); }
}

await calendars();
await sky();
await safety();
await local();
await reviews();
await reports();
await geocode();
