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





// ------------------------------------------------------testqueries
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
