import React from "react";
import { ValidatorForm } from "react-material-ui-form-validator";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormHelperText from "@material-ui/core/FormHelperText";

// icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";

import AvatarSelector from "./AvatarSelector";
import UserPasswordField from "./UserPasswordField";
import UserNameField from "./UserNameField";
import UserEmailField from "./UserEmailField";

const SIGN_IN = "SIGN_IN";
const REGISTER = "REGISTER";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      remember: false,
      errorMessage: undefined,
      avatar: undefined,
      variant: SIGN_IN
    };
    this.avatarFileInput = React.createRef();
  }

  handleSubmit = () => {
    const { variant } = this.state;

    if (variant === SIGN_IN) {
      this.signIn();
    } else if (variant === REGISTER) {
      this.register();
    }
  };

  signIn = () => {
    const { onSignIn } = this.props;
    const { email, password, remember } = this.state;
    onSignIn(email, password, remember);
  };

  register = () => {
    const avatar = this.avatarFileInput.current.files[0];

    const { onRegister } = this.props;
    const { email, password, name, remember } = this.state;
    onRegister(email, password, name, avatar, remember);
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleTabChange = (event, value) => {
    this.setState({ variant: value });
  };

  render() {
    const { loginError, registerError, classes } = this.props;
    const { email, password, name, remember, variant } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <AppBar position="static">
            <Tabs
              value={variant}
              onChange={this.handleTabChange}
              variant="fullWidth"
              classes={{ indicator: classes.tabsIndicator }}
            >
              <Tab value={SIGN_IN} label="Sign in" />
              <Tab value={REGISTER} label="Register" />
            </Tabs>
          </AppBar>
          <div className={classes.container}>
            <Avatar className={classes.icon}>
              {variant === SIGN_IN && <LockOutlinedIcon />}
              {variant === REGISTER && <PersonAddIcon />}
            </Avatar>
            <Typography component="h1" variant="h5">
              {variant === SIGN_IN && "Sign in"}
              {variant === REGISTER && "Register"}
            </Typography>
            <ValidatorForm
              className={classes.form}
              onSubmit={this.handleSubmit}
            >
              {loginError && variant === SIGN_IN && (
                <FormHelperText error>{loginError}</FormHelperText>
              )}
              {registerError && variant === REGISTER && (
                <FormHelperText error>{registerError}</FormHelperText>
              )}
              {variant === REGISTER && (
                <>
                  <AvatarSelector avatarFileInput={this.avatarFileInput} />
                  <UserNameField
                    value={name}
                    onChange={this.handleInputChange}
                  />
                </>
              )}
              <UserEmailField value={email} onChange={this.handleInputChange} />
              <UserPasswordField
                value={password}
                onChange={this.handleInputChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    name="remember"
                    checked={remember}
                    color="primary"
                    onChange={this.handleInputChange}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {variant === SIGN_IN && "Sign in"}
                {variant === REGISTER && "Register"}
              </Button>
            </ValidatorForm>
          </div>
        </Paper>
      </main>
    );
  }
}

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  paper: {
    marginTop: theme.spacing.unit * 8
  },
  icon: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  tabsIndicator: {
    backgroundColor: "#fff"
  }
});

export default withStyles(styles)(SignIn);
