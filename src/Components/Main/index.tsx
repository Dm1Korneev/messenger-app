import React from 'react';

import { QueryClientProvider } from 'Components/QueryClientProvider';
import { ThemeProvider } from 'Components/ThemeProvider';
import { StoreProvider } from 'Components/StoreProvider';
import { App } from 'Components/App';

const Main = () => (
  <StoreProvider>
    <ThemeProvider>
      <QueryClientProvider>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </StoreProvider>
);

export default Main;
