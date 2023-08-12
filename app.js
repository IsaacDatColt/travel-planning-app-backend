const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const User = require('./models/User');
const tripRoutes = require('./controllers/trips');


const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


app.use(express.json());

// Session configuration
app.use(expressSession({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/travel_app', { useNewUrlParser: true, useUnifiedTopology: true });

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.get('/', (req, res) => {
    res.send('Travel Planning App');
});

app.use('/users', require('./controllers/users'));
app.use('/trips', require('./controllers/trips'));
app.use('/itineraries', require('./controllers/itineraries'));


// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;