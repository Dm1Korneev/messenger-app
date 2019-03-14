import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextValidator } from "react-material-ui-form-validator";

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
      validators={["required"]}
      errorMessages={["this field is required"]}
    />
  );
}

const styles = theme => ({});

export default withStyles(styles)(UserNameField);
