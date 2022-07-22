import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api, getFormDataBody } from 'Common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Constants';

import { useToken } from './useToken';

export type UseUpdateChatPayload = {
    title: string;
    users: string[];
    avatar?: Blob;
  }

export const useUpdateChat = () => {
  const token = useToken();
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, {chatId: string, modifyData: UseUpdateChatPayload}>(
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
