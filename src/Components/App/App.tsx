import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { MessengerScreen } from 'Components/MessengerScreen';
import { SignIn } from 'Components/SignIn';
import { useIsLoggedIn } from 'Hooks';

export const App = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Box display="flex" height="100vh">
      <CssBaseline />
      {isLoggedIn ? <MessengerScreen /> : <SignIn />}
    </Box>
  );
};
