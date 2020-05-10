import * as actionNames from 'Constants/actionNames';
import reducer from './errors';

const getFailureActionName = (actionName) => `${actionName}_FAILURE`;
const getRequestActionName = (actionName) => `${actionName}_REQUEST`;

describe('error reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(
      {},
    );
  });

  test('should not handle actions without REQUEST or FAILURE postfix', () => {
    expect(
      reducer({}, {
        type: actionNames.ADD_CHATS,
      }),
    ).toStrictEqual(
      {},
    );
  });

  test('should handle GET_USERS_FAILURE', () => {
    expect(
      reducer({}, {
        type: getFailureActionName(actionNames.GET_USERS),
        payload: { error: { message: 'TEST_MESSAGE' } },
      }),
    ).toStrictEqual(
      { GET_USERS: 'TEST_MESSAGE' },
    );
  });

  test('should handle GET_USERS_REQUEST', () => {
    expect(
      reducer({ GET_USERS: 'TEST_MESSAGE' }, {
        type: getRequestActionName(actionNames.GET_USERS),
      }),
    ).toStrictEqual(
      { GET_USERS: '' },
    );
  });
});
