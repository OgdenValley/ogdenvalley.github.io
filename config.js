/* =====================================================================
   OGDEN VALLEY INFO & EVENTS — SITE SETTINGS
   This is the one file to change when something needs updating.
   Anything left as "" simply stays hidden on the site until it is filled in.
   ===================================================================== */
window.OVE = {

  /* --- Google Calendars (on the Ogden Valley Gmail) ---------------------
     Paste each calendar's "Calendar ID" (Google Calendar → Settings →
     the calendar → Integrate calendar). It looks like
     abc123@group.calendar.google.com
     Also add the same two IDs to calendars.json so the site can
     pull the events in automatically every hour. */
  calendars: {
    ov:    { name: "Ogden Valley",  id: "ogdenvalleyevent@gmail.com" },
    weber: { name: "Weber County", id: "7dd09b529f61c31fbf512699af140b642931413a74f0613f52725dca594f30f1@group.calendar.google.com" }
  },

  /* --- Weekly newsletter (new Substack) ------------------------------- */
  newsletterUrl: "https://forms.gle/53PL3cKy3v219VpcA", // sign-up form for now; swap for the Substack link later

  /* --- Google Forms --------------------------------------------------- */
  forms: {
    event:    "https://docs.google.com/forms/d/e/1FAIpQLSdq-tr_1dUMWJvoD06p9oZAXQWuK5-SnkucboHFwVEFmeZSZg/viewform",             // Submit an event
    business: "https://docs.google.com/forms/d/e/1FAIpQLSc-jh9kRzlErQ1jv698LT4prqLnCWFkdoJy6Bj5KcUeCZCL7A/viewform", // List a business or restaurant
    artist:   "https://docs.google.com/forms/d/e/1FAIpQLSeT9RH4wEL6lcusqhtEeubo62Ypz2kRLDNK5Uqm55OO_cDCKQ/viewform",             // Be listed as a local artist
    photo:    "https://docs.google.com/forms/d/e/1FAIpQLSe9nppeo6jqEILr9SLywvxZ3jgXA-7V0RiaQ3DSvzk0VCst8A/viewform",             // Photo contest entry
    sponsor:  "https://docs.google.com/forms/d/e/1FAIpQLScl8tGaQgMKnVOo2ocL6tqrMPACLtl36UXm_CJIrrg39ix-vQ/viewform", // Sponsor a spot
    guess:    "",             // Guess the Spot: send a guess
    guessSubmit: "",          // Guess the Spot: send in your own spot
    skyPhoto: "",             // Night sky photo submissions
    skyVote: "",              // Night sky photo of the month vote
    report: "https://docs.google.com/forms/d/e/1FAIpQLSeeDFHHAo4biQ0t4BzoG0TmCzcFgXUc5iBN33pOrKYpmK1Eng/viewform",               // Community reports (fire, road, power) — the form link
    idea: "",                 // Share an idea for the site
    sighting: "",             // Wildlife & wildflower sightings
    hunt: "",                 // Scavenger hunt finish photo
    coloring: "",             // Finished coloring pages (parents send)
    musician: "",             // Musicians: bio, photo, private events, contact
    recipe: "",               // Recipe corner: share a recipe
    recipeVote: "",           // Recipe corner: vote + "what I changed"
    volunteer: "",            // Groups: post a volunteer need or drive
    tips: "",                 // Garden + Be Prepared boards (one form, Board question picks which)
    jobs: "https://docs.google.com/forms/d/e/1FAIpQLScOzyUB6XfbZWbwNCMR1FIAjCyWWt-aQFQSGKN2pR5YJvtwkw/viewform", // Help wanted: post a Valley job
    update: "https://docs.google.com/forms/d/e/1FAIpQLSfSL4w4MmyTMJyi62Rd4icPvaIdLejnDfsF_9a67BvjhzPK_A/viewform" // Listing updates (no sign-in form): hours changed, closed, moved, or a place we're missing
  },

  /* --- Who's open this week ------------------------------------------
     The date the open/closed list was last checked, "YYYY-MM-DD". */
  weekChecked: "",

  /* --- Reviews (Google Form) -------------------------------------------
     reviewForm: the form's link ending in /viewform
     reviewEntry: the "entry.123456" code for the Business question */
  reviewForm: "https://docs.google.com/forms/d/e/1FAIpQLSeTVfz5wqLAu6f15SJrluiMaY6CZZyO8l_0epaBnbhf5z0k7Q/viewform",
  reviewEntry: "",

  /* --- Recipe vote prefill (optional, same idea as reviews) ------------
     recipeVoteForm: the vote form's link ending in /viewform
     recipeVoteEntry: the "entry.123456" code for the Recipe number question */
  recipeVoteForm: "",
  recipeVoteEntry: "",

  /* --- Visit counts (GoatCounter) ------------------------------------- */
  goatcounter: "",            // the code you picked, e.g. "ogdenvalley"
  showVisitCount: true,       // show the total visits in the footer

  /* --- Guess the Spot (newest last) ------------------------------------
     { week: "Oct 12", image: "spot-oct12.jpg", hint: "", by: "ove" | "community",
       credit: "", revealed: false, answer: "", winner: "" } */
  guessSpots: [],

  /* --- Then & Now ------------------------------------------------------
     { title: "", then: "then-file.jpg", now: "now-file.jpg", thenYear: "1950s",
       nowYear: "2026", credit: "", source: "" } */
  thenNow: [],

  /* --- Contact -------------------------------------------------------- */
  email: "ogdenvalleyevent@gmail.com",   // the Ogden Valley Gmail address, shown as text
  facebook: "https://www.facebook.com/ogdenvalleyevents",
  instagram: "",

  /* --- Photo contest -------------------------------------------------- */
  contest: {
    month: "October 2026",
    theme: "Fall color and Halloween in the Valley",
    deadline: "October 31",
    lastWinner: null          // { name: "", title: "", image: "photo-...jpg" }
  },

  /* --- Features (fill in each week / month) --------------------------- */
  businessOfWeek: null,       // { name: "", town: "Eden", blurb: "", link: "" }
  artistOfMonth: null,        // { name: "", medium: "", town: "", blurb: "", link: "" }

  /* --- Night sky photos (newest last) --------------------------------
     { image: "sky-pineview-milkyway.jpg", title: "Milky Way over Pineview",
       place: "Pineview", date: "Oct 2026", by: "Jane D." } */
  skyPhotos: [
    { image: "sky-logan-peak-moonrise-1.jpg", title: "Moonrise behind Logan Peak", place: "Logan", date: "Sept. 26, 2026", by: "Jim Brown" },
    { image: "sky-logan-peak-moonrise-2.jpg", title: "Full moon over Logan Peak", place: "Logan", date: "Sept. 26, 2026", by: "Jim Brown" }
  ],

  /* --- Coloring pages (change each month) ---------------------------- */
  coloringMonth: "October 2026",
  coloringPages: [
    { file: "coloring-moose-ghost.svg", title: "A moose dressed as a ghost" },
    { file: "coloring-monster-pumpkins.svg", title: "A friendly monster at the pumpkin patch" },
    { file: "coloring-owl-witch.svg", title: "Owl is ready for trick-or-treat" },
    { file: "coloring-bear-pumpkin.svg", title: "Bear carves a jack-o'-lantern" }
  ],

  /* --- Puzzles: word searches -------------------------------------------
     level: "easy" (10x10, across and down), "medium" (12x12, adds diagonals),
     "hard" (15x15, every direction, even backwards). Words: letters only. */
  wordSearches: [
    { title: "Valley critters & fun", level: "easy", words: ["MOOSE","DEER","OWL","BEAR","FOX","SKI","LAKE","BOAT","HIKE","SNOW"] },
    { title: "Fall in the Valley", level: "medium", words: ["PUMPKIN","GHOST","CANDY","COSTUME","HAYRIDE","CIDER","HARVEST","LEAVES","APPLES","CORNMAZE","SCARECROW","MOON"] },
    { title: "Ogden Valley", level: "medium", words: ["EDEN","HUNTSVILLE","LIBERTY","PINEVIEW","SNOWBASIN","POWDER","NORDIC","WASATCH","ASPEN","TRAIL","MOOSE"] },
    { title: "Utah: the Beehive State", level: "hard", words: ["BEEHIVE","ARCHES","ZION","BRYCE","CANYONLANDS","CAPITOLREEF","WASATCH","BONNEVILLE","PROMONTORY","SEGOLILY","TOPAZ","MOAB","UINTA","COPPER","UTAHRAPTOR"] }
  ],

  /* --- Puzzles: art jigsaws (only with the artist's OK) -----------------
     { image: "file.jpg" or Drive thumbnail link, title: "", artist: "", medium: "",
       bio: "", link: "their website", listing: "Name on the Artists page",
       artistPhoto: "" }   The first one is a practice puzzle. */
  jigsaw: [
    { image: "logo-10-years-halloween-512.png", title: "Our 10-year Halloween logo", artist: "Ogden Valley Info & Events",
      bio: "This one is our practice puzzle. Soon you'll find puzzles made from paintings and photos by Valley artists here, and finishing one shows you the artist's story and where to see more of their work.",
      link: "artists.html" }
  ],

  /* --- Wildlife watch list (checked off automatically from sightings) - */
  watchList: [
    { name: "Moose" }, { name: "Elk" }, { name: "Mule deer", match: "deer" }, { name: "Red fox", match: "fox" },
    { name: "Coyote" }, { name: "Beaver" }, { name: "Porcupine" }, { name: "Yellow-bellied marmot", match: "marmot" },
    { name: "Bald eagle", match: "bald eagle", when: "winter" }, { name: "Golden eagle", match: "golden eagle" },
    { name: "Osprey" }, { name: "Great blue heron", match: "heron" }, { name: "Sandhill crane", match: "crane" },
    { name: "Mountain bluebird", match: "bluebird" }, { name: "Black-billed magpie", match: "magpie" },
    { name: "Arrowleaf balsamroot", match: "balsamroot", when: "spring" }, { name: "Indian paintbrush", match: "paintbrush" },
    { name: "Lupine" }, { name: "Sego lily", match: "sego", when: "summer" }, { name: "Columbine" },
    { name: "Fall aspens", match: "aspen", when: "fall" }
  ],

  /* --- Scavenger hunt (change each month) ------------------------------ */
  hunt: {
    month: "October 2026",
    title: "Fall in the Valley hunt",
    items: [
      { find: "A tree with red or orange leaves" },
      { find: "A pumpkin on a porch or at a farm stand", hint: "Look, don't touch: it belongs to someone." },
      { find: "A view of Pineview Reservoir" },
      { find: "A horse, cow or sheep in a field", hint: "Stay on the road side of the fence." },
      { find: "A scarecrow or Halloween decoration" },
      { find: "Snow on a mountain top" },
      { find: "A bird of prey (hawk or eagle) flying" },
      { find: "Something yellow at a local business" },
      { find: "The moon in the daytime" },
      { find: "A trail sign at a trailhead" }
    ]
  },

  /* --- Facebook groups you run (shown on the About page) -------------
     { name: "", url: "https://www.facebook.com/groups/...", about: "" } */
  facebookGroups: [],

  /* --- Started ---------------------------------------------------------- */
  startYear: 2016
};
