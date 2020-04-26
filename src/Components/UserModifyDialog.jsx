import React from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';

import UserEmailField from 'Components/UserEmailField';
import UserNameField from 'Components/UserNameField';
import UserPasswordField from 'Components/UserPasswordField';
import AvatarSelector from 'Components/AvatarSelector';

class UserModifyDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.user.name,
      email: props.user.email,
      password: '**********',
      nameIsModified: false,
      emailIsModified: false,
      avatarIsModified: false,
      passwordIsModified: false,
    };
    this.avatarFileInput = React.createRef();
  }

  avatarOnChange = () => {
    this.setState({
      avatarIsModified: true,
    });
  };

  handleInputChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
      [`${name}IsModified`]: true,
    });
  };

  onSubmit = () => {
    const {
      name,
      email,
      password,
      nameIsModified,
      emailIsModified,
      avatarIsModified,
      passwordIsModified,
    } = this.state;
    const { onSave, user } = this.props;

    let options = {};
    if (nameIsModified) {
      options = { ...options, name };
    }
    if (emailIsModified) {
      options = { ...options, email };
    }
    if (passwordIsModified) {
      options = { ...options, password };
    }
    if (avatarIsModified) {
      options = {
        ...options,
        avatar: this.avatarFileInput.current.files[0],
      };
    }

    onSave({ userId: user._id, options });
  };

  render() {
    const { closeUserModifyDialog, user, error } = this.props;
    const { name, email, password } = this.state;
    const { avatar } = user;

    return (
      <Dialog open onClose={closeUserModifyDialog}>
        <DialogTitle>Modify user</DialogTitle>
        <DialogContent>
          <ValidatorForm id="validatorForm" onSubmit={this.onSubmit}>
            {error && <FormHelperText error>{error}</FormHelperText>}
            <AvatarSelector
              onChange={this.avatarOnChange}
              avatar={avatar}
              avatarFileInput={this.avatarFileInput}
            />
            <UserNameField value={name} onChange={this.handleInputChange} />
            <UserEmailField value={email} onChange={this.handleInputChange} />
            <UserPasswordField
              value={password}
              onChange={this.handleInputChange}
            />
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" form="validatorForm">
            Save
          </Button>
          <Button onClick={closeUserModifyDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

UserModifyDialog.defaultProps = {
  error: undefined,
};
UserModifyDialog.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  closeUserModifyDialog: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const styles = () => ({});

export default withStyles(styles)(UserModifyDialog);
