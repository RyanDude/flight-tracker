// Import flight model
Flight = require('../models/flightModel');

// Handle index actions
exports.viewall = function (req, res) {
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

// Create new flight
exports.new = function (req, res) {
    let flight = new Flight();

    // pass in time as something?
    flight.callsign = req.body.callsign;
    flight.heading = req.body.heading;
    flight.originCountry = req.body.origin_country;
    flight.longitude = req.body.longitude;
    flight.latitude = req.body.latitude;

    // save the flight and check for errors
    flight.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New flight created!',
            data: flight
        });
    });
};

// Handle view on id
exports.viewid = function (req, res) {
    // findByAll???
    Flight.findById(req.params.id, function (err, flight) {
        if (err)
            res.send(err);
        res.json({
            message: 'Flight details loading..',
            data: flight
        });
    });
};

// Delete flight given mongo-provided id
exports.delete = function (req, res) {
    Flight.deleteOne({
        _id: req.params.id
    }, function (err, flight) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Flight deleted'
        });
    });
};