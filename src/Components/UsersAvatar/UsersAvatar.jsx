import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';

const UsersAvatar = ({ avatar, author, size }) => {
  const style = size ? { width: size, height: size } : {};

  return (
    <Avatar variant="rounded" alt={author} src={avatar} style={style}>
      {!avatar && <AccountIcon fontSize="large" />}
    </Avatar>
  );
};

UsersAvatar.defaultProps = {
  size: undefined,
  avatar: undefined,
  author: undefined,
};
UsersAvatar.propTypes = {
  avatar: PropTypes.string,
  author: PropTypes.string,
  size: PropTypes.number,
};

export default UsersAvatar;
