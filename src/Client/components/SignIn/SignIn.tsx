import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAddOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import {
  Field, Form, Formik, FormikHelpers,
} from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import { useRef, useState } from 'react';
import * as Yup from 'yup';

import {
  email as emailValidation,
  name as nameValidation,
  password as passwordValidation,
} from 'Client/common/validation';
import { useLogin, useRegister } from 'Client/hooks';

import { AvatarSelector } from '../AvatarSelector';
import { UserEmailField } from '../UserEmailField';
import { UserNameField } from '../UserNameField';
import { UserPasswordField } from '../UserPasswordField';

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
  const { mutate: login, isLoading: isLogin, error: loginError } = useLogin();
  const { mutate: register, isLoading: isRegister, error: registerError } = useRegister();

  const isLogging = isLogin || isRegister;

  const [variant, setVariant] = useState<DialogTabs>(DialogTabs.SIGN_IN);

  const avatarFileInput = useRef<HTMLInputElement>(null);

  const onSignIn = (values: FromValues) => {
    const { email, password, remember } = values;
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
    <Box alignItems="center" display="flex" flexDirection="column" pt={8} px={2} width="100%">
      <Paper elevation={2}>
        <Box maxWidth="30rem">
          <AppBar position="static">
            <Tabs
              disabled={isLogging}
              onChange={(event, value) => setVariant(value)}
              textColor="inherit"
              value={variant}
              variant="fullWidth"
            >
              <Tab disabled={isLogging} label="Sign in" value={DialogTabs.SIGN_IN} />
              <Tab disabled={isLogging} label="Register" value={DialogTabs.REGISTER} />
            </Tabs>
          </AppBar>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
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
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ submitForm }) => (
                  <Form>
                    {loginError && variant === DialogTabs.SIGN_IN ? (
                      <FormHelperText error>{loginError.message}</FormHelperText>
                    ) : null}
                    {registerError && variant === DialogTabs.REGISTER ? (
                      <FormHelperText error>{registerError.message}</FormHelperText>
                    ) : null}
                    {variant === DialogTabs.REGISTER && (
                      <>
                        <AvatarSelector avatarFileInput={avatarFileInput} disabled={isLogging} />
                        <Field component={UserNameField} disabled={isLogging} name="name" />
                      </>
                    )}
                    <Field component={UserEmailField} disabled={isLogging} name="email" />
                    <Field component={UserPasswordField} disabled={isLogging} name="password" />
                    <Field
                      color="primary"
                      component={CheckboxWithLabel}
                      disabled={isLogging}
                      Label={{ label: 'Remember me' }}
                      name="remember"
                      type="checkbox"
                    />
                    {isLogging && <LinearProgress />}
                    <Box mt={3}>
                      <Button
                        color="primary"
                        disabled={isLogging}
                        fullWidth
                        onClick={submitForm}
                        type="submit"
                        variant="contained"
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
