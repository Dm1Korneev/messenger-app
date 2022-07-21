import { useQuery } from '@tanstack/react-query';

import { apiCall } from 'Common/apiCall';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Constants';
import { Chat } from 'Types';

import { useToken } from './useToken';

type Data = Chat

export const useChatById = (id?: string) => {
  const token = useToken();
  return useQuery<Data>(
    [QUERY_KEYS.CHATS, id],
    () => apiCall<Data>(`${MESSAGES_API_URL}/chats/${id}`, {
      method: 'GET',
    }, token),
    { enabled: id != null },
  );
};
