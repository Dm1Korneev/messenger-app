import { all } from 'redux-saga/effects';
import usersSaga from 'Redux/sagas/users';
import chatsSaga from 'Redux/sagas/chats';
import messagesSaga from 'Redux/sagas/messages';
import authenticationSaga from 'Redux/sagas/authentication';

export default function* rootSaga() {
  yield all([
    chatsSaga(),
    messagesSaga(),
    usersSaga(),
    authenticationSaga(),
  ]);
}
