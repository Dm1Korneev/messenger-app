import { createSelector } from 'reselect';

const sessionSelector = (state) => state.session;

export const isLoggedInSelector = (state) => createSelector(
  sessionSelector,
  (session) => session.isLoggedIn,
)(state);

export const chatDialogIsOpenSelector = (state) => createSelector(
  sessionSelector,
  (session) => session.addChatDialogIsOpen || session.modifyChatDialogIsOpen,
)(state);

export const modifyChatDialogIsOpenSelector = (state) => createSelector(
  sessionSelector,
  (session) => session.modifyChatDialogIsOpen,
)(state);

export const userModifyDialogIsOpenSelector = (state) => createSelector(
  sessionSelector,
  (session) => session.userModifyDialogIsOpen,
)(state);

export const currentUserSelector = (state) => createSelector(
  sessionSelector,
  (session) => session.user,
)(state);

export const currentUserIdSelector = (state) => createSelector(
  currentUserSelector,
  (user) => user._id,
)(state);

export const modifiableChatIdSelector = (state) => createSelector(
  sessionSelector,
  (session) => session.modifiableChatId,
)(state);

export const activeChatIdSelector = (state) => createSelector(
  sessionSelector,
  (session) => session.activeChat,
)(state);

export const drawerIsOpenSelector = (state) => createSelector(
  sessionSelector,
  (session) => session.drawerIsOpen,
)(state);

export const tokenSelector = (state) => createSelector(
  sessionSelector,
  (session) => session.token,
)(state);
