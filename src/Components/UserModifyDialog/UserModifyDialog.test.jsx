import React from 'react';

import UserModifyDialog from './UserModifyDialog';

jest.mock('react-material-ui-form-validator', () => ({
  ValidatorForm: global.mockComponent('ValidatorForm'),
}));
jest.mock('@material-ui/core/Button', () => global.mockComponent('Button'));
jest.mock('@material-ui/core/Dialog', () => global.mockComponent('Dialog'));
jest.mock('@material-ui/core/DialogActions', () => global.mockComponent('DialogActions'));
jest.mock('@material-ui/core/DialogContent', () => global.mockComponent('DialogContent'));
jest.mock('@material-ui/core/DialogTitle', () => global.mockComponent('DialogTitle'));
jest.mock('@material-ui/core/FormHelperText', () => global.mockComponent('FormHelperText'));

jest.mock('Components/UserEmailField', () => global.mockComponent('UserEmailField'));
jest.mock('Components/UserNameField', () => global.mockComponent('UserNameField'));
jest.mock('Components/UserPasswordField', () => global.mockComponent('UserPasswordField'));
jest.mock('Components/AvatarSelector', () => global.mockComponent('AvatarSelector'));

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
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <UserModifyDialog {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('UserModifyDialog').length).toBe(1);
  });

  test('Dialog subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'Dialog' }).length).toBe(1);
  });
});

