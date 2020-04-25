import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearIcon from '@material-ui/icons/Clear';

import UsersAvatar from 'Components/UsersAvatar';

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.avatar,
    };
  }

  avatarChange = (event) => {
    if (!event.target.files.length) {
      return;
    }

    const avatar = URL.createObjectURL(event.target.files[0]);

    this.setState({
      avatar,
    });
  };

  handleOnChange = (event) => {
    const { onChange } = this.props;

    this.avatarChange(event);
    if (onChange) {
      onChange(event);
    }
  };

  handlerRemoveButton = (event) => {
    const { onChange, avatarFileInput } = this.props;

    event.preventDefault();
    avatarFileInput.current.value = '';
    this.setState({
      avatar: undefined,
    });
    if (onChange) {
      onChange(event);
    }
  };

  render() {
    const { avatar } = this.state;
    const { classes, avatarFileInput } = this.props;

    return (
      <div className={classes.avatarSelector}>
        <div className={classes.avatar}>
          <UsersAvatar avatar={avatar} size={60} />
        </div>
        <div className={classes.avatarSelector__labalButtons}>
          <InputLabel>
            <span>Avatar</span>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              onChange={this.handleOnChange}
              type="file"
              ref={avatarFileInput}
            />
            <div className={classes.avatarSelector__buttons}>
              <Button
                variant="outlined"
                component="span"
                size="small"
                className={classes.button}
              >
                <CloudUploadIcon className={classes.leftIcon} />
                Upload
              </Button>
              <Button
                variant="outlined"
                component="span"
                size="small"
                className={classes.button}
                onClick={this.handlerRemoveButton}
              >
                <ClearIcon className={classes.leftIcon} />
                Remove
              </Button>
            </div>
          </InputLabel>
        </div>
      </div>
    );
  }
}

AvatarSelector.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  avatarFileInput: PropTypes.instanceOf(Object).isRequired,
  onChange: PropTypes.func,
  avatar: PropTypes.string,
};

AvatarSelector.defaultProps = {
  onChange: () => {},
  avatar: undefined,
};

const styles = (theme) => ({
  avatar: { marginRight: theme.spacing.unit * 2 },
  avatarSelector: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
  },
  avatarSelector__labalButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  avatarSelector__buttons: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
});

export default withStyles(styles)(AvatarSelector);
