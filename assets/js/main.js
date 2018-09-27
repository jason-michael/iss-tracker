const SEARCHBAR = $('#search-input');
const SEARCHBUTTON = $('#submit-button');
const GOOGLE_API_KEY = 'AIzaSyD-kc7RMsdE13o6eAQEWeQECWzP8AJSr_A';
let ISSLocation;
let ISSPassTime;
let ISSCrew;

/* INITIALIZATION */
// Init the address autocompletion
google.maps.event.addDomListener(window, 'load', initAutocomplete);

// TODO: Demo item, remove.
runDemo();

/* EVENTS */
$(SEARCHBUTTON).on('click', function (e) {
    e.preventDefault();
    let streetAddress = SEARCHBAR.val().trim();
    getGeocode(streetAddress);
});

/* FUNCTIONS */
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

        // TODO: Demo item, remove.
        console.log('Geocode for: ' + address, geocodeLocation);
        getISSPassTime(geocodeLocation.lat, geocodeLocation.lng);
    });
}

function getReversedGeocode(lat, lng) {

    let queryURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

    $.ajax({
        method: 'GET',
        url: queryURL
    }).done(function (response) {

        // TODO: Demo, remove.
        if (response.results.length === 0) {
            console.log('No address found for:', lat, lng, 'See current location on map.');
        } else {
            console.log('The ISS is over:', response.results[0].formatted_address);
        }
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
            lat: parseFloat(response.iss_position.latitude),
            lng: parseFloat(response.iss_position.longitude)
        };

        getReversedGeocode(ISSLocation.lat, ISSLocation.lng);

        // TODO: Demo item, remove.
        console.log('Current ISS location: ', ISSLocation);
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
        console.log('Next pass time: ', ISSPassTime);
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

        // TODO: Demo item, remove.
        console.log('ISS crew members: ', ISSCrew);
    });
}

// TODO: Demo item, remove.
function runDemo() {
    getISSCrew();
    getISSLocation();
}

// !! EXPIRIMENTAL !!
/**
 * Grabs the entire infobox from a wikipedia page.
 * @param {string} title The title of the Wikipedia page to scrape.
 */
function scrapeWikiInfoBox(title) {

    let _title = title.replace(/ /g, '_');

    $.ajax({
        type: "GET",
        url: `http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=${_title}&callback=?`,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data) {

            let markup = data.parse.text["*"];
            let blurb = $('<div></div>').html(markup);
            // Replace links with text, they won't work anyway
            blurb.find('a').each(function () {
                $(this).replaceWith($(this).html());
            });

            let nickname;
            nickname = blurb.find('span.nickname').text();
            console.log('Nickname: ' + nickname);

            // Get crew member img src
            let imgUrls = [];
            blurb.find('img').each(function () {
                imgUrls.push($(this).attr('src'));
            });
            imgSrc = imgUrls[0];
            console.log('Img url: ' + imgSrc);

            // Get crew member age
            let age = blurb.find('span.ForceAgeToShow').text();
            console.log('Age: ' + age.match(/\d+/g).map(Number));

            $('#markup').html($(blurb).find('.infobox'));
        },
        error: function (errorMessage) {
            console.log('Error: ' + errorMessage);
        }
    });
}