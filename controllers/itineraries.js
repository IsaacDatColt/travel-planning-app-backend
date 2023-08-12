const express = require('express');
const router = express.Router();
const ItineraryItem = require('../models/Itinerary');
const Trip = require('../models/Trip');

// POST a new itinerary item
router.post('/', (req, res) => {
    const newItem = new ItineraryItem(req.body);
    newItem.save()
        .then(item => {
            Trip.findByIdAndUpdate(item.trip, { $push: { itinerary: item._id } }, { new: true })
                .then(trip => res.json({ item: item }))
                .catch(error => res.json({ message: 'An error occurred while updating the trip, please try again' }));
        })
        .catch(error => res.json({ message: 'An error occurred while creating the itinerary item, please try again' }));
});

// GET all itinerary items for a specific trip
router.get('/trip/:tripId', (req, res) => {
    ItineraryItem.find({ trip: req.params.tripId })
        .then(items => res.json({ items: items }))
        .catch(error => res.json({ message: 'An error occurred, please try again' }));
});

// PUT to update an itinerary item by ID
router.put('/:id', (req, res) => {
    ItineraryItem.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(item => res.json({ item: item }))
        .catch(error => res.json({ message: 'An error occurred, please try again' }));
});

// DELETE an itinerary item by ID
router.delete('/:id', (req, res) => {
    ItineraryItem.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Item deleted successfully' }))
        .catch(error => res.json({ message: 'An error occurred, please try again' }));
});

module.exports = router;
