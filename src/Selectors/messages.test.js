import * as sessionSelectors from './session';

import { messagesTreeSelector } from './messages';

describe('messages selectors', () => {
  const store = {
    messages: {
      byId: {
        id1: {
          _id: 'id1', chat: 'chatId1', dateTime: new Date(2018, 11, 1), author: 'authorId4',
        },
        id2: {
          _id: 'id2', chat: 'chatId1', dateTime: new Date(2018, 11, 2), author: 'authorId5',
        },
        id3: {
          _id: 'id3', chat: 'chatId2', dateTime: new Date(2018, 11, 3), author: 'authorId6',
        },
        id4: {
          _id: 'id4', chat: 'chatId1', dateTime: new Date(2018, 11, 2), author: 'authorId5',
        },
        id5: {
          _id: 'id5', chat: 'chatId1', dateTime: new Date(2018, 11, 6), author: 'authorId5',
        },
      },
      allIds: ['id1', 'id2', 'id3', 'id4', 'id5'],
      byChats: {
        chatId1: ['id1', 'id2', 'id4', 'id5'],
        chatId2: ['id3'],
      },
    },
  };

  const expectedResult = [
    {
      author: 'authorId4',
      childrens: [{
        childrens: [{
          _id: 'id1', author: 'authorId4', chat: 'chatId1', dateTime: new Date(2018, 11, 1),
        }],
        dateTime: new Date(2018, 11, 1),
      }],
    }, {
      author: 'authorId5',
      childrens: [{
        childrens: [{
          _id: 'id2', author: 'authorId5', chat: 'chatId1', dateTime: new Date(2018, 11, 2),
        }, {
          _id: 'id4', author: 'authorId5', chat: 'chatId1', dateTime: new Date(2018, 11, 2),
        }],
        dateTime: new Date(2018, 11, 2),
      }, {
        childrens: [{
          _id: 'id5', author: 'authorId5', chat: 'chatId1', dateTime: new Date(2018, 11, 6),
        }],
        dateTime: new Date(2018, 11, 6),
      }],
    },
  ];

  test('messagesTreeSelector should return messages tree', () => {
    jest.spyOn(sessionSelectors, 'activeChatIdSelector').mockReturnValue('chatId1');

    expect(messagesTreeSelector(store)).toStrictEqual(
      expectedResult,
    );
  });

  test('messagesTreeSelector should return empty messages tree if not messages by active chat', () => {
    jest.spyOn(sessionSelectors, 'activeChatIdSelector').mockReturnValue('chatId6');

    expect(messagesTreeSelector(store)).toStrictEqual(
      [],
    );
  });
});
