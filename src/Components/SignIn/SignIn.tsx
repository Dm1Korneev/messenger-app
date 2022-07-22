import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import {
  Field, Form, Formik, FormikHelpers,
} from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import {
  email as emailValidation,
  name as nameValidation,
  password as passwordValidation,
} from 'Common/validation';
import { AvatarSelector } from 'Components/AvatarSelector';
import { UserEmailField } from 'Components/UserEmailField';
import { UserNameField } from 'Components/UserNameField';
import { UserPasswordField } from 'Components/UserPasswordField';
import { useLogin, useRegister } from 'Hooks';
import { signIn } from 'Redux/actions';

enum DialogTabs {
  SIGN_IN = 'SIGN_IN',
  REGISTER = 'REGISTER',
}

const validationSchemaSignIn = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

const validationSchemaRegister = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  name: nameValidation,
});

type FromValues = {
  name: string;
  email: string;
  password: string;
  remember: boolean;
}

export const SignIn = () => {
  const dispatch = useDispatch();

  const { mutate: login, isLoading: isLogin, error: loginError } = useLogin();
  const { mutate: register, isLoading: isRegister, error: registerError } = useRegister();

  const isLogging = isLogin || isRegister;

  const [variant, setVariant] = useState<DialogTabs>(DialogTabs.SIGN_IN);

  const avatarFileInput = useRef<HTMLInputElement>(null);

  const onSignIn = (values: FromValues) => {
    const { email, password, remember } = values;
    dispatch(signIn({ email, password, remember }));
    login({ email, password, saveToStore: remember });
  };

  const onRegister = (values: FromValues) => {
    const files = avatarFileInput?.current?.files;
    const avatar = files ? files[0] : undefined;

    const {
      email, password, name, remember,
    } = values;
    register({
      email, password, name, avatar, saveToStore: remember,
    });
  };

  const onSubmit = (values: FromValues, { setSubmitting }: FormikHelpers<FromValues>) => {
    if (variant === DialogTabs.SIGN_IN) {
      onSignIn(values);
    } else if (variant === DialogTabs.REGISTER) {
      onRegister(values);
    }
    setSubmitting(false);
  };

  let validationSchema;
  let title = '';
  if (variant === DialogTabs.SIGN_IN) {
    validationSchema = validationSchemaSignIn;
    title = 'Sign in';
  } else if (variant === DialogTabs.REGISTER) {
    validationSchema = validationSchemaRegister;
    title = 'Register';
  }

  const initialValues: FromValues = {
    name: '',
    email: '',
    password: '',
    remember: false,
  };

  return (
    <Box pt={8} px={2} width="100%" alignItems="center" display="flex" flexDirection="column">
      <Paper elevation={2}>
        <Box maxWidth="30rem">
          <AppBar position="static">
            <Tabs
              value={variant}
              onChange={(event, value) => setVariant(value)}
              variant="fullWidth"
              disabled={isLogging}
            >
              <Tab disabled={isLogging} value={DialogTabs.SIGN_IN} label="Sign in" />
              <Tab disabled={isLogging} value={DialogTabs.REGISTER} label="Register" />
            </Tabs>
          </AppBar>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={3}
          >
            <Box p={1}>
              {variant === DialogTabs.SIGN_IN && <LockOutlinedIcon color="primary" fontSize="large" />}
              {variant === DialogTabs.REGISTER && <PersonAddIcon color="primary" fontSize="large" />}
            </Box>
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
            <Box mt={1}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ submitForm }) => (
                  <Form>
                    {loginError && variant === DialogTabs.SIGN_IN && (
                      <FormHelperText error>{String(loginError)}</FormHelperText>
                    )}
                    {registerError && variant === DialogTabs.REGISTER && (
                      <FormHelperText error>{String(registerError)}</FormHelperText>
                    )}
                    {variant === DialogTabs.REGISTER && (
                      <>
                        <AvatarSelector disabled={isLogging} avatarFileInput={avatarFileInput} />
                        <Field disabled={isLogging} component={UserNameField} name="name" />
                      </>
                    )}
                    <Field disabled={isLogging} component={UserEmailField} name="email" />
                    <Field disabled={isLogging} component={UserPasswordField} name="password" />
                    <Field
                      disabled={isLogging}
                      component={CheckboxWithLabel}
                      name="remember"
                      Label={{ label: 'Remember me' }}
                      color="primary"
                      type="checkbox"
                    />
                    {isLogging && <LinearProgress />}
                    <Box mt={3}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLogging}
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
