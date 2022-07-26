import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api, getFormDataBody } from 'Client/common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Client/constants';

import { ServerException } from '../types';

import { useToken } from './useToken';

export type UseUpdateChatPayload = {
    title: string;
    users: string[];
    avatar?: Blob;
  }

export const useUpdateChat = () => {
  const token = useToken();
  const queryClient = useQueryClient();

  return useMutation<unknown, ServerException, {chatId: string, modifyData: UseUpdateChatPayload}>(
    ({
      chatId,
      modifyData,
    }) => api.put(`${MESSAGES_API_URL}/chats/${chatId}`, getFormDataBody(modifyData), token),
    {
      onSuccess: (_, { chatId }) => {
        queryClient.invalidateQueries([QUERY_KEYS.CHATS]);
        queryClient.resetQueries([QUERY_KEYS.CHATS, chatId]);
      },
    },
  );
};
