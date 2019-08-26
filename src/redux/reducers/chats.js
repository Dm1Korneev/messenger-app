import { handleActions } from 'redux-actions';
import * as actionNames from 'Constants/actionNames';
import { objectsAdd } from 'Redux/reducers/operations';

const defaultStore = { byId: {}, allIds: [] };

export default handleActions(
  {
    [actionNames.ADD_CHATS]: (state, action) => objectsAdd(state, action.payload),
    [actionNames.CLEAR_STORE]: () => defaultStore,
  },
  defaultStore,
);
