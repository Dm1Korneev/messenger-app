import React from 'react';
import PropTypes from 'prop-types';
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
        onSendMessage({ messageText });
        this.setState({ messageText: '' });
      }
    }
  };

  render() {
    const { messageText } = this.state;

    return (
      <TextField
        value={messageText}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        multiline
        rows="2"
        rowsMax="5"
        fullWidth
        margin="normal"
        label="Write a message"
        variant="outlined"
      />
    );
  }
}

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default MessageInput;

