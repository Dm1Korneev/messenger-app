import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';

import {
  login as loginAPI,
  register as registerAPI,
} from 'Common/messengerAPI';
import {
  getTokenFromStorage,
  getUserInfo,
  isLoggedIn,
  removeTokenFromStorage,
  saveTokenToStorage,
} from 'Common/authentication';
import {
  clearStore,
  setSessionInfo,
} from 'Redux/actions';
import * as actionNames from 'Constants/actionNames';
import { getFailureAction, getRequestAction, getSuccessAction } from 'Redux/shared';

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

function* logOut() {
  yield put(clearStore());
  yield call(removeTokenFromStorage);
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(getRequestAction(actionNames.LOGIN).type, signIn),
    yield takeEvery(getRequestAction(actionNames.REGISTER).type, register),
    yield takeEvery(
      getRequestAction(actionNames.LOGIN_FROM_STORE).type,
      loginFromStore,
    ),
    yield takeEvery(actionNames.LOGOUT, logOut),
  ]);
}

