import TextField from '@mui/material/TextField';
import { useState } from 'react';

import { useCreateMessageByChatId } from 'Hooks';

type MessageInputProps = {
  activeChatId: string
}

export const MessageInput = ({ activeChatId }: MessageInputProps) => {
  const [messageText, setMessageText] = useState('');
  const { mutate: createMessage } = useCreateMessageByChatId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (messageText.trim()) {
        createMessage({ chatId: activeChatId, payload: { text: messageText } });
        setMessageText('');
      }
    }
  };

  return (
    <TextField
      fullWidth
      label="Write a message"
      margin="normal"
      maxRows="5"
      minRows="2"
      multiline
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      value={messageText}
      variant="outlined"
    />
  );
};
