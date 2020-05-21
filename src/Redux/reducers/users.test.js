import * as actionNames from 'Constants/actionNames';

import reducer from './users';

describe('users reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(
      { byId: {}, allIds: [] },
    );
  });

  test('should handle ADD_USERS with array payload', () => {
    expect(
      reducer({}, {
        type: actionNames.ADD_USERS,
        payload: [{ _id: 'id1' }],
      }),
    ).toStrictEqual(
      {
        byId: { id1: { _id: 'id1' } },
        allIds: ['id1'],
      },
    );
  });

  test('should handle ADD_USERS with object payload', () => {
    expect(
      reducer({
        byId: { id1: { _id: 'id1' } },
        allIds: ['id1'],
      }, {
        type: actionNames.ADD_USERS,
        payload: { _id: 'id2' },
      }),
    ).toStrictEqual(
      {
        byId: { id1: { _id: 'id1' }, id2: { _id: 'id2' } },
        allIds: ['id1', 'id2'],
      },
    );
  });

  test('should handle CLEAR_STORE', () => {
    expect(
      reducer({
        byId: { TEST: { _id: 'TEST' } },
        allIds: ['TEST'],
      }, {
        type: actionNames.CLEAR_STORE,
      }),
    ).toStrictEqual(
      { byId: {}, allIds: [] },
    );
  });
});
