import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';

import {
  createChat as createChatAPI,
  getChats as getChatsAPI,
  modifyChat as modifyChatAPI,
} from 'Common/messengerAPI';
import {
  addChats,
  getChats as getChatsAction,
  loadMessages as loadMessagesAction,
  setActiveChat,
} from 'Redux/actions';
import * as actionNames from 'Constants/actionNames';
import { getFailureAction, getRequestAction, getSuccessAction } from 'Redux/shared';

import { activeChatIdSelector, tokenSelector } from 'Selectors/session';

function* createChat(action) {
  try {
    const token = yield select(tokenSelector);
    const { title, avatar, selectedUserIds } = action.payload;
    const chat = yield call(
      createChatAPI,
      token,
      title,
      avatar,
      selectedUserIds,
    );
    yield put(getSuccessAction(actionNames.CREATE_CHAT)({ chat }));
    yield put(addChats(chat));
    yield put(getChatsAction());
    yield put(loadMessagesAction());
  } catch (error) {
    yield put(getFailureAction(actionNames.CREATE_CHAT)({ error }));
  }
}

function* modifyChat(action) {
  try {
    const token = yield select(tokenSelector);
    const { chatId, options } = action.payload;
    const chat = yield call(modifyChatAPI, token, chatId, options);
    yield put(getSuccessAction(actionNames.MODIFY_CHAT)({ chat }));
    yield put(addChats(chat));
    yield put(getChatsAction());
  } catch (error) {
    yield put(getFailureAction(actionNames.MODIFY_CHAT)({ error }));
  }
}

function* initActiveChat(activeChat) {
  yield put(setActiveChat(activeChat));
  yield put(loadMessagesAction());
}

function* getChats() {
  try {
    const token = yield select(tokenSelector);
    const activeChat = yield select(activeChatIdSelector);
    const chats = yield call(getChatsAPI, token);
    yield put(getSuccessAction(actionNames.GET_CHATS)({ chats }));
    yield put(addChats(chats));
    if (!activeChat && chats.length) {
      yield call(initActiveChat, chats[0]._id);
    }
  } catch (error) {
    yield put(getFailureAction(actionNames.GET_CHATS)({ error }));
  }
}

function* changeActiveChat(action) {
  const activeChat = action.payload;
  yield call(initActiveChat, activeChat);
}

export default function* chatsSaga() {
  yield all([
    yield takeEvery(getRequestAction(actionNames.CREATE_CHAT).type, createChat),
    yield takeEvery(getRequestAction(actionNames.MODIFY_CHAT).type, modifyChat),
    yield takeEvery(getRequestAction(actionNames.GET_CHATS).type, getChats),
    yield takeEvery(actionNames.CHANGE_ACTIVE_CHAT, changeActiveChat),
  ]);
}

