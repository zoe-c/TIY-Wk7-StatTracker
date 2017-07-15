
var mongoose = require('mongoose'),
Activity = mongoose.model('Activity');
// const Activity = require('../models/activity.js')

exports.show_all_activities = function(req, res) {
  Activity.find({}, function(err, activity) {
    if (err)
      res.send(err);
    res.json(activity);
  });
};
// // NOTE: TRY: possible to use "result" in place of passing "activity"
// exports.list_all_activities = function(req, res) {
//    Activity.find({}, function(err, result) {
//       if (err) {
//          res.send(err);
//       }
//       res.json(result);
//    });
// };
// // NOTE: shorter v you've used for listing all activities
// Activity.find().then( result =>{
//    res.json(result);
// });


exports.create_activity = function(req, res) {
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


exports.show_one_activity = function(req, res) {
  Activity.findById(req.params.activityId, function(err, activity) {
    if (err)
      res.send(err);
    res.json(activity);
  });
};


exports.update_activity = function(req, res) {
  Activity.findOneAndUpdate({_id: req.params.activityId}, req.body, {new: true}, function(err, activity) {
    if (err)
      res.send(err);
    res.json(activity);
  });
};

exports.add_data_to_activity_log = function(req, res) {
      Activity.findOne({_id: req.params.activityId})
       .then(function (activity) {
            activity.log.push({
              stat: num,
              date: new Date()
            //   would this be req.body?, {new: true}
            })
            activity.save()
            .then(function (activity) {
            res.json(activity.toJSON());
            // res.json(activity);
            })
       })
       .catch(function (err) {
         res.send("error, diagnose and try again", err);
         });
      return
   }
}

exports.delete_activity = function(req, res) {
  Activity.remove({
    _id: req.params.activityId
}, function(err, activity) {
    if (err)
      res.send(err);
    res.json({ message: 'Activity has been deleted' });
  });
};
