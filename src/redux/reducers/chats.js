import { handleActions } from "redux-actions";
import { objectsAdd } from "./operations";

const defaultStore = { byId: {}, allIds: [] };

export default handleActions(
  {
    CHATS_ADD: (state, action) => objectsAdd(state, action.payload),
    STORE_CLEAR: () => defaultStore
  },
  defaultStore
);
