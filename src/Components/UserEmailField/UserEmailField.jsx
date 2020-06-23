import React from 'react';
import { TextField } from 'formik-material-ui';

const UserEmailField = (props) => (
  <TextField
    margin="normal"
    label="Email Address *"
    fullWidth
    autoComplete="email"
    {...props}
  />
);

export default UserEmailField;

