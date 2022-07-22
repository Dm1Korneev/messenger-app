import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';
import LinearProgress from '@mui/material/LinearProgress';
import { Field, Form, Formik } from 'formik';
import { useRef, useState } from 'react';
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
import { useUpdateUser, UseUpdateUserPayload, useCurrentUser } from 'Hooks';

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

type UserModifyDialogProps = {
  onClose: ()=>void
}

export const UserModifyDialog = ({ onClose }: UserModifyDialogProps) => {
  const { data: currentUser } = useCurrentUser();

  const { mutate: updateUser, error } = useUpdateUser();

  const [avatarIsModified, setAvatarIsModified] = useState(false);

  const avatarFileInput = useRef<HTMLInputElement>(null);

  if (!currentUser) {
    return null;
  }

  const avatarOnChange = () => {
    setAvatarIsModified(true);
  };

  const onSubmit = async ({ name, email, password }: FromValues) => {
    const files = avatarFileInput?.current?.files;
    const avatar = files ? files[0] : undefined;

    const modifyData: UseUpdateUserPayload = {
      name,
      email,
    };

    if (avatarIsModified) {
      modifyData.avatar = avatar;
    }
    if (password !== DEFAULT_PASSWORD && password) {
      modifyData.password = password;
    }

    updateUser({ userId: currentUser._id, modifyData }, { onSuccess: () => onClose() });
  };

  const initialValues: FromValues = {
    name: currentUser.name,
    email: currentUser.email,
    password: DEFAULT_PASSWORD,
  };

  return (
    <Dialog onClose={onClose} open>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, submitForm }) => (
          <Form>
            <DialogTitle>Modify user</DialogTitle>
            <DialogContent>
              {error ? <FormHelperText error>{String(error)}</FormHelperText> : null}
              <AvatarSelector
                avatar={currentUser.avatar}
                avatarFileInput={avatarFileInput}
                onChange={avatarOnChange}
              />
              <Field component={UserNameField} name="name" />
              <Field component={UserEmailField} name="email" />
              <Field component={UserPasswordField} name="password" />
              {isSubmitting && <LinearProgress />}
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                type="submit"
              >
                Save
              </Button>
              <Button color="primary" onClick={onClose}>
                Close
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
