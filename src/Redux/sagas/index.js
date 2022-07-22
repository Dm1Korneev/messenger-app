import { all } from 'redux-saga/effects';

import authenticationSaga from 'Redux/sagas/authentication';
import chatsSaga from 'Redux/sagas/chats';
import messagesSaga from 'Redux/sagas/messages';

export default function* rootSaga() {
  yield all([
    chatsSaga(),
    messagesSaga(),
    authenticationSaga(),
  ]);
}
