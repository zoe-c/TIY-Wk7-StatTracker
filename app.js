const express = require('express');

// require mongoose
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//require models
// const testCollection = require('./models/testCollection.js');
const User = require('./models/user.js');
// const Activity = require('./models/activity.js');

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
//   if (err) throw err;
//   console.log('user created!');
// });
//
// console.log(newUser);
// *************another user*****************
// var newUser = new User({name: "pancakes", password: "syrup"});
// newUser.save(function(err) {
//   if (err) throw err;
//   console.log('user created!');
// });
//
// console.log(newUser);
// *************and another user***************
// var newUser = new User({name: "waffles", password: "molasses"});
// newUser.save(function(err) {
//   if (err) throw err;
//   console.log('user created!');
// });
//
// console.log(newUser);

// // use routes
// app.use('/api/', require('./routes/routes'));
// app.use('/', require('./routes/index'));

app.get('/api/', function (req, res) {
   res.redirect('/api/auth');
})

passport.use(new BasicStrategy(
  function(username, password, done) {
     console.log(username, password);
    User.findOne({ name: username }, function(err, user){
      console.log("FOUND A MATCH: " + user);
      if (user && bcrypt.compareSync(password, user.password)){
         console.log('YOU SHALL PASS: ' + user)
        return done(null, user);
      }
      return done(null, false);
    });
  }
));

app.get('/api/auth',
  passport.authenticate('basic', {session: false}), function (req, res) {
      res.send('You have been authenticated, ' + req.user.username);
  }
);






// route for proj *****
// app.get('/api/activities', function(req,res) {
//
// });

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



app.listen(3000, function() {
   console.log('Listening on port 3000...');
});
