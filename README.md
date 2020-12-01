# flight-tracker

flight-tracker is a web application to help you find flights in your proximity. Allow geolocation and the app will get your coordinates and show nearby flights as well as basic flight information.

# Get Started

- Clone repository/download into your local environment and follow Installation below
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
- [express] - fast node.js network app framework
- [spherical-geometry-js] - to perform coordinate calculations
- [dotenv] - hide api keys
- [axios] - promise-based HTTP client for the browser and node.js
- [mongodb] - no-sql database
- [mongoose] - framework for mongodb
- [body-parser] - node.js body-parsing middleware
- [ejs] - html templating language with javascript

### Work to do

- Polish back-end api
- Front-end:
  - Clean up CSS/JS/HTML

\*\* Still developing what to do to meet project requirements

[node.js]: http://nodejs.org
[express]: http://expressjs.com
[spherical-geometry-js]: https://www.npmjs.com/package/spherical-geometry-js
[dotenv]: https://www.npmjs.com/package/dotenv
[axios]: https://www.npmjs.com/package/axios
[mongodb]: https://www.mongodb.com/
[mongoose]: https://www.npmjs.com/package/mongoose
[body-parser]: https://www.npmjs.com/package/body-parser
[ejs]: https://www.npmjs.com/package/ejs
