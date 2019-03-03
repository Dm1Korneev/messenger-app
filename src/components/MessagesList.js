import React, { Component } from "react";
import Message from "./Message";
import List from "@material-ui/core/List";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";

class MessagesList extends Component {
  messagesEnd = React.createRef();

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({
      blok: "end",
      behavior: "smooth"
    });
  };

  componentDidUpdate() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 300);
  }

  render() {
    const { messages, classes, user, users } = this.props;
    return (
      <List className={classes.list}>
        {messages.map((value, index, array) => {
          const { author, text, dateTime, _id } = value;
          const messageAuthor = users[author];

          let name, avatar;
          if (messageAuthor) {
            name = messageAuthor.name;
            avatar = messageAuthor.avatar;
          } else {
            name = author;
          }
          const isCurrentUserMessage = user._id === author;
          const sameAuthor = index > 0 && array[index - 1].author === author;

          return (
            <React.Fragment key={_id}>
              {!sameAuthor && index > 0 && (
                <Divider variant="middle" className={classes.Divider} />
              )}
              <Message
                message={{ author: name, avatar, dateTime, text }}
                isCurrentUserMessage={isCurrentUserMessage}
                sameAuthor={sameAuthor}
              />
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
