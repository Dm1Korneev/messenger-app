import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import saga from './saga';

const storeFactory = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewareEnhancer = applyMiddleware(sagaMiddleware);
  const composeEnhancers = (process.env.NODE_ENV === 'production')
    ? middlewareEnhancer : composeWithDevTools(middlewareEnhancer);
  const store = createStore(
    rootReducer,
    composeEnhancers,
  );
  sagaMiddleware.run(saga);
  return store;
};

export default storeFactory;
