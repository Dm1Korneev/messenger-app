import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';

import { sendMessage } from 'Redux/actions';

export const MessageInput = () => {
  const dispatch = useDispatch();

  const [messageText, setMessageText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (messageText.trim()) {
        dispatch(sendMessage({ messageText }));
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
