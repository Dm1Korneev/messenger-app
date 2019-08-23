import { connect } from 'react-redux';

import {
  closeChatDialog,
  createChat,
  getUsers,
  modifyChat,
} from 'Redux/actions';
import ChatDialog from 'Components/ChatDialog';

const mapStateToProps = (state) => {
  const { session, chats, users: usersFromState } = state;

  const users = usersFromState.allIds
    .filter((element) => element !== session.user._id)
    .map((value) => usersFromState.byId[value]);
  const isModify = session.modifyChatDialogIsOpen;
  const chat = (isModify && chats.byId[session.modifiableChat]) || undefined;

  return {
    users,
    isModify,
    chat,
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeChatDialog: () => dispatch(closeChatDialog()),
  onAddChat: (...args) => dispatch(createChat(...args)),
  onSaveChat: (...args) => dispatch(modifyChat(...args)),
  getUsers: () => dispatch(getUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatDialog);
