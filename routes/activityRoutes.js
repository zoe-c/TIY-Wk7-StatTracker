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
   // -------------------------------------------tutorial
       var newActivity = new Activity(req.body);
       newActivity.save(function(err, activity) {
         if(err) {
            res.send(err);
         }
         console.log(activity);
         res.json(activity);
       });

   //    Activity.create({
   //     name: req.body.activity_name,
   //     user: req.body.user,
   //     log: [{ stat: req.body.stat, date : new Date() }]
   //   })
   //   .then(activity =>{//    //  res.redirect('/api/activities')
   //       res.json(activity)
   //    })
   //    .catch(function (err) {
   //       res.send("error interception, please try again", err);
   //   })

});



// NOTE:success: query activity by id
router.get('/activities/:activityId', passport.authenticate('basic', {session:false}), function(req, res) {
   Activity.findById(req.params.activityId, function(err, activity) {
      if (err) {
         res.send(err);
      }
      res.json(activity);
   });
});


// NOTE: PUT--/activities/{id}--Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data
router.put('/activities/:activityId', passport.authenticate('basic', {session:false}), function(req, res) {

 //LECTURE NOTES METHOD------------------------------------
   Activity.updateOne({ _id: req.params.activityId }, {$push: { name: req.body.name }});

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


// NOTE:success: delete activity by id
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
router.delete('/stats/:statId', passport.authenticate('basic', {session:false}), function (req, res) {

   Activity.log.remove({ _id: req.params.statId})
   .then(function() {
      res.send('stat deleted')
   })
   .catch(function(err) {
      console.log('error!', err)
      res.send('Please try again, error ocurred: ', err);
   });

});

module.exports = router;
