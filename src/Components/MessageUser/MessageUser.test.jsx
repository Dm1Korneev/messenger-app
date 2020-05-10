import React from 'react';

import MessageUser from './MessageUser';

jest.mock('Components/UsersAvatar', () => global.mockComponent('UsersAvatar'));

jest.mock('@material-ui/core/ListItem', () => global.mockComponent('ListItem'));
jest.mock('@material-ui/core/ListItemText', () => global.mockComponent('ListItemText'));
jest.mock('@material-ui/core/Typography', () => global.mockComponent('Typography'));

const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

const props = {
  isCurrentUserMessage: false,
  author: '',
  avatar: '',
  children: <></>,
};

describe('render MessageUser component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <MessageUser {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('MessageUser').length).toBe(1);
  });

  test('ListItem subcomponent is render', () => {
    expect(wrapper.find({ originalcomponent: 'ListItem' }).length).toBe(1);
  });
});
