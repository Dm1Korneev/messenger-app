import { useSelector } from 'react-redux';

import { ChatDialog } from 'Components/ChatDialog';
import { MainContent } from 'Components/MainContent';
import { SideBar } from 'Components/SideBar';
import { TopBar } from 'Components/TopBar';
import { UserModifyDialog } from 'Components/UserModifyDialog';
import { useDialogState, useDisclosure } from 'Hooks';
import { userModifyDialogIsOpenSelector } from 'Selectors/session';

export const MessengerScreen = () => {
  const modifyChatDialogState = useDialogState<string>();
  const addChatDialogState = useDisclosure();
  const userModifyDialogIsOpen = useSelector(userModifyDialogIsOpenSelector);

  return (
    <>
      <TopBar />
      <SideBar chatModifyOnClick={modifyChatDialogState.open} chatAddOnClick={addChatDialogState.open} />
      <MainContent />
      {modifyChatDialogState.isOpen && <ChatDialog chatId={modifyChatDialogState.payload} onClose={modifyChatDialogState.close} isModify />}
      {addChatDialogState.isOpen && <ChatDialog onClose={addChatDialogState.close} />}
      {userModifyDialogIsOpen && <UserModifyDialog />}
    </>
  );
};
