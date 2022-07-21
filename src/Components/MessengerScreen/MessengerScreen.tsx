import { ChatDialog } from 'Components/ChatDialog';
import { MainContent } from 'Components/MainContent';
import { SideBar } from 'Components/SideBar';
import { TopBar } from 'Components/TopBar';
import { UserModifyDialog } from 'Components/UserModifyDialog';
import { useDialogState, useDisclosure } from 'Hooks';

export const MessengerScreen = () => {
  const modifyChatDialogState = useDialogState<string>();
  const addChatDialogState = useDisclosure();
  const userModifyDialogState = useDisclosure();

  return (
    <>
      <TopBar modifyUserDialogOnClick={userModifyDialogState.open} />
      <SideBar chatModifyOnClick={modifyChatDialogState.open} chatAddOnClick={addChatDialogState.open} />
      <MainContent />
      {modifyChatDialogState.isOpen && <ChatDialog chatId={modifyChatDialogState.payload} onClose={modifyChatDialogState.close} isModify />}
      {addChatDialogState.isOpen && <ChatDialog onClose={addChatDialogState.close} />}
      {userModifyDialogState.isOpen && <UserModifyDialog onClose={userModifyDialogState.close} />}
    </>
  );
};
