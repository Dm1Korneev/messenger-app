import { MESSAGES_API_URL } from 'Constants';

import { addJsonBodyToRequest } from './addJsonBodyToRequest';
import { apiCall } from './apiCall';

export function login(email: string, password: string) {
  const uri = `${MESSAGES_API_URL}/login`;
  const options = addJsonBodyToRequest(
    {
      method: 'POST',
    },
    { email, password },
  );

  return apiCall<{token: string}>(uri, options);
}

export const register = (email: string, password: string, name: string, avatar?: File) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('name', name);
  if (avatar) {
    formData.append('avatar', avatar);
  }

  const uri = `${MESSAGES_API_URL}/register`;
  const options = {
    method: 'POST',
    body: formData,
  };

  return apiCall<{token: string}>(uri, options);
};

export function getMessages(token: string, chatId: string) {
  const uri = `${MESSAGES_API_URL}/chats/${chatId}/messages`;
  const options = {
    method: 'GET',
  };

  return apiCall(uri, options, token);
}

export function sendMessage(token: string, chatId: string, text: string) {
  const uri = `${MESSAGES_API_URL}/chats/${chatId}/messages`;
  const options = addJsonBodyToRequest(
    {
      method: 'POST',
    },
    {
      text,
    },
  );

  return apiCall(uri, options, token);
}

export function createChat(token: string, title: string, avatar: File, users: string[]) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('avatar', avatar);
  users.forEach((value) => formData.append('users[]', value));

  const uri = `${MESSAGES_API_URL}/chats`;
  const options = {
    method: 'POST',
    body: formData,
  };

  return apiCall(uri, options, token);
}

type ModifyChatData = {
  title: string;
  users: string[];
  avatar: File;
}

export function modifyChat(token: string, chatId: string, modifyData: ModifyChatData) {
  const formData = new FormData();
  const keys = Object.keys(modifyData) as (keyof ModifyChatData)[];
  keys.forEach((key) => {
    if (key === 'users') {
      modifyData[key].forEach((value) => formData.append('users[]', value));
    } else {
      formData.append(key, modifyData[key]);
    }
  });

  const uri = `${MESSAGES_API_URL}/chats/${chatId}`;
  const options = {
    method: 'PUT',
    body: formData,
  };

  return apiCall(uri, options, token);
}
