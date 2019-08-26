import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';
import {
  createChat as createChatAPI,
  getChats as getChatsAPI,
  getMessages as getMessagesAPI,
  getUsers as getUsersAPI,
  login as loginAPI,
  modifyChat as modifyChatAPI,
  modifyUser as modifyUserAPI,
  register as registerAPI,
  sendMessage as sendMessageAPI,
} from 'Common/messengerAPI';
import {
  getTokenFromStorage,
  getUserInfo,
  isLoggedIn,
  removeTokenFromStorage,
  saveTokenToStorage,
} from 'Common/authentication';
import {
  addChats,
  addMessages,
  addUsers,
  clearStore,
  getChats as getChatsAction,
  loadMessages as loadMessagesAction,
  setActiveChat,
  setSessionInfo,
} from 'Redux/actions';
import * as actionNames from 'Constants/actionNames';
import { getFailureAction, getRequestAction, getSuccessAction } from 'Redux/shared';

const getToken = (state) => state.session.token;
const getActiveChat = (state) => state.session.activeChat;

function* getUsers() {
  try {
    const token = yield select(getToken);
    const users = yield call(getUsersAPI, token);
    yield put(getSuccessAction(actionNames.GET_USERS, { users }));
    yield put(addUsers(users));
  } catch (error) {
    yield put(getFailureAction(actionNames.GET_USERS, { error }));
  }
}

function* sendMessage(action) {
  try {
    const token = yield select(getToken);
    const activeChat = yield select(getActiveChat);
    const { messageText } = action.payload;
    const message = yield call(sendMessageAPI, token, activeChat, messageText);
    yield put(getSuccessAction(actionNames.SEND_MESSAGE, { message }));
    yield put(addMessages(message));
    yield put(loadMessagesAction());
  } catch (error) {
    yield put(getFailureAction(actionNames.SEND_MESSAGE, { error }));
  }
}

function* loadMessages() {
  try {
    const activeChat = yield select(getActiveChat);
    if (!activeChat) {
      return;
    }
    const token = yield select(getToken);
    const { messages, users } = yield call(getMessagesAPI, token, activeChat);
    yield put(getSuccessAction(actionNames.GET_MESSAGES, { messages, users }));
    yield put(addUsers(users));
    yield put(addMessages(messages));
  } catch (error) {
    yield put(getFailureAction(actionNames.GET_MESSAGES, { error }));
  }
}

function* createChat(action) {
  try {
    const token = yield select(getToken);
    const { title, avatar, selectedUserIds } = action.payload;
    const chat = yield call(
      createChatAPI,
      token,
      title,
      avatar,
      selectedUserIds,
    );
    yield put(getSuccessAction(actionNames.CREATE_CHAT, { chat }));
    yield put(addChats(chat));
    yield put(getChatsAction());
    yield put(loadMessagesAction());
  } catch (error) {
    yield put(getFailureAction(actionNames.CREATE_CHAT, { error }));
  }
}

function* modifyChat(action) {
  try {
    const token = yield select(getToken);
    const { chatId, options } = action.payload;
    const chat = yield call(modifyChatAPI, token, chatId, options);
    yield put(getSuccessAction(actionNames.MODIFY_CHAT, { chat }));
    yield put(addChats(chat));
    yield put(getChatsAction());
  } catch (error) {
    yield put(getFailureAction(actionNames.MODIFY_CHAT, { error }));
  }
}

function* modifyUser(action) {
  try {
    let token = yield select(getToken);
    const { userId, options } = action.payload;
    const result = yield call(modifyUserAPI, token, userId, options);
    yield put(getSuccessAction(actionNames.MODIFY_USER, { result }));
    token = result.token;
    const user = yield call(getUserInfo, token);
    const userModifyDialogIsOpen = false;
    yield put(setSessionInfo({ token, user, userModifyDialogIsOpen }));
    yield put(addUsers(user));
    yield call(saveTokenToStorage, token);
  } catch (error) {
    yield put(getFailureAction(actionNames.MODIFY_USER, { error }));
  }
}

function* initActiveChat(activeChat) {
  yield put(setActiveChat(activeChat));
  yield put(loadMessagesAction());
}

function* getChats() {
  try {
    const token = yield select(getToken);
    const activeChat = yield select(getActiveChat);
    const chats = yield call(getChatsAPI, token);
    yield put(getSuccessAction(actionNames.GET_CHATS, { chats }));
    yield put(addChats(chats));
    if (!activeChat && chats.length) {
      yield* initActiveChat(chats[0]._id);
    }
  } catch (error) {
    yield put(getFailureAction(actionNames.GET_CHATS, { error }));
  }
}

function* initAfterLogin(token) {
  if (!token) {
    return;
  }
  if (yield call(isLoggedIn, token)) {
    const user = yield call(getUserInfo, token);
    yield put(setSessionInfo({ token, isLoggedIn: true, user }));
    yield put(getRequestAction(actionNames.GET_CHATS));
  }
}

function* signIn(action) {
  try {
    const { email, password, remember } = action.payload;
    const result = yield call(loginAPI, email, password);
    yield put(getSuccessAction(actionNames.LOGIN, { result }));
    yield* initAfterLogin(result.token);
    if (remember) {
      saveTokenToStorage(result.token);
    }
  } catch (error) {
    yield put(getFailureAction(actionNames.LOGIN, { error }));
  }
}

function* register(action) {
  try {
    const {
      email, password, name, avatar, remember,
    } = action.payload;
    const result = yield call(registerAPI, email, password, name, avatar);
    yield put(getSuccessAction(actionNames.REGISTER, { result }));
    yield* initAfterLogin(result.token);
    if (remember) {
      saveTokenToStorage(result.token);
    }
  } catch (error) {
    yield put(getFailureAction(actionNames.REGISTER, { error }));
  }
}

function* loginFromStore() {
  const token = yield call(getTokenFromStorage);
  if (token) {
    yield put(getSuccessAction(actionNames.LOGIN_FROM_STORE, { token }));
    yield* initAfterLogin(token);
  } else {
    yield put(getFailureAction(actionNames.LOGIN_FROM_STORE));
  }
}

function* changeActiveChat(action) {
  const { activeChat } = action.payload;
  yield* initActiveChat(activeChat);
}

function* logOut() {
  yield put(clearStore());
  yield call(removeTokenFromStorage);
}

export default function* mainSaga() {
  yield all([
    yield takeEvery(getRequestAction(actionNames.GET_USERS).type, getUsers),
    yield takeEvery(
      getRequestAction(actionNames.SEND_MESSAGE).type,
      sendMessage,
    ),
    yield takeEvery(
      getRequestAction(actionNames.GET_MESSAGES).type,
      loadMessages,
    ),
    yield takeEvery(getRequestAction(actionNames.CREATE_CHAT).type, createChat),
    yield takeEvery(getRequestAction(actionNames.MODIFY_CHAT).type, modifyChat),
    yield takeEvery(getRequestAction(actionNames.MODIFY_USER).type, modifyUser),
    yield takeEvery(getRequestAction(actionNames.GET_CHATS).type, getChats),
    yield takeEvery(getRequestAction(actionNames.LOGIN).type, signIn),
    yield takeEvery(getRequestAction(actionNames.REGISTER).type, register),
    yield takeEvery(
      getRequestAction(actionNames.LOGIN_FROM_STORE).type,
      loginFromStore,
    ),
    yield takeEvery(actionNames.CHANGE_ACTIVE_CHAT, changeActiveChat),
    yield takeEvery(actionNames.LOGOUT, logOut),
  ]);
}
