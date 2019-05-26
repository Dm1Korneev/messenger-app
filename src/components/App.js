import React, { Component } from "react";
import PropTypes from "prop-types";

// components
import SignIn from "../containers/SignIn";
import TopBar from "../containers/TopBar";
import SideBar from "../containers/SideBar";
import ChatDialog from "../containers/ChatDialog";
import UserModifyDialog from "../containers/UserModifyDialog";
import MainContent from "./MainContent";

// @material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

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

  render() {
    const {
      classes,
      chatDialogIsOpen,
      userModifyDialogIsOpen,
      isLoggedIn
    } = this.props;

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
          {chatDialogIsOpen && <ChatDialog />}
          {userModifyDialogIsOpen && <UserModifyDialog />}
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

App.propTypes = {
  classes: PropTypes.object.isRequired,
  loginFromStore: PropTypes.func.isRequired,
  chatDialogIsOpen: PropTypes.bool.isRequired,
  userModifyDialogIsOpen: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

const styles = theme => ({
  root: {
    display: "flex",
    height: "100vh"
  }
});

export default withStyles(styles)(App);
