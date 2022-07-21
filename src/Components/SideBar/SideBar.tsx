import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import AddBox from '@material-ui/icons/AddBox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { Chat } from 'Components/Chat';
import { DRAWER_WIDTH } from 'Constants';
import { useChats } from 'Hooks';
import * as Actions from 'Redux/actions';
import { activeChatIdSelector, drawerIsOpenSelector } from 'Selectors/session';

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

type SideBarProps = {
  chatModifyOnClick: (id: string) => void
  chatAddOnClick: () => void
}

export const SideBar = ({ chatModifyOnClick, chatAddOnClick }: SideBarProps) => {
  const dispatch = useDispatch();

  const { data: chats } = useChats();
  const activeChat = useSelector(activeChatIdSelector);
  const drawerIsOpen = useSelector(drawerIsOpenSelector);

  const onDrawerClose = () => dispatch(Actions.setDrawerIsOpen(false));

  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawer, {
          [classes.drawerOpen]: drawerIsOpen,
          [classes.drawerClose]: !drawerIsOpen,
        }),
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
        <ListItem button key="add_chat" onClick={chatAddOnClick}>
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
              chatModifyOnClick={chatModifyOnClick}
            />
          );
        })}
      </List>
    </Drawer>
  );
};
