import { createReducer } from '@reduxjs/toolkit';

import { objectsAdd } from 'Redux/reducers/operations';

import * as actions from '../actions';

const defaultStore = { byId: {}, allIds: [] };

export default createReducer(defaultStore, (builder) => builder
  .addCase(actions.addChats, (state, action) => objectsAdd(state, action.payload))
  .addCase(actions.clearStore, () => defaultStore));
