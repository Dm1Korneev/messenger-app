import { useEffect } from 'react';

import { isLoggedIn } from 'Common';
import { useSessionContext } from 'Components/SessionProvider';

export const useIsLoggedIn = (): boolean => {
  const { token, dropToken } = useSessionContext();
  let state = false;
  const hasToken = Boolean(token);
  if (token && isLoggedIn(token)) {
    state = true;
  }

  useEffect(() => {
    if (hasToken && !state) {
      dropToken();
    }
  }, [state, hasToken, dropToken]);

  return state;
};
