import { handleActions } from "redux-actions";
import { objectsAdd } from "./operations";
import { distinct } from "../../common/utils";

const defaultStore = { byId: {}, allIds: [], byChats: {} };

export default handleActions(
  {
    MESSAGES_ADD: (state, action) => {
      const payload = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      const newStore = objectsAdd(state, payload);

      const messagesByChats = {};
      payload.forEach(value => {
        messagesByChats[value.chat] = messagesByChats[value.chat]
          ? [...messagesByChats[value.chat], value._id]
          : [value._id];
      });

      const byChats = { ...state.byChats };
      Object.keys(messagesByChats).forEach(chatId => {
        byChats[chatId] = (byChats[chatId]
          ? [...byChats[chatId], ...messagesByChats[chatId]]
          : messagesByChats[chatId]
        ).filter(distinct);
        byChats[chatId] = byChats[chatId].sort(
          (a, b) =>
            new Date(newStore.byId[a].dateTime) -
            new Date(newStore.byId[b].dateTime)
        );
      });

      return { ...newStore, byChats };
    },
    STORE_CLEAR: () => defaultStore
  },
  defaultStore
);
