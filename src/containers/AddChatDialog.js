import { connect } from "react-redux";
import {
  setAddChatDialogIsOpen,
  createChat,
  loadAllUsers
} from "../redux/actions";
import AddChatDialog from "../components/AddChatDialog";

const mapStateToProps = state => {
  const usersFromState = state.users;
  const users = usersFromState.allIds
    .filter(element => element !== state.session.user._id)
    .map(value => usersFromState.byId[value]);

  return {
    users
  };
};

const mapDispatchToProps = dispatch => ({
  closeAddChatDialog: () => dispatch(setAddChatDialogIsOpen(false)),
  onAddChat: (title, selectedUserIds) =>
    dispatch(createChat(title, selectedUserIds)),
  loadAllUsers: () => dispatch(loadAllUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddChatDialog);
