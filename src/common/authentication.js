import { TOKEN_FIELD, MESSAGES_API_URL } from "./constants";

export function register(email, password, name, avatar, callback) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("name", name);
  formData.append("avatar", avatar);

  return fetch(MESSAGES_API_URL + "/register", {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: formData
  })
    .then(response => response.json())
    .then(result => callback(result))
    .catch(function(error) {
      console.log(error);
    });
}

export function login(email, password, callback) {
  return fetch(MESSAGES_API_URL + "/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(result => callback(result))
    .catch(function(error) {
      console.log(error);
    });
}

export function modifyUser(token, userId, options, callback) {
  const formData = new FormData();
  if (options.hasOwnProperty("email")) {
    formData.append("email", options.email);
  }
  if (options.hasOwnProperty("password")) {
    formData.append("password", options.password);
  }
  if (options.hasOwnProperty("name")) {
    formData.append("name", options.name);
  }
  if (options.hasOwnProperty("avatar")) {
    formData.append("avatar", options.avatar);
  }

  return fetch(MESSAGES_API_URL + "/users/" + userId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token
    },
    body: formData
  })
    .then(response => response.json())
    .then(result => callback(result))
    .catch(function(error) {
      console.log(error);
    });
}

export function saveTokenToStorage(token) {
  if (localStorageAvailable()) {
    window.localStorage[TOKEN_FIELD] = token;
  }
}

export function getTokenFromStorage() {
  if (localStorageAvailable()) {
    return window.localStorage[TOKEN_FIELD];
  } else {
    return undefined;
  }
}

export function removeTokenFromStorage() {
  if (localStorageAvailable()) {
    return window.localStorage.removeItem(TOKEN_FIELD);
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
    var storage = window.localStorage,
      x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}
