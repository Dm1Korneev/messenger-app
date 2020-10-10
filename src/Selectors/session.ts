import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'Redux/reducers';

const sessionSelector = (state: RootState) => state.session;

export const isLoggedInSelector = (state: RootState) => createSelector(
  sessionSelector,
  (session) => session.isLoggedIn,
)(state);

export const chatDialogIsOpenSelector = (state: RootState) => createSelector(
  sessionSelector,
  (session) => session.addChatDialogIsOpen || session.modifyChatDialogIsOpen,
)(state);

export const modifyChatDialogIsOpenSelector = (state: RootState) => createSelector(
  sessionSelector,
  (session) => session.modifyChatDialogIsOpen,
)(state);

export const userModifyDialogIsOpenSelector = (state: RootState) => createSelector(
  sessionSelector,
  (session) => session.userModifyDialogIsOpen,
)(state);

export const currentUserSelector = (state: RootState) => createSelector(
  sessionSelector,
  (session) => session.user,
)(state);

export const currentUserIdSelector = (state: RootState) => createSelector(
  currentUserSelector,
  (user) => user?._id,
)(state);

export const modifiableChatIdSelector = (state: RootState) => createSelector(
  sessionSelector,
  (session) => session.modifiableChatId,
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
