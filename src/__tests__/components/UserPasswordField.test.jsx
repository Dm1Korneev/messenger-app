import React from 'react';

import UserPasswordField from 'Components/UserPasswordField';
import { ValidatorForm } from 'react-material-ui-form-validator';

describe('render UserPasswordField component', () => {
  let wrapper;

  const props = {
    value: 'TEST',
    onChange: jest.fn(),
  };

  const propsValidatorForm = {
    onSubmit: jest.fn(),
  };

  beforeAll(() => {
    wrapper = global.mount(
      <ValidatorForm {...propsValidatorForm}>
        <UserPasswordField {...props} />
      </ValidatorForm>,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('UserPasswordField').length).toBe(1);
  });

  test('Password field visibility is changes', () => {
    expect(wrapper.find('input').first().prop('type'))
      .toBe('password');

    const buttonTogglePasswordVisibility = wrapper.find({ 'aria-label': 'Toggle password visibility' })
      .first();

    buttonTogglePasswordVisibility.simulate('mouseDown');

    expect(wrapper.find('input').first().prop('type'))
      .toBe('text');

    buttonTogglePasswordVisibility.simulate('mouseUp');

    expect(wrapper.find('input').first().prop('type'))
      .toBe('password');

    buttonTogglePasswordVisibility.simulate('keyDown', { keyCode: 12 });

    expect(wrapper.find('input').first().prop('type'))
      .toBe('password');

    buttonTogglePasswordVisibility.simulate('keyDown', { keyCode: 13 });

    expect(wrapper.find('input').first().prop('type'))
      .toBe('text');

    buttonTogglePasswordVisibility.simulate('keyUp');

    expect(wrapper.find('input').first().prop('type'))
      .toBe('password');

    buttonTogglePasswordVisibility.simulate('mouseDown');

    expect(wrapper.find('input').first().prop('type'))
      .toBe('text');

    buttonTogglePasswordVisibility.simulate('mouseOut');

    expect(wrapper.find('input').first().prop('type'))
      .toBe('password');

    buttonTogglePasswordVisibility.simulate('mouseDown');

    expect(wrapper.find('input').first().prop('type'))
      .toBe('text');

    buttonTogglePasswordVisibility.simulate('blur');

    expect(wrapper.find('input').first().prop('type'))
      .toBe('password');
  });
});
