/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import storeFactory from 'Redux/store';

configure({ adapter: new Adapter() });

global.mockAPICalls = () => {

};

global.mockComponent = (componentName) => (props) => {
  const { children } = props;
  return <div originalcomponent={componentName} testprops={props}>{children}</div>;
};

global.store = storeFactory();
global.mount = mount;
