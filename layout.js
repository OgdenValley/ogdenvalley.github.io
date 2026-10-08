/* =====================================================================
   SHARED MENU + FOOTER for every page.
   To add or change a menu or footer link, edit it here once; every page updates.
   ===================================================================== */
(function(){
var NAV = "<a href=\"events.html\">Events</a><a href=\"restaurants.html\">Eat &amp; Shop</a><a href=\"artists.html\">Artists</a><a href=\"safety.html\">Safety</a><a href=\"live.html\">Live View</a><a href=\"night-sky.html\">Night Sky</a><a href=\"fun.html\">Fun &amp; Contests</a><a href=\"about.html\">About</a><a href=\"search.html\">Search</a>";
var FOOT = "<div class=\"container\">\n  <div class=\"ten\"><img data-logo=\"180\" src=\"logo-10-years-180.png\" alt=\"\" width=\"64\" height=\"64\"><div><b>Ogden Valley Info &amp; Events</b><br><span class=\"fine\">Eden \u00b7 Liberty \u00b7 Huntsville \u00b7 since 2016</span><br><span class=\"fine\" id=\"gc-count\"></span></div></div>\n  <div><h3>Explore</h3><ul><li><a href=\"events.html\">Events</a></li><li><a href=\"restaurants.html\">Restaurants</a></li><li><a href=\"businesses.html\">Valley Businesses</a></li><li><a href=\"artists.html\">Local Artists</a></li><li><a href=\"beauty.html\">Beauty &amp; wellness</a></li><li><a href=\"farm.html\">Farm stands &amp; local food</a></li><li><a href=\"foodtrucks.html\">Food trucks</a></li><li><a href=\"services.html\">Home services</a></li><li><a href=\"open-this-week.html\">Who&#39;s open this week</a></li><li><a href=\"jobs.html\">Valley help wanted</a></li><li><a href=\"safety.html\">Safety &amp; alerts</a></li><li><a href=\"live.html\">Live view</a></li><li><a href=\"night-sky.html\">Night sky</a></li><li><a href=\"valley-photos.html\">Valley photos</a></li></ul></div>\n  <div><h3>Take part</h3><ul><li><a href=\"submit.html\">Send an event or listing</a></li><li><a href=\"fun.html\">Fun &amp; contests</a></li><li><a href=\"sponsor.html\">Sponsor a spot</a></li><li><a href=\"ten-years.html\">10 years</a></li><li><a href=\"know-how.html\">Valley Know-How classes</a></li><li><a href=\"volunteer.html\">Volunteer &amp; give back</a></li><li><a href=\"recipes.html\">Recipe corner</a></li><li><a href=\"garden.html\">Garden board</a></li><li><a href=\"prepared.html\">Be prepared board</a></li><li><a href=\"coming.html\">What&#39;s coming &amp; ideas</a></li><li><a data-newsletter data-hide-empty href=\"#\">Weekly newsletter</a></li></ul></div>\n  <div><h3>Follow</h3><ul><li><a data-facebook href=\"https://www.facebook.com/ogdenvalleyevents\" target=\"_blank\" rel=\"noopener\">Facebook</a></li><li><a data-instagram data-hide-empty href=\"#\" target=\"_blank\" rel=\"noopener\">Instagram</a></li><li><a href=\"about.html#groups\">Our Facebook groups</a></li><li><a href=\"rules.html\">Community rules</a></li><li><a href=\"terms.html\">Terms</a></li><li><a href=\"privacy.html\">Privacy</a></li></ul>\n  <p class=\"fine\">Event details come from organizers. Check with them before you go.</p></div>\n</div>";
var CURRENT = {
 "about.html": "about.html",
 "artists.html": "artists.html",
 "beauty.html": "restaurants.html",
 "businesses.html": "restaurants.html",
 "color.html": "fun.html",
 "coloring.html": "fun.html",
 "events.html": "events.html",
 "farm.html": "restaurants.html",
 "foodtrucks.html": "restaurants.html",
 "fun.html": "fun.html",
 "guess-the-spot.html": "fun.html",
 "i-spy.html": "fun.html",
 "live-music.html": "events.html",
 "live.html": "live.html",
 "night-sky.html": "night-sky.html",
 "photo-contest.html": "fun.html",
 "puzzles.html": "fun.html",
 "recipes.html": "fun.html",
 "restaurants.html": "restaurants.html",
 "safety.html": "safety.html",
 "scavenger-hunt.html": "fun.html",
 "search.html": "search.html",
 "services.html": "restaurants.html",
 "then-and-now.html": "fun.html",
 "weekend.html": "events.html",
 "wildlife.html": "fun.html"
};
var page = (location.pathname.split("/").pop() || "index.html");
var nav = document.getElementById("nav");
if (nav) { nav.innerHTML = NAV; var c = CURRENT[page]; if (c) { var a = nav.querySelector('a[href="' + c + '"]'); if (a) a.setAttribute("aria-current", "page"); } }
var f = document.querySelector("footer.site-foot");
if (f) f.innerHTML = FOOT;
})();
