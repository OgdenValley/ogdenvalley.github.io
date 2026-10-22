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
     Farm Stands & Local Food also have: sells (what they grow or make) and buy (how to buy),
       using the same words as the listing form: "Eggs", "Beef", "Honey" ... and "Farm stand", "U-pick", "Order online" ...
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
/*
   PLACES TO STAY (stay): lodges, inns, resort stays and local vacation rentals.
     kind: "Lodge & inn" | "Resort stay" | "Cabin / vacation rental" | "Condo"
     sleeps (number), bedrooms (number), book (VRBO / Airbnb / booking link), minNights,
     amenities: ["Hot tub", "Pet-friendly", "Ski-in / ski-out", "Near the lifts", "Near Pineview", "Full kitchen", "Fireplace", "Wi-Fi", "EV charging"]
     host (first name of a local host, if they want it shown)
*/
window.OVE_PLACES = {
 "restaurants": [
   {
     "name": "The Oaks",
     "food": [
       "Burgers & casual",
       "Sweets & ice cream"
     ],
     "good": [
       "Takeout"
     ],
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
     "food": [
       "Sit-down dinner",
       "Drinks & apres"
     ],
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
     "food": [
       "Mexican"
     ],
     "good": [
       "Reservations",
       "Takeout"
     ],
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
     "food": [
       "Burgers & casual",
       "Sweets & ice cream"
     ],
     "season": "Seasonal",
     "good": [
       "Takeout"
     ],
     "note": "Hours change with the season. Call before you go.",
     "factsChecked": "2026-10-11",
     "town": "Huntsville area",
     "type": "Burgers & shakes (seasonal)",
     "blurb": "Casual seasonal stop near Pineview Reservoir known for raspberry shakes, burgers and fries. Gas pumps on site.",
     "phone": "801-745-3542",
     "address": "7345 E 900 S, Huntsville, UT 84317",
     "checked": "2026-10-07",
     "sells": [
       "gas",
       "fuel"
     ]
   },
   {
     "name": "Earl's Lodge (Snowbasin)",
     "food": [
       "Resort food court"
     ],
     "good": [
       "Patio",
       "Gluten-free options"
     ],
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
     "food": [
       "Pizza",
       "Burgers & casual"
     ],
     "good": [
       "Takeout"
     ],
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
     "food": [
       "Coffee & breakfast"
     ],
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
     "food": [
       "Burgers & casual"
     ],
     "good": [
       "Takeout"
     ],
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
     "food": [
       "Resort food court"
     ],
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
     "food": [
       "Resort food court"
     ],
     "season": "Winter (ski season)",
     "lift": true,
     "good": [
       "Gluten-free options"
     ],
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
     "food": [
       "Coffee & breakfast",
       "Burgers & casual"
     ],
     "good": [
       "Patio"
     ],
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
     "food": [
       "Pizza"
     ],
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
     "food": [
       "Coffee & breakfast",
       "Burgers & casual"
     ],
     "good": [
       "Kids welcome",
       "Takeout",
       "Patio"
     ],
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
     "food": [
       "Resort food court"
     ],
     "lift": true,
     "good": [
       "Patio",
       "Reservations"
     ],
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
     "food": [
       "Resort food court"
     ],
     "good": [
       "Patio"
     ],
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
     "food": [
       "Pizza"
     ],
     "good": [
       "Kids welcome",
       "Takeout",
       "Gluten-free options"
     ],
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
     "food": [
       "Coffee & breakfast"
     ],
     "good": [
       "Takeout"
     ],
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
     "food": [
       "Bar & grill",
       "Drinks & apres"
     ],
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
     "food": [
       "Bar & grill",
       "Burgers & casual"
     ],
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
     "food": [
       "Resort food court"
     ],
     "season": "Winter (ski season)",
     "good": [
       "Patio"
     ],
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
     "food": [
       "Drinks & apres",
       "Bar & grill"
     ],
     "good": [
       "Reservations"
     ],
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
     "food": [
       "Resort food court",
       "Drinks & apres"
     ],
     "season": "Winter (ski season)",
     "good": [
       "Live music",
       "Takeout"
     ],
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
   },
   {
     "name": "Hermitage Grill",
     "area": "Ogden Canyon",
     "food": [
       "Burgers & casual",
       "Coffee & breakfast"
     ],
     "type": "Riverside grill",
     "blurb": "Small riverside grill at the Alaskan Inn about 3 miles up Ogden Canyon; breakfast daily, full menu Friday to Sunday.",
     "address": "435 Ogden Canyon Rd, Ogden, UT 84401",
     "link": "https://www.facebook.com/p/Hermitage-Grill-100091822484066/",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22"
   },
   {
     "name": "Wing Wah Restaurant",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "food": [
       "Chinese"
     ],
     "type": "Chinese",
     "blurb": "Long-running Chinese restaurant on 12th Street.",
     "address": "465 12th St, Ogden, UT 84404",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-394-8788",
     "link": "https://wingwahrestaurant.com/"
   },
   {
     "name": "Jade Bowl",
     "region": "weber",
     "town": "Ogden",
     "hood": "Harrison Blvd",
     "food": [
       "Chinese"
     ],
     "type": "Chinese",
     "blurb": "Chinese restaurant with online ordering; closed Tuesdays.",
     "address": "2068 Harrison Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-621-0787",
     "link": "https://order.jadebowlut.com/"
   },
   {
     "name": "Dragon Restaurant",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "food": [
       "Chinese"
     ],
     "type": "Chinese (Mandarin)",
     "blurb": "Mandarin-style Chinese restaurant; closed Mondays.",
     "address": "303 Washington Blvd, Ogden, UT 84404",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-627-1680",
     "link": "https://www.facebook.com/p/Dragon-Restaurant-100063185770578/"
   },
   {
     "name": "Zhang's Chinese Kitchen",
     "region": "weber",
     "town": "North Ogden",
     "hood": "North Ogden",
     "food": [
       "Chinese"
     ],
     "type": "Chinese",
     "blurb": "Chinese dine-in and takeout.",
     "address": "2586 N 400 E, North Ogden, UT 84414",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-737-3393"
   },
   {
     "name": "Tona Sushi Bar & Grill",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Japanese & sushi",
       "Seafood",
       "Sit-down dinner"
     ],
     "type": "Sushi & Japanese grill",
     "blurb": "Sushi bar and Japanese grill on 25th Street; closed Sundays and Mondays.",
     "address": "210 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-622-8662",
     "link": "https://tonarestaurant.com/"
   },
   {
     "name": "Ohana Sushi & Asian Cuisine",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "food": [
       "Japanese & sushi"
     ],
     "type": "Sushi & Asian",
     "blurb": "Sushi and Japanese/Asian dishes; closed Sundays.",
     "address": "476 12th St, Ogden, UT 84404",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-621-2595",
     "link": "https://ohanasushi.com/"
   },
   {
     "name": "Watami Sushi Bistro",
     "region": "weber",
     "town": "North Ogden",
     "hood": "North Ogden",
     "food": [
       "Japanese & sushi"
     ],
     "type": "Sushi & Japanese",
     "blurb": "Sushi and Japanese restaurant in North Ogden.",
     "address": "2361 N Washington Blvd, North Ogden, UT 84414",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-737-0888",
     "link": "https://watamisushibistro.netwaiter.com/north-ogden/about/"
   },
   {
     "name": "Ramen Haus",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Japanese & sushi"
     ],
     "type": "Ramen",
     "blurb": "Ramen and Japanese comfort food downtown.",
     "address": "2550 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-393-0000",
     "link": "https://www.ramenhaus.com/"
   },
   {
     "name": "Jo Jo Bowls and Boba",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Asian bowls"
     ],
     "type": "Rice, ramen & poke bowls",
     "blurb": "Rice, ramen and poke bowls plus boba drinks; closed Sundays.",
     "address": "252 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-432-0859",
     "link": "https://www.jojobowls.com/"
   },
   {
     "name": "Son Son Asian Eats",
     "region": "weber",
     "town": "Pleasant View",
     "hood": "Pleasant View",
     "food": [
       "Asian bowls"
     ],
     "type": "Asian bowls & banh mi",
     "blurb": "Asian-inspired rice bowls, banh mi and kimchi fries; closed Sundays.",
     "address": "360 W 2650 N #3, Pleasant View, UT 84414",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-710-2448",
     "link": "https://www.sonsoneats.com/"
   },
   {
     "name": "Kesari Indian Kitchen",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Indian"
     ],
     "type": "Indian",
     "blurb": "Indian restaurant serving tandoori dishes, curries and naan.",
     "address": "2214 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-333-4779",
     "link": "https://kesariindiankitchen.com/"
   },
   {
     "name": "The Fort Cuisine of India",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Indian",
       "Vegetarian & vegan"
     ],
     "type": "Indian",
     "blurb": "Indian restaurant (formerly Red Fort) with curries, tandoori and vegan options; closed Sundays.",
     "address": "2564 Ogden Ave, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-872-3614",
     "link": "https://thefortcuisine.com/",
     "good": [
       "Vegetarian or vegan options"
     ]
   },
   {
     "name": "Awadh Aroma of India",
     "region": "weber",
     "town": "Pleasant View",
     "hood": "Pleasant View",
     "food": [
       "Indian"
     ],
     "type": "Indian",
     "blurb": "Indian restaurant in Pleasant View.",
     "address": "380 W 2650 N Ste 3, Pleasant View, UT 84414",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-333-4033"
   },
   {
     "name": "Andy's Club",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "food": [
       "Greek & Mediterranean",
       "Steak"
     ],
     "type": "Greek",
     "blurb": "Greek restaurant open since 1974 with souvlaki, gyros, steaks and a bar; closed Mondays.",
     "address": "501 N Washington Blvd, Ogden, UT 84404",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-782-9972",
     "link": "https://andysofogden.com/"
   },
   {
     "name": "Greek Garden II",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Greek & Mediterranean"
     ],
     "type": "Greek (counter service)",
     "blurb": "Counter-service Greek food like gyros and souvlaki.",
     "address": "339 E 2250 S #102, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-492-4814",
     "link": "https://www.instagram.com/greekgardentwo/"
   },
   {
     "name": "Thai-Pho Kitchen",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Vietnamese & pho",
       "Thai"
     ],
     "type": "Vietnamese & Thai",
     "blurb": "Vietnamese pho and Thai dishes; closed Mondays.",
     "address": "154 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-317-4367",
     "link": "https://www.facebook.com/thaiphokitchen/"
   },
   {
     "name": "Lost Texan BBQ",
     "region": "weber",
     "town": "Pleasant View",
     "hood": "Pleasant View",
     "food": [
       "BBQ",
       "Brunch"
     ],
     "type": "BBQ",
     "blurb": "Southern-style barbecue with a Sunday brunch menu; closed Mondays.",
     "address": "1144 W 2700 N, Pleasant View, UT 84414",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-948-9494",
     "link": "https://www.losttexanbbq.com/"
   },
   {
     "name": "Steve's Black Sabbath BBQ",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "food": [
       "BBQ"
     ],
     "type": "Texas BBQ",
     "blurb": "Texas-style barbecue; closed Mondays.",
     "address": "1895 Washington Blvd Ste 300, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-258-3545",
     "link": "https://www.instagram.com/stevesblacksabbath/"
   },
   {
     "name": "Timbermine Steakhouse",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "food": [
       "Steak",
       "Seafood",
       "Sit-down dinner"
     ],
     "type": "Steak & seafood",
     "blurb": "Mining-themed steak and seafood house near the canyon mouth, open for dinner Tuesday to Saturday.",
     "address": "1701 Park Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-393-2155",
     "link": "https://www.timbermine.com/"
   },
   {
     "name": "Prairie Schooner Steak House",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "food": [
       "Steak",
       "Sit-down dinner"
     ],
     "type": "Steakhouse",
     "blurb": "Long-running steakhouse with covered-wagon booths.",
     "address": "445 Park Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-392-2712",
     "link": "https://www.facebook.com/p/Prairie-Schooner-100057185213141/"
   },
   {
     "name": "Rovali's Ristorante Italiano",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Italian",
       "Sit-down dinner"
     ],
     "type": "Italian",
     "blurb": "Family-run Italian restaurant with a wine bar; closed Mondays.",
     "address": "174 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-394-1070",
     "link": "https://www.rovalis.com/",
     "good": [
       "Gluten-free options"
     ]
   },
   {
     "name": "La Ferrovia Italian Ristorante",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Italian"
     ],
     "type": "Italian",
     "blurb": "Casual Italian restaurant on 25th Street.",
     "address": "234 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-394-8628"
   },
   {
     "name": "Stellas on 25th",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Italian",
       "Sit-down dinner"
     ],
     "type": "Italian",
     "blurb": "Italian restaurant serving lunch and dinner.",
     "address": "225 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-333-4184",
     "link": "https://www.stellason25th.com/"
   },
   {
     "name": "Michis Pa La Banda",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "food": [
       "Seafood",
       "Mexican"
     ],
     "type": "Mariscos (Mexican seafood)",
     "blurb": "Mexican-style seafood (mariscos) and micheladas.",
     "address": "333 2nd St #4, Ogden, UT 84404",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-791-0162",
     "link": "https://michispalabanda.com/"
   },
   {
     "name": "Weller's Bistro",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "German",
       "Sit-down dinner"
     ],
     "type": "German",
     "blurb": "German restaurant with schnitzel, goulash and strudel in The Monarch building.",
     "address": "455 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-333-4128",
     "link": "https://www.wellersbistro.com/"
   },
   {
     "name": "LoLo Hawaiian BBQ",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "food": [
       "Hawaiian"
     ],
     "type": "Hawaiian plate lunch",
     "blurb": "Hawaiian plate lunches.",
     "address": "310 12th St, Ogden, UT 84404",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-392-2668"
   },
   {
     "name": "Mo' Bettahs",
     "region": "weber",
     "town": "North Ogden",
     "hood": "North Ogden",
     "food": [
       "Hawaiian"
     ],
     "type": "Hawaiian plate lunch (Utah-grown)",
     "blurb": "Utah-grown Hawaiian-style plate lunch spot; closed Sundays.",
     "address": "365 E 2600 N, North Ogden, UT 84414",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-732-1823",
     "link": "https://locations.mobettahs.com/ut/north-ogden/north-ogden/"
   },
   {
     "name": "Hearth on 25th",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Sit-down dinner"
     ],
     "type": "Scratch kitchen & tasting menu",
     "blurb": "Scratch kitchen with a wood-fired oven, a chef's tasting menu and an oil-and-vinegar shop; dinner Monday to Saturday.",
     "address": "195 25th St Ste 6, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-399-0088",
     "link": "https://www.hearth25.com/"
   },
   {
     "name": "The Garden Grille & Lounge",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Sit-down dinner"
     ],
     "type": "Restaurant & lounge",
     "blurb": "Restaurant inside the Hilton Garden Inn, open for breakfast and dinner.",
     "address": "2271 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-399-2000"
   },
   {
     "name": "Sapori Italian Bakery & Cafe",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Bakery & sweets",
       "Italian"
     ],
     "type": "Italian bakery & cafe",
     "blurb": "Italian bakery and cafe run by a family from Sicily.",
     "address": "325 24th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-244-1695",
     "link": "http://www.sapori-catering.com"
   },
   {
     "name": "Elevated Bagel Company",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Bakery & sweets",
       "Coffee & breakfast"
     ],
     "type": "Bagels",
     "blurb": "Bagel shop serving bagel sandwiches, open Wednesday to Sunday.",
     "address": "2347 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-719-9408"
   },
   {
     "name": "Lene' Marie Chocolates",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Bakery & sweets"
     ],
     "type": "Chocolates",
     "blurb": "Hand-dipped chocolates, open Tuesday to Saturday.",
     "address": "126 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-690-0345",
     "link": "https://lenemariechocolates.com/"
   },
   {
     "name": "The Cupcake Shoppe and Bakery",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Bakery & sweets"
     ],
     "type": "Cupcakes & bakery",
     "blurb": "Cupcakes, cookies and cakes, including gluten-free options; closed Sundays.",
     "address": "2352 Kiesel Ave, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-546-8252",
     "link": "https://www.thecupcakeshoppeandbakery.com/",
     "good": [
       "Gluten-free options"
     ]
   },
   {
     "name": "Nana's Sugar Shack",
     "region": "weber",
     "town": "North Ogden",
     "hood": "North Ogden",
     "food": [
       "Bakery & sweets"
     ],
     "type": "Bakery",
     "blurb": "Bakery with cinnamon rolls, cookies and eclairs; closed Wednesdays and Sundays.",
     "address": "428 E 2600 N Ste 1, North Ogden, UT 84414",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-432-0116",
     "link": "https://www.nanassugarshack.com/"
   },
   {
     "name": "O-Town Eats",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Brunch",
       "Coffee & breakfast"
     ],
     "type": "Breakfast & brunch",
     "blurb": "Breakfast, brunch and small plates daily, 8 a.m. to 3 p.m.",
     "address": "227 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-333-4135",
     "link": "https://otowneatson25th.com/"
   },
   {
     "name": "Two-Bit Bistro",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Brunch",
       "Sit-down dinner"
     ],
     "type": "Bistro & weekend brunch",
     "blurb": "Restaurant at The Bigelow hotel with weekend brunch and free live music nights.",
     "address": "2510 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-393-1225",
     "link": "https://www.twobitbistro.com/"
   },
   {
     "name": "Slop Shop Breakfast Joint",
     "region": "weber",
     "town": "Pleasant View",
     "hood": "Pleasant View",
     "food": [
       "Coffee & breakfast",
       "Brunch"
     ],
     "type": "Breakfast & lunch",
     "blurb": "Breakfast and lunch from 6 a.m. to 2 p.m.",
     "address": "420 W 2700 N Ste 200, Pleasant View, UT 84414",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-605-3646",
     "link": "https://www.instagram.com/slopshoputah/"
   },
   {
     "name": "Taboo Pizza (Riverwalk)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "food": [
       "Pizza"
     ],
     "type": "Pizza & bar",
     "blurb": "Dine-in pizzeria by the Ogden River with a full bar and riverside patio.",
     "address": "1877 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-827-0228",
     "link": "https://taboo.pizza/"
   },
   {
     "name": "Slackwater Pizzeria",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Pizza",
       "Bar & grill"
     ],
     "type": "Pizza pub",
     "blurb": "Pizza pub with specialty pizzas, appetizers and craft beer; gluten-free and vegan dough.",
     "address": "209 24th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-399-0637",
     "link": "https://www.slackwaterpizzeria.com/",
     "good": [
       "Gluten-free options"
     ]
   },
   {
     "name": "Roosters Brewing Co. (25th St)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Bar & grill",
       "Breweries & tasting rooms"
     ],
     "type": "Brewpub",
     "blurb": "Long-running brewpub on Historic 25th Street with pub food and house-brewed beer.",
     "address": "253 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-627-6171",
     "link": "https://www.roostersbrewingco.com/"
   },
   {
     "name": "Roosters B Street Brewery & Taproom",
     "region": "weber",
     "town": "Ogden",
     "hood": "Brewery",
     "food": [
       "Breweries & tasting rooms",
       "Brunch"
     ],
     "type": "Brewery & taproom (21+)",
     "blurb": "Roosters' production brewery and 21+ taproom with food and a patio; weekend brunch.",
     "address": "2325 B Ave, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-689-2879",
     "link": "https://www.roostersbrewingco.com/location/b-street/"
   },
   {
     "name": "The Sonora Grill",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Mexican"
     ],
     "type": "Mexican & Southwestern",
     "blurb": "Mexican and Southwestern restaurant with a bar.",
     "address": "2310 Kiesel Ave, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-393-1999",
     "link": "https://thesonoragrill.com/"
   },
   {
     "name": "Maria's Mexican Restaurant (downtown)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "food": [
       "Mexican"
     ],
     "type": "Mexican",
     "blurb": "Downtown branch of Maria's Mexican Restaurant.",
     "address": "352 Park Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-331-8003",
     "link": "https://www.toasttab.com/local/order/marias-mexican-restaurant-ogden-352-park-blvd"
   },
   {
     "name": "The Pie Pizzeria – Ogden",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "food": [
       "Pizza"
     ],
     "type": "Pizza (Utah-grown)",
     "blurb": "Ogden branch of the Utah pizzeria founded in 1980, near Weber State.",
     "address": "4300 Harrison Blvd #12, Ogden, UT 84403",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-627-1920",
     "link": "https://thepie.com/thepie-locations/the-pie-ogden",
     "good": [
       "Gluten-free options"
     ]
   },
   {
     "name": "Warrens Craft Burger",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Burgers & casual"
     ],
     "type": "Burgers & bar",
     "blurb": "Burger restaurant and bar on Historic 25th Street.",
     "address": "258 25th St #2302, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-781-5005",
     "link": "https://www.mycraftburger.com/"
   },
   {
     "name": "Ogden Pizzeria",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "food": [
       "Pizza"
     ],
     "type": "Pizza",
     "blurb": "Long-running local pizzeria with an aquarium in the dining room; closed Sundays.",
     "address": "936 Washington Blvd, Ogden, UT 84404",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-393-3191"
   },
   {
     "name": "Lucky Slice Pizza (25th St)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Pizza"
     ],
     "type": "Pizza by the slice",
     "blurb": "Pizza by the slice or pie on 25th Street, open late Fridays and Saturdays; gluten-free crust and vegan cheese.",
     "address": "207 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-627-2229",
     "link": "https://www.theluckyslice.com/"
   },
   {
     "name": "Kogane Korean Kitchen",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "food": [
       "Korean"
     ],
     "type": "Korean",
     "blurb": "Korean restaurant open for lunch and dinner.",
     "address": "458 40th St, Ogden, UT 84403",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-238-4163",
     "link": "https://www.facebook.com/koganekoreankitchen/"
   },
   {
     "name": "Hot Pot X & Korean BBQ",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "food": [
       "Korean"
     ],
     "type": "Korean BBQ & hot pot",
     "blurb": "All-you-can-eat hot pot and Korean BBQ cooked at the table.",
     "address": "4339 Harrison Blvd, Ogden, UT 84403",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-289-2732",
     "link": "https://www.hotpotxogden.com/"
   },
   {
     "name": "Sitara India",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "food": [
       "Indian"
     ],
     "type": "Indian",
     "blurb": "Indian restaurant near Weber State; closed Mondays.",
     "address": "3585 Harrison Blvd #214, Ogden, UT 84403",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-621-2455",
     "link": "https://sitaraindia.com/"
   },
   {
     "name": "University Broiler & Grill",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "food": [
       "Greek & Mediterranean"
     ],
     "type": "Greek",
     "blurb": "Greek grill near Weber State; closed Sundays.",
     "address": "4342 Harrison Blvd, Ogden, UT 84403",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-392-2525",
     "link": "https://ubggreek.com/"
   },
   {
     "name": "Thai Palm Kitchen",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "food": [
       "Thai",
       "Vegetarian & vegan"
     ],
     "type": "Thai",
     "blurb": "Thai restaurant with vegetarian options; closed Sundays.",
     "address": "4844 Harrison Blvd, Ogden, UT 84403",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-690-8972",
     "link": "https://www.thaipalmkitchen.com/",
     "good": [
       "Vegetarian or vegan options"
     ]
   },
   {
     "name": "Top Tier Cake Shoppe",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "food": [
       "Bakery & sweets"
     ],
     "type": "Cakes & bakery",
     "blurb": "Custom cakes and baked goods.",
     "address": "3585 Harrison Blvd Ste 218, Ogden, UT 84403",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-888-3460"
   },
   {
     "name": "The Lotus Cafe",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Coffee & breakfast"
     ],
     "type": "Cafe",
     "blurb": "Cafe serving soups, salads, sandwiches and baked goods, open daily.",
     "address": "529 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-686-1560",
     "link": "https://www.instagram.com/thelotuscafeogden/"
   },
   {
     "name": "North Branch Café",
     "region": "weber",
     "town": "North Ogden",
     "hood": "North Ogden",
     "food": [
       "Coffee & breakfast",
       "Vegetarian & vegan"
     ],
     "type": "Cafe (inside the North Branch Library)",
     "blurb": "Cafe inside the North Branch Library with gluten-free, vegan and vegetarian options.",
     "address": "475 E 2600 N, North Ogden, UT 84414",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-710-5457",
     "link": "https://northbranch.cafe/",
     "good": [
       "Gluten-free options",
       "Vegetarian or vegan options"
     ]
   },
   {
     "name": "Harp & Hound",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Bar & grill",
       "Vegetarian & vegan"
     ],
     "type": "Irish pub",
     "blurb": "Irish pub with a full vegan pub menu alongside its regular menu.",
     "address": "2550 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-621-3483",
     "link": "https://harphound.com/",
     "good": [
       "Vegetarian or vegan options"
     ]
   },
   {
     "name": "Pinky's Food Hauz",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "food": [
       "Filipino"
     ],
     "type": "Filipino",
     "blurb": "Filipino food inside an Asian market.",
     "address": "1018 Washington Blvd, Ogden, UT 84404",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-648-9705",
     "link": "http://www.orderpinkysfoodhauz.com/"
   },
   {
     "name": "Talisman Brewing Co.",
     "region": "weber",
     "town": "Ogden",
     "hood": "Brewery",
     "food": [
       "Breweries & tasting rooms"
     ],
     "type": "Brewery taproom",
     "blurb": "Small brewery taproom with no kitchen; bring your own food. Closed Sundays.",
     "address": "1258 Gibson Ave, Ogden, UT 84404",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "385-389-2945",
     "link": "https://talismanbrewingco.com/"
   },
   {
     "name": "Ogden's Own Distillery & Side Bar",
     "region": "weber",
     "town": "Ogden",
     "hood": "Brewery",
     "food": [
       "Breweries & tasting rooms",
       "Drinks & apres"
     ],
     "type": "Distillery & cocktail bar",
     "blurb": "Distillery with Side Bar, serving 40-plus craft cocktails Wednesday to Sunday evenings.",
     "address": "615 W Stockman Way, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-675-3204",
     "link": "https://www.ogdensown.com/side-bar/"
   },
   {
     "name": "Ogden Beer Company",
     "region": "weber",
     "town": "Ogden",
     "hood": "Brewery",
     "food": [
       "Breweries & tasting rooms",
       "Bar & grill"
     ],
     "type": "Brewpub",
     "blurb": "Brewpub by the river with food, a rooftop and a patio.",
     "address": "358 Park Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-884-6939",
     "link": "https://ogdenbeercompany.com/"
   },
   {
     "name": "UTOG Brewing Co.",
     "region": "weber",
     "town": "Ogden",
     "hood": "Brewery",
     "food": [
       "Breweries & tasting rooms",
       "Bar & grill"
     ],
     "type": "Brewery & restaurant",
     "blurb": "Downtown brewery and full restaurant with an on-site beer store; many menu items marked gluten-free.",
     "address": "2331 Grant Ave, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-689-3476",
     "link": "https://www.utogbrewing.com/",
     "good": [
       "Gluten-free options"
     ]
   },
   {
     "name": "The Angry Goat Pub N Kitchen",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "food": [
       "Breweries & tasting rooms",
       "Bar & grill"
     ],
     "type": "Beer bar (21+)",
     "blurb": "21+ pub with a large beer list, food and a rooftop patio.",
     "address": "2570 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-675-5757"
   },
   {
     "name": "The Greenery Restaurant",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "food": [
       "Burgers & casual",
       "Sit-down dinner"
     ],
     "type": "Restaurant at Rainbow Gardens",
     "blurb": "Long-running restaurant inside the Rainbow Gardens gift center at the mouth of Ogden Canyon, open daily for lunch and dinner.",
     "address": "1875 Valley Dr, Ogden, UT 84401",
     "checked": "2026-10-22",
     "factsChecked": "2026-10-22",
     "phone": "801-392-1777",
     "link": "https://rainbowgardens.com/contact-greenery-restaurant/"
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
     "photos": [
       "valley-wine-spirits-eden-cabins.jpg"
     ],
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
     "checked": "2026-10-07",
     "sells": [
       "groceries",
       "pharmacy (Valley Health Mart Pharmacy inside)"
     ]
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
   },
   {
     "name": "Maverik (Eden)",
     "town": "Eden",
     "kind": "Everyday needs",
     "type": "Gas station & convenience store",
     "blurb": "Gas station and convenience store, open 5 a.m. to midnight every day.",
     "sells": [
       "gas",
       "gas station",
       "fuel",
       "convenience store",
       "snacks"
     ],
     "phone": "801-745-3800",
     "link": "https://locations.maverik.com/ut/eden/5100-e.-2500-n.",
     "address": "5100 E 2500 N, Eden, UT 84310",
     "checked": "2026-10-22",
     "added": "2026-10-22"
   },
   {
     "name": "Rainbow Gardens Gift Store",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "kind": "Gifts & candles",
     "type": "Gifts & candles",
     "blurb": "Large gift store at the mouth of Ogden Canyon, with The Greenery restaurant and a cafe on site.",
     "sells": [
       "gifts",
       "home decor",
       "cards",
       "candy",
       "soaps",
       "Utah gifts"
     ],
     "address": "1851 Valley Dr, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-621-1606",
     "link": "https://rainbowgardens.com/"
   },
   {
     "name": "The Queen Bee Giftery",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Gifts & candles",
     "type": "Gifts & candles",
     "blurb": "Independent gift shop on 25th Street.",
     "sells": [
       "books",
       "chocolate",
       "candles",
       "stationery",
       "cards",
       "toys",
       "puzzles",
       "jewelry",
       "Utah souvenirs"
     ],
     "address": "270 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-317-4226",
     "link": "https://queenbeegiftery.com/"
   },
   {
     "name": "The Wick Lab (Ogden)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Gifts & candles",
     "type": "Gifts & candles",
     "blurb": "Utah-grown pour-your-own candle studio.",
     "sells": [
       "candles",
       "candle making",
       "custom candles",
       "parties",
       "gift cards"
     ],
     "address": "2361 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "385-865-8130",
     "link": "https://thewicklab.com/"
   },
   {
     "name": "Art Box Ogden",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Gifts & candles",
     "type": "Gifts & candles",
     "blurb": "Candle shop and make-your-own candle studio with a gift shop and art classes.",
     "sells": [
       "candles",
       "candle making",
       "gifts",
       "art classes"
     ],
     "address": "455 25th St (The Monarch), Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-675-1078",
     "link": "https://artboxogden.com/"
   },
   {
     "name": "The Local Artisan Collective",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Gifts & candles",
     "type": "Gifts & candles",
     "blurb": "Shop selling work by Utah artists, with walk-in make-and-take crafts and workshops for all ages.",
     "sells": [
       "jewelry",
       "art prints",
       "cards",
       "candles",
       "home decor",
       "art kits",
       "classes",
       "workshops",
       "kids crafts"
     ],
     "address": "2371 Kiesel Ave, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-399-2787",
     "link": "https://localartisancollective.com/"
   },
   {
     "name": "Beehive Naturals",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Soap & bath",
     "type": "Soap & bath",
     "blurb": "Storefront of a Utah maker of honey and goat-milk body products.",
     "sells": [
       "handmade soap",
       "goat milk soap",
       "soap",
       "lotion",
       "raw honey",
       "beeswax candles",
       "gift sets",
       "bath"
     ],
     "address": "186 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-917-9585",
     "link": "https://beehivenaturals.com/"
   },
   {
     "name": "Wild Meraki Apothecary",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Soap & bath",
     "type": "Soap & bath",
     "blurb": "Small-batch herbal apothecary and handmade-paper studio.",
     "sells": [
       "herbs",
       "tinctures",
       "tea",
       "bath salts",
       "salves",
       "incense",
       "handmade paper"
     ],
     "address": "443 27th St Suite B, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-814-5640",
     "link": "https://wildmerakicreations.com/"
   },
   {
     "name": "Lund Floral",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "kind": "Florists",
     "type": "Florists",
     "blurb": "Florist on 12th Street.",
     "sells": [
       "flowers",
       "florist",
       "arrangements",
       "wedding flowers"
     ],
     "address": "483 12th St, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-627-2424"
   },
   {
     "name": "Jimmy's Flowers",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Florists",
     "type": "Florists",
     "blurb": "Ogden florist since 1948, with same-day delivery.",
     "sells": [
       "flowers",
       "florist",
       "plants",
       "gift baskets",
       "sympathy flowers",
       "weddings",
       "delivery"
     ],
     "address": "2735 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-621-2360",
     "link": "https://jimmysflowers.com/"
   },
   {
     "name": "The Posy Place",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Florists",
     "type": "Florists",
     "blurb": "Florist with same-day Ogden delivery for orders placed before 10 a.m.",
     "sells": [
       "flowers",
       "florist",
       "bouquets",
       "plants",
       "gifts",
       "delivery"
     ],
     "address": "2757 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-621-4010",
     "link": "https://theposyplace.com/"
   },
   {
     "name": "Lee's Corner Floral Shop",
     "region": "weber",
     "town": "North Ogden",
     "hood": "North Ogden",
     "kind": "Florists",
     "type": "Florists",
     "blurb": "Florist and gift shop in North Ogden.",
     "sells": [
       "flowers",
       "florist",
       "gifts"
     ],
     "address": "2645 N Washington Blvd, North Ogden, UT 84414",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-782-7800"
   },
   {
     "name": "Planet Rainbow",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "kind": "Herbs, crystals & metaphysical",
     "type": "Herbs, crystals & metaphysical",
     "blurb": "New Age shop at the Rainbow Gardens complex.",
     "sells": [
       "crystals",
       "metaphysical",
       "psychic readings"
     ],
     "address": "1833 Valley Dr, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-392-3902",
     "link": "https://rainbowgardens.com/"
   },
   {
     "name": "Khroma Herbal Products",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Herbs, crystals & metaphysical",
     "type": "Herbs, crystals & metaphysical",
     "blurb": "Organic herbal blends and tinctures sold in glass, plus local artisan goods.",
     "sells": [
       "herbs",
       "tinctures",
       "tea",
       "local gifts"
     ],
     "address": "2335 Grant Ave, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-994-8097"
   },
   {
     "name": "Bryson's Rock Shop",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "kind": "Herbs, crystals & metaphysical",
     "type": "Herbs, crystals & metaphysical",
     "blurb": "Rock, gem and jewelry shop.",
     "sells": [
       "crystals",
       "rocks",
       "gemstones",
       "jewelry"
     ],
     "address": "326 Washington Blvd, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-399-2838"
   },
   {
     "name": "Goodlife Gemz Crystal Shop",
     "region": "weber",
     "town": "North Ogden",
     "hood": "North Ogden",
     "kind": "Herbs, crystals & metaphysical",
     "type": "Herbs, crystals & metaphysical",
     "blurb": "Crystal shop.",
     "sells": [
       "crystals",
       "stones"
     ],
     "address": "380 E 2000 N, North Ogden, UT 84414",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "385-303-0446"
   },
   {
     "name": "Ogden Made",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Boutiques & clothing",
     "type": "Boutiques & clothing",
     "blurb": "Ogden outdoor-lifestyle apparel brand.",
     "sells": [
       "hats",
       "sweatshirts",
       "t-shirts",
       "beanies",
       "clothing"
     ],
     "address": "2314 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-626-8820",
     "link": "https://ogdenmade.com/"
   },
   {
     "name": "Urban Trend",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Boutiques & clothing",
     "type": "Boutiques & clothing",
     "blurb": "Clothing store.",
     "sells": [
       "clothing"
     ],
     "address": "2943 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-917-5433"
   },
   {
     "name": "Ogden Blue Boutique",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "kind": "Boutiques & clothing",
     "type": "Boutiques & clothing",
     "blurb": "Women's clothing boutique.",
     "sells": [
       "clothing",
       "boutique"
     ],
     "address": "3365 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-334-4228"
   },
   {
     "name": "LIAM & CO.",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "kind": "Boutiques & clothing",
     "type": "Boutiques & clothing",
     "blurb": "Women's clothing store.",
     "sells": [
       "clothing",
       "boutique"
     ],
     "address": "3041 Pennsylvania Ave, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22"
   },
   {
     "name": "Four Sisters Furniture, Framing & Gifts",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Home decor & plants",
     "type": "Home decor & plants",
     "blurb": "Unfinished hardwood furniture, custom framing, home decor and local-artisan gifts.",
     "sells": [
       "furniture",
       "framing",
       "home decor",
       "gifts"
     ],
     "address": "274 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-621-5807"
   },
   {
     "name": "Vintiquers",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "kind": "Home decor & plants",
     "type": "Home decor & plants",
     "blurb": "Home-goods and vintage shop.",
     "sells": [
       "vintage",
       "antiques",
       "home decor",
       "thrift"
     ],
     "address": "806 Washington Blvd, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-452-1911"
   },
   {
     "name": "Jungle Room Plant & Candle Co.",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Home decor & plants",
     "type": "Home decor & plants",
     "blurb": "Houseplant shop that also sells candles.",
     "sells": [
       "houseplants",
       "plants",
       "pots",
       "candles",
       "room sprays"
     ],
     "address": "2232 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-332-9037",
     "link": "https://thejungleroomplants.com/"
   },
   {
     "name": "The Romantics Archive",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Bookstores",
     "type": "Bookstores",
     "blurb": "Romance-focused bookshop that serves coffee and wine.",
     "sells": [
       "books",
       "bookstore",
       "romance",
       "fiction"
     ],
     "address": "290 25th St Ste 101, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "link": "https://theromanticsarchive.com/"
   },
   {
     "name": "Chapter & Charm Bookshop",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Bookstores",
     "type": "Bookstores",
     "blurb": "New books with a romance focus.",
     "sells": [
       "books",
       "bookstore",
       "romance"
     ],
     "address": "2556 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-821-9837",
     "link": "https://chapterandcharmbookshop.com/"
   },
   {
     "name": "Underground Books",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "kind": "Bookstores",
     "type": "Bookstores",
     "blurb": "Used bookstore with a reading room and game room.",
     "sells": [
       "books",
       "bookstore",
       "used books",
       "games"
     ],
     "address": "4850 Harrison Blvd #3, Ogden, UT 84403",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-791-5742"
   },
   {
     "name": "A Novel Idea Book Parlor",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "kind": "Bookstores",
     "type": "Bookstores",
     "blurb": "Used books, with a local-author section.",
     "sells": [
       "books",
       "bookstore",
       "used books"
     ],
     "address": "3651 Wall Ave #1002 (Newgate Mall), Ogden, UT 84405",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-917-5545",
     "link": "https://facebook.com/novelideabookparlor"
   },
   {
     "name": "The Quilted Bear",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "kind": "Toys & games",
     "type": "Toys & games",
     "blurb": "Gift, toy and home store.",
     "sells": [
       "toys",
       "gifts",
       "home decor"
     ],
     "address": "3651 Wall Ave #1129 (Newgate Mall), Ogden, UT 84405",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-621-0760"
   },
   {
     "name": "Bungster's Brix",
     "region": "weber",
     "town": "South Ogden",
     "hood": "South Ogden",
     "kind": "Toys & games",
     "type": "Toys & games",
     "blurb": "Toy store.",
     "sells": [
       "toys",
       "building bricks"
     ],
     "address": "3701 Washington Blvd Ste A, South Ogden, UT 84403",
     "checked": "2026-10-22",
     "added": "2026-10-22"
   },
   {
     "name": "HEEBEEGEEBEEZ",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Toys & games",
     "type": "Toys & games",
     "blurb": "Family-owned comic shop with games and collectibles.",
     "sells": [
       "comics",
       "games",
       "collectibles",
       "trading cards",
       "toys"
     ],
     "address": "2262 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-392-5094",
     "link": "https://heebeegeebeez.com/"
   },
   {
     "name": "Needlepoint Joint",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Yarn, fabric & crafts",
     "type": "Yarn, fabric & crafts",
     "blurb": "Family-owned fiber-arts shop open since 1973.",
     "sells": [
       "yarn",
       "knitting",
       "crochet",
       "needlepoint",
       "weaving",
       "thread",
       "craft supplies"
     ],
     "address": "241 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-394-4355",
     "link": "https://needlepointjoint.com/"
   },
   {
     "name": "Shepherd's Bush",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Yarn, fabric & crafts",
     "type": "Yarn, fabric & crafts",
     "blurb": "Needlework store.",
     "sells": [
       "cross-stitch",
       "needlework",
       "threads",
       "craft supplies"
     ],
     "address": "220 24th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-399-4546"
   },
   {
     "name": "The Quilted Beehive",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "kind": "Yarn, fabric & crafts",
     "type": "Yarn, fabric & crafts",
     "blurb": "Quilt and fabric shop at the Rainbow Gardens complex.",
     "sells": [
       "fabric",
       "quilting",
       "sewing"
     ],
     "address": "1843 Valley Dr, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-621-2202"
   },
   {
     "name": "Ogden Creative Reuse",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Yarn, fabric & crafts",
     "type": "Yarn, fabric & crafts",
     "blurb": "Thrift store for donated art and craft supplies, with art classes.",
     "sells": [
       "fabric",
       "yarn",
       "sewing supplies",
       "beads",
       "paints",
       "canvases",
       "art supplies",
       "craft supplies",
       "thrift",
       "classes"
     ],
     "address": "2424 Wall Ave, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-556-7210",
     "link": "https://ogdencreativereuse.org/"
   },
   {
     "name": "Aqua Fresca",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "kind": "Art supplies & framing",
     "type": "Art supplies & framing",
     "blurb": "Graffiti art-supply shop.",
     "sells": [
       "spray paint",
       "art supplies"
     ],
     "address": "1666 Washington Blvd, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "385-389-9473"
   },
   {
     "name": "Pintura Fine Art Imaging & Framing",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Art supplies & framing",
     "type": "Art supplies & framing",
     "blurb": "Custom framing and art printing.",
     "sells": [
       "framing",
       "art printing"
     ],
     "address": "2917 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "385-389-2958"
   },
   {
     "name": "Backcountry Outlet (Ogden)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "kind": "Outdoor, ski & bike",
     "type": "Outdoor, ski & bike",
     "blurb": "Outdoor-gear outlet store right at the mouth of Ogden Canyon.",
     "sells": [
       "outdoor gear",
       "ski",
       "camping",
       "clothing"
     ],
     "address": "1273 Canyon Rd, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "435-631-2618"
   },
   {
     "name": "Alpine Sports",
     "region": "weber",
     "town": "Ogden",
     "hood": "Harrison Blvd",
     "kind": "Outdoor, ski & bike",
     "type": "Outdoor, ski & bike",
     "blurb": "Ski shop with a custom boot lab, ski tuning and rentals.",
     "sells": [
       "ski",
       "ski boots",
       "tuning",
       "rentals",
       "snowboard"
     ],
     "address": "1165 Patterson St, Ogden, UT 84403",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-393-0066"
   },
   {
     "name": "Skyline Cycle",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "kind": "Outdoor, ski & bike",
     "type": "Outdoor, ski & bike",
     "blurb": "Bike shop that repairs all brands without an appointment, and tunes skis and snowboards.",
     "sells": [
       "bike",
       "bike repair",
       "ski tuning",
       "snowboard"
     ],
     "address": "834 Washington Blvd, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-394-7700",
     "link": "https://skylinecyclery.com/"
   },
   {
     "name": "Bountiful Bicycle (Ogden)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "kind": "Outdoor, ski & bike",
     "type": "Outdoor, ski & bike",
     "blurb": "Bike shop selling bikes, e-bikes and kids' bikes, with service and bike fitting.",
     "sells": [
       "bike",
       "e-bike",
       "kids bikes",
       "bike repair"
     ],
     "address": "1108 Washington Blvd, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-424-5300",
     "link": "https://bountifulbicycle.com/"
   },
   {
     "name": "Ogden Bicycle Collective",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Outdoor, ski & bike",
     "type": "Outdoor, ski & bike",
     "blurb": "Nonprofit community bike shop.",
     "sells": [
       "bike",
       "bike repair",
       "used bikes"
     ],
     "address": "936 28th St, Ogden, UT 84403",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-997-0336"
   },
   {
     "name": "Neighbors Thrift",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Thrift & vintage",
     "type": "Thrift & vintage",
     "blurb": "Thrift store with clothing, accessories and housewares.",
     "sells": [
       "thrift",
       "clothing",
       "housewares"
     ],
     "address": "2210 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-913-5069"
   },
   {
     "name": "25th Street Treasures",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "kind": "Thrift & vintage",
     "type": "Thrift & vintage",
     "blurb": "Home-goods store.",
     "sells": [
       "home goods",
       "thrift"
     ],
     "address": "180 31st St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-394-9035"
   },
   {
     "name": "Farr's Jewelry & Cameras",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Jewelry",
     "type": "Jewelry",
     "blurb": "Jewelry store founded in 1956, with custom design and repairs.",
     "sells": [
       "jewelry",
       "engagement rings",
       "watches",
       "jewelry repair",
       "ring sizing"
     ],
     "address": "2466 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-621-7666",
     "link": "https://farrs.com/"
   },
   {
     "name": "The Diamond Room",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Jewelry",
     "type": "Jewelry",
     "blurb": "Jewelry, custom design, repairs and appraisals.",
     "sells": [
       "jewelry",
       "jewelry repair",
       "appraisals"
     ],
     "address": "131 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-392-3232"
   },
   {
     "name": "Green Brick Jewelry",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Jewelry",
     "type": "Jewelry",
     "blurb": "Jewelry store.",
     "sells": [
       "jewelry"
     ],
     "address": "2937 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-668-7548"
   },
   {
     "name": "White Diamonds",
     "region": "weber",
     "town": "North Ogden",
     "hood": "North Ogden",
     "kind": "Jewelry",
     "type": "Jewelry",
     "blurb": "Jewelry store.",
     "sells": [
       "jewelry"
     ],
     "address": "1638 N Washington Blvd #202, North Ogden, UT 84414",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-782-3531"
   },
   {
     "name": "IFA Country Store",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "kind": "Pets & farm",
     "type": "Pets & farm",
     "blurb": "Utah farm and ranch co-op store.",
     "sells": [
       "pet food",
       "livestock feed",
       "farm supplies",
       "ranch supplies",
       "pet"
     ],
     "address": "1069 W 12th St, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-394-8831"
   },
   {
     "name": "Pets That Don't Bark",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "kind": "Pets & farm",
     "type": "Pets & farm",
     "blurb": "Reptile and exotic-pet shop.",
     "sells": [
       "reptiles",
       "exotic pets",
       "pet supplies"
     ],
     "address": "3651 Wall Ave #1214 (Newgate Mall), Ogden, UT 84405",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-876-1212"
   },
   {
     "name": "Lomond View Nursery",
     "region": "weber",
     "town": "Pleasant View",
     "hood": "Pleasant View",
     "kind": "Garden & nursery",
     "type": "Garden & nursery",
     "blurb": "Plant nursery. Call ahead for retail hours.",
     "sells": [
       "plants",
       "nursery",
       "garden",
       "trees"
     ],
     "address": "304 W Pleasant View Dr, Pleasant View, UT 84414",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-782-0484"
   },
   {
     "name": "Ocean Mart",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "kind": "Groceries & markets",
     "type": "Groceries & markets",
     "blurb": "Asian grocery store.",
     "sells": [
       "asian grocery",
       "grocery",
       "international food"
     ],
     "address": "1018 Washington Blvd, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-899-9888"
   },
   {
     "name": "Rancho Markets",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Groceries & markets",
     "type": "Groceries & markets",
     "blurb": "Utah-based Latin supermarket with a meat and seafood counter, bakery and kitchen.",
     "sells": [
       "latin grocery",
       "grocery",
       "butcher",
       "meat",
       "bakery",
       "international food"
     ],
     "address": "905 26th St #99A, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-409-9300",
     "link": "https://ranchomarkets.com/"
   },
   {
     "name": "Anaya's Market",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "kind": "Groceries & markets",
     "type": "Groceries & markets",
     "blurb": "Latin grocery store.",
     "sells": [
       "latin grocery",
       "grocery",
       "international food"
     ],
     "address": "150 N Washington Blvd #1, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-393-4596"
   },
   {
     "name": "DeMarillac Formal Attire & Alterations",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Tailor & repair",
     "type": "Tailor & repair",
     "blurb": "Nonprofit formalwear shop that also does alterations. Open Mon, Wed and Fri, 11 to 4.",
     "sells": [
       "tailor",
       "alterations",
       "formalwear"
     ],
     "address": "2620 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-393-0100"
   },
   {
     "name": "The Loft Alteration Specialist",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "kind": "Tailor & repair",
     "type": "Tailor & repair",
     "blurb": "Alterations, hemming and outdoor-gear repair.",
     "sells": [
       "tailor",
       "alterations",
       "hemming",
       "gear repair"
     ],
     "address": "3201 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-385-8101"
   },
   {
     "name": "Red Hanger (North Ogden)",
     "region": "weber",
     "town": "North Ogden",
     "hood": "North Ogden",
     "kind": "Tailor & repair",
     "type": "Tailor & repair",
     "blurb": "Dry cleaner that also does tailoring.",
     "sells": [
       "dry cleaning",
       "tailor",
       "alterations"
     ],
     "address": "2274 N Washington Blvd, North Ogden, UT 84414",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-457-9342"
   },
   {
     "name": "Jack's Shoe Repair",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Tailor & repair",
     "type": "Tailor & repair",
     "blurb": "Shoe repair shop.",
     "sells": [
       "shoe repair",
       "boot repair"
     ],
     "address": "2246 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-392-6731"
   },
   {
     "name": "Canyon View Health Mart Pharmacy",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "kind": "Everyday needs",
     "type": "Everyday needs",
     "blurb": "Locally owned pharmacy inside Ogden Clinic Canyon View, with free delivery.",
     "sells": [
       "pharmacy",
       "prescriptions",
       "delivery"
     ],
     "address": "698 12th St, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-475-3795"
   },
   {
     "name": "Smith's (Harrison Blvd)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "kind": "Everyday needs",
     "type": "Everyday needs",
     "blurb": "Grocery store with a pharmacy and fuel center, closest to the mouth of the canyon.",
     "sells": [
       "grocery",
       "groceries",
       "pharmacy",
       "gas",
       "fuel"
     ],
     "address": "1485 Harrison Blvd, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-621-0234"
   },
   {
     "name": "Chevron (12th St)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "kind": "Everyday needs",
     "type": "Everyday needs",
     "blurb": "Gas station on 12th Street.",
     "sells": [
       "gas",
       "gas station",
       "fuel",
       "convenience store"
     ],
     "address": "1177 12th St, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-393-6126"
   },
   {
     "name": "Sinclair Mini Mart (12th St)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "kind": "Everyday needs",
     "type": "Everyday needs",
     "blurb": "Gas station and mini mart on 12th Street.",
     "sells": [
       "gas",
       "gas station",
       "fuel",
       "convenience store"
     ],
     "address": "1015 12th St, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-392-7528"
   },
   {
     "name": "Walgreens (Washington Blvd)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "kind": "Everyday needs",
     "type": "Everyday needs",
     "blurb": "Pharmacy and drugstore.",
     "sells": [
       "pharmacy",
       "drugstore"
     ],
     "address": "1208 Washington Blvd, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-621-1367"
   },
   {
     "name": "Fresh Market (Harrison Blvd)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Harrison Blvd",
     "kind": "Everyday needs",
     "type": "Everyday needs",
     "blurb": "Grocery store with a pharmacy.",
     "sells": [
       "grocery",
       "groceries",
       "pharmacy"
     ],
     "address": "2044 S Harrison Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-399-1304"
   },
   {
     "name": "U.S. Post Office (Washington Blvd)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Everyday needs",
     "type": "Everyday needs",
     "blurb": "Post office, open Mon to Fri 8:30 to 5.",
     "sells": [
       "post office",
       "mail",
       "shipping"
     ],
     "address": "2730 Washington Blvd, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22"
   },
   {
     "name": "The UPS Store (12th St)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Washington Blvd",
     "kind": "Everyday needs",
     "type": "Everyday needs",
     "blurb": "Shipping and mailbox store.",
     "sells": [
       "shipping",
       "ups",
       "mail"
     ],
     "address": "185 W 12th St, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22"
   },
   {
     "name": "Inspire Gymnastics",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Kids' classes",
     "type": "Kids' classes · Gymnastics",
     "blurb": "Gymnastics gym.",
     "sells": [
       "kids classes",
       "lessons",
       "gymnastics",
       "kids"
     ],
     "address": "1960 Wall Ave, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "385-289-2962"
   },
   {
     "name": "Dance Establishment",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Kids' classes",
     "type": "Kids' classes · Dance",
     "blurb": "Dance school.",
     "sells": [
       "kids classes",
       "lessons",
       "dance",
       "kids"
     ],
     "address": "2261 Kiesel Ave #330, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22"
   },
   {
     "name": "Dazzle Dance and Cheer",
     "region": "weber",
     "town": "Ogden",
     "hood": "North Ogden",
     "kind": "Kids' classes",
     "type": "Kids' classes · Dance",
     "blurb": "Dance and cheer studio.",
     "sells": [
       "kids classes",
       "lessons",
       "dance",
       "kids"
     ],
     "address": "325 E 2000 N, Ogden, UT 84414",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-737-3047"
   },
   {
     "name": "Foleys Mixed Martial Arts",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "kind": "Kids' classes",
     "type": "Kids' classes · Martial arts",
     "blurb": "Martial arts school.",
     "sells": [
       "kids classes",
       "lessons",
       "martial arts",
       "kids"
     ],
     "address": "375 31st St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-628-8520"
   },
   {
     "name": "Element Mixed Martial Arts",
     "region": "weber",
     "town": "North Ogden",
     "hood": "North Ogden",
     "kind": "Kids' classes",
     "type": "Kids' classes · Martial arts",
     "blurb": "Martial arts school.",
     "sells": [
       "kids classes",
       "lessons",
       "martial arts",
       "kids"
     ],
     "address": "2566 N 400 E, North Ogden, UT 84414",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "385-240-8069"
   },
   {
     "name": "Imagine Music Ogden",
     "region": "weber",
     "town": "Ogden",
     "hood": "South Ogden",
     "kind": "Kids' classes",
     "type": "Kids' classes · Music lessons",
     "blurb": "Music lessons.",
     "sells": [
       "kids classes",
       "lessons",
       "music lessons",
       "kids"
     ],
     "address": "3354 Harrison Blvd, Ogden, UT 84403",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-644-7027"
   },
   {
     "name": "Brush Up Children's Art Studio",
     "region": "weber",
     "town": "Pleasant View",
     "hood": "Pleasant View",
     "kind": "Kids' classes",
     "type": "Kids' classes · Art",
     "blurb": "Kids' art studio.",
     "sells": [
       "kids classes",
       "lessons",
       "art",
       "kids"
     ],
     "address": "3885 US-89, Pleasant View, UT 84414",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-710-0525"
   },
   {
     "name": "Color Me Mine (Ogden)",
     "region": "weber",
     "town": "Ogden",
     "hood": "Downtown & 25th St",
     "kind": "Kids' classes",
     "type": "Kids' classes · Art",
     "blurb": "Paint-your-own pottery studio that hosts kids' parties.",
     "sells": [
       "kids classes",
       "lessons",
       "art",
       "kids"
     ],
     "address": "188 25th St, Ogden, UT 84401",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-621-1085"
   },
   {
     "name": "Ben Lomond Community Swimming Pool",
     "region": "weber",
     "town": "Ogden",
     "hood": "Canyon mouth / 12th St",
     "kind": "Kids' classes",
     "type": "Kids' classes · Swimming",
     "blurb": "Community pool. Ask about swim lessons.",
     "sells": [
       "kids classes",
       "lessons",
       "swimming",
       "kids"
     ],
     "address": "1075 E 700 S St, Ogden, UT 84404",
     "checked": "2026-10-22",
     "added": "2026-10-22",
     "phone": "801-737-7920"
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
   "sells": ["Chicken", "Turkey", "Eggs", "Pork", "Beef", "Lamb"],
   "town": "Liberty",
   "type": "Meat and eggs ranch",
   "blurb": "Pasture-raised chicken, turkey, duck, eggs and pork, plus grass-fed and grass-finished beef and lamb.",
   "phone": "(801) 391-2221",
   "link": "https://www.argyleacres.farm",
   "checked": "2026-10-07"
  },
  {
   "name": "McFarland Family Farms - White Barn Farm",
   "sells": ["Flowers"],
   "buy": ["U-pick", "Farmers market"],
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
   "sells": ["Vegetables", "Fruit", "Flowers", "Honey", "Beef"],
   "town": "Eden",
   "type": "Produce farm",
   "blurb": "Vegetables, greens, fruit (peaches, raspberries, apples, pears), herbs, flowers, honey, pickles and beef, seasonal.",
   "phone": "(801) 866-3620",
   "link": "https://sandhillfarms.org",
   "checked": "2026-10-07"
  },
  {
   "name": "Sunnyfield Farm",
   "sells": ["Beef", "Pork", "Lamb", "Eggs", "Honey", "Turkey"],
   "buy": ["Farm stand", "Order online"],
   "town": "Eden",
   "type": "Beef ranch / Farm store",
   "blurb": "Scottish Highland beef plus pork, lamb, eggs, honey, garlic and seasonal turkeys and pumpkins, sold at the farm or on its website.",
   "link": "https://sunnyfield-farm.com/",
   "address": "2103 N 5500 E, Eden, UT 84310",
   "checked": "2026-10-07"
  },
  {
   "name": "Dancing Moose Farm",
   "sells": ["Beef", "Honey"],
   "buy": ["Order online"],
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
   "sells": ["Honey"],
   "buy": ["Pickup by appointment"],
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
 ],
 "stay": [
   {
     "name": "Compass Rose Lodge & HALO Observatory",
     "town": "Huntsville Town",
     "kind": "Lodge & inn",
     "type": "Boutique lodge & observatory",
     "blurb": "Boutique lodge in Huntsville with an on-site observatory offering stargazing tours, and First Lift Coffee.",
     "phone": "385-279-4460",
     "link": "https://compassroselodge.com",
     "address": "198 S 7400 E, Huntsville, UT 84317",
     "checked": "2026-10-07"
   },
   {
     "name": "Edelweiss Inn",
     "town": "Eden",
     "kind": "Lodge & inn",
     "type": "Inn",
     "blurb": "Lodging near Nordic Valley.",
     "phone": "850-866-8418",
     "address": "2548 Nordic Valley Dr, Eden, UT 84310",
     "checked": "2026-10-07"
   },
   {
     "name": "Jackson Fork Inn",
     "town": "Huntsville area",
     "kind": "Lodge & inn",
     "type": "Inn",
     "blurb": "Inn on Highway 39 in Huntsville.",
     "checked": "2026-10-07"
   },
   {
     "name": "Wolf Creek Resort",
     "town": "Eden",
     "kind": "Resort stay",
     "type": "Golf resort lodging",
     "blurb": "Semi-private 18-hole golf club established in 1963 with a fitness club, restaurant and lodging.",
     "phone": "801-745-3737",
     "link": "https://www.wolfcreekresort.com",
     "address": "3718 N Wolf Creek Dr, Eden, UT 84310",
     "checked": "2026-10-07"
   },
   {
     "name": "WorldMark Wolf Creek",
     "town": "Eden",
     "kind": "Resort stay",
     "type": "Timeshare & resort lodging",
     "blurb": "Timeshare/resort lodging at Wolf Creek.",
     "address": "3718 N Wolf Creek Dr, Eden, UT 84310",
     "checked": "2026-10-07"
   }
 ]
};

