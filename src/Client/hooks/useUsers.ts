import { useQuery } from '@tanstack/react-query';

import { api } from 'Client/common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Client/constants';
import { User } from 'Client/types';

import { useToken } from './useToken';

type Data = User[]

const initialData: Data = [];

export const useUsers = () => {
  const token = useToken();
  return useQuery<Data>(
    [QUERY_KEYS.USERS],
    () => api.get<Data>(`${MESSAGES_API_URL}/users`, token),
    { initialData },
  );
};
