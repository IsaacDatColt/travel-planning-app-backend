const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const User = require('./models/User');
const userRoutes = require('./routes/users');


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect('mongodb://localhost/travel_app', { useNewUrlParser: true, useUnifiedTopology: true });



// Routes
app.use('/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Travel Planning App');
});


app.use(expressSession({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Start the server.
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
