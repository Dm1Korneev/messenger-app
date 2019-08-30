import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from 'Components/App';

const emptyStore = createStore(() => {});

jest.mock('Containers/TopBar', () => 'TopBar');
jest.mock('Containers/SignIn', () => 'SignIn');
jest.mock('Containers/SideBar', () => 'SideBar');
jest.mock('Components/MainContent', () => 'MainContent');
jest.mock('@material-ui/core/CssBaseline', () => 'CssBaseline');

describe('render app when not logged', () => {
  let wrapper;

  beforeAll(() => {
    const props = {
      loginFromStore: jest.fn(),
      chatDialogIsOpen: false,
      userModifyDialogIsOpen: false,
      isLoggedIn: false,
    };
    wrapper = global.mount(
      <Provider store={emptyStore}>
        <App {...props} />
      </Provider>,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('App').length).toBe(1);
  });

  test('SignIn subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find('SignIn').length).toBe(1);
  });
});

describe.only('render app when logged', () => {
  let wrapper;

  beforeAll(() => {
    const props = {
      loginFromStore: jest.fn(),
      chatDialogIsOpen: false,
      userModifyDialogIsOpen: false,
      isLoggedIn: true,
    };
    wrapper = global.mount(
      <Provider store={emptyStore}>
        <App {...props} />
      </Provider>,
    );
  });

  test.only('MainContent subcomponent is render', () => {
    wrapper.update();
    // console.log(wrapper2.debug());
    expect(wrapper.dive().find('MainContent').length).toBe(1);
  });
});

describe('snapshot-test App component', () => {
  test('Renders correct properties', () => {
    global.shallowExpect(
      <Provider store={global.store}>
        <App />
      </Provider>,
    ).toMatchSnapshot();
  });
});
