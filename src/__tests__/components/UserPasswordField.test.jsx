import React from 'react';

import UserPasswordField from 'Components/UserPasswordField';

jest.mock('react-material-ui-form-validator', () => ({
  TextValidator: global.mockComponent('TextValidator'),
}));
jest.mock('@material-ui/core/InputAdornment', () => global.mockComponent('InputAdornment'));
jest.mock('@material-ui/icons/Visibility', () => global.mockComponent('Visibility'));
jest.mock('@material-ui/icons/VisibilityOff', () => global.mockComponent('VisibilityOff'));
jest.mock('@material-ui/core/IconButton', () => global.mockComponent('IconButton'));

describe('render UserPasswordField component', () => {
  let wrapper;

  const props = {
    value: 'TEST',
    onChange: jest.fn(),
  };

  beforeAll(() => {
    wrapper = global.mount(
      <UserPasswordField {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('UserPasswordField').length).toBe(1);
  });

  test('TextValidator subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'TextValidator' }).length).toBe(1);
  });
});

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
});
