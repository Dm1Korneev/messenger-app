import { ThemeProvider as MUIThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

import theme from './theme';

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <StyledEngineProvider injectFirst>
    <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
  </StyledEngineProvider>
);
