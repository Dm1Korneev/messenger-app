import React from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";

function UsersAvatar(props) {
  const { avatar, author, avatarHidden, classes } = props;

  return (
    <ListItemAvatar className={classes.ListItemAvatar}>
      <Avatar
        alt={author}
        src={avatar}
        className={avatarHidden ? classes.avatarHidden : ""}
      />
    </ListItemAvatar>
  );
}

const styles = theme => ({
  ListItemAvatar: {
    borderRadius: theme.spacing.unit / 2
  },
  avatarHidden: {
    visibility: "hidden"
  }
});

export default withStyles(styles)(UsersAvatar);
