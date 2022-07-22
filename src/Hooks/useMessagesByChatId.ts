import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { api } from 'Common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Constants';
import { User, Message } from 'Types';

import { useToken } from './useToken';

type Data = { messages: Message[], users:User[] }

const initialData: Data = { messages: [], users: [] };

export const useMessagesByChatId = (chatId?: string, options: UseQueryOptions<Data> = {}) => {
  const token = useToken();
  return useQuery<Data>(
    [QUERY_KEYS.MESSAGES, chatId],
    () => api.get<Data>(`${MESSAGES_API_URL}/chats/${chatId}/messages`, token),
    { ...options, enabled: chatId != null, initialData },
  );
};
