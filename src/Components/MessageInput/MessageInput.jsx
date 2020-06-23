import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const MessageInput = ({ onSendMessage }) => {
  const [messageText, setMessageText] = useState('');

  const handleChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (messageText.trim()) {
        onSendMessage({ messageText });
        setMessageText('');
      }
    }
  };

  return (
    <TextField
      value={messageText}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      multiline
      rows="2"
      rowsMax="5"
      fullWidth
      margin="normal"
      label="Write a message"
      variant="outlined"
    />
  );
};

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default MessageInput;

