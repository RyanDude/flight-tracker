// Import contact model
Flight = require('../models/flightModel');

// Handle index actions
exports.index = function (req, res) {
    Flight.get(function (err, flights) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Flights retrieved successfully",
            data: flights
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    let flight = new Flight();

    // pass in time as something?
    flight.callsign = req.body.callsign;
    flight.heading = req.body.heading;
    flight.originCountry = req.body.origin_country;
    flight.longitude = req.body.longitude;
    flight.latitude = req.body.latitude;

    // save the contact and check for errors
    flight.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New flight created!',
            data: flight
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    // findByAll???
    Flight.findById(req.params.callsign, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Flight details loading..',
            data: flight
        });
    });
};