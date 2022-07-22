import {
  activeChatIdSelector,
  tokenSelector,
} from './session';

describe('session selectors', () => {
  test('activeChatIdSelector should return activeChat from store', () => {
    const store = { session: { activeChat: 'id1' } };
    expect(activeChatIdSelector(store)).toStrictEqual(
      'id1',
    );
  });

  test('tokenSelector should return token from store', () => {
    const store = { session: { token: 'TOKEN' } };
    expect(tokenSelector(store)).toStrictEqual(
      'TOKEN',
    );
  });
});
