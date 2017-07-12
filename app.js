// app reqs
const express = require('express');

// mongoose and connection
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//module.exports connection
const testCollection = require('./models/testCollection.js');


// const Customer = require('./models/customer.js');
// const Item = require('./models/item.js');
// const Vendor = require('./models/vendor.js');
// const customerRouter = require('./routes/customers');
// const venderRouter = require('./routes/vendors');

const path = require('path');
const bodyParser = require('body-parser');

// // NOTE: uncomment when you need this for user
// const passport = require('passport');
// const BasicStrategy = require('passport-http').BasicStrategy;
// const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/stattracker');
// console.log('CONNECTED ON THA PORT');
var db = mongoose.connection;
console.log(db);


// app set up
const app = express();






const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// connect to mongoose
// from lecture notes VVV
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/stattracker');

// from online tutorial VVV
var db = mongoose.connection;
// console.log(db);


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// routes
app.get('/', function(req, res) {
   res.send('Please use : /api/activities to access your tracked activities')
});

var testCollection = new Recipe({name: "Pancakes"});
recipe.ingredients.push({ingredient: 'sugar', measure: " Tbsp"});
console.log(recipe.toObject());

// route for proj *****
// app.get('/api/activities', function(req,res) {
//
// });


// THIS ONE ********
// app.get('/api/testCollection', function (req, res) {
//    console.log(testCollection.findOne({"name": "Cow"}));
//    testCollection.findOne({"name": "Cow"}).then(result =>{
//       res.json(result);
//    })
// })
// verdict: you'd started two instances of mongo. write to the one via brew services.

app.get('/api/testCollection', function (req, res) {
   console.log(testCollection.find());
   testCollection.find().then(result =>{
      res.json(result);
   })
})


// app.get('/api/testCollection', function (req, res) {
//    testCollection.gettestCollections(function(err, testCollection) {
//       if(err) {
//          console.log(err);
//          // throw err;
//       }
//       res.json(testCollection);
//    })
// })


app.listen(3000, function() {
   console.log('Listening on port 3000...');
});
