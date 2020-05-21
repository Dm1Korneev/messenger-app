import * as actionNames from 'Constants/actionNames';

import reducer from './loading';

const getFailureActionName = (actionName) => `${actionName}_FAILURE`;
const getRequestActionName = (actionName) => `${actionName}_REQUEST`;
const getSuccessActionName = (actionName) => `${actionName}_SUCCESS`;

describe('loading reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(
      {},
    );
  });

  test('should not handle actions without REQUEST, SUCCESS FAILURE postfix', () => {
    expect(
      reducer({}, {
        type: actionNames.ADD_CHATS,
      }),
    ).toStrictEqual(
      {},
    );
  });

  test('should handle GET_USERS_REQUEST', () => {
    expect(
      reducer({}, {
        type: getRequestActionName(actionNames.GET_USERS),
      }),
    ).toStrictEqual(
      { GET_USERS: true },
    );
  });

  test('should handle GET_USERS_SUCCESS', () => {
    expect(
      reducer({ GET_USERS: true }, {
        type: getSuccessActionName(actionNames.GET_USERS),
      }),
    ).toStrictEqual(
      { GET_USERS: false },
    );
  });

  test('should handle GET_USERS_FAILURE', () => {
    expect(
      reducer({ GET_USERS: true }, {
        type: getFailureActionName(actionNames.GET_USERS),
      }),
    ).toStrictEqual(
      { GET_USERS: false },
    );
  });
});
