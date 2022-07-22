import { useMutation } from '@tanstack/react-query';

import { api, getJsonBody } from 'Client/common';
import { MESSAGES_API_URL } from 'Client/constants';

import { useSessionContext } from './useSessionContext';

export type UseLoginPayload = { email: string, password: string, saveToStore: boolean }

export const useLogin = () => {
  const { saveToken } = useSessionContext();
  return useMutation<
    { token: string },
    unknown, UseLoginPayload>(({ saveToStore, ...payload }) => api.post(`${MESSAGES_API_URL}/login`, getJsonBody(payload)), {
      onSuccess: ({ token }, { saveToStore }) => {
        saveToken({ token, saveToStore });
      },
    });
};
