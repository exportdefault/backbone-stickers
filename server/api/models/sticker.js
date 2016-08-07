var mongoose  = require('mongoose');

var Schema = mongoose.Schema;


var Votes = new Schema({
  user_id: String
});

// create a schema
var stickerSchema = new Schema({
  title: String,
  description: String,
  user_id: String,
  created: Date,
  likes: [ Votes ]
});

// the schema is useless so far
// we need to create a model using it
var Sticker = mongoose.model('Sticker', stickerSchema);

// make this available to our users in our Node applications
module.exports = Sticker;