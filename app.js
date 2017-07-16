const express = require('express');
const path = require('path');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
// const mustache = require('mustache-express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// mongoose connection
mongoose.connect('mongodb://localhost:27017/stattracker');
var db = mongoose.connection;
// console.log(db);
const User = require('./models/user.js');
const Activity = require('./models/activity.js');
// const router = express.Router();
const indexRouter = require('./routes/index');
const activityRouter = require('./routes/activityRoutes');
const bcrypt = require('bcryptjs');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// views---------
// app.engine('mustache', mustache());
// app.set('view engine', 'mustache');
// app.set('views','./views');

// NOTE: PASSPORT BASIC---------------------
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
// ------------------------------------------
app.use('/', indexRouter);
app.use('/api', activityRouter);
// ------------------------------------------

app.listen(3000, function() {
   console.log('Listening on port 3000...');
});
