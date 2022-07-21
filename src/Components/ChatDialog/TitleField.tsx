import { TextField } from 'formik-material-ui';

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof TextField>,
  'margin' | 'label' | 'fullWidth'>

const TitleField = (props: Props) => (
  <TextField
    margin="normal"
    label="Title *"
    fullWidth
    {...props}
  />
);

export default TitleField;
