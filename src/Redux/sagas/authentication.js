import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';

import {
  getTokenFromStorage,
  saveTokenToStorage,
} from 'Common/authentication';
import {
  login as loginAPI,
  register as registerAPI,
} from 'Common/messengerAPI';
import { ActionNames } from 'Constants';
import {
  setSessionInfo,
} from 'Redux/actions';
import { getFailureAction, getRequestAction, getSuccessAction } from 'Redux/shared';

function* initAfterLogin(token) {
  if (!token) {
    return;
  }
  yield put(setSessionInfo({ token }));
}

function* signIn(action) {
  try {
    const { email, password, remember } = action.payload;
    const result = yield call(loginAPI, email, password);
    yield put(getSuccessAction(ActionNames.LOGIN)({ result }));
    yield call(initAfterLogin, result.token);
    if (remember) {
      saveTokenToStorage(result.token);
    }
  } catch (error) {
    yield put(getFailureAction(ActionNames.LOGIN)({ error }));
  }
}

function* register(action) {
  try {
    const {
      email, password, name, avatar, remember,
    } = action.payload;
    const result = yield call(registerAPI, email, password, name, avatar);
    yield put(getSuccessAction(ActionNames.REGISTER)({ result }));
    yield call(initAfterLogin, result.token);
    if (remember) {
      saveTokenToStorage(result.token);
    }
  } catch (error) {
    yield put(getFailureAction(ActionNames.REGISTER)({ error }));
  }
}

function* loginFromStore() {
  const token = yield call(getTokenFromStorage);
  if (token) {
    yield put(getSuccessAction(ActionNames.LOGIN_FROM_STORE)({ token }));
    yield call(initAfterLogin, token);
  } else {
    yield put(getFailureAction(ActionNames.LOGIN_FROM_STORE)());
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(getRequestAction(ActionNames.LOGIN).type, signIn),
    yield takeEvery(getRequestAction(ActionNames.REGISTER).type, register),
    yield takeEvery(
      getRequestAction(ActionNames.LOGIN_FROM_STORE).type,
      loginFromStore,
    ),
  ]);
}
