import React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

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
      color="primary"
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

const styles = () => ({});

export default withStyles(styles)(UserEmailField);

