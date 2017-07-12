const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    date: { type: Date, required: true, default: Date.now }
    stat: Number,
})

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
