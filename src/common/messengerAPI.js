import { MESSAGES_API_URL } from 'Common/constants';

function parseJSON(response) {
  return new Promise((resolve) => response.json().then((result) => resolve({
    status: response.status,
    ok: response.ok,
    result,
  })));
}

function apiCall(URI, optionsParams) {
  const options = {
    ...optionsParams,
    headers: {
      ...optionsParams.headers,
      Accept: 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    fetch(URI, options)
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.result);
        }
        return reject(response.result);
      });
  });
}

function addJsonBodyToRequest(options, bodyObject) {
  return {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyObject),
  };
}

export function login(email, password) {
  const uri = `${MESSAGES_API_URL}/login`;
  const options = addJsonBodyToRequest(
    {
      method: 'POST',
    },
    { email, password },
  );

  return apiCall(uri, options);
}

export function register(email, password, name, avatar) {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('name', name);
  formData.append('avatar', avatar);

  const uri = `${MESSAGES_API_URL}/register`;
  const options = {
    method: 'POST',
    body: formData,
  };

  return apiCall(uri, options);
}

export function modifyUser(token, userId, modifyData) {
  const formData = new FormData();
  Object.keys(modifyData).forEach((key) => formData.append(key, modifyData[key]));

  const uri = `${MESSAGES_API_URL}/users/${userId}`;
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  return apiCall(uri, options);
}

export function getChats(token) {
  const uri = `${MESSAGES_API_URL}/chats`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return apiCall(uri, options);
}

export function getMessages(token, chatId) {
  const uri = `${MESSAGES_API_URL}/chats/${chatId}/messages`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return apiCall(uri, options);
}

export function sendMessage(token, chatId, text) {
  const uri = `${MESSAGES_API_URL}/chats/${chatId}/messages`;
  const options = addJsonBodyToRequest(
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      text,
    },
  );

  return apiCall(uri, options);
}

export function createChat(token, title, avatar, users) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('avatar', avatar);
  users.forEach((value) => formData.append('users[]', value));

  const uri = `${MESSAGES_API_URL}/chats`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  return apiCall(uri, options);
}

export function modifyChat(token, chatId, modifyData) {
  const formData = new FormData();
  Object.keys(modifyData).forEach((key) => {
    if (key === 'users') {
      formData.append('users[]', modifyData[key]);
    } else {
      formData.append(key, modifyData[key]);
    }
  });

  const uri = `${MESSAGES_API_URL}/chats/${chatId}`;
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  return apiCall(uri, options);
}

export function getUsers(token) {
  const uri = `${MESSAGES_API_URL}/users`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return apiCall(uri, options);
}
