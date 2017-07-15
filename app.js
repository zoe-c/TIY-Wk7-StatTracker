const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// const testCollection = require('./models/testCollection.js');
const User = require('./models/user.js');
const Activity = require('./models/activity.js');
// const router = express.Router();

const indexRouter = require('./routes/index');
// const userRouter = require('./routes/users')
// const routes = require('./routes/routes')

const path = require('path');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');

// mongoose connection
mongoose.connect('mongodb://localhost:27017/stattracker');
var db = mongoose.connection;
console.log(db);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views','./views');



 // *************user instances to apply auth************
 // var newUser = new User({name: "honey", password: "buns"});
 // newUser.save(function(err) {
 //   if (err) { throw err; };
 //   console.log('user created!');
 // });
 //
 // console.log(newUser);

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



// var newActivity = new Activity({ name: "oz-sweated", user: "buns", description: "butt, really", log:[{ stat: 7, date: new Date()}]});
//
// newActivity.save(function(err) {
//   if (err) {
//     throw err;
//   }
//   console.log('Activity Created!');
// }).then(function(newActivity) {
//    console.log(newActivity);
// });


// NOTE: DEMO AUTH. CANNOT FIGURE OUT.-------------------------------
passport.use(new BasicStrategy(
  function(username, password, done) {
   //   console.log(username, password);
    User.findOne({ name: username }, function(err, user) {
      // console.log("FOUND A MATCH: " + user);
      if (user && bcrypt.compareSync(password, user.password)) {
         // console.log('YOU SHALL PASS: ' + user)
        return done(null, user);
      }
      return done(null, false);
    });
  }
));


app.get('/api/auth',
  passport.authenticate('basic', {session: false}), function (req, res) {
      res.send('You have been authenticated, ' + req.user.name);
  }
);

// ------------------------------------------------------

app.use('/', indexRouter);
// app.use('/api/activities', routes);

// REMOVE AFTER
// // NOTE: querying all from db **********
// app.get('/api/god/users', function( req, res) {
//    User.find().then( result =>{
//       res.json(result);
//    });
// });
//
app.get('/api/god/activities', function( req, res) {
   Activity.find().then( result =>{
      res.json(result);
   });
});

app.listen(3000, function() {
   console.log('Listening on port 3000...');
});
