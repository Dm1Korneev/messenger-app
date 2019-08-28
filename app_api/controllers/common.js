const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserModel = mongoose.model('User');

module.exports.sendJsResponse = (res, status, content) => {
  res.status(status);
  if (content instanceof Error) {
    res.json({ message: content.message });
  } else {
    res.json(content);
  }
};

module.exports.parseToken = (authorizationHeader) => jwt.decode(authorizationHeader.split(' ')[1]);

module.exports.isUserNameIsAvailable = (name, userId = undefined) => UserModel.findOne({ name, _id: { $ne: userId } }).exec();

module.exports.isEmailIsAvailable = (email, userId = undefined) => UserModel.findOne({ email, _id: { $ne: userId } }).exec();
