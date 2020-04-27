const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var AvatarSchema = new Schema({
  url: {
    type: String
  }
})

var Avatar = mongoose.model('Avatar', AvatarSchema);
module.exports = Avatar;
