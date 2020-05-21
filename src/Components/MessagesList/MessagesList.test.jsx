import React from 'react';
import { render } from '@testing-library/react';

import { mockComponent } from 'testing/utils';

import MessagesList from './MessagesList';

jest.mock('Components/MessageUser', () => mockComponent('MessageUser'));
jest.mock('Components/MessageDateTime', () => mockComponent('MessageDateTime'));
jest.mock('Components/MessageText', () => mockComponent('MessageText'));

jest.mock('@material-ui/core/List', () => mockComponent('List'));
jest.mock('@material-ui/core/Divider', () => mockComponent('Divider'));

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
  const setup = () => render(
    <MessagesList {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });

  test('Scroll to and of messages is called on mout', () => {
    setup();

    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
});

