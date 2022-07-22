import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  text?: string;
  isCurrentUserMessage: boolean;
}

export const MessageText = ({ text = '', isCurrentUserMessage }: Props) => {
  const flexDirection = isCurrentUserMessage ? 'row' : 'row-reverse';

  return (
    <Box display="flex" flex="1" flexDirection={flexDirection} pt={1}>
      <Typography variant="body2">
        {text}
      </Typography>
    </Box>
  );
};
