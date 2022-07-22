import express from 'express';
import { expressjwt as jwt } from 'express-jwt';

import { fileLoader, getJWTSecret } from '../common';
import { chats, messages, users } from '../controllers';

export const getRoutes = () => {
  const router = express.Router();

  const auth = jwt({
    secret: getJWTSecret(),
    algorithms: ['HS256'],
  });

  // chats
  router.get('/chats', auth, chats.getChats);
  router.get('/chats/:chatId', auth, chats.getChatByID);
  router.post('/chats', auth, fileLoader.single('avatar'), chats.postChat);
  router.put(
    '/chats/:chatId',
    auth,
    fileLoader.single('avatar'),
    chats.updateChatByID,
  );

  // messages
  router.get('/chats/:chatId/messages', auth, messages.getMessages);
  router.post('/chats/:chatId/messages', auth, messages.postMessage);

  // users
  router.get('/users/:userId', auth, users.getUserByID);
  router.get('/users', auth, users.getUsers);
  router.put(
    '/users/:userId',
    auth,
    fileLoader.single('avatar'),
    users.updateUserByID,
  );
  router.get('/current-user', auth, users.getCurrentUser);

  // auth
  router.post('/register', fileLoader.single('avatar'), users.register);
  router.post('/login', users.login);

  return router;
};
