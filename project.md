# Project 1 - ISS Tracker (working title)

#### [Github.io page](https://jason-michael.github.io/project1/) | [Repo](https://github.com/jason-michael/project1)
#### [Working example (Map only - no UI)](https://jason-michael.github.io/ISS-Tracker/public/index.html)

#

### Team:
- **Justin Kane** - Frontend design
- **Douglas Boyce** - Leaflet
- **Jason Michael** - Javascript

#

### MVP:
- **Primary Goal:** Track the International Space Station's overhead location in near real-time and display it on an interactive map.
- **Target Audience:** Anyone interested in space, astronomy, etc.
- **Problem We Are Addressing:** TBD...
- **User stories:**
    - As someone interested in space, I can find out when I can go outside and see the ISS. 

#

### Our APIs:
- [Open Notify](http://open-notify.org/) - International Space Station location info.
- [Google Geocoding](https://developers.google.com/maps/documentation/geocoding/start) - latitude/longitude coordinates from addresses.
- [Google Places Autocomplete](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete) - autocomplete street addresses.

#

### Other Tech:
- [Leaflet](https://leafletjs.com/) - open-source JavaScript library for mobile-friendly interactive maps.
- [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) - NodeJS proxy which adds CORS headers to the proxied request.
    - This isn't really new tech but it was needed as the open-notify API does not support https.

---

### Project requirements:
- Must uses at least two APIs
- Must use AJAX to pull data
- Must utilize at least one new library or technology that we haven’t discussed
- Must have a polished frontend / UI
- Must use Bootstrap or Alternative CSS Framework
- Must meet good quality coding standards (indentation, scoping, naming)
- Must NOT use alerts, confirms, or prompts (look into modals!)
- Must have some sort of repeating element (table, columns, etc)
- Must be Deployed (GitHub Pages or Firebase)
- Must have User Input Validation