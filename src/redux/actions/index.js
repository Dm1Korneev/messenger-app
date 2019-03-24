import { createAction } from "redux-actions";
import {
  isLoggedIn,
  getUserInfo,
  getTokenFromStorage,
  removeTokenFromStorage,
  saveTokenToStorage
} from "../../common/authentication";
import {
  login as login_API,
  register as register_API,
  getChats as getChats_API,
  getMessages as getMessages_API,
  createChat as createChat_API,
  modifyChat as modifyChat_API,
  sendMessage as sendMessage_API,
  getUsers as getUsers_API,
  modifyUser as modifyUser_API
} from "../../common/messengerAPI";

// session
const setActiveChat = createAction("ACTIVE_CHAT_SET");

export const setDrawerIsOpen = createAction("DRAWER_IS_OPEN_SET");

export const setAddChatDialogIsOpen = createAction(
  "ADD_CHAT_DIALOG_IS_OPEN_SET"
);

export const setModifyChatDialogIsOpen = createAction(
  "MODIFY_CHAT_DIALOG_IS_OPEN_SET"
);

export const setUserModifyDialogIsOpen = createAction(
  "USER_MODIFY_DIALOG_IS_OPEN_SET"
);

export const setBottomPosition = createAction("BOTTOM_POSITION_SET");

const setSessionInfo = createAction("SESSION_INFO_SET");

// chats
const addChats = createAction("CHATS_ADD");

// messages
const addMessages = createAction("MESSAGES_ADD");

// users
const addUsers = createAction("USERS_ADD");

// others
const clearStore = createAction("STORE_CLEAR");

const getRequestAction = name => {
  return createAction(name + "_REQUEST")();
};

const getSuccessAction = name => {
  return createAction(name + "_SUCCESS")();
};

const getFailureAction = (name, error) => {
  return createAction(name + "_FAILURE")(error);
};

export const loadAllUsers = () => {
  return (dispatch, getState) => {
    const { token } = getState().session;

    const fetchActionName = "GET_USERS";
    dispatch(getRequestAction(fetchActionName));
    getUsers_API(token)
      .then(users => {
        dispatch(getSuccessAction(fetchActionName));
        dispatch(addUsers(users));
      })
      .catch(error => {
        dispatch(getFailureAction(fetchActionName, error));
      });
  };
};

export const sendMessage = messageText => {
  return (dispatch, getState) => {
    const { token, activeChat } = getState().session;

    const fetchActionName = "SEND_MESSAGE";
    dispatch(getRequestAction(fetchActionName));
    sendMessage_API(token, activeChat, messageText)
      .then(message => {
        dispatch(getSuccessAction(fetchActionName));
        dispatch(addMessages(message));
        dispatch(loadMessages());
      })
      .catch(error => {
        dispatch(getFailureAction(fetchActionName, error));
      });
  };
};

export const createChat = (title, avatar, selectedUserIds) => {
  return (dispatch, getState) => {
    const token = getState().session.token;

    const fetchActionName = "CREATE_CHAT";
    dispatch(getRequestAction(fetchActionName));
    createChat_API(token, title, avatar, selectedUserIds)
      .then(chat => {
        dispatch(getSuccessAction(fetchActionName));
        dispatch(addChats(chat));
        dispatch(reloadChatsList(chat._id));
        dispatch(loadMessages());
      })
      .catch(error => {
        dispatch(getFailureAction(fetchActionName, error));
      });
  };
};

export const modifyChat = (chatId, options) => {
  return (dispatch, getState) => {
    const token = getState().session.token;

    const fetchActionName = "MODIFY_CHAT";
    dispatch(getRequestAction(fetchActionName));
    modifyChat_API(token, chatId, options)
      .then(chat => {
        dispatch(getSuccessAction(fetchActionName));
        dispatch(addChats(chat));
        dispatch(reloadChatsList(chatId));
      })
      .catch(error => {
        dispatch(getFailureAction(fetchActionName, error));
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

export const loadMessages = () => {
  return (dispatch, getState) => {
    const { token, activeChat } = getState().session;
    if (!activeChat) {
      return;
    }

    const fetchActionName = "GET_MESSAGES";
    dispatch(getRequestAction(fetchActionName));
    getMessages_API(token, activeChat)
      .then(({ messages, users }) => {
        dispatch(getSuccessAction(fetchActionName));
        dispatch(addUsers(users));
        dispatch(addMessages(messages));
      })
      .catch(error => {
        dispatch(getFailureAction(fetchActionName, error));
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

    const fetchActionName = "GET_CHATS";
    dispatch(getRequestAction(fetchActionName));
    getChats_API(token)
      .then(chats => {
        dispatch(getSuccessAction(fetchActionName));
        dispatch(addChats(chats));
      })
      .catch(error => {
        dispatch(getFailureAction(fetchActionName, error));
      });
  };
};

export const initAfterLogin = token => {
  return dispatch => {
    if (token && isLoggedIn(token)) {
      const isLoggedIn = true;
      const user = getUserInfo(token);
      dispatch(setSessionInfo({ token, isLoggedIn, user }));

      const fetchActionName = "GET_CHATS";
      dispatch(getRequestAction(fetchActionName));
      getChats_API(token)
        .then(chats => {
          dispatch(getSuccessAction(fetchActionName));
          dispatch(initChatsList(chats));
        })
        .catch(error => {
          dispatch(getFailureAction(fetchActionName, error));
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
    const fetchActionName = "LOGIN";
    dispatch(getRequestAction(fetchActionName));
    login_API(email, password)
      .then(result => {
        dispatch(getSuccessAction(fetchActionName));
        dispatch(initAfterLogin(result.token));
        if (remember) {
          saveTokenToStorage(result.token);
        }
      })
      .catch(error => {
        dispatch(getFailureAction(fetchActionName, error));
      });
  };
};

export const register = (email, password, name, avatar, remember = false) => {
  return dispatch => {
    const fetchActionName = "REGISTER";
    dispatch(getRequestAction(fetchActionName));
    register_API(email, password, name, avatar)
      .then(result => {
        dispatch(getSuccessAction(fetchActionName));
        dispatch(initAfterLogin(result.token));
        if (remember) {
          saveTokenToStorage(result.token);
        }
      })
      .catch(error => {
        dispatch(getFailureAction(fetchActionName, error));
      });
  };
};

export const modifyUser = (userId, options) => {
  return (dispatch, getState) => {
    const token = getState().session.token;
    const fetchActionName = "MODIFY_USER";
    dispatch(getRequestAction(fetchActionName));
    modifyUser_API(token, userId, options)
      .then(result => {
        dispatch(getSuccessAction(fetchActionName));
        const { token } = result;
        const user = getUserInfo(token);
        const userModifyDialogIsOpen = false;
        dispatch(setSessionInfo({ token, user, userModifyDialogIsOpen }));
        dispatch(addUsers(user));
        saveTokenToStorage(token);
      })
      .catch(error => {
        dispatch(getFailureAction(fetchActionName, error));
      });
  };
};

export const openModifyChatDialog = modifiableChat => {
  return dispatch => {
    const modifyChatDialogIsOpen = true;
    dispatch(setSessionInfo({ modifyChatDialogIsOpen, modifiableChat }));
  };
};

export const closeChatDialog = () => {
  return dispatch => {
    const modifyChatDialogIsOpen = false;
    const addChatDialogIsOpen = false;
    const modifiableChat = undefined;
    dispatch(
      setSessionInfo({
        addChatDialogIsOpen,
        modifyChatDialogIsOpen,
        modifiableChat
      })
    );
  };
};
