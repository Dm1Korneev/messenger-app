import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearIcon from '@material-ui/icons/Clear';

import UsersAvatar from 'Components/UsersAvatar';

const useStyles = makeStyles((theme) => ({
  avatar: { marginRight: theme.spacing(2) },
  avatarSelector: {
    marginTop: theme.spacing(2),
    display: 'flex',
  },
  avatarSelector__labalButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  avatarSelector__buttons: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

const AvatarSelector = ({
  avatar: avatarProp, onChange, avatarFileInput, disabled,
}) => {
  const classes = useStyles();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    setAvatar(avatarProp);
  }, [avatarProp]);

  const avatarChange = (event) => {
    if (!event.target.files.length) {
      return;
    }

    const newAvatar = URL.createObjectURL(event.target.files[0]);

    setAvatar(newAvatar);
    if (onChange) {
      onChange(event);
    }
  };

  const handlerRemoveButton = (event) => {
    event.preventDefault();
    setAvatar(undefined);
    if (onChange) {
      onChange(undefined);
    }
  };

  return (
    <div className={classes.avatarSelector}>
      <div className={classes.avatar}>
        <UsersAvatar avatar={avatar} size={60} />
      </div>
      <div className={classes.avatarSelector__labalButtons}>
        <InputLabel disabled={disabled}>
          <span>Avatar</span>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            onChange={avatarChange}
            type="file"
            ref={avatarFileInput}
          />
          <div className={classes.avatarSelector__buttons}>
            <Button
              variant="outlined"
              component="span"
              size="small"
              className={classes.button}
              disabled={disabled}
            >
              <CloudUploadIcon className={classes.leftIcon} />
              Upload
            </Button>
            <Button
              variant="outlined"
              component="span"
              size="small"
              className={classes.button}
              onClick={handlerRemoveButton}
              disabled={disabled}
            >
              <ClearIcon className={classes.leftIcon} />
              Remove
            </Button>
          </div>
        </InputLabel>
      </div>
    </div>
  );
};

AvatarSelector.propTypes = {
  avatarFileInput: PropTypes.instanceOf(Object).isRequired,
  onChange: PropTypes.func,
  avatar: PropTypes.string,
  disabled: PropTypes.bool,
};

AvatarSelector.defaultProps = {
  onChange: () => {},
  avatar: undefined,
  disabled: false,
};

export default AvatarSelector;
