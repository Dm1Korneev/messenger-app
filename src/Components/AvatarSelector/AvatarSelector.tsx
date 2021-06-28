import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

type Props = {
  avatarFileInput: React.RefObject<HTMLInputElement>;
  onChange?: () => void;
  avatar?: string;
  disabled?: boolean;
}

const AvatarSelector = ({
  avatar: avatarProp, onChange = () => {}, avatarFileInput, disabled = false,
}: Props) => {
  const classes = useStyles();
  const [avatar, setAvatar] = useState<string>();

  useEffect(() => {
    setAvatar(avatarProp);
  }, [avatarProp]);

  const avatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (!files || !files.length) {
      return;
    }

    const newAvatar = URL.createObjectURL(files[0]);

    setAvatar(newAvatar);
    onChange();
  };

  const handlerRemoveButton = (event: React.MouseEvent) => {
    event.preventDefault();
    setAvatar(undefined);
    onChange();
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

export default AvatarSelector;
