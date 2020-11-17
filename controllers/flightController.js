const axios = require("axios");
const geometry = require("spherical-geometry-js");

const strings = require('../resources/strings');

let flightsArray = [];

exports.getFlights = (req, res) => {
    if(req.body.longitude && req.body.latitude && req.body.distance) {
        let user_longitude = req.body.longitude;
        let user_latitude = req.body.latitude;
        let user_distance = req.body.distance;

        let currentFlights = [];
        let previousFlights = []

        // get curent flights
        axios
            .get(strings.aviationstack.endpoint)
            .then((response) => {
                currentFlights = getFlightInfo(response, user_longitude, user_latitude, user_distance);

                res.status(200).send({
                    current_flights: currentFlights,
                    previous_flights: previousFlights
                });
            })
            .catch((error) => {
                console.log(error);
                res.res.sendStatus(500)
        });
    } else {
        res.sendStatus(500)
    }
}

// // Get flight information from active planes
// // Should probably narrow this list down, good for now
const getFlightInfo = (flights, user_longitude, user_latitude, user_distance) => {
    let currentFlights = [];

    flights.data.data.forEach(flight => {
        let flightObj = {};

        // If the flight has a latitude and longitude, add it to the array
        if (flight.live != null) {
            let lat = flight.live.latitude;
            let long = flight.live.longitude;

            let distance = getDistanceBetweenFlightAndUser(user_latitude, user_longitude, lat, long);

            if(distance <= user_distance || true) {
                let epochTime = new Date().getTime();
                flightObj.timeUTC = new Date(epochTime);
                flightObj.airline = flight.airline.name;
                flightObj.flight_iata = flight.flight.iata
                flightObj.origin = flight.departure.airport;
                flightObj.destination = flight.arrival.airport;
                flightObj.latitude = flight.live.latitude;
                flightObj.longitude = flight.live.longitude;
                flightObj.distance = distance;
    
                currentFlights.push(flightObj);
            }
        }
    });

    // for (let i = 0; i < flightInformation.data.data.length; i++) {
    //     // Flight object to store flight information. Is pushed to flightArray[]
    //     let flightObj = {};

    //     // If the flight has a latitude and longitude, add it to the array
    //     if (flightInformation.data.data[i].live != null) {
    //         flightObj.airline = flightInformation.data.data[i].airline.name;
    //         flightObj.flightNumber = flightInformation.data.data[i].flight.number;
    //         flightObj.departureAirport =
    //             flightInformation.data.data[i].departure.airport;
    //         flightObj.arrivalAirport = flightInformation.data.data[i].arrival.airport;
    //         flightObj.latitude = flightInformation.data.data[i].live.latitude;
    //         flightObj.longitude = flightInformation.data.data[i].live.longitude;
    //         let epochTime = new Date().getTime();
    //         flightObj.timeUTC = new Date(epochTime);

    //         // Push to array here
    //         currentFlights.push(flightObj);
    //     }
    // }
    // // Logging
    // console.log(flightsArray);
    // //console.log(flightsArray.length);
    // proximityFlights(flightsArray);

    console.log(currentFlights)
    return currentFlights;
};

// // User coordinates will be lat1 and long1
// // Nearby plane coordinates will be checked with lat2, long2
// // to see if they are in a specified radius of the user
const getDistanceBetweenFlightAndUser = (lat1, long1, lat2, long2) => {
    const latlong1 = new geometry.LatLng(lat1, long1);
    const latlong2 = new geometry.LatLng(lat2, long2);

    // returns miles
    return geometry.computeDistanceBetween(latlong1, latlong2) / 1609;
};

// // first 2 params will be input from user, last 2 params are coordinates of flight
// // want to check if the flight is within a certain distance of the user, if the distance
// // is too big, don't show certain flights
// // Returns 5.7 miles away from user
// console.log(
//     getDistanceBetweenFlightAndUser(34.183652, -84.558952, 34.183652, -84.658952)
// );

// // go through flights and look at ones that are close
// const proximityFlights = (arr) => {
//     // get array, loop through and look at lat/long
//     // compare to lat/longs from user coordinates
//     // lat 34.183652
//     // long -84.558952
//     for (let i = 0; i < arr.length; i++) {
//         let tempLat = arr[i].latitude;
//         let tempLong = arr[i].longitude;
//         let distance = getDistanceBetweenFlightAndUser(
//             34.183652,
//             -84.558952,
//             tempLat,
//             tempLong
//         );

//         console.log(
//             `Distance between user and flight #${arr[i].flightNumber} from ${arr[i].departureAirport} to ${arr[i].arrivalAirport} is: ${distance} miles.`
//         );
//     }
// };

// proximityFlights(flightsArray);
// // see if i can use that upper/lower bound technique to scan any flight in area, not just those departing from atl
// // convert utc to local