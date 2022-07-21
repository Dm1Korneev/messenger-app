import { ActionNames } from 'Constants';

import reducer from './loading';

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
});
