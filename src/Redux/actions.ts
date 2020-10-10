import { createAction } from '@reduxjs/toolkit';

import { Chat, Message, User } from 'Types';
import ActionNames from 'Constants/actionNames';
import { getRequestAction } from 'Redux/shared';

import { SessionState } from './reducers/session';

// session
export const setActiveChat = createAction<string>(ActionNames.SET_ACTIVE_CHAT);

export const setDrawerIsOpen = createAction<boolean>(ActionNames.SET_DRAWER_IS_OPEN);

export const setAddChatDialogIsOpen = createAction<boolean>(
  ActionNames.SET_ADD_CHAT_DIALOG_IS_OPEN,
);

export const setModifyChatDialogIsOpen = createAction<boolean>(
  ActionNames.SET_MODIFY_CHAT_DIALOG_IS_OPEN,
);

export const setModifyUserDialogIsOpen = createAction<boolean>(
  ActionNames.SET_MODIFY_USER_DIALOG_IS_OPEN,
);

export const setSessionInfo = createAction<Partial<SessionState>>(ActionNames.SET_SESSION_INFO);

export const closeChatDialog = (
) => createAction<Pick<
  SessionState, 'modifyChatDialogIsOpen' | 'addChatDialogIsOpen' | 'modifiableChatId'>>(ActionNames.SET_SESSION_INFO)({
    modifyChatDialogIsOpen: false,
    addChatDialogIsOpen: false,
    modifiableChatId: undefined,
  });

export const openModifyChatDialog = (
  modifiableChatId: SessionState['modifiableChatId'],
) => createAction<Pick<
SessionState, 'modifyChatDialogIsOpen' | 'modifiableChatId'>>(ActionNames.SET_SESSION_INFO)({
  modifyChatDialogIsOpen: true,
  modifiableChatId,
});

// chats
export const addChats = createAction<Chat[]>(ActionNames.ADD_CHATS);

// messages
export const addMessages = createAction<Message[]>(ActionNames.ADD_MESSAGES);

// users
export const addUsers = createAction<User[]>(ActionNames.ADD_USERS);

// others
export const clearStore = createAction(ActionNames.CLEAR_STORE);

// async actions
export const getUsers = getRequestAction(ActionNames.GET_USERS);

export const sendMessage = getRequestAction(ActionNames.SEND_MESSAGE);

export const loadMessages = getRequestAction(ActionNames.GET_MESSAGES);

export const createChat = getRequestAction(ActionNames.CREATE_CHAT);

export const modifyChat = getRequestAction(ActionNames.MODIFY_CHAT);

export const modifyUser = getRequestAction(ActionNames.MODIFY_USER);

export const getChats = getRequestAction(ActionNames.GET_CHATS);

export const signIn = getRequestAction(ActionNames.LOGIN);

export const register = getRequestAction(ActionNames.REGISTER);

export const logOut = createAction(ActionNames.LOGOUT);

export const loginFromStore = getRequestAction(ActionNames.LOGIN_FROM_STORE);

export const changeActiveChat = createAction(ActionNames.CHANGE_ACTIVE_CHAT);
