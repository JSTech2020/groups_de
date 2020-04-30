const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verificationToken: {
    type: String,
  },
  isAuthenticated: {
    type: Boolean,
    required: true,
    default: false
  },
  registrationComplete: {
    type: Boolean,
    required: true,
    default: false
  },
  firstname: {
    type: String,
    default: ''
  },
  birthdate: {
    type: Date,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: '',
  },
  parentPin: {
    type: String,
    default: '0000'
  },
  admin: {
    type: Boolean,
    default: false
  },
  stars: {
    type: Number,
    default: 0
  },
  achievements: [{
    type: String
  }],
  achievementProgress: [{
    achievementId: {
      type: String,
    },
    counter: {
      type: Number,
    },
    achievementSpecificData: {
      type: Schema.Types.Mixed,
    }
  }]
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) { this.password = await bcrypt.hash(this.password, 10); }
  this.verificationToken = jwt.sign(this.toJSON(), process.env.JWT_SECRET, {
    expiresIn: 604800
  });
  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 10);
  }
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
