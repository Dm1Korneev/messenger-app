import { ActionNames } from 'Constants';

import reducer from './session';

const defaultStore = {
  activeChat: undefined,
  token: undefined,
};

describe('session reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(
      defaultStore,
    );
  });

  test('should handle SET_ACTIVE_CHAT', () => {
    const activeChat = 'activeChatId';

    expect(
      reducer(defaultStore, {
        type: ActionNames.SET_ACTIVE_CHAT,
        payload: activeChat,
      }),
    ).toStrictEqual(
      {
        ...defaultStore,
        activeChat,
      },
    );
  });
});
