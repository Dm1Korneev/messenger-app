import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { DRAWER_WIDTH } from 'Constants';
import { useCurrentUser } from 'Hooks';
import * as Actions from 'Redux/actions';
import { drawerIsOpenSelector } from 'Selectors/session';

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

type TopBarProps = {
  modifyUserDialogOnClick: () => void
}

export const TopBar = ({ modifyUserDialogOnClick }: TopBarProps) => {
  const dispatch = useDispatch();

  const { data: currentUser } = useCurrentUser();
  const drawerIsOpen = useSelector(drawerIsOpenSelector);

  const classes = useStyles();

  const onDrawerOpen = () => dispatch(Actions.setDrawerIsOpen(true));
  const onLogout = () => dispatch(Actions.logOut());

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
            <IconButton color="inherit" onClick={modifyUserDialogOnClick}>
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
