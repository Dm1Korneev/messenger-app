import {
  activeChatIdSelector,
  isLoggedInSelector,
  tokenSelector,
} from './session';

describe('session selectors', () => {
  test('isLoggedInSelector should return true if "isLoggedIn = true" in store', () => {
    const store = { session: { isLoggedIn: true } };
    expect(isLoggedInSelector(store)).toStrictEqual(
      true,
    );
  });

  test('isLoggedInSelector should return true if "isLoggedIn = false" in store', () => {
    const store = { session: { isLoggedIn: false } };
    expect(isLoggedInSelector(store)).toStrictEqual(
      false,
    );
  });

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
