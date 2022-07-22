import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { MessengerScreen } from 'Components/MessengerScreen';
import { SignIn } from 'Components/SignIn';
import { useIsLoggedIn } from 'Hooks';
import { loginFromStore } from 'Redux/actions';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginFromStore());
  }, [dispatch]);

  const isLoggedIn = useIsLoggedIn();

  return (
    <Box height="100vh" display="flex">
      <CssBaseline />
      {isLoggedIn ? <MessengerScreen /> : <SignIn />}
    </Box>
  );
};
