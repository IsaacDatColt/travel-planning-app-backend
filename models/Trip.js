const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    destination: String,
    startDate: Date,
    endDate: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;

