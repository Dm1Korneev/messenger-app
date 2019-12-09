import { combineReducers } from 'redux';
import messages from 'Redux/reducers/messages';
import chats from 'Redux/reducers/chats';
import users from 'Redux/reducers/users';
import session from 'Redux/reducers/session';
import loadingReducer from 'Redux/reducers/loadingReducer';
import errorReducer from 'Redux/reducers/errorReducer';

export default combineReducers({
  chats,
  messages,
  users,
  session,
  loading: loadingReducer,
  errors: errorReducer,
});
