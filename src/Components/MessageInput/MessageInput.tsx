import TextField from '@material-ui/core/TextField';
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
      value={messageText}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      multiline
      minRows="2"
      maxRows="5"
      fullWidth
      margin="normal"
      label="Write a message"
      variant="outlined"
    />
  );
};
