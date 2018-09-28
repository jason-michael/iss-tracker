/* Initialize Leaflet map */
var map = L.map('mapDiv').setView([0, 0], 13);
let marker = L.marker([0,0]).addTo(map);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/**
 * Center the map to the given lat/lng with zoom.
 * @param {*} lat Latitude.
 * @param {*} lng Longitude.
 * @param {*} zoom Zoom level.
 */
function setMapView(lat, lng, zoom) {
    map.setView([lat, lng], zoom);
}

function moveMarker(lat, lng){
    marker.setLatLng([lat,lng]);
}