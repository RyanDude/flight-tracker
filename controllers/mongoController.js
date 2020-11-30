// Import flight model
Flight = require("../models/flightModel");

// * Hide fields?
// ! Need to do /flights/current. Put lat/long/radius in the body

const hideFields = {
    _id: 0,
    __v: 0
};

// Handle index actions
exports.viewall = function (req, res) {
    Flight.get(function (err, flights) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success",
                message: `All flights (${flights.length}) retrieved successfully`,
                data: flights,
            });
        }
    });
};

// Handle view on id
exports.viewid = function (req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                message: `Flight details for id ${req.params.id} retrieved successfully`,
                data: flight,
            });
        }

    });
};

// Get current flights
exports.currentFlights = function (req, res) {
    // TODO: current flights

}
// Get previous n flights
exports.previousNflights = function (req, res) {
    let limit = req.params.limit;
    // cast to int - req.params.limit gets a string, mongo requires an int
    limit = parseInt(limit);
    console.log(limit);

    Flight.get(function (err, prevFlights) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success",
                message: `Previous ${limit} flight(s) retrieved successfully`,
                data: prevFlights,
            });
        }
    }, limit);
};