import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import ActionNames from 'Constants/actionNames';
import { RootState } from 'Redux/reducers';
import * as Actions from 'Redux/actions';
import { currentUserSelector } from 'Selectors/session';
import { errorSelector } from 'Selectors/errors';
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

type FromValues = {
  name: string;
  email: string;
  password: string;
}

const DEFAULT_PASSWORD = '**********';

const UserModifyDialog = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(currentUserSelector);
  const error = useSelector((rootState: RootState) => errorSelector(rootState, ActionNames.MODIFY_USER));

  const [avatarIsModified, setAvatarIsModified] = useState(false);

  const avatarFileInput = useRef<HTMLInputElement>(null);

  if (!currentUser) {
    return null;
  }

  const closeUserModifyDialog = () => dispatch(Actions.setModifyUserDialogIsOpen(false));

  const avatarOnChange = () => {
    setAvatarIsModified(true);
  };

  const onSubmit = ({ name, email, password }: FromValues) => {
    const files = avatarFileInput?.current?.files;
    const avatar = files ? files[0] : undefined;

    const options: Actions.ModifyUserPayload['options'] = {
      name,
      email,
    };

    if (avatarIsModified) {
      options.avatar = avatar;
    }
    if (password !== DEFAULT_PASSWORD && password) {
      options.password = password;
    }

    dispatch(Actions.modifyUser({ userId: currentUser._id, options }));
  };

  const initialValues: FromValues = {
    name: currentUser.name,
    email: currentUser.email,
    password: DEFAULT_PASSWORD,
  };

  return (
    <Dialog open onClose={closeUserModifyDialog}>
      <Formik
        initialValues={initialValues}
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
                avatar={currentUser.avatar}
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

export default UserModifyDialog;
