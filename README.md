# ogdenvalley.github.io

Ogden Valley Information & Events, celebrating 10 years. Community calendars for Ogden Valley and Weber County, local restaurants, Valley businesses, local artists, road and canyon conditions, stargazing and northern lights alerts, a monthly photo contest, and a weekly newsletter. Serving Eden, Liberty, Huntsville and Weber County, Utah.

## Where things live

| To change… | Edit this file |
|---|---|
| Calendar IDs, newsletter link, Google Form links, email, photo contest theme, Business of the Week, Artist of the Month | `data/config.js` |
| Restaurants, Valley businesses, local artists | `data/places.js` |
| Calendar IDs for the automatic hourly update | `data/calendars.json` |

`data/events.json` and `data/sky.json` are written automatically every hour by
`.github/workflows/update-data.yml`. Don't edit them by hand.

## What runs on its own

- **Events:** every hour GitHub reads the two public Google Calendars (Ogden Valley, Weber County) and updates the Events page and the home page.
- **Night sky:** every hour it reads the NOAA northern lights (Kp) forecast and the National Weather Service cloud cover for Eden.
- **Month colors and logo:** the site switches to that month's tree and colors by itself.

To run the update right away: **Actions** tab → **Update calendars and night sky** → **Run workflow**.
