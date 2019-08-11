var express = require("express");
const path = require('path');
const session = require("express-session");
var mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);
var bodyParser = require("body-parser");
const settings = require("./settings");


var app = express();

var server = app.listen(process.env.PORT || 5050, '0.0.0.0', function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

const db = require('./db')(mongoose, session);
const io = require("./sockets.js")(server);

const apiRoutes = require('./api/routes')(db, io);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: settings.sessionSecret || "n/a",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));




app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.use('/api', apiRoutes);