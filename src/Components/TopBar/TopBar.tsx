import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import CreateIcon from '@material-ui/icons/Create';
import { useDispatch, useSelector } from 'react-redux';

import * as Actions from 'Redux/actions';
import { currentUserSelector, drawerIsOpenSelector } from 'Selectors/session';
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

export const TopBar = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(currentUserSelector);
  const drawerIsOpen = useSelector(drawerIsOpenSelector);

  const classes = useStyles();

  const onDrawerOpen = () => dispatch(Actions.setDrawerIsOpen(true));
  const onLogout = () => dispatch(Actions.logOut());
  const openModifyUserDialog = () => dispatch(Actions.setModifyUserDialogIsOpen(true));

  const userName = currentUser?.name;

  return (
    <AppBar
      position="fixed"
      className={clsx(
        classes.appBar,
        {
          [classes.appBarShift]: drawerIsOpen,
        },
      )}
    >
      <Toolbar>
        <Box mr={2} hidden={drawerIsOpen}>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="Open drawer"
            onClick={onDrawerOpen}
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
};
