import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';

import {
  getMessages as getMessagesAPI,
  sendMessage as sendMessageAPI,
} from 'Common/messengerAPI';
import {
  addMessages,
  addUsers,
  loadMessages as loadMessagesAction,
} from 'Redux/actions';
import ActionNames from 'Constants/actionNames';
import { getFailureAction, getRequestAction, getSuccessAction } from 'Redux/shared';
import { activeChatIdSelector, tokenSelector } from 'Selectors/session';

function* sendMessage(action) {
  try {
    const token = yield select(tokenSelector);
    const activeChat = yield select(activeChatIdSelector);
    const { messageText } = action.payload;
    const message = yield call(sendMessageAPI, token, activeChat, messageText);
    yield put(getSuccessAction(ActionNames.SEND_MESSAGE)({ message }));
    yield put(addMessages(message));
    yield put(loadMessagesAction());
  } catch (error) {
    yield put(getFailureAction(ActionNames.SEND_MESSAGE)({ error }));
  }
}

function* loadMessages() {
  try {
    const activeChat = yield select(activeChatIdSelector);
    if (!activeChat) {
      return;
    }
    const token = yield select(tokenSelector);
    const { messages, users } = yield call(getMessagesAPI, token, activeChat);
    yield put(getSuccessAction(ActionNames.GET_MESSAGES)({ messages, users }));
    yield put(addUsers(users));
    yield put(addMessages(messages));
  } catch (error) {
    yield put(getFailureAction(ActionNames.GET_MESSAGES)({ error }));
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(getRequestAction(ActionNames.SEND_MESSAGE).type, sendMessage),
    yield takeEvery(getRequestAction(ActionNames.GET_MESSAGES).type, loadMessages),
  ]);
}

