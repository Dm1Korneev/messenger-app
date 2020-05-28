import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';

import ChatDialog from 'Components/ChatDialog';
import MainContent from 'Components/MainContent';
import SideBar from 'Components/SideBar';
import TopBar from 'Components/TopBar';
import UserModifyDialog from 'Components/UserModifyDialog';

const MessengerScreen = ({
  chatDialogIsOpen,
  userModifyDialogIsOpen,
}) => (
  <>
    <CssBaseline />
    <TopBar />
    <SideBar />
    <MainContent />
    {chatDialogIsOpen && <ChatDialog />}
    {userModifyDialogIsOpen && <UserModifyDialog />}
  </>
);

MessengerScreen.propTypes = {
  chatDialogIsOpen: PropTypes.bool.isRequired,
  userModifyDialogIsOpen: PropTypes.bool.isRequired,
};

export default MessengerScreen;
