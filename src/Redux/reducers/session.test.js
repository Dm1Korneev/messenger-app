import { ActionNames } from 'Constants';

import reducer from './session';

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

  test('should handle SET_DRAWER_IS_OPEN', () => {
    const drawerIsOpen = true;

    expect(
      reducer(defaultStore, {
        type: ActionNames.SET_DRAWER_IS_OPEN,
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
        type: ActionNames.SET_ADD_CHAT_DIALOG_IS_OPEN,
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
        type: ActionNames.SET_MODIFY_CHAT_DIALOG_IS_OPEN,
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
        type: ActionNames.SET_MODIFY_USER_DIALOG_IS_OPEN,
        payload: userModifyDialogIsOpen,
      }),
    ).toStrictEqual(
      {
        ...defaultStore,
        userModifyDialogIsOpen,
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
        type: ActionNames.SET_SESSION_INFO,
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
        type: ActionNames.CLEAR_STORE,
      }),
    ).toStrictEqual(
      defaultStore,
    );
  });
});
