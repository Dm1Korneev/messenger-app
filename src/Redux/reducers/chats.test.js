import ActionNames from 'Constants/actionNames';

import reducer from './chats';

describe('chats reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(
      { byId: {}, allIds: [] },
    );
  });

  test('should handle ADD_USERS', () => {
    expect(
      reducer({}, {
        type: ActionNames.ADD_CHATS,
        payload: [{ _id: 'TEST' }],
      }),
    ).toStrictEqual(
      {
        byId: { TEST: { _id: 'TEST' } },
        allIds: ['TEST'],
      },
    );
  });

  test('should handle CLEAR_STORE', () => {
    expect(
      reducer({
        byId: { TEST: { _id: 'TEST' } },
        allIds: ['TEST'],
      }, {
        type: ActionNames.CLEAR_STORE,
      }),
    ).toStrictEqual(
      { byId: {}, allIds: [] },
    );
  });
});
