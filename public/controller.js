let map;
let crd;

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
            scale: 4,
            strokeColor: 'blue'
        },

        map: map,
    });
}

// Loop through planes and creates a marker
function createPlaneMarkers(flights) {
    // Loop through current flights
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
            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
            scale: 4,
            rotation: flight.heading
        },

        map: map,
    });

    // Bind popup to marker
    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
}