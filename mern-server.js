const express = require('express');
const parser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('express-flash');
const db = require('./handlers/dataConnector.js');
const path = require('path');

// create connection to database
db.connect();
// create an express app
const app = express();

// view engine setup
app.use(expressLayouts);
app.set('view engine', 'ejs'); 

// serves up static files from the public folder. 
app.use(express.static('public'));
app.use('/static', express.static('public'));

// tell node to use json and HTTP header features in body-parser
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Express session
app.use(cookieParser('oreos'));
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true
    })
);

//Enable CORS for all resources on your server.
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.all('*', function(req, res, next) {
//     var origin = req.get('origin'); 
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Use express flash
app.use(flash());
// set up the passport authentication
require('./handlers/auth.js');

// set up route handlers LOGIN
const openRoutes = require('./handlers/openRouter.js');
//app.use(express.static(path.join(__dirname, "./frontend", "build")));
const redirectingRoute =  express.static(path.join(__dirname, "./frontend", "build"));
app.use('/', openRoutes, redirectingRoute);

// These routes only if logged in
//Movies Api
const moviesRouter = require('./handlers/moviesRouter.js');
app.use('/api', moviesRouter);
//Users Api
const usersRouter = require('./handlers/usersRouter.js');
app.use('/api', usersRouter);

// customize the 404 error with our own middleware function
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
    });

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});


let port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Server running at port= " + port);
});
