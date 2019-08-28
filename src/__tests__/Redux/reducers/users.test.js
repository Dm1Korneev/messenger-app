import reducer from 'Redux/reducers/users';
import * as actionNames from 'Constants/actionNames';

describe('users reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(
      { byId: {}, allIds: [] },
    );
  });

  test('should handle ADD_USERS', () => {
    expect(
      reducer({}, {
        type: actionNames.ADD_USERS,
        payload: [{ _id: 'TEST' }],
      }),
    ).toStrictEqual(
      {
        byId: { TEST: { _id: 'TEST' } },
        allIds: ['TEST'],
      },
    );

    expect(
      reducer({}, {
        type: actionNames.CLEAR_STORE,
      }),
    ).toStrictEqual(
      { byId: {}, allIds: [] },
    );
  });
});
