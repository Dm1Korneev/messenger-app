var mongoose = require("mongoose");
var MessageModel = mongoose.model("Message");
var { sendJsResponse, parseToken } = require("./common");

module.exports.getMessages = function(req, res, next) {
  MessageModel.aggregate(
    [
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "fromItems"
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$fromItems", 0] }, "$$ROOT"]
          }
        }
      },
      {
        $project: {
          _id: 1,
          avatar: 1,
          dateTime: 1,
          text: 1,
          authorId: "$author",
          author: "$name"
        }
      }
    ],
    function(err, messages) {
      if (err) {
        sendJsResponse(res, 400, err);
        return;
      }
      sendJsResponse(res, 200, { messages });
    }
  );
};

module.exports.postMessage = function(req, res, next) {
  const userInfo = parseToken(req.headers.authorization);

  MessageModel.create(
    {
      text: req.body.message.text,
      author: userInfo._id
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
