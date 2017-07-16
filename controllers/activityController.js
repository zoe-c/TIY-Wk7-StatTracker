
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Activity = require('../models/activity.js');
var exports = module.exports = {};

exports.show_all_activities = function(req, res) {
  Activity.find({}, function(err, activity) {
    if (err)
      res.send(err);
    res.json(activity);
  });
};
// NOTE: TRY: possible to use "result" in place of passing "activity"
exports.list_all_activities = function(req, res) {
   Activity.find({}, function(err, result) {
      if (err) {
         res.send(err);
      }
      res.json(result);
   });
};
// NOTE: shorter v you've used for listing all activities
Activity.find().then( result =>{
   res.json(result);
});


module.exports.create_activity = function(req, res) {
  var new_activity = new Activity(req.body);
  new_activity.save(function(err, activity) {
    if (err)
      res.send(err);
    res.json(activity);
  });
};
// NOTE: the way you created new before. try if ^ doesn't work
// exports.create_activity = function(req,res) {
//    var newActivity = new Activity({ name: "XXX", user: "XXX", log:[{ stat: num, date: new Date()}]});
//
//    newActivity.save(function(err) {
//      if (err) {
//        throw err;
//      }
//      console.log('Activity Created!');
//    })
// }


module.exports.show_one_activity = function(req, res) {
  Activity.findById(req.params.activityId, function(err, activity) {
    if (err)
      res.send(err);
    res.json(activity);
  });
};


module.exports.update_activity = function(req, res) {
  Activity.findOneAndUpdate({_id: req.params.activityId}, req.body, {new: true}, function(err, activity) {
    if (err)
      res.send(err);
    res.json(activity);
  });
};


module.exports.delete_activity = function(req, res) {
  Activity.remove({
    _id: req.params.activityId
}, function(err, activity) {
    if (err)
      res.send(err);
    res.json({ message: 'Activity has been deleted' });
  });
};
// 
// module.exports.add_stat_to_activity_log = function(req, res) {
//    Activity.findOne({_id: req.params.activityId})
//       .then(function (activity) {
//          activity.log.push({
//             stat: req.body.stat,
//             date: req.body.date
//             //  this wouldn't be new Date()...in the case user was editing an existing logged stat for a different day.
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
