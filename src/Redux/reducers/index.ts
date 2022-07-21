import { combineReducers } from 'redux';

import errors from './errors';
import loading from './loading';
import messages from './messages';
import session from './session';

const rootReducer = combineReducers({
  messages,
  session,
  loading,
  errors,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
