import { createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions';

export type SessionState = {
  activeChat?: string;
  token?: string;
  isLoggedIn: boolean;
  drawerIsOpen: boolean;
  addChatDialogIsOpen: boolean;
  modifyChatDialogIsOpen: boolean;
  modifiableChatId?: string;
  userModifyDialogIsOpen: boolean;
  user?: string;
}

const defaultStore: SessionState = {
  activeChat: undefined,
  token: undefined,
  isLoggedIn: false,
  drawerIsOpen: true,
  addChatDialogIsOpen: false,
  modifyChatDialogIsOpen: false,
  modifiableChatId: undefined,
  userModifyDialogIsOpen: false,
  user: undefined,
};

export default createReducer(defaultStore, (builder) => builder
  .addCase(actions.setActiveChat, (state, action) => ({
    ...state,
    activeChat: action.payload,
  }))
  .addCase(actions.setDrawerIsOpen, (state, action) => ({
    ...state,
    drawerIsOpen: action.payload,
  }))
  .addCase(actions.setAddChatDialogIsOpen, (state, action) => ({
    ...state,
    addChatDialogIsOpen: action.payload,
  }))
  .addCase(actions.setModifyChatDialogIsOpen, (state, action) => ({
    ...state,
    modifyChatDialogIsOpen: action.payload,
  }))
  .addCase(actions.setModifyUserDialogIsOpen, (state, action) => ({
    ...state,
    userModifyDialogIsOpen: action.payload,
  }))
  .addCase(actions.setSessionInfo, (state, action) => ({
    ...state,
    ...action.payload,
  }))
  .addCase(actions.clearStore, () => defaultStore));

