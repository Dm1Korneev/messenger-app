import React from 'react';

import UserPasswordField from 'Components/UserPasswordField';

jest.mock('react-material-ui-form-validator', () => ({
  TextValidator: global.mockComponent('TextValidator'),
}));
jest.mock('@material-ui/core/InputAdornment', () => global.mockComponent('InputAdornment'));
jest.mock('@material-ui/icons/Visibility', () => global.mockComponent('Visibility'));
jest.mock('@material-ui/icons/VisibilityOff', () => global.mockComponent('VisibilityOff'));
jest.mock('@material-ui/core/IconButton', () => global.mockComponent('IconButton'));

describe('snapshot-test UserPasswordField component', () => {
  test('Renders correct properties', () => {
    const props = {
      value: 'TEST',
      onChange: jest.fn(),
    };

    global.mountExpect(
      <UserPasswordField {...props} />,
    ).toMatchSnapshot();
  });

  afterEach(() => {
    jest.resetModules();
  });
});
