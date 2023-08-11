const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Register (Create)
router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password)
        .then(user => {
            passport.authenticate('local')(req, res, () => {
                res.json({ user: user });
            });
        })
        .catch(err => {
            console.log('Error:', err);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ user: req.user });
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logged out successfully!' });
});

// GET all users 
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json({ users: users }))
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

// GET a single user by ID 
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json({ user: user }))
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

// PUT to update a user by ID
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => res.json({ user: user }))
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

// DELETE a user by ID
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

module.exports = router;
