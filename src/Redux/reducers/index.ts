import { combineReducers } from 'redux';

import messages from './messages';
import users from './users';
import session from './session';
import loading from './loading';
import errors from './errors';

const rootReducer = combineReducers({
  messages,
  users,
  session,
  loading,
  errors,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
