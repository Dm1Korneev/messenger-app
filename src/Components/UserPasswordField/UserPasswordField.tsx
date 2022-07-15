import React, { useState } from 'react';
import { TextField } from 'formik-material-ui';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
      margin="normal"
      label="Password *"
      fullWidth
      type={showPassword ? 'text' : 'password'}
      autoComplete="current-password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onMouseDown={handleOnMouseDownShowPassword}
              onMouseUp={handleOnMouseUpShowPassword}
              onKeyDown={handleOnKeyDownShowPassword}
              onMouseOut={handleOnMouseOutShowPassword}
              onBlur={handleOnMouseOutShowPassword}
              onKeyUp={handleOnMouseOutShowPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
