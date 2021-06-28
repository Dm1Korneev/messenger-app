import React, { FC } from 'react';
import { Provider } from 'react-redux';

import storeFactory from 'Redux/store';

const StoreProvider: FC = ({ children }) => (
  <Provider store={storeFactory()}>
    {children}
  </Provider>

);

export default StoreProvider;
