var mongoose  = require('mongoose'),
    bcrypt    = require("bcryptjs");

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: {
    type : String,
    unique : true,
    required : true,
    dropDups: true
  },
  password: { 
    type: String, 
    required: true 
  },
  auth_token: {
    type : String,
    unique : true,
    required : true,
    dropDups: true
  },
  admin: Boolean,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date  
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;