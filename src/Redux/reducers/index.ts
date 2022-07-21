import { combineReducers } from 'redux';

import errors from './errors';
import loading from './loading';
import messages from './messages';
import session from './session';
import users from './users';

const rootReducer = combineReducers({
  messages,
  users,
  session,
  loading,
  errors,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
