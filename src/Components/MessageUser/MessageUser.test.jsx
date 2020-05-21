import React from 'react';
import { render } from '@testing-library/react';

import { mockComponent } from 'testing/utils';

import MessageUser from './MessageUser';

jest.mock('Components/UsersAvatar', () => mockComponent('UsersAvatar'));

jest.mock('@material-ui/core/ListItem', () => mockComponent('ListItem'));
jest.mock('@material-ui/core/ListItemText', () => mockComponent('ListItemText'));
jest.mock('@material-ui/core/Typography', () => mockComponent('Typography'));

const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

const props = {
  isCurrentUserMessage: false,
  author: '',
  avatar: '',
  children: <></>,
};

describe('render MessageUser component', () => {
  const setup = () => render(
    <MessageUser {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
