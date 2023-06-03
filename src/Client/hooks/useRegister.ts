import { useMutation } from '@tanstack/react-query';

import { api, getFormDataBody } from 'Client/common';
import { MESSAGES_API_URL } from 'Client/constants';
import { ServerException } from 'Client/types';
import { TokenDto, RegisterDto } from 'Types';

import { useSessionContext } from './useSessionContext';

export type UseRegisterPayload = Omit<RegisterDto, 'avatar'> & {
  saveToStore: boolean
  avatar?: Blob,
}

export const useRegister = () => {
  const { saveToken } = useSessionContext();
  return useMutation<TokenDto, ServerException, UseRegisterPayload>(({
    saveToStore, ...payload
  }) => api.post(`${MESSAGES_API_URL}/register`, getFormDataBody(payload)), {
    onSuccess: ({ token }, { saveToStore }) => {
      saveToken({ token, saveToStore });
    },
  });
};
