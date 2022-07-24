import { useState, useCallback, useMemo } from 'react';

import { saveTokenToStorage, removeTokenFromStorage } from 'Client/common';

type Token = string | null

export type TokenState = {
    token: Token
    saveToken: ({ token }: {token: string, saveToStore?: boolean}) => void
    dropToken: () => void
}

export const useTokenState = (): TokenState => {
  const [token, setTokenState] = useState<Token>(null);

  const saveToken = useCallback<TokenState['saveToken']>(({ token, saveToStore }) => {
    setTokenState(token);
    if (saveToStore) {
      saveTokenToStorage(token);
    }
  }, [setTokenState]);

  const dropToken = useCallback<TokenState['dropToken']>(() => {
    setTokenState(null);
    removeTokenFromStorage();
  }, [setTokenState]);

  return useMemo(() => ({ token, saveToken, dropToken }), [token, saveToken, dropToken]);
};

