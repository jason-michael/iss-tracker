# Project 1 - ISS Tracker

#### [Github page](https://jason-michael.github.io/project1/)

#

### Team:
- **Justin Kane** - Frontend design
- **Douglas Boyce** - Leaflet
- **Jason Michael** - Javascript

#

### MVP:
- **Primary Goal:** Track the International Space Station's overhead location in near real-time and display it on an interactive map.
- **Target Audience:** Anyone interested in space, astronomy, etc.

#

### Our APIs:
- [Open Notify](http://open-notify.org/) - International Space Station location info.
- [Google Geocoding](https://developers.google.com/maps/documentation/geocoding/start) - latitude/longitude coordinates from addresses.
- [Google Places Autocomplete](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete) - autocomplete street addresses.

#

### Other Tech:
- [Leaflet (NEW)](https://leafletjs.com/) - open-source JavaScript library for mobile-friendly interactive maps.
- [Moment](https://momentjs.com/docs/#/parsing/now/) - used to convert the ISS pass time from UNIX.
- [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) - NodeJS proxy which adds CORS headers to the proxied request.
    - This isn't really new tech but it was needed as the open-notify API does not support https.

