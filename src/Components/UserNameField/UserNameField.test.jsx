import React from 'react';
import { render } from '@testing-library/react';

import { mockComponent } from 'testing/utils';

import UserNameField from './UserNameField';

jest.mock('react-material-ui-form-validator', () => ({
  TextValidator: mockComponent('TextValidator'),
}));

describe('render UserPasswordField component', () => {
  const props = {
    value: 'TEST',
    onChange: jest.fn(),
  };

  const setup = () => render(
    <UserNameField {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});

