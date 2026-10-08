/* Ogden Valley Info & Events — shared page code */
(function(){
const C = window.OVE || {}, P = window.OVE_PLACES || {restaurants:[],businesses:[],beauty:[],farm:[],foodtrucks:[],services:[],artists:[]};
const TZ = "America/Denver";
const $ = (s, r) => (r || document).querySelector(s);
const el = (tag, attrs, kids) => { const n = document.createElement(tag);
  for (const k in attrs || {}) { const v = attrs[k]; if (v == null || v === false) continue;
    if (k === "text") n.textContent = v; else if (k === "html") n.innerHTML = v; else n.setAttribute(k, v); }
  (kids || []).forEach(c => c && n.append(c)); return n; };

/* ---------- month theme + logo ---------- */
const now = new Date();
const mo = +new Intl.DateTimeFormat("en-US", {timeZone: TZ, month: "numeric"}).format(now);
const yr = +new Intl.DateTimeFormat("en-US", {timeZone: TZ, year: "numeric"}).format(now);
const season = mo === 10 ? "halloween" : [12,1,2].includes(mo) ? "winter" : [3,4,5].includes(mo) ? "spring" : [6,7,8].includes(mo) ? "summer" : "fall";
document.documentElement.dataset.season = season;
const logo = season === "halloween" ? "10-years-halloween" : (yr <= 2026 ? "10-years" : season);
document.querySelectorAll("img[data-logo]").forEach(i => { i.src = "logo-" + logo + "-" + (i.dataset.logo || "512") + ".png"; });
const fav = document.querySelector("link[rel=icon]"); if (fav) fav.href = "logo-" + logo + "-32.png";
const apple = document.querySelector("link[rel=apple-touch-icon]"); if (apple) apple.href = "logo-" + logo + "-180.png";
const years = yr - (C.startYear || 2016);
document.querySelectorAll("[data-years]").forEach(n => n.textContent = years);

/* ---------- menu ---------- */
const mb = $(".menu-btn"), nav = $("nav.main");
if (mb && nav) mb.addEventListener("click", () => { const o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", String(o)); });

/* ---------- links from settings ---------- */
function setLink(sel, url){ document.querySelectorAll(sel).forEach(a => { if (url) { a.href = url; a.removeAttribute("aria-disabled"); a.hidden = false; } else if (a.dataset.hideEmpty !== undefined) { a.hidden = true; } else { a.setAttribute("aria-disabled", "true"); a.removeAttribute("href"); } }); }
setLink("[data-newsletter]", C.newsletterUrl);
setLink("[data-facebook]", C.facebook);
setLink("[data-instagram]", C.instagram);
Object.keys(C.forms || {}).forEach(k => setLink("[data-form='" + k + "']", C.forms[k]));
document.querySelectorAll("[data-email]").forEach(n => { if (C.email) { n.textContent = C.email; n.closest("[data-email-wrap]") && (n.closest("[data-email-wrap]").hidden = false); } });

/* ---------- dates ---------- */
const fmt = (o) => new Intl.DateTimeFormat("en-US", Object.assign({timeZone: TZ}, o));
const dayKey = t => fmt({year:"numeric", month:"2-digit", day:"2-digit"}).format(new Date(t));
const dayName = t => fmt({weekday:"long", month:"long", day:"numeric"}).format(new Date(t));
const timeStr = t => fmt({hour:"numeric", minute:"2-digit"}).format(new Date(t));
const todayKey = dayKey(Date.now());

/* ---------- calendars ---------- */
const CAL_COLOR = {ov: "var(--ov)", weber: "var(--weber)"};
function calLinks(id){ if (!id) return null; const enc = encodeURIComponent(id);
  return { google: "https://calendar.google.com/calendar/render?cid=" + enc,
           ics: "webcal://calendar.google.com/calendar/ical/" + enc + "/public/basic.ics",
           https: "https://calendar.google.com/calendar/ical/" + enc + "/public/basic.ics",
           view: "https://calendar.google.com/calendar/embed?src=" + enc + "&ctz=" + encodeURIComponent(TZ) }; }
async function loadEvents(){
  try { const r = await fetch("events.json", {cache: "no-store"}); if (!r.ok) throw 0; return await r.json(); }
  catch (e) { return null; }
}
function allEvents(data, which){
  const out = [];
  ["ov","weber"].forEach(k => { if (which && !which.includes(k)) return;
    const cal = data && data.calendars && data.calendars[k]; if (!cal) return;
    (cal.events || []).forEach(e => out.push(Object.assign({cal: k}, e))); });
  return out.filter(e => e.e > Date.now()).sort((a,b) => a.s - b.s);
}
function eventCard(e){
  const name = (C.calendars && C.calendars[e.cal] && C.calendars[e.cal].name) || e.cal;
  const when = e.allDay ? "All day" : timeStr(e.s) + (e.e - e.s < 864e5 ? "–" + timeStr(e.e) : "");
  const what = e.url ? el("a", {href: e.url, target: "_blank", rel: "noopener", text: e.t}) : document.createTextNode(e.t);
  return el("article", {class: "event", style: "--cal:" + CAL_COLOR[e.cal]}, [
    el("div", {class: "when", text: when}),
    el("div", {}, [ el("div", {class: "tag", text: name + (e.src ? " · from " + e.src : "")}), el("div", {class: "what"}, [what]),
      e.loc ? el("div", {class: "where", text: e.loc}) : null,
      e.desc ? el("div", {class: "desc", text: e.desc.length > 240 ? e.desc.slice(0, 237) + "…" : e.desc}) : null ]) ]);
}
function renderEvents(box, list, opts){
  opts = opts || {}; box.replaceChildren();
  if (!list.length) { box.append(el("div", {class: "empty"}, [el("p", {text: opts.emptyText || "No events posted yet for these dates."}),
    el("a", {class: "btn blue", "data-form": "event", href: (C.forms && C.forms.event) || "submit.html", text: "Send us an event"})])); return; }
  let cur = null, grp = null;
  list.slice(0, opts.limit || 500).forEach(e => { const k = dayKey(e.s < Date.now() ? Date.now() : e.s);
    if (k !== cur) { cur = k; grp = el("div", {class: "day-group"}, [el("h3", {text: k === todayKey ? "Today · " + dayName(e.s < Date.now() ? Date.now() : e.s) : dayName(e.s)})]); box.append(grp); }
    grp.append(eventCard(e)); });
}

/* ---------- moon ---------- */
function moon(date){
  const syn = 29.530588853, ref = Date.UTC(2000, 0, 6, 18, 14) ; // known new moon
  const age = (((date - ref) / 864e5) % syn + syn) % syn;
  const illum = Math.round((1 - Math.cos(2 * Math.PI * age / syn)) / 2 * 100);
  const names = ["New moon","Waxing crescent","First quarter","Waxing gibbous","Full moon","Waning gibbous","Last quarter","Waning crescent"];
  const idx = Math.floor(((age / syn) * 8) + 0.5) % 8;
  return {age, illum, name: names[idx], dark: illum < 35};
}
async function loadSky(){ try { const r = await fetch("sky.json", {cache: "no-store"}); if (!r.ok) throw 0; return await r.json(); } catch (e) { return null; } }
function auroraText(kp){
  if (kp == null) return {cls: "quiet", text: "Northern lights forecast not available right now."};
  if (kp >= 7) return {cls: "good", text: "Northern lights alert: a strong storm is forecast (Kp " + kp.toFixed(1) + "). Look low on the northern horizon after dark, away from town lights. Phone cameras pick it up best."};
  if (kp >= 6) return {cls: "warn", text: "Northern lights possible (Kp " + kp.toFixed(1) + "). Usually only a phone camera catches it this far south. Try a dark spot facing north."};
  return {cls: "quiet", text: "No northern lights expected in the Valley (forecast Kp " + kp.toFixed(1) + "; we need about 7)."};
}

/* ---------- listings ---------- */
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function reviewLink(name){ if (!C.reviewForm) return null; if (!C.reviewEntry) return C.reviewForm; return C.reviewForm + (C.reviewForm.includes("?") ? "&" : "?") + "usp=pp_url&" + C.reviewEntry + "=" + encodeURIComponent(name); }
function starText(n){ const f = Math.round(n); return "★★★★★".slice(0, f) + "☆☆☆☆☆".slice(0, 5 - f); }
function reviewBlock(p, R){
  const r = R && R.byBusiness && R.byBusiness[slug(p.name)];
  const wrap = el("div", {class: "reviews"});
  if (r && r.count) {
    wrap.append(el("div", {class: "stars", "aria-label": r.avg + " out of 5 stars"}, [el("span", {class: "st", text: starText(r.avg)}), document.createTextNode(" " + r.avg + " · " + r.count + " review" + (r.count === 1 ? "" : "s"))]));
    const list = el("details", {}, [el("summary", {text: "Read reviews"})]);
    r.items.slice(0, 20).forEach(x => list.append(el("blockquote", {class: "rev"}, [el("div", {class: "st", text: starText(x.stars)}), el("p", {text: x.text}), el("cite", {text: "— " + x.name + (x.date ? ", " + fmt({month: "short", year: "numeric"}).format(new Date(x.date)) : "")})])));
    wrap.append(list);
  }
  const link = reviewLink(p.name);
  if (link) wrap.append(el("a", {class: "btn ghost small-btn", href: link, target: "_blank", rel: "noopener", text: r && r.count ? "Leave a review" : "Be the first to review"}));
  return wrap.childNodes.length ? wrap : null;
}
/* Listing photos: p.photos is a list of image files uploaded to the main folder of the repo (a photos/ folder also works). Shows 3, the rest open below. */
function photoStrip(p){
  const ph = (p.photos || []).filter(Boolean); if (!ph.length) return null;
  const img = (f, i) => { const im = el("img", {src: f, alt: p.name + " photo " + (i + 1), loading: "lazy", width: "400", height: "300"}); im.addEventListener("error", () => { if (!im.dataset.tried && !f.includes("/")) { im.dataset.tried = 1; im.src = "photos/" + f; } }, {once: false}); return im; };
  const wrap = el("div", {class: "photos"}, ph.slice(0, 3).map(img));
  if (ph.length > 3) wrap.append(el("details", {class: "more-photos"}, [el("summary", {text: "See " + (ph.length - 3) + " more photo" + (ph.length - 3 === 1 ? "" : "s")}), el("div", {class: "photos"}, ph.slice(3).map((f, i) => img(f, i + 3)))]));
  return wrap;
}
function niceDay(d){ const [y,m,dd] = (d || "").split("-").map(Number); if (!y) return ""; return new Date(y, m - 1, dd).toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"}); }
function listMeta(p){
  const kids = [];
  if (p.news && p.news.text) kids.push(el("div", {class: "news"}, [el("b", {text: "From the owner" + (p.news.date ? ", " + niceDay(p.news.date) : "") + ": "}), document.createTextNode(p.news.text)]));
  if (p.tags && p.tags.length) kids.push(el("div", {class: "tags"}, p.tags.map(t => el("span", {class: "tag", text: t}))));
  if (p.checked) kids.push(el("div", {class: "checked", text: "✓ Checked by a local " + niceDay(p.checked)}));
  return kids.length ? el("div", {class: "listmeta"}, kids) : null;
}
function listing(box, items, kind, R){
  box.replaceChildren();
  if (!items.length) { box.append(el("div", {class: "empty"}, [ el("p", {text: kind === "artists" ? "Artist listings are being gathered. Are you an Ogden Valley or Weber County artist? Ask to be listed." : "Listings are being gathered and checked. Own or love a place in the Valley? Send it in."}),
    el("a", {class: "btn blue", "data-form": kind === "artists" ? "artist" : "business", href: (C.forms && C.forms[kind === "artists" ? "artist" : "business"]) || "submit.html", text: kind === "artists" ? "Ask to be listed" : "Send a listing"}) ])); return; }
  const upd = C.forms && C.forms.update;
  const grid = el("div", {class: "grid"}); box.append(grid);
  items.slice().sort((a,b) => a.name.localeCompare(b.name)).forEach(p => grid.append(el("article", {class: "card", id: slug(p.name), "data-town": p.town || p.area || ""}, [
    photoStrip(p),
    p.sponsor ? el("span", {class: "sponsor-badge", text: "Sponsor"}) : null,
    el("h3", {text: p.name}),
    el("div", {class: "meta", text: [p.type || p.medium, p.town || p.area].filter(Boolean).join(" · ")}),
    p.blurb ? el("p", {text: p.blurb}) : null,
    p.serves ? el("div", {class: "meta", text: "Serves: " + p.serves}) : null,
    p.address ? el("div", {class: "meta", text: p.address}) : null,
    p.hours ? el("div", {class: "meta", text: "Hours: " + p.hours}) : null,
    p.phone ? el("div", {class: "meta"}, [el("a", {href: "tel:" + String(p.phone).replace(/[^0-9+]/g, ""), "data-track": "call: " + p.name, text: p.phone})]) : null,
    (p.link || (p.links && p.links.length)) ? el("div", {class: "links"}, [p.link ? el("a", {href: p.link, target: "_blank", rel: "noopener", text: "Website or page"}) : null].concat((p.links || []).map(x => el("a", {href: x.href, target: "_blank", rel: "noopener", text: x.label})))) : null,
    listMeta(p),
    p.note ? el("div", {class: "fine note", text: p.note}) : null,
    kind !== "artists" ? reviewBlock(p, R) : null,
    upd ? el("a", {class: "upd", href: upd, target: "_blank", rel: "noopener", text: kind === "artists" ? "Info changed? Let us know" : "Hours changed or closed? Let us know"}) : null ])));
  if (upd) box.append(el("p", {class: "upd-foot"}, [document.createTextNode(kind === "artists" ? "Know an artist we're missing, or something here that changed? " : "Hours different, a place closed, or one we're missing? "), el("a", {href: upd, target: "_blank", rel: "noopener", text: "Let us know"}), document.createTextNode(". Every update is checked before the listing changes.")]));
}


/* ---------- sponsors strip: any <div data-sponsors> shows the current sponsors from config.js ---------- */
(function(){ const boxes = document.querySelectorAll("[data-sponsors]"); if (!boxes.length) return;
  const today = new Date().toISOString().slice(0, 10);
  const list = (C.sponsors || []).filter(s => s && s.name && (!s.until || s.until >= today));
  boxes.forEach(box => { box.replaceChildren(); if (!list.length) return;
    box.append(el("div", {class: "sponsors"}, [
      el("p", {class: "eyebrow", text: "Thank you to our sponsors"}),
      el("div", {class: "sp-grid"}, list.map(s => el("article", {class: "sp"}, [
        s.logo ? el("img", {src: s.logo, alt: s.name + " logo", loading: "lazy", width: "240", height: "180"}) : null,
        el("div", {}, [
          el("span", {class: "sponsor-badge", text: s.tier || "Sponsor"}),
          el("h3", {text: s.name}),
          s.line ? el("p", {text: s.line}) : null,
          el("div", {class: "links"}, [s.link ? el("a", {href: s.link, target: "_blank", rel: "noopener", "data-track": "sponsor: " + s.name, text: "Visit their site"}) : null, s.story ? el("a", {href: s.story, text: "Read their story"}) : null, s.listing ? el("a", {href: s.listing, text: "See their listing"}) : null]),
          s.note ? el("div", {class: "fine note", text: s.note}) : null ]) ]))),
      el("p", {class: "fine"}, [document.createTextNode("Sponsors are always labeled and never change the order of listings or events. "), el("a", {href: "sponsor.html", text: "Sponsor a spot"})]) ])); }); })();

/* ---------- Facebook group circles: above the footer on every page, plus any <div data-groups="weather,roads"> ---------- */
(function(){ const G = (C.facebookGroups || []).filter(g => g && g.url); if (!G.length) return;
  const NS = "http://www.w3.org/2000/svg";
  const ICON = {
    qa: "M12 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5v.7M12 16h.01",
    weather: "M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.5 1.5A3.3 3.3 0 0 0 7 18zM8 21l1-2M12 21l1-2M16 21l1-2",
    updates: "M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M7 9h7M7 13h7M7 16h4",
    roads: "M8 3 4 21M16 3l4 18M12 4v3M12 10v3M12 16v4",
    rentals: "M3 11 12 4l9 7M5 10v10h14V10M10 20v-5h4v5",
    classifieds: "M3 12V4h8l10 10-8 8L3 12zM7.5 7.5h.01",
    lost: "M8 10a1.8 1.8 0 1 0 0-.1zM16 10a1.8 1.8 0 1 0 0-.1zM5 14a1.6 1.6 0 1 0 0-.1zM19 14a1.6 1.6 0 1 0 0-.1zM12 13c-2.5 0-4.5 2.6-4.5 4.5 0 1.5 1.5 2 2.5 2 .8 0 1.3-.5 2-.5s1.2.5 2 .5c1 0 2.5-.5 2.5-2 0-1.9-2-4.5-4.5-4.5z",
    forum: "M4 5h16v10H9l-5 4zM8 9h8M8 12h5",
    people: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 2.7-5 6-5s6 2 6 5M16 5a3 3 0 0 1 0 6M18 15c2 .5 3 2.2 3 5"
  };
  function icon(id){ const s = document.createElementNS(NS, "svg"); s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true");
    const p = document.createElementNS(NS, "path"); p.setAttribute("d", ICON[id] || ICON.people); s.append(p); return s; }
  function circles(list, title){ return el("div", {class: "fbg-strip"}, [
    title ? el("h2", {class: "fbg-title", text: title}) : null,
    el("div", {class: "fbg-row"}, list.map(g => { const a = el("a", {class: "fbg", href: g.url, target: "_blank", rel: "noopener", "data-track": "facebook group: " + (g.short || g.name), title: g.name + (g.about ? ": " + g.about : "")});
      a.append(el("span", {class: "fbg-dot"}, [icon(g.id)]), el("span", {class: "fbg-name", text: g.short || g.name})); return a; })),
    el("p", {class: "fbg-more"}, [el("a", {href: "about.html#groups", text: "What each group is for"})]) ]); }
  document.querySelectorAll("[data-groups]").forEach(box => { const want = box.dataset.groups.split(",").map(x => x.trim()); const list = want.map(w => G.find(g => g.id === w)).filter(Boolean);
    if (list.length) box.replaceChildren(circles(list, box.dataset.title || "Neighbors helping neighbors on Facebook")); });
  const foot = document.querySelector("footer.site-foot");
  if (foot && !document.body.hasAttribute("data-no-groups")) { const sec = el("section", {class: "fbg-band", "aria-label": "Our Facebook groups"}, [el("div", {class: "container"}, [circles(G, "Join our Facebook groups")])]); foot.before(sec); }
})();

/* ---------- home page photo banner (settings in config.js) ---------- */
(function(){ const h = document.getElementById("home-hero"); if (!h) return;
  if (C.heroPhoto) h.style.setProperty("--hero-img", "url('" + C.heroPhoto + "')");
  if (C.heroHeadline) document.getElementById("hero-h1").textContent = C.heroHeadline;
  const cr = document.getElementById("hero-credit"); if (cr) cr.textContent = C.heroCredit || ""; })();

/* ---------- shared data loaders ---------- */
async function loadJSON(name){ try { const r = await fetch(name, {cache: "no-store"}); if (!r.ok) throw 0; return await r.json(); } catch (e) { return null; } }
function renderMeetings(box, L, n, full){
  if (!box) return; box.replaceChildren();
  const ms = (L && L.meetings) || [];
  if (!ms.length) { box.append(el("p", {class: "meta", text: L && L.updated ? "No upcoming meetings posted right now." : "Meeting notices will appear here once the hourly update starts running."})); return; }
  const f = t => t ? fmt({weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit"}).format(new Date(t)) : "";
  const list = el("div", {style: "display:grid;gap:8px"});
  ms.slice(0, n).forEach(m => list.append(el("div", {class: full ? "card" : ""}, [
    el("div", {style: "font-weight:700"}, [el("a", {href: m.link, target: "_blank", rel: "noopener", text: m.title})]),
    el("div", {class: "meta", style: "font-size:15px", text: [m.body, f(m.start)].filter(Boolean).join(" · ")}),
    full ? el("div", {class: "meta", style: "font-size:14px", text: "Source: " + m.source}) : null ])));
  box.append(list);
}
function renderSeason(L){
  const body = document.getElementById("season-body"); if (!body) return;
  const winter = [11,12,1,2,3,4].includes(mo); body.replaceChildren();
  if (winter) {
    document.getElementById("season-eye").textContent = "Snow report"; document.getElementById("season-h").textContent = "Mountain snow";
    const sn = (L && L.snow || []).filter(s => s.depth);
    if (sn.length) sn.forEach(s => body.append(el("div", {text: s.name + " (" + s.elev.toLocaleString() + " ft): " + s.depth.value + " in. of snow"})));
    else body.append(el("div", {text: "Snow depths appear here once the season gets going."}));
    body.append(el("div", {style: "margin-top:6px"}, [el("a", {href: "live.html", text: "Resort cams and snow reports"})]));
    body.append(el("div", {style: "font-size:13px;margin-top:4px", text: "Source: USDA NRCS SNOTEL"}));
  } else {
    document.getElementById("season-eye").textContent = "Pineview Reservoir"; document.getElementById("season-h").textContent = "How full is Pineview?";
    const pv = L && L.pineview;
    if (pv) body.append(el("div", {class: "big", text: pv.percent + "% full"}), el("div", {text: pv.acreFeet.toLocaleString() + " acre-feet" + (pv.date ? " on " + fmt({month: "short", day: "numeric"}).format(new Date(pv.date)) : "")}));
    else body.append(el("div", {text: "Pineview is being drawn down in 2026 for a pipeline replacement. Water levels will appear here when the data comes in."}));
    body.append(el("div", {style: "font-size:13px;margin-top:4px", text: "Source: U.S. Bureau of Reclamation"}));
  }
}
/* ---------- alert bar (weather warnings, nearby fires) ---------- */
(async function(){ const bar = document.getElementById("alert-bar"); if (!bar) return;
  const sf = await loadJSON("safety.json"); if (!sf) return;
  const items = (sf.weather || []).map(a => a.event).concat((sf.fires || []).filter(f => f.county === "Weber").map(f => f.name + " in Weber County"));
  if (!items.length) return;
  bar.replaceChildren(el("div", {class: "container"}, [el("strong", {text: "Alert: "}), document.createTextNode([...new Set(items)].slice(0, 3).join(" · ") + " "), el("a", {href: "safety.html", text: "Details"})]));
  bar.hidden = false; })();
/* ---------- click metrics: what people tap (GoatCounter events, no cookies) ---------- */
document.addEventListener("click", ev => {
  const a = ev.target.closest("a,button"); if (!a || !window.goatcounter || !window.goatcounter.count) return;
  let label = a.dataset.track || "";
  if (!label) {
    const href = a.getAttribute("href") || "";
    const txt = (a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
    if (a.matches("[data-form]")) label = "form: " + a.dataset.form;
    else if (a.matches("[data-newsletter]")) label = "newsletter subscribe";
    else if (/calendar\.google\.com\/calendar\/render\?cid|^webcal:/.test(href)) label = "calendar subscribe: " + txt;
    else if (/^https?:/.test(href) && !href.includes(location.host)) { try { label = "outbound: " + new URL(href).host + " (" + txt + ")"; } catch (e) {} }
    else if (a.tagName === "BUTTON") label = "button: " + txt;
  }
  if (label) window.goatcounter.count({path: label, title: location.pathname, event: true});
});
/* ---------- visit counts (GoatCounter, no cookies) ---------- */
if (C.goatcounter) {
  const sc = document.createElement("script"); sc.async = true; sc.src = "https://gc.zgo.at/count.js"; sc.dataset.goatcounter = "https://" + C.goatcounter + ".goatcounter.com/count"; document.head.append(sc);
  const out = document.getElementById("gc-count");
  if (out && C.showVisitCount) fetch("https://" + C.goatcounter + ".goatcounter.com/counter/TOTAL.json").then(r => r.ok ? r.json() : null).then(j => { if (j && j.count) out.textContent = j.count + " visits to the site"; }).catch(() => {});
}

/* ---------- photo gallery viewer: tap any photo in a [data-gallery] area to browse full screen ---------- */
(function(){
  let list = [], idx = 0, box = null, img = null, cap = null, startX = null;
  function build(){
    box = el("div", {class: "lb", role: "dialog", "aria-modal": "true", "aria-label": "Photo viewer", hidden: ""});
    img = el("img", {alt: ""}); cap = el("div", {class: "lb-cap"});
    const prev = el("button", {class: "lb-btn lb-prev", type: "button", "aria-label": "Previous photo", text: "‹"});
    const next = el("button", {class: "lb-btn lb-next", type: "button", "aria-label": "Next photo", text: "›"});
    const close = el("button", {class: "lb-btn lb-close", type: "button", "aria-label": "Close", text: "×"});
    prev.onclick = () => show(idx - 1); next.onclick = () => show(idx + 1); close.onclick = hide;
    box.addEventListener("click", e => { if (e.target === box) hide(); });
    box.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, {passive: true});
    box.addEventListener("touchend", e => { if (startX == null) return; const dx = e.changedTouches[0].clientX - startX; if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1)); startX = null; });
    box.append(img, cap, prev, next, close); document.body.append(box);
  }
  function show(i){
    if (!list.length) return; idx = (i + list.length) % list.length; const f = list[idx];
    const im = f.querySelector("img"); img.src = im.src; img.alt = im.alt || "";
    const c = f.querySelector("figcaption"); cap.textContent = (c ? [...c.children].map(x => x.textContent.trim()).filter(Boolean).join(" · ") : "") + "  (" + (idx + 1) + " of " + list.length + ")";
  }
  function hide(){ box.hidden = true; document.body.style.overflow = ""; }
  document.addEventListener("click", e => {
    const f = e.target.closest("[data-gallery] figure, [data-gallery] .card"); if (!f || !e.target.closest("img")) return;
    const g = f.closest("[data-gallery]"); list = [...g.querySelectorAll("figure, .card")].filter(x => x.querySelector("img"));
    if (!box) build(); box.hidden = false; document.body.style.overflow = "hidden"; show(list.indexOf(f));
  });
  document.addEventListener("keydown", e => { if (!box || box.hidden) return; if (e.key === "Escape") hide(); if (e.key === "ArrowRight") show(idx + 1); if (e.key === "ArrowLeft") show(idx - 1); });
})();

window.OVE_SITE = {C, P, el, $, niceDay, loadJSON, renderMeetings, renderSeason, slug, loadEvents, allEvents, renderEvents, calLinks, moon, loadSky, auroraText, listing, dayKey, dayName, timeStr, todayKey, TZ};
})();
