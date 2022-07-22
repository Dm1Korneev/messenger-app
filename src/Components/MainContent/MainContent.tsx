import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { MessageInput } from 'Components/MessageInput';
import { MessagesList } from 'Components/MessagesList';

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: '0 auto',
    height: '100%',
  },
  appBarSpacer: {
    marginTop: theme.spacing(1),
    ...theme.mixins.toolbar,
  },
}));

type MainContentProps = {
  activeChatId?: string
}

export const MainContent = ({ activeChatId }: MainContentProps) => {
  const classes = useStyles();

  return (
    <Box width="100%">
      <Grid item xs={12} sm={11} md={10} lg={9} className={classes.grid}>
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
          <Box className={classes.appBarSpacer} />
          <MessagesList activeChatId={activeChatId} />
          {activeChatId && <MessageInput activeChatId={activeChatId} />}
        </Box>
      </Grid>
    </Box>
  );
};
