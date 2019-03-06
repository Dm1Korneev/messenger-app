import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = { messageText: "" };
  }

  handleChange = event => {
    this.setState({ messageText: event.target.value });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (this.state.messageText.trim()) {
        this.props.onSendMessage(this.state.messageText);
        this.setState({ messageText: "" });
      }
    }
  };

  render() {
    const { messageText } = this.state;
    const { classes } = this.props;

    return (
      <TextField
        InputLabelProps={{
          classes: { root: classes.InputLabel }
        }}
        InputProps={{
          classes: { input: classes.Input }
        }}
        className={classes.textField}
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
    );
  }
}

const styles = theme => ({
  InputLabel: { fontSize: theme.typography.pxToRem(13) },
  Input: { fontSize: theme.typography.pxToRem(13), padding: 0 },
  textField: { flexShrink: 0 }
});

export default withStyles(styles)(MessageInput);
