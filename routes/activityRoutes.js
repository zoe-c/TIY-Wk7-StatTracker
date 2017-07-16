const express = require('express');
const app = express();
const router = express.Router();
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
// const controller = require('../controllers/activityController');
const Activity = require('../models/activity.js');

  // activity routes
  // app.route('/api/activities')
  //   .post(Activity.create_activity);
  //
  //
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
//
router.get('/activities', passport.authenticate('basic', {session:false}), function(req, res) {
   Activity.find({}, function(err, activities) {
      if (err) {
         res.send(err);
      }
     res.json(activities);
   });
});

router.post('/activities', passport.authenticate('basic', {session:false}), function(req, res) {
   var newActivity = new Activity({
         name: req.body.activity,
         user: req.user.name,
         log:[{ stat: req.body.stat, date: new Date()
      }]});

   newActivity.save(function(err, activity) {
     if (err) {
       throw err;
     }
     console.log('Activity Created!!> ' + activity);
     res.json(activity);
  });
});



module.exports = router;
