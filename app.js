const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

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


// NOTE: PASSPORT BASIC API AUTH STRATEGY + BCRYPT/HASH from demo---------------
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

// -----------------------------------------------------------------------------

app.use('/', indexRouter);
// app.use('/api/activities', routes);



app.listen(3000, function() {
   console.log('Listening on port 3000...');
});
