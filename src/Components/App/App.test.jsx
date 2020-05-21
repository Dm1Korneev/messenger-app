import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';

import { mockComponent } from 'testing/utils';

import App from './App';

const emptyStore = createStore(() => { });

jest.mock('Components/TopBar', () => mockComponent('Icon'));
jest.mock('Components/SignIn', () => mockComponent('SignIn'));
jest.mock('Components/SideBar', () => mockComponent('SideBar'));
jest.mock('Components/TopBar', () => mockComponent('TopBar'));
jest.mock('Components/MainContent', () => mockComponent('MainContent'));
jest.mock('@material-ui/core/CssBaseline', () => mockComponent('CssBaseline'));

describe('render app when not logged', () => {
  const loginFromStore = jest.fn();

  const props = {
    loginFromStore,
    chatDialogIsOpen: false,
    userModifyDialogIsOpen: false,
    isLoggedIn: false,
  };

  const setup = () => render(
    <Provider store={emptyStore}>
      <App {...props} />
    </Provider>,
  );

  test('loginFromStore function is call', async () => {
    setup();

    expect(loginFromStore).toHaveBeenCalled();
  });

  test('snapshot test', async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
