import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api, getJsonBody } from 'Client/common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Client/constants';

import { ServerException } from '../types';

import { useToken } from './useToken';

export type UseCreateMessageByChatIdPayload = {
  text: string;
}

export const useCreateMessageByChatId = () => {
  const token = useToken();
  const queryClient = useQueryClient();

  return useMutation<unknown, ServerException, {chatId: string, payload: UseCreateMessageByChatIdPayload}>(
    ({ chatId, payload }) => api.post(`${MESSAGES_API_URL}/chats/${chatId}/messages`, getJsonBody(payload), token),
    {
      onSuccess: (_, { chatId }) => {
        queryClient.invalidateQueries([QUERY_KEYS.MESSAGES, chatId]);
      },
    },
  );
};
