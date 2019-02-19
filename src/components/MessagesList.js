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
    const { messages, classes } = this.props;
    return (
      <List className={classes.list}>
        {messages.map(value => (
          <Message key={value._id} message={value} />
        ))}
        <div ref={this.messagesEnd} />
      </List>
    );
  }
}

export default withStyles(styles)(MessagesList);
