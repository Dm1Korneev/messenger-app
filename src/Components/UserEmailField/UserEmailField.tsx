import { TextField } from 'formik-material-ui';

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof TextField>,
  'margin' | 'label' | 'fullWidth' | 'autoComplete'>

export const UserEmailField = (props: Props) => (
  <TextField
    autoComplete="email"
    fullWidth
    label="Email Address *"
    margin="normal"
    {...props}
  />
);
