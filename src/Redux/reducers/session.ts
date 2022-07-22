import { createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions';

export type SessionState = {
  activeChat?: string;
  token?: string;
  isLoggedIn: boolean;
}

const defaultStore: SessionState = {
  activeChat: undefined,
  token: undefined,
  isLoggedIn: false,
};

export default createReducer(defaultStore, (builder) => builder
  .addCase(actions.setActiveChat, (state, action) => ({
    ...state,
    activeChat: action.payload,
  }))
  .addCase(actions.setSessionInfo, (state, action) => ({
    ...state,
    ...action.payload,
  }))
  .addCase(actions.clearStore, () => defaultStore));
