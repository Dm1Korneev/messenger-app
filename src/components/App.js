import React, { Component } from "react";

// components
import SignIn from "../containers/SignIn";
import TopBar from "../containers/TopBar";
import SideBar from "../containers/SideBar";
import AddChatDialog from "../containers/AddChatDialog";
import MainContent from "./MainContent";

// @material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

// common
import { getMessages, sendMessage, createChat } from "../common/messengerAPI";

class App extends Component {
  constructor(props) {
    super(props);

    this.theme = createMuiTheme({
      palette: {
        primary: blue
      },
      typography: {
        useNextVariants: true
      },
      overrides: {
        MuiListItem: {
          button: {
            "&$selected": {
              backgroundColor: blue[100]
            },
            "&$selected:focus": {
              backgroundColor: blue[100]
            },
            "&:focus": {
              backgroundColor: "transparent"
            },
            "&$selected:hover": {
              backgroundColor: blue[300]
            },
            "&:hover": {
              backgroundColor: blue[300]
            },
            "&:hover:focus": {
              backgroundColor: blue[300]
            }
          }
        }
      }
    });
  }

  componentDidMount() {
    const { loginFromStore } = this.props;
    loginFromStore();
  }

  openAddChatDialog = () => {
    this.setState({ addChatDialogOpen: true });
  };

  closeAddChatDialog = () => {
    this.setState({ addChatDialogOpen: false });
  };

  onAddChat = (title, users) => {
    const { token } = this.state;
    createChat(token, title, users, chat => {
      this.setState({ addChatDialogOpen: false });
      this.loadChats();
    });
  };

  onDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  onDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  changeActiveChat = chatId => {
    this.setState({ activeChat: chatId, messages: [] });
    this.loadMessages(chatId);
  };

  loadMessages = chatId => {
    if (!chatId) {
      return;
    }

    const { token } = this.state;

    getMessages(token, chatId, ({ messages, users }) => {
      let newUsers = this.state.users;
      users.forEach(element => {
        newUsers[element._id] = element;
      });

      this.setState({
        messages,
        usersList: Object.values(newUsers),
        users: newUsers
      });
    });
  };

  onSendMessage = messageText => {
    const { token, activeChat } = this.state;

    sendMessage(token, activeChat, messageText, message => {
      const { messages } = this.state;
      this.setState({
        messages: [...messages, message]
      });
    });
    this.loadMessages(activeChat);
  };

  render() {
    const { classes, addChatDialogIsOpen, isLoggedIn } = this.props;

    let result;
    if (!isLoggedIn) {
      result = <SignIn />;
    } else {
      result = (
        <>
          <CssBaseline />
          <TopBar />
          <SideBar />
          <MainContent />
          {addChatDialogIsOpen && <AddChatDialog />}
        </>
      );
    }

    return (
      <main className={classes.root}>
        <MuiThemeProvider theme={this.theme}>{result}</MuiThemeProvider>
      </main>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    height: "100vh"
  }
});

export default withStyles(styles)(App);
