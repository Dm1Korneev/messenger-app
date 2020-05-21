import React from 'react';
import { render } from '@testing-library/react';

import { mockComponent } from 'testing/utils';

import MainContent from './MainContent';

jest.mock('Components/MessagesList', () => mockComponent('MessagesList'));
jest.mock('Components/MessageInput', () => mockComponent('MessageInput'));

jest.mock('@material-ui/core/Grid', () => mockComponent('Grid'));

const props = {};

describe('render MainContent component', () => {
  const setup = () => render(
    <MainContent {...props} />,
  );

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});

