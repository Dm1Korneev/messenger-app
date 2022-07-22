import { useContext } from 'react';

import { SessionContext } from './SessionContext';

export const useSessionContext = () => {
  const state = useContext(SessionContext);
  if (!state) {
    throw new Error('useSessionContext could be used only inside SessionProvider');
  }
  return state;
};
