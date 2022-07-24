import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useSessionContext } from './useSessionContext';

export const useLogout = () => {
  const { dropToken } = useSessionContext();
  const queryClient = useQueryClient();
  return useCallback(() => {
    dropToken();
    queryClient.clear();
  }, [dropToken, queryClient]);
};
