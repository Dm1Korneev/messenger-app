import React from 'react';
import { render } from '@testing-library/react';
import { mockComponent } from 'testing/utils';

import MessageInput from './MessageInput';

jest.mock('@material-ui/core/TextField', () => mockComponent('TextField'));

const props = {
  onSendMessage: jest.fn(),
};

describe('render MessageInput component', () => {
  const setup = () => render(
    <MessageInput {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});

