import React from 'react';

import moment from 'Common/moment';
import MessageDateTime from './MessageDateTime';

jest.mock('@material-ui/core/ListItem', () => global.mockComponent('ListItem'));
jest.mock('@material-ui/core/ListItemText', () => global.mockComponent('ListItemText'));
jest.mock('@material-ui/core/Typography', () => global.mockComponent('Typography'));

const props = {
  isCurrentUserMessage: false,
  children: <></>,
  dateTime: moment.utc('20010101'),
};

describe('render MessageDateTime component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = global.mount(
      <MessageDateTime {...props} />,
    );
  });

  test('component is render', () => {
    expect(wrapper.find('MessageDateTime').length).toBe(1);
  });

  test('ListItem subcomponent is render', () => {
    expect(wrapper.find({ originalcomponent: 'ListItem' }).length).toBe(1);
  });
});
