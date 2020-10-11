import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';

type Props = {
  avatar?: string;
  author?: string;
  size?: number;
}

const UsersAvatar = ({ avatar, author, size }: Props) => {
  const style = size ? { width: size, height: size } : {};

  return (
    <Avatar variant="rounded" alt={author} src={avatar} style={style}>
      {!avatar && <AccountIcon fontSize="large" />}
    </Avatar>
  );
};

export default UsersAvatar;
