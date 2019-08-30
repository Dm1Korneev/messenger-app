/* eslint-disable import/no-extraneous-dependencies */

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';
import { compose } from 'redux';

import storeFactory from 'Redux/store';

configure({ adapter: new Adapter() });

global.mockAPICalls = () => {

};

global.store = storeFactory();
global.mount = mount;
global.shallow = shallow;
global.shallowExpect = compose(
  expect,
  toJSON,
  shallow,
);
