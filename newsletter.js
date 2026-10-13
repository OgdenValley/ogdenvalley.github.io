/* =====================================================================
   WEEKLY NEWSLETTER — one builder shared by three places:
     newsletter-draft.html  (private: the copy you paste into Substack, "email" look)
     newsletter.html        (public: this week + past issues, weather as drop-downs)
     update-data.mjs        (saves each Thursday's issue into newsletters.json)
   collect() gathers the week from the site's own data; render() turns it into HTML.
   Nothing here needs editing week to week.
   ===================================================================== */
(function (root) {
  var TZ = "America/Denver";
  var AP = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  var PAGE = {restaurants: ["restaurants.html", "Eat"], businesses: ["businesses.html", "Shop & do"], services: ["services.html", "Home services"], beauty: ["beauty.html", "Beauty & wellness"], farm: ["farm.html", "Farm & local food"], foodtrucks: ["foodtrucks.html", "Food trucks"], artists: ["artists.html", "Local artists"]};

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]; }); }
  function ymd(t) { return new Intl.DateTimeFormat("en-CA", {timeZone: TZ}).format(new Date(t)); }
  function addDays(d, n) { var p = d.split("-").map(Number); return new Date(Date.UTC(p[0], p[1] - 1, p[2] + n)).toISOString().slice(0, 10); }
  function apDay(d) { var p = d.split("-").map(Number), x = new Date(Date.UTC(p[0], p[1] - 1, p[2], 12)); return x.toLocaleDateString("en-US", {weekday: "long", timeZone: "UTC"}) + ", " + AP[p[1] - 1] + " " + p[2]; }
  function apShort(d) { var p = d.split("-").map(Number); return AP[p[1] - 1] + " " + p[2]; }
  function range(a, b) { return apShort(a) + "–" + (a.slice(5, 7) === b.slice(5, 7) ? String(+b.slice(8)) : apShort(b)) + ", " + b.slice(0, 4); }
  function clock(t) { return new Date(t).toLocaleTimeString("en-US", {timeZone: TZ, hour: "numeric", minute: "2-digit"}).replace(":00", "").replace(" AM", " a.m.").replace(" PM", " p.m."); }
  function slug(s) { return String(s).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function clip(s, n) { s = String(s || ""); return s.length > n ? s.slice(0, n - 3) + "…" : s; }

  /* Gather one week. In: C (site settings), P (listings), E (events.json), W (weather.json),
     J (jobs.json), roads (planned road work list), now (ms). Out: plain data that can be saved. */
  function collect(C, P, E, W, J, roads, now) {
    C = C || {}; P = P || {}; now = now || Date.now();
    var today = ymd(now), end = addDays(today, 7), weekAgo = addDays(today, -7);
    var feat = (C.featuredEvents || []).filter(function (f) { return f && f.title && f.date && !f.preview && f.date >= today && (f.from || addDays(f.date, -7)) <= today; })
      .sort(function (a, b) { return a.date < b.date ? -1 : 1; })
      .map(function (f) { return {title: f.title, date: f.date, time: f.time || "", place: f.place || "", town: f.town || "", image: f.image || "", line: f.line || "", link: f.link || "", linkText: f.linkText || ""}; });
    var featTitles = {}; feat.forEach(function (f) { featTitles[f.title.toLowerCase()] = 1; });
    var evs = [];
    ["ov", "weber"].forEach(function (k) { (((E && E.calendars && E.calendars[k]) || {}).events || []).forEach(function (e) { evs.push(e); }); });
    evs = evs.filter(function (e) { return e.e > now && ymd(e.s) <= end && !featTitles[String(e.t || "").toLowerCase()]; }).sort(function (a, b) { return a.s - b.s; });
    var seen = {}, days = [], byDay = {};
    evs.forEach(function (e) { var day = ymd(Math.max(e.s, now)), key = day + "|" + e.t; if (seen[key]) return; seen[key] = 1;
      if (!byDay[day]) { byDay[day] = []; days.push(day); }
      if (byDay[day].length < 12) byDay[day].push({time: e.allDay ? "All day" : clock(e.s), t: e.t, url: e.url || "", loc: String(e.loc || "").split(",")[0]}); });
    var weather = ((W && W.items) || []).filter(function (i) { return i.date && ymd(Date.parse(i.date)) >= weekAgo && ymd(Date.parse(i.date)) <= today; })
      .sort(function (a, b) { return Date.parse(b.date) - Date.parse(a.date); })
      .map(function (i) { return {type: i.type || "weekly", date: i.date, title: i.title || "Weather briefing", summary: i.summary || "", image: i.image || "", alt: i.alt || "", source: i.source || ""}; });
    var fresh = [];
    Object.keys(PAGE).forEach(function (k) { (P[k] || []).forEach(function (p) { if (p.added && p.added >= weekAgo && p.added <= today) fresh.push({name: p.name, page: PAGE[k][0], label: PAGE[k][1], town: p.town || p.area || "", blurb: clip(p.blurb, 160)}); }); });
    var jobs = ((J && J.jobs) || []).filter(function (j) { return !j.expires || j.expires >= today; }).slice(0, 10)
      .map(function (j) { return {title: j.title, business: j.business || "", town: j.town || "", pay: j.pay || ""}; });
    var spot = (C.guessSpots || []).filter(function (s) { return s.start && s.start <= today; }).slice(-1)[0] || null;
    var win = C.contest && C.contest.lastWinner;
    var forms = C.forms || {};
    return {start: today, end: end, made: new Date(now).toISOString(), featured: feat,
      events: days.map(function (d) { return {day: d, items: byDay[d]}; }), weather: weather, roads: roads || [], fresh: fresh, jobs: jobs,
      spot: spot ? {image: spot.image || "", hint: spot.hint || ""} : null,
      winner: win && win.image ? {image: win.image, title: win.title || "", name: win.name || ""} : null,
      sponsors: (C.sponsors || []).filter(function (s) { return s && s.name && (!s.until || s.until >= today); }).map(function (s) { return {name: s.name, link: s.link || "", line: s.line || ""}; }),
      forms: {event: forms.event || "", photo: forms.photo || "", business: forms.business || "", jobs: forms.jobs || "", report: forms.report || ""}};
  }

  /* Road work notices on the Road & Weather page that haven't ended (browser version). */
  function roadsFromHTML(html, today) {
    var out = [];
    if (!html || typeof DOMParser === "undefined") return out;
    var doc = new DOMParser().parseFromString(html, "text/html");
    doc.querySelectorAll('[id^="roadwork"][data-ends]').forEach(function (b) {
      if (b.getAttribute("data-ends") <= today) return;
      var h = b.querySelector("h2"), a = b.querySelector(".alert"), img = b.querySelector("img");
      out.push({title: h ? h.textContent.trim() : "Road work", text: a ? a.textContent.trim() : "", image: img ? img.getAttribute("src") : "", alt: img ? img.getAttribute("alt") || "" : ""});
    });
    return out;
  }

  /* mode "email": newest weather briefing only, full links (for Substack).
     mode "web": every weather briefing that week as drop-downs, newest first and open. */
  function render(d, opt) {
    opt = opt || {}; var web = opt.mode === "web", base = opt.base || "";
    var abs = function (f) { return /^https?:/i.test(f) ? f : base + String(f || "").replace(/^\/+/, ""); };
    var img = function (src, alt) { return src ? '<p><img src="' + esc(abs(src)) + '" alt="' + esc(alt || "") + '" width="600" loading="lazy"></p>' : ""; };
    var out = [], sec = function (title, html, id) { if (html) out.push('<h2' + (id ? ' id="' + id + '"' : "") + ">" + esc(title) + "</h2>" + html); };
    if (!web) {
      out.push('<p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;letter-spacing:2px;color:#2E6DA4;margin:0">OGDEN VALLEY INFO &amp; EVENTS · WEEKLY</p>');
      out.push('<h1 style="font-family:Arial,Helvetica,sans-serif;font-size:30px;color:#10233D;margin:6px 0 4px">This week in Ogden Valley</h1>');
      out.push('<p style="margin:0 0 6px;color:#4F6178">' + esc(range(d.start, d.end)) + " · Eden, Liberty, Huntsville and around Weber County</p>");
    }
    sec("Featured", d.featured.map(function (f) {
      return img(f.image, f.title) + "<h3>" + esc(f.title) + "</h3><p><b>" + esc(apDay(f.date)) + (f.time ? " · " + esc(f.time) : "") + "</b>" + (f.place ? " · " + esc(f.place) : "") + (f.town ? ", " + esc(f.town) : "") + "</p>" +
        (f.line ? "<p>" + esc(f.line) + "</p>" : "") + (f.link ? '<p><a href="' + esc(f.link) + '">' + esc(f.linkText || "Details") + "</a></p>" : ""); }).join(""));
    var ev = d.events.map(function (g) { return "<h3>" + esc(apDay(g.day)) + "</h3><ul>" + g.items.map(function (e) {
      return "<li><b>" + esc(e.time) + "</b> · " + (e.url ? '<a href="' + esc(e.url) + '">' + esc(e.t) + "</a>" : esc(e.t)) + (e.loc ? " · " + esc(e.loc) : "") + "</li>"; }).join("") + "</ul>"; }).join("");
    sec("Events this week", (ev || "<p>No events on the calendar yet for this week.</p>") + '<p><a href="' + abs("events.html") + '">See every event and add the calendars to your phone</a></p>');
    var wx = "";
    var one = function (w) { return img(w.image, w.alt || w.title) + "<p><b>" + esc(w.title) + ".</b> " + esc(w.summary) + "</p>" + (w.source ? '<p style="font-size:14px;color:#4F6178">Source: ' + esc(w.source) + "</p>" : ""); };
    if (web && d.weather.length) wx = d.weather.map(function (w, i) {
      return '<details class="nl-fold"' + (i === 0 ? " open" : "") + "><summary><span class=\"nl-when\">" + (w.type === "update" ? "Update" : "Weekly briefing") + " · " + esc(apShort(ymd(Date.parse(w.date)))) + (i === 0 ? " · newest" : "") + "</span>" + esc(w.title) + "</summary>" + one(w) + "</details>"; }).join("");
    else if (d.weather.length) wx = one(d.weather[0]);
    sec("Weather", (wx || "<p>No weather briefing yet this week.</p>") + '<p><a href="' + abs("safety.html#briefings") + '">See every weather update, the live forecast and road conditions</a></p>', "weather");
    sec("Road work", d.roads.length ? d.roads.map(function (r) { return img(r.image, r.alt) + "<h3>" + esc(r.title) + "</h3>" + (r.text ? "<p>" + esc(r.text) + "</p>" : ""); }).join("") +
      '<p><a href="' + abs("safety.html") + '">All the details on our Road &amp; Weather page</a></p>' : "");
    sec("New on the site", d.fresh.length ? "<ul>" + d.fresh.map(function (p) { return '<li><a href="' + abs(p.page) + "#" + slug(p.name) + '"><b>' + esc(p.name) + "</b></a> · " + esc(p.label) + (p.town ? " · " + esc(p.town) : "") + (p.blurb ? "<br>" + esc(p.blurb) : "") + "</li>"; }).join("") + "</ul>" : "");
    sec("Help wanted in the Valley", d.jobs.length ? "<ul>" + d.jobs.map(function (j) { return "<li><b>" + esc(j.title) + "</b>" + (j.business ? " · " + esc(j.business) : "") + (j.town ? " · " + esc(j.town) : "") + (j.pay ? " · " + esc(j.pay) : "") + "</li>"; }).join("") + '</ul><p><a href="' + abs("jobs.html") + '">See the jobs and how to apply</a></p>' : "");
    if (d.spot) sec("Guess the Spot", img(d.spot.image, "Guess the Spot photo") + (d.spot.hint ? "<p>" + esc(d.spot.hint) + "</p>" : "") + '<p><a href="' + abs("guess-the-spot.html") + '">Make your guess</a></p>');
    if (d.winner) sec("Photo of the month", img(d.winner.image, d.winner.title || "Photo of the month") + "<p>" + esc(d.winner.title) + (d.winner.name ? " · Photo by " + esc(d.winner.name) : "") + "</p>");
    sec(d.sponsors.length > 1 ? "Thanks to our sponsors" : "Thanks to our sponsor", d.sponsors.map(function (s) { return "<p>" + (s.link ? '<a href="' + esc(s.link) + '"><b>' + esc(s.name) + "</b></a>" : "<b>" + esc(s.name) + "</b>") + (s.line ? ": " + esc(s.line) : "") + "</p>"; }).join(""));
    var ask = [["event", "Post your event, free"], ["photo", "Enter the monthly photo contest"], ["business", "Get your Valley business listed, free"], ["jobs", "Post a Valley job, free"], ["report", "Send a weather photo or local report"]]
      .filter(function (x) { return d.forms[x[0]]; }).map(function (x) { return '<li><a href="' + esc(d.forms[x[0]]) + '">' + esc(x[1]) + "</a></li>"; }).join("");
    sec("Be part of it", ask ? "<ul>" + ask + "</ul>" : "");
    if (!web) out.push('<p style="font-size:14px;color:#4F6178;margin-top:24px">Ogden Valley Info &amp; Events · local support for Eden, Liberty and Huntsville since 2016 · <a href="' + abs("") + '">ogdenvalleyevent.com</a> · <a href="' + abs("newsletter.html") + '">Read this on the web</a></p>');
    return out.join("\n");
  }

  var api = {collect: collect, render: render, roadsFromHTML: roadsFromHTML, range: range, ymd: ymd, addDays: addDays};
  root.OVE_NL = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
