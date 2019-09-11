import React from 'react';

import MainContent from 'Components/MainContent';

jest.mock('Containers/MessagesList', () => global.mockComponent('MessagesList'));
jest.mock('Containers/MessageInput', () => global.mockComponent('MessageInput'));

jest.mock('@material-ui/core/Grid', () => global.mockComponent('Grid'));

const props = {};

describe('render MainContent component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <MainContent {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('MainContent').length).toBe(1);
  });

  test('MessagesList subcomponent is render', () => {
    expect(wrapper.find({ originalcomponent: 'MessagesList' }).length).toBe(1);
  });

  test('MessageInput subcomponent is render', () => {
    expect(wrapper.find({ originalcomponent: 'MessageInput' }).length).toBe(1);
  });
});

describe('snapshot-test MainContent component', () => {
  test('Renders correct properties', () => {
    global.mountExpect(
      <MainContent {...props} />,
    ).toMatchSnapshot();
  });
});
