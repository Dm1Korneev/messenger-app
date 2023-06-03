import { useQuery } from '@tanstack/react-query';

import { api } from 'Client/common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Client/constants';
import { ServerException } from 'Client/types';
import { UserDto } from 'Types';

import { useToken } from './useToken';

type Data = UserDto[]

const initialData: Data = [];

export const useUsers = () => {
  const token = useToken();
  return useQuery<Data, ServerException>(
    [QUERY_KEYS.USERS],
    () => api.get<Data>(`${MESSAGES_API_URL}/users`, token),
    { initialData },
  );
};
