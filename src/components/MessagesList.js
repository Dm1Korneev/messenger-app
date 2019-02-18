import React from "react";
import Message from "./Message";
import List from "@material-ui/core/List";

function MessagesList(props) {
  const { messages } = props;
  return (
    <div className="MessagesList">
      <List>
        {messages.map(value => (
          <Message key={value._id} message={value} />
        ))}
      </List>
    </div>
  );
}

export default MessagesList;
