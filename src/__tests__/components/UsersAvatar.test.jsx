import React from 'react';

import UsersAvatar from 'Components/UsersAvatar';

jest.mock('@material-ui/core/ListItemAvatar', () => global.mockComponent('ListItemAvatar'));
jest.mock('@material-ui/core/Avatar', () => global.mockComponent('Avatar'));
jest.mock('@material-ui/icons/AccountCircleOutlined', () => global.mockComponent('AccountIcon'));

describe('render UsersAvatar component', () => {
  let wrapper;

  const props = {
    size: 60,
  };

  beforeAll(() => {
    wrapper = global.mount(
      <UsersAvatar {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('UsersAvatar').length).toBe(1);
  });

  test('ListItemAvatar subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'ListItemAvatar' }).length).toBe(1);
  });

  test('Avatar subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'Avatar' }).length).toBe(1);
  });

  test('AccountIcon subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'AccountIcon' }).length).toBe(1);
  });
});

describe('snapshot-test UsersAvatar component', () => {
  test('Renders correct properties', () => {
    const props = {
      size: 60,
    };

    global.mountExpect(
      <UsersAvatar {...props} />,
    ).toMatchSnapshot();
  });
});
