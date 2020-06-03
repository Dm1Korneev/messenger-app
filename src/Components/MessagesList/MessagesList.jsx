import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import MessageDateTime from 'Components/MessageDateTime';
import MessageText from 'Components/MessageText';
import MessageUser from 'Components/MessageUser';
import { RELOAD_PERIOD } from 'Constants';

class MessagesList extends React.Component {
  messagesEnd = React.createRef();

  constructor(props) {
    super(props);

    this.loadMessages = props.loadMessages;
    this.interval = undefined;
    this.state = { bottomPosition: true };
  }

  componentDidMount() {
    this.scrollToBottom();
    this.interval = setInterval(this.loadMessages, RELOAD_PERIOD);
  }

  componentDidUpdate() {
    const { bottomPosition } = this.state;
    if (bottomPosition) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  scrollToBottom = () => {
    if (this.messagesEnd.current) {
      this.messagesEnd.current.scrollIntoView({
        blok: 'end',
        behavior: 'smooth',
      });
    }
  };

  handlerOnScroll = (event) => {
    const { bottomPosition } = this.state;
    const newBottomPosition = event.target.scrollHeight - event.target.offsetHeight
      === event.target.scrollTop;
    if (bottomPosition !== newBottomPosition) {
      this.setState({ bottomPosition: newBottomPosition });
    }
  };

  render() {
    const {
      messagesTree, classes, user, users,
    } = this.props;

    return (
      <List className={classes.list} onScroll={this.handlerOnScroll}>
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
        <div ref={this.messagesEnd} />
      </List>
    );
  }
}

MessagesList.defaultProps = {
  messagesTree: [],
};
MessagesList.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  loadMessages: PropTypes.func.isRequired,
  messagesTree: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.instanceOf(Object).isRequired,
};

const styles = (theme) => ({
  list: {
    overflow: 'auto',
    flexGrow: 1,
    padding: theme.spacing(0),
  },
});

export default withStyles(styles)(MessagesList);

