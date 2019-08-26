import { handleActions } from 'redux-actions';
import * as actionNames from 'Redux/actionNames';
import { objectsAdd } from 'Redux/reducers/operations';

const defaultStore = { byId: {}, allIds: [] };

export default handleActions(
  {
    [actionNames.USERS_ADD]: (state, action) => objectsAdd(state, action.payload),
    [actionNames.STORE_CLEAR]: () => defaultStore,
  },
  defaultStore,
);
