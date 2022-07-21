import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';

import { UsersAvatar } from 'Components/UsersAvatar';
import { Chat as ChatType } from 'Types';

const useStyles = makeStyles(() => ({
  listItem: {
    '&:hover': {
      '& button': {
        visibility: 'visible',
      },
    },
  },
  modifyButton: {
    visibility: 'hidden',
    color: '#FFF',
  },
}));

type Props = {
  selected: boolean;
  chatOnClick: () => void;
  chatModifyOnClick: (id: string) => void;
  chat: ChatType;
}

export const Chat = ({
  selected, chatOnClick, chatModifyOnClick, chat,
}: Props) => {
  const classes = useStyles();

  const { title, avatar, _id } = chat;

  return (
    <ListItem
      button
      selected={selected}
      onClick={chatOnClick}
      className={classes.listItem}
    >
      <ListItemAvatar>
        <UsersAvatar author={title} avatar={avatar} />
      </ListItemAvatar>
      <ListItemText primary={title} />
      <IconButton
        onClick={() => {
          chatModifyOnClick(_id);
        }}
        classes={{
          root: classes.modifyButton,
        }}
      >
        <CreateIcon />
      </IconButton>
    </ListItem>
  );
};
