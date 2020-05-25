import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';

function UsersAvatar(props) {
  const {
    avatar, author, size,
  } = props;

  const style = size ? { width: size, height: size } : {};

  return (
    <Avatar variant="rounded" alt={author} src={avatar} style={style}>
      {!avatar && <AccountIcon style={{ fontSize: 40 }} />}
    </Avatar>
  );
}

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
