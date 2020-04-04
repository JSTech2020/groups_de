const mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
};