import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FC } from 'react';

import { UsersAvatar } from 'Components/UsersAvatar';

const useStyles = makeStyles((theme) => ({
  ListItemText: {
    backgroundColor: theme.palette.background.default,
    zIndex: 999,
  },
}));

type Props = {
  isCurrentUserMessage: boolean;
  author: string;
  avatar: string;
}

export const MessageUser: FC<Props> = ({
  isCurrentUserMessage, author, avatar, children,
}) => {
  const classes = useStyles();

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
        <Box display="flex" flex="1" flexDirection="column" px={2}>
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
