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
router.use(bodyParser.urlencoded({ extended: true }));


// successful query
router.get('/activities', passport.authenticate('basic', {session:false}), function(req, res) {
   Activity.find({}, function(err, activities) {
      if(err) {
         res.send(err);
      }
      res.json(activities);
   });
});

// postman tests: POST WORKS >>> but only when you send request in json
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


      //  POSTMAN SUCCESSFUL ENTRY = {
                                    // 	"name": "postwin",
                                    // 	"user": "buns",
                                    // 	"log": [{"stat": 1}]
                                    // }

// ---------------------------------------v2
   //    Activity.create({
   //     name: req.body.name,
   //     user: req.body.user,
   //     log: [{ stat: req.body.stat, date : new Date() }]
   //   })
   //   .then(activity =>{
   //    //  res.redirect('/api/activities')
   //       res.json(activity)
   //    })
   //    .catch(function (err) {
   //       res.send("error interception, please try again", err);
   //   })
// ---------------------------------------v1
  //  const activityName = req.body.name
  //  const activityStat = req.body.stat
  //  const newActivity = new Activity({
  //        name: activityName,
  //        user: req.user.name,
  //        log: [{ stat: activityStat, date : new Date() }]
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
      if (err) {
         res.send(err);
      }
      res.json(activity);
   });
});

router.put('/activities/:activityId', passport.authenticate('basic', {session:false}), function(req, res) {
   Activity.findOneAndUpdate({ _id: req.params.activityId },
      req.body, {new: true},
      function(err, activity) {
         if(err) {
           res.send(err)
         }
         console.log(activity);
         res.json(activity);
      }
   );
}

// function(req, res) {
//    Activity.findOne({_id: req.params.activityId}).
// }

);


router.delete('/activities/:activityId', function (req, res) {
  // Activity.remove({ _id: req.params.activityId})
  //   .then(function() {
  //     res.send("activity has been deleted");
  //  })
  //   .catch(function(err) {
  //     console.log('ERROR')
  //     res.send("error, please try again", err);
  //  });

   Activity.deleteOne( {_id: req.params.activityId})
   .then(function(){
      res.send('activity deleted');
   })
   .catch(function(err) {
      console.log("error")
      res.send("please try again");
   });
});


module.exports = router;
