const SEARCHBAR = $('#search-input');
const SEARCHBUTTON = $('#submit-button');
const GOOGLE_API_KEY = 'AIzaSyD-kc7RMsdE13o6eAQEWeQECWzP8AJSr_A';
let ISSLocation;
let ISSPhysLoc;
let ISSPassTime;
let ISSInterval;

// #region Initialization

// Initialize the address autocompletion
google.maps.event.addDomListener(window, 'load', initAutocomplete);
init();

// #endregion Initialization

// #region Events

$(SEARCHBUTTON).on('click', function (e) {
    e.preventDefault();
    let streetAddress = SEARCHBAR.val().trim();
    getGeocode(streetAddress);
});

// #endregion Events

// #region Functions

/**
 * Attaches the Google Places Autocomplete API to the searchbar.
 */
function initAutocomplete() {
    let searchbar = document.getElementById('search-input');
    new google.maps.places.Autocomplete(searchbar);
}

/**
 * Sets geocodeLocation for a given address.
 * 
 * @param {string} address The address to geocode.
 */
function getGeocode(address) {

    let urlAddress = address.replace(/ /g, '+');

    let queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`;

    $.ajax({
        method: 'GET',
        url: queryURL
    }).done(function (response) {
        let geocodeLocation = {
            lat: response.results[0].geometry.location.lat,
            lng: response.results[0].geometry.location.lng
        };

        getISSPassTime(geocodeLocation.lat, geocodeLocation.lng);
    });
}

/**
 * Get a physical location from latitude/longitude.
 * @param {*} lat 
 * @param {*} lng 
 */
function getReversedGeocode(lat, lng) {

    let queryURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

    $.ajax({
        method: 'GET',
        url: queryURL
    }).done(function (response) {

        if (response.results.length === 0) {
            ISSPhysLoc = 'No physical address found.';
        } else {
            ISSPhysLoc = response.results[0].formatted_address;
        }
    });
}

/**
 * Sets the current latitude and longitude coorinates of the ISS.
 * TODO: Return the coordinates rather than set the global variable.
 */
function getISSLocation() {

    $.ajax({
        method: 'GET',
        url: 'https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
    }).done(function (response) {
        ISSLocation = {
            lat: parseFloat(response.iss_position.latitude),
            lng: parseFloat(response.iss_position.longitude)
        };

        getReversedGeocode(ISSLocation.lat, ISSLocation.lng);

        // * Leaflet
        setMapView(ISSLocation.lat, ISSLocation.lng, 2);
        moveMarker(ISSLocation.lat, ISSLocation.lng);

        console.log(ISSLocation);
    });
}

/**
 * Gets upcoming passes for a particular location.
 * 
 * @param {*} lat Latitude
 * @param {*} lng Longitude
 */
function getISSPassTime(lat, lng) {

    $.ajax({
        method: 'GET',
        url: `https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lng}`
    }).done(function(response) {
        ISSPassTime = response.response[0];
    });
}

/**
 * Starts the location tracking interval.
 * @param {*} interval Number in ms to update.
 */
function trackISS(interval) {
    ISSInterval = setInterval(getISSLocation, interval);
}

/**
 * Stops the location tracking interval.
 */
function untrackISS() {
    clearInterval(ISSInterval);
}

/**
 * Initialize the app.
 */
function init() {
    getISSLocation();
    trackISS(5000);
}

// #endregion Functions