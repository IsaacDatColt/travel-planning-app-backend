const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, (err, user) => {
        if (err) return res.status(500).send(err);
        passport.authenticate('local')(req, res, () => {
            res.send('Registered successfully!');
        });
    });
});

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send('Logged in successfully!');
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.send('Logged out successfully!');
});

module.exports = router;
