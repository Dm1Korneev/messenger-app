/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import { compose } from 'redux';

import storeFactory from 'Redux/store';

configure({ adapter: new Adapter() });

global.mockAPICalls = () => {

};

global.mockComponent = (componentName) => (props) => (
  <div originalcomponent={componentName} testprops={props}>{props.children}</div>
);

global.store = storeFactory();
global.mount = mount;
global.mountExpect = compose(
  expect,
  toJSON,
  mount,
);
