// Import flight model
Flight = require("../models/flightModel");


// Create new flight
exports.new = function (req, res) {
    let flight = new Flight();

    flight.callsign = req.body.callsign;
    flight.heading = req.body.heading;
    flight.originCountry = req.body.origin_country;
    flight.longitude = req.body.longitude;
    flight.latitude = req.body.latitude;

    // save the flight and check for errors
    flight.save(function (err) {
        if (err) res.json(err);
        res.json({
            message: "New flight created!",
            data: flight,
        });
    });
};

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
            data: flights,
        });
    });
};

// Handle view on id
exports.viewid = function (req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        if (err) res.send(err);
        res.json({
            message: `Flight details for ${req.params.id} retrieved successfully`,
            data: flight,
        });
    });
};

// Get previous n flights
// ! Function does not work
exports.previousNflights = function (req, res) {
    // Get limit of flights - seems to work
    let limit = req.params.n;
    console.log(limit);

    Flight.get(function (err, prevFlights) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Flights retrieved successfully",
            data: prevFlights,
        });
    }, limit);
};

// ! Delete in final build? Anyone can delete if they have flight id
// Delete flight given mongo-provided id
exports.delete = function (req, res) {
    Flight.deleteOne({
            _id: req.params.id,
        },
        function (err, flight) {
            if (err) res.send(err);
            res.json({
                status: "success",
                message: "Flight deleted",
            });
        }
    );
};

// Delete all records
exports.deleteAll = function (req, res) {
    Flight.deleteMany({},
        function (err, flight) {
            if (err) res.send(err);
            res.json({
                status: "success",
                message: "Flights wiped",
            });
        }
    );
};