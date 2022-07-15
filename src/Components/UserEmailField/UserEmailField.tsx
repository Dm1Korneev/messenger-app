import React from 'react';
import { TextField } from 'formik-material-ui';

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof TextField>,
  'margin' | 'label' | 'fullWidth' | 'autoComplete'>

export const UserEmailField = (props: Props) => (
  <TextField
    margin="normal"
    label="Email Address *"
    fullWidth
    autoComplete="email"
    {...props}
  />
);
