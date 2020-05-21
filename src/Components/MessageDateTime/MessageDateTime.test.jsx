import React from 'react';
import { render } from '@testing-library/react';

import { mockComponent } from 'testing/utils';
import moment from 'Common/moment';

import MessageDateTime from './MessageDateTime';

jest.mock('@material-ui/core/ListItem', () => mockComponent('ListItem'));
jest.mock('@material-ui/core/ListItemText', () => mockComponent('ListItemText'));
jest.mock('@material-ui/core/Typography', () => mockComponent('Typography'));

const props = {
  isCurrentUserMessage: false,
  children: <></>,
  dateTime: moment.utc('20010101'),
};

describe('render MessageDateTime component', () => {
  const setup = () => render(
    <MessageDateTime {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
