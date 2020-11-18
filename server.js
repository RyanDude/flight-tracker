const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const indexRouter = require('./routes/indexRouter.js');
const flightRouter = require('./routes/flightRouter.js');

const port = process.env.PORT || 3000;
const app = express();

app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon('./public/favicon.ico'));

// Handle homepage
app.use('/', indexRouter);

// Handle API requests
app.use('/flights', flightRouter);

app.listen(port);

process.on('exit', (code) => {
    console.log(`About to exit with code ${code}`);
});