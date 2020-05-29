import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import UserEmailField from 'Components/UserEmailField';
import AvatarSelector from 'Components/AvatarSelector';
import UserNameField from 'Components/UserNameField';
import UserPasswordField from 'Components/UserPasswordField';
import {
  email as emailValidation,
  name as nameValidation,
  password as passwordValidation,
} from 'Common/validation';

const validationSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  name: nameValidation,
});

const DEFAULT_PASSWORD = '**********';

const UserModifyDialog = ({
  user, error, closeUserModifyDialog, onSave,
}) => {
  const [avatarIsModified, setAvatarIsModified] = useState(false);

  const avatarFileInput = useRef();

  const avatarOnChange = () => {
    setAvatarIsModified(true);
  };

  const onSubmit = (values) => {
    const { name, email, password } = values;
    const options = { name, email };
    if (password !== DEFAULT_PASSWORD) {
      options.password = password;
    }
    if (avatarIsModified) {
      const [avatarValue] = avatarFileInput.current.files;
      options.avatar = avatarValue;
    }

    onSave({ userId: user._id, options });
  };

  return (
    <Dialog open onClose={closeUserModifyDialog}>
      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          password: DEFAULT_PASSWORD,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, submitForm }) => (
          <Form>
            <DialogTitle>Modify user</DialogTitle>
            <DialogContent>
              {error && <FormHelperText error>{error}</FormHelperText>}
              <AvatarSelector
                onChange={avatarOnChange}
                avatar={user.avatar}
                avatarFileInput={avatarFileInput}
              />
              <Field component={UserNameField} name="name" />
              <Field component={UserEmailField} name="email" />
              <Field component={UserPasswordField} name="password" />
              {isSubmitting && <LinearProgress />}
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                color="primary"
                form="validatorForm"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Save
              </Button>
              <Button onClick={closeUserModifyDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

UserModifyDialog.defaultProps = {
  error: undefined,
};
UserModifyDialog.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  closeUserModifyDialog: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default UserModifyDialog;

