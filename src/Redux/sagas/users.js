import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';
import {
  getUsers as getUsersAPI,
  modifyUser as modifyUserAPI,
} from 'Common/messengerAPI';
import {
  getUserInfo,
  saveTokenToStorage,
} from 'Common/authentication';
import {
  addUsers,
  setSessionInfo,
} from 'Redux/actions';
import * as actionNames from 'Constants/actionNames';
import { getFailureAction, getRequestAction, getSuccessAction } from 'Redux/shared';

import { tokenSelector } from 'Selectors/session';

function* getUsers() {
  try {
    const token = yield select(tokenSelector);
    const users = yield call(getUsersAPI, token);
    yield put(getSuccessAction(actionNames.GET_USERS)({ users }));
    yield put(addUsers(users));
  } catch (error) {
    yield put(getFailureAction(actionNames.GET_USERS)({ error }));
  }
}

function* modifyUser(action) {
  try {
    let token = yield select(tokenSelector);
    const { userId, options } = action.payload;
    const result = yield call(modifyUserAPI, token, userId, options);
    yield put(getSuccessAction(actionNames.MODIFY_USER)({ result }));
    token = result.token;
    const user = yield call(getUserInfo, token);
    const userModifyDialogIsOpen = false;
    yield put(setSessionInfo({ token, user, userModifyDialogIsOpen }));
    yield put(addUsers(user));
    yield call(saveTokenToStorage, token);
  } catch (error) {
    yield put(getFailureAction(actionNames.MODIFY_USER)({ error }));
  }
}

export default function* usersSaga() {
  yield all([
    yield takeEvery(getRequestAction(actionNames.GET_USERS).type, getUsers),
    yield takeEvery(getRequestAction(actionNames.MODIFY_USER).type, modifyUser),
  ]);
}

