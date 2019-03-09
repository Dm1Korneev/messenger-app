require("dotenv").load();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var multer = require("multer");
const {
  MAX_AVATAR_SIZE,
  AVATARS_DIR,
  AVATARS_DIR_UPLOAD
} = require("./app_api/common/constants");

require("./app_api/models/db");
require("./app_api/models/config/passport");

var routesApi = require("./app_api/routes");

var app = express();

app.use(
  multer({
    dest: path.join(__dirname, AVATARS_DIR_UPLOAD),
    limits: { fileSize: MAX_AVATAR_SIZE }
  }).any()
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use(AVATARS_DIR, express.static(AVATARS_DIR_UPLOAD));

app.use(passport.initialize());
app.use("/api", routesApi);
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

module.exports = app;
