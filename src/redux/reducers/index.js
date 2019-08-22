import { combineReducers } from 'redux';
import messages from './messages';
import chats from './chats';
import users from './users';
import session from './session';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  chats,
  messages,
  users,
  session,
  loading: loadingReducer,
  errors: errorReducer,
});
