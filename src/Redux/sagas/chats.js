import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';

import { ActionNames } from 'Constants';
import {
  loadMessages as loadMessagesAction,
  setActiveChat,
} from 'Redux/actions';

function* initActiveChat(activeChat) {
  yield put(setActiveChat(activeChat));
  yield put(loadMessagesAction());
}

function* changeActiveChat(action) {
  const { activeChat } = action.payload;
  yield call(initActiveChat, activeChat);
}

export default function* chatsSaga() {
  yield all([
    yield takeEvery(ActionNames.CHANGE_ACTIVE_CHAT, changeActiveChat),
  ]);
}
