const express = require('express');
const path = require('path');
const router = express.Router();
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const Activity = require('../models/activity.js');


// NOTE: success: query all activities
router.get('/activities', passport.authenticate('basic', {session:false}), function(req, res) {
   Activity.find({user: req.user.name}, function(err, activities) {
      if(err) {
         res.send(err);
      }
      res.json(activities);
   });
});

// NOTE: POST WORKS. note to self > get used to postman and select the correct format for your req.body.
router.post('/activities', passport.authenticate('basic', {session:false}), function(req, res) {
   var newActivity = new Activity(req.body);
   newActivity.save(function(err, activity) {
      if(err) {
         res.send(err);
      }
      console.log(activity);
      res.json(activity);

   });

//ALTERNATIVE instance k/v assignment vs general/ targeting whole "req.body"
// var newActivity = new Activity({
//      name: req.body.name,
//      user: req.user.name
//   });

});

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
// THIS METHOD: WORKS------------------------ BUT ADDS TO THE NAME, IT DOES NOT REASSIGN
// Activity.updateOne({ _id: req.params.activityId }, {$push: { name: req.body.name }})
// .then(function(err, activity) {
//    if (err) { res.send(err) }
//    activity.save()
//    .then(function (activity) {
//       console.log(activity);
//       res.send(activity.toJSON());
//    })
//
// });
// ANOTHER METHOD: WORKS---------------------------- REASSIGNS
   Activity.findById(req.params.activityId)
     .then(function (activity) {
         activity.name = req.body.name;
         activity.save()
         .then(function (activity) {
           console.log("activity updated successfully")
           res.json(activity);
         })
      })
      .catch(function (err) {
        res.send(err);
      });
});


// NOTE: success: delete activity by id
router.delete('/activities/:activityId', passport.authenticate('basic', {session:false}), function (req, res) {
   Activity.deleteOne({ _id: req.params.activityId })
   .then(function() {
      res.send('activity deleted');
   })
   .catch(function(err) {
      console.log("error");
      res.send("please try again");
   });

});


// NOTE: success: Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for existing tracked day.
router.post('/activities/:activityId/stats', passport.authenticate('basic', {session:false}), function (req, res) {
   Activity.findOne({_id: req.params.activityId})
         .then(function (activity) {
            activity.log.push({
               stat: req.body.stat,
               date: req.body.date
            });
            activity.save()
            .then(function (activity) {
               res.json(activity);
            });

         })
         .catch(function (err) {
            res.send("error: ", err);
         });

});


// finds the activity by its id
router.get('/stats/:id', passport.authenticate('basic', {session:false}), function (req, res) {
   let activityId = req.params.id;
   Activity.findById({ _id: activityId })
         .then(function (activity) {
            res.json(activity)
            // res.send(JSON.parse(activity.log))
         })
         .catch(function(err) {
            res.send(err)
         })

});


// deletes stat by id from "log" (array of stats within the activity)
router.delete('/stats/:id/:statId', passport.authenticate('basic', {session:false}), function (req, res) {
   let activityId = req.params.id;
   let statId = req.params.statId;
   Activity.findById({ _id: activityId }, function(err) {
      console.log(err)
   })
         .then(function (activity) {
            let log = activity.log
            activity.log.remove({
               _id: statId
            })
            activity.save(function(err, activity){
               if (err) {
                  console.log(err)
               }
               res.json(activity);
            })

         })
         .catch(function(err) {
            res.send(err)
         })


});

module.exports = router;
