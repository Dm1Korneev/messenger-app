import { createReducer } from '@reduxjs/toolkit';

import { Chat, Message } from 'Types';
import { distinct } from 'Common/utils';
import { objectsAdd } from 'Redux/reducers/operations';

import * as actions from '../actions';

export type MessagesState = {
  byId: Record<Message['_id'], Message>;
  allIds: Message['_id'][];
  byChats: Record<Chat['_id'], Message['_id'][]>;
}

const defaultStore: MessagesState = { byId: {}, allIds: [], byChats: {} };

export default createReducer(defaultStore, (builder) => builder
  .addCase(actions.addMessages, (state, action) => {
    const payload = Array.isArray(action.payload)
      ? action.payload
      : [action.payload];

    const newStore = objectsAdd<Message>(state, payload);

    const messagesByChats: Record<Chat['_id'], Message['_id'][]> = {};
    payload.forEach((value) => {
      messagesByChats[value.chat] = messagesByChats[value.chat]
        ? [...messagesByChats[value.chat], value._id]
        : [value._id];
    });

    const byChats: Record<Chat['_id'], Message['_id'][]> = { ...state.byChats };
    Object.keys(messagesByChats).forEach((chatId) => {
      byChats[chatId] = (byChats[chatId]
        ? [...byChats[chatId], ...messagesByChats[chatId]]
        : messagesByChats[chatId]
      ).filter(distinct);
      byChats[chatId] = byChats[chatId].sort(
        (a, b) => Number(new Date(newStore.byId[a].dateTime))
          - Number(new Date(newStore.byId[b].dateTime)),
      );
    });

    return { ...newStore, byChats };
  })
  .addCase(actions.clearStore, () => defaultStore));
