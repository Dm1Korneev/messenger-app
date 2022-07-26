import { useQuery } from '@tanstack/react-query';

import { api } from 'Client/common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Client/constants';
import { User } from 'Client/types';

import { ServerException } from '../types';

import { useToken } from './useToken';

type Data = User

export const useCurrentUser = () => {
  const token = useToken();
  return useQuery<Data, ServerException>(
    [QUERY_KEYS.CURRENT_USER],
    () => api.get<Data>(`${MESSAGES_API_URL}/users/current`, token),
  );
};
