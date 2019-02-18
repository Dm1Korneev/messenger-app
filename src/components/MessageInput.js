import React, { Component } from "react";
import "./MessageInput.css";
import TextField from "@material-ui/core/TextField";

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = { messageText: "" };
  }

  handleChange = event => {
    this.setState({ messageText: event.target.value });
  };

  handleKeyPress = event => {
    if (event.key === "Enter" && this.state.messageText) {
      event.preventDefault();
      this.props.onSendMessage(this.state.messageText);
      this.setState({ messageText: "" });
    }
  };

  render() {
    const { messageText } = this.state;

    return (
      <div className="MessageInput">
        <TextField
          value={messageText}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          color="primary"
          multiline
          rows="2"
          rowsMax="5"
          fullWidth
          margin="normal"
          label="Write a message..."
          variant="outlined"
        />
      </div>
    );
  }
}

export default MessageInput;
