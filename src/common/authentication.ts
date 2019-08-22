import { TOKEN_FIELD } from './constants';

function localStorageAvailable(): boolean {
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

export function saveTokenToStorage(token: string): void {
  if (localStorageAvailable()) {
    sessionStorage[TOKEN_FIELD] = token;
  }
}

export function getTokenFromStorage(): string | undefined {
  if (localStorageAvailable()) {
    return sessionStorage[TOKEN_FIELD];
  }
  return undefined;
}

export function removeTokenFromStorage(): boolean {
  if (localStorageAvailable()) {
    sessionStorage.removeItem(TOKEN_FIELD);
    return true;
  }
  return false;
}

export function isLoggedIn(token: string): boolean {
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

export function getUserInfo(token: string): object | undefined {
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