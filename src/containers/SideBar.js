import { connect } from 'react-redux';
import {
  changeActiveChat,
  getChats,
  openModifyChatDialog,
  setAddChatDialogIsOpen,
  setDrawerIsOpen,
} from 'Redux/actions';
import SideBar from 'Components/SideBar';

const mapStateToProps = (state) => ({
  chats: state.chats,
  activeChat: state.session.activeChat,
  drawerIsOpen: state.session.drawerIsOpen,
});

const mapDispatchToProps = (dispatch) => ({
  onDrawerClose: () => dispatch(setDrawerIsOpen(false)),
  changeActiveChat: (activeChat) => dispatch(changeActiveChat(activeChat)),
  openAddChatDialog: () => dispatch(setAddChatDialogIsOpen(true)),
  openModifyChatDialog: (chat) => dispatch(openModifyChatDialog(chat)),
  getChats: () => dispatch(getChats()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBar);
