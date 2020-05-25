import React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class UserPasswordField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
    };
  }

  handleOnMouseDownShowPassword = () => {
    this.setState({ showPassword: true });
  };

  handleOnMouseUpShowPassword = () => {
    this.setState({ showPassword: false });
  };

  handleOnKeyDownShowPassword = ({ keyCode }) => {
    if (keyCode === 13) { // Enter key
      this.setState({ showPassword: true });
    }
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
                onMouseDown={this.handleOnMouseDownShowPassword}
                onMouseUp={this.handleOnMouseUpShowPassword}
                onKeyDown={this.handleOnKeyDownShowPassword}
                onMouseOut={this.handleOnMouseOutShowPassword}
                onBlur={this.handleOnMouseOutShowPassword}
                onKeyUp={this.handleOnMouseOutShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

UserPasswordField.defaultProps = {
  value: undefined,
};
UserPasswordField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default UserPasswordField;

