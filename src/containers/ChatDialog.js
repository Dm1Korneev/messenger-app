import commonHoc from 'Containers/commonHoc';

import { modifyChatDialogIsOpenSelector } from 'Selectors/session';
import { notCurrentUsersSelector } from 'Selectors/users';
import { modifiableChatSelector } from 'Selectors/chats';

import {
  closeChatDialog,
  createChat,
  getUsers,
  modifyChat,
} from 'Redux/actions';
import ChatDialog from 'Components/ChatDialog';

const mapStateToProps = (state) => ({
  users: notCurrentUsersSelector(state),
  isModify: modifyChatDialogIsOpenSelector(state),
  chat: modifiableChatSelector(state),
});

const mapDispatchToProps = {
  closeChatDialog,
  onAddChat: createChat,
  onSaveChat: modifyChat,
  getUsers,
};

export default commonHoc(ChatDialog, {
  mapStateToProps,
  mapDispatchToProps,
});
