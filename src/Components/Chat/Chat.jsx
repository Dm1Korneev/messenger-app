import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CreateIcon from '@material-ui/icons/Create';

import UsersAvatar from 'Components/UsersAvatar';

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

const Chat = ({
  selected, chatOnClick, chatModifyOnClick, chat,
}) => {
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

Chat.propTypes = {
  selected: PropTypes.bool.isRequired,
  chatOnClick: PropTypes.func.isRequired,
  chatModifyOnClick: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default Chat;

