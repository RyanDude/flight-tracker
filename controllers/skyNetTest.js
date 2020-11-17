// Test file to get more flights around the user. Not sure if this will go in final build

const axios = require("axios");
const apiEndpoint = `https://opensky-network.org/api/states/all?lamin=33.335066&lomin=-85.340582&lamax=34.776027&lomax=-83.865526`;

let flightsArraySkyNet = [];

//Example query with bounding box covering Switzerland: 
// https://opensky-network.org/api/states/all?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226

// lower 33.335066, -85.340582
// upper 34.776027, -83.865526

// Axios request
axios
    .get(apiEndpoint)
    .then((response) => {
        getFlightsSkyNet(response);
    })
    .catch((error) => {
        console.log(error);
    });

// Get flights from SkyNet API and populate flightsArraySkyNet[] with: callsign, latitude and longitude
const getFlightsSkyNet = (flightInformation) => {
    console.log(flightInformation.data.states.length);

    for (let i = 0; i < flightInformation.data.states.length; i++) {
        let flightObjSkyNet = {};

        flightObjSkyNet.icao24 = flightInformation.data.states[i][0]; // need to get est airports
        flightObjSkyNet.callsign = flightInformation.data.states[i][1];
        flightObjSkyNet.latitude = flightInformation.data.states[i][5];
        flightObjSkyNet.longitude = flightInformation.data.states[i][6];

        flightsArraySkyNet.push(flightObjSkyNet);
    }
    console.log(flightsArraySkyNet);
}