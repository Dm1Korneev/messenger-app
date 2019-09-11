import React from 'react';

import UserNameField from 'Components/UserNameField';

jest.mock('react-material-ui-form-validator', () => ({
  TextValidator: global.mockComponent('TextValidator'),
}));

describe('render UserPasswordField component', () => {
  let wrapper;

  const props = {
    value: 'TEST',
    onChange: jest.fn(),
  };

  beforeAll(() => {
    wrapper = global.mount(
      <UserNameField {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('UserNameField').length).toBe(1);
  });

  test('TextValidator subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'TextValidator' }).length).toBe(1);
  });
});

describe('snapshot-test UserNameField component', () => {
  test('Renders correct properties', () => {
    const props = {
      value: 'TEST',
      onChange: jest.fn(),
    };

    global.mountExpect(
      <UserNameField {...props} />,
    ).toMatchSnapshot();
  });
});
