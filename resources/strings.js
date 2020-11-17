const dotenv = require("dotenv").config();

exports.opensky = {
    endpoint: `https://opensky-network.org/api/states/all?`
}

exports.aviationstack = {
    endpoint: `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATION_STACK_API_KEY}&flight_status=active`,
}

exports.messages = {

}