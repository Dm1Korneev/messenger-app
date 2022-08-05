import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api, getFormDataBody } from 'Client/common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Client/constants';
import { UpdateUserDto } from 'Types';

import { ServerException } from '../types';

import { useToken } from './useToken';

export type UseUpdateUserPayload = Omit<UpdateUserDto, 'avatar'> & {
  avatar?: Blob;
}

export const useUpdateUser = () => {
  const token = useToken();
  const queryClient = useQueryClient();

  return useMutation<unknown, ServerException, {userId: string, modifyData: UseUpdateUserPayload}>(
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
