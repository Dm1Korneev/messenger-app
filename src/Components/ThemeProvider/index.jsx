import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';

const Provider = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
