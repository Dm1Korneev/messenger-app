var express = require("express");
var router = express.Router();
var jwt = require("express-jwt");
var ctrlMessages = require("../controllers/messages");
var ctrlAuth = require("../controllers/authentifications");

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload"
});

router.get("", auth, ctrlMessages.getMessages);
router.post("", auth, ctrlMessages.postMessage);

// auth
router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

module.exports = router;
