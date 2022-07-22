import AddBox from '@mui/icons-material/AddBox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Chat } from 'Components/Chat';
import { DRAWER_WIDTH } from 'Constants';
import { useChats } from 'Hooks';

type SideBarProps = {
  chatModifyOnClick: (id: string) => void
  onChatAddClick: () => void
  isDrawerOpen: boolean
  onDrawerClose: () => void
  activeChatId?: string
  onChatClick: (chatId: string) => void
}

export const SideBar = ({
  chatModifyOnClick, onChatAddClick, isDrawerOpen, onDrawerClose, activeChatId, onChatClick,
}: SideBarProps) => {
  const { data: chats } = useChats();

  return (
    <Drawer
      open={isDrawerOpen}
      sx={(theme) => {
        const additionalStyles = isDrawerOpen ? {
          width: DRAWER_WIDTH,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        } : {
          width: theme.spacing(9),
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        };

        return {
          '.MuiDrawer-paper': {
            overflowX: 'hidden',
            whiteSpace: 'nowrap',
            position: 'relative',
            ...additionalStyles,
          },
        };
      }}
      variant="permanent"
    >
      <Box sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        p: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
      })}
      >
        <IconButton onClick={onDrawerClose} size="large">
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem key="add_chat" button onClick={onChatAddClick}>
          <ListItemIcon>
            <AddBox
              color="primary"
              sx={(theme) => ({
                fontSize: theme.spacing(6),
                ml: -0.5,
              })}
            />
          </ListItemIcon>
          <ListItemText primary="Add chat" />
        </ListItem>
        {chats.map((chat) => {
          const { _id } = chat;
          return (
            <Chat
              key={_id}
              chat={chat}
              chatModifyOnClick={chatModifyOnClick}
              chatOnClick={() => onChatClick(_id)}
              selected={_id === activeChatId}
            />
          );
        })}
      </List>
    </Drawer>
  );
};
