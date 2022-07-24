import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import {
  Fragment, useEffect, useRef, useState,
} from 'react';

import { RELOAD_PERIOD } from 'Client/constants';
import { useUsers, useCurrentUser, useMessagesByChatId } from 'Client/hooks';

import { MessageDateTime } from '../MessageDateTime';
import { MessageText } from '../MessageText';
import { MessageUser } from '../MessageUser';

import { getMesagesTree } from './getMesagesTree';

type MessagesListProps = {
  activeChatId?: string
}

export const MessagesList = ({ activeChatId }: MessagesListProps) => {
  const { data: messages } = useMessagesByChatId(activeChatId, { refetchInterval: RELOAD_PERIOD });
  const messagesTree = getMesagesTree(messages);
  const { data: users } = useUsers();
  const { data: currentUser } = useCurrentUser();

  const messagesEnd = useRef<HTMLDivElement>(null);

  const [bottomPosition, setBottomPosition] = useState(true);

  const scrollToBottom = () => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesTree]);

  const handlerOnScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const newBottomPosition = event.currentTarget.scrollHeight - event.currentTarget.offsetHeight
      === event.currentTarget.scrollTop;
    if (bottomPosition !== newBottomPosition) {
      setBottomPosition(newBottomPosition);
    }
  };

  return (
    <List onScroll={handlerOnScroll} sx={{ flexGrow: 1, p: 0, overflow: 'auto' }}>
      {messagesTree.map((valueAuthor, indexAuthor) => {
        const { author, children: childrenAuthor } = valueAuthor;

        const isCurrentUserMessage = currentUser?._id === author;
        const firstDateTime = childrenAuthor[0].dateTime;

        const childrenComponentsAuthor = childrenAuthor.map(
          (valueDateTime) => {
            const { dateTime, children: childrenDateTime } = valueDateTime;

            const childrenComponentsDateTime = childrenDateTime.map(
              (value) => (
                <MessageText
                  key={value._id}
                  isCurrentUserMessage={isCurrentUserMessage}
                  text={value.text}
                />
              ),
            );

            return (
              <MessageDateTime
                key={`${author}-${dateTime}`}
                dateTime={dateTime}
                isCurrentUserMessage={isCurrentUserMessage}
              >
                <Box display="flex" flexDirection="column">{childrenComponentsDateTime}</Box>
              </MessageDateTime>
            );
          },
        );

        const messageAuthor = users.find(({ _id }) => author === _id);

        return (
          <Fragment key={`${author}-${firstDateTime}`}>
            {indexAuthor > 0 && (
            <Divider variant="middle" />
            )}
            <MessageUser
              author={messageAuthor?.name ?? ''}
              avatar={messageAuthor?.avatar ?? ''}
              isCurrentUserMessage={isCurrentUserMessage}
            >
              <Box display="flex" flexDirection="column">{childrenComponentsAuthor}</Box>
            </MessageUser>
          </Fragment>
        );
      })}
      <div ref={messagesEnd} />
    </List>
  );
};
