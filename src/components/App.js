import React, { Component } from "react";

// components
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import SignIn from "./SignIn";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import AddChatDialog from "./AddChatDialog";

// @material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

// common
import {
  getMessages,
  sendMessage,
  getChats,
  createChat
} from "../common/messengerAPI";
import {
  isLoggedIn,
  getToken,
  currentUser,
  saveToken,
  logout
} from "../common/authentication";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      chats: [],
      usersList: [],
      users: {},
      activeChat: undefined,
      token: getToken(),
      drawerOpen: true,
      addChatDialogOpen: false
    };

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
            }
          }
        }
      }
    });
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

  componentDidMount() {
    const { token } = this.state;
    if (isLoggedIn(token)) {
      const user = currentUser(token);

      this.setState({
        users: { [user._id]: user },
        usersList: [user]
      });
      this.loadChats();
    }
  }

  loadChats = () => {
    const { token } = this.state;

    getChats(token, chats => {
      let activeChat = undefined;
      if (chats.length) {
        activeChat = chats[0]._id;
      }
      this.setState({ chats, activeChat });
      this.loadMessages(activeChat);
    });
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

  onLogout = () => {
    logout();
    this.setState({
      token: undefined
    });
  };

  onSignIn = (token, remember) => {
    const user = currentUser(token);

    if (remember) {
      saveToken(token);
    }
    this.setState({
      token: token,
      users: { [user._id]: user },
      usersList: [user]
    });
    this.loadChats();
  };

  render() {
    const { classes } = this.props;
    const {
      chats,
      messages,
      users,
      token,
      drawerOpen,
      activeChat,
      addChatDialogOpen,
      usersList
    } = this.state;
    const user = currentUser(token);

    let result;
    if (!isLoggedIn(token)) {
      result = <SignIn onSignIn={this.onSignIn} />;
    } else {
      result = (
        <>
          <CssBaseline />
          <TopBar
            drawerOpen={drawerOpen}
            userName={user.name}
            onLogout={this.onLogout}
            onDriwerOpen={this.onDrawerOpen}
          />
          <SideBar
            chats={chats}
            activeChat={activeChat}
            drawerOpen={drawerOpen}
            onDrawerClose={this.onDrawerClose}
            changeActiveChat={this.changeActiveChat}
            openAddChatDialog={this.openAddChatDialog}
          />

          <main className={classes.main}>
            <Grid item xs={12} sm={11} md={10} lg={9} className={classes.grid}>
              <div className={classes.content}>
                <div className={classes.appBarSpacer} />
                <MessagesList messages={messages} user={user} users={users} />
                <MessageInput onSendMessage={this.onSendMessage} />
              </div>
            </Grid>
          </main>
          {addChatDialogOpen && (
            <AddChatDialog
              closeAddChatDialog={this.closeAddChatDialog}
              onAddChat={this.onAddChat}
              token={token}
              usersList={usersList}
            />
          )}
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
  },
  main: {
    flexGrow: 1
  },
  grid: {
    margin: "0 auto",
    height: "100%"
  },
  appBarSpacer: { marginTop: theme.spacing.unit, ...theme.mixins.toolbar },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

export default withStyles(styles)(App);
