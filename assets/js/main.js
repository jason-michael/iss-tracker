// Get ui elements
const SEARCHBAR = $('#search-input');
const SEARCHBUTTON = $('#submit-button');


let ISSLocation;
let ISSCrew;

// Get initial ISS info
getISSLocation();
getISSCrew();



$(SEARCHBUTTON).on('click', function(e) {
    e.preventDefault();

    console.log(SEARCHBAR.val().trim());

});

// #region Functions

function getGeocode(address) {
    // ? example url: https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
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
            lon: response.iss_position.longitude
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
// #endregion