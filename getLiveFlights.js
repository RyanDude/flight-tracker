const axios = require("axios");
const apiEndpoint =
    "http://api.aviationstack.com/v1/airlines?access_key=db10cc6e68cfb15d0a3dfa5422656420"

axios
    .get(apiEndpoint)
    .then((response) => {
        getAirlines(response);
    })
    .catch((error) => {
        console.log(error);
    });


const getAirlines = (response) => {
    for (let i = 0; i < response.data.data.length; i++) {
        if (response.data.data[i].callsign === 'DELTA' || response.data.data[i].iata_code === 'ATL')
            console.log(response.data.data[i]);
    }
}