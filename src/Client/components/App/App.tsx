import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { useIsLoggedIn } from 'Client/hooks';

import { MessengerScreen } from '../MessengerScreen';
import { SignIn } from '../SignIn';

export const App = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Box display="flex" height="100vh">
      <CssBaseline />
      {isLoggedIn ? <MessengerScreen /> : <SignIn />}
    </Box>
  );
};
