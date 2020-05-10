import React from 'react';
import { render } from '@testing-library/react';

import { ValidatorForm } from 'react-material-ui-form-validator';
import UserPasswordField from './UserPasswordField';

describe('render UserPasswordField component', () => {
  const props = {
    value: 'TEST',
    onChange: jest.fn(),
  };

  const propsValidatorForm = {
    onSubmit: jest.fn(),
  };

  const setup = () => render(
    <ValidatorForm {...propsValidatorForm}>
      <UserPasswordField {...props} />
    </ValidatorForm>,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
