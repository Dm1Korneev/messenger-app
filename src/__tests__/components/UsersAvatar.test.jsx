import React from 'react';

import UsersAvatar from 'Components/UsersAvatar';

describe('render UsersAvatar component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <UsersAvatar size={60} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('UsersAvatar').length).toBe(1);
    expect(wrapper.find('ListItemAvatar').length).toBe(1);
    expect(wrapper.find('Avatar').length).toBe(1);
  });
});

describe('snapshot-test UsersAvatar component', () => {
  test('Renders correct properties', () => {
    global.shallowExpect(
      <UsersAvatar />,
    ).toMatchSnapshot();
  });
});
