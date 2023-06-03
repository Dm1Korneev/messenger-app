import { useMutation } from '@tanstack/react-query';

import { api, getJsonBody } from 'Client/common';
import { MESSAGES_API_URL } from 'Client/constants';
import { ServerException } from 'Client/types';
import { TokenDto, LoginDto } from 'Types';

import { useSessionContext } from './useSessionContext';

export type UseLoginPayload = LoginDto & { saveToStore: boolean }

export const useLogin = () => {
  const { saveToken } = useSessionContext();
  return useMutation<TokenDto, ServerException, UseLoginPayload>(
    ({ saveToStore, ...payload }) => api.post(`${MESSAGES_API_URL}/login`, getJsonBody(payload)),
    {
      onSuccess: ({ token }, { saveToStore }) => {
        saveToken({ token, saveToStore });
      },
    },
  );
};
