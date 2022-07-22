import { FC, useEffect } from 'react';

import { getTokenFromStorage } from 'Common';

import { SessionContext } from './SessionContext';
import { useTokenState } from './useTokenState';

export const SessionProvider: FC = ({ children }) => {
  const tokenState = useTokenState();
  const { saveToken } = tokenState;
  useEffect(() => {
    const token = getTokenFromStorage();
    if (token) {
      saveToken({ token });
    }
  }, [saveToken]);

  return (<SessionContext.Provider value={tokenState}>{children}</SessionContext.Provider>);
};

