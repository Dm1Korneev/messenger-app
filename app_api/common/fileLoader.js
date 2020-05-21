const multer = require('multer');

const { MAX_AVATAR_SIZE } = require('./constants');

module.exports = multer({
  limits: { fileSize: MAX_AVATAR_SIZE },
});
