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
  try { const r = await fetch("events.json", {cache: "no-store"}); if (!r.ok) throw 0; const d = await r.json(); eventsLD(d); return d; }
  catch (e) { return null; }
}
/* Labels each upcoming event for Google (event name, date, place) so it can show in Google's event listings. */
function eventsLD(data){
  try { if (document.getElementById("events-ld")) return;
    const iso = (t, allDay) => allDay ? new Date(t).toLocaleDateString("en-CA", {timeZone: TZ}) : new Date(t).toISOString();
    const list = allEvents(data).slice(0, 60).map(e => { const o = {"@type": "Event", name: e.t, startDate: iso(e.s, e.allDay), endDate: iso(e.allDay ? e.e - 1 : e.e, e.allDay),
        eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {"@type": "Place", name: (e.loc || "Ogden Valley").split(/[,@]/)[0].trim() || "Ogden Valley", address: e.loc || ((C.calendars && C.calendars[e.cal] && C.calendars[e.cal].name) || "Ogden Valley") + ", Utah"},
        organizer: {"@type": "Organization", name: e.src || "Ogden Valley Info & Events", url: "https://ogdenvalleyevent.com/"} };
      if (e.desc) o.description = e.desc.slice(0, 300); if (e.url) o.url = e.url; return o; });
    if (!list.length) return;
    const sc = document.createElement("script"); sc.type = "application/ld+json"; sc.id = "events-ld";
    sc.textContent = JSON.stringify({"@context": "https://schema.org", "@graph": list}); document.head.appendChild(sc);
  } catch (e) {}
}
function allEvents(data, which){
  const out = [];
  ["ov","weber"].forEach(k => { if (which && !which.includes(k)) return;
    const cal = data && data.calendars && data.calendars[k]; if (!cal) return;
    (cal.events || []).forEach(e => out.push(Object.assign({cal: k}, e))); });
  // the same event from two sources (same name, same day) shows once; keep the copy with the most detail, Valley first
  const norm = t => String(t || "").toLowerCase().replace(/&/g, "and").replace(/^(annual|the|\d+(st|nd|rd|th) annual)\s+/, "").replace(/[^a-z0-9]+/g, " ").trim();
  const seen = new Map(), keep = [];
  out.filter(e => e.e > Date.now()).sort((a,b) => a.s - b.s).forEach(e => { const k = norm(e.t) + "|" + dayKey(e.s);
    const prev = seen.get(k); if (!prev) { seen.set(k, e); keep.push(e); return; }
    const score = x => (x.url ? 2 : 0) + (x.loc ? 1 : 0) + (x.desc || "").length / 400 + (x.cal === "ov" ? 0.5 : 0);
    if (score(e) > score(prev)) { keep[keep.indexOf(prev)] = e; seen.set(k, e); } });
  return keep;
}
function eventCard(e){
  const name = (C.calendars && C.calendars[e.cal] && C.calendars[e.cal].name) || e.cal;
  const when = e.allDay ? "All day" : timeStr(e.s) + (e.e - e.s < 864e5 ? "–" + timeStr(e.e) : "");
  const what = e.url ? el("a", {href: e.url, target: "_blank", rel: "noopener", text: e.t}) : document.createTextNode(e.t);
  return el("article", {class: "event", style: "--cal:" + CAL_COLOR[e.cal]}, [
    el("div", {class: "when", text: when}),
    el("div", {}, [ el("div", {class: "what"}, [what, (evTags(e).adult && !/21\+/.test(e.t || "")) ? el("span", {class: "ev-21", title: "21 and over", text: "21+"}) : null]),
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
  if (p.badges && p.badges.length) kids.push(el("div", {class: "tags"}, p.badges.map(t => el("span", {class: "tag badge-owner", title: "As told to us by the owner", text: "✓ " + t}))));
  if (p.tags && p.tags.length) kids.push(el("div", {class: "tags"}, p.tags.map(t => el("span", {class: "tag", text: t}))));
  /* What visitors need to know (food listings): checked on the place's own website */
  const facts = [].concat(p.food || [], p.season ? [p.season] : [], p.lift ? ["🚡 Lift or gondola ride needed"] : [], p.good || []);
  if (facts.length) kids.push(el("div", {class: "tags", title: p.factsChecked ? "Checked on their website " + niceDay(p.factsChecked) : ""}, facts.map(t => el("span", {class: "tag" + (t.indexOf("🚡") === 0 ? " badge-owner" : ""), text: t}))));
  if (p.checked) kids.push(el("div", {class: "checked", text: "✓ Checked by a local " + niceDay(p.checked)}));
  return kids.length ? el("div", {class: "listmeta"}, kids) : null;
}
/* Storefront vs home-based: a listing marked home:true (or a Home Services listing) is home-based / comes to you. */
const isHome = (p, kind) => p.home === true || kind === "services";
function spotBadge(p, kind){
  if (kind !== "businesses" && kind !== "beauty") return null;
  if (isHome(p, kind)) return el("span", {class: "spot-badge home", text: "🏡 Home-based · by appointment"});
  if (p.address || p.storefront) return el("span", {class: "spot-badge store", text: "🏪 Storefront"});
  return null;
}
/* All · Storefronts · Home-based & mobile buttons (only shown when the list has both kinds) */
function spotFilter(bar, items, kind, onChange){
  if (!bar) return () => true;
  let mode = "all";
  const hasHome = items.some(p => isHome(p, kind)), hasStore = items.some(p => !isHome(p, kind));
  if (!(hasHome && hasStore)) { bar.hidden = true; return () => true; }
  bar.hidden = false;
  const opts = [["all", "All"], ["store", "🏪 Storefronts"], ["home", "🏡 Home-based & mobile"]];
  bar.replaceChildren(...opts.map(([k, l]) => { const b = el("button", {class: "chip", type: "button", "aria-pressed": String(k === mode), text: l}); b.onclick = () => { mode = k; [...bar.children].forEach(x => x.setAttribute("aria-pressed", String(x === b))); onChange(); }; return b; }));
  return p => mode === "all" || (mode === "home" ? isHome(p, kind) : !isHome(p, kind));
}
/* "New" = added in the last 30 days (listings carry "added": "YYYY-MM-DD") */
const isNew = p => { if (!p.added) return false; const [y,m,d] = p.added.split("-").map(Number); return (Date.now() - new Date(y, m - 1, d).getTime()) < 30 * 864e5; };
const SORT = {};
function listing(box, items, kind, R){
  box.replaceChildren();
  if (!items.length) { box.append(el("div", {class: "empty"}, [ el("p", {text: kind === "artists" ? "Artist listings are being gathered. Are you an Ogden Valley or Weber County artist? Ask to be listed." : "Listings are being gathered and checked. Own or love a place in the Valley? Send it in."}),
    el("a", {class: "btn blue", "data-form": kind === "artists" ? "artist" : "business", href: (C.forms && C.forms[kind === "artists" ? "artist" : "business"]) || "submit.html", text: kind === "artists" ? "Ask to be listed" : "Send a listing"}) ])); return; }
  const upd = C.forms && C.forms.update;
  // Featured sponsor box at the top; the regular list below stays A to Z (or newest first).
  const sponsors = items.filter(p => p.sponsor), rest = items.filter(p => !p.sponsor);
  if (sponsors.length) box.append(el("div", {class: "featured"}, [el("p", {class: "eyebrow", text: sponsors.length > 1 ? "Featured sponsors" : "Featured sponsor"}), el("div", {class: "grid"}, sponsors.map(p => card(p)))]));
  const mode = SORT[kind] || "az";
  if (rest.some(p => p.added) && rest.length > 1) {
    const bar = el("div", {class: "filters sortbar"}, [["az", "A to Z"], ["new", "Newest first"]].map(([k, l]) => { const b = el("button", {class: "chip", type: "button", "aria-pressed": String(k === mode), text: l}); b.onclick = () => { SORT[kind] = k; listing(box, items, kind, R); }; return b; }));
    box.append(bar);
  }
  const grid = el("div", {class: "grid"}); box.append(grid);
  const sorter = mode === "new" ? (a, b) => (b.added || "").localeCompare(a.added || "") || a.name.localeCompare(b.name) : (a, b) => a.name.localeCompare(b.name);
  rest.slice().sort(sorter).forEach(p => grid.append(card(p)));
  function card(p){ return el("article", {class: "card", id: slug(p.name), "data-town": p.town || p.area || ""}, [
    photoStrip(p),
    (p.sponsor || isNew(p)) ? el("div", {class: "badges"}, [p.sponsor ? el("span", {class: "sponsor-badge", text: "Sponsor"}) : null, isNew(p) ? el("span", {class: "new-badge", text: "New"}) : null]) : null,
    el("h3", {text: p.name}),
    spotBadge(p, kind),
    el("div", {class: "meta", text: [p.type || p.medium, p.town || p.area].filter(Boolean).join(" · ")}),
    p.blurb ? el("p", {text: p.blurb}) : null,
    p.serves ? el("div", {class: "meta", text: "Serves: " + p.serves}) : null,
    (p.sells && p.sells.length) ? el("div", {class: "meta", text: "Sells: " + p.sells.join(", ")}) : null,
    (p.buy && p.buy.length) ? el("div", {class: "meta", text: "How to buy: " + p.buy.join(", ")}) : null,
    p.where ? el("div", {class: "meta", text: "Find the work at: " + p.where}) : null,
    (p.sleeps || p.bedrooms) ? el("div", {class: "meta", text: [p.sleeps ? "Sleeps " + p.sleeps : "", p.bedrooms ? p.bedrooms + " bedroom" + (p.bedrooms == 1 ? "" : "s") : "", p.minNights ? p.minNights + "-night minimum" : ""].filter(Boolean).join(" · ")}) : null,
    (p.amenities && p.amenities.length) ? el("div", {class: "meta", text: p.amenities.join(" · ")}) : null,
    p.host ? el("div", {class: "meta", text: "Local host: " + p.host}) : null,
    p.address ? el("div", {class: "meta", text: p.address}) : null,
    (p.hours && !/^(n\/?a|none|-)$/i.test(String(p.hours).trim())) ? el("div", {class: "meta", text: "Hours: " + p.hours}) : null,
    p.phone ? el("div", {class: "meta"}, [el("a", {href: "tel:" + String(p.phone).replace(/[^0-9+]/g, ""), "data-track": "call: " + p.name, text: (d => d.length === 10 ? "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6) : p.phone)(String(p.phone).replace(/\D/g, ""))})]) : null,
    p.book ? el("div", {class: "btns", style: "margin:4px 0"}, [el("a", {class: "btn primary", href: p.book, target: "_blank", rel: "noopener", "data-track": "book stay: " + p.name, text: "Check dates & book"})]) : null,
    (p.link || (p.links && p.links.length)) ? el("div", {class: "links"}, [p.link ? el("a", {href: p.link, target: "_blank", rel: "noopener", text: "Website or page"}) : null].concat((p.links || []).map(x => el("a", {href: x.href, target: "_blank", rel: "noopener", text: x.label})))) : null,
    listMeta(p),
    p.note ? el("div", {class: "fine note", text: p.note}) : null,
    kind !== "artists" ? reviewBlock(p, R) : null,
    upd ? el("a", {class: "upd", href: upd, target: "_blank", rel: "noopener", text: kind === "artists" ? "Info changed? Let us know" : "Hours changed or closed? Let us know"}) : null ]); }
  if (upd) box.append(el("p", {class: "upd-foot"}, [document.createTextNode(kind === "artists" ? "Know an artist we're missing, or something here that changed? " : "Hours different, a place closed, or one we're missing? "), el("a", {href: upd, target: "_blank", rel: "noopener", text: "Let us know"}), document.createTextNode(". Every update is checked before the listing changes.")]));
}


/* ---------- Just added: any <div data-justadded> shows the 6 newest listings that owners sent in themselves through the form ---------- */
(function(){ const box = document.querySelector("[data-justadded]"); if (!box) return;
  const page = {restaurants: "restaurants.html", businesses: "businesses.html", stay: "stay.html", services: "services.html", beauty: "beauty.html", farm: "farm.html", foodtrucks: "foodtrucks.html", artists: "artists.html"};
  const label = {restaurants: "Eat", businesses: "Shop", stay: "Places to stay", services: "Home Services", beauty: "Beauty & Wellness", farm: "Farm & Local Food", foodtrucks: "Food Trucks", artists: "Artists"};
  const all = Object.keys(page).flatMap(k => (P[k] || []).filter(p => p.added && p.fromForm).map(p => [p, k])).sort((a, b) => b[0].added.localeCompare(a[0].added) || a[0].name.localeCompare(b[0].name)).slice(0, 6);
  if (!all.length) return;
  box.append(el("div", {class: "section-head"}, [el("div", {}, [el("p", {class: "eyebrow", text: "New on the site"}), el("h2", {text: "Just added"})])]),
    el("div", {class: "grid"}, all.map(([p, k]) => el("article", {class: "card"}, [
      (p.photos && p.photos[0]) ? el("img", {src: p.photos[0], alt: p.name, loading: "lazy", style: "width:100%;height:160px;object-fit:cover;border-radius:10px"}) : null,
      el("div", {class: "badges"}, [el("span", {class: "new-badge", text: "New"}), el("span", {class: "meta", text: label[k]})]),
      el("h3", {text: p.name}),
      el("div", {class: "meta", text: [p.type || p.medium, p.town || p.area || p.serves].filter(Boolean).join(" · ")}),
      el("a", {href: page[k] + "#" + slug(p.name), text: "See the listing"}) ]))));
})();

/* ---------- Local home businesses: any <div data-homebiz> shows 3 home-based listings, a different mix each visit ---------- */
(function(){ const box = document.querySelector("[data-homebiz]"); if (!box) return;
  const pool = [].concat((P.services || []).map(p => [p, "services"]), (P.beauty || []).filter(p => p.home).map(p => [p, "beauty"]), (P.businesses || []).filter(p => p.home).map(p => [p, "businesses"]));
  /* Rule (Shauna, Oct. 2026): only businesses that listed or updated with us AND sent photos show in this spot. No photo = not shown here (still on the full listings pages). */
  const ok = x => x[0].photos && x[0].photos.length && (x[0].added || x[0].fromForm);
  const pool2 = pool.filter(ok);
  if (!pool2.length) return;
  const pick = pool2.map(x => [Math.random(), x]).sort((a, b) => a[0] - b[0]).slice(0, 3).map(x => x[1]);
  const page = {services: "services.html", beauty: "beauty.html", businesses: "businesses.html"};
  box.append(el("div", {class: "section-head"}, [el("div", {}, [el("p", {class: "eyebrow", text: "Shop local"}), el("h2", {text: "Local home businesses"})]), el("a", {class: "btn blue", href: "services.html", text: "See them all"})]),
    el("div", {class: "grid"}, pick.map(([p, k]) => el("article", {class: "card"}, [
      (p.photos && p.photos[0]) ? el("img", {src: p.photos[0], alt: p.name, loading: "lazy", style: "width:100%;height:160px;object-fit:cover;border-radius:10px"}) : null,
      el("span", {class: "spot-badge home", text: "🏡 Home-based"}),
      el("h3", {text: p.name}),
      el("div", {class: "meta", text: [p.type, p.town || p.serves].filter(Boolean).join(" · ")}),
      el("a", {href: page[k] + "#" + slug(p.name), text: "See their listing"}) ]))),
    el("p", {class: "fine", text: "Small businesses run from home or that come to you. Getting listed is free. Only businesses that send us their details and photos are highlighted here, so send yours to be featured."})); })();

/* ---------- "Post your event, it's free" band: any <div data-postevent> ---------- */
(function(){ const boxes = document.querySelectorAll("[data-postevent]"); if (!boxes.length) return;
  const form = (C.forms && C.forms.event) || "submit.html", price = C.eventFeaturePrice || "$25";
  boxes.forEach(box => box.replaceChildren(el("div", {class: "post-band"}, [
    el("div", {}, [
      el("p", {class: "post-eye", text: "Have an event?"}),
      el("h2", {text: "Post your event. It's free."}),
      el("p", {text: "Fundraisers, concerts, races, classes, church and school events: if it's in the Valley or Weber County, send it in and it goes on the calendar."}),
      el("p", {class: "post-small", html: "<b>On Facebook?</b> Create your Facebook event and add <b>Ogden Valley Info &amp; Events</b> as a co-host. It will show on our Facebook page's events too. Then send it in here so it goes on our calendar."}),
      el("p", {class: "post-small", html: "Want it to stand out? <b>" + price + "</b> puts it in <b>Featured events</b> for the week of your event, plus a pinned Facebook post and a spot in the newsletter. <a href=\"sponsor.html\">How featuring works</a>"})
    ]),
    el("a", {class: "btn post-btn", href: form, target: form.startsWith("http") ? "_blank" : null, rel: "noopener", text: "Post my event"})
  ])));
})();

/* ---------- Featured events: any <div data-featuredevents> ---------- */
(function(){ const boxes = document.querySelectorAll("[data-featuredevents]"); if (!boxes.length) return;
  const today = new Intl.DateTimeFormat("en-CA", {timeZone: TZ}).format(new Date()), preview = /[?&]preview\b/.test(location.search);
  const back7 = d => { const [y,m,dd] = d.split("-").map(Number); const x = new Date(Date.UTC(y, m - 1, dd - 7)); return x.toISOString().slice(0, 10); };
  const list = (C.featuredEvents || []).filter(f => f && f.title && f.date && f.date >= today &&
    (preview || (!f.preview && (f.from || back7(f.date)) <= today))).sort((a, b) => a.date < b.date ? -1 : 1);
  const dayLine = f => { const [y,m,dd] = f.date.split("-").map(Number); const d = new Date(y, m - 1, dd);
    return d.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"}) + (f.time ? " · " + f.time : ""); };
  boxes.forEach(box => { box.replaceChildren(); const causesOnly = box.dataset.featuredevents === "causes";
    const mine = causesOnly ? list.filter(f => f.cause) : list; if (!mine.length) return;
    box.append(el("div", {class: "fev"}, [
      el("div", {class: "fev-head"}, [el("p", {class: "eyebrow", text: causesOnly ? "Featured fundraisers" : "Featured events"}),
        preview ? el("span", {class: "fev-preview", text: "Preview: only you can see this"}) : null]),
      el("div", {class: "fev-grid"}, mine.map(f => el("article", {class: "fev-card" + (f.image ? "" : " noimg")}, [
        f.image ? el("a", {class: "fev-img", href: f.image, target: "_blank", rel: "noopener", "aria-label": "See the full flyer"},
          [el("img", {src: f.image, alt: f.title + " flyer", loading: "lazy"})]) : null,
        el("div", {class: "fev-body"}, [
          el("span", {class: "fev-tag", text: "★ Featured"}),
          el("h3", {text: f.title}),
          el("p", {class: "fev-when", text: dayLine(f)}),
          (f.place || f.town) ? el("p", {class: "fev-where", text: [f.place, f.town].filter(Boolean).join(", ")}) : null,
          f.line ? el("p", {text: f.line}) : null,
          f.link ? el("a", {class: "btn primary", href: f.link, target: "_blank", rel: "noopener", text: f.linkText || "Event details"}) : null
        ])
      ]))),
      el("p", {class: "fev-note", text: "Every event on the calendar is free to post. Want yours featured? See how it works on our Sponsor page."})
    ]));
  });
})();

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
    photo: "M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    events: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M8 14h3v3H8z",
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
  if (foot && !document.body.hasAttribute("data-no-groups")) { const phone = window.matchMedia && matchMedia("(max-width:700px)").matches;
    const inner = phone ? el("details", {class: "fbg-fold"}, [el("summary", {}, [el("span", {text: "Join our Facebook groups (" + G.length + ")"})]), circles(G, "")]) : circles(G, "Join our Facebook groups");
    const sec = el("section", {class: "fbg-band", "aria-label": "Our Facebook groups"}, [el("div", {class: "container"}, [inner])]); foot.before(sec);
    if (!document.getElementById("fbg-fold-css")) { const c = el("style", {id: "fbg-fold-css"}); c.textContent = ".fbg-fold summary{list-style:none;cursor:pointer;font-family:var(--display);font-weight:700;font-size:19px;display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:var(--card);border:1px solid var(--line);border-radius:14px}.fbg-fold summary::-webkit-details-marker{display:none}.fbg-fold summary::after{content:'\\25BE'}.fbg-fold[open] summary::after{content:'\\25B4'}.fbg-fold[open] .fbg-strip{margin-top:14px}.fbg-band:has(.fbg-fold){padding-block:16px}"; document.head.append(c); } }
})();

/* ---------- home page photo banner (settings in config.js) ---------- */
(function(){ const h = document.getElementById("home-hero"); if (!h) return;
  const w = (C.contest && C.contest.lastWinner) || null;
  const photo = (w && w.image) ? w.image : C.heroPhoto;
  const credit = (w && w.image) ? "Photo of the Month" + (w.month ? " (" + w.month + ")" : "") + (w.title ? ": " + w.title : "") + (w.name ? " · " + w.name : "") : (C.heroCredit || "");
  if (photo) h.style.setProperty("--hero-img", "url('" + photo + "')");
  if (C.heroHeadline) document.getElementById("hero-h1").textContent = C.heroHeadline;
  const cr = document.getElementById("hero-credit"); if (cr) { cr.textContent = credit; if (w && w.image) { cr.innerHTML = ""; cr.append(el("a", {href: "photo-contest.html", style: "color:inherit", text: credit})); } } })();

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
  try { const rd = await loadJSON("roads.json"); ((rd && rd.events) || []).filter(e => e.full).forEach(e => items.push("Closed: " + (e.loc || e.road))); } catch (e) {}
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
  if (out && C.showVisitCount) fetch("https://" + C.goatcounter + ".goatcounter.com/counter/TOTAL.json").then(r => r.ok ? r.json() : null).then(j => { const n = j && parseInt(String(j.count || "").replace(/[^0-9]/g, ""), 10); if (n && n >= (+C.visitCountMin || 0)) out.textContent = n.toLocaleString("en-US") + " visits to the site"; }).catch(() => {});
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

/* ---------- hide filter buttons that would show nothing (e.g. a town with no listings, or a tag no business in the chosen type has) ---------- */
function pruneChips(all, pred, state, groups){
  groups.forEach(g => { const btns = [...g.btns]; let any = false;
    btns.forEach(b => { const v = g.val(b); if (v === null) return;
      const on = b.getAttribute("aria-pressed") === "true";
      const n = all.filter(p => pred(p, Object.assign({}, state, {[g.key]: v}))).length;
      b.hidden = n === 0 && !on; if (!b.hidden) any = true; });
    const row = g.row === undefined ? (btns[0] && btns[0].parentElement) : g.row; if (row && btns.length) row.hidden = !any; });
}

/* weather helpers for the Valley forecast (forecast.json, from the National Weather Service) */
function wxIcon(t){t=String(t||"").toLowerCase();return /thunder/.test(t)?"⛈️":/snow|flurr|sleet|wintry/.test(t)?"🌨️":/rain|shower|drizzle/.test(t)?"🌧️":/fog|haze|smoke/.test(t)?"🌫️":/partly|mostly sunny|mostly clear/.test(t)?"⛅":/cloud|overcast/.test(t)?"☁️":/wind|breez|blustery/.test(t)?"💨":"☀️"}
function renderForecastStrip(box,F,n){if(!box)return;if(!F||!F.days||!F.days.length){box.replaceChildren(el("div",{class:"alert quiet",text:"The Valley forecast will appear here after the next hourly update."}));return}
  box.replaceChildren(...F.days.slice(0,n||7).map(d=>el("div",{class:"fc-day"+(d.snow?" snow":"")+(d.pop>=60?" wet":"")},[el("p",{class:"fc-name",text:d.label}),el("p",{class:"fc-md",text:d.md}),el("p",{class:"fc-ic","aria-hidden":"true",text:wxIcon(d.both||d.short)}),el("p",{class:"fc-t",text:(d.high!=null?d.high+"°":"–")+" / "+(d.low!=null?d.low+"°":"–")}),el("p",{class:"fc-p",text:(d.pop||0)+"%"+(d.snow?" snow":" rain")}),el("p",{class:"fc-s",text:d.short||""})])))}

/* ---------- Up here / Down the canyon switch (shared by every page that shows both calendars) ---------- */
const AREA_KEY = "ove-area";
function getArea(){ try { const v = localStorage.getItem(AREA_KEY); if (v === "ov" || v === "weber" || v === "both") return v; } catch (e) {} return "both"; }
function setArea(v){ try { localStorage.setItem(AREA_KEY, v); } catch (e) {} }
function areaCals(v){ return v === "ov" ? ["ov"] : v === "weber" ? ["weber"] : ["ov", "weber"]; }
function areaSwitch(box, onChange){
  if (!box) return getArea();
  const opts = [["ov", "Up here", "Ogden Valley", "var(--ov)"], ["weber", "Down the canyon", "Weber County", "var(--weber)"], ["both", "Both", "Valley first", ""]];
  box.classList.add("area-switch"); box.setAttribute("role", "group"); box.setAttribute("aria-label", "Show events from");
  const cur = getArea();
  box.replaceChildren(...opts.map(([k, a, b, col]) => { const btn = el("button", {class: "chip area-chip", type: "button", "data-track": "area switch: " + a, "aria-pressed": String(k === cur)}, [
      col ? el("span", {class: "dot", style: "background:" + col}) : el("span", {class: "dot both"}),
      el("span", {class: "ac-t"}, [el("b", {text: a}), b ? el("small", {text: b}) : null])]);
    btn.addEventListener("click", () => { setArea(k); [...box.children].forEach(x => x.setAttribute("aria-pressed", String(x === btn))); onChange && onChange(k); });
    return btn; }));
  return cur;
}
/* same day: Ogden Valley events first, then Weber County, each by time */
function valleyFirst(list){ const now = Date.now(); return list.slice().sort((a, b) => { const da = dayKey(Math.max(a.s, now)), db = dayKey(Math.max(b.s, now)); if (da !== db) return da < db ? -1 : 1; if (a.cal !== b.cal) return a.cal === "ov" ? -1 : 1; return a.s - b.s; }); }
/* quick filters: Free, Family / all ages, 21+, Live music, Classes */
const EV_MUSIC = /live music|\bband\b|bands|concert|acoustic|open mic|\bdj\b|djs|bluegrass|jazz|musician|singer|songwriter|karaoke|symphony|orchestra|tribute|#livemusic/i;
const EV_BAR = /\b(side bar|angry goat|thirsty horse|the outlaw|shooting star saloon|brewski'?s|alleged|lighthouse lounge|kokomo|saloon|tavern|lounge|pub\b|nightclub|cocktail bar|wine bar|bar)\b/i;
const EV_NOT_BAR = /all ages|all-ages|family|kids|children|sushi bar|bar ?(&|and) ?grill|candy bar|juice bar|salad bar|coffee bar|snack bar|bar ?b ?q|barn|bar mitzvah|pub(lic|lished)/i;
function evTags(e){ const t = (e.t || "") + " " + (e.desc || ""); const atBar = EV_BAR.test((e.t || "") + " " + (e.loc || "")) && !EV_NOT_BAR.test((e.t || "") + " " + (e.loc || "") + " " + (e.desc || ""));
  const adult = /21\+|18\+|\(adult|rated r|adults only|ages 21/i.test(t) || atBar;
  return {free: /\bfree\b/i.test(t), adult, family: !adult, music: EV_MUSIC.test(t), class: /\bclass(es)?\b|workshop|lesson|tutorial|storytime|story time/i.test(t), meeting: /commission|council|work ?session|public hearing|public meeting|board of|planning|trustees|town meeting|committee|county commission/i.test(e.t || "")}; }
(function(){ const c = document.createElement("style"); c.textContent = ".ev-21{display:inline-block;margin-left:8px;font-size:12px;font-weight:700;padding:1px 7px;border-radius:999px;background:#7A1F1F;color:#fff;vertical-align:middle;text-decoration:none}"; document.head.appendChild(c); })();
const EV_FILTERS = [["free", "Free"], ["family", "Family / all ages"], ["adult", "21+"], ["music", "Live music"], ["class", "Classes"], ["meeting", "Public meetings"]];
function eventFilters(box, onChange){
  const on = new Set(); if (!box) return () => true;
  box.classList.add("filters", "ev-filters"); box.setAttribute("role", "group"); box.setAttribute("aria-label", "Filter events");
  const btns = EV_FILTERS.map(([k, l]) => { const b = el("button", {class: "chip", type: "button", "data-track": "event filter: " + l, "aria-pressed": "false", text: l});
    b.addEventListener("click", () => { if (on.has(k)) on.delete(k); else { on.add(k); if (k === "family") on.delete("adult"); if (k === "adult") on.delete("family"); }
      btns.forEach((x, i) => x.setAttribute("aria-pressed", String(on.has(EV_FILTERS[i][0])))); onChange && onChange(); }); return b; });
  box.replaceChildren(el("span", {class: "ev-f-label", text: "Show:"}), ...btns);
  return e => { if (!on.size) return true; const t = evTags(e); for (const k of on) if (!t[k]) return false; return true; };
}
/* month grid: one month, each day lists its events; tap a day to see that day's list */
function monthGrid(box, list, opts){
  opts = opts || {}; const now = new Date(new Date().toLocaleString("en-US", {timeZone: TZ}));
  const keep = opts.state || {}; let y = keep.y != null ? keep.y : opts.y != null ? opts.y : now.getFullYear(), m = keep.m != null ? keep.m : opts.m != null ? opts.m : now.getMonth();
  const draw = () => {
    const first = new Date(y, m, 1), days = new Date(y, m + 1, 0).getDate(), lead = first.getDay();
    const byDay = {}; list.forEach(e => { const k = dayKey(e.s); (byDay[k] = byDay[k] || []).push(e); });
    const key = d => dayKey(new Date(y, m, d, 12).getTime());
    const prev = el("button", {class: "btn ghost", type: "button", text: "‹ Prev"}), next = el("button", {class: "btn ghost", type: "button", text: "Next ›"});
    prev.addEventListener("click", () => { m--; if (m < 0) { m = 11; y--; } keep.y = y; keep.m = m; draw(); }); next.addEventListener("click", () => { m++; if (m > 11) { m = 0; y++; } keep.y = y; keep.m = m; draw(); });
    const mid = el("div", {class: "mg-mid"}, [el("h3", {text: first.toLocaleDateString("en-US", {month: "long", year: "numeric"})})]);
    if (opts.onArea) { const sw = el("div", {class: "mg-area"}); areaSwitch(sw, opts.onArea); mid.append(sw); }
    const head = el("div", {class: "mg-head"}, [prev, mid, next]);
    const grid = el("div", {class: "mg-grid"}, ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => el("div", {class: "mg-dow", text: d})));
    for (let i = 0; i < lead; i++) grid.append(el("div", {class: "mg-day empty"}));
    const detail = el("div", {class: "mg-detail"});
    for (let d = 1; d <= days; d++) { const k = key(d), evs = byDay[k] || [];
      const cell = el("button", {class: "mg-day" + (k === todayKey ? " today" : "") + (evs.length ? " has" : ""), type: "button", "aria-label": new Date(y, m, d).toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"}) + ", " + evs.length + " event" + (evs.length === 1 ? "" : "s")}, [
        el("span", {class: "mg-n", text: String(d)}),
        ...evs.slice(0, 3).map(e => el("span", {class: "mg-ev", style: "--cal:" + CAL_COLOR[e.cal], text: e.t})),
        evs.length > 3 ? el("span", {class: "mg-more", text: "+" + (evs.length - 3) + " more"}) : null,
        evs.length ? el("span", {class: "mg-count", text: evs.length + (evs.length === 1 ? " event" : " events")}) : null]);
      cell.addEventListener("click", () => { grid.querySelectorAll(".mg-day.sel").forEach(x => x.classList.remove("sel")); cell.classList.add("sel"); renderEvents(detail, evs, {emptyText: "Nothing on the calendar this day."}); detail.scrollIntoView({behavior: "smooth", block: "nearest"}); });
      grid.append(cell); }
    box.replaceChildren(head, grid, detail);
    /* show today's events under the calendar right away */
    const t = opts.autoToday ? grid.querySelector(".mg-day.today") : null; if (t) { t.classList.add("sel"); renderEvents(detail, byDay[todayKey] || [], {emptyText: "Nothing else on the calendar today. Tap another day to see its events."}); }
  };
  draw();
}
(function(){ const st = document.createElement("style"); st.textContent =
  ".area-switch{display:flex;flex-wrap:wrap;gap:8px}.area-chip{padding:8px 16px;text-align:left}.area-chip .ac-t{display:grid;line-height:1.15}.area-chip small{font-weight:600;font-size:13px;color:var(--muted)}" +
  "@media (max-width:520px){.area-switch{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;width:100%}.area-chip{padding:7px 8px;gap:6px;font-size:14px}.area-chip small{font-size:11px}}" +
  ".area-chip[aria-pressed=true]{background:var(--navy);border-color:var(--navy);color:#fff}.area-chip[aria-pressed=true] small{color:#dfe8f3}.dot.both{background:linear-gradient(90deg,var(--ov) 50%,var(--weber) 50%)}" +
  ".ev-filters{align-items:center}.ev-f-label{font-weight:700;color:var(--muted);margin-right:2px}.ev-filters .chip[aria-pressed=true]{background:var(--soft);border-color:var(--ink)}" +
  ".view-toggle{display:inline-flex;gap:6px}.mg-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.mg-head h3{margin:0}.mg-mid{display:grid;justify-items:center;gap:8px}.mg-area .area-chip{padding:5px 12px}@media (max-width:640px){.mg-head{flex-wrap:wrap}.mg-mid{order:-1;width:100%}.mg-area{width:100%}}" +
  ".mg-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px}.mg-dow{font-weight:700;font-size:13px;text-align:center;color:var(--muted);padding:4px 0}" +
  ".mg-day{min-height:92px;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:5px;display:flex;flex-direction:column;gap:3px;text-align:left;font:inherit;color:var(--ink);cursor:pointer;min-width:0;overflow:hidden}.mg-day.empty{background:transparent;border:0;cursor:default}" +
  ".mg-day.today{border:2px solid var(--accent,#C2410C)}.mg-day.sel{outline:3px solid var(--navy)}.mg-n{font-weight:700;font-size:14px}.mg-ev{font-size:12px;line-height:1.2;border-left:4px solid var(--cal);padding-left:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mg-more{font-size:12px;color:var(--muted)}" +
  ".mg-detail{margin-top:14px}.mg-count{display:none}@media (max-width:640px){.mg-day{min-height:52px}.mg-ev,.mg-more{display:none}.mg-count{display:block;font-size:11px;color:var(--muted);line-height:1.1}.mg-day.has::after{content:'';width:8px;height:8px;border-radius:50%;background:var(--accent,#C2410C);margin-top:auto}}";
  document.head.appendChild(st); })();

/* ---------- Find it local: "where can I get candles / sushi / swim lessons?" ---------- */
const FIND_PAGES = {stay: ["stay.html", "Place to stay"], restaurants: ["restaurants.html", "Eat"], businesses: ["businesses.html", "Shop"], services: ["services.html", "Home service"], beauty: ["beauty.html", "Beauty & wellness"], farm: ["farm.html", "Farm & local food"], foodtrucks: ["foodtrucks.html", "Food truck"], artists: ["artists.html", "Local artist"], worship: ["worship.html", "Place of worship"], shops: ["down-the-canyon.html", "Shop"]};
const FIND_PLACES = [
  ["Marshall N. White Community Center", "pool indoor pool swim swimming swim lessons classes community center fitness", "down-the-canyon.html#pools", "Pools, ice & rec"],
  ["Ogden City Recreation", "swim swimming swim lessons aquatics sports leagues court rentals pavilion tennis classes kids", "down-the-canyon.html#pools", "Pools, ice & rec"],
  ["The Ice Sheet", "ice skating skate hockey figure skating rink", "down-the-canyon.html#pools", "Pools, ice & rec"],
  ["Weber County Library", "library books story time storytime classes kids movies crafts book club", "down-the-canyon.html#library", "Library & classes"],
  ["Peery's Egyptian & Eccles Theaters", "theater movies concerts shows film dance", "down-the-canyon.html#shows", "Shows & theaters"],
  ["Weber State Browning Center", "theater concerts plays dance symphony shows", "down-the-canyon.html#shows", "Shows & theaters"],
  ["Treehouse Children's Museum", "kids museum children play", "down-the-canyon.html#museums", "Museums & kids"],
  ["George S. Eccles Dinosaur Park", "dinosaur kids park museum", "down-the-canyon.html#museums", "Museums & kids"],
  ["Union Station Museums", "museum history train cars", "down-the-canyon.html#museums", "Museums & kids"],
  ["Ogden Nature Center", "nature trails birds wildlife kids classes camps", "down-the-canyon.html#museums", "Museums & kids"],
  ["Valley Health Mart Pharmacy", "pharmacy prescriptions medicine drugstore", "health.html#valley-health-mart-pharmacy", "Pharmacy", "Eden", 1],
  ["Zimbi Dental", "dentist dental teeth", "health.html#zimbi-dental", "Dentist", "Eden", 1],
  ["Iverson & Burton Dental", "dentist dental teeth", "health.html#iverson-burton-dental", "Dentist", "Eden", 1],
  ["Valley Physical Therapy", "physical therapy pt rehab injury", "health.html#valley-physical-therapy", "Physical therapy", "Eden", 1],
  ["McKay-Dee Hospital ER", "er emergency room hospital emergency", "health.html#emergency-rooms-open-24-7", "Emergency room", "Ogden", 0],
  ["Ogden Regional Medical Center ER", "er emergency room hospital emergency", "health.html#emergency-rooms-open-24-7", "Emergency room", "Ogden", 0],
  ["North Ogden InstaCare", "urgent care instacare doctor clinic sick walk-in medical", "health.html#urgent-care", "Urgent care", "North Ogden", 0],
  ["Midtown Community Health Center", "clinic doctor low-cost dental medical sliding uninsured", "health.html#low-cost-free-care", "Low-cost clinic", "Ogden", 0],
  ["Seager Memorial Clinic", "free clinic doctor uninsured medical dental", "health.html#low-cost-free-care", "Free clinic", "Ogden", 0],
  ["Weber Human Services", "mental health counseling therapy addiction substance crisis 988", "health.html#mental-health", "Mental health", "Ogden", 0],
  ["988 Suicide & Crisis Lifeline", "crisis suicide mental health 988 hotline", "health.html", "Call or text 988", "", 1],
  ["Lantern House", "shelter homeless homelessness bed meals", "health.html#shelter", "Shelter", "Ogden", 0],
  ["Catholic Community Services Food Bank", "food bank pantry groceries hungry", "health.html#food", "Food bank", "Ogden", 0],
  ["Utah 211", "rent help utilities bills assistance 211 housing", "health.html#rent-bills-more", "Help line", "", 0],
  ["YCC Family Crisis Center", "domestic violence abuse crisis shelter", "health.html", "Crisis line", "Ogden", 0],
  ["Ogden VA Clinic", "veterans va clinic doctor", "health.html#veterans", "Veterans", "South Ogden", 0]];
const FIND_SYN = {
  candle: "candles,candle", soap: "soaps,soap,bath products,bath and body", flower: "flowers,florist,bouquet", taco: "tacos,mexican", sushi: "sushi,japanese",
  soup: "soups,ramen,chowder", pho: "pho,vietnamese", gluten: "gluten-free,gluten free", celiac: "gluten-free,gluten free", vegan: "vegan,vegetarian", vegetarian: "vegetarian,vegan",
  lavendar: "lavender", gas: "gas station,fuel,convenience store", fuel: "fuel,gas station",
  stay: "lodging,place to stay,timeshare", lodging: "lodging,place to stay", hotel: "lodging,place to stay", motel: "lodging,place to stay", cabin: "cabin,lodging", airbnb: "lodging,place to stay", vrbo: "lodging,place to stay", condo: "condo,lodging",
  drink: "bar,saloon,brewery,brewpub,cocktails,wine,spirits,distillery,taproom,pub", bar: "bar,saloon,pub,brewpub",
  beer: "beer,brewery,brewpub,taproom", brewery: "brewery,breweries,brewpub,taproom,brewing", wine: "wine", cocktail: "cocktails,distillery",
  swim: "swim,swimming,pool,aquatics", swimming: "swim,swimming,pool,aquatics", pool: "pool,swim",
  haircut: "hair,salon,barber", hair: "hair,salon", nail: "nails,manicure,pedicure", massage: "massage", coffee: "coffee,espresso,latte,cafe",
  burger: "burgers,burger", breakfast: "breakfast,brunch", brunch: "brunch,breakfast", bbq: "bbq,barbecue", barbecue: "bbq,barbecue", steak: "steak,steakhouse",
  dessert: "dessert,sweets,ice cream,bakery,cupcakes,chocolates", sweet: "sweets,dessert,ice cream,bakery", bakery: "bakery,bagels,cupcakes", icecream: "ice cream,shakes",
  handyman: "handyman,repair,repairs,drywall", repair: "repair,repairs", plumber: "plumbing,plumber", sprinkler: "sprinklers,sprinkler,irrigation", cleaning: "cleaning,cleaner",
  egg: "eggs", beef: "beef,meat,meats", meat: "meat,meats,beef,butcher", produce: "produce,vegetables,fruit",
  grocery: "grocery,groceries,market", ship: "shipping,fedex,ups", shipping: "fedex,ups,shipping", copy: "copies,copy",
  ski: "ski,skiing,snowboard", snowboard: "snowboard,ski", bike: "bike,bikes,cycling", boat: "boat,boats,watercraft,paddle,kayak", kayak: "kayak,paddle,paddleboard",
  lesson: "lessons,lesson,classes,class", class: "classes,class,lessons,workshop",
  kid: "kids,children,youth", child: "kids,children,youth",
  art: "art,artist,painter,gallery", jewelry: "jewelry,silver,rings,necklace", photo: "photographer,photography", gift: "gifts,gift",
  yoga: "yoga,pilates", gym: "gym,fitness", fitness: "fitness,gym", spa: "spa,massage,facials", therapy: "physical therapy", pt: "physical therapy",
  pet: "pet,pets,dog", doctor: "doctor,clinic,urgent care", dentist: "dentist,dental", dental: "dental,dentist", pharmacy: "pharmacy,prescriptions", prescription: "pharmacy,prescriptions", medicine: "pharmacy", er: "er,emergency room", emergency: "emergency room,er", hospital: "hospital,emergency room", clinic: "clinic,urgent care", urgent: "urgent care", shelter: "shelter,homeless", homeless: "shelter,homeless", "food bank": "food bank,pantry", pantry: "pantry,food bank", rent: "rent help,rent", crisis: "crisis,988", therapy: "physical therapy,counseling,therapy", counseling: "counseling,mental health", veteran: "veterans,va", vet: "veterans,va", dog: "dog,dogs,pet", theater: "theater,movies,shows", movie: "movies,theater,film", museum: "museum,museums", skate: "skating,skate,rink", skating: "skating,skate,rink",
  church: "church,worship", worship: "worship,church", mass: "mass,catholic", catholic: "catholic,mass", mosque: "mosque,muslim,jumuah", muslim: "muslim,mosque", islam: "muslim,mosque", synagogue: "synagogue,jewish", jewish: "jewish,synagogue", temple: "temple,hindu,buddhist", hindu: "hindu", buddhist: "buddhist", lds: "latter-day saint", ward: "ward,latter-day saint", sacrament: "latter-day saint", christian: "christian,church,catholic,lutheran,baptist,episcopal,presbyterian,orthodox"};
const FIND_STOP = new Set("where can i get find buy a an the some any for to in near me good best place places is there who sells sell do you know of what my our up here around valley ogden go take how much local homemade handmade fresh food spot spots".split(" "));
const FIND_ASKS = [["Candles & gifts", "candles gifts"], ["Kids' classes", "kids classes lessons"], ["Swim lessons", "swim lessons"], ["Haircut", "haircut"], ["Handyman", "handyman"], ["Fresh eggs & beef", "eggs beef"], ["Coffee", "coffee"], ["Sushi", "sushi"], ["Gluten-free", "gluten free"], ["A drink", "drinks"], ["Place to stay", "place to stay"], ["Flowers", "flowers"]];
function findIndex(){
  if (findIndex.cache) return findIndex.cache;
  const W = new Set(["Ogden", "North Ogden", "Pleasant View", "South Ogden", "Weber County"]);
  const items = [];
  Object.keys(FIND_PAGES).forEach(k => (P[k] || []).forEach(p => { const [page, label] = FIND_PAGES[k];
    items.push({name: p.name, label: p.faith || p.type || label, town: p.town || p.area || "", weber: p.region === "weber" || W.has(p.town),
      href: page + "#" + slug(p.name), line: p.blurb || "", hay: [p.name, p.type, p.blurb, (p.food || []).join(" "), (p.good || []).join(" "), (p.sells || []).join(" "), (p.offers || []).join(" "), (p.amenities || []).join(" "), (p.tags || []).join(" "), (p.keywords || []).join(" "), (p.badges || []).join(" "), k === "stay" ? "lodging place to stay vacation rental" : "", k === "worship" ? "worship church place of worship services " + (p.faith || "") + " " + (p.times || []).join(" ") : "", k === "restaurants" ? "food eat restaurant" : ""].join(" ").toLowerCase()}); }));
  (C.kidsList || []).forEach(x => items.push({name: x.name, label: x.kind || "Kids' lessons", town: x.town || "", weber: x.where === "weber", href: "station-board.html#" + (x.group === "groups" ? "groups" : "lessons"), ext: x.url || "", line: x.line || "",
    hay: [x.name, x.kind, x.line, x.ages, "kids children youth", x.group === "lessons" ? "lessons classes class" : "teams clubs"].join(" ").toLowerCase()}));
  FIND_PLACES.forEach(([name, words, href, label, town, up]) => items.push({name, label, town: town === undefined ? "Ogden" : town, weber: !up, href, line: "", hay: (name + " " + words).toLowerCase()}));
  const seen = new Set(); return (findIndex.cache = items.filter(it => { const k = it.name.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; }));
}
function findLocal(q){
  const raw = String(q || "").toLowerCase().replace(/[’']/g, "").replace(/gluten[\s-]free/g, "gluten").replace(/place to stay/g, "stay");
  const words = raw.split(/[^a-z0-9+]+/).filter(w => w && !FIND_STOP.has(w));
  if (!words.length) return {words, up: [], down: []};
  const sing = w => w.endsWith("ies") && w.length > 5 ? w.slice(0, -3) + "y" : w.length > 4 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w;
  const terms = words.map(w => [w, sing(w)].concat((FIND_SYN[w] || FIND_SYN[sing(w)] || "").split(",")).filter(Boolean));
  const re = t => new RegExp("(^|[^a-z])" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^a-z])");
  const scored = findIndex().map(it => { let n = 0; terms.forEach(ts => { if (ts.some(t => re(t).test(it.hay))) n++; }); if (n && terms[0].some(t => re(t).test(it.name.toLowerCase()))) n += 0.5; return [n, it]; }).filter(x => x[0] > 0);
  const best = Math.max(0, ...scored.map(x => x[0])); const need = terms.length > 1 ? Math.max(1, Math.floor(best)) : 1;
  const hits = scored.filter(x => x[0] >= need).sort((a, b) => b[0] - a[0] || a[1].name.localeCompare(b[1].name)).map(x => x[1]);
  return {words, up: hits.filter(x => !x.weber), down: hits.filter(x => x.weber)};
}
function findBox(box){
  if (!box) return;
  const input = el("input", {type: "search", class: "fsearch", placeholder: "Where can I get… (candles, sushi, swim lessons)", "aria-label": "Ask where to find something local"});
  const go = el("button", {class: "btn primary", type: "submit", text: "Find it"});
  const form = el("form", {class: "find-form", role: "search"}, [input, go]);
  const chips = el("div", {class: "filters find-asks"}, FIND_ASKS.map(([l, q]) => { const b = el("button", {class: "chip", type: "button", "data-track": "find tap: " + l, text: l}); b.addEventListener("click", () => { input.value = l; run(q, l); }); return b; }));
  const out = el("div", {class: "find-out", "aria-live": "polite"});
  const card = it => el("article", {class: "card find-card"}, [el("h3", {}, [el("a", {href: it.href, "data-track": "find result: " + it.name, text: it.name})]),
    el("div", {class: "meta", text: [it.label, it.town].filter(Boolean).join(" · ")}), it.line ? el("p", {text: it.line.length > 150 ? it.line.slice(0, 147) + "…" : it.line}) : null,
    it.ext ? el("a", {href: it.ext, target: "_blank", rel: "noopener", text: "Their website"}) : null]);
  const count = (path) => { try { if (window.goatcounter && goatcounter.count) goatcounter.count({path, title: location.pathname, event: true}); } catch (e) {} };
  function run(q, label){
    const r = findLocal(q); out.replaceChildren(); const shown = (label || q).trim(); if (!shown) return;
    count((r.up.length + r.down.length ? "find: " : "find none: ") + shown.toLowerCase().slice(0, 60));
    if (!r.up.length && !r.down.length) {
      out.append(el("div", {class: "card find-none"}, [el("h3", {text: "We don't know one yet"}), el("p", {text: "Nobody has told us where to find “" + shown + "” around here. Ask your neighbors, or if you run a place like that, list it free."}),
        el("div", {class: "btns"}, [el("a", {class: "btn blue", href: "about.html#groups", "data-track": "find: ask the valley", text: "Ask the Valley"}), el("a", {class: "btn ghost", "data-form": "business", href: (C.forms && C.forms.business) || "submit.html", target: "_blank", rel: "noopener", text: "Own one? Get listed free"})])])); return; }
    if (r.up.length) out.append(el("div", {class: "find-group"}, [el("p", {class: "eyebrow", text: "Up here · Ogden Valley"}), el("div", {class: "grid"}, r.up.slice(0, 12).map(card))]));
    else out.append(el("p", {class: "meta", style: "font-size:17px", text: "Nothing up here for that yet. Here's what's down the canyon:"}));
    if (r.down.length) out.append(el("div", {class: "find-group"}, [el("p", {class: "eyebrow", text: "Down the canyon · Weber County"}), el("div", {class: "grid"}, r.down.slice(0, 12).map(card))]));
    out.append(el("p", {class: "fine", text: "Small local businesses only. Know a place we're missing? "}, ));
    out.lastChild.append(el("a", {"data-form": "business", href: (C.forms && C.forms.business) || "submit.html", target: "_blank", rel: "noopener", text: "Tell us"}));
  }
  form.addEventListener("submit", e => { e.preventDefault(); run(input.value); });
  box.classList.add("find-box");
  if (box.dataset.find === "compact") { box.classList.add("compact"); box.replaceChildren(form, chips, out); return; }
  box.replaceChildren(el("p", {class: "eyebrow", text: "Find it local"}), el("h2", {text: "Where can I get…?"}), form, chips, out);
}
(function(){ const st = document.createElement("style"); st.textContent =
  ".find-box{background:var(--card);border:2px solid var(--line);border-radius:16px;padding:18px}.find-box.compact{background:none;border:0;padding:0}.find-box h2{margin:2px 0 12px}.find-form{display:flex;gap:8px;flex-wrap:wrap}.find-form .fsearch{flex:1 1 260px;max-width:none}" +
  ".find-asks{margin:12px 0 4px}.find-group{margin-top:16px}.find-card h3{margin:0;font-size:19px}.find-card h3 a{text-decoration:none}.find-none{margin-top:14px;border-left:6px solid var(--accent,#C2410C)}" +
  "@media (max-width:700px){.find-asks{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;padding-bottom:4px}.find-asks::-webkit-scrollbar{display:none}.find-asks .chip{flex:none;white-space:nowrap}}";
  document.head.appendChild(st);
  document.querySelectorAll("[data-find]").forEach(findBox); })();
window.OVE_SITE = {findLocal, findBox, getArea, setArea, areaCals, areaSwitch, valleyFirst, evTags, eventFilters, monthGrid, C, P, el, $, pruneChips, niceDay, loadJSON, renderMeetings, renderSeason, slug, loadEvents, allEvents, renderEvents, calLinks, moon, loadSky, auroraText, listing, isHome, spotFilter, dayKey, dayName, timeStr, todayKey, TZ, wxIcon, renderForecastStrip};
})();
