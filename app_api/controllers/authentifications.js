var mongoose = require("mongoose");
var UserModel = mongoose.model("User");
var passport = require("passport");
var { sendJsResponse } = require("./common");

module.exports.register = function(req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJsResponse(res, 400, { message: "all fields required" });
    return;
  }

  const { name, email, password } = req.body;
  let avatar = "";
  if (req.files.length) {
    avatar = req.files[0].filename;
  }

  Promise.all([isUserNameIsAvailable(name), isEmailNameIsAvailable(email)])
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

function isUserNameIsAvailable(name) {
  return UserModel.findOne({ name }).exec();
}

function isEmailNameIsAvailable(email) {
  return UserModel.findOne({ email }).exec();
}

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
