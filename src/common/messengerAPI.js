import { MESSAGES_API_URL } from "./constants";

export function getChats(token, callback) {
  fetch(MESSAGES_API_URL + "/chats", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(result => {
      if (result) callback(result);
    })
    .catch(function(error) {
      console.log(error);
    });
}

export function getMessages(token, chatId, callback) {
  fetch(MESSAGES_API_URL + "/chats/" + chatId + "/messages", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(result => {
      if (result) callback(result);
    })
    .catch(function(error) {
      console.log(error);
    });
}

export function sendMessage(token, chatId, messageText, callback) {
  fetch(MESSAGES_API_URL + "/chats/" + chatId + "/messages", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      text: messageText
    })
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(result => {
      if (result) callback(result);
    })
    .catch(function(error) {
      console.log(error);
    });
}

export function createChat(token, title, avatar, users, callback) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("avatar", avatar);
  users.forEach(value => formData.append("users[]", value));

  fetch(MESSAGES_API_URL + "/chats", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token
    },
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response);
      }
      return response.json();
    })
    .then(result => {
      if (result) callback(result);
    })
    .catch(function(error) {
      console.log(error);
    });
}

export function modifyChat(token, chatId, options, callback) {
  const formData = new FormData();
  if (options.hasOwnProperty("title")) {
    formData.append("title", options.title);
  }
  if (options.hasOwnProperty("avatar")) {
    formData.append("avatar", options.avatar);
  }
  if (options.hasOwnProperty("users")) {
    options.users.forEach(value => formData.append("users[]", value));
  }

  fetch(MESSAGES_API_URL + "/chats/" + chatId, {
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

export function getUsers(token, callback) {
  fetch(MESSAGES_API_URL + "/users", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(result => {
      if (result) callback(result);
    })
    .catch(function(error) {
      console.log(error);
    });
}
