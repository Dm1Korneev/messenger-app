import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messageText: '' };
  }

  handleChange = (event) => {
    this.setState({ messageText: event.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const { messageText } = this.state;
      const { onSendMessage } = this.props;

      event.preventDefault();
      if (messageText.trim()) {
        onSendMessage(messageText);
        this.setState({ messageText: '' });
      }
    }
  };

  render() {
    const { messageText } = this.state;
    const { classes } = this.props;

    return (
      <TextField
        InputLabelProps={{
          classes: { root: classes.InputLabel },
        }}
        InputProps={{
          classes: { input: classes.Input },
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

MessageInput.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  onSendMessage: PropTypes.func.isRequired,
};

const styles = (theme) => ({
  InputLabel: { fontSize: theme.typography.pxToRem(13) },
  Input: { fontSize: theme.typography.pxToRem(13), padding: 0 },
  textField: { flexShrink: 0 },
});

export default withStyles(styles)(MessageInput);

