import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'Redux/reducers';

const sessionSelector = (state: RootState) => state.session;

export const isLoggedInSelector = (state: RootState) => createSelector(
  sessionSelector,
  (session) => session.isLoggedIn,
)(state);

export const activeChatIdSelector = (state: RootState) => createSelector(
  sessionSelector,
  (session) => session.activeChat,
)(state);

export const drawerIsOpenSelector = (state: RootState) => createSelector(
  sessionSelector,
  (session) => session.drawerIsOpen,
)(state);

export const tokenSelector = (state: RootState) => createSelector(
  sessionSelector,
  (session) => session.token,
)(state);
