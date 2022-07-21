import { createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions';

export type SessionState = {
  activeChat?: string;
  token?: string;
  isLoggedIn: boolean;
  drawerIsOpen: boolean;
}

const defaultStore: SessionState = {
  activeChat: undefined,
  token: undefined,
  isLoggedIn: false,
  drawerIsOpen: true,
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
  .addCase(actions.setSessionInfo, (state, action) => ({
    ...state,
    ...action.payload,
  }))
  .addCase(actions.clearStore, () => defaultStore));
