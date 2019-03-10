var multer = require("multer");
const { MAX_AVATAR_SIZE, AVATARS_DIR } = require("./constants");
var path = require("path");

module.exports = multer({
  dest: path.join(__dirname, AVATARS_DIR),
  limits: { fileSize: MAX_AVATAR_SIZE }
});
