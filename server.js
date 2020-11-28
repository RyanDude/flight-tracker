const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
let mongoose = require("mongoose");
require("dotenv").config();

const indexRouter = require("./routes/indexRouter.js");
const flightRouter = require("./routes/flightRouter.js");

const port = process.env.PORT || 3000;
const app = express();

// DB Connection
const uri = `mongodb+srv://mb:${process.env.MONGO_PASS}@cluster0.aiiyy.mongodb.net/flights?retryWrites=true&w=majority`;
// Connect to Mongoose and set connection variable
mongoose.connect(uri, {
    useNewUrlParser: true
});
let db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("db successfully connected");


app.engine("html", require("ejs").renderFile);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

// Handle homepage
app.use("/", indexRouter);

// Handle API requests
app.use("/flights", flightRouter);

// test db
const mongoRouter = require('./routes/mongoRouter.js');
app.use('/mongo', mongoRouter);

app.listen(port);

process.on("exit", (code) => {
    console.log(`About to exit with code ${code}`);
});