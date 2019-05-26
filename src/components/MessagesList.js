import React from "react";
import PropTypes from "prop-types";

// components
import MessageUser from "./MessageUser";
import MessageDateTime from "./MessageDateTime";
import MessageText from "./MessageText";

// @material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import { RELOAD_PERIOD } from "../common/constants";

class MessagesList extends React.Component {
  constructor(props) {
    super(props);

    this.loadMessages = props.loadMessages;
    this.interval = undefined;
    this.state = { bottomPosition: true };
  }

  messagesEnd = React.createRef();

  scrollToBottom = () => {
    if (this.messagesEnd.current) {
      this.messagesEnd.current.scrollIntoView({
        blok: "end",
        behavior: "smooth"
      });
    }
  };

  componentDidUpdate() {
    const { bottomPosition } = this.state;
    if (bottomPosition) {
      this.scrollToBottom();
    }
  }

  componentDidMount() {
    this.scrollToBottom();
    this.interval = setInterval(this.loadMessages, RELOAD_PERIOD);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  handlerOnScroll = event => {
    const { bottomPosition } = this.state;
    const newBottomPosition =
      event.target.scrollHeight - event.target.offsetHeight ===
      event.target.scrollTop;
    if (bottomPosition !== newBottomPosition) {
      this.setState({ bottomPosition: newBottomPosition });
    }
  };

  render() {
    const { messagesTree, classes, user, users } = this.props;

    return (
      <List className={classes.list} onScroll={this.handlerOnScroll}>
        {messagesTree.map((value, index) => {
          const { author, childrens } = value;

          const isCurrentUserMessage = user._id === author;

          const childrenComponents = childrens.map((value, index) => {
            const { dateTime, childrens } = value;

            const childrenComponents = childrens.map(value => (
              <MessageText
                key={value._id}
                text={value.text}
                isCurrentUserMessage={isCurrentUserMessage}
              />
            ));

            return (
              <MessageDateTime
                key={index}
                dateTime={dateTime}
                isCurrentUserMessage={isCurrentUserMessage}
              >
                <List disablePadding>{childrenComponents}</List>
              </MessageDateTime>
            );
          });

          const messageAuthor = users[author];

          let name, avatar;
          if (messageAuthor) {
            name = messageAuthor.name;
            avatar = messageAuthor.avatar;
          }

          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <Divider variant="middle" className={classes.Divider} />
              )}
              <MessageUser
                author={name}
                avatar={avatar}
                isCurrentUserMessage={isCurrentUserMessage}
              >
                <List disablePadding>{childrenComponents}</List>
              </MessageUser>
            </React.Fragment>
          );
        })}
        <div ref={this.messagesEnd} />
      </List>
    );
  }
}

MessagesList.propTypes = {
  classes: PropTypes.object.isRequired,
  loadMessages: PropTypes.func.isRequired,
  messagesTree: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }),
  users: PropTypes.object
};

const styles = theme => ({
  list: {
    overflow: "auto",
    flexGrow: 1,
    padding: 0
  },
  Divider: {
    marginTop: theme.spacing.unit
  }
});

export default withStyles(styles)(MessagesList);
