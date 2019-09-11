import React from 'react';

import ChatDialog from 'Components/ChatDialog';

jest.mock('Components/UsersAvatar', () => global.mockComponent('UsersAvatar'));
jest.mock('Components/AvatarSelector', () => global.mockComponent('AvatarSelector'));

jest.mock('@material-ui/core/Button', () => global.mockComponent('Button'));
jest.mock('@material-ui/core/Dialog', () => global.mockComponent('Dialog'));
jest.mock('@material-ui/core/DialogActions', () => global.mockComponent('DialogActions'));
jest.mock('@material-ui/core/DialogContent', () => global.mockComponent('DialogContent'));
jest.mock('@material-ui/core/DialogTitle', () => global.mockComponent('DialogTitle'));
jest.mock('@material-ui/core/ListItem', () => global.mockComponent('ListItem'));
jest.mock('@material-ui/core/List', () => global.mockComponent('List'));
jest.mock('@material-ui/core/ListItemText', () => global.mockComponent('ListItemText'));

const props = {
  closeChatDialog: jest.fn(),
  onAddChat: jest.fn(),
  onSaveChat: jest.fn(),
  getUsers: jest.fn(),
  users: [{
    _id: '_id',
    name: 'name',
    avatar: 'avatar',
    email: 'email',
  }],
  isModify: false,
  chat: {
    _id: '_id',
    avatar: 'avatar',
    title: 'title',
    users: [],
  },

};

describe('render ChatDialog component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <ChatDialog {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('ChatDialog').length).toBe(1);
  });

  test('Dialog subcomponent is render', () => {
    expect(wrapper.find({ originalcomponent: 'Dialog' }).length).toBe(1);
  });

  test('DialogContent subcomponent is render', () => {
    expect(wrapper.find({ originalcomponent: 'DialogContent' }).length).toBe(1);
  });
});

describe('snapshot-test ChatDialog component if isModify = false', () => {
  test('Renders correct properties', () => {
    global.mountExpect(
      <ChatDialog {...props} />,
    ).toMatchSnapshot();
  });
});

describe('snapshot-test ChatDialog component if isModify = true', () => {
  const newProps = { ...props, isModify: true };

  test('Renders correct properties', () => {
    global.mountExpect(
      <ChatDialog {...newProps} />,
    ).toMatchSnapshot();
  });
});
