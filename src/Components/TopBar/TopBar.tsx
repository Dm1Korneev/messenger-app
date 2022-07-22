import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { DRAWER_WIDTH } from 'Constants';
import { useCurrentUser, useLogout } from 'Hooks';

type TopBarProps = {
  modifyUserDialogOnClick: () => void
  onDrawerOpen: () => void
  isDrawerOpen: boolean
}

export const TopBar = ({ modifyUserDialogOnClick, onDrawerOpen, isDrawerOpen }: TopBarProps) => {
  const { data: currentUser } = useCurrentUser();

  const logout = useLogout();

  const userName = currentUser?.name;

  return (
    <AppBar
      position="fixed"
      sx={(theme) => {
        const openStyles = isDrawerOpen ? {
          marginLeft: DRAWER_WIDTH,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        } : {};

        return {
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...openStyles,
        };
      }}
    >
      <Toolbar>
        <Box hidden={isDrawerOpen} mr={2}>
          <IconButton
            aria-label="Open drawer"
            color="inherit"
            edge="start"
            onClick={onDrawerOpen}
            size="large"
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box flexGrow="1">
          <Typography
            color="inherit"
            variant="h6"
          >
            {userName}
            <IconButton color="inherit" onClick={modifyUserDialogOnClick} size="large">
              <CreateIcon />
            </IconButton>
          </Typography>
        </Box>
        <Button color="inherit" onClick={logout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
