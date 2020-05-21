import React from 'react';
import { render } from '@testing-library/react';

import { mockComponent } from 'testing/utils';

import ChatDialog from './ChatDialog';

jest.mock('Components/UsersAvatar', () => mockComponent('UsersAvatar'));
jest.mock('Components/AvatarSelector', () => mockComponent('AvatarSelector'));

jest.mock('@material-ui/core/Button', () => mockComponent('Button'));
jest.mock('@material-ui/core/Dialog', () => mockComponent('Dialog'));
jest.mock('@material-ui/core/DialogActions', () => mockComponent('DialogActions'));
jest.mock('@material-ui/core/DialogContent', () => mockComponent('DialogContent'));
jest.mock('@material-ui/core/DialogTitle', () => mockComponent('DialogTitle'));
jest.mock('@material-ui/core/ListItem', () => mockComponent('ListItem'));
jest.mock('@material-ui/core/List', () => mockComponent('List'));
jest.mock('@material-ui/core/ListItemText', () => mockComponent('ListItemText'));

const props = {
  closeChatDialog: jest.fn(),
  onAddChat: jest.fn(),
  onSaveChat: jest.fn(),
  getUsers: jest.fn(),
  users: [{
    _id: '_id',
    name: 'name',
    avatar: 'avatar',
    email: 'email',
  }],
  isModify: false,
  chat: {
    _id: '_id',
    avatar: 'avatar',
    title: 'title',
    users: [],
  },

};

describe('render ChatDialog component', () => {
  const setup = () => render(
    <ChatDialog {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});

