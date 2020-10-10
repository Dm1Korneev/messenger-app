import { createReducer } from '@reduxjs/toolkit';

import { Chat } from 'Types';
import { objectsAdd } from 'Redux/reducers/operations';

import * as actions from '../actions';

export type ChatsState = {
  byId: Record<Chat['_id'], Chat>;
  allIds: Chat['_id'][];
}

const defaultStore: ChatsState = { byId: {}, allIds: [] };

export default createReducer(defaultStore, (builder) => builder
  .addCase(actions.addChats, (state, action) => objectsAdd<ChatsState, Chat>(state, action.payload))
  .addCase(actions.clearStore, () => defaultStore));
