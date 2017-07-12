const mongoose = require('mongoose');

const testCollectionSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   }
   // create_date: {
   //    type: Date,
   //    default: Date.now
   // }
});


const testCollection = mongoose.model('testCollection', testCollectionSchema);

module.exports = testCollection;

// online tutorial VVVVV---------------------------------
// const testCollection = module.exports = mongoose.model('testCollection', testCollectionSchema);
// // get testCollections
// module.exports.gettestCollections = function(callback, limit) {
   // testCollection.find(callback).limit(limit);
// }
