import React from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormHelperText from '@material-ui/core/FormHelperText';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';

import AvatarSelector from 'Components/AvatarSelector';
import UserEmailField from 'Components/UserEmailField';
import UserNameField from 'Components/UserNameField';
import UserPasswordField from 'Components/UserPasswordField';

const SIGN_IN = 'SIGN_IN';
const REGISTER = 'REGISTER';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      remember: false,
      variant: SIGN_IN,
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
    onSignIn({ email, password, remember });
  };

  register = () => {
    const avatar = this.avatarFileInput.current.files[0];

    const { onRegister } = this.props;
    const {
      email, password, name, remember,
    } = this.state;
    onRegister({
      email, password, name, avatar, remember,
    });
  };

  handleInputChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  handleTabChange = (event, value) => {
    this.setState({ variant: value });
  };

  render() {
    const { loginError, registerError } = this.props;
    const {
      email, password, name, remember, variant,
    } = this.state;

    return (
      <Box pt={8} px={2} width="100%" alignItems="center" display="flex" flexDirection="column">
        <Paper elevation={2}>
          <Box width={{ all: 'auot', sm: '500px' }}>
            <AppBar position="static">
              <Tabs
                value={variant}
                onChange={this.handleTabChange}
                variant="fullWidth"
              >
                <Tab value={SIGN_IN} label="Sign in" />
                <Tab value={REGISTER} label="Register" />
              </Tabs>
            </AppBar>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={3}
            >
              <Box p={1}>
                {variant === SIGN_IN && <LockOutlinedIcon color="primary" fontSize="large" />}
                {variant === REGISTER && <PersonAddIcon color="primary" fontSize="large" />}
              </Box>
              <Typography component="h1" variant="h5">
                {variant === SIGN_IN && 'Sign in'}
                {variant === REGISTER && 'Register'}
              </Typography>
              <Box mt={1}>
                <ValidatorForm
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
                    control={(
                      <Checkbox
                        value="remember"
                        name="remember"
                        checked={remember}
                        color="primary"
                        onChange={this.handleInputChange}
                      />
)}
                    label="Remember me"
                  />
                  <Box mt={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      {variant === SIGN_IN && 'Sign in'}
                      {variant === REGISTER && 'Register'}
                    </Button>
                  </Box>
                </ValidatorForm>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }
}

SignIn.defaultProps = {
  loginError: null,
  registerError: null,
};
SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  loginError: PropTypes.string,
  registerError: PropTypes.string,
};

export default SignIn;
