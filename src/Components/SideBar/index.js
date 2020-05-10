import commonHoc from 'Components/commonHoc';

import {
  changeActiveChat,
  getChats,
  openModifyChatDialog,
  setAddChatDialogIsOpen,
  setDrawerIsOpen,
} from 'Redux/actions';

import { chatsArraySelector } from 'Selectors/chats';
import { activeChatIdSelector, drawerIsOpenSelector } from 'Selectors/session';

import SideBar from './SideBar';

const mapStateToProps = (state) => ({
  chats: chatsArraySelector(state),
  activeChat: activeChatIdSelector(state),
  drawerIsOpen: drawerIsOpenSelector(state),
});

const mapDispatchToProps = {
  onDrawerClose: () => setDrawerIsOpen(false),
  changeActiveChat,
  openAddChatDialog: () => setAddChatDialogIsOpen(true),
  openModifyChatDialog,
  getChats,
};

const Container = commonHoc(SideBar, {
  mapStateToProps,
  mapDispatchToProps,
});

export { Container as SideBar };
