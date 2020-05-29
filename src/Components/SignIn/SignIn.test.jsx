import React from 'react';
import { render } from '@testing-library/react';

import { mockComponent } from 'testing/utils';

import SignIn from './SignIn';

jest.mock('Components/UserEmailField', () => mockComponent('UserEmailField'));
jest.mock('Components/UserNameField', () => mockComponent('UserNameField'));
jest.mock('Components/UserPasswordField', () => mockComponent('UserPasswordField'));
jest.mock('Components/AvatarSelector', () => mockComponent('AvatarSelector'));

jest.mock('@material-ui/core/Avatar', () => mockComponent('Avatar'));
jest.mock('@material-ui/core/Button', () => mockComponent('Button'));
jest.mock('@material-ui/core/CssBaseline', () => mockComponent('CssBaseline'));
jest.mock('@material-ui/core/FormControlLabel', () => mockComponent('FormControlLabel'));
jest.mock('@material-ui/core/Checkbox', () => mockComponent('Checkbox'));
jest.mock('@material-ui/core/Paper', () => mockComponent('Paper'));
jest.mock('@material-ui/core/Typography', () => mockComponent('Typography'));
jest.mock('@material-ui/core/AppBar', () => mockComponent('AppBar'));
jest.mock('@material-ui/core/Tabs', () => mockComponent('Tabs'));
jest.mock('@material-ui/core/Tab', () => mockComponent('Tab'));
jest.mock('@material-ui/core/FormHelperText', () => mockComponent('FormHelperText'));
jest.mock('@material-ui/core/Box', () => mockComponent('Box'));
jest.mock('@material-ui/icons/LockOutlined', () => mockComponent('LockOutlined'));
jest.mock('@material-ui/icons/PersonAddOutlined', () => mockComponent('PersonAddOutlined'));

const props = {
  onSignIn: jest.fn(),
  onRegister: jest.fn(),
};

describe('render SignIn component', () => {
  const setup = () => render(
    <SignIn {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
