const mongoose = require("mongoose");
const ChatModel = mongoose.model("Chat");
const { sendJsResponse, parseToken } = require("./common");
const fileLoaderToAWS = require("../common/fileLoaderToAWS");

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
        avatar: 1
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
        avatar: 1
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

module.exports.postChat = async function(req, res, next) {
  if (!req.body || !req.body.title) {
    sendJsResponse(res, 400, { message: "No 'title' in request" });
    return;
  }

  let avatar = "";
  if (req.file) {
    avatar = await fileLoaderToAWS(req.file);
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
        avatar: chat.avatar
      })
    )
    .catch(err => sendJsResponse(res, 400, err));
};

module.exports.updateChatByID = async function(req, res, next) {
  if (!req.params || !req.params.chatId) {
    sendJsResponse(res, 400, { message: "No 'chatId' in request" });
    return;
  }
  const chatId = mongoose.Types.ObjectId(req.params.chatId);
  const { title, avatar } = req.body;
  let { users } = req.body;

  let newAvatar = undefined;
  let avatarIsCange = false;
  if (req.file) {
    newAvatar = await fileLoaderToAWS(req.file);
    avatarIsCange = true;
  } else if (avatar === "undefined") {
    newAvatar = "";
    avatarIsCange = true;
  }
  if (users) {
    const admin = parseToken(req.headers.authorization)._id;
    users = [...users, admin].filter(
      (value, index, array) => array.indexOf(value) === index
    );
  }

  ChatModel.findById(chatId)
    .then(chat => {
      if (!chat) {
        sendJsResponse(res, 404, { message: "'chatId' not found" });
        return;
      }
      if (title) {
        chat.title = title;
      }
      if (users) {
        chat.users = users;
      }
      if (avatarIsCange) {
        chat.avatar = newAvatar;
      }

      return chat.save();
    })
    .then(chat => {
      sendJsResponse(res, 200, {
        _id: chat._id,
        users: chat.users,
        title: chat.title,
        admin: chat.admin,
        avatar: chat.avatar
      });
    })
    .catch(err => {
      if (!err) {
        return;
      }

      sendJsResponse(res, 404, err);
    });
};
