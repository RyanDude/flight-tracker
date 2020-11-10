const axios = require("axios");
const dotenv = require("dotenv").config();
const geometry = require("spherical-geometry-js");
const aviation_stack_api_key = process.env.AVIATION_STACK_API_KEY;
const apiEndpoint = `http://api.aviationstack.com/v1/flights?access_key=${aviation_stack_api_key}&flight_status=active&airline_name=Delta Air Lines`;
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
    let flightObj = {};

    if (flightInformation.data.data[i].live != null) {
      flightObj.airline = flightInformation.data.data[i].airline.name;
      flightObj.number = flightInformation.data.data[i].flight.number;
      flightObj.departureAirport =
        flightInformation.data.data[i].departure.airport;
      flightObj.arrivalAirport = flightInformation.data.data[i].arrival.airport;
      flightObj.latitude = flightInformation.data.data[i].live.latitude;
      flightObj.longitude = flightInformation.data.data[i].live.longitude;

      flightsArray.push(flightObj);
    }
  }
  console.log(flightsArray);
  console.log(flightsArray.length);
};

// User coordinates will be lat1 and long1
// Nearby plane coordinates will be checked with lat2, long2
// to see if they are in a specified radius of the user
const getDistanceBetweenFlightAndUser = (lat1, long1, lat2, long2) => {
  // lat 34.183652
  // long -84.558952
  const latlong1 = new geometry.LatLng(lat1, long1);
  const latlong2 = new geometry.LatLng(lat2, long2);

  // returns miles
  return geometry.computeDistanceBetween(latlong1, latlong2) / 1609;
};

// Return 5.7 miles away from user
console.log(
  getDistanceBetweenFlightAndUser(34.183652, -84.558952, 34.183652, -84.658952)
);
