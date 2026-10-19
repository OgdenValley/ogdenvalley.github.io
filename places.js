/* =====================================================================
   LISTINGS — one list per section. Only places Shauna has approved go here.

   Fields for every place (leave out any you don't have):
     name, town ("Eden" | "Liberty" | "Huntsville Town" | "Huntsville area" | "Snowbasin" | "Powder Mountain" | "Nordic Valley"), area (when no town, e.g. "Ogden Canyon"),
     type, blurb, phone, link, address
     checked:  date a local last confirmed it, "YYYY-MM-DD"
     Restaurants also have: food (kinds of food), season, lift: true (needs a lift or gondola ride),
       good (good-for list), note (what a visitor should know) and factsChecked (date checked on their website).
     tags:     ["Dog-friendly patio", "Kid-friendly", ...]  (owners choose)
     news:     { text: "Pumpkin pie is back!", date: "YYYY-MM-DD" }  (owner update)
     photos:   ["file.jpg", ...]  image files uploaded to the main folder, approved only
     now:      "open" | "short" | "closed"   (this week, for Who's Open)
     nowNote:  "Closed Mon-Tue until Thanksgiving"
   Artists use medium instead of type.
   Home services also use:
     job:      "Handyman & repairs" | "Cleaning & window washing" | "Landscaping & snow removal" | "Car detailing" | "Plumbing" | "Electrical" | "Heating & cooling" | "Pest control" | "Other"
     serves:   "All of Ogden Valley"   (instead of a street address for home-based or mobile businesses)
     hours:    "Mon-Fri, 9 a.m.-5 p.m."
     links:    [{ label: "Facebook", href: "https://..." }]   (extra links)
     sponsor:  true   (shows the Sponsor label; never changes the order)
     note:     a short line shown in small print on the card
   Small, local businesses only: no developers or home builders.
   ===================================================================== */
