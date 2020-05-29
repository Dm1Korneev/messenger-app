import React from 'react';
import { TextField } from 'formik-material-ui';

const UserNameField = (props) => (
  <TextField
    margin="normal"
    label="Name *"
    fullWidth
    name="name"
    autoComplete="name"
    {...props}
  />
);

export default UserNameField;
