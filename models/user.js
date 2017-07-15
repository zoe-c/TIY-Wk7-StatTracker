const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
   name: String,
   password: String
});

// NOTE: your old schema
// const userSchema= new mongoose.Schema({
//    name: {
//       type: String,
//       required: true
//    },
//    password: {
//       type: String,
//       required: true
//    }
// });

userSchema.pre('save', function (next) {
   if (!this.isModified('password')) {
      return next();
   }
   var hash = bcrypt.hashSync(this.password, 8);
   this.password = hash;
   next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
