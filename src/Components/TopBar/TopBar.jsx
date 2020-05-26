import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import CreateIcon from '@material-ui/icons/Create';

import { DRAWER_WIDTH } from 'Constants';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
}));

function TopBar(props) {
  const classes = useStyles();

  const {
    drawerIsOpen,
    user,
    onLogout,
    onDriwerOpen,
    openModifyUserDialog,
  } = props;
  const userName = user && user.name;

  return (
    <AppBar
      position="fixed"
      className={classNames(
        classes.appBar,
        drawerIsOpen && classes.appBarShift,
      )}
    >
      <Toolbar>
        <Box mr={2} hidden={drawerIsOpen}>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="Open drawer"
            onClick={onDriwerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box flexGrow="1">
          <Typography
            variant="h6"
            color="inherit"
          >
            {userName}
            <IconButton color="inherit" onClick={openModifyUserDialog}>
              <CreateIcon />
            </IconButton>
          </Typography>
        </Box>
        <Button color="inherit" onClick={onLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  drawerIsOpen: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  onDriwerOpen: PropTypes.func.isRequired,
  openModifyUserDialog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default TopBar;

