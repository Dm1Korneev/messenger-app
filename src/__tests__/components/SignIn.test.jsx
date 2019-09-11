import React from 'react';

import SignIn from 'Components/SignIn';

jest.mock('Components/UserEmailField', () => global.mockComponent('UserEmailField'));
jest.mock('Components/UserNameField', () => global.mockComponent('UserNameField'));
jest.mock('Components/UserPasswordField', () => global.mockComponent('UserPasswordField'));
jest.mock('Components/AvatarSelector', () => global.mockComponent('AvatarSelector'));

jest.mock('@material-ui/core/Avatar', () => global.mockComponent('Avatar'));
jest.mock('@material-ui/core/Button', () => global.mockComponent('Button'));
jest.mock('@material-ui/core/CssBaseline', () => global.mockComponent('CssBaseline'));
jest.mock('@material-ui/core/FormControlLabel', () => global.mockComponent('FormControlLabel'));
jest.mock('@material-ui/core/Checkbox', () => global.mockComponent('Checkbox'));
jest.mock('@material-ui/core/Paper', () => global.mockComponent('Paper'));
jest.mock('@material-ui/core/Typography', () => global.mockComponent('Typography'));
jest.mock('@material-ui/core/AppBar', () => global.mockComponent('AppBar'));
jest.mock('@material-ui/core/Tabs', () => global.mockComponent('Tabs'));
jest.mock('@material-ui/core/Tab', () => global.mockComponent('Tab'));
jest.mock('@material-ui/core/FormHelperText', () => global.mockComponent('FormHelperText'));
jest.mock('@material-ui/icons/LockOutlined', () => global.mockComponent('LockOutlined'));
jest.mock('@material-ui/icons/PersonAddOutlined', () => global.mockComponent('PersonAddOutlined'));

const props = {
  onSignIn: jest.fn(),
  onRegister: jest.fn(),
};

describe('render SignIn component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <SignIn {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('SignIn').length).toBe(1);
  });

  test('UserEmailField subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'UserEmailField' }).length).toBe(1);
  });

  test('UserPasswordField subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'UserPasswordField' }).length).toBe(1);
  });
});

describe('snapshot-test SignIn component', () => {
  test('Renders correct properties', () => {
    global.mountExpect(
      <SignIn {...props} />,
    ).toMatchSnapshot();
  });
});
