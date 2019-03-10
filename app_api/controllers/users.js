var mongoose = require("mongoose");
var passport = require("passport");
var UserModel = mongoose.model("User");
var {
  sendJsResponse,
  isUserNameIsAvailable,
  isEmailIsAvailable
} = require("./common");
const fileLoaderToAWS = require("../common/fileLoaderToAWS");

module.exports.getUsers = function(req, res, next) {
  UserModel.aggregate([
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        avatar: 1
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
        avatar: 1
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

module.exports.updateUserByID = async function(req, res, next) {
  if (!req.params || !req.params.userId) {
    sendJsResponse(res, 400, { message: "No 'userId' in request" });
    return;
  }
  const userId = mongoose.Types.ObjectId(req.params.userId);
  const { name, email, password, avatar } = req.body;
  let newAvatar = undefined;
  let avatarIsCange = false;
  if (req.file) {
    newAvatar = await fileLoaderToAWS(req.file);
    avatarIsCange = true;
  } else if (avatar === "undefined") {
    newAvatar = "";
    avatarIsCange = true;
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
      if (avatarIsCange) {
        user.avatar = newAvatar;
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

module.exports.register = async function(req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJsResponse(res, 400, { message: "all fields required" });
    return;
  }

  const { name, email, password } = req.body;
  let avatar = "";
  if (req.file) {
    avatar = await fileLoaderToAWS(req.file);
  }

  Promise.all([isUserNameIsAvailable(name), isEmailIsAvailable(email)])
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

      user = new UserModel();

      user.name = name;
      user.email = email;
      user.avatar = avatar;

      user.setPassword(password);
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

module.exports.login = function(req, res) {
  if (!req.body.email || !req.body.password) {
    sendJsResponse(res, 400, { message: "all fields required" });
    return;
  }

  passport.authenticate("local", function(err, user, info) {
    if (err) {
      sendJsResponse(res, 404, err);
      return;
    }
    if (user) {
      token = user.generateJwt();
      sendJsResponse(res, 200, { token: token });
    } else {
      sendJsResponse(res, 401, info);
    }
  })(req, res);
};
