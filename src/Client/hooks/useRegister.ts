import { useMutation } from '@tanstack/react-query';

import { api, getFormDataBody } from 'Client/common';
import { MESSAGES_API_URL } from 'Client/constants';
import { CreateUserDto } from 'Types';

import { ServerException } from '../types';

import { useSessionContext } from './useSessionContext';

export type UseRegisterPayload = Omit<CreateUserDto, 'avatar'> & {
  avatar?: Blob;
  saveToStore: boolean;
}

export const useRegister = () => {
  const { saveToken } = useSessionContext();
  return useMutation<
    { token: string },
    ServerException, UseRegisterPayload>(({
      email, password, name, avatar,
    }) => api.post(`${MESSAGES_API_URL}/register`, getFormDataBody({
      email, password, name, avatar,
    })), {
      onSuccess: ({ token }, { saveToStore }) => {
        saveToken({ token, saveToStore });
      },
    });
};
