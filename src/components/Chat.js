import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import UsersAvatar from "./UsersAvatar";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";

function Chat(props) {
  const { selected, chatOnClick, chatModifyOnClick, classes, chat } = props;
  const { title, avatar, _id } = chat;

  return (
    <ListItem
      button
      selected={selected}
      onClick={() => {
        chatOnClick(_id);
      }}
      className={classes.listItem}
    >
      <UsersAvatar author={title} avatar={avatar} />
      <ListItemText primary={title} />
      <IconButton
        onClick={() => {
          chatModifyOnClick(_id);
        }}
        classes={{
          root: classes.modifyButton
        }}
      >
        <CreateIcon />
      </IconButton>
    </ListItem>
  );
}

const styles = theme => ({
  listItem: {
    "&:hover": {
      "& button": {
        visibility: "visible"
      }
    }
  },
  modifyButton: {
    visibility: "hidden",
    color: "#FFF"
  }
});

export default withStyles(styles)(Chat);
