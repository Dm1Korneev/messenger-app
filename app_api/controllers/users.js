var mongoose = require("mongoose");
var UserModel = mongoose.model("User");
var { sendJsResponse } = require("./common");
const { AVATARS_DIR } = require("../common/constants");

module.exports.getUsers = function(req, res, next) {
  UserModel.aggregate([
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        avatar: { $concat: [AVATARS_DIR, "$avatar"] }
      }
    }
  ])
    .exec()
    .then(users => sendJsResponse(res, 200, users))
    .catch(err => sendJsResponse(res, 400, err));
};

module.exports.getUserByID = function(req, res, next) {
  if (!req.params || !req.params.userId) {
    sendJsResponse(res, 400, { message: "No 'userId' in request" });
    return;
  }

  const { userId } = req.params;
  UserModel.aggregate([
    {
      $match: {
        _id: userId
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        avatar: { $concat: [AVATARS_DIR, "$avatar"] }
      }
    }
  ])
    .exec()
    .then(user => {
      if (!user) {
        sendJsResponse(res, 404, { message: "'userId' not found" });
        return;
      }
      sendJsResponse(res, 200, user);
    })
    .catch(err => sendJsResponse(res, 400, err));
};
