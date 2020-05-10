import React from 'react';
import { render } from '@testing-library/react';
import { mockComponent } from 'testing/utils';

import MessageText from './MessageText';

jest.mock('@material-ui/core/ListItem', () => mockComponent('ListItem'));
jest.mock('@material-ui/core/ListItemText', () => mockComponent('ListItemText'));
jest.mock('@material-ui/core/Typography', () => mockComponent('Typography'));

const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

const props = {
  isCurrentUserMessage: false,
};

describe('render MessageText component', () => {
  const setup = () => render(
    <MessageText {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});

