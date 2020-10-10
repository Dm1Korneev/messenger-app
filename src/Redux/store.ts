import { EnhancedStore, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { StateType as StateTypeReducers } from 'Redux/reducers';
import rootSaga from 'Redux/sagas';

const storeFactory = (): EnhancedStore => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default storeFactory;

export type StateType = StateTypeReducers;
