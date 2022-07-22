import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'Redux/reducers';

const sessionSelector = (state: RootState) => state.session;

export const activeChatIdSelector = (state: RootState) => createSelector(
  sessionSelector,
  (session) => session.activeChat,
)(state);

export const tokenSelector = (state: RootState) => createSelector(
  sessionSelector,
  (session) => session.token,
)(state);
