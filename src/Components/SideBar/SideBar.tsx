import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddBox from '@material-ui/icons/AddBox';
import { useDispatch, useSelector } from 'react-redux';

import { chatsArraySelector } from 'Selectors/chats';
import { activeChatIdSelector, drawerIsOpenSelector } from 'Selectors/session';
import { DRAWER_WIDTH, RELOAD_PERIOD } from 'Constants';
import Chat from 'Components/Chat';
import * as Actions from 'Redux/actions';

const useStyles = makeStyles((theme) => ({
  drawer: {
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
  },
  drawerOpen: {
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: theme.spacing(9),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  addChatIcon: {
    fontSize: theme.spacing(6),
    marginLeft: -theme.spacing(0.5),
  },
}));

const SideBar = () => {
  const dispatch = useDispatch();

  const chats = useSelector(chatsArraySelector);
  const activeChat = useSelector(activeChatIdSelector);
  const drawerIsOpen = useSelector(drawerIsOpenSelector);

  const onDrawerClose = () => dispatch(Actions.setDrawerIsOpen(false));
  const openAddChatDialog = () => dispatch(Actions.setAddChatDialogIsOpen(true));

  useEffect(() => {
    const getChats = () => dispatch(Actions.getChats());
    const interval = setInterval(getChats, RELOAD_PERIOD);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [dispatch]);
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawer, {
            [classes.drawerOpen]: drawerIsOpen,
            [classes.drawerClose]: !drawerIsOpen,
          },
        ),
      }}
      open={drawerIsOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={onDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button key="add_chat" onClick={openAddChatDialog}>
          <ListItemIcon>
            <AddBox color="primary" className={classes.addChatIcon} />
          </ListItemIcon>
          <ListItemText primary="Add chat" />
        </ListItem>
        {chats.map((chat) => {
          const { _id } = chat;
          return (
            <Chat
              chat={chat}
              key={_id}
              selected={_id === activeChat}
              chatOnClick={() => dispatch(Actions.changeActiveChat({ activeChat: _id }))}
              chatModifyOnClick={(id) => dispatch(Actions.openModifyChatDialog(id))}
            />
          );
        })}
      </List>
    </Drawer>
  );
};

export default SideBar;

