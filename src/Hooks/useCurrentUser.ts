import { useQuery } from '@tanstack/react-query';

import { api } from 'Common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Constants';
import { User } from 'Types';

import { useToken } from './useToken';

type Data = User

export const useCurrentUser = () => {
  const token = useToken();
  return useQuery<Data>(
    [QUERY_KEYS.CURRENT_USER],
    () => api.get<Data>(`${MESSAGES_API_URL}/current-user`, token),
  );
};
