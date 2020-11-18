# flight-tracker

flight-tracker is a web application to help you find flights in your proximity. Allow geolocation and the app will get your coordinates and show nearby flights as well as basic flight information.

# Get Started

- Clone repository into your local environment and follow Installation below
- Currently only backend API is working

### Installation

flight-tracker is currently running on [Node.js](https://nodejs.org/) version 12.18.1 and [npm](https://npmjs.com) version 6.14.5. To check your node and npm version, run the command:

```sh
$ node --version
$ npm --version
```

Install the dependencies and start the server.

```sh
$ npm install axios spherical-geometry-js dotenv
$ npm start
```

node start will run the index.js file. It currently takes in a set of hard-coded coordinates and retrieves nearby flights from the AviationStack API and SkyNet API.

### Tech

flight-track uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [express] - fast node.js network app framework [@tjholowaychuk]
- [spherical-geometry-js] - to perform coordinate calculations
- [dotenv] - hide api keys
- [axios] - promise-based HTTP client for the browser and node.js

### Work to do

- Setup the front-end application with either basic HTML, React, or some framework
- Get user geolocation from front-end and send to the back-end so that the back can acccess the user's current location
- Working with the Google Maps API, be able to plot planes where the coordinates are
- Click on a plane and retrieve flight information via card pop-up
- Store flights in either SQL database or Mongo DB so that last 5 flights can be retrieved\*\*
- Polish back-end API
- Store flights in either SQL database or Mongo DB so that last 5 flights can be retrieved\*\*
- Polish back-end api
- Front-end:
  - Remove old plane markers when getting new ones
  - Clean up CSS/JS/HTML
  - Zoom map to fit all markers
  - Change plane and user icons
  - Change favicon
  - Handle previous flights

\*\* Still developing what to do to meet project requirements

[dotenv]: https://www.npmjs.com/package/dotenv
[axios]: https://www.npmjs.com/package/axios
[spherical-geometry-js]: https://www.npmjs.com/package/spherical-geometry-js
[node.js]: http://nodejs.org
[express]: http://expressjs.com
