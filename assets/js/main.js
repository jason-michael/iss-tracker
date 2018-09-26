function getISSLocation() {

    $.ajax({
        method: 'GET',
        url: 'https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
    }).done(function (response) {
        position = {
            lat: parseFloat(response.iss_position.latitude),
            lng: parseFloat(response.iss_position.longitude)
        }
        // ISSMarker = addMarker(position, map, 'test');
        // map.setCenter(position)
    });

}

function getISSCrew() {
    
    $.ajax({
        method: 'GET',
        url: 'https://cors-anywhere.herokuapp.com/http://api.open-notify.org/astros.json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
    }).done(function (response) {
        // ISSCrew = response.people;
    });

}