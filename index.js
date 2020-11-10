const axios = require("axios");
const dotenv = require("dotenv").config();
const geometry = require("spherical-geometry-js");
const aviation_stack_api_key = process.env.AVIATION_STACK_API_KEY;
const apiEndpoint = `http://api.aviationstack.com/v1/flights?access_key=${aviation_stack_api_key}&flight_status=active&dep_iata=ATL`;
let flightsArray = [];

// Axios request
axios
    .get(apiEndpoint)
    .then((response) => {
        getFlightInfo(response);
    })
    .catch((error) => {
        console.log(error);
    });

// Get flight information from active planes
// Should probably narrow this list down, good for now
const getFlightInfo = (flightInformation) => {
    console.log("Total active flights: " + flightInformation.data.data.length);

    for (let i = 0; i < flightInformation.data.data.length; i++) {
        // Flight object to store flight information. Is pushed to flightArray[]
        let flightObj = {};

        // If the flight has a latitude and longitude, add it to the array
        if (flightInformation.data.data[i].live != null) {
            flightObj.airline = flightInformation.data.data[i].airline.name;
            flightObj.number = flightInformation.data.data[i].flight.number;
            flightObj.departureAirport =
                flightInformation.data.data[i].departure.airport;
            flightObj.arrivalAirport = flightInformation.data.data[i].arrival.airport;
            flightObj.latitude = flightInformation.data.data[i].live.latitude;
            flightObj.longitude = flightInformation.data.data[i].live.longitude;

            // Push to array here
            flightsArray.push(flightObj);
        }
    }
    // Logging
    // console.log(flightsArray);
    // console.log(flightsArray.length);
    proximityFlights(flightsArray);
};

// User coordinates will be lat1 and long1
// Nearby plane coordinates will be checked with lat2, long2
// to see if they are in a specified radius of the user
const getDistanceBetweenFlightAndUser = (lat1, long1, lat2, long2) => {
    const latlong1 = new geometry.LatLng(lat1, long1);
    const latlong2 = new geometry.LatLng(lat2, long2);

    // returns miles
    return geometry.computeDistanceBetween(latlong1, latlong2) / 1609;
};

// Returns 5.7 miles away from user
console.log(
    getDistanceBetweenFlightAndUser(34.183652, -84.558952, 34.183652, -84.658952)
);
console.log(flightsArray);

// go through flights and look at ones that are close
const proximityFlights = (arr) => {
    // get array, loop through and look at lat/long
    // compare to lat/longs from user coordinates 
    // lat 34.183652
    // long -84.558952
    for (let i = 0; i < arr.length; i++) {
        let tempLat = arr[i].latitude;
        let tempLong = arr[i].longitude;
        let distance = getDistanceBetweenFlightAndUser(34.183652, -84.558952, tempLat, tempLong);

        console.log(`Distance between user and flight number ${arr[i].number} from ${arr[i].departureAirport} to ${arr[i].arrivalAirport} is: ${distance}`);
    }
}

proximityFlights(flightsArray);