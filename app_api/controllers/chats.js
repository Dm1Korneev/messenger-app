var mongoose = require("mongoose");
var ChatModel = mongoose.model("Chat");
var { sendJsResponse, parseToken } = require("./common");

module.exports.getChats = function(req, res, next) {
  const userInfo = parseToken(req.headers.authorization);

  ChatModel.find(
    { users: userInfo._id },
    { _id: 1, title: 1, users: 1, admin: 1 }
  )
    .exec()
    .then(chats => sendJsResponse(res, 200, chats))
    .catch(err => sendJsResponse(res, 400, err));
};

module.exports.getChatByID = function(req, res, next) {
  if (!req.params || !req.params.chatId) {
    sendJsResponse(res, 400, { message: "No 'chatId' in request" });
    return;
  }

  const userInfo = parseToken(req.headers.authorization);

  ChatModel.findOne(
    { _id: req.params.chatId, users: userInfo._id },
    { _id: 1, title: 1, users: 1, admin: 1 }
  )
    .exec()
    .then(chat => {
      if (!chat) {
        sendJsResponse(res, 404, { message: "'chatId' not found" });
        return;
      }
      sendJsResponse(res, 200, chat);
    })
    .catch(err => sendJsResponse(res, 400, err));
};

module.exports.postChat = function(req, res, next) {
  if (!req.body || !req.body.users) {
    sendJsResponse(res, 400, { message: "No 'users' in request" });
    return;
  }

  const { title } = req.body;
  let { users } = req.body;
  const admin = parseToken(req.headers.authorization)._id;
  users = [...users, admin].filter(
    (value, index, array) => array.indexOf(value) === index
  );

  new ChatModel({
    title,
    users,
    admin
  })
    .save()
    .then(chat => sendJsResponse(res, 201, chat))
    .catch(err => sendJsResponse(res, 400, err));
};
