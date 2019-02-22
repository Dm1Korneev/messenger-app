import React, { Component } from "react";

// components
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import SignIn from "./SignIn";

// @material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// common
import { getMessages, sendMessage } from "../common/messengerAPI";
import {
  isLoggedIn,
  getToken,
  currentUser,
  login,
  register,
  saveToken,
  logout
} from "../common/authentication";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      token: getToken(),
      currentUser: currentUser()
    };

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
    const { token } = this.state;
    if (isLoggedIn(token)) {
      this.loadMessages();
    }
  }

  loadMessages = () => {
    const { token } = this.state;

    getMessages(token, messages => this.setState({ messages: messages }));
  };

  onSendMessage = messageText => {
    const { token } = this.state;

    sendMessage(token, messageText);
    this.loadMessages();
  };

  handleClickLogout = () => {
    logout();
    this.setState({
      token: undefined
    });
  };

  onSignIn = ({ email, password, remember }) => {
    login(email, password, result => {
      const { token } = result;

      if (remember) {
        saveToken(token);
      }
      this.setState({
        token: token
      });
      this.loadMessages();
    });
  };

  onRegister = ({ email, password, name, remember }) => {
    register(email, password, name, result => {
      const { token } = result;

      if (remember) {
        saveToken(token);
      }
      this.setState({
        token: token
      });
      this.loadMessages();
    });
  };

  render() {
    const { classes } = this.props;
    const { messages, token } = this.state;
    const user = currentUser(token);

    let result;
    if (!isLoggedIn(token)) {
      result = <SignIn onSignIn={this.onSignIn} onRegister={this.onRegister} />;
    } else {
      result = (
        <>
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                {user.name}
              </Typography>
              <Button color="inherit" onClick={this.handleClickLogout}>
                logout
              </Button>
            </Toolbar>
          </AppBar>
          <Grid item xs={12} sm={11} md={9} lg={7} className={classes.grid}>
            <Paper className={classes.content}>
              <MessagesList messages={messages} />
              <MessageInput onSendMessage={this.onSendMessage} />
            </Paper>
          </Grid>
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
    height: "100vh"
  },
  grid: {
    margin: "0 auto",
    height: "calc(100% - 48px)",
    padding: theme.spacing.unit * 2
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

export default withStyles(styles)(App);
