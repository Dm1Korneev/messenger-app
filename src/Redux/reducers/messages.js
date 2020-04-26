import { createReducer } from '@reduxjs/toolkit';

import { objectsAdd } from 'Redux/reducers/operations';
import { distinct } from 'Common/utils';
import * as actions from '../actions';

const defaultStore = { byId: {}, allIds: [], byChats: {} };

const addMessagesReducer = (state, action) => {
  const payload = Array.isArray(action.payload)
    ? action.payload
    : [action.payload];

  const newStore = objectsAdd(state, payload);

  const messagesByChats = {};
  payload.forEach((value) => {
    messagesByChats[value.chat] = messagesByChats[value.chat]
      ? [...messagesByChats[value.chat], value._id]
      : [value._id];
  });

  const byChats = { ...state.byChats };
  Object.keys(messagesByChats).forEach((chatId) => {
    byChats[chatId] = (byChats[chatId]
      ? [...byChats[chatId], ...messagesByChats[chatId]]
      : messagesByChats[chatId]
    ).filter(distinct);
    byChats[chatId] = byChats[chatId].sort(
      (a, b) => new Date(newStore.byId[a].dateTime)
        - new Date(newStore.byId[b].dateTime),
    );
  });

  return { ...newStore, byChats };
};

export default createReducer(defaultStore, (builder) => builder
  .addCase(actions.addMessages, addMessagesReducer)
  .addCase(actions.clearStore, () => defaultStore));
