import { handleActions } from "redux-actions";

const defaultStore = {
  activeChat: undefined,
  token: undefined,
  isLoggedIn: false,
  drawerIsOpen: true,
  addChatDialogIsOpen: false,
  modifyChatDialogIsOpen: false,
  modifiableChat: undefined,
  userModifyDialogIsOpen: false,
  user: undefined,
  bottomPosition: true
};

export default handleActions(
  {
    ACTIVE_CHAT_SET: (state, action) => ({
      ...state,
      activeChat: action.payload
    }),
    DRAWER_IS_OPEN_SET: (state, action) => ({
      ...state,
      drawerIsOpen: action.payload
    }),

    ADD_CHAT_DIALOG_IS_OPEN_SET: (state, action) => ({
      ...state,
      addChatDialogIsOpen: action.payload
    }),
    MODIFY_CHAT_DIALOG_IS_OPEN_SET: (state, action) => ({
      ...state,
      modifyChatDialogIsOpen: action.payload
    }),
    USER_MODIFY_DIALOG_IS_OPEN_SET: (state, action) => ({
      ...state,
      userModifyDialogIsOpen: action.payload
    }),
    IS_LOGGED_IN_SET: (state, action) => ({
      ...state,
      isLoggedIn: action.payload
    }),
    BOTTOM_POSITION_SET: (state, action) => ({
      ...state,
      bottomPosition: action.payload
    }),
    SESSION_INFO_SET: (state, action) => ({
      ...state,
      ...action.payload
    }),
    STORE_CLEAR: () => defaultStore
  },
  defaultStore
);
