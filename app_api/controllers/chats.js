var mongoose = require("mongoose");
var ChatModel = mongoose.model("Chat");
var { sendJsResponse, parseToken } = require("./common");
const { AVATARS_DIR } = require("../common/constants");

module.exports.getChats = function(req, res, next) {
  const userInfo = parseToken(req.headers.authorization);
  const user = mongoose.Types.ObjectId(userInfo._id);

  ChatModel.aggregate([
    {
      $match: {
        $expr: { $in: [user, "$users"] }
      }
    },
    {
      $project: {
        _id: 1,
        title: 1,
        users: 1,
        admin: 1,
        avatar: { $concat: [AVATARS_DIR, "$avatar"] }
      }
    }
  ])
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
  const user = mongoose.Types.ObjectId(userInfo._id);

  ChatModel.aggregate([
    {
      $match: {
        _id: req.params.chatId,
        $expr: { $in: [user, "$users"] }
      }
    },
    {
      $project: {
        _id: 1,
        title: 1,
        users: 1,
        admin: 1,
        avatar: { $concat: [AVATARS_DIR, "$avatar"] }
      }
    }
  ])
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
  if (!req.body || !req.body.title) {
    sendJsResponse(res, 400, { message: "No 'title' in request" });
    return;
  }

  let avatar = "";
  if (req.files.length) {
    avatar = req.files[0].filename;
  }
  const { title } = req.body;
  let users = [];
  if (req.body.users) {
    users = req.body.users;
  }
  const admin = parseToken(req.headers.authorization)._id;
  users = [...users, admin].filter(
    (value, index, array) => array.indexOf(value) === index
  );

  new ChatModel({
    title,
    users,
    admin,
    avatar
  })
    .save()
    .then(chat =>
      sendJsResponse(res, 201, {
        _id: chat._id,
        users: chat.users,
        title: chat.title,
        admin: chat.admin,
        avatar: AVATARS_DIR + chat.avatar
      })
    )
    .catch(err => sendJsResponse(res, 400, err));
};
