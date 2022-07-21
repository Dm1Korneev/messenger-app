import { FC } from 'react';
import { Provider } from 'react-redux';

import storeFactory from 'Redux/store';

export const StoreProvider: FC = ({ children }) => (
  <Provider store={storeFactory()}>
    {children}
  </Provider>
);
