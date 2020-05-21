import React from 'react';
import { render } from '@testing-library/react';

import { mockComponent } from 'testing/utils';

import UserModifyDialog from './UserModifyDialog';

jest.mock('react-material-ui-form-validator', () => ({
  ValidatorForm: mockComponent('ValidatorForm'),
}));
jest.mock('@material-ui/core/Button', () => mockComponent('Button'));
jest.mock('@material-ui/core/Dialog', () => mockComponent('Dialog'));
jest.mock('@material-ui/core/DialogActions', () => mockComponent('DialogActions'));
jest.mock('@material-ui/core/DialogContent', () => mockComponent('DialogContent'));
jest.mock('@material-ui/core/DialogTitle', () => mockComponent('DialogTitle'));
jest.mock('@material-ui/core/FormHelperText', () => mockComponent('FormHelperText'));

jest.mock('Components/UserEmailField', () => mockComponent('UserEmailField'));
jest.mock('Components/UserNameField', () => mockComponent('UserNameField'));
jest.mock('Components/UserPasswordField', () => mockComponent('UserPasswordField'));
jest.mock('Components/AvatarSelector', () => mockComponent('AvatarSelector'));

const props = {
  user: {
    _id: '_id',
    avatar: 'avatar',
    name: 'name',
    email: 'email',
  },
  onSave: jest.fn(),
  closeUserModifyDialog: jest.fn(),
  error: 'error',
};

describe('render UserModifyDialog component', () => {
  const setup = () => render(
    <UserModifyDialog {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});

