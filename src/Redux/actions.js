import { createAction } from '@reduxjs/toolkit';

import * as actionNames from 'Constants/actionNames';
import { getRequestAction } from 'Redux/shared';

// session
export const setActiveChat = createAction(actionNames.SET_ACTIVE_CHAT);

export const setDrawerIsOpen = createAction(actionNames.SET_DRAWER_IS_OPEN);

export const setAddChatDialogIsOpen = createAction(
  actionNames.SET_ADD_CHAT_DIALOG_IS_OPEN,
);

export const setModifyChatDialogIsOpen = createAction(
  actionNames.SET_MODIFY_CHAT_DIALOG_IS_OPEN,
);

export const setModifyUserDialogIsOpen = createAction(
  actionNames.SET_MODIFY_USER_DIALOG_IS_OPEN,
);

export const setSessionInfo = createAction(actionNames.SET_SESSION_INFO);

export const closeChatDialog = () => createAction(actionNames.SET_SESSION_INFO)({
  modifyChatDialogIsOpen: false,
  addChatDialogIsOpen: false,
  modifiableChatId: undefined,
});

export const openModifyChatDialog = (modifiableChatId) => createAction(actionNames.SET_SESSION_INFO)({
  modifyChatDialogIsOpen: true,
  modifiableChatId,
});

// chats
export const addChats = createAction(actionNames.ADD_CHATS);

// messages
export const addMessages = createAction(actionNames.ADD_MESSAGES);

// users
export const addUsers = createAction(actionNames.ADD_USERS);

// others
export const clearStore = createAction(actionNames.CLEAR_STORE);

// async actions
export const getUsers = getRequestAction(actionNames.GET_USERS);

export const sendMessage = getRequestAction(actionNames.SEND_MESSAGE);

export const loadMessages = getRequestAction(actionNames.GET_MESSAGES);

export const createChat = getRequestAction(actionNames.CREATE_CHAT);

export const modifyChat = getRequestAction(actionNames.MODIFY_CHAT);

export const modifyUser = getRequestAction(actionNames.MODIFY_USER);

export const getChats = getRequestAction(actionNames.GET_CHATS);

export const signIn = getRequestAction(actionNames.LOGIN);

export const register = getRequestAction(actionNames.REGISTER);

export const logOut = createAction(actionNames.LOGOUT);

export const loginFromStore = getRequestAction(actionNames.LOGIN_FROM_STORE);

export const changeActiveChat = createAction(actionNames.CHANGE_ACTIVE_CHAT);
