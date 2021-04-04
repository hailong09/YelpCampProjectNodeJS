const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
//The passport has already add the usrname and password that was salted and hashed to the schema
const User = new Schema({
   email: {
       type: String,
       required: true,
       unique: true,
   }
});



User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);