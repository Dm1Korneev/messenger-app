import React, { Component } from "react";
import "./App.css";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import { getMessages, sendMessage } from "../messengerAPI";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.theme = createMuiTheme({
      palette: {
        primary: blue
      },
      typography: {
        useNextVariants: true
      }
    });
  }

  componentDidMount() {
    this.loadMessages();
  }

  loadMessages = () => {
    getMessages(messages => this.setState({ messages: messages }));
  };

  onSendMessage = messageText => {
    sendMessage(messageText);
    this.loadMessages();
  };

  render() {
    const { messages } = this.state;

    return (
      <div className="App">
        <div className="App__content">
          <MuiThemeProvider theme={this.theme}>
            <MessagesList messages={messages} />
            <MessageInput onSendMessage={this.onSendMessage} />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default App;
