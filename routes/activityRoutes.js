// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const BasicStrategy = require('passport-http').BasicStrategy;
// const controller = require('../controllers/activityController');
// const Activity = require('../models/activity.js');

// router.get('/api', passport.authenticate('basic', {session:false}), function(req,res) {
//    res.send('You have been authenticated ' + req.user.name)
// })

//   // activity routes
//   app.route('/activities')
//     .get(Activity.show_all_activities)
//     .post(Activity.create_activity);
//
//
//   app.route('/activities/:activityId')
//     .get(Activity.show_one_activity)
//     .put(Activity.update_activity)
//     .delete(Activity.delete_activity);
//
//    app.route('/activities/:activityId/stats')
//       .post(Activity.add_stat_to_activity_log);
//
//    app.route('/activities/:activityId/stats/:statId')
//       .delete(Activity.delete_stat_from_activity_log);
//
// };

// router.get('/api/activities', passport.authenticate('basic', {session:false}), function(req, res {
//    Activity.find({}, function(err, activity) {
//      if (err)
//       res.send(err);
//      res.json(activity);
//    });
// }));



module.exports = router;
