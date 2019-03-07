import { combineReducers } from "redux";
import messages from "./messages";
import chats from "./chats";
import users from "./users";
import session from "./session";

export default combineReducers({
  chats,
  messages,
  users,
  session
});
