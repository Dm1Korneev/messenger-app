import { useQuery } from '@tanstack/react-query';

import { apiCall } from 'Common/apiCall';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Constants';
import { Chat } from 'Types';

import { useToken } from './useToken';

type Data = Chat[]

const initialData: Data = [];

export const useChats = () => {
  const token = useToken();
  return useQuery<Data>(
    [QUERY_KEYS.CHATS],
    () => apiCall<Data>(`${MESSAGES_API_URL}/chats`, {
      method: 'GET',
    }, token),
    { initialData },
  );
};
