/* =====================================================================
   LISTINGS — restaurants, Valley businesses, local artists
   One entry per line inside the [ ]. Only add places that are confirmed
   open (or artists who said yes to being listed).

   Restaurant / business fields:
     { name: "", town: "Eden" | "Huntsville" | "Liberty" | "Ogden Valley",
       type: "", blurb: "", phone: "", link: "", address: "" }
   Artist fields:
     { name: "", area: "Ogden Valley" | "Weber County", medium: "",
       blurb: "", link: "" }
   ===================================================================== */
window.OVE_PLACES = {
  restaurants: [],
  businesses: [],
  artists: []
};
