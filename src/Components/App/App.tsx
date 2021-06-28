import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';

import { loginFromStore } from 'Redux/actions';
import { isLoggedInSelector } from 'Selectors/session';
import MessengerScreen from 'Components/MessengerScreen';
import SignIn from 'Components/SignIn';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginFromStore());
  }, [dispatch]);

  const isLoggedIn = useSelector(isLoggedInSelector);

  return (
    <Box height="100vh" display="flex">
      <CssBaseline />
      {isLoggedIn ? <MessengerScreen /> : <SignIn />}
    </Box>
  );
};

export default App;
