const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  avatar: { type: String },
  hash: String,
  salt: String,
});

userSchema.methods.setPassword = function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

userSchema.methods.validPassword = function validPassword(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');

  return hash === this.hash;
};

userSchema.methods.generateJwt = function generateJwt() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      exp: parseInt(expiry.getTime() / 1000, 10),
    },
    process.env.JWT_SECRET,
  );
};

mongoose.model('User', userSchema);
