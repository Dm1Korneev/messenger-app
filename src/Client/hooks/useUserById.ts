import { useQuery } from '@tanstack/react-query';

import { api } from 'Client/common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Client/constants';
import { UserDto } from 'Types';

import type { ServerException } from '../types';

import { useToken } from './useToken';

type Data = UserDto

export const useUserById = (id?: string) => {
  const token = useToken();
  return useQuery<Data, ServerException>(
    [QUERY_KEYS.USERS, id],
    () => api.get<Data>(`${MESSAGES_API_URL}/users/${id}`, token),
    { enabled: id != null },
  );
};
