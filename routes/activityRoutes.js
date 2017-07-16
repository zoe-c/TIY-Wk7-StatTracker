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

// NOTE: try tomorrow with a mustache form!!!----------------------------------------------------
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


// successful query by id
router.get('/activities/:activityId', passport.authenticate('basic', {session:false}), function(req, res) {
   Activity.findById(req.params.activityId, function(err, activity) {
      if (err) {
         res.send(err);
      }
      res.json(activity);
   });
});

// changing activity only, not the tracked data
router.put('/activities/:activityId', passport.authenticate('basic', {session:false}), function(req, res) {
   Activity.findById(req.params.activityId)
     .then(function (activity) {
      activity.name = req.body.name;
      activity.save()
         .then(function (activity) {
           console.log("activity updated successfully")
           res.json(activity);
         })
         .catch(function (err) {
           res.send(err);
         })
   })





   // activity routes

      app.route('/api/activities/:activityId/stats')
         .post(Activity.add_stat_to_activity_log);

      app.route('/api/activities/:activityId/stats/:statId')
         .delete(Activity.delete_stat_from_activity_log);

   };


   // Activity.findOneAndUpdate({ _id: req.params.activityId },
   //    req.body, {new: true},
   //    function(err, activity) {
   //       if(err) {
   //         res.send(err)
   //       }
   //       console.log(activity);
   //       res.json(activity);
   //    }
   // );

   // //LECTURE NOTES METHOD-----------------------------
   // Activity.updateOne({_id: req.params.activityId},
   //   {$push: {name:"" }})

});


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






//---------rest of functions from collections-------------------------------
// module.exports.add_stat_to_activity_log = function(req, res) {
//    Activity.findOne({_id: req.params.activityId})
//       .then(function (activity) {
//          activity.log.push({
//             stat: req.body.stat
//             })
//          activity.save()
//          .then(function (activity) {
//             res.json(activity.toJSON());
//             // res.json(activity);
//          })
//        })
//       .catch(function (err) {
//          res.send("error, diagnose and try again", err);
//       });
//    return
// }
//
//
//
// module.exports.delete_stat_from_activity_log = function(req, res) {
//       Activity.findOne({_id: req.params.activityId})
//        .then(function (activity) {
//             activity.log.remove({
//               date: req.body.date
//             })
//          })
//        .then(function() {
//          res.send('Stat was successfully removed from your activity log')
//        })
//        .catch(function (err) {
//          res.send("Error interception, please try again", err);
//          });
//       return
//    }
// }
