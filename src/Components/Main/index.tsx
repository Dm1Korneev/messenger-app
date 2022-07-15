import React from 'react';

import { ThemeProvider } from 'Components/ThemeProvider';
import { StoreProvider } from 'Components/StoreProvider';
import { App } from 'Components/App';

const Main = () => (
  <StoreProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StoreProvider>
);

export default Main;
