import { RequestHandler } from 'express';
import { Types } from 'mongoose';

import { loadToAWS } from '../common';
import { ChatModel, IChatDocument } from '../models';

import { sendJsResponse, getUserIdFromAuthorizationHeader } from './common';

export const getChats: RequestHandler = (req, res) => {
  const userId = getUserIdFromAuthorizationHeader(req.headers.authorization);
  const user = Types.ObjectId(userId);

  ChatModel.aggregate<IChatDocument>([
    {
      $match: {
        $expr: { $in: [user, '$users'] },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        users: 1,
        admin: 1,
        avatar: 1,
      },
    },
  ])
    .then((chats) => sendJsResponse(res, 200, chats))
    .catch((err) => sendJsResponse(res, 400, err));
};

export const getChatByID: RequestHandler = (req, res) => {
  if (!req.params || !req.params.chatId) {
    sendJsResponse(res, 400, { message: "No 'chatId' in request" });
    return;
  }
  const userId = getUserIdFromAuthorizationHeader(req.headers.authorization);
  const user = Types.ObjectId(userId);
  const chat = Types.ObjectId(req.params.chatId);

  ChatModel.findOne(
    {
      _id: chat,
      $expr: { $in: [user, '$users'] },
    },
    {
      _id: 1,
      title: 1,
      users: 1,
      admin: 1,
      avatar: 1,
    },
  )
    .then((chat) => {
      if (!chat) {
        sendJsResponse(res, 404, { message: "'chatId' not found" });
        return;
      }
      sendJsResponse(res, 200, chat);
    })
    .catch((err) => sendJsResponse(res, 400, err));
};

export const postChat: RequestHandler = async (req, res) => {
  if (!req.body || !req.body.title) {
    sendJsResponse(res, 400, { message: "No 'title' in request" });
    return;
  }

  let avatar = '';
  if (req.file) {
    avatar = await loadToAWS(req.file);
  }
  const { title } = req.body;
  let users: string[] = [];
  if (req.body.users) {
    users = req.body.users;
  }
  const admin = getUserIdFromAuthorizationHeader(req.headers.authorization);
  users = [...users, admin].filter(
    (value, index, array) => array.indexOf(value) === index,
  );

  new ChatModel({
    title,
    users,
    admin,
    avatar,
  })
    .save()
    .then((chat) => sendJsResponse(res, 201, {
      _id: chat._id,
      users: chat.users,
      title: chat.title,
      admin: chat.admin,
      avatar: chat.avatar,
    }))
    .catch((err) => sendJsResponse(res, 400, err));
};

export const updateChatByID: RequestHandler = async (req, res) => {
  if (!req.params || !req.params.chatId) {
    sendJsResponse(res, 400, { message: "No 'chatId' in request" });
    return;
  }
  const chatId = Types.ObjectId(req.params.chatId);
  const { title, avatar } = req.body;
  let { users } = req.body;

  let newAvatar: string;
  let avatarIsCange = false;
  if (req.file) {
    newAvatar = await loadToAWS(req.file);
    avatarIsCange = true;
  } else if (avatar === 'undefined') {
    newAvatar = '';
    avatarIsCange = true;
  }
  if (users) {
    const admin = getUserIdFromAuthorizationHeader(req.headers.authorization);
    users = [...users, admin].filter(
      (value, index, array) => array.indexOf(value) === index,
    );
  }

  ChatModel.findById(chatId)
    .then((chatParam) => {
      const chat = chatParam;
      if (!chat) {
        sendJsResponse(res, 404, { message: "'chatId' not found" });
        return undefined;
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
    .then((chat) => {
      if (!chat) {
        return sendJsResponse(res, 404, { message: 'Failed to save chat' });
      }
      return sendJsResponse(res, 200, {
        _id: chat._id,
        users: chat.users,
        title: chat.title,
        admin: chat.admin,
        avatar: chat.avatar,
      });
    })
    .catch((err) => {
      if (!err) {
        return;
      }

      sendJsResponse(res, 404, err);
    });
};
