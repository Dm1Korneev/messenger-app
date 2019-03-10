import { createAction } from "redux-actions";
import {
  isLoggedIn,
  getUserInfo,
  getTokenFromStorage,
  removeTokenFromStorage,
  saveTokenToStorage,
  login as loginAPI,
  register as registerAPI,
  modifyUser as modifyUserAPI
} from "../../common/authentication";
import {
  getChats as getChats_API,
  getMessages as getMessages_API,
  createChat as createChat_API,
  sendMessage as sendMessage_API,
  getUsers as getUsers_API
} from "../../common/messengerAPI";

// session
const setActiveChat = createAction("ACTIVE_CHAT_SET");

export const setDrawerIsOpen = createAction("DRAWER_IS_OPEN_SET");

export const setAddChatDialogIsOpen = createAction(
  "ADD_CHAT_DIALOG_IS_OPEN_SET"
);

export const setUserModifyDialogIsOpen = createAction(
  "USER_MODIFY_DIALOG_IS_OPEN_SET"
);

const setSessionInfo = createAction("SESSION_INFO_SET");

// chats
const addChats = createAction("CHATS_ADD");

// messages
const addMessages = createAction("MESSAGES_ADD");

// users
const addUsers = createAction("USERS_ADD");

// others
const clearStore = createAction("STORE_CLEAR");

export const loadAllUsers = () => {
  return (dispatch, getState) => {
    const { token } = getState().session;
    getUsers_API(token, users => {
      dispatch(addUsers(users));
    });
  };
};

export const sendMessage = messageText => {
  return (dispatch, getState) => {
    const { token, activeChat } = getState().session;
    sendMessage_API(token, activeChat, messageText, message => {
      dispatch(addMessages(message));
      dispatch(loadMessages());
    });
  };
};

export const createChat = (title, avatar, selectedUserIds) => {
  return (dispatch, getState) => {
    const token = getState().session.token;
    createChat_API(token, title, avatar, selectedUserIds, chat => {
      dispatch(addChats(chat));
      dispatch(reloadChatsList(chat._id));
    });
  };
};

export const changeActiveChat = activeChat => {
  return dispatch => {
    dispatch(initActiveChat(activeChat));
  };
};

const initChatsList = (chats, activeChat = undefined) => {
  return dispatch => {
    if (chats.length && activeChat === undefined) {
      activeChat = chats[0]._id;
    }
    dispatch(addChats(chats));
    if (activeChat) {
      dispatch(initActiveChat(activeChat));
    }
  };
};

const initActiveChat = activeChat => {
  return dispatch => {
    dispatch(setActiveChat(activeChat));
    dispatch(loadMessages());
  };
};

const loadMessages = () => {
  return (dispatch, getState) => {
    const { token, activeChat } = getState().session;
    getMessages_API(token, activeChat, ({ messages, users }) => {
      dispatch(addUsers(users));
      dispatch(addMessages(messages));
    });
  };
};

export const loginFromStore = () => {
  return dispatch => dispatch(initAfterLogin(getTokenFromStorage()));
};

export const reloadChatsList = (_activeChat = undefined) => {
  return (dispatch, getState) => {
    const { session } = getState();
    const { token } = session;
    const activeChat = _activeChat ? _activeChat : session.activeChat;
    getChats_API(token, chats => {
      dispatch(initChatsList(chats, activeChat));
    });
  };
};

export const initAfterLogin = token => {
  return dispatch => {
    if (token && isLoggedIn(token)) {
      const isLoggedIn = true;
      const user = getUserInfo(token);
      dispatch(setSessionInfo({ token, isLoggedIn, user }));

      getChats_API(token, chats => {
        dispatch(initChatsList(chats));
      });
    }
  };
};

export const logOut = () => {
  return dispatch => {
    dispatch(clearStore());
    removeTokenFromStorage();
  };
};

export const signIn = (email, password, remember = false) => {
  return dispatch => {
    loginAPI(email, password, result => {
      if (result.message) {
        this.setState({
          errorMessage: result.message
        });
        return;
      }
      dispatch(initAfterLogin(result.token));
      if (remember) {
        saveTokenToStorage(result.token);
      }
    });
  };
};

export const register = (email, password, name, avatar, remember = false) => {
  return dispatch => {
    registerAPI(email, password, name, avatar, result => {
      if (result.message) {
        this.setState({
          errorMessage: result.message
        });
        return;
      }
      dispatch(initAfterLogin(result.token));
      if (remember) {
        saveTokenToStorage(result.token);
      }
    });
  };
};

export const modifyUser = (userId, options) => {
  return (dispatch, getState) => {
    const token = getState().session.token;
    modifyUserAPI(token, userId, options, result => {
      if (result.message) {
        this.setState({
          errorMessage: result.message
        });
        return;
      }
      const { token } = result;
      const user = getUserInfo(token);
      const userModifyDialogIsOpen = false;
      dispatch(setSessionInfo({ token, user, userModifyDialogIsOpen }));
      dispatch(addUsers(user));
      saveTokenToStorage(token);
    });
  };
};
