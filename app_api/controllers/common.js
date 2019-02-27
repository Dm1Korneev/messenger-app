var jwt = require("jsonwebtoken");

module.exports.sendJsResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.parseToken = function(authorizationHeader) {
  return jwt.decode(authorizationHeader.split(" ")[1]);
};
