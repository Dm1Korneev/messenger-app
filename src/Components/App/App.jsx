import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

import MessengerScreen from 'Components/MessengerScreen';
import SignIn from 'Components/SignIn';

const App = ({
  isLoggedIn,
  loginFromStore,
}) => {
  useEffect(() => {
    loginFromStore();
  }, [loginFromStore]);

  let result;
  if (!isLoggedIn) {
    result = <SignIn />;
  } else {
    result = (
      <MessengerScreen />
    );
  }

  return (
    <Box height="100vh" display="flex">
      <CssBaseline />
      {result}
    </Box>
  );
};

App.propTypes = {
  loginFromStore: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default App;
