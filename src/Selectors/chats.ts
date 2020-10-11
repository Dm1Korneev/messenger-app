import { createSelector } from '@reduxjs/toolkit';

import { modifiableChatIdSelector } from 'Selectors/session';
import { RootState } from 'Redux/reducers';

const chatsSelector = (state: RootState) => state.chats;

export const chatsArraySelector = (state: RootState) => createSelector(
  chatsSelector,
  (chats) => chats.allIds.map((chatId) => chats.byId[chatId]),
)(state);

export const modifiableChatSelector = (state: RootState) => createSelector(
  [chatsSelector, modifiableChatIdSelector],
  (chats, modifiableChatId) => (modifiableChatId ? chats.byId[modifiableChatId] : undefined),
)(state);
