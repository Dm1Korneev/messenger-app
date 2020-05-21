import React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

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
      color="primary"
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

const styles = () => ({});

export default withStyles(styles)(UserNameField);
