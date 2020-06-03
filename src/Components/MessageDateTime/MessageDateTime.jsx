import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import moment from 'Common/moment';

const useStyles = makeStyles((theme) => ({
  ListItemText: {
    backgroundColor: theme.palette.background.default,
    zIndex: 1000,
  },
}));

function getDateTimeText(_value) {
  if (_value) {
    const value = moment(_value);
    if (value.isAfter(moment().startOf('day'))) {
      return value.format('LT');
    }
    return value.format('LLLL');
  }
  return undefined;
}

function MessageDateTime({
  isCurrentUserMessage, children, dateTime: dateTimeFromProps,
}) {
  const classes = useStyles();
  const dateTime = getDateTimeText(dateTimeFromProps);

  const flexDirection = isCurrentUserMessage ? 'row' : 'row-reverse';
  const alignSelf = isCurrentUserMessage ? 'flex-start' : 'flex-end';

  return (
    <Box display="flex" flexDirection="column">
      <Box
        position="sticky"
        top={0}
        display="flex"
        width="50%"
        flexDirection={flexDirection}
        alignSelf={alignSelf}
        className={classes.ListItemText}
      >
        <Typography
          color="textSecondary"
          variant="caption"
        >
          {dateTime}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

MessageDateTime.propTypes = {
  isCurrentUserMessage: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  dateTime: PropTypes.instanceOf(Object).isRequired,
};

export default MessageDateTime;
