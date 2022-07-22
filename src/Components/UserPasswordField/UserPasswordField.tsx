import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from 'formik-material-ui';
import { useState } from 'react';

const ENTER_KEY_CODE = 13;

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof TextField>,
  'margin' | 'label' | 'fullWidth' | 'type' | 'autoComplete' | 'InputProps'>

export const UserPasswordField = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleOnMouseDownShowPassword = () => {
    setShowPassword(true);
  };

  const handleOnMouseUpShowPassword = () => {
    setShowPassword(false);
  };

  const handleOnKeyDownShowPassword = ({ keyCode }: React.KeyboardEvent<HTMLButtonElement>) => {
    if (keyCode === ENTER_KEY_CODE) {
      setShowPassword(true);
    }
  };

  const handleOnMouseOutShowPassword = () => {
    setShowPassword(false);
  };

  return (
    <TextField
      autoComplete="current-password"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onBlur={handleOnMouseOutShowPassword}
              onKeyDown={handleOnKeyDownShowPassword}
              onKeyUp={handleOnMouseOutShowPassword}
              onMouseDown={handleOnMouseDownShowPassword}
              onMouseOut={handleOnMouseOutShowPassword}
              onMouseUp={handleOnMouseUpShowPassword}
              size="large"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      label="Password *"
      margin="normal"
      type={showPassword ? 'text' : 'password'}
      {...props}
    />
  );
};
