# Project 1 - ISS Tracker

![iss](/assets/images/iss.png?raw=true)


#### [Github page](https://jason-michael.github.io/iss-tracker/)

This app will display the International Space Station's overhead location in real-time. Users can also search a street address to find out when the ISS is estimated to be over that location next, and for how long. Top news related to the ISS is also included and each article is linked to its source.


# Team
- **Justin Kane** - Frontend design
- **Douglas Boyce** - Javascript
- **Jason Michael** - Javascript


# MVP
- **Primary Goal:** Track the International Space Station's overhead location in near real-time and display it on an interactive map.
- **Target Audience:** Anyone interested in space, astronomy, etc.


# APIs Used
- [Open Notify](http://open-notify.org/) - International Space Station location info.
- [Google Geocoding](https://developers.google.com/maps/documentation/geocoding/start) - latitude/longitude coordinates from street addresses.
- [Google Places Autocomplete](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete) - autocomplete street addresses.
- [NewsAPI](https://newsapi.org/) - Top news articles related to the ISS.


# Other Tech
- [Leaflet](https://leafletjs.com/) - open-source JavaScript library for mobile-friendly interactive maps.
- [Moment](https://momentjs.com/docs/#/parsing/now/) - used to convert the ISS pass time from UNIX.
- [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) - NodeJS proxy which adds CORS headers to the proxied request.
    - This was needed as the open-notify API does not support https requests.


# Known Issues
1. The Open-Notify request limit is hit pretty quickly while updating the ISS location every 5 seconds. If this app was running from a server we could bypass this by adding `'Access-Control-Allow-Origin': '*'` in our request header. This does not work locally. For demonstration purposes we use a Chrome extension that toggles CORS when we hit the request limit.


