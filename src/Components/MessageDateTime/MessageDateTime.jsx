import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import moment from 'Common/moment';

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

function MessageDateTime(props) {
  const {
    isCurrentUserMessage, children, classes, dateTime: dateTimeFromProps,
  } = props;
  const dateTime = getDateTimeText(dateTimeFromProps);

  const ListItemTextClass = classNames(
    classes.ListItemText,
    !isCurrentUserMessage && classes.reverse,
  );

  const ListItemClass = classNames(
    classes.ListItem,
    isCurrentUserMessage && classes.reverse,
  );

  return (
    <ListItem className={ListItemClass}>
      <div className={classes.textContent}>
        <ListItemText
          className={classNames(ListItemTextClass, classes.sticky)}
          secondary={(
            <Typography
              component="span"
              color="textSecondary"
              className={classes.ListItemText__dateTime}
            >
              {dateTime}
            </Typography>
          )}
        />
        {children}
      </div>
    </ListItem>
  );
}

MessageDateTime.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  isCurrentUserMessage: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  dateTime: PropTypes.instanceOf(Object).isRequired,
};

const styles = (theme) => ({
  ListItemText: {
    backgroundColor: theme.palette.background.default,
    zIndex: 1000,
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    '&:first-child': {
      paddingLeft: theme.spacing.unit * 2,
    },
  },
  reverse: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
  },
  ListItem: {
    alignItems: 'start',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  textContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  ListItemText__dateTime: {
    fontSize: theme.typography.pxToRem(11),
  },
  sticky: {
    position: 'sticky',
    top: 0,
  },
});

export default withStyles(styles)(MessageDateTime);
