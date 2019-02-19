import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  ListItemText: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: 0
  }
});

function Message(props) {
  const { message, classes } = props;

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={message.author} src={message.avatar} />
      </ListItemAvatar>
      <ListItemText
        className={classes.ListItemText}
        primary={message.text}
        secondary={new Date(message.dateTime).toLocaleString()}
      />
    </ListItem>
  );
}

export default withStyles(styles)(Message);
