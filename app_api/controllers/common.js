module.exports.sendJsResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
