import { createAction } from '@reduxjs/toolkit';

import { ActionNames } from 'Constants';
import { getRequestAction } from 'Redux/shared';
import { Message } from 'Types';

import { SessionState } from './reducers/session';

// session
export const setActiveChat = createAction<string>(ActionNames.SET_ACTIVE_CHAT);

export const setSessionInfo = createAction<Partial<SessionState>>(ActionNames.SET_SESSION_INFO);

// messages
export const addMessages = createAction<Message[]>(ActionNames.ADD_MESSAGES);

// others
export const clearStore = createAction(ActionNames.CLEAR_STORE);

export const sendMessage = getRequestAction<{ messageText: string }>(ActionNames.SEND_MESSAGE);

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

export const changeActiveChat = createAction<{ activeChat: string }>(ActionNames.CHANGE_ACTIVE_CHAT);
