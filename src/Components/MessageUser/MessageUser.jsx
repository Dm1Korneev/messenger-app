import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import UsersAvatar from 'Components/UsersAvatar';

const useStyles = makeStyles((theme) => ({
  ListItemText: {
    backgroundColor: theme.palette.background.default,
    zIndex: 999,
    padding: theme.spacing(0, 2),
  },
}));

const MessageUser = (props) => {
  const classes = useStyles();

  const {
    isCurrentUserMessage, author, avatar, children,
  } = props;

  const flexDirection = isCurrentUserMessage ? 'row-reverse' : 'row';

  return (
    <ListItem>
      <Box
        display="flex"
        flex="1"
        alignItems="start"
        flexDirection={flexDirection}
      >
        <Box position="sticky" top={0}>
          <UsersAvatar author={author} avatar={avatar} />
        </Box>
        <Box display="flex" flex="1" flexDirection="column">
          <Box
            position="sticky"
            top={0}
            display="flex"
            flexDirection={flexDirection}
            className={classes.ListItemText}
          >
            <Typography
              component="span"
              variant="subtitle2"
            >
              {author}
            </Typography>
          </Box>
          {children}
        </Box>
      </Box>
    </ListItem>
  );
};

MessageUser.propTypes = {
  isCurrentUserMessage: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default MessageUser;

