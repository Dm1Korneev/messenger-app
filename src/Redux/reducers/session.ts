import { createReducer } from '@reduxjs/toolkit';

import { User } from 'Types';

import * as actions from '../actions';

export type SessionState = {
  activeChat?: string;
  token?: string;
  isLoggedIn: boolean;
  drawerIsOpen: boolean;
  userModifyDialogIsOpen: boolean;
  user?: User;
}

const defaultStore: SessionState = {
  activeChat: undefined,
  token: undefined,
  isLoggedIn: false,
  drawerIsOpen: true,
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
  .addCase(actions.setModifyUserDialogIsOpen, (state, action) => ({
    ...state,
    userModifyDialogIsOpen: action.payload,
  }))
  .addCase(actions.setSessionInfo, (state, action) => ({
    ...state,
    ...action.payload,
  }))
  .addCase(actions.clearStore, () => defaultStore));
