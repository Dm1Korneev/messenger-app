import React from 'react';
import { useSelector } from 'react-redux';

import { chatDialogIsOpenSelector, userModifyDialogIsOpenSelector } from 'Selectors/session';
import ChatDialog from 'Components/ChatDialog';
import MainContent from 'Components/MainContent';
import SideBar from 'Components/SideBar';
import TopBar from 'Components/TopBar';
import UserModifyDialog from 'Components/UserModifyDialog';

const MessengerScreen = () => {
  const chatDialogIsOpen = useSelector(chatDialogIsOpenSelector);
  const userModifyDialogIsOpen = useSelector(userModifyDialogIsOpenSelector);

  return (
    <>
      <TopBar />
      <SideBar />
      <MainContent />
      {chatDialogIsOpen && <ChatDialog />}
      {userModifyDialogIsOpen && <UserModifyDialog />}
    </>
  );
};

export default MessengerScreen;
