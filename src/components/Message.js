import React from "react";
import "./Message.css";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

function Message(props) {
  const { message } = props;

  return (
    <div className="Message">
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={message.author} src={message.avatar} />
        </ListItemAvatar>
        <ListItemText primary={message.text} />
      </ListItem>
    </div>
  );
}

export default Message;
