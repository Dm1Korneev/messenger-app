import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import storeFactory from 'Redux/store';

const StoreProvider = ({ children }) => (
  <Provider store={storeFactory()}>
    {children}
  </Provider>

);

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default StoreProvider;
