import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from 'react';

import { UsersAvatar } from '../UsersAvatar';

type Props = {
  avatarFileInput: React.RefObject<HTMLInputElement>;
  onChange?: () => void;
  avatar?: string;
  disabled?: boolean;
}

export const AvatarSelector = ({
  avatar: avatarProp, onChange = () => {}, avatarFileInput, disabled = false,
}: Props) => {
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
    <Box display="flex" mt={2}>
      <Box mr={2}>
        <UsersAvatar avatar={avatar} size={60} />
      </Box>
      <Box display="flex" flexDirection="column">
        <InputLabel disabled={disabled}>
          <span>Avatar</span>
          <input
            ref={avatarFileInput}
            accept="image/*"
            onChange={avatarChange}
            style={{ display: 'none' }}
            type="file"
          />
          <Box display="flex" flexDirection="row" mt={1}>
            <Button
              component="span"
              disabled={disabled}
              size="small"
              sx={{ mr: 1 }}
              variant="outlined"
            >
              <CloudUploadIcon sx={{ mr: 1 }} />
              Upload
            </Button>
            <Button
              component="span"
              disabled={disabled}
              onClick={handlerRemoveButton}
              size="small"
              sx={{ mr: 1 }}
              variant="outlined"
            >
              <ClearIcon sx={{ mr: 1 }} />
              Remove
            </Button>
          </Box>
        </InputLabel>
      </Box>
    </Box>
  );
};
