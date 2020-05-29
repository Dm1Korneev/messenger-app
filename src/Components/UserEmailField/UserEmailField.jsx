import React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';

function UserEmailField(props) {
  const { value, onChange } = props;

  return (
    <TextValidator
      margin="normal"
      label="Email Address *"
      fullWidth
      onChange={onChange}
      name="email"
      id="email"
      autoComplete="email"
      value={value}
      validators={['required', 'isEmail']}
      errorMessages={['this field is required', 'email is not valid']}
    />
  );
}

UserEmailField.defaultProps = {
  value: undefined,
};
UserEmailField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default UserEmailField;

