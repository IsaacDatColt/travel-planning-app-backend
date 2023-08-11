const mongoose = require('mongoose');

const ItineraryItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String },
    description: { type: String },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true }
});

module.exports = mongoose.model('ItineraryItem', ItineraryItemSchema);
