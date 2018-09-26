// #region Global vars
const SEARCHBAR = $('#search-input');
const SEARCHBUTTON = $('#submit-button');
const GOOGLE_API_KEY = 'AIzaSyD-kc7RMsdE13o6eAQEWeQECWzP8AJSr_A';

let ISSLocation;
let ISSCrew;
let streetAddress;
let geocodeLocation;
// #endregion Global vars

// #region Initialization
getISSLocation();
getISSCrew();
// #endregion Initialization

// #region Events
$(SEARCHBUTTON).on('click', function(e) {
    
    e.preventDefault();

    streetAddress = SEARCHBAR.val().trim();

    getGeocode(streetAddress);

    // Clear the search input after search.
    SEARCHBAR.val('');

});
// #endregion Events

// #region Functions

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
    }).done(function(response){
        geocodeLocation = {
            lat: response.results[0].geometry.location.lat,
            lng: response.results[0].geometry.location.lng
        };

        // Todo: remove...
        console.log(geocodeLocation)
    });
}

/**
 * Sets the current latitude and longitude coorinates of the ISS.
 * Todo: Return the coordinates rather than set the global variable.
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
            lat: response.iss_position.latitude,
            lng: response.iss_position.longitude
        };
    });

}

/**
 * Stores each ISS crewmember in an array.
 * Todo: Return the crew array rather than set a global variable.
 */
function getISSCrew() {

    $.ajax({
        method: 'GET',
        url: 'https://cors-anywhere.herokuapp.com/http://api.open-notify.org/astros.json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
    }).done(function (response) {
        ISSCrew = response.people;
    });
}
// #endregion Functions