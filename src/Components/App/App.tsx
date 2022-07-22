import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

import { MessengerScreen } from 'Components/MessengerScreen';
import { SignIn } from 'Components/SignIn';
import { useIsLoggedIn } from 'Hooks';

export const App = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Box height="100vh" display="flex">
      <CssBaseline />
      {isLoggedIn ? <MessengerScreen /> : <SignIn />}
    </Box>
  );
};
