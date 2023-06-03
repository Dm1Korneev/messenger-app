import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { ChatDto } from 'Types';

import { UsersAvatar } from '../UsersAvatar';

type Props = {
  selected: boolean;
  chatOnClick: () => void;
  chatModifyOnClick: (id: string) => void;
  chat: ChatDto;
}

export const Chat = ({
  selected, chatOnClick, chatModifyOnClick, chat,
}: Props) => {
  const { title, avatar, _id } = chat;

  return (
    <ListItemButton
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
    </ListItemButton>
  );
};
