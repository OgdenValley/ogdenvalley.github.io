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
    ov:    { name: "Ogden Valley",  id: "" },
    weber: { name: "Weber County", id: "" }
  },

  /* --- Weekly newsletter (new Substack) ------------------------------- */
  newsletterUrl: "",          // e.g. "https://ogdenvalley.substack.com"

  /* --- Google Forms --------------------------------------------------- */
  forms: {
    event:    "",             // Submit an event
    business: "",             // List a business or restaurant
    artist:   "",             // Be listed as a local artist
    photo:    "",             // Photo contest entry
    sponsor:  ""              // Sponsor a spot
  },

  /* --- Contact -------------------------------------------------------- */
  email: "",                  // the Ogden Valley Gmail address, shown as text
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
