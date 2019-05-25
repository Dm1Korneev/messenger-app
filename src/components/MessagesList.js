import React, { Component } from "react";
import MessageUser from "./MessageUser";
import MessageDateTime from "./MessageDateTime";
import MessageText from "./MessageText";
import List from "@material-ui/core/List";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";

import { RELOAD_PERIOD } from "../common/constants";

class MessagesList extends Component {
  constructor(props) {
    super(props);

    this.loadMessages = props.loadMessages;
    this.interval = undefined;
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
    const { bottomPosition } = this.props;
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

  hendlerOnScroll = event => {
    const { setBottomPosition } = this.props;
    setBottomPosition(
      event.target.scrollHeight - event.target.offsetHeight ===
        event.target.scrollTop
    );
  };

  render() {
    const { messagesTree, classes, user, users } = this.props;

    return (
      <List className={classes.list} onScroll={this.hendlerOnScroll}>
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
