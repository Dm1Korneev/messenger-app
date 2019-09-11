import React from 'react';

import Chat from 'Components/Chat';

jest.mock('Components/UsersAvatar', () => global.mockComponent('UsersAvatar'));

jest.mock('@material-ui/core/ListItem', () => global.mockComponent('ListItem'));
jest.mock('@material-ui/core/ListItemText', () => global.mockComponent('ListItemText'));
jest.mock('@material-ui/core/IconButton', () => global.mockComponent('IconButton'));
jest.mock('@material-ui/icons/Create', () => global.mockComponent('Create'));

const props = {
  selected: false,
  chatOnClick: jest.fn(),
  chatModifyOnClick: jest.fn(),
  chat: {
    _id: '_id',
    title: 'title',
    avatar: 'avatar',
  },
};

describe('render Chat component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <Chat {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('Chat').length).toBe(1);
  });

  test('ListItem subcomponent is render', () => {
    expect(wrapper.find({ originalcomponent: 'ListItem' }).length).toBe(1);
  });

  test('UsersAvatar subcomponent is render', () => {
    expect(wrapper.find({ originalcomponent: 'UsersAvatar' }).length).toBe(1);
  });
});

describe('snapshot-test Chat component', () => {
  test('Renders correct properties', () => {
    global.mountExpect(
      <Chat {...props} />,
    ).toMatchSnapshot();
  });
});
