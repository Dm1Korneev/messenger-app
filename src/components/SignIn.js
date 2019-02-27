import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
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
  avatar: {
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
      variant: SIGN_IN
    };
  }

  handleSubmit = event => {
    const { onSignIn, onRegister } = this.props;
    const { variant } = this.state;

    event.preventDefault();
    if (variant === SIGN_IN) {
      onSignIn(this.state);
    } else if (variant === REGISTER) {
      onRegister(this.state);
    }
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
    const { classes } = this.props;
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
            <Avatar className={classes.avatar}>
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
              {variant === REGISTER && (
                <TextValidator
                  margin="normal"
                  label="Name *"
                  fullWidth
                  onChange={this.handleInputChange}
                  name="name"
                  id="name"
                  autoComplete="name"
                  color="primary"
                  value={name}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              )}
              <TextValidator
                margin="normal"
                label="Email Address *"
                fullWidth
                onChange={this.handleInputChange}
                name="email"
                id="email"
                autoComplete="email"
                color="primary"
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />
              <TextValidator
                margin="normal"
                label="Password *"
                fullWidth
                onChange={this.handleInputChange}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="primary"
                value={password}
                validators={["required", "minStringLength:6"]}
                errorMessages={[
                  "this field is required",
                  "minimum length 6 symbols"
                ]}
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

export default withStyles(styles)(SignIn);
