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

await calendars();
await sky();
