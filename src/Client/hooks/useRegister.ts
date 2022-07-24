import { useMutation } from '@tanstack/react-query';

import { api, getFormDataBody } from 'Client/common';
import { MESSAGES_API_URL } from 'Client/constants';

import { useSessionContext } from './useSessionContext';

export type UseRegisterPayload = {
  email: string,
  password: string, name: string, avatar?: Blob, saveToStore: boolean
}

export const useRegister = () => {
  const { saveToken } = useSessionContext();
  return useMutation<
    { token: string },
    unknown, UseRegisterPayload>(({
      email, password, name, avatar,
    }) => api.post(`${MESSAGES_API_URL}/register`, getFormDataBody({
      email, password, name, avatar,
    })), {
      onSuccess: ({ token }, { saveToStore }) => {
        saveToken({ token, saveToStore });
      },
    });
};
