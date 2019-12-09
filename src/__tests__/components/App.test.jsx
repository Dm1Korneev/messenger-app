import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from 'Components/App';

const emptyStore = createStore(() => { });

jest.mock('Containers/TopBar', () => () => (<div className="TopBar" />));
jest.mock('Containers/SignIn', () => () => (<div className="SignIn" />));
jest.mock('Containers/SideBar', () => () => (<div className="SideBar" />));
jest.mock('Components/MainContent', () => () => (<div className="MainContent" />));
jest.mock('@material-ui/core/CssBaseline', () => () => (<div className="CssBaseline" />));

describe('render app when not logged', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <Provider store={emptyStore}>
        <App
          loginFromStore={jest.fn()}
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
    expect(wrapper.find('.SignIn').length).toBe(1);
  });
});

describe('render app when logged', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <Provider store={emptyStore}>
        <App
          loginFromStore={jest.fn()}
          chatDialogIsOpen={false}
          userModifyDialogIsOpen={false}
          isLoggedIn
        />
      </Provider>,
    );
  });

  test('MainContent subcomponent is render', () => {
    wrapper.update();
    expect(wrapper.find('.MainContent').length).toBe(1);
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
