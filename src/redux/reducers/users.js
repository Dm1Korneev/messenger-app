import { handleActions } from "redux-actions";
import { objectsAdd } from "./operations";

const defaultStore = { byId: {}, allIds: [] };

export default handleActions(
  {
    USERS_ADD: (state, action) => {
      return objectsAdd(state, action.payload);
    },
    STORE_CLEAR: () => defaultStore
  },
  defaultStore
);
