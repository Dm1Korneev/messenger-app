import React, {
  Fragment, useEffect, useRef, useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import MessageDateTime from 'Components/MessageDateTime';
import MessageText from 'Components/MessageText';
import MessageUser from 'Components/MessageUser';
import { RELOAD_PERIOD } from 'Constants';

const useStyles = makeStyles((theme) => ({
  list: {
    overflow: 'auto',
    flexGrow: 1,
    padding: theme.spacing(0),
  },
}));

const MessagesList = ({
  messagesTree, user, users, loadMessages,
}) => {
  const classes = useStyles();
  const messagesEnd = useRef();

  const [bottomPosition, setBottomPosition] = useState(true);

  const scrollToBottom = () => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({
        blok: 'end',
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesTree]);

  useEffect(() => {
    const interval = setInterval(loadMessages, RELOAD_PERIOD);
    return () => clearInterval(interval);
  }, [loadMessages]);

  useEffect(() => {
    const interval = setInterval(loadMessages, RELOAD_PERIOD);
    return () => clearInterval(interval);
  }, [loadMessages]);

  const handlerOnScroll = (event) => {
    const newBottomPosition = event.target.scrollHeight - event.target.offsetHeight
      === event.target.scrollTop;
    if (bottomPosition !== newBottomPosition) {
      setBottomPosition(newBottomPosition);
    }
  };

  return (
    <List className={classes.list} onScroll={handlerOnScroll}>
      {messagesTree.map((valueAuthor, indexAuthor) => {
        const { author, childrens: childrensAuthor } = valueAuthor;

        const isCurrentUserMessage = user._id === author;
        const firstDateTime = childrensAuthor[0].dateTime;

        const childrenComponentsAuthor = childrensAuthor.map(
          (valueDateTime) => {
            const { dateTime, childrens: childrensDateTime } = valueDateTime;

            const childrenComponentsDateTime = childrensDateTime.map(
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

        const messageAuthor = users[author];

        let name;
        let avatar;
        if (messageAuthor) {
          name = messageAuthor.name;
          avatar = messageAuthor.avatar;
        }

        return (
          <Fragment key={`${author}-${firstDateTime}`}>
            {indexAuthor > 0 && (
            <Divider variant="middle" />
            )}
            <MessageUser
              author={name}
              avatar={avatar}
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

MessagesList.defaultProps = {
  messagesTree: [],
};
MessagesList.propTypes = {
  loadMessages: PropTypes.func.isRequired,
  messagesTree: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.instanceOf(Object).isRequired,
};

export default MessagesList;

