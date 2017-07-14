// const express = require('express');
// const router = express.Router();
//
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
// const expressValidator = require("express-validator");
//
//
// const Activity = require('../models/activity');
// const User = require('../models/user');


// AUTH CODE HERE?
// router.get('/api/auth') >>>> this is in app.js file... this needs to redirect to /api/activities VVVV

// ********** begin routes *************

// GET	/activities	Show a list of all activities I am tracking, and links to their individual pages
// router.get('/api/activities', function (req,res) {
//       Activity.find().then(result =>{
//          res.json(result);
//       })
// })


// POST	/activities	Create a new activity for me to track.
// router.post('/api/activities', function (req,res) {
//    var newActivity = new Activity({name: "", date: Date.now, stat: 0, userId: req.session.userId });
//    newActivity.save(function(err) {
//    if (err) throw err;
//    console.log('activity created!');
      // return(newActivity);
//    });
// })

// GET	/activities/{id}	Show information about one activity I am tracking, and give me the data I have recorded for that activity.

// PUT	/activities/{id}	Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.

// DELETE	/activities/{id}	Delete one activity I am tracking. This should remove tracked data for that activity as well.

// POST	/activities/{id}/stats	Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.

// DELETE	/stats/{id}	Remove tracked data for a day.











// module.exports = router;







// sep if needed later
