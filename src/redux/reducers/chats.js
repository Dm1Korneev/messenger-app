import { handleActions } from "redux-actions";
import { objectsAdd } from "./operations";
import * as actionNames from "../actionNames";

const defaultStore = { byId: {}, allIds: [] };

export default handleActions(
  {
    [actionNames.CHATS_ADD]: (state, action) =>
      objectsAdd(state, action.payload),
    [actionNames.STORE_CLEAR]: () => defaultStore
  },
  defaultStore
);
