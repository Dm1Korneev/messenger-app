import AccountIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@mui/material/Avatar';

type Props = {
  avatar?: string;
  author?: string;
  size?: number;
}

export const UsersAvatar = ({ avatar, author, size }: Props) => (
  <Avatar alt={author} src={avatar} sx={{ width: size, height: size }} variant="rounded">
    {!avatar && <AccountIcon fontSize="large" />}
  </Avatar>
);
