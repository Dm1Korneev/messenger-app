import React from 'react';

import MessageText from './MessageText';

jest.mock('@material-ui/core/ListItem', () => global.mockComponent('ListItem'));
jest.mock('@material-ui/core/ListItemText', () => global.mockComponent('ListItemText'));
jest.mock('@material-ui/core/Typography', () => global.mockComponent('Typography'));

const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

const props = {
  isCurrentUserMessage: false,
};

describe('render MessageText component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <MessageText {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('MessageText').length).toBe(1);
  });

  test('ListItem subcomponent is render', () => {
    expect(wrapper.find({ originalcomponent: 'ListItem' }).length).toBe(1);
  });
});

