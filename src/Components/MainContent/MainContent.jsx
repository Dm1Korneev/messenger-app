import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import MessageInput from 'Components/MessageInput';
import MessagesList from 'Components/MessagesList';

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: '0 auto',
    height: '100%',
  },
  appBarSpacer: { marginTop: theme.spacing(1), ...theme.mixins.toolbar },
}));

function MainContent() {
  const classes = useStyles();

  return (
    <Box>
      <Grid item xs={12} sm={11} md={10} lg={9} className={classes.grid}>
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
          <Box className={classes.appBarSpacer} />
          <MessagesList />
          <MessageInput />
        </Box>
      </Grid>
    </Box>
  );
}

export default MainContent;
