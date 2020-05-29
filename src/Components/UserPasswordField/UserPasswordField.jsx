import React, { useState } from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const ENTER_KEY_CODE = 13;

const UserPasswordField = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleOnMouseDownShowPassword = () => {
    setShowPassword(true);
  };

  const handleOnMouseUpShowPassword = () => {
    setShowPassword(false);
  };

  const handleOnKeyDownShowPassword = ({ keyCode }) => {
    if (keyCode === ENTER_KEY_CODE) {
      setShowPassword(true);
    }
  };

  const handleOnMouseOutShowPassword = () => {
    setShowPassword(false);
  };

  return (
    <TextValidator
      margin="normal"
      label="Password *"
      fullWidth
      onChange={onChange}
      name="password"
      type={showPassword ? 'text' : 'password'}
      id="password"
      autoComplete="current-password"
      color="primary"
      value={value}
      validators={['required', 'minStringLength:6']}
      errorMessages={['this field is required', 'minimum length 6 symbols']}
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
    />
  );
};

UserPasswordField.defaultProps = {
  value: undefined,
};
UserPasswordField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default UserPasswordField;

