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
  const SideBarDrawerState = useDisclosure(true);

  return (
    <>
      <TopBar
        modifyUserDialogOnClick={userModifyDialogState.open}
        isDrawerOpen={SideBarDrawerState.isOpen}
        onDrawerOpen={SideBarDrawerState.open}
      />
      <SideBar
        chatModifyOnClick={modifyChatDialogState.open}
        onChatAddClick={addChatDialogState.open}
        isDrawerOpen={SideBarDrawerState.isOpen}
        onDrawerClose={SideBarDrawerState.close}
      />
      <MainContent />
      {modifyChatDialogState.isOpen && <ChatDialog chatId={modifyChatDialogState.payload} onClose={modifyChatDialogState.close} isModify />}
      {addChatDialogState.isOpen && <ChatDialog onClose={addChatDialogState.close} />}
      {userModifyDialogState.isOpen && <UserModifyDialog onClose={userModifyDialogState.close} />}
    </>
  );
};
