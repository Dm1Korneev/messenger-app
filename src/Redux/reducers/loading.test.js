import { ActionNames } from 'Constants';

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
        type: ActionNames.ADD_CHATS,
      }),
    ).toStrictEqual(
      {},
    );
  });

  test('should handle GET_USERS_REQUEST', () => {
    expect(
      reducer({}, {
        type: getRequestActionName(ActionNames.GET_USERS),
      }),
    ).toStrictEqual(
      { GET_USERS: true },
    );
  });

  test('should handle GET_USERS_SUCCESS', () => {
    expect(
      reducer({ GET_USERS: true }, {
        type: getSuccessActionName(ActionNames.GET_USERS),
      }),
    ).toStrictEqual(
      { GET_USERS: false },
    );
  });

  test('should handle GET_USERS_FAILURE', () => {
    expect(
      reducer({ GET_USERS: true }, {
        type: getFailureActionName(ActionNames.GET_USERS),
      }),
    ).toStrictEqual(
      { GET_USERS: false },
    );
  });
});
