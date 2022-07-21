import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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
