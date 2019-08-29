import reducer from 'Redux/reducers/session';
import * as actionNames from 'Constants/actionNames';

const defaultStore = {
  activeChat: undefined,
  token: undefined,
  isLoggedIn: false,
  drawerIsOpen: true,
  addChatDialogIsOpen: false,
  modifyChatDialogIsOpen: false,
  modifiableChatId: undefined,
  userModifyDialogIsOpen: false,
  user: undefined,
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
        type: actionNames.SET_ACTIVE_CHAT,
        payload: activeChat,
      }),
    ).toStrictEqual(
      {
        ...defaultStore,
        activeChat,
      },
    );
  });

  test('should handle SET_DRAWER_IS_OPEN', () => {
    const drawerIsOpen = true;

    expect(
      reducer(defaultStore, {
        type: actionNames.SET_DRAWER_IS_OPEN,
        payload: drawerIsOpen,
      }),
    ).toStrictEqual(
      {
        ...defaultStore,
        drawerIsOpen,
      },
    );
  });

  test('should handle SET_ADD_CHAT_DIALOG_IS_OPEN', () => {
    const addChatDialogIsOpen = true;

    expect(
      reducer(defaultStore, {
        type: actionNames.SET_ADD_CHAT_DIALOG_IS_OPEN,
        payload: addChatDialogIsOpen,
      }),
    ).toStrictEqual(
      {
        ...defaultStore,
        addChatDialogIsOpen,
      },
    );
  });

  test('should handle SET_MODIFY_CHAT_DIALOG_IS_OPEN', () => {
    const modifyChatDialogIsOpen = true;

    expect(
      reducer(defaultStore, {
        type: actionNames.SET_MODIFY_CHAT_DIALOG_IS_OPEN,
        payload: modifyChatDialogIsOpen,
      }),
    ).toStrictEqual(
      {
        ...defaultStore,
        modifyChatDialogIsOpen,
      },
    );
  });

  test('should handle SET_MODIFY_USER_DIALOG_IS_OPEN', () => {
    const userModifyDialogIsOpen = true;

    expect(
      reducer(defaultStore, {
        type: actionNames.SET_MODIFY_USER_DIALOG_IS_OPEN,
        payload: userModifyDialogIsOpen,
      }),
    ).toStrictEqual(
      {
        ...defaultStore,
        userModifyDialogIsOpen,
      },
    );
  });

  test('should handle SET_IS_LOGGED_IN', () => {
    const isLoggedIn = true;

    expect(
      reducer(defaultStore, {
        type: actionNames.SET_IS_LOGGED_IN,
        payload: isLoggedIn,
      }),
    ).toStrictEqual(
      {
        ...defaultStore,
        isLoggedIn,
      },
    );
  });

  test('should handle SET_SESSION_INFO', () => {
    const payload = {
      isLoggedIn: true,
      userModifyDialogIsOpen: true,
    };

    expect(
      reducer(defaultStore, {
        type: actionNames.SET_SESSION_INFO,
        payload,
      }),
    ).toStrictEqual(
      {
        ...defaultStore,
        ...payload,
      },
    );
  });

  test('should handle CLEAR_STORE', () => {
    expect(
      reducer({
        ...defaultStore,
        isLoggedIn: true,
        userModifyDialogIsOpen: true,
      }, {
        type: actionNames.CLEAR_STORE,
      }),
    ).toStrictEqual(
      defaultStore,
    );
  });
});
