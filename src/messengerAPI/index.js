const MESSAGES_API_URL = "/api";

export function getMessages(callback) {
  fetch(MESSAGES_API_URL)
    .then(res => res.json())
    .then(result => {
      callback(result.messages);
    });
}

export function sendMessage(messageText) {
  fetch(MESSAGES_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
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
