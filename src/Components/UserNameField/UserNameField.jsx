import React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';

function UserNameField(props) {
  const { value, onChange } = props;

  return (
    <TextValidator
      margin="normal"
      label="Name *"
      fullWidth
      onChange={onChange}
      name="name"
      id="name"
      autoComplete="name"
      value={value}
      validators={['required']}
      errorMessages={['this field is required']}
    />
  );
}

UserNameField.defaultProps = {
  value: undefined,
};
UserNameField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default UserNameField;
