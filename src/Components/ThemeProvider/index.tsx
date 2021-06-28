import React, { FC } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';

const Provider: FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Provider;
