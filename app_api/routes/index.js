var express = require("express");
var router = express.Router();
var ctrl = require("../controllers");

router.get("", ctrl.getMessages);
router.post("", ctrl.postMessage);

module.exports = router;
