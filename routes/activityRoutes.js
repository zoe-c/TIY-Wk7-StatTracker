const express = require('express');
// const app = express();
const path = require('path');
const router = express.Router();
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const Activity = require('../models/activity.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// NOTE: success: query all activities
router.get('/activities', passport.authenticate('basic', {session:false}), function(req, res) {
   Activity.find({}, function(err, activities) {
      if(err) {
         res.send(err);
      }
      res.json(activities);
   });
});

// NOTE: POST WORKS >>> but only when you send request in json
router.post('/activities', passport.authenticate('basic', {session:false}), function(req, res) {
   // -------------------------------------------REQUEST SENT IN JSON
   var newActivity = new Activity(req.body);
   newActivity.save(function(err, activity) {
      if(err) {
         res.send(err);
      }
      console.log(activity);
      res.json(activity);

   });
});
   // ----------------------------------------------REQUEST SENT IN FORM DATA. NOT WORKING: try again.
//   const input = req.body;
//   var newActivity = new Activity({
//      name: input.name,
//      user: req.user.name
//   });
//   newActivity.save(function(err, activity) {
//      if(err) {
//         res.send(err)
//      }
//      console.log(activity);
//    //   res.redirect('/activities')
//     res.send("Activity added");
//  });

// NOTE: success: query activity by id
router.get('/activities/:activityId', passport.authenticate('basic', {session:false}), function(req, res) {
   Activity.findById(req.params.activityId, function(err, activity) {
      if (err) {
         res.send(err);
      }
      res.json(activity);
   });
});


// NOTE: successful update. restrict access to log data by front end// not providing the option in a user form. (?)
router.put('/activities/:activityId', passport.authenticate('basic', {session:false}), function(req, res) {
   Activity.updateOne({ _id: req.params.activityId }, {$push: { name: req.body.name }})
   .then(function(err, activity) {
      if (err) { res.send(err) }
      activity.save()
      .then(function (activity) {
         console.log(activity);
         res.send(activity.toJSON());
      })

   });

// ANOTHER METHOD-----------------------------------------
// Activity.findById(req.params.activityId)
//   .then(function (activity) {
//       activity.name = req.body.name;
//       activity.save()
//       .then(function (activity) {
//         console.log("activity updated successfully")
//         res.json(activity);
//       })
//    })
//    .catch(function (err) {
//      res.send(err);
//    });
});


// NOTE: success: delete activity by id
router.delete('/activities/:activityId', passport.authenticate('basic', {session:false}), function (req, res) {
   Activity.deleteOne( {_id: req.params.activityId})
   .then(function() {
      res.send('activity deleted');
   })
   .catch(function(err) {
      console.log("error");
      res.send("please try again");
   });

});


// NOTE: POST: Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for existing tracked day.
router.post('/activities/:activityId/stats', passport.authenticate('basic', {session:false}), function (req, res) {
   Activity.findOne({_id: req.params.activityId})
         .then(function (activity) {
            activity.log.push({
               stat: req.body.stat,
               date: req.body.date
            });
            activity.save()
            .then(function (activity) {
               // res.json(activity.toJSON());
               res.json(activity);
            });

         })
         .catch(function (err) {
            res.send("error: ", err);
         });

});


// NOTE: DELETE:/stats/{id}--Remove tracked data for a day.
router.delete('/activities/:activityId/stats/:statId', passport.authenticate('basic', {session:false}), function (req, res) {
   Activity.log.remove({ _id: req.params.statId})
   .then(function() {
      res.send('stat deleted')
   })
   .catch(function(err) {
      console.log(err)
      res.send('Please try again, error ocurred: ', err);
   });

   // Activity.find({ _id: req.params.activityId }).then(function(activity) {
   //    activity.log.findOneAndRemove({ _id: req.params.statId}).then(function(err, activity) {
   //       if (err) {
   //          res.send(err);
   //       }
   //       console.log("stat deleted!");
   //       // res.send("stat deleted!")
   //       res.json(activity);
   //    })
   //    .catch(function(err) {
   //       res.send("Please try again: ", err)
   //    });
   // });

});

module.exports = router;
