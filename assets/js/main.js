const SEARCHBAR = $('#search-input');
const SEARCHBUTTON = $('#submit-button');
const GOOGLE_API_KEY = 'AIzaSyD-kc7RMsdE13o6eAQEWeQECWzP8AJSr_A';
let userMarker;
let userAddress;
let userAddressPassTime;
let iss = {
    geocode: {
        lat: 0,
        lon: 0
    },
    address: null,
    marker: L.marker([0, 0], {icon: issIcon}).addTo(map),
    interval: null,
    centerOnUpdate: true,

    run() {
        iss.getGeocode();
        iss.centerOnUpdate = false;

        if (iss.interval == null) {
            iss.interval = setInterval(iss.getGeocode, 5000);
        }
    },

    stop() {
        clearInterval(iss.interval);
        iss.interval = null;
    },

    getGeocode() {
        let _shouldCenter = iss.centerOnUpdate;

        $.ajax({
            method: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
            },
        }).done(function (response) {
            iss.geocode.lat = parseFloat(response.iss_position.latitude);
            iss.geocode.lon = parseFloat(response.iss_position.longitude);
            iss.updateMarker(iss.geocode.lat, iss.geocode.lon);

            if (_shouldCenter) {
                map.setView([iss.geocode.lat, iss.geocode.lon]);
            }
        });
    },

    getAddress(lat, lon) {
        let queryURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;

        $.ajax({
            method: 'GET',
            url: queryURL
        }).done(function (response) {

            if (response.results.length === 0) {
                iss.address = 'Not currently over a physical address.';
            } else {
                iss.address = response.results[0].formatted_address;
            }

            $('#iss-location-text').text(iss.address);
            iss.marker.bindPopup(iss.address);
        });
    },

    updateMarker(lat, lon) {
        iss.marker.setLatLng([lat, lon]);
        iss.marker.bindPopup(iss.address);

        iss.getAddress(iss.geocode.lat, iss.geocode.lon);
    },

    getPassTime(lat, lon) {
        // Disable search button until a response is retrieved.
        SEARCHBUTTON.attr('disabled', true);
        SEARCHBUTTON.toggleClass('btn-outline-success btn-outline-secondary');

        $.ajax({
            method: 'GET',
            url: `https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
            },
        }).done(function (response) {

            if (response.response.length > 0) {
                userAddressPassTime = response.response[0];
                updateUserMarker(lat, lon);
            }
        });
    }    
}

// Initialize the address autocompletion.
google.maps.event.addDomListener(window, 'load', initAutocomplete);

// Start tracking the ISS.
iss.run();

// #region Events
// User Address Search
$(SEARCHBUTTON).on('click', function (e) {
    e.preventDefault();
    if (SEARCHBAR.val() != '') {
        userAddress = SEARCHBAR.val().trim();
        getAddressGeocode(userAddress);
    };
});

// Crew Table click
$('tr').on('click', function() {

    let _crewMemberKey = $(this).attr('data-crew');
    let _crewMember = crewArray.filter(obj => {
        return obj.key === _crewMemberKey;
    });

    $('.modal-title').text(_crewMember[0].name);
    $('.crew-img').attr('src', _crewMember[0].imgSrc);
    $('.crew-title').text(_crewMember[0].title);
    $('.crew-age').text(_crewMember[0].age);
    $('.crew-country').text(_crewMember[0].country);
    $('.crew-other-occupation').text(_crewMember[0].otherOccupation);

    $('#crew-modal').fadeIn('fast');

});

// Close the crew member modal
$(document).on('click', '.close', function() {
    $('#crew-modal').hide();
})

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
  * 1. Sets geocodeLocation for a given address.
  * 2. Sets the ISS pass time info.
  * 
  * @param {string} address The address to geocode.
  */
function getAddressGeocode(address) {

    let urlAddress = address.replace(/ /g, '+');

    let queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`;

    $.ajax({
        method: 'GET',
        url: queryURL
    }).done(function (response) {
        let geocode = {
            lat: response.results[0].geometry.location.lat,
            lon: response.results[0].geometry.location.lng
        };

        iss.getPassTime(geocode.lat, geocode.lon);
    });
}

/**
 * Places a marker at given coordinates.
 * @param {*} lat Latitude.
 * @param {*} lon Longitude.
 */
function updateUserMarker(lat,lon) {
    if (userMarker == null) {
        userMarker = L.marker([lat,lon]).addTo(map);
    } else {
        userMarker.setLatLng([lat,lon]);
    }

    let friendlyDate = moment(userAddressPassTime.risetime, 'X').format('ddd MMM Do YYYY, HH:mm');
    let friendlyTime = Math.floor(userAddressPassTime.duration / 60);

    let content = `
    <p>${userAddress}</p>
    <p>Next pass: ${friendlyDate}</p>
    <p>Duration: ${friendlyTime} mintues</p>`;

    userMarker.bindPopup(content).openPopup();

    // Enable search button.
    SEARCHBUTTON.attr('disabled', false);
    SEARCHBUTTON.toggleClass('btn-outline-success btn-outline-secondary');
}
// #endregion Functions