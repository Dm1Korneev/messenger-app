import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api, getFormDataBody } from 'Common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Constants';

import { useToken } from './useToken';

export type UseCreateChatPayload = {
    title: string;
    users: string[];
    avatar?: Blob;
  }

export const useCreateChat = () => {
  const token = useToken();
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, UseCreateChatPayload>(
    (modifyData) => api.post(`${MESSAGES_API_URL}/chats`, getFormDataBody(modifyData), token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.CHATS]);
      },
    },
  );
};
