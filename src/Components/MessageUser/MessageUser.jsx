import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import UsersAvatar from 'Components/UsersAvatar';

function MessageUser(props) {
  const {
    isCurrentUserMessage, author, avatar, children, classes,
  } = props;

  const ListItemTextClass = classNames(
    classes.ListItemText,
    isCurrentUserMessage && classes.reverse,
  );

  const ListItemClass = classNames(
    classes.ListItem,
    isCurrentUserMessage && classes.reverse,
  );

  return (
    <ListItem className={ListItemClass}>
      <div className={classes.sticky}>
        <UsersAvatar author={author} avatar={avatar} />
      </div>
      <div className={classes.textContent}>
        <ListItemText
          className={classNames(ListItemTextClass, classes.sticky)}
          primary={(
            <Typography
              component="span"
              className={classes.ListItemText__author}
            >
              {author}
            </Typography>
)}
        />
        {children}
      </div>
    </ListItem>
  );
}

MessageUser.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  isCurrentUserMessage: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const styles = (theme) => ({
  ListItemText: {
    backgroundColor: theme.palette.background.default,
    zIndex: 999,
    display: 'flex',
    justifyContent: 'space-between',
    '&:first-child': {
      paddingLeft: theme.spacing.unit * 2,
    },
  },
  ListItemText_reverse: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
  ListItem: {
    alignItems: 'start',
    paddingTop: theme.spacing.unit,
    paddingBottom: 0,
    paddingLeft: theme.spacing.unit * 2,
  },
  textContent: {
    flexGrow: 1,
  },
  ListItemText__author: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700,
  },
  sticky: {
    position: 'sticky',
    top: 0,
  },
});

export default withStyles(styles)(MessageUser);

