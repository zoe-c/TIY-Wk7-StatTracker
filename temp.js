
// -------------------------------------------------------------------bcrypt/ hash
// ********missing piece to bcrypt! hash that pwrt, girl.*************
//  var user = User.findOne({ name: "honey" },
//    function(err, user) {
//       user.password = "buns";
//       user.save(function(err) {
//          if (err) {
//              console.log('user not saved')
//              return
//          }
//          console.log('user saved!')
//       });
// });
// ------------------------------------------------------------------user
// *************create user************
// var newUser = new User({name: "zoe", password: "zero"});
// newUser.save(function(err) {
//   if (err) { throw err; };
//   console.log('user created!');
// });
//
// console.log(newUser);

// ------------------------------------------------------------------activity
// // ************* create activity ***************
// var newActivity = new Activity({
   //    name: "XXX",
   //    user: "XXX",
   //    log:[{ stat: num, date: new Date()
   // }]});
//
// newActivity.save(function(err) {
//   if (err) {
//     throw err;
//   }
//   console.log('Activity Created!');
// }).then(function(newActivity) {
//    console.log(newActivity);
// });

// ************** activity log ******************
// var log = function(req, res) {
//    Activity.findOne({name: "authorizationFAILS"})
//     .then(function (activity) {
//          activity.log.push({
//            stat: 88,
//            date: new Date()
//          })
//          activity.save()
//          .then(function (activity) {
//          res.json(activity.toJSON());
//          })
//     })
//     .catch(function (err) {
//       res.send("error, diagnose and try again", err);
//       });
//    return
// }
//

// ------------------------------------------------------------------queries
// NOTE: testCollection: querying one  ********
// app.get('/api/testCollection', function (req, res) {
//    console.log(testCollection.findOne({"name": "Cow"}));
//    testCollection.findOne({"name": "Cow"}).then(result =>{
//       res.json(result);
//    })
// })

// NOTE: testCollection: querying all ***********
// app.get('/api/testCollection', function (req, res) {
//    testCollection.find().then(result =>{
//       res.json(result);
//    })
// })

// // NOTE: querying all users from db **********
// app.get('/api/god/users', function( req, res) {
//    User.find().then( result =>{
//       res.json(result);
//    });
// });


// // NOTE: querying all activities from db ********
// app.get('/api/god/activities', function( req, res) {
//    Activity.find().then( result =>{
//       res.json(result);
//    });
// });

// --------------------------------------------------routes
// drop back in routes if tutorial doesn't work

// const express = require('express');
// const router = express.Router();
//
// const passport = require('passport');
// const BasicStrategy = require('passport-http').BasicStrategy;
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
//
// const Activity = require('../models/activity.js');
// const User = require('../models/user.js');
//
//
// // AUTH CODE HERE?
// // router.get('/api/auth') >>>> this is in app.js file... this needs to redirect to /api/activities VVVV
//
// // ********** begin routes *************
//
// // GET	/activities	 Show a list of all activities I am tracking, and links to their individual pages------------------
// router.get('/api/activities', function(req, res){
//   Activity.find().then(result => {
//       res.json(result);
//    })
// });
// // router.get('/api/activities', passport.authenticate('basic', {session: false}), function(req, res){
// //   Activity.find().then(result => {
// //       res.json(result);
// //    })
// // });
//
//
// // POST	/activities	Create a new activity for me to track.-------------
// // router.post('/api/activities', function (req,res) {
// //    var newActivity = new Activity({name: "", date: Date.now, stat: 0, userId: req.session.userId });
// //    newActivity.save(function(err) {
// //    if (err) throw err;
// //    console.log('activity created!');
//       // return(newActivity);
// //    });
// // })
//
// // GET	/activities/{id}	Show information about one activity I am tracking, and give me the data I have recorded for that activity.-------------
// // router.get('/activities/:id', function (req, res) {
//
// // })
//
// // PUT	/activities/{id}	Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.---------------
// router.put('/activities/:id', )
// // ********************************
// // Activity.findOne({name: "XXX"})
// //       .then(function (activity) {
// //          activity.log.push({
// //            stat: NUM,
// //            date: new Date()
// //          })
// //          activity.save()
// //          .then(function (activity) {
// //          res.json(activity.toJSON());
// //          })
// //     })
// //     .catch(function (err) {
// //       res.send("error, diagnose and try again", err);
// //       });
// //    return
// // }
//
// // DELETE	/activities/{id}	Delete one activity I am tracking. This should remove tracked data for that activity as well.------------------
//    // Activity.deleteOne({_id: XXX })
//
// // POST	/activities/{id}/stats	Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.---------------------
//
// // DELETE	/stats/{id}	Remove tracked data for a day.---------------
//
//
//
//
//
//
// module.exports = router;