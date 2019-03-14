import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextValidator } from "react-material-ui-form-validator";

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
      validators={["required", "isEmail"]}
      errorMessages={["this field is required", "email is not valid"]}
    />
  );
}

const styles = theme => ({});

export default withStyles(styles)(UserEmailField);
