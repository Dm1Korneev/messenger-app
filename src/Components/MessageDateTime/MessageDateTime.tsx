import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PropsWithChildren } from 'react';

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

type MessageDateTimeProps = {
  isCurrentUserMessage: boolean;
  dateTime: Date;
}

export const MessageDateTime = ({
  isCurrentUserMessage, children, dateTime: dateTimeFromProps,
}: PropsWithChildren<MessageDateTimeProps>) => {
  const flexDirection = isCurrentUserMessage ? 'row' : 'row-reverse';
  const alignSelf = isCurrentUserMessage ? 'flex-start' : 'flex-end';

  return (
    <Box display="flex" flexDirection="column">
      <Box
        alignSelf={alignSelf}
        bgcolor="white"
        display="flex"
        flexDirection={flexDirection}
        position="sticky"
        top={0}
        width="50%"
        zIndex={1000}
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
