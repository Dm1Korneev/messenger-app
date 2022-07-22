import { TextField } from 'formik-material-ui';

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof TextField>,
  'margin' | 'label' | 'fullWidth' | 'autoComplete'>

export const UserNameField = (props: Props) => (
  <TextField
    autoComplete="name"
    fullWidth
    label="Name *"
    margin="normal"
    {...props}
  />
);
