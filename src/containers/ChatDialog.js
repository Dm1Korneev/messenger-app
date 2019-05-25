import { connect } from "react-redux";
import {
  closeChatDialog,
  createChat,
  modifyChat,
  getUsers
} from "../redux/actions";
import ChatDialog from "../components/ChatDialog";

const mapStateToProps = state => {
  const usersFromState = state.users;
  const users = usersFromState.allIds
    .filter(element => element !== state.session.user._id)
    .map(value => usersFromState.byId[value]);
  const isModify = state.session.modifyChatDialogIsOpen;
  const chat = isModify && state.chats.byId[state.session.modifiableChat];

  return {
    users,
    isModify,
    chat
  };
};

const mapDispatchToProps = dispatch => ({
  closeChatDialog: () => dispatch(closeChatDialog()),
  onAddChat: (...args) => dispatch(createChat(...args)),
  onSaveChat: (...args) => dispatch(modifyChat(...args)),
  getUsers: () => dispatch(getUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatDialog);
