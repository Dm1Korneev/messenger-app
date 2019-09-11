import React from 'react';

import SideBar from 'Components/SideBar';

jest.mock('Components/Chat', () => global.mockComponent('Chat'));
jest.mock('Components/UserNameField', () => global.mockComponent('UserNameField'));
jest.mock('Components/UserPasswordField', () => global.mockComponent('UserPasswordField'));
jest.mock('Components/AvatarSelector', () => global.mockComponent('AvatarSelector'));

jest.mock('@material-ui/core/IconButton', () => global.mockComponent('IconButton'));
jest.mock('@material-ui/core/Drawer', () => global.mockComponent('Drawer'));
jest.mock('@material-ui/core/ListItem', () => global.mockComponent('ListItem'));
jest.mock('@material-ui/core/List', () => global.mockComponent('List'));
jest.mock('@material-ui/core/ListItemText', () => global.mockComponent('ListItemText'));
jest.mock('@material-ui/core/Divider', () => global.mockComponent('Divider'));

jest.mock('@material-ui/icons/ChevronLeft', () => global.mockComponent('ChevronLeft'));
jest.mock('@material-ui/icons/AddBox', () => global.mockComponent('AddBox'));

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
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <SideBar {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('SideBar').length).toBe(1);
  });

  test('Drawer subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'Drawer' }).length).toBe(1);
  });

  test('ChevronLeft subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'ChevronLeft' }).length).toBe(1);
  });
});

describe('snapshot-test SideBar component', () => {
  test('Renders correct properties', () => {
    global.mountExpect(
      <SideBar {...props} />,
    ).toMatchSnapshot();
  });
});
