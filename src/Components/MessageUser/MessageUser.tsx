import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { PropsWithChildren } from 'react';

import { UsersAvatar } from 'Components/UsersAvatar';

type MessageUserProps = {
  isCurrentUserMessage: boolean;
  author: string;
  avatar: string;
}

export const MessageUser = ({
  isCurrentUserMessage, author, avatar, children,
}: PropsWithChildren<MessageUserProps>) => {
  const flexDirection = isCurrentUserMessage ? 'row-reverse' : 'row';

  return (
    <ListItem>
      <Box
        alignItems="start"
        display="flex"
        flex="1"
        flexDirection={flexDirection}
      >
        <Box position="sticky" top={0}>
          <UsersAvatar author={author} avatar={avatar} />
        </Box>
        <Box display="flex" flex="1" flexDirection="column" px={2}>
          <Box
            bgcolor="white"
            display="flex"
            flexDirection={flexDirection}
            position="sticky"
            top={0}
            zIndex={999}
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
