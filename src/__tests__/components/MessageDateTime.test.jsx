import React from 'react';

import MessageDateTime from 'Components/MessageDateTime';

import moment from 'Common/moment';

jest.mock('@material-ui/core/ListItem', () => global.mockComponent('ListItem'));
jest.mock('@material-ui/core/ListItemText', () => global.mockComponent('ListItemText'));
jest.mock('@material-ui/core/Typography', () => global.mockComponent('Typography'));

const props = {
  isCurrentUserMessage: false,
  children: <></>,
  dateTime: moment('20010101'),
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

describe('snapshot-test MessageDateTime component', () => {
  test('Renders correct properties', () => {
    global.mountExpect(
      <MessageDateTime {...props} />,
    ).toMatchSnapshot();
  });
});
