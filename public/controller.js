let map;
let crd;

let flightMarkers = [];

const planeIcon = 'M 27.206 1.179 Q 29.238 3.2 29.238 10.122 L 29.238 21.27 L 50.009 35.276 L 50.173 35.392 Q 50.5 35.717 50.5 36.135 L 50.5 39.108 Q 50.5 39.526 50.173 39.852 Q 49.682 40.339 49.075 40.107 L 29.238 33.116 L 29.238 44.497 Q 36.388 48.445 36.715 48.771 Q 37.042 49.096 37.042 49.514 L 37.042 52.487 Q 37.042 52.905 36.715 53.23 Q 36.294 53.648 35.687 53.509 L 25.523 50.605 L 15.36 53.509 Q 14.752 53.695 14.308 53.253 Q 13.981 52.928 13.981 52.51 L 13.958 49.514 Q 13.958 49.096 14.285 48.771 Q 14.612 48.445 21.762 44.497 L 21.762 33.116 L 1.925 40.107 Q 1.318 40.339 0.827 39.852 Q 0.5 39.526 0.5 39.108 L 0.5 36.135 Q 0.5 35.717 0.827 35.392 Q 0.921 35.299 0.991 35.276 L 21.762 21.27 L 21.762 10.122 Q 21.762 3.2 23.794 1.179 Q 24.542 0.436 25.5 0.436 Q 26.458 0.436 27.206 1.179 Z';

// Get user location
getLocation();

// When user presses button to make request
$("#get_flights_form").submit((e) => {
    // Don't reload the page
    e.preventDefault();

    // Request payload
    let data = JSON.stringify({
        distance: $( "#distance" ).val(),
        latitude: crd.latitude,
        longitude: crd.longitude
    })

    // Make a request to our API
    $.ajax({
        type: "POST",
        url: '/flights',
        data: data,
        contentType: 'application/json',
        success: (response) => {
            // Create markers from response
            createPlaneMarkers(response.flights);
        },
        error: (request, status, error) => {
            alert(request.responseJSON);
        }
    });
});

// When user changes radius, update the text next to it
function distanceUpdate(distance) {
    document.querySelector('#distance-label').value = distance;
}

// Get user location
function getLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
        crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        // Center map around user and create a marker
        map.setCenter(new google.maps.LatLng(crd.latitude, crd.longitude));
        createUserMarker();
    }, (err) => {
        // Browser does not support geolocation
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
    });
}

// Create a marker where the user should be
function createUserMarker() {
    new google.maps.Marker({
        position: new google.maps.LatLng(
            crd.latitude,
            crd.longitude
        ),
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#f44336',
            fillOpacity: .6,
            strokeWeight: 0,
            scale: 10,
            strokeOpacity: 1.0,
            strokeWeight: 2
        },

        map: map,
    });
}

// Loop through planes and creates a marker
function createPlaneMarkers(flights) {
    clearMarkers();
    flights.current_flights.forEach((flight) => {
        createPlaneMarker(flight);
    });

    // TODO: past flights
}

// Create a marker for each planse
function createPlaneMarker(flight) {
    // Convert UTC time from when flight was requested to local time
    let localTime = new Date(Date.parse(flight.timeUTC)).toLocaleString();

    // Text for popup
    let contentString = `<h1>${flight.callsign}</h1>` +
        `<p>Origin Country: ${flight.origin_country}</p>` +
        `<p>Time Queried: ${localTime}</p>`;

    // Create popup
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    // Create the plane marker
    const marker = new google.maps.Marker({
        position: new google.maps.LatLng(
            flight.latitude,
            flight.longitude
        ),
        title: flight.callsign,
        icon: {
            path: planeIcon,
            fillColor: color,
            fillOpacity: .6,
            strokeWeight: 0,
            scale: .7,
            rotation: flight.heading,
            strokeOpacity: 1.0,
            strokeWeight: 2,

        },

        map: map,
    });

    // Bind popup to marker
    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });

    flightMarkers.push(marker);
}
// Remove all markers from map
function clearMarkers() {
    flightMarkers.forEach((flightMarker) => {
        flightMarker.setMap(null);
    });

    flightMarkers = [];
}