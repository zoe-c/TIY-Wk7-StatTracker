const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const activitySchema = new mongoose.Schema({
    name: String,
   //  date: { type: Date, default: Date.now },
    user: String,
    log: [{
      stat: Number,
      date: { type: Date, default: Date.now }
   }]
})

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
