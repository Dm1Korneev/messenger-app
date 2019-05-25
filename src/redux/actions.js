import { createAction } from "redux-actions";
import * as actionNames from "./actionNames";
import { getRequestAction } from "./shared";

// session
export const setActiveChat = createAction(actionNames.ACTIVE_CHAT_SET);

export const setDrawerIsOpen = createAction(actionNames.DRAWER_IS_OPEN_SET);

export const setAddChatDialogIsOpen = createAction(
  actionNames.ADD_CHAT_DIALOG_IS_OPEN_SET
);

export const setModifyChatDialogIsOpen = createAction(
  actionNames.MODIFY_CHAT_DIALOG_IS_OPEN_SET
);

export const setUserModifyDialogIsOpen = createAction(
  actionNames.USER_MODIFY_DIALOG_IS_OPEN_SET
);

export const setSessionInfo = createAction(actionNames.SESSION_INFO_SET);

export const closeChatDialog = () =>
  createAction(actionNames.SESSION_INFO_SET)({
    modifyChatDialogIsOpen: false,
    addChatDialogIsOpen: false,
    modifiableChat: undefined
  });

export const openModifyChatDialog = modifiableChat =>
  createAction(actionNames.SESSION_INFO_SET)({
    modifyChatDialogIsOpen: true,
    modifiableChat
  });

// chats
export const addChats = createAction(actionNames.CHATS_ADD);

// messages
export const addMessages = createAction(actionNames.MESSAGES_ADD);

// users
export const addUsers = createAction(actionNames.USERS_ADD);

// others
export const clearStore = createAction(actionNames.STORE_CLEAR);

// async actions
export const getUsers = () => getRequestAction(actionNames.GET_USERS);

export const sendMessage = messageText =>
  getRequestAction(actionNames.SEND_MESSAGE, { messageText });

export const loadMessages = () => getRequestAction(actionNames.GET_MESSAGES);

export const createChat = (title, avatar, selectedUserIds) =>
  getRequestAction(actionNames.CREATE_CHAT, { title, avatar, selectedUserIds });

export const modifyChat = (chatId, options) =>
  getRequestAction(actionNames.MODIFY_CHAT, { chatId, options });

export const modifyUser = (userId, options) =>
  getRequestAction(actionNames.MODIFY_USER, { userId, options });

export const getChats = () => getRequestAction(actionNames.GET_CHATS);

export const signIn = (email, password, remember = false) =>
  getRequestAction(actionNames.LOGIN, { email, password, remember });

export const register = (email, password, name, avatar, remember = false) =>
  getRequestAction(actionNames.REGISTER, {
    email,
    password,
    name,
    avatar,
    remember
  });

export const logOut = createAction(actionNames.LOGOUT);

export const loginFromStore = () =>
  getRequestAction(actionNames.LOGIN_FROM_STORE);

export const changeActiveChat = activeChat =>
  createAction(actionNames.CHANGE_ACTIVE_CHAT)({ activeChat });
