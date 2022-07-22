import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api, getFormDataBody } from 'Common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Constants';

import { useToken } from './useToken';

export type UseUpdateUserPayload = {
    name: string;
    email: string;
    password?: string;
    avatar?: Blob;
  }

export const useUpdateUser = () => {
  const token = useToken();
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, {userId: string, modifyData: UseUpdateUserPayload}>(
    ({
      userId,
      modifyData,
    }) => api.put(`${MESSAGES_API_URL}/users/${userId}`, getFormDataBody(modifyData), token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.USERS]);
        queryClient.invalidateQueries([QUERY_KEYS.CURRENT_USER]);
      },
    },
  );
};
