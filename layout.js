/* =====================================================================
   SHARED MENU + FOOTER for every page.
   To add or change a menu or footer link, edit it here once; every page updates.
   The menu has 8 headings. Each heading opens a list of its pages, and every
   page in a heading gets a row of tabs at the top linking to the others.
   ===================================================================== */
(function(){
var GROUPS = [
 ["Events", [["events.html","All events"],["weekend.html","This weekend"],["newsletter.html","Weekly newsletter"],["live-music.html","Live music"],["down-the-canyon.html","Down the canyon"],["yard-sales.html","Yard sales"]]],
 ["Eat & Shop", [["restaurants.html","Restaurants"],["farm.html","Farm stands & local food"],["foodtrucks.html","Food trucks"],["open-this-week.html","Who's open this week"]]],
 ["Local", [["businesses.html","Valley businesses"],["services.html","Home services"],["beauty.html","Beauty & wellness"],["artists.html","Local artists"],["stay.html","Places to stay"],["jobs.html","Help wanted"]]],
 ["Outdoors & Roads", [["safety.html","Road, weather & alerts"],["live.html","Live view"],["night-sky.html","Night sky"],["wildlife.html","Wildlife & wildflowers"],["valley-photos.html","Valley photos"]]],
 ["Community Kids", [["kids.html","The Utah Depot"],["depot-story.html","This week's stop"],["station-board.html","Station Board: lessons & teams"],["station-board.html#kid-events","Kid events"],["coloring.html","Holiday Express coloring pages"],["color.html","Paint Car (color online)"],["where-moose.html","Moose Car: Where's Ben?"],["i-spy.html","I Spy Car"],["puzzles.html","Puzzle Car"],["scavenger-hunt.html","Scavenger Hunt Car"],["guess-the-spot.html","Guess the Spot Car"]]],
 ["Community", [["causes.html","Local causes"],["volunteer.html","Volunteer & give back"],["recipes.html","Community Cooking"],["sneak-peek.html","Sneak Peek"],["know-how.html","Valley Know-How classes"],["garden.html","Garden board"],["prepared.html","Be prepared board"],["coming.html","What's coming & ideas"]]],
 ["Fun & Contests", [["fun.html","All fun & contests"],["photo-contest.html","Photo contest"],["guess-the-spot.html","Guess the Spot"],["then-and-now.html","Then & Now"],["time-capsule.html","Valley Time Capsule"],["puzzles.html","Puzzles"]]],
 ["About", [["about.html","About us"],["submit.html","Send an event or listing"],["sponsor.html","Sponsor a spot"],["ten-years.html","10 years"],["rules.html","Community rules"],["terms.html","Terms"],["privacy.html","Privacy"]]]
];
/* pages listed under two headings: which heading they belong to */
var HOME = {"puzzles.html": "Fun & Contests", "guess-the-spot.html": "Fun & Contests"};
/* the tab bar for a heading can be split into labeled rows with short names (the menu above keeps the full names) */
var ROWS = {"Community Kids": [
 ["Ride the train", [["kids.html","The Utah Depot"],["depot-story.html","This week's stop"],["station-board.html","Station Board"],["station-board.html#kid-events","Kid events"]]],
 ["Play", [["where-moose.html","Where's Ben?"],["coloring.html","Coloring"],["color.html","Paint online"],["i-spy.html","I Spy"],["puzzles.html","Puzzles"],["scavenger-hunt.html","Scavenger hunt"],["guess-the-spot.html","Guess the Spot"]]]
]};
var FOOT = "<div class=\"container\">\n  <div class=\"ten\"><img data-logo=\"180\" src=\"logo-10-years-180.png\" alt=\"\" width=\"64\" height=\"64\"><div><b>Ogden Valley Info &amp; Events</b><br><span class=\"fine\">Eden \u00b7 Liberty \u00b7 Huntsville \u00b7 since 2016</span><br><span class=\"fine\" id=\"gc-count\"></span></div></div>\n  <div><h3>Explore</h3><ul><li><a href=\"events.html\">Events</a></li><li><a href=\"yard-sales.html\">Yard sales</a></li><li><a href=\"restaurants.html\">Restaurants</a></li><li><a href=\"businesses.html\">Valley Businesses</a></li><li><a href=\"artists.html\">Local Artists</a></li><li><a href=\"beauty.html\">Beauty &amp; wellness</a></li><li><a href=\"farm.html\">Farm stands &amp; local food</a></li><li><a href=\"foodtrucks.html\">Food trucks</a></li><li><a href=\"services.html\">Home services</a></li><li><a href=\"open-this-week.html\">Who&#39;s open this week</a></li><li><a href=\"jobs.html\">Valley help wanted</a></li><li><a href=\"safety.html\">Road, weather &amp; alerts</a></li><li><a href=\"live.html\">Live view</a></li><li><a href=\"night-sky.html\">Night sky</a></li><li><a href=\"wildlife.html\">Wildlife &amp; wildflowers</a></li><li><a href=\"kids.html\">Community Kids: The Utah Depot</a></li><li><a href=\"station-board.html\">Kids lessons &amp; teams</a></li><li><a href=\"valley-photos.html\">Valley photos</a></li></ul></div>\n  <div><h3>Take part</h3><ul><li><a href=\"submit.html\">Send an event or listing</a></li><li><a href=\"fun.html\">Fun &amp; contests</a></li><li><a href=\"sponsor.html\">Sponsor a spot</a></li><li><a href=\"ten-years.html\">10 years</a></li><li><a href=\"know-how.html\">Valley Know-How classes</a></li><li><a href=\"causes.html\">Local causes</a></li><li><a href=\"volunteer.html\">Volunteer &amp; give back</a></li><li><a href=\"recipes.html\">Community Cooking</a></li><li><a href=\"sneak-peek.html\">Sneak Peek</a></li><li><a href=\"garden.html\">Garden board</a></li><li><a href=\"prepared.html\">Be prepared board</a></li><li><a href=\"coming.html\">What&#39;s coming &amp; ideas</a></li><li><a data-newsletter data-hide-empty href=\"#\">Weekly newsletter</a></li></ul></div>\n  <div><h3>Follow</h3><ul><li><a data-facebook href=\"https://www.facebook.com/ogdenvalleyevents\" target=\"_blank\" rel=\"noopener\">Facebook</a></li><li><a data-instagram data-hide-empty href=\"#\" target=\"_blank\" rel=\"noopener\">Instagram</a></li><li><a href=\"about.html#groups\">Our Facebook groups</a></li><li><a href=\"rules.html\">Community rules</a></li><li><a href=\"terms.html\">Terms</a></li><li><a href=\"privacy.html\">Privacy</a></li></ul>\n  <p class=\"fine\">Event details come from organizers. Check with them before you go.</p></div>\n</div>";
var CSS = ".ng{position:relative}.ng-h{font-family:var(--display);font-weight:600;font-size:15px;color:var(--ink);background:none;border:0;border-radius:8px;padding:8px 9px;cursor:pointer;display:flex;align-items:center;gap:4px}" +
 ".ng-h:hover,.ng.open .ng-h{background:var(--soft)}.ng.here .ng-h{background:var(--navy);color:#fff}.ng-h i{font-style:normal;font-size:11px}" +
 ".ng-d{display:none;position:absolute;left:0;top:100%;z-index:60;min-width:250px;background:var(--card,#fff);border:1px solid var(--line);border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.15);padding:6px}" +
 ".ng:last-of-type .ng-d{left:auto;right:0}.ng.open .ng-d{display:grid}nav.main .ng-d a{display:block;font-size:16px;padding:10px 12px}nav.main .ng-d a[aria-current=page]{background:var(--navy);color:#fff}" +
 "@media (max-width:900px){.ng-h{width:100%;justify-content:space-between;font-size:18px;padding:13px 12px}.ng-d{position:static;box-shadow:none;border:0;border-left:3px solid var(--line);border-radius:0;margin:0 0 6px 12px;min-width:0}nav.main .ng-d a{font-size:17px}}" +
 ".subtabs{background:var(--soft);border-bottom:1px solid var(--line)}.subtabs .container{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding-block:10px}" +
 ".subtabs b{font-family:var(--display);font-size:14px;margin-right:4px}.subtabs a{font-family:var(--display);font-weight:600;font-size:15px;text-decoration:none;color:var(--ink);background:var(--card,#fff);border:1px solid var(--line);border-radius:999px;padding:7px 13px}" +
 ".subtabs a:hover{border-color:var(--accent)}.subtabs a[aria-current=page]{background:var(--navy);border-color:var(--navy);color:#fff}" +
 ".subtabs .container.rows{display:grid;gap:8px}.subtabs .row{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.subtabs .row b{min-width:118px}" +
 "@media (max-width:700px){.subtabs .row{flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:2px}.subtabs .row::-webkit-scrollbar{display:none}.subtabs .row a,.subtabs .row b{flex:none;white-space:nowrap}.subtabs .row b{min-width:0}}" +
 "@media (min-width:760px){.quick{grid-template-columns:repeat(5,minmax(0,1fr))!important}}";
var esc = function(t){ return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;"); };
var page = (location.pathname.split("/").pop() || "index.html");
var mine = null;
GROUPS.forEach(function(g){ g[1].forEach(function(p){ if (p[0] === page && !mine && (!HOME[page] || HOME[page] === g[0])) mine = g; }); });
var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
var nav = document.getElementById("nav");
if (nav) {
  nav.innerHTML = GROUPS.map(function(g, i){
    return "<div class=\"ng" + (g === mine ? " here" : "") + "\"><button type=\"button\" class=\"ng-h\" aria-expanded=\"false\" aria-controls=\"ng" + i + "\">" + esc(g[0]) + " <i aria-hidden=\"true\">▾</i></button>" +
      "<div class=\"ng-d\" id=\"ng" + i + "\">" + g[1].map(function(p){ return "<a href=\"" + p[0] + "\"" + (p[0] === page ? " aria-current=\"page\"" : "") + ">" + esc(p[1]) + "</a>"; }).join("") + "</div></div>";
  }).join("") + "<a href=\"search.html\"" + (page === "search.html" ? " aria-current=\"page\"" : "") + ">Search</a>";
  var heads = nav.querySelectorAll(".ng");
  var closeAll = function(except){ heads.forEach(function(n){ if (n !== except) { n.classList.remove("open"); n.firstChild.setAttribute("aria-expanded","false"); } }); };
  heads.forEach(function(n){ n.firstChild.addEventListener("click", function(ev){ ev.stopPropagation(); var o = !n.classList.contains("open"); closeAll(n); n.classList.toggle("open", o); n.firstChild.setAttribute("aria-expanded", String(o)); }); });
  document.addEventListener("click", function(ev){ if (!nav.contains(ev.target)) closeAll(); });
  document.addEventListener("keydown", function(ev){ if (ev.key === "Escape") closeAll(); });
}
var main = document.getElementById("main");
if (main && mine) {
  var t = document.createElement("nav"); t.className = "subtabs"; t.setAttribute("aria-label", "More in " + mine[0]);
  var tab = function(p){ return "<a href=\"" + p[0] + "\"" + (p[0] === page ? " aria-current=\"page\"" : "") + ">" + esc(p[1]) + "</a>"; };
  if (ROWS[mine[0]]) t.innerHTML = "<div class=\"container rows\">" + ROWS[mine[0]].map(function(r){ return "<div class=\"row\"><b>" + esc(r[0]) + ":</b>" + r[1].map(tab).join("") + "</div>"; }).join("") + "</div>";
  else t.innerHTML = "<div class=\"container\"><b>" + esc(mine[0]) + ":</b>" + mine[1].map(tab).join("") + "</div>";
  main.insertBefore(t, main.firstChild);
}
var f = document.querySelector("footer.site-foot");
if (f) f.innerHTML = FOOT;
/* Posted and updated dates at the bottom of each page (from pagedates.json, kept by the hourly updater) */
if (main && !document.querySelector("[data-page-dates]") && window.fetch) {
  fetch("pagedates.json", {cache: "no-store"}).then(function(r){ return r.ok ? r.json() : null; }).then(function(d){
    var p = d && d.pages && d.pages[page]; if (!p || !p.posted) return;
    var nice = function(s){ var a = String(s).split("-"); return new Date(+a[0], +a[1] - 1, +a[2]).toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"}); };
    var box = document.createElement("div"); box.className = "container page-dates";
    box.setAttribute("style", "padding-block:4px 22px;font-size:15px;color:var(--muted)");
    box.textContent = "Posted " + nice(p.posted) + (p.updated && p.updated !== p.posted ? " \u00b7 Updated " + nice(p.updated) : "");
    main.appendChild(box);
  }).catch(function(){});
}
/* Metricool website stats (added 10/13/26) -- loads on every page that uses this file */
(function(){
  var m = document.createElement("script");
  m.src = "https://tracker.metricool.com/resources/be.js";
  m.onload = function(){ try { beTracker.t({hash: "9e2e390e65cd63fdd2d3b874ee50394c"}); } catch(e){} };
  document.head.appendChild(m);
})();
})();
