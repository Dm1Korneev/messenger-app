import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import UsersAvatar from "./UsersAvatar";

function MessageUser(props) {
  const { isCurrentUserMessage, author, avatar, children, classes } = props;

  const ListItemTextClass = classNames(
    classes.ListItemText,
    isCurrentUserMessage && classes.reverse
  );

  const ListItemClass = classNames(
    classes.ListItem,
    isCurrentUserMessage && classes.reverse
  );

  return (
    <ListItem className={ListItemClass}>
      <div className={classes.sticky}>
        <UsersAvatar author={author} avatar={avatar} />
      </div>
      <div className={classes.textContent}>
        <ListItemText
          className={classNames(ListItemTextClass, classes.sticky)}
          primary={
            <Typography
              component="span"
              className={classes.ListItemText__author}
            >
              {author}
            </Typography>
          }
        />
        {children}
      </div>
    </ListItem>
  );
}

const styles = theme => ({
  ListItemText: {
    backgroundColor: theme.palette.background.default,
    zIndex: 999,
    display: "flex",
    justifyContent: "space-between",
    "&:first-child": {
      paddingLeft: theme.spacing.unit * 2
    }
  },
  ListItemText_reverse: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between"
  },
  reverse: {
    flexDirection: "row-reverse"
  },
  ListItem: {
    alignItems: "start",
    paddingTop: theme.spacing.unit,
    paddingBottom: 0,
    paddingLeft: theme.spacing.unit * 2
  },
  textContent: {
    flexGrow: 1
  },
  ListItemText__author: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700
  },
  sticky: {
    position: "sticky",
    top: 0
  }
});

export default withStyles(styles)(MessageUser);
