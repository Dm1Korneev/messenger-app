var mongoose = require("mongoose");
var MessageModel = mongoose.model("Message");
var { sendJsResponse } = require("./common");

module.exports.getMessages = function(req, res, next) {
  MessageModel.find().exec(function(err, messages) {
    if (err) {
      sendJsResponse(res, 400, err);
      return;
    }
    sendJsResponse(res, 200, { messages: messages });
  });
};

module.exports.postMessage = function(req, res, next) {
  MessageModel.create(
    {
      text: req.body.message.text,
      author: "!!! TEST !!!"
    },
    function(err, message) {
      if (err) {
        sendJsResponse(res, 400, err);
      } else {
        sendJsResponse(res, 201, message);
      }
    }
  );
};
