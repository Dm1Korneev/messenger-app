import { handleActions } from 'redux-actions';
import * as actionNames from '../actionNames';

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
    [actionNames.ACTIVE_CHAT_SET]: (state, action) => ({
      ...state,
      activeChat: action.payload,
    }),
    [actionNames.DRAWER_IS_OPEN_SET]: (state, action) => ({
      ...state,
      drawerIsOpen: action.payload,
    }),

    [actionNames.ADD_CHAT_DIALOG_IS_OPEN_SET]: (state, action) => ({
      ...state,
      addChatDialogIsOpen: action.payload,
    }),
    [actionNames.MODIFY_CHAT_DIALOG_IS_OPEN_SET]: (state, action) => ({
      ...state,
      modifyChatDialogIsOpen: action.payload,
    }),
    [actionNames.USER_MODIFY_DIALOG_IS_OPEN_SET]: (state, action) => ({
      ...state,
      userModifyDialogIsOpen: action.payload,
    }),
    [actionNames.IS_LOGGED_IN_SET]: (state, action) => ({
      ...state,
      isLoggedIn: action.payload,
    }),
    [actionNames.SESSION_INFO_SET]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [actionNames.STORE_CLEAR]: () => defaultStore,
  },
  defaultStore,
);
