import { useQuery } from '@tanstack/react-query';

import { api } from 'Common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Constants';
import { User } from 'Types';

import { useToken } from './useToken';

type Data = User

export const useUserById = (id?: string) => {
  const token = useToken();
  return useQuery<Data>(
    [QUERY_KEYS.USERS, id],
    () => api.get<Data>(`${MESSAGES_API_URL}/users/${id}`, token),
    { enabled: id != null },
  );
};
