import React from 'react';

import { TokenState } from './useTokenState';

export type SessionProviderState = TokenState

export const SessionContext = React.createContext<SessionProviderState | null>(null);
