import React, { Component } from "react";
import Message from "./Message";
import List from "@material-ui/core/List";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  list: {
    overflow: "auto",
    padding: 0
  }
});

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
    const { messages, classes, user } = this.props;
    return (
      <List className={classes.list}>
        {messages.map((value, index, array) => {
          const { authorId, text, author, avatar, dateTime, _id } = value;
          const isCurrentUserMessage = user._id === authorId;
          const sameAuthor =
            index > 0 && array[index - 1].authorId === authorId;

          return (
            <Message
              key={_id}
              message={{ author, avatar, dateTime, text }}
              isCurrentUserMessage={isCurrentUserMessage}
              sameAuthor={sameAuthor}
            />
          );
        })}
        <div ref={this.messagesEnd} />
      </List>
    );
  }
}

export default withStyles(styles)(MessagesList);
