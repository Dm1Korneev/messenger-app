import React from 'react';

import MessagesList from './MessagesList';

jest.mock('Components/MessageUser', () => global.mockComponent('MessageUser'));
jest.mock('Components/MessageDateTime', () => global.mockComponent('MessageDateTime'));
jest.mock('Components/MessageText', () => global.mockComponent('MessageText'));

jest.mock('@material-ui/core/List', () => global.mockComponent('List'));
jest.mock('@material-ui/core/Divider', () => global.mockComponent('Divider'));

const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

const props = {
  loadMessages: jest.fn(),
  user: {
    _id: '',
  },
  users: [],
};

describe('render MessagesList component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <MessagesList {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('MessagesList').length).toBe(1);
  });

  test('List subcomponent is render', () => {
    expect(wrapper.find({ originalcomponent: 'List' }).length).toBe(1);
  });

  test('Scroll to and of messages is called on mout', () => {
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
});

