import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function getLang() {
  if (navigator.languages) {
    return navigator.languages[0];
  }
  return navigator.language;
}

const optionsLong: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
};
const dateLongFormat = new Intl.DateTimeFormat(getLang(), optionsLong);

const optionsShort: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
};
const dateShortFormat = new Intl.DateTimeFormat(getLang(), optionsShort);

const isToday = (someDate: Date) => {
  const today = new Date();
  return someDate.getDate() === today.getDate()
    && someDate.getMonth() === today.getMonth()
    && someDate.getFullYear() === today.getFullYear();
};

const getDateTimeText = (value: Date) => {
  if (value) {
    if (isToday(value)) {
      return dateShortFormat.format(value);
    }
    return dateLongFormat.format(value);
  }
  return undefined;
};

const useStyles = makeStyles((theme) => ({
  ListItemText: {
    backgroundColor: theme.palette.background.default,
    zIndex: 1000,
  },
}));

type Props = {
  isCurrentUserMessage: boolean;
  dateTime: Date;
}

export const MessageDateTime: FC<Props> = ({
  isCurrentUserMessage, children, dateTime: dateTimeFromProps,
}) => {
  const classes = useStyles();

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
          {getDateTimeText(dateTimeFromProps)}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};
