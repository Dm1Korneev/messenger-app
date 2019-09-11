import React from 'react';

import UserEmailField from 'Components/UserEmailField';

jest.mock('react-material-ui-form-validator', () => ({
  TextValidator: global.mockComponent('TextValidator'),
}));

describe('render UserEmailField component', () => {
  let wrapper;

  const props = {
    value: 'TEST',
    onChange: jest.fn(),
  };

  beforeAll(() => {
    wrapper = global.mount(
      <UserEmailField {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('UserEmailField').length).toBe(1);
  });

  test('TextValidator subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'TextValidator' }).length).toBe(1);
  });
});

describe('snapshot-test UserEmailField component', () => {
  test('Renders correct properties', () => {
    const props = {
      value: 'TEST',
      onChange: jest.fn(),
    };

    global.mountExpect(
      <UserEmailField {...props} />,
    ).toMatchSnapshot();
  });
});
