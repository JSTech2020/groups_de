const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

UserSchema.pre('save', async function(next) {
   const user = this;
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
