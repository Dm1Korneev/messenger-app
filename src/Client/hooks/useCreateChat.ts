import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api, getFormDataBody } from 'Client/common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Client/constants';

import { ServerException } from '../types';

import { useToken } from './useToken';

export type UseCreateChatPayload = {
    title: string;
    users: string[];
    avatar?: Blob;
  }

export const useCreateChat = () => {
  const token = useToken();
  const queryClient = useQueryClient();

  return useMutation<unknown, ServerException, UseCreateChatPayload>(
    (modifyData) => api.post(`${MESSAGES_API_URL}/chats`, getFormDataBody(modifyData), token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.CHATS]);
      },
    },
  );
};
