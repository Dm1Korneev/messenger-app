import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextValidator } from "react-material-ui-form-validator";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

class UserPasswordField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false
    };
  }

  handleOnMouseDownShowPassword = () => {
    this.setState({ showPassword: true });
  };

  handleOnMouseUpShowPassword = () => {
    this.setState({ showPassword: false });
  };

  handleOnMouseOutShowPassword = () => {
    this.setState({ showPassword: false });
  };

  render() {
    const { value, onChange } = this.props;
    const { showPassword } = this.state;

    return (
      <TextValidator
        margin="normal"
        label="Password *"
        fullWidth
        onChange={onChange}
        name="password"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="current-password"
        color="primary"
        value={value}
        validators={["required", "minStringLength:6"]}
        errorMessages={["this field is required", "minimum length 6 symbols"]}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onMouseDown={this.handleOnMouseDownShowPassword}
                onMouseUp={this.handleOnMouseUpShowPassword}
                onMouseOut={this.handleOnMouseOutShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    );
  }
}

const styles = theme => ({});

export default withStyles(styles)(UserPasswordField);
