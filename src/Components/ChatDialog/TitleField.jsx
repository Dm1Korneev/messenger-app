import React from 'react';
import { TextField } from 'formik-material-ui';

const TitleField = (props) => (
  <TextField
    margin="normal"
    label="Title *"
    fullWidth
    name="title"
    {...props}
  />
);

export default TitleField;
