import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import { UsersAvatar } from 'Components/UsersAvatar';
import { Chat as ChatType } from 'Types';

type Props = {
  selected: boolean;
  chatOnClick: () => void;
  chatModifyOnClick: (id: string) => void;
  chat: ChatType;
}

export const Chat = ({
  selected, chatOnClick, chatModifyOnClick, chat,
}: Props) => {
  const { title, avatar, _id } = chat;

  return (
    <ListItem
      button
      onClick={chatOnClick}
      selected={selected}
      sx={{
        '&:hover': {
          '& button': {
            visibility: 'visible',
          },
        },
      }}
    >
      <ListItemAvatar>
        <UsersAvatar author={title} avatar={avatar} />
      </ListItemAvatar>
      <ListItemText primary={title} />
      <IconButton
        onClick={() => {
          chatModifyOnClick(_id);
        }}
        size="large"
        sx={{ visibility: 'hidden', color: 'white' }}
      >
        <CreateIcon />
      </IconButton>
    </ListItem>
  );
};
