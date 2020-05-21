import React from 'react';
import { render } from '@testing-library/react';

import { mockComponent } from 'testing/utils';

import Chat from './Chat';

jest.mock('Components/UsersAvatar', () => mockComponent('UsersAvatar'));

jest.mock('@material-ui/core/ListItem', () => mockComponent('ListItem'));
jest.mock('@material-ui/core/ListItemText', () => mockComponent('ListItemText'));
jest.mock('@material-ui/core/IconButton', () => mockComponent('IconButton'));
jest.mock('@material-ui/icons/Create', () => mockComponent('Create'));

describe('render Chat component', () => {
  const title = 'Title';

  const props = {
    selected: false,
    chatOnClick: jest.fn(),
    chatModifyOnClick: jest.fn(),
    chat: {
      _id: '_id',
      title,
      avatar: 'avatar',
    },
  };

  const setup = () => render(
    <Chat {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
