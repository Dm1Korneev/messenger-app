import React from 'react';

import AvatarSelector from 'Components/AvatarSelector';

jest.mock('Components/UsersAvatar', () => global.mockComponent('UsersAvatar'));

jest.mock('@material-ui/core/InputLabel', () => global.mockComponent('InputLabel'));
jest.mock('@material-ui/core/Button', () => global.mockComponent('Button'));
jest.mock('@material-ui/icons/CloudUpload', () => global.mockComponent('CloudUploadIcon'));
jest.mock('@material-ui/icons/Clear', () => global.mockComponent('ClearIcon'));

const props = {
  avatarFileInput: React.createRef(),
};

describe('render AvatarSelector component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <AvatarSelector {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('AvatarSelector').length).toBe(1);
  });

  test('UsersAvatar subcomponent is render', () => {
    expect(wrapper.find({ originalcomponent: 'UsersAvatar' }).length).toBe(1);
  });

  test('InputLabel subcomponent is render', () => {
    expect(wrapper.find({ originalcomponent: 'InputLabel' }).length).toBe(1);
  });
});

describe('snapshot-test AvatarSelector component', () => {
  test('Renders correct properties', () => {
    global.mountExpect(
      <AvatarSelector {...props} />,
    ).toMatchSnapshot();
  });
});
