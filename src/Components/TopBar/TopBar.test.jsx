import React from 'react';
import { render } from '@testing-library/react';
import { mockComponent } from 'testing/utils';

import TopBar from './TopBar';

jest.mock('@material-ui/core/Typography', () => mockComponent('Typography'));
jest.mock('@material-ui/core/AppBar', () => mockComponent('AppBar'));
jest.mock('@material-ui/core/Toolbar', () => mockComponent('Toolbar'));
jest.mock('@material-ui/core/IconButton', () => mockComponent('IconButton'));
jest.mock('@material-ui/core/Button', () => mockComponent('Button'));
jest.mock('@material-ui/icons/Menu', () => mockComponent('Menu'));
jest.mock('@material-ui/icons/Create', () => mockComponent('Create'));

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
  const setup = () => render(
    <TopBar {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
