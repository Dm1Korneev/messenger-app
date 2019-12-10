import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from 'Components/App';

const emptyStore = createStore(() => { });

jest.mock('Containers/TopBar', () => global.mockComponent('Icon'));
jest.mock('Containers/SignIn', () => global.mockComponent('SignIn'));
jest.mock('Containers/SideBar', () => global.mockComponent('SideBar'));
jest.mock('Containers/TopBar', () => global.mockComponent('TopBar'));
jest.mock('Components/MainContent', () => global.mockComponent('MainContent'));
jest.mock('@material-ui/core/CssBaseline', () => global.mockComponent('CssBaseline'));

describe('render app when not logged', () => {
  let wrapper;

  const loginFromStore = jest.fn();

  beforeAll(() => {
    wrapper = global.mount(
      <Provider store={emptyStore}>
        <App
          loginFromStore={loginFromStore}
          chatDialogIsOpen={false}
          userModifyDialogIsOpen={false}
          isLoggedIn={false}
        />
      </Provider>,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('App').length).toBe(1);
  });

  test('SignIn subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'SignIn' }).length).toBe(1);
  });

  test('loginFromStore function is call', () => {
    expect(loginFromStore).toHaveBeenCalled();
  });
});

describe('render app when logged', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <App
        loginFromStore={jest.fn()}
        chatDialogIsOpen={false}
        userModifyDialogIsOpen={false}
        isLoggedIn
      />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('App').length).toBe(1);
  });

  test('CssBaseline subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'CssBaseline' }).length).toBe(1);
  });
  test('TopBar subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'TopBar' }).length).toBe(1);
  });
  test('SideBar subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'SideBar' }).length).toBe(1);
  });
  test('MainContent subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find({ originalcomponent: 'MainContent' }).length).toBe(1);
  });
});

describe('snapshot-test App component', () => {
  test('Renders correct properties', () => {
    global.mountExpect(
      <App
        loginFromStore={jest.fn()}
        chatDialogIsOpen={false}
        userModifyDialogIsOpen={false}
        isLoggedIn
      />,
    ).toMatchSnapshot();
  });
});
