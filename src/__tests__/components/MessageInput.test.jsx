import React from 'react';

import MessageInput from 'Components/MessageInput';

jest.mock('@material-ui/core/TextField', () => global.mockComponent('TextField'));

const props = {
  onSendMessage: jest.fn(),
};

describe('render MessageInput component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <MessageInput {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('MessageInput').length).toBe(1);
  });

  test('TextField subcomponent is render', () => {
    expect(wrapper.find({ originalcomponent: 'TextField' }).length).toBe(1);
  });
});

describe('snapshot-test MessageInput component', () => {
  test('Renders correct properties', () => {
    global.mountExpect(
      <MessageInput {...props} />,
    ).toMatchSnapshot();
  });
});
