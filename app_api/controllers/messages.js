var mongoose = require("mongoose");
var MessageModel = mongoose.model("Message");
var ChatModel = mongoose.model("Chat");
var { sendJsResponse, parseToken } = require("./common");

module.exports.getMessages = function(req, res, next) {
  if (!req.params || !req.params.chatId) {
    sendJsResponse(res, 400, { message: "No chatId in request" });
    return;
  }

  const chat = mongoose.Types.ObjectId(req.params.chatId);

  const messageGetQuery = MessageModel.aggregate([
    {
      $match: {
        chat
      }
    },
    {
      $project: {
        _id: 1,
        dateTime: 1,
        text: 1,
        author: 1
      }
    },
    { $sort: { dateTime: 1 } }
  ]).exec();

  const usersGetQuery = MessageModel.aggregate([
    {
      $match: {
        chat
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "authors"
      }
    },
    { $unwind: "$authors" },
    {
      $group: {
        _id: "$authors._id",
        name: { $max: "$authors.name" },
        avatar: { $max: "$authors.avatar" }
      }
    }
  ]).exec();

  Promise.all([messageGetQuery, usersGetQuery])
    .then(([messages, users]) => {
      sendJsResponse(res, 200, { messages, users });
    })
    .catch(err => {
      sendJsResponse(res, 400, err);
    });
};

module.exports.postMessage = function(req, res, next) {
  if (!req.params || !req.params.chatId) {
    sendJsResponse(res, 400, { message: "No chatId in request" });
    return;
  }

  const author = parseToken(req.headers.authorization)._id;
  const chatId = req.params.chatId;

  ChatModel.findOne({ users: author, _id: chatId })
    .exec()
    .then(chat => {
      if (!chat) {
        sendJsResponse(res, 404, { message: "'chatId' not found" });
        return;
      }

      const { text } = req.body;

      return new MessageModel({
        chat: chatId,
        text,
        author
      }).save();
    })
    .then(message => {
      sendJsResponse(res, 200, message);
    })
    .catch(err => {
      sendJsResponse(res, 400, err);
    });
};
