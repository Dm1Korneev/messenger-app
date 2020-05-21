import React from 'react';
import { render } from '@testing-library/react';

import { mockComponent } from 'testing/utils';

import SideBar from './SideBar';

jest.mock('Components/Chat', () => mockComponent('Chat'));
jest.mock('Components/UserNameField', () => mockComponent('UserNameField'));
jest.mock('Components/UserPasswordField', () => mockComponent('UserPasswordField'));
jest.mock('Components/AvatarSelector', () => mockComponent('AvatarSelector'));

jest.mock('@material-ui/core/IconButton', () => mockComponent('IconButton'));
jest.mock('@material-ui/core/Drawer', () => mockComponent('Drawer'));
jest.mock('@material-ui/core/ListItem', () => mockComponent('ListItem'));
jest.mock('@material-ui/core/List', () => mockComponent('List'));
jest.mock('@material-ui/core/ListItemText', () => mockComponent('ListItemText'));
jest.mock('@material-ui/core/Divider', () => mockComponent('Divider'));

jest.mock('@material-ui/icons/ChevronLeft', () => mockComponent('ChevronLeft'));
jest.mock('@material-ui/icons/AddBox', () => mockComponent('AddBox'));

const props = {
  getChats: jest.fn(),
  drawerIsOpen: false,
  onDrawerClose: jest.fn(),
  changeActiveChat: jest.fn(),
  openAddChatDialog: jest.fn(),
  openModifyChatDialog: jest.fn(),
  onSignIn: jest.fn(),
  onRegister: jest.fn(),
};

describe('render SideBar component', () => {
  const setup = () => render(
    <SideBar {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});

