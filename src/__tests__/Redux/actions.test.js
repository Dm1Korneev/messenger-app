import * as actions from 'Redux/actions';
import * as actionNames from 'Constants/actionNames';

const getRequestActionName = (actionName) => `${actionName}_REQUEST`;

describe('actions', () => {
  test('should create an action to set active chat', () => {
    const expectedAction = {
      type: actionNames.SET_ACTIVE_CHAT,
    };
    expect(actions.setActiveChat()).toStrictEqual(expectedAction);
  });

  test('should create an action to set drawer is open', () => {
    const expectedAction = {
      type: actionNames.SET_DRAWER_IS_OPEN,
    };
    expect(actions.setDrawerIsOpen()).toStrictEqual(expectedAction);
  });

  test('should create an action to set add chat dialog is open', () => {
    const expectedAction = {
      type: actionNames.SET_ADD_CHAT_DIALOG_IS_OPEN,
    };
    expect(actions.setAddChatDialogIsOpen()).toStrictEqual(expectedAction);
  });

  test('should create an action to set modify chat dialog is open', () => {
    const expectedAction = {
      type: actionNames.SET_MODIFY_CHAT_DIALOG_IS_OPEN,
    };
    expect(actions.setModifyChatDialogIsOpen()).toStrictEqual(expectedAction);
  });

  test('should create an action to set modify user dialog is open', () => {
    const expectedAction = {
      type: actionNames.SET_MODIFY_USER_DIALOG_IS_OPEN,
    };
    expect(actions.setModifyUserDialogIsOpen()).toStrictEqual(expectedAction);
  });

  test('should create an action to set session info', () => {
    const expectedAction = {
      type: actionNames.SET_SESSION_INFO,
    };
    expect(actions.setSessionInfo()).toStrictEqual(expectedAction);
  });

  test('should create an action to close chat dialog', () => {
    const expectedAction = {
      type: actionNames.SET_SESSION_INFO,
      payload: {
        modifyChatDialogIsOpen: false,
        addChatDialogIsOpen: false,
        modifiableChatId: undefined,
      },
    };
    expect(actions.closeChatDialog()).toStrictEqual(expectedAction);
  });

  test('should create an action to open modify chat dialog', () => {
    const modifiableChatId = 'TEST';
    const expectedAction = {
      type: actionNames.SET_SESSION_INFO,
      payload: {
        modifyChatDialogIsOpen: true,
        modifiableChatId,
      },
    };
    expect(actions.openModifyChatDialog(modifiableChatId)).toStrictEqual(expectedAction);
  });

  test('should create an action to add chats', () => {
    const expectedAction = {
      type: actionNames.ADD_CHATS,
    };
    expect(actions.addChats()).toStrictEqual(expectedAction);
  });

  test('should create an action to add messages', () => {
    const expectedAction = {
      type: actionNames.ADD_MESSAGES,
    };
    expect(actions.addMessages()).toStrictEqual(expectedAction);
  });

  test('should create an action to add users', () => {
    const expectedAction = {
      type: actionNames.ADD_USERS,
    };
    expect(actions.addUsers()).toStrictEqual(expectedAction);
  });

  test('should create an action to clear store', () => {
    const expectedAction = {
      type: actionNames.CLEAR_STORE,
    };
    expect(actions.clearStore()).toStrictEqual(expectedAction);
  });

  test('should create an action to get users', () => {
    const expectedAction = {
      type: getRequestActionName(actionNames.GET_USERS),
    };
    expect(actions.getUsers()).toStrictEqual(expectedAction);
  });

  test('should create an action to send message', () => {
    const messageText = 'TEST';
    const expectedAction = {
      type: getRequestActionName(actionNames.SEND_MESSAGE),
      payload: {
        messageText,
      },
    };
    expect(actions.sendMessage(messageText)).toStrictEqual(expectedAction);
  });

  test('should create an action to load messages', () => {
    const expectedAction = {
      type: getRequestActionName(actionNames.GET_MESSAGES),
    };
    expect(actions.loadMessages()).toStrictEqual(expectedAction);
  });

  test('should create an action to create chat', () => {
    const title = 'title_TEST';
    const avatar = 'avatar_TEST';
    const selectedUserIds = ['123', '321'];
    const expectedAction = {
      type: getRequestActionName(actionNames.CREATE_CHAT),
      payload: {
        title,
        avatar,
        selectedUserIds,
      },
    };
    expect(actions.createChat(title, avatar, selectedUserIds)).toStrictEqual(expectedAction);
  });

  test('should create an action to modify chat', () => {
    const chatId = 'chatId_TEST';
    const options = {
      test: 'TEST',
    };
    const expectedAction = {
      type: getRequestActionName(actionNames.MODIFY_CHAT),
      payload: {
        chatId,
        options,
      },
    };
    expect(actions.modifyChat(chatId, options)).toStrictEqual(expectedAction);
  });

  test('should create an action to modify user', () => {
    const userId = 'userId_TEST';
    const options = {
      test: 'TEST',
    };
    const expectedAction = {
      type: getRequestActionName(actionNames.MODIFY_USER),
      payload: {
        userId,
        options,
      },
    };
    expect(actions.modifyUser(userId, options)).toStrictEqual(expectedAction);
  });

  test('should create an action to get chats', () => {
    const expectedAction = {
      type: getRequestActionName(actionNames.GET_CHATS),
    };
    expect(actions.getChats()).toStrictEqual(expectedAction);
  });

  test('should create an action to sign in', () => {
    const email = 'email_TEST';
    const password = 'password_TEST';
    const remember = false;
    const expectedAction = {
      type: getRequestActionName(actionNames.LOGIN),
      payload: {
        email,
        password,
        remember,
      },
    };
    expect(actions.signIn(email, password, remember)).toStrictEqual(expectedAction);
  });

  test('should create an action to sign in with default remember parameter', () => {
    const email = 'email_TEST';
    const password = 'password_TEST';
    const remember = false;
    const expectedAction = {
      type: getRequestActionName(actionNames.LOGIN),
      payload: {
        email,
        password,
        remember,
      },
    };
    expect(actions.signIn(email, password)).toStrictEqual(expectedAction);
  });

  test('should create an action to register', () => {
    const email = 'email_TEST';
    const password = 'password_TEST';
    const name = 'name_TEST';

    const avatar = 'avatar_TEST';
    const remember = false;
    const expectedAction = {
      type: getRequestActionName(actionNames.REGISTER),
      payload: {
        email,
        password,
        name,
        avatar,
        remember,
      },
    };
    expect(actions.register(email, password, name, avatar, remember)).toStrictEqual(expectedAction);
  });

  test('should create an action to register with default remember parameter', () => {
    const email = 'email_TEST';
    const password = 'password_TEST';
    const name = 'name_TEST';

    const avatar = 'avatar_TEST';
    const remember = false;
    const expectedAction = {
      type: getRequestActionName(actionNames.REGISTER),
      payload: {
        email,
        password,
        name,
        avatar,
        remember,
      },
    };
    expect(actions.register(email, password, name, avatar)).toStrictEqual(expectedAction);
  });

  test('should create an action to log out', () => {
    const expectedAction = {
      type: actionNames.LOGOUT,
    };
    expect(actions.logOut()).toStrictEqual(expectedAction);
  });

  test('should create an action to login from store', () => {
    const expectedAction = {
      type: getRequestActionName(actionNames.LOGIN_FROM_STORE),
    };
    expect(actions.loginFromStore()).toStrictEqual(expectedAction);
  });

  test('should create an action to change active chat', () => {
    const activeChat = 'TEST';
    const expectedAction = {
      type: actionNames.CHANGE_ACTIVE_CHAT,
      payload: {
        activeChat,
      },
    };
    expect(actions.changeActiveChat(activeChat)).toStrictEqual(expectedAction);
  });
});
