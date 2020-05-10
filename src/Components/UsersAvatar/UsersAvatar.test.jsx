import React from 'react';
import { render } from '@testing-library/react';
import { mockComponent } from 'testing/utils';

import UsersAvatar from './UsersAvatar';

jest.mock('@material-ui/core/ListItemAvatar', () => mockComponent('ListItemAvatar'));
jest.mock('@material-ui/core/Avatar', () => mockComponent('Avatar'));
jest.mock('@material-ui/icons/AccountCircleOutlined', () => mockComponent('AccountIcon'));

describe('render UsersAvatar component', () => {
  const props = {
    size: 60,
  };

  const setup = () => render(
    <UsersAvatar {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});

