import { useState } from 'react';

import { useDialogState, useDisclosure } from 'Client/hooks';

import { ChatDialog } from '../ChatDialog';
import { MainContent } from '../MainContent';
import { SideBar } from '../SideBar';
import { TopBar } from '../TopBar';
import { UserModifyDialog } from '../UserModifyDialog';

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
