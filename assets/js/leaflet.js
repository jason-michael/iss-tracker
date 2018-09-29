/* Initialize Leaflet map */
let map = L.map('mapDiv').setView([0, 0], 4);
L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let issIcon = L.icon({
    iconUrl: 'assets/images/space-station.png',
    shadowUrl: '',

    iconSize:     [64, 64], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [35, 72], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});