import React, { FC } from 'react';
import { QueryClient, QueryClientProvider as QueryClientProviderReactQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const QueryClientProvider: FC = ({ children }) => (
  <QueryClientProviderReactQuery client={queryClient}>
    {children}
  </QueryClientProviderReactQuery>
);
