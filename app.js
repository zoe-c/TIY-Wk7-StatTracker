const express = require('express');

// require mongoose
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//require models
// const testCollection = require('./models/testCollection.js');
const User = require('./models/user.js');
const Activity = require('./models/activity.js');

// require routes
const indexRouter = require('./routes/index');
// const routes = require('./routes/routes')

const path = require('path');
const bodyParser = require('body-parser');

//req auth
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');

// mongoose connection
mongoose.connect('mongodb://localhost:27017/stattracker');
var db = mongoose.connection;
console.log(db);


// app set up
const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// *************user instances to apply auth************
// var newUser = new User({name: "zoe", password: "zero"});
// newUser.save(function(err) {
//   if (err) { throw err; };
//   console.log('user created!');
// });
//
// console.log(newUser);

// // *************activity instances************
// var newActivity = new Activity({ name: "authorizationFAILS", user: "zoe", log:[{ stat: 99, date: new Date()}]});
//
// newActivity.save(function(err) {
//   if (err) {
//     throw err;
//   }
//   console.log('Activity Created!');
// }).then(function(newActivity) {
//    console.log(newActivity);
// });



//?? **************?? activity documents ??******************??
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












// // NOTE: commented for now: find another auth. DEMO AUTH/ BCRYPT ISN'T WORKING VVVVV
// passport.use(new BasicStrategy(
//   function(username, password, done) {
//      console.log(username, password);
//     User.findOne({ name: username }, function(err, user){
//       console.log("FOUND A MATCH: " + user);
//       if (user && bcrypt.compareSync(password, user.password)){
//          console.log('YOU SHALL PASS: ' + user)
//         return done(null, user);
//       }
//       return done(null, false);
//     });
//   }
// ));

// // use routes
app.use('/', indexRouter);

// // maybe delete
// app.get('/api/', function (req, res) {
//    // res.redirect('/api/auth');
//    // NOTE: use ^ when you can find something other than bcrypt
//    // NOTE: use v while you are setting up routes.
//    res.render()
// })

// app.get('/api/auth',
//   passport.authenticate('basic', {session: false}), function (req, res) {
//       // res.send('You have been authenticated, ' + req.user.username);
//       console.log(req.user.username);
//       console.log(user.name);
//       res.json(req.user);
//   }
// );


// NOTE: querying all from db **********
app.get('/api/god/users', function( req, res) {
   User.find().then( result =>{
      res.json(result);
   });
});

app.get('/api/god/activities', function( req, res) {
   Activity.find().then( result =>{
      res.json(result);
   });
});

app.listen(3000, function() {
   console.log('Listening on port 3000...');
});


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
