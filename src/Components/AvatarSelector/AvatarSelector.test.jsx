import React from 'react';
import { render } from '@testing-library/react';

import { mockComponent } from 'testing/utils';

import AvatarSelector from './AvatarSelector';

jest.mock('Components/UsersAvatar', () => mockComponent('UsersAvatar'));

jest.mock('@material-ui/core/InputLabel', () => mockComponent('InputLabel'));
jest.mock('@material-ui/core/Button', () => mockComponent('Button'));
jest.mock('@material-ui/icons/CloudUpload', () => mockComponent('CloudUploadIcon'));
jest.mock('@material-ui/icons/Clear', () => mockComponent('ClearIcon'));

describe('render AvatarSelector component', () => {
  const props = {
    avatarFileInput: React.createRef(),
  };

  const setup = () => render(
    <AvatarSelector {...props} />,
  );

  test('component is render', () => {
    const { queryByText } = setup();

    expect(queryByText('Avatar')).toBeInTheDocument();
    expect(queryByText('Upload')).toBeInTheDocument();
    expect(queryByText('Remove')).toBeInTheDocument();
  });

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
