import { TOKEN_FIELD } from "./constants";

export function saveTokenToStorage(token) {
  if (localStorageAvailable()) {
    sessionStorage[TOKEN_FIELD] = token;
  }
}

export function getTokenFromStorage() {
  if (localStorageAvailable()) {
    return sessionStorage[TOKEN_FIELD];
  } else {
    return undefined;
  }
}

export function removeTokenFromStorage() {
  if (localStorageAvailable()) {
    return sessionStorage.removeItem(TOKEN_FIELD);
  } else {
    return undefined;
  }
}

export function isLoggedIn(token) {
  if (token) {
    if (typeof token !== "string" || token.split(".").length < 2) {
      saveTokenToStorage(undefined);
      return false;
    }
    var payload = JSON.parse(window.atob(token.split(".")[1]));

    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
}

export function getUserInfo(token) {
  if (isLoggedIn(token)) {
    var payload = JSON.parse(window.atob(token.split(".")[1]));

    return {
      name: payload.name,
      email: payload.email,
      _id: payload._id,
      avatar: payload.avatar
    };
  }
}

function localStorageAvailable() {
  try {
    var storage = sessionStorage,
      x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}
