import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { api } from 'Client/common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Client/constants';
import { ServerException } from 'Client/types';
import { MessageDto } from 'Types';

import { useToken } from './useToken';

type Data = MessageDto[]

const initialData: Data = [];

export const useMessagesByChatId = (chatId?: string, options: UseQueryOptions<Data, ServerException> = {}) => {
  const token = useToken();
  return useQuery<Data, ServerException>(
    [QUERY_KEYS.MESSAGES, chatId],
    () => api.get<Data>(`${MESSAGES_API_URL}/chats/${chatId}/messages`, token),
    { ...options, enabled: chatId != null, initialData },
  );
};
