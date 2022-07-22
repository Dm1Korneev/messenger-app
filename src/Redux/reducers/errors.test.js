import { ActionNames } from 'Constants';

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
        type: ActionNames.ADD_CHATS,
      }),
    ).toStrictEqual(
      {},
    );
  });
});
