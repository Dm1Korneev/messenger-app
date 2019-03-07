import { connect } from "react-redux";
import {
  setDrawerIsOpen,
  changeActiveChat,
  setAddChatDialogIsOpen
} from "../redux/actions";
import SideBar from "../components/SideBar";

const mapStateToProps = state => ({
  chats: state.chats,
  activeChat: state.session.activeChat,
  drawerIsOpen: state.session.drawerIsOpen
});

const mapDispatchToProps = dispatch => ({
  onDrawerClose: () => dispatch(setDrawerIsOpen(false)),
  changeActiveChat: activeChat => dispatch(changeActiveChat(activeChat)),
  openAddChatDialog: () => dispatch(setAddChatDialogIsOpen(true))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
