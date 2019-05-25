import React from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import withStyles from "@material-ui/core/styles/withStyles";

function UsersAvatar(props) {
  const { avatar, author, classes, size } = props;

  const style = size && { width: size, height: size };

  return (
    <ListItemAvatar className={classes.ListItemAvatar} style={style}>
      <Avatar alt={author} src={avatar}>
        {!avatar && <AccountIcon style={{ fontSize: 40 }} />}
      </Avatar>
    </ListItemAvatar>
  );
}

const styles = theme => ({
  ListItemAvatar: {
    borderRadius: theme.spacing.unit / 2
  }
});

export default withStyles(styles)(UsersAvatar);
