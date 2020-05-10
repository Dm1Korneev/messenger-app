import React from 'react';

import MainContent from './MainContent';

jest.mock('Components/MessagesList', () => global.mockComponent('MessagesList'));
jest.mock('Components/MessageInput', () => global.mockComponent('MessageInput'));

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

