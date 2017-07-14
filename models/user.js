const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const userSchema= new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   }
});

//NOTE: uncomment after you add a few users to the collection
// auth will be required for all routes... store this function in a var for calls in routes?

// userSchema.pre('save', function (next) {
//    if (!this.isModified('password')) {
//       return next();
//    }
//    var hash = bcrypt.hashSync(this.password, 8);
//    this.password = hash;
//    next();
// })

const User = mongoose.model('User', userSchema);

module.exports = User;
