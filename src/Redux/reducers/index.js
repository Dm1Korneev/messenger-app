import { combineReducers } from 'redux';
import messages from 'Redux/reducers/messages';
import chats from 'Redux/reducers/chats';
import users from 'Redux/reducers/users';
import session from 'Redux/reducers/session';
import loading from 'Redux/reducers/loading';
import errors from 'Redux/reducers/errors';

export default combineReducers({
  chats,
  messages,
  users,
  session,
  loading,
  errors,
});
