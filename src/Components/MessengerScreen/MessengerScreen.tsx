import { useState } from 'react';

import { ChatDialog } from 'Components/ChatDialog';
import { MainContent } from 'Components/MainContent';
import { SideBar } from 'Components/SideBar';
import { TopBar } from 'Components/TopBar';
import { UserModifyDialog } from 'Components/UserModifyDialog';
import { useDialogState, useDisclosure } from 'Hooks';

export const MessengerScreen = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const modifyChatDialogState = useDialogState<string>();
  const addChatDialogState = useDisclosure();
  const userModifyDialogState = useDisclosure();
  const SideBarDrawerState = useDisclosure(true);

  return (
    <>
      <TopBar
        isDrawerOpen={SideBarDrawerState.isOpen}
        modifyUserDialogOnClick={userModifyDialogState.open}
        onDrawerOpen={SideBarDrawerState.open}
      />
      <SideBar
        activeChatId={activeChatId ?? undefined}
        chatModifyOnClick={modifyChatDialogState.open}
        isDrawerOpen={SideBarDrawerState.isOpen}
        onChatAddClick={addChatDialogState.open}
        onChatClick={setActiveChatId}
        onDrawerClose={SideBarDrawerState.close}
      />
      <MainContent activeChatId={activeChatId ?? undefined} />
      {modifyChatDialogState.isOpen && <ChatDialog chatId={modifyChatDialogState.payload} isModify onClose={modifyChatDialogState.close} />}
      {addChatDialogState.isOpen && <ChatDialog onClose={addChatDialogState.close} />}
      {userModifyDialogState.isOpen && <UserModifyDialog onClose={userModifyDialogState.close} />}
    </>
  );
};
