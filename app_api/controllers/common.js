var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var UserModel = mongoose.model("User");
const { AVATARS_DIR } = require("../common/constants");

module.exports.sendJsResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.parseToken = function(authorizationHeader) {
  return jwt.decode(authorizationHeader.split(" ")[1]);
};

module.exports.isUserNameIsAvailable = function(name, userId = undefined) {
  return UserModel.findOne({ name, _id: { $ne: userId } }).exec();
};

module.exports.isEmailIsAvailable = function(email, userId = undefined) {
  return UserModel.findOne({ email, _id: { $ne: userId } }).exec();
};
