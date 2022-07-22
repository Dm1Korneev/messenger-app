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

export function saveTokenToStorage(token: string) {
  if (localStorageAvailable()) {
    sessionStorage[TOKEN_FIELD] = token;
  }
}

export function getTokenFromStorage() {
  if (localStorageAvailable()) {
    return sessionStorage[TOKEN_FIELD] as string;
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

export function isLoggedIn(token: string) {
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
