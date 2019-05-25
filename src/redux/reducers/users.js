import { handleActions } from "redux-actions";
import { objectsAdd } from "./operations";
import * as actionNames from "../actionNames";

const defaultStore = { byId: {}, allIds: [] };

export default handleActions(
  {
    [actionNames.USERS_ADD]: (state, action) => {
      return objectsAdd(state, action.payload);
    },
    [actionNames.STORE_CLEAR]: () => defaultStore
  },
  defaultStore
);
