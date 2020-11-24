const axios = require("axios");
const geometry = require("spherical-geometry-js");

// Run when user make a request
exports.getFlights = (req, res) => {
    // If all the params were supplied
    if (req.body.longitude && req.body.latitude && req.body.distance) {
        let user_longitude = req.body.longitude;
        let user_latitude = req.body.latitude;
        let user_distance = req.body.distance;

        let currentFlights = [];
        let previousFlights = []

        // Opensky needs a bounding box to filter flights but we have a radius
        // so we need to create a square around the user.
        // Opensky asks for top right and botton left corners
        userLatLang = new geometry.LatLng(user_latitude, user_longitude);

        // Find the distance from the user location to a corner of the bounding square
        // This makes a right triangle so use Pythagorean theorem to calculate hypotenuse
        leg_length = Math.sqrt(2 * user_distance * user_distance) * 1609.34;

        // Top right corner of bounding square
        top_right = geometry.computeOffset(userLatLang, leg_length, 45);

        // Botton Left corner of bounding square
        bottom_left = geometry.computeOffset(userLatLang, leg_length, 225);

        // get curent flights
        axios.get(`https://opensky-network.org/api/states/all?lamin=${bottom_left.lat()}&lomin=${bottom_left.lng()}&lamax=${top_right.lat()}&lomax=${top_right.lng()}`)
            .then((response) => {
                currentFlights = getFlightInfo(response);

                res.status(200).send({
                    flights: {
                        current_flights: currentFlights,
                        previous_flights: previousFlights,
                    }
                });
            })
            .catch((error) => {
                console.log(error);
                res.sendStatus(500)
            });
    } else {
        res.sendStatus(400)
    }
}

// Get flight information from active planes
const getFlightInfo = (flights) => {
    let currentFlights = [];
    let states = flights.data.states

    // Check if any flights we returned
    if (states !== null) {
        states.forEach(flight => {
            let flightObj = {};

            // Need? Mongo db takes care of UTC time
            let epochTime = new Date().getTime();
            flightObj.timeUTC = new Date(epochTime);

            // Opensky uses arrays to return data
            // Check the documentation to see what the indices mean
            // https://opensky-network.org/apidoc/rest.html#operation
            flightObj.heading = flight[10];
            flightObj.callsign = flight[1];
            flightObj.origin_country = flight[2];
            flightObj.latitude = flight[6];
            flightObj.longitude = flight[5];

            // We don't need to filter distances because opensky already did that

            currentFlights.push(flightObj);
        });
    }
    console.log(currentFlights);
    return currentFlights;
};