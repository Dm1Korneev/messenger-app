import React from "react";
import PropTypes from "prop-types";

// material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";

function UsersAvatar(props) {
  const { classes, avatar, author, size } = props;

  const style = size && { width: size, height: size };

  return (
    <ListItemAvatar className={classes.ListItemAvatar} style={style}>
      <Avatar alt={author} src={avatar}>
        {!avatar && <AccountIcon style={{ fontSize: 40 }} />}
      </Avatar>
    </ListItemAvatar>
  );
}

UsersAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  avatar: PropTypes.string,
  author: PropTypes.string,
  size: PropTypes.number
};

const styles = theme => ({
  ListItemAvatar: {
    borderRadius: theme.spacing.unit / 2
  }
});

export default withStyles(styles)(UsersAvatar);
