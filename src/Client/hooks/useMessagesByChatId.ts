import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { api } from 'Client/common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Client/constants';
import { Message } from 'Client/types';

import { ServerException } from '../types';

import { useToken } from './useToken';

type Data = Message[]

const initialData: Data = [];

export const useMessagesByChatId = (chatId?: string, options: UseQueryOptions<Data, ServerException> = {}) => {
  const token = useToken();
  return useQuery<Data, ServerException>(
    [QUERY_KEYS.MESSAGES, chatId],
    () => api.get<Data>(`${MESSAGES_API_URL}/chats/${chatId}/messages`, token),
    { ...options, enabled: chatId != null, initialData },
  );
};
