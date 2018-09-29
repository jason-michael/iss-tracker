/* Initialize Leaflet map */
let map = L.map('mapDiv', {minZoom:3, maxZoom:10}).setView([0, 0], 2);

/* Openstreetmap Style */
var CartoDB_DarkMatter = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

/* ISS Icon */
let issIcon = L.icon({
    iconUrl: 'assets/images/space-station.png',
    shadowUrl: '',

    iconSize:     [64, 64], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [35, 72], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// map.setMaxBounds(map.getBounds());
map.setMaxBounds( [[-90,-180], [90,180]] )