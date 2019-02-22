import { MESSAGES_API_URL } from "./constants";

export function getMessages(token, callback) {
  fetch(MESSAGES_API_URL, {
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
      if (result) callback(result.messages);
    })
    .catch(function(error) {
      console.log(error);
    });
}

export function sendMessage(token, messageText) {
  fetch(MESSAGES_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      message: constructMessage(messageText)
    })
  });
}

function constructMessage(messageText, _id) {
  return {
    text: messageText
  };
}
