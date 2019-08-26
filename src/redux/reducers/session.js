import { handleActions } from 'redux-actions';
import * as actionNames from 'Constants/actionNames';

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
};

export default handleActions(
  {
    [actionNames.SET_ACTIVE_CHAT]: (state, action) => ({
      ...state,
      activeChat: action.payload,
    }),
    [actionNames.SET_DRAWER_IS_OPEN]: (state, action) => ({
      ...state,
      drawerIsOpen: action.payload,
    }),

    [actionNames.SET_ADD_CHAT_DIALOG_IS_OPEN]: (state, action) => ({
      ...state,
      addChatDialogIsOpen: action.payload,
    }),
    [actionNames.SET_MODIFY_CHAT_DIALOG_IS_OPEN]: (state, action) => ({
      ...state,
      modifyChatDialogIsOpen: action.payload,
    }),
    [actionNames.SET_MODIFY_USER_DIALOG_IS_OPEN]: (state, action) => ({
      ...state,
      userModifyDialogIsOpen: action.payload,
    }),
    [actionNames.SET_IS_LOGGED_IN]: (state, action) => ({
      ...state,
      isLoggedIn: action.payload,
    }),
    [actionNames.SET_SESSION_INFO]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [actionNames.CLEAR_STORE]: () => defaultStore,
  },
  defaultStore,
);
