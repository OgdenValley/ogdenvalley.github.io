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
  newsletterUrl: "https://ogdenvallleyevent.substack.com/subscribe", // the Ogden Valley Substack (three l's in "vallley")

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
    recipe: "https://docs.google.com/forms/d/e/1FAIpQLScK353HCsAIb5-ePsKiUxHljdh7s7QZgHwYVz7zQTizzscIAA/viewform",               // Community Cooking: share a recipe
    recipeVote: "https://docs.google.com/forms/d/e/1FAIpQLScTHPG1-8dU02eNJNt9mNqof5M9mL9jiPkathGpUtUhCzUNbw/viewform",           // Community Cooking: vote + "what I changed"
    volunteer: "https://docs.google.com/forms/d/e/1FAIpQLSfOcw941wcno_hT3Caeyw1ScHvxuqeWFc4TOUSbyDb1AJPv0g/viewform",            // Groups: post a volunteer need or drive
    yardsale: "https://docs.google.com/forms/d/e/1FAIpQLSdq-tr_1dUMWJvoD06p9oZAXQWuK5-SnkucboHFwVEFmeZSZg/viewform?usp=pp_url&entry.1817719328=A+yard+sale", // Post a yard sale (event form, opens with "A yard sale" picked)
    cause: "https://docs.google.com/forms/d/e/1FAIpQLSdi8vhF5R7sEwkGeNK5rgS6WIFjHqdnYcX1yyIWgdqWJvFlOA/viewform", // Add a local cause or nonprofit (you check it first)
    tips: "https://docs.google.com/forms/d/e/1FAIpQLSek8NPANF8g-_CeKDuJwNmrGimF60968v1UwVvFTuFGRFb1DA/viewform",                 // Garden + Be Prepared boards (one form, Board question picks which)
    jobs: "https://docs.google.com/forms/d/e/1FAIpQLScOzyUB6XfbZWbwNCMR1FIAjCyWWt-aQFQSGKN2pR5YJvtwkw/viewform", // Help wanted: post a Valley job
    update: "https://docs.google.com/forms/d/e/1FAIpQLSfSL4w4MmyTMJyi62Rd4icPvaIdLejnDfsF_9a67BvjhzPK_A/viewform", // Listing updates (no sign-in form): hours changed, closed, moved, or a place we're missing
    sneakPeek: "https://docs.google.com/forms/d/e/1FAIpQLSc_AC87qBe5wQWEfdjgSs8nn-Mw71zlxoRgRWTxCneNF_t_ug/viewform", // Sneak Peek request (terms gate first)
    cookWithUs: "https://docs.google.com/forms/d/e/1FAIpQLSeW6D2xYWV9MpRkNyQcscBByrxmcZmJuBve4A0XGS8GizpasA/viewform" // Community Cooking: Cook With Us request (terms gate first)
  },

  /* --- Community Kids page (kids.html) ---------------------------------
     Lessons, classes, teams and clubs kids can join. Each one was checked on
     its own official website in October 2026 ("checked" is the page read).
     where: "valley" = in Ogden Valley, "weber" = nearby in Weber County.
     Groups from the Local Causes list marked "Kids, schools & sports" also show
     on the Kids page by themselves, so they are not repeated here.
     Town only. Organizations and businesses only, never a private home. */
  kidsChecked: "2026-10-18",
  kidsList: [
    { name: "Snowbasin youth ski & snowboard lessons", group: "lessons", kind: "Skiing & snowboarding", where: "valley", town: "Huntsville", ages: "3-12", season: "Winter", line: "Daily lessons grouped by age: Mini Cubs (3-4), Cubs (4-6) and Bears (7-12).", url: "https://snowbasin.com/Lessons/Youth-Lessons" },
    { name: "Snowbasin seasonal kids programs", group: "lessons", kind: "Skiing & snowboarding", where: "valley", town: "Huntsville", ages: "3-12", season: "Winter 2026-27", line: "Four-week weekend sessions (Future Busters, Little Busters, Basin Busters) where kids ski with the same program each week.", url: "https://snowbasin.com/Lessons/Youth-Lessons" },
    { name: "Snowbasin Learn & Earn", group: "lessons", kind: "Skiing & snowboarding", where: "valley", town: "Huntsville", ages: "", season: "Winter 2026-27", line: "A three-year beginner program with savings on gear, lessons and a season pass.", url: "https://www.snowbasin.com/lessons-rentals" },
    { name: "Powder Mountain kids ski lessons", group: "lessons", kind: "Skiing & snowboarding", where: "valley", town: "Eden", ages: "3-12", season: "Winter", line: "Full-day group lessons for ages 5-12, night first-timer lessons for 7-12, and private lessons for ages 3-4.", url: "https://powdermountain.com/lessons/winter" },
    { name: "Powder Mountain Kids Ski Free", group: "lessons", kind: "Skiing & snowboarding", where: "valley", town: "Eden", ages: "12 and under", season: "Winter 2026-27", line: "Kids 6 and under ski free, and kids 12 and under get a free season pass with an adult pass.", url: "https://powdermountain.com/kids-ski-free" },
    { name: "Nordic Valley kids lessons", group: "lessons", kind: "Skiing & snowboarding", where: "valley", town: "Eden", ages: "8-18", season: "Winter", line: "Two-hour and full-day ski and snowboard lessons for kids and teens.", url: "https://www.nordicvalley.ski/childrens-group-lessons/" },
    { name: "Nordic Valley 8-week kids program", group: "lessons", kind: "Skiing & snowboarding", where: "valley", town: "Eden", ages: "8-16", season: "Winter, Sundays", line: "Eight Sunday lessons that help beginner and intermediate kids reach the next level.", url: "https://www.nordicvalley.ski/8-week-kids-ski-program/" },
    { name: "Ogden Nordic Junior Program", group: "lessons", kind: "Cross-country skiing", where: "valley", town: "Liberty", ages: "8-18", season: "Winter (Jan.-Feb.)", line: "Cross-country ski classes at North Fork Park, from first-timers to advanced skate and classic.", url: "https://www.ogdennordic.com/junior-program" },
    { name: "Ogden Valley Adaptive Sports, winter", group: "lessons", kind: "Adaptive sports", where: "valley", town: "Ogden Valley", ages: "All ages", season: "Winter", line: "Adaptive ski and snowboard lessons with special equipment at Snowbasin, Powder Mountain and Nordic Valley.", url: "https://ogdenvalleyadaptive.org/" },
    { name: "Ogden Valley Adaptive Sports, summer", group: "lessons", kind: "Adaptive sports", where: "weber", town: "Ogden", ages: "Cycling and kayaking 8+", season: "Summer", line: "Adaptive cycling, kayaking, indoor climbing and hiking for people with disabilities.", url: "https://ogdenvalleyadaptive.org/summer-programs/" },
    { name: "Ogden Valley Tennis & Pickleball youth tennis", group: "lessons", kind: "Tennis & pickleball", where: "valley", town: "Eden", ages: "5-13, plus a 14+ group", season: "Summer (June-July)", line: "Small-group tennis lessons at the Snowcrest Jr. High courts: Little Aces, Court Crew and Junior Rally.", url: "https://ogdenvalleytennis.blogspot.com/" },
    { name: "Ogden City swim lessons", group: "lessons", kind: "Swim lessons", where: "weber", town: "Ogden", ages: "6 months-17 years", season: "Year-round, monthly", line: "Swim lessons from Baby & Me through Teen Swimming at the Marshall N. White Center.", url: "https://www.ogdencity.gov/722/Swimming-Lessons" },
    { name: "Ogden Nature Center summer camps", group: "lessons", kind: "Camps", where: "weber", town: "Ogden", ages: "2-16", season: "Summer (June-Aug.)", line: "Nature camps from toddler programs to week-long camps, plus Volunteens for ages 13-16.", url: "https://www.ogdennaturecenter.org/summer-camps" },
    { name: "Imagine Music Huntsville", group: "lessons", kind: "Music lessons", where: "valley", town: "Huntsville", ages: "Kids, teens & adults", season: "Year-round", line: "Guitar, piano, voice, drums, violin, ukulele and more at the Historic Old Town Hall. Ask about openings for your instrument.", url: "https://www.imaginemusicogden.com/imagine-music-huntsville" },
    { name: "Weber County Library, Ogden Valley Branch", group: "groups", kind: "Library", where: "valley", town: "Huntsville", ages: "0-12 for Book Bundles", season: "Year-round", line: "Book Bundles: staff pick 5-10 books for your child's reading level, in English or Spanish.", url: "https://www.weberpl.lib.ut.us/locations-and-hours/ogden-valley-branch" },
    { name: "Powder Mountain freeride team", group: "groups", kind: "Ski teams", where: "valley", town: "Eden", ages: "", season: "Winter 2026-27", line: "A team where young skiers get coaching to build their skills and compete.", url: "https://powdermountain.com/kids-ski-free" },
    { name: "4-H Hoofprints horse club", group: "groups", kind: "4-H", where: "valley", town: "Eden", ages: "Grades K-12", season: "Year-round", line: "A Weber County 4-H horse club in Eden where kids work on a project horse.", url: "https://extension.usu.edu/weber/4h/clubs" },
    { name: "Weber County 4-H (USU Extension)", group: "groups", kind: "4-H", where: "weber", town: "Ogden", ages: "", season: "Year-round", line: "4-H clubs in horses, livestock, shooting sports, STEM, cooking and sewing, and leadership.", url: "https://extension.usu.edu/weber/4h" },
    { name: "Weber MTB Team", group: "groups", kind: "Sports teams", where: "valley", town: "Ogden Valley", ages: "Grades 7-12", season: "League season", line: "Youth mountain bike team for students in the Weber High area, including Snowcrest Jr. High.", url: "https://www.webermtb.org/" },
    { name: "Weber County Recreation youth basketball", group: "groups", kind: "Sports teams", where: "weber", town: "Ogden", ages: "Grades 3-9", season: "September-June", line: "Boys and girls basketball leagues played at the Weber County Fairgrounds.", url: "https://www.webercountyutah.gov/County_Recreation/" }
  ],

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
      link: "https://icanfixthatut.com", listing: "services.html#yes-i-can-fix-that", story: "spotlight-yes-i-can-fix-that.html" }
  ],

  /* --- Visit counts (GoatCounter) ------------------------------------- */
  goatcounter: "ove",          // the code you picked, e.g. "ogdenvalley"
  showVisitCount: true,       // show the total visits in the footer
  visitCountMin: 300,         // the footer count stays hidden until the site passes this many visits

  /* --- Guess the Spot (newest last) ------------------------------------
     { week: "Oct 12", start: "2026-10-12", image: "spot-oct12.jpg", hint: "", by: "ove" | "community",
       credit: "", revealed: false, answer: "", winner: "" }
     start = the photo's first day. On day 7 (6 days later) the answer, the guesses and the random winner
     show by themselves from the guess sheet's Spots tab. Keep "answer" blank here: this file is public. */
  guessSpots: [
    { week: "Oct 8", start: "2026-10-08", image: "spot-2026-10-08.jpg", answerImage: "spot-2026-10-08-answer.jpg", hint: "Fall color, string lights and a big rocky ridge. Where are these two pumpkinheads standing?", by: "ove", credit: "", revealed: true, answer: "The Oaks in Ogden Canyon", winner: "" },
    { week: "Oct 15", start: "2026-10-15", image: "spot-2026-10-15.jpg", hint: "This little guy has a front-row seat for fall color. Where in the Valley is he sitting?", by: "ove", credit: "", revealed: false, answer: "", winner: "" }
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
    { image: "valley-sunrays-seth-miller.jpg", by: "Seth Miller", place: "Huntsville", date: "", caption: "Sun rays break through the clouds over the mountains" },
    { image: "valley-red-squirrel-feeder.jpg", by: "Shauna Miller", place: "", date: "2026-10", caption: "A red squirrel checks out who's watching from the feeder" },
    { image: "valley-storm-rainbow-julia-rae.jpg", by: "Julia Rae", place: "Ogden Valley City", date: "2026-10", caption: "A rainbow peeks through the storm clouds over the mountains" },
    { image: "valley-sunset-trees-julia-rae.jpg", by: "Julia Rae", place: "Ogden Valley City", date: "2026-10", caption: "An orange sunset glows behind the pines and fall leaves" },
    { image: "valley-sculpture-aspens-sean-smith.jpg", by: "Sean W. Smith", place: "", date: "2026-10", caption: "A giant sculpture rises out of the golden aspens" },
    { image: "valley-fall-aspens-sean-smith.jpg", by: "Sean W. Smith", place: "", date: "2026-10", caption: "Golden aspens and dark pines on the mountainside" },
    { image: "valley-pineview-from-above-sean-smith.jpg", by: "Sean W. Smith", place: "Pineview", date: "", caption: "Pineview Reservoir and the Valley from high above" },
    { image: "valley-great-horned-owl-jim-brown.jpg", by: "Jim Brown", place: "", date: "2026-10", caption: "A great horned owl keeps watch from a weathered snag" },
    { image: "valley-ben-lomond-cloud-cap-sara-barney.jpg", by: "Sara Barney", place: "", date: "2026-10", caption: "Ben Lomond Peak wears a cloud cap after the rain" },
    { image: "neighbor-2026-09-lani-ogilvie-rainbow.jpg", by: "Lani Ogilvie", place: "Nordic Valley", date: "2026-09", caption: "A full double rainbow over Nordic Valley Drive" },
    { image: "valley-buck-julia-rae.jpg", by: "Julia Rae", place: "Ogden Valley City", date: "", caption: "A buck stands tall with the sun lighting up his antlers" },
    { image: "valley-sunrise-huntsville-seth-miller.jpg", by: "Seth Miller", place: "Huntsville", date: "2026-10", caption: "The whole sky lights up orange over the hills at sunrise" },
    { image: "valley-frost-crystals-sharon-myers.jpg", by: "Sharon Myers", place: "Ogden Valley", date: "2026-10", caption: "Frost crystals spread like tiny feathers across the glass" },
    { image: "valley-horses-first-snow-sharon-myers.jpg", by: "Sharon Myers", place: "", date: "2026-10", caption: "Horses check out the first snow of the season" },
    { image: "valley-sunset-orchard-julia-rae.jpg", by: "Julia Rae", place: "Ogden Valley", date: "2026-10", caption: "The sky glows orange over the mountains and fall trees" },
    { image: "valley-sunset-aspens-nordic-dixie-joe-loveless.jpg", by: "Dixie-Joe Loveless", place: "Nordic Valley", date: "2026-10", caption: "A fiery sunset through the aspens near Nordic Valley" }
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
    { image: "sky-logan-peak-moonrise-2.jpg", title: "Full moon over Logan Peak", place: "Logan", date: "Sept. 26, 2026", by: "Jim Brown" },
    { image: "sky-milky-way-pines-doxey.jpg", title: "Milky Way over the pines", place: "", date: "", by: "Tom Doxey" }
  ],

  /* --- Coloring pages (change each month) ---------------------------- */
  coloringMonth: "October 2026",
  coloringPages: [
    { file: "coloring-moose-ghost.png", title: "A moose dressed as a ghost" },
    { file: "coloring-monster-pumpkins.png", title: "A friendly monster at the pumpkin patch" },
    { file: "coloring-owl-witch.png", title: "Owl is ready for trick-or-treat" },
    { file: "coloring-bear-pumpkin.png", title: "Bear carves a jack-o'-lantern" }
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

  /* --- Wildlife watch list (checked off automatically from sightings) ---
     group: which heading it goes under. match: words that count as a sighting of it (separate with |).
     when: season. note: short line shown under the name. confirm: true = "Help us confirm" list
     (animals with no source yet tying them to the Valley; a neighbor's sighting confirms them).
     Sources for every animal are listed on the Wildlife page under "Where this list comes from". */
  watchList: [
    { group: "Big animals", name: "Moose", note: "Give them lots of room. Moose are dangerous." },
    { group: "Big animals", name: "Elk", when: "winter" },
    { group: "Big animals", name: "Mule deer", match: "deer" },
    { group: "Big animals", name: "Mountain goat", match: "goat", note: "High ridges like Ben Lomond and Mount Ogden" },
    { group: "Big animals", name: "Black bear", match: "bear", note: "Rare. Report sightings to Utah DWR." },
    { group: "Big animals", name: "Cougar", match: "cougar|mountain lion|lion|puma", note: "Rare. Report sightings to Utah DWR." },

    { group: "Small animals", name: "Red squirrel", match: "red squirrel|pine squirrel" },
    { group: "Small animals", name: "Chipmunk" },
    { group: "Small animals", name: "Uinta ground squirrel", match: "ground squirrel", when: "spring and summer" },
    { group: "Small animals", name: "Cottontail rabbit", match: "cottontail|rabbit" },
    { group: "Small animals", name: "Yellow-bellied marmot", match: "marmot|rockchuck", when: "summer" },
    { group: "Small animals", name: "Porcupine" },
    { group: "Small animals", name: "Raccoon" },
    { group: "Small animals", name: "Beaver", note: "Scarce in the Valley" },
    { group: "Small animals", name: "Red fox", match: "fox" },

    { group: "Birds", name: "Bald eagle", match: "bald eagle", when: "winter", note: "Watch the open water at Pineview" },
    { group: "Birds", name: "Golden eagle", match: "golden eagle" },
    { group: "Birds", name: "Osprey", note: "Seen in the Ogden area" },
    { group: "Birds", name: "Red-tailed hawk", match: "red tailed hawk|redtailed hawk|redtail" },
    { group: "Birds", name: "Great horned owl", match: "horned owl" },
    { group: "Birds", name: "Great blue heron", match: "heron" },
    { group: "Birds", name: "Sandhill crane", match: "crane", when: "summer" },
    { group: "Birds", name: "Wild turkey", match: "turkey" },
    { group: "Birds", name: "Ruffed grouse", match: "grouse", note: "Rarely seen" },
    { group: "Birds", name: "Steller's jay", match: "steller|stellers jay" },
    { group: "Birds", name: "Black-billed magpie", match: "magpie" },
    { group: "Birds", name: "Mountain bluebird", match: "bluebird" },
    { group: "Birds", name: "Western tanager", match: "tanager", when: "summer" },
    { group: "Birds", name: "Black-capped chickadee", match: "chickadee" },
    { group: "Birds", name: "Broad-tailed hummingbird", match: "hummingbird", when: "summer" },

    { group: "Wildflowers & trees", name: "Arrowleaf balsamroot", match: "balsamroot", when: "spring" },
    { group: "Wildflowers & trees", name: "Indian paintbrush", match: "paintbrush" },
    { group: "Wildflowers & trees", name: "Lupine" },
    { group: "Wildflowers & trees", name: "Sego lily", match: "sego", when: "summer" },
    { group: "Wildflowers & trees", name: "Columbine" },
    { group: "Wildflowers & trees", name: "Fall aspens", match: "aspen", when: "fall" },

    { confirm: true, name: "Coyote" },
    { confirm: true, name: "Bobcat" },
    { confirm: true, name: "Badger" },
    { confirm: true, name: "Striped skunk", match: "skunk" },
    { confirm: true, name: "Muskrat" },
    { confirm: true, name: "Rock squirrel", match: "rock squirrel" }
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
    { id: "qa", short: "Ogden Valley 411", name: "Ogden Valley 411", url: "https://www.facebook.com/groups/ogdenvalleywherecanifind",
      about: "Ask anything about the Valley: who to call, where to find it, what's open, recommendations and local job openings." },
    { id: "weather", short: "Weather", name: "Ogden Valley Weather Conditions", url: "https://www.facebook.com/share/g/1EE9RSfvq9/",
      about: "Neighbors sharing what the weather is really doing in the Valley: snow totals, wind, storms and ice." },
    { id: "updates", short: "Updates", name: "Weber, Davis & Ogden Valley Updates", url: "https://www.facebook.com/share/g/19Cds7a9Nw/",
      about: "News and updates from across Weber County, Davis County and Ogden Valley." },
    { id: "development", short: "Development talk", name: "Weber County Development Discussions", url: "https://www.facebook.com/groups/3388293987868007/",
      about: "New homes, annexations, roads, water and taxes: talk about what's being built in Weber County and how it affects you. Every opinion is welcome. Only threats, hate, personal information, fake accounts and spam are removed." },
    { id: "roads", short: "Road conditions", name: "Weber County Road Conditions", url: "https://www.facebook.com/share/g/18ncycfd9U/",
      about: "Real-time road reports from neighbors: canyon roads, closures, crashes, plowing and slick spots." },
    { id: "rentals", short: "Rentals & real estate", name: "Ogden Valley Rentals & Real Estate", url: "https://www.facebook.com/share/g/19RRmJ2m8f/",
      about: "Long-term rentals, vacation rentals by owner, and homes for sale in the Valley, posted by locals." },
    { id: "classifieds", short: "Classifieds", name: "Ogden Valley Classifieds", url: "https://www.facebook.com/share/g/1EwsJJJtEL/",
      about: "Buy, sell, trade and give away: furniture, gear, vehicles, animals and services from your neighbors." },
    { id: "lost", short: "Lost & found", name: "Ogden Valley Lost & Found (Pets & Items)", url: "https://www.facebook.com/share/g/18UUAxkzJQ/",
      about: "Lost or found a pet, keys, a phone or anything else? Post it here so neighbors can help get it home." },
    { id: "forum", short: "Open forum", name: "Ogden Valley Open Forum (No Rules)", url: "https://www.facebook.com/share/g/1FU9YRNubQ/",
      about: "Say what's on your mind. This group doesn't use our community rules, so join knowing anything goes." },
    { id: "photo", short: "Photography & art", name: "Ogden Valley Photography and Art (only)", url: "https://www.facebook.com/groups/1699428958552888/",
      about: "Photos, artwork and wildlife sightings from the Valley, and nothing else, so your shots don't get buried. Favorites may be featured on our site with credit." },
    { id: "events", short: "Events", name: "Ogden Valley Events", url: "https://www.facebook.com/groups/ogdenvalley",
      about: "What's happening in the Valley: concerts, fundraisers, races, classes, markets and community events. Post yours and see what's coming up." }
  ],

  /* --- Started ---------------------------------------------------------- */
  startYear: 2016
};
