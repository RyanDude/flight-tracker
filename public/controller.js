let map;
let crd;

getLocation();

$("#get_flights_form").submit((e) => {
    e.preventDefault();

    let data = JSON.stringify({
        distance: $( "#distance" ).val(),
        latitude: crd.latitude,
        longitude: crd.longitude
    })

    $.ajax({
        type: "POST",
        url: '/flights',
        data: data,
        contentType: 'application/json',
        success: (response) => {
            console.log(response)
            // createPlaneMarkers(response.flights);
        },
        error: (request, status, error) => {
            alert(request.responseJSON);
        }
    });

    
});

function distanceUpdate(distance) {
    document.querySelector('#distance-label').value = distance;
}

function getLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
        crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        map.setCenter(new google.maps.LatLng(crd.latitude, crd.longitude));
        createUserMarker();
    }, (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });

    
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        //center: new google.maps.LatLng(crd.latitude, crd.longitude),
        zoom: 16,
    });
}

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

function createPlaneMarkers(flights) {
    flights.forEach((flight) => {
        createPlaneMarker(flight)
    });
}

function createPlaneMarker(flight) {
    let contentString = `<h1>${flight.number}</h1>` +
        `<p>Airline: ${flight.airline}</p>` + 
        `<p>Number: ${flight.number}</p>` + 
        `<p>Origin: ${flight.departureAirport}</p>` +
        `<p>Destination: ${flight.arrivalAirport}</p>`;

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    const marker = new google.maps.Marker({
        position: new google.maps.LatLng(
            flight.latitude,
            flight.longitude
        ),
        title: flight.number,
        icon: {
            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
            scale: 4,
            rotation: flight.heading
        },

        map: map,
    });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
}

// need
// flight iata
// live heading, latitude, longitude, direction
// arrival airport, scheduled
// departure airport, actual