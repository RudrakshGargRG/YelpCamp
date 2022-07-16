const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const ExpressError = require('../utils/ExpressError');

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }

})

userSchema.plugin(passportLocalMongoose);

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
       return next(new ExpressError('A user with such an e-mail already exists'));
    } else {
      next();
    }
  });


module.exports = mongoose.model("User", userSchema);