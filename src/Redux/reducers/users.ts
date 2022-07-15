import { createReducer } from '@reduxjs/toolkit';

import { User } from 'Types';
import { objectsAdd } from 'Redux/reducers/operations';

import * as actions from '../actions';

type UsersState = {
  byId: Record<User['_id'], User>;
  allIds: User['_id'][];
}

const defaultStore: UsersState = { byId: {}, allIds: [] };

export default createReducer(defaultStore, (builder) => builder
  .addCase(actions.addUsers, (state, action) => objectsAdd<User>(state, action.payload))
  .addCase(actions.clearStore, () => defaultStore));
