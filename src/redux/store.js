import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import saga from "./saga";
import createSagaMiddleware from "redux-saga";

const storeFactory = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(saga);
  return store;
};

export default storeFactory;