window.OVE_PLACES = {
 "restaurants": [
  {
   "name": "The Oaks",
   "food": ["Burgers & casual", "Sweets & ice cream"],
   "good": ["Takeout"],
   "note": "Reopened under new owners in Nov. 2025. Call for hours before you go.",
   "factsChecked": "2026-10-11",
   "area": "Ogden Canyon",
   "type": "Historic canyon restaurant & ice cream",
   "blurb": "One of Utah's oldest restaurants, welcoming visitors in Ogden Canyon since it was founded as a mountain resort in 1907. Homemade meals, burgers and Farr's ice cream; reopened under new owners David and Cora Neal.",
   "phone": "(801) 348-8188",
   "link": "https://theoaksogden.com/",
   "address": "750 Ogden Canyon, Ogden, UT 84401",
   "checked": "2026-10-08"
  },
  {
   "name": "Bower Lodge",
   "food": ["Sit-down dinner", "Drinks & apres"],
   "note": "May be closed: its online ordering page said \"temporarily closed, reopen date pending\" when we checked in Oct. 2026. Call before you go.",
   "factsChecked": "2026-10-11",
   "town": "Eden",
   "type": "Restaurant & bar",
   "blurb": "Restaurant and bar at Wolf Creek with share plates, entrees and live music nights.",
   "phone": "385-326-3690",
   "address": "3900 N Wolf Creek Dr, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Carlos & Harley's Fresh Mex Cantina",
   "food": ["Mexican"],
   "good": ["Reservations", "Takeout"],
   "note": "The restaurant recommends reservations.",
   "factsChecked": "2026-10-11",
   "town": "Eden",
   "type": "Mexican / Tex-Mex & bar",
   "blurb": "Mexican and Tex-Mex restaurant with a full bar in a restored 1880s building that was formerly the Eden General Store.",
   "phone": "801-745-8226",
   "link": "https://carlosandharleys.com",
   "address": "5510 E 2200 N, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Chris'",
   "food": ["Burgers & casual", "Sweets & ice cream"],
   "season": "Seasonal",
   "good": ["Takeout"],
   "note": "Hours change with the season. Call before you go.",
   "factsChecked": "2026-10-11",
   "town": "Huntsville area",
   "type": "Burgers & shakes (seasonal)",
   "blurb": "Casual seasonal stop near Pineview Reservoir known for raspberry shakes, burgers and fries.",
   "phone": "801-745-3542",
   "address": "7345 E 900 S, Huntsville, UT 84317",
   "checked": "2026-10-07"
  },
  {
   "name": "Earl's Lodge (Snowbasin)",
   "food": ["Resort food court"],
   "good": ["Patio", "Gluten-free options"],
   "note": "At the Snowbasin base by the Needles Gondola. No lift ride needed.",
   "factsChecked": "2026-10-11",
   "town": "Snowbasin",
   "type": "Base lodge dining",
   "blurb": "Slopeside base-area lodge at Snowbasin with a variety of freshly made food.",
   "phone": "801-620-1000",
   "link": "https://www.snowbasin.com/dining/",
   "address": "3925 E Snowbasin Rd, Huntsville, UT 84317",
   "checked": "2026-10-07"
  },
  {
   "name": "Eats of Eden",
   "food": ["Pizza", "Burgers & casual"],
   "good": ["Takeout"],
   "note": "Usually closed Sundays and Mondays. Check their site for hours.",
   "factsChecked": "2026-10-11",
   "town": "Eden",
   "type": "Pizza, burgers & sandwiches",
   "blurb": "Restaurant known for homemade breads, buns and pizza crust, serving pizza, burgers, sandwiches, pasta and salads.",
   "phone": "801-745-8618",
   "link": "https://eatsofedenutah.com",
   "address": "2595 N Hwy 162, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "First Lift Coffee",
   "food": ["Coffee & breakfast"],
   "note": "Inside Compass Rose Lodge, and open to everyone, not just hotel guests.",
   "factsChecked": "2026-10-11",
   "town": "Huntsville Town",
   "type": "Coffee",
   "blurb": "Coffee shop at Compass Rose Lodge serving coffee, tea, grilled sandwiches, soups and pastries.",
   "phone": "385-279-4460",
   "link": "https://compassroselodge.com/first-lift-coffee",
   "address": "198 S 7400 E, Huntsville, UT 84317",
   "checked": "2026-10-07"
  },
  {
   "name": "Hank's Bistro & Brew",
   "food": ["Burgers & casual"],
   "good": ["Takeout"],
   "note": "Sunday brunch, and online ordering for pickup.",
   "factsChecked": "2026-10-11",
   "town": "Eden",
   "type": "Comfort food, beer & wine",
   "blurb": "Family-owned comfort-food restaurant that moved from a food truck to a storefront in Eden; serves beer and wine.",
   "phone": "(801) 745-4265",
   "link": "http://hanksbistroandbrew.com/",
   "address": "2429 UT-158, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Hidden Lake Lodge & Twists Mountain Market (Powder Mountain)",
   "food": ["Resort food court"],
   "season": "Winter (ski season)",
   "note": "Near the top of Powder Mountain. Closed in summer.",
   "factsChecked": "2026-10-11",
   "town": "Powder Mountain",
   "type": "On-mountain lodge (winter)",
   "blurb": "Lodge at the top of the mountain serving burritos, butter chicken, nachos and soups, with a snack market inside.",
   "phone": "801-745-3772",
   "link": "https://www.powdermountain.com/eats",
   "address": "6965 E Powder Mountain Rd, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "John Paul Lodge (Snowbasin)",
   "food": ["Resort food court"],
   "season": "Winter (ski season)",
   "lift": true,
   "good": ["Gluten-free options"],
   "note": "At the top of the John Paul Express lift. Non-skiers can buy a sightseeing lift ticket.",
   "factsChecked": "2026-10-11",
   "town": "Snowbasin",
   "type": "On-mountain lodge (winter)",
   "blurb": "Winter-only lodge at the top of the John Paul Express serving Bavarian-style food.",
   "phone": "801-620-1000",
   "link": "https://www.snowbasin.com/dining/",
   "address": "3925 E Snowbasin Rd, Huntsville, UT 84317",
   "checked": "2026-10-07"
  },
  {
   "name": "Links Bistro at Wolf Creek Resort",
   "food": ["Coffee & breakfast", "Burgers & casual"],
   "good": ["Patio"],
   "note": "Breakfast all day, on the Wolf Creek golf course patio.",
   "factsChecked": "2026-10-11",
   "town": "Eden",
   "type": "Golf course bistro",
   "blurb": "Breakfast and lunch spot at the Wolf Creek Resort golf course; listings note it is typically closed in winter.",
   "phone": "801-781-4150",
   "link": "https://linksbistro.com",
   "address": "3873 N Wolf Creek Dr, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Lucky Slice (Powder Mountain)",
   "food": ["Pizza"],
   "season": "Winter (ski season)",
   "note": "In Sundown Lodge, and open through night skiing.",
   "factsChecked": "2026-10-11",
   "town": "Powder Mountain",
   "type": "Pizza (winter)",
   "blurb": "Slopeside pizza counter at Sundown Lodge, open through night skiing.",
   "phone": "801-745-3772",
   "link": "https://www.powdermountain.com/eats",
   "address": "6965 E Powder Mountain Rd, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Mad Moose Cafe",
   "food": ["Coffee & breakfast", "Burgers & casual"],
   "good": ["Kids welcome", "Takeout", "Patio"],
   "note": "Kids' meals come with a cookie or ice cream.",
   "factsChecked": "2026-10-11",
   "town": "Eden",
   "type": "Cafe & coffee",
   "blurb": "Cafe serving coffee roasted in-house along with paninis, burgers, salads and breakfast.",
   "phone": "(801) 452-7425",
   "link": "https://madmoosecafe.com",
   "address": "2429 N Hwy 158, Suite 6, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Needles Lodge (Snowbasin)",
   "food": ["Resort food court"],
   "lift": true,
   "good": ["Patio", "Reservations"],
   "note": "At the top of the Needles Gondola, about 8,700 feet up. In summer it opens for Sunday brunch (reservations required).",
   "factsChecked": "2026-10-11",
   "town": "Snowbasin",
   "type": "Mountaintop restaurant",
   "blurb": "Restaurant at about 8,700 feet at the top of Snowbasin's Needles Gondola.",
   "phone": "801-620-1000",
   "link": "https://www.snowbasin.com/dining/",
   "address": "3925 E Snowbasin Rd, Huntsville, UT 84317",
   "checked": "2026-10-07"
  },
  {
   "name": "Nordic Valley Snack Shack & food trucks",
   "food": ["Resort food court"],
   "good": ["Patio"],
   "note": "Snack shack plus rotating food trucks, with fire pits and heaters outside.",
   "factsChecked": "2026-10-11",
   "town": "Nordic Valley",
   "type": "Snack bar & rotating food trucks",
   "blurb": "Resort snack shack plus rotating food trucks (listed: Bad Boy Burger Co., Fry Me To The Moon, Green Goat Kava and Coffee).",
   "phone": "385-298-0155",
   "link": "https://www.nordicvalley.ski/food-beverage/",
   "address": "3567 Nordic Valley Way, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Ogden Valley Pizza",
   "food": ["Pizza"],
   "good": ["Kids welcome", "Takeout"],
   "note": "Carryout and delivery ordering online.",
   "factsChecked": "2026-10-11",
   "town": "Eden",
   "type": "Pizza",
   "blurb": "Family-owned pizzeria offering made-to-order pies, wings and salads, with gluten-free crust available.",
   "phone": "(385) 205-6130",
   "link": "https://ogdenvalleypizza.hungerrush.com",
   "address": "2612 N Hwy 162, Unit 2, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Peddler's Cafe & Catering (Eden)",
   "food": ["Coffee & breakfast"],
   "good": ["Takeout"],
   "note": "The Eden location is pickup only.",
   "factsChecked": "2026-10-11",
   "town": "Eden",
   "type": "Cafe, breakfast & lunch",
   "blurb": "Cafe and caterer serving coffee, breakfast and lunch at its Eden location, with pickup ordering online; it also has an Ogden location.",
   "phone": "(801) 695-1573",
   "link": "https://peddlerscatering.com",
   "address": "3632 N Wolf Creek Dr, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Saddlebag Saloon",
   "food": ["Bar & grill", "Drinks & apres"],
   "note": "Small, locally owned bar. Hours vary, so call before you go.",
   "factsChecked": "2026-10-11",
   "town": "Eden",
   "type": "Bar / saloon",
   "blurb": "Bar in the Eden commercial cluster on Highway 162.",
   "phone": "801-920-7087",
   "address": "2612 N Hwy 162, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Shooting Star Saloon",
   "food": ["Bar & grill", "Burgers & casual"],
   "note": "Known for the Star Burger.",
   "factsChecked": "2026-10-11",
   "town": "Huntsville Town",
   "type": "Saloon & burgers",
   "blurb": "Saloon dating to 1879, described as Utah's oldest continuously operating saloon, known for its Star Burger.",
   "phone": "(801) 745-2002",
   "address": "7350 E 200 S, Huntsville, UT",
   "checked": "2026-10-07"
  },
  {
   "name": "Strawberry Patio (Snowbasin)",
   "food": ["Resort food court"],
   "season": "Winter (ski season)",
   "good": ["Patio"],
   "note": "At Snowbasin's Strawberry base by the Strawberry Gondola, with fire pits.",
   "factsChecked": "2026-10-11",
   "town": "Snowbasin",
   "type": "Open-air food park (winter)",
   "blurb": "Winter-only open-air food park at Snowbasin with 180-plus seats and several food options.",
   "phone": "801-620-1000",
   "link": "https://www.snowbasin.com/dining/",
   "address": "3925 E Snowbasin Rd, Huntsville, UT 84317",
   "checked": "2026-10-07"
  },
  {
   "name": "The Cinnabar (Snowbasin)",
   "food": ["Drinks & apres", "Bar & grill"],
   "good": ["Reservations"],
   "note": "Full-bar gastropub inside Earl's Lodge at the Snowbasin base.",
   "factsChecked": "2026-10-11",
   "town": "Snowbasin",
   "type": "Shared plates & cocktails",
   "blurb": "Base-area bar and restaurant at Snowbasin serving shared plates and cocktails.",
   "phone": "801-620-1000",
   "link": "https://www.snowbasin.com/dining/",
   "address": "3925 E Snowbasin Rd, Huntsville, UT 84317",
   "checked": "2026-10-07"
  },
  {
   "name": "Timberline Cafeteria & The Powder Keg (Powder Mountain)",
   "food": ["Resort food court", "Drinks & apres"],
   "season": "Winter (ski season)",
   "good": ["Live music", "Takeout"],
   "note": "By the main parking. The Powder Keg bar is downstairs, with live music in ski season.",
   "factsChecked": "2026-10-11",
   "town": "Powder Mountain",
   "type": "Resort cafeteria & apres bar (winter)",
   "blurb": "Timberline Lodge cafeteria with pizza, burgers and soups, with The Powder Keg bar downstairs offering local beer and Asian dishes.",
   "phone": "801-745-3772",
   "link": "https://www.powdermountain.com/eats",
   "address": "6965 E Powder Mountain Rd, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Eden Coffee Cocoa & Juicery",
   "food": [
    "Coffee & breakfast"
   ],
   "town": "Eden",
   "type": "Coffee & juice",
   "blurb": "Coffee, cocoa and juice shop on Highway 158 in Eden.",
   "phone": "801-621-0505",
   "address": "2405 N Hwy 158, Eden, UT 84310",
   "added": "2026-10-16"
  },
  {
   "name": "Sawasdee Thai Eden",
   "food": [
    "Sit-down dinner"
   ],
   "good": [
    "Takeout"
   ],
   "note": "Takeout only. Hours we found: Tue-Sat 11:30-2 and 4-7:30, closed Sun-Mon. Call to confirm.",
   "town": "Eden",
   "type": "Thai (takeout)",
   "blurb": "Takeout-only Thai restaurant in Eden.",
   "phone": "801-979-9896",
   "link": "https://sawasdee-thai-eden.square.site",
   "address": "2612 N Hwy 162, Bldg 4, Eden, UT 84310",
   "added": "2026-10-16"
  },
  {
   "name": "ScallyWag Grill",
   "food": [
    "Burgers & casual",
    "Coffee & breakfast"
   ],
   "note": "Hours we found: Tue-Fri 10:30-2:30, Sat 9-2:30. Call to confirm.",
   "town": "Eden",
   "type": "Grill",
   "blurb": "Breakfast and lunch grill on Highway 162 in Eden.",
   "phone": "801-648-9136",
   "address": "2580 N Hwy 162, Suite A, Eden, UT 84310",
   "added": "2026-10-16"
  },
  {
   "name": "The Drip Coffee & Soda Shop",
   "food": [
    "Coffee & breakfast"
   ],
   "good": [
    "Takeout"
   ],
   "note": "Drive-thru next to Valley Market.",
   "town": "Eden",
   "type": "Coffee & soda (drive-thru)",
   "blurb": "Coffee and soda shop near Valley Market on the road to Powder Mountain, with dine-in, walk-up and drive-thru service.",
   "phone": "312-391-3912",
   "link": "https://the-drip-coffee-and-soda-shop.square.site",
   "address": "2555 N Wolf Creek Dr, Eden, UT 84310",
   "added": "2026-10-16"
  }
 ],
 "businesses": [
  {
   "name": "Club Rec Tours & Rentals",
   "town": "Eden",
   "type": "Recreation rentals & tours",
   "blurb": "Rents boats, watercraft, UTVs, paddle craft and snowmobiles, with guided tours; headquartered at Wolf Creek with a Pineview marina location.",
   "phone": "(801) 745-3038",
   "link": "https://clubrecutah.com",
   "address": "6560 1st St",
   "checked": "2026-10-07"
  },
  {
   "name": "Compass Rose Lodge & HALO Observatory",
   "town": "Huntsville Town",
   "type": "Boutique lodge & observatory",
   "blurb": "Boutique lodge in Huntsville with an on-site observatory offering stargazing tours, and First Lift Coffee.",
   "phone": "385-279-4460",
   "link": "https://compassroselodge.com",
   "address": "198 S 7400 E, Huntsville, UT 84317",
   "checked": "2026-10-07"
  },
  {
   "name": "Detours",
   "town": "Huntsville Town",
   "type": "Paddle & bike rentals, shake shop",
   "blurb": "Locally owned paddleboard, kayak, canoe and cruiser-bike rental shop near Pineview Reservoir, with a shake shop.",
   "phone": "385-380-7102",
   "link": "https://detoursutah.com",
   "address": "198 S 7400 E, Huntsville, UT 84317",
   "checked": "2026-10-07"
  },
  {
   "name": "Diamond Peak Mountain Sports",
   "town": "Eden",
   "type": "Ski, snowboard & bike shop",
   "blurb": "Ski, snowboard and bike retailer with rentals and overnight ski-mounting service; says it has been in business more than three decades.",
   "phone": "801-745-0101",
   "link": "https://dpmsutah.com",
   "address": "2429 N Hwy 158, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Edelweiss Inn",
   "town": "Eden",
   "type": "Lodging",
   "blurb": "Lodging near Nordic Valley.",
   "phone": "850-866-8418",
   "address": "2548 Nordic Valley Dr, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "EmieJames",
   "town": "Eden",
   "type": "Home decor & gifts",
   "blurb": "Mother-daughter business selling home decor, kitchen items and gifts.",
   "phone": "(385) 358-5506",
   "link": "https://emiejames.com",
   "address": "5522 E 2200 N, Suite B, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Jackson Fork Inn",
   "town": "Huntsville area",
   "type": "Inn",
   "blurb": "Inn on Highway 39 in Huntsville.",
   "checked": "2026-10-07"
  },
  {
   "name": "Lavender Hill Utah / The Lavender Loft",
   "town": "Eden",
   "type": "Lavender farm & gift shop",
   "blurb": "Small lavender farm and gift shop selling handmade lavender products; shop is upstairs above Diamond Peak Mountain Sports.",
   "phone": "801-645-4890",
   "link": "https://lavenderhillutah.com",
   "address": "2429 Hwy 158, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Luna & Lavender Co.",
   "town": "Eden",
   "type": "Apothecary & gift shop",
   "blurb": "Shop selling handmade candles, bath products, teas, herbs, jewelry and metaphysical supplies.",
   "phone": "801-745-5384",
   "link": "https://lunaandlavenderco.com",
   "address": "2595 N Hwy 162, Ste 4, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Mountain Luxury",
   "town": "Eden",
   "type": "Real estate",
   "phone": "(801) 745-8400",
   "checked": "2026-10-07"
  },
  {
   "name": "New World Distillery",
   "town": "Eden",
   "type": "Craft distillery & tasting room",
   "blurb": "Craft distillery established in 2016 making agave spirits, gin, vodka and bourbon, with a tasting room and tours.",
   "phone": "(385) 244-0144",
   "link": "http://www.newworlddistillery.com/",
   "address": "4795 2600 N, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Nordic Valley",
   "town": "Nordic Valley",
   "type": "Ski resort",
   "blurb": "Small ski area founded in 1968, known for night skiing.",
   "phone": "385-298-0155",
   "link": "https://www.nordicvalley.ski",
   "address": "3567 Nordic Valley Way, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Ogden Nordic (North Fork Park)",
   "town": "Liberty",
   "type": "Nordic ski trails",
   "blurb": "Nonprofit that grooms cross-country ski, snowshoe and fat-bike trails at North Fork Park.",
   "phone": "801-648-9020",
   "address": "4150 E 5950 N, Liberty, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Ogden Valley Branch Library",
   "town": "Huntsville Town",
   "type": "Library",
   "blurb": "Weber County Library's Valley branch, with books, services and free events.",
   "phone": "(801) 337-2660",
   "link": "https://www.weberpl.lib.ut.us/locations-and-hours/ogden-valley-branch",
   "address": "131 S 7400 E, Huntsville, UT 84317",
   "checked": "2026-10-07"
  },
  {
   "name": "Ogden Valley Copy (FedEx / UPS)",
   "town": "Eden",
   "type": "Shipping, mailing & copies",
   "blurb": "Ship packages with FedEx or UPS, mail, and make copies in the Valley.",
   "phone": "(385) 453-6100",
   "checked": "2026-10-07"
  },
  {
   "name": "Powder Mountain",
   "town": "Powder Mountain",
   "type": "Ski resort",
   "blurb": "Ski resort founded in 1972, known for its large skiable acreage.",
   "phone": "801-745-3772",
   "link": "https://powdermountain.com",
   "address": "6965 E Powder Mountain Rd, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Simply Eden",
   "town": "Eden",
   "type": "Bath & body boutique",
   "blurb": "Boutique specializing in goat-milk soaps and bath and body products.",
   "phone": "(801) 745-5033",
   "checked": "2026-10-07"
  },
  {
   "name": "Snowbasin Resort",
   "town": "Snowbasin",
   "type": "Ski resort (year-round)",
   "blurb": "Ski resort that hosted 2002 Olympic downhill, super-G and combined events; open for summer activities and events too.",
   "phone": "801-620-1000",
   "link": "https://www.snowbasin.com",
   "address": "3925 E Snowbasin Rd, Huntsville, UT 84317",
   "checked": "2026-10-07"
  },
  {
   "name": "South Fork Hardware (Huntsville)",
   "town": "Huntsville area",
   "type": "Hardware store",
   "blurb": "Hardware store, part of a regional family-owned chain, on Highway 39 in Huntsville.",
   "phone": "801-745-2443",
   "link": "https://southforkhw.com",
   "address": "540 S Hwy 39, Huntsville, UT 84317",
   "checked": "2026-10-07"
  },
  {
   "name": "Sunnyfield Meats",
   "town": "Eden",
   "type": "Butcher shop",
   "phone": "(801) 654-9450",
   "checked": "2026-10-07"
  },
  {
   "name": "Valley Wine & Spirits",
   "town": "Eden",
   "type": "Wine & spirits shop",
   "blurb": "Wine and spirits shop in the log-cabin shops in Eden, in the same courtyard as the Saddlebag Saloon.",
   "phone": "385-837-8116",
   "photos": ["valley-wine-spirits-eden-cabins.jpg"],
   "checked": "2026-10-19"
  },
  {
   "name": "Valley Market",
   "town": "Eden",
   "type": "Grocery & deli",
   "blurb": "Small grocery store with baked goods, produce, meats, a deli counter and hot meals to go.",
   "phone": "(801) 745-4000",
   "link": "https://valleymarketonline.com",
   "address": "2555 N Wolf Creek Dr, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Wolf Creek Resort (golf & club)",
   "town": "Eden",
   "type": "Golf course, fitness club & lodging",
   "blurb": "Semi-private 18-hole golf club established in 1963 with a fitness club, restaurant and lodging.",
   "phone": "801-745-3737",
   "link": "https://www.wolfcreekresort.com",
   "address": "3718 N Wolf Creek Dr, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "WorldMark Wolf Creek",
   "town": "Eden",
   "type": "Resort lodging",
   "blurb": "Timeshare/resort lodging at Wolf Creek.",
   "address": "3718 N Wolf Creek Dr, Eden, UT 84310",
   "checked": "2026-10-07"
  }
 ],
 "services": [
  {
   "name": "Yes, I Can Fix That",
    "added": "2026-10-08",
   "job": "Handyman & repairs",
   "type": "Handyman & home repair",
   "serves": "All of Ogden Valley",
   "blurb": "Drywall repairs, door repairs, home maintenance and DIY classes. Never schedules two projects at once, so your job always gets the full attention you're paying for.",
   "hours": "Mon-Fri, 9 a.m.-5 p.m.",
   "phone": "801-917-4442",
   "link": "https://icanfixthatut.com",
   "links": [{"label": "Facebook", "href": "https://www.facebook.com/profile.php?id=61595063423377"}, {"label": "Read their sponsor story", "href": "spotlight-yes-i-can-fix-that.html"}],
   "badges": ["Veteran owned", "Insured"],
   "tags": ["On time"],
   "photos": ["yes-i-can-fix-that-logo.jpg", "yicft-job-14-card.jpg", "yicft-job-27-card.jpg", "yicft-job-28-card.jpg", "yicft-job-12-card.jpg"],
   "sponsor": true,
   "checked": "2026-10-08"
  },
  {
   "name": "Bluebird Sprinklers & Irrigation",
    "added": "2026-10-08",
    "photos": ["bluebird-sprinklers-yard.jpg", "bluebird-sprinklers-trench.jpg", "bluebird-sprinklers-valve-box.jpg"],
   "job": "Landscaping & snow removal",
   "type": "Sprinklers, irrigation & snow removal",
   "town": "Huntsville",
   "serves": "Huntsville and Ogden Valley",
   "blurb": "Irrigation experts with upfront, transparent pricing: sprinkler system installation, repair and maintenance, drainage installation and repair, and snow removal. On time, or they pay you $50.",
   "hours": "24/7",
   "badges": ["24/7 or emergency service"],
   "phone": "801-923-3358",
   "link": "https://bluebirdsprinklers.com",
   "tags": [
    "On-time guarantee",
    "Snow removal"
   ],
   "checked": "2026-10-08"
  },
  {
   "name": "That's My House Cleaning Service",
    "added": "2026-10-08",
    "photos": ["thats-my-house-living-room.jpg", "thats-my-house-bedroom.jpg", "thats-my-house-bathroom.jpg", "thats-my-house-cabin.jpg"],
   "job": "Cleaning & window washing",
   "type": "House cleaning & vacation rental care",
   "serves": "Weber County",
   "blurb": "Premium cleaning with personal, one-on-one service from a dedicated cleaner: weekly, bi-weekly and monthly maintenance, one-time and deep cleanings, and move-in/move-out cleanings. They also clean and manage vacation rentals.",
   "hours": "Mon-Fri 8 a.m.-4 p.m., Sat-Sun 9 a.m.-2 p.m. Closed major family holidays.",
   "phone": "801-833-6941",
   "link": "https://www.thats-myhouse.com",
   "links": [
    {
     "label": "Facebook",
     "href": "https://www.facebook.com/ThatsMyHouse"
    }
   ],
   "tags": [
    "Vacation rentals"
   ],
   "checked": "2026-10-08"
  }
 ],
 "beauty": [
  {
   "name": "SaltyBear Cryo",
   "added": "2026-10-11",
   "home": true,
   "photos": ["saltybear-cryo-treatment.jpg"],
   "town": "Huntsville",
   "type": "Targeted cryotherapy",
   "blurb": "Targeted cryotherapy to help your body's natural healing, so you can get back to the life you love. By appointment, with a free consultation.",
   "hours": "Monday to Saturday, flexible hours by appointment only",
   "badges": ["Woman owned"],
   "phone": "801-807-9365",
   "link": "https://www.saltybearcryo.com",
   "checked": "2026-10-11"
  },
  {
   "name": "Altitude Fitness and Health",
    "added": "2026-10-08",
    "home": true,
    "photos": ["altitude-fitness-logo.jpg", "altitude-fitness-salad.jpg"],
   "town": "Eden",
   "type": "In-home fitness & nutrition coaching",
   "blurb": "Health and wellness coaching through fitness and nutrition, with mindfulness. Julia Rae and her team meet people where they are on their health goals, in their own home and at their own pace.",
   "phone": "801-391-3704",
   "link": "https://www.altitude.fit/",
   "checked": "2026-10-08"
  },
  {
   "name": "Free Spirit Holistic Mountain Spa & Yoga",
   "town": "Eden",
   "type": "Day spa and yoga studio",
   "blurb": "Aveda boutique spa in historic Eden offering massage, facials and pedicures, plus yoga classes.",
   "phone": "801-745-3630",
   "link": "https://freespiritmountainspa.com/",
   "address": "2234 North 5500 East, Suite C, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "HEL Fitness",
   "town": "Eden",
   "type": "Fitness",
   "blurb": "Fitness business listed in Eden.",
   "address": "4780 E 2600 N, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Valley Hair Co",
   "town": "Eden",
   "type": "Hair salon",
   "blurb": "Full-service hair salon in Eden offering cuts, color, highlights and balayage, with a nail tech for gel manicures.",
   "phone": "(801) 745-1979",
   "link": "https://www.facebook.com/valleyhairco/",
   "address": "2234 N 5500 E, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Valley Physical Therapy",
   "town": "Eden",
   "type": "Physical therapy and massage",
   "blurb": "Ben Nicholls, DPT, offers outpatient physical therapy, sports rehab and massage therapy for the Ogden Valley.",
   "phone": "801-745-3200",
   "link": "https://www.thevalleyphysicaltherapy.com/",
   "address": "5471 E 2300 N Ste 1, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Valley Pilates",
   "town": "Eden",
   "type": "Pilates studio",
   "blurb": "Reformer Pilates (group and private), personal training and rehab-focused fitness, run alongside Valley Physical Therapy.",
   "phone": "801-745-3200",
   "link": "https://www.valley-pilates.com/",
   "address": "5471 E 2300 N Suite 1, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Wolf Creek Resort fitness center",
   "town": "Eden",
   "type": "Gym",
   "blurb": "Resort clubhouse gym with machines, free weights, a spin room, and group fitness and yoga classes.",
   "phone": "801-745-3737",
   "link": "https://wolfcreekresort.com/facilities/",
   "address": "3718 N Wolf Creek Dr, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Lash Line",
   "town": "Eden",
   "home": true,
   "type": "Lash, brow and facials",
   "blurb": "Kayla Armstrong offers lash extensions, lash lifts and tints, brow and lip waxing, and basic facials. Book online.",
   "phone": "(435) 703-3479",
   "link": "https://square.site/book/D9GCY2TC8S2SP/lash-line-eden-ut",
   "added": "2026-10-16"
  },
  {
   "name": "Lorrie Harper, PT",
   "town": "Eden",
   "type": "Physical therapy",
   "blurb": "Physical therapist at the Eden Professional Center, also known as Zenergy Manual Therapy & Pilates.",
   "phone": "(801) 644-8731",
   "link": "https://lorrieharper.com",
   "address": "2580 N Hwy 162, Suite C, Eden, UT 84310",
   "added": "2026-10-16"
  },
  {
   "name": "Lunar Energy Massage & Wellness",
   "town": "Eden",
   "type": "Massage",
   "blurb": "Massage and bodywork on the lower level of the Wolf Creek Clubhouse, booked online through Vagaro.",
   "phone": "(801) 624-9990",
   "link": "https://wolfcreekresort.com/portfolio/yoga-massage-bodywork-lunar-energy/",
   "address": "3718 N Wolf Creek Dr (lower level, Wolf Creek Clubhouse), Eden, UT 84310",
   "added": "2026-10-16"
  },
  {
   "name": "Mountain Performance Massage",
   "town": "Eden",
   "type": "Massage and stretch therapy",
   "blurb": "Shawn Carolan, LMT, offers sports and relaxation massage and Fascial Stretch Therapy.",
   "phone": "(801) 688-3006",
   "link": "https://mountainperformancemassage.com/",
   "address": "2429 N Highway 158, Eden, UT 84310",
   "added": "2026-10-16"
  },
  {
   "name": "The Healing Tree",
   "town": "Eden",
   "home": true,
   "type": "Massage and bodywork",
   "blurb": "Theresa Ellis, LMT, offers massage, CranioSacral therapy, energy work and biofeedback scans. Book online.",
   "phone": "(801) 282-5277",
   "link": "https://www.thehealingtreeservices.com/",
   "added": "2026-10-16"
  }
 ],
 "farm": [
  {
   "name": "Argyle Acres / Harmony Ranch",
   "town": "Liberty",
   "type": "Meat and eggs ranch",
   "blurb": "Pasture-raised chicken, turkey, duck, eggs and pork, plus grass-fed and grass-finished beef and lamb.",
   "phone": "(801) 391-2221",
   "link": "https://www.argyleacres.farm",
   "checked": "2026-10-07"
  },
  {
   "name": "McFarland Family Farms - White Barn Farm",
   "added": "2026-10-09",
   "photos": ["mcfarland-farms-barn-flag-pumpkin.jpg", "mcfarland-farms-harvest-moon.jpg", "mcfarland-farms-pumpkins-night.jpg", "mcfarland-farms-sunflowers.jpg", "mcfarland-farms-upick-sign.jpg"],
   "town": "Huntsville area",
   "type": "U-pick flowers & pumpkins / Farmers market",
   "blurb": "A family farm with a Saturday farmers market in July and August (local growers, makers and bakers plus McFarland produce), u-pick flower fields, and u-pick pumpkins, hayrides and fall festivals every September and October, including on the former Trappist monastery farmland. More on-farm events and workshops are added each year.",
   "tags": ["U-pick flowers (Jul-Aug)", "Farmers market (Jul-Aug)", "U-pick pumpkins (Sep-Oct)", "Fall festivals"],
   "hours": "Mon-Fri 4-8 p.m., Sat 10 a.m.-9 p.m. (in season)",
   "address": "6138 E Highway 39, Huntsville, UT 84317",
   "phone": "801-776-1876",
   "link": "https://www.mcfarlandfamilyfarms.com/",
   "links": [{"label": "Instagram", "href": "https://www.instagram.com/mcfarlandfamilyfarms/"}],
   "checked": "2026-10-09"
  },
  {
   "name": "Sandhill Farms",
   "town": "Eden",
   "type": "Produce farm",
   "blurb": "Vegetables, greens, fruit (peaches, raspberries, apples, pears), herbs, flowers, honey, pickles and beef, seasonal.",
   "phone": "(801) 866-3620",
   "link": "https://sandhillfarms.org",
   "checked": "2026-10-07"
  },
  {
   "name": "Sunnyfield Farm",
   "town": "Eden",
   "type": "Beef ranch / Farm store",
   "blurb": "Scottish Highland beef plus pork, lamb, eggs, honey, garlic and seasonal turkeys and pumpkins, sold at the farm or on its website.",
   "link": "https://sunnyfield-farm.com/",
   "address": "2103 N 5500 E, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Dancing Moose Farm",
   "town": "Huntsville",
   "type": "Beef ranch / Honey",
   "blurb": "Grass-fed beef and honey from its own hives, sold now and then through its online farm store; farm tours by appointment.",
   "note": "Beef and honey aren't always for sale. Check their online store or Instagram.",
   "phone": "(801) 603-9955",
   "link": "https://www.dancingmoosefarmut.com/",
   "address": "13485 E Highway 39, Huntsville, UT 84317",
   "added": "2026-10-16"
  },
  {
   "name": "Wheelwright's Honey",
   "town": "Eden",
   "home": true,
   "type": "Honey",
   "blurb": "Raw local Eden honey by the quart. Call to arrange pickup.",
   "phone": "(801) 648-9088",
   "added": "2026-10-16"
  }
 ],
 "foodtrucks": [
  {
   "name": "Scally Wagon",
   "area": "Huntsville 4th of July",
   "type": "Burgers and bistro food (pirate-ship themed)",
   "blurb": "Pirate-ship themed truck serving burgers like a pineapple teriyaki burger, fries and Monte Cristos, listed as appearing at Huntsville's 4th of July.",
   "link": "https://www.instagram.com/wagonscally/",
   "checked": "2026-10-07"
  },
  {
   "name": "Snowbasin Blues & Brews (weekend food trucks)",
   "town": "Snowbasin",
   "type": "Event food trucks (various)",
   "blurb": "Free weekend summer concert series at Snowbasin where a 2025 Ski Utah write-up says food trucks serve alongside local breweries; the individual trucks are not named.",
   "link": "https://www.snowbasin.com/events/blues-brews",
   "checked": "2026-10-07"
  },
  {
   "name": "Eden Balloon Festival (food trucks)",
   "town": "Eden",
   "type": "Event food trucks (various)",
   "blurb": "Annual hot-air balloon festival at Eden Park, usually in late September, where local food trucks serve breakfast and more.",
   "link": "https://www.ogdenvalleynews.com/balloon-festival.html",
   "added": "2026-10-16"
  },
  {
   "name": "Huntsville Grand Prix CycleKart race (food trucks)",
   "town": "Huntsville",
   "type": "Event food trucks (various)",
   "blurb": "Annual CycleKart street race in Huntsville, usually the first weekend of May, free to watch, with food trucks.",
   "link": "https://huntsvilleutah.gov/cyclekart-race",
   "added": "2026-10-16"
  },
  {
   "name": "Sunnyfield Farm Festival (food trucks)",
   "town": "Eden",
   "type": "Event food trucks (various)",
   "blurb": "Annual late-summer farm festival at Sunnyfield Farms in Eden, run by the Community Foundation of Ogden Valley, with food trucks.",
   "link": "https://www.visitogden.com/events/5th-annual-farm-festival/",
   "address": "2103 N 5500 E, Eden, UT 84310",
   "added": "2026-10-16"
  }
 ],
 "artists": [
  {
   "name": "Ashley Stoddard",
   "area": "Ogden Valley",
   "checked": "2026-10-07"
  },
  {
   "name": "Austin Brook Luckett (Iron Pine)",
   "area": "Weber County",
   "medium": "Photography / metal prints",
   "blurb": "Ogden photographer selling landscape and architectural photography as metal prints from a Washington Blvd gallery showroom.",
   "link": "https://www.ironpine.company",
   "checked": "2026-10-07"
  },
  {
   "name": "Kristie Tueller Designs",
   "added": "2026-10-08",
   "area": "Huntsville area",
   "medium": "Silversmith (handmade silver jewelry)",
   "blurb": "\u201cGrounded by the rugged beauty of the mountains, my workbench is a sanctuary where sterling silver and stone come together to tell a story. My work is defined by a bold, soulful elegance. I craft jewelry for those who carry a connection to the wild within them: timeless, spirited and authentic.\u201d",
   "where": "Mountain Arts and Music, Ogden Farmers Market, Oktoberfest at Snowbasin, and her website",
   "link": "https://kristietuellerdesigns.com",
   "photos": ["kristie-tueller-necklace.jpg", "kristie-tueller-flower-ring.jpg", "kristie-tueller-turquoise-cuff.jpg", "kristie-tueller-earrings.jpg", "kristie-tueller-agate-pendant.jpg", "kristie-tueller-stone-pendant.jpg", "kristie-tueller-turquoise-ring.jpg", "kristie-tueller-inlay-ring.jpg"],
   "checked": "2026-10-08"
  },
  {
   "name": "Mike Gardner",
   "area": "Weber County",
   "medium": "Painting",
   "blurb": "Ogden painter, former high school art teacher and Gallery 25 board member.",
   "checked": "2026-10-07"
  },
  {
   "name": "Sam Crump",
   "area": "Ogden Valley",
   "checked": "2026-10-07"
  },
  {
   "name": "Sharon Bradford",
   "area": "Ogden Valley",
   "checked": "2026-10-07"
  },
  {
   "name": "Brent Atwood",
   "area": "Ogden",
   "medium": "Murals",
   "blurb": "Ogden muralist whose work includes the 'Mona Lisa' mural on Washington Boulevard.",
   "added": "2026-10-16"
  },
  {
   "name": "Cara Koolmees",
   "area": "Ogden",
   "medium": "Watercolor",
   "blurb": "Watercolor painter of buildings, bike races and rail cars, with a long-running gallery-studio on Historic 25th Street in Ogden.",
   "link": "https://carakoolmees.com",
   "where": "Her studio at 256 Historic 25th St, Ogden, and the First Friday Art Stroll",
   "added": "2026-10-16"
  },
  {
   "name": "Jim Jacobs",
   "area": "Ogden",
   "medium": "Sculpture / installation",
   "blurb": "Ogden sculptor working with branches, lumber and tools to explore people's relationship with the environment.",
   "link": "http://jcjacobs.com",
   "added": "2026-10-16"
  },
  {
   "name": "Roberta Glidden",
   "area": "Ogden",
   "medium": "Painting",
   "blurb": "Ogden painter and Gallery 25 board member, with studio space at the gallery.",
   "link": "https://robertaglidden.com/",
   "where": "Gallery 25, 268 25th St, Ogden",
   "added": "2026-10-16"
  }
 ]
};

/* ===== FORM LISTINGS: written every hour from the Business listings sheet (approved rows only). Edit the sheet, not this section. ===== */
(function (F) { var P = window.OVE_PLACES = window.OVE_PLACES || {}; for (var k in F) P[k] = (P[k] || []).concat(F[k]); })({});
