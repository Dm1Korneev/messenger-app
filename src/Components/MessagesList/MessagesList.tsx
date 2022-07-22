import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import {
  Fragment, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MessageDateTime } from 'Components/MessageDateTime';
import { MessageText } from 'Components/MessageText';
import { MessageUser } from 'Components/MessageUser';
import { RELOAD_PERIOD } from 'Constants';
import { useUsers, useCurrentUser } from 'Hooks';
import { loadMessages } from 'Redux/actions';
import { messagesTreeSelector } from 'Selectors/messages';

const useStyles = makeStyles((theme) => ({
  list: {
    overflow: 'auto',
    flexGrow: 1,
    padding: theme.spacing(0),
  },
}));

export const MessagesList = () => {
  const dispatch = useDispatch();

  const messagesTree = useSelector(messagesTreeSelector);
  const { data: users } = useUsers();
  const { data: currentUser } = useCurrentUser();

  const classes = useStyles();
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

  useEffect(() => {
    const interval = setInterval(() => dispatch(loadMessages()), RELOAD_PERIOD);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handlerOnScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const newBottomPosition = event.currentTarget.scrollHeight - event.currentTarget.offsetHeight
      === event.currentTarget.scrollTop;
    if (bottomPosition !== newBottomPosition) {
      setBottomPosition(newBottomPosition);
    }
  };

  return (
    <List className={classes.list} onScroll={handlerOnScroll}>
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
                  text={value.text}
                  isCurrentUserMessage={isCurrentUserMessage}
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
