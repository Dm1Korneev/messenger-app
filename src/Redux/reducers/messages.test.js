import * as actionNames from 'Constants/actionNames';
import reducer from './messages';

describe('chats reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(
      { byId: {}, allIds: [], byChats: {} },
    );
  });

  test('should handle ADD_MESSAGES with array payload', () => {
    expect(
      reducer({}, {
        type: actionNames.ADD_MESSAGES,
        payload: [{ _id: 'id1', chat: 'chatId1' }, { _id: 'id2', chat: 'chatId1' }, { _id: 'id3', chat: 'chatId2' }],
      }),
    ).toStrictEqual(
      {
        byId: {
          id1: { _id: 'id1', chat: 'chatId1' },
          id2: { _id: 'id2', chat: 'chatId1' },
          id3: { _id: 'id3', chat: 'chatId2' },
        },
        allIds: ['id1', 'id2', 'id3'],
        byChats: {
          chatId1: ['id1', 'id2'],
          chatId2: ['id3'],
        },
      },
    );
  });

  test('should handle ADD_MESSAGES with object payload', () => {
    expect(
      reducer({
        byId: {
          id1: { _id: 'id1', chat: 'chatId1' },
          id2: { _id: 'id2', chat: 'chatId1' },
          id3: { _id: 'id3', chat: 'chatId2' },
        },
        allIds: ['id1', 'id2', 'id3'],
        byChats: {
          chatId1: ['id1', 'id2'],
          chatId2: ['id3'],
        },
      }, {
        type: actionNames.ADD_MESSAGES,
        payload: { _id: 'id4', chat: 'chatId2' },
      }),
    ).toStrictEqual(
      {
        byId: {
          id1: { _id: 'id1', chat: 'chatId1' },
          id2: { _id: 'id2', chat: 'chatId1' },
          id3: { _id: 'id3', chat: 'chatId2' },
          id4: { _id: 'id4', chat: 'chatId2' },
        },
        allIds: ['id1', 'id2', 'id3', 'id4'],
        byChats: {
          chatId1: ['id1', 'id2'],
          chatId2: ['id3', 'id4'],
        },
      },
    );
  });

  test('should handle CLEAR_STORE', () => {
    expect(
      reducer({
        byId: {
          id1: { _id: 'id1', chat: 'chatId1' },
          id2: { _id: 'id2', chat: 'chatId1' },
          id3: { _id: 'id3', chat: 'chatId2' },
        },
        allIds: ['id1', 'id2', 'id3'],
        byChats: {
          chatId1: ['id1', 'id2'],
          chatId2: ['id3'],
        },
      }, {
        type: actionNames.CLEAR_STORE,
      }),
    ).toStrictEqual(
      { byId: {}, allIds: [], byChats: {} },
    );
  });
});
