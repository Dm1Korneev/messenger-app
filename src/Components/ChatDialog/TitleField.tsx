import { TextField } from 'formik-material-ui';

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof TextField>,
  'margin' | 'label' | 'fullWidth'>

const TitleField = (props: Props) => (
  <TextField
    fullWidth
    label="Title *"
    margin="normal"
    {...props}
  />
);

export default TitleField;
