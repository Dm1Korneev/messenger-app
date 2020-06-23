import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import * as Yup from 'yup';

import AvatarSelector from 'Components/AvatarSelector';
import UserEmailField from 'Components/UserEmailField';
import UserNameField from 'Components/UserNameField';
import UserPasswordField from 'Components/UserPasswordField';
import {
  email as emailValidation,
  name as nameValidation,
  password as passwordValidation,
} from 'Common/validation';

const SIGN_IN = 'SIGN_IN';
const REGISTER = 'REGISTER';

const validationSchemaSignIn = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

const validationSchemaRegister = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  name: nameValidation,
});

const SignIn = ({
  loginError, registerError, onSignIn, onRegister, isLoging,
}) => {
  const [variant, setVariant] = useState(SIGN_IN);

  const avatarFileInput = useRef();

  const signIn = (values) => {
    const { email, password, remember } = values;
    onSignIn({ email, password, remember });
  };

  const register = (values) => {
    const avatar = avatarFileInput.current.files[0];

    const {
      email, password, name, remember,
    } = values;
    onRegister({
      email, password, name, avatar, remember,
    });
  };

  const onSubmit = (values, { setSubmitting }) => {
    if (variant === SIGN_IN) {
      signIn(values);
    } else if (variant === REGISTER) {
      register(values);
    }
    setSubmitting(false);
  };

  const handleTabChange = (event, value) => {
    setVariant(value);
  };

  let validationSchema;
  let title;
  if (variant === SIGN_IN) {
    validationSchema = validationSchemaSignIn;
    title = 'Sign in';
  } else if (variant === REGISTER) {
    validationSchema = validationSchemaRegister;
    title = 'Register';
  }

  return (
    <Box pt={8} px={2} width="100%" alignItems="center" display="flex" flexDirection="column">
      <Paper elevation={2}>
        <Box maxWidth="30rem">
          <AppBar position="static">
            <Tabs
              value={variant}
              onChange={handleTabChange}
              variant="fullWidth"
              disabled={isLoging}
            >
              <Tab disabled={isLoging} value={SIGN_IN} label="Sign in" />
              <Tab disabled={isLoging} value={REGISTER} label="Register" />
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
              {title}
            </Typography>
            <Box mt={1}>
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  password: '',
                  remember: false,
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ submitForm }) => (
                  <Form>
                    {loginError && variant === SIGN_IN && (
                    <FormHelperText error>{loginError}</FormHelperText>
                    )}
                    {registerError && variant === REGISTER && (
                    <FormHelperText error>{registerError}</FormHelperText>
                    )}
                    {variant === REGISTER && (
                    <>
                      <AvatarSelector disabled={isLoging} avatarFileInput={avatarFileInput} />
                      <Field disabled={isLoging} component={UserNameField} name="name" />
                    </>
                    )}
                    <Field disabled={isLoging} component={UserEmailField} name="email" />
                    <Field disabled={isLoging} component={UserPasswordField} name="password" />
                    <Field
                      disabled={isLoging}
                      component={CheckboxWithLabel}
                      name="remember"
                      Label={{ label: 'Remember me' }}
                      color="primary"
                      type="checkbox"
                    />
                    {isLoging && <LinearProgress />}
                    <Box mt={3}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoging}
                        onClick={submitForm}
                      >
                        {title}
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

SignIn.defaultProps = {
  loginError: null,
  registerError: null,
  isLoging: false,
};
SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  isLoging: PropTypes.bool,
  loginError: PropTypes.string,
  registerError: PropTypes.string,
};

export default SignIn;
