import React from 'react';
import PropTypes from 'prop-types';

// containers
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import MessagesList from 'Containers/MessagesList';
import MessageInput from 'Containers/MessageInput';

// @material-ui

function MainContent(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <Grid item xs={12} sm={11} md={10} lg={9} className={classes.grid}>
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <MessagesList />
          <MessageInput />
        </div>
      </Grid>
    </main>
  );
}

MainContent.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

const styles = (theme) => ({
  main: {
    flexGrow: 1,
  },
  grid: {
    margin: '0 auto',
    height: '100%',
  },
  appBarSpacer: { marginTop: theme.spacing.unit, ...theme.mixins.toolbar },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default withStyles(styles)(MainContent);
