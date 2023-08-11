const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// GET all trips
router.get('/', (req, res) => {
    Trip.find()
        .then(trips => {
            if (trips.length > 0) {
                return res.json({ trips: trips });
            } else {
                return res.json({ message: 'No trips exist' });
            }
        })
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

// GET all trips within a date range
router.get('/dateRange', (req, res) => {
    const { start, end } = req.query;

    if (!start || !end) {
        return res.status(400).json({ message: 'Start and end dates are required' });
    }

    Trip.find({
        startDate: { $gte: new Date(start) },
        endDate: { $lte: new Date(end) },
        user: req.user._id
    })
        .then(trips => {
            return res.json({ trips: trips });
        })
        .catch(error => {
            console.log('Error:', error);
            return res.status(500).json({ message: 'An error occurred, please try again' });
        });
});

// GET a single trip by ID
router.get('/:id', (req, res) => {
    Trip.findById(req.params.id)
        .then(trip => res.json({ trip: trip }))
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});




// POST a new trip
router.post('/', (req, res) => {
    console.log(req.headers);
    console.log(req.body);
    const newTrip = new Trip({
        title: req.body.title,
        destination: req.body.destination,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    });

    newTrip.save()
        .then(trip => {
            console.log('New trip created:', trip);
            return res.json({ trip: trip });
        })
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});



// PUT to update a trip by ID
router.put('/:id', (req, res) => {
    Trip.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(trip => res.json({ trip: trip }))
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

// DELETE a trip by ID
router.delete('/:id', (req, res) => {
    Trip.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Trip deleted successfully' }))
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

module.exports = router;
