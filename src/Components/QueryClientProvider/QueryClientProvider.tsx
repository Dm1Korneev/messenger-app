import { QueryClient, QueryClientProvider as QueryClientProviderReactQuery } from '@tanstack/react-query';
import { FC } from 'react';

const queryClient = new QueryClient();

export const QueryClientProvider: FC = ({ children }) => (
  <QueryClientProviderReactQuery client={queryClient}>
    {children}
  </QueryClientProviderReactQuery>
);
