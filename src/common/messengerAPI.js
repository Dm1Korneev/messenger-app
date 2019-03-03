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

export function createChat(token, title, users, callback) {
  fetch(MESSAGES_API_URL + "/chats", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      title,
      users
    })
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
