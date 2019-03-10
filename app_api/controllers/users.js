var mongoose = require("mongoose");
var UserModel = mongoose.model("User");
var {
  sendJsResponse,
  isUserNameIsAvailable,
  isEmailIsAvailable
} = require("./common");
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

  const userId = mongoose.Types.ObjectId(req.params.userId);
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

module.exports.updateUserByID = function(req, res, next) {
  if (!req.params || !req.params.userId) {
    sendJsResponse(res, 400, { message: "No 'userId' in request" });
    return;
  }
  const userId = mongoose.Types.ObjectId(req.params.userId);
  const { name, email, password } = req.body;
  let avatar = undefined;
  if (req.files && req.files.length) {
    avatar = req.files[0].filename;
  }

  Promise.all([
    isUserNameIsAvailable(name, userId),
    isEmailIsAvailable(email, userId)
  ])
    .then(([userNameIsFound, emailNameIsFound]) => {
      let errorMessage = "";
      if (userNameIsFound) {
        errorMessage += "Username is already use";
      }
      if (emailNameIsFound) {
        errorMessage += "\nEmail is already use";
      }
      if (errorMessage) {
        sendJsResponse(res, 400, { message: errorMessage });
        return Promise.reject(undefined);
      }

      return UserModel.findById(userId);
    })
    .then(user => {
      if (!user) {
        sendJsResponse(res, 404, { message: "'userId' not found" });
        return;
      }
      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }
      if (avatar) {
        user.avatar = avatar;
      }

      if (password) {
        user.setPassword(password);
      }
      return user.save();
    })
    .then(user => {
      token = user.generateJwt();
      sendJsResponse(res, 200, { token: token });
    })
    .catch(err => {
      if (!err) {
        return;
      }

      sendJsResponse(res, 404, err);
    });
};
