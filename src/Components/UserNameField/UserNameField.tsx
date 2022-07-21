import { TextField } from 'formik-material-ui';

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof TextField>,
  'margin' | 'label' | 'fullWidth' | 'autoComplete'>

export const UserNameField = (props: Props) => (
  <TextField
    margin="normal"
    label="Name *"
    fullWidth
    autoComplete="name"
    {...props}
  />
);
