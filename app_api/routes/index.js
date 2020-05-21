const express = require('express');
const jwt = require('express-jwt');

const ctrlMessages = require('../controllers/messages');
const ctrlChats = require('../controllers/chats');
const ctrlUsers = require('../controllers/users');
const fileLoader = require('../common/fileLoader');

const router = express.Router();

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
});

// chats
router.get('/chats', auth, ctrlChats.getChats);
router.get('/chats/:chatId', auth, ctrlChats.getChatByID);
router.post('/chats', auth, fileLoader.single('avatar'), ctrlChats.postChat);
router.put(
  '/chats/:chatId',
  auth,
  fileLoader.single('avatar'),
  ctrlChats.updateChatByID,
);

// messages
router.get('/chats/:chatId/messages', auth, ctrlMessages.getMessages);
router.post('/chats/:chatId/messages', auth, ctrlMessages.postMessage);

// users
router.get('/users/:userId', auth, ctrlUsers.getUserByID);
router.get('/users', auth, ctrlUsers.getUsers);
router.put(
  '/users/:userId',
  auth,
  fileLoader.single('avatar'),
  ctrlUsers.updateUserByID,
);

// auth
router.post('/register', fileLoader.single('avatar'), ctrlUsers.register);
router.post('/login', ctrlUsers.login);

module.exports = router;
