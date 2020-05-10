import React from 'react';

import TopBar from './TopBar';

jest.mock('@material-ui/core/Typography', () => global.mockComponent('Typography'));
jest.mock('@material-ui/core/AppBar', () => global.mockComponent('AppBar'));
jest.mock('@material-ui/core/Toolbar', () => global.mockComponent('Toolbar'));
jest.mock('@material-ui/core/IconButton', () => global.mockComponent('IconButton'));
jest.mock('@material-ui/core/Button', () => global.mockComponent('Button'));
jest.mock('@material-ui/icons/Menu', () => global.mockComponent('Menu'));
jest.mock('@material-ui/icons/Create', () => global.mockComponent('Create'));

const props = {
  drawerIsOpen: false,
  onLogout: jest.fn(),
  onDriwerOpen: jest.fn(),
  openModifyUserDialog: jest.fn(),
  user: {
    name: 'name',
  },
};

describe('render TopBar component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <TopBar {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('TopBar').length).toBe(1);
  });

  test('Toolbar subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'Toolbar' }).length).toBe(1);
  });
});
