import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const MessageText = ({ text, isCurrentUserMessage }) => {
  const flexDirection = isCurrentUserMessage ? 'row' : 'row-reverse';

  return (
    <Box display="flex" flex="1" flexDirection={flexDirection} pt={1} px={2}>
      <Typography variant="body2">
        {text}
      </Typography>
    </Box>
  );
};

MessageText.defaultProps = {
  text: '',
};
MessageText.propTypes = {
  text: PropTypes.string,
  isCurrentUserMessage: PropTypes.bool.isRequired,
};

export default MessageText;

