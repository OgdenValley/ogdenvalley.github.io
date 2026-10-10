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
    guess:    "https://docs.google.com/forms/d/e/1FAIpQLSeTpZpmY9VttYMGPg39vOm2vL3zSOgfLVOS8nw7L7nqvdsuxQ/viewform",             // Guess the Spot: send a guess
    teach:    "https://docs.google.com/forms/d/e/1FAIpQLSeVO-lREBnt-L37zUwRMVoINcJ2Qxup3MYliT1d0H1olWRMnA/viewform",             // Valley Know-How: teach a class
    guessSubmit: "https://docs.google.com/forms/d/e/1FAIpQLSckQ0TK7yGakhn_6-vi21A929vR0f9UGynX0Am2gHNTXlOUKA/viewform",          // Guess the Spot: send in your own spot
    skyPhoto: "https://docs.google.com/forms/d/e/1FAIpQLScWZEieyhS9uxCdjQH7LXsCLFe-C4uDgUnGZKzsMoAmtKHZ-A/viewform",             // Night sky photo submissions
    skyVote: "https://docs.google.com/forms/d/e/1FAIpQLSdZEtGd2gW33nNf2_6V5JLWKPeJ6oQSQUxbtshH6F-IIBt7FA/viewform",              // Night sky photo of the month vote
    report: "https://docs.google.com/forms/d/e/1FAIpQLSeeDFHHAo4biQ0t4BzoG0TmCzcFgXUc5iBN33pOrKYpmK1Eng/viewform",               // Community reports (fire, road, power) — the form link
    idea: "https://docs.google.com/forms/d/e/1FAIpQLSfQ3ZjeUSNgWmcP0QW44tiP-ljnVChdE_NP303g8vd8lrsMqQ/viewform",                 // Share an idea for the site
    sighting: "https://docs.google.com/forms/d/e/1FAIpQLSdmbKVwUo-KKx4XifkTSGgWztiT34gjjhkY3CG0jp4j-K4kQg/viewform",             // Wildlife & wildflower sightings
    hunt: "https://docs.google.com/forms/d/e/1FAIpQLSctleBxDp0glwI4fpkL1vO1zuoLAfiE-sENEUhkye88dI-_dg/viewform",                 // Scavenger hunt finish photo
    coloring: "https://docs.google.com/forms/d/e/1FAIpQLSeD4c0NYmQnFrgGuGaCRywZvmHWCaKtzZ1a6b1waX6avH5z-w/viewform",             // Finished coloring pages (parents send)
    musician: "https://docs.google.com/forms/d/e/1FAIpQLSdyDj-XkJKas0nj5SSxPfO2LwuQKckG5ZpMgyiekk4mdO6MKQ/viewform",             // Musicians: bio, photo, private events, contact
    recipe: "https://docs.google.com/forms/d/e/1FAIpQLScK353HCsAIb5-ePsKiUxHljdh7s7QZgHwYVz7zQTizzscIAA/viewform",               // Recipe corner: share a recipe
    recipeVote: "https://docs.google.com/forms/d/e/1FAIpQLScTHPG1-8dU02eNJNt9mNqof5M9mL9jiPkathGpUtUhCzUNbw/viewform",           // Recipe corner: vote + "what I changed"
    volunteer: "https://docs.google.com/forms/d/e/1FAIpQLSfOcw941wcno_hT3Caeyw1ScHvxuqeWFc4TOUSbyDb1AJPv0g/viewform",            // Groups: post a volunteer need or drive
    yardsale: "https://docs.google.com/forms/d/e/1FAIpQLSdq-tr_1dUMWJvoD06p9oZAXQWuK5-SnkucboHFwVEFmeZSZg/viewform?usp=pp_url&entry.1817719328=A+yard+sale", // Post a yard sale (event form, opens with "A yard sale" picked)
    cause: "https://docs.google.com/forms/d/e/1FAIpQLSdi8vhF5R7sEwkGeNK5rgS6WIFjHqdnYcX1yyIWgdqWJvFlOA/viewform", // Add a local cause or nonprofit (you check it first)
    tips: "https://docs.google.com/forms/d/e/1FAIpQLSek8NPANF8g-_CeKDuJwNmrGimF60968v1UwVvFTuFGRFb1DA/viewform",                 // Garden + Be Prepared boards (one form, Board question picks which)
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
  recipeVoteForm: "https://docs.google.com/forms/d/e/1FAIpQLScTHPG1-8dU02eNJNt9mNqof5M9mL9jiPkathGpUtUhCzUNbw/viewform?usp=pp_url",
  recipeVoteEntry: "entry.283069220",

  /* --- Featured events ($25 Event spotlight) ---------------------------
     Shown in the "Featured events" row on the home page and Events page.
     Add one { } per featured event (paid, or one we pick to feature for free). It shows starting 7 days
     before "date" and comes off by itself after. "from": "YYYY-MM-DD" starts it sooner.
     "cause: true" also shows it on the Local Causes page (fundraisers).
     "preview: true" hides it from the public; you can still see it at ogdenvalleyevent.com/?preview
     (handy for showing an organizer what they'd get). Delete that line once they pay.
     Upload the flyer or photo to the main folder. */
  featuredEvents: [
    { title: "2nd Annual Monster Dash 5K", date: "2026-10-24", time: "9:00 AM",
      place: "Weber High School", town: "Pleasant View",
      image: "monster-dash-2026.png",
      line: "5K plus a 1-mile kids run. Runners and walkers of all ages, come in costume! 100% of proceeds go to Make-A-Wish Utah for 4-year-old Arie.",
      link: "https://www.canvaqr.com/RGSQ4K6Sel", linkText: "Join or donate",
      from: "2026-10-09", cause: true }
  ],
  eventFeaturePrice: "$25",

  /* --- Local causes (causes.html) ---------------------------------------
     featuredCause: the "id" of the cause shown big at the top. Change it any time (free or paid).
     Each cause: id, name, kind (picks the filter), line, and links. "src" says where the facts came from. */
  featuredCause: "ogden-valley-land-trust",
  causes: [
    { id: "ogden-valley-land-trust", name: "Ogden Valley Land Trust", kind: "Land & open space", town: "Huntsville",
      line: "A local nonprofit that holds voluntary conservation easements, so landowners can protect their land from development while they keep owning it.",
      more: "Local landowners and residents serve as its trustees. It protects several thousand acres in Ogden Valley and nearby, and it depends on donations to look after those easements for good.",
      donate: "https://ogdenvalleylandtrust.org/donate/", site: "https://ogdenvalleylandtrust.org/", facebook: "https://www.facebook.com/OVLandTrust",
      contact: "P.O. Box 412, Huntsville, UT 84317 · 801-971-1852 · ogdenvalleylandtrust@gmail.com", src: "ogdenvalleylandtrust.org" },
    { id: "community-foundation-of-ogden-valley", name: "Community Foundation of Ogden Valley", kind: "Gives to Valley groups", town: "Eden",
      line: "Raises money from local businesses, people and fundraising events, then gives grants to Valley nonprofits and matches gifts to them.",
      more: "On June 4, 2026 it gave 8 grants totaling over $60,000 to Valley groups, its second year of grants.",
      donate: "https://cfovoverdrive.org/", site: "https://cfovoverdrive.org/", contact: "PO Box 684, Eden, UT 84310 · cfovutah@gmail.com", src: "cfovoverdrive.org; Ogden Valley News, June 27, 2026" },
    { id: "eden-valley-trails", name: "Eden Valley Trails", kind: "Trails & outdoors", line: "Builds and maintains a connected trail system in Ogden Valley for every kind of trail user." },
    { id: "ogden-nordic", name: "Ogden Nordic", kind: "Trails & outdoors", line: "Promotes cross-country skiing and builds and maintains the trails in North Fork Park." },
    { id: "trails-foundation-of-northern-utah", name: "Trails Foundation of Northern Utah", kind: "Trails & outdoors", line: "Builds trails for walking, running and riding around Weber County." },
    { id: "back-country-horsemen", name: "Back Country Horsemen", kind: "Trails & outdoors", line: "Volunteers who do trail work that keeps trails open for non-motorized use." },
    { id: "ogden-avalanche", name: "Ogden Avalanche", kind: "Rescue & safety", line: "Started as a place to share backcountry conditions and grew into a group of experienced backcountry users." },
    { id: "great-basin-k9-search-and-rescue", name: "Great Basin K9 Search and Rescue", kind: "Rescue & safety", line: "Trains and certifies search-and-rescue dog teams that help public safety agencies at no cost." },
    { id: "friends-of-mt-ogden", name: "Friends of Mt. Ogden", kind: "Rescue & safety", line: "Training, education and support for the outdoor rescue community. Formerly Northern Wasatch Rescue Professionals.", site: "https://www.friendsofmtogden.org/" },
    { id: "ogden-valley-adaptive-sports", name: "Ogden Valley Adaptive Sports", kind: "Kids, schools & sports", line: "Adaptive ski and snowboard lessons at three local resorts, often free for families." },
    { id: "snowbasin-sports-education-foundation", name: "Snowbasin Sports Education Foundation", kind: "Kids, schools & sports", line: "Ski racing, all-mountain and freestyle programs for young skiers." },
    { id: "ogden-valley-tennis-pickleball", name: "Ogden Valley Tennis & Pickleball", kind: "Kids, schools & sports", line: "Lessons, social play and competition for all ages." },
    { id: "valley-elementary-pto", name: "Valley Elementary PTO", kind: "Kids, schools & sports", line: "Parents organizing learning and fun activities at Valley Elementary." },
    { id: "snowcrest-ptso", name: "Snowcrest PTSO", kind: "Kids, schools & sports", line: "Parents, teachers and students organizing activities at Snowcrest Junior High." },
    { id: "bsa-crossroads-of-the-west", name: "Scouting America (Boy Scouts), Crossroads of the West Council", kind: "Kids, schools & sports", line: "Scouting programs that build character in young people." },
    { id: "mountain-arts-and-music", name: "Mountain Arts and Music", kind: "Arts & music", line: "Gives Valley residents chances to perform, show their work, teach a skill and grow their talents." },
    { id: "wolf-creek-foundation", name: "Wolf Creek Foundation", kind: "Military families", line: "Hosts military families facing a deployment for a free weekend at Wolf Creek Resort." }
  ],
  causesSource: "https://cfovoverdrive.org/our-non-profits-2/",

  /* --- Sponsors (shown on the home page, Events page and Sponsor page) ---
     Add one { } per sponsor. "until" is the last day it shows ("YYYY-MM-DD"); leave it out to keep it up.
     Upload the logo to the main folder. */
  sponsors: [
    { name: "Yes, I Can Fix That", tier: "Valley sponsor", logo: "yes-i-can-fix-that-logo.jpg",
      line: "Veteran-owned handyman serving all of Ogden Valley: drywall, doors, home maintenance and DIY classes.",
      link: "https://icanfixthatut.com", listing: "services.html#yes-i-can-fix-that", story: "spotlight-yes-i-can-fix-that.html",
      note: "Owned by the publisher of this site." }
  ],

  /* --- Visit counts (GoatCounter) ------------------------------------- */
  goatcounter: "ogdenvalleyevent",          // the code you picked, e.g. "ogdenvalley"
  showVisitCount: true,       // show the total visits in the footer

  /* --- Guess the Spot (newest last) ------------------------------------
     { week: "Oct 12", start: "2026-10-12", image: "spot-oct12.jpg", hint: "", by: "ove" | "community",
       credit: "", revealed: false, answer: "", winner: "" }
     start = the photo's first day. On day 7 (6 days later) the answer, the guesses and the random winner
     show by themselves from the guess sheet's Spots tab. Keep "answer" blank here: this file is public. */
  guessSpots: [
    { week: "Oct 8", start: "2026-10-08", image: "spot-2026-10-08.jpg", hint: "Fall color, string lights and a big rocky ridge. Where are these two pumpkinheads standing?", by: "ove", credit: "", revealed: false, answer: "", winner: "" }
  ],

  /* --- Home page photo banner -------------------------------------------
     Used when there is no Photo Contest winner yet. Once a winner is set in contest.lastWinner (Photo contest section below),
     the banner shows the winning photo automatically, credited as "Photo of the Month". */
  heroPhoto: "valley-sunset-huntsville.jpg",
  heroHeadline: "Together in Ogden Valley",
  heroCredit: "Photo: Seth Miller",          // shown small in the bottom-right corner

  /* --- Valley Photos (newest last) ------------------------------------
     { image: "file.jpg", by: "Jen M.", place: "Pineview" | "Eden" | "Liberty" | "Huntsville" | "Ogden Canyon" | "Snowbasin" | "Powder Mountain" | "Nordic Valley",
       date: "2026-10" (year-month, sets the season), caption: "Sunrise over the reservoir" }
     Only add photos the photographer gave permission for. Upload the image to the main folder. */
  valleyPhotos: [
    { image: "valley-moose-snow-deck.jpg", by: "Shauna Miller", place: "Nordic Valley", date: "", caption: "A moose naps in the snow right outside the back door" },
    { image: "valley-sunset-huntsville.jpg", by: "Seth Miller", place: "Huntsville", date: "", caption: "Fire in the sky over the Valley at sunset" },
    { image: "valley-sunrays-seth-miller.jpg", by: "Seth Miller", place: "Huntsville", date: "", caption: "Sun rays break through the clouds over the mountains" }
  ],

  /* --- Then & Now ------------------------------------------------------
     { title: "", then: "then-file.jpg", now: "now-file.jpg", thenYear: "1950s",
       nowYear: "2026", credit: "", source: "" } */
  thenNow: [],

  /* --- Contact -------------------------------------------------------- */
  email: "ogdenvalleyevent@gmail.com",   // the Ogden Valley Gmail address, shown as text
  facebook: "https://www.facebook.com/ogdenvalleyevents",
  instagram: "https://www.instagram.com/ogden_area_information/",

  /* --- Photo contest -------------------------------------------------- */
  contest: {
    month: "October 2026",
    theme: "Fall color and Halloween in the Valley",
    deadline: "October 31",
    lastWinner: null          // { name: "", title: "", image: "photo-...jpg", month: "October 2026" }
                              // The winner also becomes the home page banner photo for the month, with credit.
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
     { id: "short-id", short: "Label under the circle", name: "", url: "https://www.facebook.com/groups/...", about: "" }
     Icons by id: qa, weather, updates, roads, rentals, classifieds, lost, forum (any other id gets a people icon).
     The circles show above the footer on every page, and the full cards show on the About page. */
  facebookGroups: [
    { id: "qa", short: "Questions", name: "Ogden Valley Questions & Answers", url: "https://www.facebook.com/share/g/19Xydvp3Rm/",
      about: "Ask anything about the Valley: who to call, what's open, recommendations and more." },
    { id: "weather", short: "Weather", name: "Ogden Valley Weather Conditions", url: "https://www.facebook.com/share/g/1EE9RSfvq9/",
      about: "Neighbors sharing what the weather is really doing in the Valley: snow totals, wind, storms and ice." },
    { id: "updates", short: "Updates", name: "Weber, Davis & Ogden Valley Updates", url: "https://www.facebook.com/share/g/19Cds7a9Nw/",
      about: "News and updates from across Weber County, Davis County and Ogden Valley." },
    { id: "roads", short: "Road conditions", name: "Weber County Road Conditions", url: "https://www.facebook.com/share/g/18ncycfd9U/",
      about: "Real-time road reports from neighbors: canyon roads, closures, crashes, plowing and slick spots." },
    { id: "rentals", short: "Rentals & real estate", name: "Ogden Valley Rentals & Real Estate", url: "https://www.facebook.com/share/g/19RRmJ2m8f/",
      about: "Long-term rentals, vacation rentals by owner, and homes for sale in the Valley, posted by locals." },
    { id: "classifieds", short: "Classifieds", name: "Ogden Valley Classifieds", url: "https://www.facebook.com/share/g/1EwsJJJtEL/",
      about: "Buy, sell, trade and give away: furniture, gear, vehicles, animals and services from your neighbors." },
    { id: "lost", short: "Lost & found", name: "Ogden Valley Lost & Found (Pets & Items)", url: "https://www.facebook.com/share/g/18UUAxkzJQ/",
      about: "Lost or found a pet, keys, a phone or anything else? Post it here so neighbors can help get it home." },
    { id: "forum", short: "Open forum", name: "Ogden Valley Open Forum (No Rules)", url: "https://www.facebook.com/share/g/1FU9YRNubQ/",
      about: "Say what's on your mind. This group doesn't use our community rules, so join knowing anything goes." }
  ],

  /* --- Started ---------------------------------------------------------- */
  startYear: 2016
};