/* ===== FORM LISTINGS: written every hour from the Business listings sheet (approved rows only). Edit the sheet, not this section. ===== */
(function (F) { var P = window.OVE_PLACES = window.OVE_PLACES || {}; for (var k in F) P[k] = (P[k] || []).concat(F[k]); })({
 "farm": [
  {
   "name": "Grace Haven Farm",
   "type": "Farm, grower or food maker.",
   "area": "Huntsville",
   "blurb": "Homemade and simple is best.",
   "home": true,
   "serves": "Huntsville",
   "phone": "9072321068",
   "hours": "N/A",
   "note": "Known for: Eggs, honey, chicken feed co-op, Alaskan seafood co-op, fresh veggies, sourdough cinnamon rolls and flavored loaves.",
   "badges": [
    "Veteran owned",
    "Family owned",
    "Woman owned",
    "Licensed"
   ],
   "photos": [
    "https://drive.google.com/thumbnail?id=1TpJKR_o0WgTjpkhh7p5Xr0OOaUh1CkqY&sz=w1000",
    "https://drive.google.com/thumbnail?id=1FtDDRGG_cYv2sW9K--vgW5PC9YrCdJCw&sz=w1000",
    "https://drive.google.com/thumbnail?id=1DSdszmoFQ1SBACtTDDHP7GovMyt41ZCq&sz=w1000",
    "https://drive.google.com/thumbnail?id=1zXSWe89uJNEJGSEavW5czkkKuZ1rKMJh&sz=w1000",
    "https://drive.google.com/thumbnail?id=1utM2wWtJhP--GsJlRGeCt5ckUpOf6hGA&sz=w1000"
   ],
   "added": "2026-10-19",
   "fromForm": true
  }
 ]
});
