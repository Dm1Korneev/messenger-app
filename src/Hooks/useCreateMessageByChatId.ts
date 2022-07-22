import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api, getJsonBody } from 'Common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Constants';

import { useToken } from './useToken';

export type UseCreateMessageByChatIdPayload = {
  text: string;
}

export const useCreateMessageByChatId = () => {
  const token = useToken();
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, {chatId: string, payload: UseCreateMessageByChatIdPayload}>(
    ({ chatId, payload }) => api.post(`${MESSAGES_API_URL}/chats/${chatId}/messages`, getJsonBody(payload), token),
    {
      onSuccess: (_, { chatId }) => {
        queryClient.invalidateQueries([QUERY_KEYS.MESSAGES, chatId]);
      },
    },
  );
};
