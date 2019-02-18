const MESSAGES_API_URL = "http://localhost:3000/messages.json";

export function getMessages(callback) {
  if (localStorageAvailable()) {
    var messages = getMessagesFromLocalStorage();
    if (messages && messages.length) {
      callback(messages);
      return;
    }
  }

  var url = new URL(MESSAGES_API_URL);

  fetch(url)
    .then(res => res.json())
    .then(result => {
      if (localStorageAvailable()) {
        saveMessagesInLocalStorage(result.messages);
      }
      callback(result.messages);
    });
}

export function sendMessage(messageText) {
  if (localStorageAvailable()) {
    var messages = getMessagesFromLocalStorage();
    saveMessagesInLocalStorage([
      ...messages,
      constructMessage(messageText, messages.length)
    ]);
  }
}

function constructMessage(messageText, _id) {
  return {
    text: messageText,
    author: "John Smith",
    avatar: "/static/images/avatars/1.jpg",
    _id: _id
  };
}

function saveMessagesInLocalStorage(messages) {
  window.localStorage.setItem("messages", JSON.stringify(messages));
}

function getMessagesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("messages"));
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
