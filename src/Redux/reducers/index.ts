import { combineReducers } from 'redux';

import messages from './messages';
import chats from './chats';
import users from './users';
import session from './session';
import loading from './loading';
import errors from './errors';

const rootReducer = combineReducers({
  chats,
  messages,
  users,
  session,
  loading,
  errors,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
