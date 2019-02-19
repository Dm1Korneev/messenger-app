import React, { Component } from "react";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import withStyles from "@material-ui/core/styles/withStyles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import { getMessages, sendMessage } from "../messengerAPI";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  layout: {
    height: "100vh"
  },
  grid: {
    margin: "0 auto",
    height: "100%",
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
  }
});

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
    const { classes } = this.props;
    const { messages } = this.state;

    return (
      <>
        <main className={classes.layout}>
          <MuiThemeProvider theme={this.theme}>
            <Grid item xs={12} sm={11} md={9} lg={7} className={classes.grid}>
              <Paper className={classes.content}>
                <MessagesList messages={messages} />
                <MessageInput onSendMessage={this.onSendMessage} />
              </Paper>
            </Grid>
          </MuiThemeProvider>
        </main>
      </>
    );
  }
}

export default withStyles(styles)(App);
