import { createSelector } from 'reselect';

import { modifiableChatIdSelector } from 'Selectors/session';

const chatsSelector = (state) => state.chats;

export const chatsArraySelector = (state) => createSelector(
  chatsSelector,
  (chats) => chats.allIds.map((chatId) => chats.byId[chatId]),
)(state);

export const modifiableChatSelector = (state) => createSelector(
  [chatsSelector, modifiableChatIdSelector],
  (chats, modifiableChatId) => modifiableChatId && chats.byId[modifiableChatId],
)(state);
