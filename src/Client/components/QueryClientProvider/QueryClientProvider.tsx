import { QueryClient, QueryClientProvider as QueryClientProviderReactQuery } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }: PropsWithChildren) => (
  <QueryClientProviderReactQuery client={queryClient}>
    {children}
  </QueryClientProviderReactQuery>
);
