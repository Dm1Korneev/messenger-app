import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { FC } from 'react';

import theme from './theme';

export const ThemeProvider: FC = ({ children }) => (
  <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
);
