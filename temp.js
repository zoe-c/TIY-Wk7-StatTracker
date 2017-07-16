
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


//--------------------------------------------------1stPOSTMAN POST SUCCESS
// work on getting post to work with form data and not having to send json.
//  POSTMAN SUCCESSFUL ENTRY
      // {
      // 	"name": "postwin",
      //    "user": "buns",
      //    "log": [{"stat": 1}]
      //  }
