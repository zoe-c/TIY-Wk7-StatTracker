const express = require('express');
// const app = express();
const router = express.Router();
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const Activity = require('../models/activity.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));



router.get('/activities', passport.authenticate('basic', {session:false}), function(req, res) {
   Activity.find({}, function(err, activities) {
      if (err) {
         res.send(err);
      }
     res.json(activities);
   });
});

// postman tests: not grabbing key values via form data input. try post req w json.
router.post('/activities', passport.authenticate('basic', {session:false}), function(req, res) {
      Activity.create({
       name: req.body.activity_name,
       user: req.body.user,
       log: [{ stat: req.body.stat, date : new Date() }]
     })
     .then(activity =>{
      //  res.redirect('/api/activities')
         res.json(activity)
      })
      .catch(function (err) {
       res.send("error interception, please try again", err);
     })
// ---------------------------------------v1
  //  var newActivity = new Activity({
  //        name: req.body.activity_name,
  //        user: req.body.user,
  //        log: [{ stat: req.body.stat, date : new Date() }]
  //     });
  //
  //  newActivity.save(function(err, activity) {
  //    if (err) {
  //      res.send(err);
  //    }
  //    console.log('Activity Created!!> ' + activity);
  //    res.json(activity);
  // });
});


// activity routes
// app.route('/api/activities/:activityId')
//   .get(Activity.show_one_activity)
//   .put(Activity.update_activity)
//   .delete(Activity.delete_activity);

//    app.route('/api/activities/:activityId/stats')
//       .post(Activity.add_stat_to_activity_log);
//
//    app.route('/api/activities/:activityId/stats/:statId')
//       .delete(Activity.delete_stat_from_activity_log);
//
// };

// successful query by id
router.get('/activities/:activityId', passport.authenticate('basic', {session:false}), function(req, res) {
   Activity.findById(req.params.activityId, function(err, activity) {
     if (err)
       res.send(err);
     res.json(activity);
   });
});



module.exports = router;
