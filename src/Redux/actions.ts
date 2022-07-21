import { createAction } from '@reduxjs/toolkit';

import { Message, User } from 'Types';
import { ActionNames } from 'Constants';
import { getRequestAction } from 'Redux/shared';

import { SessionState } from './reducers/session';

// session
export const setActiveChat = createAction<string>(ActionNames.SET_ACTIVE_CHAT);

export const setDrawerIsOpen = createAction<boolean>(ActionNames.SET_DRAWER_IS_OPEN);

export const setModifyUserDialogIsOpen = createAction<boolean>(
  ActionNames.SET_MODIFY_USER_DIALOG_IS_OPEN,
);

export const setSessionInfo = createAction<Partial<SessionState>>(ActionNames.SET_SESSION_INFO);

// messages
export const addMessages = createAction<Message[]>(ActionNames.ADD_MESSAGES);

// users
export const addUsers = createAction<User[]>(ActionNames.ADD_USERS);

// others
export const clearStore = createAction(ActionNames.CLEAR_STORE);

// async actions
export const getUsers = getRequestAction(ActionNames.GET_USERS);

export const sendMessage = getRequestAction<{messageText: string}>(ActionNames.SEND_MESSAGE);

export const loadMessages = getRequestAction(ActionNames.GET_MESSAGES);

export type CreateChatPayload = {
  title: string;
  avatar?: File;
  selectedUserIds: string[];
}
export const createChat = getRequestAction<CreateChatPayload>(ActionNames.CREATE_CHAT);

export type ModifyChatPayload = {
  chatId: string;
  options: {
    title: string;
    users: string[];
    avatar?: File;
  };
}
export const modifyChat = getRequestAction<ModifyChatPayload>(ActionNames.MODIFY_CHAT);

export type ModifyUserPayload = {
  userId: string;
  options: {
    name: string;
    email: string;
    password?: string;
    avatar?: File;
  };
}
export const modifyUser = getRequestAction<ModifyUserPayload>(ActionNames.MODIFY_USER);

export type SignInPayload = {
  email: string;
  password: string;
  remember: boolean;
}
export const signIn = getRequestAction<SignInPayload>(ActionNames.LOGIN);

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  avatar?: File;
  remember: boolean;
}
export const register = getRequestAction<RegisterPayload>(ActionNames.REGISTER);

export const logOut = createAction(ActionNames.LOGOUT);

export const loginFromStore = getRequestAction(ActionNames.LOGIN_FROM_STORE);

export const changeActiveChat = createAction<{activeChat: string}>(ActionNames.CHANGE_ACTIVE_CHAT);
