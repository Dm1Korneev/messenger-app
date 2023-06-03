import { useQuery } from '@tanstack/react-query';

import { api } from 'Client/common';
import { MESSAGES_API_URL, QUERY_KEYS } from 'Client/constants';
import { ServerException } from 'Client/types';
import { ChatDto } from 'Types';

import { useToken } from './useToken';

type Data = ChatDto

export const useChatById = (id?: string) => {
  const token = useToken();
  return useQuery<Data, ServerException>(
    [QUERY_KEYS.CHATS, id],
    () => api.get<Data>(`${MESSAGES_API_URL}/chats/${id}`, token),
    { enabled: id != null },
  );
};
