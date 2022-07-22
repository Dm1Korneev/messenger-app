import { useQuery } from '@tanstack/react-query';

import { api } from 'Client/common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Client/constants';
import { Chat } from 'Client/types';

import { useToken } from './useToken';

type Data = Chat[]

const initialData: Data = [];

export const useChats = () => {
  const token = useToken();
  return useQuery<Data>(
    [QUERY_KEYS.CHATS],
    () => api.get<Data>(`${MESSAGES_API_URL}/chats`, token),
    { initialData },
  );
};
