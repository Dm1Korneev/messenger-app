import { combineReducers } from 'redux';

import messages from './messages';
import session from './session';

const rootReducer = combineReducers({
  messages,
  session,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
