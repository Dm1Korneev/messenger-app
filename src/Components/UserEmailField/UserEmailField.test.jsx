import React from 'react';
import { render } from '@testing-library/react';
import { mockComponent } from 'testing/utils';

import UserEmailField from './UserEmailField';

jest.mock('react-material-ui-form-validator', () => ({
  TextValidator: mockComponent('TextValidator'),
}));

describe('render UserEmailField component', () => {
  const props = {
    value: 'TEST',
    onChange: jest.fn(),
  };

  const setup = () => render(
    <UserEmailField {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});

