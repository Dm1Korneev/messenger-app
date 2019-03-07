import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import MessagesList from "../containers/MessagesList";
import MessageInput from "../containers/MessageInput";
import Grid from "@material-ui/core/Grid";

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

const styles = theme => ({
  main: {
    flexGrow: 1
  },
  grid: {
    margin: "0 auto",
    height: "100%"
  },
  appBarSpacer: { marginTop: theme.spacing.unit, ...theme.mixins.toolbar },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

export default withStyles(styles)(MainContent);
