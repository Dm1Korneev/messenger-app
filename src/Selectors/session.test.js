import {
  activeChatIdSelector,
  chatDialogIsOpenSelector,
  currentUserIdSelector,
  currentUserSelector,
  drawerIsOpenSelector,
  isLoggedInSelector,
  modifiableChatIdSelector,
  modifyChatDialogIsOpenSelector,
  tokenSelector,
  userModifyDialogIsOpenSelector,
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

  test('chatDialogIsOpenSelector should return true if some chat dialog is open', () => {
    const store = { session: { addChatDialogIsOpen: true, modifyChatDialogIsOpen: false } };
    expect(chatDialogIsOpenSelector(store)).toStrictEqual(
      true,
    );
  });

  test('chatDialogIsOpenSelector should return false if all chat dialog is closed', () => {
    const store = { session: { addChatDialogIsOpen: false, modifyChatDialogIsOpen: false } };
    expect(chatDialogIsOpenSelector(store)).toStrictEqual(
      false,
    );
  });

  test('modifyChatDialogIsOpenSelector should return true if "modifyChatDialogIsOpen = true" in store', () => {
    const store = { session: { modifyChatDialogIsOpen: true } };
    expect(modifyChatDialogIsOpenSelector(store)).toStrictEqual(
      true,
    );
  });

  test('userModifyDialogIsOpenSelector should return true if "userModifyDialogIsOpen = true" in store', () => {
    const store = { session: { userModifyDialogIsOpen: true } };
    expect(userModifyDialogIsOpenSelector(store)).toStrictEqual(
      true,
    );
  });

  test('currentUserSelector should return session.user from store', () => {
    const store = { session: { user: { _id: 'id1' } } };
    expect(currentUserSelector(store)).toStrictEqual(
      { _id: 'id1' },
    );
  });

  test('currentUserIdSelector should return session.user._id from store', () => {
    const store = { session: { user: { _id: 'id1' } } };
    expect(currentUserIdSelector(store)).toStrictEqual(
      'id1',
    );
  });

  test('modifiableChatIdSelector should return modifiableChatId from store', () => {
    const store = { session: { modifiableChatId: 'id1' } };
    expect(modifiableChatIdSelector(store)).toStrictEqual(
      'id1',
    );
  });

  test('activeChatIdSelector should return activeChat from store', () => {
    const store = { session: { activeChat: 'id1' } };
    expect(activeChatIdSelector(store)).toStrictEqual(
      'id1',
    );
  });

  test('drawerIsOpenSelector should return drawerIsOpen from store', () => {
    const store = { session: { drawerIsOpen: true } };
    expect(drawerIsOpenSelector(store)).toStrictEqual(
      true,
    );
  });

  test('tokenSelector should return token from store', () => {
    const store = { session: { token: 'TOKEN' } };
    expect(tokenSelector(store)).toStrictEqual(
      'TOKEN',
    );
  });
});
