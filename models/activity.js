const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
   //  date: { type: Date, default: Date.now },
    user: String,
    log: [{
      stat: Number,
      date: { type: Date, default: Date.now }
   }]
   //  userId: req.session.userId (?)
})

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
