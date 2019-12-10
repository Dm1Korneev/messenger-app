import { TOKEN_FIELD } from 'Constants';

function localStorageAvailable() {
  try {
    const storage = window.sessionStorage;
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

export function saveTokenToStorage(token) {
  if (localStorageAvailable()) {
    sessionStorage[TOKEN_FIELD] = token;
  }
}

export function getTokenFromStorage() {
  if (localStorageAvailable()) {
    return sessionStorage[TOKEN_FIELD];
  }
  return undefined;
}

export function removeTokenFromStorage() {
  if (localStorageAvailable()) {
    sessionStorage.removeItem(TOKEN_FIELD);
    return true;
  }
  return false;
}

export function isLoggedIn(token) {
  if (token) {
    if (typeof token !== 'string' || token.split('.').length < 2) {
      removeTokenFromStorage();
      return false;
    }
    const payload = JSON.parse(window.atob(token.split('.')[1]));

    return payload.exp > Date.now() / 1000;
  }
  return false;
}

export function getUserInfo(token) {
  if (isLoggedIn(token)) {
    const payload = JSON.parse(window.atob(token.split('.')[1]));

    return {
      name: payload.name,
      email: payload.email,
      _id: payload._id,
      avatar: payload.avatar,
    };
  }

  return undefined;
}
