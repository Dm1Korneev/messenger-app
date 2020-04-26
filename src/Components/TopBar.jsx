import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import MenuIcon from '@material-ui/icons/Menu';
import CreateIcon from '@material-ui/icons/Create';

import { DRAWER_WIDTH } from 'Constants';

function TopBar(props) {
  const {
    drawerIsOpen,
    user,
    onLogout,
    onDriwerOpen,
    openModifyUserDialog,
    classes,
  } = props;
  const userName = user && user.name;

  return (
    <AppBar
      position="absolute"
      className={classNames(
        classes.appBar,
        drawerIsOpen && classes.appBarShift,
      )}
    >
      <Toolbar disableGutters={!drawerIsOpen} className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={onDriwerOpen}
          className={classNames(
            classes.menuButton,
            drawerIsOpen && classes.menuButtonHidden,
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {userName}
          <IconButton color="inherit" onClick={openModifyUserDialog}>
            <CreateIcon />
          </IconButton>
        </Typography>
        <Button color="inherit" onClick={onLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  drawerIsOpen: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  onDriwerOpen: PropTypes.func.isRequired,
  openModifyUserDialog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    borderBottom: '1px solid '.concat(theme.palette.divider),
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
});

export default withStyles(styles)(TopBar);
