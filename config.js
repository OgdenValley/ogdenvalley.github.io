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
  newsletterUrl: "",          // e.g. "https://ogdenvalley.substack.com"

  /* --- Google Forms --------------------------------------------------- */
  forms: {
    event:    "",             // Submit an event
    business: "",             // List a business or restaurant
    artist:   "",             // Be listed as a local artist
    photo:    "",             // Photo contest entry
    sponsor:  "",             // Sponsor a spot
    guess:    "",             // Guess the Spot: send a guess
    guessSubmit: ""           // Guess the Spot: send in your own spot
  },

  /* --- Reviews (Google Form) -------------------------------------------
     reviewForm: the form's link ending in /viewform
     reviewEntry: the "entry.123456" code for the Business question */
  reviewForm: "",
  reviewEntry: "",

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

  /* --- Started ---------------------------------------------------------- */
  startYear: 2016
};
